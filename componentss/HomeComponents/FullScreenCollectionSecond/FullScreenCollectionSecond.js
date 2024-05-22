"use client";
import React from "react";
import styles from "./FullScreenCollectionSecond.module.scss";
import Image from "next/image";
import Img from "../../../public/assets/saree.png";
import ButtonArrow from "../../../public/assets/arrowbutton.svg";
import { useRouter } from "next/router";
import Background from "../../../public/assets/fourth.svg";
import Attire from "../../../public/assets/red.svg";
import Attire2 from "../../../public/assets/yellow.svg";




function FullScreenCollectionSecond() {
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
        <Image unoptimized src={Attire} alt="image" height="400px" width="1440px" />
      </div>
      <div className={styles.attiresec}>
        <Image unoptimized src={Attire2} alt="image" height="400px" width="1440px" />
      </div> */}
      {/* <div className={styles.content}>
        <p>Women Embellished <br /> <span>Straight Kurta</span></p>
      </div> */}

      {/* <div className={styles.text_content}>
        <div
          style={{ padding: "0px 15px" }}
          className={styles.text_content_img_div}
        >
          <Image unoptimized {...Img} alt="image" />
        </div>
        <div
          style={{
            display: "flex",
            rowGap: "5px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: "0" }}>Saree</h2>
          <p style={{ margin: "0" }}>Saree at amazing prices</p>
          <button
            className={styles.button_collection}
            onClick={() => handlelCick()}
          >
            <div>
              VIEW ALL{" "}
              <span>
                {" "}
                <Image
                  src={ButtonArrow}
                  alt="cart-reduce"
                  loading="lazy"
                  width={14}
                  height={12}
                />
              </span>
            </div>
          </button>
        </div>
      </div> */}
      {/* <div className={styles.image_content}>
        <Image unoptimized {...Img} alt="image" className={styles.image} />
      </div> */}
    </div >
  );
}

export default FullScreenCollectionSecond;
