FROM node:latest

WORKDIR /USR/backend


COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8080


CMD ["npm" ,"start"]