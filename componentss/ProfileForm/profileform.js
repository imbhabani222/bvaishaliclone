import React, { useEffect, useState } from "react"
import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Radio,
  DatePicker,
  Spin,
  message,
  Modal,
  Tooltip,
} from "antd"
import "antd/dist/antd.css"
import styles from "./profileform.module.scss"
import Img from "../../public/assets/myAccount/edit-icon.svg"
import Image from "next/image"
import {
  CheckCircleOutlined,
  LoadingOutlined,
  EditOutlined,
  FormOutlined,
} from "@ant-design/icons"
import { useSelector } from "react-redux"
import BASE_URL from "../../constants/textUtility/textenv"
import Cookies from "universal-cookie"
import axios from "axios"
import Loader from "../Loader"
import moment from "moment"
import OtpInput from "react-otp-input"

const { TextArea } = Input
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: "white",
    }}
    spin
  />
)

const Profileform = () => {
  const cookies = new Cookies()
  const user = useSelector((state) => state?.allStore?.result?.user || null)
  const [form] = Form.useForm()
  const [formDisable, setFormDisable] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [dob, setDob] = useState(null)
  const [aniversary, setAnniversaryDate] = useState(null)
  const [otpModal, setOtpModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [loader, setLoader] = useState(false)
  const [validation, setValidation] = useState(false)
  const [userType, setUserType] = useState("")
  const [resendCount, setResendCount] = useState(60)
  const [otpType, setOtpType] = useState()
  const [phone_numb, setPhoneNumber] = useState("")
  const [validMobile, setValidMobile] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [_email, setEmail] = useState("")
  const [isOtpVerified, setOtpVerified] = useState(false)
  const [user1, setUser1] = useState({
    name: null,
    phone: null,
    email: null,
    gender: null,
    dob: dob,
    aniversary: aniversary,
    id: null,
  })

  const onFinish = (values) => {
    setBtnLoading(true)
    setTimeout(() => {
      setBtnLoading(false)
      setFormDisable(true)
    }, 1000)
  }

  const onFinishFailed = (errorInfo) => {
    setFormDisable(false)
  }

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () => {
    setLoader(true)
    let url = `${BASE_URL}/global-cms/api/v1/user/profile`
    let JWT = cookies?.get("accessToken")
    axios
      .get(url, { headers: { Authorization: `Bearer ${JWT}` } })
      .then((res) => {
        const user = res?.data
        console.log("rrrrrrrrrrrrrr", res?.data)
        if (user?.isGoogleUser && user?.isWhatsAppUser) {
          setUserType("both")
        } else {
          const _temp = user?.isGoogleUser
            ? "google_user"
            : user?.isWhatsAppUser
            ? "wa_user"
            : ""
          setUserType(_temp)
        }
        let formFields = {
          name: user?.name || user?.firstName,
          phone: user?.phone.at(0),
          email: user?.email.at(0),
          dob: user?.dob ? moment(user?.dob).format("YYYY-MM-DD") : "",
          aniversary: user?.aniversary
            ? moment(user?.aniversary).format("YYYY-MM-DD")
            : "",
          gender: user?.gender,
        }
        form.setFieldsValue(formFields)
        setUser1({ ...formFields })
        if (user?.phone.at(0)) {
          setValidMobile(true)
        }
        if (user?.email?.at(0)) {
          setValidEmail(true)
        }
        setLoader(false)
      })
      .catch((err) => {
        setLoader(false)
      })
  }
  const editProfile = () => {
    setLoader(true)
    let JWT = cookies.get("accessToken")
    let url = `${BASE_URL}/global-cms/api/v1/user/profile`
    let newData = {
      dob: dob,
      aniversary: aniversary,
    }
    console.log("newDatanewData", newData)
    let payload = { ...form.getFieldsValue(user1), ...newData }
    console.log("payloadpayload", payload)
    axios
      .put(url, payload)
      .then((res) => {
        setFormDisable(true)
        setTimeout(() => {
          getProfile()
        }, 300)
        // setLoader(false);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message, "ER##")
        message.warning(err?.response?.data?.message + " Please Verify")
        setLoader(false)
      })
  }

  const cancelEdit = () => {
    setFormDisable(true)
    getProfile()
  }

  const addDob = (e) => {
    setDob(moment(e?._d).format("YYYY-MM-DD"))
    const newData = {
      dob: moment(e?._d).format("YYYY-MM-DD"),
    }
    let formFields = {
      ...newData,
    }
    form.setFieldsValue(formFields)
  }

  const addAnniverseryDate = (e) => {
    setAnniversaryDate(moment(e?._d).format("YYYY-MM-DD"))
    const newData = {
      aniversary: moment(e?._d).format("YYYY-MM-DD"),
    }
    let formFields = {
      ...newData,
    }
    form.setFieldsValue(formFields)
  }

  const fieldsOnChangeHandler = (currentField, allFields) => {
    for (let i = 0; i < allFields.length; i++) {
      let { errors, touched, validating, value, name } = allFields[i]
      if (name[0] === "search") {
        touched = true
      }
      let check = allFields?.filter((item, ind) => {
        return item?.errors?.length > 0
      })

      let allValue = allFields?.filter((item, ind) => {
        return item?.value?.length > 0
      })

      if (check.length > 0 || allValue?.length < 4) {
        setValidation(true)
      } else {
        setValidation(false)
      }
    }
  }

  useEffect(() => {
    if (
      user1?.name?.length > 0 &&
      user1?.phone?.length > 0 &&
      user1?.email?.length > 0 &&
      user1?.gender?.length > 0
    ) {
      setValidation(false)
    } else {
      setValidation(true)
    }
  }, [user1, formDisable])

  useEffect(() => {
    const interval = setInterval(() => {
      if (otpModal) {
        if (resendCount <= 0) {
          return () => clearInterval(interval)
        } else {
          setResendCount((prevTime) => prevTime - 1)
        }
      } else {
        setResendCount(60)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [otpModal, resendCount])

  const sendOTP = (type) => {
    setOtpType(type)
    if (type === "mobile") {
      const data = JSON.stringify({
        source: phone_numb,
      })
      const config = {
        method: "put",
        url: `${BASE_URL}/global-cms/api/v1/user/otp/phone`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }
      axios(config)
        .then((res) => {
          console.log("res otp", res)
          setOtpModal(true)
        })
        .catch((err) =>
          message.warning("Mobile Number already linked." ?? err?.message)
        )
    } else {
      const data = JSON.stringify({
        source: _email,
      })
      const config = {
        method: "put",
        url: `${BASE_URL}/global-cms/api/v1/user/otp/email`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }
      axios(config)
        .then((res) => {
          console.log("res otp", res)
          setOtpModal(true)
        })
        .catch((err) =>
          message.warning("Email Id already linked." ?? err?.message)
        )
    }
  }

  const verifyOTP = () => {
    const mobile_data = JSON.stringify({
      phone: phone_numb,
      phoneOtp: otp,
      source: "phone",
    })

    const email_data = JSON.stringify({
      email: _email,
      emailOtp: otp,
    })

    const config = {
      method: "put",
      url: `${BASE_URL}/global-cms/api/v1/user/profile`,
      headers: {
        "Content-Type": "application/json",
      },
      data: otpType === "mobile" ? mobile_data : email_data,
    }

    axios(config)
      .then((res) => {
        console.log("res otp", res)
        message.success("OTP Verified")
        setOtpVerified(true)
        setOtpModal(false)
        // setFormDisable(true);
      })
      .catch((err) => message.error("Invalid OTP"))
  }

  const setPhoneNum = (e) => {
    let val = e.target.value
    const mobilePattern = new RegExp(/^\d{10}$/)
    console.log("mobilePattern?.test(val)", mobilePattern?.test(val))
    setValidMobile(mobilePattern?.test(val))
    setPhoneNumber(val)
  }

  const setEmailId = (e) => {
    let val = e.target.value
    const emailPattern = new RegExp(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    )
    console.log("emailPattern?.test(val)", emailPattern?.test(val))
    setValidEmail(emailPattern?.test(val))
    setEmail(val)
  }

  const resendOtp = (source) => {
    setResendCount(60)
    sendOTP(source)
  }

  const verify_email = (
    <div
      style={
        !validEmail ? { opacity: 0.5, cursor: "no-drop", display: "none" } : {}
      }
      className={styles.verify_text}
      onClick={() => (validEmail ? sendOTP("email") : undefined)}
    >
      {isOtpVerified && otpType === "email"
        ? // <CheckCircleOutlined />
          "Verify"
        : "Verify"}
    </div>
  )
  const verify_mobile = (
    <div
      style={
        !validMobile ? { opacity: 0.5, cursor: "no-drop", display: "none" } : {}
      }
      className={styles.verify_text}
      onClick={() => {
        validMobile ? sendOTP("mobile") : undefined
      }}
    >
      {isOtpVerified && otpType === "mobile"
        ? // <CheckCircleOutlined />
          "Verify"
        : "Verify"}
    </div>
  )

  if (loader) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  return (
    <div className={styles.main_container}>
      <Form
        className={styles.profile_form}
        form={form}
        requiredMark={false}
        colon={false}
        name="basic"
        // initialValues={{ remember: true, ...(user || {}) }}
        initialValues={user1}
        layout="vertical"
        onFinish={onFinish}
        onFieldsChange={(current, allChanges) => {
          fieldsOnChangeHandler(current, allChanges)
        }}
        onFinishFailed={onFinishFailed}
        disabled={formDisable}
      >
        <div className={styles.user_details}>
          <div className={styles.tab2_header}>
            <div className={styles.profile_title}>
              {formDisable ? "My Profile" : "Edit Profile"}
            </div>
            {formDisable && (
              <div
                className={styles.edit_icon}
                onClick={() => setFormDisable(!formDisable)}
              >
                <FormOutlined />
              </div>
            )}
          </div>
          <Divider className={styles.divider} />
          <Row
            gutter={[30, 30]}
            style={{ width: "85%", margin: "auto" }}
            justify="space-evenly"
            className={styles.user_details_row}
          >
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className={styles.required_field}
                style={{ fontFamily: "Josefin Sans" }}
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Name!",
                  },
                  { whitespace: true },
                  { min: 3 },
                  {
                    pattern: new RegExp(/^[a-zA-Z][a-zA-Z\s]*$/),
                    message: "Please Enter valid Name..!",
                  },
                ]}
              >
                <Input
                  placeholder="Name"
                  style={{ height: "40px", borderRadius: "5px" }}
                />
              </Form.Item>
              <Tooltip
                arrowPointAtCenter={false}
                placement="topLeft"
                title={
                  (userType === "wa_user" || userType === "both") &&
                  !formDisable
                    ? "This Number can't be updated as the user is already logged in with Whatsapp."
                    : ""
                }
                overlayClassName={styles.zefInfoToolTip}
              >
                <Form.Item
                  className={styles.required_field}
                  style={{ fontFamily: "Josefin Sans" }}
                  name="phone"
                  label="Mobile Number"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Mobile No !",
                    },
                    {
                      pattern: new RegExp(/^\d{10}$/),
                      message: "Enter a valid phone number",
                    },
                  ]}
                >
                  <Input
                    onKeyPress={(e) => {
                      if (/\D/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                    disabled={userType === "wa_user" || userType === "both"}
                    onChange={(e) => setPhoneNum(e)}
                    maxLength={10}
                    style={{ height: "40px", borderRadius: "5px" }}
                    placeholder="Mobile Number "
                    suffix={
                      !formDisable && !["wa_user", "both"]?.includes(userType)
                        ? verify_mobile
                        : null
                    }
                  />
                </Form.Item>
              </Tooltip>
              <Tooltip
                arrowPointAtCenter={false}
                placement="topLeft"
                title={
                  (userType === "google_user" || userType === "both") &&
                  !formDisable
                    ? "This Email can't be updated as the user is already logged in with Google."
                    : ""
                }
                overlayClassName={styles.zefInfoToolTip}
              >
                {" "}
                <Form.Item
                  label="Date of Birth"
                  className={styles.not_required_field}
                  style={{ fontFamily: "Josefin Sans" }}
                >
                  <DatePicker
                    format={"YYYY-MM-DD"}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                    picker="date"
                    placeholder="Date of Birth"
                    inputReadOnly
                    onChange={(e) => addDob(e)}
                    defaultValue={
                      user1?.dob ? moment(user1?.dob, "YYYY-MM-DD") : null
                    }
                    allowClear={false}
                  />
                </Form.Item>
              </Tooltip>
            </Col>
            <Col xs={24} sm={24} md={8} lg={12} xl={12}>
              <Form.Item
                className={styles.required_field}
                style={{ fontFamily: "Josefin Sans", marginBottom: "32px" }}
                label="Gender"
                name="gender"
                initialValue={user1.gender}
                rules={[
                  {
                    required: true,
                    message: "Please Select Gender!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="male" style={{ fontFamily: "Josefin Sans" }}>
                    {" "}
                    Male{" "}
                  </Radio>
                  <Radio value="female" style={{ fontFamily: "Josefin Sans" }}>
                    {" "}
                    Female{" "}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                className={styles.required_field}
                style={{ fontFamily: "Josefin Sans" }}
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Your Email !",
                  },
                  { type: "email", message: "Please Enter Valid Mail..!" },
                ]}
              >
                <Input
                  disabled={userType === "google_user" || userType === "both"}
                  placeholder="Email"
                  style={{ height: "40px", borderRadius: "5px" }}
                  suffix={
                    !formDisable && !["google_user", "both"]?.includes(userType)
                      ? verify_email
                      : null
                  }
                  onChange={(e) => setEmailId(e)}
                />
              </Form.Item>

              {/* <Form.Item
                label="Anniversary Date"
                className={styles.not_required_field}
              >
                <DatePicker
                  format={"YYYY-MM-DD"}
                  style={{ width: "100%" }}
                  picker="date"
                  placeholder="Anniversary Date"
                  inputReadOnly
                  defaultValue={
                    user1?.aniversary
                      ? moment(user1?.aniversary, "YYYY-MM-DD")
                      : null
                  }
                  onChange={(e) => addAnniverseryDate(e)}
                  allowClear={false}
                />
              </Form.Item> */}
            </Col>
          </Row>

          <Row style={{ marginTop: "20px" }}> </Row>
        </div>
      </Form>{" "}
      {!formDisable && (
        <>
          <div
            style={{
              backgroundColor: "white",
              paddingBottom: "20px",
            }}
          >
            <Row
              gutter={[12, 12]}
              style={{
                backgroundColor: "white",
                width: "88%",
                margin: "auto",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => cancelEdit()}
                className={styles.cancel_btn}
              >
                CANCEL
              </button>
              <button
                type="primary"
                shape="round"
                disabled={validation}
                htmlType="submit"
                className={
                  validation ? styles.save_btn_disable : styles.save_btn_active
                }
                onClick={() => editProfile()}
              >
                {btnLoading ? <Spin indicator={antIcon} /> : "SAVE"}
              </button>
            </Row>
          </div>
        </>
      )}
      <Modal
        maskStyle={{ backdropFilter: "blur(10px)" }}
        open={otpModal}
        maskClosable={false}
        width={400}
        footer={null}
        onOk={() => setOtpModal(false)}
        onCancel={() => setOtpModal(false)}
      >
        <h3 className={styles.otp_title}>Verification Code</h3>
        <p className={styles.otp_desc_text}>
          We sent a verification code to{" "}
          <b>
            <code>{otpType == "email" ? _email : phone_numb}</code>
          </b>
          . Enter the code.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <OtpInput
            value={otp}
            onChange={(code) => setOtp(code)}
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
              backgroundColor: "white",
            }}
            focusStyle={{
              border: "1px solid #01C0CC",
              outline: "none",
              color: "#01C0CC",
            }}
          />
        </div>
        <div className={styles.resend_otp}>
          <button
            disabled={resendCount > 0}
            style={
              resendCount <= 0 ? { cursor: "pointer" } : { cursor: "no-drop" }
            }
            className={styles.btn}
            onClick={() => resendOtp(otpType == "email" ? "email" : "mobile")}
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
              verifyOTP()
            }}
            className={
              otp.length !== 6
                ? styles["otp_verify_btn_disable"]
                : styles["otp_verify_btn"]
            }
          >
            Verify & Proceed
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Profileform
