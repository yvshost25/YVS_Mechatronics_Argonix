import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface User {
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, email: string, password: string, role: string, imageUrl?: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (name: string, email: string, password: string, role: string) => {
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
          });

          if (!response.ok) return false;

          const user = await response.json();
          set({ user, isAuthenticated: true });
          return true;
        } catch {
          return false;
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: "auth-storage" }
  )
);
