import React, { useState } from "react";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { setPageNumber } from "../../../../../redux/YardCheckinSlice";
import usePagination from "../../../../../hooks/usePagination";
import {
  setExistingChangeColor,
  setExistingInvoicepageNumber,
  setExistingInvoices,
  setInvoiceFK,
} from "../../../../../redux/Invoicing/MiscInvoiceSlice";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import moment from "moment";
const ListTab = () => {
  const { existingInvoices, existingInvoicepageNumber, invoiceFK, existingChangeColor } = useSelector(
    (state) => state.miscInvoiceReducer
  );
  const pagination = usePagination(existingInvoices, existingInvoicepageNumber, 9);
  const { paginatedArray, totalElements, totalPages } = pagination;
  const dispatch = useDispatch();
  const [adSort] = useState(false);
  const [sortFlag, setSortFlag] = useState(false);
  const [sortValue, setSortValue] = useState("");

  const paginationProps = {
    pageNumber: existingInvoicepageNumber,
    setPageNumber: setExistingInvoicepageNumber,
    totalPages,
    totalElements,
    listingData: paginatedArray,
  };
  const onhandleNormalSort = (value, val) => {
    setSortValue(value);
    setSortFlag(val);
    let sortedData = [...existingInvoices];
    if (value === "InvoiceNumber") {
      sortedData = [...sortedData].sort((a, b) => {
        if (val) {
          /*** Ascending order ***/
          return a.InvoiceNumber.localeCompare(b.InvoiceNumber);
        } else {
          /*** Descending order ***/
          return b.InvoiceNumber.localeCompare(a.InvoiceNumber);
        }
      });
    }
    dispatch(setExistingInvoices(sortedData));
  };

  return (
    <div className="m-1">
      <div className="shadow-sm rounded border p-1" style={{ height: "380px" }}>
        <div className="d-flex h-350px mt-3">
          <div className="w-100 border-1 border border-dark border-right-0">
            <div className="fixTableHead">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr>
                    <th
                      className="f-w-600 col-2"
                      onClick={() => {
                        if (adSort === false) {
                          onhandleNormalSort("InvoiceNumber", !sortFlag);
                        }
                      }}
                    >
                      Invoice Number
                      {sortFlag && sortValue === "InvoiceNumber" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "InvoiceNumber" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th className="f-w-600 col-2">Invoice Date</th>
                    <th className="f-w-600 col-2">Amount</th>
                    <th className="f-w-600 col-2">User</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedArray.map((item, index) => (
                    <tr
                      key={item?.InvoicePK}
                      onClick={(e) => {
                        dispatch(setExistingChangeColor(true));
                        dispatch(setInvoiceFK(item.InvoicePK));
                      }}
                      className={item.InvoicePK === invoiceFK && existingChangeColor ? "tableSelected" : ""}
                    >
                      <td>{item.InvoiceNumber}</td>
                      <td>{moment(item.InvoiceDate).format("MM/DD/YY")}</td>
                      <td>{item.InvoiceAmount}</td>
                      <td>{item.AddUser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <PaginationComponent
            {...paginationProps}
            recordsPerPage={QuarterScreen_RecordsPerPage}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
          />
        </div>
      </div>
    </div>
  );
};

export default ListTab;
