import { parseLocalDate } from "../../../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateInputField from "../../../../../../common/DateInputField";
import formatDatetimeToDate from "../../../../../../../utils/formatDateTimeToDate";
import {
  setPickedUpReduxValue,
  setPickUpDateReduxValue,
  setPickUpYardExitReduxValue,
  setDeliveredReduxValue,
  setDeliveryYardEntranceReduxValue,
  setEditedUnitDispatchDataToSaveForDispatchesTab,
  setIsDatesTabColumn2Valid,
} from "../../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";
import DriverService from "../../../../../../../services/DriverService";
import YardService from "../../../../../../../services/YardService";

const DatesTabColumn2 = () => {
  const dispatch = useDispatch();
  //Local State
  const [pickedUp, setPickedUp] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [userData, setUserData] = useState(null);
  const [isPickupDateValid, setIsPickupDateValid] = useState(true);
  const [pickupUser, setPickupUser] = useState("");
  const [pickupUserID, setPickupUserID] = useState("");
  const [pickupYardExit, setPickupYardExit] = useState(false);
  const [pickupYardExitDate, setPickupYardExitDate] = useState("");
  const [isPickupYardExitDateValid, setIsPickupYardExitDateValid] = useState(true);
  const [pickupYardExitUser, setPickupYardExitUser] = useState("");
  const [pickupYardExitUserID, setPickupYardExitUserID] = useState("");
  const [pickupYardExitGateCode, setPickupYardExitGateCode] = useState("");
  const [pickupYardExitNewGateCode, setPickupYardExitNewGateCode] = useState(false);
  const [pickupYardOpner, setPickupYardOpner] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isDeliveryDateValid, setIsDeliveryDateValid] = useState(true);
  const [deliveryUser, setDeliveryUser] = useState("");
  const [deliveryUserID, setDeliveryUserID] = useState("");
  const [deliveryYardEntrance, setDeliveryYardEntrance] = useState(false);
  const [deliveryYardEntranceDate, setDeliveryYardEntranceDate] = useState("");
  const [isDeliveryYardEntranceDateValid, setIsDeliveryYardEntranceDateValid] = useState(true);
  const [deliveryYardEntranceUser, setDeliveryYardEntranceUser] = useState("");
  const [deliveryYardEntranceUserID, setDeliveryYardEntranceUserID] = useState("");
  const [deliveryYardEntranceGateCode, setDeliveryYardEntranceGateCode] = useState("");
  const [deliveryYardEntranceNewGateCode, setDeliveryYardNewEntranceGateCode] = useState(false);
  const [deliveyYardOpner, setDeliveryYardOpner] = useState(false);
  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  // used to check the value that indiciates the existing value from backend
  const [originalPickedUp, setOriginalPickedUp] = useState(false);
  const [originalPickupYardExit, setOriginalPickupYardExit] = useState(false);
  const [originalDelivered, setOriginalDelivered] = useState(false);
  const [originalDeliveryYardEntrance, setOriginalDeliveryYardEntrance] = useState(false);
  // Saved as picked up / yard exit AND delivered / yard entrance, and now both delivery boxes are unchecked:
  // the dispatch is reopened, so pickup fields become editable again even though checkUnitDispatched is false.
  // Covers both the normal and the yard flow (Picked Up/Delivered and Pickup Yard Exit/Delivery Yard Entrance). Bug 4320.
  const isReopenedDispatch =
    (originalPickedUp || originalPickupYardExit) &&
    (originalDelivered || originalDeliveryYardEntrance) &&
    !delivered &&
    !deliveryYardEntrance;

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setOriginalPickedUp(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickedUp || false);
      setPickedUp(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickedUp || false);
      dispatch(
        setPickedUpReduxValue(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickedUp || false)
      );
      setPickupDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupDate || "");
      dispatch(
        setPickUpDateReduxValue(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupDate || false
        )
      );
      setPickupUser(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickedUpUserName || "");
      setPickupYardExit(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExit || false);
      dispatch(
        setPickUpYardExitReduxValue(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExit || false
        )
      );
      setOriginalPickupYardExit(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExit || false
      );
      setPickupYardExitDate(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExitDate || ""
      );
      setPickupYardExitUser(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExitUserName || ""
      );
      setPickupYardExitGateCode(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExitCode?.trim() || ""
      );
      setDelivered(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered || false);
      dispatch(
        setDeliveredReduxValue(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered || false)
      );
      setOriginalDelivered(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered || false);
      setDeliveryDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveredDate || "");
      setDeliveryUser(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveredUserName || "");
      setDeliveryYardEntrance(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntrance || false
      );
      dispatch(
        setDeliveryYardEntranceReduxValue(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntrance || false
        )
      );
      setOriginalDeliveryYardEntrance(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntrance || false
      );
      setDeliveryYardEntranceDate(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntranceDate || ""
      );
      setDeliveryYardEntranceUser(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntranceUserName || ""
      );
      setDeliveryYardEntranceGateCode(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntranceCode?.trim() || ""
      );

      setPickupYardExitUserID(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExitUserFK || ""
      );

      setDeliveryYardEntranceUserID(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntranceUserFK || ""
      );

      setPickupUserID(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickedUpUserFK || "");

      setDeliveryUserID(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveredUserFK || "");
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);
  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    const normalizeDate = (date) => date || null;
    const originalPickupDate = selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupDate;
    const originalPickupYardExitDate =
      selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardExitDate;
    const originalDeliveredDate = selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveredDate;
    const originalDeliveryYardEntranceDate =
      selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardEntranceDate;

    const pickedUpChanged =
      originalPickedUp !== pickedUp || normalizeDate(originalPickupDate) !== normalizeDate(pickupDate);

    const pickupYardExitChanged =
      originalPickupYardExit !== pickupYardExit ||
      normalizeDate(originalPickupYardExitDate) !== normalizeDate(pickupYardExitDate);

    const deliveredChanged =
      originalDelivered !== delivered || normalizeDate(originalDeliveredDate) !== normalizeDate(deliveryDate);

    const deliveryYardEntranceChanged =
      originalDeliveryYardEntrance !== deliveryYardEntrance ||
      normalizeDate(originalDeliveryYardEntranceDate) !== normalizeDate(deliveryYardEntranceDate);

    dispatch(
      setEditedUnitDispatchDataToSaveForDispatchesTab({
        pickedUp: pickedUp,
        pickupDate: pickupDate,
        pickedUpChanged: pickedUpChanged,
        pickupYardExit: pickupYardExit,
        pickupYardExitDate: pickupYardExitDate,
        pickupYardExitChanged: pickupYardExitChanged,
        pickupYardExitCode: pickupYardExitGateCode,
        pickupYardExitNewGateCode: pickupYardExitNewGateCode,
        delivered: delivered,
        deliveredChanged: deliveredChanged,
        deliveredDate: deliveryDate,
        deliveryYardEntrance: deliveryYardEntrance,
        deliveryYardEntranceChanged: deliveryYardEntranceChanged,
        deliveryYardEntranceDate: deliveryYardEntranceDate,
        deliveryYardEntranceCode: deliveryYardEntranceGateCode,
        deliveryYardEntranceNewGateCode: deliveryYardEntranceNewGateCode,
        pickupUserFK: pickupUserID,
        pickupYardExitUserFK: pickupYardExitUserID,
        deliveredUserFK: deliveryUserID,
        deliveryYardEntranceUserFK: deliveryYardEntranceUserID,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pickedUp,
    pickupDate,
    pickupYardExit,
    pickupYardExitDate,
    pickupYardExitGateCode,
    pickupYardExitNewGateCode,
    delivered,
    deliveryDate,
    deliveryYardEntrance,
    deliveryYardEntranceDate,
    deliveryYardEntranceGateCode,
    deliveryYardEntranceNewGateCode,
    pickupUserID,
    pickupYardExitUserID,
    deliveryUserID,
    deliveryYardEntranceUserID,
  ]);

  //DatesTab Column2 validation
  useEffect(() => {
    if (
      (!pickedUp || (pickedUp && pickupDate && isPickupDateValid)) &&
      (!pickupYardExit || (pickupYardExit && pickupYardExitDate && isPickupYardExitDateValid)) &&
      (!delivered || (delivered && deliveryDate && isDeliveryDateValid)) &&
      (!deliveryYardEntrance ||
        (deliveryYardEntrance && deliveryYardEntranceDate && isDeliveryYardEntranceDateValid))
    ) {
      dispatch(setIsDatesTabColumn2Valid(true));
    } else {
      dispatch(setIsDatesTabColumn2Valid(false));
    }
  }, [
    pickedUp,
    pickupDate,
    pickupYardExit,
    pickupYardExitDate,
    delivered,
    deliveryDate,
    deliveryYardEntrance,
    deliveryYardEntranceDate,
    isPickupYardExitDateValid,
    isPickupDateValid,
    isDeliveryDateValid,
    isDeliveryYardEntranceDateValid,
  ]);
  /*Fetch the user data to display the current user Name **/
  const fetchCurrentLoginUser = () => {
    DriverService.getCurrentLoginUser().then(({ data }) => {
      setUserData(data);
    });
  };

  useEffect(() => {
    fetchCurrentLoginUser();
  }, []);

  useEffect(() => {
    if (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK) {
      YardService.getYardById(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK)
        .then((response) => {
          const data = response.data;
          setPickupYardOpner(data.hasOpener);
        })
        .catch((error) => {
          console.error("Error fetching yard details:", error);
        });
    }
  }, [selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK]);
  useEffect(() => {
    if (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK) {
      YardService.getYardById(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK)
        .then((response) => {
          const data = response.data;
          setDeliveryYardOpner(data.hasOpener);
        })
        .catch((error) => {
          console.error("Error fetching yard details:", error);
        });
    }
  }, [selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK]);

  return (
    <Col xs={6}>
      {/* Picked Up */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Picked Up</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={
              viewDetail ||
              delivered ||
              deliveryYardEntrance ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK !== null ||
              (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched &&
                !isReopenedDispatch)
            }
            value={pickedUp}
            checked={pickedUp}
            onChange={(e) => {
              setPickedUp(e.target.checked);
              dispatch(setPickedUpReduxValue(e.target.checked));
              if (!e.target.checked) {
                setPickupDate("");
                setPickupUser("");
                setPickupUserID("");
              } else {
                setPickupDate(new Date());
                setPickupUser(userData.name?.trim());
                setPickupUserID(userData.userPK);
              }
            }}
          />
        </Col>
      </Form.Group>

      {/* Pickup Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Pickup Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={pickupDate}
            setDate={setPickupDate}
            disabled={
              viewDetail ||
              delivered ||
              deliveryYardEntrance ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK !== null ||
              (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched &&
                !isReopenedDispatch) ||
              !pickedUp
            }
            min={
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate
                ? parseLocalDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate)
                : new Date()
            }
            max={new Date()}
            setIsDateValid={setIsPickupDateValid}
            className={`customFormControl ${
              isUnitDataLoading ||
              viewDetail ||
              delivered ||
              deliveryYardEntrance ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK !== null ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
              !pickedUp
                ? ""
                : isPickupDateValid && pickedUp && pickupDate
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* User */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>User</Form.Label>
        </Col>
        <Col xs={5} md={5} sm={5} className="p-0">
          <input className={`customFormControl`} type="text" value={pickupUser} disabled />
        </Col>
      </Form.Group>

      <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0">
          <input className={`customFormControl`} type="date" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>

      {/* Pickup Yard Exit */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Pickup Yard Exit</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={
              viewDetail ||
              delivered ||
              deliveryYardEntrance ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK === null ||
              (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched &&
                !isReopenedDispatch)
            }
            value={pickupYardExit}
            checked={pickupYardExit}
            onChange={(e) => {
              setPickupYardExit(e.target.checked);
              dispatch(setPickUpYardExitReduxValue(e.target.checked));
              if (!e.target.checked) {
                setPickupYardExitDate("");
                setPickupYardExitUser("");
                setPickupYardExitGateCode("");
                setPickupYardExitUserID("");
              } else {
                setPickupYardExitGateCode("");
                setPickupYardExitDate(new Date());
                setPickupYardExitUser(userData.name?.trim());
                setPickupYardExitUserID(userData.userPK);
                setPickupYardExitNewGateCode(false);
              }
            }}
          />
        </Col>
      </Form.Group>

      {/* Yard Exit Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Yard Exit Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={pickupYardExitDate}
            setDate={setPickupYardExitDate}
            disabled={
              viewDetail ||
              delivered ||
              deliveryYardEntrance ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK === null ||
              (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched &&
                !isReopenedDispatch) ||
              !pickupYardExit
            }
            min={
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate
                ? parseLocalDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate)
                : new Date()
            }
            max={new Date()}
            setIsDateValid={setIsPickupYardExitDateValid}
            className={`customFormControl ${
              isUnitDataLoading ||
              viewDetail ||
              delivered ||
              deliveryYardEntrance ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupYardFK === null ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
              !pickupYardExit
                ? ""
                : isPickupYardExitDateValid && pickupYardExit && pickupYardExitDate
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* User */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>User</Form.Label>
        </Col>
        <Col xs={5} md={5} sm={5} className="p-0">
          <input className={`customFormControl`} type="text" value={pickupYardExitUser} disabled />
        </Col>
      </Form.Group>

      {/* Yard Gate Code */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Yard Gate Code</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 me-3">
          <input className={`customFormControl`} type="text" value={pickupYardExitGateCode} disabled />
        </Col>
        <div className="p-0 d-flex align-items-center w-30px h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={
              viewDetail ||
              delivered ||
              deliveryYardEntrance ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              !pickupYardOpner ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
              pickupYardExit
            }
            value={pickupYardExitNewGateCode}
            checked={pickupYardExitNewGateCode}
            onChange={(e) => {
              setPickupYardExitNewGateCode(e.target.checked);
            }}
          />
        </div>
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className={` customColFormLabel`}>New Code</Form.Label>
        </Col>
      </Form.Group>

      <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0">
          <input className={`customFormControl`} type="date" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>

      {/* Delivered */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Delivered</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK !== null ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkDeliveredButtonEnabled ||
              (!pickedUp && !pickupYardExit)
            }
            value={delivered}
            checked={delivered}
            onChange={(e) => {
              setDelivered(e.target.checked);
              dispatch(setDeliveredReduxValue(e.target.checked));
              if (!e.target.checked) {
                setDeliveryDate("");
                setDeliveryUser("");
                setDeliveryUserID("");
              } else {
                setDeliveryDate(new Date());
                setDeliveryUser(userData.name?.trim());
                setDeliveryUserID(userData.userPK);
              }
            }}
          />
        </Col>
      </Form.Group>

      {/* Delivery Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Delivery Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={deliveryDate}
            setDate={setDeliveryDate}
            disabled={
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK !== null ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkDeliveredButtonEnabled ||
              !delivered
            }
            min={
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate
                ? parseLocalDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate)
                : new Date()
            }
            setIsDateValid={setIsDeliveryDateValid}
            className={`customFormControl ${
              isUnitDataLoading ||
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK !== null ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkDeliveredButtonEnabled ||
              !delivered
                ? ""
                : isDeliveryDateValid && delivered && deliveryDate
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* User */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>User</Form.Label>
        </Col>
        <Col xs={5} md={5} sm={5} className="p-0">
          <input className={`customFormControl`} type="text" value={deliveryUser} disabled />
        </Col>
      </Form.Group>

      <Form.Group className="mt-2 align-items-center row invisible  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0">
          <input className={`customFormControl`} type="date" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>

      {/* Delivery Yard Entrance */}
      <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Delivery Yard Entrance</Form.Label>
        </Col>
        <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK === null ||
              (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched && !originalDeliveryYardEntrance) ||
              (!pickedUp && !pickupYardExit)
            }
            value={deliveryYardEntrance}
            checked={deliveryYardEntrance}
            onChange={(e) => {
              setDeliveryYardEntrance(e.target.checked);
              dispatch(setDeliveryYardEntranceReduxValue(e.target.checked));
              if (!e.target.checked) {
                setDeliveryYardEntranceDate("");
                setDeliveryYardEntranceUser("");
                setDeliveryYardEntranceGateCode("");
                setDeliveryYardEntranceUserID("");
              } else {
                setDeliveryYardEntranceGateCode("");
                setDeliveryYardEntranceDate(new Date());
                setDeliveryYardEntranceUser(userData.name?.trim());
                setDeliveryYardEntranceUserID(userData.userPK);
                setDeliveryYardNewEntranceGateCode(false);
              }
            }}
          />
        </Col>
      </Form.Group>

      {/* Yard Entrance Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Yard Entrance Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={deliveryYardEntranceDate}
            setDate={setDeliveryYardEntranceDate}
            disabled={
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK === null ||
              (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched && !originalDeliveryYardEntrance) ||
              !deliveryYardEntrance
            }
            min={
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate
                ? parseLocalDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate)
                : new Date()
            }
            setIsDateValid={setIsDeliveryYardEntranceDateValid}
            className={`customFormControl ${
              isUnitDataLoading ||
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryYardFK === null ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
              !deliveryYardEntrance
                ? ""
                : isDeliveryYardEntranceDateValid || (deliveryYardEntrance && deliveryYardEntranceDate)
                  ? ""
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* User */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>User</Form.Label>
        </Col>
        <Col xs={5} md={5} sm={5} className="p-0">
          <input className={`customFormControl`} type="text" value={deliveryYardEntranceUser} disabled />
        </Col>
      </Form.Group>

      {/* Yard Gate Code */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Yard Gate Code</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 me-3">
          <input className={`customFormControl`} type="text" value={deliveryYardEntranceGateCode} disabled />
        </Col>
        <div className="p-0 d-flex align-items-center w-30px h-25px">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled={
              viewDetail ||
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delayExist ||
              !deliveyYardOpner ||
              !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.checkUnitDispatched ||
              deliveryYardEntrance
            }
            value={deliveryYardEntranceNewGateCode}
            checked={deliveryYardEntranceNewGateCode}
            onChange={(e) => {
              setDeliveryYardNewEntranceGateCode(e.target.checked);
            }}
          />
        </div>
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className={` customColFormLabel`}>New Code</Form.Label>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default DatesTabColumn2;
