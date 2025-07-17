"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
  params: {
    token: string;
  };
} // this is used to take out token

const ResetPasswordPage = ({ params }: Props) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/reset-password/${params.token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Reset failed");
      }
      setMessage("✅ Password reset successful. Redirecting to sign in...");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err: any) {
      setMessage(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
      </form>
    </div>
  );
};
export default ResetPasswordPage;
