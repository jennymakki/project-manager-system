import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";
import { useTheme } from "../design-system/theme-provider";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { theme } = useTheme();

  const { registerUser, loading } = useAuth();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await registerUser(email, password);

    navigate("/dashboard", { replace: true });
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
            Create your workspace
          </h2>

          <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary }}>
            Start organizing projects, managing tasks and collaborating with your team in one place.
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
            Register
          </h1>

          <form
            onSubmit={handleRegister}
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
              Create account
            </Button>

            <Link
              to="/login"
              style={{
                color: theme.colors.primary,
                fontSize: 14,
                textAlign: "center",
              }}
            >
              Already have an account? Sign in
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
}