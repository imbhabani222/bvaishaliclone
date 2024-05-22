import { Breadcrumb, Card, Col, Empty, Row, Skeleton, Spin } from "antd";
import axios from "../../redux/axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductCard from "../../componentss/Cards/productCard/productcard";
import Loader from "../../componentss/Loader";
import styles from "./index.module.scss";
import BASE_URL from "../../constants/textUtility/textenv";

function RecentProducts() {
  const router = useRouter();

  const [recommendedData, setRecommendedData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [totleCount, setTotleCount] = useState(0);

  useEffect(() => {
    let url = `${BASE_URL}/store/cms/products/recent?page=${1}&limit=${10}`;
    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        console.log("reds", res?.data?.products);
        setRecommendedData(res?.data?.products);
        setLoader(false);
      })
      .catch((err) => {
        console.log("errrd", err);
        setLoader(false);
      });
  }, []);

  const viewMoreMobile = () => {
    setPage(page + 1);
  };

  const windowSlidesEndReach = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>{`Recent Products`}</title>
      </Head>

      <div className={styles.container}>
        {loader && recommendedData?.length === 0 ? (
          <Row gutter={[12, 12]}>
            {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item, index) => {
              return (
                <Col key={index} xl={6} lg={6} md={6} sm={12} xs={12}>
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
        ) : (
          <>
            <div className={styles.header}>
              <b style={{ textTransform: "uppercase" }}>Recent Products</b>
            </div>
            {console.log("recommendedData", recommendedData)}
            <Row gutter={[12, 12]}>
              {recommendedData?.length > 0 ? (
                recommendedData
                  ?.filter((it) => it?.isActive)
                  ?.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        xs={12}
                        sm={12}
                        xl={6}
                        lg={6}
                        md={6}
                        xxl={4}
                      >
                        <ProductCard data={item} />
                      </Col>
                    );
                  })
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Empty description={<div>No Data Found</div>} />
                </div>
              )}
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default RecentProducts;
