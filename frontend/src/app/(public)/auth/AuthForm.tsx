"use client";

import { Calendar, DollarSign, Users } from "lucide-react";
import { Button, Input, Label, Card, CardContent } from "@/components/ui";

export default function AuthForm({
  formData,
  isLogin,
  serverError,
  isSubmitting,
  onChange,
  onSubmit,
  onToggleLogin,
  onRoleChange,
}: {
  formData: any;
  isLogin: boolean;
  serverError: string | null;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onToggleLogin: () => void;
  onRoleChange: (role: "CLIENT" | "PROVIDER") => void;
}) {
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
                    step="0.01"
                    className="pl-10 pt-4 placeholder:-translate-y-1"
                    placeholder="50.00"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <Button
            onClick={onSubmit}
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
