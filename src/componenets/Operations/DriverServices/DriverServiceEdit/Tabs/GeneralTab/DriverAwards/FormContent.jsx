import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import styles from "../../../../../../../styles/ThreeQuarterScreen.module.css";
import DateInputField from "../../../../../../common/DateInputField";
import DriverAwardsService from "../../../../../../../services/DriverAwardsService";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../../../../../common/LoadingIcon";

const FormContent = () => {
  const { driverId } = useParams();
  const [driverAwardsData, setDriverAwardsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDriverDetails = () => {
    setLoading(true);
    DriverAwardsService.getDriverDetails(driverId)
      .then((res) => {
        setDriverAwardsData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDriverDetails();
  }, []);

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
        <Row className="m-0 p-20">
          <Col xs={3} sm={3} md={3}>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>Safety Award Level</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} style={{ width: "70px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAwardLevel || ""}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group visibility-hidden align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>Safety Award Level</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input type="checkbox" className="form-check-input p-0 " disabled />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group visibility-hidden align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>Safety Award Level</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input type="checkbox" className="form-check-input p-0 " disabled />
              </Col>
            </Form.Group>

            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>25K</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward25K}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>25K Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward25KDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>25K Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward25KRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>50K</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward50K}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>50K Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward50KDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>50K Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward50KRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>100K</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward100K}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>100K Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward100KDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>100K Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward100KRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>100K Award</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward100KCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>250K</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward250K}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>250K Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward250KDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>250K Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward250KRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>250K Award</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward250KCard}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>

          {/* -------------------------------2nd Column ------------------------ */}

          <Col>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>500K</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward500K}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>500K Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward500KDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>500K Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward500KRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>500K Award #1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward500KCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>500K Award #2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward500KCard2}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>750K</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward750K}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>750K Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward750KDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>750K Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward750KRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>750K Award #1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward750KCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>750K Award #2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward750KCard2}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1M</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward1M}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1M Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward1MDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1M Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward1MRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1M Award #1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward1MCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1M Award #2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward1MCard2}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1M Award #3</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward1MCard3}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
          {/* --------------------3rd Column-------------------- */}

          <Col>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.25M</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward125M}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.25M Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward125MDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.25M Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward125MRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.25M Award #1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward125MCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.25M Award #2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward125MCard2}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.25M Award #3</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward125MCard3}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.5M</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward15M}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.5M Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward15MDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.5M Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward15MRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.5M Award #1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward15MCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.5M Award #2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward15MCard2}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.5M Award #3</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward15MCard3}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>

          {/* -------------------4th Column ------------------ */}

          <Col>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.75M</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward175M}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.75M Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward175MDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.75M Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward175MRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.75M Award #1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward175MCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.75M Award #2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward175MCard2}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>1.75M Award #3</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward175MCard3}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>2M</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1}>
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={driverAwardsData?.safetyAward2M}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>2M Awarded</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward2MDate || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>2M Redeemed</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "120px" }}>
                <DateInputField
                  date={driverAwardsData?.safetyAward2MRedeemed || ""}
                  className={`customFormControl`}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>2M Award #1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward2MCard}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>2M Award #2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward2MCard2}
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col sm={4} md={4} xs={4} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>2M Award #3</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} style={{ width: "200px" }}>
                <input
                  type="text"
                  className="customFormControl"
                  value={driverAwardsData?.safetyAward2MCard3}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormContent;
