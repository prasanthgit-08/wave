/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import {
  resetunitTypeLookup,
  setAdvancedSearchObject,
  setPageNumber,
  setSearchCustomer,
  setSearchCustomerGroup,
  setSearchDescription,
  setSearchPlant,
  setSearchPlantGroup,
  setSearchTerms,
  setSelectedSearchCriteria,
  setShowAdvanceSearch,
} from "../../../redux/LookupScreens/CustomerUnitTypeGroupsLookupSlice";
import SearchFilterNSort from "../common/SearchFilterNSort";
import TableListing from "./TableListing";
import { PaginationComponent } from "../../common/PaginationComponent";
import AdvancedSearchComponent from "../../common/AdvancedSearchComponent";
// import AdvancedSearch from './AdvancedSearch';

const CustomerUnitTypeGroupLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customerId,
  customerPlantId,
  customerPlantGroupId,
  customerGroupId,
  supplementalRates,
  customerRates,
}) => {
  // ---------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    customerId,
    customerPlantId,
    customerPlantGroupId,
    customerGroupId,
    supplementalRates,
    customerRates,
  };
  const customerUnitTypeGroupsData = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.customerUnitTypeGroupsData
  );
  const searchTerms = useSelector((state) => state.customerUnitTypeGroupLookupReducer.searchTerms);
  const selectedSearchCriteria = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.selectedSearchCriteria
  );
  const showAdvanceSearch = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.showAdvanceSearch
  );
  const pageNumber = useSelector((state) => state.customerUnitTypeGroupLookupReducer.pageNumber);
  const totalPages = useSelector((state) => state.customerUnitTypeGroupLookupReducer.totalPages);
  const totalElements = useSelector((state) => state.customerUnitTypeGroupLookupReducer.totalElements);
  const advancedSearchObject = useSelector(
    (state) => state.customerUnitTypeGroupLookupReducer.advancedSearchObject
  );
  const loading = useSelector((state) => state.customerUnitTypeGroupLookupReducer.loading);

  const dispatch = useDispatch();

  const handleAdvancedSearch = (value) => {
    dispatch(setShowAdvanceSearch(value));

    if (value === true) dispatch(setSearchTerms(""));
    else dispatch(setAdvancedSearchObject(null));
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: customerUnitTypeGroupsData,
  };
  //for clearing values
  useEffect(() => {
    if (show === true) {
      dispatch(resetunitTypeLookup());
    }
  }, [show]);

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
          <Modal.Title className="font-18 h-100">Customer Unit Type Group Selection</Modal.Title>
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
                  showAdvancedSearchState={showAdvanceSearch}
                  handleAdvancedSearch={handleAdvancedSearch}
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
                          fiveFieldSearch
                          advancedSearchObject={advancedSearchObject}
                          setAdvancedSearchObject={setAdvancedSearchObject}
                          firstFieldName={"Description"}
                          secondFieldName={"Customer"}
                          thirdFieldName={"Plant"}
                          fourthFieldName={"Plant Group"}
                          fifthFieldName={"Customer Group"}
                          setPageNumber={setPageNumber}
                          updateAdvancedSearchPayload={() => {
                            dispatch(setSearchDescription(advancedSearchObject.firstField));
                            dispatch(setSearchCustomer(advancedSearchObject.secondField));
                            dispatch(setSearchPlant(advancedSearchObject.thirdField));
                            dispatch(setSearchPlantGroup(advancedSearchObject.fourthField));
                            dispatch(setSearchCustomerGroup(advancedSearchObject.fifthField));
                          }}
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

export default CustomerUnitTypeGroupLookup;
