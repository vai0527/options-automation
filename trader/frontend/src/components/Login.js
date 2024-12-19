import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { username, password, remember_me: rememberMe });
      const { token, remember_token, session_expiration } = response.data;

      // Store session token locally
      localStorage.setItem("token", token);

      // Optionally store remember token (secure this if stored long-term)
      if (rememberMe) {
        localStorage.setItem("remember_token", remember_token);
      }

      alert(`Session expires at: ${session_expiration}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember Me
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
