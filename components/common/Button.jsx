// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Styles.
import styles from "@styles/components/common/Button.module.scss";

export default function Button({ text, type, onClick, ariaLabel, disabled }) {
  return (
    <div className={`${styles.wrapper} ${disabled && styles.wrapper__disabled}`}>
      <button
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
        aria-disabled={disabled}
      >
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
  disabled: PropTypes.bool,
};
