import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BreakdownProcessingService from "../../../../../../services/DispatchDelay/BreakdownProcessing/BreakdownProcessingService";

const BreakdownComments = () => {
  const { breakdownFK } = useParams();
  const breakdownCompanyName = localStorage.getItem("breakdownCompanyName");
  const breakdownUnitFK = localStorage.getItem("breakdownUnitFK");
  const viewBreakdownActiveTab = useSelector((state) => state.delaybreakdown.viewBreakdownActiveTab);

  const [breakdownCommentsData, setDelayCommentsData] = useState(null);
  const [loading, setLoading] = useState(false);
  // Fetching delay comments data when the component mounts or when the active tab changes
  useEffect(() => {
    const fetchBreakdownCommentsData = () => {
      setLoading(true);
      BreakdownProcessingService.getBreakdownViewDetails(
        "COMMENTS",
        breakdownFK,
        0,
        10,
        null,
        false,
        breakdownCompanyName
      )
        .then((response) => {
          const { data } = response;
          setDelayCommentsData(data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error("### Error fetching delay comments data:", error);
          // Handle error appropriately
        });
    };

    if (viewBreakdownActiveTab === "breakdownComments") {
      fetchBreakdownCommentsData();
    }
  }, [viewBreakdownActiveTab]);

  return (
    <div className={"p-15 w-100"}>
      <Row className="m-0 p-0">
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">In House Breakdown Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                type="inHouseDelayComments"
                className="customFormControl h-100 "
                name="inHouseDelayComments"
                disabled
                value={
                  breakdownCommentsData?.BreakdownInHouseNotes?.replace(/<\/?BreakdownNotes>/g, "")?.replace(
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
              />
            </Col>
          </Form.Group>
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-3 align-items row  m-l-0 m-r-0">
            <label className="col-form-label dealer-label p-0 m-b-20">Customer Breakdown Comments</label>

            <Col sm={11} md={11} className="p-0">
              <textarea
                rows={20}
                cols={12}
                disabled
                className="customFormControl h-100 "
                name="customerDelayComments"
                value={
                  breakdownCommentsData?.BreakdownCustomerNotes?.replace(/<\/?BreakdownNotes>/g, "")?.replace(
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
          {/* Empty Tag for styling */}
          <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3 hide-elements">
            <Col xs={8} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                maxLength={30}
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

export default BreakdownComments;
