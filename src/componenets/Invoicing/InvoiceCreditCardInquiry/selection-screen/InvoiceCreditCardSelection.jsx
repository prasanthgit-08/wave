import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setPageNumber } from "../../../../redux/Invoicing/CreditCardEnquirySlice";
import LookupButton from "../../../common/LookupButton";
import CreditCardEnquiryService from "../../../../services/Invoicing/CreditCardEnquiryService";
import { updateField, updateMultipleFields } from "../../../../redux/Invoicing/CreditCardEnquirySlice";
import NoRecordsMessage from "../../../common/NoRecordsMessage";
import UnitSelectionLookup from "../../../LookupScreens/UnitSelection/UnitSelectionLookup";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import numberValidation from "../../../../utils/validation/NumberValidation";

export const InvoiceCreditCardSelection = () => {
  // change the below code
  const listingData = useSelector((state) => state.yardEmailReducer.listingData);
  const unitNumberInput = useSelector((state) => state.creditCardEnquirySlice.unitNumberInput);
  const unitNumberPK = useSelector((state) => state.creditCardEnquirySlice.unitNumberPK);
  const pageNumber = useSelector((state) => state.creditCardEnquirySlice.pageNumber);
  const totalPages = useSelector((state) => state.creditCardEnquirySlice.totalPages);
  const totalElements = useSelector((state) => state.creditCardEnquirySlice.totalElements);
  const selectedId = useSelector((state) => state.creditCardEnquirySlice.selectedId);
  const unitNumberLast5 = useSelector((state) => state.creditCardEnquirySlice.unitNumberLast5);
  const creditCardEnquiryList = useSelector((state) => state.creditCardEnquirySlice.creditCardEnquiryList);
  const creditCardEnquiryView = useSelector((state) => state.creditCardEnquirySlice.creditCardEnquiryView);
  const loading = useSelector((state) => state.creditCardEnquirySlice.loading);
  const invoiceNumber = useSelector((state) => state.creditCardEnquirySlice.invoiceNumber);
  const cclast4 = useSelector((state) => state.creditCardEnquirySlice.cclast4);
  const searchCriteria = useSelector((state) => state.creditCardEnquirySlice.searchCriteria);
  const searchTerm = useSelector((state) => state.creditCardEnquirySlice.searchTerm);
  const pageNumberView = useSelector((state) => state.creditCardEnquirySlice.pageNumberView);
  const selectedPK = useSelector((state) => state.creditCardEnquirySlice.selectedPK);
  const selectedInvoiceNo = useSelector((state) => state.creditCardEnquirySlice.selectedInvoiceNo);
  const showWarning = useSelector((state) => state.creditCardEnquirySlice.showWarning);
  const pageNumberAuto = useSelector((state) => state.creditCardEnquirySlice.pageNumberAuto);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    loading,
    totalElements,
    listingData: creditCardEnquiryList,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unitNumbers, setUnitNumbers] = useState([]);
  const [showUnitSelectionLookup, setShowUnitSelectionLookup] = useState(false);
  const [unitLoading, setUnitLoading] = useState(false);

  /* Handler Functions */

  const updateValue = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const resetValues = () => {
    dispatch(
      updateMultipleFields({
        unitNumberPK: "",
        creditCardEnquiryList: [],
        selectedId: null,
        pageNumber: 0,
        pageNumberView: 0,
        pageNumberAuto: 0,
      })
    );
  };

  const findBySearchTerm = (searchCriteria, searchTerm, pageNumber) => {
    let searchObject = {
      unitNumber: "",
      unitNumberLast5: "",
      invoiceNumber: "",
      creditCardLast4: "",
      pageNumber: pageNumber || 0,
    };
    if (searchTerm !== "") {
      if (searchCriteria === "Last5") {
        if (searchTerm) {
          searchObject.unitNumberLast5 = searchTerm;
        } else resetValues();
      }
      if (searchCriteria === "UnitNumber") {
        if (searchTerm) {
          searchObject.unitNumber = searchTerm;
        } else resetValues();
      }
      if (searchCriteria === "InvoiceNumber") {
        if (searchTerm) {
          searchObject.invoiceNumber = searchTerm;
        } else resetValues();
      }
      if (searchCriteria === "CreditCardLast4") {
        if (searchTerm) {
          searchObject.creditCardLast4 = searchTerm;
        } else resetValues();
      }
    }
    updateValue("loading", true);
    CreditCardEnquiryService.getCreditCardEnquiryList(searchObject)
      .then((response) => {
        const data = response?.data;
        const paginationData = data?.find((item) => item.Type === "Pagination");
        data?.pop();

        updateValue("totalPages", paginationData.TotalPages);
        updateValue("totalElements", paginationData.TotalElements);
        updateValue("loading", false);

        if (data?.length === 0) {
          updateValue("creditCardEnquiryList", []);
        } else {
          updateValue("creditCardEnquiryList", data);
        }

        if (searchCriteria === "InvoiceNumber") {
          if (data?.length > 0) {
            updateValue("selectedId", data?.[0]?.UnitNumber);
            updateValue("selectedPK", data?.[0]?.UnitFK);
          } else if (data?.length === 0) {
            updateValue("showWarning", true);
          }
        }
      })
      .catch((error) => {
        updateValue("loading", false);
      });
  };

  //Credit Enquiry View API
  const getCreditEnquiryByUnitNumber = (unitFK, unitNumber) => {
    let miscUnit = "";
    if (unitFK !== -1) unitNumber = miscUnit;
    CreditCardEnquiryService.getCreditCardEnquiryByUnitNumber({
      unitFK: unitFK,
      unitNumber: unitNumber,
      pageNumber: pageNumberView,
    })
      .then((response) => {
        const data = response?.data;
        const paginationData = data?.find((item) => item.Type === "Pagination");
        data?.pop();
        if (data?.length === 0) {
          updateValue("creditCardEnquiryView", []);
          updateValue("totalPagesView", paginationData.TotalPages);
          updateValue("totalElementsView", paginationData.TotalElements);
          updateValue("loadingView", false);
        } else {
          updateValue("creditCardEnquiryView", data);
          updateValue("totalPagesView", paginationData.TotalPages);
          updateValue("totalElementsView", paginationData.TotalElements);
          updateValue("loadingView", false);
        }
      })
      .catch((error) => {
        updateValue("loadingView", false);
      });
  };

  // Unit number autocomplete
  const getAllUnitNumbers = (string) => {
    let last5 = unitNumberLast5;
    setUnitLoading(true);
    CreditCardEnquiryService.getAllUnitNumbersAuto(string, last5)
      .then((response) => {
        const data = response?.data?.content;
        const unitNum = data?.map((units) => ({ ...units, unitNumber: units.unitNumber?.trim() }));
        setUnitNumbers(unitNum);
      })
      .catch((error) => {})
      .finally(() => setUnitLoading(false));
  };

  //Unit number autocomplete onselect
  const handleUnitNumberSelection = (unit) => {
    updateValue("unitNumberPK", unit?.unitPK);
    updateValue("unitNumberInput", unit.unitNumber?.trim());
    updateValue("searchTerm", unit.unitNumber?.trim());
    updateValue("searchCriteria", "UnitNumber");
    updateValue("searchTerm", unit.unitNumber?.trim());
    findBySearchTerm("UnitNumber", unit.unitNumber?.trim());
    updateValue("pageNumberAuto", 0);
    setShowUnitSelectionLookup(false);
  };

  // Method called when AutoComplete Cleared
  const fetchCreditCardDetails = (searchCriteria, searchTerm) => {
    findBySearchTerm(searchCriteria, searchTerm);
  };

  /** USE EFFECTS */

  useEffect(() => {
    if (unitNumberLast5?.length === 5) {
      getAllUnitNumbers("", unitNumberLast5);
    }
  }, [unitNumberLast5]);

  useEffect(() => {
    if (searchCriteria === "InvoiceNumber") {
      if (selectedPK || selectedId) {
        getCreditEnquiryByUnitNumber(selectedPK ? selectedPK : -1, selectedId);
      }
    }
  }, [selectedPK, selectedId]);

  useEffect(() => {
    if (searchCriteria === "InvoiceNumber") {
      if (creditCardEnquiryView?.length > 0) {
        navigate(`/credit-card-enquiry/view/${selectedPK}/${pageNumber}`);
      }
    }
  }, [creditCardEnquiryView]);

  useEffect(() => {
    if (searchCriteria === "InvoiceNumber") {
      dispatch(
        updateMultipleFields({
          unitNumberInput: "",
          unitNumberLast5: "",
          cclast4: "",
        })
      );
    } else if (searchCriteria === "Last5") {
      dispatch(
        updateMultipleFields({
          unitNumberInput: "",
          invoiceNumber: "",
          cclast4: "",
        })
      );
    } else if (searchCriteria === "UnitNumber") {
      dispatch(
        updateMultipleFields({
          unitNumberLast5: "",
          invoiceNumber: "",
          cclast4: "",
        })
      );
    } else if (searchCriteria === "CreditCardLast4") {
      dispatch(
        updateMultipleFields({
          unitNumberInput: "",
          unitNumberLast5: "",
          invoiceNumber: "",
        })
      );
    }

    if (unitNumberInput === "" && unitNumberLast5 === "" && invoiceNumber === "" && cclast4 === "") {
      updateValue("creditCardEnquiryList", []);
      updateValue("totalPages", 0);
      updateValue("totalElements", 0);
      updateValue("loading", false);
      updateValue("creditCardEnquiryView", []);
      updateValue("totalPagesView", 0);
      updateValue("totalElementsView", 0);
      updateValue("loadingView", false);
    }
  }, [searchCriteria, unitNumberInput, unitNumberLast5, invoiceNumber, cclast4]);

  useEffect(() => {
    if (unitNumberInput !== "" || unitNumberLast5 !== "" || invoiceNumber !== "" || cclast4 !== "") {
      findBySearchTerm(searchCriteria, searchTerm, pageNumber);
    }
  }, [pageNumber]);

  return (
    <div className="m-1" style={{ height: "434px" }}>
      <div className="shadow-sm rounded border p-1">
        <Row>
          <Col xs={10} className="ps-3">
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="last5">
                  Last 5
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className={`customFormControl`}
                  id="last5"
                  name="last5"
                  type="text"
                  value={unitNumberLast5}
                  onInput={(e) => {
                    updateValue("unitNumberLast5", e.target.value.replace(/^\s+/g, ""));
                    updateValue("searchTerm", e.target.value.replace(/^\s+/g, ""));
                    updateValue("searchCriteria", "Last5");
                    updateValue("selectedId", null);
                    updateValue("selectedPK", null);
                  }}
                  onBlur={(e) => e.target.value.length === 5 && findBySearchTerm("Last5", e.target.value)}
                  maxLength={5}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                  Unit Number
                </Form.Label>
              </Col>

              <Col xs={5} className="p-0 d-flex">
                <AutoCompleteDropdown
                  arrayList={unitNumbers}
                  searchString={unitNumberInput}
                  renderItemId={(units) => units.unitPK}
                  renderItemField={(units) => units.unitNumber}
                  handleSearchString={(string) => {
                    updateValue("unitNumberInput", string?.replace(/^\s+/g, ""));
                    updateValue("pageNumberAuto", pageNumberAuto);
                    updateValue("searchTerm", string?.replace(/^\s+/g, ""));
                    updateValue("searchCriteria", "UnitNumber");
                    updateValue("selectedId", null);
                    updateValue("selectedPK", null);
                    !unitNumberPK && unitNumberInput && updateValue("creditCardEnquiryList", []);
                  }}
                  fetchDataBySearchString={getAllUnitNumbers}
                  loading={unitLoading}
                  onSelect={handleUnitNumberSelection}
                  selectedId={unitNumberPK}
                  clearInputCallback={() => {
                    updateValue("unitNumberPK", "");
                    updateValue("pageNumberAuto", 0);
                  }}
                  handleAutoCompleteClose={() => {
                    updateValue("unitNumberPK", "");
                    updateValue("pageNumber", 0);
                    updateValue("pageNumberAuto", 0);
                    updateValue("selectedId", null);
                    updateValue("selectedPK", null);
                    updateValue("creditCardEnquiryList", []);
                    updateValue("searchCriteria", "");
                    updateValue("searchTerm", "");
                    updateValue("unitNumberInput", "");
                  }}
                  className={`customFormControl ${!unitNumberPK && unitNumberInput ? "borderRed" : ""}`}
                  disabled={false}
                  allowSearchOnLength={unitNumberLast5 ? 0 : 3}
                  setArrayList={(value) => setUnitNumbers(value)}
                />

                <LookupButton onClick={() => setShowUnitSelectionLookup(true)} />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="invoiceNumber">
                  Invoice Number
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  className={`customFormControl 
                    ${invoiceNumber === "" || invoiceNumber.length >= 5 ? "" : "borderRed"}`}
                  id="invoiceNumber"
                  name="invoiceNumber"
                  type="text"
                  onInput={(e) => {
                    updateValue("invoiceNumber", numberValidation(e.target.value)?.replace(/^\s+/g, ""));
                    updateValue("searchTerm", numberValidation(e.target.value)?.replace(/^\s+/g, ""));
                    updateValue("searchCriteria", "InvoiceNumber");
                    updateValue("selectedId", null);
                    updateValue("selectedPK", null);
                    e.target.value.length === 6 && findBySearchTerm("InvoiceNumber", e.target.value);
                  }}
                  onBlur={(e) =>
                    e.target.value.length === 5 && findBySearchTerm("InvoiceNumber", e.target.value)
                  }
                  value={invoiceNumber}
                  maxLength={6}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 mb-3 align-items-center row  m-l-0 m-r-0 ms-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label htmlFor="name" className={`col-form-label  dealer-label`} id="creditCardLast4">
                  Credit Card Last 4
                </Form.Label>
              </Col>

              <Col xs={1} md={1} sm={1} className="p-0">
                <input
                  className={`customFormControl`}
                  id="creditCardLast4"
                  name="creditCardLast4"
                  type="text"
                  onInput={(e) => {
                    updateValue("cclast4", numberValidation(e.target.value)?.replace(/^\s+/g, ""));
                    updateValue("searchTerm", numberValidation(e.target.value)?.replace(/^\s+/g, ""));
                    updateValue("searchCriteria", "CreditCardLast4");
                    updateValue("selectedId", null);
                    updateValue("selectedPK", null);
                  }}
                  onBlur={(e) =>
                    e.target.value.length === 4 && findBySearchTerm("CreditCardLast4", e.target.value)
                  }
                  value={cclast4}
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex h-100 mt-3 mb-3">
          <div className="w-100 border-1 border border-dark border-right-0">
            <div className="fixTableHead">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr>
                    <th className="f-w-600">Unit Number</th>
                    <th className="f-w-600">Date</th>
                    <th className="f-w-600">Invoice </th>
                    <th className="f-w-600">Unit Type</th>
                    <th className="f-w-600">Pickup</th>
                    <th className="f-w-600">Delivery</th>
                  </tr>
                </thead>

                {loading
                  ? null
                  : creditCardEnquiryList?.length !== 0 && (
                      <tbody>
                        {creditCardEnquiryList?.map((credits, index) => (
                          <tr
                            id="rowId"
                            key={credits.UnitFK}
                            onClick={(value) => {
                              updateValue("selectedPK", credits.UnitFK);
                              updateValue("selectedId", credits.UnitNumber);
                              updateValue("selectedInvoiceNo", credits.Invoice);
                            }}
                            className={
                              (selectedPK !== null && selectedPK === credits.UnitFK) ||
                              (selectedInvoiceNo !== null &&
                                selectedInvoiceNo !== 0 &&
                                selectedInvoiceNo === credits.Invoice)
                                ? "tableSelected"
                                : " "
                            }
                          >
                            <td className="f-w-600">{credits.UnitNumber}</td>
                            <td className="f-w-600">
                              {moment(credits.Date?.split("T")[0]).format("MM/DD/YY")}
                            </td>
                            <td className="f-w-600">{credits.Invoice}</td>
                            <td className="f-w-600">{credits.UnitType}</td>
                            <td className="f-w-600">{credits.Pickup}</td>
                            <td className="f-w-600">{credits.Delivery}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
              </table>
              {loading ? "" : creditCardEnquiryList?.length === 0 && <NoRecordsMessage />}
            </div>

            {loading && (
              <div className="fade modal-backdrop show">
                {" "}
                <div className="pos-center">
                  {" "}
                  <div className="loader"></div>
                </div>
                 {" "}
              </div>
            )}
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
          MaintenanceProgram
          show={showUnitSelectionLookup}
          onHide={() => setShowUnitSelectionLookup(false)}
          handleLookupSelection={handleUnitNumberSelection}
        />

        <Modal
          show={showWarning}
          onHide={() => updateValue("showWarning", false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="font-18 h-100 temp-red-color">Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body className="font-14 h-100">Invoice does not have credit card charges.</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                updateValue("showWarning", false);
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
