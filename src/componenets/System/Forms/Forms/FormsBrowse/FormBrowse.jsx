import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchFilterComponent from "../../../../common/SearchFilterComponent";
import ThreeFourthScreenTemplate from "../../../../Templates/ThreeFourthScreenTemplate";
import {
  setSearchTerm,
  resetForms,
  setResponseData,
  setPageNumber,
  setViewDetail,
  setSearchCriteria,
  setClearDetailForm,
} from "../../../../../redux/FormsSlice";
import FormsListing from "./FormsListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../../services/constants/applicationConstants";
import QuarterScreenTemplate from "../../../../Templates/QuarterScreenTemplate";
import { THREE_FOURTH_SCREEN_HEIGHT, THREE_FOURTH_SCREEN_WIDTH } from "../../../../../constants/screenSizes";

function FormBrowse() {
  const [loading, setLoading] = useState(false);

  const pageNumber = useSelector((state) => state.forms.pageNumber);
  const totalPages = useSelector((state) => state.forms.totalPages);
  const totalElements = useSelector((state) => state.forms.totalElements);
  const listingData = useSelector((state) => state.forms.listingData);
  const searchTerm = useSelector((state) => state.forms.searchTerm);
  const searchCriteria = useSelector((state) => state.forms.searchCriteria);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setClearDetailForm(false));
  }, []);

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
      quarterScreenWidth={THREE_FOURTH_SCREEN_WIDTH}
      quarterScreenHeight={THREE_FOURTH_SCREEN_HEIGHT}
      quarterScreenBrowseHeight="717px"
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          fullScreen
          newButtonRoute={"/forms-maintenance-edit"}
          handleNewOnClick={() => {
            dispatch(setResponseData(null));
            dispatch(setViewDetail(false));
          }}
          closeButtonRoute={"/"}
          handleCloseOnClick={() => {
            dispatch(resetForms());
          }}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<FormsListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          {...paginationProps}
          recordsPerPage={ThreeForthScreen_RecordsPerPage}
          firstPage
          lastPage
          doubleArrowUp
          doubleArrowDown
          singleArrowUp
          singleArrowDown
          height={"717px"}
        />
      }
    />
  );
}

export default FormBrowse;
