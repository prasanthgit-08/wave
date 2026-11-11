import React from "react";
import { toast } from "react-hot-toast";
import COBListing from "./COBListing";
import { useSelector, useDispatch } from "react-redux";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { QuarterScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import CustomerOpenBalanceService from "../../../../services/CustomerOpenBalanceService";

import { t } from "i18next";
import {
  setSearchTerm,
  setSelectedSearchCriteria,
  setPageNumber,
  setCustomerFK,
  openBalanceSearchFilter,
  setCustomerOpenBalanceData,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
  setCobData,
  setNormalSortFlag,
  setNormalSortValue,
  setSelecteActiveType,
  setChangeColor,
} from "../../../../redux/customerOpenBalanceSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";

const COBMainPage = () => {
  const [customerOpenBalance, setCustomerOpenBalance] = useState([]);
  const [loader, setLoader] = useState(true);

  const searchTerm = useSelector((state) => state.customerOpenBalanceReducer.searchTerm);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerOpenBalanceReducer.selectedSearchCriteria
  );
  const pageNumber = useSelector((state) => state.customerOpenBalanceReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerOpenBalanceReducer.totalPages);
  const userData = useSelector((state) => state.customerOpenBalanceReducer.cobData);
  const selecteActiveType = useSelector((state) => state.customerOpenBalanceReducer.selecteActiveType);

  const totalElements = useSelector((state) => state.customerOpenBalanceReducer.totalElements);

  const globalSearchTerm = useSelector((state) => state.customerOpenBalanceReducer.searchTerm);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: userData,
  };

  const params = useParams();
  const customerFK = params.customerPK;
  const customerPageNumber = params.customerPageNumber;
  const dispatch = useDispatch();

  const handleCloseRoute = () => {
    dispatch(setCustomerOpenBalanceData([]));
    dispatch(setCobData([]));
    dispatch(setSelectedSearchCriteria("Beginning"));
    dispatch(setChangeColor(false));
    dispatch(setPageNumber(0));
    dispatch(setSearchTerm(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    dispatch(setSelecteActiveType("Active"));
    toast.success("Page Closed");
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/add-customer-open-balance/" + customerFK + "/" + customerPageNumber}
          closeButtonRoute={"/add-customer/" + customerFK + "/" + customerPageNumber}
          handleCloseOnClick={handleCloseRoute}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={selectedSearchCriteria}
          setFirstRadioGroupValue={setSelectedSearchCriteria}
          secondRadioGroup
          secondRadioGroupValue={selecteActiveType}
          setSecondRadioGroupValue={setSelecteActiveType}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<COBListing loader={loader} setLoader={setLoader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          recordsPerPage={QuarterScreen_RecordsPerPage}
          quarterScreen
        />
      }
    />
  );
};
export default COBMainPage;
