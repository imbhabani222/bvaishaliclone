"use client"
import React from "react"
import styles from "./productdescription.module.scss"
import { Col, Divider, Row, Image } from "antd"
import Img1 from "../../../../public/assets/productDetails/img1.png"
import Img2 from "../../../../public/assets/productDetails/img2.png"
import Img3 from "../../../../public/assets/productDetails/img3.png"

const ProductDescription = () => {
  return (
    <>
      <div className={styles.main_container}>
        <h4>Description</h4>
        <Divider />
        <div className={styles.description_text}>
          The legacy of Indian Heritage in cloth is shifted to the storyboard of
          Klum through the hands of Prajina Jaanaki. She was fascinated by the
          hand blocking done by master hands and veteran eyes of the artisans.
          Then, designed to content the royalty of wearing traditional
          blueprints through the exclusives from Klum. The strenuous process of
          hand blocking with natural dyes, the graceful hands of the Klum
          embroiderers, the eccentric ideas of our designers make each product
          from klum, hash tagged. From the making to dyeing each piece is
          impeccably crafted by Klum to set out the best wardrobe for you.
          Together, Let’s Klum.!
        </div>
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <Row gutter={[12, 12]}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Image unoptimized src={Img1.src} alt="#" preview={false} />
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Image unoptimized src={Img2.src} alt="#" preview={false} />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Image unoptimized src={Img3.src} alt="#" preview={false} />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProductDescription
