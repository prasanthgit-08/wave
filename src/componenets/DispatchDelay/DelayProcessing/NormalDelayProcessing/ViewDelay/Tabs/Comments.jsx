import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DelayProcessingService from "../../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";

const Comments = () => {
  const [loading, setLoading] = useState(false);
  const { delayedUnitPK, companyName } = useParams();
  const viewDelayActiveTab = useSelector((state) => state.delayProcessing.viewDelayActiveTab);

  const [commentsData, setCommentsData] = useState(null);

  // Fetching comments data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchCommentsData = () => {
      setLoading(true);
      DelayProcessingService.fetchViewDelayDetails(delayedUnitPK, viewDelayActiveTab, companyName)
        .then((response) => {
          const { data } = response;
          setCommentsData(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching comments data:", error);
        });
    };

    if (viewDelayActiveTab === "comments") {
      fetchCommentsData();
    }
  }, [viewDelayActiveTab]);
  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">In House Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                type="comments"
                className="customFormControl h-100 "
                name="comments"

                value={
                  commentsData?.InHouseNotes?.replace(/<\/?DelayNotes>/g, "")
                    ?.replace(/<\/?BreakdownNotes>/g, "")
                    ?.replace(/<\/?DamageNotes>/g, "")
                    ?.replace(
                      /\[(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{2}:\d{2}:\d{2}\s*[AP]M)\]/g,
                      (_, m, d, y, time) => {
                        const month = String(m).padStart(2, "0");
                        const day = String(d).padStart(2, "0");
                        const year = y?.slice(-2);
                        return `[${month}/${day}/${year}, ${time}]`;
                      }
                    ) || ""
                }
                autoComplete="off"
                disabled={true}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">Customer Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                type="customerComents"
                disabled={true}
                className="customFormControl h-100 "
                name="customerComents"

                value={
                  commentsData?.CustomerNotes?.replace(/<\/?DelayNotes>/g, "")
                    ?.replace(/<\/?BreakdownNotes>/g, "")
                    ?.replace(/<\/?DamageNotes>/g, "")
                    ?.replace(
                      /\[(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{2}:\d{2}:\d{2}\s*[AP]M)\]/g,
                      (_, m, d, y, time) => {
                        const month = String(m).padStart(2, "0");
                        const day = String(d).padStart(2, "0");
                        const year = y?.slice(-2);
                        return `[${month}/${day}/${year}, ${time}]`;
                      }
                    ) || ""
                }
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      {loading && (
        <div className="fade modal-backdrop show">
          {" "}
          <div className="pos-center">
            {" "}
            <div className="loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
