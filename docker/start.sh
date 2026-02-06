#!/bin/bash
set -e

echo "=== Starting Laravel on Railway ==="

# Asegurarse de estar en el directorio correcto
cd /var/www

# Verificar que artisan existe
if [ ! -f artisan ]; then
    echo "ERROR: artisan file not found in /var/www"
    ls -la /var/www
    exit 1
fi

# Crear .env básico
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

# Limpiar y cachear configuración
php artisan config:clear
php artisan cache:clear 2>/dev/null || true
php artisan config:cache 2>/dev/null || true
php artisan route:cache 2>/dev/null || true

echo "✓ Laravel configured"
echo "✓ Starting Nginx on port 8080..."
nginx

echo "✓ Starting PHP-FPM..."
exec php-fpm