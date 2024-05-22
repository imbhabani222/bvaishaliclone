import {
  UserOutlined,
  ShoppingOutlined,
  TagOutlined,
  PoweroffOutlined,
} from "@ant-design/icons"
import Address from "../../public/tabs/Address.svg"
import Cart from "../../public/tabs/Cart.svg"
import Logout from "../../public/tabs/Logout.svg"
import Profile from "../../public/tabs/Profile.svg"
import { message, Row } from "antd"
import { useRouter } from "next/router"
import React, { useState } from "react"
import styles from "./myaccountmenu.module.scss"
import Cookies from "universal-cookie"
import MapIcon from "../../public/address-icon.png"
import ShopIcon from "../../public/shop-icon.png"
import Image from "next/image"
const MyAccountMenu = ({ onClose, mobile }) => {
  const cookies = new Cookies()
  let JWT = cookies?.get("accessToken")
  const router = useRouter()
  const [menuData, setMenuData] = useState([
    // { title: "ACTIVITY", icon: "", route: "" },
    {
      title: "My Profile",
      icon: <Image {...Profile} alt="" />,
      route: "/my-account",
    },
    {
      title: "My Order",
      icon: <Image {...Cart} alt="" />,
      route: "/my-orders",
    },
    {
      title: "My Address",
      icon: <Image {...Address} alt="" />,
      route: "/my-address",
    },
    {
      title: (
        <span
          onClick={() => {
            cookies.remove("accessToken")
            cookies.remove("refreshToken")
            cookies.remove("cartId")
            localStorage.removeItem("cartId")
            window.location.href = "/"
          }}
        >
          Logout
        </span>
      ),
      icon: <Image {...Logout} alt="" />,
      route: "/",
    },
  ])
  const itemClick = (route) => {
    if (mobile === "mobile") {
      onClose()
    }
    router.push(route)
  }
  return (
    <div className={styles.container}>
      {menuData?.map(({ title, icon, route }, index) => {
        return (
          <Row
            key={index}
            onClick={() => {
              JWT?.length > 0 ? itemClick(route) : router.push("/login-modal")
            }}
            className={
              router.asPath == route && router.asPath !== "/"
                ? styles.active_menu
                : index !== 3
                ? styles.menu_item
                : styles.log_out
            }
          >
            {icon} {title}
          </Row>
        )
      })}
    </div>
  )
}

export default MyAccountMenu
