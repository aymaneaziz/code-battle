# 🚀  Code Battle Arena

## 🧰 Écosystème de Base

* 📐 **Conception :** [PDF de Conception de Code Arena](https://github.com/user-attachments/files/27923855/AI-Powered.Code.Battle.Platform.pdf)
* 🥞 **Stack Technique :** MERN (MongoDB, Express, React, Node.js)

---

## 🤖 Frontend — React note (cmd)

```bash
cd frontend
npm install
npm run dev //to start front

```

---

## ⚙️ Backend — Node note (cmd)

```bash
cd backend-node
npm install
npm run db:seed //to send the seeders
npm run dev //to start backend


---------------------------------------------------------------------------------
//special
npm install --save-dev nodemon  //always restart server whenever make any changes
```

## 🧰 Stack & Outils (en cours)
---
### ⚖️ Judge0 API ✅( Docker Hosted)

[https://judge0.com/](https://judge0.com/)
o  API permettant l’exécution de code en plusieurs langages pour les challenges et battles.

o Building a Code Editor with Monaco Editor and Judge 0 API
https://medium.com/@adwait.purao/building-a-code-editor-with-monaco-editor-and-judge-0-api-b8288c0d13ae

o How to self-host Judge0 API on your PC locally | All you need to know
https://denishoti.medium.com/how-to-self-host-judge0-api-on-your-pc-locally-all-you-need-to-know-ad8a2b64fd1

https://www.youtube.com/watch?v=QOmc3u1Aev8&list=WL

---

### 🐳 Docker & SandBox  ✅

[https://www.docker.com/](https://www.docker.com/)
**Judge0** a été hébergée localement à l'aide de conteneurs Docker (via WSL) afin d'isoler complètement l'exécution du code utilisateur du système d'exploitation hôte. 

Gestion d'environnements isolés via WSL et configuration d'une couche d'orchestration multi-conteneurs avec **Docker Compose**, gérant les volumes et les variables d'environnement pour exécuter de manière sécurisée les scripts utilisateur dans le bac à sable (sandbox) de Judge0.

### 🌐 WebSockets  ✅

[https://socket.io/](https://socket.io/)
Propulsé par une architecture de WebSockets bidirectionnels à faible latence (`socket.io`) pour une communication instantanée entre le frontend et le backend. Permet de synchroniser instantanément les minuteurs de match, de mettre à jour les scores en direct et de partager le flux de code en direct entre les joueurs.

---

### 🧠 Monaco Editor ✅

[https://microsoft.github.io/monaco-editor/](https://microsoft.github.io/monaco-editor/)
Éditeur de code puissant utilisé dans VS Code, idéal pour l’édition en ligne.

---
### 🤖 API Grok AI ✅
Modèle utilisé : llama-3.1-8b-instant via l'API Grok (free tier: 14,400 requests/day ).
Feedback IA :
o qualité du code
o optimisation
o suggestions d’amélioration


### ⚛️ React Router ✅

[https://reactrouter.com/home](https://reactrouter.com/home)
o Gestion des routes côté frontend pour créer une navigation fluide et dynamique dans l’application.

---

### 🎨 shadcn/ui ✅

[https://ui.shadcn.com/](https://ui.shadcn.com/)
o Bibliothèque de composants UI modernes, accessibles et personnalisables pour React.

---

### 💨 Tailwind CSS ✅

[https://tailwindcss.com/](https://tailwindcss.com/)
o Framework CSS utility-first pour construire rapidement des interfaces modernes et responsives.

---

### 🔐 Clerk Authentication ✅

[https://clerk.com/docs](https://clerk.com/docs)
o Solution complète d’authentification (login, signup, OAuth) prête pour production.

---

### 🎯 Lucide Icons ✅

[https://lucide.dev/](https://lucide.dev/)
o Modern open-source icon library with customizable colors, perfect for clean and consistent UI design.

### 📐 Clean Architecture ✅

### 📊 Chart.js ❌

[https://www.chartjs.org/docs/latest/](https://www.chartjs.org/docs/latest/)
o Bibliothèque pour créer des graphiques interactifs et dynamiques (stats, performances, etc.).

---
### ✨ Framer Motion ❌

[https://www.framer.com/motion/](https://www.framer.com/motion/)
o Bibliothèque d’animations fluide pour React afin de créer des interfaces modernes et dynamiques.

---
