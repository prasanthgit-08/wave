import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import EditInvoiceService from "../../../../services/Invoicing/EditInvoiceService";
import {
  resetFields,
  setCustomerName,
  setDealerId,
  setDealerName,
  setInvoiceById,
  setInvoiceData,
  setInvoicePK,
  setIsCreditCardRequired,
  setNonUnitCancel,
  setNonUnitData,
  setNonUnitInvoiceNumber,
  setNonUnitPoNumber,
  setNonUnitSortType,
  setNonUnitSortValue,
  setNonUnitUnitNumber,
  setPageNumberNonUnit,
  setSelectedCustomerId,
  setTotalElementsNonUnit,
  setTotalPagesNonUnit,
} from "../../../../redux/Invoicing/EditInvoiceSlice";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerService from "../../../../services/CustomerService";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import DealerService from "../../../../services/DealerService";
import numberValidation from "../../../../utils/validation/NumberValidation";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import { formatDate } from "../../../../utils/dateUtils";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import useDebouncer from "../../../../hooks/useDebouncer";
import LoadingIcon from "../../../common/LoadingIcon";

const InvoiceNonUnitSelectionContent = () => {
  const dispatch = useDispatch();
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);
  const nonUnitData = useSelector((state) => state.editInvoiceReducer.nonUnitData);
  const invoicePK = useSelector((state) => state.editInvoiceReducer.invoicePK);
  const totalPagesNonUnit = useSelector((state) => state.editInvoiceReducer.totalPagesNonUnit);
  const totalElementsNonUnit = useSelector((state) => state.editInvoiceReducer.totalElementsNonUnit);
  const pageNumberNonUnit = useSelector((state) => state.editInvoiceReducer.pageNumberNonUnit);
  const selectedCustomerId = useSelector((state) => state.editInvoiceReducer.selectedCustomerId);
  const customerName = useSelector((state) => state.editInvoiceReducer.customerName);
  const dealerName = useSelector((state) => state.editInvoiceReducer.dealerName);
  const dealerId = useSelector((state) => state.editInvoiceReducer.dealerId);
  const nonUnitCancel = useSelector((state) => state.editInvoiceReducer.nonUnitCancel);
  const nonUnitInvoiceNumber = useSelector((state) => state.editInvoiceReducer.nonUnitInvoiceNumber);
  const nonUnitUnitNumber = useSelector((state) => state.editInvoiceReducer.nonUnitUnitNumber);
  const nonUnitPoNumber = useSelector((state) => state.editInvoiceReducer.nonUnitPoNumber);
  const nonUnitSortType = useSelector((state) => state.editInvoiceReducer.nonUnitSortType);
  const nonUnitSortValue = useSelector((state) => state.editInvoiceReducer.nonUnitSortValue);
  const [loader, setLoader] = useState(false);
  const [dropdownLoader, setDropdownLoader] = useState(false);

  const fetchNonUnitData = useDebouncer(
    (
      invoiceNumber,
      unitNumber,
      poNumber,
      selectedCustomerId,
      dealerId,
      pageNumberNonUnit,
      nonUnitSortType,
      nonUnitSortValue
    ) => {
      setLoader(true);

      EditInvoiceService.getAllNonUnitsBySearch(
        invoiceNumber,
        unitNumber,
        poNumber,
        selectedCustomerId,
        dealerId,
        pageNumberNonUnit,
        5,
        nonUnitSortType,
        nonUnitSortValue
      )
        .then((response) => {
          if (invoiceNumber || unitNumber || poNumber || selectedCustomerId || dealerId) {
            const data = response?.data;

            dispatch(setNonUnitData(response?.data?.content));

            if (!data?.content?.length) {
              dispatch(setInvoicePK(null));
            }

            dispatch(setTotalElementsNonUnit(data?.totalElements));
            dispatch(setTotalPagesNonUnit(data?.totalPages));
            dispatch(setInvoiceById([]));
            dispatch(setInvoiceData([]));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoader(false);
        });
    },
    300
  );

  const handleClick = (value) => {
    dispatch(setInvoicePK(value));
  };

  useEffect(() => {
    if (
      nonUnitInvoiceNumber === "" &&
      nonUnitUnitNumber === "" &&
      nonUnitPoNumber === "" &&
      selectedCustomerId === null &&
      dealerId === null
    ) {
      dispatch(setNonUnitData([]));
      dispatch(setInvoicePK(null));
    }
  }, [
    customerName,
    dealerName,
    nonUnitInvoiceNumber,
    nonUnitUnitNumber,
    nonUnitPoNumber,
    selectedCustomerId,
    dealerId,
    pageNumberNonUnit,
    nonUnitSortType,
    nonUnitSortValue,
  ]);

  /**
   * Fetch all the customers.
   * Used for Customer Autocomplete
   */
  const fetchCustomerDetailsForAutocomplete = (string) => {
    setDropdownLoader(true);
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
      .finally(() => {
        setDropdownLoader(false);
      });
  };
  /**
   * used for Customer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleCustomerSelection = (customer) => {
    dispatch(setCustomerName(customer.name));
    dispatch(setSelectedCustomerId(customer.customerPK));
    fetchNonUnitData(
      nonUnitInvoiceNumber,
      nonUnitUnitNumber,
      nonUnitPoNumber,
      customer.customerPK,
      dealerId,
      pageNumberNonUnit,
      nonUnitSortType,
      nonUnitSortValue
    );
    dispatch(setPageNumberNonUnit(0));
    setShowCustomerLookup(false);
  };

  /**
   * Used for Pickup Dealer selection AutoComplete
   */
  const fetchDealerByName = (string) => {
    setDropdownLoader(true);
    DealerService.fetchAllDealerDetailsByName(string)
      .then((response) => {
        const data = response?.data;
        const dealerList = data?.content?.map((dealer) => ({
          ...dealer,
          name: dealer.name?.trim(),
        }));
        setDealersList(dealerList);
      })
      .catch((err) => {})
      .finally(() => {
        setDropdownLoader(false);
      });
  };
  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    dispatch(setDealerName(dealer.name));
    dispatch(setDealerId(dealer.dealerPK));
    fetchNonUnitData(
      nonUnitInvoiceNumber,
      nonUnitUnitNumber,
      nonUnitPoNumber,
      selectedCustomerId,
      dealer.dealerPK,
      pageNumberNonUnit,
      nonUnitSortType,
      nonUnitSortValue
    );
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

  useEffect(() => {
    if (nonUnitCancel) {
      dispatch(setNonUnitUnitNumber(""));
      dispatch(setNonUnitInvoiceNumber(""));
      dispatch(setNonUnitPoNumber(""));
      dispatch(setCustomerName(""));
      dispatch(setDealerId(null));
      dispatch(setDealerName(""));
      dispatch(setSelectedCustomerId(null));
      setCustomersList([]);
      setDealersList([]);
      dispatch(setNonUnitCancel(false));
      dispatch(resetFields());
    }
  }, [nonUnitCancel]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNonUnitSortValue(value));
    dispatch(setNonUnitSortType(val));
    fetchNonUnitData(
      nonUnitInvoiceNumber,
      nonUnitUnitNumber,
      nonUnitPoNumber,
      selectedCustomerId,
      dealerId,
      pageNumberNonUnit,
      val,
      value
    );
  };

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
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "432px" }}>
        <div className="ps-3 mb-4 ">
          {loader && <LoadingIcon />}
          <Row>
            <Col xs={7}>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
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
                    value={nonUnitInvoiceNumber}
                    maxLength={9}
                    onChange={(e) => {
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setNonUnitInvoiceNumber(e.target.value?.replace(/\D+/g, "")));
                      fetchNonUnitData(
                        numberValidation(e.target.value?.replace(/\D+/g, "")),
                        nonUnitUnitNumber,
                        nonUnitPoNumber,
                        selectedCustomerId,
                        dealerId,
                        0,
                        nonUnitSortType,
                        nonUnitSortValue
                      );
                    }}
                    onBlur={(e) => {
                      fetchNonUnitData(
                        numberValidation(e.target.value?.replace(/\D+/g, "")),
                        nonUnitUnitNumber,
                        nonUnitPoNumber,
                        selectedCustomerId,
                        dealerId,
                        pageNumberNonUnit,
                        nonUnitSortType,
                        nonUnitSortValue
                      );
                    }}
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
                    value={nonUnitUnitNumber}
                    maxLength={21}
                    onChange={(e) => {
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setNonUnitUnitNumber(e.target.value.toUpperCase()));
                      fetchNonUnitData(
                        nonUnitInvoiceNumber,
                        e.target.value.toUpperCase(),
                        nonUnitPoNumber,
                        selectedCustomerId,
                        dealerId,
                        0,
                        nonUnitSortType,
                        nonUnitSortValue
                      );
                    }}
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                    onBlur={(e) => {
                      fetchNonUnitData(
                        nonUnitInvoiceNumber,
                        e.target.value.toUpperCase(),
                        nonUnitPoNumber,
                        selectedCustomerId,
                        dealerId,
                        pageNumberNonUnit,
                        nonUnitSortType,
                        nonUnitSortValue
                      );
                    }}
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
                    value={nonUnitPoNumber}
                    maxLength={30}
                    onChange={(e) => {
                      dispatch(setPageNumberNonUnit(0));
                      dispatch(setNonUnitPoNumber(e.target.value));
                      fetchNonUnitData(
                        nonUnitInvoiceNumber,
                        nonUnitUnitNumber,
                        e.target.value,
                        selectedCustomerId,
                        dealerId,
                        0,
                        nonUnitSortType,
                        nonUnitSortValue
                      );
                    }}
                    onBeforeInput={(e) => {
                      if (e.data === " " && e.target.value?.trim().length === 0) {
                        e.preventDefault();
                      }
                    }}
                    onBlur={(e) => {
                      fetchNonUnitData(
                        nonUnitInvoiceNumber,
                        nonUnitUnitNumber,
                        e.target.value,
                        selectedCustomerId,
                        dealerId,
                        pageNumberNonUnit,
                        nonUnitSortType,
                        nonUnitSortValue
                      );
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </Form.Group>
              <Form.Group className="form-group mt-2 align-items-center row m-l-0 m-r-0 mb-2">
                <Col xs={4} className="p-0">
                  <Form.Label className="customColFormLabel">Customer</Form.Label>
                </Col>

                <Col xs={7} className="p-0 d-flex">
                  <AutoCompleteDropdown
                    arrayList={customersList}
                    searchString={customerName}
                    renderItemId={(customer) => customer.customerPK}
                    renderItemField={(customer) => customer.name}
                    loading={dropdownLoader}
                    handleSearchString={(string) => {
                      dispatch(setCustomerName(string?.trimStart()));
                      if (!string) {
                        fetchNonUnitData(
                          nonUnitInvoiceNumber,
                          nonUnitUnitNumber,
                          nonUnitPoNumber,
                          null,
                          dealerId,
                          pageNumberNonUnit,
                          nonUnitSortType,
                          nonUnitSortValue
                        );
                      }
                    }}
                    fetchDataBySearchString={fetchCustomerDetailsForAutocomplete}
                    onSelect={handleCustomerSelection}
                    maxLength={30}
                    selectedId={selectedCustomerId}
                    clearInputCallback={() => {
                      dispatch(setSelectedCustomerId(null));
                      dispatch(setPageNumberNonUnit(0));
                    }}
                    className={`${
                      (selectedCustomerId === "" || selectedCustomerId === null) && customerName !== ""
                        ? "borderRed"
                        : ""
                    }`}
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
              <Form.Group className="form-group mt-2 align-items-center row m-l-0 m-r-0 mb-2">
                <Col xs={4} className="p-0">
                  <Form.Label className="customColFormLabel">Dealer</Form.Label>
                </Col>

                <Col xs={7} className="p-0 d-flex">
                  {/* Dealer Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={dealersList}
                    searchString={dealerName}
                    renderItemId={(dealer) => dealer.dealerPK}
                    loading={dropdownLoader}
                    renderItemField={(dealer) => dealer.name}
                    maxLength={30}
                    selectedId={dealerId}
                    handleSearchString={(string) => {
                      dispatch(setDealerName(string?.trimStart()));

                      if (!string) {
                        fetchNonUnitData(
                          nonUnitInvoiceNumber,
                          nonUnitUnitNumber,
                          nonUnitPoNumber,
                          selectedCustomerId,
                          null,
                          pageNumberNonUnit,
                          nonUnitSortType,
                          nonUnitSortValue
                        );
                      }
                    }}
                    fetchDataBySearchString={fetchDealerByName}
                    onSelect={handleDealerSelection}
                    clearInputCallback={() => {
                      dispatch(setDealerId(null));
                      dispatch(setPageNumberNonUnit(0));
                    }}
                    className={`${(dealerId === "" || dealerId === null) && dealerName !== "" ? "borderRed" : ""}`}
                    maxHeight="200px"
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

          <Row className="mx-0 mt-4">
            <Col xs={12}>
              <div className="d-flex h-230px">
                <div className="w-100 border-1 border border-dark border-right-0">
                  <div className="fixTableHead" style={{ height: "220px" }}>
                    <table className="table table-striped f-w-600">
                      <thead>
                        <tr>
                          <th
                            className="f-w-600 col-2"
                            onClick={() => {
                              onhandleNormalSort("invoiceNumber", !nonUnitSortType);
                            }}
                          >
                            Invoice Number
                            {nonUnitSortType && nonUnitSortValue === "invoiceNumber" && (
                              <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!nonUnitSortType && nonUnitSortValue === "invoiceNumber" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>
                          <th
                            className="f-w-600 col-2"
                            onClick={() => {
                              onhandleNormalSort("invoiceDate", !nonUnitSortType);
                            }}
                          >
                            Invoice Date
                            {nonUnitSortType && nonUnitSortValue === "invoiceDate" && (
                              <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!nonUnitSortType && nonUnitSortValue === "invoiceDate" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>
                          <th
                            className="f-w-600 col-2"
                            onClick={() => {
                              onhandleNormalSort("unitNumber", !nonUnitSortType);
                            }}
                          >
                            Unit Number
                            {nonUnitSortType && nonUnitSortValue === "unitNumber" && (
                              <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!nonUnitSortType && nonUnitSortValue === "unitNumber" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>
                          <th
                            className="f-w-600 col-2"
                            onClick={() => {
                              onhandleNormalSort("poNumber", !nonUnitSortType);
                            }}
                          >
                            PO Number
                            {nonUnitSortType && nonUnitSortValue === "poNumber" && (
                              <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!nonUnitSortType && nonUnitSortValue === "poNumber" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>
                          <th
                            className="f-w-600 col-2"
                            onClick={() => {
                              onhandleNormalSort("customer", !nonUnitSortType);
                            }}
                          >
                            Customer
                            {nonUnitSortType && nonUnitSortValue === "customer" && (
                              <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!nonUnitSortType && nonUnitSortValue === "customer" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
                          </th>
                          <th
                            className="f-w-600 col-2"
                            onClick={() => {
                              onhandleNormalSort("dealer", !nonUnitSortType);
                            }}
                          >
                            Dealer
                            {nonUnitSortType && nonUnitSortValue === "dealer" && (
                              <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                            )}
                            {!nonUnitSortType && nonUnitSortValue === "dealer" && (
                              <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                            )}
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
                            <td>{invoice.invoiceNumber}</td>
                            <td>{formatDate(invoice?.invoiceDate)}</td>
                            <td>
                              <TruncatedStringWithTooltip
                                text={invoice?.miscellaneousUnit || ""}
                                charLimit={10}
                              />
                            </td>
                            <td>{invoice.poNumber}</td>
                            <td>
                              <TruncatedStringWithTooltip text={invoice?.customerName || ""} charLimit={15} />
                            </td>
                            <td>
                              <TruncatedStringWithTooltip text={invoice?.dealerName || ""} charLimit={15} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {nonUnitData?.length === 0 && <NoRecordsMessage />}
                  </div>
                </div>

                <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={5}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                  onPageChange={(page) =>
                    fetchNonUnitData(
                      nonUnitInvoiceNumber,
                      nonUnitUnitNumber,
                      nonUnitPoNumber,
                      selectedCustomerId,
                      dealerId,
                      page,
                      nonUnitSortType,
                      nonUnitSortValue
                    )
                  }
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default InvoiceNonUnitSelectionContent;
