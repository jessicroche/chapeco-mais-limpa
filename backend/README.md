# ⚙️ Backend — Chapecó Mais Limpa

O backend contém a estrutura de servidor desenvolvida com **Node.js** e **Express**.

Durante o desenvolvimento do projeto, essa camada foi utilizada para organizar a comunicação entre o frontend e os dados da aplicação através de uma arquitetura dividida em rotas, controllers, services, repositories e models.

Atualmente, o frontend utiliza diretamente o Firebase para as principais operações de autenticação e persistência de dados. A estrutura do backend permanece no projeto como parte da implementação desenvolvida.

## 🛠️ Tecnologias utilizadas

- **Node.js** — ambiente de execução do JavaScript no servidor.
- **Express** — framework utilizado para criação do servidor e das rotas HTTP.
- **Firebase Admin / Firestore** — acesso aos dados do Firebase pelo ambiente do servidor.
- **JavaScript** — linguagem utilizada na implementação do backend.

## 📂 Estrutura

```text
backend/
├── server.js
├── package.json
├── package-lock.json
│
├── config/
│   └── firebase.js
│
├── models/
│   ├── usuario-model.js
│   ├── conteudo-model.js
│   └── acao-model.js
│
├── repositories/
│   ├── usuario-repository.js
│   ├── conteudo-repository.js
│   └── acao-repository.js
│
├── services/
│   ├── usuario-service.js
│   ├── conteudo-service.js
│   └── acao-service.js
│
├── controllers/
│   ├── usuario-controller.js
│   ├── conteudo-controller.js
│   └── acao-controller.js
│
└── routes/
    ├── usuario-routes.js
    ├── conteudo-routes.js
    └── acao-routes.js
```