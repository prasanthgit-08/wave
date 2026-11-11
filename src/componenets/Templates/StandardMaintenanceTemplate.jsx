import React from "react";
import useWindowSizeForBreakpoint from "../../hooks/useWindowSizeForBreakpoint";
import { THREE_FOURTH_SCREEN_HEIGHT, THREE_FOURTH_SCREEN_WIDTH } from "../../constants/screenSizes";

const StandardMaintenanceTemplate = ({
  SearchFilterComponent,
  TableListingComponent,
  PaginationComponent,
  FooterComponent,
  showAdvancedSearch, // state variable
  AdvancedSearchComponent,
  showAdvancedSort, // state variable
  AdvancedSortComponent,
  hasSearchSidebar, // property for rendering search sidebar
  AdvancedSearchSidebarComponent,
  extraLargeScreen, // property for styling extra large screens
  customFitHeightClass,
  tableListingHeight,
  tableListingHalfHeightClass,
  customMinimumHeightClass,
  horizontalScrollMinWidth,
  screenWidth,
  screenHeight,
  standardMaintenanceWidth = THREE_FOURTH_SCREEN_WIDTH,
  standardMaintenanceHeight = THREE_FOURTH_SCREEN_HEIGHT,
  firstSidebarFilterLength = "235px",
}) => {
  const extraLargeScreenSearchFilterBreakpoint = 1550;
  const isBellowBreakpoint = useWindowSizeForBreakpoint(extraLargeScreenSearchFilterBreakpoint);

  // const extraLargeScreenScrollBreakpoint = 1480;
  // const isBellowScrollBreakpoint = useWindowSizeForBreakpoint(extraLargeScreenScrollBreakpoint);

  /**
   * fit-height - for 15 inch screens
   * fitHeightLargeScreen1, fitHeightLargeScreen2 - custom
   * TODO: add fit-height for 24 inch screens if required
   */

  return (
    <div className="container-fluid table-bordered customContainer">
      <div className="row">
        <div
          className="border border-dark border-2"
          style={{
            margin: "1px",
            // min width for scrollbars
            minWidth: `${
              horizontalScrollMinWidth
                ? horizontalScrollMinWidth
                : hasSearchSidebar && showAdvancedSearch
                  ? extraLargeScreen
                    ? "1480px"
                    : "1200px"
                  : extraLargeScreen
                    ? "1480px"
                    : screenWidth || "900px"
            }`,
            width: extraLargeScreen ? "" : screenWidth || standardMaintenanceWidth,
            height: extraLargeScreen ? "" : screenHeight || standardMaintenanceHeight,
          }}
        >
          {/* <SearchFilter
            setFirstField={setFirstField}
            setSecondField={setSecondField}
            setThirdField={setThirdField}
            setFourthField={setFourthField}
            setFifthField={setFifthField}
          /> */}
          {SearchFilterComponent}
          <div
            className={`row border border-dark border-1 ${
              customFitHeightClass ||
              (extraLargeScreen
                ? isBellowBreakpoint
                  ? "fitHeightLargeScreen1"
                  : "fitHeightLargeScreen2"
                : "fit-height")
            }`}
          >
            {/* <div className={`p-r-0 p-l-0 col-md-9 col-lg-9 col-9 col-lg-9`}> */}
            <div
              className={`p-r-0 p-l-0 ${
                hasSearchSidebar && showAdvancedSearch
                  ? extraLargeScreen
                    ? "col-8"
                    : "col-8"
                  : extraLargeScreen
                    ? "col-10"
                    : "col-9"
              }`}
            >
              <div className="d-flex h-100">
                <div className="w-100">
                  {/* <CustomerListing /> */}
                  {TableListingComponent}
                </div>
                {/* <PaginationComponent
                  {...paginationProps}
                  firstPage
                  lastPage
                  tripleArrowUp
                  tripleArrowDown
                  doubleArrowUp
                  doubleArrowDown
                  singleArrowUp
                  singleArrowDown
                /> */}
                {PaginationComponent}
              </div>
            </div>

            <div
              className={`${
                hasSearchSidebar && showAdvancedSearch
                  ? extraLargeScreen
                    ? "col-2"
                    : "col-2"
                  : extraLargeScreen
                    ? "col-2"
                    : "col-3"
              }  border border-dark border-1 border-top-0 border-right-0 border-left-0`}
              style={{ minWidth: hasSearchSidebar && showAdvancedSearch ? firstSidebarFilterLength : "" }}
            >
              {/* <div className="height-fix-1 min-h-50 row border-bottom-2px"> */}
              <div
                className={`row border-bottom-2px ${!tableListingHeight && (tableListingHalfHeightClass || customMinimumHeightClass || "min-h-50")}`}
                style={{ height: `${parseFloat(tableListingHeight) / 2}px` }}
              >
                {showAdvancedSearch && (
                  <>
                    {/* <AdvancedSearchComponent
                      fiveFieldSearch
                      advancedSearchObject={advancedSearchObject}
                      setAdvancedSearchObject={setAdvancedSearchObject}
                      firstFieldName={'Description'}
                      secondFieldName={'Name'}
                      thirdFieldName={'DBA'}
                      fourthFieldName={'City'}
                      fifthFieldName={'State'}
                      customFifthField={(fifthField) => fifthField.toUpperCase()}
                      maxLengthFifthField={2}
                      widthFifthField={'40px'}
                      setPageNumber={setPageNumber}
                      advancedSearchPayload={searchedCustomer}
                      updateAdvancedSearchPayload={() => {
                        dispatch(
                          setSearchedCustomer({
                            description: advancedSearchObject.firstField,
                            name: advancedSearchObject.secondField,
                            dba: advancedSearchObject.thirdField,
                            city: advancedSearchObject.fourthField,
                            stateCode: advancedSearchObject.fifthField,
                          })
                        );
                      }}
                    /> */}
                    {AdvancedSearchComponent}
                  </>
                )}
              </div>
              <div
                className={`row height-fix-2 ${!tableListingHeight && (tableListingHalfHeightClass || customMinimumHeightClass || "min-h-50")}`}
                style={{ height: `${parseFloat(tableListingHeight) / 2}px` }}
              >
                {showAdvancedSort && (
                  <>
                    {/* <AdvanceSort
                      setFirstField={setFirstField}
                      setSecondField={setSecondField}
                      setThirdField={setThirdField}
                      setFourthField={setFourthField}
                      setFifthField={setFifthField}
                    /> */}
                    {AdvancedSortComponent}
                  </>
                )}
              </div>
            </div>

            {hasSearchSidebar && showAdvancedSearch && (
              <div className="col border border-dark border-2 border-top-0 border-right-0 border-bottom-0">
                {/* <DealerAdvancedSearchSidebar /> */}
                {AdvancedSearchSidebarComponent}
              </div>
            )}
          </div>
          {FooterComponent}
        </div>
      </div>
    </div>
  );
};

export default StandardMaintenanceTemplate;
