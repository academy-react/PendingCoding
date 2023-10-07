import { Heading } from "../../components/heading";
import { BestTeachersMobile } from "./best-teachers-mobile";
import { BestTeachers } from "./best-teachers";

import teacher1 from "../../assets/teacher1.svg";
import teacher2 from "../../assets/teacher2.svg";
import teacher3 from "../../assets/teacher3.svg";
import teacher4 from "../../assets/teacher4.svg";

const teachers = [
  {
    id: 1,
    name: "دکتر بحرالعلومی",
    expert: "توسعه دهنده فرانت",
    image: teacher1,
  },
  {
    id: 2,
    name: "دکتر بحرالعلومی",
    expert: "توسعه دهنده فرانت",
    image: teacher2,
  },
  {
    id: 3,
    name: "دکتر بحرالعلومی",
    expert: "توسعه دهنده فرانت",
    image: teacher3,
  },
  {
    id: 4,
    name: "دکتر بحرالعلومی",
    expert: "توسعه دهنده فرانت",
    image: teacher4,
  },
];

export const BestTeachersList = () => {
  return (
    <>
      <Heading
        title="برترین اساتید خبره"
        description="برترین دوره های آموزشی با بروز ترین و مدرن ترین روش آموزش"
        to="/teachers"
      />
      <BestTeachers teachers={teachers} />

      <BestTeachersMobile teachers={teachers} />
    </>
  );
};
