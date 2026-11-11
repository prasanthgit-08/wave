import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import ThreeFourthScreenTemplate from "../../../Templates/ThreeFourthScreenTemplate";
import ExportBrokersFilter from "./ExportBrokersFilter";
import ExportBrokersListing from "./ExportBrokersListing";
import {
  resetChanges,
  resetExportBrokers,
  setEditFormData,
  setPageNumber,
  setSearchTerms,
  setSelectedSearchCriteria,
  setViewDetail,
} from "../../../../redux/ExportBrokersSlice";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

function ExportBrokersBrowse() {
  const pageNumber = useSelector((state) => state.exportBrokersReducer.pageNumber);
  const totalPages = useSelector((state) => state.exportBrokersReducer.totalPages);
  const totalElements = useSelector((state) => state.exportBrokersReducer.totalElements);
  const exportBrokersData = useSelector((state) => state.exportBrokersReducer.exportBrokersData);
  const searchTerms = useSelector((state) => state.exportBrokersReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.exportBrokersReducer.selectedSearchCriteria);
  const dispatch = useDispatch();
  const [loading7, setLoading7] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: exportBrokersData,
  };
  const onClose = () => {
    dispatch(resetExportBrokers());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/export-brokers-browse/add`}
          handleNewOnClick={() => {
            dispatch(setViewDetail(false));
            dispatch(resetChanges());
            dispatch(setEditFormData(null));
          }}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<ExportBrokersListing loading7={loading7} setLoading7={setLoading7} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
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

export default ExportBrokersBrowse;
