"use client"
import React from "react"
import styles from "./thirdcollection.module.scss"
import Image from "next/image"
import Img from "../../../../public/assets/thirdCollection/img.png"
import Img2 from "../../../../public/assets/thirdCollection/img2.png"
import Img3 from "../../../../public/assets/thirdCollection/img3.png"

function ThirdCollectionCard({ item }) {
  return (
    <div className={styles.container}>
      <Image unoptimized {...Img} alt="" className={styles.card_img} />
      <div className={styles.text_wrapper}>
        <h2>Special Offer</h2>
        <p>Women Ethnic Motifs Embroidered </p>
        <button>VIEW COLLECTION</button>
      </div>
    </div>
  )
}

export default ThirdCollectionCard
