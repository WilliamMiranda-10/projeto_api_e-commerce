# 🛒 API E-commerce

API RESTful desenvolvida com Node.js, Express e PostgreSQL para simular operações de um sistema de e-commerce.

O projeto foi desenvolvido com foco em boas práticas de desenvolvimento backend, organização de código, segurança, validação de dados e integridade das operações no banco de dados.

## 🚀 Tecnologias utilizadas

- Node.js
- Express 5
- JavaScript (ES Modules)
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt
- Zod
- Git e GitHub

## ⚙️ Funcionalidades implementadas

- Cadastro, consulta, atualização e exclusão de usuários.
- Autenticação de usuários com JWT.
- Criptografia de senhas utilizando bcrypt.
- Cadastro, consulta, atualização e exclusão de produtos.
- Criação de compras associadas ao usuário autenticado.
- Associação de produtos às compras.
- Validação de dados com Zod.
- Proteção de rotas com middleware de autenticação.
- Tratamento de erros e respostas HTTP apropriadas.
- Transações no PostgreSQL para garantir a integridade das compras.

## 🏗️ Organização do projeto

O projeto utiliza uma organização por responsabilidades, separando rotas, controllers, repositories, validações e demais componentes da aplicação.

Principais diretórios:

- `controllers/`: gerenciamento das requisições e respostas.
- `repository/`: comunicação com o banco de dados.
- `routes/`: definição dos endpoints.
- `middlewares/`: autenticação e validação.
- `schemas/`: esquemas de validação com Zod.
- `database/`: estrutura SQL do banco de dados.
- `errors/`: tratamento de erros personalizados.
- `utils/`: funções auxiliares.
- `config/`: configurações utilizadas pela aplicação.

## 💻 Como executar o projeto

### Pré-requisitos

- Node.js instalado.
- PostgreSQL instalado.
- Git.

### 1. Clone o repositório

```bash
git clone https://github.com/WilliamMiranda-10/projeto_api_e-commerce.git
```

Entre na pasta:

```bash
cd projeto_api_e-commerce
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=seu_banco

JWT_SECRET=sua_chave_secreta
```

Configure o banco de dados PostgreSQL e execute o script SQL disponibilizado no projeto.

**Importante:** o arquivo `.env` não deve ser enviado ao GitHub.

### 4. Execute a aplicação

```bash
npm run dev
```

A aplicação será iniciada na porta 3000.

## 📌 Endpoints

### Autenticação

| Método | Endpoint | Descrição               |
| ------ | -------- | ----------------------- |
| POST   | `/login` | Autenticação do usuário |

### Usuários

| Método | Endpoint     | Descrição            |
| ------ | ------------ | -------------------- |
| GET    | `/users`     | Lista usuários       |
| GET    | `/users/:id` | Busca usuário por ID |
| POST   | `/users`     | Cadastra usuário     |
| PUT    | `/users/:id` | Atualiza usuário     |
| DELETE | `/users/:id` | Remove usuário       |

### Produtos

| Método | Endpoint        | Descrição            |
| ------ | --------------- | -------------------- |
| GET    | `/products`     | Lista produtos       |
| GET    | `/products/:id` | Busca produto por ID |
| POST   | `/products`     | Cadastra produto     |
| PUT    | `/products/:id` | Atualiza produto     |
| DELETE | `/products/:id` | Remove produto       |

### Compras

| Método | Endpoint     | Descrição                         |
| ------ | ------------ | --------------------------------- |
| POST   | `/purchases` | Cria uma compra com seus produtos |

### Perfil

| Método | Endpoint   | Descrição                                |
| ------ | ---------- | ---------------------------------------- |
| GET    | `/profile` | Verifica o acesso do usuário autenticado |

## 🔐 Segurança e integridade dos dados

A API utiliza JWT para autenticação e proteção de rotas, bcrypt para criptografia de senhas e Zod para validação das informações recebidas.

Na criação de compras, são utilizadas transações no PostgreSQL, com `COMMIT` e `ROLLBACK`, evitando que uma operação incompleta deixe dados inconsistentes no banco.

## 🧪 Testes

As funcionalidades foram verificadas manualmente utilizando o Insomnia, incluindo autenticação, validações, operações CRUD e comportamento das transações.

## 🔮 Melhorias planejadas

- [ ] Listagem de compras do usuário autenticado.
- [ ] Consulta de uma compra específica, incluindo seus produtos.
- [ ] Cancelamento de compras.
- [ ] Implementação de status para acompanhar o andamento das compras.
- [ ] Testes automatizados para os principais fluxos da API.

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido para aprofundar conhecimentos em desenvolvimento backend com Node.js, trabalhar com banco de dados relacional e aplicar conceitos de autenticação, validação, organização de código e integridade de dados.

## 👨‍💻 Autor

**William Miranda**

Desenvolvedor Backend em formação.

- GitHub: [WilliamMiranda-10](https://github.com/WilliamMiranda-10)

---

⭐ Se este projeto foi útil para você, considere deixar uma estrela no repositório!
