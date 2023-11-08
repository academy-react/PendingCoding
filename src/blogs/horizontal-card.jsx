import {
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

export const HorizontalCard = ({ blog }) => {
  const [year, month, day] = new Date(blog.startDate)
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
        src={blog.image}
        alt="blogImage"
        className="h-1/3 w-1/3 rounded-xl"
      />
      <div className="flex flex-col justify-start items-center gap-y-5 w-full px-10">
        <div className="self-center xl:self-start mt-5 xl:mt-0">
          <h1 className="text-lg text-gray-600 dark:text-gray-200 mr-5">
            {blog.title}
          </h1>
        </div>
        <div className="w-full px-5 flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <User2 className="h-5 w-5 text-primary dark:text-gray-200/80" />
            ادمین
          </span>
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <LayoutDashboard className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {blog.category}
          </span>
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <Clock className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {`${getPersianNumbers(day)} ${
              months[month - 1]
            } ${getPersianNumbers(year, true)}`}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <MessagesSquare className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(blog.comments, false)}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <ThumbsUp className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(blog.likes, false)}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <ThumbsDown className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(blog.dislikes, false)}
          </span>
        </div>
        <span className="w-full">
          <p className="text-gray-500 dark:text-gray-200/80 text-justify line-clamp-6">
            {blog.description}
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
