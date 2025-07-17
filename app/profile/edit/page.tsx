"use client";
import { useAuthStore } from "@/store/auth-store";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditProfilePage = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [avatar, setAvatar] = useState<File | null>(null); // This is used for to upload the file
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error message

  // handle input change for text fields

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // update form state
  };

  //handle avatar file upload

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]); // store uploaded file
    }
  };

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (avatar) formData.append("avatar", avatar);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/profile`,
        {
          method: "PATCH",
          credentials: "include", // send cookies
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Profile update failed");

      setUser(data.date.user); // update global user store
      router.push("/profile"); // redirect to profile page
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false); // done loading;
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="w-full"
          placeholder="Upload avatar"
          title="Upload avatar"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
