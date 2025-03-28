import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="chat-input">
      <input 
        type="text" 
        placeholder="Ask me anything..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        onKeyDown={(e) => e.key === "Enter" && handleSend()} 
      />
      <button onClick={handleSend}>
        <Send className="send-icon" />
      </button>
    </div>
  );
}
