
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaBook,
  FaArrowRight,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import type { Book } from "@/types/book";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/books/latest");

        if (!res.ok) {
          throw new Error("Failed to load latest books");
        }

        const data = await res.json();
        setBooks(data.data);
      } catch (error) {
        console.error("Latest Books Error:", error);
        toast.error("Failed to load latest books!");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F8F7F2] px-4 py-20 md:py-24">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-green-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-14 flex flex-col items-center text-center">

          <div className="mb-5 flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 shadow-sm">
            <FaBookOpen className="text-green-700" />
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-green-800">
              Explore Our Collection
            </span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-[#183D2B] md:text-5xl">
            New Arrivals
            <span className="text-green-600">.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-500 md:text-lg">
            Fresh stories, new adventures, and endless inspiration.
            Discover the latest additions to our library.
          </p>

          <div className="mt-7 h-1 w-20 rounded-full bg-green-700" />
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
                <div className="mt-5 h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                <div className="mt-6 h-12 animate-pulse rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (

          /* Empty State */
          <div className="rounded-3xl border border-dashed border-green-200 bg-white/70 px-6 py-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <FaBookOpen className="text-3xl text-green-700" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#183D2B]">
              No Books Yet
            </h3>

            <p className="mt-3 text-gray-500">
              Our bookshelf is waiting for some wonderful stories.
            </p>

            <Link
              href="/books"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Explore Books <FaArrowRight />
            </Link>
          </div>

        ) : (

          /* Book Cards */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <article
                key={book._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E9E8DF] bg-white shadow-[0_5px_25px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-[0_18px_40px_rgba(21,61,43,0.12)]"
              >

                {/* Book Cover */}
                <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#F1F0E8] p-7">

                  {/* Decorative Circle */}
                  <div className="absolute h-52 w-52 rounded-full border border-green-900/5" />
                  <div className="absolute h-40 w-40 rounded-full border border-green-900/5" />

                  {/* Book Image / Fallback */}
                  <div className="relative flex h-full w-full items-center justify-center">
                    <FaBook className="absolute text-5xl text-green-800/20" />

                    {book.image && (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="relative z-10 h-full max-w-[175px] rounded-md object-contain shadow-xl transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  {/* Category */}
                  <span className="absolute left-4 top-4 z-20 rounded-full border border-green-100 bg-white/90 px-4 py-1.5 text-xs font-bold text-green-800 shadow-sm backdrop-blur">
                    {book.category}
                  </span>

                  {/* Book Number */}
                  <span className="absolute bottom-4 right-4 text-sm font-bold text-green-900/30">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Book Details */}
                <div className="flex flex-1 flex-col p-6">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
                      BookNook Collection
                    </p>

                    <h3 className="mt-3 line-clamp-1 text-xl font-bold text-[#183D2B] transition-colors group-hover:text-green-700">
                      {book.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Written by{" "}
                      <span className="font-semibold text-gray-700">
                        {book.author}
                      </span>
                    </p>
                  </div>

                  {/* View Details */}
                  <div className="mt-auto pt-7">
                    <Link
                      href={`/books/${book._id}`}
                      className="flex w-full items-center justify-between rounded-xl border border-green-700 px-5 py-3.5 font-semibold text-green-800 transition-all duration-300 hover:bg-green-700 hover:text-white"
                    >
                      <span>View Details</span>
                      <FaLongArrowAltRight className="text-lg transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        {/* See All Books */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/books"
            className="group inline-flex items-center gap-3 rounded-xl bg-[#183D2B] px-9 py-4 font-semibold text-white shadow-lg shadow-green-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-xl"
          >
            See All Books
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Every book opens a new world of possibilities.
        </p>

      </div>
    </section>
  );
}

