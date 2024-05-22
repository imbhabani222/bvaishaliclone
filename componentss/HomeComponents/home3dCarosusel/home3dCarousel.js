"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import Img1 from "../../../public/homeSliderAssets/img1.jpg";
import Img2 from "../../../public/homeSliderAssets/img2.jpg";
import Img3 from "../../../public/homeSliderAssets/img3.jpg";
import Img4 from "../../../public/homeSliderAssets/img4.jpg";
// import Img from "../../../public/assets/thirdCollection/img.png"
// import Img2 from "../../../public/assets/thirdCollection/img2.png"
// import Img3 from "../../../public/assets/thirdCollection/img3.png"
import Image from "next/image";
import styles from "./home3dCarousel.module.scss";

const Home3dCouresel = () => {
  let responsiveSlide = {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    850: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1000: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1800: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  };
  let data = [Img1, Img2, Img3, Img4];
  return (
    <div className={[styles.home_page_container_carousal]}>
      {/* <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide accessKey="2" key={index}>
              <Image unoptimized src={item} alt="" height={300} width={300} />
            </SwiperSlide>
          );
        })}
      </Swiper> */}
      <div className={styles.swiperarea}>
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={styles.swiper}
        >
          {data?.map((item, index) => {
            return (
              <SwiperSlide
                accessKey="2"
                key={index}
                // loop={true}
                className={styles.swiperslide}
              >
                <div className={styles.slider_text}>
                  <p className={styles.slider_text_heading}>
                    Most-Loved Styles
                  </p>
                  <p className={styles.slider_text_caption}>
                    Women Ethnic Motifs Embroidered Work
                  </p>
                </div>
                <Image unoptimized src={item} alt="" height={300} width={300} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Home3dCouresel;
