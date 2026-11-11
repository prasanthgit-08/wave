/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../services/OrderEntryService";
import {
  setTotalElements,
  setTotalPages,
  setUnitTypeLookupData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setUnitTypeSelectedId,
  setLoading,
} from "../../../redux/LookupScreens/UnitTypeLookupSlice";

import { setUnitTypeInput, setUnitTypesFK, setUnitTypeData } from "../../../redux/OrderEntryFilterSlice";
import EditMasterExpressService from "../../../services/Units/EditMasterExpressService";
import UnitTypeService from "../../../services/UnitTypeService";
import { NormalLookupScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import LoadingIcon from "../../common/LoadingIcon";

const TableListing = ({
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  onHide,
  OEUnitTab,
  setShowMultiUnitLoadDiv,
  editMasterExpress,
  customerUnitTypeGroupId,
  FormsMaintenance,
  undispatchedListing,
  yardInventory,
}) => {
  // ----------------------------------------------------------------------------------------
  const unitTypeLookupData = useSelector((state) => state.unitTypeLookup.unitTypeLookupData);
  const changeColor = useSelector((state) => state.unitTypeLookup.changeColor);
  const loading = useSelector((state) => state.unitTypeLookup.loading);
  const unitTypeSelectedId = useSelector((state) => state.unitTypeLookup.unitTypeSelectedId);
  const pageNumber = useSelector((state) => state.unitTypeLookup.unitTypePageNumber);
  const [unitTypeListingData, setUnitTypeListingData] = useState([]);
  let sortFlag = useSelector((state) => state.unitTypeLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.unitTypeLookup.normalSortValue);
  const hasRates = useSelector((state) => state.orderEntryReducer.hasRates);
  const customerRatesList = useSelector((state) => state.orderEntryReducer.customerRatesList);
  const reload = useSelector((state) => state.orderEntryReducer.reload);
  const selectedCustomerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const id = useSelector((state) => state.orderEntryReducer.selectedCustomerBillingPlantId);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeLookup.selectedSearchCriteria);
  const unitTypeSearchCriteria = useSelector((state) => state.unitTypeLookup.unitTypeSearchCriteria);
  const searchTerms = useSelector((state) => state.unitTypeLookup.searchTerms);
  const towableRedux = useSelector((state) => state.orderEntryReducer.towableRedux);
  const multiUnilLoad = useSelector((state) => state.orderEntryReducer.multiUnilLoad);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);

  const [outbound, setOutbound] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!reload) {
      setOutbound(true);
    }
  }, [reload]);

  // for future implementation
  const onhandleNormalSort = (value, val) => {
    dispatch(setNormalSortValue(value));
    dispatch(setNormalSortFlag(val));
    sortValue = value;
    sortFlag = val;
  };

  const handleOEUnitTab = (unitType, event) => {
    // setShowMultiUnitLoadDiv(false);
    dispatch(setUnitTypesFK(unitType.unitTypePK));
    dispatch(setUnitTypeInput(unitType.descriptionLong?.trim()));
    dispatch(setUnitTypeData(unitType));
    onHide();
  };

  const customFetchCallback = (customServiceCallback) => {
    customServiceCallback()
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((unitType) => ({
          ...unitType,
          descriptionLong: unitType.descriptionLong?.trim(),
        }));
        dispatch(setUnitTypeLookupData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
      })
      .finally((err) => {
        dispatch(setLoading(false));
      });
  };

  const getUnitTypesByCustomer = (selectedCustomerId, id, reload, outbound) => {
    if (selectedCustomerId != null) {
      if (customerRatesList.length > 0) {
        OrderEntryService.fetchUnitTypesByCustomer(
          selectedCustomerId,
          id,
          pageNumber,
          searchTerms,
          selectedSearchCriteria,
          hasRates,
          towableRedux,
          false,
          unitTypeSearchCriteria,
          sortValue,
          sortFlag,
          reload,
          outbound
        )
          .then((response) => {
            const data = response.data;
            const trimmedList = data.content?.map((unitType) => ({
              ...unitType,
              name: unitType.descriptionLong?.trim(),
            }));
            dispatch(setUnitTypeLookupData(trimmedList));
            dispatch(setTotalElements(data.totalElements));
            dispatch(setTotalPages(data.totalPages));
            dispatch(setChangeColor(true));
            dispatch(setLoading(false));
          })
          .catch((err) => {
            dispatch(setLoading(false));
          })
          .finally((err) => {
            dispatch(setLoading(false));
          });
      } else {
        OrderEntryService.findAllUnitTypes(
          pageNumber,
          searchTerms,
          selectedSearchCriteria,
          hasRates,
          unitTypeSearchCriteria,
          sortValue,
          sortFlag,
          false
        )
          .then((response) => {
            const data = response.data;
            const trimmedList = data.content?.map((unitType) => ({
              ...unitType,
              name: unitType.descriptionLong?.trim(),
            }));
            dispatch(setUnitTypeLookupData(trimmedList));
            dispatch(setTotalElements(data.totalElements));
            dispatch(setTotalPages(data.totalPages));
            dispatch(setChangeColor(true));
            dispatch(setLoading(false));
          })
          .catch((err) => {
            dispatch(setLoading(false));
          })
          .finally(() => {
            dispatch(setLoading(false));
          });
      }
    }
  };

  const getUnitTypeForEditMasterExpress = () => {
    EditMasterExpressService.findAllUnitTypesLookUp(
      pageNumber,
      searchTerms,
      selectedSearchCriteria,
      sortValue,
      sortFlag,
      selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeMotorized,
      selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeTowable,
      selectedUnitData?.editMasterExpressUnitTabDTO?.allowMultiUnit,
      selectedUnitData?.editMasterExpressUnitTabDTO?.allowPopup,
      selectedUnitData?.editMasterExpressUnitTabDTO?.allowTruckCamper,
      selectedUnitData?.editMasterExpressUnitTabDTO?.unitTypeGroupIds
    )
      .then((response) => {
        const data = response.data;
        const trimmedList = data.content?.map((unitType) => ({
          ...unitType,
          name: unitType.descriptionLong?.trim(),
        }));
        dispatch(setUnitTypeLookupData(trimmedList));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
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

  const maintenanceFetch = () => {
    UnitTypeService.fetchUnitTypes(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      unitTypeSearchCriteria,
      sortValue,
      sortFlag,
      NormalLookupScreen_RecordsPerPage
    )
      .then(({ data }) => {
        dispatch(setUnitTypeLookupData(data.content));
        dispatch(setTotalElements(data.totalElements));
        dispatch(setTotalPages(data.totalPages));
        dispatch(setChangeColor(true));
        dispatch(setLoading(false));
      })
      .finally((err) => {
        dispatch(setLoading(false));
      });
  };

  const undispatchedListingFetch = () => {
    UnitTypeService.fetchUndispatchedListing(
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      unitTypeSearchCriteria,
      sortValue,
      sortFlag,
      NormalLookupScreen_RecordsPerPage,
      "Lookup"
    )
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setUnitTypeLookupData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setChangeColor(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  //yardInventory

  const yardInventoryFetch = () => {
    dispatch(setLoading(true));
    UnitTypeService.fetchUnitTypeYardInventory({
      selectedSearchCriteria,
      searchTerms,
      pageNumber,
      unitTypeSearchCriteria,
      sortValue,
      sortFlag,
      pageSize: NormalLookupScreen_RecordsPerPage,
    })
      .then((response) => {
        const data = response.data;
        const listingData = data.slice(0, data?.length - 1);
        const paginationData = data.slice(data?.length - 1);
        dispatch(setUnitTypeLookupData(listingData));
        dispatch(setTotalElements(paginationData[0].TotalElements));
        dispatch(setTotalPages(paginationData[0].TotalPages));
        dispatch(setChangeColor(true));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    const debounceFunction = setTimeout(() => {
      if (editMasterExpress) {
        getUnitTypeForEditMasterExpress();
      }
      if (OEUnitTab) {
        getUnitTypesByCustomer(selectedCustomerId, id, reload, outbound);
      } else if (MaintenanceProgram) {
        maintenanceFetch();
      } else if (FormsMaintenance) {
        const props = {
          customerUnitTypeGroupId,
          formsFlag: true,
        };
        customFetchCallback(() =>
          UnitTypeService.fetchUnitTypes(
            selectedSearchCriteria,
            searchTerms,
            pageNumber,
            unitTypeSearchCriteria,
            sortValue,
            sortFlag,
            NormalLookupScreen_RecordsPerPage,
            props
          )
        );
      } else if (customFetchFunction) {
        customFetchFunction();
      } else if (undispatchedListing) {
        undispatchedListingFetch();
      } else if (yardInventory) {
        yardInventoryFetch();
      }
    }, 500);

    return () => {
      clearTimeout(debounceFunction);
    };
  }, [unitTypeSearchCriteria, selectedSearchCriteria, pageNumber, searchTerms, sortFlag, sortValue]);

  useEffect(() => {
    if (unitTypeLookupData != null) {
      setUnitTypeListingData(unitTypeLookupData);
    }
  }, [unitTypeLookupData, sortFlag, sortValue]);

  const renderUnitTypeListing = unitTypeListingData.map((unitType) => (
    <tr
      id="rowId"
      // key={unitType.unitTypePK}
      onClick={(event) => {
        // dispatch(setChangeColor(false));
        /**
         * Calling different handler functions based on where the Lookup Screen is called from
         */
        if (OEUnitTab) {
          handleOEUnitTab(unitType, event);
        } else if (handleLookupSelection) {
          handleLookupSelection(unitType, event);
        }
        if (editMasterExpress) {
          handleLookupSelection(unitType, event);
        }
        // TODO: add common functionalities here
        // *************************************
        dispatch(setUnitTypeSelectedId(unitType.unitTypePK || unitType.UnitTypePK));
        dispatch(setChangeColor(true));
      }}
      onDoubleClick={(event) => {}}
      className={
        (unitType.unitTypePK || unitType.UnitTypePK) === unitTypeSelectedId && changeColor
          ? "tableSelected"
          : " "
      }
    >
      <td className="f-w-600"> {unitType.unitCode || unitType.UnitCode || unitType.DescriptionShort} </td>
      <td className="f-w-600"> {unitType.descriptionLong || unitType.DescriptionLong} </td>
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
                onhandleNormalSort("unitCode", !sortFlag);
              }}
            >
              Unit Code
              {sortFlag && sortValue === "unitCode" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "unitCode" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
            <th
              className="f-w-600"
              onClick={() => {
                onhandleNormalSort("descriptionLong", !sortFlag);
              }}
            >
              Description
              {sortFlag && sortValue === "descriptionLong" && (
                <i className="fa fa-sort-alpha-asc font-20 m-l-10" aria-hidden="true"></i>
              )}
              {!sortFlag && sortValue === "descriptionLong" && (
                <i className="fa fa-sort-alpha-desc font-20 m-l-10"></i>
              )}
            </th>
          </tr>
        </thead>
        {!loading && unitTypeListingData.length !== 0 && <tbody>{renderUnitTypeListing}</tbody>}
      </table>
      {loading ? (
        <LoadingIcon />
      ) : (
        unitTypeListingData.length === 0 && <div className="noRecordsSmallerFont">No Records Available</div>
      )}
    </div>
  );
};

export default TableListing;
