# TODO:

draft
panel nawigacji
panel postępu
spinner zapis
refactor to styled-components
export messages + concat dev messaGES
swr(https://www.youtube.com/watch?v=v9DVxf8mSv4)
load files(https://www.youtube.com/watch?v=2Oov8miYK-g&t=1s)
auto logout
csrf
dodać pozostałe pola wniosku
submit template



rollbar?
Logger (zainstalowany, skonfigurowany)?
add tailwindcss (https://www.youtube.com/watch?v=gOQ31Kc8H5E&t=78s)?



# FIXES
undefined nie jest poprawnym adresem email
divider horizontally
ip w logach

różnica w czasie w trakcie twiorzenia użytkownika?



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

## connect mysql outside a dockerz
```sh
docker exec -it readit_db_1 mysql -u root -p
```

## drop schemas - clear db
```sh
npm run typeorm schema:drop
```

## generate migrations
```sh
npm run typeorm migration:generate -- --name create-users-table
```

## run migrations
```sh
npm run typeorm migration:run
```
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


## Logging
https://bmshamsnahid.medium.com/log-activity-in-node-application-44f9bc2ac46b

https://www.datadoghq.com/blog/node-logging-best-practices/

## mongo odm tut
https://www.youtube.com/watch?v=qXZ6LcC_qb8&t=245s