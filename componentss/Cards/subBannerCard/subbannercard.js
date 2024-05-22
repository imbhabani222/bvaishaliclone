import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Button } from "antd";
import styles from "./subbannercard.module.scss";
import Img from "../../../public/assets/productCardImg/product-img-ph.jpg";
import ButtonArrow from "../../../public/assets/arrowbutton.svg";
import { useRouter } from "next/router";

function SubBannerCard({ data }) {
  console.log(data.length, "multiple banners")
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



  console.log(data, "datafdasfdadf");
  return (
    <div className={`${styles.container}`}>
      <div
        className={`${styles.card_right}`}
        style={
          data?.linkType && !data?.hasUnavailItems
            ? { cursor: "pointer" }
            : undefined
        }
        onClick={() => {
          data?.linkType ? bannerClick(data) : undefined;
        }}
      >
        {data?.mediaDetails?.url || data?.url ? (
          <Image
            unoptimized
            src={data?.mediaDetails?.url || data?.url}
            height={400}
            width={1600}
            alt={data?.mediaDetails?.alt}
            className={`${styles.card_img}`}
            loading="lazy"
          />
        ) : (
          <Image
            unoptimized
            src={Img}
            height={400}
            width={1600}
            alt="placeholder-image"
            className={`${styles.card_img}`}
            loading="lazy"
          />
        )}
        <div className={styles.cart_text}>
        </div>
        <div className={styles.cartextbg} />
      </div>
    </div>
  );
}

export default SubBannerCard;
