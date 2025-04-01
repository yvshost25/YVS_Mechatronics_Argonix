import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConvexHttpClient } from "convex/browser";
import axios from "axios";

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
  login: (
    name: string,
    email: string,
    password: string,
    role: string,
    imageUrl?: string
  ) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (name: string, email: string, password: string, role: string) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
            { name, email, password, role },
            { headers: { "Content-Type": "application/json" } }
          );

          if (response.status !== 200) return false;

          const user = response.data;
          set({ user, isAuthenticated: true });
          return true;
        } catch (error) {
          console.error("Login error:", error);
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
