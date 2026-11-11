import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Checkbox from "../../../../../components/common/checkbox";
import Input from "../../../../../components/common/input";
import { useFormContext, useWatch } from "react-hook-form";
import useOverWidth from "./useOverWidth";

const OverWidth = ({ styles }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const trailerOnly = useWatch({ name: "overWidth.trailerOnly" });
  const trailerOverhangs = useWatch({ name: "overWidth.trailerOverhangs" });

  const { updateOverWidthFields, formatAmount, restrictYearInput, validateYearOnBlur, minMaxCalculation } =
    useOverWidth();

  return (
    <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
      {/* ROW 1 */}
      <Row>
        <Col xs={5}>
          <div className="p-l-25 m-t-25">
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Trailer Only</Form.Label>
              </Col>
              <Col xs={1}>
                <Checkbox
                  name="overWidth.trailerOnly"
                  control={control}
                  disabled={false}
                  onChange={(value) =>
                    updateOverWidthFields({
                      trailerOnly: value,
                      ...(!value && { trailerOverhangs: false }),
                    })
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Over Hanging Trailer</Form.Label>
              </Col>
              <Col xs={1}>
                <Checkbox
                  name="overWidth.trailerOverhangs"
                  control={control}
                  disabled={!trailerOnly}
                  onChange={(value) => updateOverWidthFields({ trailerOverhangs: value })}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Permit Charge</Form.Label>
              </Col>
              <Col xs={2} className=" m-l-1" style={{ width: "90px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.permitAmount"}
                  onChange={(e) => {
                    const formatted = formatAmount(e.target.value, e.nativeEvent.inputType);
                    e.target.value = formatted;
                    updateOverWidthFields({ permitAmount: formatted });
                  }}
                  control={control}
                  maxLength={8}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Amount</Form.Label>
              </Col>
              <Col xs={2} className=" m-l-1" style={{ width: "90px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.invoiceAmount"}
                  onChange={(e) => {
                    const formatted = formatAmount(e.target.value, e.nativeEvent.inputType);
                    e.target.value = formatted;
                    updateOverWidthFields({ invoiceAmount: formatted });
                  }}
                  control={control}
                  maxLength={8}
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Invoice Number</Form.Label>
              </Col>
              <Col xs={2} className=" m-l-1" style={{ width: "100px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.permitInvoiceNumber"}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                    updateOverWidthFields({ permitInvoiceNumber: e.target.value });
                  }}
                  control={control}
                  maxLength={10}
                  required={watch("overWidth.invoiceAmount")}
                />
              </Col>
            </Form.Group>
          </div>
        </Col>
      </Row>

      {/* ROW 2 */}
      <Row>
        <Col xs={5}>
          {/* ROW 1 */}
          <div className="row p-l-35 mt-4">
            <Col xs={4}>Trailer Information</Col>
          </div>
          {/* ROW 2 */}
          <div className="row p-l-25">
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Make</Form.Label>
              </Col>
              <Col xs={8}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerMake"}
                  onChange={(e) => updateOverWidthFields({ trailerMake: e.target.value })}
                  control={control}
                  maxLength={30}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>VIN</Form.Label>
              </Col>
              <Col xs={6}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerVIN"}
                  onChange={(e) => updateOverWidthFields({ trailerVIN: e.target.value })}
                  control={control}
                  maxLength={21}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Year</Form.Label>
              </Col>
              <Col xs={3} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerYear"}
                  control={control}
                  maxLength={4}
                  required
                  onChange={(e) => {
                    const restricted = restrictYearInput(e.target.value);
                    e.target.value = restricted;
                    updateOverWidthFields({ trailerYear: restricted });
                  }}
                  onBlur={(e) => {
                    const corrected = validateYearOnBlur(e.target.value);
                    e.target.value = corrected;
                    updateOverWidthFields({ trailerYear: corrected });
                  }}
                />
              </Col>
            </Form.Group>
          </div>
          {/* ROW 3 */}
          <div className="row p-l-25">
            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Trailer Axles</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerAxles"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 1, 9);
                    e.target.value = formatted;
                    updateOverWidthFields({ trailerAxles: formatted });
                  }}
                  control={control}
                  maxLength={1}
                  required
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Axle Spread</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className="customFormControl"
                  name="overWidth.axleSpreadFoot"
                  control={control}
                  maxLength={2}
                  required
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 1, 99);
                    e.target.value = formatted;
                    updateOverWidthFields({ axleSpreadFoot: formatted });
                  }}
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.axleSpreadInch"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 0, 11);
                    e.target.value = formatted;
                    updateOverWidthFields({ axleSpreadInch: formatted });
                  }}
                  control={control}
                  maxLength={4}
                  required
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Length</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerLengthFoot"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 1, 99);
                    e.target.value = formatted;
                    updateOverWidthFields({ trailerLengthFoot: formatted });
                  }}
                  control={control}
                  maxLength={4}
                  required
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerLengthInch"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 0, 11);
                    e.target.value = formatted;
                    updateOverWidthFields({ trailerLengthInch: formatted });
                  }}
                  control={control}
                  maxLength={4}
                  required
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Width</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerWidthFoot"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 1, 99);
                    e.target.value = formatted;
                    updateOverWidthFields({ trailerWidthFoot: formatted });
                  }}
                  control={control}
                  maxLength={4}
                  required
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerWidthInch"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 0, 11);
                    e.target.value = formatted;
                    updateOverWidthFields({ trailerWidthInch: formatted });
                  }}
                  control={control}
                  maxLength={4}
                  required
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>

            <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
              <Col xs={3}>
                <Form.Label className={`customColFormLabel`}>Height</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerHeightFoot"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 1, 99);
                    e.target.value = formatted;
                    updateOverWidthFields({ trailerHeightFoot: formatted });
                  }}
                  control={control}
                  maxLength={4}
                  required
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
              </Col>
              <Col xs={2} style={{ width: "70px" }}>
                <Input
                  className={`customFormControl`}
                  name={"overWidth.trailerHeightInch"}
                  onChange={(e) => {
                    const formatted = minMaxCalculation(e.target.value, 0, 11);
                    e.target.value = formatted;
                    updateOverWidthFields({ trailerHeightInch: formatted });
                  }}
                  control={control}
                  maxLength={4}
                  required
                />
              </Col>
              <Col xs={2}>
                <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
              </Col>
            </Form.Group>

            {trailerOverhangs ? (
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <Form.Label className={`customColFormLabel`}>Overhang</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.trailerOverhangFoot"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 1, 99);
                      e.target.value = formatted;
                      updateOverWidthFields({ trailerOverhangFoot: formatted });
                    }}

                    control={control}
                    maxLength={4}
                    required={trailerOverhangs}
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.trailerOverhangInch"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 0, 11);
                      e.target.value = formatted;
                      updateOverWidthFields({ trailerOverhangInch: formatted });
                    }}

                    control={control}
                    maxLength={4}
                    required={trailerOverhangs}
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col xs={5} className={trailerOnly ? "hide-elements" : ""}>
          {/* ROW 1 */}
          <div className="row p-l-35 mt-4">
            <Col xs={4}>Boat Information</Col>
          </div>
          {/* ROW 2 */}
          {!trailerOnly && (
            <div className="row p-l-25">
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <Form.Label className={`customColFormLabel`}>Make</Form.Label>
                </Col>
                <Col xs={8}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.boatMake"}
                    onChange={(e) => updateOverWidthFields({ boatMake: e.target.value })}

                    control={control}
                    maxLength={30}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <Form.Label className={`customColFormLabel`}>Hull ID</Form.Label>
                </Col>
                <Col xs={6}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.hullId"}
                    onChange={(e) => updateOverWidthFields({ hullId: e.target.value })}

                    control={control}
                    maxLength={20}
                    required
                  />
                </Col>
              </Form.Group>
            </div>
          )}
          {/* ROW 3 */}
          {!trailerOnly && (
            <div className="row p-l-25">
              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <Form.Label className={`customColFormLabel`}>Length</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.boatLengthFoot"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 1, 99);
                      e.target.value = formatted;
                      updateOverWidthFields({ boatLengthFoot: formatted });
                    }}

                    control={control}
                    maxLength={2}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.boatLengthInch"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 0, 11);
                      e.target.value = formatted;
                      updateOverWidthFields({ boatLengthInch: formatted });
                    }}

                    control={control}
                    maxLength={2}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <Form.Label className={`customColFormLabel`}>Width</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.boatWidthFoot"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 1, 99);
                      e.target.value = formatted;
                      updateOverWidthFields({ boatWidthFoot: formatted });
                    }}

                    control={control}
                    maxLength={2}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.boatWidthInch"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 0, 11);
                      e.target.value = formatted;
                      updateOverWidthFields({ boatWidthInch: formatted });
                    }}

                    maxLength={2}
                    control={control}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3  align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <Form.Label className={`customColFormLabel`}>Height</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.boatHeightFoot"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 1, 99);
                      e.target.value = formatted;
                      updateOverWidthFields({ boatHeightFoot: formatted });
                    }}

                    control={control}
                    maxLength={2}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.boatHeightInch"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 0, 11);
                      e.target.value = formatted;
                      updateOverWidthFields({ boatHeightInch: formatted });
                    }}

                    control={control}
                    maxLength={2}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col xs={3}>
                  <Form.Label className={`customColFormLabel`}>Total Height</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.totalHeightFoot"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 1, 99);
                      e.target.value = formatted;
                      updateOverWidthFields({ totalHeightFoot: formatted });
                    }}

                    control={control}
                    maxLength={2}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Feet</Form.Label>
                </Col>
                <Col xs={2} style={{ width: "70px" }}>
                  <Input
                    className={`customFormControl`}
                    name={"overWidth.totalHeightInch"}
                    onChange={(e) => {
                      const formatted = minMaxCalculation(e.target.value, 0, 11);
                      e.target.value = formatted;
                      updateOverWidthFields({ totalHeightInch: formatted });
                    }}

                    control={control}
                    maxLength={2}
                    required
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label className={`customColFormLabel`}>Inch</Form.Label>
                </Col>
              </Form.Group>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OverWidth;
