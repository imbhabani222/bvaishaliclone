import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import styles from "./index.module.scss";
import { ADDREESS_DETAILS } from "../../constants/JsonData/addressDetails";
import Geocode from "react-geocode";
import { useLoadScript } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import Places from "../../componentss/Places";
import axios from "../../redux/axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import BASE_URL from "../../constants/textUtility/textenv";

const loadData = {
  id: "google-map-script",
  googleMapsApiKey: "AIzaSyCsvXDft5BRwE1TiqtbFHyX2xoKWE3EC1c",
  libraries: ["places"],
};
const AddressDetails = ({
  setCurrent,
  current,
  storeDetails,
  setStoreDetails,
  setNewAddressHandle,
  setNewAddress,
  newAddress,
}) => {
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");
  const router = useRouter();
  let addIds = Object.keys(router?.query);
  let addId = addIds?.join(",");
  const [form] = Form.useForm();
  const [latPincode, setLatPincode] = useState({});
  const [lngPincode, setLngPincode] = useState({});
  const [lat, setLat] = useState();
  const [lang, setLang] = useState();
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);
  const [validation, setValidation] = useState(false);
  const [validation1, setValidation1] = useState(false);
  const [addredssId, setAddressId] = useState(null);
  const [addressDetils, setAddresDetails] = useState({
    position: {
      lat: lat ?? 12.9716,
      lang: lang ?? 77.5946,
    },
    addr1: null,
    addr2: null,
    pinCode: null,
    state: null,
    city: null,
    country: null,
    addressType: null,
    addressName: null,
    name: null,
    mobile: null,
  });

  const { isLoaded } = useLoadScript(loadData);

  useEffect(() => {
    if (addId !== "" && JWT?.length > 0) {
      let url = `${BASE_URL}/store/api/v1/address/${addId}`;
      let JWT = cookies?.get("accessToken");
      if (JWT) {
        axios
          .get(url, {})
          .then((res) => {
            const newData = {
              name: res?.data?.address[0]?.name,
              mobile: res?.data?.address[0]?.mobile,
              addressName: res?.data?.address[0]?.addressName,
            };
            let formFields = {
              ...res?.data?.address?.at(0)?.addressDetails,
              ...newData,
            };
            form.setFieldsValue(formFields);
            setAddressId(res?.data?.address?.at(0)?.addressId);
            setAddresDetails({
              ...res?.data?.address?.at(0)?.addressDetails,
              ...newData,
            });
            setLat(res?.data?.address?.at(0)?.addressDetails?.position?.lat);
            setLang(res?.data?.address?.at(0)?.addressDetails?.position?.lang);
            setSaveBtnDisabled(false);
          })
          .catch((err) => console.log("SINGLE_ADDRESS_ERR"));
      }
    }
  }, []);

  useEffect(() => {
    if (
      addressDetils?.name?.length > 0 &&
      addressDetils?.addr1?.length > 0 &&
      addressDetils?.mobile?.length > 0 &&
      addressDetils?.addressName?.length > 0 &&
      addressDetils?.pinCode?.length > 0 &&
      addressDetils?.state?.length > 0 &&
      addressDetils?.city?.length > 0 &&
      !validation1
    ) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [addressDetils]);

  useEffect(() => {
    Geocode.setApiKey("AIzaSyCsvXDft5BRwE1TiqtbFHyX2xoKWE3EC1c");
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  const setDetailsHandler = (e) => {
    const { location } = e?.geometry;

    Geocode.fromAddress(e[0]?.formatted_address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
      },
      (error) => {
        console.error("PLACE LAT LANG RES", error);
      }
    );
    function extractFromAdress(components, type) {
      for (let i = 0; i < components.length; i++)
        for (let j = 0; j < components[i].types.length; j++)
          if (components[i].types[j] === type) return components[i].long_name;
      return "";
    }

    const temp = { ...addressDetils };
    const postCode = extractFromAdress(e.address_components, "postal_code");
    const countryName = extractFromAdress(e.address_components, "country");
    const stateName = extractFromAdress(
      e.address_components,
      "administrative_area_level_1"
    );

    const latlang = JSON.parse(localStorage.getItem("latLng"));
    const addressData = {
      addr1: e.formatted_address.split(",").slice(0, -3).toString(),
      pinCode: postCode,
      city: e.formatted_address.split(",").slice(-3, -2).toString(),
      state: stateName,
      country: countryName,
      position: {
        lat: latlang?.lat,
        lang: latlang?.lng,
      },
    };
    setAddresDetails({ ...temp, ...addressData });
    form.setFieldsValue({
      ...addressData,
    });
  };

  const addAddress = () => {
    let url = `${BASE_URL}/store/api/v1/address`;
    let JWT = cookies.get("accessToken");
    const latlang = JSON.parse(localStorage.getItem("latLng"));
    console.log("aaaaaa", latlang);
    const newData = {
      position: {
        lat: latlang?.lat ?? latPincode,
        lang: latlang?.lng ?? lngPincode,
      },
    };
    let payload = { ...form.getFieldsValue(addressDetils), ...newData };

    axios
      .post(url, payload)
      .then((res) => {
        message.success("Address Added Successfully..");
        setNewAddress(!newAddress);
        router.push("/my-address");
      })
      .catch((err) => console.log("add_address_err", err));
  };

  const updateAddress = () => {
    let url = `${BASE_URL}/store/api/v1/address/${addId}`;
    let JWT = cookies.get("accessToken");
    // const newData = { };
    const latlang = JSON.parse(localStorage.getItem("latLng"));
    const newData = {
      position: {
        lat: latlang?.lat ?? latPincode,
        lang: latlang?.lng ?? lngPincode,
      },
      id: addId,
      addressId: addredssId,
    };

    let payload = { ...form.getFieldsValue(addressDetils), ...newData };
    // setAddresDetails({ ...addressDetils, ...newData });
    axios
      .put(url, payload)
      .then((res) => {
        message.success("Address Updated..");
        localStorage.clear();
        setNewAddress(!newAddress);
        router.push("/my-address");
      })
      .catch((err) => {
        console.log("UPDATE_ERR_____", err);
      });
  };

  const fieldsOnChangeHandler = (currentField, allFields) => {
    const newData = {
      name: allFields[0]?.value,
      mobile: allFields[1]?.value,
      addressName: allFields[2]?.value,
      addr1: allFields[4]?.value,
      pinCode: allFields[5]?.value,
      state: allFields[6]?.value,
      city: allFields[7]?.value,
    };

    Geocode.fromAddress(allFields[5]?.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("lat lng", { lat }, { lng });
        setLatPincode(lat);
        setLngPincode(lng);
      },
      (error) => {
        console.error("lat lng err *********", error);
      }
    );

    setAddresDetails({ ...addressDetils, ...newData });

    const arr = [];
    for (let i = 0; i < allFields.length; i++) {
      let { errors, touched, validating, value, name } = allFields[i];
      if (name[0] === "search") {
        touched = true;
      }
      let check = allFields?.filter((item, ind) => {
        return item?.errors?.length > 0;
      });

      if (check.length > 0) {
        setValidation1(true);
        setValidation(true);
        arr.push(true);
      } else {
        arr.push(false);
        setValidation1(false);
        setValidation(false);
      }
    }
  };

  return (
    <div className={styles.map_container}>
      <div className={styles.page_title}>Add New Address</div>
      <Row>
        <Col
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <Form
            id="form"
            name="form"
            labelCol={{ span: 24 }}
            form={form}
            initialValues={addressDetils}
            autoComplete="new-password"
            onFieldsChange={(current, allChanges) => {
              fieldsOnChangeHandler(current, allChanges);
            }}
            onFinishFailed={(values) => console.log(values, "faild")}
          >
            <Row gutter={[12, 12]}>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label={ADDREESS_DETAILS.NAME_LABEL}
                  name={ADDREESS_DETAILS.NAME}
                  rules={ADDREESS_DETAILS.NAME_RULES}
                >
                  <Input
                    autoComplete="new-password"
                    type="text"
                    placeholder={ADDREESS_DETAILS.NAME_PLACEHOLDER}
                  />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label={ADDREESS_DETAILS.MOBILE_LABEL}
                  name={ADDREESS_DETAILS.MOBILE}
                  rules={ADDREESS_DETAILS.MOBILE_RULES}
                >
                  <Input
                    autoComplete="new-password"
                    type="number"
                    maxLength={10}
                    placeholder={ADDREESS_DETAILS.MOBILE_PLACEHOLDER}
                  />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  autoComplete="new-password"
                  label={ADDREESS_DETAILS.TYPE_LABEL}
                  name={ADDREESS_DETAILS.TYPE}
                  rules={ADDREESS_DETAILS.TYPE_RULES}
                >
                  <Input
                    autoComplete="new-password"
                    placeholder={ADDREESS_DETAILS.TYPE_PLACEHOLDER}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={ADDREESS_DETAILS.SEARCH_LABEL}
              name={ADDREESS_DETAILS.SEARCH_NAME}
            >
              <div className="places-container">
                <div className={styles["map-view"]}>
                  <Places
                    setDetailsHandler={setDetailsHandler}
                    lat={addressDetils?.position?.lat}
                    lang={addressDetils?.position?.lang}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              label={ADDREESS_DETAILS.ADDRESS1_LABEL}
              name={ADDREESS_DETAILS.ADDRESS_NAME1}
              rules={ADDREESS_DETAILS.ADDRESS_RULES1}
            >
              <Input
                autoComplete="new-password"
                id="myInput"
                onKeyDown={(e) => {
                  if (e.keyCode === 32 && myInput.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
                placeholder={ADDREESS_DETAILS.ADDRESS_PLACEHOLDER1}
              />
            </Form.Item>
            <Row gutter={[12, 12]}>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label={ADDREESS_DETAILS.PINCODE_LABEL}
                  name={ADDREESS_DETAILS.PINCODE_NAME}
                  rules={ADDREESS_DETAILS.PINCODE_RULES}
                >
                  <Input
                    autoComplete="new-password"
                    maxLength={6}
                    onKeyPress={(e) => {
                      if (/[^0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder={ADDREESS_DETAILS.PINCODE_PLACEHOLDER}
                  />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label={ADDREESS_DETAILS.STATE_LABEL}
                  name={ADDREESS_DETAILS.STATE_NAME}
                  rules={ADDREESS_DETAILS.STATE_RULES}
                >
                  <Input
                    autoComplete="new-password"
                    minLength={3}
                    onKeyPress={(e) => {
                      if (/[^a-zA-Z]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder={ADDREESS_DETAILS.STATE_PLACEHOLDER}
                  />
                </Form.Item>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label={ADDREESS_DETAILS.CITY_LABEL}
                  name={ADDREESS_DETAILS.CITY_NAME}
                  rules={ADDREESS_DETAILS.CITY_RULES}
                >
                  <Input
                    autoComplete="new-password"
                    minLength={3}
                    onKeyPress={(e) => {
                      if (/[^a-zA-Z]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    placeholder={ADDREESS_DETAILS.CITY_PLACEHOLDER}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Row className={styles.btn_wrapper}>
            <Button
              onClick={() => {
                addId?.length > 0
                  ? setNewAddressHandle()
                  : form.setFieldsValue({
                      position: {
                        lat: lat ?? 12.9716,
                        lang: lang ?? 77.5946,
                      },
                      addr1: null,
                      addr2: null,
                      pinCode: null,
                      state: null,
                      city: null,
                      country: null,
                      addressType: null,
                      addressName: null,
                      name: null,
                      mobile: null,
                    });
                setNewAddressHandle();
                setValidation(true);
              }}
              style={{ borderRadius: "5px", fontFamily: "Josefin Sans" }}
            >
              CANCEL
            </Button>
            <Button
              disabled={validation}
              onClick={() => {
                addId?.length > 0 ? updateAddress() : addAddress();
              }}
              style={
                !validation
                  ? {
                      backgroundColor: "#000000",
                      color: "white",
                      borderRadius: "5px",
                      fontFamily: "Josefin Sans",
                    }
                  : { backgroundColor: "lightgray" }
              }
            >
              {addId?.length > 0 ? "UPDATE" : "SAVE"}
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default AddressDetails;
