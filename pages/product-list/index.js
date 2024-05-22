import {
  Card,
  Col,
  Row,
  Breadcrumb,
  Tree,
  Divider,
  Checkbox,
  Select,
  Drawer,
  Empty,
  Spin,
  Skeleton,
} from "antd";
import s from "./index.module.scss";
import {
  CloseCircleOutlined,
  CloseOutlined,
  DownOutlined,
  FilterOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import ProductCard from "../../componentss/Cards/productCard/productcard";
import PlaceholderImg from "../../public/assets/productCardImg/product-img-ph.jpg";
import axios from "../../redux/axios";
import { useRouter } from "next/router";
import Loader from "../../componentss/Loader";
import Head from "next/head";
import BASE_URL from "../../constants/textUtility/textenv";
import getWindowDimensions from "../../componentss/getWidthh";
import CardSkeleton from "../../componentss/Skeleton";
import Image from "next/image";
const ProductList = () => {
  const router = useRouter();
  let isCategoriId = router?.query?.cat
    ? typeof router?.query?.cat === "string"
      ? router?.query?.cat
      : router?.query?.cat[0]
    : undefined;
  let isCategoriIdTrue = isCategoriId || "";
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [flatCategories, setFlatCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const [filters, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [catLoader, setCatLoader] = useState(true);
  const [selectedVar, setSelectedVar] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState();
  const [selectedPriceRange, setSelectedPriceRange] = useState();
  const [selectedDiscountRange, setSelectedDiscountRange] = useState();
  const [priceOrder, setPriceOrder] = useState("a");
  const [page, setPage] = useState(0);
  const [perPage, setPerPageItems] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const [windowWidth, setWindowWidth] = useState(getWindowDimensions());
  let priceVal = ["Under 250", "251-500", "501-1000", "Above 1000"];
  let discountVal = ["Upto 20%", "21-40%", "41-60%", "61-80%", "More than 80%"];

  useEffect(() => {
    if (page !== 0) {
      getProducts();
    }
  }, [page]);

  useEffect(() => {
    getCategories();
  }, []);

  // useEffect(() => {
  //   getProducts(categoryData?.find(({ slug }) => slug === isCategoriIdTrue)?.id ??
  //   false,
  // selectedVar,
  // selectedPriceRange,
  // selectedDiscountRange,
  // priceOrder,
  // true);
  // }, []);

  console.log(categoryData, "Category data");

  useEffect(() => {
    if (categoryData.length !== 0) {
      setPage(0);
      setSelectedCatId(
        categoryData?.find(({ slug }) => slug === isCategoriIdTrue)?.id
      );
      setProductData([]);
      setFilterData([]);
      getProducts(
        flatCategories?.find(({ slug }) => slug === isCategoriIdTrue)?.id ??
          false,
        selectedVar,
        selectedPriceRange,
        selectedDiscountRange,
        priceOrder,
        true
      );
    }
  }, [categoryData, isCategoriIdTrue, flatCategories]);

  const onSelect = async (selectedKeys, info, a, b) => {
    router.query.cat = selectedKeys?.length !== 0 ? selectedKeys : false;
    router.push(router);
    setPage(0);
    setProductData([]);
    setFilterData([]);
    setSelectedCategorie(info?.selectedNodes?.map((i) => i.displayName));
    setSelectedCatId(selectedKeys[0]);
    if (categoryData.length === 0) {
      getProducts(
        categoryData?.find(({ slug }) => slug === isCategoriIdTrue)?.id ??
          false,
        selectedVar,
        selectedPriceRange,
        selectedDiscountRange,
        priceOrder,
        true
      );
    }
  };

  const sortOnChange = (value) => {
    if (value == "highToLow") {
      setPriceOrder("d");
      setPage(0);
      setProductData([]);
      setFilterData([]);

      getProducts(
        selectedCatId
          ? flatCategories?.find(({ slug }) => slug === isCategoriIdTrue)?.id
          : false,
        selectedVar,
        selectedPriceRange,
        selectedDiscountRange,
        "d",
        true
      );
    } else if (value == "lowToHigh") {
      setPriceOrder("a");
      setPage(0);
      setProductData([]);
      setFilterData([]);

      getProducts(
        selectedCatId
          ? flatCategories?.find(({ slug }) => slug === isCategoriIdTrue)?.id
          : false,
        selectedVar,
        selectedPriceRange,
        selectedDiscountRange,
        "a",
        true
      );
    } else {
      setPriceOrder("disc");
      setPage(0);
      setProductData([]);
      setFilterData([]);

      getProducts(
        selectedCatId
          ? flatCategories?.find(({ slug }) => slug === isCategoriIdTrue)?.id
          : false,
        selectedVar,
        selectedPriceRange,
        selectedDiscountRange,
        "disc",
        true
      );
    }
  };

  const onChangeF = (e) => {
    setSelectedVar(e);
    setPage(0);
    setProductData([]);
    setFilterData([]);
    getProducts(
      selectedCatId
        ? flatCategories?.find(({ slug }) => slug === isCategoriIdTrue)?.id
        : false,
      e,
      selectedPriceRange,
      selectedDiscountRange,
      priceOrder
    );
  };

  const getProducts = useCallback(
    (
      catId = selectedCatId ?? isCategoriIdTrue ?? false,
      varSelected = selectedVar,
      price = selectedPriceRange,
      discount = selectedDiscountRange,
      po = priceOrder,
      clearProducts = false
    ) => {
      const foundCat =
        flatCategories?.find(({ slug }) => slug === catId) ||
        flatCategories?.find(({ id }) => id === catId);
      setSelectedCategorie(foundCat?.displayName);

      let priceRange = [];
      if (price?.length > 0) {
        for (let i = 0; i < price.length; i++) {
          if (price[i] === "Under 250") {
            priceRange.push("0-250");
          } else if (price[i] === "Above 1000") {
            priceRange.push("1001-900000");
          } else {
            priceRange.push(price[i]);
          }
        }
      }

      let discountRange = [];
      if (discount?.length > 0) {
        for (let i = 0; i < discount.length; i++) {
          if (discount[i] === "Upto 20%") {
            discountRange.push("0-20");
          } else if (discount[i] === "21-40%") {
            discountRange.push("21-40");
          } else if (discount[i] === "41-60%") {
            discountRange.push("41-60");
          } else if (discount[i] === "61-80%") {
            discountRange.push("61-80");
          } else {
            discountRange.push("81-100");
          }
        }
      }
      setLoader(true);
      let url = `${BASE_URL}/store/cms/products?offset=${
        clearProducts ? 0 : page * perPage
      }&limit=${perPage}${catId ? "&c=" + foundCat?.id : ""}${
        varSelected?.length > 0 ? `${"&v="}` + varSelected : ""
      }${priceRange?.length > 0 ? "&p=" + priceRange : ""}${
        discountRange?.length > 0 ? "&d=" + discountRange : ""
      }${po?.length > 0 ? "&po=" + po : ""}`;
      axios
        .get(url?.replace(/,/g, "|"))
        .then((res) => {
          clearProducts
            ? setProductData(res?.data?.products)
            : setProductData([...productData, ...res?.data?.products]);
          setTotalCount(res?.data?.totalCount);
          let result = res?.data?.products.filter((item) => item?.hasOptions);
          let fil = result?.map((item) => item?.option);
          const allOptions = {};
          res?.data?.products?.forEach((product) => {
            if (product?.hasOptions) {
              product?.options?.forEach(({ option, values }) => {
                if (allOptions[option]) {
                  allOptions[option] = [
                    ...new Set([...values, ...allOptions[option]]),
                  ];
                } else {
                  allOptions[option] = values;
                }
              });
            }
          });
          if (!varSelected) {
            setFilterData([
              ...filters,
              ...Object.keys(allOptions).map((i) => ({
                name: i,
                values: allOptions[i],
              })),
            ]);
          }

          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    },
    [page, isCategoriIdTrue, categoryData, productData]
  );

  const getCategories = () => {
    setCatLoader(true);
    let url = `${BASE_URL}/store/cms/categories`;
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.categories?.length > 0) {
          console.log(res?.data?.categories);
          const catData = res?.data?.categories?.map((e) => {
            return {
              ...e,
              subCategories: [],
            };
          });

          setCategoryData(catData);
        } else {
          getProducts();
        }
        setFlatCategories(res?.data?.categoriesFlat);
        let isCategeryView = res?.data?.categories?.filter(
          (item) => item?.id === isCategoriIdTrue
        );
        setSelectedCategorie(
          isCategeryView?.length > 0 ? isCategeryView[0]?.displayName : ""
        );
        setCatLoader(false);
      })
      .catch((err) => {
        setCatLoader(false);
      });
  };

  const onClose = () => {
    setOpen(false);
  };

  const onPriceChange = (e) => {
    setSelectedPriceRange(e);
    setPage(0);
    setProductData([]);
    setFilterData([]);
    getProducts(
      selectedCatId ?? isCategoriIdTrue ?? false,
      selectedVar,
      e,
      selectedDiscountRange,
      priceOrder,
      true
    );
  };

  const onDiscountChange = (e) => {
    setSelectedDiscountRange(e);
    setPage(0);
    setProductData([]);
    setFilterData([]);
    getProducts(
      selectedCatId ?? isCategoriIdTrue ?? false,
      selectedVar,
      selectedPriceRange,
      e,
      priceOrder,
      true
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if ("scrollRestoration" in window.history) {
  //     window.history.scrollRestoration = "manual";
  //   }
  //   const handleRouteChange = () => {
  //     sessionStorage.setItem("scrollPosition", window.pageYOffset.toString());
  //   };
  //   router.events.on("routeChangeStart", handleRouteChange);
  //   const scrollPosition =
  //     parseInt(sessionStorage.getItem("scrollPosition")) || 0;
  //   window.scrollTo(0, scrollPosition);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>
          {`${selectedCategorie || "All products"}
          ${selectedPriceRange && selectedPriceRange != 0 ? "price:" : ""} ${
            selectedPriceRange?.join("|") || ""
          } 
          ${
            selectedDiscountRange && selectedDiscountRange != 0
              ? "discount:"
              : ""
          } ${selectedDiscountRange?.join("|") || ""}`}
        </title>
      </Head>
      <div className={s.black_header}>
        {selectedCategorie && selectedCategorie}
      </div>
      <div className={s.container}>
        <div
          className={s.breadcrumb}
          style={{ padding: "0px 15px", marginTop: "20px" }}
        >
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <span className={s.home_bread_crumb}>Home</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item className={s.breadcrumb_cat}>
              {selectedCategorie && selectedCategorie}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row gutter={16} style={{ marginBottom: "10px" }}>
          <Col
            className={s.filter_wrapper_mobile}
            xl={0}
            lg={0}
            md={24}
            sm={24}
            xs={24}
          >
            <button
              onClick={() => setOpen(true)}
              className={s.filter_mobile_btn}
            >
              <FilterOutlined />
              &nbsp; Filter
            </button>
            <div className={s.price_filter_mobile}>
              <Select
                defaultValue="Price (Low to high)"
                style={{
                  width: "180px",
                  fontFamily: "Josefin Sans",
                }}
                onChange={sortOnChange}
                options={[
                  {
                    value: "lowToHigh",
                    label: "Price (Low to high)",
                  },
                  {
                    value: "highToLow",
                    label: "Price (High to low)",
                  },
                  {
                    value: "discount",
                    label: "Discount",
                  },
                ]}
              />
            </div>
          </Col>
          <Drawer
            title={
              <div className={s.mobile_drawer_header}>
                <h3 style={{ color: "white" }}>
                  {windowWidth > 700 ? "Category Filters" : "Product Filters"}
                </h3>{" "}
                <div
                  className={s.mobile_drawer_header_close}
                  onClick={() => onClose()}
                >
                  <CloseCircleOutlined
                    color="white"
                    style={{ fontSize: 24, color: "white", cursor: "pointer" }}
                  />
                </div>
              </div>
            }
            placement={"left"}
            width={"20%"}
            height={"100vh"}
            onClose={onClose}
            closable={false}
            open={open}
            closeIcon={
              <CloseOutlined style={{ fontSize: 24, color: "#fff" }} />
            }
          >
            <Card bordered={false}>
              {/* <p>Category Filters</p> */}
              <Tree
                style={{
                  textTransform: "capitalize",
                  // fontWeight: 500,
                  fontSize: "16px",
                }}
                showLine
                defaultSelectedKeys={[isCategoriIdTrue]}
                switcherIcon={<DownOutlined />}
                defaultExpandAll={true}
                onSelect={onSelect}
                fieldNames={{
                  title: "displayName",
                  key: "slug",
                  children: "subCategories",
                }}
                treeData={[
                  {
                    displayName: "All",
                    id: false,
                    isActive: true,
                    slug: false,
                  },
                  ...categoryData,
                ]?.filter((item) => item?.isActive)}
              />
              <Divider />
              {filters.map(({ name, values }) => (
                <>
                  <div>
                    <Row className={s.p_b2}>
                      <Col span={12}>{name}</Col>
                      <Col
                        span={12}
                        style={{
                          textAlign: "right",
                          color: "#333333",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedVar([]);
                          setPage(0);
                          setProductData([]);
                          setFilterData([]);

                          getProducts(
                            selectedCatId ?? isCategoriIdTrue ?? false,
                            selectedVar,
                            selectedPriceRange,
                            selectedDiscountRange,
                            priceOrder
                          );
                        }}
                      >
                        Clear All
                      </Col>
                    </Row>
                    <div>
                      <Checkbox.Group
                        style={{
                          width: "100%",
                          color: "red",
                        }}
                        options={values}
                        onChange={onChangeF}
                        value={selectedVar}
                      />
                    </div>
                  </div>
                </>
              ))}
              <Divider />
              <div>
                <Row className={s.p_b2}>
                  <Col
                    span={12}
                    style={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    Price
                  </Col>
                  <Col
                    span={12}
                    style={{
                      textAlign: "right",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedPriceRange([]);
                      setPage(0);
                      setProductData([]);
                      setFilterData([]);

                      getProducts(
                        selectedCatId ?? isCategoriIdTrue ?? false,
                        selectedVar,
                        false,
                        selectedDiscountRange,
                        priceOrder
                      );
                    }}
                  >
                    Clear All
                  </Col>
                </Row>

                <div>
                  <Checkbox.Group
                    style={{
                      width: "100%",
                    }}
                    options={priceVal}
                    onChange={(e) => onPriceChange(e)}
                    value={selectedPriceRange}
                  />
                </div>
              </div>
              <Divider />
              <div>
                <Row className={s.p_b2}>
                  <Col
                    span={12}
                    style={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    Discount
                  </Col>
                  <Col
                    span={12}
                    style={{
                      textAlign: "right",
                      color: "#333333",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedDiscountRange([]);
                      setPage(0);
                      setProductData([]);
                      setFilterData([]);

                      getProducts(
                        selectedCatId ?? isCategoriIdTrue ?? false,
                        selectedVar,
                        selectedPriceRange,
                        false,
                        priceOrder
                      );
                      // setSelectedVar([]);
                    }}
                  >
                    Clear All
                  </Col>
                </Row>

                <Checkbox.Group
                  style={{
                    width: "100%",
                  }}
                  options={discountVal}
                  onChange={(e) => onDiscountChange(e)}
                  value={selectedDiscountRange}
                />
              </div>
            </Card>
          </Drawer>
          {/* <Col
              className={s.filter_wrapper}
              xl={5}
              lg={5}
              md={24}
              sm={24}
              xs={24}
            >
              {catLoader ? (
                <Skeleton active paragraph={{ rows: 15 }} />
              ) : (
                <Card style={{ border: "1px solid #E2E2E2" }}>
                  <p style={{ fontWeight: "bold" }}>Category Filters</p>
                  <Tree
                    defaultSelectedKeys={[isCategoriIdTrue]}
                    expandIcon={({ isLeaf, expanded }) =>
                      expanded ? <MinusOutlined /> : <PlusOutlined />
                    }
                    collapseIcon={({ isLeaf, expanded }) =>
                      expanded ? <MinusOutlined /> : <PlusOutlined />
                    }
                    defaultExpandAll={true}
                    onSelect={onSelect}
                    fieldNames={{
                      title: "displayName",
                      key: "slug",
                      children: "subCategories",
                    }}
                    treeData={[
                      {
                        // createdAt: "2023-04-06T13:27:13.591Z",
                        // description: " ",
                        displayName: "All",
                        id: false,
                        isActive: true,
                        // isPublished: false,
                        // media: null,
                        // mediaData: null,
                        // parentCategory: null,
                        // products: 3,
                        slug: false,
                        // storeId: "45d069b3-ffb7-04c6-b8cc-994f49bd3b73",
                        // subCategories: [],
                        // updatedAt: "2023-04-06T13:27:13.591Z",
                      },
                      ...categoryData,
                    ]?.filter((item) => item?.isActive)}
                  />
                  <Divider />
                  {filters
                    ?.filter(
                      (item, index, array) =>
                        array?.findIndex(
                          (t) =>
                            t?.name?.toLowerCase() === item?.name?.toLowerCase()
                        ) == index
                    )
                    .map(({ name, values }) => (
                      <>
                        <div>
                          <Row className={s.p_b2}>
                            <Col
                              span={12}
                              style={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                              }}
                            >
                              {name}
                            </Col>
                            <Col
                              span={12}
                              style={{
                                textAlign: "right",
                                color: "#01C0CC",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setSelectedVar([]);
                                setPage(0);
                                setProductData([]);
                                setFilterData([]);

                                getProducts(
                                  selectedCatId ?? isCategoriIdTrue ?? false,
                                  false,
                                  selectedPriceRange,
                                  selectedDiscountRange,
                                  priceOrder
                                );
                              }}
                            >
                              Clear All
                            </Col>
                          </Row>
                          <div>
                            <Checkbox.Group
                              style={{
                                width: "100%",
                              }}
                              options={values}
                              onChange={onChangeF}
                              value={selectedVar}
                            />
                          </div>
                        </div>
                        <Divider />
                      </>
                    ))}
                  <div>
                    <Row className={s.p_b2}>
                      <Col
                        span={12}
                        style={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        Price
                      </Col>
                      <Col
                        span={12}
                        style={{
                          textAlign: "right",
                          color: "#01C0CC",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedPriceRange([]);
                          setPage(0);
                          setProductData([]);
                          setFilterData([]);

                          getProducts(
                            selectedCatId ?? isCategoriIdTrue ?? false,
                            selectedVar,
                            false,
                            selectedDiscountRange,
                            priceOrder
                          );
                        }}
                      >
                        Clear All
                      </Col>
                    </Row>

                    <div>
                      <Checkbox.Group
                        style={{
                          width: "100%",
                        }}
                        options={priceVal}
                        onChange={(e) => onPriceChange(e)}
                        value={selectedPriceRange}
                      />
                    </div>
                  </div>
                  <Divider />
                  <div>
                    <Row className={s.p_b2}>
                      <Col
                        span={12}
                        style={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        Discount
                      </Col>
                      <Col
                        span={12}
                        style={{
                          textAlign: "right",
                          color: "#01C0CC",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSelectedDiscountRange([]);
                          setPage(0);
                          setProductData([]);
                          setFilterData([]);

                          getProducts(
                            selectedCatId ?? isCategoriIdTrue ?? false,
                            selectedVar,
                            selectedPriceRange,
                            false,
                            priceOrder
                          );
                          // setSelectedVar([]);
                        }}
                      >
                        Clear All
                      </Col>
                    </Row>

                    <Checkbox.Group
                      style={{
                        width: "100%",
                      }}
                      options={discountVal}
                      onChange={(e) => onDiscountChange(e)}
                      value={selectedDiscountRange}
                    />
                  </div>
                </Card>
              )}
            </Col> */}
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className={s.cards_wrapper}>
              {((productData && productData.length === 0) || !productData) &&
              loader ? (
                <Row gutter={[12, 12]}>
                  {[1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((item, index) => {
                    return (
                      <Col
                        key={index}
                        // xl={windowWidth >= 1400 ? 6 : 12}
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        xxl={12}
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
              ) : (
                <Row gutter={[12, 12]}>
                  {productData?.length > 0 ? (
                    productData
                      ?.filter((it) => it?.isActive)
                      ?.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            // xl={windowWidth >= 1400 ? 6 : 12}
                            xl={6}
                            lg={6}
                            md={6}
                            sm={12}
                            xs={24}
                            xxl={6}
                          >
                            <ProductCard
                              data={item}
                              isLast={index === productData?.length - 1}
                              newLimit={() => {
                                setPage(page + 1);
                              }}
                              showingLength={
                                productData?.filter((item) => item?.isActive)
                                  ?.length
                              }
                              totalCount={totalCount}
                            />
                            {/* ddf */}
                          </Col>
                        );
                      })
                  ) : (
                    <div
                      style={{
                        height: "30vh",
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 30,
                        fontWeight: 500,
                        opacity: 0.5,
                      }}
                    >
                      <Empty description={<h2>No Data..</h2>} />
                    </div>
                  )}
                  {loader && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Spin />
                    </div>
                  )}
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductList;
