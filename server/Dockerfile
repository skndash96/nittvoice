# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

RUN npm run p-gen \
    && printf "npm run p-prod\nnpm run start\n" > entrypoint.sh

CMD ["/bin/sh", "./entrypoint.sh"]