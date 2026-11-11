/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

import { useNavigate } from "react-router-dom";
import CustomerUnitTypeGroupsService from "../../../services/CustomerUnitTypeGroupsService";
import {
  setCustomerUnitTypeGroupsData,
  setTotalElements,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
  setSelectedId,
} from "../../../redux/LookupScreens/CustomerUnitTypeGroupsLookupSlice";
import LoadingText from "../../common/LoadingText";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customerId,
  customerPlantId,
  customerPlantGroupId,
  customerGroupId,
  supplementalRates,
  customerRates,
}) => {
  const customerUnitTypeGroupsData = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.customerUnitTypeGroupsData
  );
  const pageNumber = useSelector((state) => state.customerUnitTypeGroupLookupReducer.pageNumber);

  const loading = useSelector((state) => state.customerUnitTypeGroupLookupReducer.loading);
  const searchTerms = useSelector((state) => state.customerUnitTypeGroupLookupReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.customerUnitTypeGroupLookupReducer.searchCriteria);

  let sortFlag = useSelector((state) => state.customerUnitTypeGroupLookupReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.customerUnitTypeGroupLookupReducer.normalSortValue);
  const advanceSortingOrder = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.advanceSortingOrder
  );

  const changeColor = useSelector((state) => state.customerUnitTypeGroupLookupReducer.changeColor);
  const searchedData = useSelector((state) => state.customerUnitTypeGroupLookupReducer.searchedData);
  const searchDescription = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.searchDescription
  );

  const searchCustomer = useSelector((state) => state.customerUnitTypeGroupLookupReducer.searchCustomer);

  const searchPlant = useSelector((state) => state.customerUnitTypeGroupLookupReducer.searchPlant);

  const searchPlantGroup = useSelector((state) => state.customerUnitTypeGroupLookupReducer.searchPlantGroup);

  const searchCustomerGroup = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.searchCustomerGroup
  );
  const selectedId = useSelector((state) => state.customerUnitTypeGroupLookupReducer.selectedId);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.selectedSearchCriteria
  );

  const dispatch = useDispatch();
  const [adSort] = useState(false);

  const fetchCustomerUnitTypeGroups = async () => {
    CustomerUnitTypeGroupsService.getCustomerUnitTypeGroupForLookup(
      searchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      searchDescription,
      searchCustomer,
      searchPlant,
      searchPlantGroup,
      searchCustomerGroup,
      customerId,
      customerPlantId,
      customerPlantGroupId,
      customerGroupId
    )
      .then((response) => {
        const data = response.data;
        const customerUnitTypeGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        dispatch(setCustomerUnitTypeGroupsData(customerUnitTypeGroupList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      });
  };
  const fetchCustomerUnitTypeGroupsByCustomerId = async () => {
    dispatch(setLoading(true));
    CustomerUnitTypeGroupsService.getCustomerUnitTypeGroupForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      searchDescription,
      searchCustomer,
      searchPlant,
      searchPlantGroup,
      searchCustomerGroup,
      customerId,
      customerPlantId,
      customerPlantGroupId,
      customerGroupId,
      customerRates
    )
      .then((response) => {
        const data = response.data;
        const customerUnitTypeGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        dispatch(setCustomerUnitTypeGroupsData(customerUnitTypeGroupList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        fetchCustomerUnitTypeGroups();
      }
      if (supplementalRates) {
        fetchCustomerUnitTypeGroupsByCustomerId();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    selectedSearchCriteria,
    pageNumber,
    searchTerms,
    sortValue,
    sortFlag,
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
    searchDescription,
    searchCustomer,
    searchPlant,
    searchPlantGroup,
    searchCustomerGroup,
  ]);

  return (
    <div className="fixTableHead">
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
          {loading
            ? null
            : customerUnitTypeGroupsData.map((unitType) => (
                <tr
                  id="rowId"
                  key={renderItemId(unitType.customerunittypegroupPK)}
                  onClick={(event) => {
                    handleLookupSelection(unitType, event);
                    dispatch(setSelectedId(unitType.customerunittypegroupPK));
                    dispatch(setChangeColor(true));
                  }}
                  className={renderItemId(unitType) === selectedId && changeColor ? "tableSelected" : " "}
                >
                  <td className="f-w-600"> {unitType.description} </td>
                  <td className="f-w-600"> {unitType.customerName} </td>
                  <td className="f-w-600"> {unitType.plantName} </td>
                  <td className="f-w-600"> {unitType.plantGroupDescription} </td>
                  <td className="f-w-600"> {unitType.customerGroupDescription} </td>
                </tr>
              ))}
        </tbody>
      </table>

      {loading ? (
        <LoadingText />
      ) : (
        customerUnitTypeGroupsData.length === 0 && (
          <div className="noRecordsSmallerFont">No Records Available</div>
        )
      )}
    </div>
  );
};
export default TableListing;
