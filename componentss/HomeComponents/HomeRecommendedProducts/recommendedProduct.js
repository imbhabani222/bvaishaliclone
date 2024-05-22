import React, { useEffect, useRef, useState } from "react";
import styles from "./recommendedProduct.module.scss";
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
import BASE_URL from "../../../constants/textUtility/textenv";
import axios from "axios";
function HomeRecommendedProduct(props) {
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

  const [recommendedData, setRecommendedData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [totleCount, setTotleCount] = useState(0);

  useEffect(() => {
    setLoader(true);
    let urlRecommended = `${BASE_URL}/store/api/v1/search-collections?search=Recommended%20Products`;
    axios
      .get(urlRecommended)
      .then((res) => {
        if (res?.data?.collections[0]?.id) {
          let url = `${BASE_URL}/store/cms/collections/${res?.data?.collections[0]?.id}?page=${page}&limit=6`;
          axios
            .get(url)
            .then((res) => {
              console.log("rrrrtttttt", res);
              setTotleCount(res?.data?.collections?.total);
              if (page == 1) {
                setRecommendedData(res?.data?.collections?.products);
              } else {
                setRecommendedData([
                  ...recommendedData,
                  ...res?.data?.collections?.products,
                ]);
              }
              setLoader(false);
            })
            .catch((err) => {
              console.log("rec err", err);
              setLoader(false);
            });
        }
      })
      .catch((err) => {
        console.log("rec id err", err);
        setLoader(false);
      });
  }, [page]);

  const viewMoreMobile = () => {
    setPage(page + 1);
  };

  const windowSlidesEndReach = () => {
    setPage(page + 1);
  };

  if (recommendedData?.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.container}`}>
      <div>
        <div className={styles.sub_container}>
          <div className={styles.heading}>
            <h2>Recommended Products</h2></div>
          {recommendedData?.filter((it) => it?.isActive)?.length > 4 && (
            <div className={styles.heading_wrapper}>
              <div
                className={styles.related_see_all_title}
                onClick={() => router.push("/recommended-products")}
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
            {recommendedData
              ?.filter((it) => it?.isActive)
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
        {recommendedData
          ?.filter((it) => it?.isActive)
          ?.map((item, index) => {
            return (
              <Col xs={12} sm={12} key={index}>
                <ProductCard data={item} />
              </Col>
            );
          })}

        <div className={styles.mobile_see_all}>
          {totleCount > recommendedData?.length && (
            <button
              className={
                loader ? `${styles.load_spinner}` : `${styles.view_more_btn}`
              }
              onClick={() => viewMoreMobile()}
            >
              {!loader ? "View More" : <Spin />}
            </button>
          )}
        </div>
      </Row>
    </div>
  );
}

export default HomeRecommendedProduct;
