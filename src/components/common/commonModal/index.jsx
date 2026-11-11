import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * CommonModal is a customizable React Bootstrap modal component.
 * It allows you to display a modal with different content and button options.
 *
 * @param {boolean} show - Controls whether the modal is visible.
 * @param {function} onHide - Callback function to hide the modal.
 * @param {string} title - Title displayed in the modal.
 * @param {string} body - Body content of the modal.
 * @param {string} className - Additional CSS classes for the modal.
 * @param {function} handleYES - Callback function for the "Yes" or "OK" button.
 * @param {function} handleNO - Callback function for the "No" button.
 * @param {function} handleOK - Callback function for the "OK" button.
 * @param {boolean} showOK - Determines if the "OK" button is displayed.
 * @param {boolean} okayButton - Determines if the "OK" button is displayed.
 * @param {boolean} closeButton - Determines if the "Close" button is displayed.
 * @param {boolean} showError - Adds temporary red color to the title if true.
 * @param {string} color - Custom color for the modal text.
 * @param {string} buttonText - Text to be displayed on the custom button.
 * @param {boolean} customButton - Determines if the custom button is displayed.
 */

const CommonModal = ({
  centered,
  show,
  onHide,
  title,
  body,
  className,
  handleYES,
  handleNO,
  handleOK,
  showOK,
  okayButton,
  closeButton,
  acceptOrReject = false,
  handleAccept,
  handleReject,
  handleClose,
  showError,
  color,
  buttonText,
  customButton = false,
  disableCustomButton = false,
  contentClassName,
}) => {
  let footerContent;

  if (customButton && buttonText) {
    footerContent = (
      <Button variant="secondary" onClick={handleYES || handleOK || onHide} disabled={disableCustomButton}>
        {buttonText}
      </Button>
    );
  } else if (showOK || okayButton) {
    footerContent = (
      <Button variant="secondary" onClick={handleYES || handleOK || onHide}>
        OK
      </Button>
    );
  } else if (closeButton) {
    footerContent = (
      <Button variant="secondary" onClick={handleClose || onHide}>
        Close
      </Button>
    );
  } else if (acceptOrReject) {
    footerContent = (
      <>
        <Button variant="primary" onClick={handleAccept || handleYES}>
          Accept
        </Button>
        <Button variant="secondary" onClick={handleReject || handleNO}>
          Reject
        </Button>
      </>
    );
  } else {
    footerContent = (
      <>
        <Button variant="primary" onClick={handleYES}>
          Yes
        </Button>
        <Button variant="secondary" onClick={handleNO}>
          No
        </Button>
      </>
    );
  }

  return (
    <Modal
      contentClassName={contentClassName || ""}
      show={show}
      onHide={onHide}
      className={className}
      backdrop="static"
      keyboard={false}
      centered={centered}
    >
      <Modal.Header closeButton>
        <Modal.Title className={`font-18 h-100 ${showError ? "temp-red-color" : ""}`}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="font-14 h-100" style={{ color: color }}>
        {body}
      </Modal.Body>
      <Modal.Footer>{footerContent}</Modal.Footer>
    </Modal>
  );
};

CommonModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.node,
  className: PropTypes.string,
  handleYES: PropTypes.func,
  handleNO: PropTypes.func,
  handleOK: PropTypes.func,
  showOK: PropTypes.bool,
  okayButton: PropTypes.bool,
  closeButton: PropTypes.bool,
  acceptOrReject: PropTypes.bool,
  handleClose: PropTypes.func,
  showError: PropTypes.bool,
  color: PropTypes.string,
  buttonText: PropTypes.string,
  customButton: PropTypes.bool,
  contentClassName: PropTypes.string,
};

export default CommonModal;
