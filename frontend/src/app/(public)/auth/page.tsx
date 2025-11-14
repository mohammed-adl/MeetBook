"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import AuthForm from "./AuthForm";

import { useUserStore } from "@/store/userStore";
import { handleSignup, handleLogin } from "@/fetchers";
import authService from "@/services/authService";

export default function AuthPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
    role: "CLIENT" as "CLIENT" | "PROVIDER",
    hourlyRate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (role: "CLIENT" | "PROVIDER") => {
    setFormData((prev) => ({ ...prev, role }));
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
          username: formData.username,
          name: formData.name,
          role: formData.role,
          hourlyRate: formData.hourlyRate,
        });
      }

      authService.setTokens(body.accessToken, body.refreshToken);
      setUser(body.user);
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center px-4 text-foreground">
      {/* Top-left branding */}
      <div className="absolute top-6 left-6 flex items-center space-x-2">
        <Calendar className="w-8 h-8 text-foreground" />
        <span className="text-2xl font-bold text-foreground">MeetBook</span>
      </div>

      <div className="max-w-md w-full">
        <AuthForm
          formData={formData}
          isLogin={isLogin}
          serverError={serverError}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onToggleLogin={() => setIsLogin(!isLogin)}
          onRoleChange={handleRoleChange}
        />
      </div>
    </div>
  );
}
