"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

const ChangePasswordPage = () => {
  const router = useRouter();

  const { user } = useAuthStore(); // Get current logged-in user
  const [currentPassword, setCurrentPassword] = useState<string>(""); // state to store current password input
  const [newPassword, setNewPassword] = useState<string>(""); // state to store new password input
  const [error, setError] = useState<string>(""); // state for showing error messages
  const [success, setSuccess] = useState<string>(""); // state for success message
  const [loading, setLoading] = useState(false); // state for loading indicator

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    setError(""); // reset any previous error
    setSuccess(""); // reset success
    setLoading(true); // set loading to true while request is in progress

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/change-password`,
        {
          method: "PATCH",
          credentials: "include", // send the auth token via cookie
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to change password");
      }
      setSuccess("Password updated successfully ✅");
      setCurrentPassword(""); // clear input
      setNewPassword(""); // clear input
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false); // hide loading indicator
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Change Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />

        {/* Error or Success Messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};
export default ChangePasswordPage;
