require('dotenv').config();
const dns = require('dns');

// Fix SRV DNS lookup issues on local network setups
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Relative paths to models
const { HoldingsModel } = require('./models/HoldingsModel');
const { PositionsModel } = require('./models/PositionsModel');
const { OrdersModel } = require('./models/OrdersModel');
const { UsersModel } = require('./models/UsersModel');

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'zerodha_clone_secure_jwt_secret_key_2026';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Middleware to parse incoming JSON payload requests
app.use(express.json());


// 0. AUTH ROUTES

// POST: Sign up new user
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username, email, and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await UsersModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new UsersModel({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ success: false, message: 'Server error during signup', error: error.message });
  }
});

// POST: Sign in / Login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter both email and password' });
    }

    // Find user by email
    const user = await UsersModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
});

// GET: Verify JWT token
app.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});


// 1. HOLDINGS ROUTES

// GET: Fetch all holdings from database
app.get('/allHoldings', async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.status(200).json(allHoldings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 2. POSITIONS ROUTES

// GET: Fetch all positions from database
app.get('/allPositions', async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.status(200).json(allPositions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 3. ORDERS ROUTES

// GET: Fetch all orders from database
app.get('/allOrders', async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 });
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Place a new order
app.post('/newOrder', async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// 4. KITE AI COPILOT ROUTE
// POST /api/ai/copilot: Receives user question, analyzes MongoDB holdings, and responds with insights
app.post('/api/ai/copilot', async (req, res) => {
  try {
    const userMessage = (req.body.message || req.body.prompt || "").trim();

    // Step 1: Read actual holdings and recent orders from MongoDB
    const holdings = await HoldingsModel.find({});
    const orders = await OrdersModel.find({}).sort({ _id: -1 }).limit(5);

    // Step 2: Calculate key portfolio performance metrics
    let totalInvested = 0;
    let currentValue = 0;
    let gainers = [];
    let losers = [];

    holdings.forEach((h) => {
      const qty = Number(h.qty) || 0;
      const avg = Number(h.avg) || 0;
      const price = Number(h.price) || 0;
      const invested = avg * qty;
      const current = price * qty;
      const pnl = current - invested;
      const pnlPercent = invested > 0 ? (pnl / invested) * 100 : 0;

      totalInvested += invested;
      currentValue += current;

      const stockData = {
        name: h.name,
        qty,
        avg,
        price,
        pnl,
        pnlPercent,
        isLoss: h.isLoss || pnl < 0,
      };

      if (pnl >= 0) {
        gainers.push(stockData);
      } else {
        losers.push(stockData);
      }
    });

    gainers.sort((a, b) => b.pnlPercent - a.pnlPercent);
    losers.sort((a, b) => a.pnlPercent - b.pnlPercent);

    const totalPnL = currentValue - totalInvested;
    const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

    // Calculate diversification health score (0 to 100)
    let maxConcentration = 0;
    holdings.forEach((h) => {
      const weight = currentValue > 0 ? ((Number(h.price) * Number(h.qty)) / currentValue) * 100 : 0;
      if (weight > maxConcentration) maxConcentration = weight;
    });

    let healthScore = 88;
    if (maxConcentration > 50) healthScore = 62;
    else if (maxConcentration > 35) healthScore = 76;
    else if (holdings.length >= 4) healthScore = 94;

    const stats = {
      totalInvested,
      currentValue,
      totalPnL,
      totalPnLPercent,
      healthScore,
      holdingsCount: holdings.length,
    };

    // Step 3: Check if Google Gemini API key is available in .env
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiApiKey}`;
        const promptPayload = {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are Kite AI Copilot, an expert financial assistant on Zerodha's Kite trading platform.
Live User Portfolio:
- Total Invested: ₹${totalInvested.toFixed(2)}
- Current Portfolio Value: ₹${currentValue.toFixed(2)}
- Net P&L: ₹${totalPnL.toFixed(2)} (${totalPnLPercent.toFixed(2)}%)
- Health Score: ${healthScore}/100
- Holdings: ${holdings.map((h) => `${h.name} (${h.qty} shares, buy: ₹${h.avg}, curr: ₹${h.price}, net: ${h.net})`).join(', ')}
- Recent Orders: ${orders.map((o) => `${o.mode} ${o.qty} ${o.name} @ ₹${o.price}`).join(', ')}

User Question: "${userMessage}"

Respond cleanly with concise bullet points and emojis. Keep under 140 words.`,
                },
              ],
            },
          ],
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(promptPayload),
        });

        if (response.ok) {
          const data = await response.json();
          const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply) {
            // Also extract trade intent if user wants to buy/order a stock
            let action = null;
            const lowerQuery = userMessage.toLowerCase();
            const buyMatch =
              lowerQuery.match(/(?:buy|purchase|order for)\s+(\d+)?\s*([a-zA-Z]+)?/i) ||
              lowerQuery.match(/(?:buy|purchase|order for)\s+([a-zA-Z]+)\s*(\d+)?/i);
            if (buyMatch) {
              let stock = '';
              let qty = 1;
              if (isNaN(buyMatch[1])) {
                stock = (buyMatch[1] || '').toUpperCase();
                qty = parseInt(buyMatch[2], 10) || 1;
              } else {
                qty = parseInt(buyMatch[1], 10) || 1;
                stock = (buyMatch[2] || '').toUpperCase();
              }
              if (stock && stock.length >= 2 && stock !== 'SHARES' && stock !== 'STOCK') {
                action = { type: 'BUY', stock, qty };
              }
            }

            return res.status(200).json({
              reply: aiReply,
              action,
              portfolioStats: stats,
              source: 'gemini-ai',
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to built-in rule engine:', geminiError.message);
      }
    }

    // Step 4: Built-in Intelligent Financial Heuristic Engine (100% reliable fallback)
    const lowerQuery = userMessage.toLowerCase();

    // A. Detect Buy/Order intent: e.g. "Buy 10 INFY" or "Buy RELIANCE"
    const buyMatch =
      lowerQuery.match(/(?:buy|purchase|order for)\s+(\d+)?\s*([a-zA-Z]+)?/i) ||
      lowerQuery.match(/(?:buy|purchase|order for)\s+([a-zA-Z]+)\s*(\d+)?/i);

    if (buyMatch) {
      let stock = '';
      let qty = 1;
      if (isNaN(buyMatch[1])) {
        stock = (buyMatch[1] || '').toUpperCase();
        qty = parseInt(buyMatch[2], 10) || 1;
      } else {
        qty = parseInt(buyMatch[1], 10) || 1;
        stock = (buyMatch[2] || '').toUpperCase();
      }

      if (stock && stock.length >= 2 && stock !== 'SHARES' && stock !== 'STOCK') {
        return res.status(200).json({
          reply: `🎯 **Quick Trade Setup**\n\nI can help you place an order for **${qty} share(s)** of **${stock}**.\n\nClick the quick button below to open the Kite order window with pre-filled details!`,
          action: {
            type: 'BUY',
            stock: stock,
            qty: qty,
          },
          portfolioStats: stats,
          source: 'rule-engine',
        });
      }
    }

    // B. Check if user is asking about a specific holding stock (e.g. INFY, TCS)
    const matchedStock = holdings.find((h) => lowerQuery.includes(h.name.toLowerCase()));
    if (matchedStock) {
      const qty = Number(matchedStock.qty) || 0;
      const avg = Number(matchedStock.avg) || 0;
      const price = Number(matchedStock.price) || 0;
      const invested = avg * qty;
      const current = price * qty;
      const pnl = current - invested;
      const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;

      return res.status(200).json({
        reply: `📌 **Stock Analysis: ${matchedStock.name}**\n\n` +
          `• **Holdings**: ${qty} shares\n` +
          `• **Avg Buy Price**: ₹${avg.toFixed(2)}\n` +
          `• **Current Market Price**: ₹${price.toFixed(2)}\n` +
          `• **Invested Capital**: ₹${invested.toFixed(2)}\n` +
          `• **Current Value**: ₹${current.toFixed(2)}\n` +
          `• **Net Return**: ${pnl >= 0 ? '🟢 +' : '🔴 -'}₹${Math.abs(pnl).toFixed(2)} (${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%)\n\n` +
          `💡 **Insight**: ${
            pnlPct > 10
              ? 'Strong profit run! Consider setting a trailing stop-loss to lock in returns.'
              : pnlPct < -5
              ? 'Stock is currently in a drawdown. Verify company quarterly updates before averaging down.'
              : 'Trading within a steady accumulation zone.'
          }`,
        portfolioStats: stats,
        source: 'rule-engine',
      });
    }

    // C. Portfolio Health / Summary Query
    if (
      lowerQuery.includes('health') ||
      lowerQuery.includes('portfolio') ||
      lowerQuery.includes('how is my') ||
      lowerQuery.includes('pnl') ||
      lowerQuery.includes('profit') ||
      lowerQuery.includes('summary')
    ) {
      const topWinner = gainers[0];
      const topLoser = losers[0];

      return res.status(200).json({
        reply: `📊 **Portfolio Health & P&L Audit**\n\n` +
          `🛡️ **Diversification Score**: **${healthScore}/100** ${healthScore > 80 ? '(Healthy Diversification 🚀)' : '(High Concentration ⚠️)'}\n\n` +
          `💰 **Capital Snapshot**:\n` +
          `• **Total Invested**: ₹${totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 2 })}\n` +
          `• **Current Value**: ₹${currentValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}\n` +
          `• **Overall P&L**: ${totalPnL >= 0 ? '🟢 Profit: +' : '🔴 Loss: -'}₹${Math.abs(totalPnL).toLocaleString('en-IN', { maximumFractionDigits: 2 })} (${totalPnLPercent >= 0 ? '+' : ''}${totalPnLPercent.toFixed(2)}%)\n\n` +
          `🌟 **Highlights**:\n` +
          (topWinner ? `• 🏆 **Top Performer**: **${topWinner.name}** (+${topWinner.pnlPercent.toFixed(2)}%)\n` : '') +
          (topLoser ? `• 📉 **Underperformer**: **${topLoser.name}** (${topLoser.pnlPercent.toFixed(2)}%)\n\n` : '\n') +
          `💡 **Actionable Advice**:\n` +
          `1. **Risk Management**: Keep individual position size under 25% of total capital.\n` +
          `2. **Stop Loss**: Always protect capital with predefined risk-reward ratios.\n` +
          `3. **Review**: Rebalance your portfolio quarterly.`,
        portfolioStats: stats,
        source: 'rule-engine',
      });
    }

    // D. Gainers & Losers Query
    if (
      lowerQuery.includes('gainer') ||
      lowerQuery.includes('best') ||
      lowerQuery.includes('top') ||
      lowerQuery.includes('loser') ||
      lowerQuery.includes('worst')
    ) {
      let text = `📈 **Top Assets Performance**:\n\n`;
      if (gainers.length > 0) {
        text += `**Top Gainers (Profit)**:\n`;
        gainers.slice(0, 3).forEach((g) => {
          text += `• **${g.name}**: +${g.pnlPercent.toFixed(2)}% (+₹${g.pnl.toFixed(2)})\n`;
        });
      }
      if (losers.length > 0) {
        text += `\n**Underperformers (Loss)**:\n`;
        losers.slice(0, 3).forEach((l) => {
          text += `• **${l.name}**: ${l.pnlPercent.toFixed(2)}% (-₹${Math.abs(l.pnl).toFixed(2)})\n`;
        });
      }
      return res.status(200).json({
        reply: text,
        portfolioStats: stats,
        source: 'rule-engine',
      });
    }

    // E. Educational / Market Knowledge
    if (lowerQuery.includes('pe') || lowerQuery.includes('p/e') || lowerQuery.includes('ratio')) {
      return res.status(200).json({
        reply: `📚 **What is the P/E Ratio?**\n\nThe Price-to-Earnings (P/E) ratio measures a company's share price relative to its per-share earnings (EPS).\n\n• **Formula**: \`Current Stock Price ÷ EPS\`\n• **High P/E**: Markets anticipate rapid growth, but the valuation might be expensive.\n• **Low P/E**: Could signify an undervalued bargain or slower growth.\n\n💡 *Tip: Always benchmark P/E against industry peers!*`,
        portfolioStats: stats,
        source: 'rule-engine',
      });
    }

    if (lowerQuery.includes('stop loss') || lowerQuery.includes('sl')) {
      return res.status(200).json({
        reply: `🛡️ **Understanding Stop-Loss (SL)**\n\nA Stop-Loss is an automatic risk-control order placed to close a position once the price drops to a designated threshold.\n\n• **Why use it?**: Prevents catastrophic loss and removes emotional trading decisions.\n• **Rule of thumb**: Never risk more than **1% to 2%** of your total portfolio on any single trade!`,
        portfolioStats: stats,
        source: 'rule-engine',
      });
    }

    // F. Default Helpful Greeting
    return res.status(200).json({
      reply: `👋 Hi! I am your **Kite AI Copilot**.\n\nHere are some things you can ask me:\n\n• 📊 *"How is my portfolio doing?"*\n• 🏆 *"Show my top gainers and losers"*\n• 🔍 *"Analyze INFY"* (or any stock you own)\n• ⚡ *"Buy 10 shares of RELIANCE"*\n• 📚 *"What is Stop-Loss?"* or *"Explain P/E ratio"*`,
      portfolioStats: stats,
      source: 'rule-engine',
    });
  } catch (error) {
    console.error('Error in Kite AI Copilot:', error.message);
    res.status(500).json({ error: 'Failed to process AI copilot query' });
  }
});


// Async server initialization
const startServer = async () => {
  try {
    await mongoose.connect(uri);
    console.log('DB connected successfully');

    app.listen(PORT, () => {
      console.log(`App is started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
};

startServer();