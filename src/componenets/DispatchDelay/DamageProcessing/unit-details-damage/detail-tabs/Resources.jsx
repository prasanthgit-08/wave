import React from "react";
import { useSelector } from "react-redux";

import { Col, Form } from "react-bootstrap";
import ResourcesEditListing from "./ResourceEditListing";
const Resources = () => {
  const notes = useSelector((state) => state.unitSelection.notes);

  return (
    <div>
      <div className="container-fluid table-bordered">
        <div className=" ">
          <div className="row border border-dark border-1 fit-halfScreenFormContentHeight">
            <div className="col-md-12 col-lg-12 col-12 col-lg-12 p-r-0 p-l-0">
              <div className="d-flex h-350px">
                <div className="w-100 scrollable-list">
                  <ResourcesEditListing />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Col xs={12} sm={12} md={12} lg={12} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
        <Form.Group className="mt-1 align-items row  m-l-0 m-r-0">
          <label className="col-form-label dealer-label p-0 m-b-20"></label>

          <Col sm={12} md={12} className="p-0">
            <textarea
              rows={8}
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
