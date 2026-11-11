import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import QuarterScreenWrapper from "../../../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../../../common/Header";
import { Col, Form } from "react-bootstrap";
import CustomRadioGroup from "../../../../../../common/CustomRadioGroup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisableSave,
  setHasChanges,
  setRefundData,
  setReleaseReserveFormData,
} from "../../../../../../../redux/ReleaseReserveSlice";
import DeleteComponent from "../../../../../../common/DeleteComponent";
import { PermissionKeyGeneratorUtil } from "../../../../../../../utils/PermissionKeyGeneratorUtil";
import ReleaseReserveService from "../../../../../../../services/ReleaseReserveService";

const ReleaseReserve = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const { driverId } = useParams();
  const [description, setDescription] = useState("");
  const [usedFor, setUsedFor] = useState("");
  const [accumulatedReserve, setAccumulatedReserve] = useState("");
  const [accumulatedBond, setAccumulatedBond] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundTo, setRefundTo] = useState("debitCard");
  const [reason, setReason] = useState("");
  const [refundError, setRefundError] = useState("");
  const [isRefundValid, setIsRefundValid] = useState(true);
  const [hasDebitCardValid, setHasDebitCardValid] = useState(true);
  const [checkIsPermitted, setCheckIsPermitted] = useState(true);
  const [driverReservePK, setDriverReservePK] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [textBorderFlag, setTextBorderFlag] = useState(false);
  const [modalCloseHandler, setModalCloseHandler] = useState(() => () => {});
  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const editPermission = PermissionKeyGeneratorUtil("RELEASERESERVE", "PTCK");
  const refundData = useSelector((state) => state.releaseReserve.refundData);
  const showPopup = (title, body, onClose) => {
    setModalTitle(title);
    setModalBody(body);
    setModalCloseHandler(() => () => {
      onClose?.();
      setShowModal(false);
    });
    setShowModal(true);
  };

  /*****
   * Handle the show if
   * Current Amount or Sum of Accumulated Bond & Accumulated
   * Reserve is less than or equal to 0 ****/
  const handleShow = () => {
    showPopup(
      "Warning: Cannot release Driver Reserve",
      "Current Amount or Sum of Accumulated Bond & Accumulated Reserve is less than or equal to 0",
      () => {
        navigate(`/driver-service-selection/${driverId}/form`);
      }
    );
  };

  /*****
   * Handle the show if
   * both Debit and check is disabled
   * Reserve is less than or equal to 0 ****/
  const handleShowForDebit = () => {
    showPopup(
      "Warning: Cannot release Driver Reserve",
      "The driver is not configured for a Debit and Check",
      () => {
        navigate(`/driver-service-selection/${driverId}/form`);
      }
    );
  };

  /*****
   * Handle the show if
   * No optional driver reserve funds are available
   * ***/
  const handleShowForNoRefund = () => {
    showPopup(
      "Warning: Cannot release Driver Reserve",
      "The driver is not configured for a Release Reserve",
      () => {
        navigate(`/driver-service-selection/${driverId}/form`);
      }
    );
  };

  /*****
   * Get the Release
   * Reserve Data
   *****/
  useEffect(() => {
    if (driverId) {
      setLoader(true);
      ReleaseReserveService.fetchReleaseReserveDetails(driverId)
        .then((response) => {
          const { data } = response;
          const releaseReserveData = data[0];
          if (!releaseReserveData) {
            handleShowForNoRefund(); // Show popup if no data
          } else {
            dispatch(setRefundData(releaseReserveData)); // Always set data in background
            const bond = releaseReserveData.AccumulatedBond || 0;
            const reserve = releaseReserveData.AccumulatedReserve || 0;
            const currentAmount = releaseReserveData.CurrentAmount || 0;
            if (bond + reserve <= 0 || currentAmount <= 0) {
              handleShow(); // Show warning popup
            }
          }
          setLoader(false);
        })
        .catch((err) => {
          navigate(`/driver-service-selection/${driverId}/form`);
          setLoader(false);
        });
    }
  }, [driverId]);

  /*****Handle the popup for debit ***/
  useEffect(() => {
    if (refundData && !refundData.DebitCard && checkIsPermitted === false) {
      handleShowForDebit();
    }
  }, [refundData, checkIsPermitted]);

  useEffect(() => {
    if (!refundData) {
      dispatch(setHasChanges(false));
      return;
    }

    const originalRefundTo = refundData.DebitCard ? "debitCard" : "check";

    const changed = (refundAmount || "") !== "" || (reason || "") !== "" || refundTo !== originalRefundTo;

    dispatch(setHasChanges(changed));
  }, [refundAmount, reason, refundTo, refundData]);

  /*******
   * Used to make the border color default for the
   * required fields of any of the POP Up Conditions appear
   * *****/
  useEffect(() => {
    if (
      refundData === null ||
      (refundData && !refundData.DebitCard && checkIsPermitted === false) ||
      accumulatedBond + accumulatedReserve <= 0 ||
      currentAmount <= 0
    ) {
      setTextBorderFlag(true);
    } else {
      setTextBorderFlag(false);
    }
  }, [refundData, checkIsPermitted, accumulatedBond, accumulatedReserve, currentAmount]);

  /******
   * Populate the data in the corresponding fields
   * ******/
  useEffect(() => {
    if (refundData !== null) {
      setDescription(refundData?.Description ? refundData.Description : "");
      setUsedFor(refundData?.UsedFor ? refundData.UsedFor : "");
      setAccumulatedBond(refundData?.AccumulatedBond ? refundData?.AccumulatedBond : "");
      setAccumulatedReserve(refundData?.AccumulatedReserve ? refundData?.AccumulatedReserve : "");
      setCurrentAmount(refundData?.CurrentAmount ? refundData?.CurrentAmount : "");
      setHasDebitCardValid(refundData?.DebitCard);
      setDriverReservePK(refundData?.DriverReservePK ? refundData?.DriverReservePK : null);
    }
  }, [refundData]);

  /***
   * Number validation for Amount field
   * ***/
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");
    if (value) return number;
  };

  /******
   * Sum of (Accumulated Bond + Accumulated Reserve)
   * Or Current Amount and
   * determine the refund amount
   * *****/
  const getMaxRefundable = () => {
    const bond = Number(accumulatedBond) || 0;
    const reserve = Number(accumulatedReserve) || 0;
    const current = Number(currentAmount) || 0;
    return Math.min(current, bond + reserve);
  };

  /****
   * Creation of Driver Bond Fund Object
   *****/
  useEffect(() => {
    dispatch(
      setReleaseReserveFormData({
        driverFKInt: driverId,
        accumulatedBond: accumulatedBond,
        debitCard: refundTo === "debitCard",
        check: refundTo === "check",
        refundAmount: refundAmount,
        reason: reason,
      })
    );
  }, [driverId, accumulatedBond, refundTo, refundAmount, reason]);

  /*****
   * Save Validation
   *****/
  useEffect(() => {
    if (refundAmount && parseFloat(refundAmount) > 0 && isRefundValid && reason) {
      /**enable save if all conditions**/
      dispatch(setDisableSave(false));
    } else {
      /***disable save***/
      dispatch(setDisableSave(true));
    }
  }, [refundAmount, reason, isRefundValid]);

  useEffect(() => {
    if (deniedPermissions) {
      setCheckIsPermitted(!deniedPermissions.includes(editPermission));
    }
  }, [deniedPermissions, editPermission]);

  /****
   * Set the default value to Check if
   * debit card is not permitted
   * ****/
  useEffect(() => {
    if (!hasDebitCardValid && checkIsPermitted) {
      setRefundTo("check");
    }
  }, [hasDebitCardValid, checkIsPermitted]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          {loader && (
            <div className="fade modal-backdrop show">
              <div className="pos-center">
                <div className="loader"></div>
              </div>
            </div>
          )}
          <div className="p-5 w-100 mt-0 m-l-10">
            <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Description
                </Form.Label>
              </Col>

              <Col xs={4} md={4} className="p-0 me-2">
                <input
                  className={"customFormControl"}
                  name={description}
                  type="text"
                  id="alternateForm"
                  value={description}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Used For
                </Form.Label>
              </Col>

              <Col xs={4} md={4} className="p-0 me-2">
                <input
                  className={"customFormControl"}
                  name={usedFor}
                  type="text"
                  id="alternateForm"
                  value={usedFor}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Accumulated Bond
                </Form.Label>
              </Col>

              <Col xs={1} md={1} className="p-0 me-2">
                <input
                  className={"customFormControl"}
                  name={accumulatedBond}
                  type="text"
                  id="alternateForm"
                  value={accumulatedBond}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Accumulated Reserve
                </Form.Label>
              </Col>

              <Col xs={1} md={1} className="p-0 me-2">
                <input
                  className={"customFormControl"}
                  name={accumulatedReserve}
                  type="text"
                  id="alternateForm"
                  value={accumulatedReserve}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Current Amount
                </Form.Label>
              </Col>

              <Col xs={1} md={1} className="p-0 me-2">
                <input
                  className={"customFormControl"}
                  name={currentAmount}
                  type="text"
                  id="alternateForm"
                  value={currentAmount}
                  disabled={true}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-1 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Refund Amount
                </Form.Label>
              </Col>

              <Col xs={1} md={1} className="p-0 me-2">
                <input
                  className={`customFormControl ${
                    !textBorderFlag ? (!refundAmount || !isRefundValid ? "borderRed" : "borderGreen") : ""
                  }`}
                  name="refundAmount"
                  type="text"
                  id="refundAmount"
                  value={refundAmount}
                  autoComplete="off"
                  aria-autocomplete="list"
                  onChange={(e) => {
                    const val = e.target.value;
                    /***Allow only valid decimal input***/
                    if (!val.match(/^\d{0,5}(\.\d{0,2})?$/)) return;
                    const numericValue = parseFloat(val);
                    const maxRefundable = getMaxRefundable();
                    /***Check if the value is invalid***/
                    const isInvalid =
                      !val || numericValue === 0 || val === "." || numericValue > maxRefundable;
                    setIsRefundValid(!isInvalid);
                    setRefundAmount(val);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Refund To</Form.Label>
              </Col>

              <Col sm={8} md={8} xs={8} className="p-0 m-l-0">
                <CustomRadioGroup
                  name="refundTo"
                  horizontal
                  horizontalAlignmentClassName="pe-3"
                  selectedOption={refundTo}
                  onChange={(value) => {
                    setRefundTo(value);
                  }}
                  options={[
                    { value: "debitCard", label: "Debit Card", width: "100px", disabled: !hasDebitCardValid },
                    { value: "check", label: "Check", disabled: !checkIsPermitted },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-1 m-b-10 row align-items-start m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0 d-flex align-items-start">
                <Form.Label htmlFor="name" className="dealer-label mb-0">
                  Reason
                </Form.Label>
              </Col>

              <Col xs={8} md={8} className="p-0 me-2">
                <textarea
                  id="reason"
                  rows={6}
                  cols={6}
                  name="reason"
                  type="text"
                  autoComplete="newpassword"
                  aria-autocomplete="none"
                  value={reason}
                  className={`customFormControl h-100 w-100 customFocusClass ${
                    !textBorderFlag ? (reason && reason.length >= 1 ? "borderGreen" : "borderRed") : ""
                  } `}
                  onChange={(e) => {
                    setReason(e.target.value.replace(/^\s+/, ""));
                  }}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>
      <DeleteComponent
        show={showModal}
        onHide={modalCloseHandler}
        title={<span style={{ color: "red" }}>{modalTitle}</span>}
        body={<span style={{ color: "red" }}>{modalBody}</span>}
        handleOK={modalCloseHandler}
      />
    </div>
  );
};

export default ReleaseReserve;
