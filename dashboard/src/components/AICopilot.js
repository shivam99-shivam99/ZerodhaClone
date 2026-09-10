import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { GeneralContext } from "./GeneralContext";
import "./AICopilot.css";

const QUICK_PROMPTS = [
  "📊 Portfolio Health",
  "🏆 Top Gainers & Losers",
  "⚡ Buy 5 INFY",
  "🛡️ Stop-Loss Advice",
  "📚 Explain P/E Ratio",
];

const INITIAL_GREETING = {
  role: "assistant",
  text: `👋 Welcome to **Kite AI Copilot**!\n\nI can analyze your portfolio, track gainers/losers, assist with trade setup, or answer stock market questions.\n\nClick a prompt above or ask anything below!`,
};

function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const { openBuyWindow } = useContext(GeneralContext);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && typeof messagesEndRef.current?.scrollIntoView === "function") {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (customText) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    // Add user message to chat
    const userMsg = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage("");
    setIsLoading(true);

    try {
      // Send request to Express backend
      const response = await axios.post("http://localhost:3002/api/ai/copilot", {
        message: textToSend,
      });

      const data = response.data;
      const aiMsg = {
        role: "assistant",
        text: data.reply || "I analyzed your portfolio, but could not generate a response.",
        action: data.action || null,
        stats: data.portfolioStats || null,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Copilot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Sorry, I could not connect to the AI service. Please ensure your backend server is running on port 3002.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  const handleExecuteAction = (action) => {
    if (action && action.type === "BUY" && action.stock) {
      // Trigger the existing Kite BuyActionWindow
      if (typeof openBuyWindow === "function") {
        openBuyWindow(action.stock);
        setIsOpen(false); // Close copilot so user sees the order modal
      }
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          className="kite-ai-launcher"
          onClick={() => setIsOpen(true)}
          title="Open Kite AI Copilot"
        >
          <span className="kite-ai-sparkle-icon">✨</span>
          <span>Kite AI</span>
        </button>
      )}

      {/* Slide-Up Drawer */}
      {isOpen && (
        <div className="kite-ai-drawer">
          {/* Header */}
          <div className="kite-ai-header">
            <div className="kite-ai-header-left">
              <div className="kite-ai-logo-badge">✨</div>
              <div>
                <h4 className="kite-ai-title">Kite AI Copilot</h4>
                <div className="kite-ai-subtitle">
                  <span className="kite-ai-status-dot"></span>
                  <span>Live Portfolio Intelligence</span>
                </div>
              </div>
            </div>
            <div className="kite-ai-header-actions">
              <button
                className="kite-ai-icon-btn"
                onClick={handleClearChat}
                title="Clear conversation"
              >
                🔄
              </button>
              <button
                className="kite-ai-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="kite-ai-body">
            {/* Quick Prompt Chips */}
            <div className="kite-ai-chips-wrapper">
              <div className="kite-ai-chips-title">Suggested Inquiries</div>
              <div className="kite-ai-chips-scroll">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    className="kite-ai-chip"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isLoading}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`kite-ai-message-row ${msg.role}`}>
                <div className="kite-ai-bubble">
                  {msg.text}

                  {/* Trade Action Card if AI triggered an order suggestion */}
                  {msg.action && msg.action.type === "BUY" && (
                    <div className="kite-ai-action-card">
                      <button
                        className="kite-ai-action-btn"
                        onClick={() => handleExecuteAction(msg.action)}
                      >
                        ⚡ Open Buy Window ({msg.action.qty} {msg.action.stock})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="kite-ai-message-row assistant">
                <div className="kite-ai-typing">
                  <span className="kite-ai-dot"></span>
                  <span className="kite-ai-dot"></span>
                  <span className="kite-ai-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <div className="kite-ai-footer">
            <form
              className="kite-ai-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                className="kite-ai-input"
                placeholder="Ask about portfolio, buy stocks, P/E ratio..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="kite-ai-send-btn"
                disabled={!inputMessage.trim() || isLoading}
                title="Send message"
              >
                ➤
              </button>
            </form>
            <div className="kite-ai-disclaimer">
              Powered by Kite AI • Informational analysis, not SEBI investment advice
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AICopilot;
