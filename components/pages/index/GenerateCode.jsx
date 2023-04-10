// Dependencies.
import React, { useState } from "react";
import Image from "next/image";

// Components.
import Select from "@components/common/Select";
import Modal from "@components/common/Modal";
import Button from "@components/common/Button";
import UrlForm from "./UrlForm";
import WifiForm from "./WifiForm";
import VCardForm from "./VCardForm";

// Helpers.
import generateUrlQRCodeUrl from "@helpers/generateUrlQRCodeUrl";
import generateNetworkQRCodeUrl from "@helpers/generateNetworkQRCodeUrl";
import convertSvg from "@helpers/convertSvg";

// Styles.
import styles from "@styles/components/pages/index/GenerateCode.module.scss";

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

const defaultData = {
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
  // State.
  const [data, setData] = useState(defaultData);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("url");
  const [svg, setSvg] = useState("");
  const [formHasErrors, setFormHasErrors] = useState(false);

  /**
   * @function
   * @name isFormValidAndComplete
   * @description Validates if the form is complete and valid.
   * @returns {boolean} Returns true if the form is complete and valid, false otherwise.
   */
  function isFormValidAndComplete() {
    try {
      const {
        url,
        networkType,
        networkName,
        networkPassword,
        firstName,
        emails,
        phoneNumbers,
      } = data;

      if (type === "url" && url) return true;

      if (type === "wifi" && networkType && networkName && networkPassword)
        return true;

      if (type === "vcard" && firstName && emails?.[0] && phoneNumbers?.[0])
        return true;

      // Enable error flag.
      setFormHasErrors(true);

      return false;
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return false;
    }
  }

  /**
   * @async
   * @function
   * @name fetchQRCode
   * @description Fetches QR Code by a given URL.
   * @param {string} url - QR Code URL.
   * @returns {svg} SVG string. (QR Code).
   */
  async function fetchQRCode(url) {
    try {
      const response = await fetch(url);

      if (!response.ok)
        throw new Error(`Failed to fetch QR code: ${response.statusText}`);

      const svgText = await response.text();

      return svgText;
    } catch (e) {
      console.error(`Error: ${e.message}`);
      return "";
    }
  }

  /**
   * @async
   * @function
   * @name submit
   * @description Submits the form and generates the QR code.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function submit(event) {
    try {
      event.preventDefault();

      // Validate form.
      if (!isFormValidAndComplete()) return;

      // Get URL.
      let url = "";
      if (type === "url") url = generateUrlQRCodeUrl(data.url);
      if (type === "wifi") url = generateNetworkQRCodeUrl(data);

      // Make fetch request.
      const svgString = await fetchQRCode(url);

      // Convert SVG.
      const convertedSvg = convertSvg(svgString);

      // Set SVG.
      setSvg(convertedSvg);

      // Clean form.
      setData(defaultData);

      // Show Modal.
      setShowModal(true);
    } catch (e) {
      console.error(`Error: ${e.message}`);
    }
  }

  return (
    <>
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
            value={type}
            onChange={(event) => setType(event.target.value)}
            options={qrOptions}
          />

          {/* Fields. */}
          {type === "url" && <UrlForm data={data} setData={setData} />}

          {type === "wifi" && <WifiForm data={data} setData={setData} />}

          {type === "vcard" && <VCardForm data={data} setData={setData} />}

          {/* Submit. */}
          <Button
            text="Generate QR"
            type="submit"
            onClick={submit}
            ariaLabel="Generate QR"
            disabled={formHasErrors}
          />
        </form>
      </section>

      {/* Modal. */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        header={"QR Code"}
      >
        <Image src={svg} alt="QR Code" width={200} height={200} />
      </Modal>
    </>
  );
}
