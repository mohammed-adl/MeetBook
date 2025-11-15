"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { LoadingScreen } from "@/components/ui";

interface UserInitializerProps {
  children: React.ReactNode;
}

export function UserInitializer({ children }: UserInitializerProps) {
  const { initialize, loading } = useUserStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) return <LoadingScreen />;

  return <>{children}</>;
}
