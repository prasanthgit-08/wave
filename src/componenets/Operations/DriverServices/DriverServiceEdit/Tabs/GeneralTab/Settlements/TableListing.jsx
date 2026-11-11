import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setNormalSortFlag,
  setNormalSortValue,
  setReimbursmentAmount,
  setSettlementData,
  setTaxableAmount,
  setTotalElements,
  setTotalFund,
  setTotalPages,
  setPageNumber,
  setRadioValue,
} from "../../../../../../../redux/SettlementsSlice";
import NoRecordsMessage from "../../../../../../common/NoRecordsMessage";
import SettlementService from "../../../../../../../services/SettlementService";
import { useParams } from "react-router-dom";
import { customFormatDate } from "../../../../../../../utils/validation/DateFormatUtils";
import LoadingIcon from "../../../../../../common/LoadingIcon";
function TableListing() {
  const params = useParams();
  const driverId = params.driverId;
  const [loading, setLoading] = useState(true);

  const pageNumber = useSelector((state) => state.settlementsReducer.pageNumber);
  const settlementData = useSelector((state) => state.settlementsReducer.settlementData);
  const searchCriteria = useSelector((state) => state.settlementsReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.settlementsReducer.searchTerm);
  const sortValue = useSelector((state) => state.settlementsReducer.sortValue);

  const sortFlag = useSelector((state) => state.settlementsReducer.sortFlag);
  const changeColor = useSelector((state) => state.settlementsReducer.changeColor);

  const dispatch = useDispatch();

  const fetchTableDatas = async () => {
    setLoading(true);
    try {
      const response = await SettlementService.getSettlementRecords(
        searchCriteria,
        searchTerm,
        pageNumber,
        sortValue,
        sortFlag,
        driverId
      );
      const { data } = response;

      if (!data) {
        console.error("API response data is empty:", response);
        return;
      }

      const filteredList = data.filter((item) => item?.Type !== "Pagination");
      dispatch(setSettlementData(filteredList));

      const paginationData = data.find((item) => item?.Type === "Pagination");

      if (paginationData) {
        dispatch(setTotalElements(paginationData.TotalElements));
        dispatch(setTotalPages(paginationData.TotalPages));
        dispatch(setTotalFund(paginationData.TotalAmount));
        dispatch(setTaxableAmount(paginationData.TaxableAmount));
        dispatch(setReimbursmentAmount(paginationData.ReimbursmentAmount));
      } else {
        console.error("Pagination data not found in API response:", response);
      }
    } catch (error) {
      console.error("Error fetching Edit Checkin records:", error);
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
  }, [searchCriteria, searchTerm, pageNumber, sortFlag]);
  useEffect(() => {
    dispatch(setPageNumber(0));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(""));
    dispatch(setRadioValue("Debit Card"));
    dispatch(setTotalFund(null));
  }, []);

  useEffect(() => {
    if (settlementData == null) dispatch(setTotalFund(null));
  }, [settlementData]);

  return (
    <div className="fixTableHead border border-2 h-100" style={{ minHeight: "325px" }}>
      {loading && <LoadingIcon />}

      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                dispatch(setNormalSortValue("DateAdded"));
                if (sortFlag) {
                  dispatch(setNormalSortFlag(false));
                } else {
                  dispatch(setNormalSortFlag(true));
                }
              }}
            >
              Date Added{" "}
              {sortValue === "DateAdded" && sortFlag && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "DateAdded" && !sortFlag && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                dispatch(setNormalSortValue("UnitNumber"));
                if (sortFlag) {
                  dispatch(setNormalSortFlag(false));
                } else {
                  dispatch(setNormalSortFlag(true));
                }
              }}
            >
              Unit Number{" "}
              {sortValue === "UnitNumber" && sortFlag && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "UnitNumber" && !sortFlag && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                dispatch(setNormalSortValue("Delivery"));
                if (sortFlag) {
                  dispatch(setNormalSortFlag(false));
                } else {
                  dispatch(setNormalSortFlag(true));
                }
              }}
            >
              Delivery
              {sortValue === "Delivery" && sortFlag && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "Delivery" && !sortFlag && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                dispatch(setNormalSortValue("Amount"));
                if (sortFlag) {
                  dispatch(setNormalSortFlag(false));
                } else {
                  dispatch(setNormalSortFlag(true));
                }
              }}
            >
              Amount
              {sortValue === "Amount" && sortFlag && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "Amount" && !sortFlag && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-2"
              onClick={() => {
                dispatch(setNormalSortValue("source"));
                if (sortFlag) {
                  dispatch(setNormalSortFlag(false));
                } else {
                  dispatch(setNormalSortFlag(true));
                }
              }}
            >
              Source
              {sortValue === "source" && sortFlag && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "source" && !sortFlag && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? null
            : settlementData?.length >= 1 &&
              settlementData?.map((data) => (
                <tr
                  id="rowId"
                  key={data.checkDetailPK}

                  className={data.checkDetailPK === driverId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {customFormatDate(data.DateAdded)} </td>
                  <td className="f-w-600"> {data.UnitNumber} </td>
                  <td className="f-w-600"> {data.Delivery}</td>
                  <td className="f-w-600"> {data.Amount} </td>
                  <td className="f-w-600"> {data.Source} </td>
                </tr>
              ))}
        </tbody>
      </table>

      {loading ? "" : settlementData?.length === 0 && <NoRecordsMessage />}
    </div>
  );
}

export default TableListing;
