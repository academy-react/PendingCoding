import { Slider } from "../slider/slider";
export const Latest = () => {
  return (
    <>
      <div className="w-80 flex flex-col gap-5 items-start justify-center">
        <h1 className="text-3xl text-gray-600">جدید ترین اخبار روز</h1>
        <h5 className="text-base text-gray-400">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
          .استفاده از طراحان گرافیک است
        </h5>
      </div>
      <Slider />
    </>
  );
};
