import * as yup from "yup";
import React, { useEffect, useState } from "react";

import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setDriverTruckData, setIsLeaseTabValid } from "../../../../../redux/DriverTrucksSlice";
import LookupButton from "../../../../common/LookupButton";

import ReservesService from "../../../../../services/ReservesService";
import DriverService from "../../../../../services/DriverService";
import DriverServicesService from "../../../../../services/DriverServicesService";
import { Formik } from "formik";
import CheckPayToLookup from "../../../../LookupScreens/CheckPayTo/CheckPayToLookup";
import CheckPayToService from "../../../../../services/CheckPayToService";
import DriverLookup from "../../../../LookupScreens/Driver/DriverLookup";
import ReservesLookup from "../../../../LookupScreens/Reserves/ReservesLookup";
import { useParams } from "react-router-dom";
import PostalCodeComponent from "../../../../common/PostalCodeComponent";
import { cleanFirstChar } from "../../../../../utils/utils";
import LoadingIcon from "../../../../common/LoadingIcon";
import Input from "../../../../../components/common/input";

const Lease = () => {
  const dispatch = useDispatch();
  const { driverId, recordId } = useParams();
  const id = recordId;
  const [leased, setLeased] = useState(false);
  const [allpaytoowner, setAllPayToOwner] = useState(false);
  const [splitpaywithowner, setSplitPayWithOwner] = useState(false);
  const [splitpaypercentage, setSplitPayPercentage] = useState("");
  const [splitpaymileage, setSplitPayMileage] = useState("");
  const [drivernotowner, setDriverNotOwner] = useState(false);
  const [poaonfile, setPoaOnFile] = useState(false);
  const [ownersname, setOwnersName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [leaseReserve, setLeaseReserve] = useState([]);
  const [leaseReserveFK, setLeaseReserveFK] = useState();
  const [reserveInput, setReserveInput] = useState("");

  const [owner, setOwner] = useState([]);
  const [ownerFk, setOwnerFk] = useState();
  const [ownerInput, setOwnerInput] = useState("");

  const [driverSelection, setDriverSelection] = useState(false);

  const [leaseCheckToPay, setLeaseCheckToPay] = useState([]);
  const [leaseCheckPayToFK, setLeaseCheckPayToFK] = useState();
  const [checkPayToInput, setCheckPayToInput] = useState("");

  const [checkPaySelection, setCheckPaySelection] = useState(false);
  const [leaseReserveSelection, setLeaseReserveSelection] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const driverTruckModalHide = () => {
    setDriverSelection(false);
  };

  const viewDetails = useSelector((state) => state.driverTrucks.viewDetails);

  const [zip, setZip] = useState("");

  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [zipIdChcek, setZipIdChcek] = useState("");
  const [leaseReserveLoading, setLeaseReserveLoading] = useState(false);

  const [checkPayLoading, setCheckPayLoading] = useState(false);

  const [ownerLoading, setOwnerLoading] = useState(false);

  const formData = useSelector((state) => state.driverTrucks.formData);

  const onCancel = useSelector((state) => state.driverTrucks.onCancel);
  const isTabIdentification = useSelector((state) => state.driverTrucks.isTabIdentification);

  const [leaseTabInitialized, setLeaseTabInitialized] = useState(false);

  const leaseTabData = () => {
    dispatch(
      setDriverTruckData({
        leased: leased,

        leaseCheckPayId: leaseCheckPayToFK,
        leaseReserveId: leaseReserveFK,

        allPayToOwner: allpaytoowner,

        splitPayWithOwner: splitpaywithowner,
        splitPayPercentage: splitpaypercentage,
        splitPayMileage: splitpaymileage,
        driverNotOwner: drivernotowner,
        poaOnFile: poaonfile,
        name: ownersname,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: state,

        postalCode: zip,
        ownerDriverId: ownerFk,
      })
    );
  };

  useEffect(() => {
    leaseTabData();
  }, [
    leased,
    leaseReserve,
    leaseReserveFK,
    allpaytoowner,
    ownerFk,
    splitpaywithowner,
    splitpaypercentage,
    splitpaymileage,
    drivernotowner,
    poaonfile,
    ownersname,
    address1,
    address2,
    city,
    state,
    zip,
    leaseCheckPayToFK,
  ]);

  useEffect(() => {
    setLeased(formData?.leased || false);
    setAllPayToOwner(formData?.allPayToOwner || false);
    setSplitPayWithOwner(formData?.splitPayWithOwner || false);
    setSplitPayPercentage(formData?.splitPayPercentage || "");
    setSplitPayMileage(formData?.splitPayMileage || "");
    setDriverNotOwner(formData?.driverNotOwner || false);
    setPoaOnFile(formData?.poaOnFile || false);
    setOwnersName(formData?.name || "");
    setAddress1(formData?.address1 || "");
    setAddress2(formData?.address2 || "");
    setCity(formData?.city || "");
    setState(formData?.stateCode?.trim() || "");
    setZip(formData?.postalCode || "");
    setOwnerInput(formData?.truckOwner || "");
    setLeaseCheckPayToFK(formData?.leaseCheckPayId || null);
    fetchCheckPayToInput(formData?.leaseCheckPayId);
    setOwnerFk(formData?.ownerDriverId || null);
    fetchOwnerDriverInput(formData?.ownerDriverId);
    fetchReserveInput(formData?.leaseReserveId);
    setPostalCodePK(formData?.postalCodePK ? formData?.postalCodePK : null);

    setLeaseTabInitialized(true);
  }, [formData]);

  useEffect(() => {
    if (!leaseTabInitialized) return;

    if (leased && leaseReserveFK && leaseCheckPayToFK) {
      dispatch(setIsLeaseTabValid(true));
    } else if (leased && allpaytoowner && ownerFk) {
      dispatch(setIsLeaseTabValid(true));
    } else if (leased && splitpaywithowner && ownerFk && (splitpaymileage || splitpaypercentage)) {
      dispatch(setIsLeaseTabValid(true));
    } else if (!leased && !drivernotowner) {
      dispatch(setIsLeaseTabValid(null));
    } else if (drivernotowner && ownersname && address1 && postalCodePK) {
      dispatch(setIsLeaseTabValid(true));
    } else {
      dispatch(setIsLeaseTabValid(false));
    }
  }, [
    leased,
    leaseReserveFK,
    leaseCheckPayToFK,
    splitpaymileage,
    splitpaypercentage,
    splitpaywithowner,
    ownerFk,
    allpaytoowner,
    drivernotowner,
    ownersname,
    address1,
    city,
    state,
    zip,
    zipPostLenght,
    postalCodeOnChange,
    postalCodePK,
    leaseTabInitialized,
  ]);

  const fetchLeaseReserveByName = (string) => {
    if (isTabIdentification === "lease") {
      setLeaseReserveLoading(true);
      ReservesService.getReserveTypeAuto(string, true, false, false)
        .then(({ data }) => {
          setLeaseReserve(data.content);
        })

        .finally(() => {
          setLeaseReserveLoading(false);
        });
    }
  };

  const fetchOwnerByName = (string) => {
    if (isTabIdentification === "lease") {
      setOwnerLoading(true);
      DriverService.getDriverForAuto(string, true, driverId)
        .then(({ data }) => {
          setOwner(data.content);
        })

        .finally(() => {
          setOwnerLoading(false);
        });
    }
  };

  const fetchOwnerDriverInput = (id) => {
    if (id) {
      setLoading3(true);
      DriverServicesService.getDriverDetails(id)
        .then((response) => {
          const data = response.data;
          setOwnerFk(data.driverPK);
          setOwnerInput(data.name?.trim());
        })
        .catch((err) => {
          console.log(err);
          setLoading3(false);
        })
        .finally(() => {
          setLoading3(false);
        });
    } else {
      setOwnerInput("");
    }
  };

  const handleCheckPayToLookupSelection = (checkPayTo) => {
    if (checkPayTo) {
      setLeaseCheckPayToFK(checkPayTo.id);
      setCheckPayToInput(checkPayTo.description);
    }
  };

  const fetchCheckPayToByName = (string) => {
    if (isTabIdentification === "lease") {
      setCheckPayLoading(true);
      CheckPayToService.fetchCheckPayToAutoComplete(string)
        .then(({ data }) => {
          setLeaseCheckToPay(data.content);
        })

        .finally(() => {
          setCheckPayLoading(false);
        });
    }
  };

  const handleOwnerToLookupSelection = (truckOwner) => {
    if (truckOwner) {
      setOwnerFk(truckOwner.driverPK);
      if (truckOwner.lastName != null) {
        setOwnerInput((truckOwner.firstName + " " + truckOwner.lastName)?.trim());
      } else {
        setOwnerInput(truckOwner.firstName?.trim());
      }
    }
  };

  const handleLeaseReserveToLookupSelection = (lease) => {
    setLeaseReserveFK(lease.id);
    setReserveInput(lease.description);
  };

  const checkToPayModalHide = () => {
    setCheckPaySelection(false);
  };

  const checkToPayLookupSelection = (data) => {
    setCheckPayToInput(data.description);
    setLeaseCheckPayToFK(data.id);
    setCheckPaySelection(false);
  };

  const fetchCheckPayToInput = (id) => {
    if (id) {
      CheckPayToService.getCheckPayToById(id)
        .then((response) => {
          const data = response.data;
          setCheckPayToInput(data.description?.trim());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCheckPayToInput("");
    }
  };

  const fetchReserveInput = (id) => {
    if (id) {
      ReservesService.getReservesDataById(id)
        .then((response) => {
          const data = response.data;
          setReserveInput(data.description?.trim());
          setLeaseReserveFK(data.reservePK);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setReserveInput("");
    }
  };

  const leaseReserveModalHide = () => {
    setLeaseReserveSelection(false);
  };

  const leaseReserveLookUpSelection = (data) => {
    setLeaseReserveFK(data.id);
    setReserveInput(data.description);
    setLeaseReserveSelection(false);
  };

  const driverModalHide = () => {
    setDriverSelection(false);
  };

  const driverLookupSelection = (data) => {
    if (data.lastName != null) {
      setOwnerInput((data.firstName + " " + data.lastName)?.trim());
    } else {
      setOwnerInput(data.firstName?.trim());
    }
    setOwnerFk(data.driverPK);
    setDriverSelection(false);
  };

  /***for setting decimal value for split pay mileage***/
  const isDecimals = (splitpaymileage) => {
    if (!splitpaymileage) return splitpaymileage;
    const number = splitpaymileage.replace(/[^\d:.]/g, "");

    if (splitpaymileage) return number;
  };

  useEffect(() => {
    if (leased && leaseReserveFK && leaseCheckPayToFK) {
      dispatch(setIsLeaseTabValid(true));
    } else if (leased && allpaytoowner && ownerFk) {
      dispatch(setIsLeaseTabValid(true));
    } else if (leased && splitpaywithowner && ownerFk && (splitpaymileage || splitpaypercentage)) {
      dispatch(setIsLeaseTabValid(true));
    } else if (!leased && !drivernotowner) {
      dispatch(setIsLeaseTabValid(null));
    } else if (drivernotowner && ownersname && address1 && postalCodePK) {
      dispatch(setIsLeaseTabValid(true));
    } else {
      dispatch(setIsLeaseTabValid(false));
    }
  }, [
    leased,
    leaseReserveFK,
    leaseCheckPayToFK,
    splitpaymileage,
    splitpaypercentage,
    splitpaywithowner,
    ownerFk,
    allpaytoowner,
    drivernotowner,
    ownersname,
    address1,
    city,
    state,
    zip,
    zipPostLenght,
    postalCodeOnChange,
    postalCodePK,
  ]);

  useEffect(() => {
    if (!leased) {
      setLeaseReserveFK("");
      setReserveInput("");
      setLeaseCheckPayToFK("");
      setCheckPayToInput("");
      setAllPayToOwner(false);
      setSplitPayWithOwner(false);
      setOwnerFk("");
      setOwnerInput("");
      setSplitPayPercentage("");
      setSplitPayMileage("");
      setOwner("");
    }
  }, [leased]);

  useEffect(() => {
    if (!drivernotowner) {
      setPoaOnFile(false);
      setOwnersName("");
      setAddress1("");
      setAddress2("");
      setZipIdChcek("postalCodeId");
      setZip("");
      setCity("");
      setState("");
      setZipIdChcek(undefined);
      setPostalCodePK(null);
    }
  }, [drivernotowner]);

  useEffect(() => {
    if (!allpaytoowner && !splitpaywithowner) {
      setOwnerFk("");
      setOwnerInput("");
    } else {
      setReserveInput("");
      setCheckPayToInput("");
    }
  }, [allpaytoowner, splitpaywithowner]);

  useEffect(() => {
    if (!splitpaywithowner) {
      setSplitPayPercentage("");
      setSplitPayMileage("");
    }
  }, [splitpaywithowner]);

  const handleMouseEventMain = (e) => {
    setZipIdChcek(e.target.dataset.id);
  };

  const validationSchema = yup.object({
    city: yup.string().required(),
    state: yup.string().max(2).min(2).required(),
    zip: yup.string().required(),
  });

  return (
    <div onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
      <Formik
        initialValues={{
          zip,
          state,
          city,
        }}
        validationSchema={validationSchema}
        validateOnMount
        enableReinitialize={true}
        initialTouched={{
          city: true,
          state: true,
          zip: true,
        }}
      >
        {(formik) => (
          <Form>
            <div className="p-0 w-100">
              {loading3 && <LoadingIcon />}
              <Row className="m-0 p-0 ">
                <Col xs={6} style={{ minWidth: "450px" }}>
                  <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Leased</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 `}
                        checked={leased}
                        onChange={(e) => {
                          setLeased(e.target.checked);
                        }}
                        disabled={viewDetails || drivernotowner}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Lease Reserve</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={leaseReserve}
                        searchString={reserveInput}
                        customFormatSearchString={(searchString) => searchString}
                        renderItemId={(lease) => lease.id}
                        renderItemField={(lease) => lease.description}
                        handleSearchString={(string) => setReserveInput(string)}
                        fetchDataBySearchString={fetchLeaseReserveByName}
                        onSelect={handleLeaseReserveToLookupSelection}
                        clearInputCallback={() => {
                          setLeaseReserveFK(null);
                        }}
                        selectedId={leaseReserveFK}
                        loading={leaseReserveLoading}
                        className={`
                      ${
                        !viewDetails && !allpaytoowner && !splitpaywithowner && leased
                          ? !leaseReserveFK
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                        disabled={viewDetails || allpaytoowner || splitpaywithowner || !leased}
                      />
                      <LookupButton
                        onClick={() => {
                          setLeaseReserveSelection(true);
                        }}
                        disabled={viewDetails || allpaytoowner || splitpaywithowner || !leased}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" form-group align-items-center row m-l-0 m-r-0 mt-3">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Lease Check Pay To</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={leaseCheckToPay}
                        searchString={checkPayToInput}
                        customFormatSearchString={(searchString) => searchString}
                        renderItemId={(checkPayTo) => checkPayTo.id}
                        renderItemField={(checkPayTo) => checkPayTo.description}
                        handleSearchString={(string) => setCheckPayToInput(string)}
                        fetchDataBySearchString={fetchCheckPayToByName}
                        onSelect={handleCheckPayToLookupSelection}
                        clearInputCallback={() => {
                          setLeaseCheckPayToFK(null);
                        }}
                        selectedId={leaseCheckPayToFK}
                        loading={checkPayLoading}
                        disabled={viewDetails || allpaytoowner || splitpaywithowner || !leased}
                        className={` 
                      ${
                        !viewDetails && !allpaytoowner && !splitpaywithowner && leased
                          ? !leaseCheckPayToFK
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      />
                      <LookupButton
                        onClick={() => {
                          setCheckPaySelection(true);
                        }}
                        disabled={viewDetails || allpaytoowner || splitpaywithowner || !leased}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-5">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>All Pay To Owner</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        type="checkbox"
                        checked={allpaytoowner}
                        className={`form-check-input
                        ${
                          !viewDetails
                            ? leased &&
                              !leaseReserveFK &&
                              !leaseCheckPayToFK &&
                              !allpaytoowner &&
                              !splitpaywithowner
                              ? "borderRed"
                              : ""
                            : ""
                        }
                      `}
                        onChange={(e) => {
                          setAllPayToOwner(e.target.checked);

                          setLeaseReserve(null);
                          setCheckPayToInput(null);
                          setSplitPayPercentage("");
                          setSplitPayMileage("");
                        }}
                        disabled={
                          viewDetails || !leased || leaseReserveFK || leaseCheckPayToFK || splitpaywithowner
                        }
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Split Pay With Owner</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <input
                        type="checkbox"
                        checked={splitpaywithowner}
                        className={`form-check-input
                      ${
                        !viewDetails
                          ? leased &&
                            !leaseReserveFK &&
                            !leaseCheckPayToFK &&
                            !allpaytoowner &&
                            !splitpaywithowner
                            ? "borderRed"
                            : ""
                          : ""
                      }
                    `}
                        onChange={(e) => {
                          setSplitPayWithOwner(e.target.checked);
                        }}
                        disabled={
                          viewDetails || !leased || leaseReserveFK || leaseCheckPayToFK || allpaytoowner
                        }
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Owner</Form.Label>
                    </Col>

                    <Col xs={5} md={5} sm={5} className="p-0 d-flex">
                      <AutoCompleteDropdown
                        arrayList={owner || []}
                        searchString={ownerInput}
                        customFormatSearchString={(searchString) => searchString}
                        renderItemId={(truckOwner) => truckOwner.driverPK}
                        renderItemField={(truckOwner) =>
                          truckOwner.lastName != null
                            ? truckOwner.firstName + " " + truckOwner.lastName
                            : truckOwner.firstName
                        }
                        handleSearchString={(string) => setOwnerInput(string)}
                        fetchDataBySearchString={fetchOwnerByName}
                        onSelect={handleOwnerToLookupSelection}
                        clearInputCallback={() => {
                          setOwnerFk(null);
                        }}
                        selectedId={ownerFk}
                        loading={ownerLoading}
                        disabled={viewDetails || (!allpaytoowner && !splitpaywithowner)}
                        className={` ${
                          !viewDetails && (splitpaywithowner || allpaytoowner)
                            ? !ownerFk
                              ? "borderRed"
                              : "borderGreen"
                            : ""
                        }`}
                      />

                      <LookupButton
                        onClick={() => {
                          setDriverSelection(true);
                        }}
                        disabled={viewDetails || (!allpaytoowner && !splitpaywithowner)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
                    <Col xs={5} sm={5} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {"Split Pay Percentage"}
                      </Form.Label>
                    </Col>

                    <Col xs={1} md={1} lg={1} sm={1} className="p-0">
                      <Input
                        className={`customFormControl 
                      ${
                        !viewDetails && leased && splitpaywithowner && !splitpaymileage
                          ? !splitpaypercentage
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                        id="splitpaypercentage"
                        name="splitpaypercentage"
                        type="text"
                        value={splitpaypercentage}
                        maxLength={2}
                        defaultValue={0.0}
                        onBeforeInput={(e) => {
                          const currentValue = e.target.value;
                          const proposedValue = currentValue + (e.data || "");

                          if (!/^[1-9][0-9]*$/.test(proposedValue)) {
                            e.preventDefault();
                          }
                        }}
                        disabled={viewDetails || !leased || !splitpaywithowner || splitpaymileage}
                        onChange={(e) => {
                          if (leased && !leaseCheckPayToFK && !leaseReserveFK && !splitpaymileage) {
                            setSplitPayPercentage(e.target.value);
                          } else {
                            setSplitPayPercentage("0");
                          }
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className=" form-group align-items-center row m-l-0 m-r-0 mt-3">
                    <Col sm={5} md={5} xs={5} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Split Pay Mileage</Form.Label>
                    </Col>
                    <Col xs={1} md={1} sm={1} className="p-0">
                      <Input
                        name="splitPayMileage"
                        type="text"
                        className={`customFormControl 
                      ${
                        !viewDetails && leased && splitpaywithowner && !splitpaypercentage
                          ? !splitpaymileage
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                        disabled={viewDetails || !leased || !splitpaywithowner || splitpaypercentage}
                        value={splitpaymileage}
                        onChange={(e) => {
                          e.target.value != "." &&
                            e.target.value.match(/^\d{0,3}(\.\d{0,2})?$/) &&
                            setSplitPayMileage(isDecimals(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                {/* SECOND COLUMN */}

                <Col className="m-l-15">
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mt-3">
                    <Col m={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Driver Not Owner</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        type="checkbox"
                        className={`form-check-input p-0 `}
                        checked={drivernotowner}
                        onChange={(e) => {
                          const value = e.target.checked;
                          setDriverNotOwner(value);
                          if (!value) {
                            setPoaOnFile(false);
                            setOwnersName("");
                            setAddress1("");
                            setAddress2("");
                            setZipIdChcek("postalCodeId");
                            setZip("");
                            setCity("");
                            setState("");
                            setZipIdChcek(undefined);
                            setPostalCodePK(null);
                          }
                        }}
                        disabled={viewDetails || leased}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group mt-3 form-group m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>POA On File</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        type="checkbox"
                        className="form-check-input p-0 "
                        checked={poaonfile}
                        onChange={(e) => setPoaOnFile(e.target.checked)}
                        disabled={viewDetails || !drivernotowner}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Owners Name</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <Input
                        name="ownerName"
                        type="text"
                        className={`customFormControl ${
                          viewDetails || !drivernotowner
                            ? ""
                            : ownersname.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        value={ownersname}
                        onChange={(e) => {
                          const cleaned = cleanFirstChar(e.target.value);
                          setOwnersName(cleaned);
                        }}
                        disabled={viewDetails || !drivernotowner}
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0">
                      <Form.Label className={`${styles.colFormLabel}`}>Address</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <Input
                        name="ad1"
                        type="text"
                        className={`customFormControl ${
                          viewDetails || !drivernotowner
                            ? ""
                            : address1.length >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        value={address1}
                        onChange={(e) => {
                          const cleaned = cleanFirstChar(e.target.value);
                          setAddress1(cleaned);
                        }}
                        disabled={viewDetails || !drivernotowner}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={4} md={4} xs={4} className="p-0"></Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <Input
                        name="ad2"
                        type="text"
                        className={`customFormControl`}
                        value={address2}
                        onChange={(e) => {
                          const cleaned = cleanFirstChar(e.target.value);
                          setAddress2(cleaned);
                        }}
                        disabled={viewDetails || !drivernotowner}
                        maxLength={30}
                        autoComplete="one-time-code"
                        aria-autocomplete="list"
                        spellCheck={false}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-1 align-items-center row m-l-0 m-r-0">
                    <Col className="p-0">
                      <PostalCodeComponent
                        disabled={viewDetails || !drivernotowner}
                        city={city}
                        setCity={setCity}
                        stateCode={state}
                        setStateCode={setState}
                        postalCode={zip}
                        setPostalCode={setZip}
                        setPostalValues={setPostalValues}
                        postalOptions={postalOptions}
                        postalCodePK={postalCodePK}
                        setPostalCodePK={setPostalCodePK}
                        canadian={canadian}
                        setCanadian={setCanadian}
                        labelColNumber={4}
                        stateInputWidth={"55px"}
                        zipInputWidth={"100px"}
                      />
                    </Col>
                  </Form.Group>
                  <DriverLookup
                    show={driverSelection}
                    onHide={driverModalHide}
                    renderItemId={(data) => data.driverPK}
                    handleLookupSelection={driverLookupSelection}
                    ExcludeDriver
                    excludeDriverId={driverId}
                    showActiveOnly
                  />

                  <CheckPayToLookup
                    show={checkPaySelection}
                    onHide={checkToPayModalHide}
                    renderItemId={(data) => data.checkPayToPK}
                    handleLookupSelection={checkToPayLookupSelection}
                    MaintenanceProgram
                  />

                  {/* <DriverSelectionLookupTemplate */}

                  <ReservesLookup
                    show={leaseReserveSelection}
                    onHide={leaseReserveModalHide}
                    renderItemId={(data) => data.id}
                    handleLookupSelection={leaseReserveLookUpSelection}
                    Driver
                    lease
                  />
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
      <div style={{ minHeight: "100px" }}></div>
    </div>
  );
};

export default Lease;
