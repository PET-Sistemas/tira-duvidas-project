FROM node:20

WORKDIR /usr/src/app

# Install netcat
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "run", "start:dev"]