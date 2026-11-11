import React, { useEffect, useState } from "react";
import {
  setDescription,
  setDriverAmount,
  setInvoiceAmount,
  updateField,
} from "../../../../redux/Invoicing/BulkUnitReimbursementSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BulkReimbursementService from "../../../../services/Invoicing/BulkReimbursementService";
import { t } from "i18next";
import LoadingText from "../../../common/LoadingText";

const BulkReimbursementUnitBrowse = ({ loading, setLoading }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unitSortValue = useSelector((state) => state.bulkUnitReimbursementReducer.unitSortValue);
  const unitSortType = useSelector((state) => state.bulkUnitReimbursementReducer.unitSortType);
  const unitPageNumber = useSelector((state) => state.bulkUnitReimbursementReducer.unitPageNumber);
  const unitSearchTerm = useSelector((state) => state.bulkUnitReimbursementReducer.unitSearchTerm);
  const unitSearchCriteria = useSelector((state) => state.bulkUnitReimbursementReducer.unitSearchCriteria);
  const unitTotalElements = useSelector((state) => state.bulkUnitReimbursementReducer.unitTotalElements);
  const unitListingData = useSelector((state) => state.bulkUnitReimbursementReducer.unitListingData);
  const selectedUnitId = useSelector((state) => state.bulkUnitReimbursementReducer.selectedUnitId);
  const unitChangeColor = useSelector((state) => state.bulkUnitReimbursementReducer.unitChangeColor);

  const updateTabEditData = (field, value) => {
    dispatch(updateField({ field, value }));
  };
  const onhandleNormalSort = (value, val) => {
    updateTabEditData("unitSortValue", value);
    updateTabEditData("unitSortType", val);
  };
  const fetchTableDatas = async () => {
    try {
      setLoading(true);

      const response = await BulkReimbursementService.getBulkReimbursementUnitList(
        unitSearchCriteria,
        unitSearchTerm,
        unitPageNumber,
        unitSortValue,
        unitTotalElements,
        id,
        unitSortType
      );

      if (response && response?.data) {
        const records = Array.isArray(response?.data) ? response?.data?.filter((item) => !item.Type) : [];

        updateTabEditData("unitListingData", records);
        const paginationData = response?.data?.find((item) => item.Type === "Pagination");

        if (paginationData) {
          updateTabEditData(
            "unitTotalElements",
            paginationData.TotalElements || paginationData.NumberOfElements || 0
          );
          updateTabEditData("unitTotalPages", paginationData.TotalPages || 1);
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
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [unitSearchCriteria, unitSearchTerm, unitPageNumber, unitSortType, unitSortValue]);

  useEffect(() => {
    dispatch(setDescription(""));
    dispatch(setInvoiceAmount(""));
    dispatch(setDriverAmount(""));
  }, []);

  return (
    <div className="fixTableHead unitSelection">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              onClick={() => {
                onhandleNormalSort("UnitNumber", !unitSortType);
              }}
              className="f-w-600"
            >
              Unit Number
              {unitSortType && unitSortValue === "UnitNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!unitSortType && unitSortValue === "UnitNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("Delivery", !unitSortType);
              }}
              className="f-w-600"
            >
              Delivery
              {unitSortType && unitSortValue === "Delivery" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!unitSortType && unitSortValue === "Delivery" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("Pickup", !unitSortType);
              }}
              className="f-w-600"
            >
              Pickup
              {unitSortType && unitSortValue === "Pickup" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!unitSortType && unitSortValue === "Pickup" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              onClick={() => {
                onhandleNormalSort("DriverName", !unitSortType);
              }}
              className="f-w-600"
            >
              Driver Name{" "}
              {unitSortType && unitSortValue === "DriverName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!unitSortType && unitSortValue === "DriverName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            Array.isArray(unitListingData) &&
            unitListingData?.length > 0 &&
            unitListingData.map((data) => (
              <tr
                id="rowId"
                key={data?.BulkUnitPK}
                onClick={() => updateTabEditData("unitChangeColor", false)}
                onDoubleClick={() => {
                  updateTabEditData("selectedUnitId", data?.BulkUnitPK);
                  updateTabEditData("viewDetail", true);
                  updateTabEditData("changeColor", true);
                  setTimeout(() => {
                    navigate(`/bulk-reimbursement-detail/${data?.BulkUnitPK}`);
                  }, 100);
                }}
                className={`${data?.BulkUnitPK === selectedUnitId && unitChangeColor ? "tableSelected" : ""}`}
              >
                <td className="f-w-600">{data?.UnitNumber}</td>
                <td className="f-w-600">{data?.Delivery}</td>
                <td className="f-w-600">{data?.Pickup}</td>
                <td className="f-w-600">{data?.DriverName}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        unitListingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default BulkReimbursementUnitBrowse;
