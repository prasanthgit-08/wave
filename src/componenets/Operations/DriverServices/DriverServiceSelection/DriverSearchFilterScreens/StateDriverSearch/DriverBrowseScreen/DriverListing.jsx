import { useDispatch, useSelector } from "react-redux";
import DriverSearchService from "../../../../../../../services/DriverSearchService";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { PaginationComponent } from "../../../../../../common/PaginationComponent";
import {
  setChangeColor,
  setPageNumber,
  setSelectedDriverId,
  setSortFlag,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../../../redux/DealerDriverSearchSlice";

const DriverListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedDivison = useSelector((state) => state.dealerDriverSearchSlice.selectedDivison);
  const driverCDL = useSelector((state) => state.dealerDriverSearchSlice.driverCDL);
  const dispatcherId = useSelector((state) => state.dealerDriverSearchSlice.dispatcherId);
  const states = useSelector((state) => state.dealerDriverSearchSlice.states);
  const twicOnly = useSelector((state) => state.dealerDriverSearchSlice.twicOnly);
  const truckType = useSelector((state) => state.dealerDriverSearchSlice.truckType);
  const canadianOnly = useSelector((state) => state.dealerDriverSearchSlice.canadianOnly);
  const truckCodeId = useSelector((state) => state.dealerDriverSearchSlice.truckCodeId);
  const eldOnly = useSelector((state) => state.dealerDriverSearchSlice.eldOnly);
  const hasPintalHook = useSelector((state) => state.dealerDriverSearchSlice.hasPintalHook);
  const transportation = useSelector((state) => state.dealerDriverSearchSlice.transportation);
  const busQualified = useSelector((state) => state.dealerDriverSearchSlice.busQualified);
  const tractorQualified = useSelector((state) => state.dealerDriverSearchSlice.tractorQualified);
  const tenorMore38 = useSelector((state) => state.dealerDriverSearchSlice.tenorMore38);
  const hitchTowBar = useSelector((state) => state.dealerDriverSearchSlice.hitchTowBar);
  const pageNumber = useSelector((state) => state.dealerDriverSearchSlice.pageNumber);
  const totalPages = useSelector((state) => state.dealerDriverSearchSlice.totalPages);
  const totalElements = useSelector((state) => state.dealerDriverSearchSlice.totalElements);
  const selectedDriverId = useSelector((state) => state.dealerDriverSearchSlice.selectedDriverId);
  const changeColor = useSelector((state) => state.dealerDriverSearchSlice.changeColor);
  const sortFlag = useSelector((state) => state.dealerDriverSearchSlice.sortFlag);
  const sortValue = useSelector((state) => state.dealerDriverSearchSlice.sortValue);
  const searchBy = useSelector((state) => state.dealerDriverSearchSlice.searchBy);

  const [driverList, setDriverList] = useState([]);
  const [loadng, setLoadng] = useState(false);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driverList,
  };

  const lisDriver = () => {
    setLoadng(true);
    DriverSearchService.fetchDriver(
      selectedDivison,
      pageNumber,
      19,
      driverCDL,
      dispatcherId,
      null,
      states,
      null,
      twicOnly,
      canadianOnly,
      truckCodeId,
      eldOnly,
      hasPintalHook,
      truckType,
      transportation,
      busQualified,
      tractorQualified,
      tenorMore38,
      hitchTowBar,
      sortValue,
      sortFlag,
      0,
      searchBy
    )
      .then(({ data }) => {
        const browseData = data?.slice(0, data?.length - 1);
        setDriverList(browseData || []);
        const paginationData = data.slice(data.length - 1);
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        setLoadng(false);
      })
      .catch(() => {
        setLoadng(false);
      });
  };

  const onhandleNormalSort = (value, flag) => {
    dispatch(setSortFlag(flag));
    dispatch(setSortValue(value));
  };

  useEffect(() => {
    if (!states) {
      navigate("/state-driver-search/initial");
    }
  }, []);

  useEffect(() => {
    lisDriver();
  }, [sortFlag, sortValue, pageNumber]);

  return (
    <div className="p-0">
      <div className="shadow-sm add-form-component rounded  ">
        <div className="d-flex col-12 ">
          <div className="threeFourthScreenFormContentHeight flex-grow-1" style={{ height: "705px" }}>
            <div className="fixTableHead h-100">
              <table className="table table-striped f-w-600">
                <thead>
                  <tr disabled>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("driver", !sortFlag);
                      }}
                    >
                      Driver
                      {sortFlag && sortValue === "driver" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "driver" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("cellphone", !sortFlag);
                      }}
                    >
                      Cell Phone
                      {sortFlag && sortValue === "cellphone" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "cellphone" && (
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
                      {sortFlag && sortValue === "pickup" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "pickup" && (
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
                      {sortFlag && sortValue === "delivery" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "delivery" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                    <th
                      className="f-w-600"
                      onClick={() => {
                        onhandleNormalSort("eta", !sortFlag);
                      }}
                    >
                      ETA
                      {sortFlag && sortValue === "eta" && (
                        <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                      )}
                      {!sortFlag && sortValue === "eta" && (
                        <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {driverList.map((driverSearchData) => (
                    <tr
                      id="rowId"
                      key={driverSearchData.DriverFK}
                      onClick={(e) => {
                        dispatch(setSelectedDriverId(null));
                        dispatch(setChangeColor(false));
                      }}
                      onDoubleClick={() => {
                        dispatch(setChangeColor(true));
                        dispatch(setSelectedDriverId(driverSearchData.DriverFK));
                      }}
                      className={
                        selectedDriverId == driverSearchData.DriverFK && changeColor ? "tableSelected" : " "
                      }
                    >
                      <td className="f-w-600"> {driverSearchData.Driver} </td>
                      <td className="f-w-600"> {driverSearchData.Cell} </td>
                      <td className="f-w-600"> {driverSearchData.Pickup} </td>
                      <td className="f-w-600"> {driverSearchData.Delivery} </td>
                      <td className="f-w-600">
                        {" "}
                        {driverSearchData.ETA ? moment(driverSearchData.ETA).format("MM/DD/YY") : ""}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loadng && driverList.length === 0 && (
                <h2 className="empty-list" align="center">
                  No Records Available
                </h2>
              )}
              {loadng && (
                <div className="fade modal-backdrop show">
                  <div className="pos-center">
                    <div className="loader"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <PaginationComponent
            {...paginationProps}
            recordsPerPage={3}
            firstPage
            lastPage
            singleArrowUp
            singleArrowDown
            doubleArrowDown
            doubleArrowUp
            hideBorderRight
            hideBorderTop
            hideBorderBottom
          />
        </div>
      </div>
    </div>
  );
};

export default DriverListing;
