import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchSettingsState,
  setPageNumber,
  setSelectedSearchCriteria,
  setSearchTerm,
} from "../../../redux/LookupScreens/EquipmentLookupSlice";

const EquipmentLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  assignedIrp,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    assignedIrp,
  };

  const pageNumber = useSelector((state) => state.equipmentLookup.pageNumber);
  const totalPages = useSelector((state) => state.equipmentLookup.totalPages);
  const totalElements = useSelector((state) => state.equipmentLookup.totalElements);
  const equipmentData = useSelector((state) => state.equipmentLookup.equipmentData);
  const selectedSearchCriteria = useSelector((state) => state.equipmentLookup.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.equipmentLookup.searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumber(0));
      dispatch(resetSearchSettingsState());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
    totalPages,
    totalElements,
    listingData: equipmentData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Equipment Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
          normalSearchFilter
          handleClose={onHide}
        />
      }
      TableListingComponent={<TableListing {...lookupProps} />}
      PaginationComponent={
        <PaginationComponent {...paginationProps} firstPage lastPage singleArrowUp singleArrowDown />
      }
    />
  );
};
export default EquipmentLookup;
