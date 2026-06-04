import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";
import { useTheme } from "../design-system/theme-provider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { theme } = useTheme();

  const { loginUser, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await loginUser(email, password);

    navigate("/dashboard");
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
        padding: 16,
      }}
    >
      <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        
        <Card
          style={{
            padding: 20,
            background: theme.colors.surface,
            color: theme.colors.text,
          }}
        >
          <h2 style={{ fontSize: theme.typography.fontSize.lg, fontWeight: 700, marginBottom: 6 }}>
            Welcome back
          </h2>

          <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary }}>
            Sign in to manage your boards, tasks and collaborate with your team.
          </p>
        </Card>

        <Card
          style={{
            padding: 24,
            background: theme.colors.surface,
            color: theme.colors.text,
          }}
        >
          <h1 style={{ marginBottom: 16, fontSize: 20, fontWeight: 700 }}>
            Login
          </h1>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
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
              Login
            </Button>

            <Link
              to="/register"
              style={{
                color: theme.colors.primary,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Create account
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
}