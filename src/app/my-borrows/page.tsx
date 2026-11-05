
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowRight,
  FaUndo,
  FaBook,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  borrowDate: string;
  returnDate: string;
}

export default function MyBorrowsPage() {
  const { data: session, isPending } = authClient.useSession();
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState("");

  const fetchBorrows = useCallback(async () => {
    try {
      const { data } = await authClient.token();
      const res = await fetch("http://localhost:8000/borrows", {
        headers: { Authorization: `Bearer ${data?.token}` },
        cache: "no-store",
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message);

      setBorrows(result.data || []);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load books");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending && session) fetchBorrows();
    else if (!isPending) setLoading(false);
  }, [isPending, session, fetchBorrows]);

  const handleReturn = async (borrow: Borrow) => {
    if (!window.confirm(`Return "${borrow.bookTitle}"?`)) return;

    try {
      setReturningId(borrow._id);
      const { data } = await authClient.token();

      const res = await fetch(`http://localhost:8000/borrows/${borrow._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${data?.token}` },
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.message);

      setBorrows((prev) => prev.filter((item) => item._id !== borrow._id));
      toast.success("Book returned successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Return failed");
    } finally {
      setReturningId("");
    }
  };

  const date = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const returnButton = (borrow: Borrow) => (
    <button
      onClick={() => handleReturn(borrow)}
      disabled={returningId === borrow._id}
      className="inline-flex items-center gap-2 rounded-full bg-[#245c3a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#183d2a] disabled:opacity-50"
    >
      <FaUndo />
      {returningId === borrow._id ? "Returning..." : "Return Book"}
    </button>
  );

  if (isPending || loading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#d9e5dc] border-t-[#245c3a]" />
      </div>
    );

  if (!session)
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <FaBookOpen className="mb-5 text-5xl text-[#245c3a]" />
        <h2 className="text-2xl font-bold text-[#183d2a]">Login Required</h2>
        <p className="mt-2 text-gray-500">Login to see your borrowed books.</p>
        <Link href="/login?redirect=/my-borrows" className="mt-6 rounded-full bg-[#245c3a] px-7 py-3 text-white">
          Login Now
        </Link>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#f7f6ef] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#b18b4b]">
              Your Reading Journey
            </p>
            <h1 className="text-3xl font-bold text-[#183d2a] md:text-4xl">
              My Borrowed Books
            </h1>
            <p className="mt-3 text-gray-500">Manage your borrowed books and return them on time.</p>
          </div>
          <Link href="/books" className="flex items-center gap-2 self-start rounded-full border border-[#245c3a] px-6 py-3 font-semibold text-[#245c3a] hover:bg-[#245c3a] hover:text-white">
            Browse Books <FaArrowRight />
          </Link>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-[#e6e5d9] bg-white p-6">
            <FaBook className="text-3xl text-[#245c3a]" />
            <div>
              <p className="text-sm text-gray-500">Currently Borrowed</p>
              <h3 className="text-2xl font-bold text-[#183d2a]">{borrows.length}</h3>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-[#e6e5d9] bg-white p-6">
            <FaCheckCircle className="text-3xl text-[#a27b32]" />
            <div>
              <p className="text-sm text-gray-500">Account</p>
              <h3 className="font-bold text-[#183d2a]">{session.user.name}</h3>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-[#e6e5d9] bg-white shadow-sm">
          <div className="border-b border-[#e6e5d9] px-6 py-5">
            <h2 className="text-xl font-bold text-[#183d2a]">Borrowing History</h2>
            <p className="mt-1 text-sm text-gray-500">Your active borrowed books</p>
          </div>

          {!borrows.length ? (
            <div className="px-5 py-16 text-center">
              <FaBookOpen className="mx-auto mb-5 text-5xl text-[#b7c8ba]" />
              <h3 className="text-xl font-bold text-[#183d2a]">No Borrowed Books Yet</h3>
              <p className="mt-2 text-gray-500">Explore our library and borrow your first book!</p>
              <Link href="/books" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#245c3a] px-7 py-3 text-white">
                Explore Books <FaArrowRight />
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-[#f5f5ed] text-sm text-[#183d2a]">
                    <tr>
                      {["Book Information", "Borrow Date", "Return Date", "Status", "Action"].map((item) => (
                        <th key={item} className="px-6 py-4">{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {borrows.map((borrow) => (
                      <tr key={borrow._id} className="hover:bg-[#fafaf6]">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <img src={borrow.bookImage} alt={borrow.bookTitle} className="h-16 w-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-semibold text-[#183d2a]">{borrow.bookTitle}</p>
                              <Link href={`/books/${borrow.bookId}`} className="text-xs text-[#a27b32] hover:underline">View Details</Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600">
                          <FaCalendarAlt className="mr-2 inline text-[#a27b32]" />
                          {date(borrow.borrowDate)}
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-600">{date(borrow.returnDate)}</td>
                        <td className="px-6 py-5">
                          <span className="rounded-full bg-[#edf4ed] px-3 py-1 text-xs font-semibold text-[#245c3a]">
                            <FaCheckCircle className="mr-1 inline" /> Borrowed
                          </span>
                        </td>
                        <td className="px-6 py-5">{returnButton(borrow)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 p-4 md:hidden">
                {borrows.map((borrow) => (
                  <div key={borrow._id} className="rounded-xl border border-[#e6e5d9] p-4">
                    <div className="flex gap-4">
                      <img src={borrow.bookImage} alt={borrow.bookTitle} className="h-28 w-20 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-bold text-[#183d2a]">{borrow.bookTitle}</h3>
                        <Link href={`/books/${borrow.bookId}`} className="text-xs text-[#a27b32]">View Details</Link>
                        <p className="mt-3 text-xs text-gray-500">Borrowed: {date(borrow.borrowDate)}</p>
                        <p className="mt-1 text-xs text-gray-500">Return: {date(borrow.returnDate)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-[#edf4ed] px-3 py-1 text-xs text-[#245c3a]">Borrowed</span>
                      {returnButton(borrow)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

