import { useMemo } from "react";
import {
  Clock,
  Eye,
  LayoutDashboard,
  MessagesSquare,
  Tags,
  ThumbsDown,
  ThumbsUp,
  User2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getPersianNumbers } from "../../libs/get-persian-numbers";
import { useUser } from "../hooks/use-user";

export const HorizontalCard = ({ course }) => {
  const { userData } = useUser();

  const isPurchased = useMemo(
    () =>
      userData?.cart?.some((c) => c.id === course.id) ||
      userData?.myCourses.some((c) => c.id === course.id),
    [userData, course.id]
  );

  const [year, month, day] = new Date(course.startDate)
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
        src={course.image}
        alt="CourseImage"
        className="h-1/3 w-1/3 rounded-xl"
      />
      <div className="flex flex-col justify-start items-center gap-y-5 w-full px-10">
        <div className="self-center xl:self-start mt-5 xl:mt-0">
          <h1 className="text-lg text-gray-600 dark:text-gray-200 mr-5">
            {course.title}
          </h1>
        </div>
        <div className="w-full px-5 flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <User2 className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.students)}
          </span>
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <LayoutDashboard className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {course.category}
          </span>
          <span className="text-gray-500 dark:text-gray-200/80 text-sm flex items-center justify-center gap-x-1">
            <Clock className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {`تاریخ شروع : ${getPersianNumbers(day)} ${
              months[month - 1]
            } ${getPersianNumbers(year, true)}`}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <MessagesSquare className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.comments, false)}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <ThumbsUp className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.likes, false)}
          </span>
          <span className="flex items-center justify-center gap-x-1 text-gray-500 dark:text-gray-200/80">
            <ThumbsDown className="h-5 w-5 text-primary dark:text-gray-200/80" />
            {getPersianNumbers(course.dislikes, false)}
          </span>
        </div>
        <span className="w-full">
          <p className="text-gray-500 dark:text-gray-200/80 text-right line-clamp-2">
            {course.description}
          </p>
        </span>
        <div className="flex flex-col md:flex-row justify-start w-full items-center px-3 py-2">
          <img
            loading="lazy"
            src={course.teacherAvatar}
            className="w-14 h-14 rounded-full"
            alt="TeacherProfile"
          />
          <span className="flex flex-col justify-center items-start gap-y-1 px-3 py-1">
            <h2 className="text-gray-600 dark:text-gray-200 text-base">
              {course.teacher}
            </h2>
            <span className="bg-[#818CF8] dark:bg-[#6770c5] rounded-full px-2 py-1">
              <h5 className="text-gray-100 dark:text-gray-200 text-sm">
                {course.teacher}
              </h5>
            </span>
          </span>
        </div>
        <div className="w-full border border-gray-300 dark:border-gray-500" />
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span>
            <h5 className="text-gray-600 dark:text-gray-200/80 flex justify-center items-center gap-x-1">
              قیمت :{" "}
              <p className="text-primary dark:text-gray-200">
                {getPersianNumbers(course.price, false)}
              </p>{" "}
              تومان
            </h5>
          </span>
          {isPurchased ? (
            <Link
              to={`/courses/${course.id}`}
              className="flex justify-center items-center gap-x-1 text-gray-500 dark:text-gray-200 dark:hover:text-gray-200/80 hover:text-gray-800 transition"
            >
              <Eye />
              مشاهده دوره
            </Link>
          ) : (
            <Link
              to={`/courses/${course.id}`}
              className="flex justify-center items-center gap-x-1 text-gray-500 dark:text-gray-200 dark:hover:text-gray-200/80 hover:text-gray-800 transition"
            >
              <Tags />
              ثبت نام کنید
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
