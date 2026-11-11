import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import LookupButton from "../../../common/LookupButton";
import { PaginationComponent } from "../../../common/PaginationComponent";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import DriverSelectionListing from "./DriverSelectionListing";
import {
  setActiveDriver,
  setDriverId,
  setFirstName,
  setLastName,
  setPageNumber,
  setSelectedId,
} from "../../../../redux/DriverInvoiceSlice";

function DriverSelectionContent({ loader }) {
  const dispatch = useDispatch();
  const [driverSelection, setDriverSelection] = useState(false);
  const firstName = useSelector((state) => state.driverInvoiceReducer.firstName);
  const lastName = useSelector((state) => state.driverInvoiceReducer.lastName);
  const pageNumber = useSelector((state) => state.driverInvoiceReducer.pageNumber);
  const totalElements = useSelector((state) => state.driverInvoiceReducer.totalElements);
  const totalPages = useSelector((state) => state.driverInvoiceReducer.totalPages);
  const driverData = useSelector((state) => state.driverInvoiceReducer.driverData);

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
    dispatch(setSelectedId(driver.driverPK));
    dispatch(setActiveDriver(driver.active));
    setDriverSelection(false);
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverData,
  };
  return (
    <div className="p-0">
      <div className="p-15    " style={{ height: "665px" }}>
        <Col className="p-15 mt-5 " md={10}>
          <Form.Group
            className="form-group align-items-center row m-l-0 m-r-0 mb-3"
            style={{ width: "1000px" }}
          >
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label "></Form.Label>
            </Col>
            <Col xs={1} sm={1} className="p-0 text-end" style={{ width: "45px" }}>
              <Form.Label className="col-form-label me-4">Driver</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0 " style={{ width: "300px" }}>
              <input
                type="text"
                className="customFormControl"
                placeholder="ENTER FIRST NAME"
                onChange={(e) => {
                  dispatch(setFirstName(e.target.value));
                  dispatch(setPageNumber(0));
                }}
                value={firstName?.trim()}
              />
            </Col>
            <Col xs={4} md={4} sm={4} className="d-flex" style={{ width: "360px" }}>
              <input
                type="text"
                className="customFormControl"
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
        </Col>

        <div className="driverServiceSelectionTableHeight">
          <div className="d-flex border border-1 border-dark">
            <div className="flex-grow-1">
              <DriverSelectionListing loader={loader} />
            </div>

            <PaginationComponent
              {...paginationProps}
              firstPage
              lastPage
              tripleArrowUp
              tripleArrowDown
              doubleArrowUp
              doubleArrowDown
              singleArrowUp
              singleArrowDown
              loading={loader}
            />
          </div>
        </div>

        <DriverLookup
          show={driverSelection}
          onHide={driverSelectionModalHide}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverLookupSelection}
          MaintenanceProgram
        />
      </div>
    </div>
  );
}

export default DriverSelectionContent;
