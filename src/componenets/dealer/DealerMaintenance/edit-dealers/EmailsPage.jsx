import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppNavigate } from "../../../../hooks/useAppNavigate";

const EmailsPage = () => {
  const navigate = useNavigate();
  const { goBack } = useAppNavigate();

  return (
    <div
      style={{ height: "80vh", width: "100%" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="add-form-component p-20 h-100 d-flex flex-column justify-content-center">
        <div className="shadow-sm rounded border m-t-10 m-b-10 h-50">
          <div className="p-20 w-10 ">
            <Row className="m-0 p-0">
              <h5>This is the dealers Emails maintenance Screen</h5>
            </Row>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap">
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={() => {
              goBack();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailsPage;
