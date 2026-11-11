import React from "react";
import { Modal } from "react-bootstrap";

const FullScreenLookupTemplate = ({
  show,
  onHide,
  lookupTitle,
  SearchFilterComponent,
  TableListingComponent,
  PaginationComponent,
  showAdvancedSearch, // state variable
  AdvancedSearchComponent,
  showAdvancedSort, // state variable
  AdvancedSortComponent,
  hasSearchSidebar, // property for rendering search sidebar
  AdvancedSearchSidebarComponent,
  extraLargeScreen, // property for styling extra large screens
  customFitHeightClass,
  customMinimumHeightClass,
  minWidthClassName,
  isInnerLookupsOpen,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className={`fullScreenLookupModal ${minWidthClassName || ""}`}
      dialogClassName={`modal-left lookupFix my-0`}
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-18 h-100">{lookupTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid table-bordered">
          <div className="row">
            <div className="border border-dark border-2">
              {SearchFilterComponent}
              <div
                className={`row border border-dark border-1 ${
                  customFitHeightClass || "fullScreenLookupFitHeight"
                }`}
              >
                <div
                  className={`p-r-0 p-l-0 ${
                    hasSearchSidebar && showAdvancedSearch
                      ? extraLargeScreen
                        ? "col-8"
                        : "col-7"
                      : extraLargeScreen
                        ? "col-10"
                        : "col-9"
                  }`}
                >
                  <div className="d-flex h-100">
                    <div className="w-100">{TableListingComponent}</div>
                    {PaginationComponent}
                  </div>
                </div>

                <div
                  className={`${
                    hasSearchSidebar && showAdvancedSearch
                      ? extraLargeScreen
                        ? "col-md-2 col-sm-2 col-2 col-lg-2"
                        : "col-md-3 col-sm-3 col-3 col-lg-3"
                      : extraLargeScreen
                        ? "col-md-2 col-sm-2 col-2 col-lg-2"
                        : "col-md-3 col-sm-3 col-3 col-lg-3"
                  }  border border-dark border-1 border-top-0 border-right-0 border-left-0`}
                >
                  <div
                    className={`row border-bottom-2px ${
                      customMinimumHeightClass || "fullScreenLookupMinHeight50"
                    }`}
                  >
                    {showAdvancedSearch && <>{AdvancedSearchComponent}</>}
                  </div>
                  <div
                    className={`row height-fix-2 ${customMinimumHeightClass || "fullScreenLookupMinHeight50"}`}
                  >
                    {showAdvancedSort && <>{AdvancedSortComponent}</>}
                  </div>
                </div>

                {hasSearchSidebar && showAdvancedSearch && (
                  <div className="col-2 border border-dark border-2 border-top-0 border-right-0 border-bottom-0">
                    {AdvancedSearchSidebarComponent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      {isInnerLookupsOpen && <div className="outerModalOverlay" />}
    </Modal>
  );
};

export default FullScreenLookupTemplate;
