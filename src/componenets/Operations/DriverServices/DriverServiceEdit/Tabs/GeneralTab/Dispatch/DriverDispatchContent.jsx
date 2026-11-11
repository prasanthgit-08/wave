import React from "react";
import { Radio, RadioGroup } from "react-radio-group";
import { Col, Form } from "react-bootstrap";
import DispatchFooter from "./DriverDispatchFooter";
import DispatchHeader from "./DriverDispatchHeader";
import DispatchesService from "../../../../../../../services/DispatchesService";
import { useDispatch, useSelector } from "react-redux";
import {
  setDivisionStatus,
  setDriverData,
  setDriverFK,
  setDriverTrailerData,
  setDriverTruckData,
  setFlatBedVisible,
  setRequiredFlatBed,
  setRigionStatus,
  setValidFlatbedTrailer,
  setValidFlatbedTruck,
} from "../../../../../../../redux/DispatchesSlice";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../../../../../common/LoadingIcon";

function DispatchContent() {
  const { driverId } = useParams();

  const dispatch = useDispatch();
  //-----------------------------------------LOCAL STATES---------------------------------------------
  const [isDriveAwayVisible, setIsDriveAwayVisible] = useState(false);
  const [isTowAwayVisible, setIsTowAwayVisible] = useState(false);
  const [isFlatbedVisible, setIsFlatbedVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [isTruckCamperVisible, setIsTruckCamperVisible] = useState(false);
  //------------------------------------------------------------REDUX STATE-------------------------------
  const driverFK = useSelector((state) => state.dispatchesReducer.driverFK);
  const driverData = useSelector((state) => state.dispatchesReducer.driverData);
  const driverTrailerData = useSelector((state) => state.dispatchesReducer.driverTrailerData);

  const driverTruckData = useSelector((state) => state.dispatchesReducer.driverTruckData);
  const regionStatus = useSelector((state) => state.dispatchesReducer.regionStatus);
  const divisionStatus = useSelector((state) => state.dispatchesReducer.divisionStatus);
  const [loading, setLoading] = useState(true);

  localStorage.setItem("regionStatus", regionStatus);

  //------------------------------------------API FUNCTIONS-----------------------------------------------

  const driverDataList = () => {
    DispatchesService.getAllDrivers(driverId)
      .then((response) => {
        setLoading(false);
        const { data } = response;
        if (data !== null) {
          dispatch(setDriverData(data));
          setIsDriveAwayVisible(data.motorized);
          setIsTowAwayVisible(data.towable);
          setIsFlatbedVisible(data.flatbed);

          dispatch(setFlatBedVisible(data.flatbed));
          setIsPopupVisible(data.popup);
          setIsTruckCamperVisible(data.truckCamper);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleSecondRadioGroupOnChange = (value) => {
    dispatch(setRigionStatus(value));
    localStorage.setItem("regionStatus", value);
  };

  const handleDivisionRadioGroupOnChange = (value) => {
    dispatch(setDivisionStatus(value));
    if (value == "driveaway") {
      dispatch(setRequiredFlatBed(false));
    }
    localStorage.setItem("divisionStatus", value);
  };

  //------------------------------------USE EFFECTS------------------------------------------------------
  useEffect(() => {
    driverDataList();
  }, [driverId]);

  useEffect(() => {
    dispatch(setDriverFK(driverId));
  }, [driverId]);

  useEffect(() => {
    if (isDriveAwayVisible && !isTowAwayVisible) {
      dispatch(setDivisionStatus("driveaway"));
    } else if (!isDriveAwayVisible && isTowAwayVisible) {
      dispatch(setDivisionStatus("towaway"));
    }
  }, [isDriveAwayVisible, isFlatbedVisible, isPopupVisible, isTowAwayVisible, isTruckCamperVisible]);

  return (
    <div className="customMaintenanceFormWidthContainer  threeFourthScreenWidth ">
      <div
        className="add-form-component customMaintenanceFormWidth border border-dark border-2 "
        style={{ margin: "1px" }}
      >
        <DispatchHeader />
        <div className="p-2">
          <div className="shadow-sm rounded border threeFourthScreenFormContentHeight p-2">
            <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0 ">
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Division
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup
                  name="Division Status"
                  className="d-flex"
                  selectedValue={divisionStatus}
                  onChange={handleDivisionRadioGroupOnChange}
                >
                  {isDriveAwayVisible && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="driveaway" checked={divisionStatus == "driveaway"} />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Driveaway
                      </label>
                    </div>
                  )}
                  {isTowAwayVisible && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="towaway" checked={divisionStatus == "towaway"} />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Towaway
                      </label>
                    </div>
                  )}
                  {isFlatbedVisible && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="flatbed" checked={divisionStatus == "flatbed"} />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Flatbed
                      </label>
                    </div>
                  )}

                  {isPopupVisible && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="popup" checked={divisionStatus == "popup"} />
                      <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                        Popup
                      </label>
                    </div>
                  )}

                  {isTruckCamperVisible && (
                    <div className={`d-flex align-items-center me-4 m-b-5 `}>
                      <Radio value="truckCamper" checked={divisionStatus == "truckCamper"} />
                      <label className="f-w-600 m-l-5">Truck Camper</label>
                    </div>
                  )}
                </RadioGroup>
              </Col>
            </Form.Group>

            <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0" style={{ width: "170px" }}>
                <Form.Label htmlFor="name" className="col-form-label dealer-label p-l-15">
                  Region
                </Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <RadioGroup
                  name="regionStatus"
                  className="d-flex"
                  selectedvalue={regionStatus}
                  onChange={handleSecondRadioGroupOnChange}
                >
                  <div className="d-flex align-items-center me-4 m-b-5">
                    <Radio value="outbound" checked={regionStatus === "outbound"} />
                    <label className="f-w-600 m-l-5" style={{ width: "57px" }}>
                      Outbound
                    </label>
                  </div>
                  <div className="d-flex align-items-center me-4 m-b-5" style={{ marginRight: "5px" }}>
                    <Radio value="reload" checked={regionStatus === "reload"} style={{ marginLeft: "3px" }} />
                    <label className="f-w-600 m-l-5" style={{ width: "60px" }}>
                      Reload
                    </label>
                  </div>
                </RadioGroup>
              </Col>
            </Form.Group>
          </div>
        </div>
        <DispatchFooter />
        {loading ? <LoadingIcon /> : ""}
      </div>
    </div>
  );
}

export default DispatchContent;
