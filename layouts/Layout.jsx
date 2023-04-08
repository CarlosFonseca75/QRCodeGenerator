import React from "react";
import PropTypes from "prop-types";
import Footer from "@components/layouts/Footer";
import styles from "@styles/layouts/Layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <main className={styles.wrapper}>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
