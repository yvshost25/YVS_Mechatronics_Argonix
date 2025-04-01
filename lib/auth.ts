import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

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
          const response = await axios.post(
            `/api/login`,
            { name, email, password, role },
          );

          if (response.status !== 200) {
            console.error("Login failed with status:", response.status);
            return false;
          }

          const user = response.data;
          set({ user, isAuthenticated: true });
          return true;
        } catch (error: any) {
          if (error.response) {
            console.error("Server responded with:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
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
