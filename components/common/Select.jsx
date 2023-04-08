import React from "react";
import PropTypes from "prop-types";

import styles from "@styles/components/common/Select.module.scss";

export default function Select({ id, label, value, onChange, options }) {
  return (
    <div className={styles.wrapper}>
      {/* Label. */}
      <label htmlFor={id}>
        <strong>{label}</strong>
      </label>

      {/* Select. */}
      <select
        className={styles.wrapper__select}
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};
