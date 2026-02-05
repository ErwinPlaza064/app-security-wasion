FROM php:8.4-fpm

# Instalar dependencias del sistema con mejor manejo de errores
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
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ... resto igual hasta el final ...

# Exponer puerto (Railway usa 8080 por defecto pero asignará uno dinámico)
EXPOSE 8080

# Script de inicio mejorado
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

CMD ["/usr/local/bin/start.sh"]