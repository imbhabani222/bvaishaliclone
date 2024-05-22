import React from "react";
import { Row, Col, Card } from 'antd';
import Image from "next/image";
import Img1 from "../../../public/assets/carousel/img1.png";
import Img2 from "../../../public/assets/carousel/img2.png";
import Img3 from "../../../public/assets/carousel/img3.png";
import Img4 from "../../../public/assets/carousel/img4.png";
import styles from "./thirdcollection.module.scss";

const { Meta } = Card;

function ThirdCollection() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2>Most Popular Products </h2>
      </div>
      <Row gutter={[16, 16]}>
        {[Img3, Img1, Img2, Img3].map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <div className={styles.cardWrapper}>
              <Card className={styles.card}>
                <div className={styles.image_wrapper}>
                  <Image unoptimized {...item} alt="" />
                </div>
                <Meta
                  className={styles.content}
                  title="Blue & Green Woven Design Lehenga Choli"
                  description="₹2777"
                />
              </Card>
            </div>

          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ThirdCollection;
