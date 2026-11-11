import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "react-bootstrap";
import DealerService from "../../../services/DealerService";
import { setDealerData } from "../../../redux/DealerSearchFilterSlice";
import "../../../styles/pagination/TlcPagination.css";
import {
  setPageNumber,
  setTotalElements,
  setTotalPages,
  setBrowseNavigation,
} from "../../../redux/PaginationSlice";

export const DealerPagination = () => {
  const [disableSingleArrowUP, setDisableSingleArrowUP] = useState(false);
  const [disableSingleArrowDown, setDisableSingleArrowDown] = useState(false);
  const [disableDoubleArrowUP, setDisableDoubleArrowUP] = useState(false);
  const [disableDoubleArrowDown, setDisableDoubleArrowDown] = useState(false);
  const [disableTrippleArrowUP, setDisableTrippleArrowUP] = useState(false);
  const [disableTrippleArrowDown, setDisableTrippleArrowDown] = useState(false);
  const [disableTopArrow, setDisableTopArrow] = useState(false);
  const [disableBottomArrow, setDisableBottomArrow] = useState(false);
  const [firstField, setFirstField] = React.useState(null);
  const [secondField, setSecondField] = React.useState(null);
  const [thirdField, setThirdField] = React.useState(null);
  const [fourthField, setFourthField] = React.useState(null);

  const dispatch = useDispatch();

  const pageNumber = useSelector((state) => state.paginationReducer.pageNumber);

  const totalPages = useSelector((state) => state.paginationReducer.totalPages);

  const totalElements = useSelector((state) => state.paginationReducer.totalElements);

  const selectedStatus = useSelector((state) => state.dealerSearchReducer.selectedStatus);

  const selectedSearchCriteria = useSelector((state) => state.dealerSearchReducer.selectedSearchCriteria);

  const searchedDealer = useSelector((state) => state.dealerSearchReducer.searchedDealer);

  const advanceSortingOrder = useSelector((state) => state.dealerSearchReducer.advanceSortingOrder);

  const searchTerms = useSelector((state) => state.dealerSearchReducer.searchTerms);

  const dealerData = useSelector((state) => state.dealerSearchReducer.dealerData);

  let sortFlag = useSelector((state) => state.dealerSearchReducer.normalSortFlag);

  let sortValue = useSelector((state) => state.dealerSearchReducer.normalSortValue);

  const selectedDealerStatus = useSelector((state) => state.dealerSearchReducer.selectedDealerStatus);

  useEffect(() => {
    browseNavigations(dealerData);
  }, [dealerData]);

  const fetchDealers = async (pageNumber) => {
    DealerService.getDealers(
      selectedStatus,
      pageNumber,
      searchedDealer,
      selectedSearchCriteria,
      advanceSortingOrder,
      searchTerms,
      sortValue,
      sortFlag,
      selectedDealerStatus
    ).then((response) => {
      const data = response.data;

      dispatch(setDealerData(data.content));
      dispatch(setTotalElements(data.totalElements));
      dispatch(setTotalPages(data.totalPages));
      dispatch(setBrowseNavigation(data));
      browseNavigations(data);
    });
  };

  const goSingleArrowUp = async () => {
    if (pageNumber > 0) {
      let num = pageNumber - 1;
      dispatch(setPageNumber(num));
      if (firstField == null) {
      }
    }
  };

  const goSingleArrowDown = async () => {
    if (pageNumber < totalPages - 1) var num = pageNumber + 1;

    dispatch(setPageNumber(num));

    if (firstField == null) {
    }
  };

  const goDoubleArrowUpPage = async () => {
    let onePercent = (totalElements * 1) / 100;

    let records = pageNumber * 10 - onePercent;
    let pages = Math.trunc(records / 10);

    let onePercentPages = Math.trunc(onePercent / 10);
    if (pageNumber > onePercentPages) {
      dispatch(setPageNumber(pages));

      if (firstField == null) {
      }
    } else {
      dispatch(setPageNumber(0));
    }
  };
  const goDoubleArrowDownPage = async () => {
    let onePercent = (totalElements * 1) / 100;

    let records = pageNumber * 10 + onePercent;
    let pages = Math.trunc(records / 10);

    let currentRecord = pageNumber * 10;
    if (currentRecord <= totalElements && currentRecord >= totalElements - onePercent) {
      setPageNumber(totalPages - 1);

      if (firstField == null) {
      }
    } else if (pages >= 10) {
      dispatch(setPageNumber(pages));

      if (firstField == null) {
      }
    } else {
      setPageNumber(pageNumber + 10);

      var num = pageNumber + 10;

      dispatch(setPageNumber(num));

      if (firstField == null) {
      }
    }
  };
  const goTrippleArrowUpPage = async () => {
    let tenPercent = (totalElements * 10) / 100;
    let records = pageNumber * 10 - tenPercent;
    let pages = Math.trunc(records / 10);
    let tenPercentPages = Math.trunc(tenPercent / 10);
    if (pageNumber > tenPercentPages) {
      dispatch(setPageNumber(pages));

      if (firstField == null) {
      }
    } else {
      dispatch(setPageNumber(0));

      if (firstField == null) {
      }
    }
  };
  const goTrippleArrowDownPage = async () => {
    let tenPercent = (totalElements * 10) / 100;
    let records = pageNumber * 10 + tenPercent;
    let pages = Math.trunc(records / 10);

    let currentRecord = pageNumber * 10;
    if (currentRecord <= totalElements && currentRecord >= totalElements - tenPercent) {
      setPageNumber(totalPages - 1);
      if (firstField == null) {
      }
    } else if (pages >= 10) {
      dispatch(setPageNumber(pages));

      if (firstField == null) {
      }
    } else {
      var num = pageNumber + 10;

      dispatch(setPageNumber(num));

      if (firstField == null) {
      }
    }
  };

  const onClickFirstPage = async () => {
    if (firstField == null) {
    }
  };

  const onClickLastPage = async () => {
    if (firstField == null) {
      fetchDealers(totalPages - 1);
    }
  };

  const browseNavigations = (browseNavigation) => {
    if (pageNumber > 0) {
      setDisableSingleArrowUP(false);
    } else {
      setDisableSingleArrowUP(true);
    }

    if (pageNumber >= totalPages - 1 && pageNumber !== 0) {
      setDisableDoubleArrowDown("setDisableSingleArrowDown");
      setDisableSingleArrowDown(true);
    } else {
      setDisableSingleArrowDown(false);
    }

    let onePercentPagesNow = Math.trunc(browseNavigation.totalPages * 0.01);
    let tenPercentPagesNow = Math.trunc(browseNavigation.totalPages * 0.1);

    if (pageNumber < onePercentPagesNow) {
      setDisableDoubleArrowUP(true);
    } else {
      setDisableDoubleArrowUP(false);
    }

    if (pageNumber > browseNavigation.totalPages - onePercentPagesNow) {
      setDisableDoubleArrowDown(true);
    } else {
      setDisableDoubleArrowDown(false);
    }

    if (pageNumber < tenPercentPagesNow) {
      setDisableTrippleArrowUP(true);
    } else {
      setDisableTrippleArrowUP(false);
    }

    if (pageNumber > browseNavigation.totalPages - tenPercentPagesNow) {
      setDisableTrippleArrowDown(true);
    } else {
      setDisableTrippleArrowDown(false);
    }

    if (pageNumber === 0) {
      setDisableTopArrow(true);
    } else {
      setDisableTopArrow(false);
    }

    if (pageNumber === totalPages - 1) {
      setDisableBottomArrow(true);
    } else {
      setDisableBottomArrow(false);
    }
  };

  return (
    <div className="h-100 border border-dark border-1 d-flex align-items-center justify-content-center border-top-0">
      <Pagination className="d-flex flex-column w-40px border border-1 border-right-0 border-top-0 border-bottom-0">
        <Pagination.First
          className="first-page"
          onClick={() => {
            dispatch(setPageNumber(0));
            onClickFirstPage();
          }}
          style={
            disableTopArrow === true
              ? { pointerEvents: "none", opacity: 0.3 }
              : { pointerEvents: "fill", opacity: 1 }
          }
        />
        <Pagination.Prev
          className="tripplearrow-up"
          onClick={() => goTrippleArrowUpPage()}
          style={
            pageNumber <= 100
              ? { pointerEvents: "none", opacity: 0.3 }
              : { pointerEvents: "fill", opacity: 1 }
          }
        />
        <Pagination.Prev
          className="prev-set"
          onClick={() => goDoubleArrowUpPage()}
          style={
            pageNumber <= 10 ? { pointerEvents: "none", opacity: 0.3 } : { pointerEvents: "fill", opacity: 1 }
          }
        />
        <Pagination.First
          className="prev-page"
          onClick={() => goSingleArrowUp()}
          style={
            pageNumber <= 0 ? { pointerEvents: "none", opacity: 0.3 } : { pointerEvents: "fill", opacity: 1 }
          }
        />
        <Pagination.Next
          className="next-page"
          onClick={() => goSingleArrowDown()}
          style={
            totalElements <= 10
              ? { pointerEvents: "none", opacity: 0.3 }
              : { pointerEvents: "fill", opacity: 1 }
          }
        />
        <Pagination.Next
          className="next-set"
          onClick={() => goDoubleArrowDownPage()}
          style={
            totalElements <= 100
              ? { pointerEvents: "none", opacity: 0.3 }
              : { pointerEvents: "fill", opacity: 1 }
          }
        />
        <Pagination.Next
          className="tripplearrow-down"
          onClick={() => goTrippleArrowDownPage()}
          style={
            totalElements <= 1000
              ? { pointerEvents: "none", opacity: 0.3 }
              : { pointerEvents: "fill", opacity: 1 }
          }
        />
        <Pagination.Last
          className="last-page"
          onClick={() => {
            dispatch(setPageNumber(totalPages - 1));
            onClickLastPage();
          }}
          style={
            disableBottomArrow === true || totalElements <= 10
              ? { pointerEvents: "none", opacity: 0.3 }
              : { pointerEvents: "fill", opacity: 1 }
          }
        />
      </Pagination>
    </div>
  );
};
