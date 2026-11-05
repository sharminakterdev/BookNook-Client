
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import {
//   FaArrowLeft,
//   FaBookOpen,
//   FaUser,
//   FaLayerGroup,
//   FaCheckCircle,
// } from "react-icons/fa";

// import { authClient } from "@/lib/auth-client";
// import type { Book } from "@/types/book";

// export default function BookDetailsPage() {
//   const params = useParams<{ id: string }>();
//   const id = params.id;

//   // Logged-in user session
//   const { data: session, isPending } = authClient.useSession();

//   const [book, setBook] = useState<Book | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let isMounted = true;

//     const fetchBookDetails = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           `http://localhost:8000/books/${id}`
//         );

//         const result = await response.json();

//         if (!response.ok || !result.success) {
//           throw new Error(
//             result.message || "Failed to fetch book details"
//           );
//         }

//         if (isMounted) {
//           setBook(result.data);
//         }
//       } catch (error) {
//         if (isMounted) {
//           setError(
//             error instanceof Error
//               ? error.message
//               : "Something went wrong!"
//           );
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     if (id) {
//       fetchBookDetails();
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [id]);

//   // Loading State
//   if (loading || isPending) {
//     return (
//       <div className="flex min-h-[70vh] items-center justify-center">
//         <div className="text-center">
//           <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#dce8df] border-t-[#245c43]" />
//           <p className="mt-4 text-gray-600">
//             Loading book details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error || !book) {
//     return (
//       <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
//         <FaBookOpen className="mb-4 text-5xl text-gray-300" />

//         <h2 className="text-2xl font-bold text-gray-800">
//           Book Not Found
//         </h2>

//         <p className="mt-2 text-gray-500">
//           {error || "This book does not exist."}
//         </p>

//         <Link
//           href="/books"
//           className="mt-6 rounded-lg bg-[#245c43] px-6 py-3 text-white transition hover:bg-[#19452f]"
//         >
//           Back to All Books
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#f8f8f2] px-4 py-12">
//       <div className="mx-auto max-w-6xl">

//         {/* Back Button */}
//         <Link
//           href="/books"
//           className="mb-8 inline-flex items-center gap-2 font-medium text-[#245c43] transition hover:gap-3"
//         >
//           <FaArrowLeft />
//           Back to All Books
//         </Link>

//         {/* Book Details */}
//         <div className="grid overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">

//           {/* Book Image */}
//           <div className="flex min-h-[400px] items-center justify-center bg-[#edf1e9] p-8 md:p-12">
//             {book.image ? (
//               <img
//                 src={book.image}
//                 alt={book.title}
//                 className="max-h-[450px] w-full max-w-sm rounded-xl object-contain shadow-xl"
//               />
//             ) : (
//               <div className="flex h-80 w-64 items-center justify-center rounded-xl bg-white">
//                 <FaBookOpen className="text-7xl text-gray-300" />
//               </div>
//             )}
//           </div>

//           {/* Book Information */}
//           <div className="flex flex-col justify-center p-8 md:p-12">

//             <span className="mb-5 w-fit rounded-full bg-[#e8f0e9] px-4 py-2 text-sm font-semibold text-[#245c43]">
//               {book.category}
//             </span>

//             <h1 className="text-3xl font-bold leading-tight text-[#193d2c] md:text-4xl">
//               {book.title}
//             </h1>

//             <p className="mt-4 flex items-center gap-2 text-lg text-gray-600">
//               <FaUser className="text-[#638b72]" />
//               {book.author}
//             </p>

//             <div className="my-8 h-px bg-gray-200" />

//             {/* Description */}
//             <div>
//               <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-[#193d2c]">
//                 <FaBookOpen className="text-[#638b72]" />
//                 About This Book
//               </h2>

//               <p className="leading-7 text-gray-600">
//                 {book.description ||
//                   "No description available for this book."}
//               </p>
//             </div>

//             {/* Book Information Cards */}
//             <div className="mt-8 grid grid-cols-2 gap-4">

//               <div className="rounded-xl bg-[#f4f6f0] p-4">
//                 <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
//                   <FaLayerGroup />
//                   Total Copies
//                 </p>

//                 <p className="text-2xl font-bold text-[#193d2c]">
//                   {book.totalCopies ?? "N/A"}
//                 </p>
//               </div>

//               <div className="rounded-xl bg-[#f4f6f0] p-4">
//                 <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
//                   <FaCheckCircle />
//                   Available Copies
//                 </p>

//                 <p className="text-2xl font-bold text-[#245c43]">
//                   {book.availableCopies ?? "N/A"}
//                 </p>
//               </div>

//             </div>

//             {/* Availability */}
//             <div className="mt-6">
//               {book.availableCopies !== undefined &&
//               book.availableCopies > 0 ? (
//                 <span className="inline-flex items-center gap-2 font-semibold text-green-700">
//                   <FaCheckCircle />
//                   Available for borrowing
//                 </span>
//               ) : book.availableCopies === 0 ? (
//                 <span className="font-semibold text-red-600">
//                   Currently unavailable
//                 </span>
//               ) : null}
//             </div>

//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaBookOpen,
  FaUser,
  FaLayerGroup,
  FaCheckCircle,
  FaCalendarAlt,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import type { Book } from "@/types/book";

const getLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function BookDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { data: session, isPending } = authClient.useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
          throw new Error(
            result.message || "Failed to fetch book details"
          );
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

    if (id) {
      fetchBookDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const openBorrowModal = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setBorrowDate(getLocalDate(today));
    setReturnDate(getLocalDate(tomorrow));
    setShowBorrowModal(true);
  };

  const handleBorrow = async () => {
    if (!borrowDate || !returnDate) {
      toast.error("Please select both dates.");
      return;
    }

    if (returnDate <= borrowDate) {
      toast.error("Return date must be at least one day after borrow date.");
      return;
    }

    if (!book || !book.availableCopies || book.availableCopies < 1) {
      toast.error("This book is currently unavailable.");
      return;
    }

    try {
      setSubmitting(true);

      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch("http://localhost:8000/borrows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          borrowDate,
          returnDate,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to borrow this book.");
      }

      setBook((previousBook) =>
        previousBook
          ? {
              ...previousBook,
              availableCopies: Math.max(
                0,
                (previousBook.availableCopies ?? 1) - 1
              ),
            }
          : previousBook
      );

      setShowBorrowModal(false);
      toast.success("Book borrowed successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#dce8df] border-t-[#245c43]" />
          <p className="mt-4 text-gray-600">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

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

  const isAvailable = (book.availableCopies ?? 0) > 0;

  return (
    <main className="min-h-screen bg-[#f8f8f2] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-medium text-[#245c43] transition hover:gap-3"
        >
          <FaArrowLeft />
          Back to All Books
        </Link>

        <div className="grid overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">
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

            <div>
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-[#193d2c]">
                <FaBookOpen className="text-[#638b72]" />
                About This Book
              </h2>

              <p className="leading-7 text-gray-600">
                {book.description ||
                  "No description available for this book."}
              </p>
            </div>

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

            <div className="mt-6">
              {isAvailable ? (
                <span className="inline-flex items-center gap-2 font-semibold text-green-700">
                  <FaCheckCircle />
                  Available for borrowing
                </span>
              ) : (
                <span className="font-semibold text-red-600">
                  Currently unavailable
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={openBorrowModal}
              disabled={!isAvailable}
              className="mt-6 w-full rounded-xl bg-[#245c43] px-6 py-4 font-semibold text-white transition hover:bg-[#19452f] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isAvailable ? "Borrow This Book" : "Not Available"}
            </button>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={() => setShowBorrowModal(false)}
              disabled={submitting}
              className="absolute right-5 top-5 text-xl text-gray-500 transition hover:text-red-500"
              aria-label="Close borrow modal"
            >
              <FaTimes />
            </button>

            <div className="mb-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0e9] text-xl text-[#245c43]">
                <FaBookOpen />
              </span>

              <h2 className="mt-4 text-2xl font-bold text-[#193d2c]">
                Borrow Book
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Confirm your details and select the borrowing dates.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Book Title
                </label>
                <input
                  value={book.title}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Name
                </label>
                <input
                  value={session?.user?.name || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Email
                </label>
                <input
                  value={session?.user?.email || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaCalendarAlt className="text-[#638b72]" />
                  Borrow Date
                </label>
                <input
                  type="date"
                  value={borrowDate}
                  min={getLocalDate(new Date())}
                  onChange={(event) => {
                    const nextBorrowDate = event.target.value;
                    setBorrowDate(nextBorrowDate);

                    if (returnDate <= nextBorrowDate) {
                      const nextDay = new Date(
                        `${nextBorrowDate}T00:00:00`
                      );
                      nextDay.setDate(nextDay.getDate() + 1);
                      setReturnDate(getLocalDate(nextDay));
                    }
                  }}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#245c43]"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaCalendarAlt className="text-[#638b72]" />
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={
                    borrowDate
                      ? (() => {
                          const nextDay = new Date(
                            `${borrowDate}T00:00:00`
                          );
                          nextDay.setDate(nextDay.getDate() + 1);
                          return getLocalDate(nextDay);
                        })()
                      : ""
                  }
                  onChange={(event) => setReturnDate(event.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#245c43]"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowBorrowModal(false)}
                disabled={submitting}
                className="flex-1 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleBorrow}
                disabled={submitting}
                className="flex-1 rounded-lg bg-[#245c43] px-5 py-3 font-semibold text-white transition hover:bg-[#19452f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Processing..." : "Confirm Borrow"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

