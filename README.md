# Tira Dúvidas

Este é um projeto que consiste em um backend desenvolvido com NestJS e um frontend utilizando Vite. O banco de dados utilizado é PostgreSQL, e todo o ambiente pode ser executado via Docker.

## Requisitos

Para rodar o projeto, você precisa ter instalado:

- [Node.js 20.\*](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Como clonar o projeto e instalar as dependências

```bash
# Clonar o repositório
git clone https://github.com/PET-Sistemas/tira-duvidas-project

# Entrar na pasta do frontend
cd front

# Instalar dependências do frontend
npm install

# Voltar para a raiz do projeto
cd ..
```

## Como rodar cada serviço isoladamente no Docker

### Rodando apenas o Backend

Para rodar somente o backend (API + banco de dados), utilize:

```bash
docker-compose up api db
```

O backend será iniciado na porta `8080` e o swagger estará disponível em `http://localhost:8080/docs`.

### Rodando apenas o Frontend

Caso queira rodar apenas o frontend, use:

```bash
docker-compose up frontend
```

O frontend será iniciado na porta `3000` e se conectará automaticamente ao backend (se ele estiver rodando). O frontend fica disponível em `http://localhost:3000`.

### Rodando Todo o Projeto

Para iniciar todo o projeto com backend, frontend e banco de dados:

```bash
docker-compose up
```

## Padronização de Commits

Para manter um padrão de versionamento no projeto, siga as recomendações de commits semânticos descritas no seguinte guia:

🔗 [Commits Semânticos](https://www.conventionalcommits.org/pt-br/v1.0.0/)

### Fluxo Simples de Git Branching

Para criar uma nova funcionalidade ou alteração, siga este fluxo:

1. Criar uma nova branch:

   ```bash
   git checkout -b feat/nome-da-nova-feat
   ```

2. Fazer os commits necessários:

   ```bash
   git add .
   git commit -m "feat: descrição da alteração"
   ```

3. Enviar a branch para o repositório remoto:

   ```bash
   git push --set-upstream origin feat/nome-da-nova-feat
   ```

4. Chamar alguém para revisar as suas alterações e fazer o merge pela interface do GitHub.