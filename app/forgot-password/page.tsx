"use client";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState(""); // Initiallt my email was empty
  const [message, setMessage] = useState(""); // intially set message as empty this message denotes as Success or error message
  const [loading, setLoading] = useState(false); // Loading indicator

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setMessage("✅ Check your email for the reset link.");
    } catch (err: any) {
      setMessage(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  );
};
export default ForgotPasswordPage;
