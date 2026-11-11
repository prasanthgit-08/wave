import React from "react";
import CCListing from "./CCListing";
import { useParams } from "react-router-dom";
import { PaginationComponent } from "../../../common/PaginationComponent";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setTotalElements,
  setCustomerContactData,
  setTotalPages,
  setViewDetail,
  resetChanges,
  setEditFormData,
  setNormalSortFlag,
  setNormalSortValue,
  setChangeColor,
} from "../../../../redux/CustomerContactSlice";
import CustomerContactService from "../../../../services/CustomerContactService";
import {
  QuarterScreen_RecordsPerPage,
  ThreeForthScreen_RecordsPerPage,
} from "../../../../services/constants/applicationConstants";
import ThreeFourthScreenTemplate from "../../../Templates/ThreeFourthScreenTemplate";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import toast from "react-hot-toast";

const CCMainPage = () => {
  const param = useParams();
  const customerId = param.customerId;
  const pageNumber = useSelector((state) => state.customerContactReducer.pageNumber);
  const totalElements = useSelector((state) => state.customerContactReducer.totalElements);
  const totalPages = useSelector((state) => state.customerContactReducer.totalPages);
  const customerContactData = useSelector((state) => state.customerContactReducer.customerContactData);
  const searchTerm = useSelector((state) => state.customerContactReducer.searchTerm);
  const searchCriteria = useSelector((state) => state.customerContactReducer.searchCriteria);

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  const handleClickNew = () => {
    dispatch(setEditFormData(undefined));
    dispatch(resetChanges());
    dispatch(setViewDetail(undefined));
  };

  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerm(""));
    dispatch(setChangeColor(false));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    toast.success("page closed");
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerContactData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/add-customer-contacts/" + param.customerId + "/" + param.pageNumber + "/new-page"}
          handleNewOnClick={handleClickNew}
          closeButtonRoute={"/add-customer/" + param.customerId + "/" + param.pageNumber}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<CCListing loader={loader} />}
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

export default CCMainPage;
