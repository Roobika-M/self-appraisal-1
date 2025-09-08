import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-muted/50"
                />
              </div>
              <Button type="submit" className="w-full" variant="academic">
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-3 bg-muted rounded-lg text-sm space-y-1">
              <p className="font-medium text-foreground">Demo Credentials:</p>
              <p className="text-muted-foreground">Username: admin, Password: password</p>
              <p className="text-muted-foreground">Username: officer, Password: college123</p>
            </div>
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