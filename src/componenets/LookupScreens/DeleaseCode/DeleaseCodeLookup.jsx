import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchSettingsState,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
} from "../../../redux/LookupScreens/DeleaseCodeLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";

const DeleaseCodeLookup = ({
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
  const pageNumber = useSelector((state) => state.deleaseCodeLookup.pageNumber);
  const totalPages = useSelector((state) => state.deleaseCodeLookup.totalPages);
  const totalElements = useSelector((state) => state.deleaseCodeLookup.totalElements);
  const deleaseCodeData = useSelector((state) => state.deleaseCodeLookup.deleaseCodeData);
  const selectedSearchCriteria = useSelector((state) => state.deleaseCodeLookup.selectedSearchCriteria);
  const searchTerm = useSelector((state) => state.deleaseCodeLookup.searchTerm);
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
    listingData: deleaseCodeData,
  };
  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Delease Code Selection"}
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

export default DeleaseCodeLookup;
