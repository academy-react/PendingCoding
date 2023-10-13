import { MoveDown, MoveUp } from "lucide-react";

export const BestTeachers = ({ teachers }) => {
  return (
    <div className="hidden lg:flex flex-row-reverse items-center justify-evenly bg-white h-16 rounded-full my-64 gap-x-44">
      {teachers.map((teacher, index) => {
        return index % 2 === 0 ? (
          <div
            key={teacher.id}
            className="flex flex-col items-center justify-center mt-16 gap-y-10"
          >
            <p className="text-gray-600 text-lg">
              {teacher.name}
              <MoveUp className="text-gray-400/70 mx-auto h-16 w-16" />
            </p>
            <span>
              <img src={teacher.image} alt="TeacherProf" />
            </span>
          </div>
        ) : (
          <div
            key={teacher.id}
            className="flex flex-col items-center justify-center mb-16 gap-y-10"
          >
            <span>
              <img src={teacher.image} alt="TeacherProf" />
            </span>
            <p className="text-gray-600 text-lg">
              <MoveDown className="text-gray-400/70 mx-auto h-16 w-16" />
              {teacher.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
