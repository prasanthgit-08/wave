import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DpuInstructionsService from "../../../../services/DpuInstructionsService";
import { useParams } from "react-router-dom";
import { setEditFormData, setViewDetail } from "../../../../redux/DpuInstructionsSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function DpuInstructionsViewContent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const editFormData = useSelector((state) => state.dpuInstructionsReducer.editFormData);
  const unitNumberPK = useSelector((state) => state.dpuInstructionsReducer.unitNumberPK);
  const [unitNumber, setUnitNumber] = useState("");
  const [model, setModel] = useState("");
  const [unitType, setUnitType] = useState("");
  const [specialCode, setSpecialCode] = useState("");
  const [pickUpYard, setPickUpYard] = useState("");
  const [pickUpYardRow, setPickUpYardRow] = useState("");
  const [pickUpYardPosition, setpickUpYardPosition] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [customerPDUInstructions, setCustomerPDUInstructions] = useState("");
  const [loadingGetbyid, setLoadingGetbyid] = useState(false);

  const fetchRecordById = (id) => {
    setLoadingGetbyid(true);
    DpuInstructionsService.getDPUInstructionsById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingGetbyid(false);
      });
  };

  useEffect(() => {
    setUnitNumber(editFormData !== null ? editFormData.unitNumber || "" : "");
    setModel(editFormData !== null ? editFormData.model || "" : "");
    setUnitType(editFormData !== null ? editFormData.unitTypeDescription || "" : "");
    setSpecialCode(editFormData !== null ? editFormData.specialCodeDescription || "" : "");
    setPickUpYard(editFormData !== null ? editFormData.yardName || "" : "");
    setPickUpYardRow(editFormData !== null ? editFormData.pickupYardRow || "" : "");
    setpickUpYardPosition(editFormData !== null ? editFormData.pickupYardPosition || "" : "");
    setName(editFormData !== null ? editFormData.deliveryName || "" : "");
    setAddress1(editFormData !== null ? editFormData.address1 || "" : "");
    setAddress2(editFormData !== null ? editFormData.address2 || "" : "");
    setCity(editFormData !== null ? editFormData.city || "" : "");
    setStateCode(editFormData !== null ? editFormData.stateCode || "" : "");
    setPostalCode(editFormData !== null ? editFormData.postalCode || "" : "");
    setCustomerPDUInstructions(editFormData !== null ? editFormData.customerDPUInstruction || "" : "");
  }, [editFormData]);

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
    }
  }, [id, unitNumberPK]);

  return (
    <div className="p-2">
      {loadingGetbyid && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight">
        <Row className="m-0 p-0">
          <Col xs={6}>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Unit Number
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  id=""
                  type="search"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitNumber}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Model
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  id="model"
                  value={model}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Unit Type
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  id="unitType"
                  maxLength={30}
                  value={unitType}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Special Code
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  maxLength={30}
                  value={specialCode}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Yard
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  value={pickUpYard}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Row/Position
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                <Col className="me-3" xs={3} style={{ width: "52px" }}>
                  <input
                    className="customFormControl"
                    type="text"
                    value={pickUpYardRow}
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                  />
                </Col>
                <Col xs={3} style={{ width: "52px" }}>
                  <input
                    className="customFormControl"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={pickUpYardPosition}
                    disabled
                  />
                </Col>
              </Col>
            </Form.Group>
            <div className="mt-1 invisible"> test </div>
            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Delivery
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  value={name}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  value={address1}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  value={address2}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <input
                  className="customFormControl"
                  type="text"
                  value={city}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
              <Col xs={1} md={1} sm={1} className="p-r-0">
                <input
                  className="customFormControl"
                  type="text"
                  value={stateCode}
                  maxLength={2}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
              <Col xs={2} md={2} sm={2} className="p-r-0">
                <input
                  className="customFormControl"
                  type="text"
                  value={postalCode}
                  maxLength={10}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>

          <Col xs={6}>
            <Form.Group className="mt-3 align-items-center   m-l-0 m-r-0">
              <Col xs={12} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label " style={{ fontSize: "14px" }}>
                  Customer DPU Instructions
                </Form.Label>
              </Col>

              <Col xs={11} className="p-0 mt-3 ">
                <textarea
                  className="w-100"
                  rows={26}
                  value={customerPDUInstructions}
                  style={{
                    resize: "none",
                    display: "fixed",
                    minHeight: "487px",
                    minWidth: "510px",
                    boxShadow: "none",
                    fontSize: "12px",
                  }}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DpuInstructionsViewContent;
