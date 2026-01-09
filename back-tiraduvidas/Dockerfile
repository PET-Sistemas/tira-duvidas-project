# Multi-stage Build

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
# Nova imagem limpa sem código TypeScript, ferramentas de build, etc
# Mais leve e segura (menos superfície de ataque)
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
# --omit=dev -> NÃO instala ts-node e devDependencies
RUN npm install --omit=dev --legacy-peer-deps

# Copiar código compilado da etapa anterior
# Copia apenas JavaScript compilado da etapa de build
# Não copia node_modules, código TypeScript, testes, etc
COPY --from=builder /usr/src/app/dist ./dist

# Expor porta
EXPOSE 8080

# Comando padrão
CMD ["node", "dist/main"]