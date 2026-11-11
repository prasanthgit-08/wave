import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../styles/ThreeQuarterScreen.module.css";
import {
  setCanadian,
  setCity,
  setEditFormData,
  setIsPlateStateValid,
  setLatitude,
  setLongitude,
  setPostalCode,
  setPostalCodePK,
  setStateCode,
  setViewDetail,
} from "../../../redux/PostalCodeSlice";
import PostalCodeService from "../../../services/PostalCodeService";
import LoadingIcon from "../../common/LoadingIcon";

function FormContent() {
  const dispatch = useDispatch();

  const { id, pageNumber } = useParams();

  const navigate = useNavigate();

  const postalCodePK = useSelector((state) => state.postalCodeReducer.postalCodePK);
  const canadian = useSelector((state) => state.postalCodeReducer.canadian);
  const city = useSelector((state) => state.postalCodeReducer.city);

  const stateCode = useSelector((state) => state.postalCodeReducer.stateCode);

  const postalCode = useSelector((state) => state.postalCodeReducer.postalCode);
  const editFormData = useSelector((state) => state.postalCodeReducer.editFormData);
  const latitude = useSelector((state) => state.postalCodeReducer.latitude);
  const longitude = useSelector((state) => state.postalCodeReducer.longitude);
  const isPlateStateValid = useSelector((state) => state.postalCodeReducer.isPlateStateValid);

  const viewDetail = useSelector((state) => state.postalCodeReducer.viewDetail);
  const changesCancelled = useSelector((state) => state.postalCodeReducer.changesCancelled);
  const [loader, setLoader] = useState(false);

  const fetchRecord = (id) => {
    setLoader(true);

    PostalCodeService.getRecord(id)
      .then((res) => {
        const data = res.data;
        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);

        navigate(`/postalcode`);
      });
  };
  const checkStateValid = (e) => {
    if (e && e.target && e.target.value) {
      PostalCodeService.checkState(e.target.value)
        .then((response) => {
          dispatch(setIsPlateStateValid(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setPostalCodePK(""));
      dispatch(setPostalCode(""));
      dispatch(setCity(""));
      dispatch(setStateCode(""));
      dispatch(setCanadian(false));
      dispatch(setLatitude(""));

      dispatch(setLongitude(""));
    }
  }, [editFormData]);

  const validationSchema = yup.object({
    city: yup.string().required(),
    stateCode: yup.string().required(),

    latitude: yup.number().min(-90.0).max(90.0).required(),

    longitude: yup.number().min(-180.0).max(190.0).required(),
    canadian: yup.boolean().required(),
    postalCode: yup.string().when("canadian", {
      is: false,
      then: yup
        .string()
        .matches(/^\d{5}(-\d{4})?$/)
        .required(),
      otherwise: yup
        .string()
        .matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$/)
        .required(),
    }),
  });

  useEffect(() => {
    if (id) fetchRecord(id);
  }, [id]);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setPostalCodePK(editFormData.postalCodePK ? editFormData.postalCodePK : ""));
      dispatch(setPostalCode(editFormData.postalCode ? editFormData.postalCode : ""));
      dispatch(setCity(editFormData.city ? editFormData.city : ""));
      dispatch(setStateCode(editFormData.stateCode ? editFormData.stateCode : ""));
      dispatch(setCanadian(editFormData.canadian ? editFormData.canadian : false));
      dispatch(setLatitude(editFormData.latitude ? editFormData.latitude : ""));

      dispatch(setLongitude(editFormData.longitude ? editFormData.longitude : ""));
    }
  }, [editFormData, changesCancelled]);

  const isDesimalInvalid = (value) => {
    if (value === "." || value?.toString().endsWith(".") || value?.toString().endsWith("-")) {
      return true;
    }
    return false;
  };

  return (
    <Formik
      initialValues={{
        postalCode,
        city,
        stateCode,

        latitude,

        longitude,
        canadian,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        postalCode: true,
        city: true,
        stateCode: true,
        latitude: true,
        longitude: true,
        canadian: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="w-100 p-2">
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                {loader && <LoadingIcon />}

                <div className="p-15 w-100">
                  <Row className="m-0 p-2">
                    <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                      <Form.Group className=" mt-5 form-group align-items-center row m-l-0 m-r-0 mb-3">
                        <Col sm={3} md={3} xs={3} className="p-0 text-start">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            Postal Code
                          </Form.Label>
                        </Col>

                        <Col xs={3} md={3} sm={3} className="p-0 ">
                          <input
                            className={`customFormControl ${
                              viewDetail
                                ? ""
                                : formik.errors.postalCode === undefined && postalCode.length > 1
                                  ? "borderGreen"
                                  : formik.errors.postalCode
                                    ? "borderRed"
                                    : "borderGreen"
                            }`}
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            value={postalCode.toUpperCase()}
                            maxLength={10}
                            disabled={viewDetail}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={(e) => {
                              let value = e.target.value;
                              let canadian = /[a-zA-Z]/.test(value);
                              if (canadian) {
                                value = value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
                                if (value.length > 3 && value.indexOf(" ") === -1) {
                                  value = value.slice(0, 3) + " " + value.slice(3);
                                }
                                if (value.length > 7) {
                                  value = value.slice(0, 7);
                                }
                              } else {
                                value = value.replace(/[^0-9\-]/g, "");
                                if (value.length > 5 && value.indexOf("-") === -1) {
                                  value = value.slice(0, 5) + "-" + value.slice(5);
                                }
                              }
                              dispatch(setPostalCode(value));
                              dispatch(setCanadian(canadian)); // Set the canadian flag
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className=" mt-4 form-group align-items-center row m-l-0 m-r-0 mb-3">
                        <Col sm={3} md={3} xs={3} className="p-0 text-start">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            City
                          </Form.Label>
                        </Col>

                        <Col xs={7} md={7} sm={7} className="p-0">
                          <input
                            className={`customFormControl ${
                              viewDetail
                                ? ""
                                : formik.errors.city === undefined && postalCode.city > 1
                                  ? "borderGreen"
                                  : formik.errors.city
                                    ? "borderRed"
                                    : "borderGreen"
                            }`}
                            id="city"
                            name="city"
                            type="text"
                            value={city}
                            maxLength={30}
                            onBeforeInput={(e) => {
                              if (e.data === " " && e.target.value.length === 0) {
                                e.preventDefault();
                              }
                            }}
                            disabled={viewDetail}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={(e) => {
                              dispatch(setCity(e.target.value));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className=" mt-4 m-b-10 form-group align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            State
                          </Form.Label>
                        </Col>

                        <Col sm={1} xs={1} md={1} className="p-0  ">
                          <input
                            className={` w-100  p-1 m-l-1 customFormControl ${
                              viewDetail
                                ? ""
                                : stateCode !== ""
                                  ? isPlateStateValid
                                    ? "borderGreen"
                                    : "borderRed"
                                  : "borderRed"
                            }
                                  `}
                            id="state"
                            name="state"
                            type="text"
                            value={stateCode.toUpperCase()}
                            maxLength={2}
                            onBlur={checkStateValid}

                            disabled={viewDetail}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={(e) => {
                              dispatch(setStateCode(e.target.value));
                              dispatch(setIsPlateStateValid(false));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className=" mt-4 m-b-10 form-group align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            Canadian
                          </Form.Label>
                        </Col>
                        <Col xs={3} md={3} sm={3} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0"
                            id=" canadian"
                            name=" canadian"
                            checked={canadian}
                            disabled={viewDetail}
                            onChange={(e) => {
                              dispatch(setCanadian(e.target.checked));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className=" mt-4 m-b-10 form-group align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            Latitude
                          </Form.Label>
                        </Col>

                        <Col xs={4} md={4} sm={4} className="p-0">
                          <input
                            className={`customFormControl ${
                              viewDetail
                                ? ""
                                : !latitude || isDesimalInvalid(latitude)
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
                            id="latatude"
                            name="latatude"
                            type="text"
                            value={latitude}
                            defaultValue={0.0}
                            onBeforeInput={(e) => {
                              if (e.data === "+" || e.data === "e" || !/^[0-9.-]*$/.test(e.data)) {
                                e.preventDefault();
                              }
                            }}
                            maxLength={20}
                            disabled={viewDetail}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={(e) => {
                              e.target.value.match(/^[-]?\d{0,2}(\.\d{0,8})?$/) &&
                                dispatch(setLatitude(e.target.value));
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className=" mt-4 form-group m-b-10 align-items-center row  m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label htmlFor="name" className="col-form-label dealer-label">
                            Longitude
                          </Form.Label>
                        </Col>

                        <Col xs={4} md={4} sm={4} className="p-0">
                          <input
                            className={`customFormControl ${
                              viewDetail
                                ? ""
                                : !longitude || isDesimalInvalid(longitude)
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
                            id="longitude"
                            name="longitude"
                            type="text"
                            value={longitude}
                            maxLength={20}
                            defaultValue={0.0}
                            onBeforeInput={(e) => {
                              if (e.data === "+" || e.data === "e" || !/^[0-9.-]*$/.test(e.data)) {
                                e.preventDefault();
                              }
                            }}
                            disabled={viewDetail}
                            autoComplete="off"
                            aria-autocomplete="list"

                            onInput={(e) => {
                              e.target.value.match(/^[-]?\d{0,2}(\.\d{0,8})?$/) &&
                                dispatch(setLongitude(e.target.value));
                            }}
                          />
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default FormContent;
