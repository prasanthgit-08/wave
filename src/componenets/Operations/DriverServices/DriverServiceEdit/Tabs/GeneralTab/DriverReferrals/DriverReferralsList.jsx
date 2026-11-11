import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetDriverReferrals,
  setDriverReferralsData,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../../../../redux/DriverReferralsSlice";
import DriverService from "../../../../../../../services/DriverService";
import { t } from "i18next";
const DriverReferralsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { driverId } = useParams();
  const [loading, setLoading] = useState(true);
  const [adSort] = useState(false);

  const driverReferralsData = useSelector((state) => state.driverReferralsReducer.driverReferralsData);
  const pageNumber = useSelector((state) => state.driverReferralsReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverReferralsReducer.totalPages);
  const totalElements = useSelector((state) => state.driverReferralsReducer.totalElements);
  let sortValue = useSelector((state) => state.driverReferralsReducer.sortValue);
  let sortType = useSelector((state) => state.driverReferralsReducer.sortType);
  const onHandleNormalSort = (value, val) => {
    dispatch(setSortValue(value));
    dispatch(setSortType(val));
    sortValue = value;
    sortType = val;
  };
  /**Api call to retrieve the list of Drivers and
   * corresponding data for  the selected driver from Backend */
  const fetchDriverReferralsData = () => {
    DriverService.getDriverReferrals(pageNumber, driverId, sortValue, sortType)
      .then((response) => {
        const { data } = response;
        dispatch(setDriverReferralsData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        setLoading(false);
      })

      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchDriverReferralsData();
    }, 100);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [pageNumber, driverId, sortValue, sortType]);

  useEffect(() => {
    dispatch(resetDriverReferrals());
  }, []);
  return (
    <div>
      <div className="fixTableHead border border-secondary" style={{ overflowY: "auto", height: "442px" }}>
        {loading && (
          <div className="fade modal-backdrop show">
            <div className="pos-center">
              <div className="loader"></div>
            </div>
          </div>
        )}
        <table className="table table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600 "
                onClick={() => {
                  if (adSort === false) {
                    onHandleNormalSort("driverName", !sortType);
                  }
                }}
              >
                Driver Name
                {sortType && sortValue === "driverName" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortType && sortValue === "driverName" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  if (adSort === false) {
                    onHandleNormalSort("units", !sortType);
                  }
                }}
              >
                Units
                {sortType && sortValue === "units" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortType && sortValue === "units" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  if (adSort === false) {
                    onHandleNormalSort("mtdUnits", !sortType);
                  }
                }}
              >
                MTD Units
                {sortType && sortValue === "mtdUnits" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortType && sortValue === "mtdUnits" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  if (adSort === false) {
                    onHandleNormalSort("lastMonthUnits", !sortType);
                  }
                }}
              >
                Last Month Units
                {sortType && sortValue === "lastMonthUnits" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortType && sortValue === "lastMonthUnits" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          {
            <tbody>
              {loading
                ? null
                : driverReferralsData.map((code) => (
                    <tr id="rowId">
                      <td className="f-w-600">{code.driverName}</td>
                      <td className="f-w-600">{code.units}</td>
                      <td className="f-w-600">{code.mtdUnits}</td>
                      <td className="f-w-600">{code.lastMonthUnits}</td>
                    </tr>
                  ))}
            </tbody>
          }
        </table>
        {loading
          ? ""
          : driverReferralsData.length === 0 && (
              <h2 className="empty-list" align="center">
                {t("AlternateContact.list.empty.message")}
              </h2>
            )}
      </div>
    </div>
  );
};

export default DriverReferralsList;
