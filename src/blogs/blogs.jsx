import { useLayoutEffect, useState } from "react";
import { Grid2x2, Newspaper, Rows } from "lucide-react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { getCourses } from "../../libs/get-courses";

import NavigatorTracer from "../components/navigator-tracer";
import { Seperator } from "../components/seperator";
import { SearchInput } from "../components/search";
import { Select } from "../components/select";
import { Banner } from "../components/banner";
import { cn } from "../../libs/utils";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { BlogCards } from "./blog-cards";

const orderBy = [
    {
      id: 19,
      label: "مرتب سازی بر اساس",
      value: "",
    },
    {
      id: 20,
      label: "طولانی ترین",
      value: "longest",
    },
    {
      id: 21,
      label: "قدیمی ترین",
      value: "oldest",
    },
    {
      id: 22,
      label: "محبوب ترین",
      value: "popular",
    },
  ];

export const Blogs = () => {
  const [isVertical, setIsVertical] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

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

  const blog_name = searchParams.get("blog_name");
  const blogFilterBy = searchParams.get("blogFilterBy");
  const itemsPerPage = parseInt(searchParams.get("items-per-page"));

  const filteredData = data?.data.filter((blog) => {
    if (
      !blog_name &&
      !blogFilterBy
    )
      return blog;
    else if (
      blog?.title
        .replace(/ /g, "")
        .replace("آ", "ا")
        .toLowerCase()
        .includes(
            blog_name?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
        )
    )
      return blog;
    else if (
      blog?.teacher
        .replace(/ /g, "")
        .replace("آ", "ا")
        .toLowerCase()
        .includes(
            blogFilterBy?.replace(/ /g, "").replace("آ", "ا").toLowerCase()
        )
    )
      return blog;
  });

  return (
    <div className="max-w-[1900px] mx-auto flex flex-col items-start justify-center gap-y-10 p-20">
      <div className="flex justify-center items-center">
        <NavigatorTracer />
      </div>
      <Banner title="لیست بلاگ" />
      <Seperator />
      <div
        className={cn(
          "w-full flex flex-col xl:flex-row items-start justify-between gap-x-10"
        )}
      >
        {/* Grid div */}
        <div className="w-full flex flex-col justify-center items-start gap-y-5">
          {/* FilterDiv */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-2">
            <div>
              <SearchInput
                queryName="blog_name"
                placeholder="جستجو کنید ..."
                className="px-4 py-2"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
              <Select
                queryName="blogFilterBy"
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
              <BlogCards
                courses={filteredData}
                itemsPerPage={itemsPerPage | 6}
                isVertical={isVertical}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-3 items-center justify-center my-52 dark:bg-[#1E1F22]">
              <Newspaper className="w-12 h-12 text-gray-600/90 dark:text-gray-300" />
              <p className="text-zinc dark:text-gray-300 text-xl">
                بلاگ مورد نظر پیدا نشد
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
