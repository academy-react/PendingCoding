import { Star } from "lucide-react";
import { useState } from "react";

export const StarRate = () => {
  const [rating, setRating] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const onClick = (currentRate) => {
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
  };
  return (
    <>
      {[...Array(5)].map((star, index) => {
        const currentRate = index + 1;
        return (
          <>
            <label>
              <input
                type="radio"
                name="rate"
                value={currentRate}
                className="hidden"
              />
              <Star
                size={20}
                fill={currentRate <= rating ? "#3730A3" : "#FFFFFF"}
                className="cursor-pointer text-primary/70 hover:text-primary transition"
                onClick={() => onClick(currentRate)}
              />
            </label>
          </>
        );
      })}
    </>
  );
};
