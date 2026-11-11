/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setListingData,
  setNormalSortValue,
  setNormalSortFlag,
  setLoading,
} from "../../../redux/LookupScreens/MenuLookupSlice";
import MenuService from "../../../services/MenuService";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram, customFetchFunction }) => {
  // -----------------------------------------------------------------------
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.menuLookup.listingData);
  const loading = useSelector((state) => state.menuLookup.loading);
  const pageNumber = useSelector((state) => state.menuLookup.pageNumber);
  const sortFlag = useSelector((state) => state.menuLookup.normalSortFlag);
  const sortValue = useSelector((state) => state.menuLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.menuLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.menuLookup.searchTerms);
  const selectedId = useSelector((state) => state.menuLookup.selectedId);

  const getMenuListing = () => {
    MenuService.getMenuListingForLookup(pageNumber, selectedSearchCriteria, searchTerms, sortValue, sortFlag)
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((menu) => ({ ...menu, description: menu.description?.trim() }));
        dispatch(setListingData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {})
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
      // Fetch Menu Listing for MP
      if (MaintenanceProgram) {
        getMenuListing();
      }

      // Fetch Menu Listing using Optional Custom Fetch Function
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const renderMenuListing = listingData?.map((menu) => (
    <tr
      id="rowId"
      key={renderItemId(menu)}
      onClick={(event) => {
        handleLookupSelection(menu, event);
        dispatch(setSelectedId(renderItemId(menu)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(menu) === selectedId ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {menu?.name} </td>
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
        {!loading && listingData?.length !== 0 && <tbody>{renderMenuListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        (!listingData || listingData?.length === 0) && (
          <div className="noRecordsSmallerFont">No Records Available</div>
        )
      )}
    </div>
  );
};

export default TableListing;
