import React from "react";
import styles from "./index.module.scss";
import Img from "../../public/assets/payment/payment-failed.png";
import Image from "next/image";
import { useRouter } from "next/router";
const PaymentFailed = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Image {...Img} alt="" />
      <div className={styles.title}>Payment Failed</div>
      <div className={styles.desc}>
        Don’t worry your money is in safe hands! If money was debited from your
        account, it will be refunded automatically within 5-6 working days.
      </div>
      <button onClick={() => router.push("/my-cart")} className={styles.btn}>
        RETRY
      </button>
    </div>
  );
};

export default PaymentFailed;
