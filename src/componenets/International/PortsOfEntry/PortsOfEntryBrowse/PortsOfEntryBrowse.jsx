import React, { useState } from "react";
import { PaginationComponent } from "../../../common/PaginationComponent";
import PortsOfEntryFilter from "./PortsOfEntryFilter";
import PortsOfEntryListing from "./PortsOfEntryListing";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";

import { useDispatch, useSelector } from "react-redux";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import {
  resetChanges,
  resetPortsOfEntry,
  setEditFormData,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
} from "../../../../redux/PortsOfEntrySlice";

function PortsOfEntryBrowse() {
  const pageNumber = useSelector((state) => state.portsOfEntryReducer.pageNumber);
  const totalPages = useSelector((state) => state.portsOfEntryReducer.totalPages);
  const totalElements = useSelector((state) => state.portsOfEntryReducer.totalElements);
  const portsOfEntryData = useSelector((state) => state.portsOfEntryReducer.portsOfEntryData);
  const searchTerm = useSelector((state) => state.portsOfEntryReducer.searchTerm);
  const selectedSearchCriteria = useSelector((state) => state.portsOfEntryReducer.selectedSearchCriteria);
  const [loading7, setLoading7] = useState(false);

  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: portsOfEntryData,
  };
  const onClose = () => {
    dispatch(resetPortsOfEntry());
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter

          newButtonRoute={`/port-of-entry/add`}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(resetChanges());
            dispatch(setEditFormData(null));
          }}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}

          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={<PortsOfEntryListing loading7={loading7} setLoading7={setLoading7} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          loading={loading7}
        />
      }
    />
  );
}

export default PortsOfEntryBrowse;
