/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberBrokerLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsBroker,
} from "../../../redux/LookupScreens/BrokerLookupSlice";
import NormalLookupScreen from "../Templates/NormalLookupScreen";

const BrokerLookup = ({
  /**
   * pass either 'import' or 'export' as brokerType
   */
  brokerType,
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
}) => {
  // ------------------------------------------------------------------------------------------------
  const lookupProps = {
    brokerType,
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
  };

  const pageNumberBrokerLookup = useSelector((state) => state.brokerLookup.pageNumberBrokerLookup);
  const totalPages = useSelector((state) => state.brokerLookup.totalPages);
  const totalElements = useSelector((state) => state.brokerLookup.totalElements);
  const brokerData = useSelector((state) => state.brokerLookup.brokerData);
  const selectedSearchCriteria = useSelector((state) => state.brokerLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.brokerLookup.searchTerms);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(resetSearchSettingsBroker());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumberBrokerLookup,
    setPageNumber: setPageNumberBrokerLookup,
    totalPages,
    totalElements,
    listingData: brokerData,
  };

  return (
    <NormalLookupScreen
      // lookupTitle={}
      show={show}
      onHide={onHide}
      lookupTitle={brokerType === "import" ? "Import Broker Selection" : "Export Broker Selection"}
      SearchFilterComponent={
        <SearchFilterNSort
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          selectedSearchCriteria={selectedSearchCriteria}
          setSelectedSearchCriteria={setSelectedSearchCriteria}
          setPageNumber={setPageNumberBrokerLookup}
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

export default BrokerLookup;
