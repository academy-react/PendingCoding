import { useLayoutEffect, useState } from "react";
import { BookX, Grid2x2, Menu, Rows } from "lucide-react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { getCoursesByPagination } from "../core/services/api/get-courses";

import NavigatorTracer from "../components/navigator-tracer";
import { Seperator } from "../components/seperator";
import { SearchInput } from "../components/search";
import { Select } from "../components/select";
import { MobileFilter } from "./mobile-filter";
import { Filter } from "./filter";
import { Banner } from "../components/banner";
import { CourseCards } from "./course-cards";
import { Loading } from "../components/loading";
import { Error } from "../components/error";

import { useModal } from "../hooks/use-modal-store";
import { cn } from "../../libs/utils";

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
  const [values, setValues] = useState([20, 450000]);
  const [isVertical, setIsVertical] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { onOpen } = useModal();

  const [searchParams] = useSearchParams();

  const course_name = searchParams.get("course_name");
  const course_filter_by = searchParams.get("course_filter_by");
  const categoryId = searchParams.get("categoryId");
  const isFinished = searchParams.get("isFinished");
  const teacher_name = searchParams.get("teacher_name");
  const items_per_page = parseInt(searchParams.get("items_per_page"));

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCoursesByPagination(items_per_page || 6),
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

  let filteredData = data?.courseFilterDtos?.filter((course) => {
    if (!course_name && !categoryId && !isFinished && !teacher_name) {
      if (course.cost >= values[0] && course.cost <= values[1]) return course;
    } else if (
      course?.title
        .replace(/ /g, "")
        .replace("آ", "ا")
        .toLowerCase()
        .includes(
          course_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
        )
    ) {
      if (course.cost >= values[0] && course.cost <= values[1]) return course;
    } else if (
      course?.teacherName
        .replace(/ /g, "")
        .replace("آ", "ا")
        .toLowerCase()
        .includes(
          teacher_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
        )
    ) {
      if (course.cost >= values[0] && course.cost <= values[1]) return course;
    }
  });

  if (course_filter_by) {
    const newArray = [...filteredData];
    if (course_filter_by === "expensive")
      newArray.sort((a, b) => b.cost - a.cost);
    if (course_filter_by === "cheapest")
      newArray.sort((a, b) => a.cost - b.cost);
    if (course_filter_by === "popular")
      newArray.sort((a, b) => b.likeCount - a.likeCount);

    filteredData = newArray;
  }

  return (
    <div className="max-w-[1900px] bg-gra mx-auto flex flex-col items-start justify-center gap-y-10 p-10 2xl:p-20">
      <div className="flex justify-center items-center">
        <NavigatorTracer />
      </div>
      <Banner title="لیست دوره ها" />
      <Seperator />
      <div
        className={cn(
          "flex flex-col xl:flex-row items-start justify-between gap-x-5",
          isVertical
            ? "w-full"
            : "w-3/4 lg:w-3/5 xl:w-4/6 2xl:w-full mx-auto xl:mx-0"
        )}
      >
        {/* Filter div */}
        <Filter values={values} setValues={setValues} />
        <MobileFilter values={values} setValues={setValues} />
        <button
          onClick={() => onOpen("filterDialog")}
          className="text-gray-500 hover:text-gray-700 transition mt-0 mb-12 xl:hidden"
        >
          <Menu className="h-10 w-10" />
        </button>
        {/* Grid div */}
        <div className="w-full flex flex-col justify-center items-start gap-y-10">
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
                queryName="course_filter_by"
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
                itemsPerPage={items_per_page | 6}
                isVertical={isVertical}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3 items-center justify-center my-52 dark:bg-gray-800">
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
