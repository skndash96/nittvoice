# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

RUN printf "npm run p-push\nnpm run start\n" > entrypoint.sh

CMD ["/bin/sh", "./entrypoint.sh"]