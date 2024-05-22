import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Loader from "../../componentss/Loader";
import BASE_URL from "../../constants/textUtility/textenv";
import styles from "./index.module.scss";
import ReactToPrint from "react-to-print";

function Invoice() {
  const router = useRouter();
  let params = router?.asPath?.split("?")?.at(-1)?.split("/");

  const reportTemplateRef = useRef(null);
  const [invoiceData, setInvoiceData] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    let url = `${BASE_URL}/store/api/v1/orders/get-invoice/${params?.at(
      0
    )}/${params?.at(1)}`;
    axios
      .get(url)
      .then((res) => {
        console.log("download res++", res?.data);
        setInvoiceData(res?.data?.invoiceData?.at(0));
        setLoader(false);
      })
      .catch((err) => {
        console.log("download err", err);
        setLoader(false);
      });
  }, []);

  if (loader) {
    return <Loader text="Please Wait..." />;
  }
  return (
    <div>
      <div className={styles.container} id="divToPrint" ref={reportTemplateRef}>
        <div className={styles.top_heading}>
          Tax Invoice/Bill of Supply/Cash Memo
        </div>

        <div className={styles.content_container}>
          <div className={styles.brand_details}>
            <div>
              <Image
                height={100}
                width={100}
                objectFit="contain"
                src={invoiceData?.sellerDetails?.logoUrl}
                alt=""
              />
            </div>
            <div style={{ paddingLeft: "10px" }}>
              <div className={styles.address_text_sold_by}>Sold By :</div>
              <b>{invoiceData?.sellerDetails?.name}</b>
              <div className={styles.address_text}>
                {invoiceData?.sellerDetails?.address?.addr1},{" "}
                {invoiceData?.sellerDetails?.address?.city}, India -
                {invoiceData?.sellerDetails?.address?.pinCode}
              </div>
              <div className={styles.address_text}>
                {invoiceData?.sellerDetails?.phone && (
                  <>
                    <b>Phone :</b> +91 {invoiceData?.sellerDetails?.mobile},{" "}
                  </>
                )}
                {invoiceData?.sellerDetails?.email && (
                  <>
                    {" "}
                    <b>Email :</b> {invoiceData?.sellerDetails?.email}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.invoice_det}>
            <div>
              <b>Invoice No :</b> {invoiceData?.invoiceNo}
            </div>
            <div>
              <b>Invoice Date :</b>{" "}
              {moment(invoiceData?.invoiceDate).format("LL")}
            </div>
            <div>
              <b>Order Id :</b> {invoiceData?.orderId}
            </div>
            <div>
              <b>Order Date :</b> {moment(invoiceData?.createdAt).format("LL")}
            </div>
          </div>

          <div className={styles.address_det}>
            <div className={styles.address_det_left}>
              <div className={styles.title}>Consumer Billing Address :</div>
              <div className={styles.name}>
                {invoiceData?.billingDetails?.name}
              </div>
              <div className={styles.address}>
                {invoiceData?.billingDetails?.addressDetails?.addr1},{" "}
                {invoiceData?.billingDetails?.addressDetails?.city},
                {invoiceData?.billingDetails?.addressDetails?.state},
                {" India - "}
                {invoiceData?.billingDetails?.addressDetails?.pinCode}
              </div>
              <div className={styles.number}>
                Phone : +91 {invoiceData?.billingDetails?.mobile}
              </div>
            </div>
            <div className={styles.address_det_right}>
              <div className={styles.title}>Consumer shipping Address :</div>
              <div className={styles.name}>
                {invoiceData?.shippingDetails?.name}
              </div>
              <div className={styles.address}>
                {invoiceData?.shippingDetails?.addressDetails?.addr1},{" "}
                {invoiceData?.shippingDetails?.addressDetails?.city},
                {invoiceData?.shippingDetails?.addressDetails?.state},
                {" India - "}
                {invoiceData?.shippingDetails?.addressDetails?.pinCode}
              </div>
              <div className={styles.number}>
                Phone : +91 {invoiceData?.shippingDetails?.mobile}
              </div>
            </div>
          </div>

          <div className={styles.place}>
            <div style={{ padding: "15px" }}>
              <b>Place of supply :</b>{" "}
              {invoiceData?.shippingDetails?.addressDetails?.city}
            </div>
            <div style={{ padding: "15px" }}>
              <b>Place of delivery :</b>{" "}
              {invoiceData?.sellerDetails?.address?.city}
            </div>
          </div>

          <div>
            <table style={{ width: "100%" }}>
              <tr>
                <th>Sr. No</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Discount</th>
                <th>GST</th>
                <th>Total Amount</th>
              </tr>
              {invoiceData?.lineItemDetails?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.productName}</td>
                    <td>{item?.quantity}</td>
                    <td>₹{item?.perItemPrice?.toFixed(2)}</td>
                    <td>₹{item?.deductions?.at(0)?.value ?? 0}</td>
                    <td>
                      {item?.additionalCharges?.at(0)?.value
                        ? `₹${item?.additionalCharges?.at(0)?.value}(@
                      ${item?.additionalCharges?.at(0)?.percentage}%)`
                        : "₹0.00"}
                    </td>
                    <td>₹{item?.price?.toFixed(2)}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className={styles.price_det}>
            <div className={styles.price_det_left}></div>

            <div className={styles.price_det_right}>
              <div className={styles.price_det_right_row}>
                <span className={styles.price_det_heading}>Sub Total : </span>
                <span className={styles.price_det_price}>
                  {" "}
                  ₹{invoiceData?.subTotal?.toFixed(2)}
                </span>
              </div>
              <div className={styles.price_det_right_row}>
                <span className={styles.price_det_heading}>
                  Total Discount Amount :{" "}
                </span>
                <span className={styles.price_det_price}>
                  {" "}
                  ₹{invoiceData?.totalDiscount?.toFixed(2)}
                </span>
              </div>
              <div className={styles.price_det_right_row}>
                <span className={styles.price_det_heading}>
                  Total GST Amount :{" "}
                </span>
                <span className={styles.price_det_price}>
                  {" "}
                  ₹{invoiceData?.totalGST?.toFixed(2)}
                </span>
              </div>
              <div className={styles.price_det_right_row}>
                <span className={styles.price_det_heading}>
                  Delivery Charges :{" "}
                </span>
                <span className={styles.price_det_price}>
                  {" "}
                  ₹{invoiceData?.totalDeliveryCharge?.toFixed(2)}
                </span>
              </div>
              {invoiceData?.totalCouponValue > 0 && (
                <div className={styles.price_det_right_row}>
                  <span className={styles.price_det_heading}>
                    Coupon/Voucher :{" "}
                  </span>
                  <span className={styles.price_det_price}>
                    {" "}
                    ₹{invoiceData?.totalCouponValue?.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.total_amount}>
            <div className={styles.total_ampunt_right}>
              <b style={{ paddingRight: "10px" }}>Total Amount : </b> ₹
              {invoiceData?.finalPrice?.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.download_btn}>
        <ReactToPrint
          trigger={() => <button className={styles.download}>DOWNLOAD</button>}
          content={() => reportTemplateRef.current}
        />
      </div>
    </div>
  );
}

export default Invoice;
