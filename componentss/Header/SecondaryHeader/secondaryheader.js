import {
  AutoComplete,
  Badge,
  Col,
  Drawer,
  Input,
  Menu,
  Row,
  Select,
  Avatar,
  Image as Img,
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./secondaryheader.module.scss";
import {
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_STORE } from "../../../redux/storedetail/actions/actions";
import { FETCH_ALL_CATEGORIES } from "../../../redux/categories/actions/actions";
import { FETCH_ALL_CART_PRODUCTS } from "../../../redux/cartProducts/actions/actions";
import axios from "axios";
import _ from "lodash";
import Cookies from "universal-cookie";
import BASE_URL from "../../../constants/textUtility/textenv";
import img from "../../../public/assets/arr-down.svg";
import dropDownIcon from "../../../public/assets/images/svg/dropdown.svg";
import Link from "next/link";
import MyAccountMenu from "../../MyacoountMenu/myaccountmenu";

const SeconderyHeader = ({ tagLine }) => {
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");
  const router = useRouter();
  const [pathName, setPathName] = useState("");
  useEffect(() => {
    setPathName(router?.asPath);
  }, [router]);

  const dispatch = useDispatch();
  let allCategoriesData = useSelector((state) => state?.allCategories || []);
  let storeDetail = useSelector((state) => state?.allStore || null);
  const cartDetails = useSelector((state) => state?.allCart);
  const _res = useSelector((state) => state?.allStore?.result || null);
  const user = _res?.user;
  const cart = _res?.cart;
  let whishListData = useSelector(
    (state) => state?.fetchProductFromWishlist || []
  );
  let cartDetailsData = null;

  const [selectedCatId, setSelectedId] = useState();
  const [items, setMenuItems] = useState([]);
  const [loader, setLoadeer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchOpen, setSearhBarDisplay] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scccccccc@@@@@@@@222", window.scrollY, isScrolled);
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth === window.screen.width) {
        setIsFullWidth(true);
      } else {
        setIsFullWidth(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const apiKey = useSelector(
    (state) => state?.allStore?.result?.apiKey || null
  );

  useEffect(() => {
    if (!storeDetail?.fetching && !storeDetail?.result) {
      dispatch({ type: FETCH_ALL_STORE });
    }
    if (!whishListData?.fetching && !whishListData?.result && JWT?.length > 0) {
      dispatch({ type: "FETCH_PRODUCTS_FROM_WISHLIST" });
    }
    console.log("whishListData", whishListData);
    if (!allCategoriesData?.fetching && !allCategoriesData?.result) {
      dispatch({ type: FETCH_ALL_CATEGORIES });
    }
  }, [dispatch, cartDetails?.result, cart?.id]);

  useEffect(() => {
    if (
      !cartDetails?.result &&
      JWT &&
      cart?.id &&
      router?.pathname !== "/my-cart"
    ) {
      dispatch({ type: FETCH_ALL_CART_PRODUCTS, cartId: cart?.id });
    }
  }, [JWT, cart?.id, cartDetails?.result, dispatch]);

  useEffect(() => {
    if (cartDetails?.result?.totalItems == 0) {
      localStorage.removeItem("cartId");
    }
  }, [cartDetails?.result, cartDetails?.result?.totalItems?.length]);

  console.log("cartDetailscartDetails", cartDetails);

  useEffect(() => {
    if (
      !cartDetails?.result &&
      !JWT &&
      localStorage.getItem("cartId") &&
      router?.pathname !== "/my-cart"
    ) {
      dispatch({
        type: FETCH_ALL_CART_PRODUCTS,
        cartId: localStorage.getItem("cartId"),
      });
    }
  }, [JWT, cart?.id, cartDetails?.result, dispatch]);

  const onchangeSearchText = (e) => {
    setIsOpen(false);
    setSearchText(e);
    searchProducts(e); //functionDebounce(e.target.value);
  };

  const searchProducts = (text = searchText) => {
    setLoadeer(true);
    let url = `${BASE_URL}/store/api/v1/search-products?from=0&limit=30&search=${text?.trim()}${
      selectedCatId?.length > 0 ? "&c=" + selectedCatId : ""
    }`;
    axios
      .get(url)
      .then((res) => {
        setSearchedProducts(res?.data?.products);
        setLoadeer(false);
      })
      .catch((err) => {
        setLoadeer(false);
      });
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const serachProducts = () => {
    setIsOpen(true);
    setSearhBarDisplay(false);
    router.push(`/search-products?search=${searchText?.trim()}`);
  };

  const selectBefore = (
    <Select
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      suffixIcon={<Image src={dropDownIcon} />}
      onChange={(e) => {
        if (e.key !== "") {
          setSelectedId(e);
          setSearchedProducts([]);
        }
      }}
      onDropdownVisibleChange={(e) => handleOpenChange(e)}
      clearIcon={true}
      defaultValue={""}
      placeholder="All Categories"
      className={`${styles.select_multi} ${styles.search_suggestion_wrapper}`}
      style={{ width: "150px" }}
      listHeight={200}
      options={[
        { value: "", label: "All Categories" },
        ...(allCategoriesData?.result?.categories
          ?.filter((item) => item?.isActive)
          .map((item, index) => ({
            label: item.displayName,
            value: item.id,
          })) || []),
      ]}
    ></Select>
  );
  const selectAfter = (
    <div
      style={
        searchText?.trim()?.length == 0
          ? { cursor: "no-drop" }
          : { cursor: "pointer" }
      }
      onClick={() => (searchText?.length !== 0 ? serachProducts() : null)}
      className={styles.search_icon}
    >
      <img
        src="/assets/images/svg/search.svg"
        alt="search"
        width={24}
        height={24}
      />
    </div>
  );

  useEffect(() => {
    const formatMenu = (items, level) => {
      return items?.map(
        ({ id: key, slug, displayName: label, subCategories, link }) => ({
          key,
          label: (
            <>
              <a
                className={styles.text}
                onClick={() => {
                  label !== "All"
                    ? link
                      ? router.push(link)
                      : router.push(`/product-list?cat=${slug}`)
                    : router.push(`/product-list`);
                }}
              >
                {label}
              </a>
              {/* {subCategories?.length > 0 && level === 1 && (
                <span style={{ marginLeft: 10 }}>
                  <Image {...img} alt="" />
                </span>
              )} */}
            </>
          ),
          // children: formatMenu(subCategories, level + 1),
        })
      );
    };
    console.log(allCategoriesData?.result?.categories);

    setMenuItems(
      // formatMenu(
      //   [
      //     {
      //       displayName: "ALL",
      //       isActive: true,
      //     },
      //     ...(allCategoriesData?.result?.categories
      //       ?.filter((item) => item?.isActive)
      //       ?.slice(0, 5) || []),
      //     ...(allCategoriesData?.result?.categories?.filter(
      //       (item) => item?.isActive
      //     )?.length > 5
      //       ? [
      //           {
      //             id: "categorie-listing",
      //             slug: "categorie-listing",
      //             link: "/categorie-listing",
      //             displayName: "+More",
      //           },
      //         ]
      //       : []),
      //   ],
      //   1
      // )

      formatMenu(
        [
          {
            displayName: "ALL",
            isActive: true,
          },
          ...(allCategoriesData?.result?.categories
            ?.filter((item) => item?.isActive)
            ?.slice(0, 5)
            .map((item) => ({
              ...item,
              displayName: item.displayName.toUpperCase(),
            })) || []),
          ...(allCategoriesData?.result?.categories?.filter(
            (item) => item?.isActive
          )?.length > 5
            ? [
                {
                  id: "categorie-listing",
                  slug: "categorie-listing",
                  link: "/categorie-listing",
                  displayName: "+MORE",
                },
              ]
            : []),
        ],
        1
      )
    );
  }, [allCategoriesData?.result?.categories]);

  useEffect(() => {
    setSearhBarDisplay(false);
  }, [router?.pathname]);

  console.log(pathName !== "/", "pathname", items);

  return (
    <>
      <div className={styles.container}>
        <Row className={styles.container_main_row}>
          <Col xl={3} lg={3} md={3} sm={4} xs={12}>
            {storeDetail?.result?.logoData?.url ? (
              <Link href={"/"} rel="canonical">
                <Image
                  height={80}
                  width={218}
                  objectFit="contain"
                  style={{ cursor: "pointer" }}
                  src={storeDetail?.result?.logoData?.url}
                  alt={
                    storeDetail?.result?.logoData?.alt ||
                    storeDetail?.result?.logoData?.name
                  }
                />
              </Link>
            ) : (
              <Link href={"/"} rel="canonical">
                <div
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  {storeDetail?.result?.name?.toUpperCase()}
                </div>
              </Link>
            )}
            {tagLine && <div className={styles.tagline_style}>{tagLine}</div>}
          </Col>
          <Col
            className={styles.search_feild}
            xl={14}
            lg={14}
            md={14}
            sm={14}
            xs={0}
            id="search-icon"
          >
            <div className={styles.search_wrapper}>
              <AutoComplete
                dropdownMatchSelectWidth
                className={styles.input_search}
                options={
                  !isOpen &&
                  searchText?.trim()?.length !== 0 &&
                  searchedProducts.map((i) => ({
                    ...i,
                    key: i.id,
                    label: (
                      <div
                        onClick={(e) => {
                          setSearhBarDisplay(false);
                          router.push(`/product-details/${i.slug}`);
                        }}
                      >
                        {i.name}
                      </div>
                    ),
                  }))
                }
                onSelect={(e) => {}}
                onSearch={(e) => onchangeSearchText(e)}
              >
                <Input
                  size="large"
                  // addonBefore={selectBefore}
                  addonAfter={selectAfter}
                  placeholder="Search here"
                  enterButton
                  onPressEnter={() =>
                    searchText?.trim()?.length > 0
                      ? router.push(
                          `/search-products?search=${searchText?.trim()}`
                        )
                      : undefined
                  }
                />
              </AutoComplete>
            </div>
          </Col>

          <Col
            xl={user ? 5 : 0}
            lg={user ? 5 : 0}
            md={user ? 6 : 0}
            sm={user ? 4 : 0}
            xs={6}
            className={styles.whishlist_cart_wrapper}
          >
            <>
              <div
                className={`${styles.cart_wrapper} ${styles.search_icon}`}
                onClick={() => {
                  setSearhBarDisplay(!searchOpen);
                }}
              >
                <SearchOutlined style={{ fontSize: "22px" }} />
              </div>
              {console.log("useruser", user)}
              <div className={`${styles.top_header_right_side}`}>
                <div className={`${styles.top_header_right_side_text}`}>
                  {user ? (
                    <span
                      // onClick={() => router.push("/login-modal")}
                      style={{ cursor: "pointer" }}
                    >
                      {/* <Avatar
                        size={32}
                        onClick={() => {
                          JWT?.length > 0
                            ? router.push("/my-account")
                            : router.push("/login-modal");
                        }}
                        style={{
                          backgroundColor: "red",
                          color: "#000",
                          fontSize: "22px",
                        }}
                        icon={<UserOutlined preview={false} />}
                      /> */}
                      <div>
                        {user?.profilePic ? (
                          <div>
                            {/* <Image
                              alt=""
                              src={user?.profilePic}
                              height={20}
                              width={20}
                              unoptimized
                            /> */}
                            <Avatar
                              size={32}
                              onClick={() => {
                                router.push("/my-account");
                              }}
                              src={
                                <Img
                                  src={user?.profilePic}
                                  style={{ width: 32 }}
                                  preview={false}
                                  alt="profile"
                                />
                              }
                              style={{ backgroundColor: "transparent" }}
                            />
                          </div>
                        ) : (
                          <Avatar
                            size={32}
                            onClick={() => {
                              JWT?.length > 0
                                ? router.push("/my-account")
                                : router.push("/login-modal");
                            }}
                            style={{
                              backgroundColor: "transparent",
                              color: "#000",
                              fontSize: "22px",
                            }}
                            icon={<UserOutlined preview={false} />}
                          />
                        )}
                      </div>
                    </span>
                  ) : (
                    apiKey && (
                      <span
                        onClick={() => router.push("/login-modal")}
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar
                          size={32}
                          onClick={() => {
                            router.push("/login-modal");
                          }}
                          style={{
                            backgroundColor: "transparent",
                            color: "#000",
                            fontSize: "22px",
                          }}
                          icon={<UserOutlined preview={false} />}
                        />
                      </span>
                    )
                  )}
                </div>
              </div>
              {user && (
                <>
                  <div
                    className={styles.whishlist_wrapper}
                    onClick={() => {
                      JWT?.length > 0
                        ? router.push("/whishlist")
                        : router.push("/login-modal");
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Badge
                        className={styles.badge}
                        count={whishListData?.result?.length}
                        color={"black"}
                        overflowCount={9}
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "20px",
                          fontSize: "10px",
                          padding: 0,
                        }}
                      >
                        <HeartOutlined style={{ fontSize: "22px" }} />
                      </Badge>
                    </div>
                  </div>
                </>
              )}
              <div
                className={styles.cart_wrapper}
                onClick={() => {
                  router.push("/my-cart");
                }}
              >
                <Badge
                  className={styles.badge}
                  count={cartDetails?.result?.totalItems}
                  color={"#000"}
                  overflowCount={9}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "20px",
                    fontSize: "10px",
                    padding: 0,
                  }}
                >
                  <ShoppingCartOutlined style={{ fontSize: "22px" }} />
                </Badge>
              </div>
            </>
          </Col>
        </Row>
        {searchOpen && (
          <Row className={styles.mobile_search}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className={styles.search_wrapper}>
                <AutoComplete
                  dropdownMatchSelectWidth
                  className={styles.input_search}
                  options={
                    !isOpen &&
                    searchedProducts?.map((i) => ({
                      ...i,
                      key: i.id,
                      value: i.name,
                      label: (
                        <div
                          onClick={(e) => {
                            setSearhBarDisplay(false);
                            router.push(`/product-details/${i.slug}`);
                          }}
                        >
                          {i.name}
                        </div>
                      ),
                    }))
                  }
                  onSelect={(e) => {
                    () => setSearchText(e.id);
                  }}
                  onSearch={(e) => onchangeSearchText(e)}
                >
                  <Input
                    size="large"
                    addonBefore={selectBefore}
                    addonAfter={selectAfter}
                    placeholder="Search here"
                    enterButton
                    onPressEnter={() =>
                      searchText?.length !== 0 ? serachProducts() : null
                    }
                  />
                </AutoComplete>
              </div>
            </Col>
          </Row>
        )}
      </div>

      {isScrolled ? (
        <div className={styles.container1}>
          <Row
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Column 1 - Start */}
            <Col>
              {/* Logo */}
              <div>
                {storeDetail?.result?.logoData?.url ? (
                  <Link href={"/"} rel="canonical">
                    <Img
                      height={40}
                      width={140}
                      style={{ objectFit: "cover", paddingTop: "4px" }}
                      objectFit="contain"
                      src={storeDetail?.result?.logoData?.url}
                      alt={
                        storeDetail?.result?.logoData?.alt ||
                        storeDetail?.result?.logoData?.name
                      }
                    />
                  </Link>
                ) : (
                  <Link href={"/"} rel="canonical">
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        cursor: "pointer",
                      }}
                    >
                      {storeDetail?.result?.name?.toUpperCase()}
                    </div>
                  </Link>
                )}
              </div>
              {tagLine && <div className={styles.tagline_style}>{tagLine}</div>}
            </Col>
            {/* Column 2 - Center */}
            <Col style={{ flex: "3" }}>
              <Menu
                theme="light"
                mode="horizontal"
                items={items}
                style={{ borderBottom: "none", textTransform: "uppercase" }}
              />
            </Col>
            {/* Column 3 - End */}
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  setSearhBarDisplay(!searchOpen);
                }}
              >
                <SearchOutlined style={{ fontSize: "22px" }} />
              </div>

              <div
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user?.profilePic ? (
                  <div>
                    {/* <Image
                              alt=""
                              src={user?.profilePic}
                              height={20}
                              width={20}
                              unoptimized
                            /> */}
                    <Avatar
                      size={32}
                      onClick={() => {
                        router.push("/my-account");
                      }}
                      src={
                        <img
                          src={user?.profilePic}
                          style={{ width: 32 }}
                          preview={false}
                          alt="profile"
                        />
                      }
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                ) : (
                  <Avatar
                    size={32}
                    onClick={() => {
                      JWT?.length > 0
                        ? router.push("/my-account")
                        : router.push("/login-modal");
                    }}
                    style={{
                      backgroundColor: "transparent",
                      color: "#000",
                      fontSize: "22px",
                    }}
                    icon={<UserOutlined preview={false} />}
                  />
                )}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "10px", cursor: "pointer" }}>
                  {/* <div
                    onClick={() => {
                      JWT?.length > 0
                        ? router.push("/whishlist")
                        : router.push("/login-modal");
                    }}
                  >
                    <Badge
                      className={styles.badge}
                      count={whishListData?.result?.length}
                      color={"black"}
                      overflowCount={9}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        padding: 0,
                      }}
                    >
                      <HeartOutlined style={{ fontSize: "22px" }} />
                    </Badge>
                  </div> */}
                  <div
                    onClick={() => {
                      router.push("/my-cart");
                    }}
                  >
                    <Badge
                      count={cartDetails?.result?.totalItems}
                      color={"#000"}
                      overflowCount={9}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        padding: 0,
                        marginLeft: "10px",
                      }}
                    >
                      <ShoppingCartOutlined style={{ fontSize: "22px" }} />
                    </Badge>
                  </div>
                </div>
              </div>

              {/* {user && (
                <div style={{ marginRight: "10px", cursor: "pointer" }}>
                  <div
                    onClick={() => {
                      JWT?.length > 0
                        ? router.push("/whishlist")
                        : router.push("/login-modal");
                    }}
                  >
                    <Badge
                      className={styles.badge}
                      count={whishListData?.result?.length}
                      color={"black"}
                      overflowCount={9}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        padding: 0,
                      }}
                    >
                      <HeartOutlined style={{ fontSize: "22px" }} />
                    </Badge>
                  </div>
                  <div
                    onClick={() => {
                      router.push("/my-cart");
                    }}
                  >
                    <Badge
                      count={cartDetails?.result?.totalItems}
                      color={"#000"}
                      overflowCount={9}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "20px",
                        fontSize: "10px",
                        padding: 0,
                        marginLeft: "10px"
                      }}
                    >
                      <ShoppingCartOutlined style={{ fontSize: "22px" }} />
                    </Badge>
                  </div>
                </div>
              )} */}
            </Col>
          </Row>
        </div>
      ) : (
        <div className={styles.container2}>
          <Menu theme="light" mode="horizontal" items={items} />
        </div>
      )}
    </>
  );
};

export default SeconderyHeader;
