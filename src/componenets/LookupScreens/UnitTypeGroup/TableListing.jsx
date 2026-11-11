import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTotalElements,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
  setUnitTypeGroupSelectedId,
  setChangeColor,
  setUnitTypeGroupLookupData,
  setLoading,
} from "../../../redux/LookupScreens/UnitTypeGroupLookupSlice";
import CustomerPlantMaintenanceService from "../../../services/CustomerPlantMaintenanceService";
import UnitTypeGroupsService from "../../../services/UnitTypeGroupsService";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  FormsMaintenance,
  customerUnitTypeGroupId,
  unitTypeGroupPKS,
  yardInventory,
  unitTypePK,
}) => {
  // -----------------------------------------------------------

  const dispatch = useDispatch();
  const unitTypeGroupLookupData = useSelector((state) => state.unitTypeGroupLookup.unitTypeGroupLookupData);
  const unitTypeGroupPageNumber = useSelector((state) => state.unitTypeGroupLookup.unitTypeGroupPageNumber);
  let normalSortValue = useSelector((state) => state.unitTypeGroupLookup.normalSortValue);
  let normalSortFlag = useSelector((state) => state.unitTypeGroupLookup.normalSortFlag);
  const changeColor = useSelector((state) => state.unitTypeGroupLookup.changeColor);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeGroupLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.unitTypeGroupLookup.searchTerms);
  const unitTypeGroupSelectedId = useSelector((state) => state.unitTypeGroupLookup.unitTypeGroupSelectedId);
  const loading = useSelector((state) => state.unitTypeGroupLookup.loading);
  const getUnitTypeGroupForMaintenance = () => {
    CustomerPlantMaintenanceService.getUnitTypeGroupForlookup(
      selectedSearchCriteria,
      searchTerms,
      unitTypeGroupPageNumber,
      normalSortFlag,
      normalSortValue
    )
      .then((response) => {
        const data = response.data;
        dispatch(setUnitTypeGroupLookupData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const unitTypeGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        dispatch(setUnitTypeGroupLookupData(unitTypeGroupList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
      })
      .finally((err) => {
        dispatch(setLoading(false));
      });
  };

  const getUnitTypeGroupForSupplementalRatesMaintenance = () => {
    UnitTypeGroupsService.getUnitTypeGroupForSupplementalRates(
      selectedSearchCriteria,
      searchTerms,
      unitTypeGroupPageNumber,
      normalSortFlag,
      normalSortValue,
      unitTypeGroupPKS
    )
      .then((response) => {
        const data = response.data;
        const unitTypeGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        dispatch(setUnitTypeGroupLookupData(unitTypeGroupList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const getUnitTypeGroupForYardInventory = () => {
    dispatch(setLoading(true));
    CustomerPlantMaintenanceService.fetchUnitTypeGroupForYardInventory({
      selectedSearchCriteria,
      searchTerms,
      unitTypeGroupPageNumber,
      normalSortFlag,
      normalSortValue,
      resultType: 0,
      unitTypePK: unitTypePK,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setUnitTypeGroupLookupData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    normalSortValue = value;
    normalSortFlag = val;
    if (MaintenanceProgram) {
      getUnitTypeGroupForMaintenance();
    }
    if (unitTypeGroupPKS) {
      getUnitTypeGroupForSupplementalRatesMaintenance();
    }
    if (yardInventory) {
      getUnitTypeGroupForYardInventory();
    }
  };
  /**
   * Fetch Yards conditionally for Order Entry & Maintenance Programs
   */
  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      // Fetch Yards for MP
      if (MaintenanceProgram) {
        getUnitTypeGroupForMaintenance();
      } else if (FormsMaintenance) {
        const props = {
          customerUnitTypeGroupId,
          formsFlag: true,
        };
        customFetchCallback(() =>
          CustomerPlantMaintenanceService.getUnitTypeGroupForlookup(
            selectedSearchCriteria,
            searchTerms,
            unitTypeGroupPageNumber,
            normalSortFlag,
            normalSortValue,
            unitTypeGroupPKS
          )
        );
      }
      if (unitTypeGroupPKS) {
        getUnitTypeGroupForSupplementalRatesMaintenance();
      }
      if (yardInventory) {
        getUnitTypeGroupForYardInventory();
      }
    }, 100);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [selectedSearchCriteria, unitTypeGroupPageNumber, searchTerms]);

  const renderUnitTypeListingData = unitTypeGroupLookupData.map((unit) => (
    <tr
      id="rowId"
      key={renderItemId(unit)}
      onClick={(event) => {
        handleLookupSelection(unit, event);
        dispatch(setChangeColor(true));
        dispatch(setUnitTypeGroupSelectedId(renderItemId(unit)));
      }}
      onDoubleClick={(event) => {}}
      className={renderItemId(unit) === unitTypeGroupSelectedId && changeColor ? "tableSelected" : " "}
    >
      <td className="f-w-600"> {unit?.description || unit?.UnitTypeGrpDescription} </td>
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
          </tr>
        </thead>
        {!loading && unitTypeGroupLookupData.length !== 0 && <tbody>{renderUnitTypeListingData}</tbody>}
      </table>
      {loading ? (
        <div className="loadingStyling">LOADING...</div>
      ) : (
        unitTypeGroupLookupData.length === 0 && (
          <div className="noRecordsSmallerFont">No Records Available</div>
        )
      )}
    </div>
  );
};

export default TableListing;
