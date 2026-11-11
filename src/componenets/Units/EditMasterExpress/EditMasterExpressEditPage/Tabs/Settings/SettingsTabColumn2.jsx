import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setEditedUnitDataToSaveForSettingsTab } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const SettingsTabColumn2 = ({ styles }) => {
  const dispatch = useDispatch();

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitReload = useSelector((state) => state.editMasterExpressTabsReducer.isUnitReload);
  const unitTypeELDRequired = useSelector((state) => state.editMasterExpressTabsReducer.unitTypeELDRequired);
  const gvwrReduxValue = useSelector((state) => state.editMasterExpressTabsReducer.gvwrReduxValue);

  //Local States
  const [requiredCDLA, setRequiredCDLA] = useState(false);
  const [requiredTWIC, setRequiredTWIC] = useState(false);
  const [requiredELD, setRequiredELD] = useState(false);
  const [requiredIFTA, setRequiredIFTA] = useState(false);
  const [requireFlagsAndSigns, setRequireFlagsAndSigns] = useState(false);
  const [tankerRequired, setTankerRequired] = useState(false);
  const [doNotDispatch, setDoNotDispatch] = useState(false);
  const [doNotInvoice, setDoNotInvoice] = useState(false);
  const [dealerPickup, setDealerPickup] = useState(false);
  const [storage, setStorage] = useState(false);
  const [hasDriversBy, setHasDriversBy] = useState(false);
  const [invoiceFODBreakdownToDealer, setInvoiceFODBreakdownToDealer] = useState(false);
  const [contactDealerDelay, setContactDealerDelay] = useState(false);

  //Local States  - Validations
  const [showRequiredCDLA, setShowRequiredCDLA] = useState(false);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData) {
      setRequiredCDLA(selectedUnitData?.editMasterExpressSettingsTabDTO?.requiredCDLA || false);
      setRequiredTWIC(selectedUnitData?.editMasterExpressSettingsTabDTO?.twicRequired || false);
      setRequiredELD(selectedUnitData?.editMasterExpressSettingsTabDTO?.eldRequired || false);
      setRequiredIFTA(selectedUnitData?.editMasterExpressSettingsTabDTO?.ifta || false);
      setRequireFlagsAndSigns(
        selectedUnitData?.editMasterExpressSettingsTabDTO?.requireFlagsAndSigns || false
      );
      setTankerRequired(selectedUnitData?.editMasterExpressSettingsTabDTO?.tankerRequired || false);
      setDoNotDispatch(selectedUnitData?.editMasterExpressSettingsTabDTO?.doNotDispatch || false);
      setDoNotInvoice(selectedUnitData?.editMasterExpressSettingsTabDTO?.noInvoice || false);
      setDealerPickup(selectedUnitData?.editMasterExpressSettingsTabDTO?.dealerPickup || false);
      setStorage(selectedUnitData?.editMasterExpressSettingsTabDTO?.storage || false);
      setHasDriversBy(selectedUnitData?.editMasterExpressSettingsTabDTO?.hasDrivebys || false);
      setInvoiceFODBreakdownToDealer(
        selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer
          ? true
          : selectedUnitData?.editMasterExpressSettingsTabDTO?.invoiceFODBreakdownToDealer || false
      );
      setContactDealerDelay(
        selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer
          ? true
          : selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDelayContact || false
      );
    }
    // eslint-disable-next-line
  }, [selectedUnitData]);

  //Use effect - Validation
  useEffect(() => {
    if (
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK === null &&
        selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeTowable &&
        isUnitReload) ||
      (selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeMotorized &&
        isUnitReload &&
        !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant)
    ) {
      setShowRequiredCDLA(true);
    } else {
      setShowRequiredCDLA(false);
    }
    // eslint-disable-next-line
  }, [selectedUnitData, isUnitReload]);

  useEffect(() => {
    if (dealerPickup) {
      setDoNotDispatch(true);
    }
    // eslint-disable-next-line
  }, [dealerPickup]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForSettingsTab({
        cdlaRequired: requiredCDLA,
        twicRequired: requiredTWIC,
        ELDRequired: requiredELD,
        ifta: requiredIFTA,
        requireFlagsAndSigns: requireFlagsAndSigns,
        tankerRequired: tankerRequired,
        doNotDispatch: doNotDispatch,
        noInvoice: doNotInvoice,
        dealerPickup: dealerPickup,
        storage: storage,
        hasDrivebys: hasDriversBy,
        invoiceFODBreakdownToDealer: invoiceFODBreakdownToDealer,
        deliveryDelayContact: contactDealerDelay,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    requiredCDLA,
    requiredTWIC,
    requiredELD,
    requiredIFTA,
    requireFlagsAndSigns,
    tankerRequired,
    doNotDispatch,
    doNotInvoice,
    dealerPickup,
    storage,
    hasDriversBy,
    invoiceFODBreakdownToDealer,
    contactDealerDelay,
  ]);

  useEffect(() => {
    if (gvwrReduxValue && Number(gvwrReduxValue) >= 32000) {
      setRequiredIFTA(true);
    } else {
      setRequiredIFTA(false);
    }
  }, [gvwrReduxValue]);

  return (
    <Col xs={3}>
      {/* ********************* */}
      {/* Require CDL-A */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          showRequiredCDLA ? "" : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Require CDL-A</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={requiredCDLA || false}
            checked={requiredCDLA || false}
            onChange={(e) => {
              setRequiredCDLA(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Require TWIC */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK === null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryDealerTWICRequired
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Require TWIC</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={requiredTWIC || false}
            checked={requiredTWIC || false}
            onChange={(e) => {
              setRequiredTWIC(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Require ELD */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK === null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeTowable
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Require ELD</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || unitTypeELDRequired}
            value={requiredELD || false}
            checked={requiredELD || false}
            onChange={(e) => {
              if (unitTypeELDRequired) {
                setRequiredELD(true);
              } else {
                setRequiredELD(e.target.checked);
              }
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Require IFTA Reporting */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeMotorized ? "" : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Require IFTA Reporting</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || Number(gvwrReduxValue) > 0}
            value={requiredIFTA || false}
            checked={requiredIFTA || false}
            onChange={(e) => {
              setRequiredIFTA(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Require Flags & Signs */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeTowable ? "" : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Require Flags & Signs</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={requireFlagsAndSigns || false}
            checked={requireFlagsAndSigns || false}
            onChange={(e) => {
              setRequireFlagsAndSigns(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Require Tanker Endorsment */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeMotorized &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupCustomerPlantPK === null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.deliveryCustomerPlantPK === null
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Require Tanker Endorsment</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={tankerRequired || false}
            checked={tankerRequired || false}
            onChange={(e) => {
              setTankerRequired(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Dispatch Status */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={`customColFormLabel`}> Dispatch Status</Form.Label>
        </Col>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={selectedUnitData?.editMasterExpressSettingsTabDTO?.dispatchStatus || ""}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Do Not Dispatch */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
          !selectedUnitData?.editMasterExpressInfoTabDTO?.isUnitHasDispatchRecord
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Do Not Dispatch</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || dealerPickup || storage}
            value={doNotDispatch}
            checked={doNotDispatch || dealerPickup || storage}
            onChange={(e) => {
              if (dealerPickup || storage) {
                setDoNotDispatch(true);
              } else {
                setDoNotDispatch(e.target.checked);
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Do Not Invoice */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Do Not Invoice</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={doNotInvoice || false}
            checked={doNotInvoice || false}
            onChange={(e) => {
              setDoNotInvoice(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Dealer Pickup */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitFreeForDispatch &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.customerUsePlant &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.billingPlantDPUPickup &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.shuttleToYard
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Dealer Pickup</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || storage}
            value={dealerPickup || false}
            checked={dealerPickup || false}
            onChange={(e) => {
              if (storage) {
                setDealerPickup(false);
              } else {
                setDealerPickup(e.target.checked);
              }
              if (!e.target.checked) {
                setDoNotDispatch(false);
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Storage */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitFreeForDispatch &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.customerUsePlant &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.billingPlantDPUPickup &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.shuttleToYard
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Storage</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || dealerPickup}
            value={storage || false}
            checked={storage || false}
            onChange={(e) => {
              if (dealerPickup) {
                setStorage(false);
              } else {
                setStorage(e.target.checked);
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Has Driverby's */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Has Driveby's</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={hasDriversBy || false}
            checked={hasDriversBy || false}
            onChange={(e) => {
              setHasDriversBy(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Invoice Dealer For Breakdown */}

      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer ||
          selectedUnitData?.editMasterExpressSettingsTabDTO?.customerAllDealersFOD ||
          selectedUnitData?.editMasterExpressSettingsTabDTO?.fodCheckWithCustomerDealerCombination
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Invoice Dealer For Breakdown</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer}
            value={invoiceFODBreakdownToDealer || false}
            checked={
              invoiceFODBreakdownToDealer ||
              selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer ||
              false
            }
            onChange={(e) => {
              setInvoiceFODBreakdownToDealer(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      {/* Contact Dealer For Delays */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer ||
          selectedUnitData?.editMasterExpressSettingsTabDTO?.customerAllDealersFOD ||
          selectedUnitData?.editMasterExpressSettingsTabDTO?.fodCheckWithCustomerDealerCombination
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Contact Dealer For Delays</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer}
            value={contactDealerDelay || false}
            checked={
              contactDealerDelay || selectedUnitData?.editMasterExpressSettingsTabDTO?.isMiscCustomer || false
            }
            onChange={(e) => {
              setContactDealerDelay(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default SettingsTabColumn2;
