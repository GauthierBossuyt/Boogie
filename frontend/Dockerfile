FROM node:latest

WORKDIR /USR/src/app

COPY ./frontend/package*.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g

COPY ./frontend ./

CMD ["npm", "start"]