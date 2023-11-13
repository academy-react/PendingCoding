import { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { Loading } from "./loading";
import { Error } from "./error";

import { getPersianNumbers } from "../../libs/get-persian-numbers";

import defaultCourseThumbnail from "../assets/default-course-thumbnail.png";
import { getCourses } from "../core/services/api/get-courses";

export const NewCourseCard = () => {
  const [isMounted, setIsMounted] = useState(false);

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(3),
    enabled: false,
  });
  useLayoutEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      refetchCourses();
    }
  }, [isMounted, refetchCourses]);
  if (coursesLoading) return <Loading />;
  if (coursesError) return <Error />;
  return (
    <>
      {courses?.map((course) => (
        <div key={course.id} className="py-2">
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center justify-center gap-x-3 hover:bg-gray-200 hover:shadow-lg dark:hover:bg-gray-700 transition px-5 py-2 rounded-xl"
          >
            <img
              src={course.tumbImageAddress || defaultCourseThumbnail}
              alt="courseImage"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col justify-start items-start gap-y-2">
              <h2 className="text-gray-700 dark:text-gray-200">
                {course.title}
              </h2>
              <span className="text-xs text-white bg-[#818CF8] dark:bg-[#6770c5] py-[2px] px-4 rounded-full">
                {`${getPersianNumbers(course.cost)} تومان`}
              </span>
              <h2 className="text-gray-500 dark:text-gray-300/80 text-xs">
                {course.teacherName}
              </h2>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};
