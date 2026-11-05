"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBookOpen,
  FaUser,
  FaTag,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";

import type { Book } from "@/types/book";

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8000/books/${id}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch book details");
        }

        if (isMounted) {
          setBook(result.data);
        }
      } catch (error) {
        if (isMounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Something went wrong!"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBookDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#dce8df] border-t-[#245c43]" />
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !book) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <FaBookOpen className="mb-4 text-5xl text-gray-300" />

        <h2 className="text-2xl font-bold text-gray-800">
          Book Not Found
        </h2>

        <p className="mt-2 text-gray-500">
          {error || "This book does not exist."}
        </p>

        <Link
          href="/books"
          className="mt-6 rounded-lg bg-[#245c43] px-6 py-3 text-white transition hover:bg-[#19452f]"
        >
          Back to All Books
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8f2] px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-medium text-[#245c43] transition hover:gap-3"
        >
          <FaArrowLeft />
          Back to All Books
        </Link>

        {/* Book Details */}
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">

          {/* Book Image */}
          <div className="flex min-h-[400px] items-center justify-center bg-[#edf1e9] p-8 md:p-12">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="max-h-[450px] w-full max-w-sm rounded-xl object-contain shadow-xl"
              />
            ) : (
              <div className="flex h-80 w-64 items-center justify-center rounded-xl bg-white">
                <FaBookOpen className="text-7xl text-gray-300" />
              </div>
            )}
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center p-8 md:p-12">

            <span className="mb-5 w-fit rounded-full bg-[#e8f0e9] px-4 py-2 text-sm font-semibold text-[#245c43]">
              {book.category}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-[#193d2c] md:text-4xl">
              {book.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-lg text-gray-600">
              <FaUser className="text-[#638b72]" />
              {book.author}
            </p>

            <div className="my-8 h-px bg-gray-200" />

            {/* Description */}
            <div>
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-[#193d2c]">
                <FaBookOpen className="text-[#638b72]" />
                About This Book
              </h2>

              <p className="leading-7 text-gray-600">
                {book.description || "No description available for this book."}
              </p>
            </div>

            {/* Book Information Cards */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-[#f4f6f0] p-4">
                <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <FaLayerGroup />
                  Total Copies
                </p>

                <p className="text-2xl font-bold text-[#193d2c]">
                  {book.totalCopies ?? "N/A"}
                </p>
              </div>

              <div className="rounded-xl bg-[#f4f6f0] p-4">
                <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <FaCheckCircle />
                  Available Copies
                </p>

                <p className="text-2xl font-bold text-[#245c43]">
                  {book.availableCopies ?? "N/A"}
                </p>
              </div>

            </div>

            {/* Availability */}
            <div className="mt-6">
              {book.availableCopies !== undefined &&
              book.availableCopies > 0 ? (
                <span className="inline-flex items-center gap-2 font-semibold text-green-700">
                  <FaCheckCircle />
                  Available for borrowing
                </span>
              ) : book.availableCopies === 0 ? (
                <span className="font-semibold text-red-600">
                  Currently unavailable
                </span>
              ) : null}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}