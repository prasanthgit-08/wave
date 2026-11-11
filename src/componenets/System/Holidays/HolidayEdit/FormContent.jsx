import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreenSearchFilter from "../../../common/QuarterScreenSearchFilter";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import {
  setCanadian,
  setDate,
  setDescription,
  setEditFormData,
  setHolidayPK,
  setIsDateValid,
  setUs,
  setViewDetail,
  setAtleastOneCheck,
} from "../../../../redux/HolidaysSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import HolidaysService from "../../../../services/HolidaysService";
import DateInputField from "../../../common/DateInputField";
import { formatDate, formatDatetimeToDate } from "../../../../utils/dateUtils";
import { updateField } from "../../../../utils/stateUtils";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";

function FormContent(styles) {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const viewDetail = useSelector((state) => state.holidaysReducer.viewDetail);
  const date = useSelector((state) => state.holidaysReducer.date);
  const description = useSelector((state) => state.holidaysReducer.description);
  const us = useSelector((state) => state.holidaysReducer.us);
  const canadian = useSelector((state) => state.holidaysReducer.canadian);
  const editFormData = useSelector((state) => state.holidaysReducer.editFormData);
  const changesCancelled = useSelector((state) => state.holidaysReducer.changesCancelled);
  const isDateValid = useSelector((state) => state.holidaysReducer.isDateValid);
  const [localDate, setLocalDate] = useState(""); // Local state to track date changes

  const fetchRecord = (id) => {
    setLoading(true);
    dispatch(setEditFormData(null));
    dispatch(
      setDate({
        date: "",
        dateInput: "",
        isDateValid: true,
      })
    );
    setLocalDate("");
    HolidaysService.getHolidayById(id)
      .then((res) => {
        const data = res.data;

        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/holidays`);
      })
      .finally(() => setLoading(false));
  };
  const checkDateExist = (date) => {
    HolidaysService.checkDateExist(date, id)

      .then((res) => {
        dispatch(setIsDateValid(res.data ? true : false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDateChange = (value) => {
    setDate((prev) => ({ ...prev, date: value }));
    setLocalDate(value);
    if (value) {
      checkDateExist(value);
    }
  };
  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setHolidayPK(""));
      dispatch(setDate({ date: "", dateInput: "", isDateValid: true }));
      dispatch(setDescription(""));
      dispatch(setUs(""));
      dispatch(setCanadian(""));
    }
  }, [editFormData]);

  const validationSchema = yup.object({
    description: yup.string().required(),
    date: yup.date().required(),
  });

  useEffect(() => {
    if (editFormData === undefined) {
      dispatch(setHolidayPK(null));
      dispatch(setDate({ date: "", dateInput: "", isDateValid: true }));
      dispatch(setDescription(""));
      dispatch(setUs(false));
      dispatch(setCanadian(false));
    }
    if (editFormData != null) {
      dispatch(setHolidayPK(editFormData.holidayPK ? editFormData.holidayPK : ""));
      dispatch(
        setDate({
          date: formatDatetimeToDate(editFormData?.date),
          dateInput: formatDate(editFormData?.date),
          isDateValid: true,
        })
      );
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
      dispatch(setUs(editFormData.us ? editFormData.us : ""));
      dispatch(setCanadian(editFormData.canadian ? editFormData.canadian : ""));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (us || canadian) {
      dispatch(setAtleastOneCheck(false));
    } else {
      dispatch(setAtleastOneCheck(true));
    }
  }, [us, canadian]);

  useEffect(() => {
    if (id) fetchRecord(id);
  }, [id]);

  return (
    <Formik
      initialValues={{
        date,
        description,
        us,
        canadian,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        url: true,
      }}
    >
      {(formik) => (
        <form>
          <div className="w-100 p-2">
            {loading && <LoadingIcon />}
            <div className="shadow-sm rounded border quarterScreenFormContentHeight">
              <div className="m-b-10">
                <div className="p-15 w-100">
                  <Col xl={8} lg={8} md={8} sm={8} xs={8} className="m-t-32">
                    <div className="m-t-20 form-group  m-b-15 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="pl-4 ">
                        <label className={QuarterScreenSearchFilter.colFormLabel}>Date</label>
                      </Col>
                      <Col xs={3} sm={3} md={3} className="p-0 m-l-15" style={{ width: "95px" }}>
                        <DateInputField
                          className={`${
                            !viewDetail
                              ? date?.date && date?.isDateValid && isDateValid
                                ? "borderGreen"
                                : "borderRed"
                              : ""
                          }`}
                          date={date.date}
                          setDate={(value) => {
                            handleDateChange(value);
                            updateField(setDate, { date: value }, dispatch);
                          }}
                          setIsDateValid={(value) => updateField(setDate, { isDateValid: value }, dispatch)}
                          disabled={viewDetail}
                        />
                      </Col>
                    </div>

                    <div className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0">
                      <Col sm={2} md={2} xs={2} className="pl-4 ">
                        <label className={QuarterScreen.colFormLabel}>Holiday</label>
                      </Col>
                      <Col xs={5} sm={5} md={5} className="p-0 m-l-15">
                        <input
                          className={`${QuarterScreen.formControl} ${
                            viewDetail
                              ? "black"
                              : formik.errors.description === undefined && description.length > 1
                                ? "borderGreen"
                                : formik.errors.description
                                  ? "borderRed"
                                  : "borderGreen"
                          } `}
                          type="text"
                          name="holiday"
                          maxLength={30}
                          value={description}
                          disabled={viewDetail}
                          autoComplete="off"
                          aria-autocomplete="list"
                          onInput={(e) => {
                            dispatch(setDescription(e.target.value));
                          }}
                          style={{
                            borderColor:
                              viewDetail === true
                                ? "black"
                                : formik.errors.description === undefined && description.length > 1
                                  ? "green"
                                  : formik.errors.description !== undefined
                                    ? "red"
                                    : "",
                          }}
                        />
                      </Col>
                    </div>

                    <div
                      className="margin-box-1 form-group m-t-15 m-b-20 align-items-center row m-l-0 m-r-0"
                      style={{ paddingTop: "5px" }}
                    >
                      <Col sm={2} md={2} xs={2} className="pl-4 ">
                        <label className={QuarterScreen.colFormLabel}>US</label>
                      </Col>
                      <Col xs={6} sm={6} md={6} className="p-0 m-l-15">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            !viewDetail ? (us ? "borderGreen" : !canadian && !us ? "borderRed" : "") : ""
                          }`}
                          id="us"
                          name="us"
                          checked={us}
                          disabled={viewDetail}
                          onChange={(e) => {
                            dispatch(setUs(e.target.checked));
                          }}
                        />
                      </Col>
                    </div>

                    <div
                      className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row m-l-0 m-r-0"
                      style={{ paddingTop: "7px" }}
                    >
                      <Col sm={2} md={2} xs={2} className="pl-4  ">
                        <label className={QuarterScreen.colFormLabel}>Canadian</label>
                      </Col>
                      <Col xs={6} sm={6} md={6} className="p-0 m-l-15">
                        <input
                          type="checkbox"
                          className={`form-check-input p-0 ${
                            !viewDetail
                              ? canadian
                                ? "borderGreen"
                                : !canadian && !us
                                  ? "borderRed"
                                  : ""
                              : ""
                          }`}
                          id="canadian"
                          name="canadian"
                          disabled={viewDetail}
                          checked={canadian}
                          onChange={(e) => {
                            dispatch(setCanadian(e.target.checked));
                          }}
                        />
                      </Col>
                    </div>
                  </Col>
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
