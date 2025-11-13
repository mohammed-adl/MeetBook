"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { LoadingScreen } from "@/components/ui";
import { useUserStore } from "@/store/userStore";
import authService from "@/services/authService";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { username } = useParams();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    async function validateToken() {
      try {
        const isExpired = await authService.validateAccessToken();
        if (isExpired) {
          const body = await authService.callRefreshToken();
          if (body) authService.setTokens(body.token, body.refreshToken);
        }
      } catch (err) {
        console.error("Error validating token:", err);
        authService.logout();
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      validateToken();
    } else {
      authService.logout();
    }
  }, [user, username, router]);

  if (loading) return <LoadingScreen />;

  return <>{children}</>;
}
