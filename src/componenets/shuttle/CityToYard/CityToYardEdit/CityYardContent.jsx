import { t } from "i18next";
import React, { useState } from "react";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCityToYardShuttlePK,
  setDeliveryYardSelection,
  setDescription,
  setEditFormData,
  setMiles,
  setMotorizedDriverFee,
  setMotorizedShuttleFee,
  setMotorizedShuttleReturn,
  setPickupYardInput,
  setShuttleCityFK,
  setTowableDriverFee,
  setTowableShuttleFee,
  setTowableShuttleReturn,
  setViewDetail,
  setYardFK,
  setPickupYardId,
  setPickupYardSelection,
  setPickupCityInput,
  setPickupCityId,
  setPickupCitySelection,
  setIsYardCityUnique,
} from "../../../../redux/CityToYardSlice";
import CityYardService from "../../../../services/CityYardService";
import { useEffect } from "react";
import YardLookup from "../../../LookupScreens/Yard/YardLookup";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import ShuttleCityLookup from "../../../LookupScreens/ShuttleCity/ShuttleCityLookup";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";

function CityYardContent({ styles }) {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pickupYardsData, setPickupYardsData] = useState([]);
  const [shuttleCityData, setShuttleCityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showYardLookup, setShowYardLookup] = useState(false);
  const viewDetail = useSelector((state) => state.cityToYardReducer.viewDetail);
  const editFormData = useSelector((state) => state.cityToYardReducer.editFormData);
  const changesCancelled = useSelector((state) => state.cityToYardReducer.changesCancelled);
  const pageNumber = useSelector((state) => state.cityToYardReducer.pageNumber);
  const [apiLoading, setApiLoading] = useState(false);

  const cityToYardShuttlePK = useSelector((state) => state.cityToYardReducer.cityToYardShuttlePK);
  const city = useSelector((state) => state.cityToYardReducer.city);
  const yardFK = useSelector((state) => state.cityToYardReducer.yardFK);
  const shuttleCityFK = useSelector((state) => state.cityToYardReducer.shuttleCityFK);
  const description = useSelector((state) => state.cityToYardReducer.description);
  const searchCriteria = useSelector((state) => state.cityToYardReducer.searchCriteria);
  const towableShuttleFee = useSelector((state) => state.cityToYardReducer.towableShuttleFee);
  const towableShuttleReturn = useSelector((state) => state.cityToYardReducer.towableShuttleReturn);
  const towableDriverFee = useSelector((state) => state.cityToYardReducer.towableDriverFee);
  const motorizedShuttleFee = useSelector((state) => state.cityToYardReducer.motorizedShuttleFee);
  const motorizedShuttleReturn = useSelector((state) => state.cityToYardReducer.motorizedShuttleReturn);
  const motorizedDriverFee = useSelector((state) => state.cityToYardReducer.motorizedDriverFee);
  const pickupYardInput = useSelector((state) => state.cityToYardReducer.pickupYardInput);
  const pickupYardSelection = useSelector((state) => state.cityToYardReducer.pickupYardSelection);
  const pickupCityInput = useSelector((state) => state.cityToYardReducer.pickupCityInput);
  const pickupCitySelection = useSelector((state) => state.cityToYardReducer.pickupCitySelection);
  const isYardCityUnique = useSelector((state) => state.cityToYardReducer.isYardCityUnique);
  const pickupCityId = useSelector((state) => state.cityToYardReducer.pickupCityId);
  const pickupYardId = useSelector((state) => state.cityToYardReducer.pickupYardId);

  const miles = useSelector((state) => state.cityToYardReducer.miles);
  const [yardId, setYardId] = useState(null);
  const [shuttlecityId, setShuttlecityId] = useState(null);
  const [plantLoading, setPlantLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);

  const fetchRecord = (id) => {
    setLoading(true);
    CityYardService.getRecord(id)

      .then((res) => {
        const data = res.data;
        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/city-to-yard`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const hanldeCheckForm = (yardFK, cityFK) => {
    CityYardService.checkYardExist(yardFK, cityFK, id)
      .then((res) => {
        dispatch(setIsYardCityUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePickupYardLookupModalShow = () => {
    dispatch(setPickupYardSelection(true));
  };
  const handlePickupCityLookupModalShow = () => {
    dispatch(setPickupCitySelection(true));
  };

  const fetchPickupYardDetailsByName = (string) => {
    setCityLoading(true);
    CityYardService.fetchYardDetailsBydes(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data.content;
        const yardList = data?.map((yard) => ({
          ...yard,
          description: yard.description?.trim(),
        }));
        setPickupYardsData(yardList);
      })
      .catch((err) => {
        setCityLoading(false);
      })
      .finally(() => {
        setCityLoading(false);
      });
  };

  const fetchPickupCity = (string) => {
    setPlantLoading(true);
    CityYardService.fetchPickupCity(string)
      .then((response) => {
        const data = response.data.content;
        const cityList = data?.map((city) => ({
          ...city,
          city: city.city?.trim(),
        }));
        setShuttleCityData(cityList);
      })
      .catch((err) => {
        setPlantLoading(false);
      })
      .finally(() => {
        setPlantLoading(false);
      });
  };
  const handlePickupYardLookupSelection = (yard) => {
    dispatch(setPickupYardInput(yard.description));
    dispatch(setPickupYardId(yard.yardPK));
    dispatch(setYardFK(yard.yardPK));
    dispatch(setPickupYardSelection(false));
    hanldeCheckForm(yard.yardPK, shuttleCityFK);
  };
  const handlePickupCityLookupSelection = (city) => {
    dispatch(setPickupCityInput(city.city));
    dispatch(setShuttleCityFK(city.shuttleCityPK));

    dispatch(setPickupCitySelection(false));
    hanldeCheckForm(yardFK, city.shuttleCityPK);
  };

  const hidePickupYardModal = () => {
    dispatch(setPickupYardSelection(false));
  };
  const hidePickupCityModal = () => {
    dispatch(setPickupCitySelection(false));
  };

  const setCityValue = (shuttleCityFK) => {
    if (shuttleCityFK !== null) {
      let cityElement = shuttleCityData.find((city) => city.shuttleCityPK === shuttleCityFK);
      if (cityElement !== undefined) {
        dispatch(setPickupCityInput(cityElement.city));
      } else {
        setApiLoading(true);
        CityYardService.getShuttleCitysById(shuttleCityFK)
          .then((response) => {
            const data = response.data;
            dispatch(setPickupCityInput(data.city));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setApiLoading(false);
          });
      }
    } else {
      dispatch(setPickupCityInput(""));
    }
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData == null || editFormData === "") {
      dispatch(setCityToYardShuttlePK(""));
      dispatch(setYardFK(""));
      dispatch(setShuttleCityFK(""));
      dispatch(setPickupYardInput(""));
      dispatch(setPickupCityInput(""));
      dispatch(setTowableShuttleFee(""));
      dispatch(setTowableShuttleReturn(""));
      dispatch(setTowableDriverFee(""));
      dispatch(setMiles(""));
      dispatch(setMotorizedShuttleFee(""));
      dispatch(setMotorizedShuttleReturn(""));
      dispatch(setMotorizedDriverFee(""));
    }
  }, [editFormData]);

  const setYardValue = (yardFK) => {
    if (yardFK !== null) {
      setApiLoading(true);
      CityYardService.getRecordForYard(yardFK)
        .then((response) => {
          const data = response.data;
          dispatch(setPickupYardInput(data.description));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setApiLoading(false);
        });
    } else {
      dispatch(setPickupYardInput(""));
    }
  };

  const isInvalidDecimal = (value) => {
    const trimmed = value?.toString()?.trim();

    return trimmed === "." || /^(\d+)\.$/.test(trimmed);
  };

  useEffect(() => {
    if (editFormData != null) {
      dispatch(
        setCityToYardShuttlePK(editFormData.cityToYardShuttlePK ? editFormData.cityToYardShuttlePK : "")
      );
      dispatch(setYardFK(editFormData.yardfk != null ? editFormData.yardfk : ""));
      setYardId(editFormData.yardfk);
      setShuttlecityId(editFormData.shuttleCityfk);

      dispatch(setShuttleCityFK(editFormData.shuttleCityfk != null ? editFormData.shuttleCityfk : ""));
      dispatch(setTowableShuttleFee(editFormData.towableShuttleFee ? editFormData.towableShuttleFee : ""));
      dispatch(
        setTowableShuttleReturn(editFormData.towableShuttleReturn ? editFormData.towableShuttleReturn : "")
      );
      dispatch(setTowableDriverFee(editFormData.towableDriverFee ? editFormData.towableDriverFee : ""));
      dispatch(setMiles(editFormData.miles ? editFormData.miles : ""));
      dispatch(
        setMotorizedShuttleFee(editFormData.motorizedShuttleFee ? editFormData.motorizedShuttleFee : "")
      );
      dispatch(
        setMotorizedShuttleReturn(
          editFormData.motorizedShuttleReturn ? editFormData.motorizedShuttleReturn : ""
        )
      );
      dispatch(setMotorizedDriverFee(editFormData.motorizedDriverFee ? editFormData.motorizedDriverFee : ""));
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    if (id) fetchRecord(id);
  }, [id]);

  useEffect(() => {
    if (yardId) setYardValue(yardId);
  }, [yardId]);

  useEffect(() => {
    if (shuttlecityId) setCityValue(shuttlecityId);
  }, [shuttlecityId]);

  const validationSchema = yup.object().shape({
    miles: yup.number().min(1).max(32767).required(),
    towableShuttleFee: yup.number().min(0.01).max(99999.99).required(),
    towableShuttleReturn: yup.number().min(0.01).max(99999.99).required(),
    towableDriverFee: yup.number().min(0.01).max(99999.99).required(),
    motorizedShuttleFee: yup.number().min(0.01).max(99999.99).required(),
    motorizedShuttleReturn: yup.number().min(0.01).max(99999.99).required(),
    motorizedDriverFee: yup.number().min(0.01).max(99999.99).required(),
  });

  return (
    <Formik
      initialValues={{
        miles,
        towableShuttleFee,
        towableShuttleReturn,
        towableDriverFee,
        motorizedShuttleFee,
        motorizedShuttleReturn,
        motorizedDriverFee,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        miles: true,
        towableShuttleFee: true,
      }}
    >
      {(formik) => (
        <div className="p-2">
          <div className="shadow-sm rounded border quarterScreenFormContentHeight p-15">
            {(loading || apiLoading) && <LoadingIcon />}

            <div>
              <Row className="m-0 p-0">
                <Col sm={7} md={7} lg={7} xl={7} xs={7}>
                  <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0 text-start">
                      <Form.Label className="col-form-label dealer-label m-l-0">City</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                      {/* Yard Autocomplete */}
                      <AutoCompleteDropdown
                        className={`${
                          id
                            ? ""
                            : isYardCityUnique || (shuttleCityFK === "" && !viewDetail)
                              ? "borderRed"
                              : viewDetail
                                ? "black"
                                : "borderGreen"
                        }`}
                        arrayList={shuttleCityData}
                        searchString={pickupCityInput}
                        renderItemId={(city) => city.shuttleCityPK}
                        disabled={viewDetail || id !== undefined}
                        renderItemField={(city) => city.city}
                        handleSearchString={(string) => dispatch(setPickupCityInput(string))}
                        fetchDataBySearchString={fetchPickupCity}
                        onSelect={handlePickupCityLookupSelection}
                        selectedId={shuttleCityFK}
                        loading={plantLoading}
                        clearInputCallback={() => {
                          dispatch(setPickupCityId(null));
                          dispatch(setIsYardCityUnique(false));
                          dispatch(setShuttleCityFK(""));
                        }}
                      />
                      <LookupButton
                        onClick={handlePickupCityLookupModalShow}
                        disabled={viewDetail || id !== undefined}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="m-t-15  m-b-10 align-items-center row  m-l-0 m-r-0">
                    <Col sm={5} md={5} xs={5} className="p-0 text-start">
                      <Form.Label className="col-form-label dealer-label ">Yard</Form.Label>
                    </Col>

                    <Col xs={6} md={6} sm={6} className="p-0 d-flex">
                      {/* Yard Autocomplete */}
                      <AutoCompleteDropdown
                        className={`${styles.formControl} ${
                          id
                            ? ""
                            : isYardCityUnique || (yardFK === "" && !viewDetail)
                              ? "borderRed"
                              : viewDetail
                                ? "black"
                                : "borderGreen"
                        }`}

                        arrayList={pickupYardsData}
                        searchString={pickupYardInput}
                        renderItemId={(yard) => yard.yardPK}
                        disabled={viewDetail || id !== undefined}
                        renderItemField={(yard) => yard.description}
                        handleSearchString={(string) => {
                          dispatch(setPickupYardInput(string));
                        }}
                        fetchDataBySearchString={fetchPickupYardDetailsByName}
                        onSelect={handlePickupYardLookupSelection}
                        selectedId={pickupYardId}

                        loading={cityLoading}
                        clearInputCallback={() => {
                          dispatch(setPickupYardId(null));
                          dispatch(setIsYardCityUnique(false));
                          dispatch(setYardFK(""));
                        }}
                      />
                      <LookupButton
                        onClick={handlePickupYardLookupModalShow}
                        disabled={viewDetail || id !== undefined}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    className={`form-group m-t-1  align-items-center d-flex ${(viewDetail || !id) && isYardCityUnique && !viewDetail ? "" : "hide-elements"}`}
                  >
                    <Col sm={5} md={5} xs={5} className="p-0 text-start" style={{ height: "40px" }}></Col>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="m-0 p-0 m-t-5">
                <Col xs={7}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col sm={5} md={5} xs={5} className="p-5 text-start">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Motorized City To Yard Amount
                      </Form.Label>
                    </Col>

                    <div className="p-0 w-70px">
                      <Input
                        className={`${styles.formControl} ${
                          !viewDetail
                            ? isInvalidDecimal(motorizedShuttleFee)
                              ? "borderRed"
                              : !motorizedShuttleFee
                                ? towableShuttleFee || towableShuttleReturn || towableDriverFee
                                  ? motorizedShuttleReturn || motorizedDriverFee
                                    ? "borderRed"
                                    : ""
                                  : "borderRed"
                                : Number(motorizedShuttleFee) === 0
                                  ? "borderRed"
                                  : "borderGreen"
                            : ""
                        }`}

                        id="motorizedcitytoyard"
                        name="motorizedcitytoyard"
                        type="text"
                        maxLength={30}
                        value={motorizedShuttleFee}
                        disabled={viewDetail}

                        onChange={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            dispatch(setMotorizedShuttleFee(e.target.value));
                        }}
                        onBeforeInput={(e) => {
                          const inputValue = e.target.value;
                          const selectionStart = e.target.selectionStart;
                          const selectionEnd = e.target.selectionEnd;
                          const newValue =
                            inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                          // Define the regex patterns for validation
                          const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                          const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                          // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                          if (
                            (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                            (startsWithZeroFollowedByDigit.test(newValue) &&
                              newValue.length > 8 &&
                              newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                            parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col sm={5} md={5} xs={5} className="p-5 text-start">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Motorized Yard To City Amount
                      </Form.Label>
                    </Col>

                    <div className="p-0 w-70px">
                      <Input
                        className={`${styles.formControl} ${
                          !viewDetail
                            ? isInvalidDecimal(motorizedShuttleReturn)
                              ? "borderRed"
                              : !motorizedShuttleReturn
                                ? towableShuttleFee || towableShuttleReturn || towableDriverFee
                                  ? motorizedShuttleFee || motorizedDriverFee
                                    ? "borderRed"
                                    : ""
                                  : "borderRed"
                                : Number(motorizedShuttleReturn) === 0
                                  ? "borderRed"
                                  : "borderGreen"
                            : ""
                        }`}

                        id="motorizedyardtocity"
                        name="motorizedyardtocity"
                        value={motorizedShuttleReturn}
                        type="text"
                        maxLength={30}
                        defaultValue={0.0}

                        disabled={viewDetail}
                        onChange={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            dispatch(setMotorizedShuttleReturn(e.target.value));
                        }}
                        onBeforeInput={(e) => {
                          const inputValue = e.target.value;
                          const selectionStart = e.target.selectionStart;
                          const selectionEnd = e.target.selectionEnd;
                          const newValue =
                            inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                          // Define the regex patterns for validation
                          const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                          const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                          // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                          if (
                            (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                            (startsWithZeroFollowedByDigit.test(newValue) &&
                              newValue.length > 8 &&
                              newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                            parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col sm={5} md={5} xs={5} className="p-5 text-start">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Motorized Delivery Driver Charge
                      </Form.Label>
                    </Col>

                    <div className="p-0 w-70px">
                      <Input
                        className={`${styles.formControl} ${
                          !viewDetail
                            ? isInvalidDecimal(motorizedDriverFee)
                              ? "borderRed"
                              : !motorizedDriverFee
                                ? towableShuttleFee || towableShuttleReturn || towableDriverFee
                                  ? motorizedShuttleFee || motorizedShuttleReturn
                                    ? "borderRed"
                                    : ""
                                  : "borderRed"
                                : Number(motorizedDriverFee) === 0
                                  ? "borderRed"
                                  : "borderGreen"
                            : ""
                        }`}

                        id="motorizeddeliverydrivercharge"
                        name="motorizeddeliverydrivercharge"
                        type="text"
                        maxLength={30}
                        value={motorizedDriverFee}
                        disabled={viewDetail}
                        defaultValue={0.0}

                        onChange={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            dispatch(setMotorizedDriverFee(e.target.value));
                        }}
                        onBeforeInput={(e) => {
                          const inputValue = e.target.value;
                          const selectionStart = e.target.selectionStart;
                          const selectionEnd = e.target.selectionEnd;
                          const newValue =
                            inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                          // Define the regex patterns for validation
                          const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                          const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                          // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                          if (
                            (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                            (startsWithZeroFollowedByDigit.test(newValue) &&
                              newValue.length > 8 &&
                              newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                            parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <Col sm={5} md={5} xs={5} className="p-5 text-start">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Miles
                      </Form.Label>
                    </Col>

                    <div className="p-0 w-50px">
                      <Input
                        className={`${styles.formControl} ${
                          viewDetail
                            ? "black"
                            : formik.errors.miles === undefined && miles.length > 1
                              ? "borderGreen"
                              : formik.errors.miles
                                ? "borderRed"
                                : "borderGreen"
                        }`}
                        id="Miles"
                        name="Miles"
                        type="text"
                        maxLength={30}
                        value={miles}
                        disabled={viewDetail}

                        onKeyDown={(evt) =>
                          (evt.key === "e" || evt.key === "." || evt.key === "-" || evt.key === "+") &&
                          evt.preventDefault()
                        }
                        onChange={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) && dispatch(setMiles(e.target.value));
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={5} md={5} sm={5}>
                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <div className="p-0 w-225px">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Towable City To Yard Amount
                      </Form.Label>
                    </div>

                    <div className="p-0 w-70px">
                      <Input
                        className={`${styles.formControl} ${
                          !viewDetail
                            ? isInvalidDecimal(towableShuttleFee)
                              ? "borderRed"
                              : !towableShuttleFee
                                ? motorizedShuttleReturn || motorizedDriverFee || motorizedShuttleFee
                                  ? towableShuttleReturn || towableDriverFee
                                    ? "borderRed"
                                    : ""
                                  : "borderRed"
                                : Number(towableShuttleFee) === 0
                                  ? "borderRed"
                                  : "borderGreen"
                            : ""
                        }`}

                        id="Towablecitytoyard"
                        name="Towablecitytoyard"
                        type="text"
                        maxLength={30}
                        defaultValue={0.0}
                        disabled={viewDetail}
                        value={towableShuttleFee}
                        onBeforeInput={(e) => {
                          const inputValue = e.target.value;
                          const selectionStart = e.target.selectionStart;
                          const selectionEnd = e.target.selectionEnd;
                          const newValue =
                            inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                          // Define the regex patterns for validation
                          const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/; // Matches up to 6 digits optionally followed by a decimal point and up to 2 decimal digits
                          const startsWithZeroFollowedByDigit = /^0\d/; // Matches if the new value starts with '0' followed by another digit

                          // Check if the new value adheres to the format and doesn't start with '0' followed by a non-zero digit unless it is '0.'
                          if (
                            (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) || // Ensure the new value adheres to the valid format
                            (startsWithZeroFollowedByDigit.test(newValue) &&
                              newValue.length > 8 &&
                              newValue[1] !== ".") || // Allow '0.' but not '0' followed by other digits
                            parseFloat(newValue) > 999999.99 // Check if the parsed float value exceeds the maximum allowed value
                          ) {
                            e.preventDefault();
                          }
                        }}

                        onChange={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            dispatch(setTowableShuttleFee(e.target.value));
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <div className="p-0 w-225px">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Towable Yard To City Amount
                      </Form.Label>
                    </div>

                    <div className="p-0 w-70px">
                      <Input
                        className={`${styles.formControl} ${
                          !viewDetail
                            ? isInvalidDecimal(towableShuttleReturn)
                              ? "borderRed"
                              : !towableShuttleReturn
                                ? motorizedShuttleReturn || motorizedDriverFee || motorizedShuttleFee
                                  ? towableShuttleFee || towableDriverFee
                                    ? "borderRed"
                                    : ""
                                  : "borderRed"
                                : Number(towableShuttleReturn) === 0
                                  ? "borderRed"
                                  : "borderGreen"
                            : ""
                        }`}

                        id="Towableyardtocity"
                        name="Towableyardtocity"
                        type="text"
                        maxLength={30}
                        defaultValue={0.0}
                        onBeforeInput={(e) => {
                          const inputValue = e.target.value;
                          const selectionStart = e.target.selectionStart;
                          const selectionEnd = e.target.selectionEnd;
                          const newValue =
                            inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);

                          const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/;
                          const startsWithZeroFollowedByDigit = /^0\d/;

                          if (
                            (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) ||
                            (startsWithZeroFollowedByDigit.test(newValue) &&
                              newValue.length > 8 &&
                              newValue[1] !== ".") ||
                            parseFloat(newValue) > 999999.99
                          ) {
                            e.preventDefault();
                          }
                        }}
                        disabled={viewDetail}
                        value={towableShuttleReturn}

                        onChange={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            dispatch(setTowableShuttleReturn(e.target.value));
                        }}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group align-items-center row m-l-0 m-r-0 mb-3">
                    <div className="p-0 w-225px">
                      <Form.Label htmlFor="name" className="col-form-label dealer-label">
                        Towable Delivery Driver Charge
                      </Form.Label>
                    </div>

                    <div className="p-0 w-70px">
                      <Input
                        className={`${styles.formControl} ${
                          !viewDetail
                            ? isInvalidDecimal(towableDriverFee)
                              ? "borderRed"
                              : !towableDriverFee
                                ? motorizedShuttleReturn || motorizedDriverFee || motorizedShuttleFee
                                  ? towableShuttleFee || towableShuttleReturn
                                    ? "borderRed"
                                    : ""
                                  : "borderRed"
                                : Number(towableDriverFee) === 0
                                  ? "borderRed"
                                  : "borderGreen"
                            : ""
                        }`}

                        id="motorizeddeliverydrivercharge"
                        name="motorizeddeliverydrivercharge"
                        type="text"
                        maxLength={30}
                        value={towableDriverFee}
                        defaultValue={0.0}
                        onBeforeInput={(e) => {
                          const inputValue = e.target.value;
                          const selectionStart = e.target.selectionStart;
                          const selectionEnd = e.target.selectionEnd;
                          const newValue =
                            inputValue.slice(0, selectionStart) + e.data + inputValue.slice(selectionEnd);
                          const validFormat = /^(?!0\d)\d{0,6}(\.\d{0,2})?$/;

                          const startsWithZeroFollowedByDigit = /^0\d/;
                          if (
                            (!startsWithZeroFollowedByDigit.test(newValue) && !validFormat.test(newValue)) ||
                            (startsWithZeroFollowedByDigit.test(newValue) &&
                              newValue.length > 8 &&
                              newValue[1] !== ".") ||
                            parseFloat(newValue) > 999999.99
                          ) {
                            e.preventDefault();
                          }
                        }}
                        disabled={viewDetail}

                        onChange={(e) => {
                          e.target.value.match(/^\d{0,5}(\.\d{0,2})?$/) &&
                            dispatch(setTowableDriverFee(e.target.value));
                        }}
                      />
                    </div>
                  </Form.Group>
                  <Row className="h-300px"></Row>
                </Col>
              </Row>
            </div>
          </div>

          <YardLookup
            show={pickupYardSelection}
            onHide={hidePickupYardModal}
            renderItemId={(yard) => yard.yardPK}
            renderItemField={(yard) => yard.description}
            handleLookupSelection={handlePickupYardLookupSelection}
            MaintenanceProgram
          />
          <ShuttleCityLookup
            show={pickupCitySelection}
            onHide={hidePickupCityModal}
            renderItemId={(city) => city.shuttleCityPK}
            renderItemField={(city) => city.city}
            handleLookupSelection={handlePickupCityLookupSelection}
            MaintenanceProgram
          />
        </div>
      )}
    </Formik>
  );
}

export default CityYardContent;
