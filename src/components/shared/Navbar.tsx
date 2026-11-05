
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBookOpen,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

interface NavLink {
  name: string;
  href: string;
}

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: string;
}

function UserAvatar({ src, name, size = "h-9 w-9" }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className={`${size} flex shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700`}
      >
        <FaUser />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name || "User"}
      referrerPolicy="no-referrer"
      onError={() => setImageError(true)}
      className={`${size} shrink-0 rounded-full border border-gray-200 object-cover`}
    />
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    ...(isLoggedIn
      ? [
          { name: "Add Book", href: "/add-book" },
          { name: "My Books", href: "/my-books" },
          { name: "My Borrows", href: "/my-borrows" },
        ]
      : []),
  ];

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <FaBookOpen className="text-3xl text-green-600" />

            <h1 className="text-2xl font-bold text-gray-900">
              Book<span className="text-green-600">Nook</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link: NavLink) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 font-medium transition ${
                    isActive
                      ? "font-semibold text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-green-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="relative hidden items-center gap-3 md:flex">
            {!isPending && (
              <>
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 transition hover:bg-green-50"
                    >
                      <UserAvatar
                        src={user.image}
                        name={user.name}
                      />

                      <span className="max-w-28 truncate font-medium text-gray-800">
                        {user.name}
                      </span>

                      <FaChevronDown className="text-xs text-gray-500" />
                    </button>

                    {isProfileOpen && (
                      <div className="absolute right-0 mt-3 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                        <div className="flex items-center gap-3 border-b px-3 py-3">
                          <UserAvatar
                            src={user.image}
                            name={user.name}
                            size="h-10 w-10"
                          />

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-800">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                        >
                          <FaUser />
                          My Profile
                        </Link>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 transition hover:bg-red-50"
                        >
                          <FaSignOutAlt />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-lg border border-green-600 px-5 py-2 font-medium text-green-600 transition hover:bg-green-50"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="rounded-lg bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700"
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-gray-700 md:hidden"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="space-y-3 border-t py-5 md:hidden">
            {navLinks.map((link: NavLink) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-medium transition ${
                    isActive
                      ? "font-semibold text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth Section */}
            {!isPending && (
              <>
                {isLoggedIn ? (
                  <div className="border-t pt-4">
                    <div className="mb-3 flex items-center gap-3">
                      <UserAvatar
                        src={user.image}
                        name={user.name}
                        size="h-11 w-11"
                      />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-800">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-green-50"
                    >
                      My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3 border-t pt-4">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 rounded-lg border border-green-600 px-4 py-2 text-center font-medium text-green-600"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-center font-medium text-white"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

