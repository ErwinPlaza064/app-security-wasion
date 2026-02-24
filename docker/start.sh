#!/bin/bash
set -e

echo "=== Starting Laravel on Railway ==="

# Asegurarse de estar en el directorio correcto
ROOT_DIR=$(pwd)
echo "=== Working directory: $ROOT_DIR ==="

# Verificar que artisan existe
if [ ! -f "$ROOT_DIR/artisan" ]; then
    echo "ERROR: artisan file not found in $ROOT_DIR"
    ls -la $ROOT_DIR
    exit 1
fi

# Determinar el puerto
NGINX_PORT=${PORT:-8080}
echo "=== Port configured: $NGINX_PORT ==="

# Determinar variables de BD con fallbacks (soporte para MySQL y PostgreSQL de Railway)
FINAL_DB_HOST=${DB_HOST:-${PGHOST:-${MYSQLHOST:-127.0.0.1}}}
FINAL_DB_PORT=${DB_PORT:-${PGPORT:-${MYSQLPORT:-5432}}}
FINAL_DB_USER=${DB_USERNAME:-${PGUSER:-${MYSQLUSER:-postgres}}}
FINAL_DB_PASS=${DB_PASSWORD:-${PGPASSWORD:-${MYSQLPASSWORD:-}}}
FINAL_DB_NAME=${DB_DATABASE:-${PGDATABASE:-${MYSQL_DATABASE:-${MYSQLDATABASE:-laravel}}}}

# Crear .env desde variables de entorno
cat > .env << EOF
APP_NAME=Laravel
APP_ENV=${APP_ENV:-production}
APP_DEBUG=${APP_DEBUG:-false}
APP_KEY=${APP_KEY}
APP_URL=${APP_URL:-http://localhost}

LOG_CHANNEL=stderr
LOG_LEVEL=debug

CACHE_DRIVER=database
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=database
SESSION_LIFETIME=120

DB_CONNECTION=${DB_CONNECTION:-pgsql}
DB_HOST=${FINAL_DB_HOST}
DB_PORT=${FINAL_DB_PORT}
DB_DATABASE=${FINAL_DB_NAME}
DB_USERNAME=${FINAL_DB_USER}
DB_PASSWORD=${FINAL_DB_PASS}
EOF

# Mostrar el .env generado (sin password)
echo "=== Generated .env (DB section) ==="
grep "^DB_" .env | grep -v "DB_PASSWORD"

# Permisos (Nixpacks maneja esto, evitamos chown si no somos root)
# chown -R www-data:www-data storage bootstrap/cache

# Limpiar configuración
echo "Clearing configuration cache..."
php artisan config:clear

# Cachear configuración
echo "Caching configuration..."
php artisan config:cache 2>&1 || echo "⚠ Config cache skipped"
php artisan route:cache 2>&1 || echo "⚠ Route cache skipped"

# Ejecutar migraciones de base de datos
if [ -n "$FINAL_DB_HOST" ] && [ "$FINAL_DB_HOST" != "127.0.0.1" ]; then
    echo "Running database migrations and seeders..."
    php artisan migrate --force 2>&1 || echo "⚠ Migrations failed"
    php artisan db:seed --force 2>&1 || echo "⚠ Seeding failed"
else
    echo "⚠ Database variables not fully set - skipping migrations"
fi

echo "✓ Laravel configured"



# Crear directorios temporales para Nginx
mkdir -p /tmp/nginx_client_body /tmp/nginx_proxy /tmp/nginx_fastcgi /tmp/nginx_uwsgi /tmp/nginx_scgi

# Generar configuración de Nginx LOCAL (rootless)
NGINX_CONF="$ROOT_DIR/nginx_local.conf"
MIME_TYPES="$ROOT_DIR/mime.types"

# Generar mime.types básico si no existe en el sistema
cat > "$MIME_TYPES" << EOF
types {
    text/html                             html htm shtml;
    text/css                              css;
    text/xml                              xml;
    image/gif                             gif;
    image/jpeg                            jpeg jpg;
    application/javascript                js;
    application/atom+xml                  atom;
    application/rss+xml                   rss;
    font/woff                             woff;
    font/woff2                            woff2;
    image/png                             png;
    image/svg+xml                         svg svgz;
    image/webp                            webp;
    application/pdf                       pdf;
}
EOF

cat > "$NGINX_CONF" << NGINX_EOF
worker_processes auto;
pid /tmp/nginx.pid;
error_log /dev/stderr warn;

events {
    worker_connections 1024;
}

http {
    include $MIME_TYPES;
    default_type application/octet-stream;
    access_log /dev/stdout;
    sendfile on;
    keepalive_timeout 65;
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    client_body_temp_path /tmp/nginx_client_body;
    proxy_temp_path /tmp/nginx_proxy;
    fastcgi_temp_path /tmp/nginx_fastcgi;
    uwsgi_temp_path /tmp/nginx_uwsgi;
    scgi_temp_path /tmp/nginx_scgi;

    upstream php-fpm {
        server 127.0.0.1:9000;
    }

    server {
        listen $NGINX_PORT;
        server_name _;
        root $ROOT_DIR/public;
        index index.php index.html;
        server_tokens off;

        client_max_body_size 50M;

        location / {
            try_files \$uri \$uri/ /index.php?\$query_string;
        }

        location ~ \.php$ {
            fastcgi_pass php-fpm;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
            # FastCGI Params Inline
            fastcgi_param  QUERY_STRING       \$query_string;
            fastcgi_param  REQUEST_METHOD     \$request_method;
            fastcgi_param  CONTENT_TYPE       \$content_type;
            fastcgi_param  CONTENT_LENGTH     \$content_length;
            fastcgi_param  SCRIPT_NAME        \$fastcgi_script_name;
            fastcgi_param  REQUEST_URI        \$request_uri;
            fastcgi_param  DOCUMENT_URI       \$document_uri;
            fastcgi_param  DOCUMENT_ROOT      \$document_root;
            fastcgi_param  SERVER_PROTOCOL    \$server_protocol;
            fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
            fastcgi_param  SERVER_SOFTWARE    nginx/\$nginx_version;
            fastcgi_param  REMOTE_ADDR        \$remote_addr;
            fastcgi_param  REMOTE_PORT        \$remote_port;
            fastcgi_param  SERVER_ADDR        \$server_addr;
            fastcgi_param  SERVER_PORT        \$server_port;
            fastcgi_param  SERVER_NAME        \$server_name;
            fastcgi_param  HTTPS              \$https if_not_empty;
            fastcgi_param  REDIRECT_STATUS    200;
        }

        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
    }
}
NGINX_EOF

echo "✓ Local Nginx config generated"

# Intentar encontrar PHP-FPM
FPM_BIN=$(which php-fpm || which php84-fpm || which php-fpm8.4 || find /nix/store -name "php-fpm" -type f -executable -print -quit 2>/dev/null)

if [ -z "$FPM_BIN" ]; then
    echo "ERROR: php-fpm binary not found"
    exit 1
fi

echo "✓ Found PHP-FPM at: $FPM_BIN"

# Iniciar PHP-FPM (rootless)
# Creamos un pool local si es necesario, pero intentamos con el default
$FPM_BIN -d "listen=127.0.0.1:9000" -d "daemonize=no" &

# Esperar a que PHP-FPM esté listo
sleep 3

# Enlazar storage y worker
php artisan storage:link --force || echo "⚠ Storage link already exists"
php artisan queue:work --tries=3 --timeout=90 &

echo "✓ Starting Nginx (rootless)..."
exec nginx -c "$NGINX_CONF" -g "daemon off;"