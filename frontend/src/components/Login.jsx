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

      if (res.status === 200 && res.data.role === "admin") {
        alert("Welcome Admin!");
        localStorage.setItem("adminToken", res.data.token);
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Access denied: Only admin can login");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error or invalid credentials");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg border border-blue-600 p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-500">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 p-2 sm:p-3 rounded font-semibold text-white transition-colors duration-200"
          >
            Login
          </button>
        </form>

        {/* Optional footer for small screens */}
        <p className="text-center text-gray-400 text-xs sm:text-sm mt-6">
          © 2026 Workshop Admin Portal
        </p>
      </div>
    </div>
  );
}

export default Login;
