import { Breadcrumb, Card, Row } from "antd";
import React from "react";
import styles from "../privacy-policy/index.module.scss";

const Refundpolicy = () => {
  return (
    <div className={styles.main_container}>
      <Row className={styles.bread_crumb}>
        <Breadcrumb>
          <Breadcrumb.Item href=""></Breadcrumb.Item>
          <Breadcrumb.Item href="/">
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Refund Policy</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card style={{ display: "flex", paddingInline: "2%" }}>
        <h1 style={{ textAlign: "center" }}>Refund policy</h1>
        <p>
          At [eStore Name], we strive to provide a satisfactory shopping
          experience for our customers. This Refund Policy outlines the terms
          and conditions regarding refunds for products purchased from our
          eStore. By making a purchase, you acknowledge and agree to the
          following refund policy.
        </p>
        <h2>Returns and Refunds Eligibility:</h2>
        <h2>1.1 Damaged or Defective Products:</h2>
        <p>
          If you receive a product that is damaged or defective, you may be
          eligible for a refund. Please contact our customer support within
          [number of days] days of receiving the item and provide details and
          supporting evidence (such as photographs) of the damage or defect.
        </p>
        <h2>1.2 Incorrect or Incomplete Orders:</h2>
        <p>
          If you receive an incorrect product or an incomplete order, please
          contact our customer support within [number of days] days of receiving
          the item. We will arrange for the correct product to be shipped to you
          or provide a refund.
        </p>
        <h2>1.3 Change of Mind:</h2>

        <p>
          We do not provide refunds for change-of-mind purchases or if you
          simply decide that you no longer want the product.
        </p>
        <h2>Refund Process:</h2>
        <h2>2.1 Return Authorization:</h2>
        <p>
          Before returning any product, you must obtain a Return Authorization
          (RA) number from our customer support. This number must be included
          with the returned item. Returns without a valid RA number may not be
          accepted.
        </p>
        <h2>2.2 Return Shipping:</h2>
        <p>
          For eligible returns, we may provide you with a prepaid shipping label
          or arrange for a pickup. The returned item must be in its original
          packaging (if applicable) and include all accessories, manuals, and
          any other items provided with the product.
        </p>
        <h2>2.3 Refund Method:</h2>
        <p>
          Refunds will be issued using the original payment method used for the
          purchase. Please allow [number of days] days for the refund to be
          processed and reflected in your account.
        </p>
        <h2>Non-Refundable Items:</h2>
        <p>
          The following items are generally non-refundable unless they are
          damaged, defective, or incorrectly shipped:
        </p>
        <p>Downloadable or digital products</p>
        <p>Gift cards or vouchers</p>
        <p>Personalized or customized items</p>
        <p>Perishable goods</p>
        <p>Items specified as non-refundable on the product page</p>
        <h2>Exceptions and Limitations:</h2>
        <h2>4.1 Shipping Costs:</h2>
        <p>
          Shipping charges are non-refundable unless the return is a result of
          our error (e.g., incorrect or defective product).
        </p>
        <h2>4.2 Restocking Fees:</h2>
        <p>
          We may apply restocking fees for certain products or circumstances.
          These fees will be communicated to you before initiating the return
          process.
        </p>
        <h2>Customer Responsibilities:</h2>
        <h2>5.1 Accurate Information:</h2>
        <p>
          You are responsible for providing accurate and up-to-date shipping and
          contact information. We are not liable for any issues or delays
          resulting from incorrect or incomplete information provided by you.
        </p>
        <h2>5.2 Return Condition:</h2>
        <p>
          Returned products must be in their original condition, unused, and in
          the same packaging as when received. Any damage caused by improper use
          or handling may result in a reduced refund or denial of the refund
          request.
        </p>
        <h2>Contact Us:</h2>
        <p>
          If you have any questions or concerns regarding our refund policy,
          please contact our customer support team at [contact information]. We
          will be happy to assist you and address any issues you may have.
        </p>
        <p>
          Please note that this refund policy is subject to change without prior
          notice. We encourage you to review this policy periodically for any
          updates or modifications.
        </p>
      </Card>
    </div>
  );
};

export default Refundpolicy;
