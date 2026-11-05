
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import {
  FaBookOpen,
  FaUser,
  FaEnvelope,
  FaImage,
  FaLock,
} from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, image, password, confirmPassword } = formData;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain an uppercase letter!");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain a lowercase letter!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      toast.success("Account created successfully!");

      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
              Join our reading community. Discover inspiring
              stories, explore new ideas and find your next
              favorite book with BookNook.
            </p>

          </div>

          {/* Floating Book Cards */}
          <div className="relative z-10 my-12 flex items-center justify-center gap-5">

            <div className="w-36 -rotate-6 rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">

              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-[#D7B979]">
                <FaBookOpen className="text-5xl text-[#164E3B]" />
              </div>

              <p className="text-sm font-semibold">
                Discover
              </p>

              <p className="mt-1 text-xs text-green-100">
                New stories
              </p>

            </div>

            <div className="w-36 translate-y-5 rotate-6 rounded-xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">

              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-[#E9E5D6]">
                <FaBookOpen className="text-5xl text-[#164E3B]" />
              </div>

              <p className="text-sm font-semibold">
                Explore
              </p>

              <p className="mt-1 text-xs text-green-100">
                Endless knowledge
              </p>

            </div>

          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">

            <p className="font-serif text-xl italic leading-relaxed text-[#F5EBD0]">
              "A reader lives a thousand lives before he dies."
            </p>

            <div className="mt-4 flex items-center justify-between">

              <span className="text-sm font-medium text-green-100">
                — George R. R. Martin
              </span>

              <FaBookOpen className="text-2xl text-[#D7B979]" />

            </div>

          </div>

        </div>

        {/* Right Side - Register Form */}
        <div className="p-6 sm:p-10 md:p-12">

          {/* Heading */}
          <div className="mb-8 text-center">

            <div className="mb-4 flex justify-center md:hidden">
              <FaBookOpen className="text-5xl text-green-700" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Join BookNook and start your reading journey.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-green-600">
                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

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

            {/* Photo URL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Photo URL
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-green-600">
                <FaImage className="text-gray-400" />

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Enter your photo URL"
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
                  placeholder="Create a password"
                  required
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>

              <p className="mt-1 text-xs text-gray-400">
                Minimum 6 characters, including uppercase and lowercase.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <div className="flex items-center rounded-xl border border-gray-200 px-4 focus-within:border-green-600">
                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full bg-transparent px-3 py-3 outline-none"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#164E3B] py-3.5 font-semibold text-white transition hover:bg-[#103D2E] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-green-700 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}
