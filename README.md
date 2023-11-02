# eNeighbor Server Side

## Setup repo to start development

```bash
# Switch to the appropriate Node version and install the required node_modules
$ nvm use
$ npm i

# Check if Docker is running
$ docker ps 

# Start the PostGre database using Docker
$ docker compose up dev-db -d
## Alternatively,
$ npm run db:dev:up

# Migrate the schema to the database using Prisma
## Copy and rename the file to .env, and fill in the necessary variables
$ cp .env.example .env 
## Connect to the database and perform the migration
$ npx prisma migrate dev 

# Start development in watch mode
$ npm run start:dev
```


## To change table (add Column or Rename)
- Please refer to the documentation here: https://www.basedash.com/blog/how-to-rename-a-table-or-column-using-prisma-migrations
- For more details, you can also check the Prisma documentation on customizing Migration: https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/customizing-migrations

## Pros of Prisma:
- Lightweight ORM, making it easy to integrate into projects.
- Developer-friendly, as it acts and generates types based on the schema for use in modules.

## Weakness of Prisma:
- Have yet to have a back up function for data stored in DataBase, the recovery steps needs manually works