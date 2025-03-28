<h1 align="center" style="font-weight: bold;">Desafio Fullstack - API e Página de Perfil Evoé</h1>

<p align="center">
  <a href="#technologies">Tecnologias</a> • 
  <a href="#requirements">Requisitos</a> • 
  <a href="#started">Iniciando a Aplicação</a> • 
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- **NodeJS** com **Express**
- **MySQL**
- **Typescript**
- **ReactJS**
- **Sequelize**
- **Vite**

<h2 id="requirements">🚀 Requisitos</h2>

<p>
  O desafio consiste em desenvolver uma API REST em NodeJS que permita gerenciar usuários/apoiadores, bem como uma página de perfil utilizando ReactJS para visualização desses dados. A aplicação será dividida em duas partes:
</p>

<h3>Parte 1: API REST em NodeJS</h3>
- O serviço deve permitir:
  - Incluir um novo usuário ao sistema (requisição POST)
  - Atualizar um usuário/apoiador já cadastrado (requisição PUT)
  - Listar todos os usuários cadastrados (requisição GET)
  - Detalhar um usuário específico (requisição GET por ID)

<h3>Parte 2: Página de Perfil em ReactJS</h3>
- Desenvolver uma interface de usuário utilizando o Design System Evoé para visualização das informações cadastradas na API, com exibição dos dados do perfil de forma clara e intuitiva.

<h2 id="started">🚀 Iniciando a aplicação</h2>

<h3>Pré-requisitos</h3>
- **NodeJS** (v16 ou superior recomendado)
- **MySQL** para banco de dados (ou equivalente)

<h3>Configuração do Banco de Dados</h3>
Antes de rodar a aplicação, configure seu banco de dados MySQL e crie um banco de dados com o nome configurado na variável de ambiente `DB_NAME`.

<h3>Variáveis de ambiente (.env)</h2>

- Backend:

```yaml
PORT =

DB_NAME    =
DB_USER    =
DB_PASS    =
DB_HOST    =
DB_DIALECT =
```
- Frontend:

```yaml
VITE_API =
```

<h3>Instalando as dependências</h3>

```bash
$ npm install
```

## Execução

- Backend:

```bash
# development
$ npm start
```

- Frontend:

```bash
# development
$ npm run dev
```