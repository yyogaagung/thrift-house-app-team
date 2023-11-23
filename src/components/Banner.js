import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { InlineIcon } from "@iconify/react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="customcontainer mx-auto px-6 lg:px-0 my-10 relative">
      <Swiper
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-button-next",
          prevEl: ".custom-button-prev",
        }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        modules={[Navigation, Pagination]}
      >
        <SwiperSlide>
          <Link to="/login">
            <img src="/images/banner1.png" alt="banner1" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/login">
            <img src="/images/banner2.png" alt="banner2" />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to="/pria">
            <img src="/images/banner3.png" alt="banner3" />
          </Link>
        </SwiperSlide>
      </Swiper>
      <div className="hidden custom-button-prev cursor-pointer bg-white sm:inline-block rounded-full p-3 drop-shadow-lg absolute left-0 lg:left-[-23px] top-1/2 z-10 -translate-y-full">
        <InlineIcon icon="akar-icons:chevron-left" height="24" />
      </div>
      <div className="hidden custom-button-next cursor-pointer bg-white sm:inline-block rounded-full p-3 drop-shadow-lg absolute right-0 lg:right-[-23px] top-1/2 z-10 -translate-y-full">
        <InlineIcon icon="akar-icons:chevron-right" height="24" />
      </div>
      <div className="custom-pagination flex justify-center mt-2 sm:mt-4"></div>
    </div>
  );
};

export default Banner;
