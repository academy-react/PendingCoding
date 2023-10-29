import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import { VerticalCard } from "../vertical-card";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

export const Slider = ({ courses }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={20}
        breakpoints={{
          700: {
            slidesPerView: 1,
          },
          975: {
            slidesPerView: 2,
          },
          1270: {
            slidesPerView: 2,
          },
          1300: {
            slidesPerView: 3,
          },
          1625: {
            slidesPerView: 4,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
      >
        {courses?.map((course) => (
          <SwiperSlide key={course.id}>
            <VerticalCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
