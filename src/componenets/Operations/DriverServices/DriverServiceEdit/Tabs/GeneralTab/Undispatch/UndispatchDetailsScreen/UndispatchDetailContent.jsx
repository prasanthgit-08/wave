import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  resetApuScreen,
  setActivationStatus,
  setAttemptedPickup,
  setCheckEquipment,
  setConditionIssues,
  setDeleteUnit,
  setEquipment,
  setSisterNotification,
  setUndispatchReason,
  setUnitOnHold,
} from "../../../../../../../../redux/UndispatchSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UndispatchService from "../../../../../../../../services/UndispatchService";
import LoadingText from "../../../../../../../common/LoadingText";
import CustomRadioGroup from "../../../../../../../common/CustomRadioGroup";
import { PermissionKeyGeneratorUtil } from "../../../../../../../../utils/PermissionKeyGeneratorUtil";
const UndispatchDetailContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dispatchId, driverId } = useParams();

  const [disable, setDisable] = useState(false);

  const dispatchData = useSelector((state) => state.undispatchReducer.dispatchData);
  const activationStatus = useSelector((state) => state.undispatchReducer.activationStatus);
  const equipment = useSelector((state) => state.undispatchReducer.equipment);
  const checkEquipment = useSelector((state) => state.undispatchReducer.checkEquipment);
  const deleteUnit = useSelector((state) => state.undispatchReducer.deleteUnit);
  const unitOnHold = useSelector((state) => state.undispatchReducer.unitOnHold);
  const attemptedPickup = useSelector((state) => state.undispatchReducer.attemptedPickup);
  const undispatchReason = useSelector((state) => state.undispatchReducer.undispatchReason);
  const conditionIssues = useSelector((state) => state.undispatchReducer.conditionIssues);
  const saving = useSelector((state) => state.undispatchReducer.saving);
  const undispatchFlag = useSelector((state) => state.undispatchReducer.undispatchFlag);
  const sisterNotification = useSelector((state) => state.undispatchReducer.sisterNotification);

  const checkEquipmentHistoryRecord = () => {
    UndispatchService.checkEquipmentHistoryRecordExist(dispatchId)
      .then(({ data }) => {
        dispatch(setCheckEquipment(data));
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (window.location.pathname === `/undispatch-confirmation/${driverId}/${dispatchId}`) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [window]);

  useEffect(() => {
    if (dispatchId) checkEquipmentHistoryRecord();
  }, [dispatchId]);

  useEffect(() => {
    if (unitOnHold || deleteUnit) {
      dispatch(setConditionIssues("None"));
      dispatch(setActivationStatus("Inactive"));
    }
  }, [unitOnHold, deleteUnit]);

  useEffect(() => {
    if ((!unitOnHold || !deleteUnit) && activationStatus == "Inactive" && !attemptedPickup) {
      dispatch(setConditionIssues("None"));

      dispatch(setActivationStatus("Active"));
    }
  }, [unitOnHold, deleteUnit]);

  useEffect(() => {
    if ((unitOnHold || deleteUnit) && activationStatus == "Inactive") {
      dispatch(setActivationStatus("Inactive"));
    }
  }, [unitOnHold, deleteUnit]);
  useEffect(() => {
    if ((conditionIssues === "Breakdown" || conditionIssues == "Damage") && activationStatus == "Delay") {
      dispatch(setActivationStatus("Active"));
    }
  }, [conditionIssues]);

  useEffect(() => {
    if (!undispatchFlag) {
      navigate(`/undispatch/${driverId}`);
    }
  }, [undispatchFlag]);

  //check permission

  const deniedPermissions = JSON.parse(localStorage.getItem("deniedPermissions"));
  const apuPermission = PermissionKeyGeneratorUtil("UNDISPATCHAPU", "new");
  const deletePermission = PermissionKeyGeneratorUtil("UNDISPATCHDELETE", "new");
  const [hasAPUPermission, setAPUPermission] = useState(false);
  const [hasDeletePermission, setDeletePermission] = useState(false);

  useEffect(() => {
    if (deniedPermissions) {
      setAPUPermission(!deniedPermissions.includes(apuPermission));
      setDeletePermission(!deniedPermissions.includes(deletePermission));
    }
  }, [deniedPermissions, apuPermission, deletePermission]);

  return (
    <div className="p-2">
      <div className="p-15 shadow-sm rounded border quarterScreenFormContentHeight">
        {!saving && (
          <Row className="m-0 p-10">
            <Col xs={12}>
              <Form.Group className="mt-0 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Payback Amount</Form.Label>
                </Col>
                <Col xs={1} sm={1} md={1} className="p-0 w-80px">
                  <input
                    type="text"
                    className="customFormControl"
                    id="last5"
                    name="last5"
                    value={((dispatchData?.netPay || 0) - (dispatchData?.payBalance || 0)).toFixed(2)}
                    disabled
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "135px" }}>
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Condition Issues
                  </Form.Label>
                </Col>

                <div className="d-flex col-6">
                  <CustomRadioGroup
                    options={[
                      { value: "None", disabled: unitOnHold || deleteUnit || disable },
                      {
                        value: "Breakdown",
                        disabled: unitOnHold || deleteUnit || disable || sisterNotification === "Damage",
                      },
                      {
                        value: "Damage",
                        disabled: unitOnHold || deleteUnit || disable || sisterNotification === "Breakdown",
                      },
                    ]}
                    name={"conditionIssues"}
                    horizontal
                    selectedOption={conditionIssues}
                    onChange={(value) => {
                      dispatch(setConditionIssues(value));
                      if (value === "None" && dispatchData?.postingCompanyFK) {
                        dispatch(setSisterNotification("Neither"));
                      }
                      if (value === "Breakdown" && dispatchData?.postingCompanyFK) {
                        dispatch(setSisterNotification("Breakdown"));
                        dispatch(setActivationStatus("Inactive"));
                        dispatch(setEquipment("Checkin"));
                      }
                      if (value === "Damage" && dispatchData?.postingCompanyFK) {
                        dispatch(setSisterNotification("Damage"));
                        dispatch(setActivationStatus("Inactive"));
                        dispatch(setEquipment("Checkin"));
                      }
                    }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "135px" }}>
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Activation Status
                  </Form.Label>
                </Col>
                <div className="d-flex col-6">
                  <CustomRadioGroup
                    name={"activationStatus"}
                    options={[
                      {
                        value: "Active",
                        disabled:
                          unitOnHold ||
                          deleteUnit ||
                          disable ||
                          sisterNotification === "Damage" ||
                          sisterNotification === "Breakdown",
                      },
                      {
                        value: "Inactive",
                        disabled:
                          unitOnHold ||
                          deleteUnit ||
                          disable ||
                          sisterNotification === "Damage" ||
                          sisterNotification === "Breakdown",
                      },
                      {
                        value: "Delay",
                        disabled:
                          conditionIssues === "Breakdown" ||
                          conditionIssues === "Damage" ||
                          unitOnHold ||
                          deleteUnit ||
                          disable ||
                          sisterNotification === "Damage" ||
                          sisterNotification === "Breakdown",
                      },
                    ]}
                    horizontal
                    selectedOption={activationStatus}
                    onChange={(value) => {
                      dispatch(setActivationStatus(value));
                      if (value === "Delay") {
                        dispatch(setEquipment("Checkin"));
                      }
                    }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label
                    htmlFor="name"
                    className={`col-form-label dealer-label `}
                    hidden={!checkEquipment}
                  >
                    Equipment
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      className="form-check-input p-0"
                      id="Checkin"
                      name="radioGroup"
                      value="Checkin"
                      checked={equipment === "Checkin"}
                      hidden={!checkEquipment}
                      onChange={(e) => {
                        dispatch(setEquipment(e.target.value));
                      }}
                      disabled={
                        disable ||
                        unitOnHold ||
                        deleteUnit ||
                        activationStatus === "Delay" ||
                        sisterNotification === "Damage" ||
                        sisterNotification === "Breakdown"
                      }
                    />
                    <Col xs={1} md={1} sm={1} className="p-0"></Col>
                    <Form.Label className="col-form-label me-2  w-60px" hidden={!checkEquipment}>
                      Checkin
                    </Form.Label>
                  </div>
                </Col>

                <Col xs={2} md={2} sm={2} className="p-0">
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      className="form-check-input p-0"
                      id="Next Driver"
                      name="radioGroup"
                      value="Next Driver"
                      hidden={!checkEquipment}
                      checked={equipment === "Next Driver"}
                      onChange={(e) => {
                        dispatch(setEquipment(e.target.value));
                      }}
                      disabled={
                        disable ||
                        unitOnHold ||
                        deleteUnit ||
                        activationStatus === "Delay" ||
                        sisterNotification === "Damage" ||
                        sisterNotification === "Breakdown"
                      }
                    />

                    <Col xs={1} md={1} sm={1} className="p-0 w-5px"></Col>
                    <Form.Label className="col-form-label me-2 w-150px " hidden={!checkEquipment}>
                      Next Driver
                    </Form.Label>
                  </div>
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label className="col-form-label dealer-label">Unit On Hold</Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    checked={unitOnHold}
                    value={unitOnHold}
                    disabled={
                      deleteUnit ||
                      disable ||
                      sisterNotification === "Breakdown" ||
                      sisterNotification === "Damage"
                    }

                    onChange={(e) => {
                      const value = e.target.checked;
                      dispatch(setUnitOnHold(value));
                      if (value) {
                        dispatch(setEquipment("Checkin"));
                      } else {
                        dispatch(setEquipment("Next Driver"));
                      }
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label
                    className="col-form-label dealer-label"
                    hidden={
                      !(dispatchData?.reload === true && !dispatchData?.pickupAtPlant && hasDeletePermission)
                    }
                  >
                    Delete Unit
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    checked={deleteUnit}
                    value={deleteUnit}
                    disabled={
                      unitOnHold ||
                      disable ||
                      sisterNotification === "Breakdown" ||
                      sisterNotification === "Damage"
                    }

                    onChange={(e) => {
                      const value = e.target.checked;
                      dispatch(setDeleteUnit(value));
                      if (value) {
                        dispatch(setEquipment("Checkin"));
                      } else {
                        dispatch(setEquipment("Next Driver"));
                      }
                    }}
                    hidden={
                      !(dispatchData?.reload === true && !dispatchData?.pickupAtPlant && hasDeletePermission)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label
                    className="col-form-label dealer-label"
                    hidden={
                      !(dispatchData?.reload === true && !dispatchData?.pickupAtPlant && hasAPUPermission)
                    }
                  >
                    Attempted Pickup
                  </Form.Label>
                </Col>
                <Col xs={2} md={2} sm={2} className="p-0">
                  <input
                    type="checkbox"
                    className="form-check-input p-0 "
                    checked={attemptedPickup}
                    value={attemptedPickup}
                    disabled={disable}

                    onChange={(e) => {
                      const value = e.target.checked;
                      dispatch(setAttemptedPickup(value));
                      dispatch(resetApuScreen());
                    }}

                    hidden={
                      !(dispatchData?.reload === true && !dispatchData?.pickupAtPlant && hasAPUPermission)
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0" style={{ width: "135px" }}>
                  <Form.Label
                    htmlFor="name"
                    className="col-form-label dealer-label"
                    hidden={!dispatchData?.postingCompanyFK}
                  >
                    Sister Notification
                  </Form.Label>
                </Col>

                <div className="d-flex col-6">
                  <CustomRadioGroup
                    options={[
                      { value: "Neither", disabled: disable },
                      { value: "Breakdown", disabled: disable || conditionIssues === "Damage" },
                      { value: "Damage", disabled: disable || conditionIssues === "Breakdown" },
                    ]}
                    name={"sisterNot  fication"}
                    horizontal
                    selectedOption={sisterNotification}
                    hidden={!dispatchData?.postingCompanyFK}
                    onChange={(value) => {
                      dispatch(setSisterNotification(value));
                      if (value === "Breakdown" || value === "Damage") {
                        dispatch(setEquipment("Checkin"));
                        dispatch(setActivationStatus("Inactive"));
                        dispatch(setUnitOnHold(false));
                        dispatch(setDeleteUnit(false));
                      }
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                <Col sm={2} md={2} xs={2} className="p-0">
                  <label className="col-form-label dealer-label p-0 m-b-20">Undispatch Reason</label>
                </Col>

                <Col sm={8} md={8} className="p-0">
                  <textarea
                    rows={6}
                    cols={10}
                    type="text"
                    name="notes"
                    value={undispatchReason}
                    disabled={disable}
                    onInput={(e) => {
                      dispatch(setUndispatchReason(e.target.value.replace(/^\s+/g, "")));
                    }}
                    className={`customFormControl h-100 ${
                      disable ? "" : undispatchReason?.trim() ? "borderGreen" : "borderRed"
                    } `}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>
        )}
        {saving && (
          <div className="fade modal-backdrop show">
            {" "}
            <div className="pos-center">
              {" "}
              <div className="loader"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UndispatchDetailContent;
