import { Breadcrumb, Card, Row } from "antd";
import React from "react";
import styles from "../privacy-policy/index.module.scss";

const ShippingPolicy = () => {
  return (
    <div className={styles.main_container}>
      <Row className={styles.bread_crumb}>
        <Breadcrumb>
          <Breadcrumb.Item href=""></Breadcrumb.Item>
          <Breadcrumb.Item href="/">
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shipping Policy</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card style={{ display: "flex", paddingInline: "2%" }}>
        <h1 style={{ textAlign: "center" }}>Shipping Policy</h1>

        <p>
          At BVaishali eStore, we strive to provide a seamless and efficient
          shipping experience for our customers. This Shipping Policy outlines
          important information regarding the shipping of products purchased
          from our eStore. By making a purchase, you acknowledge and agree to
          the following shipping policy.
        </p>
        <h2>Shipping Methods and Providers:</h2>
        <p>
          We partner with reliable shipping providers to ensure prompt and
          secure delivery of your orders. The specific shipping methods
          available for your location will be displayed during the checkout
          process.
        </p>
        <h2>Order Processing Time:</h2>
        <h2>2.1 Order Verification and Processing:</h2>
        <p>
          Once you place an order, we will perform order verification and
          process it within [X] business days. Order verification may include
          confirming payment details, validating shipping address, and checking
          product availability.
        </p>
        <h2>2.2 Customized or Made-to-Order Products:</h2>
        <p>
          For customized or made-to-order products, additional processing time
          may be required. The estimated processing time will be communicated on
          the product page or during the checkout process.
        </p>
        <h2>Shipping Timeframes:</h2>
        <h2>3.1 Estimated Delivery Time:</h2>
        <p>
          The estimated delivery time is calculated from the date of order
          processing completion and varies based on factors such as the shipping
          method selected, destination, and product availability.
        </p>
        <h2>3.2 Delays and Exceptions:</h2>
        <p>
          Please note that delivery delays may occur due to unforeseen
          circumstances, such as weather conditions, natural disasters, customs
          inspections, or other factors beyond our control. We will make
          reasonable efforts to communicate any significant delays and provide
          updates regarding your shipment.
        </p>
        <h2>Shipping Costs:</h2>
        <h2>4.1 Shipping Charges:</h2>
        <p>
          Shipping charges are calculated based on the weight, dimensions,
          destination, and selected shipping method. The shipping cost will be
          displayed during the checkout process before you confirm your
          purchase.
        </p>
        <h2>4.2 Free Shipping:</h2>
        <p>
          We may offer free shipping promotions for eligible orders. The
          specific requirements for free shipping will be communicated on our
          website or during promotional periods.
        </p>
        <h2>Shipment Tracking:</h2>
        <p>
          Once your order is shipped, we will provide you with a tracking number
          or a link to track the shipment. You can use this information to
          monitor the progress of your delivery. Please note that tracking
          information may take some time to be updated after the shipment is
          handed over to the carrier.
        </p>
        <h2>Shipping Restrictions:</h2>
        <h2>6.1 International Shipping:</h2>
        <p>
          We offer international shipping to select countries. However, please
          be aware that additional customs duties, taxes, or fees may apply to
          international shipments. These charges are the responsibility of the
          recipient and are beyond our control. Please check with your local
          customs office for more information on applicable fees.
        </p>
        <h2>6.2 Restricted Items:</h2>
        <p>
          Certain items may be subject to shipping restrictions based on local
          laws, regulations, or carrier policies. We will make reasonable
          efforts to communicate any shipping restrictions on the respective
          product pages or during the checkout process.
        </p>
        <h2>Address Accuracy:</h2>
        <p>
          Please ensure that you provide accurate and complete shipping address
          information. We are not responsible for any delays, losses, or
          additional charges resulting from incorrect or incomplete addresses
          provided by you.
        </p>
        <h2>Contact Us:</h2>
        <p>
          If you have any questions or concerns regarding our shipping policy,
          please contact our customer support team at [contact information]. We
          will be happy to assist you and address any issues you may have.
        </p>
        <p>
          Please note that this shipping policy is subject to change without
          prior notice. We encourage you to review this policy periodically for
          any updates or modifications.
        </p>
      </Card>
    </div>
  );
};

export default ShippingPolicy;
