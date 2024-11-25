# Documentação de Inicialização do Projeto

Este documento fornece instruções para inicializar o projeto, subir os containers do banco de dados, aplicar as migrações, e iniciar o servidor de desenvolvimento com o Swagger UI para testes da API.

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js e npm instalados

## Passos para Inicialização

1. **Subir o container do banco de dados**

   Primeiro, suba o container Docker do banco de dados com o comando abaixo:

   ```bash
   cd docker
   docker compose up --build

2. **Rodar Migrações no Banco de Dados**

    Após os containers estarem em execução, rode as migrações do banco de dados para inicializar a estrutura necessária na aplicação:

    ```bash
    npm run migration:run

3. Iniciar o Servidor de Desenvolvimento e Swagger UI

    Com o banco de dados configurado e as migrações aplicadas, inicie o servidor de desenvolvimento para realizar testes na API usando o Swagger UI:

    ```bash
    npm run start:dev
    ```
    
    Isso iniciará o servidor e disponibilizará o Swagger UI para testes da API no ambiente de desenvolvimento.

***Notas***

_Erros e Logs: Se ocorrerem erros, verifique os logs dos containers com docker compose logs para mais detalhes._

_Acessar Swagger UI: Após iniciar o servidor de desenvolvimento, acesse o Swagger UI em http://localhost:4000/docs para interagir e testar os endpoints da API._