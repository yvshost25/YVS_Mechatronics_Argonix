import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

interface User {
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    name: string,
    email: string,
    password: string,
    role: string
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
          // Query Convex to get the user by email
          const user = await convex.query(api.employees.getEmployeeByEmail, { email });

          // Validate user credentials
          if (!user || user.password !== password || user.role !== role || user.name !== name) {
            console.error("Invalid credentials");
            return false;
          }

          // Set the user in the state
          set({
            user: {
              name: user.name,
              email: user.email,
              role: user.role,
              imageUrl: user.imageUrl,
            },
            isAuthenticated: true,
          });

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