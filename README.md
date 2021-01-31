# TODO:


sprawdzić dlaczego tworzy sid przy błednych danych logowania
select dla submit i user - ukrycie nadmiarowych pól w responsie
required fields
mode indicator
dodać pozostałe pola wniosku
podsumowanie błędów
spinner zapis
zamienić na useHistory
submit template
mail template
ewquired fields
help modals


useRollbar na frontendzie - może jak tylko 500?
protecteed firlds - czy ma załączniki, czy ma wniosek+?
xss?
panel postępu?
skeleton?
swr(https://www.youtube.com/watch?v=v9DVxf8mSv4)?
Logger (zainstalowany, skonfigurowany)?
add tailwindcss (https://www.youtube.com/watch?v=gOQ31Kc8H5E&t=78s)?



# FIXES
  secure: false, //TODO - update when SSL implemented
ip i przegladarka w logach
buttons over modal i Attachments
klejne bdne logoewania po blokadzie

security https://dev.to/demetrakopetros/security-in-node-js-and-express-the-bare-minimum-part-3-54f3


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