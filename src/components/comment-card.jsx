import { Mail } from "lucide-react";

import { useModal } from "../hooks/use-modal-store";

export const CommentCard = ({ image, name, createdAt, comment, responds }) => {
  const { onOpen } = useModal();

  const differenceInDays = Math.round(
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 3600 * 24)
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center py-2 gap-x-10">
        <div className="w-full lg:w-1/6 flex flex-col justify-center items-center gap-y-3 pb-5 lg:pl-5 lg:border-l border-b lg:border-b-0 border-gray-300">
          <img
            className="w-24 h-24 rounded-full"
            src={image}
            alt="teacherAvatar"
          />
          <h3 className="text-gray-700 text-lg flex">{name}</h3>
          <Mail className="h-4 w-4 text-gray-400" />
          <h5 className="text-gray-400 text-sm">
            {differenceInDays === 0
              ? "به تازگی"
              : ` ${differenceInDays} روز پیش`}
          </h5>
          <button
            onClick={() => onOpen("sendRespond")}
            className="w-1/3 lg:w-full py-2 border-2 border-primary bg-white/20 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
          >
            ارسال پاسخ
          </button>
        </div>
        <p className="w-5/6 self-center leading-9 mt-5 text-gray-600 text-justify">
          {comment}
        </p>
      </div>
      {responds.map((item) => (
        <div
          key={item.id}
          className="border-2 border-gray-300 rounded-xl w-3/4 mx-auto flex flex-col lg:flex-row justify-center items-center px-5 py-2 gap-x-10"
        >
          <div className="w-full lg:w-1/6 flex flex-col justify-center items-center gap-y-3 pb-5 lg:pl-5 lg:border-l border-b lg:border-b-0 border-gray-300">
            <img
              className="w-24 h-24 rounded-full"
              src={item.image}
              alt="teacherAvatar"
            />
            {item.role === "admin" ? (
              <h1 className="text-gray-700 text-lg">ادمین</h1>
            ) : (
              <div className="flex flex-col items-center justify-center gap-y-2">
                <h3 className="text-gray-700 text-lg">{item.name}</h3>
                <Mail className="h-4 w-4 text-gray-400" />
                <h5 className="text-gray-400 text-sm">
                  {differenceInDays === 0
                    ? "به تازگی"
                    : ` ${differenceInDays} روز پیش`}
                </h5>
              </div>
            )}
            <button
              onClick={() => onOpen("sendRespond")}
              className="w-1/3 lg:w-full py-2 border-2 border-primary bg-white/20 hover:bg-[#EEEEEE] text-primary hover:text-primary/90 disabled:text-primary/90 disabled:bg-[#EEEEEE] disabled:cursor-not-allowed transition rounded-full "
            >
              ارسال پاسخ
            </button>
          </div>
          <p className="w-5/6 self-center leading-10 mt-5 text-gray-600 text-justify">
            {item.respond}
          </p>
        </div>
      ))}
    </>
  );
};