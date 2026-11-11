import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import DateInputField from "../../../../../../common/DateInputField";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditMaintenanceTabValid,
  setSaveFormData,
} from "../../../../../../../redux/Compliance/DriverDOTInspectionSlice";
import DriverDOTInspectionService from "../../../../../../../services/Compliance/DriverDOTInspectionService";
import { useParams } from "react-router-dom";
import Input from "../../../../../../../components/common/input";

const DOTEditMaintenance = () => {
  const dispatch = useDispatch();
  const { driverId, dotInspectionPK } = useParams();
  const maintenanceViolation = useSelector((state) => state.driverDOTInspection.maintenanceViolation);
  const viewDetail = useSelector((state) => state.driverDOTInspection.viewDetail);
  const [driverDOTInspectiondata, setDriverDOTInspectiondata] = useState();
  const [isRepairDateValid, setIsRepairDateValid] = useState(true);
  const [repairDate, setRepairDate] = useState(null);

  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [item4, setItem4] = useState("");
  const [item5, setItem5] = useState("");
  const [item6, setItem6] = useState("");
  const [item7, setItem7] = useState("");
  const [item8, setItem8] = useState("");

  const fetchDriverDOTInspectionDetails = () => {
    DriverDOTInspectionService.getDriverDOTInspectionDetails({
      driverDotInspectionPK: dotInspectionPK,
      tab: "Maintenance",
      driverFK: driverId,
    })
      .then((res) => {
        const dotInspectionData = res.data;
        setDriverDOTInspectiondata(dotInspectionData);
        setRepairDate(dotInspectionData?.RepairDate);
        setItem1(dotInspectionData?.MaintenanceViolationItem1);
        setItem2(dotInspectionData?.MaintenanceViolationItem2);
        setItem3(dotInspectionData?.MaintenanceViolationItem3);
        setItem4(dotInspectionData?.MaintenanceViolationItem4);
        setItem5(dotInspectionData?.MaintenanceViolationItem5);
        setItem6(dotInspectionData?.MaintenanceViolationItem6);
        setItem7(dotInspectionData?.MaintenanceViolationItem7);
        setItem8(dotInspectionData?.MaintenanceViolationItem8);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchDriverDOTInspectionDetails();
  }, []);

  useEffect(() => {
    if (viewDetail) {
      setRepairDate(driverDOTInspectiondata?.RepairDate);
      setItem1(driverDOTInspectiondata?.MaintenanceViolationItem1);
      setItem2(driverDOTInspectiondata?.MaintenanceViolationItem2);
      setItem3(driverDOTInspectiondata?.MaintenanceViolationItem3);
      setItem4(driverDOTInspectiondata?.MaintenanceViolationItem4);
      setItem5(driverDOTInspectiondata?.MaintenanceViolationItem5);
      setItem6(driverDOTInspectiondata?.MaintenanceViolationItem6);
      setItem7(driverDOTInspectiondata?.MaintenanceViolationItem7);
      setItem8(driverDOTInspectiondata?.MaintenanceViolationItem8);
    }
  }, [viewDetail]);

  useEffect(() => {
    if (!maintenanceViolation) {
      setRepairDate(null);
      setItem1("");
      setItem2("");
      setItem3("");
      setItem4("");
      setItem5("");
      setItem6("");
      setItem7("");
      setItem8("");
    }
  }, [maintenanceViolation]);

  const newMaintenanceSaveData = () => {
    dispatch(
      setSaveFormData({
        RepairDate: repairDate || "",
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
  }, [item1, item2, item3, item4, item5, item6, item7, item8, repairDate]);

  useEffect(() => {
    if (isRepairDateValid && (item1 || item2 || item3 || item4 || item5 || item6 || item7 || item8)) {
      dispatch(setEditMaintenanceTabValid(true));
    } else {
      dispatch(setEditMaintenanceTabValid(false));
    }
  }, [repairDate, isRepairDateValid, item1, item2, item3, item4, item5, item6, item7, item8]);

  return (
    <div className="p-2">
      <div className=" p-2 d-flex align-items-center mt-1">
        <Col sm={12} md={12} xs={12}>
          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-1  d-flex`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label className="col-form-label ">Repair Date</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className=" w-120px">
              <DateInputField
                disabled={viewDetail}
                className={`customFormControl ${
                  viewDetail ? "" : maintenanceViolation ? (isRepairDateValid ? "" : "borderRed") : ""
                }`}
                date={repairDate}
                setDate={(value) => {
                  setRepairDate(value);
                }}
                setIsDateValid={setIsRepairDateValid}
                max={new Date()}
              />
            </Col>
          </Form.Group>

          <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 mt-3`}>
            <Col sm={1} md={1} xs={1} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label">
                Item #1
              </Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9}>
              <Input
                className={`customFormControl ${
                  viewDetail
                    ? ""
                    : maintenanceViolation
                      ? item1
                        ? "borderGreen"
                        : item2 || item3 || item4 || item5 || item6 || item7 || item8
                          ? ""
                          : "borderRed"
                      : ""
                }`}
                id="item1"
                name="itm1"
                type="text"
                onChange={(e) => setItem1(e.target.value)}
                disabled={viewDetail}
                value={item1}
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
                  viewDetail
                    ? ""
                    : maintenanceViolation
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
                onChange={(e) => setItem2(e.target.value)}
                disabled={viewDetail}
                value={item2}
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
                  viewDetail
                    ? ""
                    : maintenanceViolation
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
                onChange={(e) => setItem3(e.target.value)}
                disabled={viewDetail}
                value={item3}
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
                  viewDetail
                    ? ""
                    : maintenanceViolation
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
                onChange={(e) => setItem4(e.target.value)}
                disabled={viewDetail}
                value={item4}
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
                  viewDetail
                    ? ""
                    : maintenanceViolation
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
                onChange={(e) => setItem5(e.target.value)}
                disabled={viewDetail}
                value={item5}
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
                  viewDetail
                    ? ""
                    : maintenanceViolation
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
                onChange={(e) => setItem6(e.target.value)}
                disabled={viewDetail}
                value={item6}
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
                  viewDetail
                    ? ""
                    : maintenanceViolation
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
                onChange={(e) => setItem7(e.target.value)}
                disabled={viewDetail}
                value={item7}
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
                  viewDetail
                    ? ""
                    : maintenanceViolation
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
                onChange={(e) => setItem8(e.target.value)}
                disabled={viewDetail}
                value={item8}
                maxLength={78}
              />
            </Col>
          </Form.Group>
        </Col>
      </div>
    </div>
  );
};

export default DOTEditMaintenance;
