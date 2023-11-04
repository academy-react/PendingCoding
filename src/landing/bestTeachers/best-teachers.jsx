import { MoveDown, MoveUp } from "lucide-react";

export const BestTeachers = ({ teachers }) => {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <div className="hidden lg:flex flex-row-reverse items-center justify-evenly bg-white dark:bg-gray-500 h-16 rounded-full my-64 gap-x-44">
        {teachers.map((teacher, index) => {
          return index % 2 === 0 ? (
            <div
              key={teacher.id}
              className="flex flex-col items-center justify-center lg:mt-10 xl:mt-16 gap-y-10"
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {teacher.name}
                <MoveUp className="text-gray-400/70 dark:text-gray-400 mx-auto h-16 w-16" />
              </p>
              <span>
                <img
                  src={teacher.image}
                  alt="TeacherProf"
                  className="object-contain w-44 h-44"
                />
              </span>
            </div>
          ) : (
            <div
              key={teacher.id}
              className="flex flex-col items-center justify-center lg:mb-10 xl:mb-16 gap-y-10"
            >
              <span>
                <img
                  src={teacher.image}
                  alt="TeacherProf"
                  className="object-contain w-44 h-44"
                />
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                <MoveDown className="text-gray-400/70 dark:text-gray-400 mx-auto h-16 w-16" />
                {teacher.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
