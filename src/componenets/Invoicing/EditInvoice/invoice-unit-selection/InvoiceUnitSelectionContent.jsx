import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import EditInvoiceService from "../../../../services/Invoicing/EditInvoiceService";
import {
  setCompanyFK,
  setCompanyName,
  setInvoiceById,
  setInvoiceData,
  setInvoiceNumber,
  setInvoicePK,
  setNonUnitData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setUnitNumber,
  setUnitNumberId,
  setUnitNumberLast5,
  setSelectedCompanyName,
  setDispatchStatus,
  setIsCreditCardRequired,
} from "../../../../redux/Invoicing/EditInvoiceSlice";
import numberValidation from "../../../../utils/validation/NumberValidation";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import { formatDate } from "../../../../utils/dateUtils";
import LoadingIcon from "../../../common/LoadingIcon";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import DelayProcessingService from "../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import MiscInvoiceService from "../../../../services/Invoicing/MiscInvoiceService";

const InvoiceUnitSelectionContent = () => {
  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => state.editInvoiceReducer.pageNumber);
  const totalPages = useSelector((state) => state.editInvoiceReducer.totalPages);
  const totalElements = useSelector((state) => state.editInvoiceReducer.totalElements);
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const companyFK = useSelector((state) => state.editInvoiceReducer.companyFK);
  const invoiceData = useSelector((state) => state.editInvoiceReducer.invoiceData);
  const invoiceById = useSelector((state) => state.editInvoiceReducer.invoiceById);
  const companyName = useSelector((state) => state.editInvoiceReducer.companyName);
  const cancelTrue = useSelector((state) => state.editInvoiceReducer.cancelTrue);
  const invoiceNumber = useSelector((state) => state.editInvoiceReducer.invoiceNumber);
  const unitNumberLast5 = useSelector((state) => state.editInvoiceReducer.unitNumberLast5);
  const unitNumber = useSelector((state) => state.editInvoiceReducer.unitNumber);
  const unitNumberId = useSelector((state) => state.editInvoiceReducer.unitNumberId);
  const sortValue = useSelector((state) => state.editInvoiceReducer.sortValue);
  const sortType = useSelector((state) => state.editInvoiceReducer.sortType);
  const searchTerm = useSelector((state) => state.editInvoiceReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.editInvoiceReducer.searchCriteria);
  const selectedCompanyName = useSelector((state) => state.editInvoiceReducer.selectedCompanyName);
  const cancelChanges = useSelector((state) => state.editInvoiceReducer.cancelChanges);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [companyNames, setCompanyNames] = useState([]);
  const [lookupData, setLookupData] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [isCompanyDisabled, setIsCompanyDisabled] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);

  //Fetch All Company Names
  const getCompanyNames = () => {
    setCompanyLoading(true);
    DelayProcessingService.getAllCompanyData()
      .then((response) => {
        const data = response?.data;
        setCompanyNames(data);
        if (!companyFK) {
          const defaultCompany = data?.find((element) => element.LocalCompany === true);
          dispatch(setCompanyFK(defaultCompany.CompanyPK));
          dispatch(setSelectedCompanyName(defaultCompany.Name));
        }
      })
      .catch((error) => {})
      .finally(() => setCompanyLoading(false));
  };

  const getCurrentCompanyName = () => {
    if (companyNames?.length) {
      const companyData = companyNames?.find((element) => element.LocalCompany === true);
      dispatch(setCompanyFK(companyData.CompanyPK));
      dispatch(setSelectedCompanyName(companyData.Name));
    }
  };

  const fetchInvoiceData = (searchCriteria, searchTerm, pageNumber, sortType, sortValue) => {
    if (searchTerm) {
      setUnitLoading(true);
      EditInvoiceService.getAllInvoiceBySearch(
        searchCriteria,
        searchTerm,
        pageNumber,
        7,
        companyFK,
        selectedCompanyName,
        sortType,
        sortValue
      )
        .then((response) => {
          const data = response?.data;
          dispatch(setInvoiceData(data?.content || []));
          dispatch(setTotalElements(data?.totalElements));
          dispatch(setTotalPages(data?.totalPages));
        })
        .finally(() => {
          setUnitLoading(false);
          setUnitListLoading(false);
        });
    }
  };

  const fetchInvoiceDataAutocomplete = (searchCriteria, searchTerm) => {
    setUnitListLoading(true);
    EditInvoiceService.getAllInvoiceBySearch(
      searchCriteria,
      searchTerm,
      0,
      100,
      companyFK,
      selectedCompanyName,
      false,
      "",
      unitNumberLast5 || ""
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

  const fetchRecordById = (invoicePK, searchCriteria, searchTerm) => {
    if (invoicePK || invoiceById?.length === 0) {
      EditInvoiceService.getInvoiceById(invoicePK, companyFK, companyName, searchCriteria, searchTerm)
        .then((response) => {
          const data = response?.data;
          dispatch(setInvoiceById(data));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (invoicePK) {
      fetchRecordById(invoicePK);
    }
  }, [invoicePK]);

  useEffect(() => {
    getCompanyNames();
    setIsCompanyDisabled(false);
  }, [cancelChanges]);

  useEffect(() => {
    dispatch(setCompanyName(selectedCompanyName));
  }, [selectedCompanyName]);

  useEffect(() => {
    const id =
      invoiceById[0]?.unitFK !== null
        ? invoiceById[0]?.unitFK
        : invoiceById[0]?.sisterUnitFK !== null
          ? invoiceById[0]?.sisterUnitFK
          : null;

    if (id !== null && id !== undefined && selectedCompanyName !== "") {
      MiscInvoiceService.getDispatchStatus(id, selectedCompanyName).then((response) => {
        const data = response?.data;
        dispatch(setDispatchStatus(data?.content));
      });
    }
  }, [invoiceById, companyName]);

  //  Lookup & AutoComplete validation
  useEffect(() => {
    if (!showUnitSelectionLookup && !invoiceData?.length) {
      dispatch(setUnitNumberId(null));
    }
  }, [showUnitSelectionLookup, invoiceData]);

  const handleClick = (value) => {
    dispatch(setInvoicePK(value));
  };

  /**
   * Handle AutoComplete Selection
   */
  const handleUnitNumberSelection = (e, type, sortType, sortValue) => {
    dispatch(
      type === "autocomplete"
        ? e?.unitFK
          ? setUnitNumberId(e?.unitFK)
          : setUnitNumberId(e?.sisterUnitFK)
        : setUnitNumberId(e?.unitPK)
    );
    dispatch(setSearchCriteria("UnitNumberSelect"));
    dispatch(setSearchTerm(e?.unitNumber));
    dispatch(setUnitNumber(e?.unitNumber));
    setShowUnitSelectionLookup(false);
    dispatch(setInvoiceNumber(""));
    dispatch(setPageNumber(0));
    fetchInvoiceData("UnitNumberSelect", e?.unitNumber, 0, sortType, sortValue);
  };

  const handleUnitNumberSelectionForLookup = (e) => {
    dispatch(setUnitNumberId(e?.UnitPK || e?.sisterUnitFK));
    dispatch(setSearchCriteria("UnitNumberSelect"));
    dispatch(setSearchTerm(e?.UnitNumber));
    dispatch(setUnitNumber(e?.UnitNumber));
    setShowUnitSelectionLookup(false);
    dispatch(setInvoiceNumber(""));
    dispatch(setPageNumber(0));
    fetchInvoiceData("UnitNumberSelect", e?.UnitNumber, 0, sortType, sortValue);
  };
  const paginationProps = {
    pageNumber,
    // Only manual page changes fetch with a non-zero page; PaginationComponent dispatches the returned action
    setPageNumber: (value) => {
      fetchInvoiceData(searchCriteria, searchTerm, value, sortType, sortValue);
      return setPageNumber(value);
    },
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
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
    dispatch(setPageNumber(0));
    fetchInvoiceData(searchCriteria, searchTerm, 0, val, value);
  };

  useEffect(() => {
    if (invoiceData?.length === 0 || searchTerm) {
      fetchInvoiceData(searchCriteria, searchTerm, pageNumber, sortType, sortValue);
    }
  }, []);

  useEffect(() => {
    if (invoicePK) {
      EditInvoiceService.isCreditCrdRequired(invoicePK).then((response) => {
        const data = response?.data;
        dispatch(setIsCreditCardRequired(data));
      });
    }
  }, [invoicePK]);

  return (
    <div className="m-1">
      {(loading || companyLoading || unitLoading) && <LoadingIcon />}
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

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="invoiceNumber"
                    name="invoiceNumber"
                    type="text"
                    value={invoiceNumber}
                    maxLength={9}
                    onChange={(e) => {
                      dispatch(setInvoiceById([]));
                      dispatch(setInvoicePK(null));
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setUnitNumberId(null));
                      dispatch(setUnitNumber(""));
                      dispatch(setInvoiceData([]));
                      dispatch(setInvoiceNumber(e.target.value?.replace(/\D+/g, "")));
                      dispatch(setSearchCriteria("InvoiceNumber"));
                      dispatch(setSearchTerm(numberValidation(e.target.value?.replace(/\D+/g, ""))));
                    }}
                    onFocus={() => {
                      getCurrentCompanyName();
                      setIsCompanyDisabled(true);
                    }}
                    onBlur={(e) => {
                      setIsCompanyDisabled(false);
                      if (e.target.value) {
                        dispatch(setPageNumber(0));
                        dispatch(setSortValue(""));
                        dispatch(setSortType(false));
                        dispatch(setNonUnitData([]));
                        dispatch(setUnitNumberId(null));
                        dispatch(setUnitNumber(""));
                        dispatch(setUnitNumberLast5(""));
                        e.target.value.length >= 5 &&
                          fetchInvoiceData(
                            "InvoiceNumber",
                            numberValidation(e.target.value?.replace(/\D+/g, "")),
                            0,
                            false,
                            ""
                          );
                      }
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Last 5
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumberLast5"
                    name="unitNumberLast5"
                    type="text"
                    value={unitNumberLast5}
                    maxLength={5}
                    onChange={(e) => {
                      dispatch(setInvoiceById([]));
                      dispatch(setInvoicePK(null));
                      dispatch(setInvoiceNumber(""));
                      dispatch(setUnitNumber(""));
                      dispatch(setInvoiceData([]));
                      dispatch(setUnitNumberLast5(e.target.value?.toUpperCase()));
                      dispatch(setSearchCriteria("Last5"));
                      dispatch(setSearchTerm(e.target.value?.toUpperCase()));
                    }}
                    onBlur={(e) => {
                      if (e.target.value?.length === 5) {
                        dispatch(setPageNumber(0));
                        dispatch(setSortValue(""));
                        dispatch(setSortType(false));
                        dispatch(setNonUnitData([]));
                        dispatch(setUnitNumberId(null));
                        dispatch(setInvoiceNumber(""));
                        dispatch(setUnitNumber(""));
                        fetchInvoiceData("Last5", e.target.value?.toUpperCase(), 0, false, "");
                      }
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
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
                    searchString={unitNumber}
                    renderItemId={(unit) => unit?.unitFK || unit?.sisterUnitFK}
                    renderItemField={(unit) => unit?.unitNumber}
                    maxLength={21}
                    selectedId={unitNumberId}
                    handleSearchString={(string) => {
                      dispatch(setUnitNumber(string?.trimStart()?.toUpperCase()));
                      dispatch(setUnitNumberLast5(""));
                    }}
                    fetchDataBySearchString={(string) => {
                      if (string?.length > 2 || unitNumberLast5 !== "") {
                        fetchInvoiceDataAutocomplete("UnitNumber", string?.trimStart()?.toUpperCase());
                      } else if (unitNumberId && unitNumber) {
                        dispatch(setInvoiceNumber(""));
                        fetchInvoiceDataAutocomplete("UnitNumber", unitNumber?.trimStart()?.toUpperCase());
                      } else {
                        setLookupData([]);
                      }
                      dispatch(setInvoiceData([]));
                      dispatch(setInvoicePK(null));
                    }}
                    loading={unitListLoading}
                    onSelect={(unit) => handleUnitNumberSelection(unit, "autocomplete", sortType, sortValue)}
                    clearInputCallback={() => {
                      dispatch(setUnitNumberId(null));
                    }}
                    handleAutoCompleteClose={() => {
                      if (unitNumber) {
                        dispatch(setInvoiceData([]));
                        dispatch(setInvoicePK(null));
                        dispatch(setUnitNumber(""));
                        dispatch(setUnitNumberLast5(""));
                      }
                    }}
                    className={`${!unitNumberId && unitNumber && invoiceData?.length === 0 ? "borderRed" : ""}`}
                    disabled={false}
                  />

                  <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                </Col>
              </Form.Group>

              <Form.Group className="form-group mt-3 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label me-4">Company</Form.Label>
                </Col>
                <Col xs={7} className="p-0 ">
                  <Form.Select
                    className="customFormControl"
                    value={`${companyFK}-${selectedCompanyName}`}
                    onChange={(e) => {
                      const [companyId, name] = e.target.value.split("-");
                      dispatch(setSelectedCompanyName(name));
                      dispatch(setCompanyName(name));
                      dispatch(setCompanyFK(companyId));
                      dispatch(setUnitNumber(""));
                      dispatch(setInvoiceNumber(""));
                      dispatch(setUnitNumberLast5(""));
                      dispatch(setInvoiceData([]));
                    }}
                    disabled={isCompanyDisabled || invoiceNumber}
                  >
                    {companyNames?.map((item) => (
                      <option value={`${item.CompanyPK}-${item.Name}`} key={item.CompanyPK}>
                        {item.Name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex h-100  mt-4 mx-2" style={{ height: "250px" }}>
            <div className="w-100 border-1 border border-dark border-right-0">
              <div className="fixTableHead h-300px">
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
                        className="f-w-600 col-3"
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
                        className="f-w-600 col-3"
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
                    </tr>
                  </thead>

                  <tbody>
                    {invoiceData?.map((invoice) => (
                      <tr
                        key={invoice?.invoicePK}
                        className={invoicePK === invoice?.invoicePK ? "tableSelected" : ""}
                        onClick={() => {
                          handleClick(invoice?.invoicePK);
                        }}
                      >
                        <td>{invoice.invoiceNumber}</td>
                        <td>{formatDate(invoice?.invoiceDate)}</td>
                        <td>
                          <TruncatedStringWithTooltip text={invoice?.unitNumber || ""} charLimit={15} />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip text={invoice?.pickupName || ""} charLimit={20} />
                        </td>
                        <td>
                          <TruncatedStringWithTooltip text={invoice?.deliveryName || ""} charLimit={20} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {invoiceData?.length === 0 && <NoRecordsMessage />}
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
            <UnitSelectionLookup
              lookupIncludingCROSSDB
              companyName={companyName}
              show={showUnitSelectionLookup}
              onHide={() => setShowUnitSelectionLookup(false)}
              handleLookupSelection={handleUnitNumberSelectionForLookup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceUnitSelectionContent;
