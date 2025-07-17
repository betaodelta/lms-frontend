"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", name);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/profile`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      // Optionally, update user state here if you have a way to do so
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProtectedRoute>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
              placeholder="Enter your name"
              title="Name"
            />
          </div>

          <div>
            <label className="block font-medium">Avatar (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="w-full"
              title="Avatar"
              placeholder="Upload your avatar"
            />
          </div>

          {message && <p className="text-blue-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
