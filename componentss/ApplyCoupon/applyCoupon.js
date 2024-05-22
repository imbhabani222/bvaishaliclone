import { Modal, Input, Radio, Space, Button, Tag, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import s from "./applyCoupon.module.scss";
import NoCouponImg from "../../public/assets/coupons/no-coupon.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import BASE_URL from "../../constants/textUtility/textenv";
import { UserAddOutlined } from "@ant-design/icons";
import CloseIcon from "../../public/assets/close-icon.svg";

const cookies = new Cookies();
function ApplyCouponModal({
  openModal,
  setApplyCouponModalOpen,
  setApplyedCoupon,
  applyedCoupon,
  cartPrice,
  mode,
}) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state?.updateCartProduct?.error);
  const [value, setValue] = useState(1);
  const [couponsData, setCouponsData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openTcModal, setOpenTcModal] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onchangeRadio = (item) => {
    setApplyCouponModalOpen(false);
    dispatch({ type: "ADD_COUPON", data: { couponId: item.id }, pm: mode });
  };
  useEffect(() => {
    if (error) {
      message.error("Cannot apply this coupon");
    }
  }, [error]);
  const couponCodeCheck = () => {
    let res = couponsData
      ?.filter((item) => item?.isActive)
      .filter((it) => it.code === couponCode);
    if (res?.length > 0) {
      dispatch({
        type: "ADD_COUPON",
        data: { couponCode },
      });
      setApplyCouponModalOpen(false);
    } else {
      message.error("Cannot apply this coupon");
    }
  };

  useEffect(() => {
    let url = `${BASE_URL}/store/api/v1/coupons/applicable?amt=${cartPrice}`;
    axios
      .get(url)
      .then((res) => {
        setCouponsData(res?.data?.coupons);
      })
      .catch((err) => {
        console.log("ERR******", err);
      });
  }, []);

  return (
    <>
      <Modal
        maskStyle={{ backdropFilter: "blur(10px)" }}
        maskClosable={false}
        title="Apply Coupons"
        centered
        open={openModal}
        onCancel={() => setApplyCouponModalOpen(false)}
        footer={null}
        closeIcon={
          <div className={s.close_icon}>
            <Image {...CloseIcon} alt="close-icon" />
          </div>
        }
        bodyStyle={{ height: "70vh", overflowY: "scroll" }}
      >
        <Input.Group style={{ display: "flex" }}>
          <Input
            style={{
              width: "calc(75%)",
            }}
            onPressEnter={() => couponCodeCheck()}
            value={couponCode}
            placeholder="Have a Coupon Code ?"
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button
            onClick={() => couponCodeCheck()}
            type="primary"
            className={s.primary_btn}
          >
            Apply
          </Button>
        </Input.Group>
        <div style={{ fontSize: 12, color: "red" }}>{errorMsg}</div>
        {couponsData?.length > 0 ? (
          <div className={s.coupon_list}>
            <Radio.Group onChange={onChange} className={s.map_container}>
              {couponsData
                ?.filter((item) => item?.isActive)
                ?.map((item, index) => {
                  return (
                    <Space
                      key={index}
                      direction="vertical"
                      className={s.coupon_card_wrapper}
                    >
                      <Radio
                        defaultChecked={false}
                        value={item?.id}
                        checked={item?.id === value}
                        onChange={() => onchangeRadio(item)}
                      >
                        <Tag color="default" className={s.coupon_code}>
                          {item?.code}
                        </Tag>
                        <div>
                          {item?.type === "FREE_SHIPPING" ? (
                            <span>This coupon offers for free shipping.</span>
                          ) : (
                            <>
                              <span className={s.price_off}>
                                Get Rs.{item?.maxDiscountAmount}
                              </span>{" "}
                              - cashback on minimum cart of Rs.
                              {item?.minCartAmount}
                              {/* plus a unique code worth Rs.125 applicable on next 2
                      shopping orders  */}{" "}
                              on{" "}
                              <b>{window.location?.host?.split(".")?.at(0)}</b>.{" "}
                            </>
                          )}

                          {item?.termsAndConditions && (
                            <span className={s.t_c}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (item?.termsAndConditions) {
                                    setOpenTcModal(true);
                                    setTermsAndConditions(
                                      item?.termsAndConditions
                                    );
                                  }
                                }}
                                className={s.t_c_action}
                              >
                                T&C
                              </button>
                            </span>
                          )}
                        </div>
                      </Radio>
                    </Space>
                  );
                })}
            </Radio.Group>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              height: "70%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <Image src={NoCouponImg} alt="no-coupon" />
            </div>
            <div>No Coupons Available</div>
          </div>
        )}
      </Modal>
      <Modal
        title="Terms & Conditions"
        centered
        open={openTcModal}
        onCancel={() => setOpenTcModal(false)}
        footer={null}
        width={500}
        bodyStyle={{ height: "auto", overflowY: "" }}
      >
        <p>{termsAndConditions}</p>
      </Modal>
    </>
  );
}

export default ApplyCouponModal;
