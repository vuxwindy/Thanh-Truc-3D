# Web2D Server

Express.js API server with MySQL and Sequelize ORM integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the database credentials in `.env`

3. Create MySQL database:
```sql
CREATE DATABASE web2d;
```

## Database Migrations

### Create a new migration
```bash
npx sequelize-cli migration:generate --name create-table-name
```

### Run migrations
```bash
npx sequelize-cli db:migrate
```

### Undo last migration
```bash
npx sequelize-cli db:migrate:undo
```

### Undo all migrations
```bash
npx sequelize-cli db:migrate:undo:all
```

### Create a new model
```bash
npx sequelize-cli model:generate --name ModelName --attributes column1:string,column2:integer
```

### Create a new seeder
```bash
npx sequelize-cli seed:generate --name demo-data
```

### Run seeders
```bash
npx sequelize-cli db:seed:all
```

### Undo last seeder
```bash
npx sequelize-cli db:seed:undo
```

### Undo all seeders
```bash
npx sequelize-cli db:seed:undo:all
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on port 3000 by default.

## Project Structure

- `app.js` - Main application file
- `config/` - Configuration files
  - `config.json` - Sequelize configuration
  - `database.js` - Database connection setup
- `models/` - Sequelize models
- `migrations/` - Database migrations
- `seeders/` - Database seeders
- `routes/` - API routes
- `controllers/` - Route controllers
- `services/` - Business logic
- `repositories/` - Data access layer
- `middlewares/` - Custom middlewares
- `utils/` - Utility functions

## API Documentation

Base URL: `http://localhost:3000`

### Endpoints

- `GET /` - Welcome message
- `GET /api/examples` - Get all examples
- `GET /api/examples/:id` - Get example by ID
- `POST /api/examples` - Create new example
- `PUT /api/examples/:id` - Update example
- `DELETE /api/examples/:id` - Delete example

## Development Workflow

1. Create a new model and migration:
```bash
npx sequelize-cli model:generate --name ModelName --attributes column1:string,column2:integer
```

2. Update the migration file if needed

3. Run the migration:
```bash
npx sequelize-cli db:migrate
```

4. Create repository, service, and controller files

5. Add routes to the application

6. Test the API endpoints 