import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setSelectedSearchCriteria,
  setSearchTerms,
  setUnitTypePageNumber,
  setUnitTypeSearchCriteria,
  resetUnitTypeSearchSettings,
} from "../../../redux/LookupScreens/UnitTypeLookupSlice";

const UnitTypeLookup = ({
  show,
  onHide,
  OEUnitTab,
  renderItemId,
  setShowMultiUnitLoadDiv,
  MaintenanceProgram,
  handleLookupSelection,
  customerUnitTypeGroupId,
  customFetchFunction,
  FormsMaintenance,
  editMasterExpress,
  undispatchedListing,
  yardInventory,
}) => {
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    customFetchFunction,
    customerUnitTypeGroupId,
    FormsMaintenance,
    editMasterExpress,
    undispatchedListing,
    yardInventory,
  };

  // ----------------------------------------------------------------------------
  const searchTerms = useSelector((state) => state.unitTypeLookup.searchTerms);
  const unitTypeSearchCriteria = useSelector((state) => state.unitTypeLookup.unitTypeSearchCriteria);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeLookup.selectedSearchCriteria);
  const unitTypeLookupData = useSelector((state) => state.unitTypeLookup.unitTypeLookupData);
  const unitTypePageNumber = useSelector((state) => state.unitTypeLookup.unitTypePageNumber);
  const totalPages = useSelector((state) => state.unitTypeLookup.totalPages);
  const totalElements = useSelector((state) => state.unitTypeLookup.totalElements);
  const loading = useSelector((state) => state.unitTypeLookup.loading);

  const dispatch = useDispatch();

  const handleUnitTypeSearchCriteria = (value) => {
    dispatch(setUnitTypeSearchCriteria(value));
    dispatch(setUnitTypePageNumber(0));
  };

  const paginationProps = {
    pageNumber: unitTypePageNumber,
    setPageNumber: setUnitTypePageNumber,
    totalPages,
    totalElements,
    listingData: unitTypeLookupData,
  };

  useEffect(() => {
    if (show === true) {
      dispatch(resetUnitTypeSearchSettings());
    }
  }, [show]);

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
          <Modal.Title className="font-18 h-100">Unit Type Selection</Modal.Title>
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
                  setPageNumber={setUnitTypePageNumber}
                  normalSearchFilter
                  unitType
                  unitTypeSearchCriteria={unitTypeSearchCriteria}
                  handleUnitTypeRadioGroup={handleUnitTypeSearchCriteria}
                  handleClose={onHide}
                  editMasterExpress={editMasterExpress}
                />
                <div className="row border border-dark border-1 lookup-height lookup-fit-height-smallscreen">
                  <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
                    <div className="d-flex h-100">
                      <div className="w-100">
                        <TableListing
                          {...lookupProps}
                          onHide={onHide}
                          OEUnitTab={OEUnitTab}
                          setShowMultiUnitLoadDiv={setShowMultiUnitLoadDiv}
                        />
                      </div>
                      <PaginationComponent
                        {...paginationProps}
                        loading={loading}
                        firstPage
                        lastPage
                        singleArrowUp
                        singleArrowDown
                        doubleArrowUp
                        doubleArrowDown
                        tripleArrowUp
                        tripleArrowDown
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

export default UnitTypeLookup;
