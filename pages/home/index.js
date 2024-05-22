import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeCategories from "../../componentss/HomeComponents/HomeCategories/homecategories";
import HomeFullFledgedBanner from "../../componentss/HomeComponents/HomeFullFledgedBanner/fullfledgedbanner";
import HomePopularProduct from "../../componentss/HomeComponents/HomeMostPopulerProduct/populerproduct";
import HomeRecommendedProduct from "../../componentss/HomeComponents/HomeRecommendedProducts/recommendedProduct";
import HomeSubBanners from "../../componentss/HomeComponents/HomeSubBanners/homesubbanner";
import TopBanner from "../../componentss/HomeComponents/TopBanner/topbanner";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../componentss/Loader";
import styles from "./home.module.scss";
import { FETCH_ALL_BANNERS } from "../../redux/banners/actions/actions";
import getWindowDimensions from "../../componentss/getWidthh";
import HomeRecentlyAddeddProducts from "../../componentss/HomeComponents/HomeRecentlyAddedProduct/recentlyAddeddProducts";
import HomeExploreProduct from "../../componentss/HomeComponents/HomeExploreProducts/exploreProduct";
import { useRouter } from "next/router";
import FullScreenCollection from "../../componentss/HomeComponents/FullScreenCollection/fullscreencollection";

import ThirdCollection from "../../componentss/HomeComponents/ThirdCollections/thirdcollection";
import TwoCollection from "../../componentss/HomeComponents/TwoCollections/twocollection";
import AboutStore from "../../componentss/HomeComponents/AboutStore/aboutstore";
import Home3dCouresel from "../../componentss/HomeComponents/home3dCarosusel/home3dCarousel";
import Testimonial from "../../componentss/HomeComponents/testimonial/home3dCarousel";
import InstagramPics from "../../componentss/HomeComponents/InstagramPics/instagrampics";
import { Col, Row, Skeleton } from "antd";
import FullScreenCollectionSecond from "../../componentss/HomeComponents/FullScreenCollectionSecond/FullScreenCollectionSecond";
import { categoriesData } from "../../constants/JsonData/categoryData";

function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  let allCategoriesData = useSelector((state) => state?.allCategories || []);
  let bannersData = useSelector((state) => state?.bannersList || []);
  console.log("bannersData", bannersData);
  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());

  useEffect(() => {
    console.log(allCategoriesData, "(((((((");

    const handleResize = () => {
      setWindowWidth(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!bannersData?.fetching && !bannersData?.result) {
      dispatch({ type: FETCH_ALL_BANNERS });
    }
  }, []);

  const heroBanners = bannersData?.result?.banners
    ?.filter((item) => item?.type === "HEROBANNER" && item?.isActive)
    .sort((a, b) => a?.order - b?.order)
    ?.map((b) => {
      let startDateWithTime = new Date();
      let endDateWithTime = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
      console.log({ startDateWithTime, endDateWithTime });

      if (b?.dateValidityFrom) {
        startDateWithTime = new Date(b?.dateValidityFrom);
        if (b?.timeValidityFrom) {
          const [hr, min, sec] = b?.timeValidityFrom.split(":");
          startDateWithTime = new Date(
            startDateWithTime.getTime() +
              (+hr * 60 * 60 + +min * 60 + +sec) * 1000
          );
        }
      }

      if (b?.dateValidityTo) {
        endDateWithTime = new Date(b?.dateValidityTo);
        if (b?.timeValidityTo) {
          const [hr, min, sec] = b?.timeValidityTo.split(":");
          endDateWithTime = new Date(
            endDateWithTime.getTime() +
              (+hr * 60 * 60 + +min * 60 + +sec) * 1000
          );
        } else {
          endDateWithTime = new Date(
            endDateWithTime.getTime() + 2 * 60 * 60 * 1000 - 1
          );
        }
      }
      const nowDateTime = new Date();
      console.log({
        startDateWithTime,
        nowDateTime,
        endDateWithTime,
      });
      if (startDateWithTime <= nowDateTime && endDateWithTime >= nowDateTime) {
        return b;
      } else {
        return false;
      }
    })
    ?.filter((bb) => bb);

  const multiBanners = bannersData?.result?.banners
    ?.filter((item) => item?.type === "MULTIPLEBANNER" && item?.isActive)
    .sort((a, b) => a?.order - b?.order)
    ?.map((b) => {
      let startDateWithTime = new Date();
      let endDateWithTime = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
      console.log({ startDateWithTime, endDateWithTime });

      if (b?.dateValidityFrom) {
        startDateWithTime = new Date(b?.dateValidityFrom);
        if (b?.timeValidityFrom) {
          const [hr, min, sec] = b?.timeValidityFrom.split(":");
          startDateWithTime = new Date(
            startDateWithTime.getTime() +
              (+hr * 60 * 60 + +min * 60 + +sec) * 1000
          );
        }
      }

      if (b?.dateValidityTo) {
        endDateWithTime = new Date(b?.dateValidityTo);
        if (b?.timeValidityTo) {
          const [hr, min, sec] = b?.timeValidityTo.split(":");
          endDateWithTime = new Date(
            endDateWithTime.getTime() +
              (+hr * 60 * 60 + +min * 60 + +sec) * 1000
          );
        } else {
          endDateWithTime = new Date(
            endDateWithTime.getTime() + 2 * 60 * 60 * 1000 - 1
          );
        }
      }
      const nowDateTime = new Date();
      console.log({
        startDateWithTime,
        nowDateTime,
        endDateWithTime,
      });
      if (startDateWithTime <= nowDateTime && endDateWithTime >= nowDateTime) {
        return b;
      } else {
        return false;
      }
    })
    ?.filter((bb) => bb);

  const singleBanner = bannersData?.result?.banners
    ?.filter((item) => item?.type === "SINGLEBANNER" && item?.isActive)
    .sort((a, b) => a?.order - b?.order)
    ?.map((b) => {
      let startDateWithTime = new Date();
      let endDateWithTime = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
      console.log({ startDateWithTime, endDateWithTime });

      if (b?.dateValidityFrom) {
        startDateWithTime = new Date(b?.dateValidityFrom);
        if (b?.timeValidityFrom) {
          const [hr, min, sec] = b.timeValidityFrom.split(":");
          startDateWithTime = new Date(
            startDateWithTime.getTime() +
              (+hr * 60 * 60 + +min * 60 + +sec) * 1000
          );
        }
      }

      if (b?.dateValidityTo) {
        endDateWithTime = new Date(b?.dateValidityTo);
        if (b?.timeValidityTo) {
          const [hr, min, sec] = b.timeValidityTo.split(":");
          endDateWithTime = new Date(
            endDateWithTime.getTime() +
              (+hr * 60 * 60 + +min * 60 + +sec) * 1000
          );
        } else {
          endDateWithTime = new Date(
            endDateWithTime.getTime() + 2 * 60 * 60 * 1000 - 1
          );
        }
      }
      const nowDateTime = new Date();
      console.log({
        startDateWithTime,
        nowDateTime,
        endDateWithTime,
      });
      if (startDateWithTime <= nowDateTime && endDateWithTime >= nowDateTime) {
        return b;
      } else {
        return false;
      }
    })
    ?.filter((bb) => bb);

  if (allCategoriesData?.fetching) {
    return (
      <div>
        <Loader text="Loading..." />
      </div>
    );
  }

  const twoCategorymap = () => {
    let s = [];
    let res = [];
    allCategoriesData?.result?.categoriesFlat?.map((v, ind) => {
      if (ind <= 3) {
        res.push(v);
      }
      if (ind > 3) {
        s.push(v);
      }
    });
    return [res, s];
  };

  return (
    <>
      {heroBanners?.length > 0 && <TopBanner data={heroBanners} />}
      <div className={styles.container}></div>
      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        <TwoCollection data={twoCategorymap} />
      </div>

      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        {/* <FullScreenCollection /> */}
        <HomeSubBanners data={singleBanner} />
      </div>

      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        <HomePopularProduct />
      </div>

      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        {/* <FullScreenCollection /> */}
        <HomeSubBanners data={multiBanners} />
      </div>

      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        <HomeRecentlyAddeddProducts />
      </div>
      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        <HomeRecommendedProduct />
      </div>
      {/* <div className={styles.super_container}>
        <HomePopularProduct />
      </div> */}
      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        <HomeExploreProduct />
      </div>

      {/* <div className={styles.super_container}>
        <FullScreenCollectionSecond />
      </div> */}

      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        <AboutStore />
      </div>

      <div className={styles.super_container} style={{ marginTop: "50px" }}>
        <Testimonial />
      </div>
      <div>
        <InstagramPics />
      </div>
      {/* <div className={styles.container}>
        <HomeRecentlyAddeddProducts windowWidth={windowWidth} />
      </div>
      <div className={styles.container}>
        <HomeExploreProduct windowWidth={windowWidth} />
      </div> */}
    </>
  );
}

export default HomePage;
