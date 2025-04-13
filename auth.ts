import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      role: string;
      imageUrl?: string | null;
    };
  }

  interface User {
    id?: string; 
    name?: string|null;
    email?: string|null;
    role: string;
    imageUrl?: string | null;
  }
}

declare module "next-auth" {
  interface JWT {
    id?: string; // Make optional
    role: string;
    imageUrl?: string | null;
  }
}

export const { 
  auth, 
  signIn, 
  signOut, 
  handlers: { GET, POST } 
} = NextAuth(authConfig);
