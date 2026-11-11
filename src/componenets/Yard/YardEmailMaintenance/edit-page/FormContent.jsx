import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import YardEmailService from "../../../../services/YardEmailService";
import { Formik } from "formik";
import * as yup from "yup";

import {
  setViewDetail,
  setName,
  setEmail,
  setBol,
  setText,
  setEditFormData,
  setIsNameUnique,
  setBatch,
  setBOLsAsOnePDF,
  setReturnTextEmail,
  setReturnEmailBOLs,
  setIsEmailUnique,
  setYardEmailPK,
} from "../../../../redux/YardEmailSlice";

import { useNavigate, useParams } from "react-router-dom";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import LoadingIcon from "../../../common/LoadingIcon";

function FormContent({ styles }) {
  const { id, yardEmailPKs, pageNumber } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetail = useSelector((state) => state.yardEmailReducer.viewDetail);
  const yardFK = useSelector((state) => state.yardEmailReducer.yardFK);
  const yardEmailPK = useSelector((state) => state.yardEmailReducer.yardEmailPK);
  const name = useSelector((state) => state.yardEmailReducer.name);
  const email = useSelector((state) => state.yardEmailReducer.email);
  const bol = useSelector((state) => state.yardEmailReducer.bol);
  const batch = useSelector((state) => state.yardEmailReducer.batch);

  const bolsAsOnePDF = useSelector((state) => state.yardEmailReducer.bolsAsOnePDF);

  const text = useSelector((state) => state.yardEmailReducer.text);
  const editFormData = useSelector((state) => state.yardEmailReducer.editFormData);
  const changesCancelled = useSelector((state) => state.yardEmailReducer.changesCancelled);
  const isNameUnique = useSelector((state) => state.yardEmailReducer.isNameUnique);
  const [atleastOneCheck, setAtleastOneCheck] = useState(true);
  const [loader, setLoader] = useState(false);

  const returnEmailBOLs = useSelector((state) => state.yardEmailReducer.returnEmailBOLs);

  const returnTextEmail = useSelector((state) => state.yardEmailReducer.returnTextEmail);
  const isEmailUnique = useSelector((state) => state.yardEmailReducer.isEmailUnique);
  const fetchRecord = (yardEmailPK) => {
    setLoader(true);
    dispatch(setViewDetail(true));

    YardEmailService.getRecord(yardEmailPK)
      .then((res) => {
        const data = res.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/yard-email-maintenance/${id}/${pageNumber}`);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setName(""));
      dispatch(setEmail(""));
      dispatch(setBol(""));
      dispatch(setText(""));
      dispatch(setBatch(""));

      dispatch(setBOLsAsOnePDF(""));
    }
  }, [editFormData, changesCancelled]);

  const hanldeCheckForm = (name) => {
    YardEmailService.checkNameExist(yardFK, yardEmailPK, name)
      .then((res) => {
        dispatch(setIsNameUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hanldeCheckEmail = (email) => {
    YardEmailService.checkEmailExist(yardFK, yardEmailPK, email)
      .then((res) => {
        dispatch(setIsEmailUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setName(editFormData.name ? editFormData.name : ""));
      dispatch(setEmail(editFormData.email ? editFormData.email?.trim() : ""));
      dispatch(setBol(editFormData.bol ? editFormData.bol : ""));
      dispatch(setText(editFormData.text ? editFormData.text : ""));
      dispatch(setBatch(editFormData.batch ? editFormData.batch : ""));

      dispatch(setBOLsAsOnePDF(editFormData.bolsAsOnePDF ? editFormData.bolsAsOnePDF : ""));
      dispatch(setYardEmailPK(editFormData.yardEmailPK ? editFormData.yardEmailPK : null));
      dispatch(setReturnEmailBOLs(editFormData.returnBOL ? editFormData.returnBOL : false));
      dispatch(setReturnTextEmail(editFormData.returnText ? editFormData.returnText : false));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (yardEmailPKs != null) fetchRecord(yardEmailPKs);
  }, [yardEmailPKs]);

  useEffect(() => {
    if (bol || text) {
      setAtleastOneCheck(false);
    } else {
      setAtleastOneCheck(true);
    }
  }, [bol, text]);

  useEffect(() => {
    if (!bol) {
      dispatch(setBatch(false));
    }
    if (!batch) {
      dispatch(setBOLsAsOnePDF(false));
    }
  }, [bol, batch]);
  const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().matches(emailRegex),
  });

  return (
    <Formik
      initialValues={{
        name,
        email,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        email: true,
      }}
    >
      {(formik) => (
        <form>
          <div className="w-100 p-2">
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                {loader && <LoadingIcon />}
                <div className="p-15 w-100">
                  <Row className="m-0 p-10">
                    <Col xl={7} lg={7} md={7} sm={7} xs={7} className="m-t-32">
                      <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <label className={QuarterScreen.colFormLabel}>Name</label>
                        </Col>
                        <Col xs={6} sm={6} md={6} className="p-r-0 m-l-15">
                          <input
                            required
                            className={`${QuarterScreen.formControl} ${
                              viewDetail === true
                                ? "black"
                                : name === "" || isNameUnique
                                  ? "borderRed"
                                  : "borderGreen"
                            }`}
                            onBeforeInput={(e) => {
                              if (name.length === 0 && /^\s$/.test(e.data)) {
                                e.preventDefault();
                              }
                            }}
                            onBlur={(e) => {
                              hanldeCheckForm(e.target.value);
                            }}
                            type="text"
                            name="name"
                            maxLength={30}
                            value={name}
                            disabled={viewDetail}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={(e) => {
                              setName(e.target.value);
                              dispatch(setName(e.target.value));
                              dispatch(setIsNameUnique(false));
                            }}
                          />
                        </Col>
                      </div>

                      <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={2} md={2} xs={2} className="p-0">
                          <label className={QuarterScreen.colFormLabel}>Email</label>
                        </Col>
                        <Col xs={8} sm={8} md={8} className="p-r-0 m-l-15">
                          <input
                            required
                            className={`${QuarterScreen.formControl} ${
                              viewDetail
                                ? "black"
                                : !email
                                  ? "borderRed"
                                  : formik.errors.email || isEmailUnique
                                    ? "borderRed"
                                    : !formik.errors.email && email.length > 1 && !isEmailUnique
                                      ? "borderGreen"
                                      : ""
                            }`}
                            onBlur={(e) => {
                              hanldeCheckEmail(e.target.value);
                            }}
                            type="text"
                            name="email"
                            maxLength={70}
                            value={email}
                            disabled={viewDetail}
                            autoComplete="off"
                            aria-autocomplete="list"
                            onInput={(e) => {
                              setEmail(e.target.value);
                              dispatch(setEmail(e.target.value));
                              dispatch(setIsEmailUnique(false));
                            }}
                          />
                        </Col>
                      </div>
                    </Col>

                    <Col xl={5} lg={5} md={5} sm={5} xs={5} className="m-t-32">
                      <div className="margin-box-1 form-group m-t-18 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <label className={QuarterScreen.colFormLabel}>{t("yard.form.bol")}</label>
                        </Col>
                        <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              !viewDetail ? (bol ? "borderGreen" : !bol && !text ? "borderRed" : "") : ""
                            }`}
                            id="bol"
                            name="bol"
                            checked={bol}
                            disabled={viewDetail || text}
                            onChange={(e) => {
                              dispatch(setBol(e.target.checked));
                            }}
                          />
                        </Col>
                      </div>

                      <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <label className={QuarterScreen.colFormLabel}>Batch Email BOL's</label>
                        </Col>
                        <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            id="bol"
                            name="bol"
                            disabled={viewDetail || !bol}
                            checked={batch}
                            onChange={(e) => {
                              dispatch(setBatch(e.target.checked));
                            }}
                          />
                        </Col>
                      </div>

                      <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0 ">
                          <label className={QuarterScreen.colFormLabel} style={{ minWidth: "150px" }}>
                            All BOL's in One PDF
                          </label>
                        </Col>
                        <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            id="bol"
                            name="bol"
                            disabled={viewDetail || !batch}
                            checked={bolsAsOnePDF}
                            onChange={(e) => {
                              dispatch(setBOLsAsOnePDF(e.target.checked));
                            }}
                          />
                        </Col>
                      </div>

                      <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <label className={QuarterScreen.colFormLabel}>Text Email</label>
                        </Col>
                        <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0 ${
                              !viewDetail ? (text ? "borderGreen" : !bol && !text ? "borderRed" : "") : ""
                            }`}
                            id="bol"
                            name="bol"
                            disabled={viewDetail || bol}
                            checked={text}
                            onChange={(e) => {
                              dispatch(setText(e.target.checked));
                            }}
                          />
                        </Col>
                      </div>

                      <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <label className={QuarterScreen.colFormLabel}>Return Email BOL's</label>
                        </Col>
                        <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            id="bol"
                            name="bol"
                            disabled={viewDetail}
                            checked={returnEmailBOLs}
                            onChange={(e) => {
                              dispatch(setReturnEmailBOLs(e.target.checked));
                            }}
                          />
                        </Col>
                      </div>
                      <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                        <Col sm={4} md={4} xs={4} className="p-0">
                          <label className={QuarterScreen.colFormLabel}> Return Text Email </label>
                        </Col>
                        <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            id="bol"
                            name="bol"
                            disabled={viewDetail}
                            checked={returnTextEmail}
                            onChange={(e) => {
                              dispatch(setReturnTextEmail(e.target.checked));
                            }}
                          />
                        </Col>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default FormContent;
