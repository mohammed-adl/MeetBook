// store/userStore.ts
import { create } from "zustand";
import authService from "@/services/authService";

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  role: "CLIENT" | "PROVIDER";
  hourlyRate: number;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  initialize: () => () => void;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,

  initialize: () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    set({ user, loading: false });

    const handleStorageChange = (event: StorageEvent) => {
      if (
        (event.key === "user" && event.newValue === null) ||
        (event.key === "accessToken" && event.newValue === null) ||
        (event.key === "refreshToken" && event.newValue === null)
      ) {
        authService.logout();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      authService.clearSession();
    }
    set({ user });
  },
}));
