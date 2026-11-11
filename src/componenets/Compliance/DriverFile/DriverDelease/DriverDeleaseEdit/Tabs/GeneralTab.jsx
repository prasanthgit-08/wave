import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DateInputField from "../../../../../common/DateInputField";
import { t } from "i18next";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import CustomRadioGroup from "../../../../../common/CustomRadioGroup";
import DriverServicesService from "../../../../../../services/DriverServicesService";
import {
  setDriverData,
  setDriverDeleaseData,
  setEditFormData,
  setIsDriverDeleaseLoading,
  setIsGeneralTabValid,
  setStatus,
  setViewDetail,
} from "../../../../../../redux/DriverDeleaseSlice";
import DriverDeleaseService from "../../../../../../services/DriverDeleaseService";
import { Radio, RadioGroup } from "react-radio-group";
import DeleaseCodeService from "../../../../../../services/DeleaseCodeService";
import DeleaseCodeLookup from "../../../../../LookupScreens/DeleaseCode/DeleaseCodeLookup";
import formatDatetimeToDate from "../../../../../../utils/formatDateTimeToDate";
import { setNormalSortFlag, setNormalSortValue } from "../../../../../../redux/DeleaseItemsSlice";
import LoadingIcon from "../../../../../common/LoadingIcon";
import Input from "../../../../../../components/common/input";

const GeneralTab = () => {
  const location = useLocation();

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, deleaserequestPK } = useParams();
  const { driverId } = useParams();
  const [deleaseCodeData, setDeleaseCodeData] = useState([]);
  const [deleaseCodeSelection, setDeleaseCodeSelection] = useState(false);
  const [deleaseCodeInput, setDeleaseCodeInput] = useState("");
  const [deleaseCodeFK, setDeleaseCodeFK] = useState(null);
  const userData = useSelector((state) => state.driverDeleaseReducer.userData);

  const viewDetail = useSelector((state) => state.driverDeleaseReducer.viewDetail);
  const driverData = useSelector((state) => state.driverDeleaseReducer.driverData);
  const editFormData = useSelector((state) => state.driverDeleaseReducer.editFormData);
  const isGeneralTabValid = useSelector((state) => state.driverDeleaseReducer.isGeneralTabValid);
  const isDriverDeleaseLoading = useSelector((state) => state.driverDeleaseReducer.isDriverDeleaseLoading);
  const status = useSelector((state) => state.driverDeleaseReducer.status);
  const changesCancelled = useSelector((state) => state.driverDeleaseReducer.changesCancelled);
  const isStatusChangingFromInactiveToTerminated = useSelector(
    (state) => state.driverDeleaseReducer.isStatusChangingFromInactiveToTerminated
  );
  const driverDeleaseRequestObject = useSelector(
    (state) => state.driverDeleaseRequestsReducer.driverDeleaseRequestObject
  );
  /*****Used for driver delease request delease Button Operation****/
  const isSettingDeleaseRequestProcessed = useSelector(
    (state) => state.driverDeleaseRequestsReducer.isSettingDeleaseRequestProcessed
  );
  const disableDeleaseButton = useSelector(
    (state) => state.driverDeleaseRequestsReducer.disableDeleaseButton
  );
  const isDeleaseProcess = useSelector((state) => state.driverDeleaseRequestsReducer.isDeleaseProcess);
  const isFromDriverDelease = useSelector((state) => state.driverDeleaseReducer.isFromDriverDelease);
  const isDeleaseCompliance = useSelector((state) => state.deleaseRequestReducer.isDeleaseCompliance);

  const [why, setWhy] = useState("safety");
  const [terminationDate, setTerminationDate] = useState("");
  const [terminationReason, setTerminationReason] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [motorized, setMotorized] = useState(false);
  const [flatbed, setFlatbed] = useState(false);
  const [towable, setTowable] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [terminated, setTerminated] = useState(false);
  const [voluntary, setVoluntary] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [safety, setSafety] = useState(false);
  const [requested, setRequested] = useState(false);
  const [bondFundAmount, setBondFundAmount] = useState("");
  const [bondRefundDate, setBondRefundDate] = useState("");
  const [reserveFundAmount, setReserveFundAmount] = useState("");
  const [reserveRefundDate, setReserveRefundDate] = useState("");
  const [notes, setNotes] = useState("");
  const [returnedPlate1, setReturnedPlate1] = useState(false);
  const [plateNumber1, setPlateNumber1] = useState("");
  const [plate1ReturnDate, setPlate1ReturnDate] = useState("");
  const [returnedPlate2, setReturnedPlate2] = useState(false);
  const [plateNumber2, setPlateNumber2] = useState("");
  const [plate2ReturnDate, setPlate2ReturnDate] = useState("");
  const [rehire, setRehire] = useState(false);
  const [rehireReason, setRehireReason] = useState("");
  const [alreadyRehire, setAlreadyRehire] = useState(false);
  const [alreadyTerminated, setAlreadyTerminated] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [deleasecodeLoading, setDeleasecodeLoading] = useState(false);
  const [isPlate1DateFormat, setIsPlate1DateFormat] = useState(true);
  const [isPlate2DateFormat, setIsPlate2DateFormat] = useState(true);
  const [isTerminationDateFormat, setIsTerminationDateFormat] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (driverData !== null && !id) {
      setHireDate(driverData.rehiredDate != null ? driverData.rehiredDate : driverData.hireDate);
      setMotorized(driverData.motorized);
      setTowable(driverData.towable);
      setFlatbed(driverData.flatbed);
      setBondFundAmount(driverData.accumulatedBond);
      setReserveFundAmount(driverData.accumulatedReserve);
      setPlateNumber1(driverData?.plateNumber1?.trim());
      setPlateNumber2(driverData?.plateNumber2?.trim());
    }
  }, [driverData, id]);

  /******
   * Used to set the why field based on the program from the delease is called
   * whether it is from driver delease request
   * or driver delease
   * *****/
  useEffect(() => {
    if (isDeleaseProcess || isDeleaseCompliance) {
      setWhy("requested");
    } else {
      setWhy("safety");
    }
  }, [isDeleaseProcess, isDeleaseCompliance]);
  /****
   * Set the status field to terminated if the
   * program is called from Driver Delease Request Program
   ****/
  useEffect(() => {
    if (isDeleaseProcess || isDeleaseCompliance) {
      dispatch(setStatus("terminated"));
    } else {
      dispatch(setStatus("inactive"));
    }
  }, [isDeleaseProcess, isDeleaseCompliance]);

  /******Navigate to Driver Delease Request on Page
   *  refresh action if it is called
   *  from the Driver Delease Request Program
   * *****/
  useEffect(() => {
    const currentUrl = `/driver-delease/add/${driverId}/${deleaserequestPK}`;
    if (!isDeleaseProcess && !isFromDriverDelease && location.pathname === currentUrl) {
      navigate(`/driver-delease-requests/${driverId}/${deleaserequestPK}`);
    }
  }, [isDeleaseProcess, isFromDriverDelease, location.pathname, driverId, deleaserequestPK]);

  /*******Get the Details of The Driver Delease Record Selected******/
  useEffect(() => {
    if (id) {
      dispatch(setIsDriverDeleaseLoading(true));
      setLoader(true);
      DriverDeleaseService.getDriverDeleaseById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setViewDetail(true));
          setLoader(false);
          setTimeout(() => {
            dispatch(setIsDriverDeleaseLoading(false));
          }, 100);
        })
        .catch((err) => {
          dispatch(setIsDriverDeleaseLoading(false));
          setLoader(false);
          navigate(`/driver-delease/${driverId}`);
        });
    }
  }, [id]);

  /*******Get the Details of selected Driver*****/
  useEffect(() => {
    if (driverId) {
      setLoading(true);
      DriverServicesService.getDriverDetails(driverId)
        .then((response) => {
          const { data } = response;
          dispatch(setDriverData(data));
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [driverId]);

  useEffect(() => {
    if (editFormData === null) {
      setTerminationDate("");
      setTerminationReason("");
      setHireDate("");
      setMotorized(false);
      setFlatbed(false);
      setTowable(false);
      setInactive(false);
      setTerminated(false);
      setVoluntary(false);
      setAutomatic(false);
      setSafety(false);
      setRequested(false);
      setBondFundAmount("");
      setBondRefundDate("");
      setReserveFundAmount("");
      setReserveRefundDate("");
      setNotes("");
      setReturnedPlate1(false);
      setPlateNumber1("");
      setPlate1ReturnDate("");
      setReturnedPlate2(false);
      setPlateNumber2("");
      setPlate2ReturnDate("");
      setRehire(false);
      setRehireReason("");
    }
  }, [editFormData]);
  useEffect(() => {
    if (editFormData !== null && id !== null) {
      setTerminationDate(editFormData.terminationDate ? editFormData.terminationDate : "");
      setTerminationReason(editFormData.terminationReason ? editFormData.terminationReason : "");
      setHireDate(editFormData.hireDate ? editFormData.hireDate : "");
      setMotorized(editFormData.motorized ? editFormData.motorized : false);
      setFlatbed(editFormData.flatbed ? editFormData.flatbed : false);
      setTowable(editFormData.towable ? editFormData.towable : false);
      setDeleaseCodeFK(editFormData.deleaseCodeFK ? editFormData.deleaseCodeFK : "");
      setDeleaseCodeValue(editFormData?.deleaseCodeFK);
      setVoluntary(editFormData.voluntary ? editFormData.voluntary : false);
      setAutomatic(editFormData.automatic ? editFormData.automatic : false);
      setSafety(editFormData.safety ? editFormData.safety : false);
      setRequested(editFormData.requested ? editFormData.requested : false);
      setBondFundAmount(editFormData.bondFundAmount ? editFormData.bondFundAmount : "");
      setBondRefundDate(editFormData.bondRefundDate ? editFormData.bondRefundDate : "");
      setReserveFundAmount(editFormData.reserveFundAmount ? editFormData.reserveFundAmount : "");
      setReserveRefundDate(editFormData.reserveRefundDate ? editFormData.reserveRefundDate : "");
      setNotes(editFormData.notes ? editFormData.notes : "");
      setReturnedPlate1(editFormData.returnedPlate1 ? editFormData.returnedPlate1 : false);
      setPlateNumber1(editFormData.plateNumber1 ? editFormData.plateNumber1 : "");
      setPlate1ReturnDate(editFormData.plate1ReturnDate ? editFormData.plate1ReturnDate : "");
      setReturnedPlate2(editFormData.returnedPlate2 ? editFormData.returnedPlate2 : false);
      setPlateNumber2(editFormData.plateNumber2 ? editFormData.plateNumber2 : "");
      setPlate2ReturnDate(editFormData.plate2ReturnDate ? editFormData.plate2ReturnDate : "");
      setRehire(editFormData.rehire ? editFormData.rehire : false);
      setRehireReason(editFormData.rehireReason ? editFormData.rehireReason : "");
      setAlreadyRehire(editFormData.completed ? editFormData.completed : false);
      setAlreadyTerminated(editFormData.terminated ? editFormData.terminated : false);
      setCompleted(editFormData.completed ? editFormData.completed : false);
      dispatch(setStatus(editFormData.inactive ? "inactive" : "terminated"));
    }
  }, [editFormData, id, changesCancelled]);

  useEffect(() => {
    if (id) {
      if (voluntary) {
        setWhy("voluntary");
      } else if (automatic) {
        setWhy("automatic");
      } else if (safety) {
        setWhy("safety");
      } else if (requested) {
        setWhy("requested");
      }
    }
  }, [id, voluntary, automatic, safety, requested]);

  useEffect(() => {
    if (why === "voluntary") {
      setVoluntary(true);
      setAutomatic(false);
      setSafety(false);
      setRequested(false);
    } else if (why === "automatic") {
      setAutomatic(true);
      setVoluntary(false);
      setSafety(false);
      setRequested(false);
    } else if (why === "safety") {
      setSafety(true);
      setAutomatic(false);
      setVoluntary(false);
      setRequested(false);
    } else if (why === "requested") {
      setRequested(true);
      setSafety(false);
      setAutomatic(false);
      setVoluntary(false);
    }
  }, [why]);
  /****Delease Code for Auto Complete */
  const fetchDeleaseCode = (string) => {
    setDeleasecodeLoading(true);
    DeleaseCodeService.getDeleaseCodeForAuto(string)
      .then((response) => {
        const data = response.data;
        const deleaseCodeList = data?.content?.map((code) => ({
          ...code,
          description: code?.description?.trim(),
        }));
        setDeleaseCodeData(deleaseCodeList);
        setDeleasecodeLoading(false);
      })
      .catch((err) => {
        setDeleasecodeLoading(false);
      });
  };
  /****Set the Input value for Delease */
  const setDeleaseCodeValue = (deleaseCodeFK) => {
    if (deleaseCodeFK !== null) {
      DeleaseCodeService.getDeleaseCodesById(deleaseCodeFK)
        .then((response) => {
          const data = response.data;
          setDeleaseCodeInput(data.description);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setDeleaseCodeInput("");
    }
  };
  const hideDeleaseCodeModal = () => {
    setDeleaseCodeSelection(false);
  };
  const handleDeleaseCodeLookupModalShow = () => {
    setDeleaseCodeSelection(true);
  };
  /******Look Up Selection*****/
  const handleDeleaseCodeLookupSelection = (data) => {
    setDeleaseCodeInput(data.description);
    setDeleaseCodeFK(data.deleaseCodePK);
    setDeleaseCodeSelection(false);
  };
  useEffect(() => {}, [deleaseCodeFK]);

  /****General Tab Form Data Setting for Save */
  const generalTabFormData = () => {
    dispatch(
      setDriverDeleaseData({
        driverDeleasePK: id,
        driverFK: driverId,
        terminationDate: terminationDate,
        terminationReason: terminationReason,
        deleaseCodeFK: deleaseCodeFK,
        hireDate: hireDate,
        motorized: motorized,
        towable: towable,
        flatbed: flatbed,
        inactive: status ? status === "inactive" : false,
        terminated: status ? status === "terminated" : false,
        voluntary: voluntary,
        automatic: automatic,
        safety: safety,
        requested: requested,
        bondFundAmount: bondFundAmount,
        bondRefundDate: bondRefundDate,
        reserveFundAmount: reserveFundAmount,
        reserveRefundDate: reserveRefundDate,
        plateNumber1: plateNumber1,
        returnedPlate1: returnedPlate1,
        plate1ReturnDate: plate1ReturnDate,
        plateNumber2: plateNumber2,
        returnedPlate2: returnedPlate2,
        plate2ReturnDate: plate2ReturnDate,
        rehire: rehire,
        rehireReason: rehireReason,
        notes: notes,
        addUserFK: id ? editFormData?.addUserFK : userData?.userPK,
        isSettingDeleaseRequestProcessed: isSettingDeleaseRequestProcessed,
      })
    );
  };

  /*****Save Object Data */
  useEffect(() => {
    generalTabFormData();
  }, [
    id,
    driverId,
    terminationDate,
    terminationReason,
    deleaseCodeFK,
    inactive,
    hireDate,
    motorized,
    towable,
    flatbed,
    inactive,
    terminated,
    voluntary,
    automatic,
    safety,
    requested,
    bondFundAmount,
    bondRefundDate,
    reserveFundAmount,
    reserveRefundDate,
    plateNumber1,
    returnedPlate1,
    plate1ReturnDate,
    plateNumber2,
    returnedPlate2,
    plate2ReturnDate,
    rehire,
    rehireReason,
    notes,
    status,
    userData,
    editFormData,
    isSettingDeleaseRequestProcessed,
  ]);
  /****General  Tab Validation *****/
  useEffect(() => {
    if (
      terminationDate &&
      isTerminationDateFormat &&
      terminationReason &&
      deleaseCodeFK &&
      deleaseCodeInput &&
      ((plateNumber1 && returnedPlate1 && plate1ReturnDate && isPlate1DateFormat) ||
        (!plateNumber1 && !returnedPlate1 && !plate1ReturnDate) ||
        (plateNumber1 && !returnedPlate1 && !plate1ReturnDate)) &&
      ((plateNumber2 && returnedPlate2 && plate2ReturnDate && isPlate2DateFormat) ||
        (!plateNumber2 && !returnedPlate2 && !plate2ReturnDate) ||
        (plateNumber2 && !returnedPlate2 && !plate2ReturnDate)) &&
      ((rehire && rehireReason) || (!rehire && !rehireReason))
    ) {
      dispatch(setIsGeneralTabValid(true));
    } else {
      dispatch(setIsGeneralTabValid(false));
    }
  }, [
    terminationDate,
    terminationReason,
    deleaseCodeFK,
    deleaseCodeInput,
    plateNumber1,
    plate1ReturnDate,
    plateNumber2,
    plate2ReturnDate,
    returnedPlate1,
    returnedPlate2,
    rehire,
    rehireReason,
    isPlate1DateFormat,
    isPlate2DateFormat,
    isTerminationDateFormat,
  ]);
  /******
   * Clear the Plate1 Return Date field if returnedPlate1 unchecked
   * *****/
  useEffect(() => {
    if (!returnedPlate1) {
      setPlate1ReturnDate("");
    }
  }, [returnedPlate1]);
  /******
   * Clear the Plate2 Return Date field if returnedPlate2 unchecked
   * *****/
  useEffect(() => {
    if (!returnedPlate2) {
      setPlate2ReturnDate("");
    }
  }, [returnedPlate2]);
  /******
   * Clear the rehire reason field if rehire is false
   * ******/
  useEffect(() => {
    if (!rehire) {
      setRehireReason("");
    }
  }, [rehire]);
  useEffect(() => {
    if (!id) {
      setTerminationDate(formatDatetimeToDate(new Date()));
    }
  }, [id]);

  const isReturnDateDisabled =
    viewDetail ||
    !plateNumber1 ||
    !returnedPlate1 ||
    (id && status === "inactive" && completed) ||
    isStatusChangingFromInactiveToTerminated;

  return (
    <div className="p-15 w-100">
      {loading && <LoadingIcon />}

      <Row className="m-0 p-0 ">
        <Col sm={7} md={7} lg={7} xl={7} xs={7}>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={terminationDate}
                name="terminationDate"
                setIsDateValid={setIsTerminationDateFormat}
                className={`customFormControl ${
                  viewDetail === true ||
                  isDriverDeleaseLoading ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                    ? ""
                    : terminationDate !== "" && isTerminationDateFormat
                      ? "borderGreen"
                      : "borderRed"
                }`}
                setDate={setTerminationDate}
                disabled={
                  viewDetail ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Reason</Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className="p-0">
              <Input
                type="text"
                className={`customFormControl ${
                  viewDetail === true ||
                  isDriverDeleaseLoading ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                    ? ""
                    : terminationReason !== ""
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="terminationReason"
                name="terminationReason"
                value={terminationReason}
                maxLength={40}
                disabled={
                  viewDetail ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }

                onChange={(e) => {
                  setTerminationReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Delease Code
              </Form.Label>
            </Col>

            <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                className={`customFormControl ${
                  viewDetail === true ||
                  (id && status === "inactive" && completed) ||
                  isDriverDeleaseLoading ||
                  isStatusChangingFromInactiveToTerminated
                    ? ""
                    : deleaseCodeFK
                      ? "borderGreen"
                      : "borderRed"
                }`}
                arrayList={deleaseCodeData}
                searchString={deleaseCodeInput}
                renderItemId={(code) => code.deleaseCodePK}
                renderItemField={(code) => code.description}
                handleSearchString={(string) => setDeleaseCodeInput(string)}
                fetchDataBySearchString={fetchDeleaseCode}
                onSelect={handleDeleaseCodeLookupSelection}
                loading={deleasecodeLoading}
                disabled={
                  viewDetail ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
                selectedId={deleaseCodeFK}
                clearInputCallback={() => {
                  setDeleaseCodeFK(null);
                }}
              />
              <LookupButton
                onClick={handleDeleaseCodeLookupModalShow}
                disabled={
                  viewDetail ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Hire Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={hireDate}
                name="hireDate"
                className="customFormControl"
                setDate={setHireDate}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <div className="p-0" style={{ width: "113px" }}>
              <Form.Label className=" col-form-label dealer-label">Division</Form.Label>
            </div>
            <Col className="p-0 d-flex ">
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className=" me-2 p-0 "
                  id="motorized"
                  name="motorized"
                  checked={motorized}
                  disabled
                  onChange={(e) => {
                    setMotorized(e.target.checked);
                  }}
                />
                <label htmlFor="" className="ms-0">
                  {" "}
                  Motorized
                </label>
              </div>
              <div className="ms-4 d-flex align-items-center">
                <input
                  type="checkbox"
                  className=" me-2 p-0 "
                  id="towable"
                  name="towable"
                  checked={towable}
                  disabled
                  onChange={(e) => {
                    setTowable(e.target.checked);
                  }}
                />
                <label htmlFor="" className="ms-0">
                  {" "}
                  Towable
                </label>
              </div>
              <div className="ms-4 d-flex align-items-center">
                <input
                  type="checkbox"
                  className=" me-2 p-0 "
                  id="flatbed"
                  name="flatbed"
                  checked={flatbed}
                  disabled
                  onChange={(e) => {
                    setFlatbed(e.target.checked);
                  }}
                />
                <label htmlFor="" className="ms-0">
                  {" "}
                  Flatbed
                </label>
              </div>
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Label className="col-form-label me-3  w-50px"> Status</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <CustomRadioGroup
                horizontal
                name="status"
                selectedOption={status}
                options={[
                  { value: "inactive", label: "Inactive" },
                  { value: "terminated", label: "Terminated" },
                ]}
                onChange={(value) => {
                  dispatch(setStatus(value));
                }}
                disabled={viewDetail || alreadyTerminated}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={2} md={2} sm={2} className="p-0">
              <Form.Label className="col-form-label me-3  w-50px"> Why</Form.Label>
            </Col>
            <Col xs={5} className="p-0">
              <CustomRadioGroup
                horizontal
                selectedOption={why}
                name="why"
                options={[
                  { value: "voluntary", label: "Voluntary", disabled: isDeleaseProcess },
                  { value: "automatic", label: "Automatic", disabled: true },
                  { value: "safety", label: "Safety", disabled: isDeleaseProcess },
                  { value: "requested", label: "Requested", disabled: true },
                ]}
                onChange={(value) => {
                  setWhy(value);
                }}
                disabled={
                  viewDetail ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Bond Amount</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <Input
                className={`customFormControl`}
                type="text"
                name="bondFundAmount"
                value={bondFundAmount}

                maxLength={7}
                disabled
                onChange={(e) => {
                  setBondFundAmount(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Bond Refund Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={bondRefundDate}
                name="bondRefundDate"
                className="customFormControl"
                setDate={setBondRefundDate}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Reserves Amount</Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-75px">
              <Input
                className={`customFormControl`}
                type="text"
                name="reserveFundAmount"
                value={reserveFundAmount}

                maxLength={5}
                disabled
                onChange={(e) => {
                  setReserveFundAmount(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="col-form-label dealer-label">Reserve Refund Date</Form.Label>
            </Col>

            <Col xs={2} md={2} lg={2} sm={2} className="p-0">
              <DateInputField
                date={reserveRefundDate}
                name="reserveRefundDate"
                className="customFormControl"
                setDate={setReserveRefundDate}
                disabled
              />
            </Col>
          </Form.Group>
        </Col>
        <Col sm={5} xs={5} md={5}>
          {/* Plate#1 */}
          <Form.Group
            className="mt-4 form-group align-items-center row m-l-0 m-r-0"
            style={{ marginTop: "20px" }}
          >
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label" style={{ marginTop: "20px" }}>
                Plate #1
              </Form.Label>
            </Col>
            <Col xs={1} md={1} sm={1} className="p-0 w-120px" style={{ marginTop: "20px" }}>
              <Input
                className={`customFormControl`}
                type="text"
                name="plateNumber1"
                value={plateNumber1}

                maxLength={10}
                disabled
                onChange={(e) => {
                  setPlateNumber1(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                }}
              />
            </Col>
          </Form.Group>
          {/*Returned Plate#1 */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Returned Plate#1</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="returnedPlate1"
                value={returnedPlate1}
                checked={returnedPlate1}
                disabled={
                  viewDetail ||
                  plateNumber1 === null ||
                  plateNumber1 === "" ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
                onChange={(e) => {
                  setReturnedPlate1(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          {/* Plate#1 Return Date */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plate#1 Return Date</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <DateInputField
                date={plate1ReturnDate}
                name="plate1ReturnDate"
                max={new Date()}
                setIsDateValid={setIsPlate1DateFormat}
                className={`customFormControl ${
                  isReturnDateDisabled
                    ? ""
                    : plate1ReturnDate !== "" && isPlate1DateFormat
                      ? "borderGreen"
                      : "borderRed"
                }`}
                setDate={setPlate1ReturnDate}
                disabled={isReturnDateDisabled}
              />
            </Col>
          </Form.Group>
          {/* Plate#2 */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plate#2</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <Input
                className={`customFormControl`}
                type="text"
                name="plateNumber2"
                value={plateNumber2}

                maxLength={10}
                disabled
              />
            </Col>
          </Form.Group>
          {/*Returned Plate#2 */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Returned Plate#2</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="returnedPlate2"
                value={returnedPlate2}
                checked={returnedPlate2}
                disabled={
                  viewDetail ||
                  !plateNumber2 ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
                onChange={(e) => {
                  setReturnedPlate2(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          {/* Plate#2 Return Date */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Plate#2 Return Date</Form.Label>
            </Col>

            <Col xs={3} md={3} sm={3} className="p-0">
              <DateInputField
                date={plate2ReturnDate}
                name="plate2ReturnDate"
                max={new Date()}
                setIsDateValid={setIsPlate2DateFormat}
                className={`customFormControl ${
                  viewDetail === true ||
                  (id && inactive && completed) ||
                  isDriverDeleaseLoading ||
                  !plateNumber2 ||
                  !returnedPlate2 ||
                  isStatusChangingFromInactiveToTerminated
                    ? ""
                    : plate2ReturnDate !== "" && isPlate2DateFormat
                      ? "borderGreen"
                      : "borderRed"
                }`}
                setDate={setPlate2ReturnDate}
                disabled={
                  viewDetail ||
                  !plateNumber2 ||
                  !returnedPlate2 ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
              />
            </Col>
          </Form.Group>
          {/*Rehire*/}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Rehire</Form.Label>
            </Col>
            <Col xs={3} md={3} sm={3} className="p-0">
              <input
                type="checkbox"
                className={`form-check-input p-0 $`}
                name="rehire"
                value={rehire}
                checked={rehire}
                disabled={
                  viewDetail ||
                  alreadyRehire ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
                onChange={(e) => {
                  setRehire(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
          {/* Rehire Notes */}
          <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} className="p-0">
              <Form.Label className="col-form-label dealer-label">Rehire Comments</Form.Label>
            </Col>

            <Col xs={8} md={8} className="p-0 me-2">
              <textarea
                rows={6}
                cols={10}
                type="text"
                className={`customFormControl h-100 customFocusClass ${
                  viewDetail === true ||
                  !rehire ||
                  alreadyRehire ||
                  (id && inactive && completed) ||
                  isStatusChangingFromInactiveToTerminated
                    ? ""
                    : rehire && rehireReason !== ""
                      ? "borderGreen"
                      : "borderRed"
                } `}
                id="rehireReason"
                name="rehireReason"
                value={rehireReason}
                disabled={
                  viewDetail ||
                  !rehire ||
                  alreadyRehire ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
                onChange={(e) => {
                  setRehireReason(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                }}
                autoComplete="newpassword"
                aria-autocomplete="none"
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={12} className="ps-3">
          {/* Notes */}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={1} sm={1} className="p-0">
              <Form.Label className="col-form-label dealer-label">Notes</Form.Label>
            </Col>

            <Col xs={9} md={9} className="p-0 me-2" style={{ marginLeft: "10px" }}>
              <textarea
                rows={5}
                cols={10}
                type="text"
                className={`customFormControl h-100 w-100 customFocusClass `}
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                }}
                disabled={
                  viewDetail ||
                  (id && status === "inactive" && completed) ||
                  isStatusChangingFromInactiveToTerminated
                }
                autoComplete="newpassword"
                aria-autocomplete="none"
              />
            </Col>
          </Form.Group>
        </Col>
        <DeleaseCodeLookup
          show={deleaseCodeSelection}
          onHide={hideDeleaseCodeModal}
          renderItemId={(data) => data.deleaseCodePK}
          renderItemField={(data) => data.deleaseCode}
          handleLookupSelection={handleDeleaseCodeLookupSelection}
          MaintenanceProgram
        />
      </Row>
    </div>
  );
};

export default GeneralTab;
