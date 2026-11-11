import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setAssignedEquipmentList,
  setDriverFK,
  setSearchTermForAdd,
  setSearchCriteriaForAdd,
  setSortFlag1,
  setSortValue1,
} from "../../../../redux/DriverEquipmentSlice";
import EquipmentService from "../../../../services/EquipmentService";
import LoadingIcon from "../../../common/LoadingIcon";

const AssignedEquipmentListing = ({ loading, setLoading }) => {
  const params = useParams();
  const driverId = params.driverId;

  const currentURL = window.location.pathname;

  const listingData = useSelector((state) => state.driverEquipmentReducer.listingData);
  const searchTerms = useSelector((state) => state.driverEquipmentReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.driverEquipmentReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.driverEquipmentReducer.pageNumber);
  const selectedId = useSelector((state) => state.driverEquipmentReducer.selectedId);
  const changeColor = useSelector((state) => state.driverEquipmentReducer.changeColor);
  const selectedStatus = useSelector((state) => state.driverEquipmentReducer.selectedStatus);
  const assignedEquipmentList = useSelector((state) => state.driverEquipmentReducer.assignedEquipmentList);
  const driverFK = useSelector((state) => state.driverEquipmentReducer.driverFK);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sortFlag = useSelector((state) => state.driverEquipmentReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.driverEquipmentReducer.normalSortValue);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;

    fetchTableDataForAssignedEquipment();
  };

  const fetchTableDataForAssignedEquipment = () => {
    setLoading(true);
    EquipmentService.getAssignedEquipmentData(
      searchTerms,
      searchCriteria,
      pageNumber,
      selectedStatus,
      sortValue,
      sortFlag,
      driverId
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setAssignedEquipmentList(data.content));

        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableDataForAssignedEquipment();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [searchTerms, searchCriteria, pageNumber, driverFK]);
  useEffect(() => {
    dispatch(setDriverFK(driverId));
  }, [driverId]);

  useEffect(() => {
    dispatch(setSortFlag1(false));
    dispatch(setSortValue1(null));
  }, []);
  useEffect(() => {
    if (currentURL === `assigned-equipment/${driverFK}`) {
      dispatch(setSearchTermForAdd(""));
      dispatch(setSearchCriteriaForAdd("Beginning"));
    }
  }, [currentURL]);

  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}

      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("equipmentNumber", !sortFlag);
              }}
            >
              Number
              {sortFlag && sortValue === "equipmentNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "equipmentNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag);
              }}
            >
              Description{" "}
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("serialNumber", !sortFlag);
              }}
            >
              Serial Number{" "}
              {sortFlag && sortValue === "serialNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "serialNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? ""
            : assignedEquipmentList.length >= 1 &&
              assignedEquipmentList.map((data) => (
                <tr
                  id="rowId"
                  key={data.equipmentPK}
                  onClick={() => dispatch(setChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.equipmentPK));
                    dispatch(setChangeColor(true));
                    dispatch(setDriverFK(data.driverFK));
                    setTimeout(() => {
                      navigate(`/view-driver-equipment/${driverFK}/${data.equipmentPK}`);
                    }, 100);
                  }}
                  className={data.equipmentPK === selectedId && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.equipmentNumber} </td>
                  <td className="f-w-600"> {data.description} </td>
                  <td className="f-w-600"> {data.serialNumber} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loading
        ? ""
        : assignedEquipmentList.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("dealers.list.empty.message")}
            </h2>
          )}
    </div>
  );
};

export default AssignedEquipmentListing;
