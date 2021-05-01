## częste

### down
 docker-compose down -v

### run dev server
docker-compose -f docker-compose.yml  -f docker-compose.dev.yml up -d -V --build

### run prod server
docker-compose -f docker-compose.yml  -f docker-compose.prod.yml up -d -V --build