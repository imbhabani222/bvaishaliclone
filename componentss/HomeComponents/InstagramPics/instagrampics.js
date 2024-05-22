"use client";
import React from "react";
import Img1 from "../../../public/assets/carousel/img1.png";
import Img2 from "../../../public/assets/carousel/img2.png";
import Img3 from "../../../public/assets/carousel/img3.png";
import Img4 from "../../../public/assets/carousel/img4.png";
import Img5 from "../../../public/assets/carousel/img3.png";
import instaIcon from "../../../public/assets/socialLinksLogo/instaIcon.png";
import styles from "./instagram.module.scss";
import Image from "next/image";

function InstagramPics() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>@BVaishali</div>
      <div className={styles.fallow_text}>Follow us on Instagram</div>
      <div className={styles.card_wrapper}>
        {[Img3, Img1, Img2, Img3, Img2, Img5]?.map((item, index) => {
          return (
            <div key={index}>
              <Image unoptimized {...item} alt="" />
            </div>
          );
        })}
      </div>
      <div className={styles.fallow_btn_wrapper}>
        <button>
          <Image
            unoptimized
            {...instaIcon}
            alt=""
            style={{ height: "20px", width: "20px" }}
          />
          Follow Us On Instagram
        </button>
      </div>
    </div>
  );
}

export default InstagramPics;
