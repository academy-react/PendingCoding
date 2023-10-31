import { useState } from "react";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { useQuery } from "react-query";

import { useUser } from "./providers/user-provider";

import { apiCall } from "../../libs/api-call";

export const StarRate = ({ data, queryKey }) => {
  const [rating, setRating] = useState(data?.stars | null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useUser();
  const { refetch } = useQuery({
    queryKey: [queryKey],
  });

  const isAllowed = isLoading || userData.user === "";

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
            className="disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-primary/70 hover:text-primary"
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
              fill={currentRate <= rating ? "#3730A3" : "#FFFFFF"}
              onClick={() => onClick(currentRate)}
            />
          </button>
        );
      })}
    </>
  );
};
