/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTotalElements,
  setTotalPages,
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setPrinterData,
  setId,
  setLoading,
} from "../../../redux/LookupScreens/PrinterLookupSlice";
import YardService from "../../../services/YardService";

const TableListing = ({ renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  // -----------------------------------------------------------
  const dispatch = useDispatch();

  const pageNumberPrinterLookup = useSelector((state) => state.printerLookupReducer.pageNumberPrinterLookup);
  const printerData = useSelector((state) => state.printerLookupReducer.printerData);
  const selectedSearchCriteria = useSelector((state) => state.printerLookupReducer.selectedSearchCriteria);
  const sortFlag = useSelector((state) => state.printerLookupReducer.normalSortFlag);
  const sortValue = useSelector((state) => state.printerLookupReducer.normalSortValue);
  const searchTerm = useSelector((state) => state.printerLookupReducer.searchTerm);
  const id = useSelector((state) => state.printerLookupReducer.id);
  const changeColor = useSelector((state) => state.printerLookupReducer.changeColor);
  const loading = useSelector((state) => state.printerLookupReducer.loading);

  const getPrinterData = () => {
    YardService.fetchPrinterDetails(
      pageNumberPrinterLookup,
      selectedSearchCriteria,
      searchTerm,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const data = response.data;
        dispatch(setPrinterData(data.content));
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

  /**
   * Fetch Printer conditionally for Maintenance Programs
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Printer  for MP
      if (MaintenanceProgram) {
        getPrinterData();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumberPrinterLookup, searchTerm, sortValue, sortFlag]);

  const renderPrinterListingData = printerData.map((printer) => (
    <tr
      id="rowId"
      key={renderItemId(printer)}
      onClick={(event) => {
        handleLookupSelection(printer, event);
        dispatch(setChangeColor(true));
        dispatch(setId(renderItemId(printer)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(printer) === id && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {printer.description} </td>
      <td className="f-w-600"> {printer.printerURL} </td>
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
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("printerURL", !sortFlag);
              }}
            >
              URL
              {sortFlag && sortValue === "printerURL" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "printerURL" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        {!loading && printerData.length !== 0 && <tbody>{renderPrinterListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        printerData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
