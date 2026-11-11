import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberYardLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
} from "../../../redux/LookupScreens/YardLookupSlice";

const UnitMultiLoadLookup = ({ show, onHide, OEUnitTab }) => {
  // --------------------------------------------------------------------------
  const pageNumberYardLookup = useSelector((state) => state.yardLookupReducer.pageNumberYardLookup);
  const totalPages = useSelector((state) => state.yardLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.yardLookupReducer.totalElements);
  const yardsData = useSelector((state) => state.yardLookupReducer.yardsData);
  const selectedSearchCriteria = useSelector((state) => state.yardLookupReducer.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.yardLookupReducer.searchTerms);

  const dispatch = useDispatch();

  const handleSearchCriteria = (value) => {
    dispatch(setSelectedSearchCriteria(value));
    dispatch(setPageNumberYardLookup(0));
  };

  const handleGlobalSearch = (e) => {
    dispatch(setSearchTerms(e.target.value));
    // setSearchTerm(e.target.value);
    dispatch(setPageNumberYardLookup(0));
  };

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
          <Modal.Title className="font-18 h-100">Multi Unit Load Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid table-bordered lookup-container">
            <div className="row">
              <div className="border border-dark border-2 lookup-width">
                {/* TODO: currently using templtate from yard, modify later */}
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
                        <TableListing onHide={onHide} OEUnitTab={OEUnitTab} />
                        {/* <div>
                          {yardsData.length === 0 ? (
                            <h2 className="empty-list" align="center">
                              No Records Available
                            </h2>
                          ) : (
                            ''
                          )}{' '}
                        </div> */}
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
                  {/* <div className="col-md-3 col-sm-3 col-3 col-lg-3 border border-dark border-1 border-top-0 border-right-0 border-left-0">
                    <div className="height-fix-1 min-h-50 row border-bottom-2px">
                      
                    </div>
                    <div className="height-fix-2 min-h-50 row">
                      
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default UnitMultiLoadLookup;
