/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberShuttleCityLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsShuttleCity,
} from "../../../redux/LookupScreens/ShuttleCityLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const ShuttleCityLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  OECustomerPickupCity,
  OECustomerDeliveryCity,
  shuttle,
  EditShuttle,
  selectedCompanyName,
  EditMasterExpress,
  outbound,
  isCustomerPlantMaintenance,
}) => {
  // ---------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
    OECustomerPickupCity,
    OECustomerDeliveryCity,
    shuttle,
    EditShuttle,
    selectedCompanyName,
    EditMasterExpress,
    outbound,
    isCustomerPlantMaintenance,
  };
  const pageNumberShuttleCityLookup = useSelector(
    (state) => state.shuttleCityLookupReducer.pageNumberShuttleCityLookup
  );
  const totalPages = useSelector((state) => state.shuttleCityLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.shuttleCityLookupReducer.totalElements);
  const shuttleCityData = useSelector((state) => state.shuttleCityLookupReducer.shuttleCityData);
  const selectedSearchCriteria = useSelector(
    (state) => state.shuttleCityLookupReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.shuttleCityLookupReducer.searchTerms);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberShuttleCityLookup(0));
      dispatch(resetSearchSettingsShuttleCity());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumberShuttleCityLookup,
    setPageNumber: setPageNumberShuttleCityLookup,
    totalPages,
    totalElements,
    listingData: shuttleCityData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Shuttle City Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberShuttleCityLookup}
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

export default ShuttleCityLookup;
