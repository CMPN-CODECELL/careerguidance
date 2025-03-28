import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatbotIcon.css";

function ChatbotIcon() {
  const navigate = useNavigate();

  return (
    <div className="chatbot-icon" onClick={() => navigate("/chatbot")}>
      💬
    </div>
  );
}

export default ChatbotIcon;
