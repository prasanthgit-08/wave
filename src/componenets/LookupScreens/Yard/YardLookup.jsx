/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberYardLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsYard,
} from "../../../redux/LookupScreens/YardLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const YardLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  OECustomerPickupYard,
  OECustomerDeliveryYard,
  shuttle,
  EditShuttle,
  EditYardUnit,
  selectedCompanyName,
  DriverDispatch,
  EditMasterExpress,
  EditMasterExpressShuttle,
  undispatchedListing,
  unitException,
  yardInventory,
}) => {
  // --------------------------------------------------
  const lookupProps = {
    renderItemId,
    onHide,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
    OECustomerPickupYard,
    OECustomerDeliveryYard,
    shuttle,
    EditShuttle,
    EditYardUnit,
    selectedCompanyName,
    DriverDispatch,
    EditMasterExpress,
    EditMasterExpressShuttle,
    undispatchedListing,
    unitException,
    yardInventory,
  };

  const pageNumberYardLookup = useSelector((state) => state.yardLookupReducer.pageNumberYardLookup);
  const totalPages = useSelector((state) => state.yardLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.yardLookupReducer.totalElements);
  const yardsData = useSelector((state) => state.yardLookupReducer.yardsData);
  const selectedSearchCriteria = useSelector((state) => state.yardLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.yardLookupReducer.searchTerms);
  const loading = useSelector((state) => state.yardLookupReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberYardLookup(0));
      dispatch(resetSearchSettingsYard());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumberYardLookup,
    setPageNumber: setPageNumberYardLookup,
    totalPages,
    totalElements,
    listingData: yardsData,
  };

  return (
    <NormalLookupScreen
      show={show}
      onHide={onHide}
      lookupTitle={"Yard Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberYardLookup}
          normalSearchFilter
          handleClose={onHide}
        />
      }
      TableListingComponent={<TableListing {...lookupProps} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loading}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default YardLookup;
