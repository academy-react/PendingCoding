import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";

import { cn } from "../../../../libs/utils";

import logo from "../../../assets/samuel-girven-t7U6dyvd76Y-unsplash.jpg";
import mirror from "../../../assets/photo_5879531807425280612_y.jpg";
import react from "../../../assets/photo_5879531807425280611_y.jpg";
import wavy from "../../../assets/nick-design-3fyrp9e0XSY-unsplash.jpg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const photos = [
  {
    id: 1,
    alt: "Image",
    image: logo,
    category: "خبر",
  },
  {
    id: 2,
    alt: "Image",
    image: mirror,
    category: "خبر",
  },
  {
    id: 3,
    alt: "Image",
    image: react,
    category: "مقاله",
  },
  {
    id: 4,
    alt: "Image",
    image: wavy,
    category: "خبر",
  },
  {
    id: 5,
    alt: "Image",
    image: wavy,
    category: "خبر",
  },
  {
    id: 6,
    alt: "Image",
    image: wavy,
    category: "خبر",
  },
  {
    id: 7,
    alt: "Image",
    image: wavy,
    category: "خبر",
  },
];

export const Slider = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-[400px] sm:w-[500px] md:w-[450px] lg:w-[600px] xl:w-[1000px]">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={30}
          breakpoints={{
            400: {
              slidesPerView: 1,
            },
            700: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 2,
            },
            1250: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <Link
                to={`/${photo.id}`}
                className="border-2 border-white rounded-2xl bg-[#F0F0F0] flex flex-col items-start justify-center gap-y-2 p-4"
              >
                <span
                  className={cn(
                    "bg-[#CFCFF0] px-2 py-3 text-sm text-gray-500 rounded-full",
                    photo.category === "خبر" && "p-3"
                  )}
                >
                  {photo.category}
                </span>
                <h3 className="text-lg text-gray-600">
                  لورم ایپسوم متن ساختگی
                </h3>
                <h5 className="text-sm text-gray-400  line-clamp-2 break-normal">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است یشسیشیسسشیشییشسیشس
                </h5>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
