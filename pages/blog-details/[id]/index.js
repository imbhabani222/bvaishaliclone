import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import styles from "../index.module.scss";
import { CommentOutlined, CalendarOutlined } from "@ant-design/icons";
import Img1 from "../../../public/assets/blogs/blog1.png";
import Img2 from "../../../public/assets/blogs/blog2.png";
import Image from "next/image";
import { latestBlogData } from "../../../constants/JsonData/blogData";
import MobileAppBanner from "../../../componentss/HomeComponents/MobileAppBanner/mobileappbanner";
import Policys from "../../../componentss/Policys/policy";
const BlogDetails = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bread_crumb}>
          <Breadcrumb>
            <Breadcrumb.Item href=""></Breadcrumb.Item>
            <Breadcrumb.Item href="/">
              <span>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">Blog</Breadcrumb.Item>
            <Breadcrumb.Item>Blog Details</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row className={styles.blog_lists} gutter={[32, 32]}>
          <Col
            xl={16}
            lg={16}
            md={24}
            sm={24}
            xs={24}
            className={styles.blog_details_left_side}
          >
            <Row className={styles.title}>
              Digital Marketing Guide: A Creator’s Guide to Digital Marketing
              for Beginners
            </Row>
            <Row className={styles.heading_row}>
              <Col
                xl={14}
                lg={14}
                md={14}
                sm={24}
                xs={24}
                className={styles.heading}
              >
                Marketing
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
                    <span>25 June 2022</span>
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
                    <span>Comments{"(5)"}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={styles.img1}>
              <Image height={350} objectFit="fill" src={Img1} alt="" />
            </Row>
            <Row className={styles.para}>
              Digital marketing promotes and sells your products or services
              through digital platforms and online tools. From showcasing new
              products on Instagram Stories to raising awareness for networking
              events via a subscriber newsletter, digital marketing spans a
              variety of channels and formats. Your website, social media
              channels, display advertising, email program, influencer
              marketing, content marketing, and SEO combined will help you
              expand your reach, increase brand awareness and inspire potential
              customers to take action. It’s essential for business owners to
              develop a digital marketing strategy to connect with their
              audience and convert them into customers.
            </Row>
            <Row className={styles.highlighted_para}>
              It’s essential for business owners to develop a digital marketing
              strategy to connect with their audience and convert them into
              customers.
            </Row>
            <Row className={styles.h2}>
              A Creator’s Guide to Digital Marketing for Beginners
            </Row>
            <Row className={styles.para}>
              Digital marketing promotes and sells your products or services
              through digital platforms and online tools. From showcasing new
              products on Instagram Stories to raising awareness for networking
              events via a subscriber newsletter, digital marketing spans a
              variety of channels and formats. Your website, social media
              channels, display advertising, email program, influencer
              marketing, content marketing, and SEO combined will help you
              expand your reach, increase brand awareness and inspire potential
              customers to take action.
            </Row>
            <Row className={styles.img2}>
              <Image height={300} objectFit="fill" src={Img2} alt="" />
            </Row>
            <Row className={styles.h2}>
              A Creator’s Guide to Digital Marketing for Beginners
            </Row>
            <Row>
              {[1, 2, 3]?.map((item, index) => {
                return (
                  <div key={index} className={styles.guidens_points}>
                    <span className={styles.dot}>.</span>
                    <span className={styles.para}>
                      Digital marketing promotes and sells your products or
                      services through digital platforms and online tools. From
                      showcasing new products on Instagram Stories to raising
                      awareness for networking events via a subscriber
                      newsletter, digital marketing spans a variety of channels
                      and formats. Your website, social media channels, display
                      advertising, email program, influencer marketing, content
                      marketing, and SEO combined will help you expand your
                      reach, increase brand awareness and inspire potential
                      customers to take action.
                    </span>
                  </div>
                );
              })}
            </Row>
          </Col>
          <Col
            xl={8}
            lg={8}
            md={24}
            sm={24}
            xs={24}
            className={styles.blog_list_right_side}
          >
            <Row className={styles.latest_blogs_wrapper}>
              <Col>
                <div className={styles.heading}>Latest Blogs</div>
                {latestBlogData?.data?.map((item, index) => {
                  return (
                    <Row key={index} className={styles.latest_blog_card}>
                      <div className={styles.title}>{item?.title}</div>
                      <div className={styles.description}>
                        <div>{item?.description}</div>
                        <Image {...item?.img} alt="" />
                      </div>
                    </Row>
                  );
                })}
              </Col>
            </Row>
            <Row className={styles.blog_categories_wrapper}>
              <Col
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className={styles.heading}
              >
                Blog Categories
              </Col>
              {["Marketing", "Technology", "Mobile App", "eCommerce"]?.map(
                (item, index) => {
                  return (
                    <Col
                      xl={24}
                      lg={24}
                      md={24}
                      sm={24}
                      xs={24}
                      key={index}
                      className={styles.text}
                    >
                      {item}
                    </Col>
                  );
                }
              )}
            </Row>
            <Row className={styles.blog_tags_wrapper} gutter={[0, 20]}>
              <Col
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className={styles.heading}
              >
                Blog Tags
              </Col>
              <div className={styles.blog_tag_wrapper}>
                {[
                  "Creative",
                  "Themes",
                  "Shopping",
                  "eCommerce",
                  "Delivery",
                  "Dukan",
                  "Cart",
                  "Online Shop/Store",
                ]?.map((item, index) => {
                  return (
                    <div key={index} className={styles.blog_tag}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </Row>
          </Col>
        </Row>
      </div>

      {/* <MobileAppBanner />
      <Policys /> */}
    </>
  );
};

export default BlogDetails;
