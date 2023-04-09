// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Input from "@components/common/Input";
import PhoneInput from "@components/common/PhoneInput";

// Styles.
import styles from "@styles/components/pages/index/VCardForm.module.scss";

export default function VCardForm({ data, setData }) {
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

  /**
   * @function
   * @name onItemChange
   * @description Sets items when the inputs values are changed.
   * @param {Event} value - Item value.
   * @param {"emails" | "phoneNumbers"} type - The type of item to add.
   * @param {number} index - Index of the item that changed.
   * @returns {void}
   */
  function onItemChange(value, type, index) {
    try {
      setData((currentData) => {
        const items = JSON.parse(JSON.stringify(currentData[type]));

        items[index] = value;

        return {
          ...currentData,
          [type]: items,
        };
      });
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name addItem
   * @param {"emails" | "phoneNumbers"} type - The type of item to add.
   * @description Adds an empty string to the items array to allow for another item to be added.
   * @returns {void}
   */
  function addItem(type) {
    try {
      setData((currentData) => {
        const items = currentData[type].concat("");

        return {
          ...currentData,
          [type]: items,
        };
      });
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name removeItem
   * @description Removes an item from the items array.
   * @param {"emails" | "phoneNumbers"} type - The type of item to add.
   * @param {number} index - Index of the item to be removed.
   * @returns {void}
   */
  function removeItem(type, index) {
    try {
      setData((currentData) => {
        const items = JSON.parse(JSON.stringify(currentData[type]));

        items.splice(index, 1);

        return {
          ...currentData,
          [type]: items,
        };
      });
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  return (
    <>
      <Input
        id="firstName"
        type="text"
        label="First name:"
        name="firstName"
        value={data.firstName}
        placeholder="Enter your first name"
        onChange={onChange}
        maxLength={20}
        required
      />

      <Input
        id="lastName"
        type="text"
        label="Last name:"
        name="lastName"
        value={data.lastName}
        placeholder="Enter your last name"
        onChange={onChange}
        maxLength={20}
      />

      {data.emails.map((email, index) => (
        <div key={`email-${index}`}>
          <Input
            id={`email-${index}`}
            type="email"
            label="Email address:"
            name="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(event) => onItemChange(event.target.value, "emails", index)}
            maxLength={50}
            required
          />

          {data.emails.length > 1 && (
            <p
              className={styles["remove-message"]}
              onClick={() => removeItem("emails", index)}
            >
              - Remove email
            </p>
          )}

          {index === data.emails.length - 1 && (
            <p
              className={styles["add-message"]}
              onClick={() => addItem("emails")}
            >
              + Add email
            </p>
          )}
        </div>
      ))}

      {data.phoneNumbers.map((phone, index) => (
        <div key={`phone-${index}`}>
          <PhoneInput
            id={`phone-${index}`}
            label="Phone number:"
            value={phone}
            placeholder="Enter your phone number"
            onChange={(value) => onItemChange(value, "phoneNumbers", index)}
          />

          {data.phoneNumbers.length > 1 && (
            <p
              className={styles["remove-message"]}
              onClick={() => removeItem("phoneNumbers", index)}
            >
              - Remove phone
            </p>
          )}

          {index === data.phoneNumbers.length - 1 && (
            <p
              className={styles["add-message"]}
              onClick={() => addItem("phoneNumbers")}
            >
              + Add phone
            </p>
          )}
        </div>
      ))}
    </>
  );
}

VCardForm.propTypes = {
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
