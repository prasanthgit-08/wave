import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LookupButton from "../../../common/LookupButton";
import ReprintDriverSelectionListing from "./ReprintDriverSelectionListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { setDriverId, setFirstName, setLastName, setPageNumber } from "../../../../redux/ReprintBolSlice";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import useDebouncer from "../../../../hooks/useDebouncer";
import LoadingIcon from "../../../common/LoadingIcon";
import { useNavigate } from "react-router-dom";

function ReprintDriverSelectionContent({ loader, nameFirst, setNameFirst, nameSecond, setNameSecond }) {
  const dispatch = useDispatch();

  const firstName = useSelector((state) => state.reprintBolReducer.firstName);
  const lastName = useSelector((state) => state.reprintBolReducer.lastName);
  const pageNumber = useSelector((state) => state.reprintBolReducer.pageNumber);
  const totalElements = useSelector((state) => state.reprintBolReducer.totalElements);
  const totalPages = useSelector((state) => state.reprintBolReducer.totalPages);
  const driverData = useSelector((state) => state.reprintBolReducer.driverData);
  const driverId = useSelector((state) => state.reprintBolReducer.driverId);
  const rePrintBOL = useSelector((state) => state.reprintBolReducer.rePrintBOL);
  const navigate = useNavigate();

  const [driverSelection, setDriverSelection] = useState(false);

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
    setDriverSelection(false);
  };

  useEffect(() => {
    if (!lastName) {
      dispatch(setFirstName(firstName));
      dispatch(setLastName(""));
    }
  }, [driverId, firstName, lastName, dispatch]);

  useEffect(() => {
    if (!driverId) {
      dispatch(setDriverId(null));
    }
  }, [driverId]);

  const handleChange = useDebouncer((e) => {
    dispatch(setLastName(e.target.value));
    dispatch(setPageNumber(0));
  }, 500);

  const handleFirstNameChange = useDebouncer((e) => {
    dispatch(setFirstName(e.target.value));
    dispatch(setPageNumber(0));
  }, 300);

  const paginationProps = {
    loader,
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverData,
  };

  useEffect(() => {
    if (!rePrintBOL) {
      navigate("/reprint-selection-screen");
    }
  }, [rePrintBOL]);

  return (
    <div className="shadow-sm rounded border" style={{ height: "379px" }}>
      {loader && <LoadingIcon />}
      <Col className="p-15" xs={10}>
        <Form.Group className="form-group align-items-center row m-l-0 m-r-0 my-2">
          <Col xs={3} className="p-0 text-end">
            {/* <Form.Label className="col-form-label me-4">Driver</Form.Label> */}

            <Form.Label className="customColFormLabel me-3">Driver</Form.Label>
          </Col>

          <Col xs={3} className="p-0">
            <input
              type="text"
              className="form-controlDriverService"
              placeholder="ENTER FIRST NAME"
              value={nameFirst}
              style={{ width: "171px" }}
              onChange={(e) => {
                setNameFirst(e.target.value);
                handleFirstNameChange(e);
              }}
            />
          </Col>

          <Col xs={3} className="d-flex" style={{ marginLeft: "-28px" }}>
            <input
              type="text"
              className="form-controlDriverService"
              placeholder="ENTER LAST NAME"
              value={nameSecond}
              onChange={(e) => {
                setNameSecond(e.target.value);
                handleChange(e);
              }}
            />
          </Col>
          <LookupButton onClick={driverlookupView} style={{ marginLeft: "-2px" }} />
        </Form.Group>
      </Col>

      <div className="my-2 mx-2">
        <div className="d-flex border border-1 border-dark" style={{ height: "295px" }}>
          <div className="flex-grow-1">
            <ReprintDriverSelectionListing loader={loader} />
          </div>

          <PaginationComponent
            {...paginationProps}
            firstPage
            lastPage

            singleArrowUp
            singleArrowDown
          />
        </div>

        <DriverLookup
          show={driverSelection}
          onHide={driverSelectionModalHide}
          renderItemId={(driver) => driver.driverPK}
          handleLookupSelection={handleDriverLookupSelection}
          MaintenanceProgram
          setNameFirst={setNameFirst}
          setNameSecond={setNameSecond}
        />
      </div>
    </div>
  );
}

export default ReprintDriverSelectionContent;
