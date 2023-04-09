// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Input from "@components/common/Input";

export default function UrlForm({ data, setData }) {
  /**
   * @function
   * @name onChange
   * @description Sets form data when the inputs values are changed.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  function onChange(event) {
    try {
      const { id, value } = event.target;

      setData((currentData) => ({
        ...currentData,
        [id]: value,
      }));
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  return (
    <>
      <Input
        id="url"
        type="text"
        label="URL:"
        name="url"
        value={data.url}
        placeholder="Enter the website URL, e.g. https://example.com"
        onChange={onChange}
        minLength={15}
        maxLength={100}
        required
      />
    </>
  );
}

UrlForm.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    networkType: PropTypes.oneOf(["wpa", "wep"]).isRequired,
    networkName: PropTypes.string.isRequired,
    networkPassword: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emails: PropTypes.arrayOf(PropTypes.string).isRequired,
    phoneNumbers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
};