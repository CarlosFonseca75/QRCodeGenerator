// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import PhoneNumberInput from "react-phone-number-input";

// Styles.
import "react-phone-number-input/style.css";
import styles from "@styles/components/common/PhoneInput.module.scss";

export default function PhoneInput({
  id,
  label,
  value,
  placeholder,
  onChange,
  minLength,
  maxLength,
  required,
}) {
  return (
    <div className={styles.wrapper}>
      {/* Label. */}
      <label htmlFor={id}>
        <strong>{label}</strong>
      </label>

      {/* Input. */}
      <PhoneNumberInput
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={styles.wrapper__phone}
      />
    </div>
  );
}

PhoneInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
};
