import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./categorycard.module.scss";
import PlaceholderImg from "../../../public/assets/homeCatImgs/category-img-ph.jpg";
import { Typography } from "antd";
import Link from "next/link";

function CategoriesCard(data) {
  const router = useRouter();
  const { displayName, mediaData, id, slug } = data?.data;
  return (
    <Link
      rel="canonical"
      href={
        displayName !== "All" ? `/product-list?cat=${slug}` : "/product-list"
      }
    >
      <div className={`${styles.container}`}>
        {data?.data?.mediaData?.url == undefined ? (
          <Image
            width={150}
            height={150}
            unoptimized
            src={PlaceholderImg}
            loading="lazy"
            alt={
              data?.data?.mediaData?.alt || data?.data?.mediaData?.name || ""
            }
            longdesc={data?.data?.mediaData?.alt || data?.data?.mediaData?.name}
            className={styles.cat_img}
          />
        ) : (
          <Image
            width={150}
            height={150}
            loading="lazy"
            unoptimized
            className={styles.cat_img}
            src={data?.data?.mediaData?.url}
            alt={data?.data?.mediaData?.alt || data?.data?.mediaData?.name}
            longdesc={data?.data?.mediaData?.alt || data?.data?.mediaData?.name}
            // objectFit="scale-down"
          />
        )}
        <Typography className={`${styles.card_title}`}>
          {data?.data?.displayName}
        </Typography>
      </div>
    </Link>
  );
}

export default CategoriesCard;
