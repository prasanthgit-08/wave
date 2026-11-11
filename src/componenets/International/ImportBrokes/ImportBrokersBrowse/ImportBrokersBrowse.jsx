import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { PaginationComponent } from "../../../common/PaginationComponent";
import ImportBrokersFilter from "./ImportBrokersFilter";
import ImportBrokersListing from "./ImportBrokersListing";
import QuarterScreen from "../../../../styles/ThreeQuarterScreen.module.css";
import {
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "../../../../services/constants/applicationConstants";
import {
  importBrokersData,
  resetChanges,
  resetImportBrokers,
  setEditFormData,
  setPageNumber,
  setSearchTerms,
  setSelectedSearchCriteria,
  setViewDetail,
} from "../../../../redux/ImportBrokersSlice";
import ThreeFourthScreenTemplate from "../../../Templates/ThreeFourthScreenTemplate";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

function ImportBrokersBrowse() {
  const pageNumber = useSelector((state) => state.importBrokersReducer.pageNumber);
  const totalPages = useSelector((state) => state.importBrokersReducer.totalPages);
  const totalElements = useSelector((state) => state.importBrokersReducer.totalElements);
  const importBrokersData = useSelector((state) => state.importBrokersReducer.importBrokersData);
  const searchTerms = useSelector((state) => state.importBrokersReducer.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.importBrokersReducer.selectedSearchCriteria);
  const dispatch = useDispatch();
  const [loading7, setLoading7] = useState(false);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: importBrokersData,
  };
  const onClose = () => {
    dispatch(resetImportBrokers());
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={`/import-brokers/add`}
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
      TableListingComponent={<ImportBrokersListing loading7={loading7} setLoading7={setLoading7} />}
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

export default ImportBrokersBrowse;
