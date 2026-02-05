#!/bin/bash
set -e

echo "=== Starting Application ==="

# Asegurar permisos
echo "Setting permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true

# Generar APP_KEY si no existe (solo desarrollo, en producción debe estar en variables)
if [ ! -f .env ]; then
    echo "Creating .env from example..."
    cp .env.example .env
    php artisan key:generate --force
fi

# Optimizaciones de Laravel
echo "Caching Laravel..."
php artisan config:cache 2>/dev/null || echo "Config cache failed, continuing..."
php artisan route:cache 2>/dev/null || echo "Route cache failed, continuing..."
php artisan view:cache 2>/dev/null || echo "View cache failed, continuing..."

# Test de configuración de Nginx
echo "Testing Nginx configuration..."
nginx -t

# Iniciar Nginx en background
echo "Starting Nginx..."
nginx &

# Esperar un momento para que Nginx inicie
sleep 2

# Verificar que Nginx esté corriendo
if ! pgrep nginx > /dev/null; then
    echo "ERROR: Nginx failed to start!"
    exit 1
fi

echo "Nginx started successfully"
echo "Starting PHP-FPM..."

# Iniciar PHP-FPM en foreground (mantiene el contenedor vivo)
exec php-fpm