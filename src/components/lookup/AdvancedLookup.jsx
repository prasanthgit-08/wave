import React from "react";
import { Modal } from "react-bootstrap";
import CustomButton from "../common/button";

const AdvancedLookup = ({
  show,
  onHide,
  lookupTitle,
  SearchFilterComponent,
  TableListingComponent,
  PaginationComponent,
  showAdvancedSearch,
  AdvancedSearchComponent,
  showAdvancedSort,
  AdvancedSortComponent,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="lookupModal"
      dialogClassName={`modal-left lookupFix`}
    >
      <Modal.Header closeButton>
        <div className="d-flex justify-content-between w-100">
          <Modal.Title className="font-18 h-100">{lookupTitle}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid table-bordered lookup-container">
          <div className="row">
            <div className="border border-dark border-2 lookup-width">
              {SearchFilterComponent}
              <div className="row border border-dark border-1 lookup-fit-height">
                <div className="col-md-9 col-lg-9 col-9 col-lg-9 p-r-0 p-l-0">
                  <div className="d-flex h-100">
                    <div className="w-100">{TableListingComponent}</div>
                    {PaginationComponent}
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 col-3 col-lg-3 border border-dark border-1 border-top-0 border-right-0 border-left-0">
                  <div className="height-fix-1 min-h-50-modal row border-bottom-2px">
                    {showAdvancedSearch && AdvancedSearchComponent}
                  </div>
                  <div className="height-fix-2 min-h-50-modal row">
                    {showAdvancedSort && AdvancedSortComponent}
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

export default AdvancedLookup;
