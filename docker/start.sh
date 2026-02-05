#!/bin/bash
set -e

# Generar key si no existe (producción)
if [ ! -f .env ]; then
    cp .env.example .env
    php artisan key:generate
fi

# Optimizaciones de Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Iniciar Nginx
nginx -g 'daemon off;' &

# Iniciar PHP-FPM en foreground
php-fpm