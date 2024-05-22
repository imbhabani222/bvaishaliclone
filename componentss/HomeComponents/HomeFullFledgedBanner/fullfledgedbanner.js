import React from "react";
import styles from "./fullfledgedbanner.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

function HomeFullFledgedBanner({ data }) {
  const router = useRouter();

  const bannerClick = (item) => {
    if (item?.linkType && !item?.hasUnavailItems) {
      if (item?.linkType === "category") {
        router.push(`/product-list?cat=${item?.slug}`);
      } else {
        router.push(`/product-details/${item?.slug}`);
      }
    }
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        data[0]?.linkType ? bannerClick(data[0]) : undefined;
      }}
    >
      <Image
        unoptimized
        className={styles.banner_img_mobile}
        src={data[0]?.mediaDetails?.url || data[0]?.url}
        alt=""
        width={1920}
        height={400}
        loading="lazy"
      />
    </div>
  );
}

export default HomeFullFledgedBanner;
