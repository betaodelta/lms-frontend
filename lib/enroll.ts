export const enrollInCourse = async (courseId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course/enroll/${courseId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to enroll in course");
  }
  return data;
};
