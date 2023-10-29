import { Link } from "react-router-dom";

export const VerticalCard = ({ id, name, image }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 my-5">
      <img
        loading="lazy"
        src={image}
        alt="CourseImage"
        className="w-[130px] h-[130px] rounded-full"
      />
      <h1 className="text-base text-gray-600 mr-5">{name}</h1>
      <Link
        to={`/teachers/${id}`}
        className="px-5 py-2 border-2 border-primary bg-white/20 hover:bg-[#EEEEEE] text-sm text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
      >
        نمایش پروفایل
      </Link>
    </div>
  );
};
