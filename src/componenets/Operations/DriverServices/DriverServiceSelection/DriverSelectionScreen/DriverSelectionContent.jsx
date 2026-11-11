import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import DriverSelectionListing from "./DriverSelectionListing";
import {
  setFirstName,
  setLastName,
  setPageNumber,
  setDriverId,
} from "../../../../../redux/DriverServiceSlice";
import { useDispatch, useSelector } from "react-redux";
import LookupButton from "../../../../common/LookupButton";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";

function DriverSelectionContent({ loader }) {
  const dispatch = useDispatch();
  const [driverSelection, setDriverSelection] = useState(false);

  const { firstName, lastName, pageNumber, totalElements, totalPages, driverData } = useSelector(
    (state) => state.driverServicesSlice
  );

  const driverlookupView = () => {
    setDriverSelection(true);
  };

  const driverSelectionModalHide = () => {
    setDriverSelection(false);
  };

  const handleDriverLookupSelection = (driver) => {
    dispatch(setFirstName(driver.firstName));
    dispatch(setLastName(driver.lastName));
    dispatch(setDriverId(driver.driverPK));
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
    <div className="shadow-sm rounded border" style={{ minHeight: "669px" }}>
      <Col className="p-15 mt-5" md={10}>
        <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
          <Col xs={3} sm={3} className="p-0 text-end">
            <Form.Label className="col-form-label me-4">Driver</Form.Label>
          </Col>

          <Col xs={3} md={3} sm={3} className="p-0 ">
            <input
              type="text"
              className="form-controlDriverService"
              placeholder="ENTER FIRST NAME"
              onChange={(e) => {
                dispatch(setFirstName(e.target.value));
                dispatch(setPageNumber(0));
              }}
              value={firstName}
            />
          </Col>
          <Col xs={5} md={5} sm={5} className="d-flex" style={{ width: "360px" }}>
            <input
              type="text"
              className="form-controlDriverService"
              placeholder="ENTER LAST NAME"
              onChange={(e) => {
                dispatch(setLastName(e.target.value));
                dispatch(setPageNumber(0));
              }}
              value={lastName}
            />
            <LookupButton onClick={driverlookupView} />
          </Col>
        </Form.Group>
      </Col>

      <div className="mt-3 mx-2">
        <div className="d-flex border border-1 border-dark" style={{ height: "440px" }}>
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
  );
}

export default DriverSelectionContent;
