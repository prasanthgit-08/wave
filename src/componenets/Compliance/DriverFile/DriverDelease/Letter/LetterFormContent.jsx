import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import DriverDeleaseService from "../../../../../services/DriverDeleaseService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminFee,
  setBondBalance,
  setChargeAdminFee,
  setHasActiveDamage,
  setPayBalance,
  setRehire,
  setReserveBalance,
} from "../../../../../redux/DriverDeleaseSlice";
import { t } from "i18next";
import Input from "../../../../../components/common/input";

const LetterFormContent = () => {
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { driverId } = useParams();
  const [equipmentloading, setEquipmentLoading] = useState(true);
  const [returnedPlate1, setReturnedPlate1] = useState(false);
  const [returnedPlate2, setReturnedPlate2] = useState(false);
  const [hasOutstandingPaperWork, setHasOutstandingPaperWork] = useState(false);
  const [daysRehireandTerminated, setDaysRehireandTerminated] = useState("");
  const [matchingRecordsPresent, setMatchingrecordsPresent] = useState(false);
  const [rehireNotes, setRehireNotes] = useState("");
  const [missingEquipments, setMissingEquipments] = useState([]);
  const editFormData = useSelector((state) => state.driverDeleaseReducer.editFormData);
  const hasActiveDamage = useSelector((state) => state.driverDeleaseReducer.hasActiveDamage);
  const rehire = useSelector((state) => state.driverDeleaseReducer.rehire);
  const chargeAdminFee = useSelector((state) => state.driverDeleaseReducer.chargeAdminFee);
  const payBalance = useSelector((state) => state.driverDeleaseReducer.payBalance);
  const bondBalance = useSelector((state) => state.driverDeleaseReducer.bondBalance);
  const reserveBalance = useSelector((state) => state.driverDeleaseReducer.reserveBalance);
  const adminFee = useSelector((state) => state.driverDeleaseReducer.adminFee);
  const disablePrint = useSelector((state) => state.driverDeleaseReducer.disablePrint);
  const isLetterTab = useSelector((state) => state.driverDeleaseReducer.isLetterTab);

  /******
   * Set the values from the general tab
   * for the fields in the Letter Tab
   *******/
  useEffect(() => {
    if (editFormData !== null && id !== null) {
      setReturnedPlate1(editFormData.returnedPlate1 ? editFormData.returnedPlate1 : false);
      setReturnedPlate2(editFormData.returnedPlate2 ? editFormData.returnedPlate2 : false);
      dispatch(setRehire(editFormData.rehire ? editFormData.rehire : false));
      setRehireNotes(editFormData.rehireReason ? editFormData.rehireReason : "");
    }
  }, [editFormData, id]);
  /******Display the Pay Balance */
  const fetchPayBalance = () => {
    DriverDeleaseService.getCheckPayBalanceByDriverId(driverId)
      .then((res) => {
        dispatch(setPayBalance(res.data));
      })
      .catch((err) => console.log(err));
  };
  /****Fetch the Pay Balance data */
  useEffect(() => {
    fetchPayBalance();
  }, [driverId]);

  /****Fetch the Bond Balance *****/
  const fetchBondBalance = () => {
    DriverDeleaseService.getBondBalanceByDriverId(driverId)
      .then((res) => {
        dispatch(setBondBalance(res.data));
      })
      .catch((err) => console.log(err));
  };
  /****Fetch the Bond Balance data */
  useEffect(() => {
    fetchBondBalance();
  }, [driverId]);
  /****Fetch the Bond Balance *****/
  const fetchReserveBalance = () => {
    DriverDeleaseService.getReserveBalanceByDriverId(driverId)
      .then((res) => {
        dispatch(setReserveBalance(res.data));
      })
      .catch((err) => console.log(err));
  };
  /****Fetch the Bond Balance data */
  useEffect(() => {
    fetchReserveBalance();
  }, [driverId]);
  /*****
   * Check whether any delayed
   * Unit is active or Damaged for selected driver
   * ****/
  const checkActiveandDamagedDelayedUnits = () => {
    DriverDeleaseService.checkActiveandDamagedDelayUnits(driverId)
      .then((response) => {
        setTimeout(() => {
          dispatch(setHasActiveDamage(response.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /****
   * API Call to check Unit
   * is active or Damaged for selected driver
   * *****/
  useEffect(() => {
    checkActiveandDamagedDelayedUnits();
  }, [driverId]);
  /*****
   * Check whether any
   * active dispatches for the selected driver
   * ****/
  const checkActiveDispatchesUnits = () => {
    DriverDeleaseService.checkActiveDispatches(driverId)
      .then((response) => {
        setTimeout(() => {
          setHasOutstandingPaperWork(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /****API Call to check Unit
   * is active or Damaged for selected driver
   * *****/
  useEffect(() => {
    checkActiveDispatchesUnits();
  }, [driverId]);
  const getDaysBetweenHireandTerminate = () => {
    DriverDeleaseService.getDaysBetweenHireandTermination(id)
      .then((response) => {
        setTimeout(() => {
          setDaysRehireandTerminated(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /****API Call to get the
   * dates between hire and terminated
   * *****/
  useEffect(() => {
    getDaysBetweenHireandTerminate();
  }, [id]);
  /*****Call to check whether matching records are present
   * for the Driver Termination Letters
   * ****/
  const checkmatchingTerminationRecordsPresent = () => {
    DriverDeleaseService.checkMatchingRecordsForDriverTermination(hasActiveDamage, rehire).then(
      (response) => {
        setTimeout(() => {
          setMatchingrecordsPresent(response.data);
        });
      }
    );
  };
  /*******
   * Flag to refresh the page and navigate to previos
   * page
   ****/
  useEffect(() => {
    if (!isLetterTab) {
      navigate(`/driver-delease/${driverId}/${id}`);
    }
  }, [isLetterTab]);

  useEffect(() => {
    checkmatchingTerminationRecordsPresent();
  }, [hasActiveDamage, rehire]);
  /******Get the admin fee for the Driver*****/
  const getAdminFeeForLetter = () => {
    DriverDeleaseService.getTheAdminFee(hasActiveDamage, rehire).then((response) => {
      setTimeout(() => {
        dispatch(setAdminFee(response.data));
      });
    });
  };
  useEffect(() => {
    if (chargeAdminFee) {
      getAdminFeeForLetter();
    }
  }, [hasActiveDamage, rehire, chargeAdminFee]);
  /******
   * Get the description for the missing equipments
   *
   * *******/
  const getMissingEquipments = () => {
    DriverDeleaseService.getTheMissingEquipments(driverId)
      .then((response) => {
        setTimeout(() => {
          setEquipmentLoading(false);
          setMissingEquipments(response.data);
        });
      })
      .catch((err) => {
        setEquipmentLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getMissingEquipments();
  }, [driverId]);
  /******
   * Clear the Admin fee id charge admin fee is unchecked
   * ****/
  useEffect(() => {
    if (!chargeAdminFee) {
      dispatch(setAdminFee(""));
    }
  }, [chargeAdminFee]);
  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-0 ">
          <Col sm={6} md={6} lg={6} xl={6} xs={6}>
            <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Pay Balance</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <Input
                  className={`customFormControl`}
                  type="text"
                  name="payBalance"
                  value={payBalance}
                  maxLength={7}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Bond Balance</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <Input
                  className={`customFormControl`}
                  type="text"
                  name="bondBalance"
                  value={bondBalance}
                  maxLength={7}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Reserve Balance</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <Input
                  className={`customFormControl`}
                  type="text"
                  name="reserveBalance"
                  value={reserveBalance}
                  maxLength={7}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Returned Plate#1</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="returnedPlate1"
                  value={returnedPlate1}
                  checked={returnedPlate1}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Returned Plate#2</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="returnedPlate2"
                  value={returnedPlate2}
                  checked={returnedPlate2}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Has Active Damage</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="hasActiveDamage"
                  value={hasActiveDamage}
                  checked={hasActiveDamage}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Has Outstanding Paperwork</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="hasOutstandingPaperWork"
                  value={hasOutstandingPaperWork}
                  checked={hasOutstandingPaperWork}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Charge Admin Fee</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="chargeAdminFee"
                  value={chargeAdminFee}
                  checked={chargeAdminFee}
                  disabled={!matchingRecordsPresent || adminFee === 0 || disablePrint}
                  onChange={(e) => {
                    dispatch(setChargeAdminFee(e.target.checked));
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 form-group  align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Admin Fee</Form.Label>
              </Col>
              <Col xs={1} md={1} sm={1} className="p-0 w-75px">
                <Input
                  className={`customFormControl`}
                  type="text"
                  name="adminFee"
                  value={adminFee}
                  maxLength={7}
                  disabled
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
              <Col xs={4} sm={4} className="p-0">
                <Form.Label className="col-form-label dealer-label">Rehire</Form.Label>
              </Col>
              <Col xs={3} md={3} sm={3} className="p-0">
                <input
                  type="checkbox"
                  className={`form-check-input p-0 $`}
                  name="rehire"
                  value={rehire}
                  checked={rehire}
                  disabled
                />
              </Col>
            </Form.Group>
          </Col>
          <Col sm={6} xs={6} md={6}>
            <div className="fixTableHead ">
              <p className="mt-1 ">Missing Equipment</p>
              <div className={`border border-secondary overflow-auto h-250px  `}>
                <table className="table border-bottom  table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th className="col-6">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentloading
                      ? null
                      : missingEquipments.map((code) => (
                          <tr id="rowId" key={code.equipmentHistoryPK}>
                            <td className="f-w-600">{code.equipments.description}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
                {equipmentloading
                  ? ""
                  : missingEquipments?.length === 0 && (
                      <h2 className="empty-list" align="center">
                        {t("AlternateContact.list.empty.message")}
                      </h2>
                    )}
              </div>
            </div>
          </Col>
          <Col xs={12} className="ps-3">
            {/* Notes */}
            <Form.Group className="mt-2 form-group  align-items row  m-l-0 m-r-0">
              <Col xs={1} sm={1} className="p-0">
                <Form.Label className="col-form-label dealer-label" style={{ marginLeft: "-5px" }}>
                  Rehire Notes
                </Form.Label>
              </Col>
              <Col xs={10} md={10} className="p-0 me-2" style={{ marginLeft: "67px" }}>
                <textarea
                  rows={5}
                  cols={10}
                  type="text"
                  className="customFormControl h-100 customFocusClass"
                  id="rehireNotes"
                  name="rehireNotes"
                  value={rehireNotes}
                  autoComplete="off"
                  disabled
                  aria-autocomplete="list"
                  style={{ width: "101%" }}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LetterFormContent;
