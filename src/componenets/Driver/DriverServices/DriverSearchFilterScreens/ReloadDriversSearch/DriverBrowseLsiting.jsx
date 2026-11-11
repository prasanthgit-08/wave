import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setChangeColor,
  setSelectedCustomerId,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setDriverData,
  setUnitId,
} from "../../../../../redux/DriverSearchFilterSlice";
import DriverService from "../../../../../services/DriverService";
import Footer from "../Footer";
import Header from "../Header";
import { useNavigate, useParams } from "react-router-dom";

function DriverBrowseLsiting() {
  const { id, pageNumber } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const searchCriteria = useSelector((state) => state.driverSearchFilter.searchCriteria);
  const searchTerm = useSelector((state) => state.driverSearchFilter.searchTerm);
  const pageSize = useSelector((state) => state.driverSearchFilter.pageSize);
  const sortValue = useSelector((state) => state.driverSearchFilter.sortValue);
  const selectedCustomerId = useSelector((state) => state.driverSearchFilter.selectedCustomerId);
  const totalElements = useSelector((state) => state.driverSearchFilter.totalElements);
  const miles = useSelector((state) => state.driverSearchFilter.miles);
  const unitId = useSelector((state) => state.driverSearchFilter.unitId);

  const sortType = useSelector((state) => state.driverSearchFilter.sortType);
  const driverData = useSelector((state) => state.driverSearchFilter.driverData);
  const [customerPKList, setCustomerPKList] = useState([]);
  const [driveAway, setDriveaway] = useState(false);
  const [towable, setTowable] = useState(false);
  const [flatbed, setFlatbed] = useState(false);
  const divisionStatus = useSelector((state) => state.driverSearchFilter.divisionStatus);
  const driverCdlStatus = useSelector((state) => state.driverSearchFilter.driverCdlStatus);
  const changeColor = useSelector((state) => state.driverSearchFilter.changeColor);
  const listOfSelectedStates = useSelector((state) => state.driverSearchFilter.listOfSelectedStates);

  // const [listOfSelectedStates, setListOfSelectedStates] = useState([])

  const fetchDriversBasedOntheReloadSearch = async () => {
    try {
      const response = await DriverService.fetchDriversBasedOntheReloadSearch(
        searchTerm,
        searchCriteria,
        pageNumber,
        divisionStatus,
        driverCdlStatus,
        listOfSelectedStates,
        sortValue,
        sortType,
        pageSize,
        unitId,
        miles
      );
      const data = response.data;
      setLoader(false);
      dispatch(setDriverData(data.content));
      dispatch(setTotalElements(data.totalElements));
      dispatch(setTotalPages(data.totalPages));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchDriversBasedOntheReloadSearch();
    };
    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    pageNumber,
    divisionStatus,
    driverCdlStatus,
    listOfSelectedStates,
    sortValue,
    sortType,
    pageSize,
    unitId,
    miles,
  ]);

  return (
    <div className="fixTableHead">
      <Header />
      <div>
        <div className={`border border-dark border-2`} style={{ height: "700px" }}>
          <table className="table table-striped f-w-600">
            <thead>
              <tr disabled>
                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("driverName"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Driver{" "}
                  {sortValue === "driverName" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "driverName" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("cellPhone"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Cell Phone{" "}
                  {sortValue === "cellPhone" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "cellPhone" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("pickupLocation"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Pickup{" "}
                  {sortValue === "pickupLocation" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "pickupLocation" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("deliveryLocation"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Delivery{" "}
                  {sortValue === "deliveryLocation" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "deliveryLocation" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("eta"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  ETA{" "}
                  {sortValue === "eta" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "eta" && !sortType && (
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
                    <tr id="rowId">
                      <td className="f-w-600"> {data.driverName} </td>
                      <td className="f-w-600"> {data.cellPhone}</td>
                      <td className="f-w-600"> {data.pickuplocation} </td>
                      <td className="f-w-600"> {data.deliverylocation} </td>
                      <td className="f-w-600"> {data.eta} </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DriverBrowseLsiting;
