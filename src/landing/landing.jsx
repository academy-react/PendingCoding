import { BestTeachersList } from "./bestTeachers/best-teachers-list";
import { Courses } from "./courses/courses";
import { Intro } from "./heroic/intro/intro";
import { Latest } from "./heroic/latest/latest";
import { Info } from "./info/info";

import { Services } from "./services/services";

export const LandingPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center xl:px-12 py-10">
        <Intro />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between px-20 2xl:px-32 py-10 gap-y-5">
        <Latest />
      </div>
      <div className="flex flex-col justify-center items-center mt-14 mb-10 gap-y-20">
        <Services />
      </div>
      <div className="p-6 my-20">
        <Courses />
      </div>
      <div className="p-6 px-44 my-20">
        <Info />
      </div>
      <div className="p-6 lg:px-44 mt-20">
        <BestTeachersList />
      </div>
    </div>
  );
};
