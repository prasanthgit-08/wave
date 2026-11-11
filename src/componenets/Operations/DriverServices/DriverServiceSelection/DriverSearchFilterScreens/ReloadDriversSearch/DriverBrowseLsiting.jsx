import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setDriverData,
  setDriverId,
  setChangeColorofdriver,
  setTotalElementsOfDriver,
  setTotalPagesOfDriver,
  setSortType1,
  setSortValue1,
} from "../../../../../../redux/DriverSearchFilterSlice";
import DriverService from "../../../../../../services/DriverService";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { t } from "i18next";
import LoadingIcon from "../../../../../common/LoadingIcon";

function DriverBrowseLsiting() {
  // const { id ,pageNumberOfDriver} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);

  const searchCriteria = useSelector((state) => state.driverSearchFilter.searchCriteria);
  const searchTerm = useSelector((state) => state.driverSearchFilter.searchTerm);
  const pageSize = useSelector((state) => state.driverSearchFilter.pageSize);
  const sortValue1 = useSelector((state) => state.driverSearchFilter.sortValue1);
  const selectedCustomerId = useSelector((state) => state.driverSearchFilter.selectedCustomerId);
  const totalElements = useSelector((state) => state.driverSearchFilter.totalElements);
  const miles = useSelector((state) => state.driverSearchFilter.miles);
  const unitId = useSelector((state) => state.driverSearchFilter.unitId);

  const sortType1 = useSelector((state) => state.driverSearchFilter.sortType1);
  const driverData = useSelector((state) => state.driverSearchFilter.driverData);
  const [customerPKList, setCustomerPKList] = useState([]);
  const [driveAway, setDriveaway] = useState(false);
  const [towable, setTowable] = useState(false);
  const [flatbed, setFlatbed] = useState(false);
  const divisionStatus = useSelector((state) => state.driverSearchFilter.divisionStatus);
  const driverCdlStatus = useSelector((state) => state.driverSearchFilter.driverCdlStatus);
  const changeColor = useSelector((state) => state.driverSearchFilter.changeColor);
  const listOfSelectedStates = useSelector((state) => state.driverSearchFilter.listOfSelectedStates);
  const driverId = useSelector((state) => state.driverSearchFilter.driverId);
  const changeColorofdriver = useSelector((state) => state.driverSearchFilter.changeColorofdriver);
  const pageNumberOfDriver = useSelector((state) => state.driverSearchFilter.pageNumberOfDriver);
  const dispatchPK = useSelector((state) => state.driverSearchFilter.dispatchPK);

  const fetchUnitBasedOntheReloadSearch = async () => {
    setLoader(true);
    try {
      const response = await DriverService.driverFetch(
        searchCriteria,
        searchTerm,
        pageNumberOfDriver,
        pageSize,
        divisionStatus,
        driverCdlStatus,
        listOfSelectedStates,
        sortValue1,
        sortType1,
        selectedCustomerId,
        miles,
        dispatchPK
      );

      const data = response.data;

      setLoader(false);

      if (data) {
        const filteredList = data.filter((item) => item?.Type !== "Pagination");
        dispatch(setDriverData(filteredList));

        const paginationData = data.find((item) => item?.Type === "Pagination");

        if (paginationData) {
          dispatch(setTotalElementsOfDriver(paginationData.TotalElements));
          dispatch(setTotalPagesOfDriver(paginationData.TotalPages));
        } else {
          console.error("Pagination data not found in API response:", response);
        }
      }
    } catch (err) {
      console.error("Error in fetchUnitBasedOntheReloadSearch:", err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUnitBasedOntheReloadSearch();
  }, [
    pageNumberOfDriver,
    divisionStatus,
    driverCdlStatus,
    listOfSelectedStates,
    sortValue1,
    sortType1,
    pageSize,
    unitId,
    miles,
  ]);

  return (
    <div className="fixTableHead ">
      <div>
        <div
          className={`border border-dark border-2  border-top-0 border-bottom-0 border-right-0`}
          style={{ height: "700px" }}
        >
          <table className="table table-striped f-w-600 ">
            <thead>
              <tr disabled>
                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue1("driverName"));
                    if (sortType1) {
                      dispatch(setSortType1(false));
                    } else {
                      dispatch(setSortType1(true));
                    }
                  }}
                >
                  Driver{" "}
                  {sortValue1 === "driverName" && sortType1 && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue1 === "driverName" && !sortType1 && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue1("cellPhone"));
                    if (sortType1) {
                      dispatch(setSortType1(false));
                    } else {
                      dispatch(setSortType1(true));
                    }
                  }}
                >
                  Cell Phone{" "}
                  {sortValue1 === "cellPhone" && sortType1 && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue1 === "cellPhone" && !sortType1 && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue1("pickuplocation"));
                    if (sortType1) {
                      dispatch(setSortType1(false));
                    } else {
                      dispatch(setSortType1(true));
                    }
                  }}
                >
                  Pickup{" "}
                  {sortValue1 === "pickuplocation" && sortType1 && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue1 === "pickuplocation" && !sortType1 && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue1("deliverylocation"));
                    if (sortType1) {
                      dispatch(setSortType1(false));
                    } else {
                      dispatch(setSortType1(true));
                    }
                  }}
                >
                  Delivery{" "}
                  {sortValue1 === "deliverylocation" && sortType1 && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue1 === "deliverylocation" && !sortType1 && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue1("eta"));
                    if (sortType1) {
                      dispatch(setSortType1(false));
                    } else {
                      dispatch(setSortType1(true));
                    }
                  }}
                >
                  ETA{" "}
                  {sortValue1 === "eta" && sortType1 && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue1 === "eta" && !sortType1 && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {loader
                ? ""
                : driverData.length >= 1 &&
                  driverData.map((data) => (
                    <tr
                      id="rowId"

                      onClick={() => {
                        dispatch(setDriverId(data.DriverFK));
                        dispatch(setChangeColorofdriver(true));
                      }}
                      className={data.DriverFK === driverId && changeColorofdriver ? "tableSelected" : ""}
                    >
                      <td className="f-w-600"> {data.Driver} </td>
                      <td className="f-w-600"> {data.Cell}</td>
                      <td className="f-w-600"> {data.PickUp} </td>
                      <td className="f-w-600"> {data.Delivery} </td>
                      <td>{data?.ETA ? moment(data.ETA).format("MM/DD/YY") : ""}</td>
                    </tr>
                  ))}
            </tbody>
          </table>

          {!loader && driverData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
          {loader && <LoadingIcon />}
        </div>
      </div>
    </div>
  );
}

export default DriverBrowseLsiting;
