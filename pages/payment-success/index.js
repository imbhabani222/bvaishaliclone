import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Img from "../../public/assets/payment/payment-success.png";
import Image from "next/image";
import { useRouter } from "next/router";
import OrderSuccess from "../../componentss/OrderSuccess";
const PaymentFailed = () => {
  const router = useRouter();

  const id = Object.keys(router?.query);
  let orderId = id?.join(",");
  const [showOrderSuccessMsg, setShowOrderSuccessMsg] = useState([false]);
  useEffect(() => {
    setTimeout(() => {
      setShowOrderSuccessMsg(true);
    }, 1000);
  }, []);
  return (
    <div className={styles.container}>
      {!showOrderSuccessMsg ? (
        <>
          <Image {...Img} alt="" />
          <div className={styles.title}>Your payment is successful</div>
          <div className={styles.desc}>Please wait for a few seconds.</div>
        </>
      ) : (
        <OrderSuccess orderId={orderId} />
      )}
    </div>
  );
};

export default PaymentFailed;
