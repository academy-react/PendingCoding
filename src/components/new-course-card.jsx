import { Link } from "react-router-dom";
import { getPersianNumbers } from "../../libs/get-persian-numbers";

export const NewCourseCard = ({ id, title, price, teacher, image }) => {
  return (
    <div className="py-2">
      <Link
        to={`/courses/${id}`}
        className="flex items-center justify-center gap-x-3 hover:bg-gray-200 hover:shadow-lg dark:hover:bg-gray-700 transition px-5 py-2 rounded-xl"
      >
        <img
          src={image}
          alt="courseImage"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col justify-start items-start gap-y-2">
          <h2 className="text-gray-700 dark:text-gray-200">{title}</h2>
          <span className="text-xs text-white bg-[#818CF8] dark:bg-[#6770c5] py-[2px] px-4 rounded-full">
            {`${getPersianNumbers(price)} تومان`}
          </span>
          <h2 className="text-gray-500 dark:text-gray-300/80 text-xs">
            {teacher}
          </h2>
        </div>
      </Link>
    </div>
  );
};
