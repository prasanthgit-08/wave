import React, { useEffect, useState } from "react";
import ReportComponent from "../../common/ReportComponent";
import * as yup from "yup";
import { useFormik } from "formik";
import SpecialCodeLookup from "../../LookupScreens/SpecialCode/SpecialCodeLookup";
import { Col, Form, Row } from "react-bootstrap";
import CustomRadioGroup from "../../common/CustomRadioGroup";
import SpecialCodeSelector from "./Units/HotListingReport/SpecialCodeSelector";
import SpecialCodesService from "../../../services/SpecialCodesService";

const validationSchema = yup.object().shape({
  Division: yup.string(),
  source: yup.string(),
  minimumPriority: yup.number(),
  specialCode1: yup.number(),
  specialCode1Input: yup.string(),
  specialCode2: yup.number(),
  specialCode2Input: yup.string(),
  specialCode3: yup.number(),
  specialCode3Input: yup.string(),
  specialCode4: yup.number(),
  specialCode4Input: yup.string(),
});

const TestReport = () => {
  const [specialCode1List, setSpecialCode1List] = useState([]);
  const [specialCode2List, setSpecialCode2List] = useState([]);
  const [specialCode3List, setSpecialCode3List] = useState([]);
  const [specialCode4List, setSpecialCode4List] = useState([]);
  const [showSpecialCodeLookup1, setShowSpecialCodeLookup1] = useState(false);
  const [showSpecialCodeLookup2, setShowSpecialCodeLookup2] = useState(false);
  const [showSpecialCodeLookup3, setShowSpecialCodeLookup3] = useState(false);
  const [showSpecialCodeLookup4, setShowSpecialCodeLookup4] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);

  const formik = useFormik({
    initialValues: {
      Division: "ALL",
      source: "Both",
      minimumPriority: 9,
      specialCode1: null,
      specialCode1Input: "",
      specialCode2: null,
      specialcode2Input: "",
      specialCode3: null,
      specialCode3Input: "",
      specialCode4: null,
      specialCode4Input: "",
    },
    validationSchema: validationSchema,
  });

  const { values, setValues, setFieldValue, initialValues } = formik;

  const {
    Division,
    source,
    minimumPriority,
    specialCode1,
    specialCode1Input,
    specialCode2,
    specialCode2Input,
    specialCode3,
    specialCode3Input,
    specialCode4,
    specialCode4Input,
  } = values;

  const handleSpecialCodeSelection = (code, id, input) => {
    setValues({
      ...values,
      [id]: code.specialCodePK,
      [input]: code.code?.trim(),
    });
    setShowSpecialCodeLookup1(false);
    setShowSpecialCodeLookup2(false);
    setShowSpecialCodeLookup3(false);
    setShowSpecialCodeLookup4(false);
  };

  const fetchSpecialCode = (string, setter) => {
    SpecialCodesService.getSpecialCodeForAuto(string)
      .then((response) => {
        setter && setter(response?.data?.content);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const params = {
    Division,
    Source: source,
    MinimumPriority: minimumPriority,
    SpecialCode1: specialCode1Input || "",
    SpecialCode2: specialCode2Input || "",
    SpecialCode3: specialCode3Input || "",
    SpecialCode4: specialCode4Input || "",
  };

  const getLookup = (show, setter, specialCode, specialCodeInput) => {
    return (
      <SpecialCodeLookup
        show={show}
        MaintenanceProgram
        renderItemId={(item) => item.specialCodePK}
        renderItemField={(item) => item.description}
        onHide={() => {
          setter && setter(false);
        }}
        handleLookupSelection={(e) => handleSpecialCodeSelection(e, [specialCode], [specialCodeInput])}
      />
    );
  };

  const body = (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-5 w-100 mt-0 m-l-10">
            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-3">
              <Col xs={1} className="p-0">
                <Form.Label className="customColFormLabel">Division</Form.Label>
              </Col>

              <Col xs={9} className="p-0 m-l-50">
                <CustomRadioGroup
                  name="Division"
                  horizontal
                  horizontalAlignmentClassName="pe-4"
                  selectedOption={Division}
                  onChange={(value) => setFieldValue("Division", value)}
                  options={[
                    { value: "ALL", label: "All", width: "70px" },
                    { value: "Driveaway", label: "Driveaway", disabled: false },
                    { value: "Towaway", label: "Towaway", disabled: false },
                    { value: "Flatbed", label: "Flatbed", disabled: false },
                    { value: "PopUp", label: "Pop Up    ", disabled: false },
                    { value: "TruckCamper", label: "Truck Camper", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 mt-4">
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label className="customColFormLabel">Source</Form.Label>
              </Col>

              <Col sm={9} md={9} xs={9} className="p-0 m-l-50">
                <CustomRadioGroup
                  name="source"
                  horizontal
                  horizontalAlignmentClassName="pe-3"
                  selectedOption={source}
                  onChange={(value) => setFieldValue("source", value)}
                  options={[
                    { value: "Both", label: "Both", width: "70px" },
                    { value: "Outbound", label: "Outbound", width: "95px" },
                    { value: "Reload", label: "Reload", disabled: false },
                  ]}
                />
              </Col>
            </Form.Group>

            <Form.Group className={` m-b-10 align-items-center row  m-l-0 m-r-0 mt-4 `}>
              <Col sm={1} md={1} xs={1} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Minimum
                </Form.Label>
              </Col>

              <Col xs={5} md={5} style={{ width: "70px", marginLeft: "38px" }}>
                <input
                  className={`customFormControl`}
                  id="minimumPriority"
                  name="minimumPriority"
                  type="number"
                  value={minimumPriority}
                  onChange={(e) => {
                    setFieldValue("minimumPriority", e.target.value);
                  }}
                  min={1}
                  max={9}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Row className="mt-4">
              <Col md={6} xs={6}>
                <SpecialCodeSelector
                  label="Special Code"
                  list={specialCode1List}
                  input={specialCode1Input}
                  selectedId={specialCode1}
                  fieldName="specialCode1"
                  inputName="specialCode1Input"
                  setFieldValue={(value) => setFieldValue("specialCode1", value)}
                  setList={setSpecialCode1List}
                  setId={(value) => setFieldValue("specialCode1", value)}
                  fetchData={fetchSpecialCode}
                  handleSelection={handleSpecialCodeSelection}
                  onLookupClick={() => setShowSpecialCodeLookup1(true)}
                />
              </Col>

              <Col md={6} xs={6}>
                <SpecialCodeSelector
                  list={specialCode2List}
                  input={specialCode2Input}
                  selectedId={specialCode2}
                  fieldName="specialCode2"
                  inputName="specialCode2Input"
                  setFieldValue={(value) => setFieldValue("specialCode2", value)}
                  setList={setSpecialCode2List}
                  setId={(value) => setFieldValue("specialCode2", value)}
                  fetchData={fetchSpecialCode}
                  handleSelection={handleSpecialCodeSelection}
                  onLookupClick={() => setShowSpecialCodeLookup2(true)}
                  showLabel={false} // hides label if not needed
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6} xs={6}>
                <SpecialCodeSelector
                  list={specialCode3List}
                  input={specialCode3Input}
                  selectedId={specialCode3}
                  fieldName="specialCode3"
                  inputName="specialCode3Input"
                  setFieldValue={(value) => setFieldValue("specialCode3", value)}
                  setList={setSpecialCode3List}
                  setId={(value) => setFieldValue("specialCode3", value)}
                  fetchData={fetchSpecialCode}
                  handleSelection={handleSpecialCodeSelection}
                  onLookupClick={() => setShowSpecialCodeLookup3(true)}
                  showLabel={true}
                />
              </Col>

              <Col md={6} xs={6}>
                <SpecialCodeSelector
                  list={specialCode4List}
                  input={specialCode4Input}
                  selectedId={specialCode4}
                  fieldName="specialCode4"
                  inputName="specialCode4Input"
                  setFieldValue={(value) => setFieldValue("specialCode4", value)}
                  setList={setSpecialCode4List}
                  setId={(value) => setFieldValue("specialCode4", value)}
                  fetchData={fetchSpecialCode}
                  handleSelection={handleSpecialCodeSelection}
                  onLookupClick={() => setShowSpecialCodeLookup4(true)}
                  showLabel={false}
                />
              </Col>
            </Row>

            {getLookup(
              showSpecialCodeLookup1,
              setShowSpecialCodeLookup1,
              "specialCode1",
              "specialCode1Input"
            )}
            {getLookup(
              showSpecialCodeLookup2,
              setShowSpecialCodeLookup2,
              "specialCode2",
              "specialCode2Input"
            )}
            {getLookup(
              showSpecialCodeLookup3,
              setShowSpecialCodeLookup3,
              "specialCode3",
              "specialCode3Input"
            )}
            {getLookup(
              showSpecialCodeLookup4,
              setShowSpecialCodeLookup4,
              "specialCode4",
              "specialCode4Input"
            )}
          </div>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    if (
      Division &&
      source &&
      minimumPriority &&
      (specialCode1 || specialCode2 || specialCode3 || specialCode4)
    ) {
      setIsButtonValid(true);
    } else {
      setIsButtonValid(false);
    }
  }, [Division, source, minimumPriority, specialCode1, specialCode2, specialCode3, specialCode4]);

  return (
    <ReportComponent
      Body={body}
      resetFormData={() => {
        setValues(initialValues);
      }}
      id={5}
      isTabValid={isButtonValid}
      payload={params}
    />
  );
};

export default TestReport;
