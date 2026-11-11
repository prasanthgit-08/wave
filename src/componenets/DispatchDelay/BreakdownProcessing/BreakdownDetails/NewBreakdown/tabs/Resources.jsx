import React from "react";
import { Form, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ResourcesListing from "./ResourcesListing";
import { PaginationComponent } from "../../../../../common/PaginationComponent";
import { setResourcePageNumber } from "../../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
const Resources = () => {
  const { notes, resourcePageNumber, resourceTotalPages, resourceTotalElements, resourceList } = useSelector(
    (state) => state.delaybreakdown
  );
  const paginationProps = {
    pageNumber: resourcePageNumber,
    setPageNumber: setResourcePageNumber,
    totalPages: resourceTotalPages,
    totalElements: resourceTotalElements,
    listingData: resourceList,
  };
  return (
    <div>
      <div className="container-fluid table-bordered">
        <div className=" ">
          <div className="row border border-dark border-1 fit-halfScreenFormContentHeight">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-417px">
                <div className="w-100">
                  <ResourcesListing />
                </div>
                <PaginationComponent
                  {...paginationProps}
                  recordsPerPage={10}
                  firstPage
                  lastPage
                  singleArrowUp
                  singleArrowDown
                  hideBorderRight
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
        <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
          <label className="col-form-label dealer-label p-0 mb-1"></label>

          <Col sm={12} md={12} className="p-0">
            <textarea
              rows={11}
              cols={10}
              type="resourceNotes"
              className="customFormControl h-100 "
              name="resourceNotes"
              value={notes}
              autoComplete="off"
              disabled
            />
          </Col>
        </Form.Group>
      </Col>
    </div>
  );
};

export default Resources;
