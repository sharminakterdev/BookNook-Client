"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function TestTokenPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    setResult("");

    try {
      // Get Better Auth JWT
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Failed to generate JWT");
      }

      // Send JWT to Express Backend
      const response = await fetch(
        "http://localhost:8000/protected",
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

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
      setResult("JWT verification failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">
        Express JWT Verification Test
      </h1>

      <button
        onClick={testBackend}
        disabled={loading}
        className="rounded-lg bg-green-700 px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Checking..." : "Test Backend JWT"}
      </button>

      {result && (
        <pre className="max-w-full overflow-auto rounded-lg bg-gray-100 p-5 text-sm text-black">
          {result}
        </pre>
      )}
    </div>
  );
}