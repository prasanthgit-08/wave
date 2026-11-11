import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import CustomerService from "../../../../services/CustomerService";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import DealerService from "../../../../services/DealerService";
import numberValidation from "../../../../utils/validation/NumberValidation";
import ScanInvoiceService from "../../../../services/Invoicing/ScanInvoiceService";
import { resetFields, setPageNumberNonUnit, updateField } from "../../../../redux/Invoicing/ScanInvoiceSlice";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import { formatDate } from "../../../../utils/dateUtils";
import TruncatedStringWithTooltip from "../../../common/TruncatedStringWithTooltip";
import useDebouncer from "../../../../hooks/useDebouncer";
import LoadingIcon from "../../../common/LoadingIcon";

const ScanInvoiceNonUnitSelectionContent = () => {
  const dispatch = useDispatch();
  const [showCustomerLookup, setShowCustomerLookup] = useState(false);
  const [customersList, setCustomersList] = useState([]);
  const [showDealerLookup, setShowDealerLookup] = useState(false);
  const [dealersList, setDealersList] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    nonUnitData,
    pageNumberNonUnit,
    totalPagesNonUnit,
    totalElementsNonUnit,
    invoicePK,
    selectedCustomerId,
    customerName,
    dealerName,
    dealerId,
    nonUnitCancel,
    nonUnitInvoiceNumber,
    nonUnitUnitnumber,
    nonUnitPONumber,
    nonUnitSortType,
    nonUnitSortValue,
  } = useSelector((state) => state.scanInvoiceReducer);

  const updateEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

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
      setLoading(true);
      ScanInvoiceService.getAllNonUnitsBySearch(
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
          if (
            nonUnitInvoiceNumber ||
            nonUnitUnitnumber ||
            nonUnitPONumber ||
            selectedCustomerId ||
            dealerId
          ) {
            const data = response?.data;
            updateEditData("nonUnitData", data?.content);
            if (!data?.content?.length) {
              updateEditData("invoicePK", null);
            }
            updateEditData("totalElementsNonUnit", data?.totalElements);
            updateEditData("totalPagesNonUnit", data?.totalPages);
            updateEditData("invoiceById", []);
            updateEditData("invoiceData", []);
          }
        })
        .finally(() => setLoading(false));
    },
    300
  );

  const handleClick = (value) => {
    updateEditData("invoicePK", value);
  };

  useEffect(() => {
    if (
      nonUnitInvoiceNumber === "" &&
      nonUnitUnitnumber === "" &&
      nonUnitPONumber === "" &&
      selectedCustomerId === null &&
      dealerId === null
    ) {
      updateEditData("nonUnitData", []);
      updateEditData("invoicePK", null);
    }
  }, [
    nonUnitInvoiceNumber,
    nonUnitUnitnumber,
    nonUnitPONumber,
    selectedCustomerId,
    dealerId,
    pageNumberNonUnit,
    nonUnitSortType,
    nonUnitSortValue,
    customerName,
    dealerName,
  ]);

  /**
   * Fetch all the customers.
   * Used for Customer Autocomplete
   */
  const fetchCustomerDetailsForAutocomplete = (string) => {
    CustomerService.getAllCustomerByName(string)
      .then((response) => {
        const data = response?.data;
        const customersList = (data?.content || []).map((customer) => ({
          ...customer,
          name: customer.name?.trim(),
        }));
        setCustomersList(customersList);
      })
      .catch((err) => {});
  };
  /**
   * used for Customer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleCustomerSelection = (customer) => {
    updateEditData("customerName", customer.name);
    updateEditData("selectedCustomerId", customer.customerPK);
    fetchNonUnitData(
      nonUnitInvoiceNumber,
      nonUnitUnitnumber,
      nonUnitPONumber,
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
    DealerService.fetchAllDealerDetailsByName(string)
      .then((response) => {
        const data = response?.data;
        const dealerList = data?.content?.map((dealer) => ({
          ...dealer,
          name: dealer.name?.trim(),
        }));
        setDealersList(dealerList);
      })
      .catch((err) => {});
  };
  /**
   * used for Dealer Autocomplete Dropdown & Lookup - onSelect
   */
  const handleDealerSelection = (dealer) => {
    updateEditData("dealerName", dealer.name);
    updateEditData("dealerId", dealer.dealerPK);
    fetchNonUnitData(
      nonUnitInvoiceNumber,
      nonUnitUnitnumber,
      nonUnitPONumber,
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
      updateEditData("nonUnitInvoiceNumber", "");
      updateEditData("nonUnitUnitnumber", "");
      updateEditData("nonUnitPONumber", "");
      updateEditData("customerName", "");
      updateEditData("dealerId", null);
      updateEditData("dealerName", "");
      updateEditData("selectedCustomerId", null);
      setCustomersList([]);
      setDealersList([]);
      updateEditData("nonUnitCancel", false);
      dispatch(resetFields());
    }
  }, [nonUnitCancel]);

  const onhandleNormalSort = (value, val) => {
    updateEditData("nonUnitSortValue", value);
    updateEditData("nonUnitSortType", val);
    fetchNonUnitData(
      nonUnitInvoiceNumber,
      nonUnitUnitnumber,
      nonUnitPONumber,
      selectedCustomerId,
      dealerId,
      pageNumberNonUnit,
      val,
      value
    );
  };

  return (
    <div className="m-1">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight" style={{ height: "432px" }}>
        <div className="ps-3 mb-4 ">
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
                      updateEditData("nonUnitInvoiceNumber", e.target.value?.replace(/\D+/g, ""));
                      fetchNonUnitData(
                        numberValidation(e.target.value?.replace(/\D+/g, "")),
                        nonUnitUnitnumber,
                        nonUnitPONumber,
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
                        nonUnitUnitnumber,
                        nonUnitPONumber,
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
                    value={nonUnitUnitnumber}
                    maxLength={21}
                    onChange={(e) => {
                      dispatch(setPageNumberNonUnit(0));
                      updateEditData("nonUnitUnitnumber", e.target.value.toUpperCase());
                      fetchNonUnitData(
                        nonUnitInvoiceNumber,
                        e.target.value.toUpperCase(),
                        nonUnitPONumber,
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
                        nonUnitPONumber,
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
                    value={nonUnitPONumber}
                    maxLength={30}
                    onChange={(e) => {
                      dispatch(setPageNumberNonUnit(0));
                      updateEditData("nonUnitPONumber", e.target.value);
                      fetchNonUnitData(
                        nonUnitInvoiceNumber,
                        nonUnitUnitnumber,
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
                        nonUnitUnitnumber,
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
                    handleSearchString={(string) => {
                      updateEditData("customerName", string?.trimStart());
                      if (!string) {
                        fetchNonUnitData(
                          nonUnitInvoiceNumber,
                          nonUnitUnitnumber,
                          nonUnitPONumber,
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
                      updateEditData("selectedCustomerId", null);
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
                    renderItemField={(dealer) => dealer.name}
                    selectedId={dealerId}
                    maxLength={30}
                    handleSearchString={(string) => {
                      updateEditData("dealerName", string?.trimStart());
                      if (!string) {
                        fetchNonUnitData(
                          nonUnitInvoiceNumber,
                          nonUnitUnitnumber,
                          nonUnitPONumber,
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
                      updateEditData("dealerId", null);
                      updateEditData("pageNumberNonUnit", 0);
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
                            <td>{formatDate(invoice.invoiceDate)}</td>
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
                      nonUnitUnitnumber,
                      nonUnitPONumber,
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

export default ScanInvoiceNonUnitSelectionContent;
