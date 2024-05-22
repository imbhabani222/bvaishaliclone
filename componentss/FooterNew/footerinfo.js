"use client";
import React from "react";
import styles from "./footerinfo.module.scss";
import Image from "next/image";
import facebookIcon from "../../public/assets/socialLinksLogo/facebookIcon.png";
import instaIcon from "../../public/assets/socialLinksLogo/instaIcon.png";
import pinterestIcon from "../../public/assets/socialLinksLogo/pinterestIcon.png";
import { Col, Row, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const FooterInfo = ({ data }) => {
  const router = useRouter();

  let storeDetail = useSelector((state) => state?.allStore || []);
  return (
    <>
      <div className={styles.container}>
        <Row className={styles.footer_content_wrapper}>
          <Col xl={5} lg={12} md={12} sm={24} xs={24}>
            <Row>
              <Col
                className={styles.heading_text}
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
              >
                INFORMATION
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
                <Link href={"/"}>
                  <div>Our Story</div>
                </Link>
                <div>Store Locations</div>
                <div>Our Blog</div>
                <div>Contact Us</div>
              </Col>
            </Row>
          </Col>
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
                SHOP
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
                <div
                  onClick={() => router.push(`/product-list?cat=${"saree"}`)}
                >
                  Saree
                </div>
                <div
                  onClick={() => router.push(`/product-list?cat=${"salwar"}`)}
                >
                  Salwar
                </div>
                <div
                  onClick={() => router.push(`/product-list?cat=${"kurti"}`)}
                >
                  Kurti
                </div>
                <div
                  onClick={() => router.push(`/product-list?cat=${"lehenga"}`)}
                >
                  Lehenga
                </div>
                <div
                  onClick={() => router.push(`/product-list?cat=${"skirts"}`)}
                >
                  Skirts
                </div>
                <div onClick={() => router.push(`/product-list?cat=${"gown"}`)}>
                  Frock & Gown
                </div>
              </Col>
            </Row>{" "}
          </Col>
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
                POLICY
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
                <Link href={"/privacy-policy"}>
                  <div>Privacy Policy</div>
                </Link>
                <Link href={"/refund-policy"}>
                  <div>Refund Policy</div>
                </Link>
                <Link href={"/shipping-policy"}>
                  <div>Shipping Policy</div>
                </Link>
                <Link href={"/terms-service"}>
                  <div>Terms of Service</div>
                </Link>
              </Col>
            </Row>{" "}
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
                CONTACT US
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
                <div>
                  <span className={styles.heading}>Call: </span>
                  <a
                    className={styles.text}
                    href={`mailto:${data?.mobile ?? "9348807671"}`}
                  >
                    {data?.mobile ?? "9348807671"}
                  </a>
                </div>
                <div>
                  <span className={styles.heading}>Email: </span>
                  <a
                    className={styles.text}
                    href={`mailto:${data?.email ?? "bvaishalis06@gmail.com"}`}
                  >
                    {data?.email ?? "bvaishalis06@gmail.com"}
                  </a>
                </div>
                {storeDetail?.result?.addressData?.addr1 ? (
                  <div>
                    Address:
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
                FOLLOW US
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
                <div className={styles.social_link_btn}>
                  <a href="https://m.facebook.com/VaishaliSethiFashion">
                    <Image unoptimized src={facebookIcon} alt="#" />
                  </a>
                  <a href="https://instagram.com/vaishalisethi_?igshid=MzRlODBiNWFlZA==">
                    <Image unoptimized src={instaIcon} alt="#" />
                  </a>
                  <a href="#">
                    <Image unoptimized src={pinterestIcon} alt="#" />
                  </a>
                </div>
              </Col>
            </Row>{" "}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default FooterInfo;
