
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaBookOpen, FaImage } from "react-icons/fa";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function AddBookPage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session?.user) {
      toast.error("Please login before adding a book!");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bookData = {
      title: String(formData.get("title") || "").trim(),
      author: String(formData.get("author") || "").trim(),
      category: String(formData.get("category") || ""),
      image: String(formData.get("image") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      totalCopies: Number(formData.get("totalCopies")),
    };

    try {
      setLoading(true);

      // Generate JWT Token
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error("Authentication token not found!");
      }

      // Send Book Data with JWT
      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(bookData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add book");
      }

      toast.success("Book added successfully! 📚");

      form.reset();
      setImageUrl("");

      router.refresh();
    } catch (error) {
      console.error("Add Book Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <FaBookOpen className="text-3xl text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Add a New Book
          </h1>

          <p className="mt-3 text-gray-500">
            Share your favorite books with the BookNook community.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title & Author */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Book Title *
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  Author Name *
                </label>

                <input
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-green-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Category *
              </label>

              <select
                name="category"
                required
                defaultValue=""
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-500"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Total Copies */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Total Copies *
              </label>

              <input
                type="number"
                name="totalCopies"
                min="1"
                defaultValue="5"
                required
                placeholder="Enter total copies"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-green-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Book Image URL *
              </label>

              <div className="relative">
                <FaImage className="absolute left-4 top-4 text-green-600" />

                <input
                  type="url"
                  name="image"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/book-image.jpg"
                  className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 text-gray-900 outline-none focus:border-green-500"
                />
              </div>

              {imageUrl && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    Image Preview
                  </p>

                  <img
                    src={imageUrl}
                    alt="Book preview"
                    className="h-48 w-36 rounded-lg border object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block font-semibold text-gray-700">
                Short Description *
              </label>

              <textarea
                name="description"
                rows={4}
                required
                placeholder="Write a short description about this book..."
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-900 outline-none focus:border-green-500"
              />
            </div>

            {/* User Information */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  User Name
                </label>

                <input
                  type="text"
                  value={session?.user?.name || ""}
                  readOnly
                  placeholder="Loading user name..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-700">
                  User Email
                </label>

                <input
                  type="email"
                  value={session?.user?.email || ""}
                  readOnly
                  placeholder="Loading user email..."
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isPending || !session?.user}
              className="w-full rounded-lg bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Adding Book..."
                : isPending
                  ? "Loading User..."
                  : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
