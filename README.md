# Zerodha Kite Full-Stack  🚀

A modern, full-stack clone of Zerodha's trading and investment ecosystem, featuring the **Zerodha Landing Platform**, the **Kite Trading Dashboard**, and an intelligent **Kite AI Copilot** powered by Google Gemini.

---

## 🏗️ Architecture & Project Structure

The project can be run as a unified full-stack application (ready for **Vercel** deployment) or independently:

| Directory | Role | Tech Stack |
| :--- | :--- | :--- |
| [`dashboard/`](./dashboard) | **Unified React App**: Landing pages (`/`, `/about`, `/pricing`, `/login`, `/signup`) + Kite Trading Platform (`/dashboard/*`) | React 19, React Router 7, Chart.js, MUI, Axios |
| [`api/`](./api) | **Serverless REST API**: Vercel-ready serverless function endpoints | Node.js, Express, MongoDB (Mongoose), JWT, Google Gemini |
| [`backend/`](./backend) | **Standalone Express Backend**: For local standalone development | Node.js, Express, MongoDB, Port `3002` |
| [`frontend/`](./frontend) | *Legacy standalone landing pages* | Preserved for reference |

---

## ✨ Key Features

- **📊 Kite Trading Dashboard (`/dashboard`)**:
  - Live Watchlist with real-time stock price changes.
  - Interactive Holdings & Positions tracking with automatic P&L and investment calculations.
  - Buy/Sell order windows with instant execution and MongoDB persistence.
  - Visual portfolio analytics and charts.
- **🤖 Kite AI Copilot**:
  - Live portfolio audits (calculates diversification health score, total profit/loss, and risk factors).
  - Stock deep-dive analysis (average buy price, returns, trailing stop-loss recommendations).
  - Quick trade action triggering (`⚡ Open Buy Window`) directly inside the chat interface.
  - Powered by **Google Gemini** with a built-in deterministic heuristic rule engine fallback.
- **🌐 Zerodha Landing Platform (`/`)**:
  - Clean responsive landing pages (Hero, Signup, Login, Products, Pricing, Support).
  - Integrated authentication redirecting directly to the Kite Dashboard.

---

## 🚀 1-Click Deployment to Vercel

This repository is pre-configured with [`vercel.json`](./vercel.json) to deploy both the React frontend and the Express serverless API together.

### Deployment Steps:
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: unified frontend and dashboard for Vercel deployment"
   git push origin main
   ```
2. In **Vercel Dashboard**, click **Add New...** → **Project** → Import your GitHub repository (`shivam99-shivam99/ZerodhaClone`).
3. Set **Framework Preset** to **Other** (or **Create React App**).
4. Add the following **Environment Variables** in Vercel:
   - `MONGO_URL`: Your MongoDB Atlas connection string (`mongodb+srv://...`)
   - `JWT_SECRET`: A secure secret string for JWT authentication
   - `GEMINI_API_KEY`: *(Optional)* Your Google Gemini API key for AI Copilot
5. Click **Deploy**!
   - Root `/` serves the Zerodha landing pages.
   - `/dashboard` serves the Kite trading platform.
   - `/api/*` routes to the serverless Express API.

---

## ⚡ Local Development

### 1. Unified App (Recommended)
```bash
# Start backend API (Port 3002)
cd backend
npm install
npm start

# In a separate terminal, start unified React app (Port 3000)
cd dashboard
npm install
npm start
```
- Landing pages: [http://localhost:3000](http://localhost:3000)
- Kite Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Backend API: [http://localhost:3002](http://localhost:3002)

---

## 🧪 Testing

Run automated tests for the Kite AI Copilot component:
```bash
cd dashboard
npm test -- AICopilot.test.js --watchAll=false
```
