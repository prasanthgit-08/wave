import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverGarnishmentsService from "../../../../../services/DriverGarnishmentsService";
import {
  setActive,
  setChangeColor,
  setDriverGarnishmentPK,
  setGarnishmentCity,
  setGarnishmentData,
  setGarnishmentDataById,
  setGarnishmentPostCode,
  setGarnishmentStateCode,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../../redux/DriverGarnishmentsSlice";
import { t } from "i18next";
import LoadingText from "../../../../common/LoadingText";
import LoadingIcon from "../../../../common/LoadingIcon";

const TableListing = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const driverGarnishmentId = params.driverGarnishmentId;
  const pageNumber = useSelector((state) => state.driverGarnishmentsReducer.pageNumber);
  const searchTerm = useSelector((state) => state.driverGarnishmentsReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.driverGarnishmentsReducer.searchCriteria);
  const garnishmentData = useSelector((state) => state.driverGarnishmentsReducer.garnishmentData);
  const normalSortValue = useSelector((state) => state.driverGarnishmentsReducer.normalSortValue);
  const normalSortFlag = useSelector((state) => state.driverGarnishmentsReducer.normalSortFlag);
  const changeColor = useSelector((state) => state.driverGarnishmentsReducer.changeColor);
  const selectedStatus = useSelector((state) => state.driverGarnishmentsReducer.selectedStatus);
  const driverGarnishmentPK = useSelector((state) => state.driverGarnishmentsReducer.driverGarnishmentPK);
  const sortValue = useSelector((state) => state.driverGarnishmentsReducer.normalSortValue);
  const sortFlag = useSelector((state) => state.driverGarnishmentsReducer.normalSortFlag);

  const fetchGarnishmentData = () => {
    setLoader(true);
    DriverGarnishmentsService.getGarnishmentData(
      searchTerm,
      searchCriteria,
      pageNumber,
      selectedStatus,
      sortFlag,
      sortValue,
      id
    )
      .then((response) => {
        const { data } = response;
        dispatch(setGarnishmentData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setActive(data.active));
      })
      .catch((err) => {})
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    setLoader(true);
    const debounceFunction = setTimeout(() => {
      fetchGarnishmentData();
    }, 500);
    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchCriteria, searchTerm, pageNumber, normalSortFlag, normalSortFlag, selectedStatus]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
  };

  return (
    <div className="fixTableHead">
      {loader && <LoadingIcon />}
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600 "
              onClick={() => {
                onhandleNormalSort("description", !normalSortFlag);
              }}
            >
              Description
              {normalSortFlag && normalSortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? ""
            : garnishmentData.map((garnishmentrecord) => (
                <tr
                  key={garnishmentrecord.driverGarnishmentPK}
                  onClick={() => {
                    dispatch(setChangeColor(false));
                  }}
                  onDoubleClick={() => {
                    dispatch(setGarnishmentDataById(null));
                    dispatch(setGarnishmentStateCode(""));
                    dispatch(setGarnishmentCity(""));
                    dispatch(setGarnishmentPostCode(""));
                    dispatch(setDriverGarnishmentPK(garnishmentrecord.driverGarnishmentPK));
                    dispatch(setViewDetail(true));
                    dispatch(setChangeColor(true));
                    navigate(
                      `/driver-garnishment/${id}/${garnishmentrecord.driverGarnishmentPK}/${pageNumber}`
                    );
                    dispatch(setDriverGarnishmentPK(garnishmentrecord.driverGarnishmentPK));
                  }}
                  className={
                    garnishmentrecord.driverGarnishmentPK === driverGarnishmentPK && changeColor
                      ? "tableSelected"
                      : ""
                  }
                >
                  <td>{garnishmentrecord.description?.trim()}</td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader ? (
        <LoadingText />
      ) : (
        garnishmentData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )
      )}
    </div>
  );
};

export default TableListing;
