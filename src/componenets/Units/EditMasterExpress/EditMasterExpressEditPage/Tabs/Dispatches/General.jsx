import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import DriverLookup from "../../../../../LookupScreens/Driver/DriverLookup";
import EditYardUnitService from "../../../../../../services/shuttle/process/EditYardUnitService";
import {
  setIsDispatchGeneralTabValid,
  setEditedUnitDispatchDataToSaveForDispatchesTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

function General({ styles }) {
  const dispatch = useDispatch();
  //Local States
  const [dispatchPK, setDispatchPK] = useState(null);
  const [pickupLocationName, setPickupLocationName] = useState("");
  const [pickupLocationAddress1, setPickupLocationAddress1] = useState("");
  const [pickupLocationAddress2, setPickupLocationAddress2] = useState("");
  const [pickupLocationPostalCode, setPickupLocationPostalCode] = useState("");
  const [pickupLocationCity, setPickupLocationCity] = useState("");
  const [pickupLocationStateCode, setPickupLocationStateCode] = useState("");
  const [bOLNumber, setBOLNumber] = useState(0);
  const [loadNumber, setLoadNumber] = useState(0);
  const [multiDispatch, setMultiDispatch] = useState(false);
  const [activeDispatch, setActiveDispatch] = useState(false);
  const [restrictedDispatch, setRestrictedDispatch] = useState(false);
  const [driverDispatch, setDriverDispatch] = useState(false);
  const [driverViewOnly, setDriverViewOnly] = useState(false);
  const [priority, setPriority] = useState("");
  const [postingStatus, setPostingStatus] = useState("none");
  const [noPickupPulloutFee, setNoPickupPulloutFee] = useState(false);
  const [noDeliveryPulloutFee, setNoDeliveryPulloutFee] = useState(false);
  const [deliveryLocationName, setDeliveryLocationName] = useState("");
  const [deliveryLocationAddress1, setDeliveryLocationAddress1] = useState("");
  const [deliveryLocationAddress2, setDeliveryLocationAddress2] = useState("");
  const [deliveryLocationPostalCode, setDeliveryLocationPostalCode] = useState("");
  const [deliveryLocationCity, setDeliveryLocationCity] = useState("");
  const [deliveryLocationStateCode, setDeliveryLocationStateCode] = useState("");
  const [truckName, setTruckName] = useState("");
  const [trailerName, setTrailerName] = useState("");
  const [portOfEntryName, setPortOfEntryName] = useState("");
  const [pars, setPars] = useState("");
  const [paps, setPaps] = useState("");
  const [reservedForDriver, setReservedForDriver] = useState(false);
  const [driverNames, setDriverNames] = useState([]);
  const [selectedReserveDriverID, setSelectedReserveDriverID] = useState("");
  const [driverNameInput, setDriverNameInput] = useState("");
  const [driverLookUpshow, setDriverLookUpshow] = useState(false);
  const [latePaperwork, setLatePaperwork] = useState("");
  const [driverLoading, setDriverLoading] = useState(true);

  //States From Redux
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);

  //Populating selected unit details
  useEffect(() => {
    if (selectedUnitData != null) {
      setDispatchPK(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatchPK || null);
      setPickupLocationName(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLocationName || ""
      );
      setPickupLocationAddress1(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLocationAddress1 || ""
      );
      setPickupLocationAddress2(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLocationAddress2 != null
          ? selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLocationAddress2
          : ""
      );
      setPickupLocationPostalCode(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLocationPostalCode || ""
      );
      setPickupLocationCity(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLocationCity || ""
      );
      setPickupLocationStateCode(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pickupLocationStateCode || ""
      );
      setBOLNumber(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.bolnumber || 0);
      setLoadNumber(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.loadNumber || 0);
      setMultiDispatch(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.multiDispatch || false);
      setActiveDispatch(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.activeDispatch || false);
      setRestrictedDispatch(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.restrictedDispatch || false
      );
      setDriverDispatch(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverDispatch || false);
      setDriverViewOnly(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverViewOnly || false);
      setPriority(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.priority || "");
      setPostingStatus(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo &&
          selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.softPost
          ? "softPost"
          : selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo &&
              !selectedUnitData?.editMasterExpressUnitTabDTO?.softPost
            ? "hardPost"
            : "none"
      );
      setNoPickupPulloutFee(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.noPickupPulloutFee || false
      );
      setNoDeliveryPulloutFee(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.noDeliveryPulloutFee || false
      );
      setDeliveryLocationName(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryLocationName || ""
      );
      setDeliveryLocationAddress1(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryLocationAddress1 || ""
      );
      setDeliveryLocationAddress2(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryLocationAddress2 != null
          ? selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryLocationAddress2
          : ""
      );
      setDeliveryLocationPostalCode(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryLocationPostalCode || ""
      );
      setDeliveryLocationCity(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryLocationCity || ""
      );
      setDeliveryLocationStateCode(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.deliveryLocationStateCode || ""
      );
      setTruckName(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverTruckName || "");
      setTrailerName(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.driverTrailerName || "");
      setPortOfEntryName(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.portOfEntryName || "");
      setPars(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.pars || "");
      setPaps(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.paps || "");
      setReservedForDriver(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.reserved || false);
      setDriverNameInput(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.reservedDriverName || "");
      setSelectedReserveDriverID(
        selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.reservedDriverFK || ""
      );
      setLatePaperwork(selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.latePaperwork || "");
    }
    // eslint-disable-next-line
  }, [selectedUnitData, viewDetail]);

  const minMaxCalculation = (value, min, max) => {
    if (!value) return value;

    const number = value.replace(/[^\d]/g, "");
    if (number > max) return max;
    else if (number < min) return min;
    else return number;
  };

  //Service for getting all Driver names
  const fetchDriverByName = (string) => {
    setDriverLoading(true);
    EditYardUnitService.getAllDrivers(0, "Beginning", "Autocomplete", string)
      .then((response) => {
        const data = response.data.content;
        const driversList = data?.map((driver) => ({ ...driver, firstName: driver.firstName?.trim() }));
        setDriverNames(driversList);
      })
      .catch((error) => {
        console.log("error");
      })
      .finally(() => {
        setDriverLoading(false);
      });
  };

  const handleDriverSelectionFromDropdown = (driver) => {
    setSelectedReserveDriverID(driver.driverPK);
    setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));
  };

  //Handle selection from driver look up screen
  const handleDriverLookupSelection = (driver) => {
    setSelectedReserveDriverID(driver.driverPK);
    setDriverNameInput(driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : ""));
    setDriverLookUpshow(false);
  };

  //Enable driver lookup
  const handleDriverLookupModalShow = () => {
    setDriverLookUpshow(true);
  };

  //Disable driver lookup
  const handleDriverLookupModalHide = () => {
    setDriverLookUpshow(false);
  };

  /**** Tab Validation - Info Tab ****/
  useEffect(() => {
    if (!reservedForDriver || (reservedForDriver && selectedReserveDriverID !== "")) {
      dispatch(setIsDispatchGeneralTabValid(true));
    } else {
      dispatch(setIsDispatchGeneralTabValid(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservedForDriver, selectedReserveDriverID]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDispatchDataToSaveForDispatchesTab({
        dispatchPK: dispatchPK,
        activeDispatch: activeDispatch,
        restrictedDispatch: restrictedDispatch,
        driverDispatch: driverDispatch,
        driverViewOnly: driverViewOnly,
        priority: priority,
        postedToFromDB: selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo,
        postedTo: postingStatus === "hardPost" || postingStatus === "softPost",
        softPost: postingStatus === "softPost",
        noPickupPulloutFee: noPickupPulloutFee,
        noDeliveryPulloutFee: noDeliveryPulloutFee,
        reserved: reservedForDriver,
        reservedDriverFK: selectedReserveDriverID,
        latePaperwork: latePaperwork,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatchPK,
    activeDispatch,
    restrictedDispatch,
    driverDispatch,
    driverViewOnly,
    priority,
    postingStatus,
    noPickupPulloutFee,
    noDeliveryPulloutFee,
    reservedForDriver,
    selectedReserveDriverID,
    latePaperwork,
  ]);

  return (
    <div className="p-1 ps-2">
      <Row>
        <Col xs={6}>
          {/* Pickup Location */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Pickup Location</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={pickupLocationName} disabled />
            </Col>
          </Form.Group>

          {/* Address-1 */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={pickupLocationAddress1} disabled />
            </Col>
          </Form.Group>

          {/* Address-2*/}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={pickupLocationAddress2} disabled />
            </Col>
          </Form.Group>

          {/* City,State,Zip */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                City,State,ZIP
              </Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={pickupLocationCity} disabled />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input className={`customFormControl`} type="text" value={pickupLocationStateCode} disabled />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input className={`customFormControl`} type="text" value={pickupLocationPostalCode} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
          </Form.Group>

          {/* BOL Number */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                BOL Number
              </Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input className={`customFormControl`} type="text" value={bOLNumber} disabled />
            </Col>
          </Form.Group>

          {/* Load Number */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Load Number
              </Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input className={`customFormControl`} type="text" value={loadNumber} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
          </Form.Group>

          {/* Multiunit Dispatch */}
          <Form.Group
            className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 ${
              !selectedUnitData?.editMasterExpressSettingsTabDTO?.multiUnit ? "hide-elements" : ""
            }`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Multiunit Dispatch</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                value={multiDispatch}
                checked={multiDispatch}
                disabled
              />
            </Col>
          </Form.Group>

          {/* Dispatch Active */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Dispatch Active</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                value={activeDispatch}
                checked={activeDispatch}
                onChange={(e) => {
                  setActiveDispatch(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          {/* Restricted Dispatch */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Restricted Dispatch</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                value={restrictedDispatch}
                checked={restrictedDispatch}
                onChange={(e) => {
                  setRestrictedDispatch(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          {/* Driver Dispatch */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Driver Dispatch</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                value={driverDispatch}
                checked={driverDispatch}
                onChange={(e) => {
                  setDriverDispatch(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          {/* Driver View Only */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Driver View Only</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                value={driverViewOnly}
                checked={driverViewOnly}
                onChange={(e) => {
                  setDriverViewOnly(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          {/* Dispatch Priority */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                Dispatch Priority
              </Form.Label>
            </Col>
            <div className="p-0 w-40px">
              <input
                className={`customFormControl`}
                type="number"
                value={priority}
                placeholder=""
                step="1"
                min={1}
                max={9}
                maxLength={1}
                pattern="[0-9]*"
                onInput={(e) => {
                  setPriority(minMaxCalculation(e.target.value, 1, 9));
                }}
                onKeyDown={(e) => {
                  if (e.key === "e" || e.key === ".") {
                    e.preventDefault();
                  }
                }}
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
              />
            </div>
          </Form.Group>

          {/* Posting Status */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0 `}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Posting Status</Form.Label>
            </Col>
            <Col xs={4} className={`p-0 ${styles.selectContainer}`}>
              <Col className="d-flex align-items-center">
                <input
                  type="radio"
                  name="postingStatus"
                  value="none"
                  checked={postingStatus === "none"}
                  disabled={
                    viewDetail ||
                    !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
                    !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo
                  }
                  onChange={(e) => {
                    setPostingStatus(e.target.value);
                  }}
                />
                <label className="ms-2">None</label>
              </Col>
              <Col className="d-flex align-items-center">
                <input
                  type="radio"
                  name="postingStatus"
                  value="hardPost"
                  checked={postingStatus === "hardPost"}
                  disabled={
                    viewDetail ||
                    !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
                    (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo &&
                      selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.softPost) ||
                    !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo
                  }
                  onChange={(e) => {
                    setPostingStatus(e.target.value);
                  }}
                />
                <label className="ms-2">Hard</label>
              </Col>
              <Col className="d-flex align-items-center">
                <input
                  type="radio"
                  name="postingStatus"
                  value="softPost"
                  checked={postingStatus === "softPost"}
                  disabled={
                    viewDetail ||
                    !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched ||
                    (selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo &&
                      !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.softPost) ||
                    !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.postedTo
                  }
                  onChange={(e) => {
                    setPostingStatus(e.target.value);
                  }}
                />
                <label className="ms-2">Soft</label>
              </Col>
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* No Pickup Pullout Fee */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>No Pickup Pullout Fee</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                value={noPickupPulloutFee}
                checked={noPickupPulloutFee}
                onChange={(e) => {
                  setNoPickupPulloutFee(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>

          {/* No Delivery Pullout Fee */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>No Delivery Pullout Fee</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                value={noDeliveryPulloutFee}
                checked={noDeliveryPulloutFee}
                onChange={(e) => {
                  setNoDeliveryPulloutFee(e.target.checked);
                }}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={6}>
          {/* Delivery Location */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Delivery Location</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={deliveryLocationName} disabled />
            </Col>
          </Form.Group>

          {/* Address-1 */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Address</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={deliveryLocationAddress1} disabled />
            </Col>
          </Form.Group>

          {/* Address-2 */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={deliveryLocationAddress2} disabled />
            </Col>
          </Form.Group>

          {/* City,State,Zip */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>City,State,ZIP</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={deliveryLocationCity} disabled />
            </Col>
            <div className="p-0 w-30px mx-1">
              <input className={`customFormControl`} type="text" value={deliveryLocationStateCode} disabled />
            </div>
            <Col xs={1} md={1} sm={1} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                value={deliveryLocationPostalCode}
                disabled
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input className={`customFormControl`} type="text" />
            </Col>
          </Form.Group>

          {/* Truck */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Truck</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={truckName} disabled />
            </Col>
          </Form.Group>

          {/* Trailer */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Trailer</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={trailerName} disabled />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Port of Entry */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Port of Entry</Form.Label>
            </Col>
            <Col xs={6} md={6} sm={6} className="p-0">
              <input className={`customFormControl`} type="text" value={portOfEntryName} disabled />
            </Col>
          </Form.Group>

          {/* PARS */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>PARS</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <input className={`customFormControl`} type="text" value={pars} disabled />
            </Col>
          </Form.Group>

          {/* PAPS */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label htmlFor="name" className={`customColFormLabel`}>
                PAPS
              </Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0">
              <input className={`customFormControl`} type="text" value={paps} disabled />
            </Col>
          </Form.Group>

          {/* Reserved For Driver */}
          <Form.Group className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0`}>
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={` customColFormLabel`}>Reserved For Driver</Form.Label>
            </Col>
            <Col xs={7} md={5} sm={7} className="p-0 d-flex align-items-center h-25px">
              <input
                type="checkbox"
                className="form-check-input p-0"
                disabled={
                  viewDetail || !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                }
                value={reservedForDriver}
                checked={reservedForDriver}
                onChange={(e) => {
                  setReservedForDriver(e.target.checked);
                  if (!e.target.checked) {
                    setSelectedReserveDriverID("");
                    setDriverNameInput("");
                  }
                }}
              />
            </Col>
          </Form.Group>

          {/* Reserved Driver */}
          <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Reserved Driver</Form.Label>
            </Col>
            <Col xs={7} className={`p-0 ${styles.selectContainer}`}>
              <AutoCompleteDropdown
                arrayList={driverNames}
                searchString={driverNameInput}
                renderItemId={(driver) => driver.driverPK}
                renderItemField={(driver) =>
                  driver.firstName?.trim() + (driver.lastName ? " " + driver.lastName?.trim() : "")
                }
                handleSearchString={(string) => setDriverNameInput(string)}
                fetchDataBySearchString={fetchDriverByName}
                onSelect={handleDriverSelectionFromDropdown}
                selectedId={selectedReserveDriverID}
                clearInputCallback={() => {
                  setSelectedReserveDriverID("");
                }}
                className={`${
                  viewDetail ||
                  isUnitDataLoading ||
                  !reservedForDriver ||
                  !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                    ? "black"
                    : reservedForDriver && selectedReserveDriverID === ""
                      ? "borderRed"
                      : "borderGreen"
                }`}
                loading={driverLoading}
                disabled={
                  isUnitDataLoading ||
                  viewDetail ||
                  !reservedForDriver ||
                  !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                    ? true
                    : false
                }
                hidePlaceholder={
                  viewDetail ||
                  !reservedForDriver ||
                  !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                    ? true
                    : false
                }
                towardsTop
              />
              <LookupButton
                disabled={
                  isUnitDataLoading ||
                  viewDetail ||
                  !reservedForDriver ||
                  !selectedUnitData?.editMasterExpressSettingsTabDTO?.isUnitNotDispatched
                    ? true
                    : false
                }
                onClick={handleDriverLookupModalShow}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
            <Col sm={5} md={5} xs={5} className="p-0">
              <Form.Label className={`customColFormLabel`}></Form.Label>
            </Col>
            <Col xs={2} className="p-0">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          </Form.Group>

          {/* Late paperwork */}
          <Form.Group
            className={`mt-2 align-items-center row  m-l-0 m-r-0 ms-0 ${
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
              selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered
                ? ""
                : "hide-elements"
            }`}
          >
            <Col sm={4} md={4} xs={4} className="p-0">
              <Form.Label className={`customColFormLabel`}>Late paperwork</Form.Label>
            </Col>
            <div xs={1} className="p-0 w-40px">
              <input
                className={`customFormControl`}
                type="text"
                autoComplete="off"
                aria-autocomplete="list"
                maxLength={1}
                disabled={
                  viewDetail ||
                  (!selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.dispatched &&
                    !selectedUnitData?.editMaserExpressDispatchesGeneralTabDTO?.delivered)
                }
                value={latePaperwork}
                onInput={(e) => {
                  const input = e.target.value;
                  if (/^[a-zA-Z]?$/.test(input)) {
                    setLatePaperwork(input);
                  }
                }}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
      <DriverLookup
        show={driverLookUpshow}
        onHide={handleDriverLookupModalHide}
        renderItemId={(driver) => driver.driverPK}
        handleLookupSelection={handleDriverLookupSelection}
        EditYardUnit
      />
    </div>
  );
}

export default General;
