import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  setAssignedToDriver,
  setAssignedToUnit,
  setChangeColor,
  setCheckDetail,
  setDepositAmount,
  setEditFormData,
  setEquipmentData,
  setId,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
} from "../../../../redux/EquipmentCheckInOutSlice";
import EquipmentCheckInOutService from "../../../../services/EquipmentCheckInOutService";
import LoadingText from "../../../common/LoadingText";
const EquipmentCheckInOutList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageNumber = useSelector((state) => state.equipmentCheckInOutReducer.pageNumber);

  const [loader, setLoader] = useState(true);
  const changeColor = useSelector((state) => state.equipmentCheckInOutReducer.changeColor);
  const id = useSelector((state) => state.equipmentCheckInOutReducer.id);
  const searchTerm = useSelector((state) => state.equipmentCheckInOutReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.equipmentCheckInOutReducer.selectedSearchCriteria
  );
  const equipmentData = useSelector((state) => state.equipmentCheckInOutReducer.equipmentData);
  let sortValue = useSelector((state) => state.equipmentCheckInOutReducer.normalSortValue);
  let sortFlag = useSelector((state) => state.equipmentCheckInOutReducer.normalSortFlag);
  const selectedStatus = useSelector((state) => state.equipmentCheckInOutReducer.selectedStatus);
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));

    dispatch(setNormalSortFlag(val));

    sortValue = value;

    sortFlag = val;
  };
  const fetchTableData = () => {
    EquipmentCheckInOutService.getEquipmentsData(
      searchTerm,
      selectedSearchCriteria,
      pageNumber,
      sortValue,
      sortFlag,
      selectedStatus
    )
      .then((response) => {
        const { data } = response;
        setLoader(false);
        dispatch(setEquipmentData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      fetchTableData();
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSearchCriteria, searchTerm, pageNumber, sortValue, sortFlag, selectedStatus]);
  return (
    <div className="fixTableHead">
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
              {" "}
              Description
              {sortFlag && sortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {loader
            ? ""
            : equipmentData.map((item) => (
                <tr
                  id="rowId"
                  key={item.equipmentPK}
                  onClick={(e) => dispatch(setChangeColor(false))}
                  onDoubleClick={(event) => {
                    dispatch(setId(item.equipmentPK));
                    dispatch(setChangeColor(true));
                    dispatch(setDepositAmount(""));
                    dispatch(setAssignedToDriver(""));
                    dispatch(setAssignedToUnit(""));
                    dispatch(setCheckDetail(false));
                    dispatch(setEditFormData(null));
                    setTimeout(() => {
                      navigate(
                        item.available === true
                          ? "/equipment-check-out-page/" + item.equipmentPK + "/" + pageNumber
                          : "/equipment-check-in-page/" + item.equipmentPK + "/" + pageNumber
                      );
                    }, 100);
                  }}
                  className={item.equipmentPK === id && changeColor ? "tableSelected" : ""}
                >
                  <td className="f-w-600">{item.equipmentNumber} </td>
                  <td className="f-w-600">{item.description} </td>
                </tr>
              ))}
        </tbody>
      </table>
      {loader
        ? ""
        : equipmentData.length === 0 && (
            <h2 className="empty-list" align="center">
              No Records Available
            </h2>
          )}
      {loader && <LoadingText />}
    </div>
  );
};

export default EquipmentCheckInOutList;
