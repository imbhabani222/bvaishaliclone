import React, { useState } from "react";
import styles from "./mobileappbanner.module.scss";
// import Img from "../../../public/assets/home-categories.png";
import Img from "../../../public/assets/mobileAppBanner/mobile-img1.png";
import AppleStoreImg from "../../../public/assets/mobileAppBanner/apple-store.png";
import PlayStoreImg from "../../../public/assets/mobileAppBanner/play-store.png";
import QrCodeImg from "../../../public/assets/mobileAppBanner/QR.svg";
import { Row, Col, Input, Button } from "antd";
import Image from "next/image";
function MobileAppBanner() {
  return (
    <div className={styles.container}>
      <Row>
        <Col
          xl={15}
          lg={15}
          md={15}
          sm={24}
          xs={24}
          className={styles.left_side}
        >
          <div className={styles.left_side_div}>
            <div className={styles.first_line}>
              Download our latest application for better user experience.
            </div>
            <div className={styles.second_line}>
              We will send you a link, open it on your phone to download the app
            </div>
            <div className={styles.input_wrapper}>
              <Input placeholder="Enter Mobile Number or Email" />
              <button className={styles.input_wrapper_btn}>Send Link</button>
            </div>
            <div className={styles.availability}>
              <div className={styles.availability_one}>
                Available On iOS and Android
              </div>
              <div className={styles.availability_two}>Scan For Download</div>
            </div>
            <div className={styles.availability_flatform}>
              <Image {...AppleStoreImg} height={60} alt="" />
              <Image {...PlayStoreImg} height={60} alt="" />
              <Image {...QrCodeImg} height={60} alt="" />
            </div>
          </div>
        </Col>
        <Col
          xl={9}
          lg={9}
          md={9}
          sm={24}
          xs={24}
          className={styles.mobile_phone_img_wrapper}
        >
          <Image
            height={300}
            objectFit="contain"
            className={styles.mobile_img}
            src={Img}
            alt=""
          />
        </Col>
      </Row>
    </div>
  );
}

export default MobileAppBanner;
