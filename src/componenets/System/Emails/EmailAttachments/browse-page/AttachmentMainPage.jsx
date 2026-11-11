import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import TableListing from "./TableListing";
import {
  resetEmailAttachment,
  setEmailAttachmentData,
  setPageNumber,
  setResponseData,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
  resetChanges,
} from "../../../../../redux/EmailAttachmentSlice";
import { useParams } from "react-router-dom";
const AttachmentMainPage = () => {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const listingData = useSelector((state) => state.emailAttachmentReducer.listingData);
  const searchTerm = useSelector((state) => state.emailAttachmentReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.emailAttachmentReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.emailAttachmentReducer.pageNumber);
  const totalPages = useSelector((state) => state.emailAttachmentReducer.totalPages);
  const totalElements = useSelector((state) => state.emailAttachmentReducer.totalElements);

  const dispatch = useDispatch();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    loading,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/email-attachment/" + params.emailMaintenanceId + "/" + params.pageNumber + "/add"}
          handleNewOnClick={() => {
            dispatch(resetChanges());
            dispatch(setResponseData(null));
            dispatch(setViewDetail(false));
          }}
          closeButtonRoute={`/email-maintenance/${params.emailMaintenanceId}/${params.pageNumber}`}
          handleCloseOnClick={() => dispatch(resetEmailAttachment())}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={QuarterScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default AttachmentMainPage;
