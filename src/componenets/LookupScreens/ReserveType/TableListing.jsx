/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setChangeColor,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setReserveTypeData,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/ReserveTypeLookupSlice";
import ReserveTypeService from "../../../services/ReserveTypeService";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram, customFetchFunction }) => {
  // -----------------------------------------------------------------------
  const reserveTypeData = useSelector((state) => state.reserveTypeReducer.reserveTypeData);
  const changeColor = useSelector((state) => state.reserveTypeReducer.changeColor);
  const loading = useSelector((state) => state.reserveTypeReducer.loading);
  const pageNumber = useSelector((state) => state.reserveTypeReducer.pageNumber);
  let sortFlag = useSelector((state) => state.reserveTypeReducer.normalSortFlag);
  let sortValue = useSelector((state) => state.reserveTypeReducer.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.reserveTypeReducer.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.reserveTypeReducer.searchTerm);
  const selectedId = useSelector((state) => state.reserveTypeReducer.selectedId);

  const dispatch = useDispatch();

  const FetchFormTypesForMaintenance = () => {
    ReserveTypeService.getReserveTypeForLookup(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        const reserveTypeList = data.content?.map((reserveTypes) => ({
          ...reserveTypes,
          description: reserveTypes.description?.trim(),
        }));
        dispatch(setReserveTypeData(reserveTypeList));
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
    sortValue = value;
    sortFlag = val;
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        FetchFormTypesForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 300);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerm, sortValue, sortFlag]);

  const renderStateListing = reserveTypeData.map((form) => (
    <tr
      id="rowId"
      key={renderItemId(form)}
      onClick={(event) => {
        handleLookupSelection(form, event);
        dispatch(setSelectedId(renderItemId(form)));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(form) === selectedId ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {form.objectKey} </td>

      <td className="f-w-600"> {form.description} </td>
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
                onhandleNormalSort("objectKey", !sortFlag);
              }}
            >
              Object Key
              {sortFlag && sortValue === "objectKey" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "objectKey" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
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
        {!loading && reserveTypeData.length !== 0 && <tbody>{renderStateListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        reserveTypeData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
