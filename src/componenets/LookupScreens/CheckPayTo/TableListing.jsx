import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setListingData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/CheckPayToLookupSlice";
import CheckPayToService from "../../../services/CheckPayToService";
import { No_Of_Record_per_page } from "../../../services/constants/applicationConstants";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram, customFetchFunction }) => {
  const listingData = useSelector((state) => state.checkPayToLookupReducer.listingData);
  const changeColor = useSelector((state) => state.checkPayToLookupReducer.changeColor);
  const loading = useSelector((state) => state.checkPayToLookupReducer.loading);
  const pageNumber = useSelector((state) => state.checkPayToLookupReducer.pageNumberCheckPayToLookup);
  const sortFlag = useSelector((state) => state.checkPayToLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.checkPayToLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.checkPayToLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.checkPayToLookupReducer.searchTerms);
  const selectedId = useSelector((state) => state.checkPayToLookupReducer.selectedId);

  const dispatch = useDispatch();

  const fetchListingData = () => {
    dispatch(setLoading(true));
    CheckPayToService.getAllcheckPayTo(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag,
      12
    )
      .then(({ data }) => {
        dispatch(setListingData(data.content));
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
        fetchListingData();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);
  const renderStateListing = listingData.map((checkPayTo) => (
    <tr
      id="rowId"
      key={renderItemId(checkPayTo)}
      onClick={(event) => {
        handleLookupSelection(checkPayTo, event);
        dispatch(setSelectedId(renderItemId(checkPayTo)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(checkPayTo) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {checkPayTo.description} </td>
      <td className="f-w-600"> {checkPayTo.name} </td>
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
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !sortFlag);
              }}
            >
              Name
              {sortFlag && sortValue === "name" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>
        {!loading && listingData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        listingData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
