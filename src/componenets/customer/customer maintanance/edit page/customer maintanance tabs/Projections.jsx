/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerFormData } from "../../../../../redux/CustomerMaintenanceSlice";
import * as yup from "yup";
import { Formik } from "formik";
import numberValidation from "../../../../../utils/validation/NumberValidation";
import Input from "../../../../../components/common/input";
const Projections = () => {
  const dispatch = useDispatch();

  const [industry, setIndustry] = useState("");
  const [january, setJanuary] = useState("");
  const [february, setFebruary] = useState("");
  const [march, setMarch] = useState("");
  const [april, setApril] = useState("");
  const [may, setMay] = useState("");
  const [june, setJune] = useState("");
  const [july, setJuly] = useState("");
  const [august, setAugust] = useState("");
  const [september, setSeptemer] = useState("");
  const [october, setOctober] = useState("");
  const [november, setNovember] = useState("");
  const [december, setDecember] = useState("");

  let viewDetail = useSelector((state) => state.customerMaintenanceReducer.viewDetail);
  const editCustomerData = useSelector((state) => state.customerMaintenanceReducer.editCustomerData);

  useEffect(() => {
    if (editCustomerData === null) {
      setIndustry("");
      setJanuary("");
      setFebruary("");
      setMarch("");
      setApril("");
      setMay("");
      setJune("");
      setJuly("");
      setAugust("");
      setSeptemer("");
      setOctober("");
      setNovember("");
      setDecember("");
    }
    if (editCustomerData !== null) {
      setIndustry(
        editCustomerData.industryProjection != null && editCustomerData.industryProjection != 0
          ? editCustomerData.industryProjection
          : ""
      );
      setJanuary(
        editCustomerData.januaryProjection != null && editCustomerData.januaryProjection != 0
          ? editCustomerData.januaryProjection
          : ""
      );
      setFebruary(
        editCustomerData.februaryProjection != null && editCustomerData.februaryProjection != 0
          ? editCustomerData.februaryProjection
          : ""
      );
      setMarch(
        editCustomerData.marchProjection != null && editCustomerData.marchProjection != 0
          ? editCustomerData.marchProjection
          : ""
      );
      setApril(
        editCustomerData.aprilProjection != null && editCustomerData.aprilProjection != 0
          ? editCustomerData.aprilProjection
          : ""
      );
      setMay(
        editCustomerData.mayProjection != null && editCustomerData.mayProjection != 0
          ? editCustomerData.mayProjection
          : ""
      );
      setJune(
        editCustomerData.juneProjection != null && editCustomerData.juneProjection != 0
          ? editCustomerData.juneProjection
          : ""
      );
      setJuly(
        editCustomerData.julyProjection != null && editCustomerData.julyProjection != 0
          ? editCustomerData.julyProjection
          : ""
      );
      setAugust(
        editCustomerData.augustProjection != null && editCustomerData.augustProjection != 0
          ? editCustomerData.augustProjection
          : ""
      );
      setSeptemer(
        editCustomerData.septemberProjection != null && editCustomerData.septemberProjection != 0
          ? editCustomerData.septemberProjection
          : ""
      );
      setOctober(
        editCustomerData.octoberProjection != null && editCustomerData.octoberProjection != 0
          ? editCustomerData.octoberProjection
          : ""
      );
      setNovember(
        editCustomerData.novemberProjection != null && editCustomerData.novemberProjection != 0
          ? editCustomerData.novemberProjection
          : ""
      );
      setDecember(
        editCustomerData.decemberProjection != null && editCustomerData.decemberProjection != 0
          ? editCustomerData.decemberProjection
          : ""
      );
    }
  }, [editCustomerData, viewDetail]);

  useEffect(() => {
    projectionTabFormData();
  }, [
    industry,
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
  ]);

  const projectionTabFormData = () => {
    dispatch(
      setCustomerFormData({
        industryProjection: industry,
        januaryProjection: january,
        februaryProjection: february,
        marchProjection: march,
        aprilProjection: april,
        mayProjection: may,
        juneProjection: june,
        julyProjection: july,
        augustProjection: august,
        septemberProjection: september,
        octoberProjection: october,
        novemberProjection: november,
        decemberProjection: december,
      })
    );
  };

  return (
    <div className="p-2 w-100">
      <Row className="m-0 p-0">
        <Col xs={6} sm={6} md={6}>
          <Row>
            <Col xs={6}>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Industry</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    type="text"
                    className="customFormControl"
                    name="industry"
                    value={industry}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setIndustry(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
            <Col xs={6}></Col>
          </Row>

          <Row style={{ marginTop: "70px" }}>
            <Col xs={6}>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">January</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    type="text"
                    name="january"
                    value={january}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setJanuary(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">February</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="february"
                    value={february}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setFebruary(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">March</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="march"
                    value={march}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setMarch(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">April</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="april"
                    value={april}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setApril(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">May</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="may"
                    value={may}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setMay(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">June</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="june"
                    value={june}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setJune(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col xs={6}>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">July</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="july"
                    value={july}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setJuly(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">August</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="august"
                    value={august}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setAugust(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">September</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="september"
                    value={september}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setSeptemer(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">October</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="october"
                    value={october}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setOctober(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">November</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="november"
                    value={november}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setNovember(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={4} sm={4} md={4} lg={4} xl={4} className="p-0">
                  <Form.Label className="col-form-label dealer-label">December</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 " style={{ width: "50px" }}>
                  <Input
                    className="customFormControl"
                    name="december"
                    value={december}
                    maxLength={5}
                    disabled={viewDetail}
                    onChange={(e) => {
                      e.target.value?.match(/^\d{0,5}?$/) &&
                        e.target.value <= 32767 &&
                        setDecember(numberValidation(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ".") {
                        e.preventDefault();
                      }
                    }}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Projections;
