import React from "react";
import { useNavigate } from "react-router-dom";


function ChatbotIcon() {
  const navigate = useNavigate();

  return (
    <div className="chatbot-icon" onClick={() => navigate("/chatbot")}>
      💬
    </div>
  );
}

export default ChatbotIcon;
