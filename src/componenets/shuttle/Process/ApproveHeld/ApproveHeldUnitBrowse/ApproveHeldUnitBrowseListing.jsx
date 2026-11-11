import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setApproveHeldUnitData,
  setIsSisterUnit,
  setInnerSortFlag,
  setInnerSortValue,
  setSelectedId,
  setUnitTotalElements,
  setUnitTotalPages,
} from "../../../../../redux/ApproveHeldSlice";
import ApproveHeldService from "../../../../../services/ApproveHeldService";
import { t } from "i18next";
import LoadingIcon from "../../../../common/LoadingIcon";
import { useParams } from "react-router-dom";

const ApproveHeldUnitBrowseListing = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [browseLoading, setBrowseLoading] = useState(false);

  const selectedId = useSelector((state) => state.approveHeldShuttleReducer.selectedId);
  const editFormData = useSelector((state) => state.approveHeldShuttleReducer.editFormData);
  const unitPageNumber = useSelector((state) => state.approveHeldShuttleReducer.unitPageNumber);
  const searchCriteria = useSelector((state) => state.approveHeldShuttleReducer.searchCriteria);
  const approveHeldUnitData = useSelector((state) => state.approveHeldShuttleReducer.approveHeldUnitData);
  let sortValue = useSelector((state) => state.approveHeldShuttleReducer.innerSortValue);
  let sortFlag = useSelector((state) => state.approveHeldShuttleReducer.innerSortFlag);

  const fetchApproveHeldUnitList = (selectedUnit) => {
    setBrowseLoading(true);
    if (selectedUnit) {
      ApproveHeldService.getAllShuttleForSelectedUnit(
        unitPageNumber,
        sortValue,
        sortFlag,
        selectedUnit,
        !editFormData.sisterUnitFK ? false : true,
        id
      )
        .then((response) => {
          const { data } = response;
          const paginationInfo = data[data?.length - 1];
          dispatch(setApproveHeldUnitData(data?.slice(0, -1)));
          dispatch(setUnitTotalElements(paginationInfo?.TotalElements));
          dispatch(setUnitTotalPages(paginationInfo?.TotalPages));
          setBrowseLoading(false);
        })
        .catch((err) => {
          setBrowseLoading(false);
        });
    }
  };
  useEffect(() => {
    if (editFormData?.sisterUnitFK == null) {
      setSelectedUnit(editFormData?.unitId);
      setIsSisterUnit(false);
    } else {
      setSelectedUnit(editFormData?.sisterUnitFK);
      setIsSisterUnit(true);
    }
  }, []);

  useEffect(() => {
    fetchApproveHeldUnitList(selectedUnit);
  }, [searchCriteria, unitPageNumber, sortValue, sortFlag, selectedUnit]);

  const onhandleNormalSort = (value, val) => {
    dispatch(setInnerSortValue(value));
    dispatch(setInnerSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  return (
    <div>
      <div className="fixTableHead">
        {browseLoading && <LoadingIcon />}
        <table className="table  table-striped f-w-600">
          <thead>
            <tr disabled>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("firstName", !sortFlag);
                }}
              >
                Driver
                {sortFlag && sortValue === "firstName" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "firstName" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>

              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("pickup", !sortFlag);
                }}
              >
                Pickup
                {sortFlag && sortValue === "pickup" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "pickup" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
              <th
                className="f-w-600"
                onClick={() => {
                  onhandleNormalSort("delivery", !sortFlag);
                }}
              >
                Delivery
                {sortFlag && sortValue === "delivery" && (
                  <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
                )}
                {!sortFlag && sortValue === "delivery" && (
                  <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {!browseLoading &&
              approveHeldUnitData?.map((approve) => (
                <tr
                  key={approve.UnitShuttlePK}
                  onClick={() => {
                    dispatch(setSelectedId(approve.UnitShuttlePK));
                  }}
                  className={approve.UnitShuttlePK === selectedId ? "tableSelected" : " "}
                >
                  <td className="f-w-600">{approve?.DriverName || ""}</td>
                  <td className="f-w-600">{approve.pickUp ? approve.pickUp?.trim() : ""}</td>
                  <td className="f-w-600">{approve.delivery ? approve.delivery?.trim() : ""}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {!browseLoading && approveHeldUnitData.length === 0 && (
          <h2 className="empty-list" align="center">
            {t("dealers.list.empty.message")}
          </h2>
        )}
      </div>
    </div>
  );
};
export default ApproveHeldUnitBrowseListing;
