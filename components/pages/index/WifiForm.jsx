// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Input from "@components/common/Input";
import Select from "@components/common/Select";

const networkOptions = [
  {
    label: "WPA (Wi-Fi Protected Access)",
    value: "wpa",
  },
  {
    label: "WEP (Wired Equivalent Privacy)",
    value: "wep",
  },
];

export default function WifiForm({ data, setData }) {
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
      <Select
        id="networkType"
        label="Network type:"
        value={data.networkType}
        onChange={onChange}
        options={networkOptions}
      />

      <Input
        id="networkName"
        type="text"
        label="Network name:"
        name="networkName"
        value={data.networkName}
        placeholder="Enter the Wi-Fi network name"
        onChange={onChange}
        minLength={15}
        maxLength={100}
        required
      />

      <Input
        id="networkPassword"
        type="password"
        label="Network password:"
        name="networkPassword"
        value={data.networkPassword}
        placeholder="Enter the Wi-Fi network password"
        onChange={onChange}
        minLength={8}
        maxLength={20}
        required
      />
    </>
  );
}

WifiForm.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    networkType: PropTypes.oneOf(["wpa", "wep"]).isRequired,
    networkName: PropTypes.string.isRequired,
    networkPassword: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emails: PropTypes.arrayOf(PropTypes.string).isRequired,
    phoneNumbers: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.string,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
};