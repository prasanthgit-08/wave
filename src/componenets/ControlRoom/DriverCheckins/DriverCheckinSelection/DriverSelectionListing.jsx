import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NoRecordsMessage from "../../../common/NoRecordsMessage";
import {
  setSortType,
  setSortValue,
  setDriverId,
  setChangeColor,
  setDriverData1,
  setUnitData,
  setTotalElementsForUnit,
  setTotalPagesForUnit,
  setFormData,
  setUnitId,
  setDispatchId,
  setWithoutunit,
  setFirstName,
  setLastName,
  setCheckinAdv,
  setPageNumber,
  setCurrentLocationCity,
  setCurrentLocationStateCode,
  setInitialApiLoader,
  setUnitSelectionLoader,
  setCurrentLocationPostalCode,
  setSaveType,
  setAdvanceAmount,
  setPageNumberForUnitSelection,
} from "../../../../redux/DriverCheckinSlice";
import { useEffect } from "react";
import DriverCheckinService from "../../../../services/DriverCheckinService";
import { t } from "i18next";
import LoadingIcon from "../../../common/LoadingIcon";
import useDebouncer from "../../../../hooks/useDebouncer";
function DriverSelectionListing() {
  const [loader, setLoader] = useState(true);

  const driverData = useSelector((state) => state.driverCheckinReducer.driverData);

  const driverId = useSelector((state) => state.driverCheckinReducer.driverId);

  const sortValue = useSelector((state) => state.driverCheckinReducer.sortValue);
  const sortType = useSelector((state) => state.driverCheckinReducer.sortType);
  const changeColor = useSelector((state) => state.driverCheckinReducer.changeColor);
  const sortValueOfunit = useSelector((state) => state.driverCheckinReducer.sortValueOfunit);
  const sortType1 = useSelector((state) => state.driverCheckinReducer.sortType1);
  const companyName = useSelector((state) => state.driverCheckinReducer.companyName);
  const companyFK = useSelector((state) => state.driverCheckinReducer.companyFK);
  const sisterDispatchFK = useSelector((state) => state.driverCheckinReducer.sisterDispatchFK);
  const unitId = useSelector((state) => state.driverCheckinReducer.unitId);
  const [loading, setLoading] = useState(false);

  const unitSelectionLoader = useSelector((state) => state.driverCheckinReducer.unitSelectionLoader);

  const pageNumberForUnitSelection = useSelector(
    (state) => state.driverCheckinReducer.pageNumberForUnitSelection
  );
  const dispatch = useDispatch();

  const fetchUnitForDriver = () => {
    dispatch(setUnitSelectionLoader(true));
    setLoader(true);
    DriverCheckinService.fetchUnitSelectionData(
      pageNumberForUnitSelection,
      driverId,
      sortValueOfunit,
      sortType1,
      companyName,
      companyFK,
      sisterDispatchFK
    )
      .then((res) => {
        let unitData = res.data.content;
        dispatch(setUnitData(unitData));
        if (unitData.length === 1) {
          dispatch(setUnitId(unitData[0].unitPK));
          dispatch(setWithoutunit(true));
          fetchUnitDetails(unitData[0].unitPK, companyName, companyFK);
        }
        dispatch(setTotalElementsForUnit(res.data.totalElements));
        dispatch(setTotalPagesForUnit(res.data.totalPages));
        setLoader(false);
        dispatch(setUnitSelectionLoader(false));
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        dispatch(setUnitSelectionLoader(false));
      });
  };

  const fetchUnitDetails = (unitId, companyName, companyFK, driverId) => {
    dispatch(setInitialApiLoader(true));

    if (unitId && companyFK && companyName) {
      setLoading(true);
      DriverCheckinService.getRecord(unitId, companyName, companyFK)
        .then((res) => {
          dispatch(setFormData(res.data));
          dispatch(setDispatchId(res.data.dispatchId));
          dispatch(setInitialApiLoader(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setInitialApiLoader(false));
        })
        .finally(() => setLoading(false));
    } else {
      dispatch(setInitialApiLoader(false));
    }
  };

  const debouncerFetchUnitForDriver = useDebouncer(fetchUnitForDriver, 500);

  useEffect(() => {
    if (companyFK && companyName && driverId) debouncerFetchUnitForDriver();
  }, [driverId, companyFK, companyName]);

  useEffect(() => {
    dispatch(setUnitSelectionLoader(false));
    dispatch(setInitialApiLoader(false));
  }, []);

  return (
    <div className="fixTableHead border border-2 h-100">
      {loading && <LoadingIcon />}
      <table className="table table-striped mb-0 f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValue("firstName"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              First Name{" "}
              {sortValue === "firstName" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "firstName" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValue("lastName"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              Last Name{" "}
              {sortValue === "lastName" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "lastName" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValue("mailingCity"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              City
              {sortValue === "mailingCity" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "mailingCity" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600 col-4"
              onClick={() => {
                dispatch(setSortValue("mailingStateCode"));
                if (sortType) {
                  dispatch(setSortType(false));
                } else {
                  dispatch(setSortType(true));
                }
              }}
            >
              State
              {sortValue === "mailingStateCode" && sortType && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {sortValue === "mailingStateCode" && !sortType && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {unitSelectionLoader
            ? null
            : driverData?.length >= 1 &&
              driverData.map((data) => (
                <tr
                  id="rowId"
                  key={data.driverPK}
                  onClick={() => {
                    dispatch(setDriverId(data.driverPK));
                    dispatch(setFirstName(data.firstName));
                    dispatch(setLastName(data.lastName));
                    dispatch(setCheckinAdv(false));
                    dispatch(setChangeColor(true));
                    dispatch(setFormData(""));
                    dispatch(setCurrentLocationCity(""));
                    dispatch(setCurrentLocationStateCode(""));
                    dispatch(setCurrentLocationPostalCode(""));
                    dispatch(setSaveType(""));
                    dispatch(setPageNumberForUnitSelection(0));
                    if (data.driverPK) {
                      dispatch(setPageNumber(0));
                    }
                  }}
                  className={data.driverPK === driverId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{data.firstName}</td>
                  <td className="f-w-600">{data.lastName}</td>
                  <td className="f-w-600">{data.city}</td>
                  <td className="f-w-600">{data.state}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {unitSelectionLoader && (
        <div className="fade modal-backdrop show">
          <div className="pos-center">
            <div className="loader"></div>
          </div>
        </div>
      )}

      {!unitSelectionLoader && !loader && driverData?.length === 0 && (
        <h2 className="empty-list" align="center">
          {t("dealers.list.empty.message")}
        </h2>
      )}
    </div>
  );
}

export default DriverSelectionListing;
