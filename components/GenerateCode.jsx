// Dependencies.
import React, { useState } from "react";

// Components.
import Select from "@components/common/Select";
import Input from "@components/common/Input";
import PhoneInput from "@components/common/PhoneInput";

// Styles.
import styles from "@styles/components/GenerateCode.module.scss";

const qrOptions = [
  {
    label: "Standard URL",
    value: 1,
  },
  {
    label: "WiFi login",
    value: 2,
  },
  {
    label: "VCard business card",
    value: 3,
  },
];

const networkOptions = [
  {
    label: "WPA (Wi-Fi Protected Access)",
    value: "WPA",
  },
  {
    label: "WEP (Wired Equivalent Privacy)",
    value: "WEP",
  },
];

export default function GenerateCode() {
  // Form data.
  const [data, setData] = useState({
    type: 0,
    url: "",
    networkType: "",
    networkName: "",
    networkPassword: "",
    firstName: "",
    lastName: "",
    emails: [""],
    phoneNumbers: [""],
  });

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
      console.log(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name onEmailChange
   * @description Sets emails when the emails inputs values are changed.
   * @param {Event}  event - The event object.
   * @param {number} index - Index of the email that changed.
   * @returns {void}
   */
  function onEmailChange(event, index) {
    try {
      const value = event.target.value;

      setData((currentData) => {
        const emails = currentData.emails;
        emails[index] = value;

        return {
          ...currentData,
          emails,
        };
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name addEmail
   * @description Adds an empty string to the emails array to allow for another email to be added.
   * @returns {void}
   */
  function addEmail() {
    try {
      setData((currentData) => {
        const emails = currentData.emails.concat("");

        return {
          ...currentData,
          emails,
        };
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name removeEmail
   * @description Removes an email from the emails array.
   * @param {number} index - Index of the email to be removed.
   * @returns {void}
   */
  function removeEmail(index) {
    try {
      setData((currentData) => {
        const emails = currentData.emails;
        delete emails[index];

        return {
          ...currentData,
          emails,
        };
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name onPhoneChange
   * @description Sets phone numbers when the phone numbers inputs values are changed.
   * @param {Event}  event - The event object.
   * @param {number} index - Index of the phone that changed.
   * @returns {void}
   */
  function onPhoneChange(event, index) {
    try {
      const value = event.target.value;

      setData((currentData) => {
        const phoneNumbers = currentData.phoneNumbers;
        phoneNumbers[index] = value;

        return {
          ...currentData,
          phoneNumbers,
        };
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name addPhone
   * @description Adds an empty string to the phones array to allow for another phone to be added.
   * @returns {void}
   */
  function addPhone() {
    try {
      setData((currentData) => {
        const phoneNumbers = currentData.phoneNumbers.concat("");

        return {
          ...currentData,
          phoneNumbers,
        };
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name removePhone
   * @description Removes a phone from the phones array.
   * @param {number} index - Index of the phone to be removed.
   * @returns {void}
   */
  function removePhone(index) {
    try {
      setData((currentData) => {
        const phoneNumbers = currentData.phoneNumbers;
        delete phoneNumbers[index];

        return {
          ...currentData,
          phoneNumbers,
        };
      });
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }

  return (
    <section className={styles.wrapper}>
      {/* Title. */}
      <div className={styles.wrapper__title}>
        <h1>
          Get Started with <span className={styles.highlight}>QR Codes!</span>
        </h1>
      </div>

      {/* Form. */}
      <form className={styles.wrapper__form} action="#" method="post">
        <p>
          <strong>Complete the following form:</strong>
        </p>

        <Select
          id="type"
          label="Type:"
          value={data.type}
          onChange={onChange}
          options={qrOptions}
        />

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

        {/* Emails. */}
        {data.emails.map((email, index) => (
          <div key={`email-${index}`}>
            <Input
              id={`email-${index}`}
              type="email"
              label="Email address:"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={(event) => onEmailChange(event, index)}
              maxLength={50}
              required
            />

            {/* Add and remove messages. */}
            {index === data.emails.length - 1 ? (
              <p className={styles["add-message"]} onClick={addEmail}>
                + Add email
              </p>
            ) : (
              <p
                className={styles["remove-message"]}
                onClick={() => removeEmail(index)}
              >
                - Remove email
              </p>
            )}
          </div>
        ))}

        {/* Phone numbers. */}
        {data.phoneNumbers.map((phone, index) => (
          <div key={`phone-${index}`}>
            <PhoneInput
              id={`phone-${index}`}
              label="Phone number:"
              value={phone}
              placeholder="Enter your phone number"
              onChange={(event) => onPhoneChange(event, index)}
            />

            {/* Add and remove messages. */}
            {index === data.phoneNumbers.length - 1 ? (
              <p className={styles["add-message"]} onClick={addPhone}>
                + Add phone
              </p>
            ) : (
              <p
                className={styles["remove-message"]}
                onClick={() => removePhone(index)}
              >
                - Remove phone
              </p>
            )}
          </div>
        ))}
      </form>
    </section>
  );
}
