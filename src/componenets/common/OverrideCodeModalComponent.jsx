import React from "react";
import { Modal, Button, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import UsersService from "../../services/UsersService";
import { useDispatch } from "react-redux";
import LoadingIcon from "./LoadingIcon";
import toast from "react-hot-toast";
import Input from "../../components/common/input";
/**
 * ModalComponent is a customizable React Bootstrap modal component.
 * It allows you to display a modal with different content and button options.
 *
 * @param {boolean} show - Controls whether the modal is visible.
 * @param {function} onHide - Callback function to hide the modal.
 * @param {string} title - Title displayed in the modal.
 * @param {string} body - Body content of the modal.
 * @param {string} className - Additional CSS classes for the modal.
 * @param {function} handleYES - Callback function for the "Yes" or "OK" button.
 * @param {function} handleNO - Callback function for the "No" button.
 * @param {boolean} showOK - Determines if the "OK" button is displayed.
 * @param {boolean} okayButton - Determines if the "OK" button is displayed.
 * @param {boolean} closeButton - Determines if the "Close" button is displayed.
 * @param {boolean} showError - Adds temporary red color to the title if true.
 * @param {string} color - Custom color for the modal text.
 */

const OverrideCodeModalComponent = ({
  show,
  onHide,
  open,
  title,
  body,
  className,
  handleYES,
  handleNO,
  permissionObjectKey,
  validOverride,
  setValidOverride,
  customAddonForOverride,
  color,
  permission,
}) => {
  let footerContent;
  let bodyContent;
  let headerContent;

  const dispatch = useDispatch();

  const [clickedOverride, setClickedOverride] = useState(false);
  const [onYesClick, setOnYesClick] = useState(false);
  const [overrideCode, setOverrideCode] = useState("");
  const [loading, setLoading] = useState(false);

  const resetScreen = () => {
    setClickedOverride(false);
    setOnYesClick(false);
    setOverrideCode("");
  };

  if (!validOverride && clickedOverride) {
    footerContent = (
      <Button
        variant="secondary"
        onClick={() => {
          onHide();
          setTimeout(() => {
            resetScreen();
          }, 25);
        }}
      >
        OK
      </Button>
    );
    bodyContent = <>{`Invalid Override Code. Please try again `}</>;
    headerContent = <>{"Warning !!"}</>;
  } else if (onYesClick) {
    footerContent = (
      <>
        <Button
          variant="secondary"
          onClick={() => {
            onHide();
            if (!permission) {
              setValidOverride(false);
              setClickedOverride(true);
              toast.error("User do not have override permission");
            } else {
              handleOverrideOnClick();
            }
            setTimeout(() => {
              resetScreen();
            }, 10);
          }}
          disabled={!overrideCode}
        >
          Override
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onHide();
            setTimeout(() => {
              resetScreen();
            }, 25);
          }}
        >
          No
        </Button>
      </>
    );
    bodyContent = (
      <>
        <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 `}>
          <Col xs={3} sm={3} md={3} className="p-0">
            <Form.Label className="col-form-label dealer-label">Override Code</Form.Label>
          </Col>
          <Col xs={7} md={7} sm={7} className="p-0">
            <Input
              className="customFormControl"
              id="overideCode"
              name="overideCode"
              value={overrideCode}
              maxLength={30}
              type="password"
              autoComplete="one-time-code"
              spellCheck={false}
              aria-autocomplete="list"
              onChange={(e) => {
                setOverrideCode(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
      </>
    );
    headerContent = <>{"Please enter the details for overriding the rate"}</>;
  } else if (!onYesClick) {
    footerContent = (
      <>
        <Button
          variant="primary"
          onClick={() => {
            setOnYesClick(true);
          }}
        >
          Yes
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onHide();
            setTimeout(() => {
              resetScreen();
            }, 25);
          }}
        >
          No
        </Button>
      </>
    );
    bodyContent = <>{body}</>;
    headerContent = <>{"Warning !!"}</>;
  }

  const handleOverrideOnClick = () => {
    setLoading(true);
    UsersService.hasOverridePermission(permissionObjectKey, overrideCode)
      .then(({ data }) => {
        setValidOverride(data);
        if (data) {
          customAddonForOverride && customAddonForOverride(overrideCode);
          onHide();
          setClickedOverride(false);
        } else {
          setClickedOverride(true);
          open && open();
        }
      })
      .catch(() => {
        setValidOverride(false);
        setClickedOverride(true);
      })
      .finally(() => setLoading(false));
  };

  if (loading) return <LoadingIcon />;
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setTimeout(() => {
          resetScreen();
        }, 5);
      }}
      className={className}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className={`font-18 h-100 ${true ? "temp-red-color" : ""}`}>{headerContent}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={`font-14 h-100 ${!validOverride && clickedOverride ? "temp-red-color" : ""}`}
        style={{ color: color }}
      >
        {bodyContent}
      </Modal.Body>
      <Modal.Footer>{footerContent}</Modal.Footer>
    </Modal>
  );
};

OverrideCodeModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleYES: PropTypes.func,
  handleNO: PropTypes.func,
  showOK: PropTypes.bool,
  okayButton: PropTypes.bool,
  closeButton: PropTypes.bool,
  showError: PropTypes.bool,
  color: PropTypes.string,
  customAddonForOverride: PropTypes.func,
};

export default OverrideCodeModalComponent;
