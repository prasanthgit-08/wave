import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import TransportCompanysLookup from "../../../LookupScreens/TransportCompanys/TransportCompanysLookup";
import {
  setCheckAmount,
  setReason,
  setTransportCompanyId,
  setTransportCompanyInput,
} from "../../../../redux/PrintCheckSlice";
import TransportCompanysService from "../../../../services/TransportCompanysService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/common/input";

const TransportCompanyContent = () => {
  const navigate = useNavigate();
  const companyData = useSelector((state) => state.printCheckReducer.companyData);
  const source = useSelector((state) => state.printCheckReducer.source);
  const who = useSelector((state) => state.printCheckReducer.who);
  const dispatch = useDispatch();
  const [transportCompanyData, setTransportCompanyData] = useState([]);
  const [transportCompanyLoading, setTransportCompanyLoading] = useState(false);
  const [transportCompanySelection, setTransportCompanySelection] = useState(false);
  const transportCompanyId = useSelector((state) => state.printCheckReducer.transportCompanyId);
  const transportCompanyInput = useSelector((state) => state.printCheckReducer.transportCompanyInput);
  const reason = useSelector((state) => state.printCheckReducer.reason);
  const checkAmount = useSelector((state) => state.printCheckReducer.checkAmount);
  const printCheckFlag = useSelector((state) => state.printCheckReducer.printCheckFlag);
  const transportCompanyLookupSelection = (data) => {
    dispatch(setTransportCompanyInput(data.name));
    dispatch(setTransportCompanyId(data.transportCompanyPK));
    setTransportCompanySelection(false);
  };

  const handleTransportModalShow = () => {
    setTransportCompanySelection(true);
  };
  const transportCompanyModalHide = () => {
    setTransportCompanySelection(false);
  };

  const fetchTransportCompanyAuto = (string) => {
    setTransportCompanyLoading(true);
    TransportCompanysService.getTransportCompanyForAuto(string)
      .then((response) => {
        const data = response.data;
        const transportCompanyList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));

        setTransportCompanyData(transportCompanyList);
      })
      .catch((err) => {
        setTransportCompanyLoading(false);
      })
      .finally(() => {
        setTransportCompanyLoading(false);
      });
  };
  const isNumber = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  useEffect(() => {
    if (!printCheckFlag) {
      navigate(`/print-check-options-screen`);
    }
  }, [printCheckFlag]);

  useEffect(() => {
    if (!transportCompanyId) {
      dispatch(setCheckAmount(""));
      dispatch(setReason(""));
    }
  }, [transportCompanyId]);
  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label
                  htmlFor="name"
                  hidden={companyData?.allDriversPayTaxable}
                  className="col-form-label dealer-label"
                >
                  <Form.Label
                    className="col-form-label dealer-label"
                    hidden={companyData?.allDriversPayTaxable}
                  ></Form.Label>
                  Source
                </Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0">
                <CustomRadioGroup
                  name="Type1"
                  horizontal
                  horizontalAlignmentClassName={"me-4"}
                  options={["Taxable", "Reimbursement"]}
                  selectedOption={source}
                  disabled
                  hidden={companyData?.allDriversPayTaxable}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Who</Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className="p-0">
                <CustomRadioGroup
                  name="Type"
                  horizontal
                  horizontalAlignmentClassName={"me-4"}
                  options={["Driver", "Transport Company", "Miscellaneous"]}
                  selectedOption={who}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Transport Company</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex`}>
                <AutoCompleteDropdown
                  arrayList={transportCompanyData}
                  searchString={transportCompanyInput}
                  renderItemId={(data) => data.transportCompanyPK}
                  renderItemField={(data) => data.name}
                  handleSearchString={(string) => dispatch(setTransportCompanyInput(string))}
                  fetchDataBySearchString={fetchTransportCompanyAuto}
                  onSelect={transportCompanyLookupSelection}
                  selectedId={transportCompanyId}
                  loading={transportCompanyLoading}
                  clearInputCallback={() => {
                    dispatch(setTransportCompanyId(null));
                  }}
                  className={`customFormControl ${transportCompanyId ? "borderGreen" : "borderRed"}`}
                />
                <LookupButton onClick={handleTransportModalShow} />
              </Col>
            </Form.Group>

            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Check Amount</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className={`p-0 d-flex w-75px`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={checkAmount}
                  disabled={!transportCompanyId}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setCheckAmount(isNumber(e.target.value)));
                  }}
                  className={`customFormControl ${
                    !transportCompanyId ? "" : checkAmount && checkAmount > 0 ? "borderGreen" : "borderRed"
                  }`}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reason</Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className={`p-0 d-flex `}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={reason}
                  maxLength={60}
                  disabled={!transportCompanyId}
                  onChange={(e) => {
                    dispatch(setReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                  }}
                  className={`customFormControl ${
                    !transportCompanyId ? "" : reason ? "borderGreen" : "borderRed"
                  }`}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <TransportCompanysLookup
          show={transportCompanySelection}
          onHide={transportCompanyModalHide}
          renderItemId={(data) => data.transportCompanysPK}
          handleLookupSelection={transportCompanyLookupSelection}
          MaintenanceProgram
        />
      </div>
    </div>
  );
};

export default TransportCompanyContent;
