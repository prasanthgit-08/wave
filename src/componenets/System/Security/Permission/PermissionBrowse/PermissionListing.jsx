/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setFormData,
  setViewDetail,
  setSortFlag,
  setSortValue,
  setListingData,
  setTotalElements,
  setTotalPages,
  setSelectedId,
  setIsUniqueDescription,
  setIsUniqueObjectKey,
} from "../../../../../redux/PermissionsMaintenanceSlice";
import PermissionsMaintenanceService from "../../../../../services/PermissionsMaintenanceService";
import AscendingIcon from "../../../../common/AscendingIcon";
import DescendingIcon from "../../../../common/DescendingIcon";
import LoadingIcon from "../../../../common/LoadingIcon";
import LoadingText from "../../../../common/LoadingText";

const PermissionListing = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listingData = useSelector((state) => state.permissionsMaintenance.listingData);
  const searchTerm = useSelector((state) => state.permissionsMaintenance.searchTerm);
  const searchCriteria = useSelector((state) => state.permissionsMaintenance.searchCriteria);
  const searchCriteria2 = useSelector((state) => state.permissionsMaintenance.searchCriteria2);
  const searchCriteria3 = useSelector((state) => state.permissionsMaintenance.searchCriteria3);
  const pageNumber = useSelector((state) => state.permissionsMaintenance.pageNumber);
  const advancedSearchPayload = useSelector((state) => state.permissionsMaintenance.advancedSearchPayload);
  const showAdvancedSort = useSelector((state) => state.permissionsMaintenance.showAdvancedSort);
  const advancedSortingOrder = useSelector((state) => state.permissionsMaintenance.advancedSortingOrder);
  const selectedId = useSelector((state) => state.permissionsMaintenance.selectedId);
  const sortFlag = useSelector((state) => state.permissionsMaintenance.sortFlag);
  const sortValue = useSelector((state) => state.permissionsMaintenance.sortValue);

  const onhandleNormalSort = (sortValue) => {
    dispatch(setSortValue(sortValue));
    dispatch(setSortFlag(!sortFlag));
  };

  const fetchTableData = () => {
    setLoading(true);
    PermissionsMaintenanceService.getAll(
      searchTerm,
      searchCriteria,
      searchCriteria2,
      searchCriteria3,
      pageNumber,
      sortValue,
      sortFlag,
      advancedSearchPayload,
      advancedSortingOrder
    )
      .then((response) => {
        const { data } = response;
        dispatch(setListingData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });

    // Set table listing as empty for leading whitespaces
    if (searchTerm && searchTerm?.trim() === "") {
      dispatch(setListingData([]));
      dispatch(setTotalElements(0));
      dispatch(setTotalPages(0));
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [
    searchTerm,
    searchCriteria,
    searchCriteria2,
    searchCriteria3,
    pageNumber,
    sortValue,
    sortFlag,
    advancedSearchPayload,
    advancedSortingOrder,
  ]);

  return (
    <div className="fixTableHead">
      <table className="table table-striped f-w-600">
        <thead>
          <tr disabled>
            <th className="f-w-600" onClick={() => onhandleNormalSort("description")}>
              Description
              {!showAdvancedSort && sortValue === "description" ? (
                sortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>

            <th className="f-w-600" onClick={() => onhandleNormalSort("objectKey")}>
              Object Key
              {!showAdvancedSort && sortValue === "objectKey" ? (
                sortFlag ? (
                  <AscendingIcon />
                ) : (
                  <DescendingIcon />
                )
              ) : null}
            </th>
            <th className="f-w-600" onClick={() => {}}>
              Enabled
            </th>
            <th className="f-w-600" onClick={() => {}}>
              Override
            </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? null
            : listingData?.length >= 1 &&
              listingData?.map((data) => (
                <tr
                  id="rowId"
                  key={data.permissionPK}
                  onClick={() => dispatch(setSelectedId(null))}
                  onDoubleClick={() => {
                    dispatch(setSelectedId(data.permissionPK));
                    dispatch(setViewDetail(true));
                    dispatch(setFormData(null));
                    dispatch(setIsUniqueDescription(true));
                    dispatch(setIsUniqueObjectKey(true));
                    setTimeout(() => {
                      navigate(`/permissions-maintenance/${data.permissionPK}`);
                    }, 100);
                  }}
                  className={data.permissionPK === selectedId ? "tableSelected" : ""}
                >
                  <td className="f-w-600"> {data.description} </td>
                  <td className="f-w-600"> {data.objectKey} </td>
                  <td className="f-w-600">
                    {" "}
                    {data?.enabled !== null ? (data?.enabled === true ? "Yes" : "No") : null}{" "}
                  </td>
                  <td className="f-w-600">
                    {" "}
                    {data?.override !== null ? (data?.override === true ? "Yes" : "No") : null}{" "}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {loading ? (
        <LoadingText />
      ) : (
        listingData?.length === 0 && (
          <h2 className="empty-list" align="center">
            No Records Available
          </h2>
        )
      )}
    </div>
  );
};

export default PermissionListing;
