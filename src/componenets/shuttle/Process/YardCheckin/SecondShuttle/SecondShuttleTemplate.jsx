import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import styles from "../../../../../styles/QuarterScreen.module.css";

import { PaginationComponent } from "../../../../common/PaginationComponent";
import { useSelector } from "react-redux";
import SecondShuttleFooter from "./SecondShuttleFooter";
import SecondShuttleListing from "./SecondShuttleListing";
import SecondShuttleHeader from "./SecondShuttleHeader";
import { setPageNumber } from "../../../../../redux/YardCheckinSecondShuttleSlice";

function SecondShuttleTemplate() {
  const listingData = useSelector((state) => state.yardCheckinSecondShuttleReducer.listingData);
  const pageNumber = useSelector((state) => state.yardCheckinSecondShuttleReducer.pageNumber);
  const totalPages = useSelector((state) => state.yardCheckinSecondShuttleReducer.totalPages);
  const totalElements = useSelector((state) => state.yardCheckinSecondShuttleReducer.totalElements);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData,
  };

  return (
    <div className={`container-fluid table-bordered ${styles.threeByForthMainContainer}`}>
      <div className={`row`}>
        <Col className={`border border-dark border-2 quarterScreenWidth`} sm={9} xs={9}>
          <SecondShuttleHeader />
          <div className="row border border-dark border-1 border-top-0">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0 width-sub-quarter-screen border border-dark border-top-0 border-left-0 border-right-0">
              <div className={`d-flex ${styles.forthScreen01} overflow-auto`} style={{ height: "439px" }}>
                <div className="w-100">
                  <SecondShuttleListing />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={11}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
          </div>
          <SecondShuttleFooter />
        </Col>
      </div>
    </div>
  );
}

export default SecondShuttleTemplate;
