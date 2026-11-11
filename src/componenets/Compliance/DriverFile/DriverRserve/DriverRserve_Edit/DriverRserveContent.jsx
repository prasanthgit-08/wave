import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverReserveService from "../../../../../services/DriverReserveService";
import {
  resetDriverReserves,
  setActiveButton,
  setDriverActive,
  setDriverReserves,
  setDuplicateDescription,
  setFormData,
  setMileageRequired,
  setNewRestricted,
  setOverrideAmounts,
  setPercentageRequired,
  setRequiredReserve,
  setReserveDeductDelease,
  setReserveDeductMonthly,
  setReserveDeductYearly,
  setRestricted,
  setRestrictedReserve,
  setViewDetail,
} from "../../../../../redux/DriverReserveSlice";
import DateInputField from "../../../../common/DateInputField";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import ReservesService from "../../../../../services/ReservesService";
import { Col, Row } from "react-bootstrap";
import ReservesLookup from "../../../../LookupScreens/Reserves/ReservesLookup";
import LoadingIcon from "../../../../common/LoadingIcon";
import Input from "../../../../../components/common/input";
import { formatMinTwoDecimals } from "../../../../../utils/utils";

function DriverRserveContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, driverFK } = useParams();
  const checking = useRef({ deductDelease: null, deductMonthly: null, deductYearly: null });

  const viewDetail = useSelector((state) => state.driverReserveReducer.viewDetail);
  const formData = useSelector((state) => state.driverReserveReducer.formData);
  const driverReserves = useSelector((state) => state.driverReserveReducer.driverReserves);
  const percentageRequired = useSelector((state) => state.driverReserveReducer.percentageRequired);
  const mileageRequired = useSelector((state) => state.driverReserveReducer.mileageRequired);
  const driverActive = useSelector((state) => state.driverReserveReducer.driverActive);
  const restrictedReserve = useSelector((state) => state.driverReserveReducer.restrictedReserve);
  const requiredReserve = useSelector((state) => state.driverReserveReducer.requiredReserve);
  const reserveDeductMonthly = useSelector((state) => state.driverReserveReducer.reserveDeductMonthly);
  const reserveDeductYearly = useSelector((state) => state.driverReserveReducer.reserveDeductYearly);
  const reserveDeductDelease = useSelector((state) => state.driverReserveReducer.reserveDeductDelease);
  const duplicateDescription = useSelector((state) => state.driverReserveReducer.duplicateDescription);
  const activeButton = useSelector((state) => state.driverReserveReducer.activeButton);
  const newRestricted = useSelector((state) => state.driverReserveReducer.newRestricted);

  const [description, setDescription] = useState("");
  const [descriptionId, setDescriptionId] = useState("");
  const [usedFor, setUsedFor] = useState("");
  const [reserveFK, setReserveFK] = useState(0);
  const [reserveAmount, setReserveAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deductMonthly, setDeductMonthly] = useState("");
  const [deductYearly, setDeductYearly] = useState("");
  const [yearlyDeductionDate, setYearlyDeductionDate] = useState("");
  const [deductDelease, setDeductDelease] = useState("");
  const [percentage, setPercentage] = useState("");
  const [mileageRate, setMileageRate] = useState("");
  const [concurrent, setConcurrent] = useState(false);
  const [active, setActive] = useState(true);
  const [draws, setDraws] = useState("");
  const [drawAmount, setDrawAmount] = useState("");
  const [lastDrawDate, setLastDrawDate] = useState(null);
  const [truck, setTruck] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [showDescriptionLookUp, setShowDescriptionLookUp] = useState(false);

  const fetchReserveData = (descriptionId) => {
    setLoading(true);
    ReservesService.getReservesDataById(descriptionId)
      .then((response) => {
        const data = response.data;

        setYearlyDeductionDate(data?.deductionDate);
        dispatch(setPercentageRequired(data?.percentageRequired));
        dispatch(setMileageRequired(data?.mileageRequired));
        setMileageRate(data?.deductionMileageRate ? formatMinTwoDecimals(data.deductionMileageRate) : "0.00");
        setPercentage(data?.deductionPercentage ? data.deductionPercentage : "0.0");
        setReserveAmount(data?.amountToBeReserved ? formatMinTwoDecimals(data.amountToBeReserved) : "0.00");
        setDeductMonthly(data?.deductMonthly ? formatMinTwoDecimals(data.deductMonthly) : "0.00");
        setDeductYearly(data?.deductYearly ? formatMinTwoDecimals(data.deductYearly) : "0.00");
        setDeductDelease(data?.deductDelease ? formatMinTwoDecimals(data.deductDelease) : "0.00");
        setConcurrent(data?.concurrent ? data.concurrent : false);
        dispatch(setNewRestricted(data?.restricted ? data.restricted : false));
        checking.current.deductDelease = data?.deductDelease;

        if (data?.deductMonthly > 0) {
          dispatch(setReserveDeductMonthly(true));
        } else {
          dispatch(setReserveDeductMonthly(false));
        }

        if (data?.deductYearly > 0) {
          dispatch(setReserveDeductYearly(true));
        } else {
          dispatch(setReserveDeductYearly(false));
        }

        if (data?.deductDelease > 0) {
          dispatch(setReserveDeductDelease(true));
        } else {
          dispatch(setReserveDeductDelease(false));
        }

        setShowDescriptionLookUp(false);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (formData !== null) {
      setDescription(formData?.description || "");
      setDescriptionId(formData?.id || null);
      setUsedFor(formData?.usedFor || "");
      setReserveFK(formData?.reserveFK || null);
      setReserveAmount(formatMinTwoDecimals(formData?.amountToBeReserved || ""));
      setCurrentAmount(formatMinTwoDecimals(formData?.currentReserveAmount || ""));
      setDeductMonthly(formatMinTwoDecimals(formData?.deductMonthly || "0.00"));
      checking.current.deductMonthly = formData?.deductMonthly;
      setDeductYearly(formatMinTwoDecimals(formData?.deductYearly || "0.00"));
      checking.current.deductYearly = formData?.deductYearly;
      setYearlyDeductionDate(formData?.deductionDate || "");
      setDeductDelease(formatMinTwoDecimals(formData?.deductDelease || "0.00"));
      checking.current.deductDelease = formData?.deductDelease;
      setPercentage(formData?.deductionPercentage || 0);
      setMileageRate(formatMinTwoDecimals(formData?.deductionMileageRate || "0.00"));
      setConcurrent(formData?.concurrent || false);
      setActive(formData?.active || false);
      setDraws(formData?.reserveDraws || 0);
      setDrawAmount(formatMinTwoDecimals(formData?.reserveDrawAmount || ""));
      setLastDrawDate(formData ? formatDatetimeToDate(formData.reserveLastDrawDate) || "" : "");
      setTruck(formData?.driverTruckFK || null);
      setTrailer(formData?.driverTrailerFK || null);

      dispatch(setOverrideAmounts(formData?.overrideAmounts || false));
      dispatch(setRestricted(formData?.restricted || false));
      dispatch(setPercentageRequired(formData?.percentageRequired || false));
      dispatch(setMileageRequired(formData?.mileageRequired || false));
      dispatch(setDriverActive(formData?.driverActive || false));
      dispatch(setRequiredReserve(formData?.requiredReserve || false));
      dispatch(setRestrictedReserve(formData?.restrictedReserve || false));
      dispatch(setActiveButton(formData?.active || false));
    } else if (formData === undefined || formData === null || formData === "") {
    }
  }, [formData, viewDetail]);

  useEffect(() => {
    dispatch(
      setDriverReserves({
        driverReservePK: id,
        driverId: driverFK,
        reserveFK: id ? reserveFK : descriptionId,
        description: description,
        usedFor: usedFor,
        amountToBeReserved: reserveAmount,
        currentReserveAmount: currentAmount,
        reserveDraws: draws,
        reserveDrawAmount: drawAmount,
        reserveLastDrawDate: lastDrawDate,
        deductMonthly: deductMonthly,
        deductYearly: deductYearly,
        deductDelease: deductDelease,
        deductionPercentage: percentage,
        deductionMileageRate: mileageRate,
        active: active,
        concurrent: concurrent,
        driverTrailerFK: trailer,
        driverTruckFK: truck,
      })
    );
  }, [
    description,
    usedFor,
    reserveAmount,
    currentAmount,
    draws,
    drawAmount,
    lastDrawDate,
    deductMonthly,
    deductYearly,
    deductDelease,
    percentage,
    mileageRate,
    active,
    concurrent,
    reserveFK,
  ]);

  const fetchDescriptionList = (string) => {
    setDropdownLoading(true);
    ReservesService.getReservesForAuto(string, driverFK)
      .then((response) => {
        const data = response.data;

        const desc = data.content?.map((data) => ({ ...data, description: data.description?.trim() }));
        setDescriptions(desc);
      })
      .catch((error) => {})
      .finally(() => setDropdownLoading(false));
  };

  const handleDescriptionSelection = (desc) => {
    setDescription(desc?.description?.trim());
    setDescriptionId(desc?.id);
    fetchReserveData(desc?.id);
  };

  const isDecimal = (value) => {
    if (!value) return value;
    // Remove everything except digits and dots
    let number = value.replace(/[^\d.]/g, "");

    // Allow only one dot
    const parts = number.split(".");
    number = parts.shift() + (parts.length ? "." + parts.join("") : "");

    // If it ends with a dot and no digits after, add ".00"
    if (number.endsWith(".")) {
      number = number + "00";
    }

    // If user typed just ".", return empty
    if (number === ".") {
      return "";
    }

    return number;
  };

  useEffect(() => {
    if (!descriptionId && !id) {
      dispatch(setReserveDeductMonthly(false));
      dispatch(setReserveDeductYearly(false));
      dispatch(setReserveDeductDelease(false));
      dispatch(setPercentageRequired(false));
      dispatch(setMileageRequired(false));
      setReserveAmount("0.00");
      setDeductMonthly("0.00");
      setDeductYearly("0.00");
      setYearlyDeductionDate("");
      setDeductDelease("0.00");
      setPercentage(0);
      setMileageRate("0.00");
      dispatch(setNewRestricted(false));
    } else if (descriptionId) {
      DriverReserveService.checkDescriptionExists(description, driverFK, id).then((response) => {
        dispatch(setDuplicateDescription(response.data));
      });
    }
  }, [descriptionId]);

  useEffect(() => {
    dispatch(setDuplicateDescription(false));
  }, []);

  useEffect(() => {}, [descriptionId]);

  return (
    <div className="p-2">
      <div className=" shadow-sm rounded border" style={{ height: "430px" }}>
        {loading && <LoadingIcon />}
        {
          <div className="d-flex gap-2 ps-2 mt-5">
            <div className="col-6">
              <div className="d-flex align-items-center mb-1">
                <div className="col-3 ">Description</div>
                <div className="col-7 d-flex">
                  {" "}
                  {!id && (
                    <div className="col-12 d-flex">
                      <AutoCompleteDropdown
                        className={`form-controlDriverService ${
                          viewDetail
                            ? ""
                            : descriptionId && !duplicateDescription
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        arrayList={descriptions}
                        searchString={description}
                        renderItemId={(reserve) => reserve.id}
                        renderItemField={(reserve) => reserve.description}
                        handleSearchString={(string) => {
                          setDescription(string);
                        }}
                        loading={dropdownLoading}
                        fetchDataBySearchString={fetchDescriptionList}
                        onSelect={handleDescriptionSelection}
                        selectedId={descriptionId}
                        clearInputCallback={() => {
                          setDescriptionId(null);
                        }}
                        disabled={viewDetail}
                      />
                      <LookupButton
                        disabled={viewDetail || id != null}
                        onClick={() => setShowDescriptionLookUp(true)}
                      />
                    </div>
                  )}
                  {id && (
                    <div className="col-12">
                      <Input
                        className="form-controlDriverService"
                        type="text"
                        maxLength={30}
                        value={description}
                        disabled
                        id="description"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`d-flex align-items-center mb-3 ${!viewDetail && id == null && description && duplicateDescription ? "" : "hide-elements"}`}
              >
                <div className="col-3 "></div>
                <div style={{ marginRight: "5px" }}>
                  <p className="p-0 text-danger alert" style={{ height: "0px" }}>
                    Description already exists !
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Used For</div>
                <div className="col-7 ">
                  {" "}
                  <Input
                    className="form-controlDriverService"
                    type="text"
                    maxLength={30}
                    value={id ? usedFor : "Compliance"}
                    onChange={(e) => {
                      setUsedFor(e.target.value);
                    }}
                    disabled
                    id="usedFor"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Reserve Amount</div>
                <div className="col-2 " style={{ width: "60px" }}>
                  {" "}
                  <Input
                    className={`form-controlDriverService  ${
                      viewDetail || (!percentageRequired && !mileageRequired) /*&& !id*/ || newRestricted
                        ? ""
                        : reserveAmount
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    type="text"
                    maxLength={8}
                    value={reserveAmount}
                    onChange={(e) => {
                      e.target.value !== "." &&
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setReserveAmount(e.target.value);
                    }}
                    onBlur={(e) => setReserveAmount(formatMinTwoDecimals(isDecimal(e.target.value)))}
                    disabled={
                      viewDetail || (!percentageRequired && !mileageRequired) /*&& !id*/ || newRestricted
                    }
                    id="reserveAmount"
                  />
                </div>
              </div>
              <div className={`d-flex align-items-center mb-3  ${viewDetail ? "" : "hide-elements"}`}>
                <div className="col-3 ">Current Amount</div>
                <div className="col-2 " style={{ width: "60px" }}>
                  {" "}
                  <Input
                    className="form-controlDriverService"
                    type="text"
                    value={currentAmount}
                    onChange={(e) => {
                      setCurrentAmount(e.target.value);
                    }}
                    disabled={viewDetail}
                    id="currentAmount"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Deduct Monthly</div>
                <div className="col-2 " style={{ width: "60px" }}>
                  {" "}
                  <Input
                    className="form-controlDriverService"
                    type="text"
                    value={deductMonthly}
                    onChange={(e) => {
                      e.target.value !== "." &&
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setDeductMonthly(e.target.value);
                    }}
                    onBlur={(e) => {
                      let value =
                        Number(e.target.value) > 0
                          ? e.target.value
                          : String(checking.current.deductMonthly) || "0.00";
                      setDeductMonthly(formatMinTwoDecimals(isDecimal(value)));
                    }}
                    disabled={viewDetail || (!reserveDeductMonthly && !id) || newRestricted}
                    id="deductMonthly"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Deduct Yearly</div>
                <div className="col-2 " style={{ width: "60px" }}>
                  {" "}
                  <input
                    className="form-controlDriverService"
                    type="text"
                    maxLength={8}
                    value={deductYearly}
                    onChange={(e) => {
                      e.target.value !== "." &&
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setDeductYearly(e.target.value);
                    }}
                    onBlur={(e) => {
                      let value =
                        Number(e.target.value) > 0
                          ? e.target.value
                          : String(checking.current.deductYearly) || "0.00";
                      setDeductYearly(formatMinTwoDecimals(isDecimal(value)));
                    }}
                    disabled={viewDetail || (!reserveDeductYearly && !id) || newRestricted}
                    id="deductYearly"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Yearly Deduction Date</div>
                <div className="">
                  {" "}
                  <Input
                    className="form-controlDriverService"
                    type="text"
                    maxLength={30}
                    value={yearlyDeductionDate}
                    style={{ width: "50px" }}
                    disabled
                    id="yearlyDeductionDate"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Deduct Delease</div>
                <div className="col-2 " style={{ width: "60px" }}>
                  {" "}
                  <Input
                    className="form-controlDriverService"
                    type="text"
                    maxLength={8}
                    value={deductDelease}
                    onChange={(e) => {
                      e.target.value !== "." &&
                        e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                        setDeductDelease(e.target.value);
                    }}

                    onBlur={(e) => {
                      let value =
                        checking.current.deductDelease <= Number(e.target?.value)
                          ? e.target?.value
                          : String(checking.current.deductDelease);
                      setDeductDelease(formatMinTwoDecimals(value));
                    }}
                    disabled={viewDetail || (!id && !reserveDeductDelease) || newRestricted}
                    id="deductDelease"
                  />
                </div>
              </div>
            </div>
            <div className="col-6 ps-2">
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Percentage</div>
                <div className=" " style={{ width: "50px" }}>
                  {" "}
                  <Input
                    className={`form-controlDriverService  ${
                      viewDetail || !percentageRequired /*&& !id*/ || newRestricted
                        ? ""
                        : percentage > 0 && percentage < 100
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    type="text"
                    maxLength={5}
                    value={percentage}
                    onChange={(e) => {
                      if (!e.target.value?.includes(".")) {
                        e.target.value.match(/^\d{0,2}(\.\d{0,2})?$/) && setPercentage(e.target.value);
                      }
                    }}
                    disabled={viewDetail || !percentageRequired /*&& !id*/ || newRestricted}
                    id="percentage"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="col-3 ">Mileage Rate</div>
                <div className=" " style={{ width: "60px" }}>
                  {" "}
                  <Input
                    className={`form-controlDriverService  ${
                      viewDetail || !mileageRequired /*&& !id*/ || newRestricted
                        ? ""
                        : mileageRate > 0
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    type="text"
                    value={mileageRate}
                    onChange={(e) => {
                      e.target.value !== "." &&
                        e.target.value.match(/^\d{0,1}(\.\d{0,4})?$/) &&
                        setMileageRate(e.target.value);
                    }}
                    onBlur={(e) => setMileageRate(formatMinTwoDecimals(isDecimal(e.target.value)))}
                    disabled={viewDetail || !mileageRequired /*&& !id*/ || newRestricted}
                    id="mileageRate"
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-4 ">
                <div className="col-3 ">Concurrent</div>
                <div className="col-5 ">
                  {" "}
                  <input
                    className=""
                    type="checkbox"
                    autoComplete="off"
                    value={concurrent}
                    checked={concurrent}
                    disabled={viewDetail || newRestricted}
                    id="concurrent"
                    onChange={(e) => {
                      setConcurrent(e.target.checked);
                    }}
                  />
                </div>
              </div>
              <div className={`d-flex align-items-center mb-3  ${viewDetail ? "" : "hide-elements"}`}>
                <div className="col-3 ">Active</div>
                <div className="col-5 ">
                  {" "}
                  <input
                    className=""
                    type="checkbox"
                    autoComplete="off"
                    value={active}
                    checked={active}
                    disabled={viewDetail}
                    id="active"
                    onChange={(e) => {
                      setActive(e.target.checked);
                    }}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center mb-3 invisible">
                <div className="col-3 ">Mileage Rate</div>
                <div className=" " style={{ width: "50px" }}>
                  {" "}
                  <Input className="form-controlDriverService" type="search" maxLength={30} value={""} />
                </div>
              </div>
              <div className={`d-flex align-items-center mb-3  ${viewDetail ? "" : "hide-elements"}`}>
                <div className="col-3 ">Draws</div>
                <div className=" " style={{ width: "60px" }}>
                  {" "}
                  <Input
                    className="form-controlDriverService"
                    type="text"
                    maxLength={30}
                    value={draws}
                    onChange={(e) => {
                      setDraws(e.target.value);
                    }}
                    id="draws"
                    disabled={viewDetail}
                  />
                </div>
              </div>
              <div className={`d-flex align-items-center mb-3  ${viewDetail ? "" : "hide-elements"}`}>
                <div className="col-3 ">Draw Amount</div>
                <div className="col-2">
                  {" "}
                  <Input
                    className="form-controlDriverService"
                    type="text"
                    maxLength={30}
                    value={drawAmount}
                    onChange={(e) => {
                      setDrawAmount(e.target.value);
                    }}
                    id="drawAmount"
                    disabled={viewDetail}
                  />
                </div>
              </div>
              <div className={`d-flex align-items-center mb-3  ${viewDetail ? "" : "hide-elements"}`}>
                <div className="col-3 "> Last Draws Date</div>
                <div className="col-3" style={{ width: "90px" }}>
                  {" "}
                  <DateInputField
                    date={lastDrawDate}
                    setDate={(value) => setLastDrawDate(value)}
                    disabled={viewDetail}
                    className={`customFormControl`}
                  />
                  <ReservesLookup
                    show={showDescriptionLookUp}
                    onHide={() => setShowDescriptionLookUp(false)}
                    renderItemId={(form) => form.id}
                    renderItemField={(data) => data.description}
                    handleLookupSelection={handleDescriptionSelection}
                    DriverReserve
                    driverFK={driverFK}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default DriverRserveContent;
