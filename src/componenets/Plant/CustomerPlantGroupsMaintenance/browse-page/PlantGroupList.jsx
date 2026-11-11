import React, { useEffect, useState } from "react";

import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setChangeColor,
  setEditFormData,
  setId,
  setinitialList,
  setListingData,
  setPageNumber,
  setSelectedCustomer,
  setSortType,
  setSortValue,
  setTotalElements,
  setTotalPages,
  setViewDetail,
} from "../../../../redux/CustomerPlantGroupSlice";
import CustomerPlantGroupsService from "../../../../services/CustomerPlantGroupsService";
import LoadingText from "../../../common/LoadingText";
import PlantGroupMainPage from "./PlantGroupMainPage";
const PlantGroupList = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.customerPlantGroup.listingData);
  const pageNumber = useSelector((state) => state.customerPlantGroup.pageNumber);
  const id = useSelector((state) => state.customerPlantGroup.id);
  const changeColor = useSelector((state) => state.customerPlantGroup.changeColor);
  const searchTerm = useSelector((state) => state.customerPlantGroup.searchTerm);
  const searchCriteria = useSelector((state) => state.customerPlantGroup.searchCriteria);
  const sortType = useSelector((state) => state.customerPlantGroup.sortType);
  const sortValue = useSelector((state) => state.customerPlantGroup.sortValue);

  const fetchPlantGroupData = () => {
    setLoading(true);
    CustomerPlantGroupsService.getAllPlantGroups(searchCriteria, searchTerm, pageNumber, sortValue, sortType)
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        if (pageNumber >= data.totalPages && data.content.length === 0 && pageNumber !== 0) {
          dispatch(setPageNumber(Number(data.totalPages) - 1));
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchPlantGroupData();
    }, 500);
  }, [pageNumber, searchCriteria, searchTerm, sortValue, sortType]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortType());
                dispatch(setSortValue("description"));
              }}
            >
              {t("plantGroup.list.page.table.heading")}
              {sortType && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                dispatch(setSortType());
                dispatch(setSortValue("name"));
              }}
            >
              Customer
              {sortType && sortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortType && sortValue === "name" && <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>}
            </th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            listingData.length !== 0 &&
            listingData.map((record) => (
              <tr
                id="rowId"
                key={record.customerPlantGroupPK}
                onClick={() => dispatch(setChangeColor(false))}
                onDoubleClick={() => {
                  dispatch(setEditFormData(null));
                  dispatch(setId(record.customerPlantGroupPK));
                  dispatch(setChangeColor(true));
                  dispatch(setSelectedCustomer(record.customerfk.customerPK));
                  dispatch(setViewDetail(true));
                  dispatch(setinitialList([]));
                  setTimeout(() => {
                    navigate("/edit-plant-groups/" + record.customerPlantGroupPK + "/" + pageNumber);
                  }, 100);
                }}
                className={record.customerPlantGroupPK === id && changeColor ? "tableSelected" : ""}
              >
                <td className="f-w-600"> {record.description.toUpperCase()} </td>
                <td className="f-w-600"> {String(record.customerfk.name).toUpperCase()} </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!loading && listingData.length === 0 && (
        <h2 className="empty-list" align="center">
          No Records Available
        </h2>
      )}
      {loading && <LoadingText />}
      {/* {loading && <LoadingIcon />} */}
    </div>
  );
};

export default PlantGroupList;
