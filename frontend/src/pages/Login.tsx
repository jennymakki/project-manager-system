import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../features/auth/api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await login(email, password);

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="border p-2 rounded"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border p-2 rounded"
        />

        <button className="bg-black text-white p-2 rounded">
          Login
        </button>

        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}