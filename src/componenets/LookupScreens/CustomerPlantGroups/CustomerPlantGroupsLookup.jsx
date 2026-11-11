/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumberCustomerPlantGroupsLookup,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetSearchSettingsCustomerPlantGroups,
} from "../../../redux/LookupScreens/CustomerPlantGroupsLookupSlice";

const CustomerPlantGroupsLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  customFetchFunction,
  customerTripSummary,
}) => {
  // --------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    customerTripSummary,
  };

  const pageNumbercustomerPlantGroupsLookup = useSelector(
    (state) => state.customerPlantGroupsReducer.pageNumbercustomerPlantGroupsLookup
  );
  const totalPages = useSelector((state) => state.customerPlantGroupsReducer.totalPages);
  const totalElements = useSelector((state) => state.customerPlantGroupsReducer.totalElements);
  const customerPlantGroupsData = useSelector(
    (state) => state.customerPlantGroupsReducer.customerPlantGroupsData
  );
  const selectedSearchCriteria = useSelector(
    (state) => state.customerPlantGroupsReducer.selectedSearchCriteria
  );
  const searchTerms = useSelector((state) => state.customerPlantGroupsReducer.searchTerms);
  const loading = useSelector((state) => state.customerPlantGroupsReducer.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setPageNumberCustomerPlantGroupsLookup(0));
      dispatch(resetSearchSettingsCustomerPlantGroups());
    }
  }, [show]);

  const paginationProps = {
    pageNumber: pageNumbercustomerPlantGroupsLookup,
    setPageNumber: setPageNumberCustomerPlantGroupsLookup,
    totalPages,
    totalElements,
    listingData: customerPlantGroupsData,
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
          <Modal.Title className="font-18 h-100">Customer Plant Group Selection</Modal.Title>
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
                  setPageNumber={setPageNumberCustomerPlantGroupsLookup}
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
                        loading={loading}
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

export default CustomerPlantGroupsLookup;
