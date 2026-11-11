import React, { useState } from "react";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  setSearchTerm,
  setSelectedSearchCriteria,
  setPageNumber,
  setNormalSortFlag,
  setNormalSortValue,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setEditFormData,
  setViewDetail,
  resetChanges,
  setChangeColor,
  resetClose,
} from "../../../../redux/CustomerPlantContactSlice";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { useParams } from "react-router-dom";
import ThreeFourthScreenTemplate from "../../../Templates/ThreeFourthScreenTemplate";
import ContactListPage from "./ContactListPage";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
const PlantContactMainPage = () => {
  const params = useParams();
  const { id } = useParams();
  const pageNum = params.pageNumber;
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.customerPlantContactReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantContactReducer.selectedSearchCriteria
  );
  const pageNumber = useSelector((state) => state.customerPlantContactReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerPlantContactReducer.totalPages);
  const plantContactData = useSelector((state) => state.customerPlantContactReducer.plantContactData);
  const totalElements = useSelector((state) => state.customerPlantContactReducer.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: plantContactData,
  };
  const onHandleChangeView = () => {
    dispatch(setEditFormData(null));
    dispatch(setViewDetail(undefined));
    dispatch(resetChanges());
  };
  const onClose = () => {
    dispatch(resetClose());
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={
            "/customer-plant-contacts/" +
            params.customerId +
            "/" +
            params.id +
            "/" +
            params.pageNumber +
            "/new-page"
          }
          handleNewOnClick={onHandleChangeView}
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
      TableListingComponent={<ContactListPage loader={loader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          loading={loader}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default PlantContactMainPage;
