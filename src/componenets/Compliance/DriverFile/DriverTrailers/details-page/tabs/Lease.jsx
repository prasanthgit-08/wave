import { Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverTrailersData,
  setIsLeaseCondition,
  setIsLeaseTabValid,
  setLeaseLoading,
  setOnCancel,
  setOwnerCity,
  setOwnerLoading,
  setOwnerPostcode,
  setOwnerStatecode,
} from "../../../../../../redux/DriverTrailersSlice";
import LookupButton from "../../../../../common/LookupButton";
import CheckPayToService from "../../../../../../services/CheckPayToService";
import ReservesService from "../../../../../../services/ReservesService";
import DriverService from "../../../../../../services/DriverService";
import DriverLookup from "../../../../../LookupScreens/Driver/DriverLookup";
import CheckPayToLookup from "../../../../../LookupScreens/CheckPayTo/CheckPayToLookup";
import ReservesLookup from "../../../../../LookupScreens/Reserves/ReservesLookup";
import PostalCode from "../../../../../common/PostalCode";
import { useParams } from "react-router-dom";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import LoadingIcon from "../../../../../common/LoadingIcon";
import Input from "../../../../../../components/common/input";

const Lease = () => {
  const dispatch = useDispatch();
  const { driverId, recordId } = useParams();

  const [leased, setLeased] = useState(false);
  const [companyTrailer, setCompanyTrailer] = useState(false);
  const [splitPayWithOwner, setSplitPayWithOwner] = useState(false);
  const [driverNotOwner, setDriverNotOwner] = useState(false);
  const [poaOnFile, setPoaOnFile] = useState(false);
  const [ownersName, setOwnersName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [checkPaySelection, setCheckPaySelection] = useState(false);
  const [leaseReserveSelection, setLeaseReserveSelection] = useState(false);
  const [splitPayMileage, setSplitPayMileage] = useState("");

  const viewDetail = useSelector((state) => state.driverTrailers.viewDetail);
  const formData = useSelector((state) => state.driverTrailers.formData);
  const isTabIdentify = useSelector((state) => state.driverTrailers.isTabIdentify);
  const onCancel = useSelector((state) => state.driverTrailers.onCancel);

  const leaseLoading = useSelector((state) => state.driverTrailers.leaseLoading);

  const [leaseCheckToPay, setLeaseCheckToPay] = useState([]);
  const [leaseCheckPayToFK, setLeaseCheckPayToFK] = useState();
  const [checkPayToInput, setCheckPayToInput] = useState("");
  const [leaseReserve, setLeaseReserve] = useState([]);
  const [leaseReserveFK, setLeaseReserveFK] = useState();
  const [reserveInput, setReserveInput] = useState("");
  const [owner, setOwner] = useState([]);
  const [ownerFk, setOwnerFk] = useState();
  const [ownerInput, setOwnerInput] = useState();
  const [driverSelection, setDriverSelection] = useState(false);
  const [driverNotOwnerCheck, setDriverNotOwnerCheck] = useState(true);
  const [leasecheck, setLeasecheck] = useState(true);
  const [companyTrailerCheck, setCompanyTrailerCheck] = useState(true);
  const [splitPayCheck, setSplitPayCheck] = useState(true);
  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [zipIdChcek, setZipIdCheck] = useState("");

  const [checkPayToLoading, setCheckPayToLoading] = useState(false);

  const [loading3, setLoading3] = useState(false);

  const ownerLoading = useSelector((state) => state.driverTrailers.ownerLoading);

  /*
  Look up for Owner
*/

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

  /*
  Look up for Check To Pay
*/

  const checkToPayModalHide = () => {
    setCheckPaySelection(false);
  };

  const checkToPayLookupSelection = (data) => {
    setCheckPayToInput(data.description);
    setLeaseCheckPayToFK(data.id);
    setCheckPaySelection(false);
  };

  /*
  Look up for Reserve
*/

  const leaseReserveModalHide = () => {
    setLeaseReserveSelection(false);
  };

  const leaseReserveLookUpSelection = (data) => {
    setLeaseReserveFK(data.id);
    setReserveInput(data.description);
    setLeaseReserveSelection(false);
  };

  useEffect(() => {
    if (driverNotOwnerCheck && splitPayCheck && companyTrailerCheck && leasecheck) {
      dispatch(setIsLeaseTabValid(true));
    } else {
      dispatch(setIsLeaseTabValid(false));
    }
  }, [driverNotOwnerCheck, splitPayCheck, companyTrailerCheck, leasecheck, leased]);

  useEffect(() => {
    if (!driverNotOwner && !leased) {
      dispatch(setIsLeaseCondition(true)); // For checking color in Lease Tab content page
    } else {
      dispatch(setIsLeaseCondition(false));
    }
  }, [driverNotOwner, leased]);

  const leaseTabData = () => {
    dispatch(
      setDriverTrailersData({
        leased: leased,
        companyTrailer: companyTrailer,
        leaseReserveId: leaseReserveFK,
        leaseCheckPayId: leaseCheckPayToFK,
        splitPayWithOwner: splitPayWithOwner,
        ownerDriverId: ownerFk,
        ownerDriverMileage: splitPayMileage,
        driverNotOwner: driverNotOwner,
        poaOnFile: poaOnFile,
        name: ownersName,
        address1: address1,
        address2: address2,
        city: city,
        stateCode: state,
        postalCode: zip,
      })
    );
  };

  useEffect(() => {
    leaseTabData();
  }, [
    leased,
    companyTrailer,
    leaseReserve,
    leaseReserveFK,
    leaseCheckPayToFK,
    splitPayWithOwner,
    owner,
    splitPayMileage,
    driverNotOwner,
    poaOnFile,
    ownersName,
    address1,
    address2,
    city,
    state,
    zip,
    ownerFk,
  ]);

  useEffect(() => {
    setLeased(formData?.leased || false);
    setCompanyTrailer(formData?.companyTrailer || false);
    setSplitPayWithOwner(formData?.splitPayWithOwner || false);
    setSplitPayMileage(formData?.ownerDriverMileage || "");
    setDriverNotOwner(formData?.driverNotOwner || false);
    setPoaOnFile(formData?.poaOnFile || false);
    setOwnersName(formData?.name || "");
    setAddress1(formData?.address1 || "");
    setAddress2(formData?.address2 || "");
    setCity(formData?.city || "");
    setState(formData?.stateCode || "");
    setZip(formData?.postalCode || "");
    setOwnerFk(formData?.ownerDriverId || null);
    setOwnerInput(formData?.trailerOwner || "");
    setLeaseCheckPayToFK(formData?.leaseCheckPayId || null);
    setCheckPayToInput(formData?.leaseCheckPay || "");
    setLeaseReserveFK(formData?.leaseReserveId || null);
    setReserveInput(formData?.leaseReserve || "");
    setPostalCodePK(formData?.postalCodePK ? formData?.postalCodePK : null);
  }, [formData]);

  const fetchCheckPayToByName = (string) => {
    if (isTabIdentify === "lease") {
      setCheckPayToLoading(true);
      CheckPayToService.fetchCheckPayToAutoComplete(string)
        .then(({ data }) => {
          setLeaseCheckToPay(data.content);
          setCheckPayToLoading(false);
        })
        .catch((error) => {
          console.log("Error ", error);
        })
        .finally(() => {
          setCheckPayToLoading(false);
        });
    }
  };

  const fetchLeaseReserveByName = (string) => {
    if (isTabIdentify === "lease") {
      dispatch(setLeaseLoading(true));
      ReservesService.getReserveTypeAuto(string, true, false, false)
        .then(({ data }) => {
          setLeaseReserve(data.content);
          dispatch(setLeaseLoading(false));
        })
        .catch((error) => {
          console.log("Error " + error);
        })
        .finally(() => {
          dispatch(setLeaseLoading(false));
        });
    }
  };

  const fetchOwnerByName = (string) => {
    if (isTabIdentify === "lease") {
      dispatch(setOwnerLoading(true));
      DriverService.getDriverForAuto(string, true, driverId)
        .then(({ data }) => {
          setOwner(data.content);
          dispatch(setOwnerLoading(false));
        })
        .catch((error) => {
          console.log("Error " + error);
        })
        .finally(() => {
          dispatch(setOwnerLoading(false));
        });
    }
  };

  /* 
     handle function for lease check pay  
  */

  const handleCheckPayToLookupSelection = (checkPayTo) => {
    if (checkPayTo) {
      setLeaseCheckPayToFK(checkPayTo.id);
      setCheckPayToInput(checkPayTo.description);
    }
  };

  /*
   handle function for lease reserve 
   */

  const handleLeaseReserveToLookupSelection = (lease) => {
    if (lease) {
      setLeaseReserveFK(lease.id);
      setReserveInput(lease.description);
    }
  };

  /*
    handle function for Owner  
   */

  const handleOwnerToLookupSelection = (trailerOwner) => {
    if (trailerOwner) {
      setOwnerFk(trailerOwner.driverPK);
      if (trailerOwner.lastName != null) {
        setOwnerInput((trailerOwner.firstName + " " + trailerOwner.lastName)?.trim());
      } else {
        setOwnerInput(trailerOwner.firstName?.trim());
      }
    }
  };

  useEffect(() => {
    if (driverNotOwner === false) {
      setPoaOnFile(false);
      setOwnersName("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setState("");
      setZip("");
      setPostalValues(initialValue);
      setDriverNotOwnerCheck(true);
      setPostalCodePK(null);
    } else {
      if (ownersName && address1 && postalCodePK) {
        setDriverNotOwnerCheck(true);
      } else {
        setDriverNotOwnerCheck(false);
      }
    }
  }, [
    driverNotOwner,
    ownersName,
    address1,
    city,
    state,
    zip,
    zipPostLenght,
    cityLength,
    postalCodeOnChange,
    postalCodePK,
  ]);

  // For form validation when deselect leased set all fields blank

  useEffect(() => {
    if (leased === false) {
      setCompanyTrailer(false);
      setSplitPayWithOwner(false);
      setLeasecheck(true);
    } else {
      if (companyTrailer || splitPayWithOwner) {
        setLeasecheck(true);
      } else {
        setLeasecheck(false);
      }
    }
  }, [leased, companyTrailer, splitPayWithOwner]);

  // For form validation when deselect Company Trailer set all fields blank and validate lease tab menu

  useEffect(() => {
    if (companyTrailer === false) {
      setReserveInput("");
      setCheckPayToInput("");
      setCompanyTrailerCheck(true);
    } else {
      if (checkPayToInput && reserveInput && leaseCheckPayToFK && leaseReserveFK) {
        setCompanyTrailerCheck(true);
      } else {
        setCompanyTrailerCheck(false);
      }
    }
  }, [companyTrailer, leased, checkPayToInput, reserveInput, leaseCheckPayToFK, leaseReserveFK]);

  // For form validation when deselect splitPayWithOwner set all fields blank

  useEffect(() => {
    if (splitPayWithOwner === false) {
      setOwnerInput("");
      setOwner([]);
      setOwnerFk();
      setSplitPayMileage("");
      setSplitPayCheck(true);
    } else {
      if (splitPayMileage && ownerInput && ownerFk) {
        setSplitPayCheck(true);
      } else {
        setSplitPayCheck(false);
      }
    }
  }, [splitPayWithOwner, splitPayMileage, ownerInput, ownerFk]);

  // Number validation for decimal values

  const isDecimal = (value) => {
    if (!value) return value;
    const number = value.replace(/[^\d:.]/g, "");

    if (value) return number;
  };

  //zipcode validation check
  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const validationSchema = yup.object({
    city: yup.string().required(),
    state: yup.string().max(2).min(2).required(),
    zip: yup.string().required(),
  });

  return (
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
        <Form on={formik.handle} className="p-3">
          <div className="p-0 w-100">
            <Row className="m-0 p-0 ">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Leased</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 `}
                      checked={leased}
                      onChange={(e) => setLeased(e.target.checked)}
                      disabled={viewDetail || driverNotOwner}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Company Trailer</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0  ${
                        !viewDetail
                          ? leased && !companyTrailer && !splitPayWithOwner
                            ? "borderRed form-check-input mt-0"
                            : "form-check-input mt-0"
                          : ""
                      }`}
                      checked={companyTrailer}
                      onChange={(e) => setCompanyTrailer(e.target.checked)}
                      disabled={viewDetail || !leased || splitPayWithOwner}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="form-group m-t-20 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Lease Reserve</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    <AutoCompleteDropdown
                      className={`customFormControl  ${
                        !viewDetail && companyTrailer ? (leaseReserveFK ? "borderGreen" : "borderRed") : ""
                      }`}
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
                      disabled={viewDetail || !companyTrailer}
                      loading={leaseLoading}
                    />

                    <LookupButton
                      onClick={() => {
                        setLeaseReserveSelection(true);
                      }}
                      disabled={viewDetail || !companyTrailer}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Lease Check Pay To</Form.Label>
                  </Col>

                  <Col xs={7} md={5} sm={7} className="p-0 d-flex" style={{ width: "275px" }}>
                    <AutoCompleteDropdown
                      className={`customFormControl  ${
                        !viewDetail && companyTrailer ? (leaseCheckPayToFK ? "borderGreen" : "borderRed") : ""
                      }`}
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
                      disabled={viewDetail || !companyTrailer}
                      loading={checkPayToLoading}
                    />
                    <LookupButton
                      onClick={() => {
                        setCheckPaySelection(true);
                      }}
                      disabled={viewDetail || !companyTrailer}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-5 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Split Pay With Owner</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0  ${
                        !viewDetail
                          ? leased && !companyTrailer && !splitPayWithOwner
                            ? "borderRed form-check-input mt-0"
                            : "form-check-input mt-0"
                          : ""
                      }`}
                      checked={splitPayWithOwner}
                      onChange={(e) => setSplitPayWithOwner(e.target.checked)}
                      disabled={viewDetail || !leased || companyTrailer}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Owner</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0 d-flex " style={{ width: "275px" }}>
                    <AutoCompleteDropdown
                      arrayList={owner}
                      searchString={ownerInput}
                      customFormatSearchString={(searchString) => searchString}
                      renderItemId={(trailerOwner) => trailerOwner.driverPK}
                      renderItemField={(trailerOwner) =>
                        trailerOwner.lastName != null
                          ? trailerOwner.firstName + " " + trailerOwner.lastName
                          : trailerOwner.firstName
                      }
                      handleSearchString={(string) => setOwnerInput(string)}
                      fetchDataBySearchString={fetchOwnerByName}
                      onSelect={handleOwnerToLookupSelection}
                      clearInputCallback={() => {
                        setOwnerFk(null);
                      }}
                      selectedId={ownerFk}
                      disabled={viewDetail || !splitPayWithOwner}
                      className={`customFormControl  ${
                        !viewDetail && splitPayWithOwner ? (!ownerFk ? "borderRed" : "borderGreen") : ""
                      }`}
                      loading={ownerLoading}
                    />

                    <LookupButton
                      onClick={() => {
                        setDriverSelection(true);
                      }}
                      disabled={viewDetail || !splitPayWithOwner}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="m-t-20 align-items-center row m-l-0 m-r-0">
                  <Col sm={3} md={3} xs={3} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Split Pay Mileage</Form.Label>
                  </Col>
                  <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "60px" }}>
                    <Input
                      name="splitPayMileage"
                      type="text"
                      id="splitPayMileage"
                      maxLength={6}
                      className={`customFormControl  ${
                        !viewDetail && splitPayWithOwner
                          ? !splitPayMileage
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      value={splitPayMileage}
                      onChange={(e) => {
                        e.target.value !== "." &&
                          e.target.value.match(/^\d{0,3}(\.\d{0,2})?$/) &&
                          setSplitPayMileage(isDecimal(e.target.value));
                      }}
                      disabled={viewDetail || !splitPayWithOwner}
                    />
                  </Col>
                </Form.Group>
              </Col>

              {/* SECOND COLUMN */}

              <Col sm={5} md={5} lg={5} xl={5} xs={5}>
                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Driver Not Owner</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className={`form-check-input p-0 `}
                      checked={driverNotOwner}
                      onChange={(e) => {
                        const value = e.target.checked;
                        setDriverNotOwner(value);
                        if (!value) {
                          setPoaOnFile(false);
                          setOwnersName("");
                          setAddress1("");
                          setAddress2("");
                          setCity("");
                          setState("");
                          setZip("");
                          setPostalValues(initialValue);
                          setDriverNotOwnerCheck(true);
                          setPostalCodePK(null);
                        }
                      }}
                      disabled={viewDetail || leased}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-3 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>POA On File</Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      type="checkbox"
                      className="form-check-input p-0 "
                      checked={poaOnFile}
                      onChange={(e) => setPoaOnFile(e.target.checked)}
                      disabled={viewDetail || !driverNotOwner}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-25 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Owners Name</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      name="ownerName"
                      type="text"
                      maxLength={30}
                      className={`customFormControl  ${
                        !viewDetail && driverNotOwner ? (!ownersName ? "borderRed" : "borderGreen") : ""
                      }`}
                      value={ownersName}
                      onChange={(e) => setOwnersName(e.target.value)}
                      disabled={viewDetail || !driverNotOwner}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-25 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0">
                    <Form.Label className={`${styles.colFormLabel}`}>Address</Form.Label>
                  </Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      name="ad1"
                      type="text"
                      maxLength={30}
                      className={`customFormControl  ${
                        !viewDetail && driverNotOwner ? (!address1 ? "borderRed" : "borderGreen") : ""
                      }`}
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      disabled={viewDetail || !driverNotOwner}
                      autoComplete="one-time-code"
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="m-t-25 align-items-center row m-l-0 m-r-0">
                  <Col sm={4} md={4} xs={4} className="p-0"></Col>
                  <Col xs={6} md={6} sm={6} className="p-0">
                    <Input
                      name="ad2"
                      type="text"
                      maxLength={30}
                      className={`customFormControl`}
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      disabled={viewDetail || !driverNotOwner}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-1 align-items-center row m-l-0 m-r-0">
                  <Col className="p-0">
                    <PostalCodeComponent
                      disabled={viewDetail || !driverNotOwner}
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

                {/* <DriverSelectionLookupTemplate */}
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
                  renderItemId={(data) => data.id}
                  handleLookupSelection={checkToPayLookupSelection}
                  MaintenanceProgram
                />
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
          <div style={{ minHeight: "200px" }}></div>
        </Form>
      )}
    </Formik>
  );
};

export default Lease;
