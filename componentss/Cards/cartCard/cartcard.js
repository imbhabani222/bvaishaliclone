import { Button, Col, message, Rate, Row } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./cartcard.module.scss";
import Img from "../../../public/assets/productCardImg/product-img-ph.jpg";
import minus from "../../../public/assets/homeCatImgs/minus.svg";
import plus from "../../../public/assets/homeCatImgs/plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { UPDATE_CART_PRODUCT } from "../../../redux/cartProducts/actions/actions";
import Cookies from "universal-cookie";
import ButtonGroup from "antd/lib/button/button-group";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CartCard = ({ details: data, wholeCart, partner, mode }) => {
  const router = useRouter();
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data]);

  const setting = useSelector((s) => s?.settingData?.result?.settings?.at(0));
  const increaseQuantity = (e) => {
    e.stopPropagation();
    dispatch({
      type: UPDATE_CART_PRODUCT,
      data: {
        productId: details?.productId,
        quantity: 1,
        variantId: details?.variantId,
        cartId: JWT ? details?.sourceId : localStorage.getItem("cartId"),
      },
      pm: mode,
    });
  };
  const decreaseQuantity = (e) => {
    e.stopPropagation();
    dispatch({
      type: UPDATE_CART_PRODUCT,
      data: {
        productId: details?.productId,
        quantity: -1,
        variantId: details?.variantId,
        cartId: JWT ? details?.sourceId : localStorage.getItem("cartId"),
      },
      pm: mode,
    });
  };
  const totalDeductions =
    details?.deductions?.reduce(
      (i, j) => ({
        perItemValue: +i.perItemValue + +j.perItemValue,
      }),
      { perItemValue: 0 }
    )?.perItemValue || 0;

  console.log(details?.productName);
  return (
    <div className={styles.cart_card_container}>
      <Row className={styles.cart_card} gutter={[12, 12]}>
        <Col
          xl={3}
          lg={3}
          md={24}
          sm={24}
          xs={24}
          className={styles.card_img_wrapper}
        >
          <Image
            src={details?.productDetails?.media[0]?.url ?? Img}
            alt={details?.productName}
            height={100}
            width={100}
            className={styles.cart_img}
            loading="lazy"
          />
        </Col>
        <Col
          xl={17}
          lg={17}
          md={24}
          sm={24}
          xs={24}
          className={styles.card_details_wrapper}
        >
          {details?.productName?.split("|")?.map((i, index) => (
            <>
              <div>
                <Row
                  className={styles.heading}
                  key={index}
                  style={
                    index !== 0 && {
                      fontSize: 13,
                      fontWeight: 400,
                    }
                  }
                >
                  {i}
                </Row>
              </div>
              <div className={styles.qty_btn_wrapper}>
                Qty
                <ButtonGroup className={styles.qty_btn}>
                  <Button
                    className={styles.qty_click_btn}
                    onClick={(e) => decreaseQuantity(e)}
                    icon={<MinusOutlined />}
                  ></Button>
                  <Button className={styles.qty_calc_btn}>
                    {details?.quantity}
                  </Button>
                  <Button
                    className={styles.qty_click_btn}
                    onClick={(e) => {
                      details?.productDetails?.trackInventory === false ||
                      (details?.productDetails?.inventoryData[0]?.quantity !==
                        details?.quantity &&
                        details?.quantity !==
                          details?.variantDetails?.inventoryData[0]?.quantity)
                        ? increaseQuantity(e)
                        : message.warning(`Quantity Unavailable!`);
                    }}
                    icon={<PlusOutlined />}
                  ></Button>
                </ButtonGroup>
              </div>
            </>
          ))}
        </Col>
        {/* <Col
          xl={5}
          lg={5}
          md={24}
          sm={24}
          xs={24}
          className={styles.price_wrapper}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <span className={styles.price}>
              {`₹ `}
              {(details?.perItemPrice - totalDeductions)?.toFixed(2)}
              <span style={{ visibility: "hidden" }}>0</span>
            </span>
            
          </div>
        </Col> */}
        {/* <Col
          xl={5}
          lg={5}
          md={24}
          sm={12}
          xs={12}
          className={styles.qty_btn_wrapper}
        >
          
        </Col> */}
        <Col
          xl={3}
          lg={3}
          md={24}
          sm={12}
          xs={12}
          className={styles.sub_total_wrapper}
        >
          <div>
            <div className={styles.sub_total_price}>
              ₹
              {(details?.price - details?.quantity * totalDeductions)?.toFixed(
                2
              )}
            </div>
            <div>
              {details?.deductions?.length !== 0 ? (
                <span>
                  <s>
                    <div className={styles.sub_total_price_crossed}>
                      ₹{details?.perItemPrice}
                    </div>
                  </s>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </Col>
      </Row>
      {/* {setting?.deliveryDetails?.promises?.at(0)?.displayName && */}
      {/* partner !== "ecom" && ( */}
      {/* <div className={styles.delivery_option_wrapper}> */}
      {/* <div className={styles.promise_wrapper}> */}
      {/* <div className={styles.timing}> */}
      {/* {setting?.deliveryDetails?.promises?.at(0)?.displayName} */}
      {/* </div> */}
      {/* <div
              className={styles.change_btn}
              onClick={() => router.push("/my-address")}
            >
              Change
            </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* )} */}
    </div>
  );
};

export default CartCard;
