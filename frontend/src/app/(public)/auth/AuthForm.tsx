"use client";

import { useState } from "react";
import { Calendar, DollarSign, Users } from "lucide-react";
import { Button, Input, Label, Card, CardContent } from "@/components/ui";
import { validate } from "@/schemas/validate";
import { loginSchema, registerSchema } from "@/schemas/authSchema";

export default function AuthForm({
  isLogin,
  serverError,
  isSubmitting,
  onSubmit,
  onToggleLogin,
  formData,
  onChange,
  onRoleChange,
}: {
  formData: any;
  isLogin: boolean;
  serverError: string | null;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (valid: boolean) => void;
  onToggleLogin: () => void;
  onRoleChange: (role: "CLIENT" | "PROVIDER") => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const schema = isLogin ? loginSchema : registerSchema;
    const result = validate(schema, formData);
    setErrors(result.errors);

    if (!result.valid) return;

    onSubmit(true);
  };

  return (
    <Card className="bg-card text-card-foreground">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {serverError && (
            <p className="text-sm text-red-500 text-center">{serverError}</p>
          )}

          <div>
            <Label htmlFor="email" className="mb-1 block">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="mb-1 block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="••••••••"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {!isLogin && (
            <>
              <div>
                <Label htmlFor="username" className="mb-1 block">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={onChange}
                  placeholder="yourusername"
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>

              <div>
                <Label htmlFor="name" className="mb-1 block">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              <div>
                <Label>Account Type</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => onRoleChange("CLIENT")}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      formData.role === "CLIENT"
                        ? "border-primary bg-card"
                        : "border-border hover:border-border"
                    }`}
                  >
                    <Users className="w-6 h-6 mx-auto mb-2 text-foreground" />
                    <div className="font-medium text-foreground">Client</div>
                    <div className="text-xs text-muted-foreground">
                      Book meetings
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRoleChange("PROVIDER")}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      formData.role === "PROVIDER"
                        ? "border-primary bg-card"
                        : "border-border hover:border-border"
                    }`}
                  >
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-foreground" />
                    <div className="font-medium text-foreground">Provider</div>
                    <div className="text-xs text-muted-foreground">
                      Offer slots
                    </div>
                  </button>
                </div>
              </div>

              {formData.role === "PROVIDER" && (
                <div>
                  <Label htmlFor="hourlyRate" className="mb-1 block">
                    Hourly Rate (USD)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="hourlyRate"
                      type="number"
                      name="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={onChange}
                      min="1"
                      className="pl-10 pt-4 placeholder:-translate-y-1"
                      placeholder="50"
                      required={formData.role === "PROVIDER"}
                    />
                  </div>
                  {errors.hourlyRate && (
                    <p className="text-red-500 text-sm">{errors.hourlyRate}</p>
                  )}
                </div>
              )}
            </>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </Button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={onToggleLogin}
                  className="font-medium text-foreground hover:underline cursor-pointer"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onToggleLogin}
                  className="font-medium text-foreground hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
