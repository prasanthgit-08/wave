import React from "react";
import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";
import "../../styles/DataTransferButtons.css";

/**
 * PickerController is a React component that provides pagination buttons for data transfer actions.
 *
 * @param {function} doubleArrowRightOnClick - Callback function for the double right arrow button.
 * @param {function} singleArrowRightOnClick - Callback function for the single right arrow button.
 * @param {function} singleArrowLeftOnClick - Callback function for the single left arrow button.
 * @param {function} doubleArrowLeftOnClick - Callback function for the double left arrow button.
 * @param {boolean} disableDoubleArrowRight - Whether to disable the double right arrow button.
 * @param {boolean} disableSingleArrowRight - Whether to disable the single right arrow button.
 * @param {boolean} disableSingleArrowLeft - Whether to disable the single left arrow button.
 * @param {boolean} disableDoubleArrowLeft - Whether to disable the double left arrow button.
 * @param {boolean} borderThin - Use a thinner border style.
 * @param {boolean} hideBorderRight - Hide the right border.
 * @param {boolean} hideBorderLeft - Hide the left border.
 */

const PickerController = ({
  // Pass onClick Handler functions for each buttons
  doubleArrowRightOnClick,
  singleArrowRightOnClick,
  singleArrowLeftOnClick,
  doubleArrowLeftOnClick,
  // Pass disabled condtion as properties to each buttons respectively
  disableDoubleArrowRight,
  disableSingleArrowRight,
  disableSingleArrowLeft,
  disableDoubleArrowLeft,
  borderThin,
  hideBorderRight,
  hideBorderLeft,
}) => {
  return (
    <div
      className={`border border-dark d-flex align-items-center justify-content-center border-top-0 border-bottom-0 
        ${borderThin ? "" : "border-2"}
        ${hideBorderRight ? "border-right-0" : ""}
        ${hideBorderLeft ? "border-left-0" : ""}
      `}
    >
      <Pagination className="d-flex flex-column w-50px border border-1 border-right-0 border-top-0 border-bottom-0">
        <Pagination.Next
          className={`right-arrow-double pickerControllerButton ${disableDoubleArrowRight ? "disabled-op-30" : ""}`}
          onClick={() => {
            doubleArrowRightOnClick();
          }}
        />
        <Pagination.Next
          className={`right-arrow-single pickerControllerButton ${disableSingleArrowRight ? "disabled-op-30" : ""}`}
          onClick={() => {
            singleArrowRightOnClick();
          }}
        />
        <Pagination.Prev
          className={`left-arrow-single pickerControllerButton ${disableSingleArrowLeft ? "disabled-op-30" : ""}`}
          onClick={() => {
            singleArrowLeftOnClick();
          }}
        />
        <Pagination.Prev
          className={`left-arrow-double pickerControllerButton ${disableDoubleArrowLeft ? "disabled-op-30" : ""}`}
          onClick={() => {
            doubleArrowLeftOnClick();
          }}
        />
      </Pagination>
    </div>
  );
};

PickerController.propTypes = {
  doubleArrowRightOnClick: PropTypes.func.isRequired,
  singleArrowRightOnClick: PropTypes.func.isRequired,
  singleArrowLeftOnClick: PropTypes.func.isRequired,
  doubleArrowLeftOnClick: PropTypes.func.isRequired,
  disableDoubleArrowRight: PropTypes.bool,
  disableSingleArrowRight: PropTypes.bool,
  disableSingleArrowLeft: PropTypes.bool,
  disableDoubleArrowLeft: PropTypes.bool,
  borderThin: PropTypes.bool,
  hideBorderRight: PropTypes.bool,
  hideBorderLeft: PropTypes.bool,
};

export default PickerController;
