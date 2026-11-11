/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDealerGroupsId,
  setTotalElements,
  setTotalPages,
  setDealerGroupsData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/DealerGroupLookupSlice";
import DealerGroupService from "../../../services/DealerGroupService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  // -----------------------------------------------------------------------
  const dealerGroupsData = useSelector((state) => state.dealerGroupsReducer.dealerGroupsData);
  const changeColor = useSelector((state) => state.dealerGroupsReducer.changeColor);
  const loading = useSelector((state) => state.dealerGroupsReducer.loading);
  const pageNumber = useSelector((state) => state.dealerGroupsReducer.pageNumber);
  const sortFlag = useSelector((state) => state.dealerGroupsReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.dealerGroupsReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.dealerGroupsReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.dealerGroupsReducer.searchTerms);
  const dealerGroupsId = useSelector((state) => state.dealerGroupsReducer.dealerGroupsId);

  const dispatch = useDispatch();

  const fetchDealerGroupForMaintenance = () => {
    DealerGroupService.getDealerGroupsForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const dealerGroupsList = data.content?.map((dealerGroups) => ({
          ...dealerGroups,
          description: dealerGroups.description?.trim(),
        }));
        dispatch(setDealerGroupsData(dealerGroupsList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
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
        fetchDealerGroupForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderStateListing = dealerGroupsData.map((data) => (
    <tr
      id="rowId"
      key={renderItemId(data)}
      onClick={(event) => {
        handleLookupSelection(data, event);
        dispatch(setDealerGroupsId(renderItemId(data)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(data) === dealerGroupsId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {data.description} </td>
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
        {!loading && dealerGroupsData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        dealerGroupsData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
