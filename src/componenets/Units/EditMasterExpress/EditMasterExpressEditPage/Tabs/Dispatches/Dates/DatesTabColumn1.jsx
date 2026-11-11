import { parseLocalDate } from "../../../../../../../utils/dateUtils";
import React, { useState, useEffect, useRef } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateInputField from "../../../../../../common/DateInputField";
import formatDatetimeToDate from "../../../../../../../utils/formatDateTimeToDate";
import {
  setEditedUnitDispatchDataToSaveForDispatchesTab,
  setIsDatesTabColumn1Valid,
} from "../../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const DatesTabColumn1 = () => {
  const dispatch = useDispatch();

  const [dispatchReleaseDate, setDispatchReleaseDate] = useState("");
  const [isDispatchReleaseDateValid, setIsDispatchReleaseDateValid] = useState(true);
  const [deliverByDate, setDeliverByDate] = useState("");
  const [isDeliverByDateValid, setIsDeliverByDateValid] = useState(true);
  const [minimumPickupDate, setMinimumPickupDate] = useState("");
  const [isMinimumPickupDateValid, setIsMinimumPickupDateValid] = useState(true);
  const [maximumPickupDate, setMaximumPickupDate] = useState("");
  const [isMaximumPickupDateValid, setIsMaximumPickupDateValid] = useState(true);
  const [minimumDeliveryDate, setMinimumDeliveryDate] = useState("");
  const [isMinimumDeliveryDateValid, setIsMinimumDeliveryDateValid] = useState(true);
  const [maximumDeliveryDate, setMaximumDeliveryDate] = useState("");
  const [isMaximumDeliveryDateValid, setIsMaximumDeliveryDateValid] = useState(true);
  const [estimatedPickupDate, setEstimatedPickupDate] = useState("");
  const [isEstimatedPickupDateValid, setIsEstimatedPickupDateValid] = useState(true);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [isEstimatedDeliveryDateValid, setIsEstimatedDeliveryDateValid] = useState(true);
  const [dateFlag, setDateFlag] = useState(true);
  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);
  const dispatchReleaseDateSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.dispatchReleaseDateSettingsTab
  );
  const deliverByDateSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.deliverByDateSettingsTab
  );
  const minimumPickupDateSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.minimumPickupDateSettingsTab
  );
  const maximumPickupDateSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.maximumPickupDateSettingsTab
  );
  const minimumDeliveryDateSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.minimumDeliveryDateSettingsTab
  );
  const maximumDeliveryDateSettingsTab = useSelector(
    (state) => state.editMasterExpressTabsReducer.maximumDeliveryDateSettingsTab
  );
  const isUnitReload = useSelector((state) => state.editMasterExpressTabsReducer.isUnitReload);
  const pickedUpReduxValue = useSelector((state) => state.editMasterExpressTabsReducer.pickedUpReduxValue);
  const pickUpYardExitReduxValue = useSelector(
    (state) => state.editMasterExpressTabsReducer.pickUpYardExitReduxValue
  );
  const deliveredReduxValue = useSelector((state) => state.editMasterExpressTabsReducer.deliveredReduxValue);
  const deliveryYardEntranceReduxValue = useSelector(
    (state) => state.editMasterExpressTabsReducer.deliveryYardEntranceReduxValue
  );

  // A unit saved as picked up (or yard exit) and delivered (or yard entrance) is no longer dispatched
  // (checkUnitDispatched = false). Unchecking Delivered / Delivery Yard Entrance reopens it, so the
  // estimated dates must become editable again - same rule as the checkboxes in DatesTabColumn2. Bug 4320.
  const dispatchDto = selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO;
  const isReopenedDispatch =
    (dispatchDto?.pickedUp || dispatchDto?.pickupYardExit) &&
    (dispatchDto?.delivered || dispatchDto?.deliveryYardEntrance) &&
    !deliveredReduxValue &&
    !deliveryYardEntranceReduxValue;
  const canEditEstimatedDates = dispatchDto?.checkUnitDispatched || isReopenedDispatch;

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setDispatchReleaseDate(
        formatDatetimeToDate(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchReleaseDate
        ) || ""
      );
      setDeliverByDate(
        formatDatetimeToDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliverByDate) || ""
      );

      setMinimumPickupDate(
        formatDatetimeToDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.minimumPickupDate) ||
          ""
      );
      setMaximumPickupDate(
        formatDatetimeToDate(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.maximumPickupDate) ||
          ""
      );
      setMinimumDeliveryDate(
        formatDatetimeToDate(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.minimumDeliveryDate
        ) || ""
      );
      setMaximumDeliveryDate(
        formatDatetimeToDate(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.maximumDeliveryDate
        ) || ""
      );
      setEstimatedPickupDate(
        formatDatetimeToDate(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.estimatedPickupDate
        ) || ""
      );
      setEstimatedDeliveryDate(
        formatDatetimeToDate(
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.estimatedDeliveryDate
        ) || ""
      );
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  // Follow Release / Deliver By Date edits made on the Settings tab. null = no edit since the unit loaded;
  // the first run is skipped so a value left in redux from an earlier visit is never applied on mount.
  const isFirstSettingsSync = useRef({ release: true, deliverBy: true });
  useEffect(() => {
    if (isFirstSettingsSync.current.release) {
      isFirstSettingsSync.current.release = false;
      return;
    }
    if (dispatchReleaseDateSettingsTab != null) setDispatchReleaseDate(dispatchReleaseDateSettingsTab);
  }, [dispatchReleaseDateSettingsTab]);

  useEffect(() => {
    if (isFirstSettingsSync.current.deliverBy) {
      isFirstSettingsSync.current.deliverBy = false;
      return;
    }
    if (deliverByDateSettingsTab != null) setDeliverByDate(deliverByDateSettingsTab);
  }, [deliverByDateSettingsTab]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDispatchDataToSaveForDispatchesTab({
        estimatedPickupDate: estimatedPickupDate,

        estimatedDeliveryDate: estimatedDeliveryDate,

        minimumPickupDate: minimumPickupDate,

        maximumPickupDate: maximumPickupDate,

        minimumDeliveryDate: minimumDeliveryDate,

        maximumDeliveryDate: maximumDeliveryDate,

        dispatchReleaseDate: dispatchReleaseDate,

        deliverByDate: deliverByDate,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
  }, [
    estimatedPickupDate,
    estimatedDeliveryDate,
    maximumPickupDate,
    minimumDeliveryDate,
    maximumDeliveryDate,
    minimumPickupDate,
    deliverByDate,
    dispatchReleaseDate,
  ]);

  //DatesTab Colum1 validation
  useEffect(() => {
    if (
      isDispatchReleaseDateValid &&
      isDeliverByDateValid &&
      isMinimumPickupDateValid &&
      isMaximumPickupDateValid &&
      isMinimumDeliveryDateValid &&
      isMinimumDeliveryDateValid &&
      isEstimatedPickupDateValid &&
      isEstimatedDeliveryDateValid &&
      dateFlag
    ) {
      dispatch(setIsDatesTabColumn1Valid(true));
    } else {
      dispatch(setIsDatesTabColumn1Valid(false));
    }
  }, [
    isDispatchReleaseDateValid,
    isDeliverByDateValid,
    isMinimumPickupDateValid,
    isMaximumPickupDateValid,
    isMinimumDeliveryDateValid,
    isMinimumDeliveryDateValid,
    isEstimatedPickupDateValid,
    isEstimatedDeliveryDateValid,
    dateFlag,
  ]);
  useEffect(() => {
    if (!minimumDeliveryDate && maximumPickupDate < minimumPickupDate) {
      setDateFlag(false);
    } else {
      setDateFlag(true);
    }
  }, [minimumDeliveryDate, maximumPickupDate, minimumPickupDate]);

  return (
    <Col xs={6}>
      {/* Release Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
          !isUnitReload || (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant)
            ? ""
            : "hide-elements"
        }
      `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Release Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={dispatchReleaseDate}
            disabled={
              viewDetail ||
              !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
            }
            className={`customFormControl ${
              isUnitDataLoading || viewDetail ? "" : isDispatchReleaseDateValid ? "" : "borderRed"
            }`}
            setDate={setDispatchReleaseDate}
            max={deliverByDate && parseLocalDate(deliverByDate)}
            min={parseLocalDate(selectedUnitData?.editMasterExpressSettingsTabDTO?.orderDate)}
            setIsDateValid={setIsDispatchReleaseDateValid}
          />
        </Col>
      </Form.Group>

      {/* Deliver By Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 
      ${
        !isUnitReload || (isUnitReload && selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant)
          ? ""
          : "hide-elements"
      }
      `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Deliver By Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={deliverByDate}
            disabled={
              viewDetail ||
              !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
            }
            setIsDateValid={setIsDeliverByDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail ? "" : isDeliverByDateValid ? "" : "borderRed"
            }`}
            setDate={setDeliverByDate}
            min={dispatchReleaseDate && parseLocalDate(dispatchReleaseDate)}
          />
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

      {/* Minimum Pickup Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 
      ${isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"}
      `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Minimum Pickup Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={minimumPickupDate}
            disabled={
              viewDetail ||
              !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
            }
            setDate={setMinimumPickupDate}

            max={
              (minimumDeliveryDate !== "" && parseLocalDate(minimumDeliveryDate)) ||
              (maximumPickupDate !== "" && parseLocalDate(maximumPickupDate))
            }
            setIsDateValid={setIsMinimumPickupDateValid}

            className={`customFormControl ${
              isUnitDataLoading || viewDetail
                ? ""
                : !isMinimumPickupDateValid
                  ? "borderRed"
                  : !minimumDeliveryDate && maximumPickupDate < minimumPickupDate
                    ? "borderRed"
                    : ""
            }`}
          />
        </Col>
      </Form.Group>

      {/* Maximum Pickup Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 
      ${isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"}
      `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Maximum Pickup Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={maximumPickupDate}
            disabled={
              viewDetail ||
              !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
            }
            setDate={setMaximumPickupDate}
            min={minimumPickupDate && parseLocalDate(minimumPickupDate)}
            max={maximumDeliveryDate && parseLocalDate(maximumDeliveryDate)}
            setIsDateValid={setIsMaximumPickupDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail ? "" : isMaximumPickupDateValid ? "" : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* Minimum Delivery Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 
      ${isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"}
      `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Minimum Delivery Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={minimumDeliveryDate}
            disabled={
              viewDetail ||
              !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
            }
            setDate={setMinimumDeliveryDate}
            min={minimumPickupDate && parseLocalDate(minimumPickupDate)}
            max={maximumDeliveryDate && parseLocalDate(maximumDeliveryDate)}
            setIsDateValid={setIsMinimumDeliveryDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail ? "" : isMinimumDeliveryDateValid ? "" : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>

      {/* Maximum Delivery Date */}
      <Form.Group
        className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 
      ${isUnitReload && !selectedUnitData?.editMasterExpressSettingsTabDTO?.pickupAtPlant ? "" : "hide-elements"}
      `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Maximum Delivery Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={maximumDeliveryDate}
            disabled={
              viewDetail ||
              !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
              (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
            }
            setDate={setMaximumDeliveryDate}
            min={
              minimumDeliveryDate
                ? parseLocalDate(minimumDeliveryDate)
                : maximumPickupDate
                  ? parseLocalDate(maximumPickupDate)
                  : new Date()
            }
            setIsDateValid={setIsMaximumDeliveryDateValid}
            className={`customFormControl ${
              isUnitDataLoading || viewDetail ? "" : isMaximumDeliveryDateValid ? "" : "borderRed"
            }`}
          />
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

      {/* Dispatch Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Dispatch Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchDate || ""}
            disabled
          />
        </Col>
      </Form.Group>

      {/* Dispatched By */}
      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Dispatched By</Form.Label>
        </Col>
        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type=""
            value={selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchedUser || ""}
            disabled
          />
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

      {/* Estimated Pickup Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Estimated Pickup Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={estimatedPickupDate}
            setDate={setEstimatedPickupDate}
            max={estimatedDeliveryDate && parseLocalDate(estimatedDeliveryDate)}
            setIsDateValid={setIsEstimatedPickupDateValid}
            min={new Date()}
            className={`customFormControl ${
              isUnitDataLoading ||
              viewDetail ||
              !canEditEstimatedDates ||
              pickedUpReduxValue ||
              pickUpYardExitReduxValue
                ? ""
                : isEstimatedPickupDateValid
                  ? ""
                  : "borderRed"
            }`}
            disabled={
              viewDetail ||
              !canEditEstimatedDates ||
              pickedUpReduxValue ||
              pickUpYardExitReduxValue
            }
          />
        </Col>
      </Form.Group>

      {/* Estimated Delivery Date */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Estimated Delivery Date</Form.Label>
        </Col>
        <Col xs={2} md={2} sm={2} className="p-0 w-95px">
          <DateInputField
            date={estimatedDeliveryDate}
            setDate={setEstimatedDeliveryDate}

            setIsDateValid={setIsEstimatedDeliveryDateValid}
            min={estimatedPickupDate ? parseLocalDate(estimatedPickupDate) : new Date()}
            className={`customFormControl ${
              isUnitDataLoading ||
              viewDetail ||
              !canEditEstimatedDates ||
              deliveredReduxValue ||
              deliveryYardEntranceReduxValue
                ? ""
                : isEstimatedDeliveryDateValid
                  ? ""
                  : "borderRed"
            }`}
            disabled={
              viewDetail ||
              !canEditEstimatedDates ||
              deliveredReduxValue ||
              deliveryYardEntranceReduxValue
            }
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default DatesTabColumn1;
