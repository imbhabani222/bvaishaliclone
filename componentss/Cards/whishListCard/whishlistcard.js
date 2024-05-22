import { Button, Col, message, Rate, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import styles from "./whishlistcard.module.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Img from "../../../public/assets/productCardImg/product-img-ph.jpg";

const WhishListCard = ({ onRemove, data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [addFav, setAddFav] = useState(true);
  const [itemPrice, setItemPrice] = useState(null);
  // const [details, setDetails] = useState({});
  // const [list, setList] = React.useState(props.list);
  const {
    id,
    name: heading,
    rating,
    reviews,
    status,
    inventoryData,
    displayPrice: price,
    sellingPrice: original_price,
    discount,
    size,
    color,
    wishlist,
    variants,
    attributes,
    hasOptions,
    slug,
  } = data;

  const setting = useSelector((s) => s?.settingData?.result?.settings?.at(0));
  const cartData = useSelector((state) => state?.allCart?.result);

  const productQuantity = variants?.map(
    (ele) => ele?.inventoryData[0]?.quantity
  );

  const handelMoveToCart = useCallback(
    (e, price, btn) => {
      e.stopPropagation();
      // try {
      if (variants.length > 0) {
        dispatch({
          type: "REMOVE_PRODUCT_FROM_WISHLIST",
          productId: id,
        });
        router.push(`/product-details/${slug}`);
      } else {
        if (
          data?.trackInventory === false ||
          data?.inventoryData[0]?.quantity > 0
        ) {
          dispatch({
            type: "REMOVE_PRODUCT_FROM_WISHLIST",
            productId: id,
          });
          dispatch({
            type: "UPDATE_CART_PRODUCT",
            data: {
              productId: id,
              quantity: 1,
              pm:
                setting?.paymentPolicy?.acceptingMode === "COD" &&
                cartData?.serviceabilityDetails?.name == "ecom"
                  ? "COD"
                  : (setting?.paymentPolicy?.acceptingMode === "ANY" ||
                      setting?.paymentPolicy?.acceptingMode === "COD") &&
                    cartData?.serviceabilityDetails?.name == "ecom"
                  ? "ONLINE"
                  : setting?.paymentPolicy?.acceptingMode !== "ANY"
                  ? setting?.paymentPolicy?.acceptingMode
                  : "ONLINE",
            },
          });
          setTimeout(() => {
            router.push(`/my-cart`);
          }, 500);
        } else {
          message.warning("Out of stock");
        }
      }
      // } catch {}
    },
    [setting?.paymentPolicy?.acceptingMode]
  );
  // const handelMoveToCart = async () => {
  //   try {
  //     if (variants.length > 0) {
  //       await dispatch({ type: "REMOVE_PRODUCT_FROM_WISHLIST", productId: id });
  //       router.push(`/product-details/${slug}`);
  //     } else {
  //       if (
  //         data?.trackInventory === false ||
  //         data?.inventoryData[0]?.quantity > 0
  //       ) {
  //         await dispatch({
  //           type: "REMOVE_PRODUCT_FROM_WISHLIST",
  //           productId: id,
  //         });
  //         await dispatch({
  //           type: "UPDATE_CART_PRODUCT",
  //           data: {
  //             productId: id,
  //             quantity: 1,
  //           },
  //         });
  //         setTimeout(() => {
  //           router.push(`/my-cart`);
  //         }, 500);
  //       } else {
  //         message.warning("Out of stock");
  //       }
  //     }
  //   } catch {}
  // };
  useEffect(() => {
    data;
    setItemPrice(
      hasOptions
        ? {
            ...data,
            displayPrice: Math.min(
              ...variants?.map((item) => item?.displayPrice)
            ),

            sellingPrice: Math.min(
              ...variants?.map((item) => item?.sellingPrice)
            ),
          }
        : data
    );
  }, [data, hasOptions, variants]);
  console.log(data, "WISHLISTDATA");
  return (
    <Row className={styles.whishlist_card}>
      <div className={styles.mobile_status_whishlist_wrapper}>
        <div className={styles.stock_status}>
          {!data?.hasOptions ? (
            <div style={{ color: "red", fontSize: 12 }}>
              {data?.trackInventory !== false &&
              data?.inventoryData[0]?.quantity == 0 ? (
                <span style={{ color: "red" }}>Out of stock</span>
              ) : (
                <span style={{ color: "#01C0CC" }}>In Stock</span>
              )}
            </div>
          ) : (
            <div style={{ color: "red", fontSize: 12 }}>
              {data?.trackInventory !== false &&
              (data?.inventoryData[0]?.quantity == 0 ||
                !productQuantity.some((ele) => ele > 0)) ? (
                <span style={{ color: "red" }}>Out of stock</span>
              ) : (
                <span style={{ color: "#01C0CC" }}>In Stock</span>
              )}
            </div>
          )}
        </div>
        <div className={styles.mobile_whishlist}>
          {wishlist?.length > 0 && addFav ? (
            <HeartFilled
              style={{ fontSize: "16px", color: "red" }}
              onClick={() => onRemove(id)}
            />
          ) : (
            <HeartOutlined style={{ fontSize: "16px" }} />
          )}
        </div>
      </div>
      <Col xl={2} sm={24} xs={24} className={styles.card_img_wrapper}>
        <Image
          src={data?.media[0]?.url ?? Img}
          width={"100%"}
          height={"100%"}
          objectFit="contain"
          alt=""
        />
      </Col>
      <Col xl={19} sm={24} xs={24} className={styles.card_details_wrapper}>
        <Row className={styles.whishlist_card_heading}>{heading}</Row>
        {/* <Row className={styles.window_stock_status}>
          {!data?.hasOptions ? (
            <div className={styles.product_status}>
              {data?.trackInventory !== false &&
              data?.inventoryData[0]?.quantity == 0 ? (
                <span style={{ color: "red" }}>Out of stock</span>
              ) : (
                "In Stock"
              )}
            </div>
          ) : (
            <div className={styles.product_status}>
              {data?.trackInventory !== false &&
              (data?.inventoryData[0]?.quantity == 0 ||
                !productQuantity.some((ele) => ele > 0)) ? (
                <span style={{ color: "red" }}>Out of stock</span>
              ) : (
                "In Stock"
              )}
            </div>
          )}
        </Row> */}
        <Row className={styles.status}>{status}</Row>
        <Row className={styles.price_wrapper}>
          <div
            style={itemPrice?.displayPrice?.length > 5 ? { color: "red" } : {}}
            className={styles.whishlist_card_price}
          >
            {/* <span className={styles.price_label}>Price :</span> */}₹
            {itemPrice?.displayPrice.toFixed(0)}
          </div>
          {itemPrice?.displayPrice !== itemPrice?.sellingPrice ? (
            <s className={styles.whishlist_card_original_price}>
              ₹ {itemPrice?.sellingPrice?.toFixed(0)}
            </s>
          ) : (
            ""
          )}

          <div className={styles.whishlist_card_discount}>
            {itemPrice?.variants[0]?.attributes[0]?.value !== undefined &&
            itemPrice?.variants[0]?.attributes[0]?.value > 0
              ? `(${itemPrice?.variants[0]?.attributes[0]?.value}% off)`
              : " "}
          </div>
        </Row>
        <Row className={styles.including_tax_text}>
          (Inclusive of all taxes)
        </Row>
      </Col>
      <Col xl={3} className={styles.btn_btn_warapper}>
        <div className={styles.heart_icon}>
          {wishlist?.length > 0 && addFav ? (
            <HeartFilled
              style={{ fontSize: "16px", color: "red" }}
              onClick={() => onRemove(id)}
            />
          ) : (
            <HeartOutlined style={{ fontSize: "16px" }} />
          )}
        </div>
        <Button
          className={
            inventoryData[0]?.quantity > 0 ||
            productQuantity.some((ele) => ele > 0) ||
            data?.trackInventory === false
              ? styles.btn
              : styles.disable_btn
          }
          disabled={
            inventoryData[0]?.quantity > 0 ||
            productQuantity.some((ele) => ele > 0) ||
            data?.trackInventory === false
              ? false
              : true
          }
          onClick={(e) =>
            handelMoveToCart(e, itemPrice?.displayPrice.toFixed(0))
          }
        >
          MOVE TO CART
        </Button>
      </Col>
    </Row>
  );
};

export default WhishListCard;
