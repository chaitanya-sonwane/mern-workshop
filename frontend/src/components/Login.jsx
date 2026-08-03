import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/login", { email, password });
    if (res.data.role === "admin") {
      alert("Welcome Admin!");
      navigate("/dashboard"); // admin page
    } else {
      alert("Access denied: Only admin can login");
    }
  } catch (err) {
    alert("Invalid credentials or server error");
  }
};


  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
