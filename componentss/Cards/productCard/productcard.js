import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./productcard.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "antd";
import PlaceholderImg from "../../../public/assets/productCardImg/product-img-ph.jpg";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import veg from "../../../public/veg.png";
import nonVeg from "../../../public/non-veg.png";
import addToCart from "../../../public/add_cart.svg";
function ProductCard({
  data,
  isLast,
  newLimit,
  showingLength,
  totalCount,
  relted,
}) {
  const {
    id,
    name,
    media,
    attributes,
    hasOptions,
    variants,
    wishlist,
    inventoryData,
    slug,
    minPrice,
    maxDiscount,
    strikePrice,
    trackInventory,
  } = data;


  bodyStyle: {
    marginTop: '30px';
    boxShadow: '0px 1px 10px rgba(0,1,1,0.15)';
    backgroundColor: '#ffffff';
    borderStyle: 'solid';
    outline: 'none';
    width: '100%';
  }

  const cardRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();
  let JWT = cookies?.get("accessToken");
  const cartData = useSelector((state) => state?.allCart?.result);
  const setting = useSelector((s) => s?.settingData?.result?.settings?.at(0));
  const cartId = useSelector((s) => s.allStore?.result?.cart?.id);

  const [varQuantity, setVarQuantity] = useState(0);
  const [addFav, setAddFav] = useState(wishlist && wishlist.length > 0);

  useEffect(() => {
    if (!cardRef?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        showingLength < totalCount && newLimit();
        observer.unobserve(entry.target);
      }
    });
    observer.observe(cardRef.current);
  }, [isLast]);

  const quentityproduct = variants?.map((e) => e?.inventoryData[0]?.quantity);

  const addToCard = useCallback(
    async (e, price, btn) => {
      e.stopPropagation();
      setVarQuantity(varQuantity + 1);
      if (variants.length > 0) {
        router.push(`/product-details/${slug}`);
      } else {
        // fbq("track", "AddToCart", {
        //   value: `my-cart_${price}__saaF1`,
        //   currency: "INR",
        // });
        dispatch({
          type: "UPDATE_CART_PRODUCT",
          data: {
            productId: id,
            quantity: 1,
            cartId: JWT ? cartId : localStorage.getItem("cartId"),
          },
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
        });
        setTimeout(() => {
          router.push("/my-cart");
        }, 500);
      }
    },
    [setting?.paymentPolicy?.acceptingMode]
  );

  const addToWishlist = (e) => {
    e.stopPropagation();
    if (!JWT) {
      router.push("/login-modal");
    } else {
      dispatch({
        type: "ADD_PRODUCTS_TO_WISHLIST",
        productId: id,
      });
      setAddFav(!addFav);
    }
  };

  const removeFromWishlist = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch({ type: "REMOVE_PRODUCT_FROM_WISHLIST", productId: id });
      setAddFav(!addFav);
    },
    [addFav, dispatch, id]
  );

  return (
    <>
      <div
        // style={relted ? { height: "400px" } : {}}
        className={styles.card}
        onClick={(e) => {
          e.stopPropagation();
          router.push({
            pathname: `/product-details/${slug}`,
          });
        }}
        ref={cardRef}
      >
        <div className={styles.wishlist_icon}>
          {addFav ? (
            <>
              <HeartFilled
                style={{ fontSize: "18px", color: "red" }}
                onClick={(e) => removeFromWishlist(e)}
              />
              <span
              className={styles.wish}
                style={{ fontSize: "10px", color: "#000000", }}
                onClick={(e) => removeFromWishlist(e)}
              >
                WISHLIST
              </span>
            </>
          ) : (
            <>
              <HeartOutlined
                className={styles.wishlist_before}
                style={{ fontSize: "18px", color: "#000000" }}
                onClick={(e) => addToWishlist(e)}
              />
              <span
                style={{ fontSize: "10px", color: "#000000" }}
                onClick={(e) => addToWishlist(e)}
              >
                WISHLIST
              </span>
            </>
          )}
          {attributes?.foodOption && (
            <div style={{ position: "relative", top: "-20px", marginLeft: 5 }}>
              {attributes?.foodOption === "veg" ? (
                <Image {...veg} alt="veg" loading="lazy" />
              ) : (
                <Image {...nonVeg} alt="nonveg" loading="lazy" />
              )}
            </div>
          )}
        </div>

        {media.length < 1 ? (
          <div className={styles.img_wrapper}>
            <img
              unoptimized
              height={"100%"}
              width={"100%"}
              className={styles.card_img}
              src={PlaceholderImg}
              alt="placeholder-image"
              loading="lazy"
              layout="fixed" objectFit={'cover'} style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <>
            {media?.slice(0, 1)?.map((item, index) => (
              <div key={index} className={styles.img_wrapper}>
                <img
                  unoptimized
                  height="100%"
                  width="100%"
                  className={styles.card_img}
                  src={item?.url ?? PlaceholderImg}
                  objectFit="cover"
                  objectPosition="top"
                  alt="placeholder-image"
                  loading="lazy"
                />
              </div>
            ))}
          </>
        )}
      </div>
      <h1 className={styles.card_title}>
        {name ?? <span style={{ opacity: 0 }}>.</span>}
      </h1>

      <div className={styles.card_price}>
        <div className={styles.card_price_left}>
          <div className={styles.card_discount_price}>
            ₹{Math.round(minPrice)}
          </div>
          {
            <div>
              {Math.round(strikePrice) !== Math.round(minPrice) &&
                strikePrice !== 0 && (
                  <s className={styles.card_actual_price}>
                    {Math.round(strikePrice)}
                  </s>
                )}
            </div>
          }
          {maxDiscount !== 0 && maxDiscount && (
            <div className={styles.price_off}>
              {`${Math.round(maxDiscount)}% off`}
            </div>
          )}
        </div>
        <div className={styles.product_status}>
          {(inventoryData[0]?.quantity > 0 && variants.length === 0) ||
            (variants.length > 0 &&
              variants.some((ele) => ele?.inventoryData[0]?.quantity > 0)) ||
            !trackInventory ? (
            "In Stock"
          ) : (
            <span style={{ color: "red" }}>Out of Stock</span>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
