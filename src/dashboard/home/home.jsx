import { InCartCourses } from "./in-cart-courses";
import { Banner } from "../../components/banner";

export const Home = () => {
  return (
    <div className=" py-10 px-10">
      {/* Disconted Courses
       & DatePicker &
       Course PurchasedCourses 
      */}
      <div className="flex flex-col items-start justify-center gap-y-5">
        <Banner title="دوره های تسویه نشده" className="text-xl" height="h-10" />
        <InCartCourses />
      </div>
    </div>
  );
};
