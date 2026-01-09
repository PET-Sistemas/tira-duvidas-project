# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm install --legacy-peer-deps

# Copiar código
COPY . .

# Receber variável de ambiente do build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build de produção
RUN npm run build

# Etapa 2: Produção com Nginx
FROM nginx:alpine

# Copiar build para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]