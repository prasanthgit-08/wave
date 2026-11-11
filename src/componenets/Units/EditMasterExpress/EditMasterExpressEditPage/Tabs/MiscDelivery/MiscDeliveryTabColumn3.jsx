import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DynamicTextFields from "../../../../../common/AutoWrapTextFields/DynamicTextFields";
import { setEditedUnitDataToSaveForMiscDeliveryTab } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const MiscDeliveryTabColumn3 = ({ styles }) => {
  const dispatch = useDispatch();
  //Local States
  const [hours1, setHours1] = useState("");
  const [hours2, setHours2] = useState("");
  const [hours3, setHours3] = useState("");
  const [otherText1, setOtherText1] = useState("");
  const [otherText2, setOtherText2] = useState("");
  const [otherText3, setOtherText3] = useState("");
  const [washInstructions1, setWashInstructions1] = useState("");
  const [washInstructions2, setWashInstructions2] = useState("");
  const [washInstructions3, setWashInstructions3] = useState("");
  const [washInstructions4, setWashInstructions4] = useState("");
  const [washInstructions5, setWashInstructions5] = useState("");
  const [washInstructions, setWashInstructions] = useState("");

  const [bolTextHoursInputValues, setBolTextHoursInputValues] = useState(Array(3).fill(""));
  const [bolTexMiscellaneousInputValues, setBolTexMiscellaneousInputValues] = useState(Array(3).fill(""));
  const [bolTextWashInstructions, setBolTextWashInstructions] = useState(Array(5).fill(""));

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  //Populating selected driver details
  useEffect(() => {
    if (selectedUnitData != null) {
      setHours1(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.hours1?.trim() || "");
      setHours2(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.hours2?.trim() || "");
      setHours3(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.hours3?.trim() || "");
      setOtherText1(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.otherText1?.trim() || "");
      setOtherText2(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.otherText2?.trim() || "");
      setOtherText3(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.otherText3?.trim() || "");
      setWashInstructions1(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.washInstructions1?.trim() || ""
      );
      setWashInstructions2(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.washInstructions2?.trim() || ""
      );
      setWashInstructions3(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.washInstructions3?.trim() || ""
      );
      setWashInstructions4(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.washInstructions4?.trim() || ""
      );
      setWashInstructions5(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.washInstructions5?.trim() || ""
      );
      setWashInstructions(
        selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.washInstructions?.trim() || ""
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnitData, viewDetail]);

  // edit/paste data passes to back end as array - BOL Text Hours
  useEffect(() => {
    const backendValues = [hours1, hours2, hours3];
    setBolTextHoursInputValues(backendValues);
  }, [hours1, hours2, hours3, selectedUnitData, viewDetail]);

  // edit/paste data passes to back end as array - BOL Text Miscellaneous
  useEffect(() => {
    const backendValues = [otherText1, otherText2, otherText3];
    setBolTexMiscellaneousInputValues(backendValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherText1, otherText2, otherText3, selectedUnitData, viewDetail]);

  // edit/paste data passes to back end as array - BOL Text Wash Instructions
  useEffect(() => {
    const backendValues = [
      washInstructions1,
      washInstructions2,
      washInstructions3,
      washInstructions4,
      washInstructions5,
    ];
    setBolTextWashInstructions(backendValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    selectedUnitData,
    viewDetail,
  ]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForMiscDeliveryTab({
        hours1: hours1,
        hours2: hours2,
        hours3: hours3,
        bolTextHours: bolTextHoursInputValues,
        otherText1: otherText1,
        otherText2: otherText2,
        otherText3: otherText3,
        bolTextMiscellaneous: bolTexMiscellaneousInputValues,
        washInstructions1: washInstructions1,
        washInstructions2: washInstructions2,
        washInstructions3: washInstructions3,
        washInstructions4: washInstructions4,
        washInstructions5: washInstructions5,
        bolTextWashInstructions: bolTextWashInstructions,
        washInstructions: washInstructions,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hours1,
    hours2,
    hours3,
    bolTextHoursInputValues,

    otherText1,
    otherText2,
    otherText3,
    bolTexMiscellaneousInputValues,

    washInstructions1,
    washInstructions2,
    washInstructions3,
    washInstructions4,
    washInstructions5,
    bolTextWashInstructions,

    washInstructions,
  ]);

  return (
    <Col xs={3}>
      {/* BOL Text - Hour's */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel mb-2`}>BOL Text - Hours</Form.Label>
        </Col>
      </Form.Group>
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={12} md={12} sm={12} className="p-0 w-315">
          <DynamicTextFields
            numFields={3}
            maxCharLimit={42}
            inputValues={bolTextHoursInputValues}
            setInputValues={setBolTextHoursInputValues}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>

      {/* BOL Text Other */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={6} md={6} xs={6} className="p-0">
          <Form.Label className={`customColFormLabel mb-2`}>BOL Text - Other</Form.Label>
        </Col>
      </Form.Group>
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={12} md={12} sm={12} className="p-0 w-315">
          <DynamicTextFields
            numFields={3}
            maxCharLimit={42}
            inputValues={bolTexMiscellaneousInputValues}
            setInputValues={setBolTexMiscellaneousInputValues}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>

      {/* BOL Text - Wash Instructions */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={6} md={6} xs={6} className="p-0">
          <Form.Label className={`customColFormLabel mb-2`}>BOL Text - Wash Instructions</Form.Label>
        </Col>
        <Col xs={12} md={12} sm={12} className="p-0"></Col>
      </Form.Group>
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={12} md={12} sm={12} className="p-0 w-315">
          <DynamicTextFields
            numFields={5}
            maxCharLimit={42}
            inputValues={bolTextWashInstructions}
            setInputValues={setBolTextWashInstructions}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>

      {/* Drivers Email-Wash Instructions */}
      <Form.Group className="mt-4 align-items-center   m-l-0 m-r-0 ms-0">
        <Col sm={6} md={6} xs={6} className="p-0">
          <Form.Label className={`customColFormLabel mb-1`}>Drivers Email-Wash Instructions</Form.Label>
        </Col>
        <Col xs={12} md={12} sm={12} className="p-0 w-315">
          <textarea
            rows={5}
            style={{ marginTop: "3px" }}
            className={`customFormControl h-100 `}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            name="washInstructions"
            value={washInstructions}
            disabled={viewDetail}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setWashInstructions(value);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default MiscDeliveryTabColumn3;
