import React from "react";
import { useSelector } from "react-redux";
import { Col, Modal } from "react-bootstrap";
import { PaginationComponent } from "../../common/PaginationComponent";
import TableListing from "./TableListing";
import SearchFilterNSort from "../common/SearchFilterNSort";
import {
  setPageNumber,
  setSearchTerms,
  setSelectedSearchCriteria,
} from "../../../redux/LookupScreens/DriveBysLookupSlice";

const DriveBysLookup = ({
  show,
  onHide,
  OEDriveBys,
  handleOEDriveByOnClick,
  includePostalCodePK = false,
}) => {
  // --------------------------------------------------------------------------
  const pageNumber = useSelector((state) => state.driveBysLookup.pageNumber);
  const totalPages = useSelector((state) => state.driveBysLookup.totalPages);
  const totalElements = useSelector((state) => state.driveBysLookup.totalElements);
  const driveBysListingData = useSelector((state) => state.driveBysLookup.driveBysListingData);
  const selectedSearchCriteria = useSelector((state) => state.driveBysLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.driveBysLookup.searchTerms);

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: driveBysListingData,
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
          <Modal.Title className="font-18 h-100">DriveBy Selection</Modal.Title>
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
                  normalSearchFilter
                  handleClose={onHide}
                />
                <div className="row border border-dark border-1 lookup-height lookup-fit-height-smallscreen">
                  <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
                    <div className="d-flex h-100">
                      <div className="w-100">
                        <TableListing
                          onHide={onHide}
                          OEDriveBys={OEDriveBys}
                          handleOEDriveByOnClick={handleOEDriveByOnClick}
                          includePostalCodePK={includePostalCodePK}
                        />
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

export default DriveBysLookup;
