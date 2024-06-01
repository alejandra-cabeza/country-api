#!/bin/bash

# Copy .env.example to .env
cp .env.example .env

# Install backend dependencies
composer install

# Drop all tables and run migrations
php artisan migrate:fresh

# Run database seeders
php artisan db:seed

# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

read -p "Do you want to run the backend and frontend? (y/n) " answer

case ${answer:0:1} in
    y|Y )
        # Navigate to the backend directory
        cd ..

        # Run the backend in the background
        php artisan serve &

        # Navigate to the frontend directory
        cd frontend

        # Run the frontend
        npm run dev
    ;;
    * )
        echo "Okay, you can run the backend and frontend manually when you're ready."
    ;;
esac