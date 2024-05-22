import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import styles from "./index.module.scss";
import Img from "../../public/assets/aboutUs/about-us.png";
import Image from "next/image";
import MobileAppBanner from "../../componentss/HomeComponents/MobileAppBanner/mobileappbanner";
const AboutUs = () => {
  const descriptionText = {
    para1:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",

    para2:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text",

    para3:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bread_crumb}>
          <Breadcrumb>
            <Breadcrumb.Item href=""></Breadcrumb.Item>
            <Breadcrumb.Item href="/">
              <span>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>About Us</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {[1, 2]?.map((item, index) => {
          return (
            <Row
              gutter={[32, 32]}
              key={index}
              className={
                index % 2 === 0 ? `${styles.odd_row}` : `${styles.even_row}`
              }
            >
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Image {...Img} alt="" />
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className={styles.description_wrapper}
              >
                <div className={styles.heading}>Description</div>
                <div className={styles.paragraph}>{descriptionText?.para1}</div>
                <div className={styles.paragraph}>{descriptionText?.para2}</div>
                <div className={styles.paragraph}>{descriptionText?.para3}</div>
              </Col>
            </Row>
          );
        })}
      </div>
      {/* <MobileAppBanner /> */}
    </>
  );
};

export default AboutUs;
