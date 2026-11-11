import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Form } from "react-bootstrap";
import DriverSelectionLookupListing from "./DriverSelectionLookupListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import {
  setFirstNameFilter,
  setLastNameFilter,
  setPageNumber,
} from "../../../redux/LookupScreens/DriverLookupSlice";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";

function DriverSelectionLookupContent({
  renderItemId,
  companyName,
  handleLookupSelection,
  MaintenanceProgram,
  ShuttleProcess,
}) {
  const lookupProps = {
    renderItemId,
    companyName,
    handleLookupSelection,
    MaintenanceProgram,
    ShuttleProcess,
  };

  const pageNumber = useSelector((state) => state.driverLookup.pageNumber);
  const totalPages = useSelector((state) => state.driverLookup.totalPages);
  const allDriversData = useSelector((state) => state.driverLookup.allDriversData);
  const totalElements = useSelector((state) => state.driverLookup.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: allDriversData,
  };

  const dispatch = useDispatch();

  return (
    <div className="  border border-dark border-2 ">
      <Col className="p-15 mt-5 mb-3" md={7}>
        <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
          <Col xs={3} sm={3} className="p-0 text-end">
            <Form.Label className="col-form-label me-4">Driver</Form.Label>
          </Col>

          <Col xs={9} md={9} sm={9} className="p-0 d-flex">
            <input
              className="form-control"
              id="firstName"
              name="firstName"
              type="text"
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                dispatch(setFirstNameFilter(e.target.value));
                dispatch(setPageNumber(0));
              }}
            />
            <input
              className="form-control ms-4"
              id="lastName"
              name="lastName"
              type="text"
              maxLength={30}
              autoComplete="off"
              aria-autocomplete="list"
              onInput={(e) => {
                dispatch(setLastNameFilter(e.target.value));
                dispatch(setPageNumber(0));
              }}
            />
          </Col>
        </Form.Group>
      </Col>

      <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
        <div className="d-flex h-100">
          <div className="w-100">
            <DriverSelectionLookupListing {...lookupProps} />
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
            recordsPerPage={QuarterScreen_RecordsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default DriverSelectionLookupContent;
