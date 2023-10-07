import { Clock, Tags, User2 } from "lucide-react";
import { Link } from "react-router-dom";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { cn } from "../../../libs/utils";

import { StarRate } from "../../components/starRate";

export const CourseCard = ({
  id,
  index,
  title,
  time,
  students,
  stars,
  teacher,
  price,
  image,
}) => {
  return (
    <div className={index === 1 && "xl:mt-24"}>
      <div className="w-[370px] mx-auto flex flex-col items-center justify-center gap-y-5 bg-white rounded-t-3xl rounded-b-lg overflow-hidden">
        <img src={image} alt="CourseImage" className="w-full" />
        <div className="self-start">
          <h1 className="text-lg text-gray-600 mr-5">{title}</h1>
        </div>
        <div className="w-full px-5 flex justify-between items-center">
          <span className="text-gray-500 text-sm flex items-center justify-center gap-x-1">
            <User2 className="h-4 w-4" />
            {getPersianNumbers(students)}
          </span>
          <span className="text-gray-500 text-sm flex items-center justify-center gap-x-1">
            <Clock className="h-4 w-4" />
            {getPersianNumbers(time)} ساعت
          </span>
          <span className="flex flex-row-reverse items-center justify-center gap-x-1">
            <StarRate />
          </span>
        </div>
        <div className="flex justify-start w-full items-center px-3 py-2">
          <img
            src={teacher.image}
            className="w-14 h-14 rounded-full object-contain"
            alt="TeacherProfile"
          />
          <span className="flex flex-col justify-center items-start gap-y-1 px-3 py-1">
            <h2 className="text-gray-600 text-base">{teacher.name}</h2>
            <span className="bg-[#818CF8] rounded-full px-2 py-1">
              <h5 className="text-white text-sm">{teacher.expert}</h5>
            </span>
          </span>
        </div>
        <div className="w-5/6 border border-gray-300" />
        <div className="w-full flex justify-between items-center px-4 pt-2 pb-7">
          <span>
            <h5 className="text-gray-600">{`قیمت : ${getPersianNumbers(
              price
            )} تومان`}</h5>
          </span>
          <Link
            to={`/courses/${id}`}
            className="flex justify-center items-center gap-x-1 text-gray-500 hover:text-gray-800 transition"
          >
            <Tags className="text-primary/90 rotate-90 hover:text-primary transition" />
            ثبت نام کنید
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "hidden xl:block w-1 h-52 bg-gradient-to-b from-[#474393] to-[#E9E9EE] mx-auto mt-5",
          index === 1 && "h-28"
        )}
      />
    </div>
  );
};
