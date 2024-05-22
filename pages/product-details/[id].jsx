import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "../../redux/axios";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Button,
  message,
  Divider,
  Typography,
  Modal,
  Breadcrumb,
  Spin,
  Skeleton,
} from "antd";
import DesignProcess from "../../componentss/ProductDetails/DesignProcess/designprocess";
import DesignFact from "../../componentss/ProductDetails/DesignFacts/designfact";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./index.module.scss";
// import DeliveryImg from "../../../../public/assets/policys/shipping.svg"
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolderImg from "../../public/assets/productCardImg/product-img-ph.jpg";
import shareIcon from "../../public/assets/Vector.png";
import Head from "next/head";
import LeftArrow from "../../public/assets/subBanner/left-arrow.svg";
import RightArrow from "../../public/assets/subBanner/right-arrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  HeartFilled,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import ProductCard from "../../componentss/Cards/productCard/productcard";
import minus from "../../public/assets/homeCatImgs/minus.svg";
import plus from "../../public/assets/homeCatImgs/plus.svg";
import CodImg from "../../public/assets/payment/cod.svg";
import OnlinePayImg from "../../public/assets/payment/onlinepayment.svg";
import Cookies from "universal-cookie";
import { FETCH_ALL_CART_PRODUCTS } from "../../redux/cartProducts/actions/actions";
import { FETCH_ALL_ADDRESS } from "../../redux/address/actions/actions";
import BASE_URL from "../../constants/textUtility/textenv";
// import Geocode from "react-geocode"
// import { useLoadScript } from "@react-google-maps/api"
import Error from "../../componentss/Error";
import veg from "../../public/veg.png";
import nonVeg from "../../public/non-veg.png";
import ImageOne from "../../public/staticsAssets/Image1.png";
import ImageThree from "../../public/staticsAssets/Image3.png";

// const loadData = {
//   id: "google-map-script",
//   googleMapsApiKey: "AIzaSyCsvXDft5BRwE1TiqtbFHyX2xoKWE3EC1c",
//   libraries: ["places"],
// }

const ProductDetails = (slug) => {
  const cardRef = useRef();
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

  const { id } = router.query;
  console.log(id);
  let responsiveSlide = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    850: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1800: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };
  const [selectedTab, setselectedTab] = useState("Product Details");
  const [productDetailsData, setProductDetailsData] = useState();
  const cart = useSelector(
    (state) => state?.allStore?.result?.user?.cart || null
  );
  const itemColorArr = useSelector(
    (state) => state?.allCart?.result?.lineItemDetails || null
  );
  const cartData = useSelector((state) => state?.allCart?.result);
  const setting = useSelector((s) => s?.settingData?.result?.settings?.at(0));
  const addressFetch = useSelector((s) => s?.allAddress);
  const addressData = useSelector((s) =>
    s?.allAddress?.result?.address
      ?.filter((item) => {
        return item?.addressDetails?.isDefault;
      })
      ?.at(0)
  );
  const cartId = useSelector((s) => s.allStore?.result?.cart?.id);

  const user = useSelector((state) => state?.allStore?.result?.user || null);
  const [variantSelection, setSelection] = useState({});
  const [variantsToShow, setVariants] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [loader, showLoader] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [colorCode, setColorCode] = useState(null);
  const [addFav, setAddFav] = useState(false);
  const dispatch = useDispatch();
  const [paymentModal, setPaymentModal] = useState(false);
  const [disableAddToCart, setDisableAddToCart] = useState(false);
  const [dsbl, setDsbl] = useState(false);

  const [pincode, setPincode] = useState();
  const [serviceable, setServiceable] = useState("check");
  const [fLoader, setFloader] = useState(false);

  const [ourDesignImgs, setOurDesignProcess] = useState([]);
  const [desImages, setDesImages] = useState([]);
  const [desSecondImgs, setDesSecondImgs] = useState([]);
  const [desThirdImgs, setdesThirdImgs] = useState([]);

  const codClick = () => {
    message.warning("COD not implemented");
  };

  const onlinePaymentClick = () => {
    let url = `${BASE_URL}/store/api/v1/cart/checkout`;
    let JWT = cookies?.get("accessToken");
    axios
      .post(url, {}, { headers: { Authorization: `Bearer ${JWT}` } })
      .then((res) => {
        window.location.replace(res?.data?.url);
      })
      .catch((err) => console.log("PAYMENT_ERR--", err));
  };

  useEffect(() => {
    if (cart?.id && !cart && JWT) {
      dispatch({ type: FETCH_ALL_CART_PRODUCTS, cartId: cart?.id });
    }
  }, [cart?.id, dispatch]);

  useEffect(() => {
    if (!JWT && localStorage.getItem("cartId")) {
      dispatch({
        type: FETCH_ALL_CART_PRODUCTS,
        cartId: localStorage.getItem("cartId"),
      });
    }
  }, []);

  useEffect(() => {
    if (productDetailsData?.id) {
      showLoader(false);
      if (
        productDetailsData &&
        (productDetailsData?.hasOptions ||
          productDetailsData?.variants?.length > 0)
      ) {
        let minPriceVar = productDetailsData?.variants?.sort(
          (a, b) => a.sellingPrice - b.sellingPrice
        );
        const _variant = minPriceVar[0];
        setVariantData(_variant);
        const temp = productDetailsData?.options?.map((item) => item?.values);
        console.log("temp", _variant);
        if (temp.length >= 1) {
          temp[1] = productDetailsData?.variants
            ?.map((item) => {
              const m = item?.variantCode?.split("#");
              if (m[0] === _variant?.variantCode?.split("#")[0]) {
                return m[1] || "";
              } else {
                return null;
              }
            })
            .filter((item) => item);
          setVariants([...temp]);
        }
        const selection = _variant?.variantCode
          .split("#")
          .map((i, index) => ({
            name: productDetailsData?.options[index]?.option,
            value: i,
          }))
          .reduce(
            (obj, item) => (
              (obj[item?.name] = item?.value?.includes(":")
                ? item?.value?.split(":")?.at(-1)
                : item?.value),
              obj
            ),
            {}
          );
        setSelection(selection);
      } else {
        setVariantData(productDetailsData);
      }
      if (productDetailsData?.wishlist?.length > 0) {
        setAddFav(true);
      }
      if (JWT?.length > 0 && !addressData && addressFetch?.fetching) {
        dispatch({ type: FETCH_ALL_ADDRESS });
      }
    }
  }, [dispatch, productDetailsData, addressData, JWT?.length]);

  useEffect(() => {
    const _opts = Object?.keys(variantSelection);
    if (_opts?.length <= variantsToShow?.length) {
      const code = _opts?.map((item) => variantSelection[item])?.join("#");
      console.log("code333", code);

      let getVarCode = productDetailsData?.variants?.map(
        (imz) => imz?.variantCode
      );

      let modifyClororCode = getVarCode?.map((item, index) => {
        if (item?.includes(":")) {
          let splitCode = item?.split(":");
          console.log("splitCode", splitCode);
          let _colorcodes = splitCode?.filter((item) => item?.includes("#"));
          console.log("fffff");
          let modify =
            _colorcodes
              ?.map((_item, _index) => _item?.split("#")?.at(0))
              ?.join("#") +
            `${_colorcodes?.length !== 0 ? "#" : ""}` +
            splitCode?.at(-1);
          console.log("splitCode ", _colorcodes);
          return modify;
        }
      });

      console.log("modifyClororCode", modifyClororCode);
      let indx = modifyClororCode?.findIndex(
        (imf) => imf?.toLowerCase() === code?.toLowerCase()
      );

      const findVarImp = productDetailsData?.variants?.find(
        (itd, inx) => inx === indx
      );

      const findVariant = productDetailsData?.variants?.find(
        (item) =>
          item.variantCode?.toLocaleLowerCase() === code?.toLocaleLowerCase()
      );

      if (
        !findVariant &&
        !findVarImp &&
        productDetailsData?.variants?.length !== 0
      ) {
        setDsbl(true);
      } else {
        setDsbl(false);
      }

      const itemColor = itemColorArr?.find(
        (item) =>
          item?.variantDetails?.name?.split(" / ")?.join("#") === code &&
          item.productId === findVariant?.productId
      );

      const colorCodeImpPro = itemColorArr?.find(
        (ik) => ik?.variantDetails?.id === findVarImp?.id
      );

      const withoutVar = itemColorArr?.filter(
        (item, index) => item?.productId == productDetailsData?.id
      );

      if (
        productDetailsData?.hasOptions ||
        productDetailsData?.variants?.length > 0
      ) {
        setColorCode(itemColor ?? colorCodeImpPro);
      } else {
        setColorCode(withoutVar?.at(0));
      }
      console.log("findVariant", findVariant);
      console.log("findVariant impoer++", findVarImp);
      if (findVariant || findVarImp) {
        setVariantData(findVariant ?? findVarImp);
        if (
          findVariant &&
          findVariant?.inventoryData?.at(0)?.quantity === 0 &&
          productDetailsData?.trackInventory
        ) {
          setDsbl(true);
        }
        if (
          findVarImp &&
          findVarImp?.inventoryData?.at(0)?.quantity === 0 &&
          productDetailsData?.trackInventory
        ) {
          setDsbl(true);
        }
      }
    }
  }, [variantSelection, variantsToShow, productDetailsData, itemColorArr]);

  const increaseQuantity = (e) => {
    e.stopPropagation();
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      data: {
        productId: colorCode?.productId,
        quantity: 1,
        variantId: colorCode?.variantId,
        cartId: JWT ? cart?.id : localStorage.getItem("cartId"),
      },
      pm:
        setting?.paymentPolicy?.acceptingMode === "COD" &&
        cartData?.serviceabilityDetails?.name == "ecom"
          ? "COD"
          : (setting?.paymentPolicy?.acceptingMode === "ANY" ||
              setting?.paymentPolicy?.acceptingMode === "COD") &&
            cartData?.serviceabilityDetails?.name == "ecom"
          ? "ONLINE"
          : "",
    });
  };
  const decreaseQuantity = (e) => {
    e.stopPropagation();
    dispatch({
      type: "UPDATE_CART_PRODUCT",
      data: {
        productId: colorCode?.productId,
        quantity: -1,
        variantId: colorCode?.variantId,
        cartId: JWT ? cart?.id : localStorage.getItem("cartId"),
      },
      pm:
        setting?.paymentPolicy?.acceptingMode === "COD" &&
        cartData?.serviceabilityDetails?.name == "ecom"
          ? "COD"
          : (setting?.paymentPolicy?.acceptingMode === "ANY" ||
              setting?.paymentPolicy?.acceptingMode === "COD") &&
            cartData?.serviceabilityDetails?.name == "ecom"
          ? "ONLINE"
          : "",
    });
  };

  // console.log(product, "products")
  // const { isLoaded } = useLoadScript(loadData)

  let _variantsTemp = variantSelection;
  const selectVariant = (option, value, index) => {
    _variantsTemp = { ..._variantsTemp, [option]: value };
    if (index + 1 < productDetailsData?.options?.length && false) {
      // quick fix
      let temp = variantsToShow;
      temp[index + 1] = productDetailsData?.variants
        ?.map((item) => {
          const m = item.variantCode.split("#");
          if (m[index] === value) {
            return m[index + 1] || "";
          } else {
            return null;
          }
        })
        .filter((item) => item);
      const restOptions = productDetailsData?.options
        .slice(index + 1)
        ?.map((item) => item.option);
      restOptions.forEach((i) => {
        delete _variantsTemp[i];
      });
      setSelection(_variantsTemp); //
      setVariants([...temp]);
      setDisableAddToCart(true);
    } else {
      setSelection(_variantsTemp);
      setDisableAddToCart(false);
    }
  };

  const addToCarts = useCallback(
    async (e, item, btn) => {
      e.stopPropagation();
      try {
        if (
          productDetailsData?.hasOptions ||
          productDetailsData?.variants?.length > 0
        ) {
          await dispatch({
            type: "UPDATE_CART_PRODUCT",
            data: {
              productId: variantData.productId,
              variantId: variantData.id,
              quantity: 1,
              cartId: JWT ? cart?.id : localStorage.getItem("cartId"),
              // pm: "ONLINE",
            },
            pm:
              setting?.paymentPolicy?.acceptingMode === "COD" &&
              cartData?.serviceabilityDetails?.name == "ecom"
                ? "COD"
                : (setting?.paymentPolicy?.acceptingMode === "ANY" ||
                    setting?.paymentPolicy?.acceptingMode === "COD") &&
                  cartData?.serviceabilityDetails?.name == "ecom"
                ? "ONLINE"
                : "",
          });
          setTimeout(() => {
            btn === "buy_now" ? router.push("/my-cart") : undefined;
          }, 300);
        } else {
          await dispatch({
            type: "UPDATE_CART_PRODUCT",
            data: {
              productId: productDetailsData?.id,
              quantity: 1,
              cartId: JWT ? cart?.id : localStorage.getItem("cartId"),
            },
            pm:
              setting?.paymentPolicy?.acceptingMode === "COD" &&
              cartData?.serviceabilityDetails?.name == "ecom"
                ? "COD"
                : (setting?.paymentPolicy?.acceptingMode === "ANY" ||
                    setting?.paymentPolicy?.acceptingMode === "COD") &&
                  cartData?.serviceabilityDetails?.name == "ecom"
                ? "ONLINE"
                : "",
          });
          setTimeout(() => {
            btn === "buy_now" ? router.push("/my-cart") : undefined;
          }, 500);
        }
      } catch {}
    },
    [dispatch, variantData?.id, variantData?.productId]
  );
  const buyNow = useCallback(
    (e, item) => {
      productDetailsData?.attributes?.quantity == 0 &&
      productDetailsData?.trackInventory
        ? message.warning("out of stock")
        : colorCode?.quantity > 0
        ? router.push("/my-cart")
        : addToCarts(e, item, "buy_now");
    },
    [
      addToCarts,
      colorCode?.quantity,
      productDetailsData?.attributes?.quantity,
      router,
    ]
  );

  const addToWishlist = useCallback(
    (e, item) => {
      e.stopPropagation();
      if (JWT) {
        setAddFav(true);
        dispatch({
          type: "ADD_PRODUCTS_TO_WISHLIST",
          productId: item?.id,
        });
        // router.push("/whishlist");
        setAddFav(!addFav);
      } else {
        router.push("/login-modal");
      }
    },
    [dispatch]
  );
  const removeFromWishlist = useCallback(
    (item) => {
      // e.stopPropagation();
      dispatch({
        type: "REMOVE_PRODUCT_FROM_WISHLIST",
        productId: item?.id,
      });
      setAddFav(addFav);
    },
    [dispatch]
  );

  // useEffect(() => {
  //   Geocode.setApiKey("AIzaSyCsvXDft5BRwE1TiqtbFHyX2xoKWE3EC1c")
  // }, [])

  // const getPincode = (e) => {
  //   setPincode(e.target.value)
  //   console.log("eeee", e.target.value.length)
  //   if (e.target.value.length !== 6) {
  //     setServiceable("check")
  //   }
  // }

  // const getLatLang = (e) => {
  //   if (pincode?.length < 6) {
  //     e.preventDefault()
  //   } else {
  //     Geocode.fromAddress(pincode).then(
  //       (response) => {
  //         const { lat, lng } = response.results[0].geometry.location
  //         console.log("lat lng", { lat }, { lng })
  //         checkFeasibility(lat, lng)
  //       },
  //       (error) => {
  //         console.error("lat lng err *********", error)
  //         checkFeasibility(1, 1)
  //       }
  //     )
  //   }
  // }

  const checkFeasibility = (lt, lg) => {
    setFloader(true);
    let url = `${BASE_URL}/store/cms/fulfill/get-pin-feasibility?pin=${pincode}&lat=${lt}&long=${lg}`;
    axios
      .get(url)
      .then((res) => {
        console.log("pincode", res);
        if (res?.data?.feasible) {
          setServiceable("true");
        } else {
          setServiceable("false");
        }
        setFloader(false);
      })
      .catch((err) => {
        console.log("pincode err", err);
        setFloader(false);
        setServiceable("check");
      });
  };
  useEffect(() => {
    console.log(productDetailsData, "FFFFFFFFFFFF");
    const getRelatedProducts = () => {
      if (productDetailsData?.id) {
        let url = `${BASE_URL}/store/api/v1/get-related-products/${productDetailsData?.id}`;
        axios
          .get(
            url
            //   , {
            //   headers: {
            //     Authorization: `Bearer ${JWT}`,
            //   },
            // }
          )
          .then((res) => {
            setRelatedProducts(res?.data?.products);
            console.log(res, "RES");
          })
          .catch((err) => console.log("related_err", err));
      }
    };
    console.log("ZZZZZZZZ");
    getRelatedProducts();
  }, [productDetailsData]);

  // console.log(product, "props#")
  useEffect(() => {
    let url = `${BASE_URL}/store/cms/product/seo/${id}`;
    axios
      .get(url)
      .then((res) => {
        // setProductDetailsData(res?.data);
        console.log("res?.data", res?.data);
        setProductDetailsData({
          ...res?.data,
          variants: res?.data.variants?.map((variant) => ({
            ...variant,
            attributes: variant?.attributes?.reduce(
              (obj, item) => (
                (obj[item.name] = item?.value ?? item?.values ?? null), obj
              ),
              {}
            ),
          })),
          attributes: res?.data?.attributes?.reduce(
            (obj, item) => (
              (obj[item.name] = item?.value ?? item?.values ?? null), obj
            ),
            {}
          ),
        });
      })
      .catch((err) => console.log("err", err));
  }, [id, router?.query?.id]);
  console.log("pppppppppppppppppppppp++p", productDetailsData);

  useEffect(() => {
    let desImages = productDetailsData?.attributes?.additionalDescription
      ?.at(1)
      ?.content?.at(0)
      ?.content?.at(0)
      ?.content?.at(0)?.content;
    setDesImages(desImages);
    let desSecondImgs = productDetailsData?.attributes?.additionalDescription
      ?.at(1)
      ?.content?.at(0)
      ?.content?.at(1)
      ?.content?.at(0)?.content;
    setDesSecondImgs(desSecondImgs);
    let desThirdImgs = productDetailsData?.attributes?.additionalDescription
      ?.at(1)
      ?.content?.at(1)
      ?.content?.at(0)?.content;
    setdesThirdImgs(desThirdImgs);
    let designProcessImgs =
      productDetailsData?.attributes?.additionalDescription
        ?.at(3)
        ?.content?.map((item) => item?.content);
    setOurDesignProcess(designProcessImgs);

    let designProcessContent =
      productDetailsData?.attributes?.additionalDescription?.at(4)?.content;
    console.log(
      "aaaaaaaaaaaaaaaa",
      productDetailsData?.attributes?.additionalDescription
      // ?.at(5)
      // ?.content?.at(0)?.content
    );
  }, [productDetailsData]);

  if (!productDetailsData?.slug) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "item",
          height: "80vh",
        }}
      >
        <Skeleton />{" "}
      </div>
    );
  }
  console.log(relatedProducts, "DDDDDD");
  return (
    <>
      <Head>
        <title>{productDetailsData?.name}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={productDetailsData?.description} />
        <meta
          name="og:description"
          content={
            productDetailsData?.attributes?.shortDescription ||
            productDetailsData?.attributes?.description
          }
        />
        <meta property="og:title" content={productDetailsData?.name} />
        <meta
          property="og:image"
          content={productDetailsData?.media?.at(0)?.url}
        />
        <meta property="og:type" content="product" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="fr_FR" />
      </Head>
      <div className={styles.product_list_header}>
        <Row className={styles.bread_crumb}>
          <Breadcrumb>
            <Breadcrumb.Item href=""></Breadcrumb.Item>
            <Breadcrumb.Item href="/">
              <span>Homepage</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className={styles.cat_name}
              onClick={() =>
                router.push(
                  `/product-list?${
                    productDetailsData?.categoryDetails?.at(0)?.id
                  }`
                )
              }
            >
              {productDetailsData?.categoryDetails?.at(0)?.displayName}
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ fontWeight: "400" }}>
              {productDetailsData.name}
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <div>
          {productDetailsData?.media?.length < 1 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e2e2e2",
                height: "600px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 15,
                  cursor: "pointer",
                  color: "#E2E2E2",
                  display: "flex",
                }}
              >
                {addFav && JWT ? (
                  <HeartFilled
                    style={{ fontSize: "18px", color: "red" }}
                    onClick={() => removeFromWishlist(productDetailsData)}
                  />
                ) : (
                  <HeartOutlined
                    onClick={(e) => addToWishlist(e, productDetailsData)}
                    style={{
                      fontSize: "18px",
                      backgroundColor: "white",
                    }}
                  />
                )}
                {console.log("productDetailsData", productDetailsData)}
                {productDetailsData?.attributes?.foodOption && (
                  <div style={{ marginLeft: 3 }}>
                    {productDetailsData?.attributes?.foodOption == "veg" ? (
                      <Image {...veg} alt="" />
                    ) : (
                      <Image {...nonVeg} alt="" />
                    )}
                  </div>
                )}
              </div>
              <Image
                src={PlaceHolderImg}
                alt=""
                height={350}
                width={350}
                objectFit={"cover"}
              />
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              {/* <div className={styles.mobile_wishlist}>
                  {addFav && JWT ? (
                    <HeartFilled
                      style={{ fontSize: "18px", color: "red" }}
                      onClick={() => removeFromWishlist(productDetailsData)}
                    />
                  ) : (
                    <HeartOutlined
                      onClick={(e) => addToWishlist(e, productDetailsData)}
                      style={{
                        fontSize: "18px",
                        backgroundColor: "white",
                      }}
                    />
                  )}
                </div> */}
              <Carousel
                // autoPlay
                showArrows={false}
                infiniteLoop={true}
                showStatus={false}
                // swipeable={true}
                showIndicators={false}
                // renderArrowPrev={(onClickHandler, hasPrev) =>
                //   hasPrev && (
                //     <LeftOutlined
                //       onClick={onClickHandler}
                //       styles={{ width: "40px", height: "40px" }}
                //     />
                //     // <button type="button"  style={{}}>

                //     // </button>
                //   )
                // }
                // renderArrowNext={(onClickHandler, hasNext, label) =>
                //   hasNext && (
                //     <RightOutlined
                //       onClick={onClickHandler}
                //       styles={{ width: "40px", height: "40px" }}
                //     />
                //     // <button type="button"  style={{}}>

                //     // </button>
                //   )
                // }
              >
                {/* {productDetailsData?.media?.map((item, index) => {
                  return (
                    <div key={index} className={styles.abc}>
                      <Image
                        unoptimized
                        src={item?.url}
                        alt={item.alt}
                        width={0}
                        height={0}
                        objectFit="cover"
                      />
                    </div>
                  );
                })} */}
                {/* <div className={styles.abc}>
                  <Image
                    unoptimized
                    src={ImageOne}
                    alt=""
                    width={0}
                    height={0}
                    objectFit="cover"
                  />
                </div>
                <div className={styles.abc}>
                  <Image
                    unoptimized
                    src={ImageThree}
                    alt=""
                    width={0}
                    height={0}
                    objectFit="cover"
                  />
                </div> */}
              </Carousel>
              {/* <Swiper
                navigation={true}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                // pagination={{
                //   clickable: true,
                // }}
                modules={[Pagination]}
                className={styles.swiper}
              >
                {productDetailsData?.media?.map((item, index) => {
                  return (
                    <SwiperSlide
                      accessKey="2"
                      key={index}
                      // loop={true}
                      className={styles.swiperslide}
                    >
                      <div className={styles.abc}>
                        <Image
                          unoptimized
                          src={ImageOne}
                          alt=""
                          width={0}
                          height={0}
                          objectFit="cover"
                        />
                      </div>
                    </SwiperSlide>
                  )
                })}
                <SwiperSlide
                  accessKey="2"
                  // loop={true}
                  className={styles.swiperslide}
                >
                  <div className={styles.abc}>
                    <Image
                      unoptimized
                      src={ImageThree}
                      alt=""
                      width={0}
                      height={0}
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide
                  accessKey="2"
                  // loop={true}
                  className={styles.swiperslide}
                >
                  <div className={styles.abc}>
                    <Image
                      unoptimized
                      src={ImageOne}
                      alt=""
                      width={0}
                      height={0}
                      objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              </Swiper> */}

              {/* <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 15,
                  cursor: "pointer",
                  color: "#E2E2E2",
                }}
                className={styles.descktop_whishlist}
              >
                {addFav && JWT ? (
                  <HeartFilled
                    style={{ fontSize: "18px", color: "red" }}
                    onClick={() => removeFromWishlist(productDetailsData)}
                  />
                ) : (
                  <HeartOutlined
                    onClick={(e) => addToWishlist(e, productDetailsData)}
                    style={{
                      fontSize: "18px",
                      backgroundColor: "white",
                    }}
                  />
                )}
              </div> */}
            </div>
          )}
        </div>
      </div>
      <Row style={{ padding: "1% 3%" }}>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          {productDetailsData?.media?.map((item, index) => {
            return (
              <div key={index} className={styles.abc}>
                <Image
                  unoptimized
                  src={item?.url}
                  alt={item.alt}
                  width={0}
                  height={0}
                  objectFit="cover"
                />
              </div>
            );
          })}
        </Col>
        <Col
          xl={12}
          lg={12}
          md={12}
          sm={24}
          xs={24}
          className={styles.container}
        >
          <div
            style={{ marginTop: "20px" }}
            className={styles.details_left_side_wrapper}
          >
            <div className={styles.product_details_top_row}>
              <div className={styles.product_title}>
                <h2>
                  <p style={{ marginBottom: "10px" }}>
                    {productDetailsData.name}
                  </p>
                  {/* {productDetailsData?.options?.map((item, index) => {
                    return (
                      <span key={index}>
                        {[new Set(...item?.values)]
                          ?.filter(Boolean)
                          ?.map((_it, ind) => {
                            return (
                              <span key={ind}>
                                {variantSelection[item?.option]
                                  ? ` | ${variantSelection[item?.option]}`
                                  : null}
                              </span>
                            )
                          })}
                      </span>
                    )
                  })} */}
                </h2>
              </div>
              {/* <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (global.navigator.share) {
                    global.navigator
                      .share({
                        title: productDetailsData?.name,
                        url: location.href,
                      })
                      .then((d) => {
                        console.log(d)
                      })
                      .catch((err) => {
                        console.log(err)
                      })
                  } else {
                    global.open(`https://wa.me/?text=${location.href}`, "blank")
                  }
                }}
              >
                <Image {...shareIcon} alt="" />
              </span> */}
            </div>

            {/* <div className={styles.product_status}>
              {(productDetailsData?.inventoryDataa?.at(0)?.quantity > 0 &&
                productDetailsData?.variants.length === 0) ||
              (productDetailsData?.variants.length > 0 &&
                productDetailsData?.variants.some(
                  (ele) => ele?.inventoryData[0]?.quantity > 0
                )) ||
              !productDetailsData?.trackInventory ? (
                <span>
                  {dsbl ? (
                    <span style={{ color: "red" }}>Out of Stock</span>
                  ) : (
                    <span>In Stock</span>
                  )}
                </span>
              ) : (
                <span style={{ color: "red" }}>Out of Stock</span>
              )}
            </div> */}
            <div className={styles.product_price_wrapper}>
              <div
                className={styles.product_price}
                style={{
                  fontWeight: "400",
                  fontSize: "25px",
                  // lineHeight: "24px",
                  margin: "10px 0",
                }}
              >
                ₹ {Math.round(variantData?.displayPrice)}
              </div>
              {/* <div>
                {Math.round(variantData?.sellingPrice) !==
                Math.round(variantData?.displayPrice) ? (
                  <s>₹ {Math.round(variantData?.sellingPrice)}</s>
                ) : (
                  ""
                )}
              </div>
              {Math.round(variantData?.attributes?.discount) !== 0 && (
                <div className={styles.product_offer}>
                  {variantData?.sellingPrice !== variantData?.displayPrice &&
                  Math.round(variantData?.attributes?.discount)
                    ? `(${Math.round(variantData?.attributes?.discount)}% off)`
                    : ""}
                </div>
              )} */}
            </div>
            {productDetailsData?.options?.map((item, _index) => (
              <>
                <div
                  className={styles.product_color}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "25px",
                    marginBottom: "20px",
                  }}
                  key={item?.option}
                >
                  <div>
                    <b styles={{}}>{`${item?.option
                      .charAt(0)
                      .toUpperCase()}${item?.option.slice(1)}`}</b>{" "}
                    :
                  </div>
                  {item?.option === "color" ? (
                    <div
                      className={styles.size_box_wrapper}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "25px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            width: "27px",
                            height: "27px",
                            borderRadius: "100%",
                            backgroundColor: variantSelection[item?.option],
                          }}
                        ></span>
                      </div>
                      {item?.values?.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className={`${styles.size_box_container} ${
                              variantSelection[item?.option]?.toLowerCase() ===
                              value?.toLowerCase()
                                ? styles.active
                                : ""
                            } ${
                              variantsToShow[_index]?.includes(value) ||
                              variantsToShow[_index]?.every((item, index) =>
                                item?.includes(":")
                              )
                                ? ""
                                : styles.color_box + " " + styles.inactive
                            }`}
                            onClick={() => {
                              selectVariant(item?.option, value, _index);
                            }}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "none",
                            }}
                          >
                            <span
                              style={{
                                display: "block",
                                width: "27px",
                                height: "27px",
                                borderRadius: "100%",
                                backgroundColor: `${value}`,
                              }}
                            ></span>
                          </div>
                        );
                      })}
                    </div>
                  ) : item?.option === "size" || item?.option === "Size" ? (
                    <div
                      className={styles.size_box_wrapper}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "25px",
                      }}
                    >
                      {item?.values?.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className={`${styles.size_box_container} ${
                              variantSelection[item?.option]?.toLowerCase() ===
                              value?.toLowerCase()
                                ? styles.active
                                : ""
                            } ${
                              variantsToShow[_index]?.includes(value) ||
                              variantsToShow[_index]?.every((item, index) =>
                                item?.includes(":")
                              )
                                ? ""
                                : styles.color_box + " " + styles.inactive
                            }`}
                            onClick={() => {
                              selectVariant(item?.option, value, _index);
                            }}
                            style={{
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "100%",
                              width: "45px",
                              height: "45px",
                              border: "1px solid #333333 ",
                            }}
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      className={styles.size_box_wrapper}
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "25px",
                      }}
                    >
                      {item?.values?.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className={`${styles.size_box_container} ${
                              variantSelection[item?.option]?.toLowerCase() ===
                              value?.toLowerCase()
                                ? styles.active
                                : ""
                            } ${
                              variantsToShow[_index]?.includes(value) ||
                              variantsToShow[_index]?.every((item, index) =>
                                item?.includes(":")
                              )
                                ? ""
                                : styles.color_box + " " + styles.inactive
                            }`}
                            onClick={() => {
                              selectVariant(item?.option, value, _index);
                            }}
                          >
                            {value}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ))}
            {(productDetailsData?.attributes?.shortDescription ||
              productDetailsData?.attributes?.description) && (
              <div className={styles.product_details}>
                {productDetailsData?.attributes?.shortDescription ||
                  "Product Details"}{" "}
                <a href="#desc" style={{ color: "#01C0CC" }}>
                  Read more...
                </a>
              </div>
            )}
            {(productDetailsData?.inventoryData[0]?.quantity > 0 &&
              productDetailsData?.variants.length === 0) ||
            (productDetailsData?.variants.length > 0 &&
              productDetailsData?.variants.some(
                (ele) => ele?.inventoryData[0]?.quantity > 0
              )) ||
            !productDetailsData?.trackInventory ? (
              <div className={styles.btn_wrapper}>
                {colorCode?.quantity && !dsbl ? (
                  <div className={styles.qty_btn}>
                    <button
                      style={{
                        height: "35px",
                        width: "35px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #DDDDDD",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                      onClick={(e) => decreaseQuantity(e)}
                    >
                      <Image {...minus} alt="" />
                    </button>
                    <span
                      style={{
                        height: "35px",
                        width: "35px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #DDDDDD",
                        borderRadius: "5px",
                      }}
                    >
                      {colorCode?.quantity}
                    </span>
                    <button
                      style={{
                        height: "35px",
                        width: "35px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f5f5f5",
                        border: "1px solid #DDDDDD",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                      onClick={(e) => {
                        productDetailsData?.trackInventory === false ||
                        variantData?.inventoryData[0]?.quantity !==
                          colorCode?.quantity
                          ? increaseQuantity(e)
                          : message.warning(`Quantity Unavailable!`);
                      }}
                    >
                      <Image {...plus} alt="" />
                    </button>
                  </div>
                ) : (
                  <button
                    className={`${
                      disableAddToCart || dsbl
                        ? styles.buy_now_btn_disable
                        : styles.add_to_cart
                    }`}
                    style={
                      disableAddToCart || dsbl
                        ? { cursor: "no-drop", color: "lightgray" }
                        : {}
                    }
                    disabled={
                      (productDetailsData?.trackInventory === true &&
                        variantData?.inventoryData?.at(0)?.quantity < 0) ||
                      disableAddToCart ||
                      dsbl
                    }
                    onClick={(e) => {
                      if (productDetailsData?.trackInventory === true) {
                        productDetailsData?.attributes?.quantity == 0
                          ? message.warning("out of stock")
                          : addToCarts(e, productDetailsData);
                      } else {
                        addToCarts(e, productDetailsData);
                      }
                    }}
                  >
                    {/* <p
                      style={{
                        padding: "15px 40px",
                        margin: 0,
                        background: "#FFFFFF",

                        borderRadius: "5px",
                      }}
                    > */}
                    <ShoppingCartOutlined />
                    <span>ADD TO CART</span>
                    {/* </p> */}
                  </button>
                )}
                {!disableAddToCart && !dsbl ? (
                  <>
                    {!disableAddToCart && (
                      <button
                        // disabled={variantData?.inventoryData?.at(0)?.quantity == 0}
                        className={styles.buy_now_btn}
                        onClick={(e) => buyNow(e, productDetailsData)}
                      >
                        BUY IT NOW
                      </button>
                    )}
                  </>
                ) : null}
              </div>
            ) : (
              <div className={styles.btn_wrapper}>
                <Button disabled className={styles.buy_now_btn_disable}>
                  ADD TO CART
                </Button>
              </div>
            )}
            {/* <div className={styles.delivery_option_wrapper}>
              <div className={styles.delivery_option_title}>
                Delivery Option
              </div>
              <Image src={DeliveryImg} alt="" />
            </div> */}
            <div className={styles.input_wrapper}>
              {/* <Input
                value={addressData?.addressDetails?.pinCode}
                placeholder="Enter PinCode"
                className={styles.pincode_input}
                disabled={JWT && addressData?.addressDetails?.pinCode}
                style={{ background: "white", width: "60%" }}
                onChange={(e) => getPincode(e)}
                maxLength={6}
                onKeyPress={(e) => {
                  if (/\D/.test(e.key)) {
                    e.preventDefault()
                  }
                }}
                suffix={
                  !fLoader ? (
                    <div
                      className={styles.input_suffix}
                      onClick={(e) => {
                        JWT && addressData?.addressDetails?.pinCode
                          ? router.push("/my-address")
                          : getLatLang(e)
                      }}
                      style={
                        pincode?.length !== 6 && !JWT
                          ? { cursor: "no-drop" }
                          : { cursor: "pointer" }
                      }
                    >
                      {JWT && addressData?.addressDetails?.pinCode
                        ? "CHANGE"
                        : "CHECK"}
                    </div>
                  ) : (
                    <Spin style={{ fontSize: 1 }} />
                  )
                }
              /> */}
              {serviceable == "false" ? (
                <div style={{ color: "red", opacity: 0.8 }}>
                  Delivery Not Available
                </div>
              ) : serviceable == "true" ? (
                <div
                  style={{ color: "#2c9d59", fontWeight: 500, fontSize: 12 }}
                >
                  Delivery Available
                </div>
              ) : null}
            </div>
            {setting?.deliverySelf && (
              <div className={styles.delivery_time_wrapper}>
                <div className={styles.delivery_time}>
                  {setting?.deliveryDetails?.type === "sameDay" &&
                  setting?.deliveryDetails?.hours &&
                  setting?.deliveryDetails?.minutes
                    ? `Delivery with in ${setting?.deliveryDetails?.hours} Hr ${setting?.deliveryDetails?.minutes} Mins`
                    : setting?.deliveryDetails?.days
                    ? `Delivery by ${setting?.deliveryDetails?.days} Days`
                    : " "}
                </div>
              </div>
            )}
            {productDetailsData?.attributes?.replaceProduct && (
              <div className={styles.warrenty_text_wrapper}>
                <div className={styles.warrenty_text_point_circle}></div>
                <div className={styles.warrenty_text}>
                  {productDetailsData?.attributes?.days} Days Replacement/
                  Return
                </div>
              </div>
            )}
            {productDetailsData?.attributes?.warranty && (
              <div className={styles.warrenty_text_wrapper}>
                <div className={styles.warrenty_text_point_circle}></div>
                <div className={styles.warrenty_text}>
                  {productDetailsData?.attributes?.warranty}{" "}
                  {productDetailsData?.attributes?.warrantyTime?.label ??
                    productDetailsData?.attributes?.warrantyTime}{" "}
                  Warranty
                </div>
              </div>
            )}
          </div>
          {/* <Col xl={20} lg={20} md={20} sm={20} xs={24}>
            {" "}
            <Row> */}
          {/* <Col xl={12} lg={12} md={12} sm={24} xs={24}> */}
          <div
            className={styles.tab_view_offer}
            style={{
              marginTop: "50px",
              fontWeight: "400",
              fontSize: "20px",
              lineHeight: "34px",
              color: "#000000",
              paddingBottom: "10px",
              borderBottom: "1px solid #DDDDDD",
              paddingLeft: "2%",
            }}
          >
            {["Product Details"]?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setselectedTab(item)}
                  className={
                    item === selectedTab
                      ? styles.selected_tab
                      : styles.unselected_tab
                  }
                >
                  {item}
                </div>
              );
            })}
          </div>
          {selectedTab === "Product Details" ? (
            <div
              className={styles.description_section_wrapper}
              id="desc"
              style={{ marginTop: "40px", fontSize: "17px", paddingLeft: "2%" }}
            >
              {productDetailsData?.description ? (
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: productDetailsData?.description,
                  }}
                ></div>
              ) : (
                <div style={{ opacity: 0.5 }}>No Description...</div>
              )}
              <div className={styles.description_details}>
                {productDetailsData?.attributes?.manufacturer && (
                  <div className={styles.description_details_row}>
                    <div className={styles.description_details_title}>
                      Manufacturer
                    </div>
                    <div className={styles.description_details_answer}>
                      : {productDetailsData?.attributes?.manufacturer || "-"}
                    </div>
                  </div>
                )}

                {productDetailsData?.attributes?.country && (
                  <div className={styles.description_details_row}>
                    <div className={styles.description_details_title}>
                      Country of origin
                    </div>
                    <div className={styles.description_details_answer}>
                      : {productDetailsData?.attributes?.country || "-"}
                    </div>
                  </div>
                )}

                {productDetailsData?.attributes?.brand && (
                  <div className={styles.description_details_row}>
                    <div className={styles.description_details_title}>
                      Brand
                    </div>
                    <div className={styles.description_details_answer}>
                      : {productDetailsData?.attributes?.brand || "-"}
                    </div>
                  </div>
                )}

                {(productDetailsData?.attributes?.dimensionHeight ||
                  productDetailsData?.attributes?.dimensionWidth ||
                  productDetailsData?.attributes?.dimensiondepth) && (
                  <div className={styles.description_details_row}>
                    <div className={styles.description_details_title}>
                      Dimensions
                    </div>
                    <div className={styles.description_details_answer}>
                      :{" "}
                      {/* {productDetailsData?.attributes?.dimensionHeight && ( */}
                      <>
                        {`${
                          productDetailsData?.attributes?.dimensionHeight ||
                          productDetailsData?.attributes?.dimensionHeight == 0
                            ? " " +
                              productDetailsData?.attributes?.dimensionHeight
                            : ""
                        }  ${
                          productDetailsData?.attributes?.dimensionWidth ||
                          productDetailsData?.attributes?.dimensionWidth == 0
                            ? "x" +
                              " " +
                              productDetailsData?.attributes?.dimensionWidth
                            : ""
                        }  ${
                          productDetailsData?.attributes?.dimensiondepth ||
                          productDetailsData?.attributes?.dimensiondepth == 0
                            ? "x" +
                              " " +
                              productDetailsData?.attributes?.dimensiondepth
                            : ""
                        }` || "-"}{" "}
                        {productDetailsData?.attributes?.measurementType ||
                          " cm"}
                      </>
                      {/* )} */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.review_section_wrapper}>reviews</div>
          )}
        </Col>
      </Row>
      <div className={styles.container}>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* </Row>
          </Col> */}

          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div style={{ marginTop: "20px" }}>
              <DesignProcess
                Images={relatedProducts}
                desImages={desImages}
                desSecondImgs={desSecondImgs}
                desThirdImgs={desThirdImgs}
                ourDesignImgs={ourDesignImgs}
                ourDesignProceessContent={
                  productDetailsData?.attributes?.additionalDescription?.at(4)
                    ?.content
                }
                video={
                  productDetailsData?.attributes?.additionalDescription
                    ?.at(5)
                    ?.content?.at(0)?.content
                }
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <DesignFact
                designFactsFirstParagraph={
                  productDetailsData?.attributes?.additionalDescription?.at(7)
                    ?.content
                }
                designFactsImg={
                  productDetailsData?.attributes?.additionalDescription
                    ?.at(8)
                    ?.content?.at(0)?.content
                }
                designFactsSecondParagraph={
                  productDetailsData?.attributes?.additionalDescription
                    ?.at(8)
                    ?.content?.at(1)?.content
                }
                designFactsThirdParagraph={
                  productDetailsData?.attributes?.additionalDescription?.at(9)
                    ?.content
                }
              />
            </div>
            {relatedProducts?.length > 0 && (
              <div className={styles.related_product_wrapper}>
                <div className={styles.sub_container}>
                  <div
                    style={{
                      // marginTop: "40px",
                      textAlign: "center",
                      fontFamily: "Playfair Display",
                      fontSize: "24px",
                      fontWeight: 400,
                      lineHeight: "34px",
                      letterSpacing: "0em",
                      // position: "relative",
                      // left: "43%",
                      marginBottom: "20px",
                      margin: "auto",
                    }}
                  >
                    Related Products
                  </div>
                  <div className={styles.heading_wrapper}>
                    <div
                      className={styles.related_see_all_title}
                      onClick={() => router.push("/product-list")}
                    >
                      See all
                    </div>
                    <div className={styles.arrows} ref={prevRef}>
                      <Image height={25} width={25} src={LeftArrow} alt="" />
                    </div>
                    <div className={styles.arrows} ref={nextRef}>
                      <Image height={25} width={25} src={RightArrow} alt="" />
                    </div>
                  </div>
                </div>
                <Swiper
                  loop={false}
                  loopFillGroupWithBlank={true}
                  breakpoints={responsiveSlide}
                  modules={[Navigation]}
                  className="mySwiper"
                  onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }}
                >
                  {relatedProducts?.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        {console.log("relatedProducts", relatedProducts)}
                        {/* <ProductCard data={item} relted={true} /> */}
                        <div
                          key={index}
                          className={styles.related_imgs}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push({
                              pathname: `/product-details/${item?.slug}`,
                            });
                          }}
                        >
                          <Image
                            src={item?.media?.at(0)?.url}
                            unoptimized
                            height={400}
                            width={100}
                            alt="placeholder-image"
                          />
                          <div>
                            <p
                              style={{
                                fontFamily: "Josefin Sans",
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                marginTop: "25px",
                                marginBottom: "20px",
                              }}
                              className={styles.xyz}
                            >
                              {item?.name}
                            </p>
                            <p
                              styles={{
                                fontFamily: "Josefin Sans",
                                fontSize: "18px",
                                fontWeight: 400,
                                lineHeight: "24px",
                                letterSpacing: "0em",
                                textAlign: "center",
                              }}
                            >
                              {item?.displayPrice}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
            {paymentModal && (
              <Modal
                maskStyle={{ backdropFilter: "blur(10px)" }}
                title="Select Payment Mode"
                open={paymentModal}
                centered
                footer={null}
                width={400}
                onOk={() => setPaymentModal(false)}
                onCancel={() => setPaymentModal(false)}
              >
                <div className={styles.payment_option_modal}>
                  <div className={styles.payment_option_modal_img_wrapper}>
                    <div
                      className={styles.payment_option_modal_img_1}
                      onClick={() => codClick()}
                    >
                      <Image {...CodImg} alt="" />
                      <Typography className={styles.cod_text}>
                        Cash On Delivery
                      </Typography>
                    </div>
                    <div
                      className={styles.payment_option_modal_img_2}
                      onClick={() => onlinePaymentClick()}
                    >
                      <Image {...OnlinePayImg} alt="" />
                      <Typography className={styles.op_text}>
                        Online Payment
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <Divider style={{ backgroundColor: "#D1D5DB" }} />
                    <div className={styles.payment_details}>
                      <Typography className={styles.payment_details_text}>
                        Payable Amount
                      </Typography>
                      <Typography className={styles.payment_details_ammount}>
                        ₹{variantData?.displayPrice.toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Modal>
            )}
          </Col>
        </Row>
      </div>

      {/* <Policys /> */}
      <div style={{ paddingTop: "0.5%" }}> </div>
    </>
  );
};

// export async function getServerSideProps({ params, ...a }) {
//   let url = `http://${a.req.headers.host}/api/product/${params.id}`
//   const { data: product } = await axios.get(url)
//   return {
//     props: {
//       product,
//     },
//   }
// }
export default ProductDetails;
