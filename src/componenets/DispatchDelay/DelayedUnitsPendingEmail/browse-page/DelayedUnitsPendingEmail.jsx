import React, { useState } from "react";
import QuarterScreenTemplate from "../../../Templates/QuarterScreenTemplate";
import {
  HALF_SCREEN_HEIGHT,
  HALF_SCREEN_TABLE_LISTING_HEIGHT,
  HALF_SCREEN_WIDTH,
} from "../../../../constants/screenSizes";
import SearchFilterComponent from "../../../common/SearchFilterComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HalfScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import { PaginationComponent } from "../../../common/PaginationComponent";
import TableListing from "./TableListing";
import {
  updateField,
  setSearchTerm,
  setSearchCriteria,
  setSelectedStatus,
  setSearchStatus,
  setType,
  setPageNumber,
  resetFields,
} from "../../../../redux/DelayedUnitsPendingEmailSlice";
import toast from "react-hot-toast";

const DelayedUnitsPendingEmail = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.delayedUnitsPendingEmail.searchTerm);
  const searchCriteria = useSelector((state) => state.delayedUnitsPendingEmail.searchCriteria);
  const selectedStatus = useSelector((state) => state.delayedUnitsPendingEmail.selectedStatus);
  const listingData = useSelector((state) => state.delayedUnitsPendingEmail.listingData);
  const pageNumber = useSelector((state) => state.delayedUnitsPendingEmail.pageNumber);
  const totalPages = useSelector((state) => state.delayedUnitsPendingEmail.totalPages);
  const totalElements = useSelector((state) => state.delayedUnitsPendingEmail.totalElements);
  const searchStatus = useSelector((state) => state.delayedUnitsPendingEmail.searchStatus);
  const type = useSelector((state) => state.delayedUnitsPendingEmail.type);

  const navigate = useNavigate();

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
    loading,
  };

  const updateData = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const onClose = () => {
    toast.success("Page closed");
    dispatch(resetFields());
  };
  return (
    <QuarterScreenTemplate
      screenWidth={HALF_SCREEN_WIDTH}
      screenHeight={HALF_SCREEN_HEIGHT}
      tableListingHeight={HALF_SCREEN_TABLE_LISTING_HEIGHT}
      SearchFilterComponent={
        <SearchFilterComponent
          isNormalSearchFilter
          handleNewOnClick={() => {}}
          closeButtonRoute={`/`}
          handleCloseOnClick={onClose}
          globalSearchTerm={searchTerm}
          setGlobalSearchTerm={setSearchTerm}
          firstRadioGroupValue={searchCriteria}
          customSecondRadioGroupOptions={["All", "Delays", "Breakdowns", "Damages"]}
          customThirdRadioGroupOptions={["All", "New", "Updates", "Releases"]}
          setFirstRadioGroupValue={setSearchCriteria}
          secondRadioGroup={true}
          secondRadioGroupValue={searchStatus}
          setSecondRadioGroupValue={setSearchStatus}
          thirdRadioGroup
          thirdRadioGroupValue={type}
          setThirdRadioGroupValue={setType}
          setPageNumber={setPageNumber}
        />
      }
      TableListingComponent={<TableListing loading={loading} setLoading={setLoading} />}
      PaginationComponent={
        <PaginationComponent
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

export default DelayedUnitsPendingEmail;
