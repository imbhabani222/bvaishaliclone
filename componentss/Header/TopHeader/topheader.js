import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./topheader.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Image as Img } from "antd";
import Image from "next/image";
import DropdownImg from "../../../public/assets/drop-down.svg";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { FETCH_ALL_ADDRESS } from "../../../redux/address/actions/actions";
import Link from "next/link";



function TopHeader() {
  const router = useRouter();
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");
  const dispatch = useDispatch();

  const addressData = useSelector((s) =>
    s?.allAddress?.result?.address?.filter(
      (item, index) => item?.addressDetails?.isDefault
    )
  );

  const setting = useSelector((s) => s?.settingData?.result?.settings?.at(0));

  const apiKey = useSelector(
    (state) => state?.allStore?.result?.apiKey || null
  );
  const user = useSelector((state) => state?.allStore?.result?.user || null);

  const [showOption, setShowOption] = useState(false);




  const [menuData, setMenuData] = useState([
    { title: "My Profile", route: "/my-account" },
    { title: "My Order", route: "/my-orders" },
    { title: "My Address", route: "/my-address" },
    { title: "Log Out", route: "#" },
  ]);

  const itemClick = (item) => {
    router.push(item?.route);
    setShowOption(false);
  };

  const logOutClick = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("cartId");
    localStorage.removeItem("cartId");
    window.location.href = "/";
  };

  useEffect(() => {
    if (JWT?.length > 0 && !addressData) {
      dispatch({ type: FETCH_ALL_ADDRESS });
    }
  }, [JWT?.length, addressData, dispatch]);

  return (
    <>
      {setting?.isStoreOpened == false && (
        <div className={styles.top_msg}>
          {setting?.closedMessage
            ? setting?.closedMessage
            : "Please place your order once the store opens again."}
        </div>
      )}
      <div className={`${styles.container}`}>
        {/* <Link href={user?.profile ? "/my-address" : "/"}> */}
        {addressData?.at(0)?.addressDetails ? (
          <div
            onClick={() => router.push("/my-address")}
            className={`${styles.top_header_left_side}`}
          >
            <div className={`${styles.top_header_left_user_name}`}>
              {addressData?.at(0)?.addressDetails?.city || "HOME"}
            </div>
            <div className={`${styles.top_header_left_user_city}`}>
              <span>
                {addressData?.at(0)?.addressDetails?.state || "Bengaluru"}
              </span>
              <Image {...DropdownImg} alt="" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              if (JWT) {
                router.push("/my-address");
              } else {
                localStorage.setItem("address", true);
                router.push("/login-modal");
              }
            }}
            className={`${styles.please_select_address}`}
          >
            <span style={{ marginBottom: "1px" }}>Please select address</span>{" "}
            <Image {...DropdownImg} alt="address-select" />
          </div>
        )}
        {/* </Link> */}

        <div className={`${styles.top_header_right_side}`}>
          <div className={`${styles.top_header_right_side_text}`}>
            {user?.profilePic ? (
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
            ) : (
              <Avatar
                size={32}
                onClick={() => {
                  router.push("/my-account");
                }}
                style={{ backgroundColor: "transparent" }}
                icon={<UserOutlined preview={false} />}
              />
            )}

            {showOption && (
              <div
                className={styles.menu_item_wrapper}
                onMouseEnter={() => setShowOption(true)}
                onMouseLeave={() => setShowOption(false)}
              >
                {menuData?.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        index + 1 !== menuData?.length
                          ? itemClick(item)
                          : logOutClick();
                      }}
                      className={
                        index + 1 !== menuData?.length
                          ? styles.menu_item_name
                          : styles.menu_item_name_last
                      }
                      key={index}
                    >
                      {item?.title}
                    </div>
                  );
                })}
              </div>
            )}

            {user ? (
              <div
                className={styles.account_icon}
                onClick={() => {
                  JWT?.length > 0
                    ? router.push("/my-account")
                    : router.push("/login-modal");
                }}
                onMouseEnter={() => setShowOption(true)}
                onMouseLeave={() => setShowOption(false)}
              >
                <span>My Account</span>
                <Img
                  {...DropdownImg}
                  preview={false}
                  alt=""
                  style={{ marginLeft: "10px" }}
                />
              </div>
            ) : (
              apiKey && (
                <span onClick={() => router.push("/login-modal")}>
                  Login / Signup
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
