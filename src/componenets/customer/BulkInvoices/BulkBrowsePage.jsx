import React, { useState } from "react";
import { PaginationComponent } from "../../common/PaginationComponent";
import BulkInvoiceFilter from "./BulkInvoiceFilter";
import BulkInvoiceListing from "./BulkInvoiceListing";
import { useSelector } from "react-redux";
import {
  setPageNumberInvoice,
  setNormalSortFlag,
  setNormalSortValue,
  setRadioType,
  setSelectedStatus,
  setPageNumber,
  setSearchTerms,
  setSelecteActiveType,
  setSelectedValue,
  setsearchCriteria,
  setSearchCriteria,
  setSelectedIdInvoice,
} from "../../../redux/CustomerBulkInvoiceSlice";
import { ThreeForthScreen_RecordsPerPage } from "../../../services/constants/applicationConstants";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SearchFilterComponent from "../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../Templates/QuarterScreenTemplate";
import toast from "react-hot-toast";

function BulkBrowsePage() {
  const { pageNumber, totalPages, totalElements } = useSelector((state) => state.customerBulkInvoice);
  const { customerData } = useSelector((state) => state.customerBulkInvoice);
  const params = useParams();
  const id = params.cpk;
  const pageNum = params.pageNumber;
  const [loader, setLoader] = useState(true);
  const searchCriteria = useSelector((state) => state.customerBulkInvoice.searchCriteria);
  const searchTerms = useSelector((state) => state.customerBulkInvoice.searchTerms);
  const selecteActiveType = useSelector((state) => state.customerBulkInvoice.selecteActiveType);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setPageNumber(0));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setSearchTerms(""));
    dispatch(setPageNumberInvoice(0));
    dispatch(setSelectedIdInvoice(""));
    dispatch(setSelecteActiveType("All"));
    dispatch(setNormalSortFlag(false));
    dispatch(setNormalSortValue(null));
    toast.success("Page Closed");
  };
  const paginationProps = {
    pageNumber,
    setPageNumber: setPageNumberInvoice,
    totalPages,
    totalElements,
    listingData: customerData,
  };

  return (
    <QuarterScreenTemplate
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          newButtonRoute={"/bulk-invoices/" + id + "/" + pageNum + "/add-bulkinvoice"}

          closeButtonRoute={"/add-customer/" + id + "/" + pageNumber}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerms}
          setGlobalSearchTerm={setSearchTerms}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroup
          secondRadioGroupValue={selecteActiveType}
          customSecondRadioGroupOptions={["All", "Active", "Closed"]}
          setSecondRadioGroupValue={setSelecteActiveType}
          setPageNumber={setPageNumber}
        />
      }

      TableListingComponent={<BulkInvoiceListing />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
        />
      }
    />
  );
}

export default BulkBrowsePage;
