/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
import styles from "./topbanner.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative, Autoplay } from "swiper";
import HomeBanner from "../../../public/assets/homepagebanner.png";
import ButtonArrow from "../../../public/assets/arrowbutton.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { useRouter } from "next/router";
import { Card } from 'antd';


function TopBanner({ data }) {
  const router = useRouter();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  bodyStyle: {
    marginTop: '30px';
    boxShadow: '0px 1px 10px rgba(0,1,1,0.15)';
    backgroundColor: '#ffffff';
    borderStyle: 'solid';
    outline: 'none';
    width: '100%';
  }

  let responsiveSlide = {
    320: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    700: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    850: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    1000: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    1800: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  };
  const myLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  const bannerClick = (item) => {
    if (item?.linkType && !item?.hasUnavailItems) {
      if (item?.linkType === "category") {
        router.push(`/product-list?cat=${item?.slug}`);
      } else {
        router.push(`/product-details/${item?.slug}`);
      }
    }
  };

  const datahome = [
    {
      url: HomeBanner,
      title: "Check it out today’s flash sale",
      description:
        "Today is best day. we will treat you incredible flash sale up to 50% off when you shop online.",
    },
  ];

  const handleClick = () => {
    router.push("/product-list");
  };


  return (
    <div className={styles.container}>
      <Swiper
        loop={data?.length > 1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loopFillGroupWithBlank={false}
        breakpoints={responsiveSlide}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef?.current;
          swiper.params.navigation.nextEl = nextRef?.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {data?.map((item, index) => {
          console.log(item, "theseare the items now logged ")
          return (
            <SwiperSlide key={index}>
              <div key={index} className={styles.cardContainer}>
                <Card
                  style={{ border: "none", padding:0}}  bodyStyle={{padding: "0"}}
                  cover={<img alt="example" src={item?.mediaDetails?.url} />}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>


    </div >
  );
}

export default TopBanner;
