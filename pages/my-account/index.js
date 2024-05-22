import { Breadcrumb, Button, Col, Drawer, Row, Spin } from "antd"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import MyAccountMenu from "../../componentss/MyacoountMenu/myaccountmenu"
import Profileform from "../../componentss/ProfileForm/profileform"
import styles from "./index.module.scss"
const MyAccount = () => {
  const [loader, setLoader] = useState(true)
  const router = useRouter()
  const [breadcrumbData, setBreadCrumbData] = useState([
    { title: "Home", route: "/" },
  ])

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

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
              <span className={styles.home_bread_crumb}>{title}</span>
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item>My Account</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <div className={styles.drawer_mobile_show}>
        <Button onClick={showDrawer}>ACTIVITY</Button>
      </div> */}
      <div className={styles.container}>
        <Row gutter={[16, 0]}>
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
          {loader ? (
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              xl={20}
              lg={20}
              md={24}
              sm={24}
              xs={24}
            >
              <Spin></Spin>
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
              <Profileform />
            </Col>
          )}
        </Row>
      </div>
    </div>
  )
}

export default MyAccount
