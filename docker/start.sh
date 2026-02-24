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

# Permisos
chown -R www-data:www-data storage bootstrap/cache

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

# Generar configuración de Nginx con el puerto correcto
cat > /etc/nginx/nginx.conf << NGINX_EOF
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /dev/stderr warn;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    access_log /dev/stdout;
    error_log /dev/stderr warn;

    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;

    upstream php-fpm {
        server 127.0.0.1:9000;
    }

    server {
        listen $NGINX_PORT default_server;
        server_name _;
        root $ROOT_DIR/public;
        index index.php index.html;
        server_tokens off;

        client_max_body_size 50M;
        
        # Timeouts aumentados
        fastcgi_read_timeout 300;
        fastcgi_send_timeout 300;
        proxy_read_timeout 300;
        proxy_send_timeout 300;

        location / {
            try_files \$uri \$uri/ /index.php?\$query_string;
        }

        location ~ \.php$ {
            try_files \$uri =404;
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass php-fpm;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
            fastcgi_param PATH_INFO \$fastcgi_path_info;
            include fastcgi_params;
            
            # Headers adicionales
            fastcgi_param HTTP_PROXY "";
            fastcgi_intercept_errors off;
            fastcgi_buffer_size 32k;
            fastcgi_buffers 8 32k;
            fastcgi_busy_buffers_size 64k;
        }

        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }

        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
}
NGINX_EOF

echo "✓ Nginx config generated for port $NGINX_PORT"

# Iniciar PHP-FPM en foreground pero en background del script
echo "✓ Starting PHP-FPM..."
php-fpm &

# Esperar a que PHP-FPM esté listo
sleep 3

# Verificar que PHP-FPM está escuchando en el puerto 9000
if ss -tuln | grep -q ':9000'; then
    echo "✓ PHP-FPM is running on port 9000"
else
    echo "ERROR: PHP-FPM is not listening on port 9000"
    echo "Open ports:"
    ss -tuln
    exit 1
fi

# Verificar configuración de Nginx
nginx -t

# Enlazar storage
php artisan storage:link --force || echo "⚠ Storage link already exists"

# Iniciar Queue Worker en background
echo "✓ Starting Queue Worker..."
php artisan queue:work --tries=3 --timeout=90 &

echo "✓ Starting Nginx on port $NGINX_PORT..."

# Nginx en foreground para mantener el contenedor vivo
exec nginx -g 'daemon off;'