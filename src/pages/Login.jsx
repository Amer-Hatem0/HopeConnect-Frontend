import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
     localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify({ role: res.data.role }));

      const { role } = JSON.parse(atob(res.data.token.split('.')[1]));
      navigate(role === "admin" ? "/dashboard" : "/orphans");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded shadow-md w-96 text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-400 mb-2 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded">
          Login
        </button>
        <p className="text-sm mt-4 text-center">
  Don't have an account? <a href="/register" className="text-purple-400 hover:underline">Register</a>
</p>

      </form>
    </div>
  );
}

export default Login;
