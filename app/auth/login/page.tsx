"use client";

import { useState, useEffect } from "react";
import "./login.css";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MailIcon, LockIcon, CheckCircle2, Loader2, AlertCircle, Home, ArrowLeft, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Safely extract search parameters in a client-side effect
    const callback = searchParams.get("callbackUrl") || "/dashboard";
    const errorParam = searchParams.get("error");
    setCallbackUrl(callback);
    setError(errorParam);
  }, [searchParams]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!response?.error) {
        toast.success("Login successful!");
        router.push(callbackUrl);
        router.refresh();
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Show error message if authentication failed
  useEffect(() => {
    if (error) {
      toast.error(
        error === "CredentialsSignin"
          ? "Invalid email or password"
          : "An error occurred during login"
      );
    }
  }, [error]);

  const { theme, setTheme } = useTheme();

  return (
    <div className="flex h-screen w-full items-center justify-center relative">
      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="fixed top-6 left-6 z-20"
      >
        <Button
          variant="ghost"
          className="flex items-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 shadow-md"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </motion.div>

      {/* Theme Toggle Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="fixed top-6 right-6 z-20"
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm w-10 h-10 shadow-md hover:bg-white dark:hover:bg-gray-800"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] text-indigo-500" />
          )}
        </Button>
      </motion.div>
      {/* Simple background */}
      <div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[380px] px-4 z-10 login-card-enter"
      >
        <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-lg">
          {/* Color accent at top */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

          <div className="px-6 pt-6 pb-6 relative">
            {/* Logo */}
            <div className="relative flex justify-center mb-5">
              <div className="h-14 w-14 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full opacity-20 blur"></div>
                <Image
                  src="/logo.png"
                  alt="YVS Mechatronics"
                  fill
                  className="object-contain relative z-10"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/56x56?text=YVS";
                  }}
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 text-center">
              Welcome Back
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-5 text-center text-xs">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
                    <MailIcon className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-9 py-2 h-9 text-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
                    <LockIcon className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-9 py-2 h-9 text-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`cursor-pointer flex items-center justify-center w-4 h-4 rounded border ${
                      rememberMe
                        ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                        : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {rememberMe && <CheckCircle2 className="h-3 w-3 text-white" />}
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="#"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition"
                >
                  Forgot?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full h-9 mt-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </div>

          {/* Footer strip */}
          <div className="px-6 py-3 text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
            © {new Date().getFullYear()} YVS Mechatronics
          </div>
        </div>
      </motion.div>
    </div>
  );
}