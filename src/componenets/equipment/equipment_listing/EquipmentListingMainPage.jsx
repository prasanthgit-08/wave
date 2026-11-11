import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setChangeColor,
  setEditFormData,
  setIsEquipmentUnique,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setReserveId,
  setReserveInput,
  setSearchCriteria,
  setSearchTerms,
  setSelectedEquipmentStatus,
  setSelectedStatus,
  setViewDetail,
} from "../../../redux/EquipmentsSlice";
import { PaginationComponent } from "../../common/PaginationComponent";
import EquipmentListing from "./EquipmentListing";
import EquipmentSearchFilter from "./EquipmentSearchFilter";
import { ThreeForthScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";

function EquipmentListingMainPage() {
  const [loading, setLoading] = useState(true);
  const listingData = useSelector((state) => state.equipmentReducer.listingData);
  const pageNumber = useSelector((state) => state.equipmentReducer.pageNumber);
  const totalPages = useSelector((state) => state.equipmentReducer.totalPages);
  const totalElements = useSelector((state) => state.equipmentReducer.totalElements);
  const dispatch = useDispatch();
  const searchTerms = useSelector((state) => state.equipmentReducer.searchTerms);
  const searchCriteria = useSelector((state) => state.equipmentReducer.searchCriteria);
  const selectedStatus = useSelector((state) => state.equipmentReducer.selectedStatus);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };
  const onHandleChangeView = () => {
    dispatch(setIsEquipmentUnique(false));
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(false));
    dispatch(setReserveId(null));
    dispatch(setReserveInput(""));
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          secondRadioGroup

          newButtonRoute={"/equipment-maintenance-edit"}
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={"/"}

          handleCloseOnClick={() => {
            dispatch(setSearchTerms(""));
            dispatch(setPageNumber(0));
            dispatch(setSearchCriteria("Beginning"));
            dispatch(setNormalSortFlag(false));
            dispatch(setNormalSortValue(null));
            dispatch(setChangeColor(false));
            dispatch(setSelectedStatus("Active"));
            dispatch(setPageNumber(0));
            dispatch(setReserveId(null));
            dispatch(setReserveInput(""));
          }}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroupValue={selectedStatus}
          setSecondRadioGroupValue={setSelectedStatus}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={<EquipmentListing customerURL={``} loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
}

export default EquipmentListingMainPage;
