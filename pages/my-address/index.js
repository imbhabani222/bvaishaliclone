import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Empty,
  Form,
  message,
  Radio,
  Row,
  Spin,
} from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MyAccountMenu from "../../componentss/MyacoountMenu/myaccountmenu";
import styles from "./index.module.scss";
import EditIcon from "../../public/assets/myAccount/address-edit.svg";
import PlusIcon from "../../public/assets/myAccount/plus-icon.svg";
import DltIcon from "../../public/assets/myAccount/address-delet.svg";
import NoAddress from "../../public/notfound/NoAddress.svg";

import Image from "next/image";
import AddressDetails from "../address";
import axios from "../../redux/axios";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ALL_ADDRESS } from "../../redux/address/actions/actions";
import BASE_URL from "../../constants/textUtility/textenv";

const MyAddress = () => {
  const cookies = new Cookies();
  const JWT = cookies?.get("accessToken");
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state?.allStore?.result?.user);
  const addresData = useSelector((s) => s?.allAddress);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [breadcrumbData, setBreadCrumbData] = useState([
    { title: "Homepage", route: "/" },
  ]);
  const [addressData, setAddressData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [newAddress, setNewAddress] = useState(false);

  useEffect(() => {
    if (JWT?.length > 0) {
      dispatch({ type: FETCH_ALL_ADDRESS });
    }
  }, []);

  function setNewAddressHandle() {
    setNewAddress(!newAddress);
  }

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const deleteAddress = (id) => {
    let url = `${BASE_URL}/store/api/v1/address/${id}`;
    let JWT = cookies?.get("accessToken");
    axios
      .delete(url, {})
      .then((res) => {
        message.success("Address Deleted..");
        dispatch({ type: FETCH_ALL_ADDRESS });
      })
      .catch((err) => console.log("delete_err", err));
  };

  const selectDefault = (item) => {
    setLoader(true);
    let url = `${BASE_URL}/store/api/v1/address/set-default/${item?.id}`;
    let JWT = cookies?.get("accessToken");
    axios
      .put(url, {})
      .then((res) => {
        // getAllAddress();
        dispatch({ type: FETCH_ALL_ADDRESS });
        // setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.breadcrumb_wrapper}>
        <Breadcrumb>
          <Breadcrumb.Item href=""></Breadcrumb.Item>
          {breadcrumbData?.map(({ title, route }, index) => (
            <Breadcrumb.Item
              key={index}
              onClick={() => router.push(`${route}`)}
            >
              <span className={styles.home_bread_crumb}>Home</span>
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>My Address</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <div className={styles.drawer_mobile_show}>
        <Button onClick={showDrawer}>ACTIVITY</Button>
      </div> */}

      <div className={styles.container}>
        <Row gutter={[32, 0]}>
          <Col
            xl={4}
            lg={4}
            md={24}
            sm={24}
            xs={24}
            className={styles.menu_items}
          >
            <div className={styles.mobile_menu}>
              <Drawer
                title="Menu"
                placement="right"
                onClose={onClose}
                open={open}
                width={"80%"}
              >
                <MyAccountMenu />
              </Drawer>
            </div>
            <div className={styles.desktop_menu}>
              <MyAccountMenu />
            </div>
          </Col>
          {newAddress ? (
            <Col
              xl={20}
              lg={20}
              md={24}
              sm={24}
              xs={24}
              className={styles.menu}
            >
              {" "}
              <AddressDetails
                setNewAddress={setNewAddress}
                newAddress={newAddress}
                setNewAddressHandle={setNewAddressHandle}
              />
            </Col>
          ) : addresData?.fetching ? (
            <Col
              xl={20}
              lg={20}
              md={24}
              sm={24}
              xs={24}
              className={styles.spinner}
            >
              <Spin />
            </Col>
          ) : (
            <Col
              xl={20}
              lg={20}
              md={24}
              sm={24}
              xs={24}
              className={styles.menu}
            >
              <Row className={styles.first_row}>
                <Col
                  xl={16}
                  lg={16}
                  md={16}
                  sm={12}
                  xs={12}
                  className={styles.first_row_heading}
                >
                  My Address
                </Col>
                <Col
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className={styles.first_row_btn_wrapper}
                >
                  <button
                    onClick={() => {
                      `${
                        cookies?.get("accessToken")?.length > 0
                          ? setNewAddress(true)
                          : router.push("/login-modal")
                      }`;
                    }}
                    className={styles.add_address_btn}
                  >
                    <Image {...PlusIcon} alt="" style={{ fontSize: "14px" }} />{" "}
                    Add New Address
                  </button>
                </Col>
              </Row>
              {addresData?.result?.address?.length > 0 ? (
                <Row
                  gutter={[12, 12]}
                  style={{ width: "98%", margin: "auto" }}
                  justify="space-between"
                >
                  {addresData?.result?.address
                    ?.sort((a, b) => b.isDefault - a.isDefault)
                    ?.map((item, index) => {
                      const temp = item?.addressDetails;
                      return (
                        <Col
                          key={index}
                          xl={12}
                          lg={12}
                          md={12}
                          sm={24}
                          xs={24}
                          className={styles.address_card_wrapper}
                        >
                          <div
                            className={
                              temp?.isDefault
                                ? styles.selected_address_card
                                : styles.address_card
                            }
                          >
                            <div className={styles.address_type_wrapper}>
                              <div className={styles.address_type}>
                                {item?.addressName}
                              </div>
                              <div
                                // value={item?.id}
                                // value={selectedAddress}
                                onClick={(e) => {
                                  selectDefault(item);
                                  setSelectedAddress(e.target.value);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    columnGap: "5px",
                                  }}
                                >
                                  <div
                                    className={
                                      temp?.isDefault
                                        ? styles.radio_active
                                        : styles.radio_not_active
                                    }
                                  ></div>
                                  <div>
                                    {temp?.isDefault
                                      ? "Default"
                                      : "Mark as default"}
                                  </div>
                                </div>
                              </div>

                              {/* <Radio.Group
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                    >
                      <Radio value={index}>
                        {selectedAddress === index
                          ? "Default"
                          : "Mark as default"}
                      </Radio> */}
                            </div>
                            <div className={styles.name}>{item?.name}</div>
                            <div className={styles.full_address}>
                              {temp?.addr1}
                              {temp?.city && ", " + temp?.city}
                              {temp?.state && ", " + temp?.state}
                              {temp?.country && ", " + temp?.country}
                              {temp?.pinCode && "- " + temp?.pinCode}
                            </div>
                            <div className={styles.mobile_no}>
                              <b>Mobile No</b> : {item?.mobile}
                            </div>
                            {userDetails?.email && (
                              <div className={styles.mobile_no}>
                                <b>Email</b> : {userDetails?.email}
                              </div>
                            )}
                            <div className={styles.action_wrapper}>
                              <Image
                                {...EditIcon}
                                alt=""
                                onClick={
                                  () => setNewAddress(true)

                                  // router.push(`/address?${item?.id}`)
                                }
                              />
                              {!temp?.isDefault && (
                                <Image
                                  onClick={() => {
                                    deleteAddress(item?.addressId);
                                  }}
                                  {...DltIcon}
                                  alt=""
                                />
                              )}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                </Row>
              ) : (
                <Row
                  justify="center"
                  style={{
                    minHeight: "40vh",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image {...NoAddress} alt="" />
                  {/* <Empty description="No address.." /> */}
                </Row>
              )}
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default MyAddress;
