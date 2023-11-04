import { SearchInput } from "../../../components/search";

import wavy from "../../../assets/wavy.svg";
import mirror from "../../../assets/mirror.svg";

export const Intro = () => {
  return (
    <div className="flex flex-1 flex-col lg:flex-row-reverse items-center justify-center gap-y-20 p-20 md:gap-x-10 lg:gap-x-12 xl:gap-x-40">
      {/* Text and Description div */}
      <div className="flex flex-col order-1 md:order-2 justify-start items-start gap-y-8">
        <div className="flex items-center justify-center gap-x-2 text-gray-600 dark:text-gray-300">
          <span className="w-16 h-[4px] mt-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
          <p>برنامه نویسی را با ما بیاموزید</p>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col md:flex-row items-center justify-center gap-x-10 md:gap-x-24 xl:gap-x-32">
          <h1 className="text-gray-600 dark:text-gray-300 text-[40px]">
            آکادمی سپهر، برترین موسسه آموزشی و خصوصی در لورم ایپسوم
          </h1>
          <img src={wavy} alt="Wavy" className="w-24 h-24 xl:w-32 xl:h-32 " />
        </div>
        <h4 className="text-gray-400 dark:text-gray-300/80 w-full text-justify md:w-3/4">
          .لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
          استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی .مورد نیاز و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
        </h4>
        <div className="w-80 relative order-2 md:order-1">
          <SearchInput
            queryName="value"
            className="w-80 px-6 pl-12 py-3"
            placeholder="جستجو ..."
          />
        </div>
      </div>
      {/* Image div */}
      <div>
        <img
          src={mirror}
          alt="Mirror"
          loading="lazy"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
