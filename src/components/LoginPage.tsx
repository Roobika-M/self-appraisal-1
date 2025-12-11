import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }).toString(),
        credentials: "include",
      });
      if (res.redirected || res.ok) {
        try {
          sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
        } catch {}
        navigate(from, { replace: true });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Unable to connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-background" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Faculty Appraisal System</h1>
          <p className="text-muted-foreground">College Administration Portal</p>
        </div>

        {/* Login Form */}
        <Card className="border shadow-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-5 h-5 bg-foreground rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-background rounded-sm"></div>
              </div>
            </div>
            <CardTitle className="text-lg">Office Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the faculty appraisal system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="bg-muted/50"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-muted/50"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" variant="academic">
                Sign In
              </Button>
            </form>

            
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          © 2025 College Faculty Appraisal System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;