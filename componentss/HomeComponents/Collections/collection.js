"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import Img1 from "../../../../public/assets/homeCollection1/collection1.png";
import Img2 from "../../../../public/assets/homeCollection1/collection2.png";
import SubCollection from "@/component/Cards/SubcollectionCard/subcollection";
import styles from "./collection.module.scss";

function SubCollections() {
  let responsiveSlide = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    700: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    850: {
      slidesPerView: 2,
      spaceBetween: 1,
    },
    1000: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    1800: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  };
  return (
    <div className={styles.container}>
      <Swiper
        loop={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loopFillGroupWithBlank={false}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        breakpoints={responsiveSlide}
      >
        {[Img1, Img2]?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <SubCollection data={item} key={index} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SubCollections;
