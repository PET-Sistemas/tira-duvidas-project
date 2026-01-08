FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código
COPY . .

# Receber variável de ambiente do build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build de produção
RUN npm run build

# Etapa de produção
FROM node:20-alpine

WORKDIR /app

# Copiar build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar apenas serve ou vite preview
RUN npm ci --only=production

EXPOSE 3000

# Rodar em modo preview
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]