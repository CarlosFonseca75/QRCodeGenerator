// Dependencies.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Components.
import Button from "@components/common/Button";

// Styles.
import styles from "@styles/components/common/Modal.module.scss";

// Icons.
const closeIcon = <FontAwesomeIcon icon={faTimes} />;

export default function Modal({
  showModal,
  setShowModal,
  header,
  children,
}) {
  // Flag.
  const [isBrowser, setIsBrowser] = useState(false);

  // UseEffect.
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Content.
  const modal = showModal && (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        {/* Header. */}
        <div className={styles.modal__header}>
          <h3>{header}</h3>

          {/* Close. */}
          <span
            className={styles.modal__header__button}
            role="button"
            tabIndex={0}
            onClick={() => setShowModal(false)}
            aria-label={"Close QR modal"}
          >
            {closeIcon}
          </span>
        </div>

        {/* Content. */}
        <div className={styles.modal__content}>{children}</div>

        {/* Footer. */}
        <div className={styles.modal__footer}>
          <Button
            text="Download"
            type="button"
            onClick={() => console.log("Download")}
            ariaLabel="Dowload QR Code"
          />

          <Button
            text="Close"
            type="button"
            onClick={() => setShowModal(false)}
            ariaLabel="Close"
          />
        </div>
      </div>
    </div>
  );

  // Portal.
  return isBrowser
    ? ReactDom.createPortal(modal, document.getElementById("modal-root"))
    : null;
}
