import { parseLocalDate } from "../../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../../../../../styles/QuarterScreen.module.css";
import DateInputField from "../../../../../common/DateInputField";
import {
  setDescription,
  setDriverDescription,
  setComplianceNotes,
  setLastComplianceDate,
  setNextComplianceDate,
  setBlockDate,
  setBlockReason,
  setDriverComplianceItemFK,
  setComplianceItemId,
  setUseBlockDate,
  setUseLastDate,
  setUseNextDate,
  setBlockdateValid,
  setNextComplianceDateValid,
  setLastComplianceDateValid,
  setHistoryBlockDate,
} from "../../../../../../redux/DriverComplianceItemsSlice";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../../components/common/input";

const General = () => {
  const params = useParams();
  const id = params.id;
  const driverId = params.driverId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const description = useSelector((state) => state.DriverComplianceItemsReducer.description);
  const driverDescription = useSelector((state) => state.DriverComplianceItemsReducer.driverDescription);
  const complianceNotes = useSelector((state) => state.DriverComplianceItemsReducer.complianceNotes);
  const lastComplianceDate = useSelector((state) => state.DriverComplianceItemsReducer.lastComplianceDate);
  const nextComplianceDate = useSelector((state) => state.DriverComplianceItemsReducer.nextComplianceDate);
  const blockDate = useSelector((state) => state.DriverComplianceItemsReducer.blockDate);
  const blockReason = useSelector((state) => state.DriverComplianceItemsReducer.blockReason);
  const formData = useSelector((state) => state.DriverComplianceItemsReducer.formData);
  const changesCancelled = useSelector((state) => state.DriverComplianceItemsReducer.changesCancelled);
  const useBlockDate = useSelector((state) => state.DriverComplianceItemsReducer.useBlockDate);
  const useLastDate = useSelector((state) => state.DriverComplianceItemsReducer.useLastDate);
  const useNextDate = useSelector((state) => state.DriverComplianceItemsReducer.useNextDate);
  const viewDetail = useSelector((state) => state.DriverComplianceItemsReducer.viewDetail);
  const lastComplianceDateValid = useSelector(
    (state) => state.DriverComplianceItemsReducer.lastComplianceDateValid
  );
  const nextComplianceDateValid = useSelector(
    (state) => state.DriverComplianceItemsReducer.nextComplianceDateValid
  );
  const blockDateValid = useSelector((state) => state.DriverComplianceItemsReducer.blockDateValid);
  const descriptionExist = useSelector((state) => state.DriverComplianceItemsReducer.descriptionExist);

  const driverDescriptionExist = useSelector(
    (state) => state.DriverComplianceItemsReducer.driverDescriptionExist
  );

  const [isDateDisable, setIsDateDisable] = useState(true);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  window.addEventListener("popstate", () => {
    navigate(`/driver-compliance-items/${driverId}`);
  });

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    phone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    description: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().required(),
    postalCode: yup
      .string()
      .required()
      .when("canadian", {
        is: true,
        then: yup.string().matches(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/),
        otherwise: yup.string().matches(/^((\d{5}-\d{4})|(\d{5}))$/),
      }),
  });

  useEffect(() => {
    if (formData != null) {
      dispatch(setDescription(formData.description ? formData.description : ""));
      dispatch(setDriverDescription(formData.driverDescription ? formData.driverDescription : ""));
      dispatch(setComplianceNotes(formData.complianceNotes ? formData.complianceNotes : ""));
      dispatch(setLastComplianceDate(formData.lastDate ? formatDatetimeToDate(formData.lastDate) : null));
      dispatch(setNextComplianceDate(formData.nextDate ? formatDatetimeToDate(formData.nextDate) : null));
      dispatch(setBlockDate(formData.blockDate ? formatDatetimeToDate(formData.blockDate) : null));
      dispatch(setBlockReason(formData.blockReason ? formData.blockReason : ""));
      dispatch(setDriverComplianceItemFK(formData?.driverComplianceItemPK) || null);
      dispatch(setComplianceItemId(formData.complianceItemId) || null);
      dispatch(setUseBlockDate(formData.useBlockDate) || false);
      dispatch(setUseLastDate(formData.useLastDate) || false);
      dispatch(setUseNextDate(formData.useNextDate) || false);
      dispatch(setHistoryBlockDate(formData.blockDateForHistory || null));
    }
  }, [formData, changesCancelled]);

  useEffect(() => {
    if (!useBlockDate || !blockDate) {
      dispatch(setBlockReason(""));
    }
  }, [blockDate]);

  return (
    <Formik
      initialValues={{
        description,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        description: true,
      }}
    >
      {(formik) => (
        <Form className="p-2" style={{ height: "375px" }}>
          <Row className="m-0 p-0 ">
            <Form.Group className="form-group mt-0 form-group  m-b-8 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>
                  {t("yard.list.page.table.heading")}
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <Input
                  className={`customFormControl ${descriptionExist && !viewDetail && id ? "borderRed" : ""}`}
                  type="text"
                  id="description"
                  name="description"
                  maxLength={30}
                  value={description}
                  disabled

                  onChange={(e) => {
                    dispatch(setDescription(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group mt-0 form-group m-t-5 m-b-10 align-items-center row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className={`${styles.colFormLabel}`}>Driver Description </Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0">
                <Input
                  type="text"
                  className={`customFormControl ${driverDescriptionExist && !viewDetail && id ? "borderRed" : ""}`}
                  id="driverDescription"
                  name="driverDescription"
                  maxLength={30}
                  value={driverDescription}
                  disabled

                  onChange={(e) => {
                    dispatch(setDriverDescription(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
              <Col xs={2} md={2} sm={2} className="p-0" style={{ height: "55px" }}>
                <Form.Label htmlFor="name" style={{ marginTop: "0px" }} className=" ">
                  Compliance Notes
                </Form.Label>
              </Col>
              <br></br>
              <Col sm={9} md={9} xs={9} className="p-0">
                <textarea
                  rows={3}
                  cols={20}
                  type="text"
                  className="customFormControl"
                  id="complianceNotes"
                  name="complianceNotes"
                  value={complianceNotes}
                  style={{
                    resize: "none",
                    display: "fixed",
                    minHeight: "60px",
                    minWidth: "610px",
                    boxShadow: "none",
                    fontSize: "12px",
                    overflowY: "auto",
                    outline: "none",
                  }}
                  disabled
                  onInput={(e) => {
                    dispatch(setComplianceNotes(e.target.value));
                  }}
                />
              </Col>
            </Form.Group>
            {useLastDate ? (
              <Form.Group className={`mt-0 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}>
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Last Compliance Date</Form.Label>
                </Col>

                <Col xs={3} md={3} lg={3} sm={3} className="p-0" style={{ maxWidth: "96px" }}>
                  <DateInputField
                    date={lastComplianceDate}
                    setDate={(value) => dispatch(setLastComplianceDate(value))}
                    setIsDateValid={(value) => dispatch(setLastComplianceDateValid(value))}
                    min={new Date()}
                    max={nextComplianceDate ? parseLocalDate(nextComplianceDate) : ""}

                    className={`customFormControl ${!viewDetail && !lastComplianceDateValid ? "borderRed" : ""}`}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
            ) : (
              ""
            )}
            {useNextDate ? (
              <Form.Group
                className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Next Compliance Date</Form.Label>
                </Col>

                <Col xs={3} md={3} lg={3} sm={3} className="p-0" style={{ maxWidth: "96px" }}>
                  <DateInputField
                    date={nextComplianceDate}
                    setDate={(value) => dispatch(setNextComplianceDate(value))}
                    min={
                      lastComplianceDate && parseLocalDate(lastComplianceDate) > new Date()
                        ? parseLocalDate(lastComplianceDate)
                        : new Date()
                    }
                    setIsDateValid={(value) => dispatch(setNextComplianceDateValid(value))}
                    hidden={!useNextDate}

                    className={`customFormControl ${!viewDetail && !nextComplianceDateValid ? "borderRed" : ""}`}
                    disabled={viewDetail}
                  />
                </Col>
              </Form.Group>
            ) : (
              ""
            )}

            {useBlockDate ? (
              <Form.Group
                className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Block Date</Form.Label>
                </Col>

                <Col xs={3} md={3} lg={3} sm={3} className="p-0" style={{ maxWidth: "96px" }}>
                  <DateInputField
                    date={blockDate}
                    setDate={(value) => dispatch(setBlockDate(value))}
                    min={new Date()}
                    onChange={() => {
                      setIsDateDisable(false);
                    }}
                    setIsDateValid={(value) => dispatch(setBlockdateValid(value))}
                    className={`customFormControl ${
                      viewDetail ? "" : (!blockDate && blockReason) || !blockDateValid ? "borderRed" : ""
                    }`}
                    disabled={viewDetail || formData.blockDate !== null}
                  />
                </Col>
              </Form.Group>
            ) : (
              ""
            )}
            {useBlockDate ? (
              <Form.Group
                className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col xs={2} md={2} sm={2} className="p-0" style={{ height: "55px" }}>
                  <Form.Label htmlFor="name" style={{ marginTop: "0px" }} className=" ">
                    Block Reason
                  </Form.Label>
                </Col>
                <br></br>
                <Col sm={9} md={9} xs={9} className="p-0">
                  <textarea
                    rows={3}
                    cols={20}
                    type="text"
                    className={`customFormControl ${
                      viewDetail || blockDate === null || formData.blockDate !== null
                        ? ""
                        : blockDate && !blockReason
                          ? "borderRed"
                          : !blockDate && !blockReason
                            ? ""
                            : "borderGreen"
                    }`}
                    id="blockReason"
                    name="blockReason"
                    value={blockReason}
                    style={{
                      resize: "none",
                      display: "fixed",
                      minHeight: "30px",
                      height: "60px",
                      minWidth: "610px",
                      boxShadow: "none",
                      fontSize: "12px",
                      overflowY: "auto",
                      outline: "none",
                    }}
                    disabled={viewDetail || formData.blockDate || !blockDate}
                    onInput={(e) => {
                      dispatch(setBlockReason(e.target.value));
                    }}
                  />
                </Col>
              </Form.Group>
            ) : (
              ""
            )}
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default General;
