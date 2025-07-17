"use client"; //  mark the page as a client component to use hooks
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MyCoursesPage = () => {
  const { user, loading } = useAuthStore(); // Access user and loading state
  const [courses, setCourses] = useState<any[]>([]); // state to hold enrolled courses
  const [error, setError] = useState(""); // State to hold error message
  const router = useRouter();

  useEffect(() => {
    // if user is not logged in then redirect him to sigin page
    if (!loading && !user) {
      router.push("/signin");
    }

    // If user is loged in , load their enrolled courses
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/profile`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setCourses(data.data.user.enrolledCourses || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
    };
    if (user) {
      fetchCourses();
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="text-center mt-8">Loading your courses...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🎓 My Enrolled Courses</h1>

      {courses.length === 0 ? (
        <p>You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((item) => (
            <Link
              key={item.course._id}
              href={`/courses/${item.course._id}`}
              className="border rounded p-4 hover:shadow transition"
            >
              <img
                src={item.course.thumbnail}
                alt={item.course.title}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">
                {item.course.title}
              </h2>
              <p className="text-sm text-gray-600">
                {item.course.description?.substring(0, 100)}...
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
