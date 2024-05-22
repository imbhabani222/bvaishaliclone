"use client";
// import { Button, Divider, Input, message, Modal } from "antd";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import styles from "./index.module.scss";
// import GoogleLogo from "../../public/assets/login-signup/google-logo.svg";
// import WhatsappLogo from "../../public/assets/login-signup/whatsapp-logo.svg";
// import CloseIcon from "../../public/assets/close-icon.svg";
// import { useRouter } from "next/router";
// import OtpImg from "../../../public/assets/otp.svg";
// // import OTPInput from "otp-input-react";
// import OtpInput from "react18-input-otp";
// // import OtpInput from "react-otp-input";
// import axios from "axios";
// import "antd/dist/antd.css";
// import Cookies from "universal-cookie";
// // imporhttps://zefayar-uat.hutechweb.comfrom "@/constants";
import { Divider, Input, message, Modal } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

import GoogleLogo from "../../public/assets/login-signup/google-logo.svg";
import WhatsappLogo from "../../public/assets/login-signup/whatsapp-logo.svg";
import CloseIcon from "../../public/assets/close-icon.svg";
import BASE_URL from "../../constants/textUtility/textenv";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import axios from "axios";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_SETTINGS } from "../../redux/settings/actions/actions";

const LoginSignUp = () => {
  const router = useRouter();
  const cookies = new Cookies();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [otpModal, setOtpModal] = useState(false);
  const [code, setCode] = useState("");
  const [source, setSource] = useState("");
  const [validation, setValidation] = useState(true);
  const [resendCount, setResendCount] = useState(60);
  const [signup, setSignup] = useState(false);
  const [sigupName, setSignUpName] = useState("");
  const [sigupMobile, setSignUpMobile] = useState("");
  const [sigupEmail, setSignUpEmail] = useState("");
  const [feildsFocused, setFeildsFocused] = useState(false);
  const [signupNumberErr, setSignUpNumberErr] = useState(false);
  const [signupMailErr, setSignUpMailErr] = useState(false);
  const [mobileEmailLoginSignupModal, setMobileEmailLoginSignupModal] =
    useState(false);

  const handleChange = (code) => setCode(code);

  useEffect(() => {
    const interval = setInterval(() => {
      if (otpModal) {
        if (resendCount <= 0) {
          return () => clearInterval(interval);
        } else {
          setResendCount((prevTime) => prevTime - 1);
        }
      } else {
        setResendCount(30);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [otpModal, resendCount]);

  const onMailNumberChange = (e) => {
    setSource(e?.target?.value);
    if (
      /^((\+\d{1,3}[- ]?)?\d{10}|[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)$/.test(
        e.target.value
      )
    ) {
      console.log("psass done");
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  const signUpNameChange = (e) => {
    let input = e?.target?.value;
    setSignUpName(input);
  };

  useEffect(() => {
    if (
      sigupName?.length !== 0 &&
      sigupEmail?.length !== 0 &&
      sigupMobile?.length !== 0
    ) {
      setFeildsFocused(true);
    }
  }, [sigupName, sigupEmail, sigupMobile]);

  const signupMobileChange = (e) => {
    let input = e?.target?.value;
    setSignUpMobile(input);
    if (/^\d{10}$/.test(input)) {
      setSignUpNumberErr(false);
    } else {
      setSignUpNumberErr(true);
    }
  };
  const signupEmailChange = (e) => {
    let input = e?.target?.value;
    setSignUpEmail(input);
    if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(input)) {
      setSignUpMailErr(false);
    } else {
      setSignUpMailErr(true);
    }
  };

  const signUpClick = () => {
    let url = `https://uatseller.zlite.in/global-cms/api/v1/user/signup`;
    let data = {
      name: sigupName,
      phone: sigupMobile,
      email: sigupEmail,
    };
    axios
      .post(url, data)
      .then((res) => {
        console.log("res", res);
        message.success("Account Created");
        setSignup(false);
      })
      .catch((err) => {
        console.log("err", err);
        message.warning("Somthing went wrong");
      });
    console.log("dadadadad", data);
  };

  const sendOTP = (type, source) => {
    setOtpModal(true);
    setCode("");
    setMobileEmailLoginSignupModal(false);

    if (type === "email" && source) {
      const data = JSON.stringify({
        source,
      });
      const config = {
        method: "post",
        url: `https://uatseller.zlite.in/global-cms/api/v1/otp/email`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
          message.error("Invalid OTP");
        });
    } else if (type === "phone" && source) {
      const data = JSON.stringify({
        source,
      });
      const config = {
        method: "post",
        url: `https://uatseller.zlite.in/global-cms/api/v1/otp/phone`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
          message.error("Invalid OTP");
        });
    }
  };

  const verifyOTP = (type, code) => {
    const data = JSON.stringify({
      source,
      otp: code,
    });
    const config = {
      method: "post",
      url: `https://uatseller.zlite.in/global-cms/api/v1/verify`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function ({ data }) {
        console.log("data");

        cookies.set("accessToken", data?.accessToken, {
          expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        });
        cookies.set("refreshToken", data?.refreshToken, {
          expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        });
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
        message.error("Invalid OTP");
      });
  };

  const resendOtp = () => {
    setResendCount(30);
    sendOTP(source.includes("@") ? "email" : "phone", source);
  };

  return (
    <div>
      <Modal
        maskStyle={{ backdropFilter: "blur(10px)" }}
        maskClosable={false}
        // title={<div className={styles.login_title}>Login</div>}
        open={isModalOpen}
        width={400}
        style={{ height: "60vh" }}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => router.back()}
        closeIcon={
          <div className={styles.close_icon}>
            <Image {...CloseIcon} alt="" />
          </div>
        }
      >
        {signup ? (
          <div className={styles.signup_wrapper}>
            <div>
              <label>
                Name <sup style={{ color: "red" }}>*</sup>
              </label>
              <Input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => signUpNameChange(e)}
              />
              <code style={{ color: "red" }}>
                {sigupName?.length > 0 && sigupName?.length < 3
                  ? "Minimum 3 charecters required"
                  : ""}
              </code>
            </div>
            <div>
              <label>
                Mobile <sup style={{ color: "red" }}>*</sup>
              </label>
              <Input
                type="number"
                placeholder="Enter Mobile"
                onChange={(e) => signupMobileChange(e)}
              />
              <code style={{ color: "red" }}>
                {signupNumberErr ? "Enter Valid Number" : ""}
              </code>
            </div>
            <div>
              <label>
                Email <sup style={{ color: "red" }}>*</sup>
              </label>
              <Input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => signupEmailChange(e)}
              />
              <code style={{ color: "red" }}>
                {signupMailErr ? "Enter Valid Email" : ""}
              </code>
            </div>
            <div className={styles.signup_button_wrapper}>
              {signupMailErr ||
              !feildsFocused ||
              signupNumberErr ||
              (sigupName?.length > 0 && sigupName?.length < 3) ? (
                <div className={styles.dsbl_btn}>SIGN UP</div>
              ) : (
                <button onClick={() => signUpClick()}>SIGN UP</button>
              )}
            </div>

            <div className={styles.login_text}>
              Already have an account ?{" "}
              <b
                onClick={() => {
                  setMobileEmailLoginSignupModal(true);
                  setIsModalOpen(false);
                }}
              >
                Log in
              </b>
            </div>
          </div>
        ) : null}
        {!signup && (
          <>
            <div className={styles.login_text_div}>LOGIN / SIGNUP</div>
            <button
              onClick={() => {
                setMobileEmailLoginSignupModal(true);
                setIsModalOpen(false);
              }}
              className={styles.loginwith_btn}
            >
              Mobile No / Email Id
            </button>
          </>
        )}
        <Divider>Or</Divider>
        <div className={styles.logo_wrapper}>
          <div
            className={styles.google_logo_wrapper}
            onClick={() => {
              window.open(
                `https://uatseller.zlite.in/global-cms/api/v1/google/auth`,
                "_self"
              );
            }}
          >
            <div
              style={{
                fontFamily: "Josefin Sans",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image src={GoogleLogo} alt="logo" />
              &nbsp; Google
            </div>

            <span>Sign up with Google</span>
          </div>
          <div
            className={styles.whatsapp_logo_wrapper}
            onClick={() => {
              window.open(
                `https://uatseller.zlite.in/global-cms/api/v1/whatsapp/auth`,
                "_self"
              );
            }}
          >
            <div
              style={{
                fontFamily: "Josefin Sans",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image src={WhatsappLogo} alt="logo" />
              &nbsp; Whatsapp
            </div>

            <span>Sign up with WhatsApp</span>
          </div>
        </div>
      </Modal>

      {mobileEmailLoginSignupModal && (
        <Modal
          maskClosable={false}
          maskStyle={{ backdropFilter: "blur(10px)" }}
          open={mobileEmailLoginSignupModal}
          width={400}
          footer={null}
          onOk={() => setMobileEmailLoginSignupModal(false)}
          onCancel={() => router.back()}
        >
          <div className={styles.title}>LOGIN / SIGNUP</div>
          {/* <div className={styles.logo_wrapper}>
            <div
              className={styles.google_logo_wrapper}
              onClick={() => {
                window.open(
                  `https://uatseller.zlite.in/global-cms/api/v1/google/auth`,
                  "_self"
                );
              }}
            >
              <Image src={GoogleLogo} alt="logo" />
              <span>Sign in with Google</span>
            </div>
            <div
              className={styles.whatsapp_logo_wrapper}
              onClick={() => {
                window.open(
                  `https://uatseller.zlite.in/global-cms/api/v1/whatsapp/auth`,
                  "_self"
                );
              }}
            >
              <Image src={WhatsappLogo} alt="logo" />
              <span>Sign in with WhatsApp</span>
            </div>
          </div>
          <Divider>Or</Divider> */}
          <div className={styles.label_wrapper}>
            <label className={styles.label}>
              Email Address /Mobile Number{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            <Input
              placeholder="Email Address /Mobile Number"
              onChange={(e) => onMailNumberChange(e)}
              value={source}
            />
            {validation && source?.length > 0 && (
              <span style={{ color: "red", opacity: 0.7 }}>
                Please Enter Valid Mobile No / Email Id
              </span>
            )}
          </div>
          <button
            className={styles.send_otp_btn}
            onClick={() => {
              if (source.includes("@")) {
                sendOTP("email", source);
                setResendCount(30);
              } else {
                sendOTP("phone", source);
                setResendCount(30);
              }
            }}
            disabled={validation}
            style={
              validation
                ? { cursor: "no-drop", opacity: 0.3 }
                : { cursor: "pointer" }
            }
          >
            SEND OTP
          </button>
        </Modal>
      )}
      {otpModal && (
        <Modal
          maskStyle={{ backdropFilter: "blur(10px)" }}
          maskClosable={false}
          open={otpModal}
          width={400}
          footer={null}
          onOk={() => setOtpModal(false)}
          onCancel={() => router.back()}
        >
          {/* <div className={styles.otp_img}>
            <Image {...OtpImg} alt="" />
          </div> */}
          <div className={styles.ver_code}>Verification Code</div>
          <p className={styles.otp_desc_text}>
            We sent a verification code to <br />
            <b>{source}</b>
            <span>. Enter the code.</span>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setMobileEmailLoginSignupModal(true);
              }}
            >
              Change {source?.includes("@") ? "Email" : "Mobile Number"}
            </a>
            {/* <span
              style={{
                color: "#01C0CC",
                cursor: "pointer",
              }}
              onClick={() => {
                setCode("");
                setOtpModal(false);
                setMobileEmailLoginSignupModal(true);
              }}
            >
              {" "}
              Change {source.includes("@") ? "Email" : "Mobile Number"}
            </span> */}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            {/* <OTPInput
              value={code}
              onChange={handleChange}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure={false}
            /> */}
            {/* <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={6}
              separator={<span style={{ width: "8px" }}></span>}
              isInputNum={true}
              shouldAutoFocus={true}
              inputStyle={{
                border: "1px solid black",
                borderRadius: "2px",
                width: "42px",
                height: "42px",
                fontSize: "12px",
                color: "#000",
                fontWeight: "400",
                caretColor: "#01C0CC",
              }}
              focusStyle={{
                border: "1px solid #01C0CC",
                outline: "none",
                color: "#01C0CC",
              }}
            /> */}
            <OtpInput
              value={code}
              onChange={handleChange}
              numInputs={6}
              separator={<span></span>}
              className="otp-input"
              style={{ width: "40px" }}
            />
          </div>
          {false && <p className={styles["invalidOtp"]}>Invalid OTP</p>}
          <div className={styles.resend_otp}>
            {/* <span>{resendCount}Dont reciev the OTP?</span> */}
            <button
              disabled={resendCount > 0}
              style={
                resendCount <= 0
                  ? { cursor: "pointer" }
                  : { cursor: "no-drop", opacity: 0.3 }
              }
              className={styles.btn}
              onClick={() => resendOtp()}
            >
              RESEND
            </button>
            <code className={styles.timer}>
              00:{resendCount < 10 ? `0${resendCount}` : resendCount}
            </code>
          </div>
          <div className={styles["headerbox"]}>
            <button
              type="primary"
              htmlType="submit"
              size="large"
              onClick={() => {
                if (source.includes("@")) {
                  verifyOTP("email", code);
                } else {
                  verifyOTP("phone", code);
                }
              }}
              className={
                code.length !== 6
                  ? styles["otp_verify_btn_disable"]
                  : styles["otp_verify_btn"]
              }
            >
              VERIFY & PROCEED
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoginSignUp;
