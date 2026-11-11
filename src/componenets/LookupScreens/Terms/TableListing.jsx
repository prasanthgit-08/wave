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
} from "../../../redux/LookupScreens/TermsLookupSlice";
import TermsService from "../../../services/TermsService";
import { No_Of_Record_per_page } from "../../../services/constants/applicationConstants";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram, customFetchFunction }) => {
  const listingData = useSelector((state) => state.termsLookupReducer.listingData);
  const changeColor = useSelector((state) => state.termsLookupReducer.changeColor);
  const loading = useSelector((state) => state.termsLookupReducer.loading);
  const pageNumber = useSelector((state) => state.termsLookupReducer.pageNumberTermsLookup);
  const sortFlag = useSelector((state) => state.termsLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.termsLookupReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.termsLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.termsLookupReducer.searchTerms);
  const selectedId = useSelector((state) => state.termsLookupReducer.selectedId);

  const dispatch = useDispatch();

  const fetchListingData = () => {
    dispatch(setLoading(true));
    TermsService.fetchAllTerms(selectedSearchCriteria, searchTerms, pageNumber, sortValue, sortFlag, 12)
      .then(({ data }) => {
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .finally(() => {
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
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);
  const renderStateListing = listingData.map((terms) => (
    <tr
      id="rowId"
      key={renderItemId(terms)}
      onClick={(event) => {
        handleLookupSelection(terms, event);
        dispatch(setSelectedId(renderItemId(terms)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(terms) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {terms.description} </td>
      <td className="f-w-600"> {terms.terms} </td>
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
                onhandleNormalSort("terms", !sortFlag);
              }}
            >
              Terms
              {sortFlag && sortValue === "terms" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "terms" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
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
