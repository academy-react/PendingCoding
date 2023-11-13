import { useLayoutEffect, useState } from "react";

import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";
import { useQuery } from "react-query";

import { getAllTeachers } from "../../core/services/api/get-teacher";

import { TeacherLatestImage } from "./teacher-latest-image";
import { Loading } from "../../components/loading";
import { Error } from "../../components/error";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";

import fun from "../../assets/fun.svg";
import defaultImage from "../../assets/my-profile.jpg";

export const Info = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => getAllTeachers(),
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
  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center gap-y-16">
      <h1 className="text-gray-500 dark:text-gray-300 text-4xl xl:text-2xl">
        تجربه یادگیری مهارت در مسیری حرفه ای
      </h1>
      <div className="flex w-full flex-col xl:flex-row items-center justify-center xl:items-start xl:justify-start xl:gap-x-[268px] gap-y-20">
        {/* Info div */}
        <div className="flex flex-col items-center justify-center gap-y-5">
          <div className="text-gray-400 dark:text-gray-300/80 text-sm text-center xl:text-start xl:ml-auto">
            <h3 className="text-gray-500 dark:text-gray-300/80 text-2xl">
              {getPersianNumbers(400)}
            </h3>
            دوره مدرن آموزشی
          </div>
          <div className="text-gray-400 dark:text-gray-300/80 text-sm text-center xl:text-start xl:ml-auto">
            <h3 className="text-gray-500 dark:text-gray-300/80 text-2xl">{`${getPersianNumbers(
              69
            )}%`}</h3>
            رضایت مندی دانشجویان
          </div>
          <div>
            <div className="group flex flex-col items-center xl:items-start justify-center">
              {data?.slice(0, 3).map((teacher, index) => (
                <TeacherLatestImage
                  key={teacher.id}
                  id={teacher.id}
                  index={index}
                  name={teacher.fullName || "امیرعباس"}
                  image={teacher.pictureAddress || defaultImage}
                />
              ))}
            </div>
            <h5 className="text-gray-400 dark:text-gray-300/80 text-sm">
              آخرین اساتید مجموعه
            </h5>
          </div>
        </div>

        {/* FunImage div */}
        <img src={fun} alt="funPic" />
      </div>
      {/* bottom div */}
      <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-y-10">
        <div className="flex flex-col xl:flex-row gap-y-10 items-center justify-center gap-x-5">
          <span className="w-28 h-28 rounded-full bg-gray-700 dark:bg-gray-400" />
          <div className="flex flex-col items-center xl:items-start justify-center gap-y-1">
            <h1 className="text-3xl text-gray-600 dark:text-gray-300/80">
              {getPersianNumbers(443223)}
            </h1>
            <h2 className="text-gray-500 dark:text-gray-300/80 text-lg">
              دانشجویان مجموعه
            </h2>
          </div>
        </div>
        <div className="w-96 flex flex-col justify-center items-center gap-y-5">
          <div className="group w-full flex flex-col justify-center items-center gap-y-5">
            <Link
              to="/about"
              className="w-full flex justify-between items-center gap-x-10 text-gray-500 dark:text-gray-300/80 group-hover:text-primary/80 dark:group-hover:text-gray-200 transition"
            >
              چرا باید مجموعه آموزشی سپهر را انتخاب کنیم ؟
              <ArrowUpLeft className="h-6 w-6" />
            </Link>
            <div className="w-full border border-gray-400 group-hover:border-primary/80 dark:group-hover:border-dark-primary/80 transition" />
          </div>
          <div className="w-full group flex flex-col justify-center items-center gap-y-5">
            <Link
              to="/about"
              className="w-full flex justify-between items-center gap-x-10 text-gray-500 dark:text-gray-300/80 hover:text-primary/80 dark:group-hover:text-gray-200 transition"
            >
              سوالات خود را با ما به اشتراک بگذارید
              <ArrowUpLeft className="h-6 w-6" />
            </Link>
            <div className="w-full border border-gray-400 group-hover:border-primary/80 dark:group-hover:border-dark-primary/80 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};
