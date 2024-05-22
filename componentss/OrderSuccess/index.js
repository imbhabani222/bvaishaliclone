import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import img from "../../public/assets/ordersuccess/order-success.png";
import styles from "./index.module.scss";
function OrderSuccess({ orderId }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.img_wrapper}>
        <Image src={img} height={200} width={200} alt="" />
      </div>
      <h3 className={styles.thank_you_text}>
        <b>Thank You!</b> Your order has been Placed.
      </h3>
      {orderId && (
        <div
          onClick={() => router.push("/my-orders")}
          className={styles.order_text}
        >
          Your order Id{" "}
          <span style={{ color: "#01C0CC", textTransform: "uppercase" }}>
            {orderId}
          </span>
        </div>
      )}
      <div className={styles.order_text}>
        We ll email you an order confirmation with details and tracking info.
      </div>
      <div className={styles.btn_wrapper}>
        <Link rel="canonical" href={"/"}>
          <span className={styles.continue_shop_btn}> CONTINUE SHOPPING</span>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
