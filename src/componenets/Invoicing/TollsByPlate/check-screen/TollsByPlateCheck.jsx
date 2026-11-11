import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import DynamicTextFields from "../../../common/AutoWrapTextFields/DynamicTextFields";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../../../redux/Invoicing/TollsByPlateSlice";
import CheckPayToService from "../../../../services/CheckPayToService";

const TollsByPlateCheck = () => {
  const dispatch = useDispatch();

  const [checkPayList, setCheckPayList] = useState([]);
  const [checkSubDetails, setCheckSubDetails] = useState(Array(6).fill(""));
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);

  const {
    checkPayToFK,
    checkPayToValue,
    checkPayToName,
    checkPayToAddress1,
    checkPayToAddress2,
    checkPayToCity,
    checkPayToState,
    checkPayToZip,
    checkPayToPostalCodePK,
    checkPayToCanadian,
    checkLoading,
  } = useSelector((state) => state.tollsByPlate);

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const fetchCheckPayToData = (search) => {
    CheckPayToService.fetchCheckPayToAutoComplete(search).then(({ data }) => {
      setCheckPayList(data?.content);
    });
  };

  const onSelectionCheckPay = (record) => {
    updateData("checkPayToFK", record.id);
    updateData("checkPayToValue", record.description);
    updateData("checkPayToCanadian", record.canadian);
    updateData("checkPayToName", record.name);
    updateData("checkPayToAddress1", record.address1);
    updateData("checkPayToAddress2", record.address2);
    updateData("checkPayToState", record.stateCode);
    updateData("checkPayToCity", record.city);
    updateData("checkPayToZip", record.postalCode);
    updateData("checkPayToPostalCodePK", "temp");
  };

  const onAutocompleteClear = () => {
    updateData("checkPayToFK", null);
    updateData("checkPayToName", "");
    updateData("checkPayToAddress1", "");
    updateData("checkPayToAddress2", "");
    updateData("checkPayToState", "");
    updateData("checkPayToCity", "");
    updateData("checkPayToZip", "");
    updateData("checkPayToCanadian", false);
    updateData("checkPayToPostalCodePK", null);
  };

  useEffect(() => {
    updateData("checkSubDetails", checkSubDetails);
  }, [checkSubDetails]);

  return (
    <div className="p-2 ps-2" style={{ height: "440px" }}>
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row>
              {checkLoading && (
                <div className="fade modal-backdrop show">
                  <div className="pos-center">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
              <Col xs={12}>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Check Pay To's</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <AutoCompleteDropdown
                      arrayList={checkPayList}
                      searchString={checkPayToValue}
                      renderItemId={(checkPay) => checkPay.id}
                      renderItemField={(checkPay) => checkPay.description}
                      handleSearchString={(str) => {
                        updateData("checkPayToValue", str);
                      }}
                      fetchDataBySearchString={(string) => {
                        fetchCheckPayToData(string);
                      }}
                      onSelect={(checkPay) => {
                        onSelectionCheckPay(checkPay);
                      }}
                      selectedId={checkPayToFK}
                      clearInputCallback={() => {
                        onAutocompleteClear();
                      }}
                      className={`customFormControl ${
                        checkPayToName && checkPayToAddress1 && checkPayToPostalCodePK && !checkPayToFK
                          ? ""
                          : checkPayToFK
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}>Check Pay To The Order Of</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      name="poNumber"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={checkPayToName}
                      className={`customFormControl ${
                        checkPayToFK ? "" : checkPayToName?.trim() ? "borderGreen" : "borderRed"
                      }`}
                      onChange={(e) => {
                        updateData("checkPayToName", e.target.value);
                      }}
                      disabled={checkPayToFK}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}></Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      name="poNumber"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={checkPayToAddress1}
                      className={`customFormControl ${
                        checkPayToFK ? "" : checkPayToAddress1?.trim() ? "borderGreen" : "borderRed"
                      }`}
                      onChange={(e) => {
                        updateData("checkPayToAddress1", e.target.value);
                      }}
                      disabled={checkPayToFK}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}></Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className={`customFormControl `}
                      name="poNumber"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                      value={checkPayToAddress2}
                      disabled={checkPayToFK}
                      onChange={(e) => {
                        updateData("checkPayToAddress2", e.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col xs={12} md={12} sm={12} className="p-0">
                    <PostalCodeComponent
                      hideLabel
                      labelColNumber={3}
                      city={checkPayToCity}
                      stateCode={checkPayToState}
                      postalCode={checkPayToZip}
                      postalCodePK={checkPayToPostalCodePK}
                      disabled={checkPayToFK}
                      isOptional={checkPayToFK}
                      setStateCode={(str) => {
                        updateData("checkPayToState", str);
                      }}
                      setCity={(str) => {
                        updateData("checkPayToCity", str);
                      }}
                      setPostalCodePK={(str) => {
                        updateData("checkPayToPostalCodePK", str);
                      }}
                      setPostalCode={(str) => {
                        updateData("checkPayToZip", str);
                      }}
                      setPostalValues={setPostalValues}
                      postalOptions={postalOptions}
                      canadian={checkPayToCanadian}
                      setCanadian={(val) => {
                        updateData("checkPayToCanadian", val);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="align-items-center row invisible  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`customColFormLabel`}></Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      className={`customFormControl 
            `}
                      name="poNumber"
                      type="text"
                      autoComplete="off"
                      aria-autocomplete="list"
                      maxLength={30}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="align-items-start row  m-l-0 m-r-0 ms-0">
                  <Col sm={3} md={3} xs={3} className="p-0 d-flex flex-column align-items-start">
                    <Form.Label className={`customColFormLabel`}>Check Stub Detail</Form.Label>
                  </Col>

                  <Col xs={8} md={8} sm={8} className="p-0">
                    <DynamicTextFields
                      numFields={6}
                      maxCharLimit={70}
                      maxLimit={70}
                      inputValues={checkSubDetails}
                      setInputValues={setCheckSubDetails}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TollsByPlateCheck;
