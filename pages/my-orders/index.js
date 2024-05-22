import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Drawer,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import MyAccountMenu from "../../componentss/MyacoountMenu/myaccountmenu";
import styles from "./index.module.scss";
import Img from "../../public/assets/productCardImg/product-img-ph.jpg";
import Image from "next/image";
import FilterIcon from "../../public/assets/myAccount/filter-icon.svg";
import NoOrders from "../../public/notfound/NoOrders.svg";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import Cookies from "universal-cookie";
import BASE_URL from "../../constants/textUtility/textenv";

const MyOrders = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [loader, setLoader] = useState(true);
  const [ordersData, setOrdersData] = useState([]);
  const [breadcrumbData, setBreadCrumbData] = useState([
    { title: "Homepage", route: "/" },
    { title: "My Account", route: "/my-account" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusVal, setStatusVal] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChangeBySatatus = (e) => {
    setStatusVal(e);
  };
  const handleChangeByTime = (e) => {
    setTimeFilter(e);
  };

  const clearFilter = () => {
    setStatusVal("All");
    setTimeFilter("All");
    setIsModalOpen(false);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoader(true);
    let url = `${BASE_URL}/store/api/v1/orders/my-orders?status=${
      statusVal === "All"
        ? ""
        : statusVal === "CANCELLEDBYCONSUMER" ||
          statusVal === "CANCELLED_BY_SHIPPER"
        ? "CANCELLED"
        : statusVal
    }&d=${timeFilter === "All" ? "" : timeFilter}&from=0&limit=200`;
    let JWT = cookies?.get("accessToken");
    axios
      .get(url, { headers: { Authorization: `Bearer ${JWT}` } })
      .then((res) => {
        setOrdersData(res?.data?.orders);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [statusVal, timeFilter]);
  return (
    <div className={styles.main_container}>
      <div className={styles.breadcrumb_wrapper}>
        <Breadcrumb>
          <Breadcrumb.Item href=""></Breadcrumb.Item>
          {breadcrumbData?.map(({ title, route }, index) => (
            <Breadcrumb.Item
              key={index}
              onClick={() => router.push(`${route}`)}
            >
              <span className={styles.home_bread_crumb}>{title}</span>
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>My Order</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <div className={styles.drawer_mobile_show}>
        <Button onClick={showDrawer}>ACTIVITY</Button>
      </div> */}
      <div className={styles.container}>
        <Row gutter={[32, 0]}>
          <Col
            xl={4}
            lg={4}
            md={24}
            sm={24}
            xs={24}
            className={styles.menu_items}
          >
            <div className={styles.mobile_menu}>
              <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                open={open}
                width={"80%"}
              >
                <MyAccountMenu />
              </Drawer>
            </div>
            <div className={styles.desktop_menu}>
              <MyAccountMenu />
            </div>
          </Col>
          {loader ? (
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              xl={18}
              lg={18}
              md={24}
              sm={24}
              xs={24}
            >
              <Spin></Spin>
            </Col>
          ) : (
            <Col
              xl={20}
              lg={20}
              md={24}
              sm={24}
              xs={24}
              className={styles.menu}
              style={{ padding: 0 }}
            >
              <Row className={styles.top_row}>
                <Col
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles.page_title}
                >
                  My Order
                </Col>
                <Col
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles.filter_wrapper}
                >
                  <Button
                    className={styles.filter_btn}
                    onClick={() => showModal()}
                  >
                    <FilterOutlined style={{ color: " #7C8092" }} />
                    {/* <Image {...FilterIcon} alt="" /> */}
                  </Button>
                </Col>
              </Row>
              {ordersData?.length > 0 ? (
                ordersData
                  ?.filter((item) => item?.orderStatus !== "ORDER_PREINITIATED")
                  ?.map((item, index) => {
                    const mediaUrl = item?.products
                      ?.at(0)
                      ?.products?.at(0)
                      ?.productDetails?.media?.at(0)?.url;
                    const productName = item?.products
                      ?.at(0)
                      ?.products?.at(0)?.productName;
                    return (
                      <Row
                        onClick={() =>
                          router.push(`/order-details/${item?.id}`)
                        }
                        key={index}
                        className={styles.order_card_wrapper}
                      >
                        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                          <Row
                            gutter={[32, 32]}
                            className={styles.order_card_top_row}
                          >
                            <Col xl={20} lg={20} md={20} sm={15} xs={15}>
                              <div className={styles.order_id_text}>
                                Order Number : {item?.orderId}
                              </div>
                              <div className={styles.order_date}>
                                Order Date :{" "}
                                {moment(item?.createdAt).format("LL")}
                              </div>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={9} xs={9}>
                              <div
                                style={
                                  item?.orderStatus === "PLACED"
                                    ? { backgroundColor: "#9676EF" }
                                    : item?.orderStatus === "DELIVERED"
                                    ? { backgroundColor: "#3BB77E" }
                                    : item?.orderStatus === "CANCELLED" ||
                                      item?.orderStatus ==
                                        "CANCELLED_BY_SHIPPER" ||
                                      item?.orderStatus == "CANCELLEDBYCONSUMER"
                                    ? { backgroundColor: "#F63535" }
                                    : item?.orderStatus === "OUTFORDELIVERY"
                                    ? { backgroundColor: "#F4B30C" }
                                    : item?.orderStatus === "REPLACE"
                                    ? { backgroundColor: "#2A4C86" }
                                    : { backgroundColor: "#01C0CC" }
                                }
                                className={styles.order_status}
                              >
                                {item?.orderStatus == "CANCELLEDBYCONSUMER" ||
                                item?.orderStatus === "CANCELLED_BY_SHIPPER"
                                  ? "CANCELED"
                                  : item?.orderStatus}
                              </div>
                            </Col>
                          </Row>
                          <Divider />
                          <Row className={styles.order_details_wrapper}>
                            <Col
                              xl={3}
                              lg={3}
                              md={3}
                              sm={4}
                              xs={4}
                              className={styles.order_img_wrapper}
                            >
                              {/* <Image src={Img} alt="" objectFit="contain" /> */}
                              <Image
                                src={mediaUrl ?? Img}
                                height={50}
                                width={100}
                                alt=""
                                objectFit="contain"
                              />
                            </Col>
                            <Col
                              xl={21}
                              lg={21}
                              md={21}
                              sm={20}
                              xs={20}
                              style={{ paddingLeft: "2%" }}
                            >
                              <div>
                                {productName?.split("|")?.map((i, index) => (
                                  <Row
                                    style={
                                      productName?.split("|")?.length === 1
                                        ? {
                                            // fontWeight: "500",
                                            // fontSize: "14px",
                                            color: "#253d4e",
                                            wordBreak: "break-all",
                                          }
                                        : {
                                            wordBreak: "break-all",
                                          }
                                    }
                                    className={
                                      index + 1 !==
                                        productName?.split("|")?.length ||
                                      productName?.split("|")?.length === 1
                                        ? styles.card_title
                                        : styles.card_title_s_line
                                    }
                                    key={index}
                                  >
                                    {i}
                                  </Row>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    );
                  })
              ) : (
                <div
                  style={{
                    display: "flex",
                    height: "20vh",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "22px",
                    opacity: 0.6,
                  }}
                >
                  <Image {...NoOrders} alt="" />
                </div>
              )}
            </Col>
          )}
        </Row>
      </div>
      <Modal
        maskStyle={{ backdropFilter: "blur(10px)" }}
        maskClosable={false}
        title="Filter Orders"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{ fontFamily: "Josefin Sans" }}
      >
        <Row gutter={[12, 12]}>
          <Col
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{ color: "#253d4e", marginBottom: "10px" }}
              className={styles.filter_label}
            >
              Filter by status
            </label>
            <Select
              onChange={handleChangeBySatatus}
              defaultValue={statusVal}
              value={statusVal}
              options={[
                {
                  value: "All",
                  label: "All",
                },
                {
                  value: "PLACED",
                  label: "Placed",
                },
                {
                  value: "CONFIRMED",
                  label: "Confirmed",
                },
                {
                  value: "PACKED",
                  label: "Packed",
                },
                {
                  value: "SHIPPED",
                  label: "Shipped",
                },
                {
                  value: "OUTFORDELIVERY",
                  label: "Out For Delivery",
                },
                {
                  value: "DELIVERED",
                  label: "Delivered",
                },
                {
                  value: "CANCELLEDBYCONSUMER",
                  label: "Cancelled",
                },
              ]}
            />
          </Col>
          <Col
            xl={12}
            lg={12}
            md={24}
            sm={24}
            xs={24}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              style={{ color: "#253d4e", marginBottom: "10px" }}
              className={styles.filter_label}
            >
              Filter by Time
            </label>
            <Select
              onChange={handleChangeByTime}
              defaultValue={timeFilter}
              value={timeFilter}
              options={[
                {
                  value: "All",
                  label: "Anytime",
                },
                {
                  value: "m",
                  label: "Last 30 Days",
                },
                {
                  value: "h",
                  label: "Last 6 months",
                },
                {
                  value: "y",
                  label: "Last Year",
                },
              ]}
            />
          </Col>
        </Row>
        <div style={{ marginTop: "20px", display: "flex", columnGap: "10px" }}>
          <Button
            style={{ border: "1px solid #253D4E" }}
            onClick={() => clearFilter()}
          >
            CLEAR
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            style={{ background: "#000000", color: "white" }}
          >
            APPLY
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default MyOrders;
