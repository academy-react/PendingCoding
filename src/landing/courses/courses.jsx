import { CourseCard } from "./course-card";

import teacherImage from "../../assets/teacher-prof.svg";
import courseImage from "../../assets/course-image.svg";
import { Heading } from "../../components/heading";

const courses = [
  {
    id: 1,
    title: "Node Js دوره مقدماتی",
    time: 15,
    students: 10,
    stars: 4,
    teacher: {
      name: "دکتر بحرالعلومی",
      expert: "توسعه دهنده فرانت",
      image: teacherImage,
    },
    price: 90000,
    image: courseImage,
  },
  {
    id: 2,
    title: "Node Js دوره مقدماتی",
    time: 15,
    students: 10,
    stars: 4,
    teacher: {
      name: "دکتر بحرالعلومی",
      expert: "توسعه دهنده فرانت",
      image: teacherImage,
    },
    price: 90000,
    image: courseImage,
  },
  {
    id: 3,
    title: "Node Js دوره مقدماتی",
    time: 15,
    students: 10,
    stars: 4,
    teacher: {
      name: "دکتر بحرالعلومی",
      expert: "توسعه دهنده فرانت",
      image: teacherImage,
    },
    price: 90000,
    image: courseImage,
  },
];

export const Courses = () => {
  return (
    <div>
      <Heading
        title="آخرین دوره های مجموعه"
        description="برترین دوره های آموزشی با بروز ترین و مدرن ترین روش آموزش"
        to="/courses"
      />
      <div className="py-10 grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-32">
        {courses.map((course, index) => (
          <CourseCard
            key={course.id}
            id={course.id}
            index={index}
            title={course.title}
            time={course.time}
            students={course.students}
            stars={course.stars}
            teacher={course.teacher}
            price={course.price}
            image={course.image}
          />
        ))}
      </div>
    </div>
  );
};
