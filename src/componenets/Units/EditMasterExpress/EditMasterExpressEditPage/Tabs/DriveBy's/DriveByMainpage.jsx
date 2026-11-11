import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import DynamicTextFields from "../../../../../common/AutoWrapTextFields/DynamicTextFields";
import DealerLookup from "../../../../../LookupScreens/Dealer/DealerLookup";
import DriveBysLookup from "../../../../../LookupScreens/DriveBys/DriveBysLookup";
import { setSelectedId } from "../../../../../../redux/LookupScreens/DriveBysLookupSlice";
import {
  setIsDriveBysTabValid,
  setUnitRoutesListing,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import {
  setAdditionalFuelSurchargeRate,
  setAdditionalRate,
  setAdditionalRateDescription,
  setBaseRate as setInvoiceBaseRate,
  setCdlRate,
  setFuelSurchargeRate,
  setInvoiceApportionedRate,
  setInvoiceFlatrate,
  setInvoiceMiles,
  setLengthRate,
  setSpecialFuelSurchargeRate,
  setSpecialRate,
  setSpecialRateDescription,
  setSupplementalFuelSurchargeRate,
  setSupplementalRate,
  setSupplementalRateDescription,
  setTriggeringAmountCalculation,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice";
import {
  setDriverFlatRate,
  setDriverMiles,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressDriverTabSlice";
import { correctDecimalInputOnBlur } from "../../../../../../utils/utils";
import toast from "react-hot-toast";

function DriveByMainpage({ styles }) {
  const dispatch = useDispatch();

  //Local States
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);
  const [contact, setContact] = useState("");
  const [instrcution1, setInstrcution1] = useState("");
  const [instrcution2, setInstrcution2] = useState("");
  const [instrcution3, setInstrcution3] = useState("");
  const [instrcution4, setInstrcution4] = useState("");
  const [driveByInstructionsInputValues, setDriveByInstructionsInputValues] = useState(Array(4).fill(""));
  const [cancelReason, setCancelReason] = useState("");
  const [dealerFK, setDealerFK] = useState(null);

  //Postal Code
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [disableSave, setDisableSave] = useState(false);
  const [cancellingDB, setCancellingDB] = useState(false);

  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [showDriveBysLookup, setShowDriveBysLookup] = useState(false);
  const [isDealerRecord, setIsDealerRecord] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const unitRoutesListing = useSelector((state) => state.editMasterExpressTabsReducer.unitRoutesListing);
  const invoiceMiles = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceMiles);
  const invoiceFlatrate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.invoiceFlatrate);
  const invoiceBaseRate = useSelector((state) => state.editMasterExpressInvoiceTabReducer.baseRate);
  const driverMiles = useSelector((state) => state.editMasterExpressDriverTabReducer.driverMiles);
  const driverFlatRate = useSelector((state) => state.editMasterExpressDriverTabReducer.driverFlatRate);
  const driverBaseRate = useSelector((state) => state.editMasterExpressDriverTabReducer.baseRate);

  const poeRecordIndex = unitRoutesListing?.findIndex((item) => item?.poeFK);
  const unitRoutesLength = unitRoutesListing?.length;
  const isCanadianPickup = unitRoutesListing?.[0]?.isCanadian || false;
  const isCanadianDelivery = unitRoutesListing?.[unitRoutesLength - 1]?.isCanadian || false;
  const selectedDriveBy = unitRoutesListing?.[selectedIndex];
  const usToCanada = !isCanadianPickup && isCanadianDelivery;
  const canadaToUs = isCanadianPickup && !isCanadianDelivery;
  const usDriveBy = !isCanadianPickup && !isCanadianDelivery;
  const canadianDriveBy = isCanadianPickup && isCanadianDelivery;

  const decimalRegex = /^-?\d{1,5}(\.\d{0,2})?$/;
  const integerRegex = /^-?\d{1,4}$/;
  const validateDecimal = (value) => value === "" || decimalRegex.test(value);
  const validateInteger = (value) => value === "" || integerRegex.test(value);

  const handleInvoiceFlatRateChange = (value) => {
    if (validateDecimal(value)) {
      dispatch(setInvoiceFlatrate(value));
    }

    // Keep the Invoice tab's flat-rate behavior: a flat rate clears the competing rate fields.
    dispatch(setInvoiceBaseRate(0));
    dispatch(setSupplementalRate(0));
    dispatch(setSupplementalFuelSurchargeRate(0));
    dispatch(setSupplementalRateDescription(""));
    dispatch(setLengthRate(0));
    dispatch(setCdlRate(0));
    dispatch(setSpecialRate(0));
    dispatch(setAdditionalRate(0));
    dispatch(setAdditionalFuelSurchargeRate(0));
    dispatch(setAdditionalRateDescription(""));
    dispatch(setInvoiceApportionedRate(0));
    dispatch(setSpecialFuelSurchargeRate(0));
    dispatch(setFuelSurchargeRate(0));
    dispatch(setSpecialRateDescription(""));
  };

  const clearForm = () => {
    setAuthorizedBy("");
    setName("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setStateCode("");
    setPostalCode("");
    setCanadian(false);
    setContact("");
    setDealerFK(null);
    setIsDealerRecord(false);

    // remove later if obsolete
    setInstrcution1("");
    setInstrcution2("");
    setInstrcution3("");
    setInstrcution4("");

    setDriveByInstructionsInputValues(Array(4).fill(""));
    setCancelReason("");

    setPostalValues(initialValue);
    setPostalCodePK(null);
  };

  const handleDealerLookupSelection = (dealer, e) => {
    setShowDealerLookup(false);
    setIsDealerRecord(true);
    setDealerFK(dealer?.dealerPK || "");
    setName(dealer.name?.trim() || "");
    setAddress1(dealer.address1?.trim() || "");
    setAddress2(dealer.address2?.trim() || "");
    setCity(dealer.city?.trim());
    setStateCode(dealer.stateCode?.trim());
    setPostalCode(dealer.postalCode?.trim() || "");
    setCanadian(dealer.canadian);
    setPostalCodePK(dealer.postalCodePK || null);
    setContact("");
    setInstrcution1("");
    setInstrcution2("");
    setInstrcution3("");
    setInstrcution4("");
  };

  const handleDriveByLookupSelection = (driveBy, e) => {
    setShowDriveBysLookup(false);
    setIsDealerRecord(false);
    setName(driveBy.name?.trim() || "");
    setAddress1(driveBy.address1?.trim() || "");
    setAddress2(driveBy.address2?.trim() || "");
    setCity(driveBy.city?.trim());
    setStateCode(driveBy.stateCode?.trim());
    setPostalCode(driveBy.postalCode?.trim() || "");
    setCanadian(driveBy.canadian);
    setPostalCodePK(driveBy.postalCodePK || null);
    setContact("");
    setInstrcution1("");
    setInstrcution2("");
    setInstrcution3("");
    setInstrcution4("");
  };

  const isCanadian = (postalCode) => {
    const usPostalCodeRegex = /^((\d{5}-\d{4})|(\d{5}))$/;
    const canadianPostalCodeRegex = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;
    if (!postalCode) return false;
    return canadianPostalCodeRegex.test(postalCode) ? true : !usPostalCodeRegex.test(postalCode) && false;
  };

  const handleSave = () => {
    const cancelling = cancellingDB && !selectedDriveBy?.driveBysCancelled && cancelReason;

    // TODO: change left side as schema from backend
    // forntend -> backend mapping b4 saving
    const formData = {
      unitRoutePK: selectedDriveBy?.unitRoutePK || null,
      unitFK: selectedDriveBy?.unitFK || null,
      unitDriveByFK: selectedDriveBy?.unitDriveByFK || null,
      driveBysdealerFK: dealerFK || selectedDriveBy?.dealerFK || null,
      frontEndPK: selectedDriveBy?.frontEndPK || null,
      driveBysAuthorizedBy: authorizedBy || "",
      driveBysContact: contact || "",
      driveBysName: name || "",
      driveBysAddress1: address1 || "",
      driveBysAddress2: address2 || "",
      driveBysCity: city || "",
      driveBysStateCode: statecode || "",
      driveBysPostalCode: postalcode || "",
      canadian: isCanadian(postalcode),
      isCanadian: isCanadian(postalcode),
      driveBysComment1: driveByInstructionsInputValues[0] || "",
      driveBysComment2: driveByInstructionsInputValues[1] || "",
      driveBysComment3: driveByInstructionsInputValues[2] || "",
      driveBysComment4: driveByInstructionsInputValues[3] || "",
      driveBysCompleted: selectedDriveBy?.driveBysCompleted || false,
      driveBysCancelled: cancelling ? true : selectedDriveBy?.driveBysCancelled || false,
      driveBysCanceledReason: cancelReason || "",
      //Unit Routes
      completed: selectedDriveBy?.completed || false,
      voided: selectedDriveBy?.voided || false,
      detour: selectedDriveBy?.detour || false,
      name: name || "",
      address1: address1 || "",
      address2: address2 || "",
      city: city || "",
      stateCode: statecode || "",
      postalCode: postalcode || "",
      postalCodePK: selectedDriveBy?.postalCodePK || postalCodePK || null,
    };

    if (usDriveBy && formData?.canadian) {
      toast.error("Cannot Add Canadian DriveBy to US Pickup & Delivery");
    }

    if (canadianDriveBy && !formData?.canadian) {
      toast.error("Cannot Add US DriveBy to Canadian Pickup & Delivery");
    }

    if (
      usToCanada ||
      canadaToUs ||
      (usDriveBy && !formData?.canadian) ||
      (canadianDriveBy && formData?.canadian)
    ) {
      if (selectedDriveBy?.unitDriveByFK || selectedDriveBy?.frontEndPK) {
        dispatch(
          setUnitRoutesListing({
            actionType: "edit",
            payload: {
              index: selectedIndex,
              formData: formData,
            },
          })
        );

        if (cancelling) {
          setCancellingDB(false);
        }
      } else {
        dispatch(
          setUnitRoutesListing({
            actionType: "add",
            payload: formData,
          })
        );
      }

      setEditMode(false);
      setSelectedIndex(null);
      clearForm();
    }
  };

  useEffect(() => {
    clearForm();
  }, [viewDetail]);

  useEffect(() => {
    if (selectedUnitData != null) {
      setInstrcution1(selectedUnitData?.editMaserExpressDriveBysTabDTO?.driveBysComment1?.trim() || "");
      setInstrcution2(selectedUnitData?.editMaserExpressDriveBysTabDTO?.driveBysComment2?.trim() || "");
      setInstrcution3(selectedUnitData?.editMaserExpressDriveBysTabDTO?.driveBysComment3?.trim() || "");
      setInstrcution4(selectedUnitData?.editMaserExpressDriveBysTabDTO?.driveBysComment4?.trim() || "");
    }
  }, [selectedUnitData, viewDetail]);

  useEffect(() => {
    const backendValues = [instrcution1, instrcution2, instrcution3, instrcution4];
    setDriveByInstructionsInputValues(backendValues);
  }, [instrcution1, instrcution2, instrcution3, instrcution4, viewDetail]);

  useEffect(() => {
    if (selectedUnitData) {
      let modifiedList = selectedUnitData?.editMaserExpressDriveBysTabDTO?.map((item) => {
        const postalCode = item?.driveBysPostalCode || item?.postalCode || null;
        const stateCode = item?.driveBysStateCode || item?.stateCode || null;
        // Checking for canadian pickup & delivery
        if (!item?.unitDriveByFK && item?.unitRoutePK) {
          return {
            ...item,
            postalCode: postalCode,
            stateCode: stateCode,
            frontEndPK: null,
            isCanadian: isCanadian(postalCode ? postalCode?.trim() : ""),
          };
        } else {
          // returning other items as default
          return {
            ...item,
            postalCode: postalCode,
            stateCode: stateCode,
            frontEndPK: null,
            isCanadian: isCanadian(postalCode ? postalCode?.trim() : ""),
            previousDriveBysCompleted: item?.driveBysCompleted,
          };
        }
      });
      // hardcoding data from frontend temporarly..
      // modifiedList[2] = {...modifiedList[2], driveBysCancelled: true, previousDriveBysCompleted: true}
      dispatch(
        setUnitRoutesListing({
          actionType: "set",
          payload: modifiedList,
        })
      );
    }
  }, [selectedUnitData]);

  // Save Validation
  useEffect(() => {
    if (
      editMode &&
      name &&
      authorizedBy &&
      address1 &&
      postalCodePK &&
      contact &&
      (!selectedDriveBy?.driveBysCancelled || (selectedDriveBy?.driveBysCancelled && cancelReason))
    ) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [
    editMode,
    name,
    authorizedBy,
    address1,
    postalCodePK,
    contact,
    selectedDriveBy?.driveBysCancelled,
    cancelReason,
  ]);

  // Tab Validation
  useEffect(() => {
    if ((!editMode && disableSave) || !disableSave) {
      dispatch(setIsDriveBysTabValid(true));
    } else {
      dispatch(setIsDriveBysTabValid(false));
    }
  }, [editMode, disableSave]);

  const renderUnitRoutesList = (unitRoutesListing) => {
    const lisitngWithTempId = unitRoutesListing.map((item, index) => ({ ...item, tempId: index }));

    return lisitngWithTempId
      ?.filter((item) => !item?.voided)
      .map((unitRoute, index) => (
        <tr
          id="rowId"
          key={unitRoute?.tempId}
          onClick={(e) => {
            if (!viewDetail && (unitRoute?.unitDriveByFK || unitRoute?.frontEndPK)) {
              setSelectedIndex(index);
              setEditMode(false);

              // TODO: Frontend - Backend data mapping
              setAuthorizedBy(unitRoute?.driveBysAuthorizedBy?.trim() || "");
              setName(unitRoute?.driveBysName?.trim() || "");
              setAddress1(unitRoute?.driveBysAddress1?.trim() || "");
              setAddress2(unitRoute?.driveBysAddress2?.trim() || "");
              setCity(unitRoute?.driveBysCity?.trim());
              setStateCode(unitRoute?.driveBysStateCode);
              setPostalCode(unitRoute?.driveBysPostalCode?.trim() || "");
              setPostalCodePK(unitRoute?.postalCodePK || null);
              setContact(unitRoute?.driveBysContact?.trim() || "");
              setCancelReason(unitRoute?.driveBysCanceledReason?.trim() || "");
              setInstrcution1(unitRoute?.driveBysComment1?.trim() || "");
              setInstrcution2(unitRoute?.driveBysComment2?.trim() || "");
              setInstrcution3(unitRoute?.driveBysComment3?.trim() || "");
              setInstrcution4(unitRoute?.driveBysComment4?.trim() || "");
            }
          }}
          className={selectedIndex === index ? "tableSelected" : ""}
        >
          <td className="f-w-600">{unitRoute.name?.trim()} </td>
          <td className="f-w-600">{unitRoute.city?.trim()} </td>
          <td className="f-w-600">{unitRoute.stateCode?.trim()} </td>
          <td className="f-w-600">
            {(unitRoute?.unitDriveByFK || unitRoute?.frontEndPK) && unitRoute.driveBysCompleted !== null
              ? unitRoute.driveBysCompleted === true
                ? "Yes"
                : "No"
              : null}
          </td>
          <td className="f-w-600">
            {(unitRoute?.unitDriveByFK || unitRoute?.frontEndPK) && unitRoute.driveBysCancelled !== null
              ? unitRoute.driveBysCancelled === true
                ? "Yes"
                : "No"
              : null}
          </td>
        </tr>
      ));
  };

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={7}>
          {/* Table Listing */}
          <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
            <div className="d-flex h-100">
              <div className="w-100 border-2 border-dark border">
                <div className="fixTableHead h-500px" style={{ overflowY: "auto" }}>
                  <table className="table table-striped ">
                    <thead>
                      <tr disabled>
                        <th className="f-w-600 col-4">Name</th>
                        <th className="f-w-600 col-4">City</th>
                        <th className="f-w-600">State</th>
                        <th className="f-w-600">Completed</th>
                        <th className="f-w-600">Canceled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isUnitDataLoading ? (
                        <tr>
                          <td colSpan="2" align="center">
                            Loading...
                          </td>
                        </tr>
                      ) : (
                        unitRoutesListing?.length > 0 && renderUnitRoutesList(unitRoutesListing)
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex col-12 mt-1 justify-content-end">
            <Col xs={4} className="pe-2">
              <Form.Group className="mt-1 align-items-center row m-l-0 m-r-0 ms-0">
                <Col xs={8} className="p-0 text-nowrap">
                  <Form.Label className="customColFormLabel">Invoice Miles</Form.Label>
                </Col>
                <Col xs={4} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    value={invoiceMiles}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail}
                    onInput={(e) => {
                      if (!validateInteger(e.target.value)) return;
                      dispatch(setInvoiceMiles(e.target.value));
                      setTimeout(() => {
                        dispatch(setTriggeringAmountCalculation());
                      }, 0);
                    }}
                    onBlur={() => {
                      if (!invoiceMiles) {
                        dispatch(setInvoiceMiles(0));
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-1 align-items-center row m-l-0 m-r-0 ms-0">
                <Col xs={8} className="p-0 text-nowrap">
                  <Form.Label className="customColFormLabel">Driver Miles</Form.Label>
                </Col>
                <Col xs={4} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    value={driverMiles}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail}
                    onChange={(e) => {
                      setTimeout(() => {
                        dispatch(setTriggeringAmountCalculation());
                      }, 0);
                      validateInteger(e.target.value) && dispatch(setDriverMiles(e.target.value));
                    }}
                    onBlur={() => {
                      if (!driverMiles) {
                        dispatch(setDriverMiles(0));
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-1 align-items-center row m-l-0 m-r-0 ms-0">
                <Col xs={8} className="p-0 text-nowrap">
                  <Form.Label className="customColFormLabel">Invoice Flat Rate</Form.Label>
                </Col>
                <Col xs={4} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    value={invoiceFlatrate}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail || (!invoiceFlatrate && !!invoiceBaseRate && invoiceBaseRate != "0")}
                    onInput={(e) => handleInvoiceFlatRateChange(e.target.value)}
                    onBlur={(e) => dispatch(setInvoiceFlatrate(correctDecimalInputOnBlur(e.target.value)))}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-1 align-items-center row m-l-0 m-r-0 ms-0">
                <Col xs={8} className="p-0 text-nowrap">
                  <Form.Label className="customColFormLabel">Driver Flat Rate</Form.Label>
                </Col>
                <Col xs={4} className="p-0">
                  <input
                    className="customFormControl"
                    type="text"
                    value={driverFlatRate}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled={viewDetail || (!driverFlatRate && !!driverBaseRate && driverBaseRate != "0")}
                    onChange={(e) =>
                      validateDecimal(e.target.value) && dispatch(setDriverFlatRate(e.target.value))
                    }
                    onBlur={(e) => dispatch(setDriverFlatRate(correctDecimalInputOnBlur(e.target.value)))}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={2}>
              {/* Up */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={
                  viewDetail ||
                  editMode ||
                  selectedIndex === null ||
                  unitRoutesListing?.length === 3 ||
                  selectedIndex === 0 ||
                  selectedIndex === unitRoutesListing?.length - 1 ||
                  selectedIndex === 1 ||
                  selectedIndex === poeRecordIndex ||
                  (usToCanada && selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex + 1) ||
                  (canadaToUs && !selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex + 1)
                }
                onClick={() => {
                  dispatch(
                    setUnitRoutesListing({
                      actionType: "moveUp",
                      payload: selectedIndex,
                    })
                  );
                  setSelectedIndex(selectedIndex - 1);
                }}
              >
                Up
              </button>
              {/* Down */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={
                  viewDetail ||
                  editMode ||
                  selectedIndex === null ||
                  unitRoutesListing?.length === 3 ||
                  selectedIndex === 0 ||
                  selectedIndex === unitRoutesListing?.length - 1 ||
                  selectedIndex === unitRoutesListing?.length - 2 ||
                  selectedIndex === poeRecordIndex ||
                  (usToCanada && !selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex - 1) ||
                  (canadaToUs && selectedDriveBy?.isCanadian && selectedIndex === poeRecordIndex - 1)
                }
                onClick={() => {
                  dispatch(
                    setUnitRoutesListing({
                      actionType: "moveDown",
                      payload: selectedIndex,
                    })
                  );
                  setSelectedIndex(selectedIndex + 1);
                }}
              >
                Down
              </button>
            </Col>
            <Col xs={2}>
              {/* New */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={viewDetail || editMode}
                onClick={() => {
                  clearForm();
                  setEditMode(true);
                  setSelectedIndex(null);

                  const driveBysRecord = unitRoutesListing?.find((item) => item?.unitDriveByFK);
                  if (driveBysRecord) {
                    setAuthorizedBy(
                      driveBysRecord?.driveBysAuthorizedBy || driveBysRecord?.authorizedBy || ""
                    );
                  }
                }}
              >
                New
              </button>
              {/* Edit */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={
                  viewDetail ||
                  selectedIndex === null ||
                  editMode ||
                  (!selectedDriveBy?.unitDriveByFK && !selectedDriveBy?.frontEndPK) /* ||
                  // selectedDriveBy?.driveBysCompleted ||
                  // selectedDriveBy?.driveBysCancelled
                  (selectedDriveBy?.driveBysCompleted && selectedDriveBy?.driveBysCancelled) || */ ||
                  selectedDriveBy?.driveBysCompleted
                }
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </button>
              {/* Save */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={disableSave}
                onClick={handleSave}
              >
                Save
              </button>
              {/* Cancel Edit */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={
                  viewDetail ||
                  editMode ||
                  selectedIndex === null ||
                  !(!selectedDriveBy?.driveBysCompleted && !selectedDriveBy?.driveBysCancelled)
                }
                onClick={() => {
                  setEditMode(false);
                  setSelectedIndex(null);
                  clearForm();
                }}
              >
                Cancel Edit
              </button>
              {/* Delete */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={viewDetail || selectedIndex === null || !selectedDriveBy?.frontEndPK}
                onClick={() => {
                  dispatch(
                    setUnitRoutesListing({
                      actionType: "delete",
                      payload: selectedIndex,
                    })
                  );
                  setSelectedIndex(null);
                }}
              >
                Delete
              </button>
            </Col>
            <Col xs={2}>
              {/* Select Dealer */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={viewDetail || !editMode || !disableSave}
                onClick={() => {
                  setShowDealerLookup(true);
                }}
              >
                Select Dealer
              </button>
              {/* Select DriveBy */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={viewDetail || !editMode || !disableSave}
                onClick={() => {
                  dispatch(setSelectedId(null));
                  setShowDriveBysLookup(true);
                }}
              >
                Select DriveBy
              </button>
            </Col>
            <Col xs={2}>
              {/* Cancel DB */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={
                  viewDetail ||
                  editMode ||
                  selectedIndex === null ||
                  (!selectedDriveBy?.driveBysCompleted && selectedDriveBy?.driveBysCancelled)
                }
                onClick={() => {
                  setEditMode(true);
                  setCancellingDB(true);
                }}
              >
                Cancel DB
              </button>
              {/* Recall */}
              <button
                className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
                type="button"
                disabled={
                  viewDetail ||
                  editMode ||
                  selectedIndex === null ||
                  (!selectedDriveBy?.driveBysCompleted && !selectedDriveBy?.driveBysCancelled)
                }
                onClick={() => {
                  dispatch(
                    setUnitRoutesListing({
                      actionType: "recall",
                      payload: selectedIndex,
                    })
                  );
                  setCancelReason("");
                }}
              >
                Recall
              </button>
              <p className="ps-3 pt-3">Cancel Reason</p>
            </Col>
          </div>
        </Col>
        <Col xs={5}>
          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Authorized By */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl ${
                  !viewDetail && !isUnitDataLoading && editMode && !cancellingDB
                    ? authorizedBy?.trim()
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                type="text"
                name="authorizedBy"
                value={authorizedBy}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || !editMode || cancellingDB}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[^a-zA-Z]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setAuthorizedBy(value);
                }}
                onBlur={(e) => {
                  dispatch(
                    setUnitRoutesListing({
                      actionType: "updateAuthorizedBy",
                      payload: authorizedBy,
                    })
                  );
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Name */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Name</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl ${
                  !viewDetail && !isUnitDataLoading && editMode && !isDealerRecord && !cancellingDB
                    ? name
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                type="text"
                name="name"
                value={name}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || !editMode || isDealerRecord || cancellingDB}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[^a-zA-Z]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setName(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Address -1 */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl ${
                  !viewDetail && !isUnitDataLoading && editMode && !isDealerRecord && !cancellingDB
                    ? address1
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                name="ad1"
                value={address1}
                type="text"
                maxLength={30}
                autoComplete="one-time-code"
                aria-autocomplete="list"
                disabled={viewDetail || !editMode || isDealerRecord || cancellingDB}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setAddress1(value);
                }}
                spellCheck={false}
              />
            </Col>
          </Form.Group>

          {/* Address - 2 */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input
                className={`customFormControl`}
                name="ad2"
                value={address2}
                type="text"
                maxLength={30}
                autoComplete="one-time-code"
                aria-autocomplete="list"
                disabled={viewDetail || !editMode || isDealerRecord || cancellingDB}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setAddress2(value);
                }}
                spellCheck={false}
              />
            </Col>
          </Form.Group>

          {/* City,State,Zip */}
          <PostalCodeComponent
            labelColNumber={4}
            stateInputWidth={"55px"}

            disabled={viewDetail || !editMode || isDealerRecord || cancellingDB}
            city={viewDetail ? "" : city}
            setCity={setCity}
            stateCode={viewDetail ? "" : statecode}
            setStateCode={setStateCode}
            postalCode={viewDetail ? "" : postalcode}
            setPostalCode={setPostalCode}
            setPostalValues={setPostalValues}
            postalOptions={postalOptions}
            postalCodePK={postalCodePK}
            setPostalCodePK={setPostalCodePK}
            canadian={canadian}
            setCanadian={setCanadian}
          />

          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Contact */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Contact</Form.Label>
            </Col>
            <Col xs={6} className="p-0">
              <input
                className={`customFormControl ${
                  !viewDetail && !isUnitDataLoading && editMode && !cancellingDB /* && !isDealerRecord */
                    ? contact
                      ? "borderGreen"
                      : "borderRed"
                    : ""
                }`}
                type="contact"
                name="contact"
                maxLength={30}
                value={contact}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={viewDetail || !editMode /* || isDealerRecord */ || cancellingDB}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setContact(value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row invisible  m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Drive By Instructions */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Drive By Instructions</Form.Label>
            </Col>
            <Col xs={7} md={7} sm={7} className="p-0">
              <DynamicTextFields
                numFields={4}
                maxCharLimit={42}
                inputValues={driveByInstructionsInputValues}
                setInputValues={setDriveByInstructionsInputValues}

                disabled={viewDetail || !editMode || cancellingDB}
              />
            </Col>
          </Form.Group>

          {/* Cancel Reason */}
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col xs={12} className="p-0">
              <textarea
                rows={7}

                className={`customFormControl h-100 ${
                  viewDetail || !editMode || !cancellingDB ? "" : cancelReason ? "borderGreen" : "borderRed"
                }`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="cancelReason"
                value={cancelReason}
                disabled={viewDetail || !editMode || !cancellingDB}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setCancelReason(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      {/* Dealer DriveBy Lookup Modal */}
      <DealerLookup
        show={showDealerLookup}
        onHide={() => setShowDealerLookup(false)}
        renderItemId={(dealer) => dealer.dealerPK}
        handleLookupSelection={handleDealerLookupSelection}
        MaintenanceProgram
        includePostalCodePK
      />
      {/* DriveBy Lookup Modal */}
      <DriveBysLookup
        show={showDriveBysLookup}
        onHide={() => setShowDriveBysLookup(false)}
        OEDriveBys={true}
        handleOEDriveByOnClick={handleDriveByLookupSelection}
        includePostalCodePK
      />
    </div>
  );
}

export default DriveByMainpage;
