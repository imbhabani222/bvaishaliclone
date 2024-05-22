import { Breadcrumb, Card, Row } from "antd";
import React from "react";
import styles from "../privacy-policy/index.module.scss";

const TermsOfService = () => {
  return (
    <div className={styles.main_container}>
      <Row className={styles.bread_crumb}>
        <Breadcrumb>
          <Breadcrumb.Item href=""></Breadcrumb.Item>
          <Breadcrumb.Item href="/">
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Terms of Service</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card style={{ display: "flex", paddingInline: "2%" }}>
        <h1 style={{ textAlign: "center" }}>Terms of Services</h1>

        <p>
          Please read these Terms of Service (&quot;Terms&quot;) carefully
          before using the BVaishali eStore (&quot;eStore&quot;) operated by
          [eStore Name] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
          These Terms govern your access to and use of the eStore, including any
          purchases made through the eStore. By accessing or using the eStore,
          you agree to be bound by these Terms. If you do not agree to these
          Terms, please refrain from using the eStore.
        </p>
        <h2>General Terms:</h2>
        <h2>1.1 Eligibility:</h2>
        <p>
          You must be at least 18 years old or the legal age of majority in your
          jurisdiction to use the eStore. By using the eStore, you represent and
          warrant that you meet these eligibility requirements.
        </p>
        <h2>1.2 Account Registration:</h2>
        <p>
          Certain features or services of the eStore may require you to create
          an account. You agree to provide accurate, current, and complete
          information during the registration process and to keep your account
          information updated. You are responsible for maintaining the
          confidentiality of your account credentials and for any activities or
          actions taken under your account.
        </p>
        <h2>Products and Orders:</h2>
        <h2>2.1 Product Descriptions:</h2>
        <p>
          We make reasonable efforts to ensure that the descriptions, images,
          and other information regarding the products displayed on the eStore
          are accurate and up to date. However, we do not warrant that the
          product descriptions or other content on the eStore are error-free,
          complete, or reliable.
        </p>
        <h2>2.2 Pricing and Availability:</h2>
        <p>
          All prices displayed on the eStore are subject to change without
          notice. We reserve the right to modify or discontinue any product at
          any time. We do not guarantee the availability of any particular
          product or guarantee that a product will be in stock at the time of
          purchase.
        </p>
        <h2>2.3 Order Acceptance:</h2>
        <p>
          Your placement of an order through the eStore constitutes an offer to
          purchase the selected product(s). We reserve the right to accept or
          reject any order at our discretion. If we reject your order, we will
          notify you and provide a refund for any payment received.
        </p>
        <h2>2.4 Payment and Billing:</h2>
        <p>
          You agree to provide accurate and valid payment information for all
          orders placed through the eStore. You authorize us to charge the
          provided payment method for the total amount of your order, including
          applicable taxes and shipping fees. We reserve the right to cancel or
          refuse any order if the payment method cannot be verified, is invalid,
          or has insufficient funds.
        </p>
        <h2>Intellectual Property:</h2>
        <h2>3.1 Ownership:</h2>
        <p>
          The eStore and its content, including but not limited to text, images,
          logos, graphics, videos, and software, are protected by intellectual
          property laws and are the exclusive property of BVaishali or its
          licensors. You may not modify, copy, distribute, transmit, display,
          perform, reproduce, publish, license, create derivative works from,
          transfer, or sell any information, products, or services obtained from
          the eStore without our prior written consent.
        </p>
        <h2>3.2 Trademarks:</h2>
        <p>
          All trademarks, service marks, logos, and trade names displayed on the
          eStore are the property of their respective owners. You may not use
          any trademarks, service marks, logos, or trade names without the
          express written permission of the respective owners.
        </p>
        <h2>Limitation of Liability:</h2>
        <p>
          To the maximum extent permitted by applicable law, we shall not be
          liable for any indirect, incidental, special, consequential, or
          exemplary damages, including but not limited to damages for loss of
          profits, goodwill, data, or other intangible losses arising out of or
          in connection with your use or inability to use the eStore or any
          products purchased through the eStore.
        </p>
        <h2>Indemnification:</h2>
        <p>
          You agree to indemnify, defend, and hold harmless BVaishali, its
          affiliates, officers, directors, employees, and agents from any
          claims, liabilities, damages, losses, costs, or expenses, including
          reasonable attorneys&apos; fees, arising out of or in connection with
          your use of the eStore, violation of these Terms, or infringement of
          any intellectual property or other rights of any third party.
        </p>
        <h2>Governing Law and Dispute Resolution:</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Jurisdiction]. Any disputes arising out of or in connection
          with these Terms shall be resolved through binding arbitration in
          accordance with the rules of [Arbitration Provider]. Any arbitration
          shall take place in [Arbitration Location], and the language of the
          arbitration shall be [Arbitration Language].
        </p>
        <h2>Modifications to the Terms:</h2>
        <p>
          We reserve the right to modify or update these Terms at any time
          without prior notice. The updated Terms will be effective as of the
          date of posting on the eStore. Your continued use of the eStore after
          the posting of the updated Terms constitutes your acceptance of the
          modified Terms.
        </p>
        <h2>Contact Us:</h2>
        <p>
          If you have any questions or concerns regarding these Terms of
          Service, please contact us at [contact information].
        </p>
        <p>
          Please note that these Terms of Service are subject to change without
          prior notice. We encourage you to review these Terms periodically for
          any updates or modifications.
        </p>
      </Card>
    </div>
  );
};

export default TermsOfService;
