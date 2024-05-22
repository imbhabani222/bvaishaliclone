"use client";
import React from "react";
import styles from "./designprocess.module.scss";
import { Col, Image, Row } from "antd";
import Img4 from "../../../public/assets/productDetails/img4.png";
import Img5 from "../../../public/assets/productDetails/img5.png";
import LehengaOne from "../../../public/staticsAssets/Lehenga1.png";
import LehengaTwo from "../../../public/staticsAssets/Lehenga2.jpg";
import LehengaThree from "../../../public/staticsAssets/Lehenga3.png";

const DesignProcess = ({
  ourDesignImgs,
  ourDesignProceessContent,
  video,
  Images,
  desImages,
  desSecondImgs,
  desThirdImgs,
}) => {
  let videoId = video?.split("/")?.at(-1);
  return (
    <>
      <div className={styles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "48px",
          }}
        >
          {desImages && desSecondImgs && desThirdImgs && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "60px",
                  width: "50%",
                  alignItems: "stretch",
                }}
              >
                <Image
                  // src={Images?.at(0)?.media?.at(0)?.url}
                  src={desImages}
                  alt=""
                  height={430}
                  width="100%"
                  objectFit={"contain"}
                  style={{ gridArea: "1 / 1 / 2 / 2", borderRadius: "15px" }}
                />

                <Image
                  // src={Images?.at(1)?.media?.at(0)?.url}
                  src={desSecondImgs}
                  alt=""
                  height={430}
                  width="100%"
                  objectFit={"contain"}
                  style={{ gridArea: "2 / 1 / 3 / 2", borderRadius: "15px" }}
                />
              </div>
              <div>
                <Image
                  // src={Images?.at(2)?.media?.at(0)?.url}
                  src={desThirdImgs}
                  alt=""
                  height={920}
                  width="100%"
                  objectFit={"contain"}
                  style={{
                    gridArea: "1 / 2 / 3 / 3",
                    borderRadius: "15px",
                  }}
                />
              </div>
            </>
          )}
        </div>
        {ourDesignImgs && ourDesignImgs.length > 0 && (
          <div>
            <h4 style={{ marginTop: "60px", marginBottom: "60px" }}>
              Our Design Process
            </h4>
            <Row
              gutter={[45, 12]}
              style={{ flexDirection: "row", marginBottom: "50px" }}
            >
              {ourDesignImgs.map((item, index) => (
                <Col key={index} span={12}>
                  <Image unoptimized src={item} alt="#" preview={false} />
                </Col>
              ))}
            </Row>
          </div>
        )}
        <div className={styles.description_text}>
          {ourDesignProceessContent}
        </div>
        {videoId && (
          <div className={styles.video}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};

export default DesignProcess;
