/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import {
  setPlantGroupPageNumber,
  setSelectedSearchCriteria,
  setSearchTerms,
  resetPlantGroupSearchSettings,
} from "../../../redux/LookupScreens/PlantGroupLookupSlice";
import SearchFilterNSort from "../common/SearchFilterNSort";

const PlantGroupLookup = ({ show, onHide, renderItemId, MaintenanceProgram, handleLookupSelection }) => {
  // --------------------------------------------------
  const lookupProps = {
    renderItemId,
    MaintenanceProgram,
    handleLookupSelection,
  };
  const dispatch = useDispatch();
  const plantGroupPageNumber = useSelector((state) => state.plantGroupLookup.plantGroupPageNumber);
  const plantGroupLookupData = useSelector((state) => state.plantGroupLookup.plantGroupLookupData);
  const searchTerms = useSelector((state) => state.plantGroupLookup.searchTerms);
  const selectedSearchCriteria = useSelector((state) => state.plantGroupLookup.selectedSearchCriteria);
  const totalPages = useSelector((state) => state.plantGroupLookup.totalPages);
  const totalElements = useSelector((state) => state.plantGroupLookup.totalElements);

  useEffect(() => {
    if (show === true) {
      dispatch(resetPlantGroupSearchSettings());
    }
  }, [show]);
  const paginationProps = {
    pageNumber: plantGroupPageNumber,
    setPageNumber: setPlantGroupPageNumber,
    totalPages,
    totalElements,
    listingData: plantGroupLookupData,
  };

  return (
    <Col xs={12}>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        className="orderModal smallScreen"
      >
        <Modal.Header closeButton>
          <Modal.Title className="font-18 h-100">Customer Plant Group Selection</Modal.Title>
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
                  setPageNumber={setPlantGroupPageNumber}
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

export default PlantGroupLookup;
