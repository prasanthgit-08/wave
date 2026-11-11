/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal } from "react-bootstrap";

const NormalLookupScreen = ({
  show,
  onHide,
  lookupTitle,
  SearchFilterComponent,
  TableListingComponent,
  PaginationComponent,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      className="lookupModal smallScreen"
      dialogClassName={`modal-left lookupFix`}
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-18 h-100">{lookupTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid table-bordered lookup-container">
          <div className="row">
            <div className="border border-dark border-2 lookup-width">
              {SearchFilterComponent}
              <div className="row border border-dark border-1 lookup-fit-height-smallscreen">
                <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
                  <div className="d-flex h-100">
                    <div className="w-100">{TableListingComponent}</div>
                    {PaginationComponent}
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

export default NormalLookupScreen;
