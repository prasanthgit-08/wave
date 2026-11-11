import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setEquipmentData,
  setLoading,
  setNormalSortFlag,
  setNormalSortValue,
  setSelectedId,
  setTotalElements,
  setTotalPages,
} from "../../../redux/LookupScreens/EquipmentLookupSlice";
import EquipmentService from "../../../services/EquipmentService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  assignedIrp,
}) => {
  const equipmentData = useSelector((state) => state.equipmentLookup.equipmentData);
  const pageNumber = useSelector((state) => state.equipmentLookup.pageNumber);
  let sortFlag = useSelector((state) => state.equipmentLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.equipmentLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.equipmentLookup.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.equipmentLookup.searchTerm);
  const selectedId = useSelector((state) => state.equipmentLookup.selectedId);
  const loading = useSelector((state) => state.equipmentLookup.loading);
  const changeColor = useSelector((state) => state.equipmentLookup.changeColor);
  const dispatch = useDispatch();
  const FetchEquipmentForMaintenance = () => {
    dispatch(setLoading(true));
    EquipmentService.getEquipmentForLookup(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        dispatch(setEquipmentData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };
  const FetchAssignedIrpForMaintenance = () => {
    dispatch(setLoading(true));
    EquipmentService.getEquipmentIRPForLookup(
      selectedSearchCriteria,
      searchTerm,
      pageNumber,
      sortValue,
      sortFlag
    )
      .then((response) => {
        const { data } = response;
        dispatch(setEquipmentData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };
  useEffect(() => {
    if (MaintenanceProgram || assignedIrp) {
      dispatch(setLoading(true));
    }
    const debounceFunction = setTimeout(() => {
      if (MaintenanceProgram) {
        FetchEquipmentForMaintenance();
      }
      if (assignedIrp) {
        FetchAssignedIrpForMaintenance();
      }
      if (customFetchFunction) {
        customFetchFunction();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, pageNumber, searchTerm, sortValue, sortFlag]);
  const renderRegionsListingData = equipmentData.map((equipment) => (
    <tr
      id="rowId"
      key={renderItemId(equipment)}
      onClick={(event) => {
        handleLookupSelection(equipment, event);
        dispatch(setChangeColor(true));
        dispatch(setSelectedId(renderItemId(equipment)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(equipment) === selectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {equipment.equipmentNumber} </td>
      <td className="f-w-600"> {equipment.description} </td>
      <td className="f-w-600"> {equipment.serialNumber} </td>
    </tr>
  ));
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
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
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
              Description
              {sortFlag && sortValue === "description" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
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
              Serial Number
              {sortFlag && sortValue === "serialNumber" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "serialNumber" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && equipmentData.length !== 0 && <tbody>{renderRegionsListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        equipmentData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};
export default TableListing;
