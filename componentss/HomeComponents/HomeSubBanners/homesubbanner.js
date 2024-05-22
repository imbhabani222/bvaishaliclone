// import React, { useEffect, useRef, useState } from "react";
// import styles from "./homesubbanner.module.scss";
// import SubBannerCard from "../../Cards/subBannerCard/subbannercard";
// import LeftArrow from "../../../public/assets/subBanner/left-arrow.svg";
// import RightArrow from "../../../public/assets/subBanner/right-arrow.svg";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Navigation, Autoplay, Pagination } from "swiper";
// import { Col, Row } from "antd";
// import getWindowDimensions from "../../getWidthh";

// function HomeSubBanners({ data }) {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const [windowWidth, setWindowWidth] = useState(getWindowDimensions());

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(getWindowDimensions());
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   // Check if data length is greater than 1 to determine whether to render Swiper
//   const renderSwiper = data?.length > 1;

//   return (
//     <div className={`${styles.container}`}>
//       <div style={{ position: "relative" }} className={styles.window_view}>
//         {renderSwiper && (
//           <>
//             <div ref={prevRef} className={styles.btn_next}>
//               <Image src={LeftArrow} alt="arrow" height={100} width={100} style={{ height: "100%", width: "100%" }} />
//             </div>
//             <div ref={nextRef} className={styles.btn_prev}>
//               <Image src={RightArrow} alt="arrow" height={100} width={100} />
//             </div>
//           </>
//         )}
//         {renderSwiper ? (
//           <Swiper
//             loop={data?.length > 1}
//             autoplay={{
//               delay: 1600,
//               disableOnInteraction: false,
//             }}
//             loopFillGroupWithBlank={false}
//             breakpoints={{
//               320: { slidesPerView: 1, spaceBetween: 20 },
//               480: { slidesPerView: 1, spaceBetween: 30 },
//               640: { slidesPerView: 1, spaceBetween: 40 },
//               700: { slidesPerView: 1, spaceBetween: 40 },
//               850: { slidesPerView: 1, spaceBetween: 40 },
//               1000: { slidesPerView: 1, spaceBetween: 40 },
//               1800: { slidesPerView: 1, spaceBetween: 30 },
//             }}
//             modules={[Navigation, Autoplay, Pagination]}
//             className="mySwiper"
//             onInit={(swiper) => {
//               swiper.params.navigation.prevEl = prevRef.current;
//               swiper.params.navigation.nextEl = nextRef.current;
//               swiper.navigation.init();
//               swiper.navigation.update();
//             }}
//             pagination={windowWidth < 700}
//           >
//             {data?.map((item, index) => (

//               <SwiperSlide key={index}>
//                 <div key={index} className={styles.cardContainer}>
//                   <SubBannerCard data={item} />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <div>
//             {data?.map((item, index) => (
//               <SubBannerCard data={item} key={index} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomeSubBanners;

/* eslint-disable @next/next/no-img-element */
import React, { useRef } from "react";
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
import styles from "./homesubbanner.module.scss";
import { Card } from "antd";

function HomeSubBanners({ data, dataBan }) {
  const router = useRouter();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  bodyStyle: {
    marginTop: "30px";
    boxShadow: "0px 1px 10px rgba(0,1,1,0.15)";
    backgroundColor: "#ffffff";
    borderStyle: "solid";
    outline: "none";
    width: "100%";
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
          delay: 2500,
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
          console.log(item, "theseare the items now logged ");
          return (
            <SwiperSlide key={index}>
              <div div key={index} className={styles.cardContainer}>
                <Card
                  className={styles.card}
                  style={{ border: "none", objectFit: "cover" }}
                  bodyStyle={{ padding: "0" }}
                  cover={
                    <img
                      alt="example"
                      src={item?.mediaDetails?.url}
                      style={{
                        width: "100%",
                        height: "370px",
                        objectFit: "cover",
                        objectPosition: "top",
                        overflow: "hidden",
                        maxHeight: "100%",
                      }}
                    />
                  }
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default HomeSubBanners;
