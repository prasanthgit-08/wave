import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import {
  setAssignSortValue,
  setChangeColor,
  setCustomerGroupInput,
  setCustomerInput,
  setCustomerPlantGroupInput,
  setCustomerPlantInput,
  setCustomerUnitTypeGroupData,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumberUT,
  setRadioValue,
  setSelectId,
  setTotalElements,
  setTotalPages,
  setUnitTypeGroupData,
  setUnitTypeGroupPKS,
  setViewDetail,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import { useNavigate } from "react-router-dom";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import LoadingIcon from "../../../common/LoadingIcon";

/**
 * @param {boolean} loading - true while a list API call is pending (shared with the pagination component)
 * @param {Function} setLoading - setter for `loading`, owned by CustomerUtGroupsMainPage
 */
export const TableListing = ({ loading, setLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adSort] = useState(false);

  // Rows stay hidden only until the first response; later reloads keep them under the loader.
  const [initialLoading, setInitialLoading] = useState(true);
  const latestRequestId = useRef(0);

  const customerUnitTypeGroupData = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerUnitTypeGroupData
  );
  const pageNumber = useSelector((state) => state.customerUnitTypeGroupReducer.pageNumber);
  const searchTerms = useSelector((state) => state.customerUnitTypeGroupReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.customerUnitTypeGroupReducer.searchCriteria);
  const searchedDealer = useSelector((state) => state.customerUnitTypeGroupReducer.searchedDealer);
  const sortFlag = useSelector((state) => state.customerUnitTypeGroupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.customerUnitTypeGroupReducer.normalSortValue);
  const advanceSortingOrder = useSelector((state) => state.customerUnitTypeGroupReducer.advanceSortingOrder);

  const changeColor = useSelector((state) => state.customerUnitTypeGroupReducer.changeColor);
  const searchedData = useSelector((state) => state.customerUnitTypeGroupReducer.searchedData);
  const searchDescription = useSelector((state) => state.customerUnitTypeGroupReducer.searchDescription);

  const searchCustomer = useSelector((state) => state.customerUnitTypeGroupReducer.searchCustomer);

  const searchPlant = useSelector((state) => state.customerUnitTypeGroupReducer.searchPlant);

  const searchPlantGroup = useSelector((state) => state.customerUnitTypeGroupReducer.searchPlantGroup);

  const searchCustomerGroup = useSelector((state) => state.customerUnitTypeGroupReducer.searchCustomerGroup);
  const selectId = useSelector((state) => state.customerUnitTypeGroupReducer.selectId);

  const fetchCustomerUnitTypeGroup = async () => {
    const requestId = ++latestRequestId.current;
    CustomerUnitTypeGroupsService.getCustomerUnitTypeGroup(
      searchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      searchDescription,
      searchCustomer,
      searchPlant,
      searchPlantGroup,
      searchCustomerGroup
    )
      .then((response) => {
        const data = response?.data;

        dispatch(setCustomerUnitTypeGroupData(data?.content));
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
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };
  useEffect(() => {
    // Show the loader for the whole wait (debounce + request) of search, sort and paging.
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchCustomerUnitTypeGroup();
    }, 50);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    searchCriteria,
    sortValue,
    sortFlag,
    advanceSortingOrder,
    pageNumber,
    searchTerms,
    searchDescription,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup,
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
                  onhandleNormalSort("description", !sortFlag);
                }
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

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
          </tr>
        </thead>

        <tbody>
          {initialLoading
            ? null
            : customerUnitTypeGroupData?.map((unitypeGroup) => (
                <tr
                  id="rowId"
                  key={unitypeGroup.customerunittypegroupPK}
                  onClick={() => dispatch(setChangeColor(true))}
                  onDoubleClick={() => {
                    dispatch(setSelectId(unitypeGroup.customerunittypegroupPK));
                    dispatch(setViewDetail(true));
                    dispatch(setChangeColor(true));
                    dispatch(setEditFormData(null));
                    dispatch(setUnitTypeGroupPKS([]));
                    dispatch(setUnitTypeGroupData([]));
                    dispatch(setRadioValue(null));
                    dispatch(setAssignSortValue(null));
                    dispatch(setPageNumberUT(0));
                    dispatch(setCustomerInput(""));
                    dispatch(setCustomerPlantGroupInput(""));
                    dispatch(setCustomerGroupInput(""));
                    dispatch(setCustomerPlantInput(""));

                    setTimeout(() => {
                      navigate(
                        `/customer-unit-type-groups-add/${unitypeGroup.customerunittypegroupPK}/${pageNumber}`
                      );
                    }, 100);
                  }}
                  className={
                    unitypeGroup.customerunittypegroupPK === selectId && changeColor ? "tableSelected" : ""
                  }
                >
                  <td className="f-w-600"> {unitypeGroup.description} </td>
                  <td className="f-w-600"> {unitypeGroup.customerName} </td>
                  <td className="f-w-600"> {unitypeGroup.plantName} </td>
                  <td className="f-w-600"> {unitypeGroup.plantGroupDescription} </td>
                  <td className="f-w-600"> {unitypeGroup.customerGroupDescription} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {initialLoading || loading
        ? ""
        : customerUnitTypeGroupData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};
