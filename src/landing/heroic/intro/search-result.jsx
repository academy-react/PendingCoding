import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import { apiCall } from "../../../core/services/interceptor/api-call";

import { Loading } from "../../../components/loading";

import defaultPic from "../../../assets/my-profile.jpg";

const backdrop = {
  initial: {
    y: "-40px",
    transition: { duration: 0.3 },
    opacity: 0,
  },
  start: {
    y: 0,
    transition: { duration: 0.3 },
    opacity: 1,
  },
  exit: {
    y: "-40px",
    transition: { duration: 0.3 },
    opacity: 0,
  },
};

export const SearchResult = () => {
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const value = searchParams.get("value")?.toLowerCase();
  useMemo(() => {
    if (value) {
      try {
        setIsLoading(true);
        let temporary = {};
        apiCall("/Home/GetTeachers").then((res) => {
          const objective = res.data.filter((t) =>
            t?.fullName?.toLowerCase().includes(value)
          );
          temporary = { ...temporary, teachers: objective };
          setDatas(temporary);
        });
        apiCall(
          "/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=6&SortingCol=Active&SortType=DESC&TechCount=0"
        ).then((res) => {
          const objective = res.data.courseFilterDtos.filter((c) =>
            c?.title?.toLowerCase().includes(value)
          );
          temporary = { ...temporary, courses: objective };
          setDatas(temporary);
        });
        apiCall(
          "/News?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC&Query="
        ).then((res) => {
          const objective = res.data.news.filter((c) =>
            c?.title?.toLowerCase().includes(value)
          );
          temporary = { ...temporary, news: objective };
          setDatas(temporary);
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 1300);
      } catch (error) {
        toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
        console.log(error.message);
      } finally {
        setDatas(null);
      }
    } else setDatas(null);
  }, [value]);

  return (
    datas && (
      <motion.div
        variants={backdrop}
        initial="initial"
        animate="start"
        exit="exit"
        className="bg-zinc-200 dark:bg-gray-400 absolute z-50 border-2 border-gray-300/80 w-[clamp(360px,200%,800px)] rounded-md py-2 px-5"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex items-start justify-center gap-x-10">
            {datas?.teachers?.length === 0 ? (
              <div className="max-w-[200px]">
                <h1 className="text-gray-700">استادی یافت نشد</h1>
              </div>
            ) : (
              <div className="h-full w-full max-w-[200px] flex flex-col justify-center items-center gap-y-2">
                <div className="border-b-2 border-gray-700 w-full">
                  <h1 className="text-lg text-center text-gray-900">استاتید</h1>
                </div>
                {datas?.teachers?.map((teacher) => (
                  <div
                    key={teacher.teacherId}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={teacher.pictureAddress || defaultPic}
                      alt="TeacherProfile"
                    />
                    <Link
                      to={`/teachers/${teacher.teacherId}`}
                      className="text-base text-gray-700 hover:text-gray-900 transition-opacity"
                    >
                      {teacher.fullName || "Amir"}
                    </Link>
                  </div>
                ))}
                <Link
                  to={`/teachers?teacher_name=${value}`}
                  className="border-primary dark:border-dark-primary rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition text-sm p-2"
                >
                  مشاهده همه
                </Link>
              </div>
            )}
            {datas?.news?.length === 0 ? (
              <div className="max-w-[200px]">
                <h1 className="text-gray-700">بلاگی یافت نشد</h1>
              </div>
            ) : (
              <div className="w-full h-full max-w-[200px] flex flex-col justify-center items-center gap-y-2">
                <div className="border-b-2 border-gray-700 w-full">
                  <h1 className="text-lg text-center text-gray-900">بلاگ</h1>
                </div>
                {datas?.news?.slice(0.3).map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={blog.currentImageAddressTumb || defaultPic}
                      alt="blogProfile"
                    />
                    <Link
                      to={`/blogs/${blog.id}`}
                      className="text-base text-gray-700 hover:text-gray-900 transition-opacity"
                    >
                      {blog.title || "Amir"}
                    </Link>
                  </div>
                ))}
                <Link
                  to={`/blogs?blog_name=${value}`}
                  className="border-primary dark:border-dark-primary rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition text-sm p-2"
                >
                  مشاهده همه
                </Link>
              </div>
            )}
            {datas?.courses?.length === 0 ? (
              <div className="max-w-[200px]">
                <h1 className="text-gray-700">دوره‌ای یافت نشد</h1>
              </div>
            ) : (
              <div className="w-full h-full max-w-[200px] flex flex-col justify-center items-center gap-y-2">
                <div className="border-b-2 border-gray-700 w-full">
                  <h1 className="text-lg text-center text-gray-900">دوره‌ها</h1>
                </div>
                {datas?.courses?.map((course) => (
                  <div
                    key={course.courseId}
                    className="flex items-center justify-center gap-x-2"
                  >
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src={course.tumbImageAddress || defaultPic}
                      alt="courseProfile"
                    />
                    <Link
                      to={`/courses/${course.courseId}`}
                      className="text-base text-gray-700 hover:text-gray-900 transition-opacity"
                    >
                      {course.title || "Amir"}
                    </Link>
                  </div>
                ))}
                <Link
                  to={`/courses?course_name=${value}`}
                  className="border-primary dark:border-dark-primary rounded-full bg-primary dark:bg-dark-primary hover:bg-primary/90 dark:hover:bg-dark-primary/90 text-white/90 hover:text-white/80 transition text-sm p-2"
                >
                  مشاهده همه
                </Link>
              </div>
            )}
          </div>
        )}
      </motion.div>
    )
  );
};
