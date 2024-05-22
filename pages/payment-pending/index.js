import React from "react";
import styles from "./index.module.scss";
import Img from "../../public/assets/payment/payment-pending.png";
import Image from "next/image";
const PaymentFailed = () => {
  return (
    <div className={styles.container}>
      <Image {...Img} alt="" />
      <div className={styles.title}>Payment is still under processing</div>
      <div className={styles.desc}>
        Sending payment requests to the bank! Please wait
      </div>
    </div>
  );
};

export default PaymentFailed;
