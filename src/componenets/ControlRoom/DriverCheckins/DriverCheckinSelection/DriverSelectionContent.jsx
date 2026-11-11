import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DriverSelectionListing from "./DriverSelectionListing";
import {
  setCompanyFK,
  setCompanyName,
  setDriverId,
  setFirstName,
  setLastName,
  setPageNumber,
  setInitialApiLoader,
  setCompanyNames,
} from "../../../../redux/DriverCheckinSlice";
import { useDispatch, useSelector } from "react-redux";
import LookupButton from "../../../common/LookupButton";
import { PaginationComponent } from "../../../common/PaginationComponent";
import DriverCheckinService from "../../../../services/DriverCheckinService";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import LoadingIcon from "../../../common/LoadingIcon";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

function DriverSelectionContent({ loader }) {
  const dispatch = useDispatch();
  const [driverSelection, setDriverSelection] = useState(false);

  const firstName = useSelector((state) => state.driverCheckinReducer.firstName);
  const lastName = useSelector((state) => state.driverCheckinReducer.lastName);
  const driverId = useSelector((state) => state.driverCheckinReducer.driverId);
  const pageNumber = useSelector((state) => state.driverCheckinReducer.pageNumber);
  const totalElements = useSelector((state) => state.driverCheckinReducer.totalElements);
  const totalPages = useSelector((state) => state.driverCheckinReducer.totalPages);
  const driverData = useSelector((state) => state.driverCheckinReducer.driverData);
  const companyFK = useSelector((state) => state.driverCheckinReducer.companyFK);
  const initialApiLoader = useSelector((state) => state.driverCheckinReducer.initialApiLoader);
  const companyNames = useSelector((state) => state.driverCheckinReducer.companyNames);
  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);

  const [isInitialized, setIsInitialized] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  /**
   *  Fetch all companies
   **/

  const getCompanyNames = () => {
    setLoading(true);
    DelayProcessingService.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          dispatch(setCompanyNames(res?.data));

          const value = res?.data?.find((item) => item.LocalCompany === true);
          if (!companyFK) {
            dispatch(setCompanyFK(value.CompanyPK));
            dispatch(setCompanyName(value.Name));
            setLoading(false);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!companyFK) {
      setIsInitialized(false);
    }
  }, [companyFK]);

  useEffect(() => {
    if (!isInitialized) {
      if (companyNames.length === 0) {
        getCompanyNames();
      }
      setIsInitialized(true);
    }
  }, [companyNames, companyFK, isInitialized]);

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

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverData,
  };

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight" style={{ height: "601px" }}>
        {(initialApiLoader || loading) && <LoadingIcon />}

        <Col className="p-15 mt-5 " md={10}>
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
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
                value={firstName?.trim()}
              />
            </Col>

            <Col xs={3} md={3} sm={3} className="d-flex">
              <input
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

          <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0 text-end">
              <Form.Label className="col-form-label me-4">Company</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0 ">
              <Form.Select
                className="customFormControl p-0"
                value={`${companyFK}-${companyName}`}
                onChange={(e) => {
                  const [companyId, companyName] = e.target.value.split("-");
                  dispatch(setCompanyName(companyName));
                  dispatch(setCompanyFK(companyId));
                  dispatch(setPageNumber(0));
                }}
              >
                {companyNames.map((item) => (
                  <option value={`${item.CompanyPK}-${item.Name}`} key={item.CompanyPK}>
                    {item.Name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
        </Col>

        <div className="driverServiceSelectionTableHeight p-15">
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
            />
          </div>
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
