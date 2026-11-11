/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCustomerPlantGroupsData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setCustomerPlantGroupsId,
  setLoading,
} from "../../../redux/LookupScreens/CustomerPlantGroupsLookupSlice";
import CustomerService from "../../../services/CustomerService";
import LoadingText from "../../common/LoadingText";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customerTripSummary,
}) => {
  // -----------------------------------------------------------
  const customerPlantGroupsData = useSelector(
    (state) => state.customerPlantGroupsReducer.customerPlantGroupsData
  );
  const changeColor = useSelector((state) => state.customerPlantGroupsReducer.changeColor);
  const loading = useSelector((state) => state.customerPlantGroupsReducer.loading);
  const pageNumbercustomerPlantGroupsLookup = useSelector(
    (state) => state.customerPlantGroupsReducer.pageNumbercustomerPlantGroupsLookup
  );
  const sortFlag = useSelector((state) => state.customerPlantGroupsReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.customerPlantGroupsReducer.normalSortValue);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantGroupsReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.customerPlantGroupsReducer.searchTerms);
  const customerPlantGroupsId = useSelector(
    (state) => state.customerPlantGroupsReducer.customerPlantGroupsId
  );

  const dispatch = useDispatch();

  const getAllCustomerPlantGroups = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomerPlantGroups(
      selectedSearchCriteria,
      searchTerms,
      pageNumbercustomerPlantGroupsLookup,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        const trimmedData = data.content?.map((item) => ({
          ...item,
          description: item.description?.trim(),
        }));
        dispatch(setCustomerPlantGroupsData(trimmedData));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getCustomerPlantGroupsForTripSummary = () => {
    dispatch(setLoading(true));
    CustomerService.getAllCustomerPlantGroupsForTripSummary({
      selectedSearchCriteria,
      searchTerms,
      pageNumbercustomerPlantGroupsLookup,
      sortValue,
      sortFlag,
      type: "LookUp",
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setCustomerPlantGroupsData(listingData));
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

  /**
   * Fetch Unit Type Groups conditionally
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Unit Type Groups for MP
      if (MaintenanceProgram) {
        getAllCustomerPlantGroups();
      }
      // Fetch Unit Type Groups using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (customerTripSummary) {
        getCustomerPlantGroupsForTripSummary();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumbercustomerPlantGroupsLookup, searchTerms, sortFlag, sortValue]);

  const renderCustomerPlantListingData = customerPlantGroupsData.map((customerPlantGroup) => (
    <tr
      id="rowId"
      key={renderItemId(customerPlantGroup)}
      onClick={(event) => {
        handleLookupSelection(customerPlantGroup, event);
        dispatch(setChangeColor(true));
        dispatch(setCustomerPlantGroupsId(renderItemId(customerPlantGroup)));
      }}
      onDoubleClick={(event) => {}}
      className={
        renderItemId(customerPlantGroup) === customerPlantGroupsId && changeColor ? "tableSelected" : " "
      }
    >
      <td className="f-w-600"> {customerPlantGroup?.description || customerPlantGroup?.Description} </td>
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
        {!loading && customerPlantGroupsData.length !== 0 && <tbody>{renderCustomerPlantListingData}</tbody>}
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        customerPlantGroupsData.length === 0 && (
          <div className="noRecordsSmallerFont">No Records Available</div>
        )
      )}
    </div>
  );
};

export default TableListing;
