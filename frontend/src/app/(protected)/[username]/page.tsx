"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/store/userStore";
import ProviderDashboard from "./ProviderDashboard";
import ClientDashboard from "./ClientDashboard";
import { LoadingScreen } from "@/components/ui";

export default function Home() {
  const { user, loading } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <LoadingScreen />;
  }

  return user.role === "PROVIDER" ? <ProviderDashboard /> : <ClientDashboard />;
}
