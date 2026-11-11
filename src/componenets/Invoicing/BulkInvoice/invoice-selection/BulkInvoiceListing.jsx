import { t } from "i18next";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { updateField } from "../../../../redux/Invoicing/BulkInvoiceSlice";
import BulkInvoiceService from "../../../../services/Invoicing/BulkInvoiceService";
import LoadingText from "../../../common/LoadingText";
import LoadingIcon from "../../../common/LoadingIcon";

const BulkInvoiceListing = () => {
  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  const [loading, setLoading] = useState(true);

  const {
    pageNumber,
    searchTerm,
    searchCriteria,
    changeColor,
    sortType,
    sortValue,
    selectedId,
    listingData,
  } = useSelector((state) => state.bulkInvoiceReducer);

  const onhandleNormalSort = (value, val) => {
    updateTabEditData("sortValue", value);
    updateTabEditData("sortType", val);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchTableDatas = async () => {
    try {
      setLoading(true);

      const response = await BulkInvoiceService.getBulkInvoiceList(
        searchCriteria,
        searchTerm,
        pageNumber,
        sortValue,
        sortType
      );

      if (response && response?.data) {
        const { data } = response;

        const filteredList = data?.filter((item) => item?.Type !== "Pagination");

        updateTabEditData("listingData", filteredList || []);

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
    const debounceFunction = setTimeout(() => {
      fetchTableDatas();
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, sortType, sortValue]);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("Customer", !sortType);
              }}
              className="f-w-600 col-3"
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
              className="f-w-600 col-3"
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
              className="f-w-600 col-3"
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
              className="f-w-600 col-3"
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
            listingData?.map((data) => (
              <tr
                id="rowId"
                key={data?.BulkInvoicePK}
                onClick={() => updateTabEditData("changeColor", false)}
                onDoubleClick={() => {
                  updateTabEditData("selectedId", data?.BulkInvoicePK);
                  updateTabEditData("viewDetail", true);
                  updateTabEditData("changeColor", true);
                  setTimeout(() => {
                    navigate(`/bulk-invoice-details/${data?.BulkInvoicePK}`);
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
      {!loading && listingData && listingData?.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("dealers.list.empty.message")}
        </h2>
      )}
      {loading && <LoadingText />}
    </div>
  );
};

export default BulkInvoiceListing;
