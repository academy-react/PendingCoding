import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp } from "lucide-react";

import { useUser } from "../../hooks/use-user";
import { getPersianNumbers } from "../../../libs/get-persian-numbers";

export const FavoriteCourses = () => {
  const { userData, removeFromFavorites } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [isAsc, setIsAsc] = useState(false);

  useMemo(() => {
    setFilteredFavorites(userData?.favorites);
  }, [userData]);

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

  const handleDelete = (course) => {
    try {
      setIsLoading(true);
      let filteredArray = [...filteredFavorites];
      filteredArray = filteredArray.filter((item) => item.id !== course.id);
      setFilteredFavorites(filteredArray);
      removeFromFavorites(course);
    } catch (error) {
      toast.error("مشکلی پیش آمده بعداٌ تلاش کنید");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFilter = (event) => {
    let newItems = [...filteredFavorites];
    const input = event.target.innerHTML;

    if (input === "نام") {
      newItems = newItems.sort((a, b) => {
        const nameA = a.title.toLowerCase();
        const nameB = b.title.toLowerCase();
        if (nameA < nameB) {
          const returnValue = isAsc ? 1 : -1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        if (nameA > nameB) {
          const returnValue = isAsc ? -1 : 1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        return 0;
      });
    } else if (input === "نام استاد") {
      newItems = newItems.sort((a, b) => {
        const nameA = a.teacher.toLowerCase();
        const nameB = b.teacher.toLowerCase();
        if (nameA < nameB) {
          const returnValue = isAsc ? 1 : -1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        if (nameA > nameB) {
          const returnValue = isAsc ? -1 : 1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        return 0;
      });
    } else if (input === "تاریخ شروع") {
      newItems = newItems.sort((a, b) =>
        isAsc
          ? new Date(a.startDate) - new Date(b.startDate)
          : new Date(b.startDate) - new Date(a.startDate)
      );
    } else if (input === "تاریخ پایان") {
      newItems = newItems.sort((a, b) => {
        let dateA = new Date(a.endDate);
        let dateB = new Date(b.endDate);
        if (isAsc) {
          const returnValue = dateA - dateB;
          setIsAsc(false);
          return returnValue;
        } else {
          const returnValue = dateB - dateA;
          setIsAsc(true);
          return returnValue;
        }
      });
    } else if (input === "قیمت") {
      newItems = newItems.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        if (priceA < priceB) {
          const returnValue = isAsc ? 1 : -1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        if (priceA > priceB) {
          const returnValue = isAsc ? -1 : 1;
          setIsAsc(!isAsc);
          return returnValue;
        }
        return 0;
      });
    }
    setFilteredFavorites(newItems);
  };

  return (
    <div className="relative w-full shadow-md sm:rounded-lg">
      {filteredFavorites.length === 0 ? (
        <div>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center">
            علاقه مندی وجود ندارد
          </p>
        </div>
      ) : (
        <table className="w-full text-sm text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                <div
                  onClick={handleFilter}
                  className="flex items-center justify-start gap-x-1 cursor-pointer"
                >
                  <p>نام</p>
                  {isAsc ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  onClick={handleFilter}
                  className="flex items-center justify-start gap-x-1 cursor-pointer"
                >
                  <p>نام استاد</p>
                  {isAsc ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  onClick={handleFilter}
                  className="flex items-center justify-start gap-x-1 cursor-pointer"
                >
                  <p>تاریخ شروع</p>
                  {isAsc ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  onClick={handleFilter}
                  className="flex items-center justify-start gap-x-1 cursor-pointer"
                >
                  <p>تاریخ پایان</p>
                  {isAsc ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div
                  onClick={handleFilter}
                  className="flex items-center justify-start gap-x-1 cursor-pointer"
                >
                  <p>قیمت</p>
                  {isAsc ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFavorites.map((course) => (
              <tr
                key={course.id}
                className="bg-white border-b dark:bg-gray-900/60 dark:border-gray-800/60"
              >
                <th
                  scope="row"
                  className="max-w-[300px] px-0 py-2 flex items-center justify-center"
                >
                  <img
                    src={course.image}
                    alt="courseImage"
                    className="object-fill w-10 h-10 rounded-full"
                  />
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {course.title}
                </th>
                <td className="px-6 py-4">{course.teacher}</td>
                <td className="px-6 py-4">{`${getPersianNumbers(
                  startDate(course)?.[2],
                  true
                )} ${months[startDate(course)?.[1] - 1]} ${getPersianNumbers(
                  startDate(course)?.[0],
                  true
                )}`}</td>
                <td className="px-6 py-4">{`${getPersianNumbers(
                  endDate(course)?.[2]
                )} ${months[endDate(course)?.[1] - 1]} ${getPersianNumbers(
                  endDate(course)?.[0],
                  true
                )}`}</td>
                <td className="px-6 py-4">
                  {getPersianNumbers(course.price, false)}
                </td>
                <td className="relative px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(course)}
                    disabled={isLoading}
                    className="bg-destructive hover:bg-destructive/80 disabled:bg-destructive/70 text-white hover:text-white/80 disabled:text-white/80 px-4 py-2 rounded-xl"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
