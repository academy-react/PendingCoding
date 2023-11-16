import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { Clock, ThumbsDown, ThumbsUp, User } from "lucide-react";

import { CommentRespond } from "./comment-respond";

import { getPersianNumbers } from "../../libs/get-persian-numbers";
import { likeComment, replyComment } from "../core/services/api/get-comments";
import { cn } from "../../libs/utils";

const backdrop = {
  hidden: {
    opacity: 0,
    scale: 0.75,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: "easeIn",
      duration: 0.3,
    },
  },
};

const formSchema = z.object({
  subject: z
    .string()
    .min(10, {
      message: `عنوان باید بیشتر از ${getPersianNumbers(1)} حرف باشد`,
    })
    .max(20, {
      message: `عنوان باید کمتر از ${getPersianNumbers(20)} کلمه باشد`,
    }),
  message: z
    .string()
    .min(15, {
      message: `پاسختان باید بیشتر از ${getPersianNumbers(1)} حرف باشد`,
    })
    .max(100, {
      message: `پاسختان باید کمتر از ${getPersianNumbers(100)} کلمه باشد`,
    }),
});

export const CommentCard = ({ comment }) => {
  const [likeCount, setLikeCount] = useState(comment?.likeCount);
  const [disLikeCount, setDisLikeCount] = useState(comment?.disslikeCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);

  const form = useForm({
    defaultValues: {
      subject: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const differenceInDays = getPersianNumbers(
    Math.round(
      (new Date().getTime() - new Date(comment?.insertDate).getTime()) /
        (1000 * 3600 * 24)
    )
  );
  const postDate = new Date(comment?.insertDate)
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

  const handleLike = async () => {
    try {
      setIsLoading(true);
      await likeComment(comment?.courseId).then(() => {
        setLikeCount((c) => c + 1);
        toast.success("نظر پسندیده شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDisLike = async () => {
    try {
      setIsLoading(true);
      await likeComment(comment?.courseId).then(() => {
        setDisLikeCount((c) => c + 1);
        toast.success("نظر پسندیده شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const Obj = {
        CommentId: comment?.id,
        CourseId: comment?.courseId,
        Title: values.subject,
        Describe: values.message,
      };
      await replyComment(Obj).then((res) => {
        toast.success("نظرتان ثبت شد");
      });
    } catch (error) {
      console.log(error);
      toast.error("مشکلی پیش آمده دوباره امتحان کنید");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsAnswering(false);
    form.reset();
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center py-2 gap-x-10">
        <div className="bg-gray-300/20 shadow-md dark:bg-gray-700 rounded-lg w-full flex flex-col justify-center items-start px-4 py-2">
          {/* Title and Author div */}
          <div className="flex justify-start items-center gap-x-5 py-5 border-b-2 border-gray-400/50 dark:border-gray-400 rounded-xl w-full">
            <span className="flex gap-x-3">
              <User className="dark:text-gray-300 text-gray-500" />
              <h2 className="text-gray-600 dark:text-gray-200">
                {comment?.author}
              </h2>
            </span>
            <h4 className="text-gray-600 dark:text-gray-200">{`عنوان : ${comment?.title}`}</h4>
          </div>
          <div className="w-full my-2">
            {/* Comment,likes,dislikes */}
            <div className="flex items-center justify-between py-2 pb-7 px-4">
              <div>
                <p className="dark:text-gray-300 text-gray-500">
                  {comment?.describe}
                </p>
              </div>
              <div className="flex items-center justify-center gap-x-3">
                <button
                  onClick={handleLike}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-x-1 dark:text-gray-300 text-gray-500 hover:text-primary dark:hover:text-dark-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ThumbsUp className="h-7 w-7 md:h-5 md:w-5" />
                  <p className="text-2xl md:text-lg mt-2 dark:text-gray-300 text-gray-500">
                    {getPersianNumbers(likeCount)}
                  </p>
                </button>
                <button
                  onClick={handleDisLike}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-x-1 dark:text-gray-300 text-gray-500 hover:text-primary dark:hover:text-dark-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ThumbsDown className="h-7 w-7 md:h-5 md:w-5 mt-2" />
                  <p className="text-2xl md:text-lg mt-2 dark:text-gray-300 text-gray-500">
                    {getPersianNumbers(disLikeCount)}
                  </p>
                </button>
              </div>
            </div>
            {isAnswering ? (
              <motion.div
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full border-y-2 border-gray-300 dark:border-gray-400 rounded-lg px-4 py-2"
              >
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-2"
                >
                  <label
                    htmlFor="respond"
                    className="text-sm text-gray-500 dark:text-gray-300 px-1"
                  >
                    عنوان
                  </label>
                  <input
                    className={cn(
                      "resize-none w-full max-w-sm disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-9 py-3 duration-200 border-gray-300 focus:border-gray-400",
                      form.formState.errors.subject &&
                        "border-destructive dark:border-dark-destructive"
                    )}
                    placeholder="متن پیام"
                    {...form.register("subject")}
                  />
                  <p
                    className={cn(
                      "opacity-0 text-destructive dark:text-dark-destructive",
                      form.formState.errors.subject && "opacity-100"
                    )}
                  >
                    {form.formState.errors.subject
                      ? form.formState.errors.subject.message
                      : "ss"}
                  </p>
                  <label
                    htmlFor="respond"
                    className="text-sm text-gray-500 dark:text-gray-300 px-1"
                  >
                    پاسخ
                  </label>
                  <textarea
                    className={cn(
                      "resize-none w-full h-40 disabled:cursor-not-allowed outline-none bg-gray-100 dark:bg-gray-300 text-gray-500 dark:placeholder:text-gray-600 dark:text-gray-800 border-2 rounded-xl px-6 pl-12 py-3 duration-200 border-gray-300 focus:border-gray-400",
                      form.formState.errors.message && "border-destructive"
                    )}
                    placeholder="متن پیام"
                    {...form.register("message")}
                  />
                  <p
                    className={cn(
                      "opacity-0 text-destructive dark:text-dark-destructive",
                      form.formState.errors.message && "opacity-100"
                    )}
                  >
                    {form.formState.errors.message
                      ? form.formState.errors.message.message
                      : "ss"}
                  </p>
                  <div className="mr-auto flex justify-center items-center gap-x-3">
                    <button
                      type="submit"
                      disabled={isLoading || !form.formState.isValid}
                      className="bg-primary text-gray-100 hover:bg-primary/80 hover:text-gray-100/80 disabled:bg-primary/80 disabled:text-gray-100/80 disabled:cursor-not-allowed rounded-lg px-3 py-2"
                    >
                      ارسال
                    </button>
                    <button
                      onClick={handleClose}
                      className="bg-gray-300 text-gray-600 hover:bg-gray-300/80 hover:text-gray-600/80 shadow-lg px-3 py-2 rounded-lg"
                    >
                      لغو
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <button
                onClick={() => setIsAnswering(true)}
                className="text-sm text-gray-700 bg-gray-300 hover:bg-gray-300/80 hover:text-gray-500/80 transition rounded-lg px-4 py-3"
              >
                پاسخ
              </button>
            )}
            {/* post_date */}
            <div className="flex flex-row-reverse items-center justify-between mt-5">
              <p className="dark:text-gray-300 text-gray-500">
                {`${getPersianNumbers(postDate?.[2], true)} ${
                  months[postDate?.[1] - 1]
                } ${getPersianNumbers(postDate?.[0], true)}`}
              </p>
              <span className="flex gap-x-1">
                <Clock className="text-gray-500 dark:text-gray-300" />
                <p className="dark:text-gray-300 text-gray-500">
                  {`${differenceInDays} روز پیش`}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* {responds.map((res) => (
        <CommentRespond
          image={res.image}
          name={res.name}
          respond={res.respond}
          role={res.role}
        />
      ))} */}
    </>
  );
};
