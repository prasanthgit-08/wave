import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActive,
  setDuplicateDescription,
  setIsGeneralTabValid,
  setSaveGarnishmentObject,
  setDescription,
} from "../../../../../../redux/DriverGarnishmentsSlice";
import { useParams } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import DriverGarnishmentsService from "../../../../../../services/DriverGarnishmentsService";
import LoadingIcon from "../../../../../common/LoadingIcon";
import Input from "../../../../../../components/common/input";

const General = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(null);
  const [setAmount, setSetAmount] = useState(null);
  const [period, setPeriod] = useState(null);
  const [periodList, setPeriodList] = useState([]);
  const [maximumAmount, setMaximumAmount] = useState(null);
  const [checkAmount, setCheckAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [weeklyCheck, setWeeklyCheck] = useState(false);
  const [driverGarnishmentPK, setDriverGarnishmentPK] = useState(null);
  const garnishmentDataById = useSelector((state) => state.driverGarnishmentsReducer.garnishmentDataById);
  const viewDetail = useSelector((state) => state.driverGarnishmentsReducer.viewDetail);
  const active = useSelector((state) => state.driverGarnishmentsReducer.active);
  const duplicateDescription = useSelector((state) => state.driverGarnishmentsReducer.duplicateDescription);
  const description = useSelector((state) => state.driverGarnishmentsReducer.description);
  const [loading4, setLoading4] = useState(false);

  const fetchPeriod = () => {
    setLoading4(true);
    DriverGarnishmentsService.fetchPeriods()
      .then((response) => {
        const data = response?.data;
        setPeriodList(data);
      })
      .catch((error) => {
        setLoading4(false);
      })
      .finally(() => setLoading4(false));
  };

  /*setting values from backend*/
  useEffect(() => {
    setDriverGarnishmentPK(garnishmentDataById ? garnishmentDataById.driverGarnishmentPK : null);
    dispatch(setActive(garnishmentDataById ? garnishmentDataById.active : false));
    dispatch(setDescription(garnishmentDataById ? garnishmentDataById.description?.trim() : ""));
    const percentage = garnishmentDataById ? garnishmentDataById.percentage * 100 : null;
    setPercentage(percentage ? Math.floor(percentage) : "");
    setSetAmount(garnishmentDataById ? garnishmentDataById.setAmount : "");
    setPeriod(garnishmentDataById ? garnishmentDataById.period : "");
    setMaximumAmount(garnishmentDataById ? garnishmentDataById.maximumAmount : null);
    setCheckAmount(garnishmentDataById ? garnishmentDataById.checkAmount : null);
    setTotalAmount(garnishmentDataById ? garnishmentDataById.totalAmount : null);
    setWeeklyCheck(garnishmentDataById ? garnishmentDataById.weeklyCheck : false);
  }, [garnishmentDataById, viewDetail]);

  /*setting values to save to backend*/
  useEffect(() => {
    dispatch(
      setSaveGarnishmentObject({
        driverGarnishmentPK,
        active,
        driverFKInt: id,
        description,
        percentage: percentage / 100,
        setAmount,
        period,
        maximumAmount,
        checkAmount,
        totalAmount,
        weeklyCheck,
      })
    );
  }, [
    driverGarnishmentPK,
    active,
    id,
    description,
    percentage,
    setAmount,
    period,
    maximumAmount,
    checkAmount,
    totalAmount,
    weeklyCheck,
  ]);

  /*for save validation of general tab*/
  useEffect(() => {
    if (
      description &&
      !duplicateDescription &&
      (percentage > 0 || (setAmount > 0 && period)) &&
      maximumAmount !== null &&
      parseFloat(maximumAmount) >= 0.0 &&
      maximumAmount !== "" &&
      !/^\d*\.$/.test(maximumAmount)
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
  }, [description, percentage, setAmount, period, duplicateDescription, maximumAmount]);

  useEffect(() => {
    if (setAmount <= 0 || setAmount === "" || setAmount === undefined || percentage > 0) {
      setPeriod("");
    }
  }, [setAmount, percentage]);

  useEffect(() => {
    fetchPeriod();
  }, []);

  /*for duplicate check for description*/
  const checkDuplicateDescription = (description) => {
    DriverGarnishmentsService.checkDuplicateDescription(description, id, driverGarnishmentPK)
      .then((response) => {
        dispatch(setDuplicateDescription(response.data));
      })
      .catch((err) => {
        dispatch(setDuplicateDescription(false));
      });
  };

  return (
    <div className="col-8 p-2">
      <div className="d-flex align-items-center mt-2 mb-1">
        <div className="col-3 me-2">Description</div>
        <div className="col-5 ">
          <Input
            name="description"
            id="description"
            type="text"
            className={`customFormControl ${
              !viewDetail ? (description && !duplicateDescription ? "borderGreen" : "borderRed") : ""
            }`}
            value={description}
            onChange={(e) => {
              dispatch(setDescription(e.target.value));
              dispatch(setDuplicateDescription(false));
            }}
            onBlur={(e) => checkDuplicateDescription(e.target.value)}
            disabled={viewDetail}
            maxLength={30}
          />
        </div>
      </div>

      <div className="d-flex align-items-center mb-3 mt-3">
        <div className="col-3 me-2">Percentage</div>
        <div className="col-1 ">
          <Input
            className={`form-controlDriverService ${
              !viewDetail
                ? setAmount <= 0.0
                  ? parseInt(percentage) > 99 || parseInt(percentage) <= 0 || !percentage
                    ? "borderRed"
                    : "borderGreen"
                  : ""
                : ""
            }`}
            type="text"
            maxLength={2}

            value={percentage}
            onInput={(e) => {
              setPercentage(e.target.value.replace(/[^\d]/g, ""));
            }}
            disabled={setAmount > 0.0 || viewDetail}
          />
        </div>
      </div>
      <div className="d-flex align-items-center mb-3">
        <div className="col-3 me-2"> Amount per Period</div>
        <div className="col-2 ">
          <Input
            className={`form-controlDriverService ${
              !viewDetail
                ? percentage <= 0
                  ? parseFloat(setAmount) <= 0.0 ||
                    setAmount === "." ||
                    /^\d*\.$/.test(setAmount) ||
                    !setAmount
                    ? "borderRed"
                    : "borderGreen"
                  : ""
                : ""
            }`}
            type="text"
            maxLength={8}

            value={setAmount}
            onInput={(e) => {
              e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setSetAmount(e.target.value);
            }}
            disabled={percentage > 0 || viewDetail}
          />
        </div>
      </div>

      <div className="d-flex align-items-center mb-3">
        <div className="col-3 me-2">Period</div>
        <div className="col-3 ">
          <Form.Select
            id="dropdown"
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
            className={`customFormControl ${
              !viewDetail
                ? Number(setAmount) > 0
                  ? !period || period === ""
                    ? "borderRed"
                    : "borderGreen"
                  : ""
                : ""
            }`}
            value={period}
            disabled={viewDetail || setAmount <= 0 || percentage > 0}
          >
            <option value="">--Select--</option>
            {periodList?.map((periodElement) => (
              <option key={periodElement?.periodID} value={periodElement?.periodID}>
                {periodElement?.periodName}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <div className="d-flex align-items-center mb-3 ">
        <div className="col-3 me-2">Print Check Weekly</div>
        <div className="col-5 ">
          <input
            className="form-check-input p-0"
            type="checkbox"
            autoComplete="off"
            value={weeklyCheck}
            checked={weeklyCheck}
            onChange={(e) => {
              setWeeklyCheck(e.target.checked);
            }}
            disabled={viewDetail}
          />
        </div>
      </div>
      <div className="d-flex align-items-center mb-3">
        <div className="col-3 me-2">Maximum Amount To Collect</div>
        <div className="col-2 ">
          <Input
            className={`form-controlDriverService ${
              !viewDetail
                ? parseFloat(maximumAmount) < 0.0 ||
                  maximumAmount === "." ||
                  /^\d*\.$/.test(maximumAmount) ||
                  maximumAmount === "" ||
                  maximumAmount === null
                  ? "borderRed"
                  : "borderGreen"
                : ""
            }`}
            type="search"
            maxLength={10}

            value={maximumAmount}
            onInput={(e) => {
              e.target.value.match(/^\d{0,7}(\.\d{0,2})?$/) && setMaximumAmount(e.target.value);
            }}
            disabled={viewDetail}
          />
        </div>
      </div>
      <div className="d-flex align-items-center mb-2 invisible">
        <div className="col-3 me-2">Deduct Yearly</div>
        <div className="col-2 ">
          {" "}
          <Input
            className="form-controlDriverService"
            type="search"
            maxLength={30}

            value={""}
          />
        </div>
      </div>
      <div className="d-flex align-items-center mb-3">
        <div className="col-3 me-2">Current Check Amount</div>
        <div className="col-2">
          <Input
            className={`form-controlDriverService `}
            type="search"
            maxLength={8}

            value={checkAmount}
            disabled
          />
        </div>
      </div>
      <div className="d-flex align-items-center mb-3">
        <div className="col-3 me-2">Total Amount To Date</div>
        <div className="col-2 ">
          <Input
            className={`form-controlDriverService `}
            type="search"
            maxLength={10}

            value={totalAmount}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default General;
