import { Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import BASE_URL from "../../constants/textUtility/textenv";
const PaymentProcess = () => {
  const router = useRouter();
  const { transactionId } = router.query;

  useEffect(() => {
    var counter = 0;
    let url = `${BASE_URL}/store/api/v1/payment/get-pay-status/${transactionId}`;
    let interval = setInterval(() => {
      axios
        .get(url)
        .then((res) => {
          counter++;
          if (counter === 4) {
            clearInterval(interval);
            router.push("/payment-pending");
          }
          if (res.data?.status === "FAILED") {
            router.push("/payment-failed");
          } else if (res.data?.status === "SUCCESS") {
            router.push(`/payment-success?${res?.data?.orderId}`);
          } else if (res?.data?.status === "PENDING") {
            router.push("/payment-pending");
          }
        })
        .catch((err) => {
          counter++;
          if (counter === 4) {
            clearInterval(interval);
            router.push("/payment-pending");
          }
          console.log("ERR PAY", err);
        });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [transactionId]);

  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
      <div className={styles.message}>
        <span>Transaction in progress</span>
        <br />
        <span>Please do not close this window</span>
      </div>
    </div>
  );
};

export default PaymentProcess;
