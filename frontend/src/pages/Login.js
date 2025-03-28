import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Styling for Login Page

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy authentication logic (Replace with API call)
    if (email === "test@example.com" && password === "password") {
      alert("Login Successful!");
      navigate("/dashboard"); // Redirect to Dashboard (Add Dashboard page)
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to CareerGuide</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
