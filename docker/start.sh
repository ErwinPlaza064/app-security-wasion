#!/bin/bash
set -e

echo "=== Starting Application ==="
echo "Railway PORT: ${PORT:-8080}"

# Asegurar permisos
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true

# Crear .env mínimo
cat > /var/www/.env << EOF
APP_NAME=Laravel
APP_ENV=production
APP_DEBUG=${APP_DEBUG:-false}
APP_KEY=${APP_KEY:-base64:$(openssl rand -base64 32)}
APP_URL=${APP_URL:-http://localhost}
DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-forge}
DB_USERNAME=${DB_USERNAME:-forge}
DB_PASSWORD=${DB_PASSWORD:-}
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
LOG_CHANNEL=stderr
EOF

# Generar configuración de Nginx con el puerto correcto
cat > /etc/nginx/sites-available/default << 'NGINX_EOF'
server {
    listen PORT_PLACEHOLDER default_server;
    server_name _;
    root /var/www/public;
    index index.php index.html;

    access_log /dev/stdout;
    error_log /dev/stderr warn;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
NGINX_EOF

# Reemplazar el puerto
sed -i "s/PORT_PLACEHOLDER/${PORT:-8080}/g" /etc/nginx/sites-available/default

echo "Nginx configurado para escuchar en puerto ${PORT:-8080}"
cat /etc/nginx/sites-available/default

# Limpiar cache de Laravel
php artisan config:clear
php artisan cache:clear

# Cache de Laravel
php artisan config:cache 2>/dev/null || true
php artisan route:cache 2>/dev/null || true
php artisan view:cache 2>/dev/null || true

# Test Nginx
echo "Testing Nginx..."
nginx -t

# Iniciar Nginx
echo "Starting Nginx..."
nginx

# Verificar procesos
sleep 2
echo "Checking processes..."
pgrep nginx && echo "✓ Nginx running" || echo "✗ Nginx failed"
pgrep php-fpm && echo "✓ PHP-FPM would run" || true

# Iniciar PHP-FPM
echo "✓ Starting PHP-FPM..."
exec php-fpm
