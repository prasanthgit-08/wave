/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetEmailSenderTypes,
  setPageNumber,
  setFormData,
  setSearchCriteria,
  setSearchTerm,
  setViewDetail,
  setEmailSenderTypesvalid,
} from "../../../../../redux/EmailSenderTypesSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";

const EmailSenderTypes = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.emailSenderTypes.searchTerm);
  const searchCriteria = useSelector((state) => state.emailSenderTypes.searchCriteria);
  const listingData = useSelector((state) => state.emailSenderTypes.listingData);
  const pageNumber = useSelector((state) => state.emailSenderTypes.pageNumber);
  const totalPages = useSelector((state) => state.emailSenderTypes.totalPages);
  const totalElements = useSelector((state) => state.emailSenderTypes.totalElements);

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
          newButtonRoute={`/email-sender-types/add`}
          handleNewOnClick={() => {
            dispatch(setFormData(null));
            dispatch(setViewDetail(false));
            dispatch(setEmailSenderTypesvalid(true));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => dispatch(resetEmailSenderTypes())}
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

export default EmailSenderTypes;
