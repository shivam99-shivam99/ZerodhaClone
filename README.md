# Zerodha Kite Full-Stack  🚀

A modern, full-stack clone of Zerodha's trading and investment ecosystem, featuring the **Zerodha Landing Platform**, the **Kite Trading Dashboard**, and an intelligent **Kite AI Copilot** powered by Google Gemini 3.6 Flash.

---

## 🏗️ Architecture & Project Structure

The project is structured into three decoupled layers:

| Directory | Role | Tech Stack | Port |
| :--- | :--- | :--- | :--- |
| [`frontend/`](./frontend) | Public marketing & landing site | React 19, React Router 7, Vanilla CSS | `3001` |
| [`dashboard/`](./dashboard) | Kite trading platform (Holdings, Orders, Positions, AI Copilot) | React 19, Chart.js, Emotion/MUI, Axios | `3000` |
| [`backend/`](./backend) | REST API & Database engine | Node.js, Express, MongoDB (Mongoose), JWT, Google Gemini API | `3002` |

---

## ✨ Key Features

- **📊 Kite Trading Dashboard**:
  - Live Watchlist with real-time stock price changes.
  - Interactive Holdings & Positions tracking with automatic P&L and investment calculations.
  - Buy/Sell order windows with instant execution and MongoDB persistence.
  - Visual portfolio analytics and charts.
- **🤖 Kite AI Copilot**:
  - Live portfolio audits (calculates diversification health score, total profit/loss, and risk factors).
  - Stock deep-dive analysis (average buy price, returns, trailing stop-loss recommendations).
  - Quick trade action triggering (`⚡ Open Buy Window`) directly inside the chat interface.
  - Powered by **Google Gemini 3.6 Flash** with a built-in deterministic heuristic rule engine fallback.
- **🌐 Zerodha Landing Site**:
  - Clean responsive landing pages (Hero, Signup, Login, Products, Pricing).
  - Authentication flow connected to the backend.

---

## ⚡ Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory (see `.env.example`):
```properties
PORT=3002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key   # Optional: Google Gemini AI Copilot
```
Start the server:
```bash
npm start
```

### 3. Dashboard Setup (Kite Trading Platform)
```bash
cd dashboard
npm install
npm start
```
Opens on [http://localhost:3000](http://localhost:3000).

### 4. Frontend Setup (Landing Site)
```bash
cd frontend
npm install
npm start
```
Opens on [http://localhost:3001](http://localhost:3001).

---

## 🧪 Testing

Run automated tests for the Kite AI Copilot component:
```bash
cd dashboard
npm test -- AICopilot.test.js --watchAll=false
```

---

## 🛡️ Security Note

Environment configuration files (`.env`) and credentials are automatically ignored via `.gitignore` to prevent secret leakage. Use `backend/.env.example` as a template for your own environment setup.
