import { getPersianNumbers } from "../../../libs/get-persian-numbers";

import { TeacherLatestImage } from "./teacher-latest-image";

import { Link } from "react-router-dom";
import { ArrowUpLeft } from "lucide-react";

import teacherImage from "../../assets/teacher-prof.svg";
import fun from "../../assets/fun.svg";

const teachers = [
  {
    id: 1,
    name: "دکتر بحرالعلومی",
    expert: "توسعه دهنده فرانت",
    image: teacherImage,
  },
  {
    id: 2,
    name: "دکتر بحرالعلومی",
    expert: "توسعه دهنده فرانت",
    image: teacherImage,
  },
  {
    id: 3,
    name: "دکتر بحرالعلومی",
    expert: "توسعه دهنده فرانت",
    image: teacherImage,
  },
];

export const Info = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-16">
      <h1 className="text-gray-500 text-4xl xl:text-2xl">
        تجربه یادگیری مهارت در مسیری حرفه ای
      </h1>
      <div className="flex w-full flex-col xl:flex-row items-center justify-center xl:items-start xl:justify-start xl:gap-x-[268px] gap-y-20">
        {/* Info div */}
        <div className="flex flex-col items-center justify-center gap-y-5">
          <div className="text-gray-400 text-sm text-center xl:text-start xl:ml-auto">
            <h3 className="text-gray-500 text-2xl">{getPersianNumbers(400)}</h3>
            دوره مدرن آموزشی
          </div>
          <div className="text-gray-400 text-sm text-center xl:text-start xl:ml-auto">
            <h3 className="text-gray-500 text-2xl">{`${getPersianNumbers(
              69
            )}%`}</h3>
            رضایت مندی دانشجویان
          </div>
          <div>
            <div className="group flex flex-col items-center xl:items-start justify-center">
              {teachers.map((teacher, index) => (
                <TeacherLatestImage
                  key={teacher.id}
                  id={teacher.id}
                  index={index}
                  name={teacher.name}
                  image={teacher.image}
                />
              ))}
            </div>
            <h5 className="text-gray-400 text-sm">آخرین اساتید مجموعه</h5>
          </div>
        </div>

        {/* FunImage div */}
        <img src={fun} alt="funPic" />
      </div>
      {/* bottom div */}
      <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-y-10">
        <div className="flex flex-col xl:flex-row gap-y-10 items-center justify-center gap-x-5">
          <span className="w-28 h-28 rounded-full bg-gray-700" />
          <div className="flex flex-col items-center xl:items-start justify-center gap-y-1">
            <h1 className="text-3xl text-gray-600">
              {getPersianNumbers(443223)}
            </h1>
            <h2 className="text-gray-500 text-lg">دانشجویان مجموعه</h2>
          </div>
        </div>
        <div className="w-96 flex flex-col justify-center items-center gap-y-5">
          <div className="group w-full flex flex-col justify-center items-center gap-y-5">
            <Link
              to="/about"
              className="w-full flex justify-between items-center gap-x-10 text-gray-500 hover:text-primary/80 transition"
            >
              چرا باید مجموعه آموزشی سپهر را انتخاب کنیم ؟
              <ArrowUpLeft className="h-6 w-6" />
            </Link>
            <div className="w-full border border-gray-400 group-hover:border-primary/80 transition" />
          </div>
          <div className="w-full group flex flex-col justify-center items-center gap-y-5">
            <Link
              to="/about"
              className="w-full flex justify-between items-center gap-x-10 text-gray-500 hover:text-primary/80 transition"
            >
              سوالات خود را با ما به اشتراک بگذارید
              <ArrowUpLeft className="h-6 w-6" />
            </Link>
            <div className="w-full border border-gray-400 group-hover:border-primary/80 transition" />
          </div>
        </div>
      </div>
    </div>
  );
};
