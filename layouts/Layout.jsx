import React from "react";
import PropTypes from "prop-types";

import Navbar from "@components/layouts/Navbar";
import Footer from "@components/layouts/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
