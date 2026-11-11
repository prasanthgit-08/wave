import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddEquipmentChangeColor,
  setChangeColor,
  setEquipmentPK,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setPageNumberforAdd,
  setSearchCriteria,
  setSearchCriteriaForAdd,
  setSearchTermForAdd,
  setSearchTerms,
  setSelectedStatus,
  setSortFlag1,
} from "../../../../redux/DriverEquipmentSlice";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import AssignedEquipmentListing from "./AssignedEquipmentListing";
import { useParams } from "react-router-dom";

function AssignedEquipmentTemplate() {
  const params = useParams();
  const driverId = params.driverId;

  const [loading, setLoading] = useState(false);
  const listingData = useSelector((state) => state.driverEquipmentReducer.assignedEquipmentList);
  const pageNumber = useSelector((state) => state.driverEquipmentReducer.pageNumber);
  const totalPages = useSelector((state) => state.driverEquipmentReducer.totalPages);
  const totalElements = useSelector((state) => state.driverEquipmentReducer.totalElements);
  const dispatch = useDispatch();
  const searchTerms = useSelector((state) => state.driverEquipmentReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.driverEquipmentReducer.searchCriteria);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          addButtonRoute={`/add-driver-equipment/${driverId}`}
          handleAddOnClick={() => {
            dispatch(setEquipmentPK(null));
            dispatch(setAddEquipmentChangeColor(false));
            dispatch(setSearchTermForAdd(""));
            dispatch(setPageNumberforAdd(0));
            dispatch(setSearchCriteriaForAdd("Beginning"));
          }}
          closeButtonRoute={`/driver-maintenance-add/${driverId}`}
          handleCloseOnClick={() => {
            dispatch(setSearchTerms(""));
            dispatch(setPageNumber(0));
            dispatch(setPageNumberforAdd(0));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setNormalSortFlag(false));
            dispatch(setNormalSortValue(null));
            dispatch(setChangeColor(false));
            dispatch(setSelectedStatus("Active"));
          }}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={
        <AssignedEquipmentListing customerURL={``} loading={loading} setLoading={setLoading} />
      }
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={11}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loading}
        />
      }
    />
  );
}

export default AssignedEquipmentTemplate;
