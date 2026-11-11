import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuarterScreenSearchFilter from "../../common/QuarterScreenSearchFilter";
import { PaginationComponent } from "../../common/PaginationComponent";
import CustomerDelayListing from "./CustomerDelayListing";
import CustomerDelayServices from "../../../services/CustomerDelayServices";
import {
  resetCustomerResource,
  setCustomerFKRedux,
  setDelaySelectedId,
} from "../../../redux/CustomerDelaySlice";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  setListingData,
  setPageNumber,
  setSearchCriteria,
  setSearchTerms,
  setTotalElements,
  setTotalPages,
  setNormalSortValue,
  setNormalSortFlag,
} from "../../../redux/CustomerDelaySlice";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";
import toast from "react-hot-toast";

const CustomerDelayBrowse = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.customerDelaySlice.searchTerm);
  const searchCriteria = useSelector((state) => state.customerDelaySlice.searchCriteria);
  const pageNumber = useSelector((state) => state.customerDelaySlice.pageNumber);
  const totalPages = useSelector((state) => state.customerDelaySlice.totalPages);
  const totalElements = useSelector((state) => state.customerDelaySlice.totalElements);
  const listingData = useSelector((state) => state.customerDelaySlice.listingData);

  const [loader, setLoader] = useState(true);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  useEffect(() => {
    dispatch(setCustomerFKRedux(param.cpk));
  });

  const handleCloseRoute = () => {
    dispatch(setSearchTerms(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setListingData([]));
    dispatch(setPageNumber(0));
    dispatch(setDelaySelectedId(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    toast.success("Page Closed");
  };
  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/add-customer-delay/" + param.cpk + "/" + param.pageNumber + "/new-page"}
          closeButtonRoute={"/add-customer/" + param.cpk + "/" + param.pageNumber}
          handleCloseOnClick={handleCloseRoute}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CustomerDelayListing loader={loader} setLoader={setLoader} />}
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

export default CustomerDelayBrowse;
