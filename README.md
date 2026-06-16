# ⚔️ Code Battle Arena

## 🏗️ Base Ecosystem

- **Design:** [Code Arena Design PDF](https://github.com/user-attachments/files/27923855/AI-Powered.Code.Battle.Platform.pdf)
- **Built in:** 3 weeks 
- **Demo:** https://www.youtube.com/watch?v=0_qlwxfly-g
---

## Frontend — React

```bash
cd frontend
npm install
npm run dev        # Start the frontend
```

---

## Backend — Node.js

```bash
cd backend-node
npm install
npm run db:seed    # Run database seeders
npm run dev        # Start the backend

```

---

## Stack & Tools

### 🌱 Tech Stack: MERN (MongoDB, Express, React, Node.js)

### ⚙️ Judge0 & 🐳 Docker (Sandbox) — Code Execution Engine

[https://judge0.com](https://judge0.com) · [https://www.docker.com](https://www.docker.com)

REST API for multi-language code execution (Support for 60+ languages), used to power coding challenges and battles. Judge0 is self-hosted locally using Docker containers via WSL, fully isolating user code execution from the host operating system. Docker Compose manages multi-container orchestration, including volumes and environment variables, ensuring user scripts run securely within the sandbox.

---

### 🌐 WebSockets

[https://socket.io](https://socket.io)

Bidirectional, low-latency WebSocket architecture enabling real-time communication between the frontend and backend — used to synchronize match timers, update live scores, and stream code between players.

---

### 🖊️ Monaco Editor

[https://microsoft.github.io/monaco-editor](https://microsoft.github.io/monaco-editor)

The same editor powering VS Code, integrated here for a rich in-browser code editing experience.

---

### 🤖 Groq AI API

[https://console.groq.com](https://console.groq.com)

Model: `llama-3.1-8b-instant` via Groq API (free tier: 14,400 requests/day).

Used to provide AI-powered feedback on:
- Code quality
- Performance optimization
- Improvement suggestions

---

### 🔀 React Router

[https://reactrouter.com](https://reactrouter.com)

Client-side routing for seamless, dynamic navigation throughout the application.

---

### 🎨 shadcn/ui

[https://ui.shadcn.com](https://ui.shadcn.com)

A collection of accessible, customizable, and modern UI components for React.

---

### 💨 Tailwind CSS

[https://tailwindcss.com](https://tailwindcss.com)

Utility-first CSS framework for building responsive, modern interfaces rapidly.

---

### 🔐 Clerk Authentication

[https://clerk.com/docs](https://clerk.com/docs)

Full-featured authentication solution covering sign-up, login, and OAuth — production-ready out of the box.

---

### ✳️ Lucide Icons

[https://lucide.dev](https://lucide.dev)

Open-source icon library with customizable styles, designed for clean and consistent UI.

---

### 🏛️ Clean Architecture

Codebase structured around separation of concerns with clear boundaries between layers (presentation, domain, data).

---

## Judge0 API : 
**References:**
- [Building a Code Editor with Monaco Editor and Judge0 API](https://medium.com/@adwait.purao/building-a-code-editor-with-monaco-editor-and-judge-0-api-b8288c0d13ae)
- [How to Self-Host Judge0 Locally](https://denishoti.medium.com/how-to-self-host-judge0-api-on-your-pc-locally-all-you-need-to-know-ad8a2b64fd1)
- [Video Tutorial](https://www.youtube.com/watch?v=QOmc3u1Aev8)


### 📊 Chart.js *(planned)*

[https://www.chartjs.org/docs/latest](https://www.chartjs.org/docs/latest)

Library for building interactive charts and visualizations (statistics, performance tracking, etc.).

---

### ✨ Framer Motion *(planned)*

[https://www.framer.com/motion](https://www.framer.com/motion)

Animation library for React, used to create fluid transitions and dynamic interface effects.

---

### 🟥 Redis *(planned)*

[https://redis.io](https://redis.io)

In-memory data store planned for caching leaderboard data, managing session state, and implementing rate limiting for code submission requests.
