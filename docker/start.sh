#!/bin/bash
set -e

echo "=== Starting Laravel on Railway ==="

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

# Permisos
chown -R www-data:www-data storage bootstrap/cache

# Cache
php artisan config:clear
php artisan cache:clear 2>/dev/null || true
php artisan config:cache 2>/dev/null || true

echo "✓ Laravel configured"

# Iniciar PHP-FPM en background
echo "✓ Starting PHP-FPM..."
php-fpm -D

# Esperar a que PHP-FPM esté listo
sleep 2

# Verificar que PHP-FPM está corriendo
if ! pgrep -x php-fpm > /dev/null; then
    echo "ERROR: PHP-FPM failed to start"
    exit 1
fi

echo "✓ PHP-FPM running"
echo "✓ Starting Nginx on port 8080..."

# Nginx en foreground (mantiene el contenedor vivo)
exec nginx -g 'daemon off;'