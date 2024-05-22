"use client";
// import ThirdCollectionCard from "@/component/Cards/ThirdCollectionCard/thirdcollectioncard";
import React, { useEffect, useRef, useState } from "react";
import styles from "./twocollection.module.scss";
import Img from "../../../public/assets/lehenga.png";
import Img2 from "../../../public/assets/frock-gown.png";
import ButtonArrow from "../../../public/assets/arrowbutton.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "antd";
const { Meta } = Card;
import { Col, Row, Spin } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

// const dataurl = [
//   {
//     imageurl: Img,
//     name: "Lehenga",
//     description: "Women Ethnic Motifs Embroidered Work Lehenga",
//     url: "lehenga",
//   },
//   {
//     imageurl: Img2,
//     name: "Frock Gown",
//     description: "Women Ethnic Motifs Embroidered Work Frock Gown",
//     url: "gown",
//   },
//   {
//     imageurl: Img,
//     name: "Kurti",
//     description: "Women Ethnic Motifs Embroidered Work Frock Gown",
//     url: "gown",
//   },
// ];

let responsiveSlide = {
  320: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 10,
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
    slidesPerView: 3,
    spaceBetween: 5,
  },
  1000: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  1800: {
    slidesPerView: 6,
    spaceBetween: 10,
  },
};

function TwoCollection({ data }) {
  console.log(data, "datamap");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [totleCount, setTotleCount] = useState(0);

  bodyStyle: {
    marginTop: "30px";
    boxShadow: "0px 1px 10px rgba(0,1,1,0.15)";
    backgroundColor: "#ffffff";
    borderStyle: "solid";
    outline: "none";
    width: "100%";
  }

  const handleClick = (e) => {
    router.push(`/product-list?cat=${e}`);
  };
  let datamap = data()[0];

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>WHAT ARE YOU LOOKING FOR?</h2>
      </div>
      <div className={styles.cards_wrapper}>
        {datamap?.map((item, index) => {
          console.log(item, "two collection");
          return (
            <div key={index} className={styles.container1}>
              <div key={index} className={styles.img_wrapper}>
                <Card
                  onClick={() => handleClick(item?.slug)}
                  className={styles.card}
                  bodyStyle={{ padding: "10px" }}
                  cover={
                    <img
                      alt="example"
                      src={item?.mediaData?.url}
                      layout="fixed"
                      objectFit={"cover"}
                      height={"400px"}
                      width={"100%"}
                      className={styles.card_img}
                    />
                  }
                >
                  <Meta
                    className={styles.name}
                    title={
                      <span style={{ fontWeight: "bold" }}>
                        {item?.displayName}
                      </span>
                    }
                  />
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    // <div className={`${styles.container}`}>
    //   <div>
    //     <div className={styles.sub_container}>
    //       <div className={styles.heading}>
    //         <h2>Most Popular Products</h2>
    //       </div>
    //       {datamap?.filter((it) => it?.isActive)?.length > 4 && (
    //         <div className={styles.heading_wrapper}>
    //           {/* <div
    //             className={styles.related_see_all_title}
    //             onClick={() => router.push("/populer-products")}
    //           >
    //             View More
    //           </div> */}
    //           <div className={styles.arrows} ref={prevRef}>
    //             <Image height={25} width={25} src={LeftArrow} alt="" />
    //           </div>
    //           <div className={styles.arrows} ref={nextRef}>
    //             <Image height={25} width={25} src={RightArrow} alt="" />
    //           </div>
    //         </div>
    //       )}
    //     </div>

    //     <div className={styles.window_view}>
    //       {/* <Swiper
    //         loop={false}
    //         loopFillGroupWithBlank={true}
    //         breakpoints={responsiveSlide}
    //         modules={[Navigation]}
    //         className="mySwiper"
    //         onInit={(swiper) => {
    //           swiper.params.navigation.prevEl = prevRef.current;
    //           swiper.params.navigation.nextEl = nextRef.current;
    //           swiper.navigation.init();
    //           swiper.navigation.update();
    //         }}
    //         onReachEnd={(e) => windowSlidesEndReach(e)}
    //       > */}
    //       {datamap
    //         ?.filter((it) => it?.isActive)
    //         ?.map((item, index) => {
    //           return (
    //             <SwiperSlide key={index}>
    //               {/* <ProductCard data={item} /> */}
    //             </SwiperSlide>
    //           );
    //         })}
    //       {/* </Swiper> */}
    //     </div>
    //   </div>
    //   <Row gutter={[12, 12]} className={styles.mobile_view}>
    //     {datamap
    //       ?.filter((it) => it?.isActive)
    //       ?.map((item, index) => {
    //         return (
    //           <Col xs={12} sm={12} key={index}>
    //             {/* <ProductCard data={item} /> */}
    //           </Col>
    //         );
    //       })}

    //     <div className={styles.mobile_see_all}>
    //       {totleCount > datamap?.length && (
    //         <button
    //           className={
    //             loader ? `${styles.load_spinner}` : `${styles.view_more_btn}`
    //           }
    //           onClick={() => viewMoreMobile()}
    //         >
    //           {!loader ? "View More" : <Spin />}
    //         </button>
    //       )}
    //     </div>
    //   </Row>
    // </div>
  );
}

export default TwoCollection;
