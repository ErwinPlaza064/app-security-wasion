# ============================================
# Builder de Node para compilar assets
# ============================================
FROM node:20-alpine AS node-builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de Node
RUN npm ci

# Copiar código fuente completo
COPY . .

# Compilar assets con Vite
RUN npm run build

# ============================================
# Imagen final con PHP
# ============================================
FROM php:8.4-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    zip \
    unzip \
    libzip-dev \
    libicu-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    git \
    curl \
    procps \
     iproute2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configurar e instalar extensiones PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql intl zip gd

# Copiar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www

# Copiar archivos de dependencias de PHP
COPY composer.json composer.lock ./

# Instalar dependencias de PHP
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Copiar el resto de la aplicación
COPY . .

# Copiar assets compilados desde el builder de Node
COPY --from=node-builder /app/public/build ./public/build

# Post-install de Composer
RUN composer dump-autoload --optimize

# Crear directorios y permisos
RUN mkdir -p storage/framework/{sessions,views,cache} \
    bootstrap/cache \
    && chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache

# Copiar configuración de PHP-FPM
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

# Copiar script de inicio
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["/usr/local/bin/start.sh"]