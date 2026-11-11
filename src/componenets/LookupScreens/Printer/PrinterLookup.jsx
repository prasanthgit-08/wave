/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setSelectedSearchCriteria,
  setSearchTerm,
  setPageNumberPrinterLookup,
  resetSearchSettingsPrinter,
} from "../../../redux/LookupScreens/PrinterLookupSlice";

const PrinterLookup = ({ show, onHide, renderItemId, handleLookupSelection, MaintenanceProgram }) => {
  // --------------------------------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
  };

  const dispatch = useDispatch();
  const pageNumberPrinterLookup = useSelector((state) => state.printerLookupReducer.pageNumberPrinterLookup);
  const totalPages = useSelector((state) => state.printerLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.printerLookupReducer.totalElements);
  const printerData = useSelector((state) => state.printerLookupReducer.printerData);
  const selectedSearchCriteria = useSelector((state) => state.printerLookupReducer.selectedSearchCriteria);

  const searchTerm = useSelector((state) => state.printerLookupReducer.searchTerm);

  useEffect(() => {
    if (show === true) {
      dispatch(resetSearchSettingsPrinter());
    }
  }, [show]);
  const paginationProps = {
    pageNumber: pageNumberPrinterLookup,
    setPageNumber: setPageNumberPrinterLookup,
    totalPages,
    totalElements,
    listingData: printerData,
  };
  return (
    <Col xs={12}>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        className="orderModal smallScreen"
        dialogClassName={`modal-left lookupFix`}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Printer Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid table-bordered lookup-container">
            <div className="row">
              <div className="border border-dark border-2 lookup-width">
                {/* Pass required states & functions as properties to this common component */}

                <SearchFilterNSort
                  globalSearchTerm={searchTerm}
                  setGlobalSearchTerm={setSearchTerm}
                  selectedSearchCriteria={selectedSearchCriteria}
                  setSelectedSearchCriteria={setSelectedSearchCriteria}
                  setPageNumber={setPageNumberPrinterLookup}
                  normalSearchFilter
                  handleClose={onHide}
                />
                <div className="row border border-dark border-1 lookup-height lookup-fit-height-smallscreen">
                  <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
                    <div className="d-flex h-100">
                      <div className="w-100">
                        <TableListing {...lookupProps} />
                      </div>

                      <PaginationComponent
                        {...paginationProps}
                        firstPage
                        lastPage
                        singleArrowUp
                        singleArrowDown
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default PrinterLookup;
