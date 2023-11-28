import * as z from "zod";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronUp, ChevronDown } from "lucide-react";

import { CommentCard } from "./comment-card";
import { Banner } from "../../components/banner";
import { useState } from "react";
import { scrollToTop } from "../../../libs/scroll-to-top";

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
  const [count, setCount] = useState(0);
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
    if (count >= details.comments?.length) {
      scrollToTop(900);
      setCount(4);
    } else setCount((c) => c + 4);
  };

  if (selected === details.label && details.label === "توضیحات") {
    Info = (
      <motion.p
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="border-2 border-gray-300 dark:border-gray-500 px-5 py-4 rounded-xl text-gray-500 dark:text-gray-300 leading-10 text-sm text-justify"
      >
        {details.value}
      </motion.p>
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
        <div className="w-full border-2 border-gray-300 dark:border-gray-500 px-5 py-4 rounded-xl">
          {details.comments?.length > 0 ? (
            <>
              {details.comments?.slice(0, count).map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
              <div className="w-full flex items-center justify-center mt-2">
                <button
                  onClick={handleMore}
                  className="flex items-center justify-center gap-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-900 transition bg-gray-300/40 hover:bg-gray-300/60 dark:bg-gray-300 dark:hover:bg-gray-300/80 hover:shadow-md px-4 py-3 rounded-xl"
                >
                  {count >= comments?.length ? (
                    <>
                      نمایش کمتر
                      <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </>
                  ) : (
                    <>
                      نمایش بیشتر
                      <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <p className="text-lg text-gray-500 dark:text-gray-300">
              نظری برای این دوره تاکنون ثبت نشده است
            </p>
          )}
        </div>
        <div className="w-full flex flex-col justify-center mt-8 mb-5 items-start gap-y-7">
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
              className="resize-none h-60 w-full disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400"
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
