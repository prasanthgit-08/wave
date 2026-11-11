import React from "react";
import { Col } from "react-bootstrap";
import styles from "../../styles/ThreeQuarterScreen.module.css";

const ThreeFourthScreenTemplate = ({ SearchFilterComponent, TableListingComponent, PaginationComponent }) => {
  return (
    <div className={`container-fluid table-bordered ${styles.threeByForthMainContainer}`}>
      <div className={`row ${styles.threeByForthMain}`}>
        <Col className={`border border-dark border-2 ${styles.threeByForthMain}`} sm={9} xs={9}>
          {/* <QuarterScreenSearchFilter
            searchTerm={searchTerm}
            searchCriteria={searchCriteria}
            pageNumber={pageNumber}
            addNewRoute={'/add-customer-contacts/' + param.customerId + '/' + param.pageNumber + '/new-page'}
            closeRoute={'/add-customer/' + param.customerId + '/' + param.pageNumber}
            setSearchTerm={setSearchTerm}
            setSearchCriteria={setSearchCriteria}
            setPageNumber={setPageNumber}
            fetchTableData={fetchTableData}
            handleClickNew={handleClickNew}
            className="layout-1"
          /> */}
          {SearchFilterComponent}
          <div className="row border border-dark border-1 full-height-01 quarter-fit-height">
            <div className=" col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0 width-sub-quarter-screen">
              <div className={`d-flex ${styles.forthScreen01} reserveCustomHeight`}>
                <div className="w-100">
                  {/* <CCListing loader={loader} /> */}
                  {TableListingComponent}
                </div>
                {/* <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={ThreeForthScreen_RecordsPerPage}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                /> */}
                {PaginationComponent}
              </div>
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default ThreeFourthScreenTemplate;
