# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

# source

https://www.youtube.com/watch?v=Paz0gnODPE0

## tags

ORM,REST ORM, typescript, backend database, mysql, node

## docementation

https://typeorm.io/#/

## snippets

sync data with mysql (only in development:)

```
npm run typeorm schema:sync
```

drop all tables"

```
npm run typeorm schema:drop
```

generate migrations (use in production):

```
npm run typeorm migrations: generate -- -n create-schema
```

run migrations (use in production):

```
npm run typeorm migrations:run
```

revert migrations (use in production):

```
npm run typeorm migrations:revert
```

```sql
CREATE DATABASE typeorm_trutorial;
```
