// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Button } from "@heroui/react";
// import { FaBookOpen, FaBars, FaTimes } from "react-icons/fa";

// interface NavLink {
//   name: string;
//   href: string;
// }

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

//   const navLinks: NavLink[] = [
//     { name: "Home", href: "/" },
//     { name: "All Books", href: "/books" },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-md">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-20 items-center justify-between">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <FaBookOpen className="text-3xl text-green-600" />

//             <h1 className="text-2xl font-bold text-gray-800">
//               Book<span className="text-green-600">Nook</span>
//             </h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden items-center gap-8 md:flex">
//             {navLinks.map((link: NavLink) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="font-medium text-gray-700 transition hover:text-green-600"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Login & Register */}
//           <div className="hidden items-center gap-3 md:flex">
//             <Button
//               as={Link}
//               href="/login"
//               variant="outline"
//               className="border-green-600 text-green-600"
//             >
//               Login
//             </Button>

//             <Button
//               as={Link}
//               href="/register"
//               className="bg-green-600 text-white"
//             >
//               Register
//             </Button>
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             type="button"
//             aria-label="Toggle navigation menu"
//             aria-expanded={isMenuOpen}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-2xl text-gray-700 md:hidden"
//           >
//             {isMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="space-y-4 border-t py-5 md:hidden">
//             {navLinks.map((link: NavLink) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block font-medium text-gray-700 hover:text-green-600"
//               >
//                 {link.name}
//               </Link>
//             ))}

//             <div className="flex gap-3 pt-3">
//               <Button
//                 as={Link}
//                 href="/login"
//                 variant="outline"
//                 onPress={() => setIsMenuOpen(false)}
//                 className="flex-1 border-green-600 text-green-600"
//               >
//                 Login
//               </Button>

//               <Button
//                 as={Link}
//                 href="/register"
//                 onPress={() => setIsMenuOpen(false)}
//                 className="flex-1 bg-green-600 text-white"
//               >
//                 Register
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBookOpen, FaBars, FaTimes } from "react-icons/fa";

interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

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

          {/* Desktop Login & Register */}
          <div className="hidden items-center gap-3 md:flex">
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

            {/* Mobile Login & Register */}
            <div className="flex gap-3 pt-3">
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
          </div>
        )}
      </div>
    </nav>
  );
}