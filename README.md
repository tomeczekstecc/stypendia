## częste

### portainer

docker run -d -p 9000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

### down
 docker-compose down -v

### run dev server
docker-compose -f docker-compose.yml  -f docker-compose.dev.yml up -d -V --build

### run prod server
docker-compose -f docker-compose.yml  -f docker-compose.prod.yml up -d --build