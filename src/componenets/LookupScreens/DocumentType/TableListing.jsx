/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedId,
  setTotalElements,
  setTotalPages,
  setDocumentTypeListing,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setLoading,
} from "../../../redux/LookupScreens/DocumentTypeLookupSlice";
import DocumentTypeService from "../../../services/DocumentTypeService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
}) => {
  // -----------------------------------------------------------------------
  const documentTypeListing = useSelector((state) => state.documentTypeLookup.documentTypeListing);
  const changeColor = useSelector((state) => state.documentTypeLookup.changeColor);
  const loading = useSelector((state) => state.documentTypeLookup.loading);
  const pageNumber = useSelector((state) => state.documentTypeLookup.pageNumber);
  let sortFlag = useSelector((state) => state.documentTypeLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.documentTypeLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.documentTypeLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.documentTypeLookup.searchTerms);
  const selectedId = useSelector((state) => state.documentTypeLookup.formTypesId);

  const dispatch = useDispatch();

  const fetchDocumentTypeForMaintenance = () => {
    DocumentTypeService.getDocumentTypeForLookup(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;

        const filteredList = data?.filter((item) => item?.Type !== "Pagination");
        dispatch(setDocumentTypeListing(filteredList || []));

        const paginationData = data?.find((item) => item?.Type === "Pagination");
        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements || 0));
          dispatch(setTotalPages(paginationData.TotalPages || 1));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
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
        fetchDocumentTypeForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
      if (customServiceCallback) {
        customFetchCallback(customServiceCallback);
      }
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms, sortValue, sortFlag]);

  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const listingData = data.filter((item) => item.Type !== "Pagination" && item.Type !== "plantEnabled");

        const paginationData = data.find((item) => item.Type === "Pagination");

        dispatch(setDocumentTypeListing(listingData));

        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements || 0));
          dispatch(setTotalPages(paginationData.TotalPages || 0));
        }
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const renderStateListing = documentTypeListing?.map((item) => (
    <tr
      id="rowId"
      key={(renderItemId && renderItemId(item)) || item?.DocumentTypePK}
      onClick={(event) => {
        dispatch(setSelectedId((renderItemId && renderItemId(item)) || item?.DocumentTypePK));
        dispatch(setChangeColor(true));
        setTimeout(() => {
          handleLookupSelection(item, event);
        }, 50);
      }}
      onDoubleClick={(event) => {}}
      className={
        ((renderItemId && renderItemId(item)) || item?.DocumentTypePK) === selectedId && changeColor
          ? "tableSelected"
          : " "
      }
    >
      <td className="f-w-600"> {item?.ObjectKey} </td>
      <td className="f-w-600"> {item?.Description} </td>
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
                onhandleNormalSort("ObjectKey", !sortFlag);
              }}
            >
              Object Key
              {sortFlag && sortValue === "ObjectKey" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "ObjectKey" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("Description", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "Description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "Description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && documentTypeListing?.length > 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        documentTypeListing?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
