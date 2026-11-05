

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

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getRedirectPath = () => {
    const redirect = new URLSearchParams(window.location.search).get("redirect");

    if (redirect?.startsWith("/") && !redirect.startsWith("//")) {
      return redirect;
    }

    return "/";
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

      router.push(getRedirectPath());
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
      toast.error("Google login failed!");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F7F2] px-4 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

        {/* Left Side - Premium Design */}
        <div className="relative hidden min-h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#103D2E] via-[#164E3B] to-[#28765A] p-12 text-white md:flex">

          {/* Decorative Background */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D7B979]/10 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

          {/* Top Content */}
          <div className="relative z-10">

            <div className="mb-10 flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D7B979] shadow-lg">
                <FaBookOpen className="text-3xl text-[#164E3B]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-wide">
                  BookNook
                </h2>

                <p className="text-xs tracking-widest text-green-200">
                  YOUR DIGITAL LIBRARY
                </p>
              </div>

            </div>

            <span className="inline-block rounded-full border border-[#D7B979]/40 bg-[#D7B979]/10 px-4 py-2 text-xs font-semibold tracking-wider text-[#E9D7A5]">
              ✦ A WORLD OF STORIES
            </span>

            <h1 className="mt-7 text-5xl font-bold leading-tight">
              Every Book
              <br />
              Opens a New
              <br />
              <span className="font-serif italic text-[#E6CC8A]">
                Adventure.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-8 text-green-100/90">
              Welcome back to your reading corner. Discover inspiring
              stories, explore new ideas and continue your journey
              through the wonderful world of books.
            </p>

          </div>

          {/* Floating Book Cards */}
          <div className="relative z-10 my-12 flex items-center justify-center gap-5">

            <div className="w-36 -rotate-6 rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">

              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-[#D7B979]">
                <FaBookOpen className="text-5xl text-[#164E3B]" />
              </div>

              <p className="text-sm font-semibold">Discover</p>

              <p className="mt-1 text-xs text-green-100">
                New stories
              </p>

            </div>

            <div className="w-36 translate-y-5 rotate-6 rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">

              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-[#E9E5D6]">
                <FaBookOpen className="text-5xl text-[#164E3B]" />
              </div>

              <p className="text-sm font-semibold">Explore</p>

              <p className="mt-1 text-xs text-green-100">
                Endless knowledge
              </p>

            </div>

          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">

            <p className="font-serif text-xl italic leading-relaxed text-[#F5EBD0]">
              "There is no friend as loyal as a book."
            </p>

            <div className="mt-4 flex items-center justify-between">

              <span className="text-sm font-medium text-green-100">
                — Ernest Hemingway
              </span>

              <FaBookOpen className="text-2xl text-[#D7B979]" />

            </div>

          </div>

        </div>

        {/* Right Side - Login Form */}
        <div className="p-6 sm:p-10 md:p-12">

          {/* Heading */}
          <div className="mb-8 text-center">

            <div className="mb-4 flex justify-center md:hidden">
              <FaBookOpen className="text-5xl text-green-700" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Welcome Back!
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Login to your BookNook account.
            </p>

          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-green-600">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-green-600">

                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />

              </div>

            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-green-700 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#164E3B] py-3.5 font-semibold text-white transition hover:bg-[#103D2E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">

            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />

          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
          >
            <FaGoogle className="text-red-500" />

            {googleLoading
              ? "Please wait..."
              : "Continue with Google"}
          </button>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="font-semibold text-green-700 hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </main>
  );
}
