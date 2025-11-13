"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { LoadingScreen } from "@/components/ui";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (user === undefined) return <LoadingScreen />;

  return <>{children}</>;
}

export default PublicRoute;
