import { Banner } from "../../components/banner";
import { BoughtCourses } from "./bought-courses";

export const MyCourses = () => {
  return (
    <div className=" py-10 px-10">
      {/* Disconted Courses
   & DatePicker &
   Course PurchasedCourses 
  */}
      <div className="flex flex-col items-start justify-center gap-y-5">
        <Banner
          title="دوره های خریداری شده"
          className="text-xl"
          height="h-10"
        />
        <BoughtCourses />
      </div>
    </div>
  );
};
