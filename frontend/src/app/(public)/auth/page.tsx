"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, DollarSign, Users } from "lucide-react";
import { Button, Input, Label, Card, CardContent } from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { handleSignup, handleLogin } from "@/fetchers";
import authService from "@/services/authService";

export default function AuthPage() {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login); // Zustand action

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "CLIENT" as "CLIENT" | "PROVIDER",
    hourlyRate: "",
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      let body;

      if (isLogin) {
        body = await handleLogin({
          email: formData.email,
          password: formData.password,
        });
      } else {
        body = await handleSignup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          role: formData.role,
          hourlyRate: formData.hourlyRate,
        });
      }

      authService.setTokens(body.token, body.refreshToken);

      loginStore(body.user);

      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 text-foreground">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Calendar className="w-10 h-10 text-foreground" />
            <span className="text-3xl font-bold text-foreground">MeetBook</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "Sign in to continue" : "Join our marketplace today"}
          </p>
        </div>

        <Card className="bg-card text-card-foreground">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {serverError && (
                <p className="text-sm text-red-500 text-center">
                  {serverError}
                </p>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, role: "CLIENT" }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.role === "CLIENT"
                            ? "border-primary bg-card"
                            : "border-border hover:border-border"
                        }`}
                      >
                        <Users className="w-6 h-6 mx-auto mb-2 text-foreground" />
                        <div className="font-medium text-foreground">
                          Client
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Book meetings
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, role: "PROVIDER" }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.role === "PROVIDER"
                            ? "border-primary bg-card"
                            : "border-border hover:border-border"
                        }`}
                      >
                        <Calendar className="w-6 h-6 mx-auto mb-2 text-foreground" />
                        <div className="font-medium text-foreground">
                          Provider
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Offer slots
                        </div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="hourlyRate"
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        min="1"
                        step="0.01"
                        className="pl-10"
                        placeholder="50.00"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Please wait..."
                  : isLogin
                  ? "Sign In"
                  : "Create Account"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <span className="font-medium text-foreground">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="font-medium text-foreground">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        <Link href="/">
          <Button variant="ghost" className="mt-4 w-full text-foreground">
            ← Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
