import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Input,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Steps,
  Typography,
} from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MyAccountMenu from "../../componentss/MyacoountMenu/myaccountmenu";
import Img from "../../public/assets/productCardImg/product-img-ph.jpg";
import styles from "./index.module.scss";
import DotsImg from "../../public/assets/orders/order-action.svg";
import Tick from "../../public/assets/orders/tick.svg";
import ArrowRight from "../../public/assets/orders/arrow-down.svg";
import CloseIcon from "../../public/assets/close-icon.svg";
import moment from "moment";
import { CloseCircleOutlined } from "@ant-design/icons";
import BASE_URL from "../../constants/textUtility/textenv";
import { useSelector } from "react-redux";
import Loader from "../../componentss/Loader";
const { TextArea } = Input;

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router?.query;
  const disableOrderCancelAt = useSelector(
    (s) => s?.settingData?.result?.settings?.at(0)?.disableOrderCancelAt
  );
  const allStatus = [
    "PLACED",
    "CONFIRMED",
    "PACKED",
    "SHIPPED",
    "OUTFORDELIVERY",
  ];
  const [breadcrumbData, setBreadCrumbData] = useState([
    { title: "Homepage", route: "/" },
    { title: "My Account", route: "/my-account" },
    { title: "My Order", route: "/my-orders" },
  ]);
  const [cancelIndex, setCancelIndex] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderTime, setOrderTime] = useState();
  const [topProduct, setTopProduct] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(1);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelComment, setCancelComment] = useState("");
  const [confirmedTime, setConfirmedTime] = useState();
  const [confirmedTimeHr, setConfirmedTimeHr] = useState();
  const [packedTime, setPackedTime] = useState();
  const [packedTimeHr, setPackedTimeHr] = useState();
  const [shippedTime, setShippedTime] = useState();
  const [shippedTimeHr, setShippedTimeHr] = useState();
  const [outfordelTime, setOutfordevTime] = useState();
  const [outfordelTimeHr, setOutfordevTimeHr] = useState();
  const [deliveryTime, setDeliveryTime] = useState();
  const [deliveryTimeHr, setDeliveryTimeHr] = useState();
  const [cancelTime, setCancelTime] = useState();
  const [cancelTimeHr, setCancelTimeHr] = useState();
  const [dp, setDp] = useState(""); //dp=delivery partner
  const [cancelOrderLoader, setCancelOrderLoader] = useState(false);
  const cancelStatus = [
    "CANCELLED",
    "CANCELLED_BY_SHIPPER",
    "CANCELLEDBYCONSUMER",
  ];

  const orderAction = () => {
    setIsModalOpen(true);
  };

  const cancelOrder = () => {
    if (cancelReason) {
      setCancelOrderLoader(true);
      let url = `${BASE_URL}/store/cms/order/cancel/${id}`;
      axios
        .post(url, {
          cancelReason: cancelReason,
          cancelComment: cancelComment,
          shipmentId: topProduct?.shipmentId,
          shipmentStatus: topProduct?.shipmentStatus,
        })
        .then((res) => {
          setLoad(load + 1);
          setCancelModalOpen(false);
          setCancelOrderLoader(false);
        })
        .catch((err) => {
          console.log("cancele err", err);
          message.error("something went erong..");
          setCancelOrderLoader(true);
        });
    } else {
      message.warning("Please select cancel reason..");
    }
  };

  useEffect(() => {
    setLoader(true);
    let url = `${BASE_URL}/store/api/v1/orders/${id}`;
    axios
      .get(url)
      .then((res) => {
        setOrderDetails(res?.data?.orders);
        let mili = new Date(res?.data?.orders?.at(0)?.createdAt).getTime();
        let date = new Date(mili);
        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        setOrderTime(hours + ":" + minutes + " " + ampm);
        setTopProduct(
          res?.data?.orders?.at(0)?.products?.at(0)?.products?.at(0)
        );
        trackingTimeUpdates(res?.data?.orders?.at(0)?.products?.at(0));
        let dp = res?.data?.orders
          ?.at(0)
          ?.additionalCharges?.filter(
            (ii) => ii?.name === "delivery_cost_details"
          )
          ?.at(0)?.value;
        console.log("dddddddppppp", dp?.partner?.name);
        setDp(dp?.partner?.name);
        let otherProducts = [];
        res?.data?.orders?.at(0)?.products?.map((item, index) => {
          return otherProducts?.push(item?.products);
        });
        setAllProducts(otherProducts?.flat());

        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [id, load]);

  useEffect(() => {
    let res = allStatus?.findIndex((item) => item === disableOrderCancelAt);
    setCancelIndex(res + 1);
  }, [disableOrderCancelAt]);

  const trackingTimeUpdates = (data) => {
    console.log("item?.createdAt ===", data?.products?.at(0));
    data?.products?.at(0)?.fullfilmentData?.filter((item) => {
      console.log("item?.createdAt", item?.status);
      if (item?.status === "CONFIRMED") {
        setConfirmedTime(item?.createdAt);
        // console.log("item?.createdAt", item?.createdAt);
        let mili = new Date(item?.createdAt).getTime();
        let date = new Date(mili);
        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        setConfirmedTimeHr(hours + ":" + minutes + " " + ampm);
      } else if (item?.status === "PACKED") {
        setPackedTime(item?.createdAt);
        let mili = new Date(item?.createdAt).getTime();
        let date = new Date(mili);
        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        setPackedTimeHr(hours + ":" + minutes + " " + ampm);
      } else if (
        item?.status === "SHIPPED" ||
        item?.status === "READY_FOR_DELIVERY"
      ) {
        setShippedTime(item?.createdAt);
        let mili = new Date(item?.createdAt).getTime();
        let date = new Date(mili);
        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        setShippedTimeHr(hours + ":" + minutes + " " + ampm);
      } else if (
        item?.status === "OUTFORDELIVERY" ||
        item?.status === "OUT_FOR_DELIVERY"
      ) {
        setOutfordevTime(item?.createdAt);
        let mili = new Date(item?.createdAt).getTime();
        let date = new Date(mili);
        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        setOutfordevTimeHr(hours + ":" + minutes + " " + ampm);
      } else if (
        item?.status === "CANCELLED" ||
        item?.status === "CANCELLEDBYCONSUMER" ||
        item?.shipmentStatus === "CANCELLED_BY_SHIPPER"
      ) {
        setCancelTime(item?.createdAt);
        let mili = new Date(item?.createdAt).getTime();
        let date = new Date(mili);
        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        setCancelTimeHr(hours + ":" + minutes + " " + ampm);
      } else if (item?.status === "DELIVERED") {
        setDeliveryTime(item?.createdAt);
        let mili = new Date(item?.createdAt).getTime();
        let date = new Date(mili);
        let hours = date.getHours();
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        setDeliveryTimeHr(hours + ":" + minutes + " " + ampm);
      }
    });
  };

  const downloadInvoice = () => {
    router.push(`/invoice?${id}/${topProduct?.shipmentId}`);
  };
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
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
          <Breadcrumb.Item>Order Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Row gutter={[16, 0]}>
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
              onClose={() => onClose()}
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
            xl={20}
            lg={20}
            md={24}
            sm={24}
            xs={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
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
            className={styles.details_container}
          >
            <div className={styles.page_title}>My Order</div>
            <Row gutter={[32, 32]} className={styles.order_status_top_row}>
              <Col xl={17} lg={17} md={17} sm={24} xs={24}>
                <Typography className={styles.order_id_text}>
                  Order Number : {orderDetails?.at(0)?.orderId}
                </Typography>
                <Typography className={styles.order_date}>
                  Order Date :{" "}
                  {moment(orderDetails?.at(0)?.createdAt).format("LL")},{" "}
                  {orderTime}
                </Typography>
              </Col>
              <Col
                xl={7}
                lg={7}
                md={7}
                sm={24}
                xs={24}
                className={styles.order_status_wrapper}
              >
                <Typography
                  className={styles.order_status}
                  style={
                    topProduct?.shipmentStatus === "PLACED"
                      ? { backgroundColor: "#9676EF" }
                      : topProduct?.shipmentStatus === "DELIVERED"
                      ? { backgroundColor: "#3BB77E" }
                      : topProduct?.shipmentStatus === "CANCELLEDBYCONSUMER" ||
                        topProduct?.shipmentStatus === "CANCELLED" ||
                        topProduct?.shipmentStatus === "CANCELLED_BY_SHIPPER"
                      ? { backgroundColor: "#F63535" }
                      : topProduct?.shipmentStatus === "OUTFORDELIVERY" ||
                        topProduct?.shipmentStatus === "OUT_FOR_DELIVERY"
                      ? { backgroundColor: "#F4B30C" }
                      : topProduct?.shipmentStatus === "REPLACE"
                      ? { backgroundColor: "#2A4C86" }
                      : { backgroundColor: "#01C0CC" }
                  }
                >
                  {topProduct?.shipmentStatus === "CANCELLEDBYCONSUMER" ||
                  topProduct?.shipmentStatus === "CANCELLED" ||
                  topProduct?.shipmentStatus === "CANCELLED_BY_SHIPPER"
                    ? "CANCELLED"
                    : topProduct?.shipmentStatus}
                </Typography>
                {console.log(
                  "allStatusop)",
                  cancelIndex,
                  allStatus?.slice(0, cancelIndex - 1)
                )}
                {!cancelStatus.includes(topProduct?.shipmentStatus) && (
                  <>
                    {topProduct?.shipmentStatus == "DELIVERED" ? (
                      <button
                        className={styles.order_action}
                        onClick={() => orderAction()}
                      >
                        <Image src={DotsImg} alt="action" />
                      </button>
                    ) : dp === "ecom" &&
                      allStatus
                        ?.slice(0, cancelIndex - 1)
                        ?.includes(topProduct?.shipmentStatus) ? (
                      <button
                        className={styles.order_action}
                        onClick={() => setCancelModalOpen(true)}
                      >
                        <Image src={DotsImg} alt="action" />
                      </button>
                    ) : null}
                  </>
                )}
              </Col>
            </Row>
            <Row
              style={{ marginTop: "10px" }}
              className={styles.order_details_wrapper}
            >
              <Col
                xl={3}
                lg={3}
                md={3}
                sm={24}
                xs={24}
                className={styles.order_img_wrapper}
              >
                <Image
                  src={topProduct?.productDetails?.media?.at(0)?.url ?? Img}
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
                sm={24}
                xs={24}
                style={{ paddingLeft: "2%" }}
              >
                <div>
                  {topProduct?.productName?.split("|")?.map((i, index) => (
                    <Row
                      style={
                        topProduct?.productName?.split("|")?.length === 1
                          ? {
                              fontWeight: "500",
                              fontSize: "16px",
                              color: "#253d4e",
                              textTransform: "capitalize",
                              wordBreak: "break-all",
                            }
                          : {
                              textTransform: `${
                                topProduct?.productName?.split("|")?.length ===
                                  1 &&
                                index == 0 &&
                                "capitalize"
                              }`,
                            }
                      }
                      className={
                        index + 1 !==
                        topProduct?.productName?.split("|")?.length
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
            <Row className={styles.stepper_wrapper}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                {!cancelStatus.includes(topProduct?.shipmentStatus) && (
                  <Steps
                    labelPlacement="vertical"
                    current={
                      topProduct?.shipmentStatus === "PLACED"
                        ? 1
                        : topProduct?.shipmentStatus === "CONFIRMED"
                        ? 2
                        : topProduct?.shipmentStatus === "PACKED"
                        ? 3
                        : topProduct?.shipmentStatus === "SHIPPED" ||
                          topProduct?.shipmentStatus == "READY_FOR_DELIVERY"
                        ? 4
                        : topProduct?.shipmentStatus === "OUTFORDELIVERY" ||
                          topProduct?.shipmentStatus == "OUT_FOR_DELIVERY"
                        ? 5
                        : topProduct?.shipmentStatus === "CANCELED"
                        ? 5
                        : topProduct?.shipmentStatus === "DELIVERED"
                        ? 5
                        : 1
                    }
                  >
                    {[
                      {
                        title: "Placed",
                        description:
                          moment(orderDetails?.at(0)?.createdAt).format("LL") +
                          " " +
                          orderTime,
                      },
                      {
                        title: "Confirmed",
                        description: confirmedTime
                          ? moment(confirmedTime).format("LL") +
                            ", " +
                            confirmedTimeHr
                          : packedTime
                          ? moment(packedTime).format("LL") +
                            ", " +
                            packedTimeHr
                          : shippedTime
                          ? moment(shippedTime).format("LL") +
                            ", " +
                            shippedTimeHr
                          : outfordelTime
                          ? moment(outfordelTime).format("LL") +
                            ", " +
                            outfordelTimeHr
                          : deliveryTime
                          ? moment(deliveryTime).format("LL") +
                            ", " +
                            deliveryTimeHr
                          : null,
                      },
                      {
                        title: "Packed",
                        description: packedTime
                          ? moment(packedTime).format("LL") +
                            ", " +
                            packedTimeHr
                          : shippedTime
                          ? moment(shippedTime).format("LL") +
                            ", " +
                            shippedTimeHr
                          : outfordelTime
                          ? moment(outfordelTime).format("LL") +
                            ", " +
                            outfordelTimeHr
                          : deliveryTime
                          ? moment(deliveryTime).format("LL") +
                            ", " +
                            deliveryTimeHr
                          : null,
                      },
                      {
                        title: "Shipped",
                        description: shippedTime
                          ? moment(shippedTime).format("LL") +
                            ", " +
                            shippedTimeHr
                          : outfordelTime
                          ? moment(outfordelTime).format("LL") +
                            ", " +
                            outfordelTimeHr
                          : deliveryTime
                          ? moment(deliveryTime).format("LL") +
                            ", " +
                            deliveryTimeHr
                          : null,
                      },
                      {
                        title: "Out for delivery",
                        description: outfordelTime
                          ? moment(outfordelTime).format("LL") +
                            ", " +
                            outfordelTimeHr
                          : deliveryTime
                          ? moment(deliveryTime).format("LL") +
                            ", " +
                            deliveryTimeHr
                          : null,
                      },
                      {
                        title:
                          topProduct?.shipmentStatus == "CANCELLEDBYCONSUMER" ||
                          topProduct?.shipmentStatus === "CANCELLED" ||
                          topProduct?.shipmentStatus ===
                            "CANCELLED_BY_SHIPPER" ? (
                            <span style={{ color: "red" }}>
                              {topProduct?.shipmentStatus ==
                              "CANCELLEDBYCONSUMER"
                                ? "Canceled by you"
                                : "Canceled"}
                            </span>
                          ) : (
                            <span
                              style={
                                topProduct?.shipmentStatus == "DELIVERED"
                                  ? {
                                      color: "#3BB77E",
                                      fontWeight: 500,
                                      fontSize: 13,
                                    }
                                  : {}
                              }
                            >
                              Delivered
                            </span>
                          ),
                        description: cancelTime
                          ? moment(cancelTime).format("LL") +
                            ", " +
                            cancelTimeHr
                          : deliveryTime
                          ? moment(deliveryTime).format("LL") +
                            ", " +
                            deliveryTimeHr
                          : null,
                        icon:
                          topProduct?.shipmentStatus == "DELIVERED" ? (
                            <Image {...Tick} alt="" />
                          ) : topProduct?.shipmentStatus ==
                              "CANCELLEDBYCONSUMER" ||
                            topProduct?.shipmentStatus === "CANCELLED" ||
                            topProduct?.shipmentStatus ===
                              "CANCELLED_BY_SHIPPER" ? (
                            <CloseCircleOutlined style={{ color: "red" }} />
                          ) : null,
                      },
                    ]?.map(({ title, description, icon }, index) => {
                      return (
                        <Steps.Step
                          key={index}
                          title={title}
                          icon={icon}
                          description={description}
                        />
                      );
                    })}
                  </Steps>
                )}
              </Col>
            </Row>
            {topProduct?.shipmentStatus !== "PLACED" && dp === "ecom" && (
              <Row
                style={{
                  width: "95%",
                  margin: "10px auto 0px",
                }}
              >
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.tracking_wrapper}
                >
                  <div className={styles.tracking_id}>
                    Tracking ID : <code>{topProduct?.shipmentId}</code>
                  </div>
                  <div
                    className={styles.tracking_id_view_more}
                    onClick={() =>
                      window.open(
                        `https://client.shipyaari.com/track/${topProduct?.shipmentId}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    View More
                  </div>
                </Col>
              </Row>
            )}
            <Row
              style={
                topProduct?.shipmentStatus === "CANCELLED"
                  ? { marginTop: "-10px" }
                  : {}
              }
              gutter={[16, 16]}
              className={styles.order_address_wrapper}
            >
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Typography className={styles.title}>
                  Billing Address :
                </Typography>
                {true ? (
                  <>
                    <Typography className={styles.type}>
                      {
                        orderDetails?.at(0)?.billingDetails?.addressDetails
                          ?.addressType
                      }
                    </Typography>
                    <Typography className={styles.details}>
                      {
                        orderDetails?.at(0)?.billingDetails?.addressDetails
                          ?.addr1
                      }
                      ,
                      {
                        orderDetails?.at(0)?.billingDetails?.addressDetails
                          ?.state
                      }
                      , India -{" "}
                      {
                        orderDetails?.at(0)?.billingDetails?.addressDetails
                          ?.pinCode
                      }
                    </Typography>
                  </>
                ) : (
                  "..."
                )}
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Typography className={styles.title}>
                  Delivery Address :
                </Typography>
                {true ? (
                  <>
                    <Typography className={styles.type}>
                      {
                        orderDetails?.at(0)?.shippingDetails?.addressDetails
                          ?.addressType
                      }
                    </Typography>
                    <Typography className={styles.details}>
                      {
                        orderDetails?.at(0)?.shippingDetails?.addressDetails
                          ?.addr1
                      }
                      ,{" "}
                      {
                        orderDetails?.at(0)?.shippingDetails?.addressDetails
                          ?.city
                      }
                      , India -{" "}
                      {
                        orderDetails?.at(0)?.shippingDetails?.addressDetails
                          ?.pinCode
                      }
                    </Typography>
                  </>
                ) : (
                  "..."
                )}
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Typography className={styles.title}>
                  Person Details :
                </Typography>
                <Typography className={styles.details}>
                  {orderDetails?.at(0)?.consumerDetails?.name}
                </Typography>
              </Col>
            </Row>

            {allProducts?.length > 1 ? (
              <>
                <div className={styles.other_card_title}>
                  Other items in order
                </div>
                <div className={styles.other_cards_container}>
                  {allProducts
                    ?.filter((item) => item?.id !== topProduct?.id)
                    ?.map((item, index) => {
                      const mediaUrl = item?.productDetails?.media?.at(0)?.url;
                      return (
                        <Row
                          style={
                            allProducts?.length - 1 === index + 1
                              ? { borderBottom: "none" }
                              : { borderBottom: "1px solid #E2E2E2" }
                          }
                          onClick={() => {
                            setConfirmedTime("");
                            setConfirmedTimeHr("");
                            setPackedTime("");
                            setPackedTimeHr("");
                            setShippedTime("");
                            setShippedTimeHr("");
                            setOutfordevTime("");
                            setOutfordevTimeHr("");
                            setTopProduct(item);
                            trackingTimeUpdates(item);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          key={index}
                          className={styles.order_card_wrapper}
                        >
                          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <Row className={styles.order_details_wrapper}>
                              <Col
                                xl={3}
                                lg={3}
                                md={3}
                                sm={24}
                                xs={24}
                                className={styles.order_img_wrapper}
                              >
                                <Image
                                  src={mediaUrl ?? Img}
                                  height={70}
                                  width={70}
                                  alt=""
                                  objectFit="contain"
                                />
                              </Col>
                              <Col
                                xl={17}
                                lg={17}
                                md={17}
                                sm={24}
                                xs={24}
                                style={{ paddingLeft: "2%" }}
                              >
                                <div>
                                  {item?.productName
                                    ?.split("|")
                                    ?.map((i, index) => (
                                      <Row
                                        style={
                                          item?.productName?.split("|")
                                            ?.length === 1
                                            ? {
                                                fontWeight: "500",
                                                fontSize: "14px",
                                                color: "#253d4e",
                                                textTransform: "capitalize",
                                                wordBreak: "break-all",
                                              }
                                            : {}
                                        }
                                        className={
                                          index + 1 !==
                                          item?.productName?.split("|")?.length
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
                              <Col
                                xl={4}
                                lg={4}
                                md={4}
                                sm={24}
                                xs={24}
                                className={styles.other_order_status_wrapper}
                              >
                                <div
                                  style={
                                    item?.shipmentStatus === "PLACED"
                                      ? { backgroundColor: "#9676EF" }
                                      : item?.shipmentStatus === "DELIVERED"
                                      ? { backgroundColor: "#3BB77E" }
                                      : item?.shipmentStatus ===
                                          "CANCELLEDBYCONSUMER" ||
                                        item?.shipmentStatus === "CANCELLED" ||
                                        item?.shipmentStatus ===
                                          "CANCELLED_BY_SHIPPER"
                                      ? { backgroundColor: "#F63535" }
                                      : item?.shipmentStatus ===
                                          "OUTFORDELIVERY" ||
                                        item?.shipmentStatus ===
                                          "OUT_FOR_DELIVERY"
                                      ? { backgroundColor: "#F4B30C" }
                                      : item?.shipmentStatus === "REPLACE"
                                      ? { backgroundColor: "#2A4C86" }
                                      : { backgroundColor: "#01C0CC" }
                                  }
                                  className={styles.other_order_status}
                                >
                                  {item?.shipmentStatus ===
                                    "CANCELLEDBYCONSUMER" ||
                                  item?.shipmentStatus === "CANCELLED" ||
                                  item?.shipmentStatus ===
                                    "CANCELLED_BY_SHIPPER"
                                    ? "CANCELLED"
                                    : item?.shipmentStatus}
                                </div>
                                <div className={styles.arrow}>
                                  <Image {...ArrowRight} alt="" />
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      );
                    })}
                </div>
              </>
            ) : null}

            <Row gutter={[16, 16]} className={styles.payment_mode_wrapper}>
              <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                <Typography className={styles.payment_mode_title}>
                  Payment Mode :{" "}
                </Typography>
                <Typography className={styles.payment_mode_option}>
                  {orderDetails?.at(0)?.paymentMode}
                </Typography>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Typography className={styles.payment_mode_info}>
                  Payment Information :
                </Typography>
                <div className={styles.payment_mode_info_rows_wrapper}>
                  <div className={styles.payment_mode_info_rows}>
                    <span>Subtotal</span>
                    <span>
                      ₹ {(+orderDetails?.at(0)?.subTotal)?.toFixed(2)}
                    </span>
                  </div>
                  {orderDetails?.at(0)?.deductions.map(({ name, value }) => (
                    <div className={styles.payment_mode_info_rows} key={name}>
                      <span
                        className={styles.keyName}
                        style={{ color: "#3BB77E" }}
                      >
                        {name.toLowerCase() === "platform discount"
                          ? "Discount"
                          : name.toLowerCase()}
                      </span>
                      <span style={{ color: "#3BB77E" }}>
                        -₹ {(+value || 0)?.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {orderDetails
                    ?.at(0)
                    ?.additionalCharges?.filter(
                      (item) => item?.name !== "delivery_cost_details"
                    )
                    .map(({ name, value }) => (
                      <div className={styles.payment_mode_info_rows} key={name}>
                        <span className={styles.keyName}>
                          {name.toLowerCase()}
                        </span>
                        <span>₹ {(+value || 0)?.toFixed(2)}</span>
                      </div>
                    ))}

                  <div className={styles.payment_mode_info_rows}>
                    <b>Total Amount</b>
                    <b>
                      ₹ {(+orderDetails?.at(0)?.finalPrice || 0).toFixed(2)}
                    </b>
                  </div>
                  {console.log(orderDetails)}
                  {orderDetails?.at(0)?.paymentMode === "COD" ? (
                    <>
                      <div className={styles.payment_mode_info_rows}>
                        <b>Total Amount Paid</b>
                        <b>
                          ₹{" "}
                          {orderDetails?.at(0)?.paymentStatus === "SUCCESS" ||
                          orderDetails?.at(0)?.orderStatus == "DELIVERED"
                            ? +orderDetails?.at(0)?.finalPrice || 0
                            : 0}
                        </b>
                      </div>
                      <div className={styles.payment_mode_info_rows}>
                        <b>Amount To Be Paid</b>

                        <b>
                          ₹{" "}
                          {orderDetails?.at(0)?.paymentStatus === "SUCCESS" ||
                          orderDetails?.at(0)?.orderStatus == "DELIVERED"
                            ? 0
                            : (+orderDetails?.at(0)?.finalPrice || 0).toFixed(
                                2
                              )}
                        </b>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.payment_mode_info_rows}>
                        <b>Total Amount Paid</b>
                        <b>
                          ₹{" "}
                          {(
                            +orderDetails?.at(0)?.transactionDetails?.at(0)
                              ?.amount || 0
                          ).toFixed(2)}
                        </b>
                      </div>
                      <div className={styles.payment_mode_info_rows}>
                        <b>Amount To Be Paid</b>

                        <b>
                          ₹{" "}
                          {(
                            (+orderDetails?.at(0)?.finalPrice || 0) -
                            (+orderDetails?.at(0)?.transactionDetails?.at(0)
                              ?.amount || 0)
                          ).toFixed(2)}
                        </b>
                      </div>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <Modal
        title=""
        open={isModalOpen}
        // closable={false}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        closeIcon={
          <div className={styles.close_icon}>
            <Image {...CloseIcon} alt="" />
          </div>
        }
        width={200}
        style={{
          position: "absolute",
          top: "43%",
          right: "3%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            onClick={() => downloadInvoice()}
            className={styles.action_modal_text}
          >
            View Invoice
          </Typography>
        </div>
      </Modal>
      <Modal
        title="Cancel Order"
        open={cancelModalOpen}
        onOk={() => setCancelModalOpen(false)}
        onCancel={() => {
          !cancelOrderLoader ? setCancelModalOpen(false) : undefined;
        }}
        footer={null}
        maskStyle={{ backdropFilter: "blur(10px)" }}
        maskClosable={false}
      >
        {!cancelOrderLoader ? (
          <div className={styles.cancel_option_wrapper}>
            <div>
              <Typography className={styles.cancel_option_wrapper_label}>
                Choose a Reason for Order Cancellation{" "}
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Select
                style={{ width: "100%" }}
                onChange={(e) => setCancelReason(e)}
                defaultValue="Select Option"
                options={[
                  {
                    value: "Order Created by Mistake",
                    label: "Order Created by Mistake",
                  },
                  {
                    value: "Delivery Cost Too High",
                    label: "Delivery Cost Too High",
                  },
                  {
                    value: "Item Price Too High",
                    label: "Item Price Too High",
                  },
                  {
                    value: "Other",
                    label: "Other",
                  },
                ]}
              />
            </div>
            <div>
              <Typography className={styles.cancel_option_wrapper_label}>
                Leave a Comment
              </Typography>
              <TextArea
                rows={6}
                onChange={(e) => setCancelComment(e.target.value)}
                placeholder="Enter comment..."
              />
            </div>
            <div>
              <Button
                className={styles.cancel_option_submit_btn}
                onClick={() => cancelOrder()}
              >
                SUBMIT
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={styles.cancel_oloader}
            style={{ marginTop: "-100px" }}
          >
            <Loader />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderDetails;
