import { CommentOutlined, CalendarOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./bloglistcard.module.scss";
function BlogListCard(props) {
  const { btn_text, comments, date, description, heading, title, img } =
    props?.data;

  const router = useRouter();
  return (
    <Row
      className={styles.container}
      onClick={() => router.push("blog-details/1")}
    >
      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        {img && (
          <Row>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Image height={400} objectFit="fill" src={img} alt="blog-image" />
            </Col>
          </Row>
        )}
        <Row>
          <Col
            xl={14}
            lg={14}
            md={14}
            sm={24}
            xs={24}
            className={styles.heading}
          >
            {heading}
          </Col>
          <Col xl={10} lg={10} md={10} sm={24} xs={24}>
            <Row>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={styles.date}
              >
                <CalendarOutlined />
                <span>{date}</span>
              </Col>
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={styles.comments}
              >
                <CommentOutlined />
                <span>Comments{comments}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl={24} lg={24} md={24} sm={24} xs={24} className={styles.title}>
            {title}
          </Col>
        </Row>
        <Row>
          <Col
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className={styles.description}
          >
            {description}
          </Col>
        </Row>
        <Row>
          <button className={styles.btn_text}>{btn_text}</button>
        </Row>
      </Col>
    </Row>
  );
}

export default BlogListCard;
