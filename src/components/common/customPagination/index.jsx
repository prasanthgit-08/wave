/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import "./pagination.css";

/**
 * CustomPagination is a customizable React component for handling pagination.
 *
 * @param {number} pageNumber - The current page number.
 * @param {function} setPageNumber - Callback function to set the page number. (Action Creator from Redux)
 * @param {number} totalPages - The total number of pages.
 * @param {number} totalElements - The total number of elements to be paginated.
 * @param {number} numberOfElements - The number of elements currently displayed on the page.
 * @param {array} listingData - The data to be displayed on the page.
 * @param {number} recordsPerPage - The number of records to display per page.
 * @param {boolean} firstPage - Show the "First Page" button.
 * @param {boolean} lastPage - Show the "Last Page" button.
 * @param {boolean} tripleArrowUp - Show the "Triple Arrow Up" button.
 * @param {boolean} tripleArrowDown - Show the "Triple Arrow Down" button.
 * @param {boolean} doubleArrowUp - Show the "Double Arrow Up" button.
 * @param {boolean} doubleArrowDown - Show the "Double Arrow Down" button.
 * @param {boolean} singleArrowUp - Show the "Single Arrow Up" button.
 * @param {boolean} singleArrowDown - Show the "Single Arrow Down" button.
 * @param {boolean} borderThin - Use a thinner border style.
 * @param {boolean} hideBorderRight - Hide the right border.
 * @param {boolean} hideBorderLeft - Hide the left border.
 * @param {boolean} hideBorderTop - Hide the top border.
 * @param {boolean} hideBorderBottom - Hide the bottom border.
 */

const CustomPagination = ({
  pageNumber,
  setPageNumber,
  onPageChange,
  totalPages,
  totalElements,
  numberOfElements,
  listingData,
  recordsPerPage,
  firstPage,
  lastPage,
  tripleArrowUp,
  tripleArrowDown,
  doubleArrowUp,
  doubleArrowDown,
  singleArrowUp,
  singleArrowDown,
  borderThin,
  hideBorderRight,
  hideBorderLeft,
  hideBorderTop,
  hideBorderBottom,
  height,
  loading,
}) => {
  // -------------------------------------------------------
  const [onePercentPages, setOnePercentPages] = useState();
  const [tenPercentPages, setTenPercentPages] = useState();

  const goSingleArrowDown = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(pageNumber + 1);
      onPageChange && onPageChange(pageNumber + 1);
    }
  };

  const goDoubleArrowDownPage = () => {
    // move one percent or 10 pages down, whichever is greater
    // let onePercentRecords = (totalElements * 1) / 100;
    // let onePercentPages = Math.trunc(onePercentRecords / 15);
    if (onePercentPages > 10) {
      setPageNumber(pageNumber + onePercentPages);
      onPageChange && onPageChange(pageNumber + onePercentPages);
    } else {
      setPageNumber(pageNumber + 10);
      onPageChange && onPageChange(pageNumber + 10);
    }
  };

  const goTrippleArrowDownPage = () => {
    // move 10 percent or 100 pages down, whichever is greater
    if (tenPercentPages > 100) {
      setPageNumber(pageNumber + tenPercentPages);
      onPageChange && onPageChange(pageNumber + tenPercentPages);
    } else {
      setPageNumber(pageNumber + 100);
      onPageChange && onPageChange(pageNumber + 100);
    }
  };

  const goSingleArrowUp = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
      onPageChange && onPageChange(pageNumber - 1);
    }
  };

  const goDoubleArrowUpPage = () => {
    // move one percent or 10 pages up, whichever is greater
    if (onePercentPages > 10) {
      setPageNumber(pageNumber - onePercentPages);
      onPageChange && onPageChange(pageNumber - onePercentPages);
    } else {
      setPageNumber(pageNumber - 10);
      onPageChange && onPageChange(pageNumber - 10);
    }
  };

  const goTrippleArrowUpPage = () => {
    // move 10 percent or 100 pages up, whichever is greater
    if (tenPercentPages > 100) {
      setPageNumber(pageNumber - tenPercentPages);
      onPageChange && onPageChange(pageNumber - tenPercentPages);
    } else {
      setPageNumber(pageNumber - 100);
      onPageChange && onPageChange(pageNumber - 100);
    }
  };

  const setPercentPages = () => {
    let onePercentPages = Math.trunc((totalElements * 0.01) / recordsPerPage);
    let tenPercentPages = Math.trunc((totalElements * 0.1) / recordsPerPage);
    setOnePercentPages(onePercentPages);
    setTenPercentPages(tenPercentPages);
  };

  useEffect(() => {
    setPercentPages();
  }, [totalElements]);

  return (
    <div
      className={`border border-dark d-flex align-items-center justify-content-center 
        ${borderThin ? "" : "border-2"}
        ${hideBorderTop ? "border-top-0" : ""}
        ${hideBorderRight ? "border-right-0" : ""}
        ${hideBorderBottom ? "border-bottom-0" : ""}
        ${hideBorderLeft ? "border-left-0" : ""}
      `}
      style={height ? { height } : {}}
    >
      <Pagination className="d-flex flex-column w-40px border border-1 border-right-0 border-top-0 border-bottom-0">
        {firstPage && (
          <Pagination.First
            className="first-page"
            onClick={() => {
              setPageNumber(0);
              onPageChange && onPageChange(0);
            }}
            style={
              pageNumber === 0 || loading || totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
        {tripleArrowUp && (
          <Pagination.Prev
            className="tripplearrow-up"
            onClick={() => goTrippleArrowUpPage()}
            style={
              pageNumber < tenPercentPages || pageNumber < 100 || loading || totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
        {doubleArrowUp && (
          <Pagination.Prev
            className="prev-set"
            onClick={() => goDoubleArrowUpPage()}
            style={
              pageNumber < onePercentPages || pageNumber < 10 || loading || totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
        {singleArrowUp && (
          <Pagination.First
            className="prev-page"
            onClick={() => goSingleArrowUp()}
            style={
              pageNumber <= 0 || loading || totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
        {singleArrowDown && (
          <Pagination.Next
            className="next-page"
            onClick={() => goSingleArrowDown()}
            style={
              pageNumber === totalPages - 1 ||
              numberOfElements === 0 ||
              listingData?.length === 0 ||
              loading ||
              totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
        {doubleArrowDown && (
          <Pagination.Next
            className="next-set"
            onClick={() => goDoubleArrowDownPage()}
            style={
              pageNumber >= totalPages - onePercentPages ||
              pageNumber >= totalPages - 10 ||
              loading ||
              totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
        {tripleArrowDown && (
          <Pagination.Next
            className="tripplearrow-down"
            onClick={() => goTrippleArrowDownPage()}
            style={
              pageNumber >= totalPages - tenPercentPages ||
              pageNumber >= totalPages - 100 ||
              loading ||
              totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
        {lastPage && (
          <Pagination.Last
            className="last-page"
            onClick={() => {
              setPageNumber(totalPages - 1);
              onPageChange && onPageChange(totalPages - 1);
            }}
            style={
              pageNumber === totalPages - 1 ||
              numberOfElements === 0 ||
              listingData?.length === 0 ||
              loading ||
              totalElements === 0
                ? { pointerEvents: "none", opacity: 0.3 }
                : { pointerEvents: "fill", opacity: 1 }
            }
          />
        )}
      </Pagination>
    </div>
  );
};

export default CustomPagination;
