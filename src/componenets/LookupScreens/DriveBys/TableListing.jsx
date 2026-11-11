/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setChangeColor,
  setDriveBysListingData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/DriveBysLookupSlice";
import OrderEntryService from "../../../services/OrderEntryService";

const TableListing = ({ onHide, OEDriveBys, handleOEDriveByOnClick, includePostalCodePK }) => {
  // --------------------------------------------------
  const driveBysListingData = useSelector((state) => state.driveBysLookup.driveBysListingData);
  const changeColor = useSelector((state) => state.driveBysLookup.changeColor);
  const loading = useSelector((state) => state.driveBysLookup.loading);
  const pageNumber = useSelector((state) => state.driveBysLookup.pageNumber);
  let sortFlag = useSelector((state) => state.driveBysLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.driveBysLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.driveBysLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.driveBysLookup.searchTerms);
  const selectedId = useSelector((state) => state.driveBysLookup.selectedId);

  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const id = useSelector((state) => state.orderEntryReducer.selectedCustomerBillingPlantId);

  // TODO: temporary states for fetching driveBys, add appropriate varaibles later
  // state for drive by pop up
  const [driveByPopName, setDriveByPopName] = useState("");
  const [driveByCity, setDriveByCity] = useState("");
  const [driveByStateCode, setDriveByStateCode] = useState("");

  const dispatch = useDispatch();

  const fetchSelectDriveBys = async () => {
    OrderEntryService.getAllDrivebys(
      pageNumber,
      driveByStateCode,
      driveByCity,
      driveByPopName,
      selectedSearchCriteria,
      searchTerms,
      sortValue,
      sortFlag,
      includePostalCodePK || false
    )
      .then((response) => {
        const data = response.data;
        dispatch(setDriveBysListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  // TODO: implment later
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;

    fetchSelectDriveBys();
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchSelectDriveBys();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerms]);

  const renderDriveBysListing = driveBysListingData?.map((driverBy) => (
    <tr
      id="rowId"
      key={driverBy.unitDrivebyPK}
      onClick={(event) => {
        /**
         * Calling different handler functions based on where the Lookup Screen is called from
         */
        if (OEDriveBys) {
          handleOEDriveByOnClick(driverBy, event);
          onHide();
        }
        // TODO: add common functionalities here
        // *************************************
        dispatch(setChangeColor(true));
        dispatch(setSelectedId(driverBy.unitDrivebyPK));
      }}
      onDoubleClick={(event) => {}}
      className={driverBy.unitDrivebyPK === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {driverBy.name} </td>
      <td className="f-w-600"> {driverBy.city} </td>
      <td className="f-w-600"> {driverBy.stateCode} </td>
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
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("city", !sortFlag);
              }}
            >
              City
              {sortFlag && sortValue === "city" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "city" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("stateCode", !sortFlag);
              }}
            >
              State
              {sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "stateCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && driveBysListingData?.length !== 0 && <tbody>{renderDriveBysListing}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        driveBysListingData?.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
