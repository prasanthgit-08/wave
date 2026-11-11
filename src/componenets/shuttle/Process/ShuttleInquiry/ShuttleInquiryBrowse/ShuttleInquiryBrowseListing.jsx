import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShuttleInquiryService from "../../../../../services/shuttle/process/ShuttleInquiryService";
import { setPageNumber } from "../../../../../redux/ShuttleInquirySlice";
import {
  setAllShuttleData,
  setLoader,
  setSortFieldName,
  setSortFlag,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setChangeColor,
} from "../../../../../redux/ShuttleInquirySlice";
import moment from "moment";
import { customFormatDate } from "../../../../../utils/validation/DateFormatUtils";
import { HalfScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";

function ShuttleInquiryBrowseListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  //Fetch value from redux
  const allShuttleData = useSelector((state) => state.shuttleInquiryReducer.shuttleData);
  const searchObject = useSelector((state) => state.shuttleInquiryReducer.shuttleSearchObject);
  const sortFieldName = useSelector((state) => state.shuttleInquiryReducer.sortFieldName);
  const sortFlag = useSelector((state) => state.shuttleInquiryReducer.sortFlag);

  const loader = useSelector((state) => state.shuttleInquiryReducer.loader);
  const changeColor = useSelector((state) => state.shuttleInquiryReducer.changeColor);

  const pageNumber = useSelector((state) => state.shuttleInquiryReducer.pageNumber);
  const shuttleSearchObject = useSelector((state) => state.shuttleInquiryReducer.shuttleSearchObject);
  const selectedShuttleID = useSelector((state) => state.shuttleInquiryReducer.selectedId);
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortFieldName(value));
    dispatch(setSortFlag(val));
  };
  const handleDoubleClick = (unitShuttlePK) => {
    dispatch(setSelectedId(unitShuttlePK));
    navigate("/shuttle-inquiry-detail");
  };
  const handleListAllShuttleData = () => {
    if (shuttleSearchObject == null || shuttleSearchObject === undefined) {
      navigate("/shuttle-inquiry-selection");
    } else {
      ShuttleInquiryService.getAllShuttleData({
        driverFK: shuttleSearchObject.driverFK,
        unitFK: shuttleSearchObject.unitFK,
        unitCompanyFK: shuttleSearchObject.unitCompanyFK,
        startDate: shuttleSearchObject.startDate,
        endDate: shuttleSearchObject.endDate,
        dateSelection: shuttleSearchObject.dateSelection,
        yardFK: shuttleSearchObject.yardFK,
        cityFK: shuttleSearchObject.cityFK,
        plantFK: shuttleSearchObject.plantFK,
        cityToYard: shuttleSearchObject.cityToYard,
        yardToCity: shuttleSearchObject.yardToCity,
        yardToYard: shuttleSearchObject.yardToYard,
        plantToPlant: shuttleSearchObject.plantToPlant,
        dryRun: shuttleSearchObject.dryRun,
        bonus: shuttleSearchObject.bonus,
        sortFlag: sortFlag,
        sortFieldName: sortFieldName,
        pageNumber: pageNumber,
        size: HalfScreen_RecordsPerPage,
        selectedCompanyName: shuttleSearchObject.companyName,
        currentCompanyName: shuttleSearchObject.currentCompanyName,
      })
        .then((response) => {
          const data = response.data;
          dispatch(setAllShuttleData(data.content));
          dispatch(setTotalElements(data.totalElements));
          dispatch(setTotalPages(data.totalPages));
          // dispatch(setLoader(false));
          setLoading(false);
        })
        .catch((error) => {
          // dispatch(setLoader(false));
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      handleListAllShuttleData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, sortFieldName, sortFlag]);

  useEffect(() => {
    if (searchObject === null) {
      navigate("/shuttle-inquiry-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchObject]);
  const renderShuttleListingData = allShuttleData?.map((unitShuttle) => (
    <tr
      id="rowId"
      key={unitShuttle.unitShuttlePK}
      onClick={(event) => {
        dispatch(setChangeColor(true));
        dispatch(setSelectedId(unitShuttle.unitShuttlePK));
      }}

      className={unitShuttle.unitShuttlePK === selectedShuttleID && changeColor ? "tableSelected" : " "}

      onDoubleClick={() => {
        handleDoubleClick(unitShuttle.unitShuttlePK);
      }}
    >
      <td className="f-w-600 col-2">
        {unitShuttle.firstName ? unitShuttle.firstName : ""}{" "}
        {unitShuttle.lastName ? unitShuttle.lastName : ""}
      </td>
      <td className="f-w-600 col-2">
        {searchObject
          ? searchObject.dateSelection === "Entry" ||
            searchObject.dateSelection === "All" ||
            searchObject.dateSelection === ""
            ? customFormatDate(unitShuttle.addDate, "MM/DD/YY")
            : searchObject.dateSelection === "Post"
              ? customFormatDate(unitShuttle.postDate, "MM/DD/YY")
              : searchObject.dateSelection === "Paid"
                ? customFormatDate(unitShuttle.paidDate, "MM/DD/YY")
                : searchObject.dateSelection === "Shuttle"
                  ? customFormatDate(unitShuttle.shuttleDate, "MM/DD/YY")
                  : ""
          : ""}
      </td>
      <td className="f-w-600 col-2">{unitShuttle.type}</td>
      <td className="f-w-600 col-3">
        {unitShuttle.pickUpLocation ? unitShuttle.pickUpLocation?.trim() : ""}
      </td>
      <td className="f-w-600 col-3">{unitShuttle.dropLocation ? unitShuttle.dropLocation?.trim() : ""}</td>
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
                onhandleNormalSort("firstName", !sortFlag);
              }}
            >
              Driver
              {sortFlag && sortFieldName === "firstName" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortFieldName === "firstName" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>

            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("date", !sortFlag);
              }}
            >
              Date
              {sortFlag && sortFieldName === "date" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortFieldName === "date" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("type", !sortFlag);
              }}
            >
              Type
              {sortFlag && sortFieldName === "type" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortFieldName === "type" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("pickup", !sortFlag);
              }}
            >
              Pickup
              {sortFlag && sortFieldName === "pickup" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortFieldName === "pickup" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("delivery", !sortFlag);
              }}
            >
              Delivery
              {sortFlag && sortFieldName === "delivery" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortFieldName === "delivery" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        {!loading && allShuttleData.length !== 0 && <tbody>{renderShuttleListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        allShuttleData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
}

export default ShuttleInquiryBrowseListing;
