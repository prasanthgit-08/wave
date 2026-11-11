import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";

import DriverServicesService from "../../../../../../services/DriverServicesService";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import {
  setIsEquipmentTabValid,
  setTrailerDriverId,
  setTrailerSearch,
  setTruckDriverId,
  setTruckId,
  setTruckSearch,
} from "../../../../../../redux/DriverServiceSlice";
import { useDispatch, useSelector } from "react-redux";

function EquipmentTab() {
  const { driverId } = useParams();
  const dispatch = useDispatch();

  const { truckSearch, trailerSearch, truckDriverId, trailerDriverId } = useSelector(
    (state) => state.driverServicesSlice
  );

  //truck states
  const [truckDropdownData, setTruckDropdownData] = useState([]);

  const [truckDriverDetails, setTruckDriverDetails] = useState(null);
  // trailer states

  const [trailerDropdownData, setTrailerDropdownData] = useState([]);
  const [trailerDriverDetails, setTrailerDriverDetails] = useState(null);
  const [truckLoading, setTruckLoading] = useState(false);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTruckDrivers = (truckSearch) => {
    setTruckLoading(true);
    DriverServicesService.getDriverTrucks(truckSearch, driverId)
      .then((res) => {
        setTruckLoading(false);
        setTruckDropdownData(res.data.content);
      })
      .catch((err) => {
        setTruckLoading(false);
        console.log(err);
      });
  };

  const fetchTrailerDrivers = (trailerSearch) => {
    setTrailerLoading(true);
    DriverServicesService.getDriverTrailers(trailerSearch, driverId)
      .then((res) => {
        setTrailerLoading(false);
        setTrailerDropdownData(res.data.content);
      })
      .catch((err) => {
        setTrailerLoading(false);

        console.log(err);
      });
  };

  const selectTruckFunction = (driver) => {
    dispatch(setTruckDriverId(driver.driverTruckPK));
    dispatch(setTruckSearch(driver.vin));
  };

  const selectTrailerFunction = (driver) => {
    dispatch(setTrailerDriverId(driver.driverTrailerPK));
    dispatch(setTrailerSearch(driver.vin));
  };

  useEffect(() => {
    if (truckDriverId) {
      setLoading(true);
      DriverServicesService.getDriverTruckDetails(truckDriverId)
        .then((res) => {
          setTruckDriverDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [truckDriverId]);

  useEffect(() => {
    if (trailerDriverId) {
      setLoading(true);
      DriverServicesService.getDriverTrailerDetails(trailerDriverId)
        .then((res) => {
          setTrailerDriverDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [trailerDriverId]);

  useEffect(() => {
    if (!truckSearch || !truckDriverId) {
      setTruckDriverId(null);
      setTruckDriverDetails({
        coDriver: "",
        driverTruckPK: "",
        gvwr: "",
        licenseNumber: "",
        licenseState: "",
        licenseWeight: "",
        make: "",
        model: "",
        scaleWeight: "",
        truckCode: "",
        truckOwner: "",
        truckType: "",
        vin: "",
        year: "",
      });
    }
  }, [truckSearch, truckDriverId]);

  useEffect(() => {
    if (!trailerSearch || !trailerDriverId) {
      setTrailerDriverId(null);
      setTrailerDriverDetails({
        coDriver: "",
        driverTrailerPK: "",
        gvwr: "",
        licenseNumber: "",
        licenseState: "",
        licenseWeight: "",
        make: "",
        model: "",
        scaleWeight: "",
        deckLength: "",
        trailerOwner: "",
        deckType: "",
        vin: "",
        year: "",
      });
    }
  }, [trailerSearch, trailerDriverId]);

  // Equipment Tab Validation
  useEffect(() => {
    if ((truckDriverId || !truckSearch) && (trailerDriverId || !trailerSearch)) {
      dispatch(setIsEquipmentTabValid(true));
    } else {
      dispatch(setIsEquipmentTabValid(false));
    }
  }, [truckDriverId, truckSearch, trailerDriverId, trailerSearch]);

  return (
    <div className="DriverServiceSettingHeight">
      <div className="d-flex p-2">
        <Col xs={5}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Truck
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <AutoCompleteDropdown
                arrayList={truckDropdownData}
                searchString={truckSearch}
                fetchDataBySearchString={fetchTruckDrivers}
                handleSearchString={(string) => dispatch(setTruckSearch(string))}
                renderItemId={(driver) => driver.driverTruckPK}
                renderItemField={(driver) => driver.vin}
                onSelect={selectTruckFunction}
                className={`${!truckSearch || truckDriverId ? "" : "borderRed"}`}
                clearInputCallback={() => dispatch(setTruckDriverId(null))}

                loading={truckLoading}
                selectedId={truckDriverId}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Co Driver
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.coDriver}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Truck Owner
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.truckCode}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Make
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.make}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Model
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.model}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Year
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.year}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Truck Type
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={truckDriverDetails?.truckType}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Truck Code
              </Form.Label>
            </Col>

            <div className="p-0 w-35px">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.truckCode}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                VIN
              </Form.Label>
            </Col>

            <Col xs={3} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={truckDriverDetails?.vin}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                GVWR
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={truckDriverDetails?.gvwr}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Scale Weight
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.scaleWeight}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                License Number
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                disabled
                aria-autocomplete="list"
                value={truckDriverDetails?.licenseNumber}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                License State
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                disabled
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={truckDriverDetails?.licenseState}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                License Weight
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                disabled
                aria-autocomplete="list"
                value={truckDriverDetails?.licenseWeight}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col xs={5}>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Trailer
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <AutoCompleteDropdown
                arrayList={trailerDropdownData}
                searchString={trailerSearch}
                fetchDataBySearchString={fetchTrailerDrivers}
                handleSearchString={(string) => dispatch(setTrailerSearch(string))}
                renderItemId={(driver) => driver.driverTrailerPK}
                renderItemField={(driver) => driver.vin}
                onSelect={selectTrailerFunction}
                // className={`${trailerDriverId || !trailerSearch ? "" : "borderRed"}`}
                className={`customFormControl ${!trailerDriverId && trailerSearch ? "borderRed" : ""}
               `}
                loading={trailerLoading}
                clearInputCallback={() => {
                  dispatch(setTrailerDriverId(null));
                }}
                selectedId={trailerDriverId}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Co Driver
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.coDriver}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Trailer Owner
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.trailerOwner}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Make
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.make}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Model
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                disabled
                aria-autocomplete="list"
                value={trailerDriverDetails?.model}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Year
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                disabled
                aria-autocomplete="list"
                value={trailerDriverDetails?.year}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Deck Type
              </Form.Label>
            </Col>

            <Col xs={5} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.deckType}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Deck Length
              </Form.Label>
            </Col>

            <div className="p-0 w-35px">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.deckLength}
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                VIN
              </Form.Label>
            </Col>

            <Col xs={3} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                disabled
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.vin}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                GVWR
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                disabled
                aria-autocomplete="list"
                value={trailerDriverDetails?.gvwr}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                Scale Weight
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                disabled
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.scaleWeight}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                License Number
              </Form.Label>
            </Col>

            <Col xs={2} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
                value={trailerDriverDetails?.licenseNumber}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                License State
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                aria-autocomplete="list"
                disabled
                value={trailerDriverDetails?.licenseState}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
            <Col sm={3} md={3} xs={3} className="p-0">
              <Form.Label htmlFor="name" className="col-form-label dealer-label">
                License Weight
              </Form.Label>
            </Col>

            <Col xs={1} className="p-0">
              <input
                className="form-controlDriverService"
                type="search"
                maxLength={30}
                autoComplete="off"
                disabled
                aria-autocomplete="list"
                value={trailerDriverDetails?.licenseWeight}
              />
            </Col>
          </Form.Group>
        </Col>
        {loading && (
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
}

export default EquipmentTab;
