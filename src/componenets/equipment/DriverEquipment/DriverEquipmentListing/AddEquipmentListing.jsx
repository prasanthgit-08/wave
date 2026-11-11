import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setListingData,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setAssignedEquipmentList,
  setDriverFK,
  setAddEquipmentChangeColor,
  setSortFlag1,
  setSortValue1,
  setTotalElementsForAdd,
  setTotalPagesForAdd,
} from "../../../../redux/DriverEquipmentSlice";
import EquipmentService from "../../../../services/EquipmentService";
import LoadingIcon from "../../../common/LoadingIcon";

const AddEquipmentListing = ({ loading, setLoading }) => {
  const params = useParams();
  const driverId = params.driverId;
  const listingData = useSelector((state) => state.driverEquipmentReducer.listingData);
  const searchTermsForAdd = useSelector((state) => state.driverEquipmentReducer.searchTermsForAdd);
  const searchCriteriaForAdd = useSelector((state) => state.driverEquipmentReducer.searchCriteriaForAdd);
  const pageNumberforAdd = useSelector((state) => state.driverEquipmentReducer.pageNumberforAdd);
  const selectedId = useSelector((state) => state.driverEquipmentReducer.selectedId);
  const selectedStatus = useSelector((state) => state.driverEquipmentReducer.selectedStatus);
  const driverFK = useSelector((state) => state.driverEquipmentReducer.driverFK);
  const addEquipmentChangeColor = useSelector(
    (state) => state.driverEquipmentReducer.addEquipmentChangeColor
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let sortFlag1 = useSelector((state) => state.driverEquipmentReducer.sortFlag1);

  let sortValue1 = useSelector((state) => state.driverEquipmentReducer.sortValue1);
  const onhandleNormalSort = (value, val) => {
    dispatch(setSortValue1(value));

    dispatch(setSortFlag1(val));

    sortValue1 = value;

    sortFlag1 = val;

    fetchTableDataForAssignedEquipment();
  };

  const fetchTableDataForAssignedEquipment = () => {
    setLoading(true);

    EquipmentService.getAddEquipmentData(
      searchTermsForAdd,
      searchCriteriaForAdd,
      pageNumberforAdd,
      selectedStatus,
      sortValue1,
      sortFlag1,
      driverId
    )
      .then((response) => {
        const { data } = response;
        setLoading(false);
        dispatch(setListingData(data.content));
        dispatch(setTotalElementsForAdd(data.totalElements));
        dispatch(setTotalPagesForAdd(data.totalPages));
      })
      .catch((error) => {
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
  }, [searchTermsForAdd, searchCriteriaForAdd, pageNumberforAdd]);

  useEffect(() => {
    dispatch(setDriverFK(driverId));
  }, [dispatch, driverId]);
  return (
    <div className="fixTableHead">
      {loading && <LoadingIcon />}

      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("equipmentNumber", !sortFlag1);
              }}
            >
              Number
              {sortFlag1 && sortValue1 === "equipmentNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag1 && sortValue1 === "equipmentNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("description", !sortFlag1);
              }}
            >
              Description{" "}
              {sortFlag1 && sortValue1 === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag1 && sortValue1 === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("serialNumber", !sortFlag1);
              }}
            >
              Serial Number{" "}
              {sortFlag1 && sortValue1 === "serialNumber" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag1 && sortValue1 === "serialNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? ""
            : listingData.length >= 1 &&
              listingData.map((data) => (
                <tr
                  id="rowId"
                  key={data.equipmentPK}
                  onClick={() => dispatch(setAddEquipmentChangeColor(false))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.equipmentPK));
                    dispatch(setAddEquipmentChangeColor(true));
                    dispatch(setDriverFK(data.driverFK));

                    setTimeout(() => {
                      navigate(`/add-driver-equipment-content/${driverFK}/${data.equipmentPK}`);
                    }, 100);
                  }}

                  className={
                    data.equipmentPK === selectedId && addEquipmentChangeColor ? "tableSelected" : ""
                  }
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
        : listingData.length === 0 && (
            <h2 className="empty-list" align="center">
              {t("dealers.list.empty.message")}
            </h2>
          )}
    </div>
  );
};

export default AddEquipmentListing;
