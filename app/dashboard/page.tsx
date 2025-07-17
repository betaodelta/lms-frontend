// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <Link
            href="/courses"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Courses
          </Link>

          <Link
            href="/my-courses"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            My Courses
          </Link>

          <Link
            href="/about"
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Contact Us
          </Link>

          <Link
            href="/forgot-password"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Forgot Password
          </Link>

          <button
            onClick={() => {
              const sampleToken = "sample-token-123"; // for demo
              router.push(`/reset-password/${sampleToken}`);
            }}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Go to Reset Password (Demo)
          </button>
        </nav>
      </div>
    </div>
  );
}
