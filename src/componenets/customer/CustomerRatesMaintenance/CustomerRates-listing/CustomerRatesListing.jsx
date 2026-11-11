import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import CustomerRatesService from "../../../../services/CustomerRatesService";

import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setCustomerGroupId,
  setCustomerGroupInput,
  setCustomerId,
  setCustomerInput,
  setCustomerInvoicePercentage,
  setCustomerPlantGroupId,
  setCustomerPlantGroupInput,
  setCustomerPlantId,
  setCustomerPlantInput,
  setCustomerRatesListData,
  setCustomerUnitTypeGroupId,
  setCustomerUnitTypeGroupInput,
  setSelectId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/CustomerRatesSlice";
import { setEditFormData } from "../../../../redux/CustomerRatesSlice";
import LoadingIcon from "../../../common/LoadingIcon";

/**
 * @param {boolean} loading - true while a list API call is pending (shared with the pagination component)
 * @param {Function} setLoading - setter for `loading`, owned by CustomerRatesMainPage
 */
export const CustomerRatesListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);
  // Rows stay hidden only until the first response; later reloads keep them under the loader.
  const [initialLoading, setInitialLoading] = useState(true);
  const latestRequestId = useRef(0);
  const customerRatesListData = useSelector((state) => state.customerRatesReducer.customerRatesListData);
  const pageNumber = useSelector((state) => state.customerRatesReducer.pageNumber);
  const searchTerms = useSelector((state) => state.customerRatesReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.customerRatesReducer.searchCriteria);
  let sortFlag = useSelector((state) => state.customerRatesReducer.sortFlag);
  let sortValue = useSelector((state) => state.customerRatesReducer.sortValue);
  const changeColor = useSelector((state) => state.customerRatesReducer.changeColor);
  const searchCustomer = useSelector((state) => state.customerRatesReducer.searchCustomer);
  const searchPlant = useSelector((state) => state.customerRatesReducer.searchPlant);
  const searchPlantGroup = useSelector((state) => state.customerRatesReducer.searchPlantGroup);
  const searchCustomerGroup = useSelector((state) => state.customerRatesReducer.searchCustomerGroup);
  const searchUnitTypeGroup = useSelector((state) => state.customerRatesReducer.searchUnitTypeGroup);
  const selectId = useSelector((state) => state.customerRatesReducer.selectId);
  /*   List the Customer Rates Records
   */
  const fetchCustomerRates = async () => {
    const requestId = ++latestRequestId.current;
    CustomerRatesService.getCustomerRatesList(
      searchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      searchCustomer,
      searchPlant,
      searchPlantGroup,
      searchCustomerGroup,
      searchUnitTypeGroup
    )
      .then((response) => {
        const data = response?.data;
        dispatch(setCustomerRatesListData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
      })
      .catch(() => {})
      .finally(() => {
        // An older request finishing late must not hide the loader of a newer one.
        if (requestId !== latestRequestId.current) return;
        setInitialLoading(false);
        setLoading(false);
      });
  };

  // Only update the sort state; the debounced effect below refetches when it changes.
  // Fetching here as well caused a duplicate API call on every sort click.
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortFlag(val));
  };

  useEffect(() => {
    // Show the loader for the whole wait (debounce + request) of search, sort and paging.
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchCustomerRates();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    searchCriteria,
    sortValue,
    sortFlag,
    pageNumber,
    searchTerms,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup,
    searchUnitTypeGroup,
  ]);
  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customername", !sortFlag);
                }
              }}
            >
              Customer
              {sortFlag && sortValue === "customername" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customername" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("plantName", !sortFlag);
                }
              }}
            >
              Plant
              {sortFlag && sortValue === "plantName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "plantName" && <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>

            <th
              className="f-w-600"
              style={{ minWidth: "100px" }}
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customerPlantGroupDesc", !sortFlag);
                }
              }}
            >
              {" "}
              Plant Group
              {sortFlag && sortValue === "customerPlantGroupDesc" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerPlantGroupDesc" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              style={{ minWidth: "100px" }}
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customerGroupDesc", !sortFlag);
                }
              }}
            >
              {" "}
              Customer Group
              {sortFlag && sortValue === "customerGroupDesc" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerGroupDesc" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              style={{ minWidth: "100px" }}
              onClick={() => {
                if (adSort === false) {
                  onhandleNormalSort("customerUnitTypeGroupDesc", !sortFlag);
                }
              }}
            >
              {" "}
              Unit Type Group
              {sortFlag && sortValue === "customerUnitTypeGroupDesc" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "customerUnitTypeGroupDesc" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {initialLoading
            ? null
            : customerRatesListData?.map((customerRates) => (
                <tr
                  id="rowId"
                  key={customerRates.customerRatePK}
                  onClick={() => dispatch(setChangeColor(true))}
                  onDoubleClick={() => {
                    dispatch(setSelectId(customerRates.customerRatePK));
                    dispatch(setCustomerId(""));
                    dispatch(setCustomerPlantId(""));
                    dispatch(setCustomerPlantGroupId(""));
                    dispatch(setCustomerGroupId(""));
                    dispatch(setCustomerUnitTypeGroupId(""));
                    dispatch(setCustomerInput(""));
                    dispatch(setCustomerPlantInput(""));
                    dispatch(setCustomerPlantGroupInput(""));
                    dispatch(setCustomerGroupInput(""));
                    dispatch(setCustomerUnitTypeGroupInput(""));
                    dispatch(setViewDetail(true));
                    dispatch(setChangeColor(true));
                    dispatch(setEditFormData(undefined));
                    dispatch(setCustomerInvoicePercentage(""));
                    setTimeout(() => {
                      navigate(
                        "/customer-rates/new-record/" + customerRates.customerRatePK + "/" + pageNumber
                      );
                    }, 100);
                  }}
                  className={customerRates.customerRatePK === selectId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {customerRates.customerFK?.name} </td>
                  <td className="f-w-600"> {customerRates.customerPlantFK?.name} </td>
                  <td className="f-w-600"> {customerRates.customerPlantGroupFK?.description || ""} </td>
                  <td className="f-w-600"> {customerRates.customerGroupFK?.description || ""} </td>
                  <td className="f-w-600"> {customerRates.customerUnitTypeGroup?.description || ""} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {initialLoading || loading
        ? ""
        : customerRatesListData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};
