import { useLayoutEffect, useState } from "react";
import { BookX, Grid2x2, Menu, Rows } from "lucide-react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { getCourses } from "../../libs/get-courses";

import NavigatorTracer from "../components/navigator-tracer";
import { Seperator } from "../components/seperator";
import { SearchInput } from "../components/search";
import { Select } from "../components/select";
import { MobileFilter } from "./mobile-filter";
import { Filter } from "./filter";
import { Banner } from "../components/banner";
import { CourseCards } from "./course-cards";
import { cn } from "../../libs/utils";
import { useModal } from "../hooks/use-modal-store";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

const orderBy = [
  {
    id: 19,
    label: "مرتب سازی بر اساس",
    value: "",
  },
  {
    id: 20,
    label: "گران ترین",
    value: "expensive",
  },
  {
    id: 21,
    label: "ارزان ترین",
    value: "cheapest",
  },
  {
    id: 22,
    label: "محبوب ترین",
    value: "popular",
  },
];

export const Courses = () => {
  const [values, setValues] = useState([45000, 450000]);
  const [isVertical, setIsVertical] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();

  const [searchParams] = useSearchParams();

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

  const course_name = searchParams.get("course_name");
  const courseFilterBy = searchParams.get("courseFilterBy");
  const categoryId = searchParams.get("categoryId");
  const isFinished = searchParams.get("isFinished");
  const teacher_name = searchParams.get("teacher_name");
  const itemsPerPage = parseInt(searchParams.get("items-per-page"));

  const filteredData = data?.data.filter((course) => {
    if (
      !course_name &&
      !courseFilterBy &&
      !categoryId &&
      !isFinished &&
      !teacher_name
    )
      return course;
    else if (
      course?.title
        .replace(/ /g, "")
        .replace("آ", "ا")
        .toLowerCase()
        .includes(
          course_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
        )
    )
      return course;
    else if (
      course?.teacher
        .replace(/ /g, "")
        .replace("آ", "ا")
        .toLowerCase()
        .includes(
          teacher_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
        )
    )
      return course;
  });

  return (
    <div className="flex flex-col items-start justify-center gap-y-10 p-20">
      <div className="flex justify-center items-center">
        <NavigatorTracer />
      </div>
      <Banner title="لیست دوره ها" />
      <Seperator />
      <div
        className={cn(
          "w-full flex flex-col xl:flex-row items-start justify-between gap-x-10"
        )}
      >
        {/* Filter div */}
        <Filter values={values} setValues={setValues} />
        <MobileFilter values={values} setValues={setValues} />
        <button
          onClick={() => onOpen("filterDialog")}
          className="text-gray-500 hover:text-gray-700 transition mt-1 xl:hidden"
        >
          <Menu className="h-10 w-10" />
        </button>
        {/* Grid div */}
        <div className="w-full flex flex-col justify-center items-start gap-y-5">
          {/* FilterDiv */}
          <div className="hidden xl:flex justify-between items-center w-full">
            <div>
              <SearchInput
                queryName="course_name"
                placeholder="جستجو کنید ..."
                className="px-4 py-2"
              />
            </div>
            <div className="flex justify-center items-center gap-x-5">
              <Select
                queryName="courseFilterBy"
                placeholder="جستجو بر اساس"
                filters={orderBy}
                className="py-3 px-5"
              />
              <div
                onClick={() => setIsVertical((c) => !c)}
                className="text-gray-500 hover:text-gray-600 transition cursor-pointer"
              >
                {isVertical ? (
                  <Grid2x2 className="h-7 w-7" />
                ) : (
                  <Rows className="h-7 w-7" />
                )}
              </div>
            </div>
          </div>
          {/* Grid Div */}
          {filteredData.length > 0 ? (
            <div className="w-full">
              <CourseCards
                courses={filteredData}
                itemsPerPage={itemsPerPage | 6}
                isVertical={isVertical}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3 items-center justify-center my-52 dark:bg-[#1E1F22]">
              <BookX className="w-12 h-12 text-gray-600/90 dark:text-gray-300" />
              <p className="text-zinc dark:text-gray-300 text-xl">
                درس مورد نظر پیدا نشد
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
