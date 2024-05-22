"use client"
import React, { useState } from "react"
import { Avatar, Badge, Breadcrumb, Image, Button, Divider, Switch } from "antd"
import {
  MinusOutlined,
  PlusOutlined,
  QuestionOutlined,
} from "@ant-design/icons"
import styles from "./productbanner.module.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-creative"
import BannerImg from "../../../../public/assets/productDetails/bannerImg.png"
import Cart from "../../../../public/assets/productDetails/cart.png"
const ButtonGroup = Button.Group

const ProductBanner = () => {
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
      slidesPerView: 1,
      spaceBetween: 40,
    },
    850: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    1000: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
    1800: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
  }

  // -----------------------------------

  const [count, setCount] = useState(5)
  const [show, setShow] = useState(true)
  const increase = () => {
    setCount(count + 1)
  }
  const decline = () => {
    let newCount = count - 1
    if (newCount < 1) {
      newCount = 1
    }
    setCount(newCount)
  }
  const random = () => {
    const newCount = Math.floor(Math.random() * 100)
    setCount(newCount)
  }
  const onChange = (checked) => {
    setShow(checked)
  }
  return (
    <>
      <div>
        <div className={styles.breadcrumb_div}>
          <Breadcrumb className={styles.breadcrumb_container}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Women</Breadcrumb.Item>
            <Breadcrumb.Item>Lehenga</Breadcrumb.Item>
            <Breadcrumb.Item>Embroidered Ready to Wear Lehenga</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={styles.banner_container}>
          <Swiper
            // loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loopFillGroupWithBlank={false}
            modules={[Navigation, Autoplay, Pagination]}
            className="mySwiper"
            breakpoints={responsiveSlide}
            pagination={{
              clickable: true,
            }}
            navigation={true}
          >
            {[BannerImg, BannerImg]?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image unoptimized src={item.src} alt="#" preview={false} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className={styles.title_container}>
          <h3>Embroidered Ready to Wear Lehenga</h3>
          <div className={styles.price}>₹4,095.00</div>
          <div className={styles.size}>
            Size:&nbsp;&nbsp;
            <span className={styles.label}>L</span>&nbsp;
            <span className={styles.label_xl}>XL</span>&nbsp;
            <span className={styles.label_xxl}>XXL</span>
          </div>
          <div className={styles.color}>
            Color:&nbsp;&nbsp;
            <span className={styles.color_label}></span>&nbsp;
            <span className={styles.color_label_xl}></span>&nbsp;
            <span className={styles.color_label_xxl}></span>
          </div>
          <div>
            Qty:&nbsp;&nbsp;&nbsp;
            <ButtonGroup className={styles.button_group}>
              <Button onClick={decline} style={{ background: "#DDDDDD" }}>
                <MinusOutlined />
              </Button>
              <Button>{count}</Button>
              <Button onClick={increase} style={{ background: "#DDDDDD" }}>
                <PlusOutlined />
              </Button>
            </ButtonGroup>
          </div>
          <div className={styles.buttons}>
            <Button className={styles.btn_txt}>
              <Image
                unoptimized
                src={Cart.src}
                alt="#"
                style={{ height: "20px", width: "20px" }}
              />
              &nbsp;&nbsp;&nbsp; ADD TO CART
            </Button>
            <Button
              className={styles.btn_txt}
              style={{ background: "#131313", color: "#FFFFFF" }}
            >
              BUY IT NOW
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductBanner
