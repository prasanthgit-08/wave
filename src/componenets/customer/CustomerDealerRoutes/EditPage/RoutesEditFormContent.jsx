import React from "react";
import * as yup from "yup";
import { Col, Form, Row } from "react-bootstrap";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetData,
  setCancelChanges,
  setDisableSave,
  setEditFormData,
  setIsPOE,
  setMotorised,
  setPOECity,
  setPOEId,
  setReduxCity,
  setReduxPostalCode,
  setReduxState,
  setTowable,
  setViewDetail,
} from "../../../../redux/CustomerDealerRoutesSlice";
import PortOfEntryLookup from "../../../LookupScreens/PortOfEntry/PortOfEntryLookup";
import CustomerDealerRoutesService from "../../../../services/CustomerDealerRoutesService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PostalCodeComponent from "../../../common/PostalCodeComponent";
import Loading from "../../../../components/common/loading";

const RoutesEditFormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);
  const [showPOE, setShowPOE] = useState(false);
  const [pOEData, setPOEData] = useState([]);
  const [postalCodePK, setPostalCodePK] = useState(null);
  const [loadng, setLoadng] = useState(false);
  const [dropdownLoadng, setDropdownLoadng] = useState(false);

  const viewDetail = useSelector((state) => state.customerDealerRoutes.viewDetail);
  const isPOE = useSelector((state) => state.customerDealerRoutes.isPOE);
  const motorized = useSelector((state) => state.customerDealerRoutes.motorized);
  const towable = useSelector((state) => state.customerDealerRoutes.towable);
  const poeCity = useSelector((state) => state.customerDealerRoutes.poeCity);
  const poeId = useSelector((state) => state.customerDealerRoutes.poeId);
  const cancelChanges = useSelector((state) => state.customerDealerRoutes.cancelChanges);
  const editFormData = useSelector((state) => state.customerDealerRoutes.editFormData);

  const customerdealerid = params.customerdealerid;
  const routesid = params.routesid;
  const group = params.group;
  const dealerId = params.dealerId;

  const fetchPOEData = (string) => {
    setDropdownLoadng(true);
    CustomerDealerRoutesService.getPOEforAutoComplete(string)
      .then((response) => {
        setPOEData(response.data.content);
      })
      .catch((err) => console.log(err))
      .finally(() => setDropdownLoadng(false));
  };

  const getData = () => {
    setLoadng(true);
    CustomerDealerRoutesService.getById(routesid)
      .then(({ data }) => {
        dispatch(setEditFormData(data));
        dispatch(setIsPOE(data.isPOE));
        dispatch(setPOECity(data.poeCity ? data.poeCity?.trim() : ""));
        dispatch(setPOEId(data.poeId ? data.poeId : ""));
        !data.isPOE && dispatch(setReduxCity(data.city ? data.city?.trim() : ""));
        !data.isPOE && dispatch(setReduxPostalCode(data.postalCode ? data.postalCode : ""));
        !data.isPOE && dispatch(setReduxState(data.stateCode ? data.stateCode : ""));
        !data.isPOE && setCity(data.city ? data.city?.trim() : "");
        !data.isPOE && setStateCode(data.stateCode ? data.stateCode : "");
        !data.isPOE && setPostalCode(data.postalCode ? data.postalCode : "");
        dispatch(setTowable(data.towable));
        dispatch(setMotorised(data.motorized));
        setPostalCodePK(data?.postalCodePK);
        setTimeout(() => {
          setLoadng(false);
        }, 10);
      })
      .catch((e) => {
        navigate("/customer-dealer-routes/" + customerdealerid + "/" + group + "/" + dealerId);
        setLoadng(false);
      });
  };

  const lookupSelection = (poe) => {
    dispatch(setPOECity(poe.usCity?.trim()));
    dispatch(setPOEId(poe.poePK));
    setShowPOE(false);
  };

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });

  useEffect(() => {
    if (
      window.location.pathname ===
      "/edit-customer-dealer-routes/" + customerdealerid + "/" + routesid + "/" + group + "/" + dealerId
    ) {
      getData();
      dispatch(setViewDetail(true));
    } else {
      dispatch(resetData());
      dispatch(setViewDetail(false));
    }
  }, []);

  useEffect(() => {
    if (cancelChanges) {
      !editFormData.isPOE && setCity(editFormData.city?.trim());
      !editFormData.isPOE && setStateCode(editFormData.stateCode);
      !editFormData.isPOE && setPostalCode(editFormData.postalCode);
      !editFormData.isPOE && dispatch(setCancelChanges(false));
    }
  }, [cancelChanges]);

  useEffect(() => {
    if (!isPOE) {
      dispatch(setPOECity(""));
      dispatch(setPOEId(""));
    } else {
      dispatch(setReduxCity(""));
      dispatch(setReduxPostalCode(""));
      dispatch(setReduxState(""));
      setCity("");
      setStateCode("");
      setPostalCode("");
    }
  }, [isPOE]);

  useEffect(() => {
    dispatch(setReduxCity(city));
    dispatch(setReduxPostalCode(postalcode));
    dispatch(setReduxState(statecode));
  }, [city, postalcode, statecode]);
  useEffect(() => {
    if (!(motorized || towable)) {
      dispatch(setDisableSave(true));
    } else if (isPOE && !poeId) {
      dispatch(setDisableSave(true));
    } else if (!isPOE && !postalCodePK) {
      dispatch(setDisableSave(true));
    } else {
      dispatch(setDisableSave(false));
    }
  }, [city, postalcode, isPOE, poeId, motorized, towable, postalCodePK]);

  useEffect(() => {
    dispatch(setReduxPostalCode(postalcode));
  }, [postalcode]);

  return (
    <Formik
      initialValues={{
        city,
        statecode,
        postalcode,
        canadian,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        statecode: true,
        postalcode: true,
        canadian: false,
      }}
    >
      {(formik) => (
        <Form>
          <div className="w-99 p-15">
            <div className={` quarterScreenFormContentHeight shadow-sm rounded border`}>
              <div className="m-b-5">
                <div className="p-15 w-100">
                  <Row className="m-0 ">
                    <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                      <PostalCodeComponent
                        isHorizontal
                        disabled={viewDetail || isPOE}
                        city={city}
                        setCity={setCity}
                        stateCode={statecode}
                        setStateCode={setStateCode}
                        postalCode={postalcode}
                        setPostalCode={setPostalCode}
                        setPostalValues={setPostalValues}
                        postalOptions={postalOptions}
                        postalCodePK={postalCodePK}
                        setPostalCodePK={setPostalCodePK}
                        canadian={canadian}
                        setCanadian={setCanadian}
                      />
                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>{"Is A POE"}</Form.Label>
                        </Col>
                        <Col xs={1} md={1} sm={1} className="p-0">
                          <input
                            type="checkbox"
                            className="form-check-input p-0 "
                            name="isPOE"
                            checked={isPOE}
                            disabled={viewDetail}
                            onChange={(e) => {
                              dispatch(setIsPOE(e.target.checked));
                              setCity("");
                              setStateCode("");
                              setPostalCode("");
                            }}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>{"POE"}</Form.Label>
                        </Col>
                        <Col xs={4} md={4} sm={4} className="p-0 d-flex">
                          <AutoCompleteDropdown
                            arrayList={pOEData}
                            searchString={poeCity}
                            fetchDataBySearchString={(string) => {
                              fetchPOEData(string);
                            }}
                            handleSearchString={(string) => {
                              dispatch(setPOECity(string));
                            }}
                            renderItemField={(poe) => poe.usCity}
                            renderItemId={(poe) => poe.poePK}
                            onSelect={lookupSelection}
                            disabled={viewDetail || !isPOE}
                            clearInputCallback={() => {
                              dispatch(setPOEId(null));
                            }}
                            towardsTop
                            maxHeight={150}
                            loading={dropdownLoadng}
                            className={`customFormControl ${
                              viewDetail || !isPOE ? "borderBlack" : poeId ? "borderGreen" : "borderRed"
                            }`}
                            selectedId={poeId}
                          />
                          <LookupButton
                            onClick={() => {
                              setShowPOE(true);
                            }}
                            disabled={viewDetail || !isPOE}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>{"Motorized"}</Form.Label>
                        </Col>
                        <Col xs={1} md={1} sm={1} className="p-0">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0  ${
                              viewDetail || towable || motorized ? "borderBlack" : "borderRed"
                            }`}
                            name="motorized"
                            checked={motorized}
                            disabled={viewDetail}
                            onChange={(e) => dispatch(setMotorised(e.target.checked))}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                        <Col sm={3} md={3} xs={3} className="p-0">
                          <Form.Label className={QuarterScreen.colFormLabel}>{"Towable"}</Form.Label>
                        </Col>
                        <Col xs={1} md={1} sm={1} className="p-0">
                          <input
                            type="checkbox"
                            className={`form-check-input p-0  ${
                              viewDetail || towable || motorized ? "borderBlack" : "borderRed"
                            }`}
                            name="towable"
                            checked={towable}
                            disabled={viewDetail}
                            onChange={(e) => dispatch(setTowable(e.target.checked))}
                          />
                        </Col>
                        <Row
                          className={`${!(towable || motorized) && !viewDetail ? "hide-elements" : "hide-elements"}`}
                        >
                          <Col xs={3} md={3} sm={3}></Col>
                        </Row>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            {loadng && <Loading />}
            <PortOfEntryLookup
              show={showPOE}
              renderItemId={(poe) => poe.poePK}
              handleLookupSelection={lookupSelection}
              onHide={() => {
                setShowPOE(false);
              }}
              brokerType={"export"}
              MaintenanceProgram
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RoutesEditFormContent;
