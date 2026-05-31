import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register, login } from "../features/auth/api/authApi";
import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";
import { useTheme } from "../design-system/theme-provider";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(email, password);

      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <Card
        style={{
          padding: 24,
          background: theme.colors.surface,
          color: theme.colors.text,
        }}
      >
        <h1 style={{ marginBottom: 16 }}>Register</h1>

        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: 320,
          }}
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

          <Button loading={loading} type="submit">
            Register
          </Button>

          <Link
            to="/login"
            style={{ color: theme.colors.primary, fontSize: 14 }}
          >
            Already have an account?
          </Link>
        </form>
      </Card>
    </div>
  );
}