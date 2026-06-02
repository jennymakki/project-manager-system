import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/api/authApi";

import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";
import { useTheme } from "../design-system/theme-provider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await login(email, password);
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
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
        padding: 16,
      }}
    >
      <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        
        {/* Intro card */}
        <Card
          style={{
            padding: 20,
            background: theme.colors.surface,
            color: theme.colors.text,
          }}
        >
          <h2
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Welcome back
          </h2>

          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
              lineHeight: 1.5,
            }}
          >
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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
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