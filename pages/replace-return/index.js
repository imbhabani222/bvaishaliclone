import { Col, Image, Row, Steps, Typography } from "antd";
import React from "react";
import styles from "./index.module.scss";
import Img from "../../public/assets/productCardImg/product-img-ph.jpg";
const ReplaceReturnOrder = () => {
  return (
    <div className={styles.container}>
      <Typography className={styles.page_title}>
        Replace & Return Order
      </Typography>
      <Row style={{ marginTop: "20px" }} gutter={[12, 12]}>
        <Col
          xl={16}
          lg={16}
          md={16}
          sm={24}
          xs={24}
          className={styles.left_section_wrapper}
        >
          <Row>
            <Col xl={4} lg={4} md={4} sm={24} xs={24}>
              <Image {...Img} height={100} width={100} alt="" />
            </Col>
            <Col
              xl={20}
              lg={20}
              md={20}
              sm={24}
              xs={24}
              className={styles.left_content_wrapper}
            >
              <div className={styles.product_name}>
                Casual Sneakers Canvas Shoes For Sneakers For Men
              </div>
              <div className={styles.varient_wrapper}>
                <div>Qty : 1</div>
                <div>Size : 6</div>
                <div>Colour : Black</div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          xl={8}
          lg={8}
          md={8}
          sm={24}
          xs={24}
          className={styles.right_section}
        >
          <Typography className={styles.type_heading}>
            Replace & Return Order
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default ReplaceReturnOrder;
