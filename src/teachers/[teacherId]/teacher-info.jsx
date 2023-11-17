import { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { apiCall } from "../../core/services/interceptor/api-call";
import { getTeacherById } from "../../core/services/api/get-teacher";
import { getAllCourses } from "../../core/services/api/get-courses";

import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { Slider } from "./slider";

export const TeacherInfo = () => {
  const {
    data: course,
    isLoading: courseLoading,
    isError: courseError,
    refetch: refetchCourse,
  } = useQuery({
    queryKey: ["teacher_id"],
    queryFn: () => getTeacherById(id),
    enabled: false,
  });

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
    enabled: false,
  });
  const details = [
    {
      id: 1,
      label: "بیوگرافی",
      value: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون 
      .و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهایsadasasdadadaas کاربردی می باشد
      کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
      .طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
      در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروف چینی
      .دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
    },
    {
      id: 2,
      label: "دوره‌های ترم جاری",
      courses: courses?.data,
    },
    {
      id: 3,
      label: "تمام دوره ها",
      courses: courses?.data,
    },
    {
      id: 4,
      label: "نظرات",
      comments: [
        {
          id: 1,
          comment: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
          .در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
          کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
          برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام
          و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی
           .سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
          createdAt: course?.data.createdAt,
          user: {
            name: course?.data.studentName,
            image: course?.data?.studentImage,
          },
          responds: [
            {
              id: course?.data.teacherId,
              name: course?.data.teacher,
              image: course?.data?.studentImage,
              respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
              role: "student",
            },
            {
              id: course?.data.studentId || 1234,
              name: course?.data.studentName,
              image: course?.data?.studentImage,
              respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
              role: "student",
            },
          ],
        },
      ],
    },
  ];
  const { id } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [selected, setSelected] = useState(details[0].label);

  useLayoutEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      refetchCourse();
      refetchCourses();
    }
  }, [isMounted, refetchCourse, refetchCourses]);

  if (!isMounted) return null;

  if (courseLoading && coursesLoading) return <Loading />;
  if (courseError && coursesError) return <Error />;

  return (
    <div className="max-w-[1900px] mt-20 mx-auto flex flex-col justify-center items-start gap-y-10 px-5 md:px-28 py-5">
      <div className="flex mx-auto md:mx-0 justify-center items-center">
        <NavigatorTracer />
      </div>
      {/* Title & Add */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-10 px-10">
        {/* Title Div */}
        <div>
          <h1 className="text-3xl text-gray-700 dark:text-gray-200">
            {course?.data.teacher}
          </h1>
        </div>
        {/* Add Div */}
      </div>

      {/* Main Div */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-x-5">
        {/* Course Image & Description */}
        <div className="w-full flex flex-col items-start justify-center gap-y-5">
          <img
            className="rounded-xl w-full h-[475px] object-fill"
            src={course?.data.teacherAvatar}
            alt="courseImage"
          />
          <div className="w-full flex justify-between items-center gap-x-10">
            {details?.map((datail) => (
              <Header
                key={datail.id}
                label={datail.label}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
          <div className="w-full">
            {details?.map((detail) => (
              <Description
                key={detail.id}
                details={detail}
                selected={selected}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-y-10 2xl">
        <Banner title="آخرین اساتید مجموعه" />
        <Slider teachers={courses?.data} />
        <div></div>
      </div>
    </div>
  );
};
