import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { Form, Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import Input from "../../../../../components/common/input";
import LookupButton from "../../../../common/LookupButton";
import LoadingIcon from "../../../../common/LoadingIcon";
import {
  setAmountToBeReserved,
  setCancelFlag,
  setConcurrent,
  setDateMessage,
  setDeductDelease,
  setDeductMonthly,
  setDeductYearly,
  setDeductionDate,
  setDeductionMileageRate,
  setDeductionPercentage,
  setDescription,
  setDescriptionUnique,
  setEditFormData,
  setIsDescriptionUnique,
  setIsToDateValidation,
  setListingReserveTypesData,
  setMileageRequired,
  setMonthlyActivityOverride,
  setOverrideAmounts,
  setPercentageRequired,
  setRequired,
  setReservePK,
  setReserveTypeFK,
  setReserveTypeId,
  setReserveTypeInput,
  setReserveTypeRequired,
  setReserveTypeSelection,
  setRestricted,
  setViewDetail,
} from "../../../../../redux/ReservesSlice";
import ReservesService from "../../../../../services/ReservesService";
import ReserveTypeService from "../../../../../services/ReserveTypeService";
import ReserveTypeLookup from "../../../../LookupScreens/ReserveType/ReserveTypeLookup";
import DateInputField from "../../../../common/DateInputField";
import formatMonthDayToISODate from "../../../../../utils/formatMonthDayToISODate";
import { correctDecimalInputOnBlur, formatMinTwoDecimals, isOnlyDot } from "../../../../../utils/utils";

function ReservesFormContent({ styles }) {
  const { id } = useParams();
  const [reserveTypeData, setReserveTypeData] = useState([]);
  const [dateErr] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const [restrictedCheck, setRestrictedCheck] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const editFormData = useSelector((state) => state.reservesReducer.editFormData);
  const viewDetail = useSelector((state) => state.reservesReducer.viewDetail);
  const description = useSelector((state) => state.reservesReducer.description);
  const reserveTypeInput = useSelector((state) => state.reservesReducer.reserveTypeInput);
  const isDescriptionUnique = useSelector((state) => state.reservesReducer.isDescriptionUnique);
  const reserveTypeId = useSelector((state) => state.reservesReducer.reserveTypeId);
  const amountToBeReserved = useSelector((state) => state.reservesReducer.amountToBeReserved);
  const deductMonthly = useSelector((state) => state.reservesReducer.deductMonthly);
  const deductYearly = useSelector((state) => state.reservesReducer.deductYearly);
  const isToDateValidation = useSelector((state) => state.reservesReducer.isToDateValidation);
  const [localDeductionDate, setLocalDeductionDate] = useState("");

  /* the deduction date is a month/day without a year - one already past this year means its
     next occurrence, so the calendar (which has no past dates) selects it in next year */
  const toNextOccurrenceISODate = (monthDay) => {
    const isoDate = formatMonthDayToISODate(monthDay);
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-").map(Number);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(year, month - 1, day) >= today) return isoDate;
    // 02/29 has no next-year occurrence in a non-leap year - keep it as is
    if (new Date(year + 1, month - 1, day).getMonth() !== month - 1) return isoDate;
    return `${year + 1}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const clearYearlyDeductionDate = () => {
    dispatch(setDeductionDate(""));
    setLocalDeductionDate("");
    setDateInput("");
  };
  const deductionDate = useSelector((state) => state.reservesReducer.deductionDate);
  const deductDelease = useSelector((state) => state.reservesReducer.deductDelease);
  const percentageRequired = useSelector((state) => state.reservesReducer.percentageRequired);
  const deductionPercentage = useSelector((state) => state.reservesReducer.deductionPercentage);
  const mileageRequired = useSelector((state) => state.reservesReducer.mileageRequired);
  const deductionMileageRate = useSelector((state) => state.reservesReducer.deductionMileageRate);
  const restricted = useSelector((state) => state.reservesReducer.restricted);
  const concurrent = useSelector((state) => state.reservesReducer.concurrent);
  const required = useSelector((state) => state.reservesReducer.required);
  const overrideAmounts = useSelector((state) => state.reservesReducer.overrideAmounts);
  const reserveTypeSelection = useSelector((state) => state.reservesReducer.reserveTypeSelection);
  const monthlyActivityOverride = useSelector((state) => state.reservesReducer.monthlyActivityOverride);
  const cancelFlag = useSelector((state) => state.reservesReducer.cancelFlag);
  const reserveTypeRequired = useSelector((state) => state.reservesReducer.reserveTypeRequired);
  const [loading, setLoading] = useState(false);
  const [reserveTypesLoading, setreserveLoading] = useState(false);
  window.addEventListener("popstate", () => {
    dispatch(setIsDescriptionUnique(false));
  });

  const fetchRecord = (id) => {
    setLoading(true);
    ReservesService.getReservesDataById(id)
      .then((res) => {
        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
        dispatch(setReserveTypeRequired(res.data.reserveTypeRequired));
      })
      .catch((err) => {
        navigate(`/reserves`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleReserveTypeLookupSelection = (data) => {
    dispatch(setReserveTypeInput(data.description));
    dispatch(setReserveTypeId(data.reserveTypePK));
    dispatch(setReserveTypeRequired(data.required));
    dispatch(setRequired(data.required));
    dispatch(setReserveTypeSelection(false));
  };

  //   //form type lookup
  const hideReserveTypeModal = () => {
    dispatch(setReserveTypeSelection(false));
  };

  const handleReserveTypeLookupModalShow = () => {
    dispatch(setReserveTypeSelection(true));
  };

  const fetchReserveType = (reserveTypeFK) => {
    setreserveLoading(true);
    ReserveTypeService.getReserveTypeForAuto(reserveTypeFK)
      .then((response) => {
        const data = response.data.content;
        const reserveTypeList = data?.map((reserveTypes) => ({
          ...reserveTypes,
          description: reserveTypes.description?.trim(),
        }));
        setReserveTypeData(reserveTypeList);
        dispatch(setListingReserveTypesData(reserveTypeList));
      })
      .finally(() => {
        setreserveLoading(false);
      });
  };

  const hanldeCheckDescription = (string) => {
    ReservesService.checkDescriptionExist(id, description)
      .then((res) => {
        dispatch(setIsDescriptionUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(setDateMessage(dateErr));
  }, [dateErr]);
  useEffect(() => {
    if (id) dispatch(setIsDescriptionUnique(false));
    hanldeCheckDescription(description);
  }, [cancelFlag, id, viewDetail]);

  useEffect(() => {
    if (id && cancelFlag) setDateInput(deductionDate);

    setLocalDeductionDate(toNextOccurrenceISODate(dateInput));
  }, [id, viewDetail, cancelFlag]);

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setReservePK(""));
      dispatch(setReserveTypeFK(""));
      dispatch(setDescription(""));
      dispatch(setReserveTypeId(null));
      dispatch(setReserveTypeInput(""));
      dispatch(setAmountToBeReserved(""));
      dispatch(setDeductMonthly(""));
      dispatch(setDeductYearly(""));
      dispatch(setDeductionDate(""));
      dispatch(setDeductDelease(""));
      dispatch(setDeductionPercentage(""));
      dispatch(setPercentageRequired(false));
      dispatch(setDeductionMileageRate(""));
      dispatch(setMileageRequired(false));
      dispatch(setRestricted(false));
      dispatch(setReserveTypeRequired(false));
      dispatch(setCancelFlag(false));
      setRestrictedCheck(false);
      dispatch(setConcurrent(false));
      dispatch(setRequired(false));
      dispatch(setOverrideAmounts(false));
      dispatch(setDescriptionUnique(false));
    }
  }, [editFormData]);

  useEffect(() => {
    if (reserveTypeInput !== "" && reserveTypeRequired === true) {
      if (editFormData?.required === true) {
        setRestrictedCheck(true);
      } else {
        setRestrictedCheck(false);
      }

      setRestrictedCheck(true);
    } else {
      setRestrictedCheck(false);
    }
  }, [reserveTypeInput, id, editFormData]);

  useEffect(() => {
    dispatch(setDeductionPercentage("0"));
    dispatch(setDeductionMileageRate("0.00"));
  }, []);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setReservePK(editFormData.reservePK ? editFormData.reservePK : ""));
      dispatch(setReserveTypeId(editFormData.reserveTypeId ? editFormData.reserveTypeId : null));

      dispatch(
        setReserveTypeInput(editFormData.reserveTypeDescription ? editFormData.reserveTypeDescription : "")
      );

      dispatch(setDescription(editFormData.description ? editFormData.description : ""));
      dispatch(
        setAmountToBeReserved(
          editFormData.amountToBeReserved ? formatMinTwoDecimals(editFormData.amountToBeReserved) : ""
        )
      );
      dispatch(
        setDeductMonthly(
          editFormData.deductMonthly != null ? formatMinTwoDecimals(editFormData.deductMonthly) : ""
        )
      );
      dispatch(
        setMonthlyActivityOverride(
          editFormData.monthlyActivityOverride ? editFormData.monthlyActivityOverride : ""
        )
      );
      dispatch(
        setDeductYearly(
          editFormData.deductYearly != null ? formatMinTwoDecimals(editFormData.deductYearly) : ""
        )
      );

      // dispatch(setDeductionDate(editFormData.deductionDate !== null ? editFormData.deductionDate?.trim() : ''));
      // Converting MM/DD date from backend to valid date fromat for Calendar input
      setLocalDeductionDate(
        editFormData.deductionDate ? toNextOccurrenceISODate(editFormData.deductionDate?.trim()) : ""
      );

      dispatch(
        setDeductDelease(
          editFormData.deductDelease != null ? formatMinTwoDecimals(editFormData.deductDelease) : ""
        )
      );
      dispatch(setPercentageRequired(editFormData.percentageRequired ? editFormData.percentageRequired : ""));

      dispatch(
        setDeductionPercentage(editFormData.deductionPercentage ? editFormData.deductionPercentage : "0")
      );

      dispatch(setMileageRequired(editFormData.mileageRequired ? editFormData.mileageRequired : ""));

      dispatch(
        setDeductionMileageRate(
          editFormData.deductionMileageRate ? formatMinTwoDecimals(editFormData.deductionMileageRate) : "0.00"
        )
      );
      dispatch(setRestricted(editFormData.restricted ? editFormData.restricted : ""));
      dispatch(setConcurrent(editFormData.concurrent ? editFormData.concurrent : ""));

      dispatch(setRequired(editFormData.required ? editFormData.required : ""));
      dispatch(setOverrideAmounts(editFormData.overrideAmounts ? editFormData.overrideAmounts : ""));
    }
  }, [editFormData, viewDetail, id]);
  // load the record when it opens, and reload the saved values on a confirmed Cancel (flag turning
  // true) - not when Edit resets the flag, which would drop straight back to view mode
  const loadedIdRef = useRef(null);
  useEffect(() => {
    if (!id) return;
    if (loadedIdRef.current !== id || cancelFlag) fetchRecord(id);
    loadedIdRef.current = id;
  }, [id, cancelFlag]);

  useEffect(() => {
    if (!deductMonthly) {
      dispatch(setMonthlyActivityOverride(false));
    }
  }, [deductMonthly]);

  return (
    <Formik
      initialValues={{ deductionDate }}
      validationSchema={""}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        deductionDate: true,
      }}
    >
      {(formik) => (
        <div className="p-2">
          {loading && <LoadingIcon />}
          <div className="p-15 shadow-sm rounded border halfScreenFormContentHeight">
            <Row className="m-0 p-0">
              <Col md={6} xs={6}>
                <Form.Group
                  className={`mt-5 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Description
                    </Form.Label>
                  </Col>

                  <Col xs={8} md={8} className="p-0" style={{ width: "350px" }}>
                    <Input
                      className={`${styles.formControl} ${
                        viewDetail || loading
                          ? ""
                          : description.length >= 1 && !isDescriptionUnique
                            ? "borderGreen"
                            : "borderRed"
                      }`}
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      maxLength={30}
                      disabled={viewDetail}
                      onChange={(e) => {
                        const value = e.target.value.replace(/^\s+/g, "");
                        formik.handleChange(e);
                        dispatch(setDescription(value));
                        dispatch(setIsDescriptionUnique(""));
                      }}
                      onBlur={(e) => {
                        if (e.target.value) {
                          hanldeCheckDescription(e.target.value);
                        }
                      }}
                    />
                  </Col>
                  <Row className={`${!viewDetail && isDescriptionUnique ? "" : "hide-elements"}`}>
                    <Col xs={3} md={3} sm={3}></Col>
                    <Col style={{ paddingLeft: "5px" }}>
                      <p className="p-0 text-danger alert" style={{ height: "1px" }}>
                        {/* {`Description '${description}' already exists!`} */}
                      </p>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="margin-box-5 form-group m-t-5 m-b-10 align-items-center d-flex tabs-row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <div className="p-0 w-90px">
                      <Form.Label className="col-form-label dealer-label m-l-0">Reserve Type</Form.Label>
                    </div>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                    <AutoCompleteDropdown
                      className={`${!viewDetail ? (reserveTypeId ? "borderGreen" : "borderRed") : ""}`}
                      arrayList={reserveTypeData}
                      searchString={reserveTypeInput}
                      renderItemId={(data) => data.reserveTypePK}
                      renderItemField={(data) => data.description}
                      handleSearchString={(string) => dispatch(setReserveTypeInput(string))}
                      fetchDataBySearchString={fetchReserveType}
                      onSelect={handleReserveTypeLookupSelection}
                      selectedId={reserveTypeId}
                      disabled={viewDetail}
                      loading={reserveTypesLoading}
                      clearInputCallback={() => {
                        dispatch(setReserveTypeId(null));
                        dispatch(setReserveTypeFK(""));
                        dispatch(setRequired(false));
                        setRestrictedCheck(false);
                      }}
                      maxHeight={"200px"}
                    />
                    <LookupButton onClick={handleReserveTypeLookupModalShow} disabled={viewDetail} />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Reserve Amount
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} className="p-0" style={{ width: "100px" }}>
                    <Input
                      className={`${styles.formControl} ${
                        !viewDetail || loading
                          ? !amountToBeReserved || (!percentageRequired && !mileageRequired)
                            ? percentageRequired || mileageRequired || isOnlyDot(amountToBeReserved)
                              ? "borderRed"
                              : ""
                            : Number(amountToBeReserved) === 0 || isOnlyDot(amountToBeReserved)
                              ? "borderRed"
                              : "borderGreen"
                          : ""
                      }`}
                      id="amountToBeReserved"
                      name="amountToBeReserved"
                      type="text"
                      value={amountToBeReserved}
                      defaultValue={amountToBeReserved}
                      onBeforeInput={(e) => {
                        const inputValue = e.target.value;
                        const selectionStart = e.target.selectionStart;
                        const selectionEnd = e.target.selectionEnd;
                        const newValue =
                          inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);
                        const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // allows numbers like 0, 0., 123456.78
                        const startsWithZeroFollowedByDigit = /^0\d/;
                        // Check if the new value adheres to the format and doesn't start with '0' or '.'

                        if (
                          (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) ||
                          (startsWithZeroFollowedByDigit.test(newValue) &&
                            newValue.length > 8 &&
                            newValue[1] !== ".") ||
                          parseFloat(newValue) > 999999.99
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "." || /^\d{0,5}(\.\d{0,2})?$/.test(val)) {
                          dispatch(setAmountToBeReserved(val));
                        }
                      }}
                      disabled={viewDetail || (!percentageRequired && !mileageRequired)}
                      onBlur={(e) => {
                        dispatch(
                          setAmountToBeReserved(
                            formatMinTwoDecimals(correctDecimalInputOnBlur(e.target.value))
                          )
                        );
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Deduct Monthly
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} className="p-0" style={{ width: "100px" }}>
                    <Input
                      className={`${styles.formControl} ${
                        (!viewDetail || loading) &&
                        (deductMonthly ? (isOnlyDot(deductMonthly) ? "borderRed" : "") : "")
                      }`}
                      id="deductMonthly"
                      name="deductMonthly"
                      type="text"
                      value={deductMonthly}
                      defaultValue={0.0}
                      onBeforeInput={(e) => {
                        const inputValue = e.target.value;
                        const selectionStart = e.target.selectionStart;
                        const selectionEnd = e.target.selectionEnd;
                        const newValue =
                          inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                        // Check if the new value adheres to the format and doesn't start with '0' or '.'
                        const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // allows numbers like 0, 0., 123456.78
                        const startsWithZeroFollowedByDigit = /^0\d/;
                        // Check if the new value adheres to the format and doesn't start with '0' or '.'

                        if (
                          (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) ||
                          (startsWithZeroFollowedByDigit.test(newValue) &&
                            newValue.length > 8 &&
                            newValue[1] !== ".") ||
                          parseFloat(newValue) > 999999.99
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "." || /^\d{0,5}(\.\d{0,2})?$/.test(val)) {
                          dispatch(setDeductMonthly(val));
                        }
                      }}
                      disabled={viewDetail}
                      onBlur={(e) => {
                        dispatch(
                          setDeductMonthly(formatMinTwoDecimals(correctDecimalInputOnBlur(e.target.value)))
                        );
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={2} md={3} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">
                      Monthly Activity Override
                    </Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      id="monthlyActivityOverride"
                      name="monthlyActivityOverride"
                      checked={monthlyActivityOverride}
                      disabled={viewDetail || !deductMonthly}
                      onChange={(e) => {
                        if (!deductMonthly) {
                          dispatch(setMonthlyActivityOverride(false));
                        }
                        dispatch(setMonthlyActivityOverride(e.target.checked));
                      }}
                      //
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-3 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Deduct Yearly
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} className="p-0" style={{ width: "100px" }}>
                    <Input
                      className={`${styles.formControl} ${
                        // 0 is a valid "no yearly deduction" - only a lone "." (half-typed) is red
                        (!viewDetail || loading) && isOnlyDot(deductYearly) ? "borderRed" : ""
                      }`}
                      id="deductYearly"
                      name="deductYearly"
                      type="text"
                      value={deductYearly}
                      defaultValue={0.0}
                      onBeforeInput={(e) => {
                        const inputValue = e.target.value;
                        const selectionStart = e.target.selectionStart;
                        const selectionEnd = e.target.selectionEnd;
                        const newValue =
                          inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                        // Check if the new value adheres to the format and doesn't start with '0' or '.'
                        const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // allows numbers like 0, 0., 123456.78
                        const startsWithZeroFollowedByDigit = /^0\d/;
                        // Check if the new value adheres to the format and doesn't start with '0' or '.'

                        if (
                          (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) ||
                          (startsWithZeroFollowedByDigit.test(newValue) &&
                            newValue.length > 8 &&
                            newValue[1] !== ".") ||
                          parseFloat(newValue) > 999999.99
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "." || /^\d{0,5}(\.\d{0,2})?$/.test(val)) {
                          dispatch(setDeductYearly(val));
                          // cleared amount - the date goes right away, not only on blur
                          if (val === "") clearYearlyDeductionDate();
                        }
                      }}
                      disabled={viewDetail}
                      onBlur={(e) => {
                        // an empty field stays empty - correctDecimalInputOnBlur turns "" into 0, which the
                        // next blur re-reads as "0" and flags red
                        dispatch(
                          setDeductYearly(
                            e.target.value?.trim() === ""
                              ? ""
                              : formatMinTwoDecimals(correctDecimalInputOnBlur(e.target.value))
                          )
                        );
                        // blank or any zero (0, 0.0, 0.00) means no yearly deduction, so its date goes too
                        if (
                          e.target.value === "" ||
                          Number(e.target.value) === 0 ||
                          isOnlyDot(deductYearly)
                        ) {
                          clearYearlyDeductionDate();
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-0 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Yearly Deduction Date
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0">
                    <DateInputField
                      dateInput={dateInput}
                      setDateInput={setDateInput}
                      date={localDeductionDate}
                      setDate={setLocalDeductionDate}
                      format={"MM/DD"}
                      formatPayloadWithoutYear
                      rollPastMonthDayToNextYear
                      min={new Date()}
                      setPayloadDate={(value) => {
                        dispatch(setDeductionDate(value));
                        setDateInput(value);
                      }}
                      setIsDateValid={(value) => dispatch(setIsToDateValidation(value))}
                      className={`styles.formControl ${
                        !viewDetail
                          ? deductYearly &&
                            parseFloat(deductYearly) !== 0 &&
                            // localDeductionDate is set in the same update as the validity flag; the redux
                            // deductionDate follows an effect later and caused a one-render red flash
                            (!localDeductionDate || !isToDateValidation)
                            ? "borderRed"
                            : deductYearly === "" || parseFloat(deductYearly) === 0
                              ? ""
                              : "borderGreen"
                          : ""
                      }`}
                      disabled={viewDetail || deductYearly === "" || parseFloat(deductYearly) === 0}
                      smallInput
                      clearDateTrigger
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-0 m-b-15 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Deduct Delease
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} className="p-0" style={{ width: "100px" }}>
                    <Input
                      className={`${styles.formControl} ${
                        (!viewDetail || loading) &&
                        (deductDelease ? (isOnlyDot(deductDelease) ? "borderRed" : "") : "")
                      }`}
                      id="deductDelease"
                      name="deductDelease"
                      type="text"
                      value={deductDelease}
                      defaultValue={0.0}
                      onBeforeInput={(e) => {
                        const inputValue = e.target.value;
                        const selectionStart = e.target.selectionStart;
                        const selectionEnd = e.target.selectionEnd;
                        const newValue =
                          inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                        // Check if the new value adheres to the format and doesn't start with '0' or '.'
                        const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // allows numbers like 0, 0., 123456.78
                        const startsWithZeroFollowedByDigit = /^0\d/;

                        if (
                          (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) ||
                          (startsWithZeroFollowedByDigit.test(newValue) &&
                            newValue.length > 8 &&
                            newValue[1] !== ".") ||
                          parseFloat(newValue) > 999999.99
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "." || /^\d{0,5}(\.\d{0,2})?$/.test(val)) {
                          dispatch(setDeductDelease(val));
                        }
                      }}
                      disabled={viewDetail}
                      onBlur={(e) => {
                        dispatch(
                          setDeductDelease(formatMinTwoDecimals(correctDecimalInputOnBlur(e.target.value)))
                        );
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/* Right side */}

              <Col className="pt-0 p-6" xs={6} md={6}>
                <Form.Group
                  className={`mt-5 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={2} md={3} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Percentage Required</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? percentageRequired
                            ? " "
                            : Number(amountToBeReserved) > 0 && !mileageRequired
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="percentageRequired"
                      name="percentageRequired"
                      checked={percentageRequired}
                      disabled={viewDetail || mileageRequired}
                      onChange={(e) => {
                        if (percentageRequired) {
                          dispatch(setDeductionPercentage("0"));
                          dispatch(setAmountToBeReserved(""));
                        } else {
                          dispatch(setDeductionPercentage(1));
                        }
                        dispatch(setPercentageRequired(e.target.checked));
                      }}
                      //
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Percentage
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} className="p-0" style={{ width: "50px" }}>
                    <Input
                      className={`${styles.formControl} ${
                        viewDetail
                          ? "black"
                          : percentageRequired && (!deductionPercentage || Number(deductionPercentage) === 0)
                            ? "borderRed"
                            : "black"
                      }`}
                      id="deductionPercentage"
                      name="deductionPercentage"
                      type="text"
                      value={deductionPercentage}
                      maxLength={2}
                      defaultValue={0.0}
                      onBeforeInput={(e) => {
                        // Check if the entered character is a digit
                        if (!/^\d$/.test(e.data)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const currentValue = e.target.value;
                        const proposedValue = currentValue + (e.data || "");

                        if (!/^(0|[1-9][0-9]?)$/.test(proposedValue)) {
                          e.preventDefault();
                        }

                        if (/^0[1-9]$/.test(proposedValue)) {
                          e.preventDefault();
                          const newValue = proposedValue.substring(1);
                          e.target.value = newValue;
                        }
                      }}
                      disabled={viewDetail || !percentageRequired}
                      onInput={(e) => {
                        if (percentageRequired) {
                          dispatch(setDeductionPercentage(e.target.value));
                        } else {
                          dispatch(setDeductionPercentage("0"));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Mileage Required</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 ${
                        !viewDetail
                          ? mileageRequired
                            ? " "
                            : Number(amountToBeReserved) > 0 && !percentageRequired
                              ? "borderRed"
                              : ""
                          : ""
                      }`}
                      id="mileageRequired"
                      name="mileageRequired"
                      checked={mileageRequired}
                      disabled={viewDetail || percentageRequired}
                      onChange={(e) => {
                        if (mileageRequired) {
                          dispatch(setDeductionMileageRate("0.00"));
                          dispatch(setAmountToBeReserved(""));
                        } else {
                          dispatch(setDeductionMileageRate(1));
                        }
                        dispatch(setMileageRequired(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label htmlFor="name" className="col-form-label dealer-label">
                      Mileage Rate
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "60px" }}>
                    <Input
                      className={`${styles.formControl} ${
                        viewDetail
                          ? "black"
                          : mileageRequired &&
                              (!deductionMileageRate ||
                                Number(deductionMileageRate) > 10 ||
                                Number(deductionMileageRate) === 0)
                            ? "borderRed"
                            : "black"
                      }`}
                      id="deductionMileageRate"
                      name="deductionMileageRate"
                      type="text"
                      value={deductionMileageRate}
                      maxLength={6}
                      defaultValue={0.0}
                      onBeforeInput={(e) => {
                        const currentValue = e.target.value;
                        const proposedValue = currentValue + (e.data || "");

                        // This regular expression checks for values between 1.0000 and 9.9999
                        if (!/^(?:[1-9](?:\.\d{0,4})?)?$/.test(proposedValue)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Check if input starts with a decimal point
                        if (value.startsWith(".")) {
                          value = "0" + value; // Add '0' at the beginning
                        }

                        let indexOfDecimal = value.indexOf(".");

                        // Handle case when decimal is removed or moved
                        if (indexOfDecimal !== -1 && value.indexOf(".") !== value.lastIndexOf(".")) {
                          // If there are multiple decimal points, keep only the first one
                          value = value.replace(".", "");
                          indexOfDecimal = value.indexOf(".");
                        }

                        if (indexOfDecimal !== -1) {
                          // If decimal exists
                          const decimalPart = value.slice(indexOfDecimal + 1);
                          value = value.slice(0, indexOfDecimal + 1) + decimalPart.slice(0, 4);
                        }

                        // Restricting total length
                        if (value.length > 6) {
                          value = value.slice(0, 6);
                        }

                        dispatch(setDeductionMileageRate(value));
                      }}
                      disabled={viewDetail || !mileageRequired}
                      onBlur={(e) => {
                        if (mileageRequired) {
                          dispatch(setDeductionMileageRate(formatMinTwoDecimals(e.target.value)));
                        }
                      }}
                      onInput={(e) => {
                        if (mileageRequired) {
                          dispatch(setDeductionMileageRate(e.target.value));
                        } else {
                          dispatch(setDeductionMileageRate("0.00"));
                        }
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Restricted</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="restricted"
                      name="restricted"
                      checked={restricted}
                      onChange={(e) => {
                        dispatch(setRestricted(e.target.checked));
                      }}
                      disabled={viewDetail}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Concurrent</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="concurrent"
                      name="concurrent"
                      checked={concurrent}
                      disabled={viewDetail}
                      onChange={(e) => {
                        dispatch(setConcurrent(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Required</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="required"
                      name="required"
                      checked={required}
                      disabled={viewDetail || restrictedCheck}
                      onChange={(e) => {
                        dispatch(setRequired(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  className={`mt-4 m-b-20 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
                >
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Override Amounts</Form.Label>
                  </Col>
                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0"
                      id="overrideAmounts"
                      name="overrideAmounts"
                      checked={overrideAmounts}
                      disabled={viewDetail}
                      onChange={(e) => {
                        dispatch(setOverrideAmounts(e.target.checked));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <ReserveTypeLookup
            show={reserveTypeSelection}
            onHide={hideReserveTypeModal}
            renderItemId={(data) => data.reserveTypePK}
            renderItemField={(data) => data.description}
            handleLookupSelection={handleReserveTypeLookupSelection}
            MaintenanceProgram
          />
        </div>
      )}
    </Formik>
  );
}

export default ReservesFormContent;
