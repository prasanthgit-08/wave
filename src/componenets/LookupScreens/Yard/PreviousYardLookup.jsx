/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberYardLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsYard,
} from "../../../redux/LookupScreens/YardLookupSlice";

const YardLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  OrderEntry,
  MaintenanceProgram,
  customFetchFunction,
  OECustomerPickupYard,
  OECustomerDeliveryYard,
}) => {
  // --------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    OrderEntry,
    MaintenanceProgram,
    customFetchFunction,
    OECustomerPickupYard,
    OECustomerDeliveryYard,
  };

  const pageNumberYardLookup = useSelector((state) => state.yardLookupReducer.pageNumberYardLookup);
  const totalPages = useSelector((state) => state.yardLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.yardLookupReducer.totalElements);
  const yardsData = useSelector((state) => state.yardLookupReducer.yardsData);
  const selectedSearchCriteria = useSelector((state) => state.yardLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.yardLookupReducer.searchTerms);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberYardLookup(0));
      dispatch(resetSearchSettingsYard());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumberYardLookup,
    setPageNumber: setPageNumberYardLookup,
    totalPages,
    totalElements,
    listingData: yardsData,
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
          <Modal.Title className="font-18 h-100">Yard Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid table-bordered lookup-container">
            <div className="row">
              <div className="border border-dark border-2 lookup-width">
                <SearchFilterNSort
                  globalSearchTerm={searchTerms}
                  setGlobalSearchTerm={setSearchTerms}
                  selectedSearchCriteria={selectedSearchCriteria}
                  setSelectedSearchCriteria={setSelectedSearchCriteria}
                  setPageNumber={setPageNumberYardLookup}
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

export default YardLookup;
