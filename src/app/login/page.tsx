


"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import {
  FaBookOpen,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";

interface LoginFormData {
  email: string;
  password: string;
}

const getRedirectPath = () => {
  const redirect = new URLSearchParams(window.location.search).get("redirect");

  if (redirect?.startsWith("/") && !redirect.startsWith("//")) {
    return redirect;
  }

  return "/";
};

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Email and Password Login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      toast.success("Login successful!");

      const redirectPath = getRedirectPath();

      router.replace(redirectPath);
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: getRedirectPath(),
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8F3] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="relative flex flex-col justify-between bg-[#173F35] p-8 text-white md:p-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D9B979] text-[#173F35]">
              <FaBookOpen size={23} />
            </div>

            <span className="text-2xl font-bold tracking-wide">
              BookNook
            </span>
          </Link>

          <div className="my-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-[#D9B979]">
              Welcome Back
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              Every book is a new adventure.
            </h1>

            <p className="max-w-sm text-base leading-8 text-white/75">
              Continue your reading journey with BookNook. Discover
              wonderful stories and find your next favorite book.
            </p>
          </div>

          <div className="border-t border-white/20 pt-6">
            <p className="text-sm text-white/60">
              Your next chapter starts here.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <h2 className="mb-3 text-3xl font-bold text-[#173F35]">
                Sign In
              </h2>

              <p className="text-sm text-gray-500">
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFBF8] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#173F35] focus:ring-2 focus:ring-[#173F35]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <span className="text-xs text-gray-400">
                    Forgot password?
                  </span>
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#FAFBF8] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#173F35] focus:ring-2 focus:ring-[#173F35]/10"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full rounded-xl bg-[#173F35] py-3.5 font-semibold text-white transition hover:bg-[#245849] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaGoogle className="text-[#DB4437]" />
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#173F35] hover:underline"
              >
                Create Account
              </Link>
            </p>

            <Link
              href="/"
              className="mt-5 block text-center text-sm text-gray-400 transition hover:text-[#173F35]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
