"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FaBookOpen,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F4]">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
          <FaBookOpen className="absolute text-green-700 text-sm animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login?redirect=/profile");

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F4]">
        <p className="font-medium text-gray-600 animate-pulse">
          Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F2F5EE] to-[#F7F8F4] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">

        {/* Back to Home */}
        <Link
          href="/"
          className="group mb-8 inline-flex items-center gap-2 font-semibold text-[#20543B] transition-all duration-300 hover:-translate-x-1"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm border border-emerald-100 transition group-hover:bg-[#20543B] group-hover:text-white">
            <FaArrowLeft className="text-sm" />
          </span>
          Back to Home
        </Link>

        {/* Profile Card Container */}
        <div className="overflow-hidden rounded-[32px] border border-[#E2EBE0] bg-white shadow-[0_20px_50px_rgba(32,84,59,0.07)] transition-all">

          {/* Cover Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-[#103D2E] via-[#18553D] to-[#246948] px-6 py-16 sm:px-12 sm:py-20">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5 pointer-events-none" />
            <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full border-[35px] border-white/5 pointer-events-none" />

            <div className="relative z-10 text-center text-white">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md text-[#E5D5A5] border border-white/10">
                <FaBookOpen className="text-xs" />
                <span className="text-xs font-bold uppercase tracking-[3px]">
                  Verified Account
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Account Dashboard
              </h1>

              <p className="mt-2 text-sm text-emerald-100/80 sm:text-base">
                Manage your profile information and library preferences.
              </p>
            </div>
          </div>

          {/* Profile Content Body */}
          <div className="px-6 pb-12 sm:px-12">

            {/* Profile Avatar & Badge */}
            <div className="-mt-16 mb-6 flex flex-col items-center">
              <div className="relative group">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    referrerPolicy="no-referrer"
                    className="h-32 w-32 rounded-full border-[5px] border-white object-cover shadow-xl transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-[5px] border-white bg-[#E5F0E6] text-4xl text-[#20543B] shadow-xl">
                    <FaUser />
                  </div>
                )}
                <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md border-2 border-white" title="Active">
                  <FaShieldAlt className="text-xs" />
                </span>
              </div>

              {/* User Name & Role */}
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-[#183D2C] sm:text-3xl">
                  {user.name}
                </h2>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide border border-emerald-200">
                  BookNook Reader
                </span>
              </div>
            </div>

            {/* Section Heading */}
            <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-[#183D2C]">
                Personal Information
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Verified Profile
              </span>
            </div>

            {/* Information Grid Cards */}
            <div className="grid gap-4 sm:grid-cols-2">

              {/* Name Card */}
              <div className="group rounded-2xl border border-[#E8EDE5] bg-[#FAFBF7] p-5 transition-all duration-300 hover:border-emerald-300 hover:bg-white hover:shadow-lg">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4EFE3] text-lg text-[#20543B] transition-transform group-hover:scale-110">
                  <FaUser />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Full Name
                </p>
                <p className="mt-1 break-words text-lg font-bold text-[#183D2C]">
                  {user.name}
                </p>
              </div>

              {/* Email Card */}
              <div className="group rounded-2xl border border-[#E8EDE5] bg-[#FAFBF7] p-5 transition-all duration-300 hover:border-emerald-300 hover:bg-white hover:shadow-lg">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4EFE3] text-lg text-[#20543B] transition-transform group-hover:scale-110">
                  <FaEnvelope />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Email Address
                </p>
                <p className="mt-1 break-all text-lg font-bold text-[#183D2C]">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#20543B] px-6 py-4 font-semibold text-white shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:bg-[#153D2B] hover:shadow-xl hover:-translate-y-0.5"
              >
                <FaBookOpen />
                Explore Books
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-6 py-4 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:bg-red-50 hover:border-red-300 hover:-translate-y-0.5"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>

          </div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-xs font-medium text-gray-400">
          Made with love for every book lover. © {new Date().getFullYear()} BookNook
        </p>

      </div>
    </main>
  );
}