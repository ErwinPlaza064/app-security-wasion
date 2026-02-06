#!/bin/bash
set -e

echo "=== Starting Laravel on Railway ==="
echo "=== Port configured: ${PORT:-8080} ==="

# Asegurarse de estar en el directorio correcto
cd /var/www

# Verificar que artisan existe
if [ ! -f artisan ]; then
    echo "ERROR: artisan file not found in /var/www"
    ls -la /var/www
    exit 1
fi

# Crear .env desde variables de entorno
cat > .env << EOF
APP_NAME=Laravel
APP_ENV=${APP_ENV:-production}
APP_DEBUG=${APP_DEBUG:-false}
APP_KEY=${APP_KEY}
APP_URL=${APP_URL:-http://localhost}

LOG_CHANNEL=stderr
LOG_LEVEL=debug

CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Database - usar variables de Railway MySQL
DB_CONNECTION=mysql
DB_HOST=${MYSQL_HOST:-127.0.0.1}
DB_PORT=${MYSQL_PORT:-3306}
DB_DATABASE=${MYSQL_DATABASE:-laravel}
DB_USERNAME=${MYSQL_USER:-root}
DB_PASSWORD=${MYSQL_PASSWORD:-}
EOF

# Permisos
chown -R www-data:www-data storage bootstrap/cache

# Limpiar configuración
php artisan config:clear

# Intentar cachear config solo si la DB está disponible
echo "Checking database connection..."
if php artisan db:show 2>/dev/null; then
    echo "✓ Database connected"
    php artisan config:cache || echo "⚠ Config cache failed (non-critical)"
    php artisan route:cache || echo "⚠ Route cache failed (non-critical)"
else
    echo "⚠ Database not available - skipping cache commands"
fi

# Opcional: correr migraciones automáticamente
# php artisan migrate --force || echo "⚠ Migrations failed"

echo "✓ Laravel configured"

# Iniciar PHP-FPM en background
echo "✓ Starting PHP-FPM..."
php-fpm -D

# Esperar a que PHP-FPM esté listo
sleep 2

# Verificar que PHP-FPM está corriendo
if pgrep -x php-fpm > /dev/null; then
    echo "✓ PHP-FPM is running"
else
    echo "ERROR: PHP-FPM failed to start"
    exit 1
fi

# Configurar puerto desde Railway
NGINX_PORT=${PORT:-8080}
export NGINX_PORT

# Generar config de Nginx con el puerto correcto
cat > /etc/nginx/nginx.conf << 'NGINX_EOF'
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

    upstream php-fpm {
        server 127.0.0.1:9000;
    }

    server {
        listen ${NGINX_PORT} default_server;
        server_name _;
        root /var/www/public;
        index index.php index.html;

        fastcgi_read_timeout 300;
        fastcgi_send_timeout 300;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location ~ \.php$ {
            try_files $uri =404;
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass php-fpm;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param PATH_INFO $fastcgi_path_info;
            include fastcgi_params;
            
            fastcgi_param HTTP_PROXY "";
            fastcgi_intercept_errors off;
            fastcgi_buffer_size 16k;
            fastcgi_buffers 4 16k;
        }

        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
}
NGINX_EOF

# Reemplazar el placeholder del puerto
sed -i "s/\${NGINX_PORT}/$NGINX_PORT/g" /etc/nginx/nginx.conf

echo "✓ Nginx config generated for port $NGINX_PORT"

# Verificar configuración de Nginx
nginx -t

echo "✓ Starting Nginx on port $NGINX_PORT..."

# Nginx en foreground
exec nginx -g 'daemon off;'
```

### Opción 3: Variables de entorno en Railway

Asegúrate de tener estas variables configuradas en Railway:
```
APP_KEY=base64:mN1jZ1KjwiKfS/cTGw85JMNa5uInsXNS5JAwuztFDIo=
APP_ENV=production
APP_DEBUG=false
APP_URL=https://tu-app.railway.app

# Si agregaste MySQL, estas se crean automáticamente:
MYSQL_HOST=containers-us-west-xxx.railway.app
MYSQL_PORT=3306
MYSQL_DATABASE=railway
MYSQL_USER=root
MYSQL_PASSWORD=xxx