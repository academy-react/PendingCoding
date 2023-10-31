import * as z from "zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CommentCard } from "../../components/comment-card";
import { Banner } from "../../components/banner";
import { CourseCard } from "./course-card";
import { useState } from "react";
import { Loading } from "../../components/loading";

const backdrop = {
  hidden: {
    x: "25px",
    opacity: 0,
  },
  visible: {
    x: "0px",
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    x: "25px",
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const formSchema = z.object({
  message: z.string().min(1, { message: "پیام خود را وارد کنید" }),
});

export const Description = ({ details, selected }) => {
  const [count, setCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  let Info;

  const form = useForm({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
  };

  const handleMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCount((c) => c + 6);
      setIsLoading(false);
    }, 1500);
  };
  const handleReset = () => {
    setCount(6);
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  if (selected === details.label && details.label === "بیوگرافی") {
    Info = (
      <motion.p
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="border-2 border-gray-300 px-5 py-4 rounded-xl text-gray-500 leading-10 text-sm text-justify"
      >
        {details.value}
      </motion.p>
    );
  } else if (
    selected === details.label &&
    details.label === "دوره‌های ترم جاری"
  ) {
    Info = (
      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="border-2 border-gray-300 px-0 py-4 rounded-xl flex flex-col items-start justify-center"
      >
        <div className="grid grid-col-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-5 w-full">
          {details?.courses?.slice(0, count).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <Loading />
          </div>
        ) : (
          <>
            {count === details?.courses?.length ? (
              <button
                onClick={handleReset}
                className="text-white bg-primary hover:text-white/80 hover:bg-primary/80 transition px-7 py-2 rounded-full self-center mt-8 mb-3"
              >
                نمایش کمتر
              </button>
            ) : (
              <button
                onClick={handleMore}
                className="text-white bg-primary hover:text-white/80 hover:bg-primary/80 transition px-7 py-2 rounded-full self-center mt-8 mb-3"
              >
                نمایش بیشتر
              </button>
            )}
          </>
        )}
      </motion.div>
    );
  } else if (selected === details.label && details.label === "تمام دوره ها") {
    Info = (
      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="border-2 border-gray-300 px-0 py-4 rounded-xl flex flex-col items-start justify-center"
      >
        <div className="grid grid-col-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-5 w-full">
          {details?.courses?.slice(0, count).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center w-full">
            <Loading />
          </div>
        ) : (
          <>
            {count === details?.courses?.length ? (
              <button
                onClick={handleReset}
                className="text-white bg-primary hover:text-white/80 hover:bg-primary/80 transition px-7 py-2 rounded-full self-center mt-8 mb-3"
              >
                نمایش کمتر
              </button>
            ) : (
              <button
                onClick={handleMore}
                className="text-white bg-primary hover:text-white/80 hover:bg-primary/80 transition px-7 py-2 rounded-full self-center mt-8 mb-3"
              >
                نمایش بیشتر
              </button>
            )}
          </>
        )}
      </motion.div>
    );
  } else if (selected === details.label && details.label === "نظرات") {
    Info = (
      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center justify-center gap-y-10"
      >
        <div className="border-2 border-gray-300 px-5 py-4 rounded-xl">
          {details.comments.map((item) => (
            <CommentCard
              key={item.id}
              comment={item.comment}
              createdAt={item.createdAt}
              image={item.user.image}
              name={item.user.name}
              responds={item.responds}
            />
          ))}
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-y-7">
          <Banner
            title="دیدگاه خود را با ما به اشتراک بگذارید"
            height="h-8"
            className="text-lg"
          />
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center justify-center gap-y-3"
          >
            <textarea
              className="resize-none h-60 w-full disabled:cursor-not-allowed outline-none bg-[#EEEEEE] text-gray-500 dark:text-gray-800 border-2 rounded-xl px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400"
              placeholder="متن پیام"
              {...form.register("message")}
            />
            {form.formState.errors.message && (
              <p className="text-rose-600/90 mr-5 text-base">
                {form.formState.errors.message.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="text-white hover:text-white/80 bg-[#505050] hover:bg-[#505050]/80 disabled:bg-[#505050]/80 disabled:text-white/80 py-2 text-lg self-start my-4 mr-5 px-10 rounded-full transition"
            >
              ارسال پیام
            </button>
          </form>
        </div>
      </motion.div>
    );
  }
  return <div className={selected !== details.label && "hidden"}>{Info}</div>;
};