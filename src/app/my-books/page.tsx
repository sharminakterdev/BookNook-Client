
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FaPlus, FaEdit, FaTrash, FaBookOpen } from "react-icons/fa";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
  totalCopies: number;
  userEmail: string;
}

export default function MyBooksPage() {
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8000/books");
        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        const myBooks = result.data.filter(
          (book: Book) => book.userEmail === session.user.email
        );

        setBooks(myBooks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#DCE8DE] border-t-[#24543D]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#183D2B]">
              My Books
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage all the books you have added.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#24543D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183D2B]"
          >
            <FaPlus />
            Add New Book
          </Link>
        </div>

        {/* Book Count */}
        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="font-semibold text-gray-800">
            Your Collection
          </h2>
          <p className="text-sm text-gray-500">
            {books.length} Books
          </p>
        </div>

        {/* Books List */}
        {books.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-4 py-4">Book</th>
                  <th className="px-4 py-4">Category</th>
                  <th className="px-4 py-4">Copies</th>
                  <th className="px-4 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b border-gray-100 transition hover:bg-[#F8FAF7]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        {book.image ? (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="h-16 w-12 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-16 w-12 items-center justify-center rounded-md bg-gray-100 text-gray-400">
                            <FaBookOpen />
                          </div>
                        )}

                        <div>
                          <h3 className="font-semibold text-[#183D2B]">
                            {book.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {book.author}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#EDF3EC] px-3 py-1 text-xs font-medium text-[#24543D]">
                        {book.category}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                      {book.totalCopies}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          disabled
                          title="Edit"
                          className="rounded-lg bg-[#EDF3EC] p-2.5 text-[#24543D] opacity-60"
                        >
                          <FaEdit />
                        </button>

                        <button
                          disabled
                          title="Delete"
                          className="rounded-lg bg-red-50 p-2.5 text-red-500 opacity-60"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center">
            <FaBookOpen className="mx-auto text-5xl text-gray-300" />

            <h3 className="mt-5 text-xl font-semibold text-[#183D2B]">
              No Books Added Yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add your first book to start your collection.
            </p>

            <Link
              href="/add-book"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#24543D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#183D2B]"
            >
              <FaPlus />
              Add Book
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
