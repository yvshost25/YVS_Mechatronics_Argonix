import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import bcrypt from "bcryptjs";

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
  simplifiedLogin: (
    email: string,
    password: string
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

          if (!user) {
            console.error("User not found");
            return false;
          }

          // Compare the provided password with the hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            console.error("Invalid password");
            return false;
          }

          // Validate other credentials (role and name)
          if (user.role !== role || user.name !== name) {
            console.error("Invalid role or name");
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
      
      simplifiedLogin: async (email: string, password: string) => {
        try {
          // Query Convex to get the user by email
          const user = await convex.query(api.employees.getEmployeeByEmail, { email });

          if (!user) {
            console.error("User not found");
            return false;
          }

          // Compare the provided password with the hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            console.error("Invalid password");
            return false;
          }

          // Set the user in the state with automatically detected role and name
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