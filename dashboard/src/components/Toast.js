import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: "#1db954", icon: "✓" },
    error:   { bg: "#df514c", icon: "✕" },
    info:    { bg: "#4184f3", icon: "ℹ" },
  };
  const { bg, icon } = colors[type] || colors.success;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: bg,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: "500",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        zIndex: 99999,
        animation: "slideInToast 0.3s ease",
        minWidth: "240px",
        maxWidth: "360px",
      }}
    >
      <span
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          fontWeight: "700",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
          lineHeight: 1,
          opacity: 0.8,
          padding: 0,
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes slideInToast {
          from { transform: translateX(100px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
