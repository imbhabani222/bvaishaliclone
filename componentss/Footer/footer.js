import { Col, message, Row, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./footer.module.scss";
import ZliteLogo from "../../public/Zlitelogo.svg";
import Link from "next/link";
import Cookies from "universal-cookie";

import FbLogo from "../../public/assets/social-icons/fb.svg";
import InstaLogo from "../../public/assets/social-icons/insta.svg";
import LinkedinLogo from "../../public/assets/social-icons/linkedin.svg";
import snapShotLogo from "../../public/assets/social-icons/snapchat.svg";
import pintrestLogo from "../../public/assets/social-icons/pin.svg";
import whatsappLogo from "../../public/assets/social-icons/whatsapp.svg";
import TwitterLogo from "../../public/assets/social-icons/twitter.svg";
import YoutubeLogo from "../../public/assets/social-icons/youtube.svg";
import fssaiLogo from "../../public/fssai_.png";
import drugLicence from "../../public/drugs.svg";
import mallLogo from "../../public/footer-mall.svg";
import arrowRight from "../../public/arrow-right.svg";

function Footer({ data }) {
  const router = useRouter();
  const cookies = new Cookies();
  var JWT = cookies?.get("accessToken");

  let storeDetail = useSelector((state) => state?.allStore || []);
  console.log("mediaData", data?.storeDetails?.fssaiNumber);
  const user = data?.socialLinks;
  let arr = [];
  if (user) {
    for (const key in user) {
      arr.push(`${key}: ${user[key]}`);
    }
  }

  return (
    <div className={styles.container}>
      <Row className={styles.footer_content_wrapper}>
        <Col xl={5} lg={12} md={12} sm={24} xs={24}>
          <Row>
            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{ marginBottom: "20px" }}
            >
              {storeDetail?.result?.logoData?.url ? (
                <Link rel="canonical" href={"/"}>
                  <Image
                    height={50}
                    width={150}
                    // objectFit="cover"
                    objectFit="contain"
                    style={{ cursor: "pointer" }}
                    src={storeDetail?.result?.logoData?.url}
                    alt={
                      storeDetail?.result?.logoData?.alt ||
                      storeDetail?.result?.logoData?.name
                    }
                  />
                </Link>
              ) : (
                <Link href={"/"}>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      cursor: "pointer",
                    }}
                  >
                    {storeDetail?.result?.name?.toUpperCase()}
                  </div>
                </Link>
              )}
            </Col>
          </Row>
        </Col>
        {data?.email || data?.mobile || data?.phone ? (
          <Col xl={5} lg={12} md={24} sm={24} xs={24}>
            <Row>
              <Col
                className={styles.heading_text}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
              >
                Contact Us
              </Col>
            </Row>
            <Row>
              <Col
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className={styles.store_desc}
              >
                {data?.email && (
                  <div>
                    <span className={styles.heading}>Email: </span>
                    <a className={styles.text} href={`mailto:${data?.email}`}>
                      {data?.email}
                    </a>
                  </div>
                )}
                {data?.mobile && (
                  <div>
                    <span className={styles.heading}>Mobile: </span>
                    <a className={styles.text} href={`tel:${data?.mobile}`}>
                      {data?.mobile}
                    </a>
                  </div>
                )}
                {data?.phone && (
                  <div>
                    <span className={styles.heading}>Phone: </span>
                    <a className={styles.text} href={`tel:${data?.phone}`}>
                      {data?.phone}
                    </a>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        ) : (
          ""
        )}
        <Col xl={6} lg={12} md={24} sm={24} xs={24}>
          <Row>
            <Col
              className={styles.heading_text}
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
            >
              Address
            </Col>
          </Row>
          <Row>
            <Col
              xl={16}
              lg={16}
              md={16}
              sm={15}
              xs={15}
              className={styles.store_desc}
            >
              <div className={styles.text}>{storeDetail?.result?.name}</div>
              {storeDetail?.result?.addressData?.addr1 ? (
                <div className={styles.text}>
                  {` ${
                    storeDetail?.result?.addressData?.addr1 &&
                    storeDetail?.result?.addressData?.addr1 + ","
                  }
                 ${storeDetail?.result?.addressData?.addr2 ?? ""}
                  ${storeDetail?.result?.addressData?.city ?? +","}
                   ${storeDetail?.result?.addressData?.state ?? +","}
                    ${storeDetail?.result?.addressData?.country ?? +" India,"}
                     ${
                       storeDetail?.result?.addressData?.pinCode &&
                       storeDetail?.result?.addressData?.pinCode
                     }`}
                </div>
              ) : (
                <Spin />
              )}
            </Col>
          </Row>
        </Col>
        <Col xl={4} lg={12} md={24} sm={24} xs={24}>
          <Row>
            <Col
              className={styles.heading_text}
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
            >
              Useful Links
            </Col>
          </Row>
          <Row>
            <Col
              xl={8}
              lg={8}
              md={24}
              sm={24}
              xs={24}
              className={styles.store_desc}
            >
              <Link
                rel="canonical"
                href={`${JWT?.length > 0 ? "/my-cart" : "/my-cart"}`}
              >
                <div className={styles.text}>My Cart</div>
              </Link>
              <Link href={`${JWT?.length > 0 ? "/whishlist" : "/login-modal"}`}>
                <div className={styles.text}>Wishlist</div>
              </Link>
            </Col>
          </Row>
        </Col>
        {(data?.mediaData?.url || data?.storeDetails?.fssaiNumber) && (
          <Col xl={4} lg={12} md={24} sm={24} xs={24}>
            <Row>
              <Col
                className={styles.heading_text}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
              >
                Privacy & Terms
              </Col>
            </Row>
            {data?.mediaData?.url && (
              <Row>
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className={styles.store_desc}
                >
                  <div className={styles.text}>
                    <div
                      onClick={() =>
                        window.open(
                          data?.mediaData?.url,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      Terms & Conditions
                    </div>
                  </div>
                </Col>
              </Row>
            )}
            <Row className={styles.store_desc}>
              {data?.storeDetails?.fssaiNumber && (
                <div>
                  <Image
                    loading="lazy"
                    style={{ backgroundColor: "white", borderRadius: 2 }}
                    src={
                      data?.storeDetails?.industry === "Pharmacy"
                        ? drugLicence
                        : fssaiLogo
                    }
                    height={50}
                    width={100}
                    alt=""
                  />
                  <div style={{ color: "white" }}>
                    Lic. No. <code>{data?.storeDetails?.fssaiNumber}</code>
                  </div>
                </div>
              )}
            </Row>
          </Col>
        )}
      </Row>
      <Row className={styles.poweredby_wrapper}>
        <Col
          xl={16}
          lg={16}
          md={24}
          sm={24}
          xs={24}
          className={styles.powered_by_title_wrapper}
        >
          <span className={styles.powered_by_title}>powered by :</span>
          <Image loading="lazy" src={ZliteLogo} alt="logo" />
          <span className={styles.powered_by_title}>
            . All rights reserved.
          </span>
        </Col>
        {arr?.length > 0 && (
          <Col
            xl={8}
            lg={8}
            md={24}
            sm={24}
            xs={24}
            style={{ display: "flex" }}
          >
            <div style={{ color: "white" }}>
              {arr
                ?.map((it) => it?.split(":")?.at(1))
                ?.map((ee) => ee)
                ?.find((dd) => dd?.length > 1)?.length > 1
                ? "Connect : "
                : ""}
            </div>
            {arr?.map((item, index) => {
              return (
                <div
                  onClick={() =>
                    item?.split(" ")?.at(1)?.trim()?.includes("http")
                      ? window?.open(item?.split(" ")?.at(1)?.trim(), "_blank")
                      : window?.open(
                          `https://wa.me/${item?.split(" ")?.at(1)?.trim()}`,
                          "_blank"
                        )
                  }
                  key={index}
                  style={{
                    color: "white",
                    cursor: "pointer",
                    marginLeft: 10,
                  }}
                >
                  {item?.split(":")?.at(0) == "fb" &&
                  item?.split(" ")?.at(1)?.includes("http") ? (
                    <Image {...FbLogo} alt="" />
                  ) : item?.split(":")?.at(0) == "yt" &&
                    item?.split(" ")?.at(1)?.includes("http") ? (
                    <Image {...YoutubeLogo} alt="" />
                  ) : item?.split(":")?.at(0) == "insta" &&
                    item?.split(" ")?.at(1)?.includes("http") ? (
                    <Image {...InstaLogo} alt="" />
                  ) : item?.split(":")?.at(0) == "twitter" &&
                    item?.split(" ")?.at(1)?.includes("http") ? (
                    <Image {...TwitterLogo} alt="" />
                  ) : item?.split(":")?.at(0) == "linkedIn" &&
                    item?.split(" ")?.at(1)?.includes("http") ? (
                    <Image {...LinkedinLogo} alt="" />
                  ) : item?.split(":")?.at(0) == "whatsapp" &&
                    item?.split(" ")?.at(1)?.length > 1 ? (
                    <Image {...whatsappLogo} alt="" />
                  ) : item?.split(":")?.at(0) == "snapchat" &&
                    item?.split(" ")?.at(1)?.includes("http") ? (
                    <Image {...snapShotLogo} alt="" />
                  ) : item?.split(":")?.at(0) == "pinterest" &&
                    item?.split(" ")?.at(1)?.includes("http") ? (
                    <Image {...pintrestLogo} alt="" />
                  ) : null}
                </div>
              );
            })}
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Footer;
