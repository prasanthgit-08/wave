import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TermsService from "../../../../services/TermsService";
import {
  setDescription,
  setDescriptionValid,
  setEditFormData,
  setInvoiceDays,
  setTerms,
  setTermsCode,
  setTermsCodeValid,
  setTermValid,
  setViewDetail,
} from "../../../../redux/TermsSlice";
import LoadingIcon from "../../../common/LoadingIcon";

function TermsEditContent({ styles }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changesCancelled = useSelector((state) => state.termsReducer.changesCancelled);
  const description = useSelector((state) => state.termsReducer.description);
  const terms = useSelector((state) => state.termsReducer.terms);
  const invoiceDays = useSelector((state) => state.termsReducer.invoiceDays);
  const termsCode = useSelector((state) => state.termsReducer.termsCode);
  const editFormData = useSelector((state) => state.termsReducer.editFormData);
  const viewDetail = useSelector((state) => state.termsReducer.viewDetail);
  const descriptionValid = useSelector((state) => state.termsReducer.descriptionValid);
  const termValid = useSelector((state) => state.termsReducer.termValid);

  const termsCodeValid = useSelector((state) => state.termsReducer.termsCodeValid);

  const { id } = useParams();

  const fetchRecordById = (id) => {
    dispatch(setEditFormData(null));
    setLoading(true);
    TermsService.getTermsById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/terms-browse");
      })
      .finally(() => setLoading(false));
  };

  const handleCheckUniqueDescription = (value) => {
    TermsService.checkDescription(value, id)
      .then((res) => {
        if (res.data.length > 0) {
          dispatch(setDescriptionValid(false));
        } else {
          dispatch(setDescriptionValid(true));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCheckUniquePassport = (value) => {
    TermsService.checkPassport(value, id)
      .then((res) => {
        if (res.data.length > 0) {
          dispatch(setTermsCodeValid(false));
        } else {
          dispatch(setTermsCodeValid(true));
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCheckUniqueTerm = (value) => {
    TermsService.checkTerms(value, id)
      .then((res) => {
        if (res.data.length > 0) {
          dispatch(setTermValid(false));
        } else {
          dispatch(setTermValid(true));
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
    }
  }, [id, changesCancelled]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description?.trim() || ""));
      dispatch(setTerms(editFormData.terms?.trim() || ""));
      dispatch(setInvoiceDays(editFormData.invoiceDueDays || "0"));
      dispatch(setTermsCode(editFormData.termsCode?.trim() || ""));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setDescription(""));
      dispatch(setTerms(""));
      dispatch(setInvoiceDays(""));
      dispatch(setTermsCode(""));
    }
  }, [editFormData]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col xl={8} lg={8} md={8} sm={8} xs={8} className="m-t-32">
              <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="pl-4 ">
                  <label className={QuarterScreen.colFormLabel}>Description</label>
                </Col>
                <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                  <input
                    className={`${styles.formControl} ${
                      viewDetail === true
                        ? ""
                        : description !== "" && descriptionValid
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    type="text"
                    name="terms"
                    value={description}
                    onChange={(e) => {
                      dispatch(setDescription(e.target.value));
                      dispatch(setDescriptionValid(true));
                    }}
                    onBlur={(e) => {
                      if (e.target.value) {
                        handleCheckUniqueDescription(e.target.value);
                      }
                    }}
                    disabled={viewDetail}
                    id="description"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </div>
              <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="pl-4 ">
                  <label className={QuarterScreen.colFormLabel}>Terms</label>
                </Col>
                <Col xs={7} sm={7} md={7} className="p-r-0 m-l-15">
                  <input
                    className={`${styles.formControl} ${
                      viewDetail === true ? "" : terms !== "" && termValid ? "borderGreen" : "borderRed"
                    }`}
                    type="text"
                    name="terms"
                    value={terms}
                    onChange={(e) => {
                      dispatch(setTerms(e.target.value));
                      dispatch(setTermValid(true));
                    }}
                    onBlur={(e) => {
                      if (e.target.value) {
                        handleCheckUniqueTerm(e.target.value);
                      }
                    }}
                    disabled={viewDetail}
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </Col>
              </div>
              <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="pl-4 ">
                  <label className={QuarterScreen.colFormLabel}>Invoice Days</label>
                </Col>
                <div className="p-r-0 m-l-15 w-60px">
                  <input
                    className={`${styles.formControl} ${
                      viewDetail === true
                        ? ""
                        : invoiceDays !== "" && invoiceDays >= 0 && invoiceDays <= 90
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    type="text"
                    name="terms"
                    value={invoiceDays}
                    onChange={(e) => {
                      dispatch(setInvoiceDays(e.target.value.replace(/[^\d]/g, "")));
                    }}
                    disabled={viewDetail}
                    maxLength={2}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </div>
              </div>
              <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="pl-4 ">
                  <label className={`${QuarterScreen.colFormLabel} text-nowrap`}>Passport Terms Code</label>
                </Col>
                <div className="pe-0 m-l-15 w-60px">
                  <input
                    className={`${styles.formControl} ${
                      viewDetail === true
                        ? ""
                        : termsCode !== "" && termsCodeValid
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    type="text"
                    name="terms"
                    value={termsCode}
                    onChange={(e) => {
                      dispatch(setTermsCode(e.target.value));
                      dispatch(setTermsCodeValid(true));
                    }}
                    onBlur={(e) => {
                      if (e.target.value) {
                        handleCheckUniquePassport(e.target.value);
                      }
                    }}
                    disabled={viewDetail}
                    maxLength={3}
                    autoComplete="off"
                    aria-autocomplete="list"
                  />
                </div>
              </div>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsEditContent;
