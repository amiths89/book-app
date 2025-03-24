FROM node:22-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

ENV PORT=8080

EXPOSE 8080 

COPY . .

CMD ["npm", "start"]