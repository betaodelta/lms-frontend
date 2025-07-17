"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  course: {
    _id: string;
    title: string;
    subtitle: string;
    price: number;
    thumbnail: string;
    instructor: { name: string };
  };
};

const CourseCard = ({ course }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-all">
      <Image
        src={course.thumbnail}
        alt={course.title}
        width={400}
        height={200}
        className="rounded-xl w-full h-48 object-cover"
      />
      <h3 className="text-lg font-semibold mt-2">{course.title}</h3>
      <p className="text-sm text-gray-600">{course.subtitle}</p>
      <p className="text-sm mt-1">Instructor: {course.instructor.name}</p>
      <p className="text-md font-bold mt-1">₹{course.price}</p>
      <Link
        href={`/courses/${course._id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        View Course
      </Link>
    </div>
  );
};

export default CourseCard;
