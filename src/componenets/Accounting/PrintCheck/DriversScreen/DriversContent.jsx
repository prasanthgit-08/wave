import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import LookupButton from "../../../common/LookupButton";
import DriversList from "./DriversList";
import {
  setCheckAmount,
  setDriverId,
  setFirstName,
  setLastName,
  setPageNumber,
  setReason,
} from "../../../../redux/PrintCheckSlice";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/common/input";
const DriversContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [driverSelection, setDriverSelection] = useState(false);
  const source = useSelector((state) => state.printCheckReducer.source);
  const who = useSelector((state) => state.printCheckReducer.who);
  const firstName = useSelector((state) => state.printCheckReducer.firstName);
  const lastName = useSelector((state) => state.printCheckReducer.lastName);
  const totalPages = useSelector((state) => state.printCheckReducer.totalPages);
  const totalElements = useSelector((state) => state.printCheckReducer.totalElements);
  const pageNumber = useSelector((state) => state.printCheckReducer.pageNumber);
  const driverData = useSelector((state) => state.printCheckReducer.driverData);
  const reason = useSelector((state) => state.printCheckReducer.reason);
  const checkAmount = useSelector((state) => state.printCheckReducer.checkAmount);
  const driverId = useSelector((state) => state.printCheckReducer.driverId);
  const printCheckFlag = useSelector((state) => state.printCheckReducer.printCheckFlag);
  const companyData = useSelector((state) => state.printCheckReducer.companyData);
  const [loading, setLoading] = useState(false);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverData,
  };
  const driverSelectionModalHide = () => {
    setDriverSelection(false);
  };
  const driverlookupView = () => {
    setDriverSelection(true);
  };
  const handleDriverLookupSelection = (driver) => {
    dispatch(setFirstName(driver.firstName));
    dispatch(setLastName(driver.lastName));
    dispatch(setDriverId(driver.driverPK));
    dispatch(setCheckAmount(""));
    dispatch(setReason(""));
    dispatch(setPageNumber(0));
    setDriverSelection(false);
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
    if (!driverId) {
      dispatch(setCheckAmount(""));
      dispatch(setReason(""));
    }
  }, [driverId]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-10">
          <Col xs={12}>
            <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label
                  htmlFor="name"
                  hidden={companyData?.allDriversPayTaxable}
                  className="col-form-label dealer-label"
                >
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
                  hidden={companyData?.allDriversPayTaxable}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label htmlFor="name" className="col-form-label dealer-label">
                  Who
                </Form.Label>
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
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Driver</Form.Label>
              </Col>

              <Col xs={3} md={3} sm={3} className="p-0 ">
                <Input
                  type="text"
                  className="form-controlDriverService"
                  placeholder="ENTER FIRST NAME"
                  onChange={(e) => {
                    dispatch(setFirstName(e.target.value));
                    dispatch(setPageNumber(0));
                  }}
                  value={firstName?.trim()}
                />
              </Col>
              <Col xs={4} md={4} sm={4} className="d-flex">
                <Input
                  type="text"
                  className="form-controlDriverService"
                  placeholder="ENTER LAST NAME"
                  onChange={(e) => {
                    dispatch(setLastName(e.target.value));
                    dispatch(setPageNumber(0));
                  }}
                  value={lastName?.trim()}
                />
                <LookupButton onClick={driverlookupView} />
              </Col>
            </Form.Group>
            <div className="mt-3 mx-2">
              <div className="d-flex border border-1 border-dark" style={{ height: "220px" }}>
                <div className="flex-grow-1">
                  <DriversList loading={loading} setLoading={setLoading} />
                </div>

                <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                  loading={loading}
                />
              </div>
            </div>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Check Amount</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className={`p-0 d-flex w-75px`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={checkAmount}
                  disabled={!driverId}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                      dispatch(setCheckAmount(isNumber(e.target.value)));
                  }}
                  className={`customFormControl ${!driverId ? "" : checkAmount && checkAmount > 0 ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={2} md={2} sm={2} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reason</Form.Label>
              </Col>
              <Col xs={7} md={7} sm={7} className={`p-0 d-flex`}>
                <Input
                  id="customer"
                  name="customer"
                  type="customer"
                  value={reason}
                  disabled={!driverId}
                  maxLength={60}
                  onChange={(e) => {
                    dispatch(setReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                  }}
                  className={`customFormControl ${!driverId ? "" : reason ? "borderGreen" : "borderRed"}`}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <DriverLookup
          show={driverSelection}
          onHide={driverSelectionModalHide}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverLookupSelection}
          MaintenanceProgram
          showActiveOnly
        />
      </div>
    </div>
  );
};

export default DriversContent;
