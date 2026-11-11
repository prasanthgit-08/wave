import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RadioGroup, Radio } from "react-radio-group";
import { Row, Col } from "react-bootstrap";
import ButtonComponent from "../../../../common/Button";
import { useSelector, useDispatch } from "react-redux";
import InputField from "../../../../common/InputField";
import { t } from "i18next";
import {
  setChangeColor,
  setDateFrom,
  setDateTo,
  setDateType,
  setNormalSortFlag,
  setNormalSortValue,
  setPageNumber,
  setSearchCriteria,
  setSearchTerm,
  setSelectedId,
} from "../../../../../redux/DriverTMRLogsSlice";
import DateInputField from "../../../../common/DateInputField";
import CustomRadioGroup from "../../../../common/CustomRadioGroup";
export const DriverTMRLogsSearchFilter = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dateFromInput, setDateFromInput] = useState("");
  const [dateToInput, setDateToInput] = useState("");
  const [isFromDateValidation, setIsFromDateValidation] = useState(true);
  const [isToDateValidation, setIsToDateValidation] = useState(true);
  const searchCriteria = useSelector((state) => state.driverTMRLogsReducer.searchCriteria);
  const searchTerm = useSelector((state) => state.driverTMRLogsReducer.searchTerm);
  const dateFrom = useSelector((state) => state.driverTMRLogsReducer.dateFrom);
  const dateTo = useSelector((state) => state.driverTMRLogsReducer.dateTo);
  const dateType = useSelector((state) => state.driverTMRLogsReducer.dateType);

  const handleFirstRadioGroupOnChange = (value) => {
    dispatch(setSearchCriteria(value));
    dispatch(setPageNumber(0));
  };

  const handleClose = () => {
    navigate(`/driver-maintenance-add/${id}`);
    dispatch(setChangeColor(false));
    dispatch(setNormalSortValue(null));
    dispatch(setNormalSortFlag(false));
    dispatch(setSearchTerm(""));
    dispatch(setSearchCriteria("Beginning"));
    dispatch(setDateTo(""));
    dispatch(setDateFrom(""));
    dispatch(setDateType("All"));
    dispatch(setSelectedId(null));
    dispatch(setPageNumber(0));
  };

  useEffect(() => {
    if (dateType === "All") {
      dispatch(setDateFrom(""));
      setDateFromInput("");
      setIsFromDateValidation(true);
      dispatch(setDateTo(""));
    }
  }, [dateType, dateFrom, dateTo]);

  const globalSearchHandleChange = (event) => {
    dispatch(setSearchTerm(event.target.value));

    dispatch(setPageNumber(0));
  };

  return (
    <div>
      <Row className="border border-dark border-2 p-t-10 p-b-10">
        <Col md={12}>
          <Row className="m-0 p-0">
            <Col md={7} sm={7} lg={7} xs={7} className="p-l-0">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center search-box">
                  <span className="p-l-20">
                    <label className="f-w-600 m-r-15">{t("dealers.list.page.search.button")}</label>
                    <InputField
                      type="text"
                      name="searchTerm"
                      value={searchTerm}
                      autoComplete="off"
                      aria-autocomplete="list"
                      placeholder={t("dealers.list.page.global.search")}
                      className="search-input"
                      onChange={(e) => {
                        globalSearchHandleChange(e);
                      }}
                      autocomplete="autocomplete_off_randString"
                    />
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <RadioGroup
                    name="searchCriteria"
                    selectedValue={searchCriteria}
                    onChange={handleFirstRadioGroupOnChange}
                  >
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Beginning" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.begining")}</label>
                    </div>
                    <div className="d-flex align-items-center m-b-5">
                      <Radio value="Contains" />
                      <label className="f-w-600 m-l-5">{t("dealers.list.page.filters.contains")}</label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="d-flex flex-column">
                  <CustomRadioGroup
                    name="dateType"
                    selectedOption={dateType}
                    options={["All", "Notified", "Due", "Returned"]}
                    onChange={(option) => {
                      dispatch(setDateType(option));
                      dispatch(setPageNumber(0));
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col md={5} sm={5} lg={5} xs={5} className="p-l-0">
              <div className=" mt-3 d-flex justify-content-around ">
                <div className="flex-column">
                  <Row className="m-1">
                    <div className="p-5 d-flex justify-content-end mt-1 col-3">
                      <label className="f-w-600 m-r-5 customLabel">From</label>
                    </div>
                    <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                      <DateInputField
                        dateInput={dateFromInput}
                        setDateInput={setDateFromInput}
                        date={dateFrom}
                        max={dateTo ? parseLocalDate(dateTo) : ""}
                        setIsDateValid={setIsFromDateValidation}
                        reduxSetDate={(value) => {
                          dispatch(setDateFrom(value));
                        }}
                        disabled={dateType === "All"}
                        className={`customFormControl  ${isFromDateValidation ? "" : "borderRed"}`}
                      />
                    </Col>
                  </Row>

                  <Row className="m-1">
                    <div className="p-0 d-flex justify-content-end mt-1 col-3">
                      <label className="f-w-600 m-r-5 customLabel text-left">To</label>
                    </div>

                    <Col xs={3} sm={3} className="p-0" style={{ width: "95px" }}>
                      <DateInputField
                        dateInput={dateToInput}
                        setDateInput={setDateToInput}
                        date={dateTo}
                        min={dateFrom ? parseLocalDate(dateFrom) : ""}
                        setIsDateValid={setIsToDateValidation}
                        reduxSetDate={(value) => dispatch(setDateTo(value))}
                        disabled={dateType === "All"}
                        className={`customFormControl  ${isToDateValidation ? "" : "borderRed"}`}
                      />
                    </Col>
                  </Row>
                </div>

                <div className="p-0  justify-content-end mt-1 pe-3">
                  <ButtonComponent
                    route={`/driver-maintenance-add/${id}`}
                    className="btn btn-secondary btn-sm font-12 btn-small-width close-button"
                    label={t("dealers.list.page.advanced.close.button")}
                    onClick={handleClose}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DriverTMRLogsSearchFilter;
