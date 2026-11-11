/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import EditShuttleUnitListing from "./EditShuttleUnitListing";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import {
  setUnitNumberInput,
  setPageNumber,
  setUnitsLoading,
  setUnitNumberList,
  setTotalElements,
  setTotalPages,
  setChangeColor,
  setUnitShuttlePK,
  setUnitNumberPK,
  setUnitNumberBrowse,
  setCompanyFK,
  setCompanyName,
  setUnitNumberLast5,
  setIsCrossDB,
  setCurrentCompanyName,
  setSisterUnitShuttleFK,
  setUnitShuttleData,
  setShuttleType,
  setEditReason,
} from "../../../../../redux/EditShuttleSlice";
import LookupButton from "../../../../common/LookupButton";
import EditShuttleService from "../../../../../services/shuttle/process/EditShuttleService";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useNavigate } from "react-router-dom";
import UnitSelectionLookup from "../../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import LoadingIcon from "../../../../common/LoadingIcon";
import {
  AutoCompleteDropdown_No_Of_Records,
  Initial_Page_Number,
  NumberOfRecords_PerPage_For_EditShuttleUnit,
} from "../../../../../services/constants/applicationConstants";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

function EditShuttleUnitContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [unitLoading, setUnitLoading] = useState(false);
  const [unitListingLoading, setUnitListingLoading] = useState(false);

  const driverNameInput = useSelector((state) => state.editShuttleReducer.driverNameInput);
  const driverData = useSelector((state) => state.editShuttleReducer.driverData);
  const fromDate = useSelector((state) => state.editShuttleReducer.fromDate);
  const toDate = useSelector((state) => state.editShuttleReducer.toDate);
  const unitNumberList = useSelector((state) => state.editShuttleReducer.unitNumberList);
  const unitNumberBrowse = useSelector((state) => state.editShuttleReducer.unitNumberBrowse);
  const unitNumberInput = useSelector((state) => state.editShuttleReducer.unitNumberInput);
  const unitNumberPK = useSelector((state) => state.editShuttleReducer.unitNumberPK);
  const companyName = useSelector((state) => state.editShuttleReducer.companyName);
  const companyFK = useSelector((state) => state.editShuttleReducer.companyFK);
  const unitNumberLast5 = useSelector((state) => state.editShuttleReducer.unitNumberLast5);
  const currentCompanyName = useSelector((state) => state.editShuttleReducer.currentCompanyName);
  const currentCompanyFetch = useSelector((state) => state.editShuttleReducer.currentCompanyFetch);
  const pageNumber = useSelector((state) => state.editShuttleReducer.pageNumber);
  const totalPages = useSelector((state) => state.editShuttleReducer.totalPages);
  const totalElements = useSelector((state) => state.editShuttleReducer.totalElements);

  // When the local company is about to be fetched, hold the unit listing until it resolves,
  // otherwise the listing is called once with an empty company and again with the company.
  const [companyReady, setCompanyReady] = useState(() => !(currentCompanyFetch && !companyName));

  /**
   *  Unit Number Autocomplete Fetch function
   **/
  const getAllUnitNumbers = (string, unitNumberLast5, companyName) => {
    let last5 = unitNumberLast5;
    if (unitNumberPK) {
      last5 = "";
    }
    if (driverData && fromDate && toDate) {
      setUnitLoading(true);
      EditShuttleService.getAllUnitNumbers(
        string,
        last5,
        Initial_Page_Number,
        AutoCompleteDropdown_No_Of_Records,
        driverData,
        fromDate,
        toDate,
        companyName
      )
        .then((response) => {
          const data = response.data.content;
          const unitsNumberList = data?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
          dispatch(setUnitNumberList(unitsNumberList));
          setUnitLoading(false);
        })
        .catch((error) => {
          setUnitLoading(false);
        });
    }
  };

  /**
   *  Unit Selection Browse Fetch function
   **/
  const getAllUnitNumbersList = () => {
    let last5 = unitNumberLast5;
    let unitNumber = unitNumberInput;
    if (driverData && fromDate && toDate) {
      setUnitListingLoading(true);
      EditShuttleService.getAllUnitNumbersForListing(
        unitNumber,
        last5,
        pageNumber,
        NumberOfRecords_PerPage_For_EditShuttleUnit,
        driverData,
        fromDate,
        toDate,
        companyName
      )
        .then((response) => {
          const { data } = response;
          if (data) {
            const unitsList = data.content?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
            dispatch(setUnitNumberBrowse(unitsList || []));
            dispatch(setTotalElements(data.totalElements || 0));
            dispatch(setTotalPages(data.totalPages || 0));
          } else {
            dispatch(setUnitNumberBrowse([]));
            dispatch(setTotalElements(0));
            dispatch(setTotalPages(0));
          }
          setUnitListingLoading(false);
          dispatch(setUnitsLoading(false));
        })
        .catch((error) => {
          dispatch(setUnitsLoading(false));
          setUnitListingLoading(false);
        });
    }
  };

  /**
   * Unit Number Autocomplete Handle function On select
   **/
  const handleUnitNumberSelection = (unit) => {
    dispatch(setUnitNumberInput(unit.unitNumber));
    if (unit.unitPK) {
      dispatch(setUnitNumberPK(unit.unitPK));
    } else {
      dispatch(setUnitNumberPK(unit.sisterUnitFK));
    }
    setShowUnitSelectionLookup(false);
    if (currentCompanyName !== companyName) {
      dispatch(setIsCrossDB(true));
    }
    dispatch(setPageNumber(0));
    if (!unit.unitNumberLast5.startsWith(unitNumberLast5)) {
      dispatch(setUnitNumberLast5(""));
    }
  };
  /**
   * Fetch Current Company Name
   *
   *
   **/

  const getAllCompanyNames = () => {
    setCompanyLoading(true);
    DelayProcessingService.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          setCompanyList(res?.data);

          const value = res?.data?.find((item) => item.LocalCompany === true);
          if (currentCompanyFetch && value) {
            dispatch(setCurrentCompanyName(value.Name));
            dispatch(setCompanyFK(value.CompanyPK));
            dispatch(setCompanyName(value.Name));
            setCurrentCompanyId(value.CompanyPK);
            dispatch(setPageNumber(0));
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setCompanyLoading(false);
        setCompanyReady(true);
      });
  };

  useEffect(() => {
    getAllCompanyNames();
  }, []);

  useEffect(() => {
    if (!companyReady) return;
    getAllUnitNumbersList();
  }, [pageNumber, unitNumberPK, unitNumberLast5, companyName, companyReady]);

  /**
   *  call function when unitNumberInput changes
   **/
  useEffect(() => {
    if (unitNumberPK && unitNumberBrowse.length === 1) {
      dispatch(setUnitShuttlePK(unitNumberBrowse[0].unitShuttlePK));
      dispatch(setSisterUnitShuttleFK(unitNumberBrowse[0].sisterUnitShuttleFK));
      dispatch(setUnitShuttleData(unitNumberBrowse[0]));
      if (currentCompanyName !== unitNumberBrowse[0].unitCompanyName) {
        dispatch(setIsCrossDB(true));
      }
      if (unitNumberBrowse[0].plantToYard) {
        dispatch(setShuttleType("plantToYard"));
      } else if (unitNumberBrowse[0].yardToPlant) {
        dispatch(setShuttleType("yardToPlant"));
      } else if (unitNumberBrowse[0].yardTransfer) {
        dispatch(setShuttleType("yardToYard"));
      } else if (unitNumberBrowse[0].plantTransfer) {
        dispatch(setShuttleType("plantToPlant"));
      }
      dispatch(setCompanyFK(unitNumberBrowse[0].unitCompanyId));
      dispatch(setCompanyName(unitNumberBrowse[0].unitCompanyName));
      dispatch(setPageNumber(0));
    }
    if (!unitNumberPK) {
      dispatch(setChangeColor(false));
    }
  }, [unitNumberPK, unitNumberBrowse]);

  useEffect(() => {
    if (driverData === null || driverData === undefined || driverData.length === 0) {
      navigate("/edit-shuttle-driver");
    }
  }, [driverData]);

  useEffect(() => {
    if (unitNumberLast5 && unitNumberBrowse?.length === 1) {
      dispatch(setUnitNumberPK(unitNumberBrowse[0].unitPK));
      dispatch(setUnitNumberInput(unitNumberBrowse[0].unitNumber));
      dispatch(setUnitShuttlePK(unitNumberBrowse[0].unitShuttlePK));
    }
  }, [unitNumberBrowse]);

  useEffect(() => {
    dispatch(setUnitNumberInput(""));
    dispatch(setUnitNumberPK(null));
    dispatch(setUnitNumberLast5(""));
    dispatch(setIsCrossDB(false));
    dispatch(setUnitShuttlePK(null));
    dispatch(setChangeColor(false));
    dispatch(setUnitShuttleData(null));
    dispatch(setShuttleType(""));
    dispatch(setUnitNumberBrowse(null));
    dispatch(setEditReason(""));
  }, []);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: unitNumberBrowse,
  };

  return (
    <div className="w-100 p-2">
      {(companyLoading || unitListingLoading) && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row>
              <Col className="p-15 " xs={7}>
                {/* Driver */}
                <Form.Group className="my-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0 text-end">
                    <Form.Label htmlFor="name" className="customColFormLabel me-4">
                      Driver
                    </Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className="customFormControl"
                      id="driver"
                      name="driver"
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={driverNameInput}
                      disabled
                      readOnly
                    />
                  </Col>
                </Form.Group>

                {/* Unit Last 5 */}
                <Form.Group className="my-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0 text-end">
                    <Form.Label htmlFor="name" className="customColFormLabel me-4">
                      Last 5
                    </Form.Label>
                  </Col>
                  <div className="p-0 col-1">
                    <input
                      className="customFormControl"
                      id="unitNumberLast5"
                      name="unitNumberLast5"
                      type="text"
                      value={unitNumberLast5}
                      maxLength={5}
                      autoComplete="off"
                      aria-autocomplete="list"
                      onChange={(e) => {
                        dispatch(setUnitNumberLast5(e.target.value));
                        dispatch(setUnitShuttlePK(null));
                        dispatch(setUnitNumberInput(""));
                        dispatch(setUnitNumberPK(null));
                        dispatch(setPageNumber(0));
                        getAllUnitNumbers(unitNumberInput, e.target.value, companyName);
                      }}
                    />
                  </div>
                </Form.Group>

                {/* Unit Number Autocomplete */}
                <Form.Group className="my-3 form-group m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col xs={4} sm={4} className="p-0 text-end">
                    <Form.Label className="customColFormLabel me-4">Unit Number</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      arrayList={unitNumberList}
                      searchString={unitNumberInput}
                      renderItemId={(units) => units.unitPK}
                      renderItemField={(units) => units.unitNumber}
                      selectedId={unitNumberPK}
                      handleSearchString={(string) => dispatch(setUnitNumberInput(string))}
                      fetchDataBySearchString={(string) =>
                        getAllUnitNumbers(string, unitNumberLast5, companyName)
                      }
                      onSelect={handleUnitNumberSelection}
                      loading={unitLoading}
                      clearInputCallback={() => {
                        dispatch(setUnitShuttlePK(null));
                        dispatch(setUnitNumberPK(null));
                        dispatch(setPageNumber(0));
                        dispatch(setIsCrossDB(false));
                      }}
                      handleAutoCompleteClose={() => {
                        dispatch(setUnitNumberPK(null));
                        dispatch(setUnitNumberLast5(""));
                      }}
                      className={`${
                        unitNumberPK === "" || unitNumberPK === null || unitNumberInput === ""
                          ? "borderRed"
                          : "borderGreen"
                      }`}
                    />
                    <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                  </Col>
                </Form.Group>
                {/* Company Dropdown */}
                <Form.Group className={`my-3 form-group m-b-10 align-items-center row  m-l-0 m-r-0`}>
                  <Col xs={4} sm={4} className="p-0 text-end">
                    <Form.Label className="customColFormLabel me-4">Company</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                    <Form.Select
                      className="customFormControl"
                      value={`${companyFK}-${companyName}`}
                      onChange={(e) => {
                        const [companyId, companyName] = e.target.value.split("-");
                        dispatch(setCompanyFK(companyId));
                        dispatch(setCompanyName(companyName));
                        dispatch(setUnitNumberInput(""));
                        dispatch(setUnitNumberPK(null));
                        dispatch(setPageNumber(0));
                      }}
                      style={{ textIndent: "4px" }}
                    >
                      {companyList?.map((item) => (
                        <option key={item.CompanyPK} value={`${item.CompanyPK}-${item.Name}`}>
                          {item.Name.toUpperCase()}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            {(companyLoading || unitListingLoading) && <LoadingIcon />}

            {/* Unit Browse Listing */}
            <Col className="px-4 py-2">
              <div className="row border border-dark border-1">
                <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
                  <div className="d-flex h-100">
                    <div className="w-100">
                      <EditShuttleUnitListing />
                    </div>
                    <PaginationComponent
                      {...paginationProps}
                      firstPage
                      lastPage
                      singleArrowUp
                      singleArrowDown
                      recordsPerPage={5}
                      loading={unitListingLoading}
                    />
                  </div>
                </div>
              </div>
            </Col>

            <UnitSelectionLookup
              show={showUnitSelectionLookup}
              onHide={() => setShowUnitSelectionLookup(false)}
              EditShuttle
              driverFK={driverData}
              companyName={companyName}
              fromDate={fromDate}
              toDate={toDate}
              handleLookupSelection={handleUnitNumberSelection}
            />

            <Modal show={serverError} onHide={() => setServerError(false)} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title className="font-18 h-100 temp-red-color">Server Error</Modal.Title>
              </Modal.Header>

              <Modal.Body className="font-14 h-100">{errorMsg}</Modal.Body>

              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    setServerError(false);
                  }}
                >
                  OK
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditShuttleUnitContent;
