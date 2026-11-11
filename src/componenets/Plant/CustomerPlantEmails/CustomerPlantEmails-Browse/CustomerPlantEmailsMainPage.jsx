import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditFormData,
  setViewDetail,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  resetClose,
  resetChanges,
} from "../../../../redux/CustomerPlantEmailSlice";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import CustomerPlantEmailsList from "./CustomerPlantEmailsList";
const CustomerPlantEmailsMainPage = () => {
  const params = useParams();
  const searchTerm = useSelector((state) => state.customerPlantEmailReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantEmailReducer.selectedSearchCriteria
  );
  const emailData = useSelector((state) => state.customerPlantEmailReducer.emailData);
  const pageNumber = useSelector((state) => state.customerPlantEmailReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerPlantEmailReducer.totalPages);
  const totalElements = useSelector((state) => state.customerPlantEmailReducer.totalElements);

  const dispatch = useDispatch();
  const handleNewOnClick = () => {
    dispatch(setEditFormData(null));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };
  const close = () => {
    dispatch(resetClose());
    dispatch(resetChanges());
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: emailData,
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={
            "/customer-plant-emails/" +
            params.customerId +
            "/" +
            params.id +
            "/" +
            params.pageNumber +
            "/new-page"
          }
          handleNewOnClick={handleNewOnClick}
          closeButtonRoute={
            "/add-customer-plant/" + params.customerId + "/" + params.pageNumber + "/" + params.id
          }
          handleCloseOnClick={close}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CustomerPlantEmailsList />}
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

export default CustomerPlantEmailsMainPage;
