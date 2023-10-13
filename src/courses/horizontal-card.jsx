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
import persianDate from "persian-date/dist/persian-date";

import { getPersianNumbers } from "../../libs/get-persian-numbers";

import { StarRate } from "../components/starRate";

export const HorizontalCard = ({ course }) => {
  const [day, month, year] = new persianDate(course.startDate)
    .format("D MMM YYYY")
    .split(" ");
  return (
    <div className="w-full flex flex-col xl:flex-row items-center justify-center bg-white rounded-lg shadow-lg xl:px-10 py-5">
      <img
        loading="lazy"
        src={course.image}
        alt="CourseImage"
        className="h-1/3 w-1/3 rounded-xl"
      />
      <div className="flex flex-col justify-start items-center gap-y-5 w-full px-10">
        <div className="self-center xl:self-start mt-5 xl:mt-0">
          <h1 className="text-lg text-gray-600 mr-5">{course.title}</h1>
        </div>
        <div className="w-full px-5 flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span className="text-gray-500 text-sm flex items-center justify-center gap-x-1">
            <User2 className="h-5 w-5 text-primary" />
            {getPersianNumbers(course.students)}
          </span>
          <span className="text-gray-500 text-sm flex items-center justify-center gap-x-1">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            {getPersianNumbers(course.category)}
          </span>
          <span className="text-gray-500 text-sm flex items-center justify-center gap-x-1">
            <Clock className="h-5 w-5 text-primary" />
            {`تاریخ شروع : ${day} ${month} ${year}`}
          </span>
          <span className="flex items-center justify-center gap-x-1">
            <MessagesSquare className="h-5 w-5 text-primary" />
            {getPersianNumbers(course.comments)}
          </span>
          <span className="flex items-center justify-center gap-x-1">
            <ThumbsUp className="h-5 w-5 text-primary" />
            {getPersianNumbers(course.likes)}
          </span>
          <span className="flex items-center justify-center gap-x-1">
            <ThumbsDown className="h-5 w-5 text-primary" />
            {getPersianNumbers(course.dislikes)}
          </span>
        </div>
        <span className="w-full">
        <p className="text-gray-500 text-right line-clamp-2">
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
            <h2 className="text-gray-600 text-base">{course.teacher}</h2>
            <span className="bg-[#818CF8] rounded-full px-2 py-1">
              <h5 className="text-white text-sm">{course.teacher}</h5>
            </span>
          </span>
        </div>
        <div className="w-full border border-gray-300" />
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-5">
          <span >
            <h5 className="text-gray-600 flex justify-center items-center gap-x-1">
              قیمت : <p className="text-primary">{getPersianNumbers(course.price)}</p> تومان
            </h5>
          </span>
          {course.isPurchased ? (
            <Link
              to={`/courses/${course.id}`}
              className="flex justify-center items-center gap-x-1 text-gray-500 hover:text-gray-800 transition"
            >
              <Eye className="text-primary/90 hover:text-primary transition" />
              مشاهده دوره
            </Link>
          ) : (
            <Link
              to={`/courses/${course.id}`}
              className="flex justify-center items-center gap-x-1 text-gray-500 hover:text-gray-800 transition"
            >
              <Tags className="text-primary/90 rotate-90 hover:text-primary transition" />
              ثبت نام کنید
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
