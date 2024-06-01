# Use an official PHP runtime as a base image
FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    curl \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo_pgsql

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install backend dependencies
COPY composer.json composer.lock /app/
RUN composer install --no-scripts --no-autoloader

# Copy the rest of the application and run Composer scripts
COPY . /app/
RUN composer dump-autoload --optimize

# Expose ports for the applications
EXPOSE 8000

# Run migrations, seed the database, and then run the application
CMD php artisan migrate:refresh --seed && php artisan serve --host=0.0.0.0 --port=8000
