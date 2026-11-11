import React, { useEffect } from "react";
import NormalLookupScreen from "../Templates/NormalLookupScreen";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  resetSearchSettingsState,
  setSelectedSearchCriteria,
  setSearchTerms,
  setPageNumber,
} from "../../../redux/LookupScreens/DamageCodeLookupSlice";
import { useDispatch } from "react-redux";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import { useSelector } from "react-redux";

const DamageCodeLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  common,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    common,
  };
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.damageCodeLookup.pageNumber);
  const totalPages = useSelector((state) => state.damageCodeLookup.totalPages);
  const totalElements = useSelector((state) => state.damageCodeLookup.totalElements);
  const formsData = useSelector((state) => state.damageCodeLookup.formsData);
  const selectedSearchCriteria = useSelector((state) => state.damageCodeLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.damageCodeLookup.searchTerms);

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
    listingData: formsData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Damage Code Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
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

export default DamageCodeLookup;
