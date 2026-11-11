import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import PostToPassportService from "../../../services/PostToPassportService";
import { useDispatch, useSelector } from "react-redux";
import {
  setBatchNumber,
  setEmailBatchAsExcel,
  setEmailBatchAsPdf,
  setPrintBatch,
} from "../../../redux/PostToPassportSlice";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../common/LoadingIcon";
import Input from "../../../components/common/input";
const PostToPassport = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const batchNumber = useSelector((state) => state.postToPassportReducer.batchNumber);
  const printBatch = useSelector((state) => state.postToPassportReducer.printBatch);
  const emailBatchAsPdf = useSelector((state) => state.postToPassportReducer.emailBatchAsPdf);
  const emailBatchAsExcel = useSelector((state) => state.postToPassportReducer.emailBatchAsExcel);

  const getNextBatchNumberValue = () => {
    setLoading(true);
    PostToPassportService.getNextBatchNumber()
      .then((response) => {
        const data = response.data;

        dispatch(setBatchNumber(data?.resultSet[0]?.NextRealworldBatch));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNextBatchNumberValue();
  }, []);

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        {
          <Row className="m-0 p-10">
            <Col xs={12}>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Batch</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className={`p-0 d-flex`}>
                  <Input type="text" disabled value={batchNumber} className={`customFormControl `} />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Print Batch</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${
                      printBatch
                        ? ""
                        : !printBatch && !emailBatchAsExcel && !emailBatchAsPdf
                          ? "borderRed"
                          : ""
                    }`}
                    checked={printBatch}
                    onChange={(e) => {
                      dispatch(setPrintBatch(e.target.checked));
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Email Batch as PDF</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${
                      emailBatchAsPdf
                        ? ""
                        : !printBatch && !emailBatchAsExcel && !emailBatchAsPdf
                          ? "borderRed"
                          : ""
                    }`}
                    checked={emailBatchAsPdf}
                    onChange={(e) => {
                      dispatch(setEmailBatchAsPdf(e.target.checked));
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                <Col xs={2} md={2} sm={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Email Batch as Excel</Form.Label>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    type="checkbox"
                    className={`form-check-input p-0 ${
                      emailBatchAsExcel
                        ? ""
                        : !printBatch && !emailBatchAsExcel && !emailBatchAsPdf
                          ? "borderRed"
                          : ""
                    }`}
                    checked={emailBatchAsExcel}
                    onChange={(e) => {
                      dispatch(setEmailBatchAsExcel(e.target.checked));
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        }
      </div>
    </div>
  );
};

export default PostToPassport;
