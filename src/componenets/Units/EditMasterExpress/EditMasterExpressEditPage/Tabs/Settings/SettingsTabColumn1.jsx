import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setFlagChanged,
  setIsUnitReload,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import { setEditedUnitDataToSaveForSettingsTab } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import { setTriggeringAmountCalculation } from "../../../../../../redux/EditMasterExpress/EditMasterExpressInvoiceTabSlice";

const SettingsTabColumn1 = ({ styles }) => {
  const dispatch = useDispatch();
  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  //Local States
  const [reload, setReload] = useState(false);
  const [returns, setReturns] = useState(false);
  const [flatbed, setFlatbed] = useState(false);
  const [twoAsThree, setTwoAsThree] = useState(false);
  const [requireFlatbed, setRequireFlatbed] = useState(false);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setReload(selectedUnitData?.editMasterExpressSettingsTabDTO?.reload || false);
      setFlatbed(selectedUnitData?.editMasterExpressSettingsTabDTO?.flatbed || false);
      setTwoAsThree(selectedUnitData?.editMasterExpressSettingsTabDTO?.twoAsThree || false);
      setRequireFlatbed(selectedUnitData?.editMasterExpressSettingsTabDTO?.requireFlatbed || false);
      setReturns(selectedUnitData?.editMasterExpressSettingsTabDTO?.returnRates || false);
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  useEffect(() => {
    dispatch(setIsUnitReload(reload));
    // eslint-disable-next-line
  }, [reload]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForSettingsTab({
        reload: reload,
        returns: returns,
        returnRates: returns,
        flatbed: flatbed,
        twoAsThree: twoAsThree,
        requireFlatbed: requireFlatbed,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, flatbed, twoAsThree, requireFlatbed, returns]);

  return (
    <Col xs={3}>
      {/* ********************* */}
      {/* Reload */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Reload</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant}
            value={reload}
            checked={reload}
            onChange={(e) => {
              setReload(e.target.checked);

              setTimeout(() => {
                dispatch(setTriggeringAmountCalculation());
                dispatch(setFlagChanged("reloadChanged"));
              }, 0);

              if (!e.target.checked) {
                setReturns(false);
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Return Rates</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          {/* <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" /> */}
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || !reload}
            checked={returns}
            onChange={(e) => {
              setReturns(e.target.checked);

              setTimeout(() => {
                dispatch(setTriggeringAmountCalculation());
                dispatch(setFlagChanged("returnChanged"));
              }, 0);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Multi Unit Load */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
        ${selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK != null ? "" : "hide-elements"}`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Multi Unit Load</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressSettingsTabDTO?.multiUnit}
            checked={selectedUnitData?.editMasterExpressSettingsTabDTO?.multiUnit}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Units Per Dispatch */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK != null ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Units Per Dispatch</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0">
          <input
            className={`customFormControl`}
            type="test"
            disabled
            value={selectedUnitData?.editMasterExpressSettingsTabDTO?.unitsPerDispatch || ""}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Multi Unit Load */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK != null ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Multi Unit Load</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="test"
            disabled
            value={selectedUnitData?.editMasterExpressSettingsTabDTO?.cityStateCode || ""}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Current Load Units */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK != null ? "" : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Current Load Units</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0">
          <input
            className={`customFormControl`}
            type="test"
            disabled
            value={selectedUnitData?.editMasterExpressSettingsTabDTO?.currentUnits || ""}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* 2 Unit Flatbed */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK !== null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitsPerDispatch === 2
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>2 Unit Flatbed</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={flatbed}
            checked={flatbed}
            onChange={(e) => {
              setFlatbed(e.target.checked);
              if (!e.target.checked) {
                setTwoAsThree(false);
              }
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Invoice 2 as 3 */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0  ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK !== null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitsPerDispatch === 2
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Invoice 2 as 3</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail || !flatbed}
            value={twoAsThree}
            checked={twoAsThree}
            onChange={(e) => {
              if (flatbed) {
                setTwoAsThree(e.target.checked);
              } else {
                setTwoAsThree(false);
              }
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
      {/* Require Flatbed */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitMultiLoadPK === null &&
          selectedUnitData?.editMasterExpressSettingsTabDTO?.unitTypeTowable
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Require Flatbed</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={viewDetail}
            value={requireFlatbed}
            checked={requireFlatbed}
            onChange={(e) => {
              setRequireFlatbed(e.target.checked);
            }}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Latitude */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Latitude</Form.Label>
        </Col>
        <Col xs={4} md={4} sm={4} className="p-0">
          <input
            className={`customFormControl`}
            disabled
            value={selectedUnitData?.editMasterExpressSettingsTabDTO?.latitude || ""}
          />
        </Col>
      </Form.Group>
      {/* ********************* */}
      {/* Longitude */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Longitude</Form.Label>
        </Col>

        <Col xs={4} md={4} sm={4} className="p-0">
          <input
            className={`customFormControl`}
            disabled
            value={selectedUnitData?.editMasterExpressSettingsTabDTO?.longitude || ""}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default SettingsTabColumn1;
