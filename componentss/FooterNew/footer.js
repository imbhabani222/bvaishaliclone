"use client";
import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className={styles.container}>
        © {currentYear} BVaishali. All Rights Reserved | Developed by
        <a
          href="https://hutechsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp; Hutech Solutions
        </a>
      </div>
    </>
  );
};

export default Footer;
