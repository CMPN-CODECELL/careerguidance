import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    const res = await axios.post("http://localhost:5000/api/chat", { message });
    setResponse(res.data.reply);
  };

  return (
    <div className="page">
      <h1>Career Guidance Chatbot</h1>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default Chatbot;
