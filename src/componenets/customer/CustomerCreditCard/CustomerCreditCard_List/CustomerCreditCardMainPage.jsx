import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CustomerCreditCardList from "./CustomerCreditCardList";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import CustomerCreditCardService from "../../../../services/CustomerCreditCardService";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import { toast } from "react-hot-toast";
import {
  setSearchTerm,
  setSelectedSearchCriteria,
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setCustomerCreditCardEditData,
  setViewDetail,
  resetChanges,
  setCustomerCreditCardData,
  resetCreditCardSearchFilter,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../../redux/CustomerCreditCardSlice";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

const CustomerCreditCardMainPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.customerCreditCardReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerCreditCardReducer.selectedSearchCriteria
  );

  const pageNumber = useSelector((state) => state.customerCreditCardReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerCreditCardReducer.totalPages);
  const customerCreditCardData = useSelector(
    (state) => state.customerCreditCardReducer.customerCreditCardData
  );
  const totalElements = useSelector((state) => state.customerCreditCardReducer.totalElements);

  const [loader, setLoader] = useState(true);
  const customerId = params.customerId;

  const onHandleChangeView = () => {
    dispatch(setCustomerCreditCardEditData(undefined));
    dispatch(setViewDetail(undefined));
    dispatch(resetChanges());
  };
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerCreditCardData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={
            "/add-customer-credit-card/" + params.customerId + "/" + params.pageNumber + "/new-page"
          }
          handleNewOnClick={onHandleChangeView}
          closeButtonRoute={"/add-customer/" + customerId + "/" + pageNumber}
          handleCloseOnClick={() => {
            dispatch(resetCreditCardSearchFilter());
            dispatch(setCustomerCreditCardData([]));
            toast.success("Page Closed");
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CustomerCreditCardList loader={loader} />}
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
export default CustomerCreditCardMainPage;
