import { Input, message, Modal } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import CloseIcon from "../../public/assets/close-icon.svg";
import BASE_URL from "../../constants/textUtility/textenv";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";

function UserData() {
  const router = useRouter();
  const cookies = new Cookies();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [signup, setSignup] = useState(false);
  const [sigupName, setSignUpName] = useState("");
  const [sigupMobile, setSignUpMobile] = useState("");
  const [sigupEmail, setSignUpEmail] = useState("");
  const [feildsFocused, setFeildsFocused] = useState(false);
  const [signupNumberErr, setSignUpNumberErr] = useState(false);
  const [signupMailErr, setSignUpMailErr] = useState(false);
  const [gender, setGender] = useState(null);

  const [dob, setDob] = useState(null);
  const [aniversary, setAnniversaryDate] = useState(null);

  const signUpNameChange = (e) => {
    let input = e?.target?.value;
    setSignUpName(input);
  };

  useEffect(() => {
    if (sigupName?.length !== 0 && sigupMobile?.length !== 0) {
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

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    // setLoader(true);
    let url = `${BASE_URL}/global-cms/api/v1/user/profile`;
    let JWT = cookies?.get("accessToken");
    axios
      .get(url, { headers: { Authorization: `Bearer ${JWT}` } })
      .then((res) => {
        const user = res?.data;
        const { firstName, phone, email, aniversary, dob, name, gender } = user;
        setSignUpName(name ?? firstName);
        setSignUpMobile(phone?.at(0));
        setSignUpEmail(email?.at(0));
        setDob(dob ? moment(dob).format("YYYY-MM-DD") : null);
        setAnniversaryDate(
          aniversary ? moment(aniversary).format("YYYY-MM-DD") : null
        );
        setGender(gender ?? null);
        console.log("rrrrrrrrrrrrrr", user);
      })
      .catch((err) => {
        message.warning("somthing went wrong");
      });
  };

  const editProfile = () => {
    let JWT = cookies.get("accessToken");
    let url = `${BASE_URL}/global-cms/api/v1/user/profile`;
    let payload = {
      aniversary: aniversary,
      dob: dob,
      email: sigupEmail,
      gender: gender,
      name: sigupName,
      phone: sigupMobile,
    };
    console.log("payloadpayload", payload);
    axios
      .put(url, payload)
      .then((res) => {
        // window.location.href = localStorage?.getItem("route") || "/";
        router.push("/");
      })
      .catch((err) => {
        message.warning("Something Went Wrong");
      });
  };

  return (
    <Modal
      keyboard={false}
      maskStyle={{ backdropFilter: "blur(10px)" }}
      maskClosable={false}
      title={<div className={styles.login_title}>Create Account</div>}
      open={isModalOpen}
      width={400}
      style={{ height: "60vh" }}
      footer={null}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => {}}
      closeIcon={<div className={styles.close_icon}></div>}
    >
      <div className={styles.signup_wrapper}>
        <div>
          <label>Mobile</label>
          <Input
            value={sigupMobile}
            disabled
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
            Name <sup style={{ color: "red" }}>*</sup>
          </label>
          <Input
            value={sigupName}
            type="text"
            placeholder="Enter Name"
            onChange={(e) => signUpNameChange(e)}
          />
          <code style={{ color: "red" }}>
            {(sigupName?.length > 0 && sigupName?.length < 3) ||
            !sigupName ||
            sigupName?.length == 0
              ? "Minimum 3 charecters required"
              : ""}
          </code>
        </div>
        {/* <div>
          <label>Email</label>
          <Input
            // disabled
            value={sigupEmail}
            type="email"
            placeholder="Enter Email"
            onChange={(e) => signupEmailChange(e)}
          />
          <code style={{ color: "red" }}>
            {signupMailErr ? "Enter Valid Email" : ""}
          </code>
        </div> */}
        <div className={styles.signup_button_wrapper}>
          {!feildsFocused ||
          signupNumberErr ||
          !sigupName ||
          sigupName?.length == 0 ||
          (sigupName?.length > 0 && sigupName?.length < 3) ? (
            <div className={styles.dsbl_btn}>SUBMIT</div>
          ) : (
            <button onClick={() => editProfile()}>SUBMIT</button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default UserData;
