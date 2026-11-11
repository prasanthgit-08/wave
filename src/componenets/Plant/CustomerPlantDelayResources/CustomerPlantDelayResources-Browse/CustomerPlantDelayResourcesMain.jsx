import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  resetClose,
  setEditFormData,
  setPageNumber,
  setSearchTerm,
  setSelectedSearchCriteria,
  setViewDetail,
} from "../../../../redux/CustomerPlantDelaySlice";
import { useParams } from "react-router-dom";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import CustomerPlantDelayResourcesList from "./CustomerPlantDelayResourcesList";

const CustomerPlantDelayResourcesMain = () => {
  const params = useParams();
  const searchTerm = useSelector((state) => state.customerPlantDelayReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantDelayReducer.selectedSearchCriteria
  );
  const plantDelayData = useSelector((state) => state.customerPlantDelayReducer.plantDelayData);
  const pageNumber = useSelector((state) => state.customerPlantDelayReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerPlantDelayReducer.totalPages);
  const totalElements = useSelector((state) => state.customerPlantDelayReducer.totalElements);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: plantDelayData,
  };
  const dispatch = useDispatch();
  const handleNewOnClick = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };
  const onClose = () => {
    dispatch(resetClose());
    dispatch(resetChanges());
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={
            "/customer-plant-delay-resources/" +
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
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CustomerPlantDelayResourcesList />}
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

export default CustomerPlantDelayResourcesMain;
