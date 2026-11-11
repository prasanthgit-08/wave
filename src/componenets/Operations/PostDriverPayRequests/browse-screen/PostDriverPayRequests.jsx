import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import { HALF_SCREEN_HEIGHT, HALF_SCREEN_WIDTH } from "../../../../constants/screenSizes";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { HalfScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import {
  setSearchTerm,
  setSearchCriteria,
  setPageNumber,
  setSelectedId,
  setSortValue,
  setSortType,
  setTotalPages,
  setTotalElements,
  setListingData,
  resetChanges,
} from "../../../../redux/PostPayRequestSlice";

const PostDriverPayRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Get states from Redux
  const pageNumber = useSelector((state) => state.postPayRequestSlice.pageNumber);
  const totalPages = useSelector((state) => state.postPayRequestSlice.totalPages);
  const totalElements = useSelector((state) => state.postPayRequestSlice.totalElements);
  const listingData = useSelector((state) => state.postPayRequestSlice.listingData);
  const searchTerm = useSelector((state) => state.postPayRequestSlice.searchTerm);
  const searchCriteria = useSelector((state) => state.postPayRequestSlice.searchCriteria);
  const sortValue = useSelector((state) => state.postPayRequestSlice.sortValue);
  const sortType = useSelector((state) => state.postPayRequestSlice.sortType);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  const handleCloseOnClick = () => {
    navigate("/post-driver-pay-requests");
    dispatch(setSelectedId(null));
    dispatch(resetChanges());
  };

  useEffect(() => {
    dispatch(setPageNumber(0));
  }, []);

  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={"650px"}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          handleCloseOnClick={handleCloseOnClick}
          closeButtonRoute="/"
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          setFirstRadioGroupValue={setSearchCriteria}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
          loading={loading}
          {...paginationProps}
          recordsPerPage={HalfScreen_RecordsPerPage}
          firstPage
          lastPage
          singleArrowUp
          singleArrowDown
        />
      }
    />
  );
};

export default PostDriverPayRequests;
