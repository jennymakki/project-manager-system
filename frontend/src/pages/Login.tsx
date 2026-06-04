import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";
import { useTheme } from "../design-system/theme-provider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { theme } = useTheme();
  const { loginUser, loading, error } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <div
      className="animate-page-fade-in"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.colors.background,
        color: theme.colors.text,
        padding: 16,
      }}
    >
      <div
        style={{
          width: 380,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <Card
          className="animate-fade-up"
          style={{ padding: 20, background: theme.colors.surface }}
        >
          <h2 style={{ fontWeight: 700, marginBottom: 6 }}>Welcome back</h2>

          <p style={{ fontSize: 13, opacity: 0.7 }}>
            Sign in to manage your boards and tasks.
          </p>
        </Card>

        <Card
          className="animate-fade-up animate-delay-1"
          style={{ padding: 24, background: theme.colors.surface }}
        >
          <h1 style={{ marginBottom: 16 }}>Log in</h1>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <Input
              className="input-animated"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Input
                className="input-animated"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                style={{ paddingRight: 40 }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={{
                  position: "absolute",
                  right: 10,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  opacity: 0.7,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <p
                className="animate-error"
                style={{ color: "red", fontSize: 13 }}
              >
                {error}
              </p>
            )}

            <Button
              className="button-animated"
              loading={loading}
              type="submit"
              disabled={loading}
            >
              Log in
            </Button>

            <Link to="/register" style={{ textAlign: "center", fontSize: 13 }}>
              Create account
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
}
