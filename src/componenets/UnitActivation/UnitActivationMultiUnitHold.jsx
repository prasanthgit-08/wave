import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UnitActivationFooter from "./UnitActivationFooter";
import UnitActivationHeader from "./UnitActivationHeader";
import {
  setLoader,
  setSaveDisable,
  setUnitNumber,
  updateHoldArrayList,
  setHoldArrayIndex,
  setReason,
  setAuthorizedBy,
  setNotes,
  resetSaveList,
  setDelay,
  setNewDelayNavigation,
} from "../../redux/UnitActivationSlice";
import UnitActivationService from "../../services/UnitActivationService";
import WarningModalPopUp from "../common/WarningModalPopUp";
import toast from "react-hot-toast";
import DeleteComponent from "../common/DeleteComponent";

function UnitActivationShuttleDelay(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    browseType,
    reason,
    authorizedBy,
    notes,
    unitNumber,
    holdArrayList,
    holdArrayIndex,
    postArrayList,
  } = useSelector((state) => state.unitActivationReducer);
  const dispatchDelayArrayList = useSelector((state) => state.unitActivationReducer.dispatchDelayArrayList);

  const [modalPopup, setModalPopUp] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveMessage, setSaveMessage] = useState("Data Successfully saved.");
  const [holdCount, setHoldCount] = useState(0);
  const [noHoldCount, setNoHoldCount] = useState(0);
  const [show, setShow] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [saveFailedList, setSaveFailedList] = useState([]);
  const [deactivationCount, setDeactivationCount] = useState(0);
  const sessionId = localStorage.getItem("sessionId") || null;

  const noHoldHandler = () => {
    dispatch(
      updateHoldArrayList({
        key: "noHold",
        index: holdArrayIndex,
      })
    );
    setNoHoldCount(noHoldCount + 1);
    dispatch(setReason(""));
    dispatch(setAuthorizedBy(""));
    dispatch(setNotes(""));
    toast.success("No Hold Saved");
    if (holdArrayIndex === holdArrayList?.length - 1) {
      dispatch(setLoader(true));
      setSaveData(true);
    } else {
      dispatch(setHoldArrayIndex(holdArrayIndex + 1));
    }
  };

  const handleFurtherNavigation = () => {
    if (postArrayList.length > 0) {
      navigate("/unit-activation-multi-unit-sister-browse");
    } else if (dispatchDelayArrayList?.length > 0) {
      dispatch(setDelay("dispatch"));
      dispatch(
        setNewDelayNavigation({
          from: "delayDispatchMulti",
          navigateTo: "/unit-activation-selections",
        })
      );
      navigate(
        `/delay-processing/new-delayed-unit-confirmation/${dispatchDelayArrayList?.[0]?.company}/${
          dispatchDelayArrayList?.[0]?.unitPK
        }/${dispatchDelayArrayList?.[0]?.driverFK || 0}`
      );
    } else {
      dispatch(
        resetSaveList({
          key: "all",
        })
      );
      navigate("/unit-activation-selections");
    }
  };

  const saveHandler = () => {
    if (holdArrayList?.length > 0) {
      if (holdArrayIndex === holdArrayList?.length - 1) {
        dispatch(setLoader(true));
        setSaveData(true);
      } else {
        dispatch(setHoldArrayIndex(holdArrayIndex + 1));
        dispatch(setReason(""));
        dispatch(setAuthorizedBy(""));
        dispatch(setNotes(""));
        toast.success("Hold Saved");
        navigate("/unit-activation-multi-unit-hold");
      }
    } else {
      handleFurtherNavigation();
    }
  };
  const saveUnitOnHold = () => {
    const payload = { UnitActivationVO: holdArrayList, SessionID: sessionId, isMultibrowse: true };

    UnitActivationService.saveUnitActivation(payload)
      .then((response) => {
        dispatch(setLoader(false));
        dispatch(
          resetSaveList({
            key: "hold",
          })
        );
        if (response.data) {
          const data = response.data?.unitActivationSave?.[0];
          setHoldCount(data.holdCount);
          setDeactivationCount(data.deActivationAddCount);
          setSaveFailedList(
            response?.data?.unsavedList?.map((item) => `${item?.UnitNumber} - ${item?.failedUnits}`) || []
          );
          if (
            Number(data.holdCount) > 0 ||
            Number(noHoldCount) > 0 ||
            response.data?.unsavedList?.length > 0
          ) {
            handleShow();
          }
        }
        dispatch(setHoldArrayIndex(0));
        dispatch(setReason(""));
        dispatch(setAuthorizedBy(""));
        dispatch(setNotes(""));
        dispatch(setUnitNumber(""));
      })
      .catch((err) => {
        dispatch(setLoader(false));
        if (err.response) {
          if (err?.response?.data?.dataObj) {
            setHoldCount(err?.response?.data?.dataObj?.holdCount);
            setSaveFailedList(err?.response?.data?.dataObj?.saveFailed);
            if (
              Number(err?.response?.data?.dataObj?.holdCount) > 0 ||
              Number(noHoldCount) > 0 ||
              err?.response?.data?.dataObj?.saveFailed?.length > 0
            ) {
              handleShow();
            }
            dispatch(setHoldArrayIndex(0));
            dispatch(setReason(""));
            dispatch(setAuthorizedBy(""));
            dispatch(setNotes(""));
            dispatch(setUnitNumber(""));
          } else {
            // The request was made and the server responded with a status code
            setSaveError(true);
            setErrorMessage(err?.response?.data?.errorMsg || "Sorry, something went wrong.Please try again.");
            setModalPopUp(true);
          }
        } else if (err.request) {
          // The request was made but no response was received
          setSaveError(true);
          setErrorMessage("Sorry, it's unable to establish a connection to the remote service.");
          setModalPopUp(true);
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(err?.response?.data?.errorMsg || "Sorry, something went wrong.Please try again.");
        }
        setSaveError(true);
      });
  };
  /**
   * Used for popup message-multibrowse screen
   */
  const handleShow = () => setShow(true);
  const ShowMessage = () => {
    handleFurtherNavigation();
    setShow(false);
  };
  /**
   * Calls warning popup model
   * to show the status of operations
   **/
  const warningPopupModalHide = () => {
    if (saveError === true) {
      dispatch(setLoader(false));
      setSaveError(false);
      setErrorMessage("");
      setModalPopUp(false);
    } else {
      setModalPopUp(false);
      navigate("/unit-activation-single-selection");
    }
  };

  useEffect(() => {
    if (saveData) {
      saveUnitOnHold();
    }
  }, [saveData]);

  useEffect(() => {
    if (reason !== "" && authorizedBy !== "" && notes !== "") {
      dispatch(setSaveDisable(false));
    } else {
      dispatch(setSaveDisable(true));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reason, authorizedBy, notes]);

  /**
   * Used for setting  unitNumber
   */
  useEffect(() => {
    if (browseType === "BrowseUnits") {
      if (holdArrayList?.length > 0 && holdArrayIndex < holdArrayList?.length) {
        dispatch(setUnitNumber(holdArrayList[holdArrayIndex]?.unitNumber));
      }
    }
  }, [browseType, holdArrayIndex, holdArrayList]);

  useEffect(() => {
    if (
      holdArrayList?.length > 0 &&
      holdArrayIndex < holdArrayList?.length &&
      reason !== "" &&
      authorizedBy !== ""
    ) {
      dispatch(
        updateHoldArrayList({
          key: "save",
          index: holdArrayIndex,
          reason: reason,
          authorizedBy: authorizedBy,
          notes: notes,
        })
      );
    }
  }, [holdArrayIndex, reason, authorizedBy, notes]);

  useEffect(() => {
    if (browseType === "") {
      navigate("/unit-activation-selections");
    }
  }, []);

  return (
    <div className="customContainer">
      <div
        className="add-form-component halfScreenWidth border border-dark border-2"
        style={{ margin: "1px" }}
      >
        <UnitActivationHeader noHoldButton={true} holdHandler={noHoldHandler} />
        <div className="p-2">
          <div className="shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="p-15 mb-3">
              <Col xs={6} className="ps-4">
                <Form.Group className=" mb-1 align-items-center d-flex mt-5 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Unit Number
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5">
                    <input
                      className={"customFormControl"}
                      type="text"
                      value={unitNumber}
                      autoComplete="off"
                      aria-autocomplete="list"
                      disabled
                    />
                  </div>
                </Form.Group>
                <Form.Group className="  mb-1 align-items-center d-flex mt-4 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="reason" className="col-form-label dealer-label">
                      Reason for Hold
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-6">
                    <input
                      className={` customFormControl ${reason === "" ? "borderRed" : "borderGreen"}`}
                      type="text"
                      id="reason"
                      name="reason"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={40}
                      value={reason}
                      onChange={(e) => {
                        dispatch(setReason(e.target.value));
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 mb-1 align-items-center d-flex  m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="authorizedBy" className="col-form-label dealer-label">
                      Authorized By
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-5">
                    <input
                      className={` customFormControl ${authorizedBy === "" ? "borderRed" : "borderGreen"}`}
                      type="text"
                      id="authorizedBy"
                      name="authorizedBy"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={authorizedBy}
                      onChange={(e) => {
                        dispatch(setAuthorizedBy(e.target.value));
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="  mb-1 align-items-top d-flex mt-4 m-l-0 m-r-0">
                  <Col xs={3} className="p-0 ">
                    <Form.Label htmlFor="notes" className="col-form-label dealer-label">
                      Notes
                    </Form.Label>
                  </Col>

                  <div className="p-0 col-10 mt-2 d-block h-100">
                    <textarea
                      className={`customFormControl customFocusClass w-100 d-block h-100px ${notes === "" ? "borderRed" : "borderGreen"}`}
                      type="text"
                      id="notes"
                      name="notes"
                      maxLength={65535}
                      value={notes}
                      onChange={(e) => {
                        dispatch(setNotes(e.target.value));
                      }}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
        <UnitActivationFooter saveButton={true} saveHandler={saveHandler} />
        <WarningModalPopUp
          show={modalPopup}
          onHide={warningPopupModalHide}
          title={saveError === true ? "Error" : "Success"}
          body={saveError === true ? errorMessage : saveMessage}
          handleOK={warningPopupModalHide}
          showOK={true}
          color={saveError === true ? "red" : "black"}
        />
        <DeleteComponent
          show={show}
          onHide={ShowMessage}
          title={"Multibrowse Hold Save"}
          body={
            <table style={{ borderCollapse: "collapse", width: "50%" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "5px" }}>Unit on Hold: </td>
                  <td style={{ padding: "5px", color: "green" }}>{holdCount}</td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>No Hold: </td>
                  <td style={{ padding: "5px", color: "green" }}>{noHoldCount}</td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Unit Deactivated: </td>
                  <td style={{ padding: "5px", color: "green" }}>{deactivationCount}</td>
                </tr>
                <tr>
                  <td style={{ padding: "5px" }}>Save Failed: </td>
                  <td style={{ padding: "5px", color: "red" }} colSpan={2}>
                    {saveFailedList?.join(", ") || "None"}
                  </td>
                </tr>
              </tbody>
            </table>
          }
          handleOK={ShowMessage}
        />
      </div>
    </div>
  );
}

export default UnitActivationShuttleDelay;
