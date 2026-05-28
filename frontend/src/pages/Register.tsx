import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register, login } from "../features/auth/api/authApi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await register(email, password);

    const res = await login(email, password);

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          placeholder="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          placeholder="password"
        />

        <button className="bg-black text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}