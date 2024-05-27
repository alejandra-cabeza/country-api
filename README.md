# Country API

This project is a full-stack application that provides a list of countries and its code. The backend is built with Laravel, a PHP framework, and the frontend is built with React and Vite.

## Features

- List countries with pagination and search functionality.
- Interactive frontend to display and select country information, with pagination and search bar.

## Installation
There are two options to set up the project:  running the provided setup script, or manually following the steps below.

### Option 1: Using the Setup Script

1. Clone the repository
```bash
git clone https://github.com/alejandra-cabeza/country-api.git
```

2. Navigate to the project directory
```bash
cd country-api
```

3. Make the setup script executable:
```bash
chmod +x setup.sh
```

4. Run the setup script:
```bash
./setup.sh
```

The setup script will install the necessary dependencies, run the database migrations, and ask if you want to start the backend and frontend services.

### Option 2: Manual Installation

### Backend

1. Clone the repository
```bash
git clone https://github.com/alejandra-cabeza/country-api.git
```

2. Navigate to the project directory

```bash
cd country-api
```

3. Copy the .env.example file to .env
```bash
cp .env.example .env
```

4. Install dependencies

```bash
composer install
```

5. Run the migrations to create the necessary tables in your database

```bash
php artisan migrate
```

6. Seed the database with data
```bash
php artisan db:seed
```

7. Run the server
```bash
php artisan serve
```

### Frontend

1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```
3. Start the development server
```bash
npm run dev
```


## Usage

### Backend

To get a list of countries, send a GET request to /api/countries. You can control the number of countries returned per page by adding a per_page query parameter. You can also search for countries by name by adding a search query parameter.

Example:
```bash
curl -X GET "http://localhost:8000/api/countries?page=1&per_page=5"
```

Response:

```bash
{
  "data": [
    {
      "id": 1,
      "name": "Afghanistan",
      "code": "AF"
    },
    {
      "id": 2,
      "name": "Åland Islands",
      "code": "AX"
    },
    {
      "id": 3,
      "name": "Albania",
      "code": "AL"
    },
    {
      "id": 4,
      "name": "Algeria",
      "code": "DZ"
    },
    {
      "id": 5,
      "name": "American Samoa",
      "code": "AS"
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/countries?page=1",
    "last": "http://localhost:8000/api/countries?page=49",
    "prev": null,
    "next": "http://localhost:8000/api/countries?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 49,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "http://localhost:8000/api/countries?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": "http://localhost:8000/api/countries?page=2",
        "label": "2",
        "active": false
      },
    ],
    "path": "http://localhost:8000/api/countries",
    "per_page": 5,
    "to": 5,
    "total": 244
  }
}
```

### Frontend

Open your web browser and navigate to http://localhost:5173 to interact with the frontend.



## Testing

### Backend

To run the tests for the backend, navigate to the backend directory and use:

```bash
php artisan test
```

### Frontend

To run the tests for the frontend, navigate to the frontend directory and use:

```bash
npm run test
```