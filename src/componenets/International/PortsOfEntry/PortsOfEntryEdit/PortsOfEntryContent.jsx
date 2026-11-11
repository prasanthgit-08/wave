import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PortsOfEntryService from "../../../../services/PortsOfEntryService";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import {
  setCanadianCity,
  setCanadianCrossing,
  setCanadianFlag,
  setDisableSave,
  setEditFormData,
  setPortsOfEntry,
  setProvence,
  setSequence,
  setStateCode,
  setUsCity,
  setUsFlag,
  setViewDetail,
} from "../../../../redux/PortsOfEntrySlice";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";

function PortsOfEntryContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const viewDetail = useSelector((state) => state.portsOfEntryReducer.viewDetail);
  const usCity = useSelector((state) => state.portsOfEntryReducer.usCity);
  const stateCode = useSelector((state) => state.portsOfEntryReducer.stateCode);
  const canadianCity = useSelector((state) => state.portsOfEntryReducer.canadianCity);
  const provence = useSelector((state) => state.portsOfEntryReducer.provence);
  const canadianCrossing = useSelector((state) => state.portsOfEntryReducer.canadianCrossing);
  const sequence = useSelector((state) => state.portsOfEntryReducer.sequence);
  const editFormData = useSelector((state) => state.portsOfEntryReducer.editFormData);
  const changesCancelled = useSelector((state) => state.portsOfEntryReducer.changesCancelled);
  const usFlag = useSelector((state) => state.portsOfEntryReducer.usFlag);
  const canadianFlag = useSelector((state) => state.portsOfEntryReducer.canadianFlag);
  const [usPostalOptions, setUsPostalOptions] = useState([]);
  const [canadianPostalOptions, setCanadianPostalOptions] = useState([]);
  const [usPostalCode, setUsPostalCode] = useState("");
  const [canadianPostalCode, setCanadianPostalCode] = useState("");
  const [isUsStateTrue, setIsUsStateTrue] = useState(false);
  const [isCanadianProvenceTrue, setIsCanadianProvenceTrue] = useState(false);
  const [isSequenceDuplicate, setIsSequenceDuplicate] = useState(false);

  // 3 digits, a space, then the crossing name (e.g. "211 ST. STEPHEN NB")
  const isCanadianCrossingValid = /^\d{3}\s[A-Za-z .!@#$%^&*()-_+=]+$/.test(canadianCrossing || "");
  const isSequenceValid = /^\d{2}$/.test(sequence || "") && !isSequenceDuplicate;
  const [loader, setLoader] = useState(false);
  const [checkLoader, setCheckLoader] = useState(false);

  const cityStateExists = ({ uscityName, statecode, canadianCityName, canadianStateCode }) => {
    setCheckLoader(true);
    PortsOfEntryService.checkCityStateExists(
      id || null,
      uscityName || usCity,
      statecode || stateCode,
      canadianCityName || canadianCity,
      canadianStateCode || provence
    )
      .then((res) => {
        dispatch(setUsFlag(res.data?.Uscitystatecode));
        dispatch(setCanadianFlag(res.data?.Canadiancityprovence));
      })
      .catch((err) => console.error("Error checking Port of Entry city/state combination", err))
      .finally(() => setCheckLoader(false));
  };

  const checkUniqueSequence = (value) => {
    if (value.length !== 2) return setIsSequenceDuplicate(false);
    PortsOfEntryService.checkSequenceExist(id, value)
      .then((res) => setIsSequenceDuplicate(res.data))
      .catch(() => setIsSequenceDuplicate(false));
  };

  const canadianCrossingValidation = (event) => {
    const cleanedText = event.target.value.replace(/^\s+/, "").replace(/[^0-9A-Za-z\s.]/g, "");
    // The first 3 characters must be digits: reject any typed/pasted input that puts something
    // else there. Deleting is always allowed so an existing value can still be corrected.
    const isAdding = cleanedText.length > canadianCrossing.length;
    if (isAdding && !/^\d{0,3}$/.test(cleanedText.slice(0, 3))) return;

    const formattedText = cleanedText.replace(/^(.{3})(.*)$/, (match, digits, rest) => {
      const numericPrefix = digits.replace(/[^0-9]/g, "");
      if (!rest) return numericPrefix;
      const remainingText = rest
        .replace(/\s+/g, " ")
        .replace(/[^A-Za-z\s.!@#$%^&*()_-]/g, "")
        .trimLeft();
      return `${numericPrefix} ${remainingText}`;
    });
    dispatch(setCanadianCrossing(formattedText));
  };

  useEffect(() => {
    return () => {
      dispatch(setUsCity(""));
      dispatch(setStateCode(""));
      dispatch(setCanadianCity(""));
      dispatch(setProvence(""));
    };
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;
    setLoader(true);
    PortsOfEntryService.getPortsOfEntryById(id)
      .then((response) => {
        dispatch(setEditFormData(response.data));
        dispatch(setViewDetail(true));
      })
      .catch(() => navigate("/port-of-entry"))
      .finally(() => setLoader(false));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (editFormData === null) {
      dispatch(setUsCity(""));
      dispatch(setStateCode(""));
      dispatch(setCanadianCity(""));
      dispatch(setProvence(""));
      dispatch(setCanadianCrossing(""));
      dispatch(setSequence(""));
      return;
    }
    dispatch(setUsCity(editFormData.usCity?.trim() || ""));
    dispatch(setStateCode(editFormData.stateCode || ""));
    dispatch(setCanadianCity(editFormData.canadianCity || ""));
    dispatch(setProvence(editFormData.provence || ""));
    dispatch(setCanadianCrossing(editFormData.canadianCrossing || ""));
    dispatch(setSequence(editFormData.sequence || ""));
    setIsUsStateTrue(true);
    setIsCanadianProvenceTrue(true);
  }, [changesCancelled, dispatch, editFormData]);

  useEffect(() => {
    const isValid =
      usCity &&
      isUsStateTrue &&
      stateCode &&
      !usFlag &&
      canadianCity &&
      isCanadianProvenceTrue &&
      provence &&
      !canadianFlag &&
      isCanadianCrossingValid &&
      isSequenceValid &&
      !isSequenceDuplicate;
    dispatch(setDisableSave(!isValid));
  }, [
    canadianCity,
    canadianCrossing,
    canadianFlag,
    dispatch,
    isCanadianCrossingValid,
    isCanadianProvenceTrue,
    isSequenceDuplicate,
    isSequenceValid,
    isUsStateTrue,
    provence,
    sequence,
    stateCode,
    usCity,
    usFlag,
  ]);

  useEffect(() => {
    dispatch(
      setPortsOfEntry({ poePK: id, usCity, stateCode, canadianCity, provence, canadianCrossing, sequence })
    );
  }, [canadianCity, canadianCrossing, dispatch, id, provence, sequence, stateCode, usCity]);

  const postalComponentProps = {
    hideZip: true,
    disabled: viewDetail,
    canadian: false,
    setCanadian: () => {},
    labelColNumber: 3,
    cityColNumber: 5,
    stateColNumber: 1,
  };

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          {(loader || checkLoader) && <LoadingIcon />}
          <Col xs={9}>
            <div className="ms-4">
              <PostalCodeComponent
                {...postalComponentProps}
                label="US City, State"
                city={usCity}
                setCity={(value) => dispatch(setUsCity(value))}
                stateCode={stateCode}
                setStateCode={(value) => dispatch(setStateCode(value))}
                postalCode={usPostalCode}
                setPostalCode={setUsPostalCode}
                postalCodePK={isUsStateTrue}
                isInvalid={!!usFlag}
                setPostalCodePK={setIsUsStateTrue}
                postalOptions={usPostalOptions}
                setPostalValues={setUsPostalOptions}
                fetchPostalOptions={(city, state) =>
                  PortsOfEntryService.checkUSCityStateCode(city.trim(), state)
                }
                onPostalCodeResolved={(location) =>
                  cityStateExists({ uscityName: location.city, statecode: location.stateCode })
                }
                className="portOfEntryUsPostalCode"
              />
              <PostalCodeComponent
                {...postalComponentProps}
                label="Canadian City, Province"
                city={canadianCity}
                setCity={(value) => dispatch(setCanadianCity(value))}
                stateCode={provence}
                setStateCode={(value) => dispatch(setProvence(value))}
                postalCode={canadianPostalCode}
                setPostalCode={setCanadianPostalCode}
                postalCodePK={isCanadianProvenceTrue}
                isInvalid={!!canadianFlag}
                setPostalCodePK={setIsCanadianProvenceTrue}
                postalOptions={canadianPostalOptions}
                setPostalValues={setCanadianPostalOptions}
                fetchPostalOptions={(city, state) =>
                  PortsOfEntryService.checkCanadianCityProvence(city.trim(), state)
                }
                onPostalCodeResolved={(location) =>
                  cityStateExists({
                    canadianCityName: location.city,
                    canadianStateCode: location.stateCode,
                  })
                }
                className="portOfEntryCanadianPostalCode"
              />
            </div>

            <div className="ms-4">
              <Form.Group className={`mt-3 m-b-10 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}>
                <Col sm={3} md={3} xs={3} className="p-0 mt-2">
                  <Form.Label className="col-form-label dealer-label">Canadian Crossing</Form.Label>
                </Col>
                <Col xs={8} md={8} className="p-0 me-2 mt-2">
                  <Input
                    name="canadianCrossing"
                    type="text"
                    value={canadianCrossing}
                    onChange={canadianCrossingValidation}
                    disabled={viewDetail}
                    maxLength={30}

                    className={`${styles.formControl} ${
                      viewDetail ? "" : isCanadianCrossingValid ? "borderGreen" : "borderRed"
                    }`}
                  />
                </Col>
              </Form.Group>

              <Form.Group className={`mt-5 align-items-center row m-l-0 m-r-0 ${styles.colFormLabel}`}>
                <Col sm={3} md={3} xs={3} className="p-0 mt-3">
                  <Form.Label className="col-form-label dealer-label">Sequence</Form.Label>
                </Col>
                <Col xs={1} md={1} className="p-0 me-2 mt-3">
                  <Input
                    name="sequence"
                    type="text"
                    value={sequence}
                    onChange={(e) => {
                      dispatch(setSequence(e.target.value.replace(/[^0-9]/g, "")));
                      setIsSequenceDuplicate(false);
                    }}
                    onBlur={(e) => checkUniqueSequence(e.target.value)}
                    disabled={viewDetail}
                    maxLength={2}

                    className={`${styles.formControl} ${
                      viewDetail ? "" : isSequenceValid ? "borderGreen" : "borderRed"
                    }`}
                  />
                </Col>
              </Form.Group>
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
}

export default PortsOfEntryContent;
