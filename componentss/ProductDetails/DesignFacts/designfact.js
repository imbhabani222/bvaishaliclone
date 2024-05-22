"use client";
import React from "react";
import styles from "./designfacts.module.scss";
import Saree from "../../../public/staticsAssets/SareeDesign.jpg";
import ImageOne from "../../../public/staticsAssets/Image1.png";
import ImageTwo from "../../../public/staticsAssets/Image1.png";
import ImageThree from "../../../public/staticsAssets/Image1.png";
import { Col, Image, Row } from "antd";
const DesignFact = ({
  designFactsFirstParagraph,
  designFactsImg,
  designFactsSecondParagraph,
  designFactsThirdParagraph,
}) => {
  return (
    <>
      {designFactsFirstParagraph ||
      designFactsImg ||
      designFactsSecondParagraph ||
      designFactsThirdParagraph ? (
        <div className={styles.container}>
          <h4>Design Facts</h4>
          {designFactsFirstParagraph && <p>{designFactsFirstParagraph}</p>}
          <Row gutter={12}>
            {designFactsImg && (
              <Col xl={12}>
                <Image src={designFactsImg} height={315} />
              </Col>
            )}
            {designFactsSecondParagraph && (
              <Col xl={12}>
                <p>{designFactsSecondParagraph}</p>
              </Col>
            )}
          </Row>
          {designFactsThirdParagraph && (
            <p style={{ marginTop: "20px" }}>{designFactsThirdParagraph}</p>
          )}
          {/* Related Products */}
        </div>
      ) : null}
      {/* <div>
        <p
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontFamily: "Playfair Display",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "34px",
            letterSpacing: "0em",
          }}
        >
          Related Products
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {[1, 1, 1].map((item, index) => {
            return (
              <div key={index}>
                <Image src={ImageOne.src} />
                <div>
                  <p
                    style={{
                      fontFamily: "Josefin Sans",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "0em",
                      textAlign: "left",
                      marginTop: "25px",
                      marginBottom: "20px",
                    }}
                  >
                    Embroidered Ready to Wear Lehenga & Blouse With Dupatta
                  </p>
                  <p
                    styles={{
                      fontFamily: "Josefin Sans",
                      fontSize: "18px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "0em",
                      textAlign: "center",
                    }}
                  >
                    ₹3000
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
};

export default DesignFact;
