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
  setUnitData,
  setUnitId,
  setPageNumber,
  setSortValue1,
  setSortType1,
  setDispatchPK,
} from "../../../../../../redux/DriverSearchFilterSlice";
import DriverService from "../../../../../../services/DriverService";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../../services/constants/applicationConstants";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import { t } from "i18next";
import LoadingIcon from "../../../../../common/LoadingIcon";

function UnitBrowseListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loadings, setLoadings] = useState(true);

  const searchCriteria = useSelector((state) => state.driverSearchFilter.searchCriteria);
  const searchTerm = useSelector((state) => state.driverSearchFilter.searchTerm);
  const pageNumber = useSelector((state) => state.driverSearchFilter.pageNumber);
  const pageSize = useSelector((state) => state.driverSearchFilter.pageSize);
  const sortValue = useSelector((state) => state.driverSearchFilter.sortValue);
  const selectedCustomerId = useSelector((state) => state.driverSearchFilter.selectedCustomerId);
  const totalElements = useSelector((state) => state.driverSearchFilter.totalElements);

  const sortType = useSelector((state) => state.driverSearchFilter.sortType);
  const unitData = useSelector((state) => state.driverSearchFilter.unitData);
  const [customerPKList, setCustomerPKList] = useState([]);
  const [driveAway, setDriveaway] = useState(false);
  const [towable, setTowable] = useState(false);
  const [flatbed, setFlatbed] = useState(false);
  const divisionStatus = useSelector((state) => state.driverSearchFilter.divisionStatus);
  const driverCdlStatus = useSelector((state) => state.driverSearchFilter.driverCdlStatus);
  const unitId = useSelector((state) => state.driverSearchFilter.unitId);
  const changeColor = useSelector((state) => state.driverSearchFilter.changeColor);
  const listOfSelectedStates = useSelector((state) => state.driverSearchFilter.listOfSelectedStates);
  const totalPages = useSelector((state) => state.driverSearchFilter.totalPages);
  const miles = useSelector((state) => state.driverSearchFilter.miles);

  const fetchUnitBasedOntheReloadSearch = async () => {
    setLoadings(true);
    try {
      dispatch(setDispatchPK(null));
      const response = await DriverService.fetchUnitBasedOntheReloadSearch(
        searchCriteria,
        searchTerm,
        pageNumber,
        pageSize,
        divisionStatus,
        driverCdlStatus,
        listOfSelectedStates,
        sortValue,
        sortType,
        selectedCustomerId,
        miles
      );

      const data = response.data;

      if (data) {
        const filteredList = data.filter((item) => item?.Type !== "Pagination");
        dispatch(setUnitData(filteredList));

        const paginationData = data.find((item) => item?.Type === "Pagination");

        if (paginationData) {
          dispatch(setTotalElements(paginationData.TotalElements));
          dispatch(setTotalPages(paginationData.TotalPages));
        } else {
          console.error("Pagination data not found in API response:", response);
        }
      }
    } catch (err) {
      console.error("Error in fetchUnitBasedOntheReloadSearch:", err);
    } finally {
      setLoadings(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchUnitBasedOntheReloadSearch();
    };

    const debounceFunction = setTimeout(() => {
      fetchData();
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    pageNumber,
    sortValue,
    sortType,
    divisionStatus,
    driverCdlStatus,
    selectedCustomerId,
    listOfSelectedStates,
    selectedCustomerId,
  ]);

  useEffect(() => {
    dispatch(setSortValue(""));
    dispatch(setSortType(0));
    dispatch(setSortValue1(""));
    dispatch(setSortType1(0));
  }, []);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages: 12,
    totalElements: 12,
    listingData: unitData,
  };
  return (
    <div className="fixTableHead">
      <div>
        <div
          className={`border border-dark border-2  border-top-0 border-bottom-0 border-right-0`}
          style={{ height: "700px" }}
        >
          <table className="table table-striped f-w-600">
            <thead>
              <tr disabled>
                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("unitNumber"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Unit Number{" "}
                  {sortValue === "unitNumber" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "unitNumber" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("PickUp"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Pickup{" "}
                  {sortValue === "PickUp" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "PickUp" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("Delivery"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Delivery{" "}
                  {sortValue === "Delivery" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "Delivery" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("UnitType"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Unit Type{" "}
                  {sortValue === "UnitType" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "UnitType" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("Special"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Special{" "}
                  {sortValue === "Special" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "Special" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>

                <th
                  className="f-w-600"
                  onClick={() => {
                    dispatch(setSortValue("Customer"));
                    if (sortType) {
                      dispatch(setSortType(false));
                    } else {
                      dispatch(setSortType(true));
                    }
                  }}
                >
                  Customer Name{" "}
                  {sortValue === "Customer" && sortType && (
                    <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                  )}
                  {sortValue === "Customer" && !sortType && (
                    <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {loadings
                ? ""
                : unitData.length >= 1 &&
                  unitData.map((data) => (
                    <tr
                      id="rowId"
                      key={data.UnitFK}
                      onClick={() => {
                        dispatch(setUnitId(data.UnitFK || data.SisterUnitFK));
                        dispatch(setChangeColor(true));
                        dispatch(setDispatchPK(data?.DispatchPK));
                      }}
                      onDoubleClick={() => {}}
                      className={
                        (data.UnitFK || data.SisterUnitFK) === unitId && changeColor ? "tableSelected" : ""
                      }
                    >
                      <td className="f-w-600"> {data.UnitNumber} </td>
                      <td className="f-w-600"> {data.PickUp}</td>
                      <td className="f-w-600"> {data.Delivery} </td>
                      <td className="f-w-600"> {data.UnitType} </td>
                      <td className="f-w-600"> {data.Special} </td>

                      <td className="f-w-600"> {data.Customer} </td>
                    </tr>
                  ))}
            </tbody>
          </table>

          {!loadings && unitData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
          {loadings && <LoadingIcon />}
        </div>
      </div>
    </div>
  );
}

export default UnitBrowseListing;
