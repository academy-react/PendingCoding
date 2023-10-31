import { useEffect, useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Bookmark } from "lucide-react";

import { apiCall } from "../../../libs/api-call";
import { useModal } from "../../hooks/use-modal-store";
import { getCourses } from "../../../libs/get-courses";
import { useUser } from "../../components/providers/user-provider";

import { Loading } from "../../components/loading";
import { Error } from "../../components/error";
import NavigatorTracer from "../../components/navigator-tracer";
import { Header } from "./header";
import { Description } from "./description";
import { Banner } from "../../components/banner";
import { NewCourseCard } from "../../components/new-course-card";
import { NewBlogCard } from "../../components/new-blog-card";
import { Slider } from "./slider";

function getCourseById(id) {
  return apiCall.get(`/items/${id}`);
}

export const BlogInfo = () => {
  const {
    data: blog,
    isLoading: blogLoading,
    isError: blogError,
    refetch: refetchBlog,
  } = useQuery({
    queryKey: ["courseId"],
    queryFn: async () => getCourseById(id),
    enabled: false,
  });

  const {
    data: blogs,
    isLoading: blogsLoading,
    isError: blogsError,
    refetch: refetchBlogs,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => getCourses("/items"),
    staleTime: 5000,
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
          createdAt: blog?.data.createdAt,
          user: {
            name: blog?.data.studentName,
            image: blog?.data?.studentImage,
          },
          responds: [
            {
              id: blog?.data.teacherId,
              name: blog?.data.teacher,
              image: blog?.data?.teacherAvatar,
              respond: `.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              .نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد`,
              role: "admin",
            },
            {
              id: blog?.data.studentId || 1234,
              name: blog?.data.studentName,
              image: blog?.data?.studentImage,
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

  useEffect(() => {
    setIsBookMarked(userData.favorites.some((c) => c.id === blog?.data.id));
  }, [blog?.data.id, userData.favorites]);

  useLayoutEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      refetchBlog();
      refetchBlogs();
    }
  }, [isMounted, refetchBlog, refetchBlogs]);

  if (!isMounted) return null;

  if (blogLoading && blogsLoading) return <Loading />;
  if (blogsError && blogError) return <Error />;

  const handleBookmark = () => {
    if (userData.user !== "") {
      addToFavorites(blog?.data);
      setIsBookMarked(true);
    } else onOpen("unauthorizedModal");
  };

  return (
    <div className="max-w-[1900px] mx-auto flex flex-col justify-center items-start gap-y-10 px-5 md:px-28 py-5">
      <div className="flex mx-auto md:mx-0 justify-center items-center">
        <NavigatorTracer />
      </div>
      {/* BookMark and Teacher Pic */}
      <div className="w-full flex justify-start items-center gap-x-10 mt-5 mb-10">
        <div className="flex justify-center items-center gap-x-2">
          {isBookMarked ? (
            <Bookmark
              onClick={() => {
                removeFromFavorites(blog?.data);
                setIsBookMarked(false);
              }}
              className="h-9 w-9 text-primary cursor-pointer"
              fill="#5c55c9"
            />
          ) : (
            <Bookmark
              onClick={handleBookmark}
              className="h-9 w-9 text-primary hover:text-primary/80 transition cursor-pointer"
            />
          )}
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-sm text-gray-400">دسته بندی</h5>
            <h5 className="text-sm text-gray-600/80">{blog?.data.category}</h5>
          </span>
        </div>
        <div className="flex justify-center items-center gap-x-2">
          <img
            src={blog?.data.teacherAvatar}
            alt="teacherAvatar"
            className="h-10 w-10 rounded-full"
          />
          <span className="flex flex-col justify-center items-start gap-y-2">
            <h5 className="text-sm text-gray-400">استاد :</h5>
            <h5 className="text-sm text-gray-600/80">{blog?.data.teacher}</h5>
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl text-gray-700">{blog?.data.title}</h1>

      {/* Main Div */}
      <div className="w-full flex flex-col xl:flex-row justify-between items-center xl:items-start gap-x-5">
        {/* Course Image & Description */}
        <div className="w-full flex flex-col items-start justify-center gap-y-5">
          <img
            className="rounded-xl w-full h-[475px] object-fill"
            src={blog?.data.image}
            alt="blogImage"
          />
          <div className="flex justify-cneter items-center gap-x-20">
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

        {/* blog Infos */}
        <div className="w-full xl:w-1/4 flex flex-col items-center xl:items-start justify-center gap-y-10">
          <Banner title="جدید ترین بلاگ ها" className="text-xl" height="h-9" />
          <div className="flex flex-col items-start justify-center gap-y-5">
            <div className="flex flex-col justify-center items-start">
              {blogs?.data.slice(0, 3).map((blog) => (
                <NewBlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  price={blog.price}
                  teacher={blog.teacher}
                  image={blog.image}
                />
              ))}
            </div>
            <button
              onClick={() => onOpen("shareModal")}
              disabled={isOpen}
              className="w-full px-20 py-2 border-2 border-primary bg-white/20 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
            >
              اشتراک گذاری
            </button>
          </div>
          <Banner title="جدیدترین دوره ها" className="text-xl" height="h-9" />
          <div className="flex flex-col justify-center items-start">
            {blogs?.data.slice(0, 3).map((blog) => (
              <NewCourseCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                price={blog.price}
                teacher={blog.teacher}
                image={blog.image}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-y-10 2xl">
        <Banner title="اخرین خبر ها" />
        <Slider blogs={blogs?.data} />
        <div></div>
      </div>
    </div>
  );
};
