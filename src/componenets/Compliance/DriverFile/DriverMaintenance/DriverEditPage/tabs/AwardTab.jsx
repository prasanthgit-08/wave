import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import DateInputField from "../../../../../common/DateInputField";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setIsAwardTabValid, setSaveFormData } from "../../../../../../redux/DriverMaintenanceSlice";
import Input from "../../../../../../components/common/input";
const AwardTab = () => {
  const [safetyAwardLevel, setSafetyAwardLevel] = useState(0);
  const [safetyAward25K, setSafetyAward25K] = useState(false);
  const [safetyAward25KDate, setSafetyAward25KDate] = useState("");
  const [safetyAward25KRedeemed, setSafetyAward25KRedeemed] = useState("");
  const [isDate25KRedeemedValidation, setIsDate25KRedeemedValidation] = useState(true);

  const [safetyAward50K, setSafetyAward50K] = useState(false);
  const [safetyAward50KDate, setSafetyAward50KDate] = useState("");
  const [safetyAward50KRedeemed, setSafetyAward50KRedeemed] = useState("");
  const [isDate50KRedeemedValidation, setIsDate50KRedeemedValidation] = useState(true);

  const [safetyAward100K, setSafetyAward100K] = useState(false);
  const [safetyAward100KDate, setSafetyAward100KDate] = useState("");
  const [safetyAward100KRedeemed, setSafetyAward100KRedeemed] = useState("");
  const [safetyAward100KCard, setSafetyAward100KCard] = useState("");
  const [isDate100KRedeemedValidation, setIsDate100KRedeemedValidation] = useState(true);

  const [safetyAward250K, setSafetyAward250K] = useState(false);
  const [safetyAward250KDate, setSafetyAward250KDate] = useState("");
  const [safetyAward250KRedeemed, setSafetyAward250KRedeemed] = useState("");
  const [safetyAward250KCard, setSafetyAward250KCard] = useState("");
  const [isDate250KRedeemedValidation, setIsDate250KRedeemedValidation] = useState(true);

  const [safetyAward500K, setSafetyAward500K] = useState(false);
  const [safetyAward500KDate, setSafetyAward500KDate] = useState("");
  const [safetyAward500KRedeemed, setSafetyAward500KRedeemed] = useState("");
  const [safetyAward500KCard1, setSafetyAward500KCard1] = useState("");
  const [safetyAward500KCard2, setSafetyAward500KCard2] = useState("");
  const [isDate500KRedeemedValidation, setIsDate500KRedeemedValidation] = useState(true);

  const [safetyAward750K, setSafetyAward750K] = useState(false);
  const [safetyAward750KDate, setSafetyAward750KDate] = useState("");
  const [safetyAward750KRedeemed, setSafetyAward750KRedeemed] = useState("");
  const [safetyAward750KCard1, setSafetyAward750KCard1] = useState("");
  const [safetyAward750KCard2, setSafetyAward750KCard2] = useState("");
  const [isDate750KRedeemedValidation, setIsDate750KRedeemedValidation] = useState(true);

  const [safetyAward1M, setSafetyAward1M] = useState(false);
  const [safetyAward1MDate, setSafetyAward1MDate] = useState("");
  const [safetyAward1MRedeemed, setSafetyAward1MRedeemed] = useState("");
  const [safetyAward1MCard1, setSafetyAward1MCard1] = useState("");
  const [safetyAward1MCard2, setSafetyAward1MCard2] = useState("");
  const [safetyAward1MCard3, setSafetyAward1MCard3] = useState("");
  const [isDate1MRedeemedValidation, setIsDate1MRedeemedValidation] = useState(true);

  const [safetyAward125M, setSafetyAward125M] = useState(false);
  const [safetyAward125MDate, setSafetyAward125MDate] = useState("");
  const [safetyAward125MRedeemed, setSafetyAward125MRedeemed] = useState("");
  const [safetyAward125MCard1, setSafetyAward125MCard1] = useState("");
  const [safetyAward125MCard2, setSafetyAward125MCard2] = useState("");
  const [safetyAward125MCard3, setSafetyAward125MCard3] = useState("");
  const [isDate125MRedeemedValidation, setIsDate125MRedeemedValidation] = useState(true);

  const [safetyAward15M, setSafetyAward15M] = useState(false);
  const [safetyAward15MDate, setSafetyAward15MDate] = useState("");
  const [safetyAward15MRedeemed, setSafetyAward15MRedeemed] = useState("");
  const [safetyAward15MCard1, setSafetyAward15MCard1] = useState("");
  const [safetyAward15MCard2, setSafetyAward15MCard2] = useState("");
  const [safetyAward15MCard3, setSafetyAward15MCard3] = useState("");
  const [isDate15MRedeemedValidation, setIsDate15MRedeemedValidation] = useState(true);

  const [safetyAward175M, setSafetyAward175M] = useState(false);
  const [safetyAward175MDate, setSafetyAward175MDate] = useState("");
  const [safetyAward175MRedeemed, setSafetyAward175MRedeemed] = useState("");
  const [safetyAward175MCard1, setSafetyAward175MCard1] = useState("");
  const [safetyAward175MCard2, setSafetyAward175MCard2] = useState("");
  const [safetyAward175MCard3, setSafetyAward175MCard3] = useState("");
  const [isDate175MRedeemedValidation, setIsDate175MRedeemedValidation] = useState(true);

  const [safetyAward2M, setSafetyAward2M] = useState(false);
  const [safetyAward2MDate, setSafetyAward2MDate] = useState("");
  const [safetyAward2MRedeemed, setSafetyAward2MRedeemed] = useState("");
  const [safetyAward2MCard1, setSafetyAward2MCard1] = useState("");
  const [safetyAward2MCard2, setSafetyAward2MCard2] = useState("");
  const [safetyAward2MCard3, setSafetyAward2MCard3] = useState("");
  const [isDate2MRedeemedValidation, setIsDate2MRedeemedValidation] = useState(true);

  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.driverMaintenanceReducer.viewDetail);
  const saveFormData = useSelector((state) => state.driverMaintenanceReducer.saveFormData);
  const editFormData = useSelector((state) => state.driverMaintenanceReducer.editFormData);
  const displayFlag = useSelector((state) => state.driverMaintenanceReducer.displayFlag);

  const setAwardTabValues = (formData) => {
    setSafetyAwardLevel(formData?.safetyAwardLevel);
    setSafetyAward25K(formData?.safetyAward25K || false);
    setSafetyAward25KDate(formData?.safetyAward25KDate || "");
    setSafetyAward25KRedeemed(formData?.safetyAward25KRedeemed || "");

    setSafetyAward50K(formData?.safetyAward50K || false);
    setSafetyAward50KDate(formData?.safetyAward50KDate || "");
    setSafetyAward50KRedeemed(formData?.safetyAward50KRedeemed || "");

    setSafetyAward100K(formData?.safetyAward100K || false);
    setSafetyAward100KDate(formData?.safetyAward100KDate || "");
    setSafetyAward100KRedeemed(formData?.safetyAward100KRedeemed || "");
    setSafetyAward100KCard(formData?.safetyAward100KCard || "");

    setSafetyAward250K(formData?.safetyAward250K || false);
    setSafetyAward250KDate(formData?.safetyAward250KDate || "");
    setSafetyAward250KRedeemed(formData?.safetyAward250KRedeemed || "");
    setSafetyAward250KCard(formData?.safetyAward250KCard || "");

    setSafetyAward500K(formData?.safetyAward500K || false);
    setSafetyAward500KDate(formData?.safetyAward500KDate || "");
    setSafetyAward500KRedeemed(formData?.safetyAward500KRedeemed || "");
    setSafetyAward500KCard1(formData?.safetyAward500KCard || "");
    setSafetyAward500KCard2(formData?.safetyAward500KCard2 || "");

    setSafetyAward750K(formData?.safetyAward750K || false);
    setSafetyAward750KDate(formData?.safetyAward750KDate || "");
    setSafetyAward750KRedeemed(formData?.safetyAward750KRedeemed || "");
    setSafetyAward750KCard1(formData?.safetyAward750KCard || "");
    setSafetyAward750KCard2(formData?.safetyAward750KCard2 || "");

    setSafetyAward1M(formData?.safetyAward1M || false);
    setSafetyAward1MDate(formData?.safetyAward1MDate || "");
    setSafetyAward1MRedeemed(formData?.safetyAward1MRedeemed || "");
    setSafetyAward1MCard1(formData?.safetyAward1MCard || "");
    setSafetyAward1MCard2(formData?.safetyAward1MCard2 || "");
    setSafetyAward1MCard3(formData?.safetyAward1MCard3 || "");

    setSafetyAward125M(formData?.safetyAward125M || false);
    setSafetyAward125MDate(formData?.safetyAward125MDate || "");
    setSafetyAward125MRedeemed(formData?.safetyAward125MRedeemed || "");
    setSafetyAward125MCard1(formData?.safetyAward125MCard || "");
    setSafetyAward125MCard2(formData?.safetyAward125MCard2 || "");
    setSafetyAward125MCard3(formData?.safetyAward125MCard3 || "");

    setSafetyAward15M(formData?.safetyAward15M || false);
    setSafetyAward15MDate(formData?.safetyAward15MDate || "");
    setSafetyAward15MRedeemed(formData?.safetyAward15MRedeemed || "");
    setSafetyAward15MCard1(formData?.safetyAward15MCard || "");
    setSafetyAward15MCard2(formData?.safetyAward15MCard2 || "");
    setSafetyAward15MCard3(formData?.safetyAward15MCard3 || "");

    setSafetyAward175M(formData?.safetyAward175M || false);
    setSafetyAward175MDate(formData?.safetyAward175MDate || "");
    setSafetyAward175MRedeemed(formData?.safetyAward175MRedeemed || "");
    setSafetyAward175MCard1(formData?.safetyAward175MCard || "");
    setSafetyAward175MCard2(formData?.safetyAward175MCard2 || "");
    setSafetyAward175MCard3(formData?.safetyAward175MCard3 || "");

    setSafetyAward2M(formData?.safetyAward2M || false);
    setSafetyAward2MDate(formData?.safetyAward2MDate || "");
    setSafetyAward2MRedeemed(formData?.safetyAward2MRedeemed || "");
    setSafetyAward2MCard1(formData?.safetyAward2MCard || "");
    setSafetyAward2MCard2(formData?.safetyAward2MCard2 || "");
    setSafetyAward2MCard3(formData?.safetyAward2MCard3 || "");
  };

  useEffect(
    () => {
      if (viewDetail && editFormData != null) {
        setAwardTabValues(editFormData);
      }
      if (!viewDetail && saveFormData !== null && displayFlag) {
        setAwardTabValues(saveFormData);
      }
    },
    [editFormData, viewDetail],
    displayFlag
  );
  const awardTabData = () => {
    dispatch(
      setSaveFormData({
        safetyAwardLevel: safetyAwardLevel,
        safetyAward25K: safetyAward25K,
        safetyAward25KDate: safetyAward25KDate,
        safetyAward25KRedeemed: safetyAward25KRedeemed,

        safetyAward50K: safetyAward50K,
        safetyAward50KDate: safetyAward50KDate,
        safetyAward50KRedeemed: safetyAward50KRedeemed,

        safetyAward100K: safetyAward100K,
        safetyAward100KDate: safetyAward100KDate,
        safetyAward100KRedeemed: safetyAward100KRedeemed,

        safetyAward100KCard: safetyAward100KCard,
        safetyAward250K: safetyAward250K,
        safetyAward250KDate: safetyAward250KDate,

        safetyAward250KRedeemed: safetyAward250KRedeemed,
        safetyAward250KCard: safetyAward250KCard,
        safetyAward500KCard: safetyAward500KCard1,

        safetyAward500K: safetyAward500K,
        safetyAward500KDate: safetyAward500KDate,
        safetyAward500KRedeemed: safetyAward500KRedeemed,
        safetyAward500KCard2: safetyAward500KCard2,

        safetyAward750KCard: safetyAward750KCard1,
        safetyAward750K: safetyAward750K,
        safetyAward750KDate: safetyAward750KDate,
        safetyAward750KRedeemed: safetyAward750KRedeemed,
        safetyAward750KCard2: safetyAward750KCard2,

        safetyAward1M: safetyAward1M,
        safetyAward1MDate: safetyAward1MDate,
        safetyAward1MRedeemed: safetyAward1MRedeemed,
        safetyAward1MCard: safetyAward1MCard1,
        safetyAward1MCard2: safetyAward1MCard2,
        safetyAward1MCard3: safetyAward1MCard3,

        safetyAward125M: safetyAward125M,
        safetyAward125MDate: safetyAward125MDate,
        safetyAward125MRedeemed: safetyAward125MRedeemed,
        safetyAward125MCard: safetyAward125MCard1,
        safetyAward125MCard2: safetyAward125MCard2,
        safetyAward125MCard3: safetyAward125MCard3,

        safetyAward15M: safetyAward15M,
        safetyAward15MDate: safetyAward15MDate,
        safetyAward15MRedeemed: safetyAward15MRedeemed,
        safetyAward15MCard: safetyAward15MCard1,
        safetyAward15MCard2: safetyAward15MCard2,
        safetyAward15MCard3: safetyAward15MCard3,

        safetyAward175M: safetyAward175M,
        safetyAward175MDate: safetyAward175MDate,
        safetyAward175MRedeemed: safetyAward175MRedeemed,
        safetyAward175MCard: safetyAward175MCard1,
        safetyAward175MCard2: safetyAward175MCard2,
        safetyAward175MCard3: safetyAward175MCard3,

        safetyAward2M: safetyAward2M,
        safetyAward2MDate: safetyAward2MDate,
        safetyAward2MRedeemed: safetyAward2MRedeemed,
        safetyAward2MCard: safetyAward2MCard1,
        safetyAward2MCard2: safetyAward2MCard2,
        safetyAward2MCard3: safetyAward2MCard3,
      })
    );
  };
  useEffect(() => {
    awardTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    safetyAwardLevel,
    safetyAward25K,
    safetyAward25KRedeemed,
    safetyAward25KDate,
    safetyAward100KCard,
    safetyAward100K,
    safetyAward100KDate,
    safetyAward100KRedeemed,
    safetyAward50K,
    safetyAward50KDate,
    safetyAward50KRedeemed,
    safetyAward250K,
    safetyAward250KCard,
    safetyAward250KDate,
    safetyAward250KRedeemed,
    safetyAward500K,
    safetyAward500KDate,
    safetyAward500KRedeemed,
    safetyAward500KCard1,
    safetyAward500KCard2,
    safetyAward750K,
    safetyAward750KCard1,
    safetyAward750KCard1,
    safetyAward750KRedeemed,
    safetyAward750KDate,
    safetyAward1M,
    safetyAward1MDate,
    safetyAward1MRedeemed,
    safetyAward1MCard1,
    safetyAward1MCard2,
    safetyAward1MCard2,
    safetyAward125MCard1,
    safetyAward125MCard2,
    safetyAward125MCard2,
    safetyAward125M,
    safetyAward125MRedeemed,
    safetyAward125MDate,
    safetyAward15M,
    safetyAward15MCard1,
    safetyAward15MCard2,
    safetyAward125MCard3,
    safetyAward15MRedeemed,
    safetyAward15MDate,
    safetyAward175M,
    safetyAward175MCard1,
    safetyAward175MCard2,
    safetyAward175MCard3,
    safetyAward175MRedeemed,
    safetyAward175MDate,
    safetyAward2M,
    safetyAward2MCard1,
    safetyAward2MCard2,
    safetyAward2MCard3,
    safetyAward2MRedeemed,
    safetyAward2MDate,
  ]);
  useEffect(() => {
    if (
      isDate100KRedeemedValidation &&
      isDate125MRedeemedValidation &&
      isDate1MRedeemedValidation &&
      isDate15MRedeemedValidation &&
      isDate175MRedeemedValidation &&
      isDate250KRedeemedValidation &&
      isDate25KRedeemedValidation &&
      isDate2MRedeemedValidation &&
      isDate500KRedeemedValidation &&
      isDate50KRedeemedValidation &&
      isDate750KRedeemedValidation
    ) {
      dispatch(setIsAwardTabValid(true));
    } else {
      dispatch(setIsAwardTabValid(false));
    }
  }, [
    isDate100KRedeemedValidation,
    isDate125MRedeemedValidation,
    isDate1MRedeemedValidation,
    isDate15MRedeemedValidation,
    isDate175MRedeemedValidation,
    isDate250KRedeemedValidation,
    isDate25KRedeemedValidation,
    isDate2MRedeemedValidation,
    isDate500KRedeemedValidation,
    isDate50KRedeemedValidation,
    isDate750KRedeemedValidation,
  ]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0">
        <Col xs={3} sm={3} md={3} lg={3} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">Safety award Level</Form.Label>
            </Col>

            <Col xs={1} md={1} sm={1} className="p-0 w-50px">
              <input
                type="number"
                className="customFormControl"
                id=" unitClass"
                value={safetyAwardLevel}
                min={1}
                max={9}
                disabled
                onBeforeInput={(e) => {
                  if (e.data === "e" || e.data === "." || e.data === "-" || !/^[1-9.-]*$/.test(e.data)) {
                    e.preventDefault();
                  }
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">25K</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward25K}
                checked={safetyAward25K}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">25K Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward25KDate} setDate={setSafetyAward25KDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">25K Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward25KRedeemed}
                setDate={setSafetyAward25KRedeemed}
                disabled={viewDetail || (!safetyAward25K && !safetyAward25KDate)}
                setIsDateValid={setIsDate25KRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate25KRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">50K</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward50K}
                checked={safetyAward50K}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">50K Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward50KDate} setDate={setSafetyAward50KDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">50K Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward50KRedeemed}
                setDate={setSafetyAward50KRedeemed}
                disabled={viewDetail || (!safetyAward50K && !safetyAward50KDate)}
                setIsDateValid={setIsDate50KRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate50KRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">100K</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward100K}
                checked={safetyAward100K}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">100K Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward100KDate} setDate={setSafetyAward100KDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">100K Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward100KRedeemed}
                setDate={setSafetyAward100KRedeemed}
                disabled={viewDetail || (!safetyAward100K && !safetyAward100KDate)}
                setIsDateValid={setIsDate100KRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate100KRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">100K Award</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward100KCard}
                maxLength={20}
                disabled={viewDetail || (!safetyAward100K && !safetyAward100KDate)}
                onChange={(e) => {
                  setSafetyAward100KCard(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">250K</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward250K}
                checked={safetyAward250K}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">250K Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward250KDate} setDate={setSafetyAward250KDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">250K Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward250KRedeemed}
                setDate={setSafetyAward250KRedeemed}
                disabled={viewDetail || (!safetyAward250K && !safetyAward250KDate)}
                setIsDateValid={setIsDate250KRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate250KRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">250K Award</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward250KCard}
                maxLength={20}
                disabled={viewDetail || (!safetyAward250K && !safetyAward250KDate)}
                onChange={(e) => {
                  setSafetyAward250KCard(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">500K</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward500K}
                checked={safetyAward500K}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">500K Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward500KDate} setDate={setSafetyAward500KDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">500K Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward500KRedeemed}
                setDate={setSafetyAward500KRedeemed}
                disabled={viewDetail || (!safetyAward500K && !safetyAward500KDate)}
                setIsDateValid={setIsDate500KRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate500KRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">500K Award #1</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward500KCard1}
                maxLength={20}
                disabled={viewDetail || (!safetyAward500K && !safetyAward500KDate)}
                onChange={(e) => {
                  setSafetyAward500KCard1(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">500K Award #2</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward500KCard2}
                maxLength={20}
                disabled={viewDetail || (!safetyAward500K && !safetyAward500KDate)}
                onChange={(e) => {
                  setSafetyAward500KCard2(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">750K</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward750K}
                checked={safetyAward750K}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">750K Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward750KDate} setDate={setSafetyAward750KDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">750K Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward750KRedeemed}
                setDate={setSafetyAward750KRedeemed}
                disabled={viewDetail || (!safetyAward750K && !safetyAward750KDate)}
                setIsDateValid={setIsDate750KRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate750KRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">750K Award #1</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward750KCard1}
                maxLength={20}
                disabled={viewDetail || (!safetyAward750K && !safetyAward750KDate)}
                onChange={(e) => {
                  setSafetyAward750KCard1(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">750K Award #2</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward750KCard2}
                maxLength={20}
                disabled={viewDetail || (!safetyAward750K && !safetyAward750KDate)}
                onChange={(e) => {
                  setSafetyAward750KCard2(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1M</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward1M}
                checked={safetyAward1M}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1M Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward1MDate} setDate={setSafetyAward1MDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1M Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward1MRedeemed}
                setDate={setSafetyAward1MRedeemed}
                disabled={viewDetail || (!safetyAward1M && !safetyAward1MDate)}
                setIsDateValid={setIsDate1MRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate1MRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1M Award #1</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward1MCard1}
                maxLength={20}
                disabled={viewDetail || (!safetyAward1M && !safetyAward1MDate)}
                onChange={(e) => {
                  setSafetyAward1MCard1(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1M Award #2</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward1MCard2}
                maxLength={20}
                disabled={viewDetail || (!safetyAward1M && !safetyAward1MDate)}
                onChange={(e) => {
                  setSafetyAward1MCard2(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1M Award #3</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward1MCard3}
                maxLength={20}
                disabled={viewDetail || (!safetyAward1M && !safetyAward1MDate)}
                onChange={(e) => {
                  setSafetyAward1MCard3(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.25M</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward125M}
                checked={safetyAward125M}
                disabled
                onChange={(e) => {
                  setSafetyAward125M(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.25M Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward125MDate} setDate={setSafetyAward125MDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.25M Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward125MRedeemed}
                setDate={setSafetyAward125MRedeemed}
                disabled={viewDetail || (!safetyAward125M && !safetyAward125MDate)}
                setIsDateValid={setIsDate125MRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate125MRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.25M Award #1</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward125MCard1}
                maxLength={20}
                disabled={viewDetail || (!safetyAward125M && !safetyAward125MDate)}
                onChange={(e) => {
                  setSafetyAward125MCard1(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.25M Award #2</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward125MCard2}
                maxLength={20}
                disabled={viewDetail || (!safetyAward125M && !safetyAward125MDate)}
                onChange={(e) => {
                  setSafetyAward125MCard2(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.25M Award #3</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward125MCard3}
                maxLength={20}
                disabled={viewDetail || (!safetyAward125M && !safetyAward125MDate)}
                onChange={(e) => {
                  setSafetyAward125MCard3(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.5M</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward15M}
                checked={safetyAward15M}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.5M Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward15MDate} setDate={setSafetyAward15MDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.5M Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward15MRedeemed}
                setDate={setSafetyAward15MRedeemed}
                disabled={viewDetail || (!safetyAward15M && !safetyAward15MDate)}
                setIsDateValid={setIsDate15MRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate15MRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.5M Award #1</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward15MCard1}
                maxLength={20}
                disabled={viewDetail || (!safetyAward15M && !safetyAward15MDate)}
                onChange={(e) => {
                  setSafetyAward15MCard1(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.5M Award #2</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward15MCard2}
                maxLength={20}
                disabled={viewDetail || (!safetyAward15M && !safetyAward15MDate)}
                onChange={(e) => {
                  setSafetyAward15MCard2(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.5M Award #3</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward15MCard3}
                maxLength={20}
                disabled={viewDetail || (!safetyAward15M && !safetyAward15MDate)}
                onInput={(e) => {
                  setSafetyAward15MCard3(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} className="p-r-0 p-l-0-medium-width p-r-10-medium-width">
          <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.75M</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward175M}
                checked={safetyAward175M}
                disabled
                onChange={(e) => {
                  setSafetyAward175M(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.75M Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward175MDate} setDate={setSafetyAward175MDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.75M Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward175MRedeemed}
                setDate={setSafetyAward175MRedeemed}
                disabled={viewDetail || (!safetyAward175M && !safetyAward175MDate)}
                setIsDateValid={setIsDate175MRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate175MRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.75M Award #1</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward175MCard1}
                maxLength={20}
                disabled={viewDetail || (!safetyAward175M && !safetyAward175MDate)}
                onInput={(e) => {
                  setSafetyAward175MCard1(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.75M Award #2</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward175MCard2}
                maxLength={20}
                disabled={viewDetail || (!safetyAward175M && !safetyAward175MDate)}
                onInput={(e) => {
                  setSafetyAward175MCard2(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">1.75M Award #3</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward175MCard3}
                maxLength={20}
                disabled={viewDetail || (!safetyAward175M && !safetyAward175MDate)}
                onInput={(e) => {
                  setSafetyAward175MCard3(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">2M </Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                value={safetyAward2M}
                checked={safetyAward2M}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">2M Awarded</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField date={safetyAward2MDate} setDate={setSafetyAward2MDate} disabled />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">2M Redeemed</Form.Label>
            </Col>

            <Col xs={2} md={2} sm={2} className="p-0 w-95px">
              <DateInputField
                date={safetyAward2MRedeemed}
                setDate={setSafetyAward2MRedeemed}
                disabled={viewDetail || (!safetyAward2M && !safetyAward2MDate)}
                setIsDateValid={setIsDate2MRedeemedValidation}
                className={`customFormControl ${
                  viewDetail === true ? "" : isDate2MRedeemedValidation ? "" : "borderRed"
                }`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">2M Award #1</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward2MCard1}
                maxLength={20}
                disabled={viewDetail || (!safetyAward2M && !safetyAward2MDate)}
                onInput={(e) => {
                  setSafetyAward2MCard1(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">2M Award #2</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward2MCard2}
                maxLength={20}
                disabled={viewDetail || (!safetyAward2M && !safetyAward2MDate)}
                onInput={(e) => {
                  setSafetyAward2MCard2(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className="col-form-label dealer-label">2M Award #3</Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0">
              <Input
                className="customFormControl"
                id="customer"
                name="customer"
                type="customer"
                value={safetyAward2MCard3}
                maxLength={20}
                disabled={viewDetail || (!safetyAward2M && !safetyAward2MDate)}
                onInput={(e) => {
                  setSafetyAward2MCard3(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default AwardTab;
