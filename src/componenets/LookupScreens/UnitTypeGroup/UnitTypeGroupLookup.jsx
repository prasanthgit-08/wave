/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";

import {
  setSelectedSearchCriteria,
  setSearchTerms,
  setUnitTypeGroupPageNumber,
  resetUnitTypeGroupSearchSettings,
} from "../../../redux/LookupScreens/UnitTypeGroupLookupSlice";
const UnitTypeGroupLookup = ({
  show,
  onHide,
  renderItemId,
  handleLookupSelection,
  MaintenanceProgram,
  FormsMaintenance,
  unitTypeGroupPKS,
  yardInventory,
  unitTypePK,
}) => {
  // --------------------------------------------------
  const lookupProps = {
    renderItemId,
    handleLookupSelection,
    MaintenanceProgram,
    unitTypeGroupPKS,
    FormsMaintenance,
    yardInventory,
    unitTypePK,
  };
  const unitTypeGroupLookupData = useSelector((state) => state.unitTypeGroupLookup.unitTypeGroupLookupData);
  const searchTerms = useSelector((state) => state.unitTypeGroupLookup.searchTerms);
  const unitTypeGroupPageNumber = useSelector((state) => state.unitTypeGroupLookup.unitTypeGroupPageNumber);
  const totalPages = useSelector((state) => state.unitTypeGroupLookup.totalPages);
  const totalElements = useSelector((state) => state.unitTypeGroupLookup.totalElements);
  const selectedSearchCriteria = useSelector((state) => state.unitTypeGroupLookup.selectedSearchCriteria);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show === true) {
      dispatch(setUnitTypeGroupPageNumber(0));
      dispatch(resetUnitTypeGroupSearchSettings());
    }
  }, [show]);
  const paginationProps = {
    pageNumber: unitTypeGroupPageNumber,
    setPageNumber: setUnitTypeGroupPageNumber,
    totalPages,
    totalElements,
    listingData: unitTypeGroupLookupData,
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
          <Modal.Title className="font-18 h-100">Unit Type Group Selection</Modal.Title>
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
                  setPageNumber={setUnitTypeGroupPageNumber}
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

export default UnitTypeGroupLookup;
