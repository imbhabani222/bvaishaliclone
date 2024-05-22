"use client";
import React from "react";
import styles from "./fullscreencollection.module.scss";
import Image from "next/image";
import Img from "../../../public/assets/saree.png";
import ButtonArrow from "../../../public/assets/arrowbutton.svg";
import { useRouter } from "next/router";
import Background from "../../../public/assets/bgd.svg";
import Attire from "../../../public/assets/attire.svg";
import Attire2 from "../../../public/assets/secAttire.svg";



function FullScreenCollection() {
  const router = useRouter();
  const handlelCick = () => {
    router.push(`/product-list?cat=saree`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.background_div}>
        <Image unoptimized src={Background} alt="image" />
      </div>
      {/* <div className={styles.attire}>
        <Image unoptimized src={Attire} alt="image" height="400px" width="1430px" />
      </div>
      <div className={styles.attiresec}>
        <Image unoptimized src={Attire2} alt="image" height="390px" width="1430px" />
      </div> */}
      {/* <div className={styles.content}>
        <p>Geometric Print Fit<br /> & Flare Dress</p>
      </div> */}
    </div >
  );
}

export default FullScreenCollection;
