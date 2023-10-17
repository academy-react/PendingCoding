import { Book, Clock, LayoutDashboard, Tags, User } from "lucide-react";

import { getPersianNumbers } from "../../../libs/get-persian-numbers";
import { useUser } from "../../components/providers/user-provider";

export const CartItem = ({ course }) => {
  const { userData, decrease, removeFromCart, increase } = useUser();

  const totalCartAmount = userData?.cart
    .reduce((total, book) => (total = total + book.price * book.count), 0)
    .toFixed(2);

  const startDate = (course) =>
    new Date(course.startDate).toLocaleDateString("fa-IR-u-nu-latn").split("/");
  const endDate = (course) =>
    new Date(course.endDate).toLocaleDateString("fa-IR-u-nu-latn").split("/");
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

  return (
    <div
      key={course.id}
      className="flex flex-col justify-center items-center gap-y-10"
    >
      <div className="flex flex-row-reverse items-start justify-start gap-x-10">
        <img
          className="max-w-[400px] rounded-xl object-contain"
          src={course.image}
          alt={course.name}
        />
        <div className="flex flex-col justify-center items-start gap-y-4">
          <span className="flex justify-center items-center gap-x-2">
            <Book className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`نام دوره: ${course.title}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <LayoutDashboard className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`موضوع: ${course.category}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <User className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`استاد: ${course.teacher}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <Tags className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`قیمت: ${getPersianNumbers(course.price, false)} تومان`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <Clock className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`تاریخ شروع : ${getPersianNumbers(
                startDate(course)?.[2],
                true
              )} ${months[startDate(course)?.[1]]} ${getPersianNumbers(
                startDate(course)?.[0],
                true
              )}`}
            </h1>
          </span>

          <span className="flex justify-center items-center gap-x-2">
            <Clock className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`تاریخ پایان : ${getPersianNumbers(endDate(course)?.[2])} ${
                months[endDate(course)?.[1]]
              } ${getPersianNumbers(endDate(course)?.[0], true)}`}
            </h1>
          </span>
          <span className="flex justify-center items-center gap-x-2">
            <Clock className="text-primary h-6 w-6" />
            <h1 className="text-gray-700 text-lg">
              {`زمان دوره: ${getPersianNumbers(course.time, false)}`}
            </h1>
          </span>
        </div>
      </div>
      <div className="w-full flex justify-between items-center px-5">
        <div className="flex justify-center items-center gap-x-2">
          <button
            onClick={() => increase(course.id)}
            className="py-1 px-4 text-xl bg-primary hover:bg-primary/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-primary/90 rounded-xl"
          >
            +
          </button>
          <button
            onClick={() => decrease(course.id)}
            disabled={course.count === 1}
            className="py-1 px-5 text-xl bg-yellow-400 hover:bg-yellow-400/60 text-white hover:text-white/60 disabled:text-white/60 disabled:bg-yellow-400/60 transition rounded-xl"
          >
            -
          </button>
        </div>
       <div className="flex items-center justify-center gap-x-5">
       <button
          onClick={() => removeFromCart(course.id)}
          className="px-5 py-2 text-lg bg-destructive hover:bg-destructive/80 text-white hover:text-white/90 disabled:text-white/90 disabled:bg-destructive/90 transition rounded-xl"
        >
          حذف
        </button>
        <p className="text-gray-500">
            {getPersianNumbers(course.count)}
        </p>
       </div>
      </div>
    </div>
  );
};