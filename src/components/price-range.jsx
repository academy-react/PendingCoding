import RangeSlider from "react-range-slider-input";

import "react-range-slider-input/dist/style.css";

export const PriceRange = ({ values, setValues }) => {
  return (
    <div className="w-full rounded-xl">
      <h3 className="text-sm text-[#3f4656] w-full">قیمت</h3>
      <div className="my-10">
        <RangeSlider
          className="bg-gray-200"
          value={values}
          min={0}
          max={4000000}
          onInput={(newValue) => setValues(newValue)}
          step={100000}
        />
      </div>
      <div className="flex items-center justify-center gap-x-2">
        {/* MIN */}
        <div className="flex flex-col items-start justify-center gap-y-1">
          <h4 className="text-sm text-gray-500">حداقل</h4>
          <div className="flex justify-between items-center gap-x-3 outline-none bg-[#EEEEEE] text-primary dark:text-gray-800 border-2 rounded-full py-2 px-3 duration-200 border-gray-300 focus:border-gray-400">
            <h4 className="text-sm text-gray-500">تومان</h4>
            <input
              value={values?.[0]}
              onChange={(e) =>
                setValues(([...values][0] = Number(e.target.value)))
              }
              type="number"
              className="disabled:cursor-not-allowed w-20 text-left outline-none bg-[#EEEEEE] text-primary dark:text-gray-800 rounded-full duration-200"
            />
          </div>
        </div>

        <div className="w-6 border border-gray-500 mt-6" />

        {/* MAX */}
        <div className="flex flex-col items-start justify-center gap-y-1">
          <h4 className="text-sm text-gray-500">حداکثر</h4>
          <div className="flex justify-between items-center gap-x-3 outline-none bg-[#EEEEEE] text-primary dark:text-gray-800 border-2 rounded-full py-2 px-3 duration-200 border-gray-300 focus:border-gray-400">
            <h4 className="text-sm text-gray-500">تومان</h4>
            <input
              value={values?.[1]}
              onChange={(e) =>
                setValues(([...values][1] = Number(e.target.value)))
              }
              type="number"
              className="disabled:cursor-not-allowed w-20 text-left outline-none bg-[#EEEEEE] text-primary dark:text-gray-800 rounded-full duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
