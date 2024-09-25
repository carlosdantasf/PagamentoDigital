# Projeto Persistence API

Este repositório contém a API de persistência utilizada para gerenciar dados de tickets e outras entidades.

## Requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em seu sistema:

- [Node.js](https://nodejs.org/en/download/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (ou outro banco de dados configurado)

## Instalação

### Clonar o Repositório

Primeiro, clone o repositório do GitHub para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/persistence-api.git
cd persistence-api
```

### Instalar Dependências

Para instalar todas as dependências necessárias, execute:

```bash
npm install
```

## Configuração do Ambiente

Você precisará configurar algumas variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=nome-do-banco
PORT=3001
```

Certifique-se de substituir os valores pelas informações corretas do seu banco de dados e porta da API.

## Inicialização do Projeto

### Modo de Desenvolvimento

Para iniciar o projeto em modo de desenvolvimento, execute:

```bash
npm run dev
```

Isso iniciará o servidor com hot-reload, ideal para desenvolvimento.

### Modo de Produção

Para gerar uma build de produção e iniciar o projeto, execute:

```bash
npm run build
npm start
```

## Executar Migrações

Se o seu projeto utiliza Sequelize ou outro ORM com migrações, você precisa rodar as migrações antes de iniciar o servidor:

```bash
npx sequelize-cli db:migrate
```

## Testes

Para executar os testes, utilize:

```bash
npm run test
```

## Contribuição

Para contribuir com este projeto, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie um branch: `git checkout -b minha-nova-feature`.
3. Faça suas modificações e commit: `git commit -m 'Adicionar nova feature'`.
4. Envie para o branch: `git push origin minha-nova-feature`.
5. Abra um pull request.

## Licença

Este projeto está licenciado sob os termos da [MIT License](./LICENSE).