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
# Descarta TUDO da etapa anterior (node_modules, código fonte, ferramentas)
# Usa imagem do Nginx Alpine (~20MB) para servir arquivos estáticos
# Resultado final: Imagem final contém APENAS Nginx + arquivos compilados (muito menor)
FROM nginx:alpine

# Copiar build para o nginx
# /app/dist = Pasta com código compilado da etapa de build
# /usr/share/nginx/html = Pasta padrão do Nginx para servir arquivos estáticos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
# Substitui a configuração padrão e adiciona fallback para React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]