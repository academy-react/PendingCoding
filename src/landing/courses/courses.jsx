import { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";

import { CourseCard } from "./course-card";
import { Heading } from "../../components/heading";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import { getCourses } from "../../../libs/get-courses";

export const Courses = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => getCourses("/items"),
    staleTime: 5000,
    enabled: false,
  });

  useLayoutEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      refetch();
    }
  }, [isMounted, refetch]);

  if (!isMounted) return null;

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <div>
      <Heading
        title="آخرین دوره های مجموعه"
        description="برترین دوره های آموزشی با بروز ترین و مدرن ترین روش آموزش"
        to="/courses"
      />
      <div className="py-10 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-32">
        {data?.data.slice(0, 3).map((course, index) => (
          <CourseCard key={index} index={index} course={course} />
        ))}
      </div>
    </div>
  );
};
