import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import styles from "./index.module.scss";
import CategoriesCard from "../../componentss/Cards/categoryCard/categorycard";
import { useSelector } from "react-redux";
import Loader from "../../componentss/Loader";
import AllImg from "../../public/all-cats.png";

const AllCategories = () => {
  let allCategoriesData = useSelector((state) => state?.allCategories || []);

  if (allCategoriesData?.fetching) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bread_crumb}>
          <Breadcrumb>
            <Breadcrumb.Item href=""></Breadcrumb.Item>
            <Breadcrumb.Item href="/">
              <span className={styles.home_bread_crumb}>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>All Categories</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.page_heading}>All Categories</div>
        {(allCategoriesData?.result?.categories?.length > 0 ||
          allCategoriesData?.result?.categories?.length == 0) && (
          <Row gutter={[12, 12]}>
            {[
              {
                displayName: "All",
                isActive: true,
                mediaData: {
                  url: AllImg,
                  alt: "",
                },
              },
              ...allCategoriesData?.result?.categories,
            ]
              ?.filter((item) => item?.isActive)
              ?.map((item, index) => {
                return (
                  <Col xl={4} lg={4} md={6} sm={8} xs={8} key={index}>
                    <CategoriesCard data={item} />
                  </Col>
                );
              })}
          </Row>
        )}
      </div>
    </>
  );
};

export default AllCategories;
