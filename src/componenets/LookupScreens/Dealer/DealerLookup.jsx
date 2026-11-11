/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  resetDealerLookup,
  setAdvancedSearchObject,
  setAdvanceSortedValue,
  setAdvanceSortingCriteria,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchedDealer,
  setSearchTerms,
  setSelectedSearchCriteria,
  setShowAdvanceSearch,
  setShowAdvanceSort,
} from "../../../redux/LookupScreens/DealerLookupSlice";
import SearchFilterNSort from "../common/SearchFilterNSort";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
import AdvancedSortComponent from "../../common/AdvancedSortComponent";

const DealerLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customServiceCallback,
  delay,
  isMiscInvoice,
  customerId,
  includePostalCodePK = false,
  DriverReroutes,
  companyId,
  tripListing,
  onRoadNotDeliveredReport,
  common,
  reportType,
}) => {
  // ---------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    customServiceCallback,
    delay,
    isMiscInvoice,
    customerId,
    includePostalCodePK,
    DriverReroutes,
    companyId,
    tripListing,
    onRoadNotDeliveredReport,
    common,
    reportType,
  };

  const dealerData = useSelector((state) => state.dealerLookup.dealerData);
  const searchTerms = useSelector((state) => state.dealerLookup.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.dealerLookup.selectedSearchCriteria);
  const showAdvanceSearch = useSelector((state) => state.dealerLookup.showAdvanceSearch);
  const showAdvanceSort = useSelector((state) => state.dealerLookup.showAdvanceSort);
  const pageNumber = useSelector((state) => state.dealerLookup.pageNumber);
  const totalPages = useSelector((state) => state.dealerLookup.totalPages);
  const totalElements = useSelector((state) => state.dealerLookup.totalElements);
  const advanceSortingOrder = useSelector((state) => state.dealerLookup.advanceSortingOrder);
  const advancedSortedValue = useSelector((state) => state.dealerLookup.advanceSortedValue);
  const advancedSearchObject = useSelector((state) => state.dealerLookup.advancedSearchObject);
  const searchedDealer = useSelector((state) => state.dealerLookup.searchedDealer);
  const loading = useSelector((state) => state.dealerLookup.loading);

  const dispatch = useDispatch();

  const handleAdvancedSearch = (value) => {
    dispatch(setShowAdvanceSearch(value));

    if (value === true) dispatch(setSearchTerms(""));
    else dispatch(setAdvancedSearchObject(null));
    dispatch(setSearchedDealer(null));
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
    }
  };

  useEffect(() => {
    if (show === true) {
      dispatch(resetDealerLookup());
    }
  }, [show]);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: dealerData,
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="orderModal"
      dialogClassName={`modal-left lookupFix`}
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-18 h-100">Dealer Selection</Modal.Title>
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
                      <TableListing {...lookupProps} />
                    </div>
                    <PaginationComponent
                      {...paginationProps}
                      loading={loading}
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
                      <AdvancedSearchComponent
                        fourFieldSearch
                        advancedSearchObject={advancedSearchObject}
                        setAdvancedSearchObject={setAdvancedSearchObject}
                        firstFieldName={"Name"}
                        secondFieldName={"DBA"}
                        thirdFieldName={"City"}
                        fourthFieldName={"State"}
                        customFourthField={(fourthField) => fourthField.toUpperCase()}
                        maxLengthFourthField={2}
                        widthFourthField={"40px"}
                        setPageNumber={setPageNumber}
                        updateAdvancedSearchPayload={() => {
                          dispatch(
                            setSearchedDealer({
                              name: advancedSearchObject.firstField,
                              dba: advancedSearchObject.secondField,
                              city: advancedSearchObject.thirdField,
                              stateCode: advancedSearchObject.fourthField,
                            })
                          );
                        }}
                      />
                    )}
                  </div>
                  <div className="height-fix-2 min-h-50-modal row">
                    {showAdvanceSort && (
                      <AdvancedSortComponent
                        fourFieldSort
                        firstFieldName={"Name"}
                        secondFieldName={"DBA"}
                        thirdFieldName={"City"}
                        fourthFieldName={"State"}
                        firstFieldPayload={"name"}
                        secondFieldPayload={"dba"}
                        thirdFieldPayload={"city"}
                        fourthFieldPayload={"stateCode"}
                        advancedSortingOrder={advanceSortingOrder}
                        setAdvancedSortingOrder={setAdvanceSortingCriteria}
                        advancedSortingCombination={advancedSortedValue}
                        setAdvancedSortingCombination={setAdvanceSortedValue}
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
  );
};

export default DealerLookup;
