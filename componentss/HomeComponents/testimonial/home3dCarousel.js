/* eslint-disable react/jsx-no-duplicate-props */
"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay, EffectCoverflow, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
// import TopBannerCard from "@/component/Cards/TopBannerCard/topbannercard";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./home3dCarousel.module.scss";
// SwiperCore.use([Pagination, Navigation]);

const Home3dCouresel = () => {
  const swiperRef = useRef();
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
  let data = [
    "https://swiperjs.com/demos/images/nature-1.jpg",
    "https://swiperjs.com/demos/images/nature-2.jpg",
    "https://swiperjs.com/demos/images/nature-3.jpg",
    "https://swiperjs.com/demos/images/nature-4.jpg",
  ];
  return (
    <div className={styles.main_container}>
      <p className={styles.main_heading}>Reviews</p>
      <div className={styles.container}>
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

        <LeftOutlined
          className={styles.swiperbtns}
          onClick={() => swiperRef.current.slidePrev()}
        />

        <div className={styles.swiperarea}>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles?.swiperslide}>
              <div className={styles.swiper_main_div}>
                <div>
                  <h2 className={styles.review_heading}>Great Dress!</h2>
                  <p className={styles.review_text}>
                    Hi…I have received dress material…Woww! beautiful
                    dress..Quick delivery..I really appreciate your product.
                  </p>
                  <p className={styles.review_name}>Swati Jaiswal</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <RightOutlined
          className={styles.swiperbtns}
          onClick={() => swiperRef.current.slideNext()}
        />
      </div>
    </div>
  );
};

export default Home3dCouresel;
