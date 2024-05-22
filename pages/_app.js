import "../styles/globals.css";
import "antd/dist/antd.css";
import Layout from "../componentss/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../constants/textUtility/textenv";
import Maintenance from "../public/assets/error/maintenance.svg";
import Image from "next/image";
import ZliteLogo from "../public/assets/error/zlight.svg";
import FbLogo from "../public/assets/social-icons/fb.svg";
import InstaLogo from "../public/assets/social-icons/insta.svg";
import LinkedinLogo from "../public/assets/social-icons/linkedin.svg";
import TwitterLogo from "../public/assets/social-icons/twitter.svg";
import Error from "../componentss/Error";
import mallLogo from "../public/footer-mall.svg";
import arrowRight from "../public/arrow-right.svg";
import { LeftOutlined } from "@ant-design/icons";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const cookies = new Cookies();
  const [apiFail, setApiFail] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [showMallBtn, setShowMallBtn] = useState(false);
  const [pathArr, setArr] = useState([
    "/address",
    "/my-address",
    "/my-account",
    "/my-orders",
    "/order-success",
    "/payment-failed",
    "/payment-pending",
    "/payment-success",
    "/payment-progress",
    "/replace-return",
    "/whishlist",
  ]);
  let JWT = cookies?.get("accessToken");
  if (
    typeof localStorage !== "undefined" &&
    !JWT &&
    router?.asPath !== "/login-modal" &&
    !router?.asPath.includes("#")
  ) {
    localStorage?.setItem("route", router?.asPath);
  }
  useEffect(() => {
    if (!JWT && pathArr.includes(router?.asPath)) {
      router.push(
        {
          pathname: "/",
        },
        undefined,
        { shallow: true }
      );
    }
  }, [JWT, pathArr, router, router?.asPath]);

  useEffect(() => {
    let url = `${BASE_URL}/store/cms/store`;
    let JWT = cookies?.get("accessToken");
    axios
      .get(url)
      .then((res) => {
        if (res?.data?.user) {
          window?.dataLayer?.push({
            event: "login",
            userId: res?.data?.user?.userName,
          });
        }

        if (!res?.data?.isPublic) {
          setIsPublic(false);
          if (router?.asPath !== "/") {
            router.push(
              {
                pathname: "/",
              },
              undefined,
              { shallow: true }
            );
          }
        }
        if (!res?.data?.isActive) {
          setIsActive(false);
        }
      })
      .catch((err) => {
        console.log("store err", err);
      });
  }, []);

  useEffect(() => {
    let url = `${BASE_URL}/store/cms/settings`;
    let JWT = cookies?.get("accessToken");
    if (router?.asPath?.includes("order-success")) {
      console.log("");
    } else {
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWT}` } })
        .then((res) => {
          console.log("settings res", res);
        })
        .catch((err) => {
          console.log("settings err", err);
          setApiFail(false);
        });
    }
  }, []);

  useEffect(() => {
    if (router?.asPath.includes("/home")) {
      router.push(
        {
          pathname: "/",
        },
        undefined,
        { shallow: true }
      );
    }
    setShowMallBtn(false);
  }, [router, router?.asPath]);

  useEffect(() => {
    setCoockies();
    if (JWT && localStorage.getItem("cartId")) {
      mergeCart(JWT);
    }
  }, [cookies, JWT]);

  const setCoockies = () => {
    if (window?.location?.hash) {
      let token = window.location.href
        .split("=")
        ?.at(1)
        ?.split("&refreshToken")
        ?.at(0);

      const a = window?.location?.hash
        .substring(1)
        ?.split("&")
        .map((i) => ({ name: i.split("=")[0], value: i.split("=")[1] }));
      a.forEach((i) => {
        if (["accessToken", "refreshToken"].includes(i.name)) {
          cookies.set(i.name, i.value, {
            secure: true,
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          });
        }
      });
      window.location.href = localStorage?.getItem("route") || "/";
    }
  };

  const mergeCart = (token) => {
    let url = `${BASE_URL}/store/api/v2/merge-cart?cartId=${localStorage.getItem(
      "cartId"
    )}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log("res", res);
        localStorage?.removeItem("cartId");
        router.push(localStorage?.getItem("route") || "/");
      })
      .catch((err) => {
        window.location.href = localStorage?.getItem("route") || "/";
      });
  };

  return (
    <Provider store={store}>
      {!apiFail ? (
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Error />
        </div>
      ) : !isPublic || !isActive ? (
        <div className="page-maintenance">
          <div className="logo-wrapp">
            <Image {...ZliteLogo} alt="" />
          </div>
          <div className="img-maintenance-wrapper">
            <div className="img-maintenance">
              <Image {...Maintenance} alt="" />
            </div>
            <div className="err-maintenance-text">
              We are Under Maintenance.
            </div>
            <div className="will-back">Will be Back Soon!</div>
          </div>
          <div className="footer-maintenance">
            <div className="copyright">
              © Copyrights zlite | All Rights Reserved
            </div>
            <div className="fallow-links">
              You can also follow us on :
              <Image {...FbLogo} alt="" />
              <Image {...TwitterLogo} alt="" />
              <Image {...InstaLogo} alt="" />
              <Image {...LinkedinLogo} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div onWheel={() => setShowMallBtn(false)}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      )}
    </Provider>
  );
}

export default MyApp;
