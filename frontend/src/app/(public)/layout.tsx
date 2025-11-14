"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { LoadingScreen } from "@/components/ui";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      if (user?.username) {
        router.replace(`/${user.username}`);
      } else {
        setIsChecking(false);
      }
    }
  }, [user, router]);

  if (isChecking || user === undefined) return <LoadingScreen />;

  return <>{children}</>;
}

export default PublicRoute;
