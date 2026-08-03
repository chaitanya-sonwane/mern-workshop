import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });

      // ✅ Check status and role together
      if (res.status === 200 && res.data.role === "admin") {
        alert("Welcome Admin!");
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Access denied: Only admin can login");
      }
    } catch (err) {
      console.error("Login error:", err);
      // ✅ Show backend message if available
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error or invalid credentials");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
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
}

export default Login;
