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
        localStorage.setItem("adminToken", res.data.token); // ✅ store token
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Access denied: Only admin can login");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error or invalid credentials");
      }
    }
  };
const handleLogin = async () => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("adminToken", data.token);
    window.location.href = "/dashboard";
  } else {
    alert(data.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg border border-blue-600">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded font-semibold text-white transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
