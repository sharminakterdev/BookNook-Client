


import Link from "next/link";
import {
  FaBookOpen,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <FaBookOpen className="text-3xl text-green-500" />

              <h2 className="text-2xl font-bold text-white">
                Book<span className="text-green-500">Nook</span>
              </h2>
            </Link>

            <p className="text-sm leading-7 text-gray-400">
              Discover your next favorite book with BookNook.
              Explore, borrow, and share knowledge with our
              growing community of book lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-green-500">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/books" className="hover:text-green-500">
                  All Books
                </Link>
              </li>

              <li>
                <Link href="/add-book" className="hover:text-green-500">
                  Add Book
                </Link>
              </li>

              <li>
                <Link href="/my-books" className="hover:text-green-500">
                  My Books
                </Link>
              </li>

              <li>
                <Link href="/my-borrows" className="hover:text-green-500">
                  My Borrows
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm">

              <li className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                <a href="mailto:hello@booknook.com">
                  hello@booknook.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaPhone className="text-green-500" />
                <a href="tel:+8801700000000">
                  +880 1700-000000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-500" />
                <span>Dhaka, Bangladesh</span>
              </li>

            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Follow Us
            </h3>

            <p className="text-sm text-gray-400 mb-5">
              Stay connected with BookNook.
            </p>

            <div className="flex gap-4">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition"
              >
                <FaTwitter />
              </a>

            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-400">
           © 2026 BookNook. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}