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



# Crear directorios temporales para Nginx y PHP-FPM
mkdir -p /tmp/nginx_client_body /tmp/nginx_proxy /tmp/nginx_fastcgi /tmp/nginx_uwsgi /tmp/nginx_scgi /tmp/php-fpm

# Generar configuración de Nginx LOCAL (rootless)
NGINX_CONF="$ROOT_DIR/nginx_local.conf"
MIME_TYPES="$ROOT_DIR/mime.types"

# Generar mime.types completo (Evita errores de Lighthouse)
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
    application/json                      json;
    image/x-icon                          ico;
    text/plain                            txt;
}
EOF

cat > "$NGINX_CONF" << NGINX_EOF
worker_processes auto;
pid /tmp/nginx.pid;
error_log stderr warn;

events {
    worker_connections 2048;
    multi_accept on;
}

http {
    include $MIME_TYPES;
    default_type application/octet-stream;
    access_log off;
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    
    # Gzip agresivo
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/xml image/svg+xml;

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
        index index.php;
        server_tokens off;

        client_max_body_size 50M;

        location / {
            try_files \$uri \$uri/ /index.php?\$query_string;
        }

        location ~ \.php$ {
            fastcgi_pass php-fpm;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
            
            # Parámetros FastCGI 100% Locales (Evita fallos de /etc/nginx)
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
            
            fastcgi_buffer_size 128k;
            fastcgi_buffers 4 256k;
            fastcgi_busy_buffers_size 256k;
        }

        # Cache eterno para assets de Vite
        location ~* \/build\/assets\/.*\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires max;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
    }
}
NGINX_EOF

# Generar configuración de PHP-FPM LOCAL
FPM_CONF="$ROOT_DIR/php-fpm_local.conf"

# Detectar el usuario actual para la configuración de FPM
CURRENT_USER=$(whoami)
echo "=== Running as user: $CURRENT_USER ==="

cat > "$FPM_CONF" << EOF
[global]
error_log = /dev/stderr
daemonize = no
pid = /tmp/php-fpm.pid

[www]
user = $CURRENT_USER
group = $CURRENT_USER
listen = 127.0.0.1:9000
pm = static
pm.max_children = 10
clear_env = no
catch_workers_output = yes
EOF

echo "✓ Configs generated"

# Intentar encontrar PHP-FPM
FPM_BIN=$(which php-fpm || which php84-fpm || which php-fpm8.4 || find /nix/store -name "php-fpm" -type f -executable -print -quit 2>/dev/null)

if [ -z "$FPM_BIN" ]; then
    echo "ERROR: php-fpm binary not found"
    exit 1
fi

echo "✓ Found PHP-FPM at: $FPM_BIN"

# Iniciar PHP-FPM con OPcache tuneado para producción
# -d opcache.enable=1: Activa OPcache
# -d opcache.enable_cli=1: Activa OPcache para CLI (útil para artisan)
# -d opcache.memory_consumption=128: Memoria para cache (en MB)
# -d opcache.interned_strings_buffer=8: Optimización de textos (en MB)
# -d opcache.max_accelerated_files=10000: Límite de archivos en cache
# -d opcache.validate_timestamps=0: Rendimiento máximo (no revisa cambios en archivos)
$FPM_BIN -y "$FPM_CONF" -R \
    -d opcache.enable=1 \
    -d opcache.enable_cli=1 \
    -d opcache.memory_consumption=128 \
    -d opcache.interned_strings_buffer=8 \
    -d opcache.max_accelerated_files=10000 \
    -d opcache.validate_timestamps=0 \
    -d zend_extension=opcache &

# Esperar a que PHP-FPM esté listo
sleep 2

# Enlazar storage y worker
php artisan storage:link --force || echo "⚠ Storage link exists"
php artisan queue:work --tries=3 --timeout=90 &

echo "✓ Ready. Starting Nginx..."
# Usamos -e stderr para evitar error de logs por defecto
exec nginx -c "$NGINX_CONF" -e stderr -g "daemon off;"