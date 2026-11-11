import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGarnishmentCity,
  setGarnishmentPostCode,
  setGarnishmentStateCode,
  setIsCheckTabValid,
  setSaveGarnishmentObject,
} from "../../../../../../redux/DriverGarnishmentsSlice";
import * as yup from "yup";
import { Formik } from "formik";
import PostalCodeComponent from "../../../../../common/PostalCodeComponent";
import Input from "../../../../../../components/common/input";

const Check = () => {
  const dispatch = useDispatch();
  const initialValue = [{ city: "", statecode: "", postalcode: "" }];
  const garnishmentDataById = useSelector((state) => state.driverGarnishmentsReducer.garnishmentDataById);
  const viewDetail = useSelector((state) => state.driverGarnishmentsReducer.viewDetail);
  const [zipPostLenght, setZipPostLenght] = useState();
  const [postalCodeOnChange, setPostalCodeOnChange] = useState(false);
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [checkStubText1, setCheckStubText1] = useState("");
  const [checkStubText2, setCheckStubText2] = useState("");
  const [checkStubText3, setCheckStubText3] = useState("");
  const [checkStubText4, setCheckStubText4] = useState("");
  const [driverGarnishmentPK, setDriverGarnishmentPK] = useState(null);
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [canadian, setCanadian] = useState(false);
  const [zipIdChcek, setZipIdCheck] = useState("");
  const [postalCodePK, setPostalCodePK] = useState(null);
  /*setting values from backend*/
  useEffect(() => {
    setDriverGarnishmentPK(garnishmentDataById ? garnishmentDataById.driverGarnishmentPK : null);
    setName(garnishmentDataById ? garnishmentDataById.name?.trim() : "");
    setAddress1(garnishmentDataById ? garnishmentDataById.address1?.trim() : "");
    setAddress2(garnishmentDataById ? garnishmentDataById.address2?.trim() : "");
    setCity(garnishmentDataById ? garnishmentDataById.city?.trim() : "");
    setStateCode(garnishmentDataById ? garnishmentDataById.stateCode?.trim() : "");
    setPostalCode(garnishmentDataById ? garnishmentDataById.postalCode?.trim() : "");
    setCheckStubText1(garnishmentDataById ? garnishmentDataById.checkStubText1?.trim() : "");
    setCheckStubText2(garnishmentDataById ? garnishmentDataById.checkStubText2?.trim() : "");
    setCheckStubText3(garnishmentDataById ? garnishmentDataById.checkStubText3?.trim() : "");
    setCheckStubText4(garnishmentDataById ? garnishmentDataById.checkStubText4?.trim() : "");
    initialValue[0].city = garnishmentDataById?.city != null ? garnishmentDataById?.city?.trim() : "";
    initialValue[0].statecode =
      garnishmentDataById?.stateCode != null ? garnishmentDataById?.stateCode?.trim() : "";
    initialValue[0].postalcode =
      garnishmentDataById?.postalCode != null ? garnishmentDataById?.postalCode?.trim() : "";
    initialValue[0].canadian = garnishmentDataById?.canadian != null ? garnishmentDataById?.canadian : false;
    setPostalValues(initialValue);
    setPostalCodePK(garnishmentDataById?.postalCodePK ? garnishmentDataById?.postalCodePK : null);
  }, [garnishmentDataById, viewDetail]);

  /*setting values to save to backend*/
  useEffect(() => {
    dispatch(
      setSaveGarnishmentObject({
        name,
        address1,
        address2,
        city,
        stateCode,
        postalCode,
        checkStubText1,
        checkStubText2,
        checkStubText3,
        checkStubText4,
      })
    );
  }, [
    name,
    address1,
    address2,
    city,
    stateCode,
    postalCode,
    checkStubText1,
    checkStubText2,
    checkStubText3,
    checkStubText4,
  ]);

  useEffect(() => {
    dispatch(setGarnishmentPostCode(postalCode));
    dispatch(setGarnishmentCity(city));
    dispatch(setGarnishmentStateCode(stateCode));
  }, [postalCode, city, stateCode]);

  const validationSchema = yup.object({
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
  });
  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  //  for save validation of general tab
  useEffect(() => {
    if (name && address1 && checkStubText1 && postalCodePK) {
      dispatch(setIsCheckTabValid(true));
    } else {
      dispatch(setIsCheckTabValid(false));
    }
  }, [
    name,
    address1,
    city,
    stateCode,
    postalCode,
    checkStubText1,
    zipPostLenght,
    postalCodeOnChange,
    postalCodePK,
  ]);

  return (
    <Formik
      initialValues={{
        city,
        stateCode,
        postalCode,
        canadian,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        city: true,
        stateCode: true,
        postalCode: true,
        canadian: false,
      }}
      on={on}
    >
      {(formik) => (
        <div className="p-15">
          <div className="col-12 p-2">
            <div className="d-flex align-items-center mt-2 mb-3">
              <div className="col-3 ">Check Pay To The Order Of</div>
              <div className="col-4 ">
                <Input
                  className={`form-controlDriverService ${
                    !viewDetail ? (!name ? "borderRed" : "borderGreen") : ""
                  }`}
                  type="search"
                  maxLength={30}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={viewDetail}
                />
              </div>
            </div>

            <div className="d-flex align-items-center mt-2 mb-3">
              <div className="col-3"></div>
              <div className="col-4 ">
                <Input
                  className={`form-controlDriverService ${
                    !viewDetail ? (!address1 ? "borderRed" : "borderGreen") : ""
                  }`}
                  type="search"
                  maxLength={30}
                  value={address1}
                  onChange={(e) => {
                    setAddress1(e.target.value);
                  }}
                  disabled={viewDetail}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mt-2 mb-3">
              <div className="col-3"></div>
              <div className="col-4 ">
                <Input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={30}
                  value={address2}
                  onChange={(e) => {
                    setAddress2(e.target.value);
                  }}
                  disabled={viewDetail}
                />
              </div>
            </div>

            <PostalCodeComponent
              disabled={viewDetail}
              city={viewDetail ? garnishmentDataById?.city?.toUpperCase()?.trim() : city}
              setCity={setCity}
              stateCode={viewDetail ? garnishmentDataById?.stateCode?.trim() : stateCode}
              setStateCode={setStateCode}
              postalCode={viewDetail ? garnishmentDataById?.postalCode?.trim() : postalCode}
              setPostalCode={setPostalCode}
              setPostalValues={setPostalValues}
              postalOptions={postalOptions}
              postalCodePK={postalCodePK}
              setPostalCodePK={setPostalCodePK}
              canadian={canadian}
              setCanadian={setCanadian}
            />
            <div className="d-flex align-items-center mb-2 invisible">
              <div className="col-3">Deduct Yearly</div>
              <div className="col-2 ">
                <input className="form-controlDriverService" type="search" maxLength={70} />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3">Check Stub Detail</div>
              <div className="col-7">
                <Input
                  className={`form-controlDriverService ${
                    !viewDetail ? (!checkStubText1 ? "borderRed" : "borderGreen") : ""
                  }`}
                  type="search"
                  maxLength={70}
                  onChange={(e) => {
                    setCheckStubText1(e.target.value);
                  }}
                  value={checkStubText1}
                  disabled={viewDetail}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3"></div>
              <div className="col-7">
                <Input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={70}
                  onChange={(e) => {
                    setCheckStubText2(e.target.value);
                  }}
                  value={checkStubText2}
                  disabled={viewDetail}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3"></div>
              <div className="col-7">
                <Input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={70}
                  onChange={(e) => {
                    setCheckStubText3(e.target.value);
                  }}
                  value={checkStubText3}
                  disabled={viewDetail}
                />
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="col-3"></div>
              <div className="col-7">
                <Input
                  className="form-controlDriverService"
                  type="search"
                  maxLength={70}
                  onChange={(e) => {
                    setCheckStubText4(e.target.value);
                  }}
                  value={checkStubText4}
                  disabled={viewDetail}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Check;
