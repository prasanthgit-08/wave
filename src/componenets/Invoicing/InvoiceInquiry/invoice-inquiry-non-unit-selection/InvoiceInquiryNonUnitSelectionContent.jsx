import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import {
  setCustomerName,
  setDealerId,
  setDealerName,
  setInvoicePK,
  setNonUnitData,
  setPageNumberNonUnit,
  setSelectedCustomerId,
  setTotalElementsNonUnit,
  setTotalPagesNonUnit,
  setSortType,
  setSortValue,
  setInvoiceNumberNonUnit,
  setUnitNumberNonUnit,
  setPoNumber,
  setSortTypeNonUnit,
  setSortValueNonUnit,
} from "../../../../redux/Invoicing/InvoiceInquirySlice";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerService from "../../../../services/CustomerService";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import DealerService from "../../../../services/DealerService";
import numberValidation from "../../../../utils/validation/NumberValidation";
import InvoiceInquiryService from "../../../../services/Invoicing/InvoiceInquiryService";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";
import { t } from "i18next";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import useDebouncer from "../../../../hooks/useDebouncer";

const InvoiceInquiryNonUnitSelectionContent = () => {
  const dispatch = useDispatch();
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState(false);
  const nonUnitData = useSelector((state) => state.invoiceInquiryReducer.nonUnitData);
  const invoicePK = useSelector((state) => state.invoiceInquiryReducer.invoicePK);
  const totalPagesNonUnit = useSelector((state) => state.invoiceInquiryReducer.totalPagesNonUnit);
  const totalElementsNonUnit = useSelector((state) => state.invoiceInquiryReducer.totalElementsNonUnit);
  const pageNumberNonUnit = useSelector((state) => state.invoiceInquiryReducer.pageNumberNonUnit);
  const selectedCustomerId = useSelector((state) => state.invoiceInquiryReducer.selectedCustomerId);
  const customerName = useSelector((state) => state.invoiceInquiryReducer.customerName);
  const dealerName = useSelector((state) => state.invoiceInquiryReducer.dealerName);
  const dealerId = useSelector((state) => state.invoiceInquiryReducer.dealerId);
  const nonUnitCancel = useSelector((state) => state.invoiceInquiryReducer.nonUnitCancel);
  const sortValueNonUnit = useSelector((state) => state.invoiceInquiryReducer.sortValueNonUnit);
  const sortTypeNonUnit = useSelector((state) => state.invoiceInquiryReducer.sortTypeNonUnit);
  const [loading, setLoading] = useState(true);

  const invoiceNumberNonUnit = useSelector((state) => state.invoiceInquiryReducer.invoiceNumberNonUnit);
  const unitNumberNonUnit = useSelector((state) => state.invoiceInquiryReducer.unitNumberNonUnit);
  const poNumber = useSelector((state) => state.invoiceInquiryReducer.poNumber);

  const fetchNonUnitData = useDebouncer(
    (invoiceNumber, unitNumber, poNumber, selectedCustomerId, dealerId) => {
      InvoiceInquiryService.getAllNonUnitsBySearch(
        invoiceNumber,
        unitNumber,
        poNumber,
        selectedCustomerId,
        dealerId,
        pageNumberNonUnit,
        sortValueNonUnit,
        sortTypeNonUnit
      )
        .then((response) => {
          const data = response?.data;
          dispatch(setNonUnitData(data?.content));
          dispatch(setTotalElementsNonUnit(data?.totalElements));
          dispatch(setTotalPagesNonUnit(data?.totalPages));
        })
        .catch((error) => {
          console.error("Error fetching non-unit data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    500
  );

  const handleClick = (value) => {
    dispatch(setInvoicePK(value));
  };

  const onhandleNormalSort = (value, val) => {
    setLoading(true);
    dispatch(setSortValueNonUnit(value));
    dispatch(setSortTypeNonUnit(val));
  };

  useEffect(() => {
    fetchNonUnitData(
      invoiceNumberNonUnit,
      unitNumberNonUnit,
      poNumber,
      selectedCustomerId,
      dealerId,
      sortValueNonUnit,
      sortTypeNonUnit
    );
  }, [pageNumberNonUnit, sortTypeNonUnit, sortValueNonUnit]);

  useEffect(() => {
    if (
      invoiceNumberNonUnit === "" &&
      !unitNumberNonUnit &&
      !poNumber &&
      selectedCustomerId === null &&
      dealerId === null
    ) {
      dispatch(setNonUnitData([]));
    }
  }, [invoiceNumberNonUnit, unitNumberNonUnit, poNumber, selectedCustomerId, dealerId, pageNumberNonUnit]);

  /**
   * Fetch all the customers.
   * Used for Customer Autocomplete
   */
  const fetchCustomerDetailsForAutocomplete = (string) => {
    setDropdownLoading(true);
    CustomerService.getAllCustomerByName(string)
      .then((response) => {
        const data = response?.data;
        const customersList = (data?.content || []).map((customer) => ({
          ...customer,
          name: customer.name?.trim(),
        }));
        setCustomersList(customersList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };
  /**
   * used for Customer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleCustomerSelection = (customer) => {
    dispatch(setCustomerName(customer.name));
    dispatch(setSelectedCustomerId(customer.customerPK));
    fetchNonUnitData(invoiceNumberNonUnit, unitNumberNonUnit, poNumber, customer.customerPK, dealerId);
    dispatch(setPageNumberNonUnit(0));
    setShowCustomerLookup(false);
  };

  /**
   * Used for Pickup Dealer selection AutoComplete
   */
  const fetchDealerByName = (string) => {
    setDropdownLoading(true);
    DealerService.fetchAllDealerDetailsByName(string)
      .then((response) => {
        const data = response?.data;
        const dealerList = (data?.content || []).map((dealer) => ({
          ...dealer,
          name: dealer.name?.trim(),
        }));
        setDealersList(dealerList);
      })
      .catch((err) => {})
      .finally(() => setDropdownLoading(false));
  };
  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    dispatch(setDealerName(dealer?.name));
    dispatch(setDealerId(dealer?.dealerPK));
    fetchNonUnitData(invoiceNumberNonUnit, unitNumberNonUnit, poNumber, selectedCustomerId, dealer.dealerPK);
    dispatch(setPageNumberNonUnit(0));
    setShowDealerLookup(false);
  };

  const paginationProps = {
    pageNumber: pageNumberNonUnit,
    setPageNumber: setPageNumberNonUnit,
    totalPages: totalPagesNonUnit,
    totalElements: totalElementsNonUnit,
    listingData: nonUnitData,
  };

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "432px" }}>
        <div className="ps-3 mb-4 ">
          <Row>
            <Col xs={7}>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label
                    htmlFor="invoiceNumber"
                    className={`col-form-label  dealer-label`}
                    id="invoiceNumber"
                  >
                    Invoice Number
                  </Form.Label>
                </Col>

                <Col xs={3} md={3} sm={3} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="unitNumber"
                    name="unitNumber"
                    type="text"
                    value={invoiceNumberNonUnit}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        dispatch(setInvoiceNumberNonUnit(numberValidation(e.target.value)));
                        fetchNonUnitData(
                          numberValidation(e.target.value),
                          unitNumberNonUnit,
                          poNumber,
                          selectedCustomerId,
                          dealerId
                        );
                        dispatch(setPageNumberNonUnit(0));
                        dispatch(setSortType(false));
                        dispatch(setSortValue(null));
                      }

                      if (!e.target.value) {
                        fetchNonUnitData("", unitNumberNonUnit, poNumber, selectedCustomerId, dealerId);
                      }
                    }}
                    maxLength={9}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="UnitNumber"
                    name="UnitNumber"
                    type="text"
                    value={unitNumberNonUnit?.toUpperCase()}
                    onChange={(e) => {
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                      fetchNonUnitData(
                        invoiceNumberNonUnit,
                        e.target.value,
                        poNumber,
                        selectedCustomerId,
                        dealerId
                      );
                      dispatch(setUnitNumberNonUnit(e.target.value));

                      if (!e.target.value) {
                        fetchNonUnitData(invoiceNumberNonUnit, "", poNumber, selectedCustomerId, dealerId);
                      }
                    }}
                    maxLength={21}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
                <Col sm={4} md={4} xs={4} className="p-0">
                  <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                    PO Number
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} sm={7} className="p-0">
                  <input
                    className={`customFormControl`}
                    id="last5"
                    name="last5"
                    type="text"
                    value={poNumber}
                    onChange={(e) => {
                      dispatch(setPoNumber(e.target.value));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                      dispatch(setPageNumberNonUnit(0));
                      fetchNonUnitData(
                        invoiceNumberNonUnit,
                        unitNumberNonUnit,
                        e.target.value,
                        selectedCustomerId,
                        dealerId
                      );

                      if (!e.target.value) {
                        fetchNonUnitData(
                          invoiceNumberNonUnit,
                          unitNumberNonUnit,
                          "",
                          selectedCustomerId,
                          dealerId
                        );
                      }
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-2 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={4} className="p-0">
                  <Form.Label className="customColFormLabel">Customer</Form.Label>
                </Col>

                <Col xs={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customersList}
                    searchString={customerName}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    handleSearchString={(string) => {
                      dispatch(setCustomerName(string));
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                      if (!string) {
                        dispatch(setSelectedCustomerId(null));
                        fetchNonUnitData(invoiceNumberNonUnit, unitNumberNonUnit, poNumber, null, dealerId);
                      }
                    }}
                    fetchDataBySearchString={fetchCustomerDetailsForAutocomplete}
                    loading={dropdownLoading}
                    onSelect={handleCustomerSelection}
                    selectedId={selectedCustomerId}
                    clearInputCallback={() => {
                      dispatch(setSelectedCustomerId(null));
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                    }}
                    className={`${
                      (selectedCustomerId === "" || selectedCustomerId === null) && customerName !== ""
                        ? "borderRed"
                        : ""
                    }`}
                    handleAutoCompleteClose={() => {
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                    }}
                  />
                  <LookupButton onClick={() => setShowCustomerLookup(true)} />
                  {/* Customer Lookup Modal */}
                  <CustomerLookup
                    show={showCustomerLookup}
                    onHide={() => setShowCustomerLookup(false)}
                    renderItemId={(customer) => customer.customerPK}
                    handleLookupSelection={handleCustomerSelection}
                    MaintenanceProgram
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-2 align-items-center row m-l-0 m-r-0 mb-3">
                <Col xs={4} className="p-0">
                  <Form.Label className="customColFormLabel">Dealer</Form.Label>
                </Col>

                <Col xs={7} className="p-0 d-flex">
                  {/* Dealer Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={dealersList}
                    searchString={dealerName}
                    renderItemId={(dealer) => dealer.dealerPK}
                    renderItemField={(dealer) => dealer.name}
                    selectedId={dealerId}
                    handleSearchString={(string) => {
                      dispatch(setDealerName(string));
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                      if (!string) {
                        dispatch(setDealerId(null));
                        fetchNonUnitData(
                          invoiceNumberNonUnit,
                          unitNumberNonUnit,
                          poNumber,
                          selectedCustomerId,
                          null
                        );
                      }
                    }}
                    fetchDataBySearchString={fetchDealerByName}
                    loading={dropdownLoading}
                    onSelect={handleDealerSelection}
                    clearInputCallback={() => {
                      dispatch(setDealerId(null));
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                    }}
                    handleAutoCompleteClose={() => {
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setSortType(false));
                      dispatch(setSortValue(null));
                    }}
                    className={`${(dealerId === "" || dealerId === null) && dealerName !== "" ? "borderRed" : ""}`}
                  />
                  <LookupButton onClick={() => setShowDealerLookup(true)} />
                  {/* Dealer Lookup Modal */}
                  <DealerLookup
                    show={showDealerLookup}
                    onHide={() => setShowDealerLookup(false)}
                    renderItemId={(dealer) => dealer.dealerPK}
                    handleLookupSelection={handleDealerSelection}
                    MaintenanceProgram
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex h-100">
            <div className="w-95 border-1 border border-dark border-right-0" style={{ height: "220px" }}>
              <div className="fixTableHead">
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr>
                      <th
                        className="f-w-600 col-2"
                        onClick={() => {
                          onhandleNormalSort("invoiceNumber", !sortTypeNonUnit);
                        }}
                      >
                        Invoice Number
                        {sortTypeNonUnit && sortValueNonUnit === "invoiceNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortTypeNonUnit && sortValueNonUnit === "invoiceNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-2"
                        onClick={() => {
                          onhandleNormalSort("invoiceDate", !sortTypeNonUnit);
                        }}
                      >
                        Invoice Date
                        {sortTypeNonUnit && sortValueNonUnit === "invoiceDate" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortTypeNonUnit && sortValueNonUnit === "invoiceDate" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("unitNumber", !sortTypeNonUnit);
                        }}
                      >
                        Unit Number
                        {sortTypeNonUnit && sortValueNonUnit === "unitNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortTypeNonUnit && sortValueNonUnit === "unitNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("poNumber", !sortTypeNonUnit);
                        }}
                      >
                        PO Number{" "}
                        {sortTypeNonUnit && sortValueNonUnit === "poNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortTypeNonUnit && sortValueNonUnit === "poNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("customer", !sortTypeNonUnit);
                        }}
                      >
                        Customer{" "}
                        {sortTypeNonUnit && sortValueNonUnit === "customer" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortTypeNonUnit && sortValueNonUnit === "customer" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600"
                        onClick={() => {
                          onhandleNormalSort("dealer", !sortTypeNonUnit);
                        }}
                      >
                        Dealer{" "}
                        {sortTypeNonUnit && sortValueNonUnit === "dealer" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!sortTypeNonUnit && sortValueNonUnit === "dealer" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {nonUnitData?.map((invoice) => (
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
                          <TruncatedStringWithTooltip
                            text={String(invoice.miscellaneousUnit || "")}
                            charLimit={10}
                          />
                        </td>

                        <td>
                          <TruncatedStringWithTooltip text={String(invoice.poNumber || "")} charLimit={10} />
                        </td>

                        <td>
                          <TruncatedStringWithTooltip
                            text={String(invoice.customerName || "")}
                            charLimit={10}
                          />
                        </td>

                        <td>
                          <TruncatedStringWithTooltip
                            text={String(invoice.dealerName || "")}
                            charLimit={10}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {loading ? (
                  <div className="fade modal-backdrop show">
                    <div className="pos-center">
                      <div className="loader"></div>
                    </div>
                  </div>
                ) : (
                  nonUnitData?.length === 0 && (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInquiryNonUnitSelectionContent;
