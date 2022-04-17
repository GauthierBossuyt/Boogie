FROM node:latest

WORKDIR /USR/database


COPY package*.json ./

RUN npm install --silent

COPY ./ ./

EXPOSE 8080


CMD ["npm" ,"start"]