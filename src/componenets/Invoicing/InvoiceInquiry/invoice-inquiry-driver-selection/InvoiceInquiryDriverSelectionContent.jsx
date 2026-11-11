import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";

import {
  setInvoiceById,
  setInvoiceData,
  setInvoicePK,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setFirstName,
  setLastName,
  setSortValue,
  setSortType,
  setIsDriverUnitValid,
  setDriverFK,
  setUnitNumberForDriverInvoice,
  setInvoiceNumberForDriverInvoice,
  setUnitLast5ForDriverInvoice,
  setNonUnitNumberForDriverInvoice,
  setUnitIdForDriverInvoice,
  setSearchTermForDriverInvoice,
  setSearchCriteriaForDriverInvoice,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import { t } from "i18next";
import numberValidation from "../../../../utils/validation/NumberValidation";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import InvoiceInquiryService from "../../../../services/Invoicing/InvoiceInquiryService";
import DriverService from "../../../../services/DriverService";
import DriverLookup from "../../../LookupScreens/Driver/DriverLookup";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import AscendingIcon from "../../../common/AscendingIcon";
import DescendingIcon from "../../../common/DescendingIcon";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import { setBrowsePageNumber } from "../../../../redux/UnitStatus/UnitStatusSlice";
import LoadingIcon from "../../../common/LoadingIcon";
import useDebouncer from "../../../../hooks/useDebouncer";

const InvoiceInquiryDriverSelectionContent = () => {
  const pageNumber = useSelector((state) => state.invoiceInquiryReducer.pageNumber);
  const totalPages = useSelector((state) => state.invoiceInquiryReducer.totalPages);
  const totalElements = useSelector((state) => state.invoiceInquiryReducer.totalElements);
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const companyFK = useSelector((state) => state.invoiceInquiryReducer.companyFK);
  const invoiceData = useSelector((state) => state.invoiceInquiryReducer.invoiceData);
  const searchCriteriaForDriverInvoice = useSelector(
    (state) => state.invoiceInquiryReducer.searchCriteriaForDriverInvoice
  );
  const searchTermForDriverInvoice = useSelector(
    (state) => state.invoiceInquiryReducer.searchTermForDriverInvoice
  );
  const invoiceById = useSelector((state) => state.invoiceInquiryReducer.invoiceById);
  const companyName = useSelector((state) => state.invoiceInquiryReducer.companyName);
  const cancelTrue = useSelector((state) => state.invoiceInquiryReducer.cancelTrue);
  const firstName = useSelector((state) => state.invoiceInquiryReducer.firstName);
  const [driverNameLoading, setDriverNameLoading] = useState(false);
  const lastName = useSelector((state) => state.invoiceInquiryReducer.lastName);
  const sortType = useSelector((state) => state.invoiceInquiryReducer.sortType);
  const sortValue = useSelector((state) => state.invoiceInquiryReducer.sortValue);
  const isDriverUnitValid = useSelector((state) => state.invoiceInquiryReducer.isDriverUnitValid);
  const localCompany = useSelector((state) => state.invoiceInquiryReducer.localCompany);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const invoiceNumberForDriverInvoice = useSelector(
    (state) => state.invoiceInquiryReducer.invoiceNumberForDriverInvoice
  );
  const unitLast5ForDriverInvoice = useSelector(
    (state) => state.invoiceInquiryReducer.unitLast5ForDriverInvoice
  );
  const unitNumberForDriverInvoice = useSelector(
    (state) => state.invoiceInquiryReducer.unitNumberForDriverInvoice
  );
  const nonUnitNumberForDriverInvoice = useSelector(
    (state) => state.invoiceInquiryReducer.nonUnitNumberForDriverInvoice
  );
  const [lookupData, setLookupData] = useState([]);
  const [unitListLoading, setUnitListLoading] = useState(false);
  const unitIdForDriverInvoice = useSelector((state) => state.invoiceInquiryReducer.unitIdForDriverInvoice);
  const [driverData, setDriverData] = useState([]);
  const driverFK = useSelector((state) => state.invoiceInquiryReducer.driverFK);
  const [showDriverLookup, setshowDriverLookup] = useState(false);
  const [unitStatusLoading, setUnitStatusLoading] = useState(false);
  const [invoiceDataLoading, setInvoiceDataLoading] = useState(false);

  const driverSelectionModalHide = () => {
    setshowDriverLookup(false);
  };

  const fetchInvoiceData = (searchCriteria, searchTerm, pageNo, driverFK, sortValue, sortType) => {
    setInvoiceDataLoading(true);
    InvoiceInquiryService.getAllDriverInvoices(
      searchCriteria,
      searchTerm,
      pageNo || pageNumber,
      5,
      localCompany === true ? -1 : companyFK,
      selectedCompanyName,
      driverFK,
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
  };

  const debounceFetchInvoiceData = useDebouncer(fetchInvoiceData, 500);

  const fetchInvoiceDataAutocomplete = (searchCriteria, searchTerm) => {
    setUnitListLoading(true);
    InvoiceInquiryService.getAllDriverInvoices(
      searchCriteria,
      searchTerm,
      0,
      100,
      localCompany === true ? -1 : companyFK,
      selectedCompanyName,
      null
    )
      .then((response) => {
        const data = response?.data?.content;
        // Remove duplicates based on unitNumber
        const trimmedList = Array.from(
          new Map(
            data?.map((unit) => [
              (unit.unitNumber || unit.miscellaneousUnit)?.trim(),
              { ...unit, unitNumber: (unit.unitNumber || unit.miscellaneousUnit)?.trim() },
            ])
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
    InvoiceInquiryService.checkUnitStatus(unitId, localCompany === true ? -1 : companyFK, true)
      .then((response) => {
        dispatch(setIsDriverUnitValid(response?.data));
      })
      .catch(() => {
        dispatch(setIsDriverUnitValid(false));
      })
      .finally(() => setUnitStatusLoading(false));
  };

  const fetchDriverDataForAutoComplete = (searchCriteria, searchTerm, searchType) => {
    setDriverNameLoading(true);
    DriverService.getDriversForAutocomplete(searchCriteria, searchTerm, searchType, true)
      .then((response) => {
        const data = response?.data?.content;
        setDriverData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setDriverNameLoading(false));
  };
  const fetchRecordById = (invoicePK, searchCriteria, searchTerm) => {
    if (invoiceById?.length === 0) {
      InvoiceInquiryService.getInvoiceById(
        invoicePK,
        localCompany === true ? -1 : companyFK,
        companyName,
        searchCriteria,
        searchTerm
      )
        .then((response) => {
          const data = response?.data;
          dispatch(setInvoiceById(data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDriverLookupSelection = (driver) => {
    dispatch(setFirstName(driver?.firstName?.trim()));
    if (driver.lastName) {
      dispatch(setLastName(driver?.lastName?.trim()));
    }
    dispatch(setDriverFK(driver?.driverPK));
    setshowDriverLookup(false);
    dispatch(setInvoicePK(null));
  };

  useEffect(() => {
    if (invoicePK) {
      fetchRecordById(invoicePK);
    }
  }, [invoicePK]);

  useEffect(() => {
    debounceFetchInvoiceData(
      searchCriteriaForDriverInvoice,
      searchTermForDriverInvoice,
      pageNumber,
      driverFK,
      sortValue,
      sortType
    );
  }, [pageNumber]);

  useEffect(() => {
    if (!driverFK) {
      dispatch(setFirstName(""));
      dispatch(setLastName(""));
    }
  }, []);

  const handleClick = (value) => {
    dispatch(setInvoicePK(value));
  };

  /**
   * Handle AutoComplete Selection
   */
  const handleUnitNumberSelection = (e) => {
    dispatch(setSearchCriteriaForDriverInvoice("UnitNumberSelect"));
    dispatch(setSearchTermForDriverInvoice(e?.unitNumber));
    dispatch(setUnitNumberForDriverInvoice(e?.unitNumber));
    dispatch(setUnitIdForDriverInvoice(e?.unitFK));
    checkUnitStatus(e?.unitFK);
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    debounceFetchInvoiceData("UnitNumberSelect", e?.unitNumber);
    setShowUnitSelectionLookup(false);
    dispatch(setInvoicePK(null));
  };

  const handleUnitNumberLookupSelection = (e) => {
    dispatch(setSearchCriteriaForDriverInvoice("UnitNumberSelect"));
    dispatch(setSearchTermForDriverInvoice(e?.UnitNumber));
    dispatch(setUnitNumberForDriverInvoice(e?.UnitNumber));
    dispatch(setUnitIdForDriverInvoice(e?.UnitPK));
    checkUnitStatus(e?.UnitPK);
    dispatch(setFirstName(""));
    dispatch(setLastName(""));
    debounceFetchInvoiceData("UnitNumberSelect", e?.UnitNumber);
    setShowUnitSelectionLookup(false);
    dispatch(setBrowsePageNumber(0));
    dispatch(setInvoicePK(null));
  };

  const handleDriverSelection = (e) => {
    dispatch(setSearchCriteriaForDriverInvoice("DriverSelect"));
    dispatch(setSearchTermForDriverInvoice(e?.firstName));
    dispatch(setDriverFK(e?.driverPK));
    dispatch(setFirstName(e?.firstName));
    dispatch(setLastName(e?.lastName));
    dispatch(setPageNumber(0));
    dispatch(setInvoiceNumberForDriverInvoice(""));
    dispatch(setUnitNumberForDriverInvoice(""));
    dispatch(setNonUnitNumberForDriverInvoice(""));
    dispatch(setInvoicePK(null));
    debounceFetchInvoiceData("DriverSelect", e?.firstName, pageNumber, e?.driverPK);
  };

  const onhandleNormalSort = (value, val) => {
    setLoading(true);
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
    dispatch(setPageNumber(0));
    debounceFetchInvoiceData(
      searchCriteriaForDriverInvoice,
      searchTermForDriverInvoice,
      pageNumber,
      driverFK,
      value,
      val
    );
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
      dispatch(setUnitNumberForDriverInvoice(""));
      dispatch(setInvoiceNumberForDriverInvoice(""));
      dispatch(setUnitLast5ForDriverInvoice(""));
      dispatch(setNonUnitNumberForDriverInvoice(""));
    }
  }, [cancelTrue]);

  useEffect(() => {
    if (
      !invoiceNumberForDriverInvoice &&
      !firstName &&
      !lastName &&
      !unitNumberForDriverInvoice &&
      !unitLast5ForDriverInvoice &&
      !nonUnitNumberForDriverInvoice
    ) {
      dispatch(setInvoiceData([]));
      dispatch(setUnitNumberForDriverInvoice(""));
      dispatch(setSearchTermForDriverInvoice(""));
    }
  }, [
    invoiceNumberForDriverInvoice,
    firstName,
    lastName,
    unitNumberForDriverInvoice,
    unitLast5ForDriverInvoice,
  ]);

  return (
    <div className="m-1">
      {unitStatusLoading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "432px" }}>
        <div className="ps-3 mb-4 ">
          <Row>
            <Col xs={5}>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
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
                    value={invoiceNumberForDriverInvoice}
                    onChange={(e) => {
                      dispatch(setUnitLast5ForDriverInvoice(""));
                      dispatch(setUnitNumberForDriverInvoice(""));
                      dispatch(setNonUnitNumberForDriverInvoice(""));
                      dispatch(setFirstName(""));
                      dispatch(setLastName(""));
                      dispatch(setInvoiceNumberForDriverInvoice(numberValidation(e.target.value)));
                      dispatch(setSearchCriteriaForDriverInvoice("InvoiceNumber"));
                      dispatch(setSearchTermForDriverInvoice(numberValidation(e.target.value)));
                      dispatch(setPageNumber(0));
                      dispatch(setInvoicePK(null));
                      debounceFetchInvoiceData("InvoiceNumber", numberValidation(e.target.value));
                    }}
                    maxLength={9}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Col style={{ width: "1000px" }}>
                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                  <Col sm={1} md={1} xs={1} className="p-0">
                    <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                      Driver
                    </Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0 d-flex" style={{ marginLeft: "42px" }}>
                    <AutoCompleteDropdown
                      arrayList={driverData}
                      searchString={firstName}
                      searchPlaceholder="Enter First Name"
                      renderItemId={(driver) => driver?.driverPK}
                      renderItemField={(driver) => driver?.firstName}
                      handleSearchString={(string) => {
                        setDriverData([]);
                        dispatch(setInvoiceNumberForDriverInvoice(""));
                        dispatch(setUnitLast5ForDriverInvoice(""));
                        dispatch(setNonUnitNumberForDriverInvoice(""));
                        dispatch(setPageNumber(0));
                        dispatch(setFirstName(string));
                        dispatch(setLastName(""));
                        dispatch(setInvoicePK(null));
                        if (!string) {
                          dispatch(setSearchCriteriaForDriverInvoice(""));
                          dispatch(setSearchTermForDriverInvoice(""));
                          dispatch(setPageNumber(0));
                          debounceFetchInvoiceData(
                            searchCriteriaForDriverInvoice,
                            searchTermForDriverInvoice
                          );
                        }
                      }}
                      fetchDataBySearchString={(string) => {
                        fetchDriverDataForAutoComplete(string?.toUpperCase(), "firstName");
                      }}
                      loading={driverNameLoading}
                      onSelect={handleDriverSelection}
                      selectedId={driverFK}
                      clearInputCallback={() => {
                        dispatch(setDriverFK(null));
                        dispatch(setInvoiceData([]));
                      }}
                      handleAutoCompleteClose={() => {
                        dispatch(setFirstName(""));
                        dispatch(setLastName(""));
                      }}
                      className={!firstName || driverFK ? "" : "borderRed"}
                      disabled={false}
                    />
                  </Col>
                  <Col xs={4} md={4} sm={4} className="d-flex" style={{ width: "300px", marginLeft: "-2px" }}>
                    <AutoCompleteDropdown
                      arrayList={driverData}
                      searchString={lastName}
                      searchPlaceholder="Enter Last Name"
                      renderItemId={(driver) => driver?.driverPK}
                      renderItemField={(driver) => driver?.lastName}
                      handleSearchString={(string) => {
                        dispatch(setFirstName(""));
                        setDriverData([]);
                        dispatch(setInvoiceNumberForDriverInvoice(""));
                        dispatch(setUnitLast5ForDriverInvoice(""));
                        dispatch(setNonUnitNumberForDriverInvoice(""));
                        dispatch(setLastName(string));
                        dispatch(setInvoicePK(null));
                        if (!string) {
                          dispatch(setSearchCriteriaForDriverInvoice(""));
                          dispatch(setSearchTermForDriverInvoice(""));
                          dispatch(setPageNumber(0));
                          debounceFetchInvoiceData(
                            searchCriteriaForDriverInvoice,
                            searchTermForDriverInvoice
                          );
                        }
                      }}
                      fetchDataBySearchString={(string) => {
                        fetchDriverDataForAutoComplete(string?.toUpperCase(), "lastName");
                      }}
                      loading={driverNameLoading}
                      onSelect={handleDriverSelection}
                      selectedId={driverFK}
                      clearInputCallback={() => {
                        dispatch(setDriverFK(null));
                        dispatch(setInvoiceData([]));
                      }}
                      handleAutoCompleteClose={() => {
                        dispatch(setLastName(""));
                        dispatch(setFirstName(""));
                      }}
                      className={!lastName || driverFK ? "" : "borderRed"}
                      disabled={false}
                    />
                    <LookupButton
                      onClick={() => {
                        setshowDriverLookup(true);
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Unit Last 5
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumberLast5"
                    name="unitNumberLast5"
                    type="text"
                    value={unitLast5ForDriverInvoice?.toUpperCase()}
                    onChange={(e) => {
                      dispatch(setInvoiceNumberForDriverInvoice(""));
                      dispatch(setUnitNumberForDriverInvoice(""));
                      dispatch(setNonUnitNumberForDriverInvoice(""));
                      dispatch(setUnitLast5ForDriverInvoice(e.target.value?.toUpperCase()));
                      dispatch(setSearchCriteriaForDriverInvoice("Last5"));
                      dispatch(setSearchTermForDriverInvoice(e.target.value?.toUpperCase()));
                      dispatch(setInvoicePK(null));
                      debounceFetchInvoiceData("Last5", e.target.value.toUpperCase());
                    }}
                    maxLength={5}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Col style={{ width: "1000px" }}>
                <Form.Group className="form-group mt-2 align-items-center row m-l-0 m-r-0">
                  <Col xs={4} className="p-0">
                    <Form.Label className="customColFormLabel">Unit Number</Form.Label>
                  </Col>

                  <Col xs={4} className="p-0 d-flex" style={{ width: "292px", marginLeft: "-208px" }}>
                    <AutoCompleteDropdown
                      arrayList={lookupData}
                      searchString={unitNumberForDriverInvoice?.toUpperCase()}
                      renderItemId={(unit) => unit?.unitFK}
                      renderItemField={(unit) => unit?.unitNumber}
                      allowSearchOnLength={3}
                      setArrayList={setLookupData}
                      handleSearchString={(string) => {
                        setLookupData([]);
                        dispatch(setInvoiceNumberForDriverInvoice(""));
                        dispatch(setUnitLast5ForDriverInvoice(""));
                        dispatch(setNonUnitNumberForDriverInvoice(""));
                        dispatch(setUnitNumberForDriverInvoice(string));
                        dispatch(setFirstName(""));
                        dispatch(setLastName(""));
                        dispatch(setInvoicePK(null));
                        if (!string) {
                          dispatch(setPageNumber(0));
                          dispatch(setSearchCriteriaForDriverInvoice(""));
                          dispatch(setSearchTermForDriverInvoice(""));
                        }
                      }}
                      fetchDataBySearchString={(string) => {
                        fetchInvoiceDataAutocomplete("UnitNumber", string?.toUpperCase());
                      }}
                      loading={unitListLoading}
                      onSelect={handleUnitNumberSelection}
                      clearInputCallback={() => {
                        dispatch(setUnitIdForDriverInvoice(null));
                        dispatch(setInvoiceData([]));
                      }}
                      maxLength={21}
                      handleAutoCompleteClose={() => {
                        dispatch(setInvoiceData([]));
                        dispatch(setUnitNumberForDriverInvoice(""));
                        dispatch(setPageNumber(0));
                        dispatch(setSearchCriteriaForDriverInvoice(""));
                        dispatch(setSearchTermForDriverInvoice(""));
                      }}
                      className={
                        !unitNumberForDriverInvoice || (unitIdForDriverInvoice && isDriverUnitValid)
                          ? ""
                          : "borderRed"
                      }
                      disabled={false}
                    />

                    <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
                  </Col>
                </Form.Group>
              </Col>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                    Non Unit Number
                  </Form.Label>
                </Col>

                <Col xs={4} md={4} sm={4} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="nonUnitNumber"
                    name="nonUnitNumber"
                    type="text"
                    value={nonUnitNumberForDriverInvoice?.toUpperCase()}
                    onChange={(e) => {
                      dispatch(setInvoiceNumberForDriverInvoice(""));
                      dispatch(setUnitLast5ForDriverInvoice(""));
                      dispatch(setUnitNumberForDriverInvoice(""));
                      dispatch(setFirstName(""));
                      dispatch(setLastName(""));
                      dispatch(setNonUnitNumberForDriverInvoice(e.target.value));
                      dispatch(setSearchCriteriaForDriverInvoice("NonUnitNumber"));
                      dispatch(setSearchTermForDriverInvoice(e.target.value));
                      dispatch(setPageNumber(0));
                      dispatch(setInvoicePK(null));
                      debounceFetchInvoiceData("NonUnitNumber", e.target.value?.toUpperCase());
                    }}
                    maxLength={21}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex h-100 mt-4 mx-2">
            <div className="w-100 border-1 border border-dark border-right-0">
              <div className="fixTableHead " style={{ height: "210px" }}>
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
                        {sortValue === "invoiceNumber" ? (
                          sortType ? (
                            <AscendingIcon />
                          ) : (
                            <DescendingIcon />
                          )
                        ) : null}
                      </th>
                      <th
                        className="f-w-600 col-2"
                        onClick={() => {
                          onhandleNormalSort("invoiceDate", !sortType);
                        }}
                      >
                        Invoice Date
                        {sortValue === "invoiceDate" ? (
                          sortType ? (
                            <AscendingIcon />
                          ) : (
                            <DescendingIcon />
                          )
                        ) : null}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("driver", !sortType);
                        }}
                      >
                        Driver
                        {sortValue === "driver" ? sortType ? <AscendingIcon /> : <DescendingIcon /> : null}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("unitNumber", !sortType);
                        }}
                      >
                        Unit Number
                        {sortValue === "unitNumber" ? (
                          sortType ? (
                            <AscendingIcon />
                          ) : (
                            <DescendingIcon />
                          )
                        ) : null}
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
                        <td>
                          <TruncatedStringWithTooltip
                            text={String(invoice.invoiceNumber || "")}
                            charLimit={10}
                          />
                        </td>

                        <td className="f-w-600">{customFormatDate(invoice.invoiceDate)}</td>
                        <td>
                          <TruncatedStringWithTooltip text={String(invoice.driver || "")} charLimit={10} />
                        </td>
                        <td>
                          {invoice.miscellaneousUnit ? (
                            <TruncatedStringWithTooltip
                              text={String(invoice.miscellaneousUnit || "")}
                              charLimit={10}
                            />
                          ) : (
                            <TruncatedStringWithTooltip
                              text={String(invoice.unitNumber || "")}
                              charLimit={10}
                            />
                          )}
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
                    <h2 className="empty-list" align="center">
                      {t("dealers.list.empty.message")}
                    </h2>
                  )
                )}
              </div>
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={5}
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

            <DriverLookup
              show={showDriverLookup}
              onHide={driverSelectionModalHide}
              renderItemId={(driver) => driver.driverPK}
              handleLookupSelection={handleDriverLookupSelection}
              MaintenanceProgram
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInquiryDriverSelectionContent;
