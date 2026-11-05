
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function TestTokenPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testAddBook = async () => {
    setLoading(true);
    setResult("");

    try {
      // Generate JWT
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Failed to generate JWT");
      }

      // Send JWT with Add Book request
      const response = await fetch("http://localhost:8000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          title: "JWT Secure Test Book",
          author: "Test Author",
          category: "Fiction",
          image: "https://example.com/book.jpg",
          description: "Testing JWT protected Add Book API",
          totalCopies: 2,
        }),
      });

      const responseData = await response.json();

      setResult(
        `Status: ${response.status}\n${JSON.stringify(
          responseData,
          null,
          2
        )}`
      );
    } catch (error) {
      console.error(error);
      setResult("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">
        JWT Protected Add Book Test
      </h1>

      <button
        onClick={testAddBook}
        disabled={loading}
        className="rounded-lg bg-green-700 px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test Add Book with JWT"}
      </button>

      {result && (
        <pre className="max-w-2xl overflow-auto rounded-lg bg-gray-100 p-5 text-sm text-black">
          {result}
        </pre>
      )}
    </div>
  );
}