import { MoveLeft, MoveRight } from "lucide-react";

export const BestTeachersMobile = ({ teachers }) => {
  return (
    <div className="lg:hidden relative flex flex-col items-center justify-evenly my-32">
      <div className="w-16 h-full bg-white dark:bg-gray-500 rounded-full absolute z-10" />
      {teachers.map((teacher, index) => {
        return index % 2 === 0 ? (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-x-16"
          >
            <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center justify-center gap-x-5">
              {teacher.name}
              <MoveRight className="text-gray-400/70 dark:text-gray-400 mx-auto h-20 w-20" />
            </p>
            <span>
              <img src={teacher.image} alt="TeacherPic" />
            </span>
          </div>
        ) : (
          <div
            key={index}
            className="flex flex-row justify-between items-center gap-x-16"
          >
            <span>
              <img src={teacher.image} alt="TeacherPic" />
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-lg flex items-center justify-center gap-x-5">
              <MoveLeft className="text-gray-400/70 dark:text-gray-400 mx-auto h-20 w-20" />
              {teacher.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
