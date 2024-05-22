import React, { useEffect, useRef, useState } from "react";
import styles from "./exploreProduct.module.scss";
import ProductCard from "../../Cards/productCard/productcard";
import LeftArrow from "../../../public/assets/subBanner/left-arrow.svg";
import RightArrow from "../../../public/assets/subBanner/right-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Row, Spin } from "antd";
import axios from "axios";
import BASE_URL from "../../../constants/textUtility/textenv";
function HomeExploreProduct(props) {
  const router = useRouter();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
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
      slidesPerView: 4,
      spaceBetween: 30,
    },
  };

  const [recentData, setRecentData] = useState([]);
  const [recentPage, setRecentPage] = useState(1);
  const [totleRecentData, setTotleRecentData] = useState(0);
  const [recentLoader, setRecentLoader] = useState(false);

  useEffect(() => {
    let url = `${BASE_URL}/store/cms/products/recent?page=${recentPage}&limit=${"6"}`;
    setRecentLoader(true);
    axios
      .get(url)
      .then((res) => {
        console.log("reds", res);
        setTotleRecentData(res?.data?.total);
        if (recentPage == 1) {
          setRecentData(res?.data?.products);
        } else {
          setRecentData([...recentData, ...res?.data?.products]);
        }
        setRecentLoader(false);
      })
      .catch((err) => {
        console.log("errrd", err);
        setRecentLoader(false);
      });
  }, [recentPage]);

  const viewMoreMobile = () => {
    setRecentPage(recentPage + 1);
  };

  const windowSlidesEndReach = () => {
    setRecentPage(recentPage + 1);
  };

  if (recentData?.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.container}`}>
      <div>
        <div className={styles.sub_container}>
          <div className={styles.heading}>
            <h2>Explore Products</h2></div>
          {recentData?.filter((it) => it?.isActive)?.length > 4 && (
            <div className={styles.heading_wrapper}>
              <div
                className={styles.related_see_all_title}
                onClick={() => router.push("/explore-products")}
              >
                View More
              </div>
              <div className={styles.arrows} ref={prevRef}>
                <Image height={25} width={25} src={LeftArrow} alt="" />
              </div>
              <div className={styles.arrows} ref={nextRef}>
                <Image height={25} width={25} src={RightArrow} alt="" />
              </div>
            </div>
          )}
        </div>

        <div className={styles.window_view}>
          <Swiper
            loop={false}
            loopFillGroupWithBlank={true}
            breakpoints={responsiveSlide}
            modules={[Navigation]}
            className="mySwiper"
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            onReachEnd={(e) => windowSlidesEndReach(e)}
          >
            {recentData
              ?.filter((it) => it?.isActive)
              ?.reverse()
              ?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <ProductCard data={item} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
      <Row gutter={[12, 12]} className={styles.mobile_view}>
        {recentData
          ?.filter((it) => it?.isActive)
          ?.map((item, index) => {
            return (
              <Col xs={12} sm={12} key={index}>
                <ProductCard data={item} />
              </Col>
            );
          })}

        {totleRecentData > recentData?.length && (
          <div className={styles.mobile_see_all}>
            <button
              className={
                recentLoader
                  ? `${styles.load_spinner}`
                  : `${styles.view_more_btn}`
              }
              onClick={() => viewMoreMobile()}
            >
              {!recentLoader ? "View More" : <Spin />}
            </button>
          </div>
        )}
      </Row>
    </div>
  );
}

export default HomeExploreProduct;
