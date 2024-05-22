import { Breadcrumb, Card, Col, Empty, Row, Skeleton } from "antd";
import axios from "../../redux/axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductCard from "../../componentss/Cards/productCard/productcard";
import Loader from "../../componentss/Loader";
import styles from "./index.module.scss";
import BASE_URL from "../../constants/textUtility/textenv";
function SearchProducts() {
  const router = useRouter();
  let searchParam = router?.asPath?.split("=")?.at(-1);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const [page, setPage] = useState(0);
  const [perPage, setPerPageItems] = useState(10);

  useEffect(() => {
    let url = `${BASE_URL}/store/cms/products?offset=${
      page * perPage
    }&limit=${perPage}&search=${searchParam}`;
    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        setData([...data, ...res?.data?.products]);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [page]);

  useEffect(() => {
    setData([]);
    let url = `${BASE_URL}/store/cms/products?offset=${
      searchParam ? 0 : page * perPage
    }&limit=${perPage}&search=${searchParam}`;
    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        setData(res?.data?.products);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [searchParam]);

  return (
    <>
      <Head>
        <title>{`search results for ${searchParam?.replace(
          /%20/g,
          " "
        )}`}</title>
      </Head>

      <div className={styles.container}>
        {loader && data.length === 0 ? (
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
              Showing <b>{data?.length}</b> Results For{" "}
              <b style={{ textTransform: "uppercase" }}>
                {searchParam?.replace(/%20/g, " ")}
              </b>
            </div>
            <Row gutter={[12, 12]}>
              {data?.length > 0 ? (
                data
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
                          isLast={index === data?.length - 1}
                          newLimit={() => setPage(page + 1)}
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
                  <Empty
                    description={
                      <div>
                        No Data Found for{" "}
                        <b style={{ textTransform: "uppercase" }}>
                          {searchParam?.replace(/%20/g, " ")}
                        </b>
                      </div>
                    }
                  />
                </div>
              )}
              {loader && <Loader text="Loading" />}
            </Row>
          </>
        )}
      </div>
    </>
  );
}

export default SearchProducts;
