import CourseCard from "@/components/CourseCard";
import { getPublishedCourses } from "@/lib/api";

export default async function CoursesPage() {
  const data = await getPublishedCourses();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.courses?.map((course: any) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}
