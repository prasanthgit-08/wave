import { parseLocalDate } from "../../../../utils/dateUtils";
import React from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import CommonTable from "../../../../components/common/commonTable";
import Input from "../../../../components/common/input";
import DateInputField from "../../../common/DateInputField";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import useDriverPayLog from "./useDriverPayLog";
import PreviewPopup from "../../../common/PreviewPopup";
import LoadingIcon from "../../../common/LoadingIcon";
import { customFormatDate } from "../../../../utils/validation/DateFormatUtils";

const formatDate = (value) => customFormatDate(value, "MM/DD/YY");
const formatAmount = (value) =>
  value === null || value === undefined || value === "" ? "" : Number(value).toFixed(2);

const TableContent = ({ children, paginationProps, recordsPerPage = QuarterScreen_RecordsPerPage }) => (
  <div className="container-fluid table-bordered p-0">
    <div className="row border border-dark border-1 m-0">
      <div className="col-12 p-r-0 p-l-0">
        <div className="d-flex" style={{ height: "380px", overflow: "hidden" }}>
          <div className="w-100 fixTableHead" style={{ overflow: "hidden" }}>
            {children}
          </div>
          <PaginationComponent
            {...paginationProps}
            firstPage
            lastPage
            doubleArrowUp
            doubleArrowDown
            singleArrowUp
            singleArrowDown
            recordsPerPage={recordsPerPage}
          />
        </div>
      </div>
    </div>
  </div>
);

const DriverPayLog = () => {
  const payLog = useDriverPayLog();
  const paidTo = payLog.selectedPayee;
  const paidToEnabled = Boolean(paidTo);
  // While either date is invalid, both Browse tables should show "No records found".
  const summaryRows = payLog.isDateRangeValid
    ? payLog.summaryRows.map((row) => ({
        ...row,
        datePaid: formatDate(row.checkDate),
        amount: formatAmount(row.checkAmount),
        checkNumber: row.debitCardDetailFK ? "" : row.checkNumber,
        debitCardStatus: payLog.debitCardStatus(row),
      }))
    : [];
  const detailRows = payLog.isDateRangeValid
    ? payLog.detailRows.map((row) => ({
        ...row,
        datePaid: formatDate(row.datePaid),
        dateAdded: formatDate(row.dateAdded),
        amount: formatAmount(row.amount),
      }))
    : [];

  return (
    <div className="add-form-component p-0 customContainer">
      <div className="border border-dark border-2 quarterScreenWidth" style={{ margin: "1px" }}>
        <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-bottom border-dark border-2">
          <div className="d-flex align-items-center" style={{ flexGrow: 1, paddingLeft: "50px" }}>
            <Form.Label className="customColFormLabel w-50px me-2">From</Form.Label>
            <DateInputField
              date={payLog.fromDate}
              setIsDateValid={payLog.setIsFromDateValid}
              reduxSetDate={(value) => payLog.changeDate("fromDate", value)}
              max={payLog.toDate ? parseLocalDate(payLog.toDate) : ""}
              min={payLog.hiredDate ? parseLocalDate(payLog.hiredDate) : ""}
              className={`customFormControl ${payLog.isFromDateValid ? "" : "borderRed"}`}
            />
            <span className="mx-3">To</span>
            <DateInputField
              date={payLog.toDate}
              setIsDateValid={payLog.setIsToDateValid}
              reduxSetDate={(value) => payLog.changeDate("toDate", value)}
              min={payLog.fromDate ? parseLocalDate(payLog.fromDate) : ""}
              className={`customFormControl ${payLog.isToDateValid ? "" : "borderRed"}`}
            />
          </div>
          <div className="d-flex flex-grow-1 justify-content-center">
            <div
              className="d-grid"
              style={{ gridTemplateColumns: "auto auto", columnGap: "30px", rowGap: "4px" }}
            >
              {["driver", "garnishments", "claims", "payments"].map((key) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  checked={payLog.filters[key]}
                  onChange={(event) => payLog.setFilters({ [key]: event.target.checked })}
                />
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-end m-l-20">
            <button
              className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5 m-b-5"
              onClick={payLog.close}
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-2" style={{ height: "432px", overflow: "hidden" }}>
          <Tabs
            activeKey={payLog.activeTab}
            onSelect={(tab) => tab && payLog.setActiveTab(tab)}
            className="m-b-0"
          >
            <Tab eventKey="summary" title="Summary">
              <TableContent
                recordsPerPage={payLog.summaryRecordsPerPage}
                paginationProps={{
                  pageNumber: payLog.isDateRangeValid ? payLog.summaryPageNumber : 0,
                  setPageNumber: payLog.setSummaryPageNumber,
                  totalPages: payLog.isDateRangeValid ? payLog.summaryTotalPages : 0,
                  totalElements: payLog.isDateRangeValid ? payLog.summaryTotalElements : 0,
                  listingData: summaryRows,
                  loading: payLog.loading,
                  onPageChange: payLog.beginBrowseLoading,
                }}
              >
                <CommonTable
                  id="checkHeaderPK"
                  selectedId={payLog.selectedSummary?.checkHeaderPK}
                  loading={payLog.loading}
                  disabledHead
                  listingData={summaryRows}
                  columns={[
                    { label: "Date Paid", key: "datePaid" },
                    { label: "Amount", key: "amount" },
                    { label: "Check Number", key: "checkNumber" },
                    { label: "Debit Card Status", key: "debitCardStatus" },
                  ]}
                  handleSelect={payLog.selectSummary}
                />
              </TableContent>
            </Tab>
            <Tab eventKey="paidTo" title="Paid To" disabled={!paidToEnabled}>
              <div className="border border-dark border-1 p-4 h-390px">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 348px",
                    columnGap: "8px",
                    rowGap: "14px",
                    alignItems: "center",
                    width: "466px",
                  }}
                >
                  {[
                    ["Name", "name"],
                    ["Address", "address1"],
                    ["", "address2"],
                  ].map(([label, field]) => (
                    <React.Fragment key={field}>
                      <Form.Label className="mb-0" style={{ textAlign: "right" }}>
                        {label}
                      </Form.Label>
                      <Input
                        name={field}
                        value={paidTo?.[field] || ""}
                        disabled
                        className="customFormControl w-100"
                      />
                    </React.Fragment>
                  ))}
                  <Form.Label className="mb-0" style={{ textAlign: "right" }}>
                    City, State ZIP
                  </Form.Label>
                  <div style={{ display: "grid", gridTemplateColumns: "187px 68px 68px", columnGap: "12px" }}>
                    <Input
                      name="city"
                      value={paidTo?.city || ""}
                      disabled
                      className="customFormControl w-100"
                    />
                    <Input
                      name="stateCode"
                      value={paidTo?.stateCode || ""}
                      disabled
                      className="customFormControl w-100"
                    />
                    <Input
                      name="postalCode"
                      value={paidTo?.postalCode || ""}
                      disabled
                      className="customFormControl w-100"
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="detail" title="Detail">
              <TableContent
                paginationProps={{
                  pageNumber: payLog.isDateRangeValid ? payLog.detailPageNumber : 0,
                  setPageNumber: payLog.setDetailPageNumber,
                  totalPages: payLog.isDateRangeValid ? payLog.detailTotalPages : 0,
                  totalElements: payLog.isDateRangeValid ? payLog.detailTotalElements : 0,
                  listingData: detailRows,
                  loading: payLog.isDetailLoading,
                  onPageChange: payLog.beginDetailLoading,
                }}
              >
                <CommonTable
                  id="checkDetailPK"
                  loading={payLog.isDetailLoading}
                  disabledHead
                  listingData={detailRows}
                  columns={[
                    { label: "Date Paid", key: "datePaid" },
                    { label: "Date Added", key: "dateAdded" },
                    { label: "Unit Number", key: "unitNumber" },
                    { label: "Delivery", key: "delivery" },
                    { label: "Amount", key: "amount" },
                    { label: "Source", key: "source" },
                    { label: "Detail", key: "detail" },
                  ]}
                  rowClassName={"color"}
                />
              </TableContent>
            </Tab>
          </Tabs>
        </div>
        <div className="d-flex justify-content-end p-2 border-top border-dark border-2">
          {[
            ["Print", "display"],
            ["Email", "emailPdf"],
            ["Excel", "emailExcel"],
          ].map(([label, exportType]) => (
            <button
              key={label}
              type="button"
              className="btn btn-secondary customButtonMediumWidth btn-sm m-l-5 m-r-5"
              onClick={() => payLog.exportPayLog(exportType)}
              disabled={
                payLog.loading ||
                payLog.isExporting ||
                !payLog.isDateRangeValid ||
                !payLog.hasActiveBrowseRecords
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <PreviewPopup
        show={payLog?.showPreview}
        onHide={() => payLog?.setShowPreview(false)}
        base64PDF={payLog?.base64PDF}
      />
      {(payLog.loading || payLog.isDetailLoading || payLog.isExporting) && <LoadingIcon />}
    </div>
  );
};

export default DriverPayLog;
