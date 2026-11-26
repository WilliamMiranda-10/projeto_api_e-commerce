# 🛒 API E-commerce

API backend para um sistema de e-commerce, desenvolvida com foco em aprendizado, boas práticas e portfólio profissional.

Este projeto simula funcionalidades básicas de um e-commerce, como gerenciamento de usuários e estrutura para expansão futura (produtos, pedidos, autenticação, etc).

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JavaScript (ES Modules)**
* **Git & GitHub**

---

## 📁 Estrutura do Projeto

```
projeto_api_e-commerce/
├── controllers/        # Lógica das requisições
├── repository/         # Acesso e operações no banco de dados
├── routes/             # Definição das rotas da API
├── app.js              # Arquivo principal da aplicação
├── db.js               # Configuração da conexão com o banco
├── package.json        # Dependências e scripts
├── package-lock.json   # Versões das dependências
├── testes.js           # Arquivo de testes/manipulações
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md
```

---

## ⚙️ Como Rodar o Projeto

### 🔹 Pré-requisitos

* Node.js instalado
* PostgreSQL instalado
* Git

---

### 🔹 1. Clonar o repositório

```bash
git clone https://github.com/WilliamMiranda-10/projeto_api_e-commerce.git
```

```bash
cd projeto_api_e-commerce
```

---

### 🔹 2. Instalar dependências

```bash
npm install
```

---

### 🔹 3. Configurar variáveis de ambiente

Crie um arquivo **.env** na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=seu_banco
```

> ⚠️ O arquivo `.env` não é versionado por segurança.

---

### 🔹 4. Rodar a aplicação

```bash
npm start
```

Ou, se usar nodemon:

```bash
npm run dev
```

---

## 📌 Rotas (exemplo)

### 👤 Usuários

* `GET /users` → Lista usuários
* `GET /users/:id` → Busca usuário por ID
* `POST /users` → Cria usuário
* `PUT /users/:id` → Atualiza usuário
* `DELETE /users/:id` → Remove usuário

---

## 🧠 Objetivo do Projeto

Este projeto foi criado com o objetivo de:

* Praticar desenvolvimento backend
* Aplicar boas práticas com Node.js e PostgreSQL
* Demonstrar organização de código e uso do Git
* Servir como projeto de portfólio

---

## 🔮 Próximas Funcionalidades

* [ ] Autenticação (JWT)
* [ ] Produtos
* [ ] Pedidos
* [ ] Relacionamento entre tabelas
* [ ] Testes automatizados

---

## 👨‍💻 Autor

**William Miranda**
Desenvolvedor Backend (em formação)

* GitHub: [WilliamMiranda-10](https://github.com/WilliamMiranda-10)

---

⭐ Se este projeto te ajudou de alguma forma, deixe uma estrela no repositório!
