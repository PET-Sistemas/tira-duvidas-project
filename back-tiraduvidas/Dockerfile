# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
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

# Instalar dependências de produção E dev (necessário para migrations)
RUN npm install --legacy-peer-deps

# Copiar código compilado da etapa anterior
COPY --from=builder /usr/src/app/dist ./dist

# Copiar código fonte (necessário para migrations)
COPY --from=builder /usr/src/app/src ./src

# Copiar tsconfig (necessário para ts-node)
COPY --from=builder /usr/src/app/tsconfig*.json ./

# Expor porta
EXPOSE 8080

# Comando padrão
CMD ["node", "dist/main"]