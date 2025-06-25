# 🎮 Jogo da Forca - Projeto Final de Front-End

Um jogo da forca interativo, moderno e totalmente responsivo, criado com React + Vite, com suporte a CRUD de palavras, ranking de jogadores, com o desafio de importação/exportação. 

---

## 🚀 Tecnologias Utilizadas

- React 19
- Vite
- JavaScript (ESModules)
- JSON Server (Backend)
- CSS3 personalizado
- Fonte [Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible)

---

## 📁 Estrutura do Projeto

📦forca-frontend
┣ 📂src
┃ ┣ 📂assets # Estilos e fontes
┃ ┣ 📂components # Componentes reutilizáveis (Header, Keyboard etc.)
┃ ┣ 📂pages # Páginas principais (Game, Ranking, Admin etc.)
┃ ┣ 📂services # (futuramente para integrações)
┃ ┣ App.jsx
┃ ┣ routes.jsx # Rotas do React Router
┃ ┗ main.jsx
┣ db.json # Banco de dados fake para JSON Server
┣ package.json
┣ vite.config.js


---

## 🧩 Funcionalidades

- ✅ Tela de boas-vindas com input de nome
- ✅ Jogo da forca funcional com tentativas e teclado interativo
- ✅ Ranking de jogadores baseado na pontuação
- ✅ CRUD completo de palavras com descrição (admin)
- ✅ Importar/exportar palavras via clipboard
- ✅ Totalmente responsivo e estilizado

---

## 🖥️ Rodando o Projeto

### 1. Instalar dependências
```bash
npm install

Iniciar o backend (JSON Server)
npx json-server --watch db.json --port 3000

Iniciar o frontend
npm run dev

🧪 Rotas da Aplicação
Rota	Página
/	    Tela inicial
/game	Jogo da forca
/ranking	Ranking de jogadores
/admin-palavras	Administração de palavras (CRUD)