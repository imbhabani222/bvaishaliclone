import {
  Breadcrumb,
  Col,
  Row,
  Button,
  Card,
  Divider,
  Empty,
  message,
  Radio,
  Spin,
  Modal,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { ExclamationCircleOutlined, HeartOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ApplyCouponModal from "../../componentss/ApplyCoupon/applyCoupon";
import s from "./index.module.scss";
import CartCard from "../../componentss/Cards/cartCard/cartcard";
import redarrow from "../../public/assets/homeCatImgs/arrow.svg";
import redcross from "../../public/assets/Red-cross.svg";
import cupLogo from "../../public/assets/homeCatImgs/couponlogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_CART_PRODUCTS } from "../../redux/cartProducts/actions/actions";
import axios from "axios";
import Cookies from "universal-cookie";
import OnlinePayImg from "../../public/onlin_pay.svg";
import CODpayImg from "../../public/cod.svg";
import alert from "../../public/assets/homeCatImgs/alert.svg";
import { FETCH_ALL_ADDRESS } from "../../redux/address/actions/actions";
import BASE_URL from "../../constants/textUtility/textenv";
import Link from "next/link";
import AlertImg from "../../public/assets/alert.svg";
import { FETCH_ALL_STORE } from "../../redux/storedetail/actions/actions";
import moment from "moment";
import CartSkeleton from "../../componentss/Skeleton";
import { LoadingOutlined } from "@ant-design/icons";
import CloseIcon from "../../public/assets/close-icon.svg";

const MyCart = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");
  const dispatch = useDispatch();
  const [applyCouponModalOpen, setApplyCouponModalOpen] = useState(false);
  const [applyedCoupon, setApplyedCoupon] = useState({});
  const [paymentModal, setPaymentModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [paymentPolicy, setPaymentPolicy] = useState({});
  const [disablePay, setDisablePay] = useState(true);
  const [onlineAllowed, setOnline] = useState(true);
  const [codAllowed, setCod] = useState(true);
  const [codLimit, setCodLimit] = useState("");
  const [payMode, setPayMode] = useState("");
  const [onlinePaymentLoader, setOnlinePaymentLoader] = useState(false);
  const [mode, setMode] = useState("ONLINE");
  const [payLoader, setPayLoader] = useState(false);
  const [priceUpdate, setPriceUpdate] = useState(false);
  const [disabledProInCart, setDisabledProInCart] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);

  const setting = useSelector((s) => s?.settingData?.result?.settings?.at(0));
  const cartId = useSelector((s) => s.allStore?.result?.cart?.id);
  const storeDetails = useSelector((s) => s.allStore);
  const cart = useSelector((state) => state?.allStore?.result?.cart || null);
  const user = useSelector((state) => state?.allStore?.result?.user || null);
  let storeDetail = useSelector((state) => state?.allStore || null);

  const cartDetails = useSelector((state) => state?.allCart);
  const cartData = cartDetails?.result;
  let dc = cartData?.additionalCharges
    ?.filter((ii) => ii?.name === "Delivery charge")
    ?.at(0)?.value;
  const addressFetch = useSelector((s) => s?.allAddress);
  const addressData = useSelector((s) =>
    s?.allAddress?.result?.address?.filter((item) => {
      return item?.addressDetails?.isDefault;
    })
  );

  useEffect(() => {
    if (JWT) {
      console.log("Herre", "JWT", JWT, "cartId", cartId);
      const temp = !cartData?.serviceabilityDetails?.name
        ? setting?.paymentPolicy?.acceptingMode == "COD"
          ? "COD"
          : "ONLINE"
        : cartData?.serviceabilityDetails?.name === "ecom"
        ? mode
        : null;
      dispatch({
        type: FETCH_ALL_CART_PRODUCTS,
        cartId: cartId,
        pm: temp,
      });
    }
  }, [
    // mode,
    cartId,
    storeDetails.fetching,
    dispatch,
    setting,
    setting?.paymentPolicy?.acceptingMode,
    JWT,
  ]);

  useEffect(() => {
    if (cartId && storeDetails?.fetching && JWT) {
      dispatch({
        type: FETCH_ALL_CART_PRODUCTS,
        cartId: cartId,
      });
    }
  }, [cartId, storeDetails?.fetching, dispatch, cartData?.finalPrice]);

  useEffect(() => {
    const temp =
      setting?.paymentPolicy?.acceptingMode === "COD" ? "COD" : "ONLINE";
    setMode(temp);
  }, [setting]);

  useEffect(() => {
    if (JWT?.length > 0) {
      dispatch({ type: FETCH_ALL_ADDRESS });
    }
  }, [JWT?.length, dispatch]);

  useEffect(() => {
    if (!storeDetail?.fetching && !storeDetail?.result) {
      dispatch({ type: FETCH_ALL_STORE });
    }
  }, [dispatch, storeDetail?.fetching, storeDetail?.result]);

  useEffect(() => {
    if (storeDetails?.fetching && !JWT && localStorage.getItem("cartId")) {
      dispatch({
        type: FETCH_ALL_CART_PRODUCTS,
        cartId: cartDetails?.result?.id,
      });
    }
  }, [cartId, storeDetails?.fetching, dispatch]);

  const gstData = cartDetails?.result?.additionalCharges?.filter(
    (item, index) => item?.name === "GST" && !item?.perItemValue
  );

  const freeShiping = cartData?.additionalCharges
    ?.filter((item) => item?.name == "delivery_cost_details")
    ?.at(0)?.value;

  useEffect(() => {
    if (setting) {
      setLoader(true);
      const policy = setting?.paymentPolicy;
      const { acceptingMode, acceptanceLimit } = policy;
      if (
        (acceptingMode === "ANY" && acceptanceLimit === 0) ||
        (!acceptingMode && acceptanceLimit === 0)
      ) {
        setDisablePay(false);
        setOnline(true);
        setCod(false);
      } else if (acceptingMode === "ONLINE") {
        setCod(false);
        setDisablePay(false);
      } else if (
        acceptingMode === "COD" &&
        (acceptanceLimit === null || acceptanceLimit === undefined)
      ) {
        setOnline(false);
        setCod(true);
        setDisablePay(false);
      } else if (acceptingMode === "ANY" && acceptanceLimit === null) {
        setOnline(true);
        setCod(true);
        setDisablePay(false);
      } else if (acceptingMode === "ONLINE" && acceptanceLimit === 0) {
        setDisablePay(false);
        setCod(false);
      } else if (
        acceptingMode === "ANY" ||
        (!acceptingMode && acceptanceLimit)
      ) {
        if (Math.round(cartData?.finalPrice) > acceptanceLimit) {
          setCod(false);
        } else {
          setCod(true);
        }
        setDisablePay(false);
      } else if (acceptingMode === "COD" && acceptanceLimit === 0) {
        setOnline(false);
        setDisablePay(false);
        setCodLimit(acceptanceLimit);
        setPayMode("COD");
      } else if (acceptingMode === "COD" && acceptanceLimit) {
        setOnline(false);
        if (Math.round(cartData?.finalPrice) <= acceptanceLimit) {
          setDisablePay(false);
        } else {
          setCodLimit(acceptanceLimit);
          setPayMode(acceptingMode);
          setDisablePay(true);
        }
      }
      setPaymentPolicy(setting?.paymentPolicy);
      setLoader(false);
    }
  }, [cartData?.finalPrice, setting]);

  useEffect(() => {
    if (
      !localStorage.getItem("finalPrice") ||
      localStorage.getItem("finalPrice") !== cartData?.finalPrice?.toFixed(2)
    ) {
      localStorage.setItem("finalPrice", cartData?.finalPrice?.toFixed(2));
    }
  }, [cartData?.finalPrice]);

  useEffect(() => {
    if (
      !localStorage.getItem("totalItems") ||
      localStorage.getItem("totalItems") !== cartData?.totalItems
    ) {
      localStorage.setItem("totalItems", cartData?.totalItems);
    }
  }, [cartData?.totalItems]);

  async function paymentClick() {
    // fbq("track", "InitiateCheckout", {
    //   value: `my-cart_${cartData?.finalPrice}__saaF1`,
    //   currency: "INR",
    // });
    if (mode === "COD") {
      setPaymentConfirm(true);
    } else {
      try {
        //
        setPayLoader(true);

        const temp = !cartData?.serviceabilityDetails?.name
          ? setting?.paymentPolicy?.acceptingMode == "COD"
            ? "COD"
            : "ONLINE"
          : cartData?.serviceabilityDetails?.name === "ecom"
          ? mode
          : null;
        await dispatch({
          type: FETCH_ALL_CART_PRODUCTS,
          cartId: cartId,
          pm: temp,
        });
        //need to refactor HF(hot fix)
        let url = `${BASE_URL}/store/api/v2/cart/${cartId}?pm=${temp ?? ""}`;
        axios
          .get(url)
          .then((res) => {
            setLoader(true);
            setTimeout(() => {
              if (localStorage.getItem("totalItems") != cartData?.totalItems) {
                setPayLoader(false);
                setLoader(false);
                setDisabledProInCart(true);
              } else if (
                localStorage.getItem("finalPrice") !==
                cartData?.finalPrice?.toFixed(2)
              ) {
                setPayLoader(false);
                setLoader(false);
                setPriceUpdate(true);
              } else if (user) {
                setLoader(false);
                mode === "COD" ? codClick() : onlinePaymentClick();
              } else {
                setLoader(false);
                setPayLoader(false);
                router.push("/login-modal");
              }
            }, 2000);
          })
          .catch((err) => {
            console.log("errrrrrr", err);
            setPayLoader(false);
          });
      } catch {
        //
      }
    }
  }

  //razorpay
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const razorpayPayment = async (data) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.log("Something went wrong..., Please try again...");
      setOnlinePaymentLoader(false);
    } else {
      setOnlinePaymentLoader(false);
      setPaymentModal(false);
    }

    setPayLoader(false);

    const options = {
      key: data?.key,
      amount: data?.amount,
      currency: data?.currency,
      name: storeDetail?.result?.name ?? "Zlite",
      description: "Product Purchase",
      image: storeDetail?.result?.logoData?.url ?? "",
      order_id: data?.order_id,
      prefill: {
        name: storeDetail?.result?.user?.name ?? "",
        email: storeDetail?.result?.user?.email ?? "",
      },
      handler: function (response) {
        // fbq("track", "Purchase", {
        //   value: `my-cart_${cartData?.finalPrice}__saaF1`,
        //   currency: "INR",
        // });
        console.log("payment_id", response.razorpay_payment_id);
        localStorage.removeItem("finalPrice");
        localStorage.removeItem("totalItems");
        window.location.href = `/payment-progress?transactionId=${data?.order_id}`;
      },
      modal: {
        escape: false,
        ondismiss: function () {
          axios
            .post(
              `${BASE_URL}/store/api/v2/cart/reset/${data?.custOrderId}`,
              {},
              {
                headers: { Authorization: `Bearer ${JWT}` },
              }
            )
            .then((res) => {
              console.log("r", res), location?.reload();
            })
            .catch((err) => console.log("errrrr", err));
        },
      },
      notes: {
        address: "notes",
      },
      theme: {
        color: "#01C0CC",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const codClick = () => {
    setLoader(true);
    setPayLoader(true);
    setPriceUpdate(false);
    // fbq("track", "Purchase", {
    //   value: `my-cart_${cartData?.finalPrice}__saaF1`,
    //   currency: "INR",
    // });
    let url = `${BASE_URL}/store/api/v1/cart/checkout?m=COD`;
    let JWT = cookies?.get("accessToken");
    axios
      .post(
        url,
        {
          shippingAddress: addressData?.at(0)?.id,
          partnerId:
            cartData?.serviceabilityDetails?.deliveryPromise?.partner_id ??
            null,
        },
        { headers: { Authorization: `Bearer ${JWT}` } }
      )
      .then((res) => {
        console.log("rrrr", { cartId });
        localStorage.removeItem("finalPrice");
        localStorage.removeItem("totalItems");
        if (res?.data?.orderId) {
          window.location.href = `/order-success?${res?.data?.orderId}`;
        }
        setLoader(false);
        setPayLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setPayLoader(false);
      });
  };

  const onlinePaymentClick = () => {
    setOnlinePaymentLoader(true);
    let url = `${BASE_URL}/store/api/v1/cart/checkout`;
    let JWT = cookies?.get("accessToken");
    axios
      .post(
        url,
        {
          shippingAddress: addressData?.at(0)?.id,
          partnerId:
            cartData?.serviceabilityDetails?.deliveryPromise?.partner_id ??
            null,
        },
        { headers: { Authorization: `Bearer ${JWT}` } }
      )
      .then((res) => {
        setPriceUpdate(false);
        razorpayPayment(res?.data);
      })
      .catch((err) => {
        setOnlinePaymentLoader(false);
        console.log("PAYMENT_ERR--", err);
      });
  };

  const changeMode = (e) => {
    setMode(e.target.value);
  };
  console.log("loader || cartDetails?.fetching", loader, cartDetails?.fetching);
  if (loader || cartDetails?.fetching) {
    return (
      <>
        <CartSkeleton />
      </>
    );
  }
  return (
    <>
      <div className={s.my_cart_container}>
        <header className={s.breadcrumb_wrapper}>
          <Breadcrumb>
            <Breadcrumb.Item
              style={{
                fontFamily: "Josefin Sans",
                cursor: "pointer",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "14px",
              }}
              href="/"
            >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              style={{
                fontFamily: "Josefin Sans",
                cursor: "pointer",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "14px",
              }}
            >
              <a href="">Cart</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </header>
        <h3 className={s.page_heading}>My Cart</h3>
        <section className={s.section}>
          <Row gutter={[10, 10]}>
            <Col xl={18} lg={18} md={24} sm={24} xs={24}>
              <Row className={s.deliver_adderss_container}>
                <Col
                  xl={18}
                  lg={18}
                  md={18}
                  sm={24}
                  xs={24}
                  className={s.deliver_adderss_test_wrapper}
                >
                  {addressData?.at(0)?.addressName ? (
                    <>
                      <div className={s.deliver_loc_type}>
                        Deliver To :{" "}
                        <b>
                          {addressData?.at(0)?.addressName} ,{" "}
                          {addressData?.at(0)?.addressDetails?.pinCode}
                        </b>
                      </div>
                      <div className={s.deliver_address}>
                        {addressData?.at(0)?.addressDetails?.addr1}{" "}
                        {addressData?.at(0)?.addressDetails?.city},{" "}
                        {addressData?.at(0)?.addressDetails?.state},{" "}
                        {addressData?.at(0)?.addressDetails?.country ?? "India"}
                        .
                      </div>
                      {cartData?.lineItemDetails?.length > 0 && (
                        <div>
                          {!cartData?.serviceabilityDetails &&
                          cartData?.lineItemDetails.length > 0 ? (
                            <div className={s.serviecable}>
                              <Image {...AlertImg} alt="alert" />
                              <>
                                Items in your cart are not deliverable to the
                                selected address please change the address.
                              </>
                            </div>
                          ) : cartData?.serviceabilityDetails?.name !==
                            "ecom" ? (
                            <div>
                              {cartData?.serviceabilityDetails?.feasible ===
                                false &&
                                cartData?.lineItemDetails.length > 0 && (
                                  <div className={s.serviecable}>
                                    <Image {...AlertImg} alt="alert" />
                                    <>
                                      Items in your cart are not deliverable to
                                      the selected address please change the
                                      address.
                                    </>
                                  </div>
                                )}
                            </div>
                          ) : (
                            <div>
                              {cartData?.serviceabilityDetails?.feasible ===
                                false &&
                                cartData?.lineItemDetails.length > 0 &&
                                storeDetails.fetching && (
                                  <div className={s.serviecable}>
                                    <Image {...AlertImg} alt="alert" />
                                    <>
                                      Items in your cart are not deliverable to
                                      the selected address please change the
                                      address.
                                    </>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <span
                      style={{
                        color: "red",
                        fontWeight: 400,
                        fontFamily: "Josefin Sans",
                      }}
                    >
                      <ExclamationCircleOutlined /> Please Add Address..
                    </span>
                  )}
                </Col>
                <Col
                  xl={6}
                  lg={6}
                  md={6}
                  sm={24}
                  xs={24}
                  className={s.change_add_btn_wrapper}
                >
                  <Button
                    onClick={() => {
                      if (!JWT) {
                        router?.push("login-modal");
                      } else {
                        router.push(
                          `${
                            cartData?.addressDetails?.addressName
                              ? "/my-address"
                              : cookies?.get("accessToken")?.length > 0
                              ? "address"
                              : router.push("/login-modal")
                          }`
                        );
                      }
                    }}
                    type="primary"
                    className={s.change_add_btn}
                  >
                    {cartData?.addressDetails?.addressName
                      ? "CHANGE ADDRESS"
                      : "ADD ADDRESS"}
                  </Button>
                </Col>
              </Row>
              {(cartData?.serviceabilityDetails?.feasible ||
                !storeDetails.fetching) &&
                addressData?.length > 0 &&
                cartData?.serviceabilityDetails &&
                cartData?.lineItemDetails?.length > 0 && (
                  <Row gutter={[12, 12]} className={s.promise_show}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <div className={s.delivery_option_wrapper}>
                        <div className={s.timing}>
                          {cartData?.serviceabilityDetails?.name !==
                          "innofullfill" ? (
                            <span>
                              Delivery by{" "}
                              {cartData?.serviceabilityDetails?.deliveryPromise
                                ?.estimate_date &&
                                moment(
                                  cartData?.serviceabilityDetails
                                    ?.deliveryPromise?.estimate_date
                                ).format("MMMM DD, YYYY")}
                            </span>
                          ) : (
                            <span>
                              {
                                cartData?.serviceabilityDetails?.deliveryPromise
                                  ?.estimate_date
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col
                      xl={12}
                      lg={12}
                      md={12}
                      sm={24}
                      xs={24}
                      className={s.switch_btn}
                    >
                      <Radio.Group
                        onChange={(e) => {
                          console.log("setMode", e);
                          changeMode(e);
                        }}
                        value={mode}
                        style={{ display: "flex", columnGap: 10 }}
                      >
                        {setting?.paymentPolicy?.acceptingMode === "ANY" ||
                        !setting?.paymentPolicy?.acceptingMode ? (
                          <>
                            <Radio
                              value={"COD"}
                              className={
                                mode === "COD"
                                  ? `${s.radio}`
                                  : `${s.radio_disactive}`
                              }
                            >
                              <div className={s.radio_wrapper}>
                                <Image
                                  src={CODpayImg}
                                  height={25}
                                  width={25}
                                  alt=""
                                />
                                <span style={{ paddingLeft: 10 }}>COD</span>
                              </div>
                            </Radio>
                            <Radio
                              className={
                                mode === "ONLINE"
                                  ? `${s.radio}`
                                  : `${s.radio_disactive}`
                              }
                              value={"ONLINE"}
                            >
                              <div className={s.radio_wrapper}>
                                <Image {...OnlinePayImg} alt="" />
                                <span style={{ paddingLeft: 10 }}>ONLINE</span>
                              </div>
                            </Radio>
                          </>
                        ) : setting?.paymentPolicy?.acceptingMode === "COD" ? (
                          <Radio
                            className={
                              mode === "COD"
                                ? `${s.radio}`
                                : `${s.radio_disactive}`
                            }
                            value={"COD"}
                          >
                            <div className={s.radio_wrapper}>
                              <Image {...CODpayImg} alt="" />{" "}
                              <span style={{ paddingLeft: 10 }}>COD</span>
                            </div>
                          </Radio>
                        ) : (
                          <Radio
                            className={
                              mode === "ONLINE"
                                ? `${s.radio}`
                                : `${s.radio_disactive}`
                            }
                            value={"ONLINE"}
                          >
                            <div className={s.radio_wrapper}>
                              <Image {...OnlinePayImg} alt="" />{" "}
                              <span style={{ paddingLeft: 10 }}>ONLINE</span>
                            </div>
                          </Radio>
                        )}
                      </Radio.Group>
                    </Col>
                  </Row>
                )}
              {cartData?.lineItemDetails.length > 0 ? (
                <>
                  {/* <Row className={s.cart_card_heading}>
                    <Col xl={11} lg={11}>
                      Product
                    </Col>
                    <Col xl={4} lg={4}>
                      Price{" "}
                      <span
                        style={{ fontSize: "8px", color: "gray", opacity: 0.8 }}
                      >
                        (Exclusive of GST)
                      </span>
                    </Col>
                    <Col xl={5} lg={5}>
                      Quantity
                    </Col>
                    <Col xl={4} lg={4}>
                      Subtotal
                    </Col>
                  </Row> */}

                  <Row className={s.cart_card_wrapper}>
                    {cartData?.lineItemDetails?.map((item, index) => {
                      return (
                        <Col
                          xl={24}
                          lg={24}
                          md={24}
                          sm={24}
                          xs={24}
                          key={index}
                        >
                          <CartCard
                            mode={
                              cartData?.serviceabilityDetails?.name === "ecom"
                                ? mode
                                : mode
                            }
                            details={item}
                            partner={cartData?.serviceabilityDetails?.name}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </>
              ) : (
                <div style={{ marginTop: "30px" }}>
                  <Empty />
                </div>
              )}
              <Row>
                <Link rel="canonical" href="/">
                  <span className={s.continue_shop_btn}>CONTINUE SHOPPING</span>
                </Link>
              </Row>
            </Col>
            {/* ordersummery card */}
            <Col xl={6} lg={6} md={24} sm={24} xs={24}>
              <Card className={s.order_summery}>
                <header>
                  <h4 className={s.uppercase}>Price Details</h4>
                  <Divider />
                </header>
                <section>
                  <span className={s.child_data}>Available Coupons</span>
                  {!cartData?.coupons ? (
                    <div
                      className={s.apply_coupons}
                      onClick={() => {
                        if (!JWT) {
                          router?.push("login-modal");
                        } else {
                          !cartData?.finalPrice
                            ? message.warning("Cart Is Empty..")
                            : setApplyCouponModalOpen(true);
                        }
                      }}
                    >
                      <span
                        className={s.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        <Image {...cupLogo} alt="" width={19} height={19} />
                        <span
                          style={{
                            fontFamily: "Josefin Sans",
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "16px",
                          }}
                        >
                          Apply Coupons
                        </span>
                      </span>
                      <span className={s.price}>
                        <Image {...redarrow} alt="" />
                      </span>
                    </div>
                  ) : null}
                  {true
                    ? (cartData?.coupons || []).map((item) => (
                        <div
                          key={item.code}
                          className={s.applyed_coupons}
                          // onClick={() => setApplyCouponModalOpen(true)}
                        >
                          <div>
                            <span className={s.code}>{item?.code}</span> -
                            <span className={s.status_text}>
                              Applied successfully
                            </span>
                          </div>
                          <div className={s.saved_ammount}>
                            {cartData?.deductions?.find(
                              (i) => i.name === item.code
                            )?.value &&
                              `You saved additional ₹ ${
                                cartData?.deductions?.find(
                                  (i) => i.name === item.code
                                )?.value
                              }`}
                          </div>
                          <div
                            className={s.remove_coupon}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch({
                                type: "REMOVE_COUPON",
                                pm:
                                  cartData?.serviceabilityDetails?.name ===
                                  "ecom"
                                    ? mode
                                    : null,
                              });
                            }}
                          >
                            <Image {...redcross} alt="" /> Remove
                          </div>
                        </div>
                      ))
                    : null}
                  <div className={s.list}>
                    <span className={s.label}>
                      Subtotal <span>{cartData?.totalItems} items</span>
                    </span>
                    <span className={s.price}>₹{cartData?.price}</span>
                  </div>
                  {console.log(
                    "lllllll",
                    cartData?.deductions
                      ?.filter((item) => item?.name == "GST")
                      ?.at(0)?.value
                  )}
                  {cartData?.deductions
                    ?.filter((item) => item?.name !== "GST")
                    ?.map((i) => (
                      <div
                        key={i.name}
                        className={s.list}
                        style={{ color: "#3BB77E" }}
                      >
                        <span className={s.label}>
                          {"description" in i
                            ? "Discount"
                            : i?.name == "Platform discount"
                            ? "Discount"
                            : i?.name}
                        </span>
                        <span className={s.price}>
                          -₹{(+i?.value)?.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  {cartData?.additionalCharges
                    ?.filter(
                      (item) =>
                        item?.name !== "GST" &&
                        item?.name !== "delivery_cost_details"
                    )
                    ?.map((i) => (
                      <div key={i.name} className={s.list}>
                        <span className={s.label}>{i.name}</span>
                        <span className={s.price}>
                          {cartData?.lineItemDetails?.length > 0
                            ? `₹${+i?.value}`
                            : "₹0"}{" "}
                          {freeShiping?.seller?.isFreeShipping &&
                            freeShiping?.partner?.deliveryPromise
                              ?.delivery_charge !== 0 && (
                              <s>
                                ₹
                                {
                                  freeShiping?.partner?.deliveryPromise
                                    ?.delivery_charge
                                }
                              </s>
                            )}
                        </span>
                      </div>
                    ))}
                  {gstData?.length > 0 && (
                    <div className={s.list}>
                      <span className={s.label}>{gstData?.at(0)?.name}</span>
                      {cartData?.deductions
                        ?.filter((item) => item?.name == "GST")
                        ?.at(0)
                        ?.value?.toFixed(2) ? (
                        <span className={s.price}>
                          ₹
                          {(
                            (+gstData?.at(0)?.value)?.toFixed(2) -
                            cartData?.deductions
                              ?.filter((item) => item?.name == "GST")
                              ?.at(0)
                              ?.value?.toFixed(2)
                          )?.toFixed(2)}
                        </span>
                      ) : (
                        <span className={s.price}>
                          ₹{(+gstData?.at(0)?.value)?.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                  <Divider className={s.divider} />
                  <div className={s.total_amount}>
                    <span className={s.label}>Grand Total</span>
                    <span className={s.price}>
                      {cartData?.lineItemDetails?.length > 0
                        ? `₹${cartData?.finalPrice?.toFixed(2)}`
                        : "₹0"}
                    </span>
                  </div>
                  {(cartData?.finalPrice >
                    +setting?.paymentPolicy?.acceptanceLimit &&
                    setting?.paymentPolicy?.acceptanceLimit !== null &&
                    (payMode === "COD" || mode === "COD")) ||
                  (cartData?.serviceabilityDetails?.name === "ecom" &&
                    cartData?.finalPrice >= 50000) ||
                  (cartData?.serviceabilityDetails?.name !== "ecom" &&
                    cartData?.finalPrice >= 10000 &&
                    mode === "COD") ? (
                    <span className={s.cod_limit}>
                      <Image {...alert} style={{ fontSize: "12px" }} alt="" />{" "}
                      {cartData?.serviceabilityDetails?.name === "ecom" &&
                      cartData?.finalPrice >= 50000 ? (
                        <span>{mode} not Available (Max amount ₹50,000)</span>
                      ) : (
                        <span>
                          {" "}
                          {mode} not Available (Max amount ₹
                          {setting?.paymentPolicy?.acceptanceLimit ||
                          setting?.paymentPolicy?.acceptanceLimit == 0
                            ? setting?.paymentPolicy?.acceptanceLimit
                            : cartData?.serviceabilityDetails?.name === "ecom"
                            ? 50000
                            : 10000}
                          )
                        </span>
                      )}
                    </span>
                  ) : (
                    ""
                  )}
                </section>
                <footer>
                  {JWT ? (
                    <Button
                      onClick={() => {
                        cartData?.addressDetails?.addressName
                          ? paymentClick()
                          : router.push("/address");
                      }}
                      type="primary"
                      disabled={
                        (cartData?.serviceabilityDetails?.name === "ecom" &&
                          cartData?.finalPrice >= 50000) ||
                        (cartData?.serviceabilityDetails?.name !== "ecom" &&
                          mode === "COD" &&
                          cartData?.finalPrice > 10000) ||
                        payLoader ||
                        (setting?.paymentPolicy?.acceptanceLimit == 0 &&
                          mode === "COD") ||
                        !cartData?.serviceabilityDetails?.feasible ||
                        disablePay ||
                        !cartData?.finalPrice ||
                        !setting?.isStoreOpened ||
                        cartData?.lineItemDetails?.length == 0 ||
                        (cartData?.finalPrice >
                          +setting?.paymentPolicy?.acceptanceLimit &&
                          setting?.paymentPolicy?.acceptanceLimit !== null &&
                          (payMode === "COD" || mode === "COD"))
                      }
                      style={
                        (cartData?.serviceabilityDetails?.name === "ecom" &&
                          cartData?.finalPrice >= 50000) ||
                        (cartData?.serviceabilityDetails?.name !== "ecom" &&
                          mode === "COD" &&
                          cartData?.finalPrice > 10000) ||
                        payLoader ||
                        (setting?.paymentPolicy?.acceptanceLimit == 0 &&
                          mode === "COD") ||
                        !cartData?.serviceabilityDetails?.feasible ||
                        disablePay ||
                        !cartData?.finalPrice ||
                        !setting?.isStoreOpened ||
                        cartData?.lineItemDetails?.length == 0 ||
                        (cartData?.finalPrice >
                          +setting?.paymentPolicy?.acceptanceLimit &&
                          setting?.paymentPolicy?.acceptanceLimit !== null &&
                          (payMode === "COD" || mode === "COD"))
                          ? {
                              background: "lightgray",
                              borderColor: "lightgray",
                            }
                          : { background: "black" }
                      }
                      className={
                        !disablePay ? s.pay_now_btn : s.pay_now_disable_btn
                      }
                    >
                      {!payLoader ? (
                        "CHECKOUT"
                      ) : (
                        <Spin
                          indicator={
                            <LoadingOutlined
                              style={{ fontSize: 24, color: "white" }}
                              spin
                            />
                          }
                        />
                      )}
                    </Button>
                  ) : (
                    <Button
                      style={{
                        color: "red",
                        opacity: 0.6,
                        fontSize: 12,
                      }}
                      className={s.pay_now_disable_btn}
                      onClick={() => router.push("/login-modal")}
                    >
                      Please Login to checkout
                    </Button>
                  )}
                </footer>
              </Card>
            </Col>
          </Row>
        </section>
      </div>
      {priceUpdate && (
        <Modal
          maskStyle={{ backdropFilter: "blur(5px)" }}
          maskClosable={false}
          open={priceUpdate}
          closeIcon={<></>}
          footer={null}
        >
          <h3 style={{ opacity: 0.8, textAlign: "center" }}>
            Cart Price got updated by seller just a moment ago. do you want to
            proceed with checkout ?
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              boxShadow: "0 0 5px gray",
              borderRadius: "2px",
              padding: 20,
            }}
          >
            <div>
              <b>₹ {cartData?.finalPrice?.toFixed(2)}</b>
            </div>
            <div style={{ display: "flex", columnGap: 10 }}>
              <Button onClick={() => setPriceUpdate(false)}>No</Button>
              <Button
                style={{ backgroundColor: "#01C0CC", color: "white" }}
                onClick={() => {
                  mode === "COD" ? codClick() : onlinePaymentClick();
                }}
              >
                YES
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {disabledProInCart && (
        <Modal
          maskStyle={{ backdropFilter: "blur(5px)" }}
          maskClosable={false}
          open={disabledProInCart}
          closeIcon={<></>}
          footer={null}
        >
          <h3 style={{ textAlign: "center" }}>
            we noticed some cart products got disabled from seller just a moment
            ago, and we removed those products from cart..!
          </h3>
          <div
            style={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => setDisabledProInCart(false)}
          >
            <Button
              style={{
                width: "50%",
                margin: "10px auto",
                backgroundColor: "#01C0CC",
                color: "white",
              }}
            >
              OK
            </Button>
          </div>
        </Modal>
      )}
      {applyCouponModalOpen && (
        <ApplyCouponModal
          openModal={applyCouponModalOpen}
          mode={cartData?.serviceabilityDetails?.name === "ecom" ? mode : mode}
          setApplyCouponModalOpen={setApplyCouponModalOpen}
          setApplyedCoupon={setApplyedCoupon}
          applyedCoupon={applyedCoupon}
          cartPrice={cartData?.finalPrice?.toFixed(2)}
        />
      )}
      {
        <Modal
          maskStyle={{ backdropFilter: "blur(10px)" }}
          maskClosable={false}
          // style={{ fontFamily: "Josefin Sans" }}
          title="Confirm?"
          centered
          open={paymentConfirm}
          onCancel={() => setPaymentConfirm(false)}
          footer={null}
          closeIcon={
            <div className={s.close_icon}>
              <Image {...CloseIcon} alt="close-icon" />
            </div>
          }
        >
          <div className={s.confirm_modal_text}>
            Are you sure you want to place this COD order?
          </div>
          <div className={s.confirm_btn_wrapper}>
            <button
              className={s.cancel_btn}
              onClick={() => setPaymentConfirm(false)}
            >
              CANCEL
            </button>
            <button
              className={s.confirm_btn}
              onClick={() => {
                setPaymentConfirm(false);
                codClick();
              }}
            >
              CONFIRM
            </button>
          </div>
        </Modal>
      }
    </>
  );
};

export default MyCart;
