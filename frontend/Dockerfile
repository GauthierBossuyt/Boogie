FROM node:latest

WORKDIR /USR/src/app

COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.0 -g --silent

COPY ./ ./

CMD ["npm", "run", "start"]