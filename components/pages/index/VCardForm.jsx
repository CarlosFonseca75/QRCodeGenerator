// Dependencies.
import React from "react";
import PropTypes from "prop-types";

// Components.
import Input from "@components/common/Input";
import PhoneInput from "@components/common/PhoneInput";
import Select from "@components/common/Select";

// Styles.
import styles from "@styles/components/pages/index/VCardForm.module.scss";

const phoneTypeOptions = [
  {
    label: "Work",
    value: "work",
  },
  {
    label: "Home",
    value: "home",
  },
];

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
   * @description Updates the value of an item at a given index in the emails or phoneNumbers array.
   * @param {Event} value - Item value.
   * @param {"emails" | "phoneNumbers"} type - The type of item to add.
   * @param {number} index - Index of the item that changed.
   * @returns {void}
   */
  function onItemChange(value, type, index) {
    try {
      setData((currentData) => {
        const items = JSON.parse(JSON.stringify(currentData[type]));

        if (type === "emails") items[index] = value;
        else items[index].number = value;

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
   * Adds an empty item to the array to allow for adding more items.
   *
   * For "emails", an empty string is added.
   * For "phoneNumbers", an empty object with default keys is added.
   *
   * @function
   * @name addItem
   * @param {"emails" | "phoneNumbers"} type - The type of item to add.
   * @returns {void}
   */
  function addItem(type) {
    try {
      setData((currentData) => {
        const newItem = type === "emails" ? "" : { phone: "", type: "work" };
        const items = currentData[type].concat(newItem);

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

  /**
   * @function
   * @name onPhoneTypeChange
   * @description Sets phone type when the inputs values are changed.
   * @param {Event} event - The event object.
   * @param {number} index - Index of the phone number that changed.
   * @returns {void}
   */
  function onPhoneTypeChange(event, index) {
    try {
      const type = event.target.value;

      setData((currentData) => {
        const phoneNumbers = JSON.parse(
          JSON.stringify(currentData.phoneNumbers)
        );

        phoneNumbers[index].type = type;

        return {
          ...currentData,
          phoneNumbers,
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
            onChange={(event) =>
              onItemChange(event.target.value, "emails", index)
            }
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
          <div className={styles["phone-number"]}>
            <PhoneInput
              id={`phone-${index}`}
              label="Phone number:"
              value={phone.number}
              placeholder="Enter your phone number"
              onChange={(value) => onItemChange(value, "phoneNumbers", index)}
            />

            <Select
              id={`phone-type-${index}-`}
              value={phone.type}
              onChange={(event) => onPhoneTypeChange(event, index)}
              options={phoneTypeOptions}
            />
          </div>

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
    phoneNumbers: PropTypes.arrayOf(
      PropTypes.shape({
        number: PropTypes.string,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
};
