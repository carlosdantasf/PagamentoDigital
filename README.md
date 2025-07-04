# pagamentos-digitais

Este repositório contém uma aplicação para a venda de passagens com funcionalidades de filtragem, exibição de dados e gerenciamento de tickets.

## Requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em seu sistema:

- [Node.js](https://nodejs.org/en/download/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js)

## Instalação

### Clonar o Repositório

Primeiro, clone o repositório do GitHub para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/projeto-passagens.git
cd projeto-passagens
```

### Instalar Dependências

Esta aplicação depende de vários pacotes Node.js. Para instalar todas as dependências, execute:

```bash
npm install
```
Para instalar todas as dependências, mas somente as de produção, execute:

```bash
npm install --production
```

## Configuração do Ambiente

Você precisará configurar algumas variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
VITE_PERSISTENCE_API=http://api.sua-api-de-persistencia.com
VITE_AUTOMATION_API=http://api.sua-api-de-automacao.com
```

Certifique-se de substituir `http://api.sua-api-de-persistencia.com` e `http://api.sua-api-de-automacao.com` pela URL correta da API de persistência e automação.

## Inicialização do Projeto

### Modo de Desenvolvimento

Para iniciar o projeto em modo de desenvolvimento, execute:

```bash
npm run dev
```

Isso iniciará um servidor de desenvolvimento e você pode acessar a aplicação em `http://localhost:5173/`.

### Modo de Produção

Para gerar uma build de produção, execute:

```bash
npm run build
```

Para servir a build de produção, execute:

```bash
npm start
```

## Outros Comandos Úteis

### Testes

Para executar os testes, utilize:

```bash
npm run test
```

### Linters

Para verificar a qualidade do código utilizando ESLint, execute:

```bash
npm run lint
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