import {
  Calendar,
  Clock,
  LayoutDashboard,
  MessagesSquare,
  MoveLeft,
  ThumbsDown,
  ThumbsUp,
  User2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getPersianNumbers } from "../../libs/get-persian-numbers";
import { TooTip } from "../components/tool-tip";

export const HorizontalCard = ({ blog }) => {
  const updateDate = new Date(blog?.updateDate)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const months = [
    "فروردين",
    "ارديبهشت",
    "خرداد",
    "تير",
    "مرداد",
    "شهريور",
    "مهر",
    "آبان",
    "آذر",
    "دي",
    "بهمن",
    "اسفند",
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg xl:px-10 py-5">
      <img
        loading="lazy"
        src={blog.currentImageAddressTumb}
        alt="blogImage"
        className="xl:h-1/3 xl:w-1/3 object-contain rounded-xl"
      />
      <div className="flex flex-col justify-start items-center gap-y-10 w-full px-10">
        <div className="self-center xl:self-start mt-5 xl:mt-0">
          <h1 className="text-lg text-gray-600 dark:text-gray-200 mr-5">
            {blog.title}
          </h1>
        </div>
        <div className="w-full px-5 flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <User2 className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {blog.addUserFullName}
          </span>
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <LayoutDashboard className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {blog.newsCatregoryName ? "مقالات" : "خبر "}
          </span>
          <TooTip name="آخرین بروزرسانی">
            <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
              <Calendar className="h-4 w-4 text-primary dark:text-gray-200/80" />
              {`${getPersianNumbers(updateDate?.[2], true)} ${
                months[updateDate?.[1] - 1]
              } ${getPersianNumbers(updateDate?.[0], true)}`}
            </span>
          </TooTip>
        </div>
        <span className="w-full">
          <p className="text-gray-500 dark:text-gray-200/80 text-justify line-clamp-6">
            {blog.miniDescribe}
          </p>
        </span>
        <div className="w-full border border-gray-300" />
        <Link
          to={`/blogs/${blog.id}`}
          className="flex justify-center items-center gap-x-2 text-primary hover:text-primary/80 dark:text-gray-200 dark:hover:text-gray-200/80 transition mr-auto"
        >
          مشاهده {blog.isBlog ? "مقاله" : "خبر"}
          <MoveLeft />
        </Link>
      </div>
    </div>
  );
};
