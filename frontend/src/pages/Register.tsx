import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register, login } from "../features/auth/api/authApi";
import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";

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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card>
        <h1 style={{ marginBottom: 16 }}>Register</h1>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />

          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          <Button type="submit">Register</Button>
        </form>
      </Card>
    </div>
  );
}