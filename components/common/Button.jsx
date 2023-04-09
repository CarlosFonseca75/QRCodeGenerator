// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Styles.
import styles from "@styles/components/common/Button.module.scss";

export default function Button({ text, type, onClick, ariaLabel }) {
  return (
    <div className={styles.wrapper}>
      <button type={type} onClick={onClick} aria-label={ariaLabel}>
        {text}
      </button>
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};