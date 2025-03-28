import { useState } from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";
import "../styles/chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I’m your career guide. How can I help you today?", sender: "bot" }
  ]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages([...messages, { text, sender: "user" }]);
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "That’s a great question! Let me assist you.", sender: "bot" }
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
}
