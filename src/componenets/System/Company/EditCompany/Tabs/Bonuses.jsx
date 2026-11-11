import { parseLocalDate } from "../../../../../utils/dateUtils";
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsBonusesTabValid,
  setSaveCompanyObject,
  setTowableBonusProgram,
} from "../../../../../redux/CompanySlice";
import DateInputField from "../../../../common/DateInputField";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import Input from "../../../../../components/common/input";

function Bonuses() {
  const dispatch = useDispatch();
  const [towableBonusPool, setTowableBonusPool] = useState("");
  const [towableBonusRate, setTowableBonusRate] = useState("");
  const [multiUnitBonusPool, setMultiUnitBonusPool] = useState("");
  const [multiUnitBonusRate, setMultiUnitBonusRate] = useState("");
  const [driveawayBonusPool, setDriveawayBonusPool] = useState("");
  const [driveawayBonusRate, setDriveawayBonusRate] = useState("");
  const [towableReloadBonusPool, setTowableReloadBonusPool] = useState("");
  const [towableReloadBonusRate, setTowableReloadBonusRate] = useState("");
  const [driveawayReloadBonusPool, setDriveawayReloadBonusPool] = useState("");
  const [driveawayReloadBonusRate, setDriveawayReloadBonusRate] = useState("");
  const [multiUnitReloadBonusPool, setMultiUnitReloadBonusPool] = useState("");
  const [multiUnitReloadBonusRate, setMultiUnitReloadBonusRate] = useState("");
  const [driveawayCDLSafetyRate, setDriveawayCDLSafetyRate] = useState("");
  const [driveawayCDLSafetyMiles, setDriveawayCDLSafetyMiles] = useState("");
  const [driveawayCDLSafetyUnits, setDriveawayCDLSafetyUnits] = useState("");
  const [towableCDLSafetyRate, setTowableCDLSafetyRate] = useState("");
  const [towableCDLSafetyMiles, setTowableCDLSafetyMiles] = useState("");
  const [towableCDLSafetyUnits, setTowableCDLSafetyUnits] = useState("");
  const [towableBonusProgramRate, setTowableBonusProgramRate] = useState("");
  const [towableBonusProgramUnits, setTowableBonusProgramUnits] = useState("");
  const [towableBonusProgramBegin, setTowableBonusProgramBegin] = useState(null);
  const [towableBonusProgramEnd, setTowableBonusProgramEnd] = useState(null);
  const [safetyLevel1, setSafetyLevel1] = useState("");
  const [safetyBonus1, setSafetyBonus1] = useState("");
  const [safetyLevel2, setSafetyLevel2] = useState("");
  const [safetyBonus2, setSafetyBonus2] = useState("");
  const [safetyLevel3, setSafetyLevel3] = useState("");
  const [safetyBonus3, setSafetyBonus3] = useState("");
  const [safetyLevel4, setSafetyLevel4] = useState("");
  const [safetyBonus4, setSafetyBonus4] = useState("");
  const [safetyLevel5, setSafetyLevel5] = useState("");
  const [safetyBonus5, setSafetyBonus5] = useState("");
  const [isTowableBonusBeignValid, setIsTowableBonusBeignValid] = useState(true);
  const [isTowableBonusEndValid, setIsTowableBonusEndValid] = useState(true);
  const companyData = useSelector((state) => state.companyReducer.companyData);
  const viewDetail = useSelector((state) => state.companyReducer.viewDetail);
  const saveCompanyObject = useSelector((state) => state.companyReducer.saveCompanyObject);

  useEffect(() => {
    setTowableBonusPool(companyData ? companyData.towableBonusPool || "0" : "");
    setTowableBonusRate(companyData ? companyData.towableBonusRate || "0" : "");
    setMultiUnitBonusPool(companyData ? companyData.multiUnitBonusPool || "0" : "");
    setMultiUnitBonusRate(companyData ? companyData.multiUnitBonusRate || "0" : "");
    setDriveawayBonusPool(companyData ? companyData.driveawayBonusPool || "0" : "");
    setDriveawayBonusRate(companyData ? companyData.driveawayBonusRate || "0" : "");
    setTowableReloadBonusPool(companyData ? companyData.towableReloadBonusPool || "0" : "");
    setTowableReloadBonusRate(companyData ? companyData.towableReloadBonusRate || "0" : "");
    setDriveawayReloadBonusPool(companyData ? companyData.driveawayReloadBonusPool || "0" : "");
    setDriveawayReloadBonusRate(companyData ? companyData.driveawayReloadBonusRate || "0" : "");
    setMultiUnitReloadBonusPool(companyData ? companyData.multiUnitReloadBonusPool || "0" : "");
    setMultiUnitReloadBonusRate(companyData ? companyData.multiUnitReloadBonusRate || "0" : "");
    setDriveawayCDLSafetyRate(companyData ? companyData.driveawayCDLSafetyRate || "0" : "");
    setDriveawayCDLSafetyMiles(companyData ? companyData.driveawayCDLSafetyMiles || "0" : "");
    setDriveawayCDLSafetyUnits(companyData ? companyData.driveawayCDLSafetyUnits || "0" : "");
    setTowableCDLSafetyRate(companyData ? companyData.towableCDLSafetyRate || "0" : "");
    setTowableCDLSafetyMiles(companyData ? companyData.towableCDLSafetyMiles || "0" : "");
    setTowableCDLSafetyUnits(companyData ? companyData.towableCDLSafetyUnits || "0" : "");
    dispatch(setTowableBonusProgram(companyData ? companyData.towableBonusProgram || false : false));
    setTowableBonusProgramRate(companyData ? companyData.towableBonusProgramRate || "0" : "");
    setTowableBonusProgramUnits(companyData ? companyData.towableBonusProgramUnits || "0" : "");
    setTowableBonusProgramBegin(
      companyData ? formatDatetimeToDate(companyData?.towableBonusProgramBegin) || null : null
    );
    setTowableBonusProgramEnd(
      companyData ? formatDatetimeToDate(companyData?.towableBonusProgramEnd) || null : null
    );
    setSafetyLevel1(companyData ? companyData.safetyLevel1 || "" : "");
    setSafetyBonus1(companyData ? companyData.safetyBonus1 || "" : "");
    setSafetyLevel2(companyData ? companyData.safetyLevel2 || "" : "");
    setSafetyBonus2(companyData ? companyData.safetyBonus2 || "" : "");
    setSafetyLevel3(companyData ? companyData.safetyLevel3 || "" : "");
    setSafetyBonus3(companyData ? companyData.safetyBonus3 || "" : "");
    setSafetyLevel4(companyData ? companyData.safetyLevel4 || "" : "");
    setSafetyBonus4(companyData ? companyData.safetyBonus4 || "" : "");
    setSafetyLevel5(companyData ? companyData.safetyLevel5 || "" : "");
    setSafetyBonus5(companyData ? companyData.safetyBonus5 || "" : "");
  }, [companyData, viewDetail]);

  useEffect(() => {
    dispatch(
      setSaveCompanyObject({
        towableBonusPool: towableBonusPool,
        towableBonusRate: towableBonusRate,
        multiUnitBonusPool: multiUnitBonusPool,
        multiUnitBonusRate: multiUnitBonusRate,
        driveawayBonusPool: driveawayBonusPool,
        driveawayBonusRate: driveawayBonusRate,
        towableReloadBonusPool: towableReloadBonusPool,
        towableReloadBonusRate: towableReloadBonusRate,
        driveawayReloadBonusPool: driveawayReloadBonusPool,
        driveawayReloadBonusRate: driveawayReloadBonusRate,
        multiUnitReloadBonusPool: multiUnitReloadBonusPool,
        multiUnitReloadBonusRate: multiUnitReloadBonusRate,
        driveawayCDLSafetyRate: driveawayCDLSafetyRate,
        driveawayCDLSafetyMiles: driveawayCDLSafetyMiles,
        driveawayCDLSafetyUnits: driveawayCDLSafetyUnits,
        towableCDLSafetyRate: towableCDLSafetyRate,
        towableCDLSafetyMiles: towableCDLSafetyMiles,
        towableCDLSafetyUnits: towableCDLSafetyUnits,
        towableBonusProgramRate: towableBonusProgramRate,
        towableBonusProgramUnits: towableBonusProgramUnits,
        towableBonusProgramBegin: towableBonusProgramBegin,
        towableBonusProgramEnd: towableBonusProgramEnd,
        safetyLevel1: safetyLevel1,
        safetyBonus1: safetyBonus1,
        safetyLevel2: safetyLevel2,
        safetyBonus2: safetyBonus2,
        safetyLevel3: safetyLevel3,
        safetyBonus3: safetyBonus3,
        safetyLevel4: safetyLevel4,
        safetyBonus4: safetyBonus4,
        safetyLevel5: safetyLevel5,
        safetyBonus5: safetyBonus5,
      })
    );
  }, [
    towableBonusPool,
    towableBonusRate,
    multiUnitBonusPool,
    multiUnitBonusRate,
    driveawayBonusPool,
    driveawayBonusRate,
    towableReloadBonusPool,
    towableReloadBonusRate,
    driveawayReloadBonusPool,
    driveawayReloadBonusRate,
    multiUnitReloadBonusPool,
    multiUnitReloadBonusRate,
    driveawayCDLSafetyRate,
    driveawayCDLSafetyMiles,
    driveawayCDLSafetyUnits,
    towableCDLSafetyRate,
    towableCDLSafetyMiles,
    towableCDLSafetyUnits,
    towableBonusProgramRate,
    towableBonusProgramUnits,
    towableBonusProgramBegin,
    towableBonusProgramEnd,
    safetyLevel1,
    safetyBonus1,
    safetyLevel2,
    safetyBonus2,
    safetyLevel3,
    safetyBonus3,
    safetyLevel4,
    safetyBonus4,
    safetyLevel5,
    safetyBonus5,
  ]);

  //  for save validation of nexts tab
  useEffect(() => {
    if (
      parseFloat(towableBonusPool === "." || /^\-?\d*\.$/.test(towableBonusPool)) ||
      parseFloat(towableBonusRate) < 0.0 ||
      towableBonusRate === "." ||
      /^\d*\.$/.test(towableBonusRate) ||
      parseFloat(multiUnitBonusPool === "." || /^\d*\.$/.test(multiUnitBonusPool)) ||
      parseFloat(multiUnitBonusRate === "." || /^\d*\.$/.test(multiUnitBonusRate)) ||
      parseFloat(driveawayBonusPool === "." || /^\-?\d*\.$/.test(driveawayBonusPool)) ||
      parseFloat(driveawayReloadBonusPool === "." || /^\-?\d*\.$/.test(driveawayReloadBonusPool)) ||
      parseFloat(multiUnitReloadBonusPool === "." || /^\-?\d*\.$/.test(multiUnitReloadBonusPool)) ||
      parseFloat(towableReloadBonusPool === "." || /^\d*\.$/.test(towableReloadBonusPool)) ||
      parseFloat(driveawayBonusRate) < 0.0 ||
      driveawayBonusRate === "." ||
      /^\d*\.$/.test(driveawayBonusRate) ||
      parseFloat(towableReloadBonusRate) < 0.0 ||
      towableReloadBonusRate === "." ||
      /^\d*\.$/.test(towableReloadBonusRate) ||
      parseFloat(driveawayReloadBonusRate) < 0.0 ||
      driveawayReloadBonusRate === "." ||
      /^\d*\.$/.test(driveawayReloadBonusRate) ||
      parseFloat(multiUnitReloadBonusRate) < 0.0 ||
      multiUnitReloadBonusRate === "." ||
      /^\d*\.$/.test(multiUnitReloadBonusRate) ||
      parseFloat(driveawayCDLSafetyRate) < 0.0 ||
      driveawayCDLSafetyRate === "." ||
      /^\d*\.$/.test(driveawayCDLSafetyRate) ||
      parseInt(driveawayCDLSafetyMiles) > 32767 ||
      parseInt(driveawayCDLSafetyMiles) < 0 ||
      parseInt(driveawayCDLSafetyUnits) > 32767 ||
      parseInt(driveawayCDLSafetyUnits) < 0 ||
      parseFloat(towableCDLSafetyRate) < 0.0 ||
      towableCDLSafetyRate === "." ||
      /^\d*\.$/.test(towableCDLSafetyRate) ||
      parseInt(towableCDLSafetyMiles) > 32767 ||
      parseInt(towableCDLSafetyMiles) < 0 ||
      parseInt(towableCDLSafetyUnits) > 32767 ||
      parseInt(towableCDLSafetyUnits) < 0 ||
      (saveCompanyObject?.towableBonusProgram &&
        (towableBonusProgramRate === "" ||
          parseFloat(towableBonusProgramRate) <= 0.0 ||
          towableBonusProgramRate === "." ||
          /^\d*\.$/.test(towableBonusProgramRate))) ||
      parseFloat(towableBonusProgramRate) < 0.0 ||
      towableBonusProgramRate === "." ||
      /^\d*\.$/.test(towableBonusProgramRate) ||
      (saveCompanyObject?.towableBonusProgram &&
        (towableBonusProgramUnits === "" ||
          parseInt(towableBonusProgramUnits) > 32767 ||
          parseInt(towableBonusProgramUnits) <= 0)) ||
      parseInt(towableBonusProgramUnits) > 32767 ||
      parseInt(towableBonusProgramUnits) < 0 ||
      (towableBonusProgramBegin &&
        towableBonusProgramEnd &&
        towableBonusProgramBegin >= towableBonusProgramEnd) ||
      (saveCompanyObject?.towableBonusProgram && (!towableBonusProgramBegin || !towableBonusProgramEnd)) ||
      (!saveCompanyObject?.towableBonusProgram &&
        ((!towableBonusProgramBegin && towableBonusProgramEnd) ||
          (towableBonusProgramBegin && !towableBonusProgramEnd))) ||
      parseInt(safetyLevel1) > 32767 ||
      parseInt(safetyLevel1) <= 0 ||
      parseFloat(safetyBonus1) <= 0.0 ||
      parseFloat(safetyBonus1) >= 1.0 ||
      safetyBonus1 === "." ||
      /^\d*\.$/.test(safetyBonus1) ||
      parseInt(safetyLevel2) > 32767 ||
      parseInt(safetyLevel2) <= 0 ||
      parseFloat(safetyBonus2) <= 0.0 ||
      parseFloat(safetyBonus2) >= 1.0 ||
      safetyBonus2 === "." ||
      /^\d*\.$/.test(safetyBonus2) ||
      parseInt(safetyLevel3) > 32767 ||
      parseInt(safetyLevel3) <= 0 ||
      parseFloat(safetyBonus3) <= 0.0 ||
      parseFloat(safetyBonus3) >= 1.0 ||
      safetyBonus3 === "." ||
      /^\d*\.$/.test(safetyBonus3) ||
      parseInt(safetyLevel4) > 32767 ||
      parseInt(safetyLevel4) <= 0 ||
      parseFloat(safetyBonus4) <= 0.0 ||
      parseFloat(safetyBonus4) >= 1.0 ||
      safetyBonus4 === "." ||
      /^\d*\.$/.test(safetyBonus4) ||
      parseInt(safetyLevel5) > 32767 ||
      parseInt(safetyLevel5) <= 0 ||
      parseFloat(safetyBonus5) <= 0.0 ||
      parseFloat(safetyBonus5) >= 1.0 ||
      safetyBonus5 === "." ||
      /^\d*\.$/.test(safetyBonus5) ||
      !isTowableBonusBeignValid ||
      !isTowableBonusEndValid
    ) {
      dispatch(setIsBonusesTabValid(false));
    } else {
      dispatch(setIsBonusesTabValid(true));
    }
  }, [
    towableBonusPool,
    towableBonusRate,
    multiUnitBonusPool,
    multiUnitBonusRate,
    driveawayBonusPool,
    driveawayBonusRate,
    towableReloadBonusPool,
    towableReloadBonusRate,
    driveawayReloadBonusPool,
    driveawayReloadBonusRate,
    multiUnitReloadBonusPool,
    multiUnitReloadBonusRate,
    driveawayCDLSafetyRate,
    driveawayCDLSafetyMiles,
    driveawayCDLSafetyUnits,
    towableCDLSafetyRate,
    towableCDLSafetyMiles,
    towableCDLSafetyUnits,
    saveCompanyObject?.towableBonusProgram,
    towableBonusProgramRate,
    towableBonusProgramUnits,
    towableBonusProgramBegin,
    towableBonusProgramEnd,
    safetyLevel1,
    safetyBonus1,
    safetyLevel2,
    safetyBonus2,
    safetyLevel3,
    safetyBonus3,
    safetyLevel4,
    safetyBonus4,
    safetyLevel5,
    safetyBonus5,
    isTowableBonusBeignValid,
    isTowableBonusEndValid,
  ]);

  return (
    <div className="p-2">
      <div className="d-flex">
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable bonus pool
              </Form.Label>
            </Col>

            <div className="p-0 col-2">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? towableBonusPool === "." || /^\-?\d*\.$/.test(towableBonusPool)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="towableBonusPool"
                name="towableBonusPool"
                type="text"
                maxLength={10}
                value={towableBonusPool}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^-?\d{0,7}(\.\d{0,2})?$/.test(value)) {
                    setTowableBonusPool(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable bonus Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(towableBonusRate) < 0 ||
                      towableBonusRate === "." ||
                      /^\d*\.$/.test(towableBonusRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="towableBonusRate"
                name="towableBonusRate"
                value={towableBonusRate}
                disabled={viewDetail}
                type="text"
                maxLength={7}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setTowableBonusRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label
                htmlFor="multiUnitBonusPool"
                className="col-form-label text-capitalize dealer-label"
              >
                multi unit bonus pool
              </Form.Label>
            </Col>

            <div className="p-0 col-2">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? multiUnitBonusPool === "." || /^\-?\d*\.$/.test(multiUnitBonusPool)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="multiUnitBonusPool"
                name="multiUnitBonusPool"
                type="text"
                maxLength={10}
                value={multiUnitBonusPool}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^-?\d{0,7}(\.\d{0,2})?$/.test(value)) {
                    setMultiUnitBonusPool(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                multi unit bonus Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(multiUnitBonusRate) < 0 ||
                      multiUnitBonusRate === "." ||
                      /^\d*\.$/.test(multiUnitBonusRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="multiUnitBonusRate"
                name="multiUnitBonusRate"
                value={multiUnitBonusRate}
                disabled={viewDetail}
                type="text"
                maxLength={7}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setMultiUnitBonusRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label
                htmlFor="driveawayBonusPool"
                className="col-form-label text-capitalize dealer-label"
              >
                driveaway bonus pool
              </Form.Label>
            </Col>

            <div className="p-0 col-2">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? driveawayBonusPool === "." || /^\-?\d*\.$/.test(driveawayBonusPool)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayBonusPool"
                name="driveawayBonusPool"
                value={driveawayBonusPool}
                disabled={viewDetail}
                type="text"
                maxLength={10}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^-?\d{0,7}(\.\d{0,2})?$/.test(value)) {
                    setDriveawayBonusPool(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driveaway bonus rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(driveawayBonusRate) < 0 ||
                      driveawayBonusRate === "." ||
                      /^\d*\.$/.test(driveawayBonusRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayBonusRate"
                name="driveawayBonusRate"
                type="text"
                maxLength={7}
                value={driveawayBonusRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setDriveawayBonusRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label
                htmlFor="towableReloadBonusPool"
                className="col-form-label text-capitalize dealer-label"
              >
                towable reload bonus pool
              </Form.Label>
            </Col>

            <div className="p-0 col-2">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? towableReloadBonusPool === "." || /^\-?\d*\.$/.test(towableReloadBonusPool)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="towableReloadBonusPool"
                name="towableReloadBonusPool"
                type="text"
                maxLength={10}
                value={towableReloadBonusPool}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^-?\d{0,7}(\.\d{0,2})?$/.test(value)) {
                    setTowableReloadBonusPool(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable reload bonus rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(towableReloadBonusRate) < 0 ||
                      towableReloadBonusRate === "." ||
                      /^\d*\.$/.test(towableReloadBonusRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="towableReloadBonusRate"
                name="towableReloadBonusRate"
                type="text"
                maxLength={7}
                value={towableReloadBonusRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setTowableReloadBonusRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label
                htmlFor="driveawayReloadBonusPool"
                className="col-form-label text-capitalize dealer-label"
              >
                driveaway reload bonus pool
              </Form.Label>
            </Col>

            <div className="p-0 col-2">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? driveawayReloadBonusPool === "." || /^\-?\d*\.$/.test(driveawayReloadBonusPool)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayReloadBonusPool"
                name="driveawayReloadBonusPool"
                type="text"
                maxLength={10}
                value={driveawayReloadBonusPool}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^-?\d{0,7}(\.\d{0,2})?$/.test(value)) {
                    setDriveawayReloadBonusPool(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                driveaway reload bonus rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(driveawayReloadBonusRate) < 0 ||
                      driveawayReloadBonusRate === "." ||
                      /^\d*\.$/.test(driveawayReloadBonusRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayReloadBonusRate"
                name="driveawayReloadBonusRate"
                type="text"
                maxLength={7}
                value={driveawayReloadBonusRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    setDriveawayReloadBonusRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label
                htmlFor="multiUnitReloadBonusPool"
                className="col-form-label text-capitalize dealer-label"
              >
                multi unit reload bonus pool
              </Form.Label>
            </Col>

            <div className="p-0 col-2">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? multiUnitReloadBonusPool === "." || /^\-?\d*\.$/.test(multiUnitReloadBonusPool)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="multiUnitReloadBonusPool"
                name="multiUnitReloadBonusPool"
                type="text"
                maxLength={10}
                value={multiUnitReloadBonusPool}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^-?\d{0,7}(\.\d{0,2})?$/.test(value)) {
                    setMultiUnitReloadBonusPool(value);
                  }
                }}
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                multi unit reload bonus rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(multiUnitReloadBonusRate) < 0.0 ||
                      multiUnitReloadBonusRate === "." ||
                      /^\d*\.$/.test(multiUnitReloadBonusRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="multiUnitReloadBonusRate"
                name="multiUnitReloadBonusRate"
                type="text"
                maxLength={7}
                value={multiUnitReloadBonusRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) &&
                    setMultiUnitReloadBonusRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL safety driveaway bonus Rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(driveawayCDLSafetyRate) < 0.0 ||
                      driveawayCDLSafetyRate === "." ||
                      /^\d*\.$/.test(driveawayCDLSafetyRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayCDLSafetyRate"
                name="driveawayCDLSafetyRate"
                type="text"
                maxLength={7}
                value={driveawayCDLSafetyRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setDriveawayCDLSafetyRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL safety driveaway miles
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(driveawayCDLSafetyMiles) > 32767 || parseInt(driveawayCDLSafetyMiles) < 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayCDLSafetyMiles"
                name="driveawayCDLSafetyMiles"
                type="text"
                maxLength={5}
                value={driveawayCDLSafetyMiles}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDriveawayCDLSafetyMiles(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL safety driveaway units
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(driveawayCDLSafetyUnits) > 32767 || parseInt(driveawayCDLSafetyUnits) < 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="driveawayCDLSafetyUnits"
                name="driveawayCDLSafetyUnits"
                type="text"
                maxLength={5}
                value={driveawayCDLSafetyUnits}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setDriveawayCDLSafetyUnits(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL safety towable bonus rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(towableCDLSafetyRate) < 0.0 ||
                      towableCDLSafetyRate === "." ||
                      /^\d*\.$/.test(towableCDLSafetyRate)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={7}
                value={towableCDLSafetyRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setTowableCDLSafetyRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL safety towable miles
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(towableCDLSafetyMiles) > 32767 || parseInt(towableCDLSafetyMiles) < 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="name"
                name="name"
                type="text"
                maxLength={5}
                value={towableCDLSafetyMiles}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setTowableCDLSafetyMiles(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL safety towable units
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(towableCDLSafetyUnits) > 32767 || parseInt(towableCDLSafetyUnits) < 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="towableCDLSafetyUnits"
                name="towableCDLSafetyUnits"
                type="text"
                maxLength={5}
                value={towableCDLSafetyUnits}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setTowableCDLSafetyUnits(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center invisible row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                CDL safety towable units
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl `}
                id="name"
                name="name"
                type="text"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable bonus program rate
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <Input
                className={`customFormControl ${
                  !viewDetail
                    ? saveCompanyObject?.towableBonusProgram
                      ? towableBonusProgramRate === "" ||
                        parseFloat(towableBonusProgramRate) <= 0.0 ||
                        towableBonusProgramRate === "." ||
                        /^\d*\.$/.test(towableBonusProgramRate)
                        ? "borderRed"
                        : "borderGreen"
                      : parseFloat(towableBonusProgramRate) < 0.0 ||
                          towableBonusProgramRate === "." ||
                          /^\d*\.$/.test(towableBonusProgramRate)
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                id="towableBonusProgramRate"
                name="towableBonusProgramRate"
                type="text"
                maxLength={7}
                value={towableBonusProgramRate}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,2}(\.\d{0,4})?$/) && setTowableBonusProgramRate(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable bonus program units
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? saveCompanyObject?.towableBonusProgram
                      ? towableBonusProgramUnits === "" ||
                        parseInt(towableBonusProgramUnits) > 32767 ||
                        parseInt(towableBonusProgramUnits) <= 0
                        ? "borderRed"
                        : "borderGreen"
                      : parseInt(towableBonusProgramUnits) > 32767 || parseInt(towableBonusProgramUnits) < 0
                        ? "borderRed"
                        : ""
                    : ""
                }`}
                id="towableBonusProgramUnits"
                name="towableBonusProgramUnits"
                type="text"
                maxLength={5}
                value={towableBonusProgramUnits}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setTowableBonusProgramUnits(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable bonus program begin
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsTowableBonusBeignValid}
                date={towableBonusProgramBegin}
                setDate={(value) => setTowableBonusProgramBegin(value)}
                disabled={viewDetail}
                max={
                  towableBonusProgramEnd
                    ? new Date(parseLocalDate(towableBonusProgramEnd).getTime() - 24 * 60 * 60 * 1000)
                    : ""
                }
                className={`customFormControl ${
                  !viewDetail
                    ? saveCompanyObject?.towableBonusProgram
                      ? (towableBonusProgramBegin && towableBonusProgramBegin <= towableBonusProgramEnd) ||
                        towableBonusProgramBegin
                        ? isTowableBonusBeignValid
                          ? "borderGreen"
                          : "borderRed"
                        : "borderRed"
                      : (towableBonusProgramEnd && towableBonusProgramBegin >= towableBonusProgramEnd) ||
                          (towableBonusProgramEnd && !towableBonusProgramBegin)
                        ? "borderRed"
                        : isTowableBonusBeignValid
                          ? " "
                          : "borderRed"
                    : ""
                } `}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0 w-200">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                towable bonus program end
              </Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0" style={{ width: "95px" }}>
              <DateInputField
                setIsDateValid={setIsTowableBonusEndValid}
                date={towableBonusProgramEnd}
                setDate={(value) => setTowableBonusProgramEnd(value)}
                disabled={viewDetail}
                min={
                  towableBonusProgramBegin
                    ? new Date(parseLocalDate(towableBonusProgramBegin).getTime() + 24 * 60 * 60 * 1000)
                    : ""
                }
                className={`customFormControl ${
                  !viewDetail
                    ? saveCompanyObject?.towableBonusProgram
                      ? (towableBonusProgramEnd && towableBonusProgramBegin <= towableBonusProgramEnd) ||
                        towableBonusProgramEnd
                        ? isTowableBonusEndValid
                          ? "borderGreen"
                          : "borderRed"
                        : "borderRed"
                      : (towableBonusProgramBegin && towableBonusProgramBegin >= towableBonusProgramEnd) ||
                          (towableBonusProgramBegin && !towableBonusProgramEnd)
                        ? "borderRed"
                        : isTowableBonusEndValid
                          ? " "
                          : "borderRed"
                    : ""
                } `}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety level 1
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(safetyLevel1) > 32767 || parseInt(safetyLevel1) <= 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyLevel1"
                name="safetyLevel1"
                type="text"
                maxLength={5}
                value={safetyLevel1}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setSafetyLevel1(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety bonus 1
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(safetyBonus1) <= 0.0 ||
                      parseFloat(safetyBonus1) >= 1.0 ||
                      safetyBonus1 === "." ||
                      /^\d*\.$/.test(safetyBonus1)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyBonus1"
                name="safetyBonus1"
                type="text"
                maxLength={4}
                value={safetyBonus1}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,1}(\.\d{0,2})?$/) && setSafetyBonus1(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety level 2
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(safetyLevel2) > 32767 || parseInt(safetyLevel2) <= 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyLevel2"
                name="safetyLevel2"
                type="text"
                maxLength={5}
                value={safetyLevel2}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setSafetyLevel2(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety bonus 2
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(safetyBonus2) <= 0.0 ||
                      parseFloat(safetyBonus2) >= 1.0 ||
                      safetyBonus2 === "." ||
                      /^\d*\.$/.test(safetyBonus2)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyBonus2"
                name="safetyBonus2"
                type="text"
                maxLength={4}
                value={safetyBonus2}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,1}(\.\d{0,2})?$/) && setSafetyBonus2(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety level 3
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(safetyLevel3) > 32767 || parseInt(safetyLevel3) <= 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyLevel3"
                name="safetyLevel3"
                type="text"
                maxLength={5}
                value={safetyLevel3}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setSafetyLevel3(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety bonus 3
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(safetyBonus3) <= 0.0 ||
                      parseFloat(safetyBonus3) >= 1.0 ||
                      safetyBonus3 === "." ||
                      /^\d*\.$/.test(safetyBonus3)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyBonus3"
                name="safetyBonus3"
                type="text"
                maxLength={4}
                value={safetyBonus3}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,1}(\.\d{0,2})?$/) && setSafetyBonus3(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety level 4
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(safetyLevel4) > 32767 || parseInt(safetyLevel4) <= 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyLevel4"
                name="safetyLevel4"
                type="text"
                maxLength={5}
                value={safetyLevel4}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setSafetyLevel4(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety bonus 4
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(safetyBonus4) <= 0.0 ||
                      parseFloat(safetyBonus4) >= 1.0 ||
                      safetyBonus4 === "." ||
                      /^\d*\.$/.test(safetyBonus4)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyBonus4"
                name="safetyBonus4"
                type="text"
                maxLength={4}
                value={safetyBonus4}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,1}(\.\d{0,2})?$/) && setSafetyBonus4(e.target.value);
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety level 5
              </Form.Label>
            </Col>

            <div className="p-0 w-60px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseInt(safetyLevel5) > 32767 || parseInt(safetyLevel5) <= 0
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyLevel5"
                name="safetyLevel5"
                type="text"
                maxLength={5}
                value={safetyLevel5}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onInput={(e) => {
                  setSafetyLevel5(e.target.value.replace(/[^\d]/g, ""));
                }}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center  row  m-l-0 m-r-0">
            <Col xs={4} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label text-capitalize dealer-label">
                safety bonus 5
              </Form.Label>
            </Col>

            <div className="p-0 w-50px">
              <input
                className={`customFormControl ${
                  !viewDetail
                    ? parseFloat(safetyBonus5) <= 0.0 ||
                      parseFloat(safetyBonus5) >= 1.0 ||
                      safetyBonus5 === "." ||
                      /^\d*\.$/.test(safetyBonus5)
                      ? "borderRed"
                      : ""
                    : ""
                }`}
                id="safetyBonus5"
                name="safetyBonus5"
                type="text"
                maxLength={4}
                value={safetyBonus5}
                disabled={viewDetail}
                autoComplete="off"
                aria-autocomplete="list"
                onChange={(e) => {
                  e.target.value.match(/^\d{0,1}(\.\d{0,2})?$/) && setSafetyBonus5(e.target.value);
                }}
              />
            </div>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
}

export default Bonuses;
