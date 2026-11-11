import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingData,
  setSelectedId,
  setSelectedObject,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../redux/YardCheckinSecondShuttleSlice";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import LoadingIcon from "../../../../common/LoadingIcon";
import { useNavigate } from "react-router-dom";

const SecondShuttleListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.yardCheckinSecondShuttleReducer.listingData);
  const searchTerm = useSelector((state) => state.yardCheckinSecondShuttleReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.yardCheckinSecondShuttleReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.yardCheckinSecondShuttleReducer.pageNumber);
  const selectedId = useSelector((state) => state.yardCheckinSecondShuttleReducer.selectedId);
  const sortFlag = useSelector((state) => state.yardCheckinSecondShuttleReducer.sortFlag);
  const sortValue = useSelector((state) => state.yardCheckinSecondShuttleReducer.sortValue);
  const unitNumberPK = useSelector((state) => state.yardCheckinReducer.unitNumberPK);
  const selectedUnitCompanyName = useSelector((state) => state.yardCheckinReducer.selectedUnitCompanyName);
  const selectedDriverCompanyID = useSelector((state) => state.yardCheckinReducer.selectedDriverCompanyID);
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const selectedDriver = useSelector((state) => state.yardCheckinReducer.selectedDriver);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriver === "") {
      navigate("/yard-checkin-driver-selection");
    }
  }, [selectedDriver]);

  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(setSortFlag(!sortFlag));
  };

  const fetchSecondShuttleBrowseData = () => {
    YardCheckinService.getSecondShuttleBrowse(
      unitNumberPK,
      selectedUnitCompanyName,
      selectedDriverCompanyID,
      pageNumber,
      11,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data?.secondShuttleBrowse));
        dispatch(setTotalElements(data?.pagination[0]?.TotalElements));
        dispatch(setTotalPages(data?.pagination[0]?.TotalPages));
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchSecondShuttleBrowseData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerm, searchCriteria, pageNumber, sortValue, sortFlag]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600 col-4">Unit Number</th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                onhandleNormalSort("PickupLocation");
              }}
            >
              Pickup Location
              {sortFlag && sortValue === "PickupLocation" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "PickupLocation" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                onhandleNormalSort("DeliveryLocation");
              }}
            >
              Delivery Location
              {sortFlag && sortValue === "DeliveryLocation" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "DeliveryLocation" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data?.DispatchPK}
                  onClick={() => {
                    dispatch(setSelectedId(data?.DispatchPK));
                    dispatch(setSelectedObject(data));
                  }}

                  className={data?.DispatchPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data?.UnitNumber} </td>
                  <td className="f-w-600"> {data?.PickupLocation} </td>
                  <td className="f-w-600"> {data?.DeliveryLocation} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : listingData?.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
    </div>
  );
};

export default SecondShuttleListing;
