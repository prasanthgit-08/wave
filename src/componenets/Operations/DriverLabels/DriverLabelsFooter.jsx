import React, { useState } from "react";
import ModalComponent from "../../common/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setIsThankYouCard,
  setLabelBy,
  setShowAnniversary,
  setShowDeleased,
  setShowDivison,
  setShowName,
  setShowStatus,
  setStatus,
} from "../../../redux/DriverLabelsSlice";
import DriverLabelsService from "../../../services/DriverLabelsService";
import toast from "react-hot-toast";

const DriverLabelsFooter = () => {
  const dispatch = useDispatch();

  const [showCancelModal, setshowCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    labelBy,
    status,
    division,
    showStatus,
    showDivison,
    showDeleased,
    showName,
    showAnniversary,
    isThankYouCard,
    startDay,
    endDay,
    startFirstName,
    endFirstName,
    startLastName,
    endLastName,
    lastDispatch,
    maximumAge,
    isLastDateValid,
  } = useSelector((state) => state.driverLabelsSlice);

  const isValidDate = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/; // MM/DD with day > 00
    return regex.test(value);
  };
  const isNameValid =
    ((startFirstName?.trim() && endFirstName?.trim()) ||
      (!startFirstName?.trim() && !endFirstName?.trim())) &&
    ((startLastName?.trim() && endLastName?.trim()) || (!startLastName?.trim() && !endLastName?.trim())) &&
    ((startFirstName?.trim() && endFirstName?.trim()) || (startLastName?.trim() && endLastName?.trim()));

  const handleProcessing = (type) => {
    setLoading(true);
    DriverLabelsService.processRequest(
      labelBy,
      status,
      division,
      startDay,
      endDay,
      startFirstName,
      endFirstName,
      startLastName,
      endLastName,
      lastDispatch,
      maximumAge,
      type
    )
      .then(({ data }) => {
        setLoading(false);
        dispatch(reset());
        dispatch(setLabelBy("status"));
        if (data?.errorCode == 1) {
          toast.error(data?.errorMessage || "Error occured.");
        } else {
          type === "excel" && toast.success("Email sent sucessful.");
          type === "print" && toast.success("Print sucessful.");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Error occured!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBack = () => {
    if (isThankYouCard) {
      dispatch(setIsThankYouCard(false));
    } else if (showAnniversary) {
      dispatch(setShowAnniversary(false));
    } else if (showName) {
      dispatch(setShowName(false));
    } else if (showDeleased) {
      dispatch(setShowDeleased(false));
    } else if (showDivison) {
      dispatch(setShowDivison(false));
    } else if (showStatus) {
      dispatch(setShowStatus(false));
    }
  };
  const handleCancelNo = () => {
    setshowCancelModal(false);
  };
  const handleCancelYes = () => {
    dispatch(reset());
    dispatch(setLabelBy("status"));
    setshowCancelModal(false);
  };

  const handleNext = () => {
    if (showStatus) {
      if (status === "deleased") {
        dispatch(setShowDeleased(true));
      } else {
        dispatch(setShowDivison(true));
      }
    } else {
      if (labelBy === "status") {
        dispatch(setStatus("active"));
        dispatch(setShowStatus(true));
      } else if (labelBy === "name") {
        dispatch(setStatus("both"));
        dispatch(setShowName(true));
      } else if (labelBy === "anniversary" || labelBy === "birthday") {
        dispatch(setShowAnniversary(true));
      } else if (labelBy === "thankyouCard") {
        dispatch(setIsThankYouCard(true));
      }
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap m-r-10"></div>
      <div className="d-flex align-items-center flex-wrap">
        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => handleProcessing("excel")}
          hidden={!(showDivison || showDeleased || showName || showAnniversary || isThankYouCard)}
          disabled={
            !(
              isNameValid ||
              (maximumAge && maximumAge > 0 && isLastDateValid) ||
              (lastDispatch && isLastDateValid) ||
              (isValidDate(startDay) && isValidDate(endDay)) ||
              showDivison ||
              isThankYouCard
            )
          }
        >
          Excel
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            handleProcessing("print");
          }}
          hidden={!(showDivison || showDeleased || showName || showAnniversary || isThankYouCard)}
          disabled={
            !(
              isNameValid ||
              (maximumAge && maximumAge > 0 && isLastDateValid) ||
              (lastDispatch && isLastDateValid) ||
              (isValidDate(startDay) && isValidDate(endDay)) ||
              showDivison ||
              isThankYouCard
            )
          }
        >
          Print
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleNext}
          hidden={showDivison || showDeleased || showName || showAnniversary || isThankYouCard}
        >
          Next
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={handleBack}
          hidden={
            !(showDivison || showDeleased || showName || showAnniversary || isThankYouCard || showStatus)
          }
        >
          Back
        </button>

        <button
          className={`btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5`}
          type="button"
          onClick={() => {
            setshowCancelModal(true);
          }}
          hidden={
            !(showDivison || showDeleased || showName || showAnniversary || isThankYouCard || showStatus)
          }
        >
          Cancel
        </button>
      </div>
      {loading && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}
      <ModalComponent
        show={showCancelModal}
        onHide={handleCancelNo}
        title={"Cancel Driver Labels"}
        body="Please confirm you want to cancel your changes."
        handleYES={handleCancelYes}
        handleNO={handleCancelNo}
      />
    </div>
  );
};

export default DriverLabelsFooter;
