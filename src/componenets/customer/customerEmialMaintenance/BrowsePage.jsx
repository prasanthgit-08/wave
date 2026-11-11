import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../../common/PaginationComponent";
import { useParams } from "react-router-dom";
import { QuarterScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import CustomerEmailListing from "./CustomerEmailListing";
import { setPageNumberEmail } from "../../../redux/CustomerEmailMaintenanceSlice";
import { useSelector, useDispatch } from "react-redux";
import QuarterScreenSearchFilter from "../../common/QuarterScreenSearchFilter";
import CustomerEmailMaintenance from "../../../services/CustomerEmailMaintenanceService";
import { setTotalPages, setTotalElements } from "../../../redux/CustomerEmailMaintenanceSlice";
import { setcustomerData, setRadioType, setSearchType } from "../../../redux/CustomerEmailSearchFilterSlice";
import {
  setCustomerFKRedux,
  setSelectedId,
  setNormalSortFlag,
  setNormalSortValue,
} from "../../../redux/CustomerEmailMaintenanceSlice";
import QuarterScreen from "../../../styles/QuarterScreen.module.css";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";
import toast from "react-hot-toast";

function BrowsePage() {
  const param = useParams();
  const dispatch = useDispatch();

  const cutomerData = useSelector((state) => state.customerEmailSearchFilter.customerData);
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.customerEmailMaintenance);
  const radioType = useSelector((state) => state.customerEmailSearchFilter.radioType);
  const searchType = useSelector((state) => state.customerEmailSearchFilter.searchType);
  const selectedId = useSelector((state) => state.customerEmailMaintenance.selectedId);

  const [loader, setLoader] = useState(true);

  // Pagination properties
  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumberEmail,
    totalPages,
    totalElements,
    listingData: cutomerData,
  };

  useEffect(() => {
    dispatch(setCustomerFKRedux(param.cpk));
  });

  const handleCloseRoute = () => {
    dispatch(setcustomerData([]));
    dispatch(setSelectedId(""));
    dispatch(setPageNumberEmail(0));
    dispatch(setRadioType("Beginning"));
    dispatch(setSearchType(""));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    toast.success("Page Closed");
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/customer-email-maintenance/" + param.cpk + "/" + param.pageNumber + "/new-page"}
          closeButtonRoute={"/add-customer/" + param.cpk + "/" + param.pageNumber}
          handleCloseOnClick={handleCloseRoute}
          globalSearchTerm={searchType}
          setGlobalSearchTerm={setSearchType}
          firstRadioGroupValue={radioType}
          setFirstRadioGroupValue={setRadioType}
          setPageNumber={setPageNumberEmail}
        />
      }
      TableListingComponent={<CustomerEmailListing loader={loader} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          recordsPerPage={QuarterScreen_RecordsPerPage}
        />
      }
    />
  );
}

export default BrowsePage;
