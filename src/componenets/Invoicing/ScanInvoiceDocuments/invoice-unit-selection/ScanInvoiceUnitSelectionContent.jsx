import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { t } from "i18next";
import numberValidation from "../../../../utils/validation/NumberValidation";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import {
  setPageNumber,
  setScanInvoicePayload,
  updateField,
} from "../../../../redux/Invoicing/ScanInvoiceSlice";
import ScanInvoiceService from "../../../../services/Invoicing/ScanInvoiceService";
import { formatDate } from "../../../../utils/dateUtils";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import LoadingIcon from "../../../common/LoadingIcon";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import { getCurrentCompany } from "../../../../utils/utils";
import CompanyService from "../../../../services/CompanyService";

const ScanInvoiceUnitSelectionContent = () => {
  const {
    pageNumber,
    totalPages,
    totalElements,
    invoicePK,
    companyFK,
    invoiceData,
    invoiceById,
    companyName,
    cancelTrue,
    selectedCompanyName,
    invoiceNumber,
    unitNumber,
    unitNumberLast5,
    sortType,
    sortValue,
    searchCriteria,
    searchTerm,
    unitNumberId,
  } = useSelector((state) => state.scanInvoiceReducer);

  const currentCompany = getCurrentCompany();
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const dispatch = useDispatch();
  const [companyNames, setCompanyNames] = useState([]);
  const [lookupData, setLookupData] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState(false);
  const [unitId, setUnitId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [isCompanyDisabled, setIsCompanyDisabled] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);

  const cancelChanges = useSelector((state) => state.scanInvoiceReducer.cancelChanges);

  //Fetch All Company Names
  const getCompanyNames = () => {
    setCompanyLoading(true);
    CompanyService.getAllCompanyData()
      .then((response) => {
        const data = response?.data;
        setCompanyNames(data);
        if (!companyFK) {
          const value = response?.data?.find((item) => item.LocalCompany === true);
          updateEditData("selectedCompanyName", value?.Name);
          updateEditData("companyFK", value?.CompanyPK);
        }
      })
      .catch((error) => {})
      .finally(() => setCompanyLoading(false));
  };

  const updateEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const fetchInvoiceData = (searchCriteria, searchTerm, pageNumber, sortType, sortValue) => {
    if (invoiceNumber !== "" || unitNumberLast5 !== "" || unitNumber !== "" || unitNumberId !== null) {
      setUnitLoading(true);
      ScanInvoiceService.getAllInvoiceBySearch(
        searchCriteria,
        searchTerm,
        pageNumber,
        7,
        selectedCompanyName === currentCompany?.name ? -1 : companyFK,
        selectedCompanyName,
        sortType,
        sortValue
      )
        .then((response) => {
          const data = response?.data;
          updateEditData("invoiceData", data?.content);
          if (!data?.content?.length) {
            updateEditData("invoicePK", null);
          }
          updateEditData("totalElements", data?.conttotalElementsent);
          updateEditData("totalPages", data?.totalPages);
        })
        .finally(() => {
          setUnitLoading(false);
          setUnitListLoading(false);
        });
    }
  };

  const fetchInvoiceDataAutocomplete = (searchCriteria, searchTerm) => {
    setUnitListLoading(true);
    ScanInvoiceService.getAllInvoiceBySearch(
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
        if (!trimmedList?.length) {
          updateEditData("invoiceData", []);
          updateEditData("invoicePK", null);
        }
        setUnitListLoading(false);
      })
      .catch((err) => {
        setUnitListLoading(false);
      });
  };

  const fetchRecordById = (invoicePK, searchCriteria, searchTerm) => {
    setLoading(true);
    if (invoicePK || invoiceById?.length === 0) {
      ScanInvoiceService.getInvoiceById(invoicePK, companyFK, selectedCompanyName, searchCriteria, searchTerm)
        .then((response) => {
          const data = response?.data;
          updateEditData("invoiceById", data);
          dispatch(
            setScanInvoicePayload({
              customerFK: data[0]?.customerFK,
              invoicePK: data[0]?.invoicePK,
            })
          );
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

  //  Lookup & AutoComplete validation
  useEffect(() => {
    if (!showUnitSelectionLookup && !invoiceData?.length) {
      updateEditData("unitNumberId", null);
    }
  }, [showUnitSelectionLookup, invoiceData]);

  const handleClick = (value) => {
    updateEditData("invoicePK", value);
  };

  useEffect(() => {
    updateEditData("companyName", selectedCompanyName);
  }, [selectedCompanyName]);

  /**
   * Handle AutoComplete Selection
   */
  const handleUnitNumberSelection = (e, type, sortType, sortValue) => {
    updateEditData("invoiceNumber", "");
    type === "autocomplete"
      ? e?.unitFK
        ? updateEditData("unitNumberId", e?.unitFK)
        : updateEditData("unitNumberId", e?.sisterUnitFK)
      : updateEditData("unitNumberId", e?.unitPK);
    updateEditData("searchCriteria", "UnitNumberSelect");
    updateEditData("searchTerm", e?.unitNumber);
    updateEditData("unitNumber", e?.unitNumber);
    fetchInvoiceData("UnitNumberSelect", e?.unitNumber, pageNumber, sortType, sortValue);
    setShowUnitSelectionLookup(false);
    updateEditData("invoiceNumber", "");
  };

  const handleUnitNumberSelectionForLookup = (e) => {
    updateEditData("invoiceNumber", "");
    updateEditData("unitNumberId", e?.UnitPK || e?.sisterUnitFK);
    updateEditData("searchCriteria", "UnitNumberSelect");
    updateEditData("searchTerm", e?.UnitNumber);
    updateEditData("unitNumber", e?.UnitNumber);
    updateEditData("pageNumber", 0);
    fetchInvoiceData("UnitNumberSelect", e?.UnitNumber, 0, sortType, sortValue);
    setShowUnitSelectionLookup(false);
    updateEditData("invoiceNumber", "");
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: invoiceData,
  };

  const reset = () => {
    updateEditData("unitNumber", "");
    updateEditData("invoiceNumber", "");
    updateEditData("unitNumberLast5", "");
  };
  useEffect(() => {
    if (cancelTrue) {
      reset();
    }
  }, [cancelTrue]);

  const onhandleNormalSort = (value, val) => {
    updateEditData("sortValue", value);
    updateEditData("sortType", val);
    fetchInvoiceData(searchCriteria, searchTerm, pageNumber, val, value);
  };

  useEffect(() => {
    fetchInvoiceData(searchCriteria, searchTerm, pageNumber, sortType, sortValue);
  }, [pageNumber, unitNumberId]);

  useEffect(() => {
    if (invoiceData?.length === 0 || searchTerm) {
      fetchInvoiceData(searchCriteria, searchTerm, pageNumber, sortType, sortValue);
    }
  }, []);

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
                      updateEditData("invoicePK", null);
                      updateEditData("invoiceById", []);
                      updateEditData("unitNumber", "");
                      updateEditData("unitNumberId", null);
                      updateEditData("invoiceNumber", e.target.value?.replace(/\D+/g, ""));
                      updateEditData("unitNumberLast5", "");
                      updateEditData("invoiceData", []);
                      updateEditData("invoicePK", null);
                      updateEditData("searchCriteria", "InvoiceNumber");
                      updateEditData("searchTerm", numberValidation(e.target.value?.replace(/\D+/g, "")));
                    }}
                    onFocus={() => {
                      setIsCompanyDisabled(true);
                      updateEditData("selectedCompanyName", currentCompany?.name);
                      updateEditData("companyFK", currentCompany?.companyPK);
                    }}
                    onBlur={(e) => {
                      setIsCompanyDisabled(false);
                      if (e.target.value) {
                        updateEditData("pageNumber", 0);
                        updateEditData("sortValue", "");
                        updateEditData("sortType", false);
                        updateEditData("nonUnitData", []);
                        updateEditData("unitNumberId", null);
                        updateEditData("unitNumber", "");
                        updateEditData("unitNumberLast5", "");
                        e.target.value.length >= 5 &&
                          fetchInvoiceData(
                            "InvoiceNumber",
                            numberValidation(e.target.value?.replace(/\D+/g, "")),
                            pageNumber
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
                      updateEditData("invoicePK", null);
                      updateEditData("invoiceById", []);
                      updateEditData("unitNumber", "");
                      updateEditData("invoiceNumber", "");
                      updateEditData("unitNumberId", null);
                      updateEditData("unitNumberLast5", e.target.value?.toUpperCase());
                      updateEditData("invoiceData", []);
                      updateEditData("searchCriteria", "Last5");
                      updateEditData("searchTerm", e.target.value?.toUpperCase());
                    }}

                    onBlur={(e) => {
                      if (e.target.value?.length === 5) {
                        updateEditData("invoiceNumber", "");
                        updateEditData("pageNumber", 0);
                        updateEditData("sortValue", "");
                        updateEditData("sortType", false);
                        updateEditData("nonUnitData", []);
                        updateEditData("unitNumberId", null);
                        updateEditData("unitNumber", "");
                        fetchInvoiceData("Last5", e.target.value?.toUpperCase(), pageNumber);
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
                    renderItemId={(unit) => (unit?.unitFK ? unit?.unitFK : unit?.sisterUnitFK)}
                    renderItemField={(unit) => unit?.unitNumber}
                    maxLength={21}
                    selectedId={unitNumberId}
                    handleSearchString={(string) => {
                      updateEditData("invoiceData", []);
                      updateEditData("invoicePK", null);

                      if (unitNumberId && unitNumber) {
                        updateEditData("invoiceNumber", "");
                      }
                      updateEditData("unitNumber", string?.trimStart()?.toUpperCase());
                    }}
                    fetchDataBySearchString={(string) => {
                      fetchInvoiceData("UnitNumberSelect", "", pageNumber, sortType, sortValue);

                      if (string?.length > 2 || unitNumberLast5 !== "") {
                        fetchInvoiceDataAutocomplete("UnitNumber", string?.trimStart()?.toUpperCase());
                      } else if (unitNumberId && unitNumber) {
                        fetchInvoiceDataAutocomplete("UnitNumber", unitNumber?.trimStart()?.toUpperCase());
                      } else {
                        setLookupData([]);
                      }
                    }}
                    loading={unitListLoading}
                    onSelect={(unit) => handleUnitNumberSelection(unit, "autocomplete", sortType, sortValue)}
                    clearInputCallback={() => {
                      setUnitId(null);
                      updateEditData("unitNumberId", null);
                    }}
                    handleAutoCompleteClose={() => {
                      if (unitNumber) {
                        updateEditData("invoiceData", []);
                        updateEditData("invoicePK", null);
                        updateEditData("unitNumber", "");
                        updateEditData("unitNumberLast5", "");
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
                      const [companyId, companyName] = e.target.value.split("-");
                      updateEditData("selectedCompanyName", companyName);
                      updateEditData("companyName", companyName);
                      updateEditData("companyFK", companyId);
                      updateEditData("unitNumber", "");
                      updateEditData("invoiceNumber", "");
                      updateEditData("unitNumberLast5", "");
                      updateEditData("invoiceData", []);
                      updateEditData("invoicePK", null);
                    }}
                    disabled={isCompanyDisabled || invoiceNumber}
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
                        <td>{invoice?.invoiceNumber}</td>
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
              handleLookupSelection={handleUnitNumberSelectionForLookup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanInvoiceUnitSelectionContent;
