import { Breadcrumb, Card, Col, Empty, Row, Skeleton, Spin } from "antd";
import axios from "../../redux/axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductCard from "../../componentss/Cards/productCard/productcard";
import Loader from "../../componentss/Loader";
import styles from "./index.module.scss";
import BASE_URL from "../../constants/textUtility/textenv";

function PopulerProducts() {
  const router = useRouter();

  const [recommendedData, setRecommendedData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [totleCount, setTotleCount] = useState(0);

  useEffect(() => {
    setLoader(true);
    let popularProducts = `${BASE_URL}/store/api/v1/search-collections?search=Most%20Popular%20Products`;
    axios
      .get(popularProducts)
      .then((res) => {
        if (res?.data?.collections[0]?.id) {
          let url = `${BASE_URL}/store/cms/collections/${res?.data?.collections[0]?.id}?page=${page}&limit=8`;
          axios
            .get(url)
            .then((res) => {
              console.log("rrrrtttttt", res);
              setTotleCount(res?.data?.collections?.total);
              if (page == 1) {
                setRecommendedData(res?.data?.collections?.products);
              } else {
                setRecommendedData([
                  ...recommendedData,
                  ...res?.data?.collections?.products,
                ]);
              }
              setLoader(false);
            })
            .catch((err) => {
              console.log("rec err", err);
              setLoader(false);
            });
        }
      })
      .catch((err) => {
        console.log("rec id err", err);
        setLoader(false);
      });
  }, [page]);

  const viewMoreMobile = () => {
    setPage(page + 1);
  };

  const windowSlidesEndReach = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Head>
        <title>{`Populer Products`}</title>
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
              <b style={{ textTransform: "uppercase" }}>
                Most Popular Products
              </b>
            </div>
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
                        <ProductCard
                          data={item}
                          //   isLast={index === data?.length - 1}
                          //   newLimit={() => setPage(page + 1)}
                        />
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
              <div className={styles.mobile_see_all}>
                {totleCount > recommendedData?.length && (
                  <button
                    className={
                      loader
                        ? `${styles.load_spinner}`
                        : `${styles.view_more_btn}`
                    }
                    onClick={() => viewMoreMobile()}
                  >
                    {!loader ? "View More" : <Spin />}
                  </button>
                )}
              </div>
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default PopulerProducts;
