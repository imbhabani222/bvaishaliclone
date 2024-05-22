import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Image,
  Row,
  Skeleton,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import EmptyHeart from "../../public/empty-heart.svg";
import WhishListCard from "../../componentss/Cards/whishListCard/whishlistcard";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import getWindowDimensions from "../../componentss/getWidthh";
import Link from "next/link";

const WhishList = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");

  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());

  let whishListData = useSelector(
    (state) => state?.fetchProductFromWishlist || null
  );

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_PRODUCT_FROM_WISHLIST", productId: id });
  };

  useEffect(() => {
    if (JWT?.length > 0) {
      dispatch({ type: "FETCH_PRODUCTS_FROM_WISHLIST" });
    }
  }, [JWT, dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Row className={styles.bread_crumb}>
        <Breadcrumb>
          <Breadcrumb.Item href=""></Breadcrumb.Item>
          <Breadcrumb.Item href="/">
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Wishlist</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Divider />
      {!whishListData?.fetching ? (
        <>
          <Row>
            <Col className={styles.whishlist_heading}>
              Wishlist
              <small className={styles.whishlist_number}>
                {`(${whishListData?.result?.length ?? 0})`}
              </small>
            </Col>
          </Row>
          {whishListData?.result?.length > 0 ? (
            <Row gutter={[12, 12]} className={styles.whishlist_card_wrapper}>
              {whishListData?.result?.map((item, index) => {
                return (
                  <Col sm={12} xs={12} md={24} lg={24} xl={24} key={index}>
                    <WhishListCard data={item} onRemove={handleRemove} />
                  </Col>
                );
              })}
              <Row></Row>
            </Row>
          ) : (
            <div className={styles.page_container}>
              <div className={styles.empty_container}>
                <Image
                  {...EmptyHeart}
                  alt="No Data"
                  height={30}
                  width={30}
                  preview={false}
                />
                <h4>Your Wishlist is empty</h4>
                <h5>You haven’t Saved anything yet.</h5>
                <Link href={"/"}>
                  <Button className={styles.emp_btn}>START EXPLORE</Button>
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <Row gutter={[12, 12]} style={{ marginTop: 20 }}>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item, index) => {
            return (
              <Col
                key={index}
                xl={windowWidth >= 1400 ? 6 : 8}
                lg={8}
                md={8}
                sm={12}
                xs={12}
              >
                <Card>
                  <div style={{ padding: "16px 6px 6px 6px" }}>
                    <Skeleton active paragraph={{ rows: 2 }} />
                    <Skeleton.Button
                      style={{ width: 100, marginTop: "16px" }}
                    />
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default WhishList;
