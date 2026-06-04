import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

import { Button } from "../app/components/ui/button";
import { Input } from "../app/components/ui/input";
import { Card } from "../app/components/ui/card";
import { useTheme } from "../design-system/theme-provider";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { theme } = useTheme();
  const { registerUser, loading, error } = useAuth();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(email, password);
  };

  return (
    <div
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
      <div style={{ width: 380, display: "flex", flexDirection: "column", gap: 12 }}>

        <Card style={{ padding: 20, background: theme.colors.surface }}>
          <h2 style={{ fontWeight: 700, marginBottom: 6 }}>
            Create your workspace
          </h2>

          <p style={{ fontSize: 13, opacity: 0.7 }}>
            Start organizing projects and tasks.
          </p>
        </Card>

        <Card style={{ padding: 24, background: theme.colors.surface }}>
          <h1 style={{ marginBottom: 16 }}>Register</h1>

          <form
            onSubmit={handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />

            {/* PASSWORD (samma pattern som Login) */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Input
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
              <p style={{ color: "red", fontSize: 13 }}>
                {error}
              </p>
            )}

            <Button loading={loading} type="submit" disabled={loading}>
              Create account
            </Button>

            <Link to="/login" style={{ textAlign: "center", fontSize: 13 }}>
              Already have an account?
            </Link>
          </form>
        </Card>

      </div>
    </div>
  );
}