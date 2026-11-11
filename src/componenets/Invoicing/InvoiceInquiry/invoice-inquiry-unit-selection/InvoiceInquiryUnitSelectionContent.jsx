import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import {
  setCompanyFK,
  setCompanyName,
  setInvoiceById,
  setInvoiceData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setInvoicePK,
  setUnitNumber,
  setUnitId,
  setLocalCompany,
  setSelectedCompanyName,
  setInvoiceNumber,
  setUnitNumberLast5,
  setIsInvoiceUnitValid,
  setInvoiceVoided,
  setInvoiceCorrected,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import { t } from "i18next";
import numberValidation from "../../../../utils/validation/NumberValidation";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import InvoiceInquiryService from "../../../../services/Invoicing/InvoiceInquiryService";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import useDebouncer from "../../../../hooks/useDebouncer";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import { setBrowsePageNumber } from "../../../../redux/UnitStatus/UnitStatusSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import { getCurrentCompany } from "../../../../utils/utils";
import CompanyService from "../../../../services/CompanyService";

const InvoiceInquiryUnitSelectionContent = () => {
  const currentCompany = getCurrentCompany();
  const pageNumber = useSelector((state) => state.invoiceInquiryReducer.pageNumber);
  const totalPages = useSelector((state) => state.invoiceInquiryReducer.totalPages);
  const totalElements = useSelector((state) => state.invoiceInquiryReducer.totalElements);
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const companyFK = useSelector((state) => state.invoiceInquiryReducer.companyFK);
  const invoiceData = useSelector((state) => state.invoiceInquiryReducer.invoiceData);
  const searchCriteria = useSelector((state) => state.invoiceInquiryReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.invoiceInquiryReducer.searchTerm);
  const invoiceById = useSelector((state) => state.invoiceInquiryReducer.invoiceById);
  const companyName = useSelector((state) => state.invoiceInquiryReducer.companyName);
  const cancelTrue = useSelector((state) => state.invoiceInquiryReducer.cancelTrue);
  const sortValue = useSelector((state) => state.invoiceInquiryReducer.sortValue);
  const sortType = useSelector((state) => state.invoiceInquiryReducer.sortType);
  const cancelUnitSelection = useSelector((state) => state.invoiceInquiryReducer.cancelUnitSelection);
  const unitNumber = useSelector((state) => state.invoiceInquiryReducer.unitNumber);
  const unitId = useSelector((state) => state.invoiceInquiryReducer.unitId);
  const unitNumberLast5 = useSelector((state) => state.invoiceInquiryReducer.unitNumberLast5);
  const invoiceNumber = useSelector((state) => state.invoiceInquiryReducer.invoiceNumber);
  const selectedCompanyName = useSelector((state) => state.invoiceInquiryReducer.selectedCompanyName);
  const localCompany = useSelector((state) => state.invoiceInquiryReducer.localCompany);
  const isInvoiceUnitValid = useSelector((state) => state.invoiceInquiryReducer.isInvoiceUnitValid);

  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const dispatch = useDispatch();
  const [companyNames, setCompanyNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lookupData, setLookupData] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState(false);
  const [isCompanyDisabled, setIsCompanyDisabled] = useState(false);
  const [unitStatusLoading, setUnitStatusLoading] = useState(false);
  const [invoiceDataLoading, setInvoiceDataLoading] = useState(false);
  //Fetch All Company Names
  const getCompanyNames = () => {
    CompanyService.getAllCompanyData()
      .then((response) => {
        const data = response?.data;
        setCompanyNames(data);

        if (!companyFK) {
          const value = response?.data?.find((item) => item.LocalCompany === true);
          dispatch(setSelectedCompanyName(value?.Name));
          dispatch(setLocalCompany(value?.LocalCompany));
          dispatch(setCompanyFK(value?.CompanyPK));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchInvoiceData = useDebouncer((searchCriteria, searchTerm, pageNo, sortValue, sortType) => {
    let companyFKLocal = localCompany === true ? -1 : companyFK;
    setInvoiceDataLoading(true);
    InvoiceInquiryService.getAllInvoiceBySearch(
      searchCriteria,
      searchTerm,
      pageNo || pageNumber,
      6,
      companyFKLocal,
      selectedCompanyName,
      sortValue,
      sortType
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setInvoiceData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
      })
      .catch((error) => {
        console.error("Error fetching invoice data:", error);
      })
      .finally(() => {
        setLoading(false);
        setInvoiceDataLoading(false);
      });
  }, 500);

  const fetchInvoiceDataAutocomplete = (searchCriteria, searchTerm, localCompany) => {
    setUnitListLoading(true);
    let localCompanyVar = localCompany;
    let companyFKLocal = localCompanyVar === true ? -1 : companyFK;
    InvoiceInquiryService.getAllInvoiceBySearch(
      searchCriteria,
      searchTerm,
      0,
      100,
      companyFKLocal,
      selectedCompanyName
    )
      .then((response) => {
        const data = response?.data?.content;
        // Remove duplicates based on unitNumber
        const trimmedList = Array.from(
          new Map(
            data?.map((unit) => [unit.unitNumber?.trim(), { ...unit, unitNumber: unit.unitNumber?.trim() }])
          ).values()
        );
        setLookupData(trimmedList);
        setUnitListLoading(false);
      })
      .catch((err) => {
        setUnitListLoading(false);
      });
  };

  const checkUnitStatus = (unitId) => {
    setUnitStatusLoading(true);
    InvoiceInquiryService.checkUnitStatus(unitId, localCompany === true ? -1 : companyFK)
      .then((response) => {
        dispatch(setIsInvoiceUnitValid(response?.data));
      })
      .catch(() => {
        dispatch(setIsInvoiceUnitValid(false));
      })
      .finally(() => setUnitStatusLoading(false));
  };

  const fetchRecordById = (invoicePK, searchCriteria, searchTerm) => {
    let companyFKLocal = localCompany === true ? -1 : companyFK;
    if (invoicePK || invoiceById?.length === 0) {
      setInvoiceDataLoading(true);
      InvoiceInquiryService.getInvoiceById(invoicePK, companyFKLocal, companyName, searchCriteria, searchTerm)
        .then((response) => {
          const data = response?.data;
          dispatch(setInvoiceById(data));
          dispatch(setInvoiceVoided(response?.data[0].invoiceVoided));
          dispatch(setInvoiceCorrected(response?.data[0].invoiceCorrected));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setInvoiceDataLoading(false));
    }
  };

  useEffect(() => {
    getCompanyNames();
  }, []);

  useEffect(() => {
    dispatch(setCompanyName(selectedCompanyName));
  }, [selectedCompanyName]);

  useEffect(() => {
    if (invoicePK) {
      fetchRecordById(invoicePK);
    }
  }, [invoicePK]);

  const handleClick = (value) => {
    dispatch(setInvoicePK(value));
  };

  /**
   * Handle AutoComplete Selection
   */
  const handleUnitNumberSelection = (e) => {
    dispatch(setSearchCriteria("UnitNumberSelect"));
    dispatch(setSearchTerm(e?.unitNumber));
    dispatch(setUnitNumber(e?.unitNumber));
    dispatch(setUnitId(e?.unitFK || e?.sisterUnitFK));
    dispatch(setPageNumber(0));
    checkUnitStatus(e?.unitFK || e?.sisterUnitFK);
    if (e?.unitNumber) {
      fetchInvoiceData("UnitNumberSelect", e?.unitNumber);
    } else {
      dispatch(setInvoiceData([]));
    }
    setShowUnitSelectionLookup(false);
    dispatch(setInvoiceNumber(""));
    dispatch(setUnitNumberLast5(""));
  };

  const handleUnitNumberLookupSelection = (e) => {
    dispatch(setSearchCriteria("UnitNumberSelect"));
    dispatch(setSearchTerm(e?.UnitNumber));
    dispatch(setUnitNumber(e?.UnitNumber));
    dispatch(setUnitId(e?.UnitPK || e?.sisterUnitFK));
    checkUnitStatus(e?.UnitPK || e?.sisterUnitFK);
    dispatch(setPageNumber(0));
    if (e?.UnitNumber) {
      fetchInvoiceData("UnitNumberSelect", e?.UnitNumber);
    } else {
      dispatch(setInvoiceData([]));
    }
    setShowUnitSelectionLookup(false);
    dispatch(setInvoiceNumber(""));
    dispatch(setUnitNumberLast5(""));
    dispatch(setBrowsePageNumber(0));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: invoiceData,
  };

  useEffect(() => {
    if (cancelTrue) {
      dispatch(setUnitNumber(""));
      dispatch(setInvoiceNumber(""));
      dispatch(setUnitNumberLast5(""));
    }
  }, [cancelTrue]);

  const onhandleNormalSort = (value, val) => {
    setLoading(true);
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
    fetchInvoiceData(searchCriteria, searchTerm, pageNumber, value, val);
  };

  useEffect(() => {
    fetchInvoiceData(searchCriteria, searchTerm);
  }, [pageNumber]);

  return (
    <div className="m-1">
      {unitStatusLoading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "432px" }}>
        <div className="ps-3 mb-4 ">
          <Row>
            <Col xs={5}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Invoice Number
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="invoiceNumber"
                    name="invoiceNumber"
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => {
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setUnitNumber(""));
                      dispatch(setInvoiceNumber(e.target.value?.replace(/\D+/g, "")));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                      if (e.target.value.length >= 5) {
                        // Check input length instead of value
                        fetchInvoiceData("InvoiceNumber", numberValidation(e.target.value));
                        dispatch(setPageNumber(0));
                        dispatch(setSearchCriteria("InvoiceNumber"));
                        dispatch(setSearchTerm(numberValidation(e.target.value)));
                      } else {
                        dispatch(setSearchCriteria(""));
                        dispatch(setSearchTerm(""));
                        dispatch(setInvoiceData([]));
                      }
                    }}

                    onFocus={() => {
                      // getCurrentCompanyName();
                      setIsCompanyDisabled(true);
                      dispatch(setSelectedCompanyName(currentCompany?.name));
                      dispatch(setLocalCompany(currentCompany?.localCompany));
                      dispatch(setCompanyFK(currentCompany?.companyPK));
                    }}
                    onBlur={(e) => {
                      setIsCompanyDisabled(false);
                    }}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    last 5
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumberLast5"
                    name="unitNumberLast5"
                    type="text"
                    value={unitNumberLast5?.toUpperCase()}
                    onChange={(e) => {
                      dispatch(setInvoiceNumber(""));
                      dispatch(setUnitNumber(""));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                      fetchInvoiceData("Last5", e.target.value?.toUpperCase());
                      dispatch(setUnitNumberLast5(e.target.value?.toUpperCase()));
                      dispatch(setSearchCriteria("Last5"));
                      dispatch(setPageNumber(0));
                      dispatch(setSearchTerm(e.target.value?.toUpperCase()));
                      if (!e.target.value) {
                        dispatch(setSearchCriteria(""));
                        dispatch(setSearchTerm(""));
                        dispatch(setInvoiceData([]));
                      }
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                    maxLength={5}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} className="p-0">
                  <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                </Col>

                <Col xs={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={lookupData}
                    searchString={unitNumber.toUpperCase()}
                    renderItemId={(unit) => unit?.unitFK ?? unit?.sisterUnitFK}
                    renderItemField={(unit) => unit?.unitNumber}
                    handleSearchString={(string) => {
                      setLookupData([]);
                      dispatch(setInvoiceNumber(""));
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setPageNumber(0));
                      dispatch(setUnitNumber(string?.toUpperCase()));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                    }}
                    fetchDataBySearchString={(string) => {
                      fetchInvoiceDataAutocomplete("UnitNumber", string?.toUpperCase(), localCompany);
                    }}
                    allowSearchOnLength={3}
                    max
                    loading={unitListLoading}
                    onSelect={handleUnitNumberSelection}
                    clearInputCallback={() => {
                      dispatch(setSearchCriteria(""));
                      dispatch(setSearchTerm(""));
                      dispatch(setPageNumber(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                      dispatch(setUnitId(null));
                    }}
                    handleAutoCompleteClose={() => {
                      dispatch(setSearchCriteria(""));
                      dispatch(setSearchTerm(""));
                      dispatch(setPageNumber(0));
                      dispatch(setUnitNumber(""));
                      dispatch(setInvoiceData([]));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                    }}
                    setArrayList={setLookupData}
                    className={!unitNumber || (unitId && isInvoiceUnitValid) ? "" : "borderRed"}
                    disabled={false}
                    maxLength={30}
                  />

                  <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                </Col>
              </Form.Group>
              <Form.Group className="margin-box-1 form-group m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
                <Col xs={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label me-4">Company</Form.Label>
                </Col>
                <Col xs={7} className="p-0 ">
                  <Form.Select
                    className="customFormControl"
                    value={`${companyFK}-${selectedCompanyName}-${localCompany}`}
                    onChange={(e) => {
                      const [companyId, companyName, localCompanyVar] = e.target.value.split("-");
                      dispatch(setSelectedCompanyName(companyName));
                      dispatch(setCompanyName(companyName));
                      dispatch(setLocalCompany(JSON.parse(localCompanyVar)));
                      dispatch(setCompanyFK(companyId));
                      dispatch(setUnitNumber(""));
                      dispatch(setInvoiceNumber(""));
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setSearchCriteria(""));
                      dispatch(setSearchTerm(""));
                      dispatch(setPageNumber(0));
                      dispatch(setInvoiceData([]));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                    }}
                    disabled={isCompanyDisabled || invoiceNumber}
                  >
                    {companyNames.map((item) => (
                      <option
                        value={`${item.CompanyPK}-${item.Name}-${item.LocalCompany}`}
                        key={item.CompanyPK}
                      >
                        {item.Name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex h-100  mx-2 m-t-55">
            <div className="w-100 border-1 border border-dark border-right-0">
              <div className="fixTableHead " style={{ height: "250px" }}>
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr>
                      <th
                        className="f-w-600 col-2"
                        onClick={() => {
                          onhandleNormalSort("invoiceNumber", !sortType);
                        }}
                      >
                        Invoice Number
                        {sortType && sortValue === "invoiceNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "invoiceNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-2"
                        onClick={() => {
                          onhandleNormalSort("invoiceDate", !sortType);
                        }}
                      >
                        Invoice Date
                        {sortType && sortValue === "invoiceDate" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "invoiceDate" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-2"
                        onClick={() => {
                          onhandleNormalSort("unitNumber", !sortType);
                        }}
                      >
                        Unit Number
                        {sortType && sortValue === "unitNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "unitNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600  col-2"
                        onClick={() => {
                          onhandleNormalSort("pickUp", !sortType);
                        }}
                      >
                        Pickup
                        {sortType && sortValue === "pickUp" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "pickUp" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600  col-2"
                        onClick={() => {
                          onhandleNormalSort("delivery", !sortType);
                        }}
                      >
                        Delivery
                        {sortType && sortValue === "delivery" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortType && sortValue === "delivery" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th className="f-w-600 ">Corrected</th>
                      <th className="f-w-600">Voided</th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoiceData?.map((invoice) => (
                      <tr
                        key={invoice?.invoicePK}
                        onClick={() => {
                          dispatch(setInvoicePK(invoice?.invoicePK));
                        }}
                        className={invoicePK === invoice?.invoicePK ? "tableSelected" : ""}
                      >
                        <td>
                          <TruncatedStringWithTooltip
                            text={String(invoice?.invoiceNumber || "")}
                            charLimit={10}
                          />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip
                            text={customFormatDate(invoice?.invoiceDate) || ""}
                            charLimit={10}
                          />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip
                            text={String(invoice.unitNumber || "")}
                            charLimit={10}
                          />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip
                            text={String(invoice.pickupName || "")}
                            charLimit={10}
                          />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip
                            text={String(invoice.deliveryName || "")}
                            charLimit={10}
                          />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip
                            text={invoice?.invoiceCorrected ? "Yes" : "No"}
                            charLimit={10}
                          />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip
                            text={invoice?.invoiceVoided ? "Yes" : "No"}
                            charLimit={10}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {invoiceDataLoading ? (
                  <div className="fade modal-backdrop show">
                    <div className="pos-center">
                      <div className="loader"></div>
                    </div>
                  </div>
                ) : (
                  invoiceData?.length === 0 && (
                    <h3 className="empty-list" align="center">
                      {t("dealers.list.empty.message")}
                    </h3>
                  )
                )}
              </div>
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={6}
              firstPage
              lastPage
              singleArrowUp
              singleArrowDown
            />

            <UnitSelectionLookup
              lookupIncludingCROSSDB
              companyName={companyName}
              show={showUnitSelectionLookup}
              onHide={() => setShowUnitSelectionLookup(false)}
              handleLookupSelection={handleUnitNumberLookupSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInquiryUnitSelectionContent;
