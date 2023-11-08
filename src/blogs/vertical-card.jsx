import { Calendar, LayoutDashboard, MoveLeft, User2 } from "lucide-react";
import { Link } from "react-router-dom";

import { getPersianNumbers } from "../../libs/get-persian-numbers";

import { StarRate } from "../components/starRate";

export const VerticalCard = ({ blog }) => {
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
    <div className="w-[350px] mx-auto flex flex-col items-center justify-center gap-y-5 bg-gray-100 dark:bg-gray-600 rounded-t-3xl rounded-b-lg s  overflow-hidden">
      <img loading="lazy" src={blog.image} alt="blogImage" className="w-full" />
      <div className="self-start">
        <h1 className="text-lg text-gray-600 dark:text-gray-200 mr-5">
          {blog.title}
        </h1>
      </div>
      <div className="w-full px-5 flex justify-between items-center">
        <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
          <User2 className="h-4 w-4 text-primary dark:text-gray-200/80" />
          ادمین
        </span>
        <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
          <Calendar className="h-4 w-4 text-primary dark:text-gray-200/80" />
          {`${getPersianNumbers(day)} ${months[month - 1]} ${getPersianNumbers(
            year,
            true
          )}`}
        </span>
        <span className="flex flex-row-reverse items-center justify-center gap-x-1">
          <StarRate data={blog} queryKey="courses" />
        </span>
      </div>
      <div className="flex justify-start w-full items-center px-3 py-2">
        <span className="flex flex-col justify-center items-start gap-y-1 px-3 py-1">
          <p className="text-sm text-gray-500 dark:text-gray-200/80 line-clamp-3 text-justify">
            {blog.description}
          </p>
        </span>
      </div>
      <div className="w-5/6 border border-gray-300 dark:border-gray-500" />
      <div className="w-full flex justify-between items-center px-4 pt-2 pb-7">
        <span>
          <h5 className="text-gray-600 dark:text-gray-200/80 flex justify-center items-center gap-x-1">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            {blog.isBlog ? "مقاله" : "خبر "}
          </h5>
        </span>
        <Link
          to={`/blogs/${blog.id}`}
          className="flex justify-center items-center gap-x-2 text-primary hover:text-primary/80 dark:text-gray-200 dark:hover:text-gray-200/80 transition"
        >
          مشاهده {blog.isBlog ? "مقاله" : "خبر"}
          <MoveLeft />
        </Link>
      </div>
    </div>
  );
};
