"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { enrollInCourse } from "@/lib/enroll";
import { useAuthStore } from "@/store/auth-store";

const EnrollButton = ({ courseId }: { courseId: string }) => {
  const [loading, setLoading] = useState(false); // loading state
  const [message, setMessage] = useState(""); // success or error message
  const { user } = useAuthStore(); // check if user is logged in

  const handleEnroll = async () => {
    if (!user) {
      setMessage("Please sign in to enroll.");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await enrollInCourse(courseId); // call API
      setMessage("✅ Enrolled successfully!");
    } catch (err: any) {
      setMessage(err.message || "Failed to enroll.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4">
      <button
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Enrolling..." : "Enroll Now"}
      </button>

      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};
export default EnrollButton;
