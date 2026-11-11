import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DateInputField from "../../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewMaintenanceData,
  setNewMaintenanceTab,
  setNewMaintenanceTabValid,
  setSaveFormData,
} from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";
import Input from "../../../../../../../components/common/input";

const DOTNewMaintenance = () => {
  const dispatch = useDispatch();
  const [newMaintenance, setNewMaintenance] = useState(false);
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [item4, setItem4] = useState("");
  const [item5, setItem5] = useState("");
  const [item6, setItem6] = useState("");
  const [item7, setItem7] = useState("");
  const [item8, setItem8] = useState("");

  const maintenanceViolation = useSelector((state) => state.driverDOTInspection.maintenanceViolation);

  const newMaintenanceSaveData = () => {
    dispatch(
      setSaveFormData({
        RepairDate: null,
        MaintenanceViolationItem1: item1 || "",
        MaintenanceViolationItem2: item2 || "",
        MaintenanceViolationItem3: item3 || "",
        MaintenanceViolationItem4: item4 || "",
        MaintenanceViolationItem5: item5 || "",
        MaintenanceViolationItem6: item6 || "",
        MaintenanceViolationItem7: item7 || "",
        MaintenanceViolationItem8: item8 || "",
      })
    );
  };

  useEffect(() => {
    newMaintenanceSaveData();
  }, [item1, item2, item3, item4, item5, item6, item7, item8]);

  useEffect(() => {
    if (!maintenanceViolation) {
      setItem1("");
      setItem2("");
      setItem3("");
      setItem3("");
      setItem5("");
      setItem6("");
      setItem7("");
      setItem8("");
    }
  }, [maintenanceViolation]);

  useEffect(() => {
    if (item1 || item2 || item3 || item4 || item5 || item6 || item7 || item8) {
      dispatch(setNewMaintenanceTabValid(true));
    } else {
      dispatch(setNewMaintenanceTabValid(false));
    }
  }, [item1, item2, item3, item4, item5, item6, item7, item8]);

  return (
    <div className="p-2">
      <div className=" p-2 d-flex align-items-center mt-2">
        <Col sm={12} md={12} xs={12}>
          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-2`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #1
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item1
                      ? "borderGreen"
                      : item2 || item3 || item4 || item5 || item6 || item7 || item8
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item1"
                name="item1"
                type="text"
                value={item1}

                onChange={(e) => setItem1(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #2
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item2
                      ? "borderGreen"
                      : item1 || item3 || item4 || item5 || item6 || item7 || item8
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item2"
                name="itm2"
                type="text"
                value={item2}
                onChange={(e) => setItem2(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #3
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item3
                      ? "borderGreen"
                      : item1 || item2 || item4 || item5 || item6 || item7 || item8
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item3"
                name="itm3"
                type="text"
                value={item3}
                onChange={(e) => setItem3(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #4
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item4
                      ? "borderGreen"
                      : item1 || item2 || item3 || item5 || item6 || item7 || item8
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item4"
                name="itm4"
                type="text"
                value={item4}
                onChange={(e) => setItem4(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #5
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item5
                      ? "borderGreen"
                      : item1 || item2 || item3 || item4 || item6 || item7 || item8
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item5"
                name="itm5"
                type="text"
                value={item5}
                onChange={(e) => setItem5(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #6
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item6
                      ? "borderGreen"
                      : item1 || item2 || item3 || item4 || item5 || item7 || item8
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item6"
                name="itm6"
                type="text"
                value={item6}
                onChange={(e) => setItem6(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #7
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item7
                      ? "borderGreen"
                      : item1 || item2 || item3 || item4 || item5 || item6 || item8
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item7"
                name="itm7"
                type="text"
                value={item7}
                onChange={(e) => setItem7(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #8
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  maintenanceViolation
                    ? item8
                      ? "borderGreen"
                      : item1 || item2 || item3 || item4 || item5 || item6 || item7
                        ? ""
                        : "borderRed"
                    : ""
                }`}
                id="item8"
                name="itm8"
                type="text"
                value={item8}
                onChange={(e) => setItem8(e.target.value)}
                maxLength={78}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default DOTNewMaintenance;
