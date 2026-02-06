#!/bin/bash
set -e

# Railway inyecta PORT automáticamente, usa 8080 como fallback
NGINX_PORT=${PORT:-8080}

echo "=== Starting Laravel on Railway ==="
echo "=== Port configured: $NGINX_PORT ==="

cd /var/www

if [ ! -f artisan ]; then
    echo "ERROR: artisan file not found"
    exit 1
fi

# Crear .env
cat > .env << EOF
APP_NAME=${APP_NAME:-Laravel}
APP_ENV=${APP_ENV:-production}
APP_DEBUG=${APP_DEBUG:-false}
APP_KEY=${APP_KEY}
APP_URL=${APP_URL:-http://localhost}
LOG_CHANNEL=stderr
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE}
DB_USERNAME=${DB_USERNAME}
DB_PASSWORD=${DB_PASSWORD}
EOF

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

php artisan config:clear
php artisan cache:clear 2>/dev/null || true
php artisan config:cache 2>/dev/null || true

echo "✓ Laravel configured"

# Generar configuración de Nginx dinámicamente
cat > /etc/nginx/nginx.conf << 'NGINXEOF'
user www-data;
worker_processes auto;
error_log /dev/stderr warn;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    access_log /dev/stdout;
    sendfile on;
    keepalive_timeout 65;
    client_max_body_size 20M;

    server {
        listen NGINX_PORT_PLACEHOLDER;
        listen [::]:NGINX_PORT_PLACEHOLDER;
        server_name _;
        root /var/www/public;
        index index.php index.html;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            try_files $uri =404;
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include fastcgi_params;
            fastcgi_read_timeout 300;
            fastcgi_send_timeout 300;
        }

        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
}
NGINXEOF

# Reemplazar el placeholder con el puerto real
sed -i "s/NGINX_PORT_PLACEHOLDER/$NGINX_PORT/g" /etc/nginx/nginx.conf

echo "✓ Nginx config generated for port $NGINX_PORT"

# Iniciar PHP-FPM
echo "✓ Starting PHP-FPM..."
php-fpm -D

sleep 2

if ! pgrep -x php-fpm > /dev/null; then
    echo "ERROR: PHP-FPM failed to start"
    exit 1
fi

echo "✓ PHP-FPM is running"

# Verificar config de Nginx
nginx -t

echo "✓ Starting Nginx on port $NGINX_PORT..."
exec nginx -g 'daemon off;'