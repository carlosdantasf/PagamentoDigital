# Projeto Automation Microservice com Puppeteer

Este repositório contém um microserviço de automação utilizando Puppeteer para realizar tarefas automatizadas.

## Requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em seu sistema:

- [Node.js](https://nodejs.org/en/download/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/get-npm) (gerenciador de pacotes do Node.js)

## Instalação

### Clonar o Repositório

Primeiro, clone o repositório do GitHub para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/automation-ms-puppeteer.git
cd automation-ms-puppeteer
```

### Instalar Dependências

Para instalar todas as dependências necessárias, execute:

```bash
npm install
```

## Configuração do Ambiente

Você precisará configurar algumas variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
PUPPETEER_EXECUTABLE_PATH=/path/to/your/chrome-or-chromium
PORT=3002
```

Certifique-se de substituir `/path/to/your/chrome-or-chromium` pelo caminho correto do executável do Chrome ou Chromium e a porta conforme necessário.

## Inicialização do Projeto

### Modo de Desenvolvimento

Para iniciar o projeto em modo de desenvolvimento, execute:

```bash
npm run dev
```

Isso iniciará o servidor com hot-reload, ideal para desenvolvimento.

### Modo de Produção

Para gerar uma build de produção, execute:

```bash
npm run build
```

### Instalação das Dependências de Produção

Se você deseja instalar apenas as dependências de produção, use o seguinte comando:

```bash
npm install --production
```

Isso é útil para ambientes de produção onde você não precisa das dependências de desenvolvimento.

## Scripts Disponíveis

### Lint

Para verificar a qualidade do código utilizando ESLint, execute:

```bash
npm run lint
```

### Testes

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