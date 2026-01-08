# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar package. json e package-lock.json
COPY package*.json ./

# Instalar dependências com legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copiar código fonte
COPY . .

# Compilar o TypeScript
RUN npm run build

# Etapa 2: Produção
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar package.json
COPY package*.json ./

# Instalar APENAS dependências de produção com legacy-peer-deps
RUN npm install --omit=dev --legacy-peer-deps

# Copiar código compilado da etapa anterior
COPY --from=builder /usr/src/app/dist ./dist

# Expor porta
EXPOSE 8080

# Comando padrão
CMD ["node", "dist/main"]