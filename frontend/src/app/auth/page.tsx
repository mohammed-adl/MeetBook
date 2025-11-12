"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "client" as "client" | "provider",
    hourlyRate: "",
  });

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async () => {
    // TODO: Call your backend API here
    console.log("Form submitted:", formData);

    // Example: After successful API call
    // login({
    //   id: response.id,
    //   email: formData.email,
    //   name: formData.name,
    //   role: formData.role,
    //   hourlyRate: parseFloat(formData.hourlyRate)
    // });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Calendar className="w-10 h-10 text-black" />
            <span className="text-3xl font-bold text-black">MeetBook</span>
          </div>
          <h2 className="text-2xl font-bold text-black">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Sign in to continue" : "Join our marketplace today"}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
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
                    />
                  </div>

                  <div>
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, role: "client" }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.role === "client"
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Users className="w-6 h-6 mx-auto mb-2 text-black" />
                        <div className="font-medium text-black">Client</div>
                        <div className="text-xs text-gray-600">
                          Book meetings
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, role: "provider" }))
                        }
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.role === "provider"
                            ? "border-black bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Calendar className="w-6 h-6 mx-auto mb-2 text-black" />
                        <div className="font-medium text-black">Provider</div>
                        <div className="text-xs text-gray-600">Offer slots</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.role === "provider"
                        ? "Rate you charge clients per hour"
                        : "Your budget for booking sessions"}
                    </p>
                  </div>
                </>
              )}

              <Button onClick={handleSubmit} className="w-full">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-600 hover:text-black"
              >
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <span className="font-medium text-black">Sign up</span>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <span className="font-medium text-black">Sign in</span>
                  </>
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        <Link href="/">
          <Button variant="ghost" className="mt-4 w-full">
            ← Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
