FROM node:15

WORKDIR /app

COPY package.json ./

# RUN npm install
# w nawiasie jedna spacja z przodu i z tyłu
RUN if [ "$NODE_ENV" = "development" ]; \
 then npm install; \
 else npm install --only production; \
 fi

COPY . .

ENV PORT 5003

EXPOSE $PORT

CMD ["node", "index.js"]