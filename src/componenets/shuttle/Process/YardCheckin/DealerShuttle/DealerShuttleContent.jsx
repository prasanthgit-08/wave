import { formatForApi } from "../../../../../utils/dateUtils";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import DealerShuttleListing from "./DealerShuttleListing";
import DateInputField from "../../../../common/DateInputField";
import {
  setDealerShuttleAmount,
  setDealerShuttleMiles,
  setDealerShuttleDate,
  setAllDealerShuttleData,
  setIsShuttleDateValid,
} from "../../../../../redux/YardCheckinSlice";
import YardService from "../../../../../services/YardService";
import YardCheckinService from "../../../../../services/shuttle/process/YardCheckinService";
import LoadingIcon from "../../../../common/LoadingIcon";

function DealerShuttleContent() {
  //navigate, dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Setting Current Date
  const todayDate = formatForApi(new Date());

  //Local State Declaration
  const [selectedDriverName, setSelectedDriverName] = useState("");
  const [shuttleAmount, setShuttleAmount] = useState("");
  const [miles, setMiles] = useState("");
  const [shuttleDate, setShuttleDate] = useState(todayDate);
  const [yardFK, setYardFK] = useState("");
  const [yardData, setYardData] = useState("");
  const [yardLoading, setYardLoading] = useState(false);

  //Get Value From Redux
  const selectedDriverData = useSelector((state) => state.yardCheckinReducer.selectedDriver);
  const selectedDealerShuttleData = useSelector(
    (state) => state.yardCheckinReducer.selectedDealerShuttleData
  );
  const savedSuccessForDealerShuttle = useSelector(
    (state) => state.yardCheckinReducer.savedSuccessForDealerShuttle
  );
  const isShuttleDateValid = useSelector((state) => state.yardCheckinReducer.isShuttleDateValid);

  //Fetch Yard name by YardFK
  const fetchYardNameByYardFK = () => {
    setYardData("");
    if (yardFK !== "") {
      setYardLoading(true);
      YardService.getYardById(yardFK)
        .then((response) => {
          const data = response;
          setYardData(data.data);
          setYardLoading(false);
        })
        .catch((error) => {
          setYardLoading(false);
        });
    }
  };

  //Fetch Dealer Shuttle Records for the selected driver
  const getDealerShuttleList = () => {
    YardCheckinService.getDealerShuttleList()
      .then((response) => {
        const data = response.data;
        dispatch(setAllDealerShuttleData(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*** UseEffects ***/
  // UseEffect for setting selected Driver Name in local state
  useEffect(() => {
    if (selectedDriverData) {
      const fullName = `${selectedDriverData.firstName ? selectedDriverData.firstName?.trim() : ""} ${
        selectedDriverData.lastName ? selectedDriverData.lastName?.trim() : ""
      }`;
      setSelectedDriverName(fullName?.trim());
    }
  }, [selectedDriverData]);

  // On page refresh navigates to initial page
  useEffect(() => {
    if (selectedDriverData === "") {
      navigate("/yard-checkin-driver-selection");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverData]);

  //Dispatch local state in redux
  useEffect(() => {
    dispatch(setDealerShuttleAmount(shuttleAmount));
    dispatch(setDealerShuttleMiles(miles));
    dispatch(setDealerShuttleDate(shuttleDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuttleAmount, miles, shuttleDate]);

  //useEffect for setting YardFK
  useEffect(() => {
    setYardFK(
      selectedDealerShuttleData?.pickupCustomerPlant != null
        ? ""
        : selectedDealerShuttleData.pickupYardFK != null
          ? selectedDealerShuttleData.pickupYard?.yardPK
          : selectedDealerShuttleData.deliveryYard?.yardPK || ""
    );
  }, [selectedDealerShuttleData]);

  //useEffect for getting yard data by yard fk
  useEffect(() => {
    fetchYardNameByYardFK();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yardFK]);

  //useEffect for setting Shuttle Amount
  useEffect(() => {
    if (selectedDealerShuttleData.flatRated == true) {
      setShuttleAmount(Number(selectedDealerShuttleData.flatRate)?.toFixed(2) || "");
      setMiles(selectedDealerShuttleData.miles);
    } else {
      // Calculate the sum of all rates
      const ratesSum =
        (selectedDealerShuttleData.fuelSurchargeRate || 0) +
        (selectedDealerShuttleData.supplementalRate || 0) +
        (selectedDealerShuttleData.supplementalFuelSurchargeRate || 0) +
        (selectedDealerShuttleData.cdlarate || 0) +
        (selectedDealerShuttleData.lengthRate || 0) +
        (selectedDealerShuttleData.specialRate || 0) +
        (selectedDealerShuttleData.specialFuelSurchargeRate || 0) +
        (selectedDealerShuttleData.additionalRate || 0) +
        (selectedDealerShuttleData.additionalFuelSurchargeRate || 0) +
        (selectedDealerShuttleData.apportionedRate || 0) +
        (selectedDealerShuttleData.baseRate || 0);
      // Multiply the sum by miles
      const totalCost = ratesSum * (selectedDealerShuttleData.payMiles || 0);
      setShuttleAmount(Number(totalCost)?.toFixed(2) || "");
      setMiles(selectedDealerShuttleData.miles);
    }
  }, [selectedDealerShuttleData]);

  useEffect(() => {
    if (savedSuccessForDealerShuttle) {
      navigate("/yard-checkin-unit-selection");
    }
  }, [savedSuccessForDealerShuttle]);

  return (
    <div className="p-2">
      {yardLoading && <LoadingIcon />}
      <div className="shadow-sm rounded border halfScreenFormContentHeight p-2">
        <div className="col-6">
          <Form.Group className=" mt-3 mb-3 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0 text-start">
              <Form.Label htmlFor="name" className="col-form-label me-4">
                Driver
              </Form.Label>
            </Col>

            <Col xs={4} md={4} sm={4} className="p-0">
              <input
                className="customFormControl"
                name="selectedDriverName"
                value={selectedDriverName}
                disabled
              />
            </Col>
          </Form.Group>
        </div>

        {/* Dispatch Browse List */}
        <div className="" style={{ height: "200px", overflowY: "auto" }}>
          <DealerShuttleListing />
        </div>

        {/* Pickup */}
        <div className="d-flex">
          <div className="col-4">
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Pickup
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  name="pickupLocation"
                  value={
                    selectedDealerShuttleData.pickupCustomerPlant != null
                      ? selectedDealerShuttleData.pickupCustomerPlant?.name
                      : selectedDealerShuttleData.pickupYardFK != null
                        ? selectedDealerShuttleData.unitId?.pickupCustomerPlantFK?.name
                        : selectedDealerShuttleData.pickupDealer != null
                          ? selectedDealerShuttleData.pickupDealer?.name?.trim()
                          : selectedDealerShuttleData.pickupUnitAddress != null
                            ? selectedDealerShuttleData.pickupUnitAddress?.name?.trim()
                            : ""
                  }
                  disabled
                />
              </Col>
            </Form.Group>
            {/* Pickup State, City */}
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label visibility-hidden me-4"></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                <input
                  className="customFormControl"
                  name="pickupCity"
                  value={
                    selectedDealerShuttleData.pickupCustomerPlant != null
                      ? selectedDealerShuttleData.pickupCustomerPlant?.city
                      : selectedDealerShuttleData.pickupYardFK != null
                        ? selectedDealerShuttleData.unitId?.pickupCustomerPlantFK?.city
                        : selectedDealerShuttleData.pickupDealer != null
                          ? selectedDealerShuttleData.pickupDealer?.city?.trim()
                          : selectedDealerShuttleData.pickupUnitAddress != null
                            ? selectedDealerShuttleData.pickupUnitAddress?.city?.trim()
                            : ""
                  }
                  disabled
                />

                <input
                  type="text"
                  className="ms-2  customFormControl"
                  style={{ width: "30px" }}
                  name="pickupState"
                  value={
                    selectedDealerShuttleData.pickupCustomerPlant != null
                      ? selectedDealerShuttleData.pickupCustomerPlant?.stateCode
                      : selectedDealerShuttleData.pickupYardFK != null
                        ? selectedDealerShuttleData.unitId?.pickupCustomerPlantFK?.stateCode
                        : selectedDealerShuttleData.pickupDealer != null
                          ? selectedDealerShuttleData.pickupDealer?.stateCode?.trim()
                          : selectedDealerShuttleData.pickupUnitAddress != null
                            ? selectedDealerShuttleData.pickupUnitAddress?.stateCode?.trim()
                            : ""
                  }
                  disabled
                />
              </Col>
            </Form.Group>
          </div>

          {/* Yard */}
          <div className="col-4">
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Yard
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input className="customFormControl" name="yardName" disabled value={yardData?.name || ""} />
              </Col>
            </Form.Group>

            {/* Yard State, City */}
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label visibility-hidden me-4"></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                <input className="customFormControl" name="YardCity" disabled value={yardData?.city || ""} />

                <input
                  type="text"
                  className="ms-2  customFormControl"
                  style={{ width: "30px" }}
                  name="YardState"
                  disabled
                  value={yardData?.stateCode || ""}
                />
              </Col>
            </Form.Group>
          </div>

          {/* Delivery Location */}
          <div className="col-4">
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Delivery
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  name="deliveryLocation"
                  value={
                    selectedDealerShuttleData.deliveryCustomerPlant?.name ||
                    selectedDealerShuttleData.deliveryDealer?.name ||
                    selectedDealerShuttleData.deliveryUnitAddress?.name ||
                    ""
                  }
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Delivery State, City */}
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label visibility-hidden me-4"></Form.Label>
              </Col>

              <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                <input
                  className="customFormControl"
                  name="deliveryCity"
                  value={
                    selectedDealerShuttleData.deliveryCustomerPlant?.city ||
                    selectedDealerShuttleData.deliveryDealer?.city ||
                    selectedDealerShuttleData.deliveryUnitAddress?.city ||
                    ""
                  }
                  disabled
                />

                <input
                  type="text"
                  className="ms-2  customFormControl"
                  style={{ width: "30px" }}
                  name="deliveryState"
                  value={
                    selectedDealerShuttleData.deliveryCustomerPlant?.stateCode ||
                    selectedDealerShuttleData.deliveryDealer?.stateCode ||
                    selectedDealerShuttleData.deliveryUnitAddress?.stateCode ||
                    ""
                  }
                  disabled
                />
              </Col>
            </Form.Group>
          </div>
        </div>

        {/* Unit Number */}
        <div className="d-flex mt-5">
          <div className="col-4">
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Unit Number
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  name="unitNumber"
                  value={selectedDealerShuttleData.unitId?.unitNumber || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Unit Type */}
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Unit Type
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  name="unitType"
                  value={selectedDealerShuttleData.unitId?.unitTypeFK?.descriptionLong?.trim() || ""}
                  disabled
                />
              </Col>
            </Form.Group>

            {/* Special Code */}
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Special Code
                </Form.Label>
              </Col>

              <Col xs={5} md={5} sm={5} className="p-0">
                <input
                  className="customFormControl"
                  name="specialCode"
                  value={selectedDealerShuttleData.unitId?.specialCodeFK?.description || ""}
                  disabled
                />
              </Col>
            </Form.Group>
          </div>

          {/* Shuttle Amount */}
          <div className="col-4">
            <Form.Group className=" mt-4 mb-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label ">
                  Shuttle Amount
                </Form.Label>
              </Col>

              <Col xs={1} md={1} sm={1} className="p-0" style={{ width: "65px" }}>
                <input
                  className={"customFormControl"}
                  name="shuttleAmount"
                  type="text"
                  maxLength={8}
                  autoComplete="off"
                  aria-autocomplete="list"
                  disabled
                  value={shuttleAmount === "NaN" ? "" : shuttleAmount}
                  onChange={(e) => {
                    e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && setShuttleAmount(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            {/* Shuttle Date */}
            <Form.Group className="margin-box-1 m-t-5 m-b-10 align-items-center row tabs-row m-l-0 m-r-0">
              <Col sm={3} md={3} xs={3} className="p-0 text-start">
                <Form.Label htmlFor="name" className="col-form-label me-4">
                  Shuttle Date
                </Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "100px" }}>
                <DateInputField
                  date={shuttleDate}
                  setIsDateValid={(value) => dispatch(setIsShuttleDateValid(value))}
                  name="shuttleDate"
                  setDate={setShuttleDate}
                  className={`customFormControl ${
                    shuttleDate === "" || !isShuttleDateValid ? "borderRed" : "borderGreen"
                  }`}
                />
              </Col>
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealerShuttleContent;
