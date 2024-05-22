import React, { useEffect, useRef, useState } from "react";
import { categoriesData } from "../../../constants/JsonData/categoryData";
import styles from "./homecategories.module.scss";
import CategoriesCard from "../../Cards/categoryCard/categorycard";
import { useRouter } from "next/router";
import LeftArrow from "../../../public/assets/subBanner/left-arrow.svg";
import RightArrow from "../../../public/assets/subBanner/right-arrow.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import AllImg from "../../../public/all-cats.png";
import { Col, Row } from "antd";

function HomeCategories(props) {
  const router = useRouter();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [loadSwiper, setSwiper] = useState(false);

  let responsiveSlide = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
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
      slidesPerView: 6,
      spaceBetween: 40,
    },
    1800: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setSwiper(true);
    }, 300);
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.top_row}`}>
        <div className={`${styles.label1}`}>{categoriesData?.label1}</div>
        <Link rel="canonical" href={"/categorie-listing"}>
          <div className={`${styles.label2}`}>{categoriesData?.label2}</div>
        </Link>
      </div>

      <div
        className={styles.swiper_container}
        style={
          props?.data?.length < 6
            ? {
                width: "93%",
                margin: "2% auto 2%",
              }
            : {}
        }
      >
        <div ref={prevRef} className={styles.btn_next}>
          <Image src={LeftArrow} alt="arrow" height={46} width={46} />
        </div>
        {loadSwiper && (
          <Swiper
            loop={false}
            loopFillGroupWithBlank={true}
            breakpoints={responsiveSlide}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            className={`${styles.swipper} mySwiper`}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {[
              {
                displayName: "All",
                isActive: true,
                mediaData: {
                  url: AllImg,
                },
              },
              ...props?.data,
            ]
              ?.filter((ele) => ele?.isActive)
              ?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CategoriesCard data={item} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
        <div ref={nextRef} className={styles.btn_prev}>
          <Image src={RightArrow} alt="arrow" height={46} width={46} />
        </div>
      </div>
      <Row gutter={[12, 12]} className={styles.mobile_cat_wrapper}>
        {[
          {
            displayName: "All",
            isActive: true,
            mediaData: {
              url: AllImg,
            },
          },
          ...props?.data,
        ]
          ?.filter((ele) => ele?.isActive)
          ?.slice(0, 6)
          ?.map((item, index) => {
            return (
              <Col sm={8} xs={8} key={index}>
                <CategoriesCard data={item} />
              </Col>
            );
          })}
        {props?.data?.length > 5 && (
          <div className={styles.mobile_see_all}>
            <button onClick={() => router.push("/categorie-listing")}>
              All Categories
            </button>
          </div>
        )}
      </Row>
    </div>
  );
}

export default HomeCategories;
