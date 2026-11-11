/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import EditShuttleService from "../../../../../services/shuttle/process/EditShuttleService";
import { useDispatch, useSelector } from "react-redux";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import YardLookup from "../../../../LookupScreens/Yard/YardLookup";
import {
  setDeliveryYardId,
  setDeliveryYardSelection,
  setDropSisterYardCode,
  setEditReason,
  setIsMotorizedUnit,
  setIsShuttleDateValid,
  setIsTowableUnit,
  setMiles,
  setPickupSisterYardCode,
  setPickupYardId,
  setPickupYardSelection,
  setPosition,
  setRow,
  setShuttleAmount,
  setShuttleDate,
  setWarningMessage,
  setYardToYardCity,
  setYardToYardPostCode,
  setYardToYardState,
} from "../../../../../redux/EditShuttleSlice";
import { useNavigate } from "react-router-dom";
import DateInputField from "../../../../common/DateInputField";
import formatDatetimeToDate from "../../../../../utils/formatDateTimeToDate";
import WarningModalPopUp from "../../../../common/WarningModalPopUp";

function EditShuttleYardToYardContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [specialCode, setSpecialCode] = useState("");
  const [pickupYardsData, setPickupYardsData] = useState([]);
  const [pickupYardInput, setPickupYardInput] = useState("");
  const [deliveryYardsData, setDeliveryYardsData] = useState([]);
  const [deliveryYardInput, setDeliveryYardInput] = useState("");
  const [modalPopup, setModalPopUp] = useState(false);
  const [yard1Loading, setYard1Loading] = useState(false);
  const [yard2Loading, setYard2Loading] = useState(false);

  const driverNameInput = useSelector((state) => state.editShuttleReducer.driverNameInput);
  const unitNumberInput = useSelector((state) => state.editShuttleReducer.unitNumberInput);
  const driverData = useSelector((state) => state.editShuttleReducer.driverData);
  const unitShuttleData = useSelector((state) => state.editShuttleReducer.unitShuttleData);
  const pickupYardSelection = useSelector((state) => state.editShuttleReducer.pickupYardSelection);
  const deliveryYardSelection = useSelector((state) => state.editShuttleReducer.deliveryYardSelection);
  const shuttleAmount = useSelector((state) => state.editShuttleReducer.shuttleAmount);
  const shuttleDate = useSelector((state) => state.editShuttleReducer.shuttleDate);
  const deliveryYardId = useSelector((state) => state.editShuttleReducer.deliveryYardId);
  const pickupYardId = useSelector((state) => state.editShuttleReducer.pickupYardId);
  const row = useSelector((state) => state.editShuttleReducer.row);
  const position = useSelector((state) => state.editShuttleReducer.position);
  const isTowableUnit = useSelector((state) => state.editShuttleReducer.isTowableUnit);
  const isMotorizedUnit = useSelector((state) => state.editShuttleReducer.isMotorizedUnit);
  const warningMessage = useSelector((state) => state.editShuttleReducer.warningMessage);
  const companyName = useSelector((state) => state.editShuttleReducer.companyName);
  const editReason = useSelector((state) => state.editShuttleReducer.editReason);
  const isShuttleDateValid = useSelector((state) => state.editShuttleReducer.isShuttleDateValid);

  /**
   * Fetch all Pickup Yards for Autocomplete
   */
  const fetchPickupYardDetailsByName = (string) => {
    setYard1Loading(true);
    EditShuttleService.fetchYardByName(string, companyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setPickupYardsData(yardsList);
        setYard1Loading(false);
      })
      .catch((err) => {
        setYard1Loading(false);
      });
  };

  /**
   * used for Pickup Yard Autocomplete Dropdown
   */
  const handlePickupYardSelection = (yard) => {
    setPickupYardInput(yard.description);
    dispatch(setPickupYardId(yard.yardPK));
    dispatch(setPickupSisterYardCode(yard.sisterYardCode));
  };

  /**
   * used for Pickup Yard selection Lookup - open
   */
  const handlePickupYardLookupModalShow = () => {
    dispatch(setPickupYardSelection(true));
  };
  /**
   * used for Pickup Yard selection Lookup - onSelect
   */
  const handlePickupYardLookupSelection = (yard) => {
    dispatch(setPickupYardId(yard.yardPK));
    setPickupYardInput(yard.description);
    dispatch(setPickupYardSelection(false));
    dispatch(setPickupSisterYardCode(yard.sisterYardCode));
  };

  /**
   * used for Pickup Yard selection Lookup - close
   */
  const hidePickupYardModal = () => {
    dispatch(setPickupYardSelection(false));
  };

  /**
   * Fetch all Delivery Yards for Autocomplete
   */
  const fetchDeliveryYardDetailsByName = (string) => {
    setYard2Loading(true);
    EditShuttleService.fetchYardByName(string, companyName)
      .then((response) => {
        const data = response.data.content;
        const yardsList = data?.map((yards) => ({ ...yards, description: yards.description?.trim() }));
        setDeliveryYardsData(yardsList);
        setYard2Loading(false);
      })
      .catch((err) => {
        setYard2Loading(false);
      });
  };

  /**
   * used for Delivery Yard Autocomplete Dropdown
   */
  const handleDeliveryYardSelection = (yard) => {
    setDeliveryYardInput(yard.description);
    dispatch(setDeliveryYardId(yard.yardPK));
    dispatch(setYardToYardCity(yard.city));
    dispatch(setYardToYardState(yard.stateCode));
    dispatch(setYardToYardPostCode(yard.postalCode));
    dispatch(setDropSisterYardCode(yard.sisterYardCode));
  };

  /**
   * used for Delivery Yard selection Lookup - open
   */
  const handleDeliveryYardLookupModalShow = () => {
    dispatch(setDeliveryYardSelection(true));
  };

  /**
   * used for Delivery Yard selection Lookup - onSelect
   */
  const handleDeliveryYardLookupSelection = (yard) => {
    dispatch(setDeliveryYardId(yard.yardPK));
    dispatch(setYardToYardCity(yard.city));
    dispatch(setYardToYardState(yard.stateCode));
    dispatch(setYardToYardPostCode(yard.postalCode));
    setDeliveryYardInput(yard.description);
    dispatch(setDeliveryYardSelection(false));
    dispatch(setDropSisterYardCode(yard.sisterYardCode));
  };

  /**
   * used for Delivery Yard selection Lookup - close
   */
  const hideDeliveryYardModal = () => {
    dispatch(setDeliveryYardSelection(false));
  };

  /**
   * Check whether City to yard Combination exist or not
   **/
  const yardToYardExistCheckForShuttle = () => {
    EditShuttleService.yardToYardExistCheckForShuttle(
      pickupYardId,
      deliveryYardId,
      isTowableUnit,
      isMotorizedUnit,
      companyName
    )
      .then((response) => {
        const data = response.data;
        if (data.combinationExists) {
          dispatch(setWarningMessage(data.combinationExists));
          if (data.combinationExists !== "") {
            dispatch(setShuttleAmount(""));
            dispatch(setMiles(0));
          }
        } else if (data.error) {
          dispatch(setWarningMessage(data.error));
          dispatch(setShuttleAmount(""));
          dispatch(setMiles(0));
        }
        if (data.towableFee) {
          dispatch(setShuttleAmount(data.towableFee));
          dispatch(setMiles(data.miles));
          dispatch(setWarningMessage(""));
        } else if (data.motorizedFee) {
          dispatch(setShuttleAmount(data.motorizedFee));
          dispatch(setMiles(data.miles));
          dispatch(setWarningMessage(""));
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (unitShuttleData) {
      setSpecialCode(unitShuttleData?.specialCode);
      dispatch(setShuttleAmount(unitShuttleData.amount));
      dispatch(setShuttleDate(formatDatetimeToDate(unitShuttleData.shuttleDate)));
      dispatch(setDeliveryYardId(unitShuttleData.dropYardId));
      setDeliveryYardInput(unitShuttleData.deliveryYardName);
      dispatch(setPickupYardId(unitShuttleData.pickupYardId));
      setPickupYardInput(unitShuttleData.pickupYardName);
      dispatch(setRow(unitShuttleData.yardRow ? unitShuttleData.yardRow?.trim() : ""));
      dispatch(setPosition(unitShuttleData.yardPosition ? unitShuttleData.yardPosition?.trim() : ""));
      dispatch(setIsMotorizedUnit(unitShuttleData.unitTypeMotorized));
      dispatch(setIsTowableUnit(unitShuttleData.unitTypeTowable));
      dispatch(setEditReason(unitShuttleData.editReason?.trim()));
      dispatch(setMiles(unitShuttleData.miles));
      dispatch(setPickupSisterYardCode(unitShuttleData.pickupYardCode));
      dispatch(setDropSisterYardCode(unitShuttleData.deliveryYardCode));
    }
  }, [unitShuttleData]);

  useEffect(() => {
    if (driverData === null || driverData === undefined || driverData.length === 0) {
      navigate("/edit-shuttle-driver");
    }
    if (unitShuttleData === null || unitShuttleData === undefined || unitShuttleData.length === 0) {
      navigate("/edit-shuttle-unit");
    }
  }, [unitShuttleData, driverData]);

  useEffect(() => {
    if (deliveryYardId && pickupYardId) {
      yardToYardExistCheckForShuttle();
    }
  }, [deliveryYardId, pickupYardId]);

  useEffect(() => {
    if (warningMessage === "") {
      setModalPopUp(false);
    } else {
      setModalPopUp(true);
    }
  }, [warningMessage]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col className="p-15 " xs={7}>
              <Form.Group className=" align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Driver
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="driverName"
                    name="driverName"
                    type="text"
                    maxLength={30}
                    value={driverNameInput}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Unit Number
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="unitNumber"
                    name="unitNumber"
                    type="text"
                    maxLength={30}
                    value={unitNumberInput}
                    autoComplete="off"
                    aria-autocomplete="list"
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2   align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Special Code
                  </Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0">
                  <input
                    className="customFormControl"
                    id="specialCode"
                    name="specialCode"
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={specialCode}
                    disabled
                    readOnly
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-2   align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Shuttle Amount
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    id="shuttleAmount"
                    name="shuttleAmount"
                    type="text"
                    maxLength={30}
                    value={shuttleAmount}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      dispatch(setShuttleAmount(e.target.value));
                    }}
                    className={`customFormControl`}
                    disabled
                    readOnly
                    style={{ width: "60px" }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3   align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Shuttle Date
                  </Form.Label>
                </Col>

                <div className="d-flex flex-shrink-0 p-0 w-200px">
                  <DateInputField
                    date={shuttleDate}
                    setIsDateValid={(value) => dispatch(setIsShuttleDateValid(value))}
                    reduxSetDate={(value) => dispatch(setShuttleDate(value))}
                    className={`${shuttleDate === "" || !isShuttleDateValid ? "borderRed" : "borderGreen"}`}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="customColFormLabel me-4">Pick Yard</Form.Label>
                </Col>
                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  {/* Pickup Yard Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={pickupYardsData}
                    searchString={pickupYardInput}
                    renderItemId={(yard) => yard.yardPK}
                    renderItemField={(yard) => yard.description}
                    selectedId={pickupYardId}
                    loading={yard1Loading}
                    handleSearchString={(string) => setPickupYardInput(string)}
                    fetchDataBySearchString={fetchPickupYardDetailsByName}
                    onSelect={handlePickupYardSelection}
                    clearInputCallback={() => {
                      dispatch(setPickupYardId(null));
                      dispatch(setWarningMessage(""));
                      dispatch(setShuttleAmount(""));
                    }}
                    className={`${
                      pickupYardId === "" ||
                      pickupYardId === null ||
                      pickupYardInput === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                  />
                  <LookupButton onClick={handlePickupYardLookupModalShow} />
                </Col>
              </Form.Group>
              <Form.Group className="mt-3  form-group  align-items-center row  m-l-0 m-r-0">
                <Col xs={3} sm={3} className="p-0 text-end">
                  <Form.Label className="customColFormLabel me-4">Delivery Yard</Form.Label>
                </Col>

                <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                  {/* Delivery Yard Autocomplete */}
                  <AutoCompleteDropdown
                    arrayList={deliveryYardsData}
                    searchString={deliveryYardInput}
                    renderItemId={(yard) => yard.yardPK}
                    loading={yard2Loading}
                    renderItemField={(yard) => yard.description}
                    selectedId={deliveryYardId}
                    handleSearchString={(string) => setDeliveryYardInput(string)}
                    fetchDataBySearchString={fetchDeliveryYardDetailsByName}
                    onSelect={handleDeliveryYardSelection}
                    clearInputCallback={() => {
                      dispatch(setDeliveryYardId(null));
                      dispatch(setWarningMessage(""));
                      dispatch(setShuttleAmount(""));
                    }}
                    className={`${
                      deliveryYardId === "" ||
                      deliveryYardId === null ||
                      deliveryYardInput === "" ||
                      warningMessage !== ""
                        ? "borderRed"
                        : "borderGreen"
                    }`}
                  />
                  <LookupButton onClick={handleDeliveryYardLookupModalShow} />
                </Col>
              </Form.Group>
              <Form.Group className="my-3  align-items-center row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Row / Position
                  </Form.Label>
                </Col>

                <Col xs={1} md={1} sm={1} className="p-0 w-68px">
                  <input
                    name="row"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={row}
                    onChange={(e) => {
                      // Regex pattern for 4-bit characters (letters and numbers)
                      if (/^[a-zA-Z0-9]{0,4}$/.test(e.target.value)) {
                        dispatch(setRow(e.target.value));
                      } else {
                        // Remove special characters from the input value
                        const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
                        e.target.value = sanitizedValue;
                      }
                    }}
                    className={`customFormControl ${
                      row === "" || row === null ? "borderRed" : "borderGreen"
                    }`}
                    style={{ width: "60px" }}
                  />
                </Col>
                <Col xs={1} md={1} sm={1} className="p-0">
                  <input
                    className="customFormControl"
                    name="position"
                    type="text"
                    maxLength={4}
                    autoComplete="off"
                    aria-autocomplete="list"
                    value={position}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Regex pattern for 4-bit characters (letters and numbers)
                      const regex = /^[a-zA-Z0-9]{0,4}$/;
                      if (regex.test(value)) {
                        dispatch(setPosition(e.target.value));
                      } else {
                        // Remove special characters from the input value
                        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, "");
                        e.target.value = sanitizedValue;
                      }
                    }}
                    style={{ width: "60px" }}
                  />
                </Col>
              </Form.Group>
              <Form.Group className="my-3  row  m-l-0 m-r-0">
                <Col sm={3} md={3} xs={3} className="p-0 text-end">
                  <Form.Label htmlFor="name" className="customColFormLabel me-4">
                    Reason
                  </Form.Label>
                </Col>
                <Col xs={9} md={9} sm={9} className="p-0">
                  <textarea
                    name="reason"
                    id="reason"
                    rows="4"
                    cols="120"
                    value={editReason}
                    onChange={(e) => {
                      dispatch(setEditReason(e.target.value));
                    }}
                    className={` customFormControl h-100 customFocusClass ${
                      !editReason ? "borderRed" : "borderGreen"
                    }`}
                  />
                </Col>
              </Form.Group>
            </Col>
            {/* Pickup Yard Lookup Modal */}
            <YardLookup
              show={pickupYardSelection}
              onHide={hidePickupYardModal}
              renderItemId={(yard) => yard.yardPK}
              handleLookupSelection={handlePickupYardLookupSelection}
              EditShuttle
              selectedCompanyName={companyName}
            />
            {/* Delivery Yard Lookup Modal */}
            <YardLookup
              show={deliveryYardSelection}
              onHide={hideDeliveryYardModal}
              renderItemId={(yard) => yard.yardPK}
              handleLookupSelection={handleDeliveryYardLookupSelection}
              EditShuttle
              selectedCompanyName={companyName}
            />
            <WarningModalPopUp
              show={modalPopup}
              onHide={() => {
                setModalPopUp(false);
              }}
              title={"Error"}
              body={warningMessage}
              handleOK={() => {
                setModalPopUp(false);
              }}
              showOK={true}
              color={"red"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditShuttleYardToYardContent;
