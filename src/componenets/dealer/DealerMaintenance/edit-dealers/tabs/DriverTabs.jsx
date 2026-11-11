import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { setDealer } from "../../../../../redux/EditDealerSlice";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

function DriverTabs() {
  const [hours, setHours] = useState("");
  const [directions, setDirections] = useState("");
  const [washInstructions, setWashInstructions] = useState("");
  const dispatch = useDispatch();

  const dealerData = useSelector((state) => state.editDealerReducer.dealerData);

  let viewDetail = useSelector((state) => state.editDealerReducer.viewDetail);

  useEffect(() => {
    if (dealerData != null) {
      setHours(dealerData.hours != null ? dealerData.hours?.trim() : "");
      setDirections(dealerData.directions != null ? dealerData.directions?.trim() : "");
      setWashInstructions(dealerData.washInstructions != null ? dealerData.washInstructions?.trim() : "");
    }
  }, [dealerData, viewDetail]);

  useEffect(() => {
    driverTabFormData();
  }, [hours, directions, washInstructions]);

  const driverTabFormData = () => {
    dispatch(
      setDealer({
        hours: hours,
        directions: directions,
        washInstructions: washInstructions,
      })
    );
  };

  return (
    <div className="p-2 w-10">
      <Row className="m-0 p-0">
        <Col sm={12} className="p-l-0">
          <p className=" col-form-label dealer-label p-0 font-12  m-b-10">
            {t("edit.dealer.page.Drivers.tab.mainHeading")}
          </p>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Form.Group className="form-group mt-4 m-b-10 align-items-center row m-l-0 m-r-0">
            <Form.Label className="col-form-label p-l-0">
              {t("edit.dealer.page.Drivers.tab.hours")}
            </Form.Label>

            <textarea
              rows={21}
              cols={20}
              type="text"
              style={{
                paddingRight: "10px",
                resize: "none",
                display: "fixed",
                height: "400px",
                minWidth: "400px",
                boxShadow: "none",
                fontSize: "12px",
              }}
              onBeforeInput={(e) => {
                if (e.data === " " && e.target.value?.trim().length === 0) {
                  e.preventDefault();
                }
              }}
              className="customFormControl font-12 h-100"
              id="hours"
              name="hours"
              value={hours}
              disabled={viewDetail}
              onInput={(e) => setHours(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Form.Group className="form-group mt-4 m-b-10 align-items-center row m-l-0 m-r-0">
            <Form.Label className="col-form-label font-13 p-l-0">
              {t("edit.dealer.page.Drivers.tab.directions")}
            </Form.Label>
            <textarea
              rows={21}
              cols={20}
              type="text"
              className="customFormControl h-100 font-12"
              id="directions"
              style={{
                paddingRight: "10px",
                resize: "none",
                display: "fixed",
                height: "400px",
                minWidth: "400px",
                boxShadow: "none",
                fontSize: "12px",
              }}
              onBeforeInput={(e) => {
                if (e.data === " " && e.target.value?.trim().length === 0) {
                  e.preventDefault();
                }
              }}
              name="directions"
              value={directions}
              disabled={viewDetail}
              onInput={(e) => setDirections(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
          <Form.Group className="form-group mt-4 m-b-10 align-items-center row m-l-0 m-r-0">
            <Form.Label className=" col-form-label font-13 p-l-0">
              {t("edit.dealer.page.Drivers.tab.washInstructions")}
            </Form.Label>
            <textarea
              rows={21}
              cols={20}
              style={{
                paddingRight: "10px",
                resize: "none",
                display: "fixed",
                height: "400px",
                minWidth: "400px",
                boxShadow: "none",
                fontSize: "12px",
              }}
              onBeforeInput={(e) => {
                if (e.data === " " && e.target.value?.trim().length === 0) {
                  e.preventDefault();
                }
              }}
              type="text"
              className="customFormControl h-100 font-12"
              id="washInstructions"
              name="washInstructions"
              value={washInstructions}
              disabled={viewDetail}
              onInput={(e) => setWashInstructions(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default DriverTabs;
