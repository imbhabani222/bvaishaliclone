import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import styles from "./index.module.scss";
import { BlogData, latestBlogData } from "../../constants/JsonData/blogData";
import BlogListCard from "../../componentss/Cards/bloglistCard/bloglistcard";
import Image from "next/image";
import Policys from "../../componentss/Policys/policy";
import MobileAppBanner from "../../componentss/HomeComponents/MobileAppBanner/mobileappbanner";
const Blogs = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.bread_crumb}>
          <Breadcrumb>
            <Breadcrumb.Item href=""></Breadcrumb.Item>
            <Breadcrumb.Item href="/">
              <span>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Row className={styles.blog_lists} gutter={[32, 32]}>
          <Col
            xl={16}
            lg={16}
            md={24}
            sm={24}
            xs={24}
            className={styles.bloglist_card_wrapper}
          >
            {BlogData?.data?.map((item, index) => {
              return <BlogListCard key={index} data={item} />;
            })}
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

export default Blogs;
