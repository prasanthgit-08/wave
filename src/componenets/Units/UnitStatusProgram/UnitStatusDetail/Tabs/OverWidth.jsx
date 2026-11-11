import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function OverWidth({ data }) {
  const unitData = data?.data?.[0] || "";
  const [trailerOnly, setTrailerOnly] = useState(false);
  const [trailerOverhangs, setTrailerOverhangs] = useState(false);
  const [showTrailerInfoDiv, setShowTrailerInfoDiv] = useState(false);
  const [showBoatInfoDiv, setShowBoatInfoDiv] = useState(false);

  useEffect(() => {
    if (unitData.TrailerOnly === true) {
      if (unitData.TrailerOverHangs) {
        setTrailerOverhangs(true);
      } else {
        //clear overhang info if overhang is unchecked
        // clearTrailerHangInfo();
      }
      setShowTrailerInfoDiv(true);
      setShowBoatInfoDiv(false);
    } else {
      setShowTrailerInfoDiv(false);
      setShowBoatInfoDiv(true);
      setTrailerOverhangs(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitData.TrailerOnly, unitData.TrailerOverHangs]);

  return (
    <div className={` mb-0`}>
      {/* ROW 1 */}
      <Row>
        <Col sm={5} xs={5}>
          <div className="p-l-25 mt-2">
            {/* ********************* */}
            {/*  Trailer Only */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={` customColFormLabel`}>Trailer Only</Form.Label>
              </Col>
              <Col sm={1} xs={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="trailerOnly"
                  name="trailerOnly"
                  checked={unitData.TrailerOnly}
                  // checked={trailerOnly}
                  disabled
                />
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*  Over Hanging Trailer */}

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Over Hanging Trailer</Form.Label>
              </Col>
              <Col sm={1} xs={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0"
                  id="overHangingTrailer"
                  name="overHangingTrailer"
                  checked={unitData.TrailerOverHangs}
                  // checked={trailerOverhangs}
                  disabled
                />
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*  Permit Charge */}

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Permit Charge</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className=" m-l-1" style={{ width: "100px" }}>
                <input
                  className="customFormControl"
                  id="permitChange"
                  name="permitChange"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.PermitAmount || "0"}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*  Invoice Amount */}

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className=" m-l-1" style={{ width: "100px" }}>
                <input
                  className="customFormControl"
                  id="invoiceAmount"
                  name="invoiceAmount"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.InvoiceAmount || "0"}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*  Invoice Number */}

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Number</Form.Label>
              </Col>
              <Col xs={2} md={2} sm={2} className="m-l-1" style={{ width: "100px" }}>
                <input
                  className="customFormControl"
                  id="invoiceNumber"
                  name="invoiceNumber"
                  type="text"
                  maxLength={10}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.PermitInvoiceNumber || "0"}
                  disabled
                />
              </Col>
            </Form.Group>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={5} xs={5}>
          <div className="row p-l-35 mt-2">
            <Col sm={4} xs={4}>
              Trailer Information
            </Col>
          </div>
          <div className="row p-l-25">
            {/* ********************* */}
            {/*   Make */}
            <Form.Group className="mt-2 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Make</Form.Label>
              </Col>
              <Col sm={8} xs={8}>
                <input
                  className="customFormControl"
                  id="make"
                  name="make"
                  type="text"
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerMake || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*  VIN */}

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>VIN</Form.Label>
              </Col>
              <Col sm={6} xs={6}>
                <input
                  className="customFormControl "
                  id="vin"
                  name="vin"
                  type="text"
                  maxLength={21}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerVIN || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* ********************* */}
            {/*   Year */}

            <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Year</Form.Label>
              </Col>
              <Col sm={3} xs={3} style={{ width: "90px" }}>
                <input
                  className="customFormControl"
                  id="year"
                  name="year"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerYear || ""}
                  disabled
                />
              </Col>
            </Form.Group>
          </div>
          <div className="row p-l-25">
            {/* ********************* */}
            {/*   Trailer Axles */}

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Trailer Axles</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }} /* className="p-r-0" */>
                <input
                  className="customFormControl"
                  id="axles"
                  name="axles"
                  type="text"
                  maxLength={1}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerAxles || "0"}
                  disabled
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Form.Group>

            {/* ********************* */}
            {/*   Axle Spread */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Axle Spread</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }} /* className="p-r-0" */>
                <input
                  className="customFormControl"
                  id="spread"
                  name="spread"
                  type="number"
                  step="1"
                  min="1"
                  max="9"
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.AxleSpreadFoot || "0"}
                  disabled
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className="customFormControl"
                  id="inches"
                  name="inches"
                  type="number"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.AxleSpreadInch || "0"}
                  disabled
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*    Length */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Length</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className="customFormControl"
                  id="feet1"
                  name="feet1"
                  type="number"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerLengthFoot || "0"}
                  disabled
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className="customFormControl "
                  id="inch1"
                  name="inch1"
                  type="number"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerLengthInch || "0"}
                  disabled
                />
              </Col>
              <Col sm={1} xs={1}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*     Width */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Width</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className="customFormControl "
                  id="feet2"
                  name="feet2"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerWidthFoot || "0"}
                  disabled
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className="customFormControl"
                  id="inch2"
                  name="inch2"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerWidthInch || "0"}
                  disabled
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*     Height */}
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col sm={3} xs={3}>
                <Form.Label className={`customColFormLabel`}>Height</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className="customFormControl "
                  id="feet3"
                  name="feet3"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerHeightFoot || "0"}
                  disabled
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col sm={2} xs={2} style={{ width: "70px" }}>
                <input
                  className="customFormControl"
                  id="inch3"
                  name="inch3"
                  type="text"
                  maxLength={4}
                  autoComplete="off"
                  aria-autocomplete="list"
                  value={unitData?.TrailerHeightInch || "0"}
                  disabled
                />
              </Col>
              <Col sm={2} xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>
            {/* ********************* */}
            {/*     Overhang */}
            {trailerOverhangs ? (
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} xs={3}>
                  <Form.Label className={`customColFormLabel`}>Overhang</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className="customFormControl"
                    id="feet4"
                    name="feet4"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitData?.TrailerOverhangFoot || "0"}
                    // disabled={!unitData.TrailerOverHangs}
                    disabled
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col sm={2} xs={2} style={{ width: "70px" }}>
                  <input
                    className="customFormControl"
                    id="inch4"
                    name="inch4"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={unitData?.TrailerOverhangInch || "0"}
                    // disabled={ !unitData.TrailerOverHangs}
                    disabled
                  />
                </Col>
                <Col sm={2} xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>
            ) : (
              ""
            )}
          </div>
        </Col>

        {unitData.TrailerOnly === false && (
          <Col sm={5} xs={5}>
            {/* ROW 1 */}
            {/* ********************* */}
            {/*   Boat Information */}
            <div className="row p-l-35 mt-3">
              <Col sm={4} xs={4}>
                Boat Information
              </Col>
            </div>
            {showBoatInfoDiv && (
              <div className="row p-l-25">
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Make</Form.Label>
                  </Col>
                  <Col sm={8} xs={8}>
                    <input
                      className="customFormControl"
                      id="make2"
                      name="make2"
                      type="text"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.BoatMake || ""}
                      disabled
                    />
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/*   Hull ID */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Hull ID</Form.Label>
                  </Col>
                  <Col sm={6} xs={6}>
                    <input
                      id="hullId"
                      name="hullId"
                      type="text"
                      maxLength={20}
                      autoComplete="off"
                      aria-autocomplete="list"
                      className="customFormControl"
                      value={unitData?.HullID || ""}
                      disabled
                    />
                  </Col>
                </Form.Group>
              </div>
            )}

            {showBoatInfoDiv && (
              <div className="row p-l-25">
                {/* ********************* */}
                {/*   Length */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Length</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl "
                      id="feet5"
                      name="feet5"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.BoatLengthFoot || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl"
                      id="inch5"
                      name="inch5"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.BoatLengthInch || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/*   Width */}
                <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Width</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl"
                      id="feet6"
                      name="feet6"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.BoatWidthFoot || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl "
                      id="inch6"
                      name="inch6"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.BoatWidthInch || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/*   Height */}
                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Height</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl "
                      id="feet7"
                      name="feet7"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.BoatHeightFoot || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl"
                      id="inch7"
                      name="inch7"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.BoatHeightInch || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                  </Col>
                </Form.Group>
                {/* ********************* */}
                {/*   Total Height */}

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>Total Height</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl "
                      id="feet8"
                      name="feet8"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.TotalHeightFoot || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                  </Col>
                  <Col sm={2} xs={2} style={{ width: "70px" }}>
                    <input
                      className="customFormControl"
                      id="inch8"
                      name="inch8"
                      type="text"
                      maxLength={2}
                      autoComplete="off"
                      aria-autocomplete="list"
                      value={unitData?.TotalHeightInch || "0"}
                      disabled
                    />
                  </Col>
                  <Col sm={2} xs={2}>
                    <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                  </Col>
                </Form.Group>
              </div>
            )}
          </Col>
        )}
      </Row>
    </div>
  );
}

export default OverWidth;
