import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { t } from "i18next";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setYardFormData } from "../../../../redux/YardMaintenanceSlice";
import DynamicTextFields from "../../../common/AutoWrapTextFields/DynamicTextFields";
function Bol() {
  const dispatch = useDispatch();
  const [hours1, setHours1] = useState("");
  const [hours2, setHours2] = useState("");
  const [hours3, setHours3] = useState("");
  const [directions1, setDirections1] = useState("");
  const [directions2, setDirections2] = useState("");
  const [directions3, setDirections3] = useState("");
  const [directions4, setDirections4] = useState("");
  const [directions5, setDirections5] = useState("");
  const [directions6, setDirections6] = useState("");
  const [hours, setHours] = useState("");
  const [directions, setDirections] = useState("");
  const [bolTextDirectionInputValues, setBolTextDirectionInputValues] = useState(Array(3).fill(""));
  const [bolTextHourInputValues, setBolTextHourInputValues] = useState(Array(6).fill(""));
  const viewDetail = useSelector((state) => state.yardMaintenanceReducer.viewDetail);
  const editYardData = useSelector((state) => state.yardMaintenanceReducer.editYardData);
  useEffect(() => {
    if (editYardData != null) {
      setHours1(editYardData.hours1 ? editYardData.hours1?.trim() : "");
      setHours2(editYardData.hours2 ? editYardData.hours2?.trim() : "");
      setHours3(editYardData.hours3 ? editYardData.hours3?.trim() : "");
      setDirections1(editYardData.directions1 ? editYardData.directions1?.trim() : "");
      setDirections2(editYardData.directions2 ? editYardData.directions2?.trim() : "");
      setDirections3(editYardData.directions3 ? editYardData.directions3?.trim() : "");
      setDirections4(editYardData.directions4 ? editYardData.directions4?.trim() : "");
      setDirections5(editYardData.directions5 ? editYardData.directions5?.trim() : "");
      setDirections6(editYardData.directions6 ? editYardData.directions6?.trim() : "");
      setHours(editYardData.hours ? editYardData.hours?.trim() : "");
      setDirections(editYardData.directions ? editYardData.directions?.trim() : "");
    }
  }, [editYardData, viewDetail]);

  // to backend
  const bolTab = () => {
    dispatch(
      setYardFormData({
        hours1: hours1,
        hours2: hours2,
        hours3: hours3,
        directions1: directions1,
        directions2: directions2,
        directions3: directions3,
        directions4: directions4,
        directions5: directions5,
        directions6: directions6,
        bolTextHours: bolTextHourInputValues,
        bolTextDirections: bolTextDirectionInputValues,
        hours: hours,
        directions: directions,
      })
    );
  };
  useEffect(() => {
    bolTab();
  }, [
    hours1,
    hours2,
    hours3,
    directions1,
    directions2,
    directions3,
    directions4,
    directions5,
    directions6,
    hours,
    directions,
    bolTextHourInputValues,
    bolTextDirectionInputValues,
  ]);
  useEffect(() => {
    const backendValues = [hours1, hours2, hours3];
    setBolTextHourInputValues(backendValues);
  }, [hours1, hours2, hours3]);

  useEffect(() => {
    const backendValues = [directions1, directions2, directions3, directions4, directions5, directions6];
    setBolTextDirectionInputValues(backendValues);
  }, [directions1, directions2, directions3, directions4, directions5, directions6]);
  return (
    <Form className="p-3">
      <div className="p-15 w-100 ">
        <Row className="m-0 p-0 ">
          <Col sm={6} md={6} lg={6} xl={6} xs={6}>
            <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items row m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className=" col-form-label dealer-label">
                  {t("edit.yard.page.bol.tab.hours")}
                </Form.Label>
              </Col>

              <Col xs={8} md={8} sm={8} className="p-0">
                <DynamicTextFields
                  numFields={3}
                  maxCharLimit={42}
                  inputValues={bolTextHourInputValues}
                  setInputValues={setBolTextHourInputValues}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>

            <Form.Group className=" form-group mt-5 m-b-20 align-items row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="p-0">
                <Form.Label className=" col-form-label dealer-label">
                  {t("edit.yard.page.bol.tab.directions")}
                </Form.Label>
              </Col>

              <Col md={8} sm={8} xs={8} className="p-0">
                <DynamicTextFields
                  numFields={6}
                  maxCharLimit={42}
                  inputValues={bolTextDirectionInputValues}
                  setInputValues={setBolTextDirectionInputValues}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>
          </Col>

          <Col sm={6} md={6} lg={6} xl={6} xs={6}>
            <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <label className="col-form-label dealer-label p-0 m-b-10">
                  {t("edit.yard.page.bol.tab.hours")}
                </label>
              </Col>

              <Col xs={12} md={12} sm={12} className="p-0">
                <textarea
                  type="text"
                  name="hours"
                  id="hours"
                  cols={30}
                  rows={7}
                  className="w-100"
                  value={hours}
                  disabled={viewDetail}
                  onInput={(e) => {
                    setHours(e.target.value.replace(/^\s+/g, ""));
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0">
                <Form.Label className="col-form-label dealer-label p-0 m-b-10">
                  {t("edit.yard.page.bol.tab.directions")}
                </Form.Label>
              </Col>

              <Col xs={12} md={12} sm={12} className="p-0">
                <textarea
                  type="text"
                  name="directions"
                  id="directions"
                  cols={30}
                  rows={7}
                  className="w-100"
                  value={directions}
                  disabled={viewDetail}
                  onInput={(e) => {
                    setDirections(e.target.value.replace(/^\s+/g, ""));
                  }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default Bol;
