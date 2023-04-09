// Dependencies.
import React, { useState } from "react";

// Components.
import Select from "@components/common/Select";
import Input from "@components/common/Input";
import PhoneInput from "@components/common/PhoneInput";
import Button from "@components/common/Button";

// Helpers.
import generateUrlQRCodeUrl from "@helpers/generateUrlQRCodeUrl";
import generateNetworkQRCodeUrl from "@helpers/generateNetworkQRCodeUrl";

// Styles.
import styles from "@styles/components/GenerateCode.module.scss";

const qrOptions = [
  {
    label: "Standard URL",
    value: "url",
  },
  {
    label: "WiFi login",
    value: "wifi",
  },
  {
    label: "VCard business card",
    value: "vcard",
  },
];

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

const defaultData = {
  type: "url",
  url: "",
  networkType: "wpa",
  networkName: "",
  networkPassword: "",
  firstName: "",
  lastName: "",
  emails: [""],
  phoneNumbers: [""],
};

export default function GenerateCode() {
  // Form data.
  const [data, setData] = useState(defaultData);

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
      console.error(`Error: ${e.message}`);
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
      console.error(`Error: ${e.message}`);
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
        const emails = JSON.parse(JSON.stringify(currentData.emails));

        emails.splice(index, 1);

        return {
          ...currentData,
          emails,
        };
      });
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @name onPhoneChange
   * @description Sets phone numbers when the phone numbers inputs values are changed.
   * @param {string}  phoneNumber - Phone number value.
   * @param {number}  index - Index of the phone that changed.
   * @returns {void}
   */
  function onPhoneChange(phoneNumber, index) {
    try {
      setData((currentData) => {
        const phoneNumbers = currentData.phoneNumbers;
        phoneNumbers[index] = phoneNumber;

        return {
          ...currentData,
          phoneNumbers,
        };
      });
    } catch (e) {
      console.error(`Error: ${e.message}`);
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
      console.error(`Error: ${e.message}`);
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
        const phoneNumbers = JSON.parse(
          JSON.stringify(currentData.phoneNumbers)
        );

        phoneNumbers.splice(index, 1);

        return {
          ...currentData,
          phoneNumbers,
        };
      });
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  /**
   * @function
   * @description Validates if the form is complete and valid.
   * @name isFormValidAndComplete
   * @returns {boolean} Returns true if the form is complete and valid, false otherwise.
   */
  function isFormValidAndComplete(data) {
    try {
      const {
        type,
        url,
        networkType,
        networkName,
        networkPassword,
        firstName,
        emails,
        phoneNumbers,
      } = data;

      if (type === "url" && url)  return true;

      if (type === "wifi" && networkType && networkName && networkPassword)  return true;

      if (type === "vcard" && firstName && emails?.[0] && phoneNumbers?.[0])  return true;

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @function
   * @name submit
   * @description Submits the form and generates the QR code.
   * @param {Event}  event - The event object.
   * @returns {void}
   */
  function submit(event) {
    try {
      event.preventDefault();

      // Validate form.
      if (!isFormValidAndComplete) return;
      
      // Get URL.
      let url = "";

      if (data.type === "url") url = generateUrlQRCodeUrl(data.url);

      if (data.type === "wifi") url = generateNetworkQRCodeUrl(data);

      // fetch.
      console.log(`Ready: ${url}`);
    } catch (e) {
      console.error(`Error: ${e.message}`);
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
      <form
        aria-label="Generate QR form"
        className={styles.wrapper__form}
        onSubmit={submit}
      >
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

        {/* URL fields. */}
        {data.type === "url" && (
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
        )}

        {/* Wifi login fields. */}
        {data.type === "wifi" && (
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
        )}

        {/* Wifi login fields. */}
        {data.type === "vcard" && (
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

                {/* Remove message. */}
                {data.emails.length > 1 && (
                  <p
                    className={styles["remove-message"]}
                    onClick={() => removeEmail(index)}
                  >
                    - Remove email
                  </p>
                )}

                {/* Add message. */}
                {index === data.emails.length - 1 && (
                  <p className={styles["add-message"]} onClick={addEmail}>
                    + Add email
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

                {/* Remove message. */}
                {data.phoneNumbers.length > 1 && (
                  <p
                    className={styles["remove-message"]}
                    onClick={() => removePhone(index)}
                  >
                    - Remove phone
                  </p>
                )}

                {/* Add message. */}
                {index === data.phoneNumbers.length - 1 && (
                  <p className={styles["add-message"]} onClick={addPhone}>
                    + Add phone
                  </p>
                )}
              </div>
            ))}
          </>
        )}

        {/* Submit. */}
        <Button
          text="Generate QR"
          type="submit"
          onClick={submit}
          ariaLabel="Generate QR"
        />
      </form>
    </section>
  );
}
