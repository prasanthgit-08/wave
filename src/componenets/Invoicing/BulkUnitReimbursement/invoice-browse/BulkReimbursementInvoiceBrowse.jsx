import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState, updateField } from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";
import BulkReimbursementService from "../../../../services/Invoicing/BulkReimbursementService";
import { t } from "i18next";
import { resetFields } from "../../../../redux/Invoicing/BulkInvoiceSlice";
import LoadingText from "../../../common/LoadingText";

const BulkReimbursementInvoiceBrowse = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const {
    pageNumber,
    totalPages,
    totalElements,
    searchTerm,
    searchCriteria,
    changeColor,
    viewDetail,
    editFormData,
    changesCancelled,
    sortType,
    sortValue,
    selectedId,
    listingData,
  } = useSelector((state) => state.bulkUnitReimbursementReducer);

  const onhandleNormalSort = (value, val) => {
    updateTabEditData("sortValue", value);
    updateTabEditData("sortType", val);
  };

  window.addEventListener("popstate", () => {
    dispatch(resetState());
    dispatch(resetFields());

    navigate(`/bulk-reimbursement-invoice-selection`);
  });
  const fetchTableDatas = async () => {
    try {
      setLoading(true);

      const response = await BulkReimbursementService.getBulkReimbursementInvoiceList(
        searchCriteria,
        searchTerm,
        pageNumber,
        sortValue,
        sortType
      );

      if (response && response?.data) {
        const { data } = response;

        const filteredList = data?.filter((item) => item?.Type !== "Pagination");

        updateTabEditData("listingData", filteredList || []); // Prevent undefined errors

        const paginationData = data?.find((item) => item?.Type === "Pagination");
        if (paginationData) {
          updateTabEditData("totalElements", paginationData.TotalElements || 0);
          updateTabEditData("totalPages", paginationData.TotalPages || 1);
        }
      } else {
        console.error("Unexpected API response format:", response);
      }
    } catch (error) {
      console.error("Error fetching bulk invoice data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableDatas();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortType, sortValue]);

  return (
    <div className="fixTableHead unitSelection">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("Customer", !sortType);
              }}
              className="f-w-600"
            >
              Customer
              {sortType && sortValue === "Customer" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Customer" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("Description", !sortType);
              }}
              className="f-w-600"
            >
              Description
              {sortType && sortValue === "Description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("PONumber", !sortType);
              }}
              className="f-w-600"
            >
              PO Number
              {sortType && sortValue === "PONumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "PONumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("ProjectCode", !sortType);
              }}
              className="f-w-600"
            >
              Project Code
              {sortType && sortValue === "ProjectCode" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "ProjectCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            Array.isArray(listingData) &&
            listingData?.length > 0 &&
            listingData.map((data) => (
              <tr
                id="rowId"
                key={data?.BulkInvoicePK}
                onClick={() => updateTabEditData("changeColor", false)}
                onDoubleClick={() => {
                  updateTabEditData("selectedId", data?.BulkInvoicePK);
                  updateTabEditData("viewDetail", true);
                  updateTabEditData("changeColor", true);
                  setTimeout(() => {
                    navigate(`/bulk-reimbursement-unit-selection/${data?.BulkInvoicePK}`);
                  }, 100);
                }}
                className={`${data?.BulkInvoicePK === selectedId && changeColor ? "tableSelected" : ""}`}
              >
                <td className="f-w-600">{data?.Customer}</td>
                <td className="f-w-600">{data?.Description}</td>
                <td className="f-w-600">{data?.PONumber}</td>
                <td className="f-w-600">{data?.ProjectCode}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {loading ? (
        <LoadingText />
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default BulkReimbursementInvoiceBrowse;
