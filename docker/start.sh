#!/bin/bash
set -e

echo "=== Starting Application ==="

# Asegurar permisos
echo "Setting permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true

# Railway inyecta variables de entorno, no necesitamos .env
# Pero Laravel requiere que exista el archivo
echo "Creating minimal .env..."
cat > /var/www/.env << EOF
APP_NAME=Laravel
APP_ENV=production
APP_DEBUG=false
APP_KEY=${APP_KEY:-base64:$(openssl rand -base64 32)}

DB_CONNECTION=${DB_CONNECTION:-mysql}
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-forge}
DB_USERNAME=${DB_USERNAME:-forge}
DB_PASSWORD=${DB_PASSWORD:-}

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
EOF

# Optimizaciones de Laravel
echo "Caching Laravel configurations..."
php artisan config:cache 2>/dev/null || echo "Config cache skipped"
php artisan route:cache 2>/dev/null || echo "Route cache skipped"
php artisan view:cache 2>/dev/null || echo "View cache skipped"

# Test de configuración de Nginx
echo "Testing Nginx configuration..."
nginx -t

# Iniciar Nginx en background
echo "Starting Nginx..."
nginx &

# Esperar a que Nginx inicie
sleep 2

# Verificar que Nginx esté corriendo
if ! pgrep nginx > /dev/null; then
    echo "ERROR: Nginx failed to start!"
    cat /var/log/nginx/error.log 2>/dev/null || echo "No error log available"
    exit 1
fi

echo "✓ Nginx started successfully"
echo "✓ Starting PHP-FPM..."

# Iniciar PHP-FPM en foreground
exec php-fpm
```

## **Configura las Variables de Entorno en Railway:**

1. Ve a tu proyecto en Railway
2. Click en **"Variables"**
3. Añade estas variables:
```
APP_KEY=base64:TU_CLAVE_AQUI  (genera una con: php artisan key:generate --show)
APP_ENV=production
APP_DEBUG=false
DB_CONNECTION=mysql
DB_HOST=  (añadir cuando tengas la DB)
DB_PORT=3306
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

## **Verifica tu `.dockerignore`**

Asegúrate de que `.env.example` NO esté ignorado. Crea o edita `.dockerignore`:
```
.git
.env
node_modules
vendor/
!.env.example
storage/logs/*
storage/framework/cache/*
storage/framework/sessions/*
storage/framework/views/*