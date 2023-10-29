import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Book, Bookmark, Clock, Tags, User2, Users2 } from "lucide-react";

import { apiCall } from "../../../libs/api-call";
import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { useModal } from "../../hooks/use-modal-store";
import { getCourses } from "../../../libs/get-courses";

import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { NewCourseCard } from "../../components/new-course-card";
import { Slider } from "./slider";
import { useUser } from "../../components/providers/user-provider";

function getCourseById(id) {
  return apiCall.get(`/items/${id}`);
}

export const CourseInfo = () => {
  const {
    data: course,
    isLoading: courseLoading,
    isError: courseError,
    refetch: refetchCourse,
  } = useQuery({
    queryKey: ["courseId"],
    queryFn: async () => getCourseById(id),
    enabled: false,
  });

  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => getCourses("/items"),
    enabled: false,
  });
  const details = [
    {
      id: 1,
      label: "توضیحات",
      value: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون 
      .و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهایsadasasdadadaas کاربردی می باشد
      کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
      .طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
      در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروف چینی
      .دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
    },
    {
      id: 2,
      label: "نقشه راه",
      seasons: [
        {
          id: 1,
          value: "فصل یکم : لورم ایپسوم",
        },
        {
          id: 2,
          value: "فصل دوم : لورم ایپسوم",
        },
        {
          id: 3,
          value: "فصل سوم : لورم ایپسوم",
        },
        {
          id: 4,
          value: "فصل چهارم : لورم ایپسوم",
        },
        {
          id: 5,
          value: "فصل پنجم : لورم ایپسوم",
        },
        {
          id: 6,
          value: "فصل ششم : لورم ایپسوم",
        },
      ],
    },
    {
      id: 3,
      label: "درباره استاد",
      value: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون 
      .و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
      کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
      .طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
      در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروف چینی
      .دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد`,
      teacher: {
        id: course?.data.teacherId,
        name: course?.data.teacher,
        image: course?.data.teacherAvatar,
      },
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
              image: course?.data?.teacherAvatar,
              respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
              role: "admin",
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
  const { isOpen, onOpen } = useModal();
  const { userData, addToFavorites, removeFromFavorites } = useUser();
  const [isBookMarked, setIsBookMarked] = useState(false);

  const isInCart = useMemo(
    () => userData.cart.some((c) => c.id === id),
    [userData.cart, id]
  );
  const isPurchased = useMemo(
    () => userData.myCourses.some((c) => c.id === id),
    [userData.myCourses, id]
  );

  useEffect(() => {
    setIsBookMarked(userData.favorites.some((c) => c.id === course?.data.id));
  }, [course?.data.id, userData.favorites]);

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

  const startDate = new Date(course?.data.startDate)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const endDate = new Date(course?.data.endDate)
    .toLocaleDateString("fa-IR-u-nu-latn")
    .split("/");
  const months = [
    "فروردين",
    "ارديبهشت",
    "خرداد",
    "تير",
    "مرداد",
    "شهريور",
    "مهر",
    "آبان",
    "آذر",
    "دي",
    "بهمن",
    "اسفند",
  ];
  const registered = course?.data.capacity - course?.data.students;

  return (
    <div className="max-w-[1900px] mx-auto flex flex-col justify-center items-start gap-y-10 px-5 md:px-28 py-5 pt-20">
      <div className="flex mx-auto md:mx-0 justify-center items-center">
        <NavigatorTracer />
      </div>
      {/* BookMark and Teacher Pic */}
      <div className="w-full flex justify-start items-center gap-x-10 mt-5 mb-10">
        <div className="flex justify-center items-center gap-x-2">
          {isBookMarked ? (
            <Bookmark
              onClick={() => {
                removeFromFavorites(course?.data);
                setIsBookMarked(false);
              }}
              className="h-9 w-9 text-primary cursor-pointer"
              fill="#5c55c9"
            />
          ) : (
            <Bookmark
              onClick={() => {
                addToFavorites(course?.data);
                setIsBookMarked(true);
              }}
              className="h-9 w-9 text-primary hover:text-primary/80 transition cursor-pointer"
            />
          )}
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-sm text-gray-400">دسته بندی</h5>
            <h5 className="text-sm text-gray-600/80">
              {course?.data.category}
            </h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-2">
          <img
            src={course?.data.teacherAvatar}
            alt="teacherAvatar"
            className="h-10 w-10 rounded-full"
          />
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-sm text-gray-400">استاد :</h5>
            <h5 className="text-sm text-gray-600/80">{course?.data.teacher}</h5>
          </span>
        </div>
      </div>

      {/* Title & Add */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-10 px-10">
        {/* Title Div */}
        <div>
          <h1 className="text-3xl text-gray-700">{course?.data.title}</h1>
        </div>
        {/* Add Div */}
        <div className=" flex flex-col items-center justify-center gap-y-3">
          {isInCart ? (
            <button
              onClick={() => onOpen("confirmDeleteModal")}
              className="w-full px-20 py-2 bg-destructive hover:bg-destructive/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-destructive/80 disabled:cursor-not-allowed transition rounded-full "
            >
              حذف از سبد خرید
            </button>
          ) : isPurchased ? (
            <p className="w-full px-20 py-2 bg-emerald-500 cursor-default text-white rounded-full">
              شما این دوره را خریده‌اید
            </p>
          ) : (
            <button
              onClick={() => onOpen("confirmModal")}
              className="w-full px-20 py-2 bg-primary hover:bg-primary/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-primary/80 disabled:cursor-not-allowed transition rounded-full "
            >
              افزودن به سبد خرید
            </button>
          )}
          <button
            onClick={() => onOpen("shareModal")}
            disabled={isOpen}
            className="w-full px-20 py-2 border-2 border-primary bg-white/20 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
          >
            اشتراک گذاری
          </button>
        </div>
      </div>

      {/* Main Div */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-x-5">
        {/* Course Image & Description */}
        <div className="w-full flex flex-col items-start justify-center gap-y-5">
          <img
            className="rounded-xl w-full h-[475px] object-fill"
            src={course?.data.image}
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

        {/* Course Infos */}
        <div className="w-full xl:w-1/4 flex flex-col items-center xl:items-start justify-center gap-y-10">
          <Banner title="مشخصات دوره" className="text-xl" height="h-9" />
          <div className="flex flex-col items-start justify-center gap-y-5">
            <span className="flex justify-between items-center text-gray-500 text-sm gap-x-2">
              <User2 className="text-primary h-6 w-6" />
              ظرفیت:
              <h5 className="text-gray-600">
                {getPersianNumbers(course?.data.capacity, false)}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 text-sm gap-x-2">
              <Clock className="text-primary h-6 w-6" />
              تاریخ شروع:
              <h5 className="text-gray-600">
                {`تاریخ شروع : ${getPersianNumbers(startDate?.[2], true)} ${
                  months[startDate?.[1] - 1]
                } ${getPersianNumbers(startDate?.[0], true)}`}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 text-sm gap-x-2">
              <Clock className="text-primary h-6 w-6" />
              تاریخ پایان:
              <h5 className="text-gray-600">
                {`تاریخ پایان : ${getPersianNumbers(endDate?.[2])} ${
                  months[endDate?.[1] - 1]
                } ${getPersianNumbers(endDate?.[0], true)}`}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 text-sm gap-x-2">
              <Tags className="text-primary h-6 w-6" />
              قیمت:
              <h5 className="text-gray-600">
                {`${getPersianNumbers(course?.data.price, false)} تومان`}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 text-sm gap-x-2">
              <Users2 className="text-primary h-6 w-6" />
              ظرفیت پر شده:
              <h5 className="text-gray-600">
                {getPersianNumbers(registered, false)}
              </h5>
            </span>
            <span className="flex justify-between items-center text-gray-500 text-sm gap-x-2">
              <Book className="text-primary h-6 w-6" />
              تعداد فصول:
              <h5 className="text-gray-600">
                {getPersianNumbers(details?.[1].seasons.length, false)}
              </h5>
            </span>
          </div>
          <Banner title="جدید ترین دوره ها" className="text-xl" height="h-9" />
          <div className="flex flex-col justify-center items-start">
            {courses?.data.slice(0, 3).map((course) => (
              <NewCourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                price={course.price}
                teacher={course.teacher}
                image={course.image}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-y-10 2xl">
        <Banner title="دوره های مشابه" />
        <Slider courses={courses?.data} />
        <div></div>
      </div>
    </div>
  );
};
