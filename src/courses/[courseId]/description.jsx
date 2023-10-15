import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/use-modal-store";
import { Mail } from "lucide-react";
import { CommentCard } from "./comment-card";

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

export const Description = ({ details, selected }) => {
  const { onOpen } = useModal();

  let Info;

  if (selected === details.label && details.label === "توضیحات") {
    Info = (
      <motion.p
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="text-gray-500 leading-10 text-sm text-justify"
      >
        {details.value}
      </motion.p>
    );
  } else if (selected === details.label && details.label === "نقشه راه") {
    Info = (
      <motion.ul className="flex flex-col items-start justify-center gap-y-1">
        {details?.seasons?.map((season) => (
          <motion.li
            key={season.id}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="text-gray-500 leading-5 text-sm text-justify list-disc"
          >
            {season.value}
          </motion.li>
        ))}
      </motion.ul>
    );
  } else if (selected === details.label && details.label === "درباره استاد") {
    Info = (
      <motion.div
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col xl:flex-row justify-center items-center py-2 gap-x-10"
      >
        <div className="w-full flex flex-col justify-center items-center gap-y-3 pb-5 xl:pl-5 border-b xl:border-l xl:border-b-0 border-gray-300">
          <img
            className="w-24 h-24 rounded-full"
            src={details.teacher.image}
            alt="teacherAvatar"
          />
          <h3 className="text-gray-700 text-lg text-center">{details.teacher.name}</h3>
          <Link
            to={`/teachers/${details.teacher.id}`}
            className="w-1/3 xl:w-full py-2 text-center bg-primary hover:bg-primary/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-primary/80 disabled:cursor-not-allowed transition rounded-full "
          >
            نمایش پروفایل
          </Link>
          <button
            onClick={() => onOpen("sendMessageModal")}
            className="w-1/3 xl:w-full py-2 border-2 border-primary bg-white/20 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
          >
            ارسال پیام
          </button>
        </div>
        <p className="self-start leading-9 text-gray-600 text-justify">
          {details.value}
        </p>
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
      </motion.div>
    );
  }
  return (
    <div
      className={
        selected === details.label
          ? "border-2 border-gray-300 px-5 py-4 rounded-xl"
          : "hidden"
      }
    >
      {Info}
    </div>
  );
};
