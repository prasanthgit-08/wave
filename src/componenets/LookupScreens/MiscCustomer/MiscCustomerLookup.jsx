/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import AdvancedSearch from "./AdvancedSearch";
import AdvancedSort from "./AdvancedSort";
import {
  setPageNumber,
  setShowAdvanceSearch,
  setShowAdvanceSort,
  setAdvanceSortingCriteria,
  setSelectedSearchCriteria,
  setSearchTerms,
  setSearchedCustomer,
  setNormalSortValue,
  setNormalSortFlag,
  setAdvanceSortedValue,
} from "../../../redux/LookupScreens/MiscCustomerLookupSlice";

const MiscCustomerLookup = ({ show, onHide, OEMiscCustomerTab }) => {
  // ---------------------------------------------------
  const [firstField, setFirstField] = useState(null);
  const [secondField, setSecondField] = useState(null);
  const [thirdField, setThirdField] = useState(null);

  const pageNumber = useSelector((state) => state.miscCustomerLookupReducer.pageNumber);
  const totalPages = useSelector((state) => state.miscCustomerLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.miscCustomerLookupReducer.totalElements);
  const miscCustomerData = useSelector((state) => state.miscCustomerLookupReducer.miscCustomerData);
  const showAdvanceSearch = useSelector((state) => state.miscCustomerLookupReducer.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.miscCustomerLookupReducer.showAdvanceSort);
  const selectedSearchCriteria = useSelector(
    (state) => state.miscCustomerLookupReducer.selectedSearchCriteria
  );
  const advanceSortingOrder = useSelector((state) => state.miscCustomerLookupReducer.advanceSortingOrder);
  const searchTerms = useSelector((state) => state.miscCustomerLookupReducer.searchTerms);

  const dispatch = useDispatch();

  const handleAdvancedSearch = (value) => {
    dispatch(setShowAdvanceSearch(value));
    if (value === true) {
      dispatch(setSearchTerms(""));
    } else {
      dispatch(setSearchedCustomer(null));
    }
  };

  const handleAdvancedSort = (value) => {
    dispatch(setShowAdvanceSort(value));
    if (value === true) {
      // show advanced sort
      dispatch(setNormalSortValue(null));
      dispatch(setNormalSortFlag(false));
    } else {
      // hide advanced sort
      dispatch(setAdvanceSortingCriteria(null));
      dispatch(setAdvanceSortedValue(null));
      setFirstField(null);
      setSecondField(null);
      setThirdField(null);
    }
  };

  useEffect(() => {
    if (null != advanceSortingOrder) {
      setFirstField(firstField !== null ? firstField : advanceSortingOrder.firstField);
      setSecondField(secondField !== null ? secondField : advanceSortingOrder.secondField);
      setThirdField(thirdField !== null ? thirdField : advanceSortingOrder.thirdField);
    }
  }, []);

  useEffect(() => {
    dispatch(
      setAdvanceSortingCriteria({
        firstField: firstField,
        secondField: secondField,
        thirdField: thirdField,
      })
    );
  }, [firstField, secondField, thirdField]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: miscCustomerData,
  };

  return (
    <Col xs={12}>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        className="orderModal"
        dialogClassName={`modal-left lookupFix`}
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Miscellaneous Customer Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid table-bordered lookup-container">
            <div className="row">
              <div className="border border-dark border-2 lookup-width">
                {/* Pass required states & functions as properties to this common component */}
                <SearchFilterNSort
                  globalSearchTerm={searchTerms}
                  setGlobalSearchTerm={setSearchTerms}
                  selectedSearchCriteria={selectedSearchCriteria}
                  setSelectedSearchCriteria={setSelectedSearchCriteria}
                  setPageNumber={setPageNumber}
                  showAdvancedSearchFlag
                  showAdvancedSortFlag
                  showAdvancedSearchState={showAdvanceSearch}
                  showAdvancedSortState={showAdvanceSort}
                  handleAdvancedSearch={handleAdvancedSearch}
                  handleAdvancedSort={handleAdvancedSort}
                  handleClose={onHide}
                />
                <div className="row border border-dark border-1 lookup-height lookup-fit-height">
                  <div className="col-md-9 col-lg-9 col-9 col-lg-9 p-r-0 p-l-0">
                    <div className="d-flex h-100">
                      <div className="w-100">
                        <TableListing onHide={onHide} OEMiscCustomerTab={OEMiscCustomerTab} />
                      </div>
                      <PaginationComponent
                        {...paginationProps}
                        firstPage
                        lastPage
                        tripleArrowUp
                        tripleArrowDown
                        doubleArrowUp
                        doubleArrowDown
                        singleArrowUp
                        singleArrowDown
                      />
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-3 col-3 col-lg-3 border border-dark border-1 border-top-0 border-right-0 border-left-0">
                    <div className="height-fix-1 min-h-50-modal row border-bottom-2px">
                      {showAdvanceSearch && (
                        <div className="col-md-12 m-t-15 m-b-15">
                          <AdvancedSearch />
                        </div>
                      )}
                    </div>
                    <div className="height-fix-2 min-h-50-modal row">
                      {showAdvanceSort && (
                        <AdvancedSort
                          setFirstField={setFirstField}
                          setSecondField={setSecondField}
                          setThirdField={setThirdField}
                        />
                      )}
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

export default MiscCustomerLookup;
