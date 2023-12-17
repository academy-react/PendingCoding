import { SearchInput } from "../../../components/search";

import wavy from "../../../assets/wavy.svg";
import mirror from "../../../assets/mirror.svg";
import { SearchResult } from "./search-result";

export const Intro = () => {
  return (
    <div className="flex flex-1 flex-col lg:flex-row-reverse items-center justify-center gap-y-20 p-20 md:gap-x-10 lg:gap-x-12 xl:gap-x-40">
      {/* Text and Description div */}
      <div className="flex flex-col order-1 md:order-2 justify-start items-start gap-y-8">
        <div className="flex items-center justify-center gap-x-2 text-gray-600 dark:text-gray-300">
          <span className="w-16 h-[4px] mt-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
          <p>برنامه نویسی را با ما بیاموزید</p>
        </div>
        <div className="w-full lg:w-3/4 flex flex-col md:flex-row items-center justify-start gap-x-10 md:gap-x-24 xl:gap-x-32">
          <h1 className="max-w-[800px] text-gray-600 dark:text-gray-300 text-[40px]">
            تیم PendingCoding با افتخار تقدیم میکند
          </h1>
          <img src={wavy} alt="Wavy" className="w-24 h-24 xl:w-32 xl:h-32 " />
        </div>
        <h4 className="max-w-[700px] text-gray-400 dark:text-gray-300/80 w-full text-justify md:w-3/4">
          با بازدید از ما، به یک قهرمان آموزشی تبدیل شوید و در دنیای پرماجرای
          PendingCoding، مهارت‌های ایستابی خود را بوسیله یادگیری بالا ببرید!
          اینجا، شما با بهره‌گیری از منابع تحلیلی و آموزشی متنوع، می‌توانید با
          دسترسی به آخرین مطالب، آموزش‌های تخصصی و راهنماهای کاربردی، به طور
          شگفت‌انگیزی توانمندی‌های خود را تقویت کنید. هر چه شما در PendingCoding
          یاد بگیرید، می‌تواند در بهبود مهارت‌های فنی شما تأثیر فراوانی داشته
          باشد. همچنین، با بازدید از سایت ما، به جامعه‌ای از علاقه‌مندان به
          برنامه‌نویسی و تکنولوژی بپیوندید و از تبادل تجربیات و چالش‌های مختلفی
          استفاده کنید. آماده‌اید تا به ما بپیوندید و در تلاش برای تبدیل شدن به
          قهرمانی آنلاین، همراهی کنید؟ بیایید دنیای پرماجرای PendingCoding را
          کاوش کنیم و با هم به این داستان پرانرژی پایان دهیم!
        </h4>
        <div className="w-80 relative order-2 md:order-1">
          <SearchInput
            queryName="value"
            className="w-80 px-6 pl-12 py-3"
            placeholder="جستجو ..."
          />
          <SearchResult />
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
