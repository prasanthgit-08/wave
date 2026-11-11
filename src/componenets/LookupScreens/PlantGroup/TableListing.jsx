import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setChangeColor,
  setNormalSortValue,
  setNormalSortFlag,
  setPlantGroupLookupData,
  setTotalPages,
  setTotalElements,
  setPlantGroupSelectedId,
  setLoading,
} from "../../../redux/LookupScreens/PlantGroupLookupSlice";
import CustomerPlantMaintenanceService from "../../../services/CustomerPlantMaintenanceService";
const TableListing = ({ renderItemId, MaintenanceProgram, handleLookupSelection }) => {
  // -----------------------------------------------------------

  const dispatch = useDispatch();
  const plantGroupLookupData = useSelector((state) => state.plantGroupLookup.plantGroupLookupData);
  const loading = useSelector((state) => state.plantGroupLookup.loading);
  const searchTerms = useSelector((state) => state.plantGroupLookup.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.plantGroupLookup.selectedSearchCriteria);
  const plantGroupPageNumber = useSelector((state) => state.plantGroupLookup.plantGroupPageNumber);
  let normalSortValue = useSelector((state) => state.plantGroupLookup.normalSortValue);
  let normalSortFlag = useSelector((state) => state.plantGroupLookup.normalSortFlag);
  const changeColor = useSelector((state) => state.plantGroupLookup.changeColor);
  const plantGroupSelectedId = useSelector((state) => state.plantGroupLookup.plantGroupSelectedId);
  const customerFK = useSelector((state) => state.customerPlantmaintanceReducer.customerFK);

  const getPlantGroupDataForMaintenance = () => {
    CustomerPlantMaintenanceService.getPlantGroupData(
      customerFK,
      selectedSearchCriteria,
      searchTerms,
      plantGroupPageNumber,
      normalSortFlag,
      normalSortValue
    )
      .then((response) => {
        const data = response.data;
        dispatch(setPlantGroupLookupData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    normalSortValue = value;
    normalSortFlag = val;
    getPlantGroupDataForMaintenance(customerFK);
  };

  /**
   * Fetch Yards conditionally for Order Entry & Maintenance Programs
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Plant Groups for MP
      if (MaintenanceProgram) {
        getPlantGroupDataForMaintenance(customerFK);
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, plantGroupPageNumber, searchTerms, customerFK]);

  const renderPlantGroupListingData = plantGroupLookupData.map((item) => (
    <tr
      id="rowId"
      key={renderItemId(item)}
      onClick={(event) => {
        handleLookupSelection(item, event);
        dispatch(setChangeColor(true));
        dispatch(setPlantGroupSelectedId(renderItemId(item)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(item) === plantGroupSelectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {item.description} </td>
      <td className="f-w-600"> {item.customerfk.name} </td>
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
                onhandleNormalSort("description", !normalSortFlag);
              }}
            >
              Description
              {normalSortFlag && normalSortValue === "description" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "description" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("name", !normalSortFlag);
              }}
            >
              Customer
              {normalSortFlag && normalSortValue === "name" && (
                <i class="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!normalSortFlag && normalSortValue === "name" && (
                <i class="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>

        {!loading && plantGroupLookupData.length !== 0 && <tbody>{renderPlantGroupListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        plantGroupLookupData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
