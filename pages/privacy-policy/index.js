import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb, Card, Row } from "antd";

const PrivacyPolicy = () => {
  return (
    <div className={styles.main_container}>
      <Row className={styles.bread_crumb}>
        <Breadcrumb>
          <Breadcrumb.Item href=""></Breadcrumb.Item>
          <Breadcrumb.Item href="/">
            <span>Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Privacy Policy</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Card style={{ display: "flex", paddingInline: "2%" }}>
        <h1 style={{ textAlign: "center" }}>Privacy policy</h1>
        <p>
          At The Boutique BVaishali, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy outlines how
          we collect, use, disclose, and protect the information you provide to
          us when you visit our website, engage with our services, or interact
          with us in any way. By using our website or providing us with your
          personal information, you consent to the practices described in this
          policy.
        </p>
        <h2>Information We Collect:</h2>
        <p>
          1.1 Personal Information: We may collect personal information from you
          when you voluntarily provide it to us. This may include your name,
          email address, postal address, phone number, payment information, and
          any other information you choose to provide.
        </p>

        <h2>1.2 Usage Information:</h2>
        <p>
          When you visit our website, we may collect certain information
          automatically, such as your IP address, browser type, referring/exit
          pages, operating system, date/time stamps, and website navigation
          patterns. We may also collect information about your interactions with
          our website, such as the pages you visit, the links you click on, and
          the searches you perform.
        </p>
        <h2>Use of Information:</h2>
        <h2>2.1 Provide Services:</h2>
        <p>
          We use the personal information you provide to deliver the services
          you request, such as processing your orders, responding to your
          inquiries, and providing customer support.
        </p>

        <h2>2.2 Improve User Experience:</h2>
        <p>
          We may use the information collected to improve our website, products,
          and services. This includes analyzing usage patterns, conducting
          research and analytics, and enhancing the functionality and
          performance of our website.
        </p>
        <h2>2.3 Marketing and Communications:</h2>
        <p>
          With your consent, we may use your contact information to send you
          promotional materials, newsletters, or other marketing communications.
          You can opt-out of receiving such communications at any time by
          following the unsubscribe instructions provided in the communication.
        </p>
        <h2>2.4 Legal Compliance:</h2>
        <p>
          We may use and disclose your information as required by applicable
          laws, regulations, legal processes, or enforceable governmental
          requests. We may also use and disclose your information to protect our
          rights, privacy, safety, or property, as well as those of our users or
          others.
        </p>
        <h2>Information Sharing:</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties for their marketing purposes. However, we may share your
          information with trusted third-party service providers who assist us
          in operating our business, conducting transactions, or providing
          services to you. These service providers are contractually obligated
          to keep your information confidential and use it only for the purposes
          specified by us.
        </p>
        <p>
          We may also disclose your information to comply with legal
          obligations, enforce our policies, respond to claims that content
          violates the rights of others, or protect the rights, property, or
          safety of ourselves, our users, or the public.
        </p>
        <h2>Data Security:</h2>
        <p>
          We employ industry-standard security measures to protect your personal
          information from unauthorized access, disclosure, alteration, or
          destruction. However, no method of transmission over the internet or
          electronic storage is entirely secure. Therefore, we cannot guarantee
          absolute security.
        </p>
        <h2>Third-Party Links:</h2>
        <p>
          Our website may contain links to third-party websites or services.
          This Privacy Policy does not apply to those third-party websites. We
          recommend reviewing the privacy policies of those websites before
          providing any personal information.
        </p>
        <h2>Children&apos;s Privacy:</h2>
        <p>
          Our website and services are not intended for children under the age
          of 13. We do not knowingly collect personal information from children.
          If you believe we have inadvertently collected information from a
          child, please contact us immediately, and we will take appropriate
          steps to remove that information from our systems.
        </p>
        <h2>Changes to the Privacy Policy:</h2>
        <p>
          We reserve the right to modify or update this Privacy Policy at any
          time. If we make any material changes, we will notify you by updating
          the &quot;Last Updated&quot; date at the top of this policy. We
          encourage you to review this Privacy Policy periodically.{" "}
        </p>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
