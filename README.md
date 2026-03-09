# Tira Dúvidas

Este é um projeto que consiste em um backend desenvolvido com NestJS e um frontend utilizando React e Vite. O banco de dados utilizado é o PostgreSQL, e todo o ambiente está em containers Docker.

## Requisitos

Para rodar o projeto, você precisa ter instalado:

- [Node.js 20.\*](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## ✅ Como clonar o projeto, instalar as dependências e rodar APENAS O FRONT

```bash
# Clonar o repositório
git clone https://github.com/PET-Sistemas/tira-duvidas-project

# Entrar na pasta do frontend
cd front

# Instalar dependências do frontend
npm install

# Subir o front
npm run start

# Voltar para a raiz do projeto se quiser rodar algo no docker
cd ..
```

## ✅ Como desenvolver usando a API da VM rodando o front localmente

```bash
1. Substitua no .env:
  VITE_API_URL=https://tiraduvidashomolog.facom.ufms.br/api/

2. Rode o front:
  npm install
  npm run server

3. Acesse a documentação da API para ver as rotas e retornos (Swagger):
  - https://tiraduvidashomolog.facom.ufms.br/api/docs
  - https://tiraduvidashomolog.facom.ufms.br/api/openapi.json
```

## ✅ Como rodar cada serviço isoladamente no Docker

### Rodando apenas o Backend

Para rodar somente o backend (API + Migrations + banco de dados), utilize:

```bash
docker compose -f docker-compose.yml up db migrations api
```

O backend será iniciado na porta `8080` e o swagger estará disponível em `http://localhost:8080/docs`.

### Rodando apenas o Frontend

Caso queira rodar apenas o frontend, use:

```bash
docker compose -f docker-compose.yml up front
```

O frontend será iniciado na porta `3000` e se conectará automaticamente ao backend (se ele estiver rodando). O frontend fica disponível em `http://localhost:3000`.

### Rodando Todo o Projeto

Para iniciar todo o projeto com backend, frontend e banco de dados:

```bash
docker compose -f docker-compose.yml up
```

## ✅ Como criar Branch, realizar Commit e realizar Pull Request

Para manter um padrão de versionamento no projeto, siga as recomendações de commits semânticos descritas no seguinte guia:

🔗 [Commits Semânticos](https://www.conventionalcommits.org/pt-br/v1.0.0/)

Para criar uma nova funcionalidade ou alteração, siga o padrão em: 

🔗 [Branchs Semânticas](https://conventional-branch.github.io/) 

Passos para Pull Requests:

1. Criar uma nova branch:

   ```bash
   git checkout -b feat/nome-da-nova-feat
   ```

2. Fazer os commits necessários:

   ```bash
   git add .
   git commit -m "feat: descrição da alteração"
   ```

3. Atualizar sua branch com as novas alterações

  ```bash
  git pull origin develop --no-rebase
  ```

4. Enviar a branch para o repositório remoto:

   ```bash
   git push origin feat/nome-da-nova-feat
   ```

5. Chamar alguém para revisar as suas alterações e fazer o PR pela interface do GitHub.