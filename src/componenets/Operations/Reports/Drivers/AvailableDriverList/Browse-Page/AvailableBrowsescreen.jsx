import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../../../../common/CommonFooter";
import Header from "../../../../../common/Header";
import { THREE_FOURTH_SCREEN_HEIGHT } from "../../../../../../constants/screenSizes";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { resetChanges, setPageNumber } from "../../../../../../redux/Reports/AvailableDriversSlice";
import ThreeFourthScreenWrapper from "../../../../../Templates/Screens/ThreeFourthScreenWrapper";

const AvailableBrowsescreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pageNumber, totalPages, totalElements, browseList, loading, selectedDriverPK } = useSelector(
    (state) => state.availableDriversSlice
  );

  const paginationProps = {
    pageNumber,
    setPageNumber: (page) => dispatch(setPageNumber(page)),
    totalPages,
    totalElements,
    listingData: browseList,
  };

  const footerButtons = [
    {
      label: "Comment",
      onClick: () => navigate(`/avaliable-driver-comments`),
      disabled: !selectedDriverPK,
    },
    {
      label: "Cancel",
      onClick: () => handleCancel(),
      disabled: false,
    },
  ];

  const handleCancel = () => {
    dispatch(resetChanges());
    dispatch(setPageNumber(0));
    navigate(`/available-driver-report`);
    // dispatch(setReportFlag(true));
  };

  return (
    <ThreeFourthScreenWrapper>
      <Header closeHandler={() => handleCancel()} hideBorderBottom />
      <div
        className="row g-0 border border-dark border-top "
        style={{ height: `calc(${THREE_FOURTH_SCREEN_HEIGHT} - 97px)` }}
      >
        <div className="d-flex h-100">
          <div className="w-100 ">
            <TableListing />
          </div>
          <PaginationComponent
            {...paginationProps}
            loading={loading}
            firstPage
            lastPage
            tripleArrowUp
            tripleArrowDown
            doubleArrowUp
            doubleArrowDown
            singleArrowUp
            singleArrowDown
          />
        </div>
      </div>
      <CommonFooter buttons={footerButtons} />
    </ThreeFourthScreenWrapper>
  );
};

export default AvailableBrowsescreen;
