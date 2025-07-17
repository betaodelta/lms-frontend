// app/courses/[id]/page.tsx

import { getPublishedCourses } from "@/lib/api"; // adjust as per your folder
import EnrollButton from "@/components/EnrollButton";

interface Props {
  params: {
    id: string;
  };
}

const CourseDetailsPage = async ({ params }: Props) => {
  const course = await getPublishedCourses();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p className="text-gray-600 mt-2">{course.subtitle}</p>
      <p className="mt-4">{course.description}</p>
      <img src={course.thumbnail} alt={course.title} className="mt-4 rounded" />
      <EnrollButton courseId={course._id} />
    </div>
  );
};

export default CourseDetailsPage;
