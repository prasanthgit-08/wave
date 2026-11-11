import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";
import {
  setChangeColor,
  setCompanyFK,
  setCompanyName,
  setId,
  setIsLocalCompany,
  setLocalCompany,
  setMiscInvoiceData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedUnit,
  setTotalElements,
  setTotalPages,
  setUnitNumber,
  setUnitNumberLast5,
  setUnitNumberPK,
  setUnitSelected,
  setViewDetail,
  setLocalCompanyName,
  setDispatchStatus,
  setSelectedCompanyName,
} from "../../../../redux/Invoicing/MiscInvoiceSlice";
import { t } from "i18next";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import DispatchHeader from "../../../Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/DriverDispatchHeader";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import LoadingIcon from "../../../common/LoadingIcon";

const UnitSelectionContent = () => {
  const [units, setUnits] = useState([]);
  const [unitsLoading, setUnitsLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [miscInvoice, setMiscInvoice] = useState(true);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const changeColor = useSelector((state) => state.miscInvoiceReducer.changeColor);
  const id = useSelector((state) => state.miscInvoiceReducer.id);
  const miscInvoiceData = useSelector((state) => state.miscInvoiceReducer.miscInvoiceData);
  const pageNumber = useSelector((state) => state.miscInvoiceReducer.pageNumber);
  const totalPages = useSelector((state) => state.miscInvoiceReducer.totalPages);
  const totalElements = useSelector((state) => state.miscInvoiceReducer.totalElements);
  const searchTerm = useSelector((state) => state.miscInvoiceReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.miscInvoiceReducer.searchCriteria);
  const companyName = useSelector((state) => state.miscInvoiceReducer.companyName);
  const companyFK = useSelector((state) => state.miscInvoiceReducer.companyFK);
  const dispatch = useDispatch();
  const [companyNames, setCompanyNames] = useState([]);
  const [lookupData, setLookupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const unitNumberPK = useSelector((state) => state.miscInvoiceReducer.unitNumberPK);
  const unitSelected = useSelector((state) => state.miscInvoiceReducer.unitSelected);
  const unitNumber = useSelector((state) => state.miscInvoiceReducer.unitNumber);
  const unitNumberLast5 = useSelector((state) => state.miscInvoiceReducer.unitNumberLast5);
  const cancelChanges = useSelector((state) => state.miscInvoiceReducer.cancelChanges);
  const isLocalCompany = useSelector((state) => state.miscInvoiceReducer.isLocalCompany);
  const localCompanyName = useSelector((state) => state.miscInvoiceReducer.localCompanyName);
  const selectedCompanyName = useSelector((state) => state.miscInvoiceReducer.selectedCompanyName);

  /*****
   * Get All Company Names
   * *****/
  const getCompanyNames = () => {
    setLoadingData(true);
    DelayProcessingService.getAllCompanyData()
      .then((res) => {
        if (res?.data) {
          setCompanyNames(res?.data);

          if (!companyFK || !selectedCompanyName) {
            const value = res?.data?.find((item) => item.LocalCompany === true);
            dispatch(setIsLocalCompany(true));
            dispatch(setCompanyFK(value?.CompanyPK));
            dispatch(setLocalCompanyName(value?.Name));
            dispatch(setSelectedCompanyName(value?.Name));
            dispatch(setCompanyName(value?.Name));
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingData(false));
  };

  useEffect(() => {
    if (companyFK && companyNames?.length > 0) {
      // find the selected company record
      const selectedCompany = companyNames?.find((item) => item.CompanyPK === Number(companyFK));

      // check if selected company is local
      if (selectedCompany?.LocalCompany) {
        dispatch(setIsLocalCompany(true));
      } else {
        dispatch(setIsLocalCompany(false));
      }
    }
  }, [companyFK, companyNames]);

  /******Unit Number AutoComplete*****/
  const fetchInvoiceDataAutocomplete = (string) => {
    setUnitsLoading(true);
    MiscInvoiceService.getAllUnitsBySearch(
      "UnitNumber",
      string?.toUpperCase(),
      0,
      100,
      localCompanyName === selectedCompanyName ? -1 : Number(companyFK),
      selectedCompanyName,
      unitNumberLast5,
      "AutoComplete"
    )
      .then((response) => {
        const data = response?.data?.content;
        const unitsList = data?.map((unit) => ({ ...unit, unitNumber: unit.unitNumber?.trim() }));
        setUnits(unitsList);
      })
      .catch((error) => {})
      .finally(() => {
        setUnitsLoading(false);
      });
  };

  /******Used to Solve the population of
   * previous company data in autocomplete
   * *****/
  useEffect(() => {
    if (!companyFK) return;
    fetchInvoiceDataAutocomplete("", "");
  }, [companyFK]);

  /*****
   * Clear the Miscellaneous Invoice data if UnitNumberLast5 is empty
   * ****/
  useEffect(() => {
    if (unitNumberLast5 === "" && unitNumber === "") dispatch(setMiscInvoiceData([]));
  }, [unitNumberLast5, unitNumber]);

  /****
   *  Used to fetch the List of Units for Miscellaneous Invoice
   * ****/
  const fetchInvoiceData = (searchCriteria, searchTerm) => {
    setLoading(true);

    MiscInvoiceService.getAllUnitsBySearch(
      searchCriteria,
      searchTerm,
      pageNumber,
      7,
      isLocalCompany ? -1 : Number(companyFK),
      selectedCompanyName
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setMiscInvoiceData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCompanyNames();
  }, [cancelChanges]);

  /**
   * Unit Number Autocomplete Handle function On select
   **/
  const handleUnitNumberSelection = (unit) => {
    dispatch(setSearchCriteria("UnitNumberSelect"));
    dispatch(setSearchTerm(unit?.UnitNumber));
    dispatch(setUnitNumber(unit?.UnitNumber));
    dispatch(setUnitNumberPK(unit?.UnitPK || unit?.sisterUnitFK));
    dispatch(setUnitSelected(unit));
    setShowUnitSelectionLookup(false);
    fetchInvoiceData("UnitNumber", unit?.UnitNumber);
    dispatch(setId(null));
  };

  const handleUnitNumberSelectionForAutoComplete = (unit) => {
    dispatch(setSearchCriteria("UnitNumberSelect"));
    dispatch(setSearchTerm(unit?.unitNumber));
    dispatch(setUnitNumber(unit?.unitNumber));
    dispatch(setUnitNumberPK(unit?.unitPK));
    dispatch(setUnitSelected(unit));
    setShowUnitSelectionLookup(false);
    fetchInvoiceData("UnitNumber", unit?.unitNumber);
    dispatch(setId(null));
  };

  /******
   * Unit NUmber Select Field should list the data if
   * UnitNUmberLast5 is present but unitNumber Input is nul
   * ***/
  useEffect(() => {
    if (unitNumberLast5?.length === 5 && unitNumberPK === null) {
      fetchInvoiceData("Last5", unitNumberLast5);
    }
  }, [unitNumberLast5, unitNumberPK, isLocalCompany]);

  useEffect(() => {
    if (id !== null && companyName !== "") {
      MiscInvoiceService.getDispatchStatus(id, companyName).then((response) => {
        const data = response?.data;
        dispatch(setDispatchStatus(data?.content));
      });
    }
  }, [id, companyName]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: miscInvoiceData,
  };
  return (
    <div className="m-1">
      {(loading || unitsLoading || loadingData) && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="ps-3 mb-4 ">
          <Row>
            <Col xs={7}>
              <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label me-4">Company</Form.Label>
                </Col>
                <Col xs={7} className="p-0">
                  <Form.Select
                    className="customFormControl ps-2"
                    value={`${companyFK}-${companyName}`}
                    key={companyFK}
                    onChange={(e) => {
                      const [companyId, name] = e.target.value.split("-");
                      dispatch(setSelectedCompanyName(name));
                      dispatch(setCompanyName(name));
                      dispatch(setCompanyFK(companyId));
                      dispatch(setUnitNumber(""));
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setMiscInvoiceData([]));
                      dispatch(setSearchTerm(""));
                      dispatch(setSearchCriteria(""));
                      setUnits([]);
                    }}
                  >
                    {companyNames.map((item) => (
                      <option value={`${item.CompanyPK}-${item.Name}`} key={item.CompanyPK}>
                        {item.Name}
                      </option>
                    ))}
                  </Form.Select>{" "}
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col xs={2} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    last 5
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumberLast5"
                    name="unitNumberLast5"
                    type="text"
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitNumberLast5}
                    maxLength={5}
                    onChange={(e) => {
                      const value = e.target.value;
                      dispatch(setUnitNumberLast5(value?.toUpperCase()));
                      dispatch(setSearchCriteria("Last5"));
                      dispatch(setSearchTerm(value));
                    }}
                    onBlur={(e) => {
                      if (unitNumberLast5?.length === 5) {
                        fetchInvoiceData("Last5", unitNumberLast5);
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                </Col>
                <Col xs={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={units}
                    searchString={unitNumber}
                    renderItemId={(unit) => unit.unitPK}
                    renderItemField={(unit) => unit.unitNumber}
                    handleSearchString={(string) => {
                      dispatch(setUnitNumber(string));
                    }}
                    className={`customFormControl ${
                      unitNumber
                        ? !miscInvoiceData || miscInvoiceData?.length === 0 || !unitNumber || !unitNumberPK
                          ? "borderRed"
                          : "borderGreen"
                        : ""
                    }`}
                    fetchDataBySearchString={fetchInvoiceDataAutocomplete}
                    loading={unitsLoading}
                    onSelect={handleUnitNumberSelectionForAutoComplete}
                    selectedId={unitNumberPK}
                    clearInputCallback={() => {
                      dispatch(setUnitNumberPK(null));
                    }}
                    handleAutoCompleteClose={() => {
                      if (searchCriteria === "UnitNumber") {
                        dispatch(setMiscInvoiceData([]));
                      }
                      setLookupData(null);
                    }}
                    searchPlaceholder="ENTER UNIT NUMBER"
                  />
                  <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}></Col>
          </Row>
        </div>
        <div className="d-flex " style={{ height: "250px" }}>
          <div className="w-100 border-1 border border-dark border-right-0">
            <div className="fixTableHead">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr>
                    <th className="f-w-600 col-4">Unit Number</th>
                    <th className="f-w-600 col-2">Delivery Date</th>
                    <th className="f-w-600">Pickup</th>
                    <th className="f-w-600">Delivery</th>
                  </tr>
                </thead>

                <tbody>
                  {miscInvoiceData?.map((miscInvoice) => (
                    <tr
                      key={miscInvoice?.unitPK}
                      onClick={(e) => {
                        dispatch(setChangeColor(true));
                        dispatch(setId(miscInvoice.unitPK));
                      }}
                      className={miscInvoice?.unitPK === id && changeColor ? "tableSelected" : ""}
                    >
                      <td>{miscInvoice?.unitNumber}</td>
                      <td>{miscInvoice?.deliveryDate}</td>
                      <td>{miscInvoice?.pickUpName}</td>
                      <td>{miscInvoice?.deliveryName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Show "No Records Available" based on conditions */}
              {(!miscInvoiceData || miscInvoiceData?.length === 0) && <NoRecordsMessage />}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={7}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />
        </div>
        <UnitSelectionLookup
          lookupIncludingCROSSDB
          companyName={companyName}
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          handleLookupSelection={handleUnitNumberSelection}
        />
      </div>
    </div>
  );
};

export default UnitSelectionContent;
