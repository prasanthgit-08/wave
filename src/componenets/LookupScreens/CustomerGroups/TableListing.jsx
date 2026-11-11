/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import StateService from "../../../services/StateService";

import CustomerGroupService from "../../../services/CustomerGroupService";
import {
  setCustomerGroupData,
  setTotalElements,
  setTotalPages,
  setLoading,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setCustomerGroupId,
} from "../../../redux/LookupScreens/CustomerGroupsLookupSlice";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  CustomerFilter,
  customFetchFunction,
  customerId,
  commonSp,
}) => {
  // -----------------------------------------------------------------------
  const customerGroupData = useSelector((state) => state.customerGroupLookupReducer.customerGroupData);
  const changeColor = useSelector((state) => state.customerGroupLookupReducer.changeColor);
  const loading = useSelector((state) => state.customerGroupLookupReducer.loading);
  const pageNumber = useSelector((state) => state.customerGroupLookupReducer.pageNumber);
  const sortFlag = useSelector((state) => state.customerGroupLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.customerGroupLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerGroupLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.customerGroupLookupReducer.searchTerms);
  const formId = useSelector((state) => state.customerGroupLookupReducer.formId);

  const dispatch = useDispatch();

  const FetchCustomerGroupForMaintenance = () => {
    dispatch(setLoading(true));
    CustomerGroupService.getCustomerGroupForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const customerGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        dispatch(setCustomerGroupData(customerGroupList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const FetchCustomerGroupByCustomer = () => {
    dispatch(setLoading(true));
    CustomerGroupService.getCustomerGroupForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      customerId
    )
      .then((response) => {
        const data = response.data;
        const customerGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        dispatch(setCustomerGroupData(customerGroupList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getAllCustomerGroupGroupsNew = () => {
    dispatch(setLoading(true));
    CustomerGroupService.getAllCustomerGroupsForCustomer({
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      type: "LookUp",
      pageSize: 12,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerGroupData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        FetchCustomerGroupForMaintenance();
      } else if (CustomerFilter) {
        FetchCustomerGroupByCustomer();
      }
      if (commonSp) {
        getAllCustomerGroupGroupsNew();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag, customerId]);

  const renderStateListing = customerGroupData.map((form) => (
    <tr
      id="rowId"
      key={renderItemId(form)}
      onClick={(event) => {
        handleLookupSelection(form, event);
        dispatch(setCustomerGroupId(renderItemId(form)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(form) === formId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {form.description || form.Description} </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && customerGroupData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        customerGroupData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
