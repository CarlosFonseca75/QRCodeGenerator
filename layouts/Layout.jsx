import React from "react";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
