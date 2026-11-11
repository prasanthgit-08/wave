import React from "react";
import { QUARTER_SCREEN_HEIGHT, QUARTER_SCREEN_WIDTH } from "../../constants/screenSizes";

const QuarterScreenTemplate = ({
  SearchFilterComponent,
  TableListingComponent,
  PaginationComponent,
  FooterComponent,
  screenWidth,
  screenHeight,
  quarterScreenWidth = QUARTER_SCREEN_WIDTH,
  quarterScreenHeight = QUARTER_SCREEN_HEIGHT,
  tableListingHeight,
  quarterScreenBrowseHeight = "", // 465px
  tableListingHeightClass = "",
  quarterScreenBrowseHeightClass = "",
  tableListingClassName = "",
  contentHieght,
}) => {
  return (
    <div className="container-fluid table-bordered customContainer">
      <div className="row">
        <div
          className="border border-dark border-2 quarterScreenWidth" /* quarterScreenWidth */
          style={{
            width: screenWidth || quarterScreenWidth,
            height: screenHeight || quarterScreenHeight,
            minWidth: screenWidth || quarterScreenWidth,
          }}
        >
          {/* <QuarterScreenSearchFilter
            searchTerm={searchTerm}
            searchCriteria={searchCriteria}
            pageNumber={pageNumber}
            addNewRoute={`/customer-order-users/${customerId}/${customerPageNo}/new-record`}
            closeRoute={`/add-customer/${customerId}/${customerPageNo}`}
            setSearchTerm={setSearchTerm}
            setSearchCriteria={setSearchCriteria}
            setPageNumber={setPageNumber}
            fetchTableData={fetchTableData}
            handleClickNew={handleClickNew}
            handleClickClose={() => dispatch(resetRequiredChanges())}
          /> */}
          {SearchFilterComponent}
          <div
            className={`row border border-dark border-1 ${
              tableListingClassName ||
              tableListingHeightClass ||
              quarterScreenBrowseHeightClass ||
              (!tableListingHeight && !quarterScreenBrowseHeight && "quarterScreenBrowseHeight")
            }`}
            style={{ height: tableListingHeight || quarterScreenBrowseHeight || "" }}
          >
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div style={{ height: contentHieght }} className={`d-flex ${contentHieght ? "" : "h-100"}`}>
                <div className="w-100">
                  {/* <TableListing customerURL={`${customerId}/${customerPageNo}`} loading={loading} /> */}
                  {TableListingComponent}
                </div>
                {/* <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={QuarterScreen_RecordsPerPage}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                /> */}
                {PaginationComponent}
              </div>
            </div>
          </div>
          {FooterComponent}
        </div>
      </div>
    </div>
  );
};

export default QuarterScreenTemplate;
