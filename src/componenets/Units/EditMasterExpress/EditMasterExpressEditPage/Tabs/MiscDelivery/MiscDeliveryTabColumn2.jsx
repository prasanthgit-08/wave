import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DynamicTextFields from "../../../../../common/AutoWrapTextFields/DynamicTextFields";
import { setEditedUnitDataToSaveForMiscDeliveryTab } from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const MiscDeliveryTabColumn2 = ({ styles }) => {
  const dispatch = useDispatch();

  //Local States
  const [bolText1, setBolText1] = useState("");
  const [bolText2, setBolText2] = useState("");
  const [bolText3, setBolText3] = useState("");
  const [bolText4, setBolText4] = useState("");
  const [bolText5, setBolText5] = useState("");
  const [bolText6, setBolText6] = useState("");
  const [bolText7, setBolText7] = useState("");
  const [directions1, setDirections1] = useState("");
  const [directions2, setDirections2] = useState("");
  const [directions3, setDirections3] = useState("");
  const [directions4, setDirections4] = useState("");
  const [directions5, setDirections5] = useState("");
  const [directions6, setDirections6] = useState("");
  const [directions7, setDirections7] = useState("");
  const [directions, setDirections] = useState("");

  const [bolTextsInputValues, setBolTextsInputValues] = useState(Array(7).fill(""));
  const [bolTextDirectionsInputValues, setBolTextDirectionsInputValues] = useState(Array(6).fill(""));

  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  //Populating selected driver details
  useEffect(() => {
    if (selectedUnitData != null) {
      setBolText1(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.bolText1?.trim() || "");
      setBolText2(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.bolText2?.trim() || "");
      setBolText3(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.bolText3?.trim() || "");
      setBolText4(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.bolText4?.trim() || "");
      setBolText5(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.bolText5?.trim() || "");
      setBolText6(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.bolText6?.trim() || "");
      setBolText7(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.bolText7?.trim() || "");
      setDirections1(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions1?.trim() || "");
      setDirections2(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions2?.trim() || "");
      setDirections3(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions3?.trim() || "");
      setDirections4(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions4?.trim() || "");
      setDirections5(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions5?.trim() || "");
      setDirections6(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions6?.trim() || "");
      setDirections7(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions7?.trim() || "");
      setDirections(selectedUnitData?.editMasterExpressMiscDeliveryTabDTO?.directions?.trim() || "");
    }
  }, [selectedUnitData, viewDetail]);

  // edit/paste data passes to back end as array - BOL Text Hours
  useEffect(() => {
    const backendValues = [bolText1, bolText2, bolText3, bolText4, bolText5, bolText6, bolText7];
    setBolTextsInputValues(backendValues);
  }, [bolText1, bolText2, bolText3, bolText4, bolText5, bolText6, bolText7, selectedUnitData, viewDetail]);

  // edit/paste data passes to back end as array - BOL Text Directions
  useEffect(() => {
    const backendValues = [
      directions1,
      directions2,
      directions3,
      directions4,
      directions5,
      directions6,
      directions7,
    ];
    setBolTextDirectionsInputValues(backendValues);
  }, [
    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    selectedUnitData,
    viewDetail,
  ]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForMiscDeliveryTab({
        bolText1: bolText1,
        bolText2: bolText2,
        bolText3: bolText3,
        bolText4: bolText4,
        bolText5: bolText5,
        bolText6: bolText6,
        bolText7: bolText7,
        bolTexts: bolTextsInputValues,
        directions1: directions1,
        directions2: directions2,
        directions3: directions3,
        directions4: directions4,
        directions5: directions5,
        directions6: directions6,
        directions7: directions7,
        bolTextDirections: bolTextDirectionsInputValues,
        directions: directions,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    bolText1,
    bolText2,
    bolText3,
    bolText4,
    bolText5,
    bolText6,
    bolText7,
    bolTextsInputValues,

    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    directions7,
    bolTextDirectionsInputValues,

    directions,
  ]);

  return (
    <Col xs={3}>
      {/* BOL Text - Miscellaneous */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={5} md={5} xs={5} className="p-0">
          <Form.Label className={`customColFormLabel mb-2`}>BOL Text-Miscellaneous</Form.Label>
        </Col>
      </Form.Group>
      <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={12} md={12} sm={12} className="p-0">
          <DynamicTextFields
            numFields={7}
            maxCharLimit={42}
            inputValues={bolTextsInputValues}
            setInputValues={setBolTextsInputValues}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>

      {/* BOL Text - Directions */}
      <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel mb-2`}>BOL Text - Directions</Form.Label>
        </Col>
      </Form.Group>
      <Form.Group className="mt-1 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col xs={12} md={12} sm={12} className="p-0">
          <DynamicTextFields
            numFields={7}
            maxCharLimit={42}
            inputValues={bolTextDirectionsInputValues}
            setInputValues={setBolTextDirectionsInputValues}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>

      {/* Drivers Email-Directions */}
      <Form.Group className="mt-2 align-items-center   m-l-0 m-r-0 ms-0">
        <Col sm={5} md={5} xs={5} className="p-0">
          <Form.Label className={`customColFormLabel mb-1`}>Drivers Email - Directions</Form.Label>
        </Col>
        <Col xs={12} md={12} sm={12} className="p-0 ">
          <textarea
            rows={5}
            style={{ marginTop: "1px" }}
            className={`customFormControl h-100`}
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            name="hours"
            value={directions}
            disabled={viewDetail}
            onInput={(e) => {
              let value = e.target.value;
              if (value !== "") {
                if (/^[`\s!@#$%^&*()[\]{}.,;:'"<>?/|+_\\=\-~]/.test(value)) {
                  value = value.substring(1);
                }
              }
              setDirections(value);
            }}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default MiscDeliveryTabColumn2;
