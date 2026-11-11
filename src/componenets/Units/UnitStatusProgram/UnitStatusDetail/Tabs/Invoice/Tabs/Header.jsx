import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import { EditMasterUnitSelection_RecordsPerPage } from "../../../../../../../services/constants/applicationConstants";
import { setPageNumber } from "../../../../../../../redux/CustomerPlantSearchFilterSlice";
import DateInputField from "../../../../../../common/DateInputField";
import {
  setInvoiceHeaderPageNumber,
  setInvoiceHeaderSortFlag,
  setInvoiceHeaderSortValue,
  setInvoiceHeaderTotalElements,
  setInvoiceHeaderTotalPages,
  setInvoicePK,
  setInvoiceTextInputs,
  setIsMiscellaneousInvoice,
} from "../../../../../../../redux/UnitStatus/UnitStatusSlice";
import UnitStatusService from "../../../../../../../services/Units/UnitStatusService";
import { customFormatDate } from "../../../../../../../utils/validation/DateFormatUtils";
import LoadingText from "../../../../../../common/LoadingText";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";

/* Invoices-Header columns (GetUnitStatusData) the Text tab is built from - adjust here if the SP names differ.
   A column the SP does not return reads as "not miscellaneous", i.e. the 4 invoice texts only. */
const INVOICE_TEXT_COLUMNS = {
  invoiceText: "InvoiceText", // InvoiceText1..4
  miscellaneousText: "MiscellaneousText", // MiscellaneousText1..10
  miscellaneous: "Miscellaneous",
};
const isTrue = (value) => value === true || value === 1 || value === "1" || value === "true";

function Header({ data, activeSubTab }) {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [changeColor, setChangeColor] = useState(false);
  const [unitInvoiceHeaderData, setUnitInvoiceHeaderData] = useState(data?.data || []);
  const invoiceHeaderPageNumber = useSelector((state) => state.unitStatusReducer.invoiceHeaderPageNumber);
  const invoiceHeaderTotalPages = useSelector((state) => state.unitStatusReducer.invoiceHeaderTotalPages);
  const invoiceHeaderTotalElements = useSelector(
    (state) => state.unitStatusReducer.invoiceHeaderTotalElements
  );
  const invoiceHeaderSortFlag = useSelector((state) => state.unitStatusReducer.invoiceHeaderSortFlag);
  const invoiceHeaderSortValue = useSelector((state) => state.unitStatusReducer.invoiceHeaderSortValue);
  const invoicePK = useSelector((state) => state.unitStatusReducer.invoicePK);
  const selectedId = useSelector((state) => state.unitStatusReducer.selectedId);
  const [loading, setLoading] = useState(true);

  const [selectedInvoiceHeader, setSelectedInvoiceHeader] = useState({
    InvoicepK: "",
    Date: "",
    InvoiceNumber: "",
    Amount: "",
    BillTo: "",
    Address1: "",
    Address2: "",
    City: "",
    State: "",
    ZipCode: "",
    Voided: null,
    VoidDate: null,
    VoidUser: null,
    VoidReason: null,
    DueDays: "",
    DueDate: "",
    EarlyPaymentDate: "",
    EarlyPaymentDiscount: "",
    Terms: "",
  });
  const onhandleNormalSort = (value, val) => {
    dispatch(setInvoiceHeaderSortFlag(val));
    dispatch(setInvoiceHeaderSortValue(value));
  };

  const handleRowClick = (item) => {
    setSelectedRow(item.InvoicepK);
    dispatch(setInvoicePK(item.InvoicepK));
    setChangeColor(true);
    setSelectedInvoiceHeader({
      InvoicepK: item.InvoicepK,
      Date: item.Date,
      InvoiceNumber: item.InvoiceNumber,
      Amount: item.Amount,
      BillTo: item.BillTo,
      Address1: item.Address1,
      Address2: item.Address2,
      City: item.City,
      State: item.State,
      ZipCode: item.ZipCode,
      Voided: item.Voided,
      VoidDate: item.VoidDate,
      VoidUser: item.VoidUser,
      VoidReason: item.VoidReason,
      DueDays: item.DueDays,
      DueDate: item.DueDate,
      EarlyPaymentDate: item.EarlyPaymentDate,
      EarlyPaymentDiscount: item.EarlyPaymentDiscount,
      Terms: item.Terms,
    });
    // the selected invoice's texts are shown on the Text tab, in stored order
    // [InvoiceText1..4, MiscellaneousText1..10] - the Text tab picks what to show
    const { invoiceText, miscellaneousText, miscellaneous } = INVOICE_TEXT_COLUMNS;
    dispatch(
      setInvoiceTextInputs([
        ...Array.from({ length: 4 }, (_, i) => item[`${invoiceText}${i + 1}`] ?? ""),
        ...Array.from({ length: 10 }, (_, i) => item[`${miscellaneousText}${i + 1}`] ?? ""),
      ])
    );
    dispatch(setIsMiscellaneousInvoice(isTrue(item[miscellaneous])));
  };

  const getAllUnitNumbersList = () => {
    UnitStatusService.getUnitStatusDataForOpenBalance(
      selectedId,
      "Invoices-Header",
      invoiceHeaderPageNumber,
      5,
      invoiceHeaderSortValue,
      invoiceHeaderSortFlag
    )
      .then((response) => {
        const { data } = response;
        const listingData = data.filter((item) => item.Type !== "Pagination");
        const paginationData = data.find((item) => item.Type === "Pagination");
        setUnitInvoiceHeaderData(listingData);
        if (paginationData) {
          dispatch(setInvoiceHeaderTotalElements(paginationData.TotalElements));
          dispatch(setInvoiceHeaderTotalPages(paginationData.TotalPages));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedId && activeSubTab === "header") {
      getAllUnitNumbersList();
    }
  }, [invoiceHeaderPageNumber, invoiceHeaderSortValue, invoiceHeaderSortFlag, activeSubTab]);

  const paginationProps = {
    pageNumber: invoiceHeaderPageNumber,
    setPageNumber: setInvoiceHeaderPageNumber,
    totalPages: invoiceHeaderTotalPages,
    totalElements: invoiceHeaderTotalElements,
    listingData: unitInvoiceHeaderData,
  };
  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          <div className="d-flex h-250px mt-2">
            <div className="w-100 border border-2 border-dark">
              <div className="fixTableHead unitSelection">
                <table className="table table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th
                        className="f-w-600 "
                        onClick={() => {
                          onhandleNormalSort("Date", !invoiceHeaderSortFlag);
                        }}
                      >
                        Date{" "}
                        {invoiceHeaderSortFlag && invoiceHeaderSortValue === "Date" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!invoiceHeaderSortFlag && invoiceHeaderSortValue === "Date" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 "
                        onClick={() => {
                          onhandleNormalSort("InvoiceNumber", !invoiceHeaderSortFlag);
                        }}
                      >
                        Invoice Number{" "}
                        {invoiceHeaderSortFlag && invoiceHeaderSortValue === "InvoiceNumber" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!invoiceHeaderSortFlag && invoiceHeaderSortValue === "InvoiceNumber" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                      <th
                        className="f-w-600 col-2"
                        onClick={() => {
                          onhandleNormalSort("Amount", !invoiceHeaderSortFlag);
                        }}
                      >
                        {" "}
                        Amount{" "}
                        {invoiceHeaderSortFlag && invoiceHeaderSortValue === "Amount" && (
                          <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                        )}
                        {!invoiceHeaderSortFlag && invoiceHeaderSortValue === "Amount" && (
                          <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                        )}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {unitInvoiceHeaderData.length > 0 ? (
                      unitInvoiceHeaderData.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => handleRowClick(item)}
                          style={{ cursor: "pointer" }}
                          className={`${item.InvoicepK === selectedRow && changeColor ? "tableSelected" : ""}`}
                        >
                          <td>{customFormatDate(item.Date)}</td>
                          <td>{item.InvoiceNumber}</td>
                          <td>{item.Amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
                {loading && <LoadingText smallerFont />}
                {!loading && unitInvoiceHeaderData?.length === 0 && <NoRecordsMessage />}
              </div>
            </div>
            <PaginationComponent
              {...paginationProps}
              recordsPerPage={EditMasterUnitSelection_RecordsPerPage}
              firstPage
              lastPage
              singleArrowUp
              singleArrowDown
            />
          </div>
          <Form.Group
            className={`mt-2 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Bill To
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.BillTo}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Address
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.Address1}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.Address2}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,Zip</Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.City}
                readOnly
              />
            </Col>
            <div className="px-1 w-35px">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedInvoiceHeader.State}
                readOnly
              />
            </div>
            <Col xs="1" className="px-0">
              <input
                className="w-100 customFormControl"
                type="text"
                value={selectedInvoiceHeader.ZipCode}
                readOnly
              />
            </Col>
          </Form.Group>

          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Voided
              </Form.Label>
            </Col>

            <Col xs={7} md={5} sm={7} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0"
                checked={selectedInvoiceHeader.Voided}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0">
              <Form.Label className={`customColFormLabel`}>Void Date</Form.Label>
            </Col>
            <Col xs={1} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={selectedInvoiceHeader.VoidDate}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Void User
              </Form.Label>
            </Col>

            <Col xs={6} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.VoidUser}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-2 form-group  align-items-start    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Void Reason
              </Form.Label>
            </Col>

            <Col xs={10} className="p-0 h">
              <textarea className="w-100" rows={3} value={selectedInvoiceHeader.VoidReason} disabled />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6} className="ps-5">
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Invoice Number
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.InvoiceNumber}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={`customColFormLabel`}>Date</Form.Label>
            </Col>
            <Col xs={1} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={selectedInvoiceHeader.Date}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Amount
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0 h" style={{ width: "90px" }}>
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.Amount}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Due Days
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.DueDays}
                readOnly
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={`customColFormLabel`}>Due Date</Form.Label>
            </Col>
            <Col xs={1} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={selectedInvoiceHeader.DueDate}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row   m-l-0 m-r-0 ms-0">
            <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={`customColFormLabel`}>Early Payment Date</Form.Label>
            </Col>
            <Col xs={1} className="p-0" style={{ width: "90px" }}>
              <DateInputField
                date={selectedInvoiceHeader.EarlyPaymentDate}
                min={""}
                reduxSetDate={(value) => {}}
                setIsDateValid={""}
                className={""}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Early Payment Discount
              </Form.Label>
            </Col>

            <div className="p-0 w-70px">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.EarlyPaymentDiscount}
                readOnly
              />
            </div>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0" style={{ width: "130px" }}>
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
                Terms
              </Form.Label>
            </Col>

            <Col xs={4} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                value={selectedInvoiceHeader.Terms}
                readOnly
              />
            </Col>
          </Form.Group>
          <Form.Group
            className={`mt-3 form-group  align-items-center invisible    row  m-l-0 m-r-0 ms-0
          `}
          >
            <Col xs={2} className="p-0">
              <Form.Label className={` customColFormLabel`} id="miscellaneousPickup"></Form.Label>
            </Col>

            <Col xs={1} className="p-0 h">
              <input
                className={`customFormControl 
            `}
                name=""
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
