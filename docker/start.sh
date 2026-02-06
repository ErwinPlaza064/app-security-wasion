#!/bin/bash
set -e

# Usar PORT de Railway o 8080 por defecto
export PORT=${PORT:-8080}

echo "=== Starting Laravel on Railway ==="
echo "=== Listening on port: $PORT ==="

cd /var/www

if [ ! -f artisan ]; then
    echo "ERROR: artisan file not found"
    exit 1
fi

# Crear .env
cat > .env << EOF
APP_NAME=Laravel
APP_ENV=${APP_ENV:-production}
APP_DEBUG=${APP_DEBUG:-false}
APP_KEY=${APP_KEY:-base64:$(openssl rand -base64 32)}
APP_URL=${APP_URL:-http://localhost}
LOG_CHANNEL=stderr
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-laravel}
DB_USERNAME=${DB_USERNAME:-root}
DB_PASSWORD=${DB_PASSWORD:-}
EOF

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

php artisan config:clear
php artisan cache:clear 2>/dev/null || true

echo "✓ Laravel configured"

# Crear config de Nginx con el puerto dinámico
cat > /etc/nginx/nginx.conf << 'NGINXCONF'
user www-data;
worker_processes 1;
error_log /dev/stderr warn;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    access_log /dev/stdout;
    error_log /dev/stderr warn;

    server {
        listen ${PORT};
        server_name _;
        root /var/www/public;
        index index.php index.html;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
}
NGINXCONF

# Reemplazar ${PORT} con el valor real
sed -i "s/\${PORT}/$PORT/g" /etc/nginx/nginx.conf

echo "✓ Starting PHP-FPM..."
php-fpm -D -R

sleep 2

if ! pgrep -x php-fpm > /dev/null; then
    echo "ERROR: PHP-FPM failed to start"
    exit 1
fi

echo "✓ PHP-FPM is running"
echo "✓ Starting Nginx on port $PORT..."

exec nginx -g 'daemon off;'
```

**O más simple:** Ya que internamente funciona con el puerto 8080, solo agrega la variable de entorno en Railway:

**Settings → Variables → Add Variable:**
```
PORT=8080