FROM node:20-slim

WORKDIR /usr/src/app

# Install netcat (Debian/Ubuntu)
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]