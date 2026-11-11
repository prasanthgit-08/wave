/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CustomDropzone from "../../../common/CustomDropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyName,
  setInactiveDropzone,
  setIsCurrentUnitValid,
  setScanPaperworkDisableSave,
  setScanPaperworkSaveList,
} from "../../../../redux/Invoicing/PaperworkProcessingSlice";
import CustomDropzoneDisabled from "../../../common/CustomDropzoneDisabled";
import PaperworkProcessingService from "../../../../services/Invoicing/PaperworkProcessingService";
import DWTComponent from "../../../../modules/dwt";
import LoadingIcon from "../../../common/LoadingIcon";

const ScanPaperworkContent = () => {
  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState("");
  const [buttonsFlagResponse, setButtonsFlagResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isCustomerUploadActive, setIsCustomerUploadActive] = useState(false);
  const [isCompanyUploadActive, setIsCompanyUploadActive] = useState(false);
  const [isBolUploadActive, setIsBolUploadActive] = useState(false);
  const [isDafUploadActive, setIsDafUploadActive] = useState(false);
  const [isIftaUploadActive, setIsIftaUploadActive] = useState(false);
  const [isBreakdownUploadActive, setIsBreakdownUploadActive] = useState(false);

  const [isCustomerScanActive, setIsCustomerScanActive] = useState(false);
  const [isCompanyScanActive, setIsCompanyScanActive] = useState(false);
  const [isBolScanActive, setIsBolScanActive] = useState(false);
  const [isDafScanActive, setIsDafScanActive] = useState(false);
  const [isIftaScanActive, setIsIftaScanActive] = useState(false);
  const [isBreakdownScanActive, setIsBreakdownScanActive] = useState(false);

  const selectedUnit = useSelector((state) => state.paperworkProcessing.selectedUnit);
  const unitPK = useSelector((state) => state.paperworkProcessing.unitPK);
  const multiUnitSeperateInvoice = useSelector((state) => state.paperworkProcessing.multiUnitSeperateInvoice);
  const selectedUnitsList = useSelector((state) => state.paperworkProcessing.selectedUnitsList);
  const selectedUnitsListIndex = useSelector((state) => state.paperworkProcessing.selectedUnitsListIndex);
  const scanPaperworkSaveList = useSelector((state) => state.paperworkProcessing.scanPaperworkSaveList);
  const isDelayedUnit = useSelector((state) => state.paperworkProcessing.isDelayedUnit);
  const inactiveDropzone = useSelector((state) => state.paperworkProcessing.inactiveDropzone);
  const isCurrentUnitValid = useSelector((state) => state.paperworkProcessing.isCurrentUnitValid);

  const customerUploadFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.customerUploadFiles;
  const companyUploadFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.companyUploadFiles;
  const bolUploadFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.bolUploadFiles;
  const dafUploadFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.dafUploadFiles;
  const iftaUploadFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.iftaUploadFiles;
  const breakdownUploadFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.breakdownUploadFiles;

  const customerScanFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.customerScanFiles;
  const companyScanFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.companyScanFiles;
  const bolScanFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.bolScanFiles;
  const dafScanFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.dafScanFiles;
  const iftaScanFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.iftaScanFiles;
  const breakdownScanFiles = scanPaperworkSaveList[selectedUnitsListIndex]?.breakdownScanFiles;

  const isButtonsLoopingCompleted =
    scanPaperworkSaveList[selectedUnitsListIndex]?.isButtonsLoopingCompleted || false;
  const isCustomerPaperworkRequired =
    scanPaperworkSaveList[selectedUnitsListIndex]?.isCustomerPaperworkRequired || false;
  const isCompanyPaperworkRequired =
    scanPaperworkSaveList[selectedUnitsListIndex]?.isCompanyPaperworkRequired || false;
  const isBolRequired = scanPaperworkSaveList[selectedUnitsListIndex]?.isBolRequired || false;
  const isDafRequired = scanPaperworkSaveList[selectedUnitsListIndex]?.isDafRequired || false;
  const isIftaRequired = scanPaperworkSaveList[selectedUnitsListIndex]?.isIftaRequired || false;
  const isBreakdownRequired = scanPaperworkSaveList[selectedUnitsListIndex]?.isBreakdownRequired || false;
  const companyFK = useSelector((state) => state.paperworkProcessing.companyFK);
  const companyName = useSelector((state) => state.paperworkProcessing.companyName);

  const setIsButtonsLoopingCompleted = (value) => {
    dispatch(
      setScanPaperworkSaveList({
        actionType: "update",
        payload: {
          index: selectedUnitsListIndex,
          element: {
            isButtonsLoopingCompleted: value,
          },
        },
      })
    );
  };

  const initializeButtonStates = (response) => {
    if (response?.customerPaperworkFlag) {
      setActiveButton("customerPaperwork");
    } else if (response?.companyPaperworkFlag) {
      setActiveButton("companyPaperwork");
    } else if (response?.bolFlag) {
      setActiveButton("bol");
    } else if (response?.dafFlag) {
      setActiveButton("daf");
    } else if (response?.iftaFlag) {
      setActiveButton("ifta");
    } else if (isDelayedUnit) {
      setActiveButton("breakdown");
    }

    scanPaperworkSaveList?.forEach((element, index) => {
      dispatch(
        setScanPaperworkSaveList({
          actionType: "update",
          payload: {
            index: index,
            element: {
              isCustomerPaperworkRequired: response?.customerPaperworkFlag || false,
              isCompanyPaperworkRequired: response?.companyPaperworkFlag || false,
              isBolRequired: response?.bolFlag || false,
              isDafRequired: response?.dafFlag || false,
              isIftaRequired: response?.iftaFlag || false,
              isBreakdownRequired: isDelayedUnit || false,
            },
          },
        })
      );
    });
  };

  // Fetch required buttons from API call
  useEffect(() => {
    const getButtonFlags = () => {
      setLoading(true);
      PaperworkProcessingService.getButtonFlags(unitPK, companyName, companyFK)
        .then((response) => {
          const { data } = response;
          setButtonsFlagResponse(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    };

    if (selectedUnit) {
      getButtonFlags();
    }
  }, []);

  // Initialize button states for the current unit
  useEffect(() => {
    if (buttonsFlagResponse) {
      if (!isButtonsLoopingCompleted) {
        initializeButtonStates(buttonsFlagResponse);
      }
    }
  }, [buttonsFlagResponse, selectedUnitsListIndex]);

  // For rendering a disabled dropzone when Upload/Scan is inactive
  useEffect(() => {
    if (
      isCustomerUploadActive ||
      isCompanyUploadActive ||
      isBolUploadActive ||
      isDafUploadActive ||
      isIftaUploadActive ||
      isBreakdownUploadActive ||
      isCustomerScanActive ||
      isCompanyScanActive ||
      isBolScanActive ||
      isDafScanActive ||
      isIftaScanActive ||
      isBreakdownScanActive
    ) {
      dispatch(setInactiveDropzone(false));
    } else {
      dispatch(setInactiveDropzone(true));
    }
  }, [
    isCustomerUploadActive,
    isCompanyUploadActive,
    isBolUploadActive,
    isDafUploadActive,
    isIftaUploadActive,
    isBreakdownUploadActive,
    isCustomerScanActive,
    isCompanyScanActive,
    isBolScanActive,
    isDafScanActive,
    isIftaScanActive,
    isBreakdownScanActive,
  ]);

  // Scan Paperwork Next_Unit/Save Validation
  useEffect(() => {
    if (
      (!isCustomerPaperworkRequired || customerUploadFiles?.length > 0 || customerScanFiles?.length > 0) &&
      (!isCompanyPaperworkRequired ||
        (isCustomerPaperworkRequired && (customerUploadFiles?.length > 0 || customerScanFiles?.length > 0)) ||
        companyUploadFiles?.length > 0 ||
        companyScanFiles?.length > 0) &&
      (!isBolRequired || bolUploadFiles?.length > 0 || bolScanFiles?.length > 0) &&
      (!isDafRequired || dafUploadFiles?.length > 0 || dafScanFiles?.length > 0) &&
      (!isIftaRequired || iftaUploadFiles?.length > 0 || iftaScanFiles?.length > 0) &&
      inactiveDropzone &&
      isButtonsLoopingCompleted
    ) {
      dispatch(setIsCurrentUnitValid(true));
    } else {
      dispatch(setIsCurrentUnitValid(false));
    }
  }, [
    isCustomerPaperworkRequired,
    isCompanyPaperworkRequired,
    isBolRequired,
    isDafRequired,
    isIftaRequired,
    isBreakdownRequired,
    customerUploadFiles,
    companyUploadFiles,
    bolUploadFiles,
    dafUploadFiles,
    iftaUploadFiles,
    breakdownUploadFiles,
    customerScanFiles,
    companyScanFiles,
    bolScanFiles,
    dafScanFiles,
    iftaScanFiles,
    breakdownScanFiles,
    inactiveDropzone,
    isButtonsLoopingCompleted,
  ]);

  /**
   * Scan Paperwork Save Button Validation
   */
  useEffect(() => {
    const isSaveValid = () => {
      const validateArrayList = (arrayList) => {
        return arrayList?.every(
          (element, index) =>
            (!element?.isCustomerPaperworkRequired ||
              element?.customerUploadFiles?.length > 0 ||
              element?.customerScanFiles?.length > 0) &&
            (!element?.isCompanyPaperworkRequired ||
              (element?.isCustomerPaperworkRequired &&
                (element?.customerUploadFiles?.length > 0 || element?.customerScanFiles?.length > 0)) ||
              element?.companyUploadFiles?.length > 0 ||
              element?.companyScanFiles?.length > 0) &&
            (!element?.isBolRequired ||
              element?.bolUploadFiles?.length > 0 ||
              element?.bolScanFiles?.length > 0) &&
            (!element?.isDafRequired ||
              element?.dafUploadFiles?.length > 0 ||
              element?.dafScanFiles?.length > 0) &&
            (!element?.isIftaRequired ||
              element?.iftaUploadFiles?.length > 0 ||
              element?.iftaScanFiles?.length > 0) &&
            element?.isButtonsLoopingCompleted
        );
      };

      if (multiUnitSeperateInvoice) {
        return validateArrayList(scanPaperworkSaveList);
      } else {
        return validateArrayList([scanPaperworkSaveList[0]]);
      }
    };

    dispatch(setScanPaperworkDisableSave(!isSaveValid() || !inactiveDropzone));
  }, [scanPaperworkSaveList, inactiveDropzone]);

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border p-2 halfScreenFormContentHeight">
        <Row className="mx-0 p-0 mt-2">
          <Col xs={10}>
            {multiUnitSeperateInvoice && (
              <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={1} className="p-0 me-5 w-110px">
                  <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                </Col>
                <Col xs={4} className="">
                  <input
                    name="unitNumber"
                    id="unitNumber"
                    type="text"
                    className={`customFormControl`}
                    value={selectedUnitsList[selectedUnitsListIndex]?.unitNumber}
                    disabled
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
            )}

            <Form.Group
              className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
            >
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Customer Paperwork</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isCustomerUploadActive
                        ? "btn-warning"
                        : activeButton === "customerPaperwork"
                          ? "btn-success"
                          : isCustomerPaperworkRequired
                            ? customerUploadFiles?.length || customerScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsCustomerUploadActive((state) => !state);

                    if (
                      activeButton === "customerPaperwork" &&
                      isCustomerPaperworkRequired &&
                      (customerUploadFiles?.length > 0 || customerScanFiles?.length > 0) &&
                      isCustomerUploadActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isCompanyPaperworkRequired) {
                        setActiveButton("companyPaperwork");
                      } else if (isBolRequired) {
                        setActiveButton("bol");
                      } else if (isDafRequired) {
                        setActiveButton("daf");
                      } else if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }
                    }
                    if (!isBreakdownRequired && !isIftaRequired && !isDafRequired && !isBolRequired) {
                      setActiveButton("");
                      setIsButtonsLoopingCompleted(true);
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "customerPaperwork") ||
                    !isCustomerPaperworkRequired ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>
              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isCustomerScanActive
                        ? "btn-warning"
                        : activeButton === "customerPaperwork"
                          ? "btn-success"
                          : isCustomerPaperworkRequired
                            ? customerUploadFiles?.length || customerScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsCustomerScanActive((state) => !state);

                    if (
                      activeButton === "customerPaperwork" &&
                      isCustomerPaperworkRequired &&
                      (customerUploadFiles?.length > 0 || customerScanFiles?.length > 0) &&
                      isCustomerScanActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isCompanyPaperworkRequired) {
                        setActiveButton("companyPaperwork");
                      } else if (isBolRequired) {
                        setActiveButton("bol");
                      } else if (isDafRequired) {
                        setActiveButton("daf");
                      } else if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }
                    }
                    if (!isBreakdownRequired && !isIftaRequired && !isDafRequired && !isBolRequired) {
                      setActiveButton("");
                      setIsButtonsLoopingCompleted(true);
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "customerPaperwork") ||
                    !isCustomerPaperworkRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group
              className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
            >
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Company Paperwork</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isCompanyUploadActive
                        ? "btn-warning"
                        : activeButton === "companyPaperwork"
                          ? "btn-success"
                          : isCompanyPaperworkRequired
                            ? companyUploadFiles?.length || companyScanFiles?.length
                              ? "btn-success"
                              : isCustomerPaperworkRequired
                                ? "btn-primary"
                                : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsCompanyUploadActive((state) => !state);

                    if (
                      activeButton === "companyPaperwork" &&
                      (isCustomerPaperworkRequired ||
                        (isCompanyPaperworkRequired &&
                          (companyUploadFiles?.length > 0 || companyScanFiles?.length > 0))) &&
                      isCompanyUploadActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isBolRequired) {
                        setActiveButton("bol");
                      } else if (isDafRequired) {
                        setActiveButton("daf");
                      } else if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }

                      if (!isBreakdownRequired && !isIftaRequired && !isDafRequired && !isBolRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "companyPaperwork") ||
                    !isCompanyPaperworkRequired ||
                    isCustomerUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>

              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isCompanyScanActive
                        ? "btn-warning"
                        : activeButton === "companyPaperwork"
                          ? "btn-success"
                          : isCompanyPaperworkRequired
                            ? companyUploadFiles?.length || companyScanFiles?.length
                              ? "btn-success"
                              : isCustomerPaperworkRequired
                                ? "btn-primary"
                                : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsCompanyScanActive((state) => !state);

                    if (
                      activeButton === "companyPaperwork" &&
                      (isCustomerPaperworkRequired ||
                        (isCompanyPaperworkRequired &&
                          (companyUploadFiles?.length > 0 || companyScanFiles?.length > 0))) &&
                      isCompanyScanActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isBolRequired) {
                        setActiveButton("bol");
                      } else if (isDafRequired) {
                        setActiveButton("daf");
                      } else if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }

                      if (!isBreakdownRequired && !isIftaRequired && !isDafRequired && !isBolRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "companyPaperwork") ||
                    !isCompanyPaperworkRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group
              className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
            >
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">BOL</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isBolUploadActive
                        ? "btn-warning"
                        : activeButton === "bol"
                          ? "btn-success"
                          : isBolRequired
                            ? bolUploadFiles?.length || bolScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsBolUploadActive((state) => !state);

                    if (
                      activeButton === "bol" &&
                      isBolRequired &&
                      (bolUploadFiles?.length > 0 || bolScanFiles?.length > 0) &&
                      isBolUploadActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isDafRequired) {
                        setActiveButton("daf");
                      } else if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }

                      if (!isBreakdownRequired && !isIftaRequired && !isDafRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "bol") ||
                    !isBolRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>

              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isBolScanActive
                        ? "btn-warning"
                        : activeButton === "bol"
                          ? "btn-success"
                          : isBolRequired
                            ? bolUploadFiles?.length || bolScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsBolScanActive((state) => !state);

                    if (
                      activeButton === "bol" &&
                      isBolRequired &&
                      (bolUploadFiles?.length > 0 || bolScanFiles?.length > 0) &&
                      isBolScanActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isDafRequired) {
                        setActiveButton("daf");
                      } else if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }

                      if (!isBreakdownRequired && !isIftaRequired && !isDafRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "bol") ||
                    !isBolRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group
              className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
            >
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">DAF</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isDafUploadActive
                        ? "btn-warning"
                        : activeButton === "daf"
                          ? "btn-success"
                          : isDafRequired
                            ? dafUploadFiles?.length || dafScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsDafUploadActive((state) => !state);

                    if (
                      activeButton === "daf" &&
                      isDafRequired &&
                      (dafUploadFiles?.length > 0 || dafScanFiles?.length > 0) &&
                      isDafUploadActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }

                      if (!isBreakdownRequired && !isIftaRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "daf") ||
                    !isDafRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>

              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isDafScanActive
                        ? "btn-warning"
                        : activeButton === "daf"
                          ? "btn-success"
                          : isDafRequired
                            ? dafUploadFiles?.length || dafScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsDafScanActive((state) => !state);

                    if (
                      activeButton === "daf" &&
                      isDafRequired &&
                      (dafUploadFiles?.length > 0 || dafScanFiles?.length > 0) &&
                      isDafScanActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isIftaRequired) {
                        setActiveButton("ifta");
                      } else if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }

                      if (!isBreakdownRequired && !isIftaRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "daf") ||
                    !isDafRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group
              className={`form-group align-items-center row m-l-0 m-r-0 ${multiUnitSeperateInvoice ? "mb-2" : "mb-3"}`}
            >
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">IFTA</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isIftaUploadActive
                        ? "btn-warning"
                        : activeButton === "ifta"
                          ? "btn-success"
                          : isIftaRequired
                            ? iftaUploadFiles?.length || iftaScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsIftaUploadActive((state) => !state);

                    if (
                      activeButton === "ifta" &&
                      isIftaRequired &&
                      (iftaUploadFiles?.length > 0 || iftaScanFiles?.length > 0) &&
                      isIftaUploadActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }
                      if (!isBreakdownRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "ifta") ||
                    !isIftaRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>

              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isIftaScanActive
                        ? "btn-warning"
                        : activeButton === "ifta"
                          ? "btn-success"
                          : isIftaRequired
                            ? iftaUploadFiles?.length || iftaScanFiles?.length
                              ? "btn-success"
                              : "btn-danger"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsIftaScanActive((state) => !state);

                    if (
                      activeButton === "ifta" &&
                      isIftaRequired &&
                      (iftaUploadFiles?.length > 0 || iftaScanFiles?.length > 0) &&
                      isIftaScanActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      if (isBreakdownRequired) {
                        setActiveButton("breakdown");
                      }
                      if (!isBreakdownRequired) {
                        setActiveButton("");
                        setIsButtonsLoopingCompleted(true);
                      }
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "ifta") ||
                    !isIftaRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-4">
              <Col xs={2} className="p-0">
                <Form.Label className="customColFormLabel">Breakdown</Form.Label>
              </Col>

              <Col xs={1} className="p-0 w-150px">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isBreakdownUploadActive
                        ? "btn-warning"
                        : activeButton === "breakdown"
                          ? "btn-success"
                          : isBreakdownRequired
                            ? breakdownUploadFiles?.length || breakdownScanFiles?.length
                              ? "btn-success"
                              : "btn-primary"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsBreakdownUploadActive((state) => !state);

                    if (
                      activeButton === "breakdown" &&
                      isBreakdownUploadActive &&
                      !isButtonsLoopingCompleted
                    ) {
                      setActiveButton("");
                      setIsButtonsLoopingCompleted(true);
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "breakdown") ||
                    !isBreakdownRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive ||
                    isBreakdownScanActive
                  }
                >
                  <i className="fa-solid fa-cloud-arrow-up me-1" />
                  Upload
                </button>
              </Col>

              <Col xs={2} className="p-0">
                <button
                  className={`btn customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5 
                    ${
                      isBreakdownScanActive
                        ? "btn-warning"
                        : activeButton === "breakdown"
                          ? "btn-success"
                          : isBreakdownRequired
                            ? breakdownUploadFiles?.length || breakdownScanFiles?.length
                              ? "btn-success"
                              : "btn-primary"
                            : "btn-secondary"
                    }`}
                  type="button"
                  onClick={() => {
                    setIsBreakdownScanActive((state) => !state);

                    if (activeButton === "breakdown" && isBreakdownScanActive && !isButtonsLoopingCompleted) {
                      setActiveButton("");
                      setIsButtonsLoopingCompleted(true);
                    }
                  }}
                  disabled={
                    (!isButtonsLoopingCompleted && activeButton !== "breakdown") ||
                    !isBreakdownRequired ||
                    isCustomerUploadActive ||
                    isCompanyUploadActive ||
                    isBolUploadActive ||
                    isDafUploadActive ||
                    isIftaUploadActive ||
                    isBreakdownUploadActive ||
                    isCustomerScanActive ||
                    isCompanyScanActive ||
                    isBolScanActive ||
                    isDafScanActive ||
                    isIftaScanActive
                  }
                >
                  <i class="fa-solid fa-expand me-2" />
                  Scan
                </button>
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-0">
              <Col xs={2} className="p-0" />
              <Col xs={10}>
                {/* Drag & Drop Component for Upload */}
                {isCustomerUploadActive && (
                  <CustomDropzone
                    files={customerUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "customerUploadFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      customerUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {/* Scan Component for scanning documents */}
                {isCustomerScanActive && (
                  <DWTComponent
                    files={customerScanFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "customerScanFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                  />
                )}

                {isCompanyUploadActive && (
                  <CustomDropzone
                    files={companyUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "companyUploadFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      companyUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isCompanyScanActive && (
                  <DWTComponent
                    files={companyScanFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "companyScanFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                  />
                )}

                {isBolUploadActive && (
                  <CustomDropzone
                    files={bolUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "bolUploadFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      bolUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isBolScanActive && (
                  <DWTComponent
                    files={bolScanFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "bolScanFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                  />
                )}

                {isDafUploadActive && (
                  <CustomDropzone
                    files={dafUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "dafUploadFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      dafUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isDafScanActive && (
                  <DWTComponent
                    files={dafScanFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "dafScanFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                  />
                )}

                {isIftaUploadActive && (
                  <CustomDropzone
                    files={iftaUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "iftaUploadFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      iftaUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isIftaScanActive && (
                  <DWTComponent
                    files={iftaScanFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "iftaScanFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                  />
                )}

                {isBreakdownUploadActive && (
                  <CustomDropzone
                    files={breakdownUploadFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "breakdownUploadFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                    fileType={"PDF"}
                    customDropzoneMessage={
                      breakdownUploadFiles?.length === 0
                        ? `Please Scan / Drag-Drop / Attach atleast one document`
                        : `Drag 'n' Drop PDF files / Attach from your computer`
                    }
                  />
                )}
                {isBreakdownScanActive && (
                  <DWTComponent
                    files={breakdownScanFiles}
                    setFiles={(files) =>
                      dispatch(
                        setScanPaperworkSaveList({
                          actionType: "breakdownScanFiles",
                          payload: {
                            index: selectedUnitsListIndex,
                            value: files,
                          },
                        })
                      )
                    }
                  />
                )}
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ScanPaperworkContent;
