import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setChangeColor,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumberforAdd,
  setSearchCriteria,
  setSearchCriteriaForAdd,
  setSearchTermForAdd,
  setSearchTerms,
  setSelectedStatus,
  setPageNumber,
  setSortFlag1,
} from "../../../../redux/DriverEquipmentSlice";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import AssignedEquipmentListing from "./AssignedEquipmentListing";
import AddEquipmentListing from "./AddEquipmentListing";
import { setSortValue1 } from "../../../../redux/DriverSearchFilterSlice";

function AddEquipmentTemplate() {
  const listingData = useSelector((state) => state.driverEquipmentReducer.listingData);
  const pageNumberforAdd = useSelector((state) => state.driverEquipmentReducer.pageNumberforAdd);
  const totalPagesForAdd = useSelector((state) => state.driverEquipmentReducer.totalPagesForAdd);
  const totalElementsForAdd = useSelector((state) => state.driverEquipmentReducer.totalElementsForAdd);
  const driverFK = useSelector((state) => state.driverEquipmentReducer.driverFK);
  const pageNumber = useSelector((state) => state.driverEquipmentReducer.pageNumber);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const searchTermsForAdd = useSelector((state) => state.driverEquipmentReducer.searchTermsForAdd);
  const searchCriteriaForAdd = useSelector((state) => state.driverEquipmentReducer.searchCriteriaForAdd);

  window.addEventListener("popstate", () => {
    dispatch(setSortFlag1(false));
    dispatch(setSortValue1(null));
  });

  const paginationProps = {
    pageNumber: pageNumberforAdd,
    setPageNumber: setPageNumberforAdd,
    totalPages: totalPagesForAdd,
    totalElements: totalElementsForAdd,
    listingData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          closeButtonRoute={`/assigned-equipment/${driverFK}`}
          handleCloseOnClick={() => {
            dispatch(setSearchTermForAdd(""));
            dispatch(setPageNumberforAdd(0));
            dispatch(setSearchCriteriaForAdd("Beginning"));
            dispatch(setSortFlag1(false));
            dispatch(setSortValue1(""));
            dispatch(setChangeColor(false));
            dispatch(setSelectedStatus("Active"));
          }}
          globalSearchTerm={searchTermsForAdd}
          setGlobalSearchTerm={setSearchTermForAdd}
          firstRadioGroupValue={searchCriteriaForAdd}
          setFirstRadioGroupValue={setSearchCriteriaForAdd}
          setPageNumber={setPageNumberforAdd}
        />
      }

      TableListingComponent={
        <AddEquipmentListing customerURL={``} loading={loading} setLoading={setLoading} />
      }
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
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

export default AddEquipmentTemplate;
