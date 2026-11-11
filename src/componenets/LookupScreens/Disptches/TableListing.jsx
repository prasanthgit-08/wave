/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDispatchId,
  setTotalElements,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
  setDispatchesData,
} from "../../../redux/LookupScreens/DispatchesLookupSlice";
import FormsService from "../../../services/FormsService";
import PaymentRequestService from "../../../services/operations/PaymentRequestService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  orderEntry,
  MaintenanceProgram,
  customFetchFunction,
  FormTypeObjectKey,
}) => {
  // -----------------------------------------------------------------------
  const dispatchesData = useSelector((state) => state.dispatchesLookupSlice.dispatchesData);
  const changeColor = useSelector((state) => state.dispatchesLookupSlice.changeColor);
  const loading = useSelector((state) => state.dispatchesLookupSlice.loading);
  const pageNumber = useSelector((state) => state.dispatchesLookupSlice.pageNumber);
  let sortFlag = useSelector((state) => state.dispatchesLookupSlice.normalSortFlag);
  let sortValue = useSelector((state) => state.dispatchesLookupSlice.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.dispatchesLookupSlice.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.dispatchesLookupSlice.searchTerms);
  const dispatchId = useSelector((state) => state.dispatchesLookupSlice.dispatchId);

  const dispatch = useDispatch();

  const FetchFormsForMaintenance = () => {
    dispatch(setLoading(true));
    PaymentRequestService.getDispatchesForAuto(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        dispatch(setDispatchesData(filteredList));

        const paginationData = data?.find((item) => item?.Type === "Pagination");
        if (paginationData) {
          dispatch(setTotalElements(paginationData?.TotalElements || 0));
          dispatch(setTotalPages(paginationData?.TotalPages || 0));
        }

        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  useEffect(() => {
    if (MaintenanceProgram) {
      dispatch(setLoading(true));
    }
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        FetchFormsForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderStateListing = dispatchesData?.map((form) => (
    <tr
      id="rowId"
      key={renderItemId(form)}
      onClick={(event) => {
        handleLookupSelection(form, event);
        dispatch(setDispatchId(renderItemId(form)));
        dispatch(setChangeColor(true));
      }}
      className={dispatchId === renderItemId(form) && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {form?.Driver} </td>
      <td className="f-w-600"> {form?.Dispatched ? "Yes" : "No"} </td>
      <td className="f-w-600"> {form?.Pickup} </td>
      <td className="f-w-600"> {form?.Delivery} </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("Driver", !sortFlag);
              }}
            >
              Driver
              {sortFlag && sortValue === "Driver" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Driver" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("Dispatched", !sortFlag);
              }}
            >
              Dispatched
              {sortFlag && sortValue === "Dispatched" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Dispatched" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("Pickup", !sortFlag);
              }}
            >
              Pickup
              {sortFlag && sortValue === "Pickup" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Pickup" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600 col-3"
              onClick={() => {
                onhandleNormalSort("Delivery", !sortFlag);
              }}
            >
              Delivery
              {sortFlag && sortValue === "Delivery" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Delivery" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && dispatchesData?.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        dispatchesData?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
