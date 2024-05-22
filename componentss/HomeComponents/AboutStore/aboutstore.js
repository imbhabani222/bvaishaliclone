import React from "react";
import styles from "./aboutstore.module.scss";
import { Col, Row } from "antd";
import Img from "../../../public/assets/yellow1.svg";
import Img2 from "../../../public/assets/yellow2.svg";
import Image from "next/image";
import { Card } from 'antd';

function AboutStore() {
  return (
    <Row className={styles.container} >
      <Col
        className={styles.image_content}
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
      >

        <div className={styles.images}>
          <div className={styles.img1} >
            <Image src={Img} alt="image" className={styles.image1} />
          </div>

          <div className={styles.img2} >
            <Image src={Img2} alt="image" className={styles.image2} />
          </div>
        </div>

      </Col>
      <Col
        className={styles.text_content}
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        xxl={12}
      >
        <div className={styles.heading}>
          <h2 style={{ color: "#000" }}>About Bvaishali</h2>
          <div className={styles.textarea}>
            <p>
              Established in 1998 by Rozina Vishram, this unique label was started with a passion to create each outfit with intricate craftsmanship and designs that are versatile and timeless. With thousands of stunning pieces and pleased clientele over the years, Rozina has a vast collection of designs that can inspire your ideal ensemble for any occasion – formal or bridal. As a brand we strive to bring you exquisite creations that are customised and tailor-made to achieve your desired Rozina outfit, one that you own and wear with pride.
            </p>
          </div>
        </div>
      </Col>
    </Row >
  );
}

export default AboutStore;
