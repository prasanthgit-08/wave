import React from "react";
import { Col } from "react-bootstrap";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import PayDriverBrowseFilter from "./PayDriverBrowseFilter";
import PayDriverBrowseFooter from "./PayDriverBrowseFooter";
import PayDriverBrowseListing from "./PayDriverBrowseListing";
import { PaginationComponent } from "../../../../common/PaginationComponent";
import { No_Of_Record_per_page } from "../../../../../services/constants/applicationConstants";
import { useSelector } from "react-redux";
import { setPageNumber } from "../../../../../redux/ProcessPaySlice";

function PayDriverBrowseTemplate() {
  const pageNumber = useSelector((state) => state.processShuttlePayReducer.pageNumber);
  const totalPages = useSelector((state) => state.processShuttlePayReducer.totalPages);
  const processPayData = useSelector((state) => state.processShuttlePayReducer.processPayData);
  const totalElements = useSelector((state) => state.processShuttlePayReducer.totalElements);
  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: processPayData,
  };

  return (
    <div className={`container-fluid table-bordered ${styles.threeByForthMainContainer}`}>
      <div className={`row`}>
        <Col className={`border border-dark border-2 halfScreenWidth`} sm={9} xs={9}>
          <PayDriverBrowseFilter />
          <div className="row border border-dark border-1 border-top-0">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0 width-sub-quarter-screen border border-dark border-top-0 border-left-0 border-right-0">
              <div className={`d-flex ${styles.forthScreen01} overflow-auto`} style={{ height: "617px" }}>
                <div className="w-100">
                  <PayDriverBrowseListing />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={No_Of_Record_per_page}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                />
              </div>
            </div>
          </div>
          <PayDriverBrowseFooter />
        </Col>
      </div>
    </div>
  );
}

export default PayDriverBrowseTemplate;
