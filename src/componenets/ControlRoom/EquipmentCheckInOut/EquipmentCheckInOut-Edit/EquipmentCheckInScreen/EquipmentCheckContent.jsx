import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import EquipmentCheckInOutService from "../../../../../services/EquipmentCheckInOutService";
import {
  setAssignedToDriver,
  setAssignedToUnit,
  setDepositAmount,
  setDescription,
  setEditFormDataCheckIn,
  setEquipmentNumber,
  setSerialNumber,
} from "../../../../../redux/EquipmentCheckInOutSlice";
import EquipmentService from "../../../../../services/EquipmentService";
const EquipmentCheckContent = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editFormDataCheckIn = useSelector((state) => state.equipmentCheckInOutReducer.editFormDataCheckIn);
  const description = useSelector((state) => state.equipmentCheckInOutReducer.description);
  const equipmentNumber = useSelector((state) => state.equipmentCheckInOutReducer.equipmentNumber);
  const serialNumber = useSelector((state) => state.equipmentCheckInOutReducer.serialNumber);
  const assignedToDriver = useSelector((state) => state.equipmentCheckInOutReducer.assignedToDriver);
  const assignedToUnit = useSelector((state) => state.equipmentCheckInOutReducer.assignedToUnit);
  const depositAmount = useSelector((state) => state.equipmentCheckInOutReducer.depositAmount);

  //EquipmentHistory data
  const fetchData = (id) => {
    EquipmentCheckInOutService.getEquipmentHistoryDataByEquipmentFK(id)
      .then((response) => {
        const { data } = response;

        dispatch(setDepositAmount(data[0].depositAmount?.toFixed(2)));
        dispatch(setAssignedToUnit(data[0].unitsforShuttle?.unitNumber));
        //
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (editFormDataCheckIn != null) {
      dispatch(
        setDescription(editFormDataCheckIn.description ? editFormDataCheckIn.description?.trim() : "")
      );
      dispatch(
        setEquipmentNumber(
          editFormDataCheckIn.equipmentNumber ? editFormDataCheckIn.equipmentNumber?.trim() : ""
        )
      );
      dispatch(
        setSerialNumber(editFormDataCheckIn.serialNumber ? editFormDataCheckIn.serialNumber?.trim() : "")
      );
    }
  }, [editFormDataCheckIn]);


  const fetchRecordById = (id) => {
    setIsLoading(true);
    EquipmentCheckInOutService.getEquipmentById(id)
      .then((response) => {
        const data = response.data;

        dispatch(setEditFormDataCheckIn(data));
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  const fetchEquipmentDetails = (id) => {
    EquipmentService.getRecord(id)
      .then((res) => {
        dispatch(setAssignedToDriver(res.data.driverName));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
    fetchData(id);
    fetchEquipmentDetails(id);
  }, [id]);
  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Form.Group className="form-group m-t-5 form-group m-t-5 m-b- align-items-center row m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel"> Equipment Number</Form.Label>
                  </Col>
                  <Col xs={1} md={1} sm={1} className="p-0 w-100px">
                    <input
                      id="equipmentNumber"
                      name="equipmentNumber"
                      type="text"
                      value={equipmentNumber}
                      maxLength={10}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      className={`${styles.formControl} 
                      `}
                      onInput={(e) => {
                        dispatch(setEquipmentNumber(e.target.value.replace(/^\s+/g, "")));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Description</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      id="description"
                      name="description"
                      type="text"
                      value={description}
                      maxLength={30}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      className={`${styles.formControl} 
                     `}
                      onInput={(e) => {
                        dispatch(setDescription(e.target.value.replace(/^\s+/g, "")));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Serial Number</Form.Label>
                  </Col>

                  <Col xs={3} md={3} sm={3} className="p-0">
                    <input
                      id="serialNumber"
                      name="serialNumber"
                      type="text"
                      value={serialNumber}
                      maxLength={30}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      className={`${styles.formControl} 
                     `}
                      onInput={(e) => {
                        dispatch(setSerialNumber(e.target.value.replace(/^\s+/g, "")));
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Assigned To Driver</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      id=""
                      name=""
                      type="text"
                      value={assignedToDriver}
                      maxLength={30}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      className={`${styles.formControl} 
                     `}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-4 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Assigned To Unit</Form.Label>
                  </Col>

                  <Col xs={4} md={4} sm={4} className="p-0">
                    <input
                      id=""
                      name=""
                      type="text"
                      value={assignedToUnit}
                      maxLength={30}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      className={`${styles.formControl} 
                     `}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className=" mt-5 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className=" col-form-label dealer-label">Deposit Amount</Form.Label>
                  </Col>

                  <Col xs={1} md={1} sm={1} className="p-0">
                    <input
                      id=""
                      name=""
                      type="text"
                      value={depositAmount}
                      maxLength={30}
                      disabled
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      className={`${styles.formControl} 
                     `}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            {isLoading ? (
              <div className="fade modal-backdrop show">
                {" "}
                <div className="pos-center">
                  {" "}
                  <div className="loader"></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCheckContent;
