/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUnitTypeGroupsData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setTotalElements,
  setTotalPages,
  setUnitTypeGroupsId,
  setLoading,
} from "../../../redux/LookupScreens/UnitTypeGroupsSlice";
import CustomerService from "../../../services/CustomerService";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import LoadingText from "../../common/LoadingText";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  commonSp,
}) => {
  // -----------------------------------------------------------
  const unitTypeGroupsData = useSelector((state) => state.unitTypeGroupsReducer.unitTypeGroupsData);
  const changeColor = useSelector((state) => state.unitTypeGroupsReducer.changeColor);
  const loading = useSelector((state) => state.unitTypeGroupsReducer.loading);
  const pageNumberUnitTypeGroupsLookup = useSelector(
    (state) => state.unitTypeGroupsReducer.pageNumberUnitTypeGroupsLookup
  );
  const sortFlag = useSelector((state) => state.unitTypeGroupsReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.unitTypeGroupsReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeGroupsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.unitTypeGroupsReducer.searchTerms);
  const unitTypeGroupsId = useSelector((state) => state.unitTypeGroupsReducer.unitTypeGroupsId);

  const dispatch = useDispatch();

  const getAllUnitTypeGroups = () => {
    dispatch(setLoading(true));
    CustomerService.getAllUnitTypeGroups(
      selectedSearchCriteria,
      searchTerms,
      pageNumberUnitTypeGroupsLookup,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        const unitTypeGroupList = data.content?.map((unitType) => ({
          ...unitType,
          description: unitType.description?.trim(),
        }));
        dispatch(setUnitTypeGroupsData(unitTypeGroupList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getAllUnitTypeGroupsNew = () => {
    dispatch(setLoading(true));
    CustomerService.getAllUnitTypeGroupsForCustomer({
      selectedSearchCriteria,
      searchTerms,
      pageNumberUnitTypeGroupsLookup,
      sortValue,
      sortFlag,
      type: "LookUp",
      pageSize: QuarterScreen_RecordsPerPage,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setUnitTypeGroupsData(listingData));
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
        getAllUnitTypeGroups();
      }
      // Fetch Unit Type Groups using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (commonSp) {
        getAllUnitTypeGroupsNew();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberUnitTypeGroupsLookup, searchTerms, sortFlag, sortValue]);

  const renderUnitTypeListingData = unitTypeGroupsData.map((unitTypeGroups) => (
    <tr
      id="rowId"
      key={renderItemId(unitTypeGroups)}
      onClick={(event) => {
        handleLookupSelection(unitTypeGroups, event);
        dispatch(setChangeColor(true));
        dispatch(setUnitTypeGroupsId(renderItemId(unitTypeGroups)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(unitTypeGroups) === unitTypeGroupsId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {unitTypeGroups.description || unitTypeGroups.Description} </td>
    </tr>
  ));

  return (
    <div className="fixTableHead">
      {/* {loading && <LoadingText />} */}
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
        {!loading && unitTypeGroupsData.length !== 0 && <tbody>{renderUnitTypeListingData}</tbody>}
      </table>
      {loading ? (
        <LoadingText />
      ) : (
        unitTypeGroupsData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
