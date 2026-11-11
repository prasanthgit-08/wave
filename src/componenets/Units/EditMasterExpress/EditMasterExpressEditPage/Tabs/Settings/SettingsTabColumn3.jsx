import { Col, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUnitOverWidthLoadRequired,
  setIsSettingsTabColumn3Valid,
  setEditedUnitDataToSaveForSettingsTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const SettingsTabColumn3 = ({ styles }) => {
  const dispatch = useDispatch();

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const isUnitTypeOverWidth = useSelector((state) => state.editMasterExpressTabsReducer.isUnitTypeOverWidth);
  const unitOverWidthLoadRequired = useSelector(
    (state) => state.editMasterExpressTabsReducer.unitOverWidthLoadRequired
  );

  //Local States
  const [haveCustomerPlate, setHaveCustomerPlate] = useState(false);
  const [customerPlateInUnit, setCustomerPlateInUnit] = useState(false);
  const [customerPlateNumber, setCustomerPlateNumber] = useState("");

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      dispatch(
        setUnitOverWidthLoadRequired(
          selectedUnitData?.editMasterExpressSettingsTabDTO?.overWidthLoad || false
        )
      );
      setHaveCustomerPlate(selectedUnitData?.editMasterExpressSettingsTabDTO?.haveCustomerPlate || false);
      setCustomerPlateInUnit(selectedUnitData?.editMasterExpressSettingsTabDTO?.customerPlateInUnit || false);
      setCustomerPlateNumber(selectedUnitData?.editMasterExpressSettingsTabDTO?.customerPlateNumber || "");
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  useEffect(() => {
    if (!customerPlateInUnit || (customerPlateInUnit && customerPlateNumber !== "")) {
      dispatch(setIsSettingsTabColumn3Valid(true));
    } else {
      dispatch(setIsSettingsTabColumn3Valid(false));
    }
    // eslint-disable-next-line
  }, [customerPlateInUnit, customerPlateNumber]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForSettingsTab({
        overWidthLoad: unitOverWidthLoadRequired,
        haveCustomerPlate: haveCustomerPlate,
        customerPlateInUnit: customerPlateInUnit,
        customerPlateNumber: customerPlateNumber,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitOverWidthLoadRequired, haveCustomerPlate, customerPlateInUnit, customerPlateNumber]);

  return (
    <Col xs={3}>
      {/* ********************* */}
      {/* Over Width Load */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          isUnitTypeOverWidth ? "" : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Over Width Load</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={unitOverWidthLoadRequired}
            checked={unitOverWidthLoadRequired}
            onChange={(e) => {
              dispatch(setUnitOverWidthLoadRequired(e.target.checked));
            }}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Have Customer Plate */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.requireCustomerPlate &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeMotorized
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Have Customer Plate</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={haveCustomerPlate}
            checked={haveCustomerPlate}
            onChange={(e) => {
              setHaveCustomerPlate(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Customer Plate In Unit */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.requireCustomerPlate &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeMotorized
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={` customColFormLabel`}>Customer Plate In Unit</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={customerPlateInUnit}
            checked={customerPlateInUnit}
            onChange={(e) => {
              setCustomerPlateInUnit(e.target.checked);
              if (!e.target.checked) {
                setCustomerPlateNumber("");
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Customer Plate Number */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.requireCustomerPlate &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeMotorized
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={7} md={7} xs={7} className="p-0">
          <Form.Label className={`customColFormLabel`}>Customer Plate Number</Form.Label>
        </Col>
        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            className={`customFormControl ${
              isUnitDataLoading || viewDetail || !customerPlateInUnit
                ? ""
                : customerPlateInUnit && customerPlateNumber !== ""
                  ? "borderGreen"
                  : "borderRed"
            }`}
            name="customerPlateNumber"
            value={customerPlateNumber}
            type="text"
            maxLength={10}
            autoComplete="off"
            disabled={viewDetail}
            aria-autocomplete="list"
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setCustomerPlateNumber(value);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default SettingsTabColumn3;
