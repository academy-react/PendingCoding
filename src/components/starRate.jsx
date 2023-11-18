import { useState } from "react";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { useQuery } from "react-query";

import { useUser } from "../hooks/use-user";

import { apiCall } from "../core/services/interceptor/api-call";
import { useTheme } from "./providers/theme-provider";

export const StarRate = ({ data, queryKey }) => {
  const [rating, setRating] = useState(data?.likeCount | null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkTheme } = useTheme();
  const { userData } = useUser();
  const { refetch } = useQuery({
    queryKey: [queryKey],
  });

  const isAllowed = isLoading || !userData.user;

  const onClick = async (currentRate) => {
    if (currentRate === 1) {
      if (isChecked) {
        setRating(currentRate - 1);
        setIsChecked(false);
      } else {
        setRating(currentRate);
        setIsChecked(true);
      }
    } else {
      setRating(currentRate);
      setIsChecked(false);
    }

    try {
      setIsLoading(true);
      await apiCall
        .put(`/items/${data.id}`, {
          ...data,
          stars: currentRate,
        })
        .then(() => {
          refetch();
          toast.success("امتیاز شما ثبت شد");
        });
    } catch {
      toast.error("بعداٌ دوباره تلاش کنید");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRate = index + 1;
        return (
          <button
            key={index}
            disabled={isAllowed}
            className="disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-primary/70 dark:text-[#4d41ff] hover:text-primary dark:hover:text-[#8d85ff]"
          >
            <input
              disabled={isAllowed}
              type="radio"
              name="rate"
              value={currentRate}
              className="hidden"
            />
            <Star
              size={20}
              fill={
                currentRate <= rating
                  ? isDarkTheme
                    ? "#4d41ff"
                    : "#3730A3"
                  : isDarkTheme
                  ? "#d2d2d2"
                  : "#FFFFFF"
              }
              onClick={() => onClick(currentRate)}
            />
          </button>
        );
      })}
    </>
  );
};
