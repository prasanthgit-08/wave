import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditedUnitDataToSaveForInfoTab,
  setIsInfoHoldsTabValid,
  setInfoOnInvoiceHoldFlag,
  setInfoOnUnitHold,
} from "../../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import DateInputField from "../../../../../../common/DateInputField";
import { usePermission } from "../../../../../../../hooks/usePermission";

function Holds({ styles }) {
  const dispatch = useDispatch();
  //Local States
  const [onInvoiceHold, setOnInvoiceHold] = useState(false);
  const [invoiceHoldNotes, setInvoiceHoldNotes] = useState("");
  const [unitHoldPK, setUnitHoldPK] = useState("");
  const [unitsOnHold, setUnitsOnHold] = useState(false);
  const [onHoldDate, setOnHoldDate] = useState("");
  const [isOnHoldDateValid, setIsOnHoldDateValid] = useState(true);
  const [onHoldBy, setOnHoldBy] = useState("");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [onHoldReason, setOnHoldReason] = useState("");
  const { checkPermission } = usePermission();

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);

  const unitOnActivationDelay = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitOnActivationDelay
  );
  const unitOnShuttleDelay = useSelector((state) => state.editMasterExpressTabsReducer.unitOnShuttleDelay);
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedInUserData"));

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      //Invoice Hold
      setOnInvoiceHold(selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnInvoiceHold || false);
      dispatch(
        setInfoOnInvoiceHoldFlag(selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnInvoiceHold || false)
      );
      setInvoiceHoldNotes(selectedUnitData?.editMasterExpressInfoTabDTO?.invoiceHoldReason || "");
      //Unit On Hold
      setUnitHoldPK(selectedUnitData?.editMasterExpressInfoTabDTO?.unitHoldPK || null);
      setUnitsOnHold(selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnHold || false);
      dispatch(setInfoOnUnitHold(selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnHold || false));
      setOnHoldDate(selectedUnitData?.editMasterExpressInfoTabDTO?.holdDate || "");
      setOnHoldBy(
        selectedUnitData?.editMasterExpressInfoTabDTO?.onHoldBy?.trim() ||
          (selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnHold ? loggedInUserData?.name : "")
      );
      setAuthorizedBy(selectedUnitData?.editMasterExpressInfoTabDTO?.authorizedBy?.trim() || "");
      setOnHoldReason(selectedUnitData?.editMasterExpressInfoTabDTO?.onHoldReason?.trim() || "");
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  //Info - Notes Tab Validation
  useEffect(() => {
    if (
      (!onInvoiceHold || (onInvoiceHold && invoiceHoldNotes?.trim() !== "")) &&
      (!unitsOnHold ||
        (unitsOnHold && onHoldDate !== "" && authorizedBy?.trim() !== "" && onHoldReason?.trim() !== ""))
    ) {
      dispatch(setIsInfoHoldsTabValid(true));
    } else {
      dispatch(setIsInfoHoldsTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onInvoiceHold, invoiceHoldNotes, unitsOnHold, onHoldDate, authorizedBy, onHoldReason]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForInfoTab({
        unitOnInvoiceHold: onInvoiceHold,
        invoiceHoldReason: invoiceHoldNotes,
        unitHoldPK: unitHoldPK,
        unitOnHold: unitsOnHold,
        holdDate: onHoldDate,
        onHoldBy: onHoldBy,
        unitShuttleDelayPK: selectedUnitData?.editMasterExpressInfoTabDTO?.unitShuttleDelayPK || null,
        unitHoldAuthorizedBy: authorizedBy,
        reason: onHoldReason,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    onInvoiceHold,
    invoiceHoldNotes,
    unitHoldPK,
    unitsOnHold,
    onHoldDate,
    onHoldBy,
    authorizedBy,
    onHoldReason,
  ]);

  useEffect(() => {
    setUnitsOnHold(false);
    setOnHoldDate("");
    setOnHoldBy("");
    setAuthorizedBy("");
    setOnHoldReason("");
  }, [unitOnActivationDelay, unitOnShuttleDelay]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          {/* On Invoice Hold */}
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>On Invoice Hold</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail ||
                  (selectedUnitData?.editMasterExpressInfoTabDTO?.unitOnInvoiceHold &&
                    !checkPermission("EDTMAHLD", "edit"))
                }
                value={onInvoiceHold}
                checked={onInvoiceHold}
                onChange={(e) => {
                  setOnInvoiceHold(e.target.checked);
                  dispatch(setInfoOnInvoiceHoldFlag(e.target.checked));
                  if (!e.target.checked) {
                    setInvoiceHoldNotes("");
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Invoice Hold Notes */}
          <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Invoice Hold Notes</Form.Label>
            </Col>
            <Col sm={9} md={9} className="p-0 ">
              <textarea
                rows={13}
                className={`customFormControl h-100 ${
                  isUnitDataLoading || viewDetail || !onInvoiceHold
                    ? ""
                    : onInvoiceHold && invoiceHoldNotes?.trim() !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="invoiceHoldNotes"
                value={invoiceHoldNotes}
                disabled={viewDetail || !onInvoiceHold}
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setInvoiceHoldNotes(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>

        <Col xs={6}>
          {/* Unit On Hold */}
          <Form.Group className={`mt-3 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={` customColFormLabel`}>Unit On Hold</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  unitOnActivationDelay ||
                  unitOnShuttleDelay
                }
                value={unitsOnHold}
                checked={unitsOnHold}
                onChange={(e) => {
                  setUnitsOnHold(e.target.checked);
                  dispatch(setInfoOnUnitHold(e.target.checked));
                  if (!e.target.checked) {
                    setOnHoldDate("");
                    setAuthorizedBy("");
                    setOnHoldReason("");
                    setOnHoldBy("");
                  } else {
                    setOnHoldBy(
                      selectedUnitData?.editMasterExpressInfoTabDTO?.onHoldBy?.trim() ||
                        loggedInUserData?.name
                    );
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* On Hold Date */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>On Hold Date</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <DateInputField
                date={onHoldDate}
                setDate={setOnHoldDate}
                disabled={
                  viewDetail ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  !unitsOnHold ||
                  unitOnActivationDelay ||
                  unitOnShuttleDelay
                }
                setIsDateValid={setIsOnHoldDateValid}
                min={new Date()}
                className={`customFormControl ${
                  isUnitDataLoading ||
                  viewDetail ||
                  !unitsOnHold ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
                  unitOnActivationDelay ||
                  unitOnShuttleDelay
                    ? ""
                    : unitsOnHold && onHoldDate !== "" && isOnHoldDateValid
                      ? "borderGreen"
                      : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          {/* On Hold By */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>On Hold By</Form.Label>
            </Col>
            <Col xs={7} className="p-0">
              <input
                className={`customFormControl`}
                name="onHoldBy"
                type="text"
                value={onHoldBy}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[^a-zA-Z]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setOnHoldBy(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* Authorized By */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>Authorized By</Form.Label>
            </Col>
            <Col xs={4} className="p-0">
              <input
                className={`customFormControl ${
                  isUnitDataLoading ||
                  viewDetail ||
                  !unitsOnHold ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
                  unitOnActivationDelay ||
                  unitOnShuttleDelay
                    ? ""
                    : unitsOnHold && authorizedBy !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                name="authorizedBy"
                type="text"
                value={authorizedBy}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled={
                  viewDetail ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
                  !unitsOnHold ||
                  unitOnActivationDelay ||
                  unitOnShuttleDelay
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[^a-zA-Z]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setAuthorizedBy(value);
                }}
              />
            </Col>
          </Form.Group>

          {/* On Hold Reason */}
          <Form.Group className="mt-3 align-items-start row  m-l-0 m-r-0 ms-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label className={`customColFormLabel`}>On Hold Reason</Form.Label>
            </Col>
            <Col sm={9} md={9} className="p-0 ">
              <textarea
                rows={13}
                className={`customFormControl h-100 ${
                  isUnitDataLoading ||
                  viewDetail ||
                  !unitsOnHold ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
                  unitOnActivationDelay ||
                  unitOnShuttleDelay
                    ? ""
                    : unitsOnHold && onHoldReason !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                name="onHoldReason"
                value={onHoldReason}
                disabled={
                  viewDetail ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
                  selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO === null ||
                  !unitsOnHold ||
                  unitOnActivationDelay ||
                  unitOnShuttleDelay
                }
                onInput={(e) => {
                  let value = e.target.value;
                  if (value !== "") {
                    if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                      value = value.substring(1);
                    }
                  }
                  setOnHoldReason(value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Holds;
