import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import {
  setAddress1,
  setAddress2,
  setAlternatePhone,
  setDispatchEmail,
  setDispatcher,
  setDispatcherCellPhone,
  setDispatcherEmail,
  setDispatcherPhone,
  setEditFormData,
  setEIN,
  setEmail,
  setFAXNumber,
  setHaulAndTow,
  setInsuranceNotes,
  setLowboy,
  setMotorized,
  setName,
  setOnCancel,
  setPhone,
  setPopup,
  setPostalCodeCity,
  setPostalCodeOnChange,
  setPostalCodeStateCode,
  setTowaway,
  setTransportCompanyPK,
  setTransportCompanyPostalCode,
  setTruckCamper,
  setViewDetail,
} from "../../../../redux/TransportCompaniesSlice";
import TransportCompanysService from "../../../../services/TransportCompanysService";
import PostalCode from "../../../common/PostalCode";

function Notes() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalcode, setPostalCode] = useState("");

  const [canadian, setCanadian] = useState(false);
  const initialValue = [{ city: "", statecode: "", postalcode: "", canadian: false }];
  const [postalOptions, setPostalValues] = useState(initialValue);
  const [zipPostLenght, setzipPostLenght] = useState();
  const [cityLength, setcityLength] = useState();

  const [zipIdChcek, setZipIdCheck] = useState("");

  const editFormData = useSelector((state) => state.transportCompaniesReducer.editFormData);
  const name = useSelector((state) => state.transportCompaniesReducer.name);
  const address1 = useSelector((state) => state.transportCompaniesReducer.address1);
  const address2 = useSelector((state) => state.transportCompaniesReducer.address2);
  const phone = useSelector((state) => state.transportCompaniesReducer.phone);
  const alternatePhone = useSelector((state) => state.transportCompaniesReducer.alternatePhone);
  const fAXNumber = useSelector((state) => state.transportCompaniesReducer.fAXNumber);
  const ein = useSelector((state) => state.transportCompaniesReducer.ein);
  const email = useSelector((state) => state.transportCompaniesReducer.email);
  const dispatcher = useSelector((state) => state.transportCompaniesReducer.dispatcher);
  const dispatcherPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherPhone);
  const dispatcherCellPhone = useSelector((state) => state.transportCompaniesReducer.dispatcherCellPhone);
  const dispatcherEmail = useSelector((state) => state.transportCompaniesReducer.dispatcherEmail);
  const dispatchEmail = useSelector((state) => state.transportCompaniesReducer.dispatchEmail);
  const towaway = useSelector((state) => state.transportCompaniesReducer.towaway);
  const haulAndTow = useSelector((state) => state.transportCompaniesReducer.haulAndTow);
  const lowboy = useSelector((state) => state.transportCompaniesReducer.lowboy);
  const popup = useSelector((state) => state.transportCompaniesReducer.popup);
  const truckCamper = useSelector((state) => state.transportCompaniesReducer.truckCamper);
  const motorized = useSelector((state) => state.transportCompaniesReducer.motorized);
  const changesCancelled = useSelector((state) => state.transportCompaniesReducer.changesCancelled);
  const onCancel = useSelector((state) => state.transportCompaniesReducer.onCancel);
  const notes = useSelector((state) => state.transportCompaniesReducer.notes);

  let viewDetail = useSelector((state) => state.transportCompaniesReducer.viewDetail);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setTransportCompanyPK(editFormData.transportCompanyPK || null));
      dispatch(setName(editFormData.name || ""));
      dispatch(setAddress1(editFormData.address1 || ""));
      dispatch(setAddress2(editFormData.address2 || ""));
      dispatch(setPhone(editFormData.phone || ""));
      dispatch(setAlternatePhone(editFormData.alternatePhone || ""));
      dispatch(setFAXNumber(editFormData.faxNumber || ""));
      dispatch(setEIN(editFormData.ein || ""));
      dispatch(setEmail(editFormData.email || ""));
      dispatch(setDispatcher(editFormData.dispatcher || ""));
      dispatch(setDispatcherPhone(editFormData.dispatcherPhone || ""));
      dispatch(setDispatcherCellPhone(editFormData.dispatcherCellPhone || ""));
      dispatch(setDispatcherEmail(editFormData.dispatcherEmail || ""));
      dispatch(setTowaway(editFormData.towaway || false));
      dispatch(setHaulAndTow(editFormData.haulAndTow || false));
      dispatch(setLowboy(editFormData.lowboy || false));
      dispatch(setPopup(editFormData.popup || false));
      dispatch(setTruckCamper(editFormData.truckCamper || false));
      dispatch(setMotorized(editFormData.motorized || false));
      initialValue[0].city = editFormData.city != null ? editFormData.city?.trim() : "";
      initialValue[0].statecode = editFormData.stateCode != null ? editFormData.stateCode?.trim() : "";
      initialValue[0].canadian = editFormData.canadian != null ? editFormData.canadian : false;
      initialValue[0].postalcode = editFormData.postalCode != null ? editFormData.postalCode?.trim() : "";
      setPostalValues(initialValue);
    }
  }, [editFormData, changesCancelled]);

  useEffect(() => {
    // dispatch(setDealerCityLength(cityLength));
  }, []);

  const changePostalCode = (e) => {
    dispatch(setPostalCodeOnChange(e));
  };
  const handleMouseEventMain = (e) => {
    setZipIdCheck(e.target.dataset.id);
  };

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    name: yup.string().required(),
    address1: yup.string().required(),
    city: yup.string().required(),
    statecode: yup.string().max(2).min(2).required(),
    postalcode: yup.string().required(),
    phone: yup.string().matches(phoneRegex).required(),
    tollfreephone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
    login: yup.string(),
    password: yup.string().when("login", {
      is: (login) => login !== undefined && login.length > 0,
      then: yup.string().required(),
    }),
  });

  return (
    <Formik
      initialValues={{}}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        name: true,
        address1: true,
        city: true,
        statecode: true,
        lastOrderDate: true,
        phone: true,
        tollfreephone: true,
        fax: true,
        postalcode: true,
      }}
    >
      {(formik) => (
        <Form on={formik.handle}>
          <div className="p-15 w-100" onClick={handleMouseEventMain} onFocus={handleMouseEventMain}>
            <Row className="m-0 p-0">
              <Col sm={10} md={10} lg={10} xl={10} xs={10}>
                <Form.Group className="form-group mt-3 m-b-10 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0" style={{ maxWidth: "40px", height: "336px" }}>
                    <label className="col-form-label dealer-label p-0 m-b-20">
                      {t("edit.dealer.page.general.tab.notes")}
                    </label>
                  </Col>

                  <Col sm={10} md={10} xs={8} className="p-0">
                    <textarea
                      rows={20}
                      cols={60}
                      type="text"
                      className="customFormControl h-100 "
                      name="notes"
                      value={notes}
                      disabled={viewDetail}
                      onInput={(e) => {
                        dispatch(setInsuranceNotes(e.target.value));
                      }}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default Notes;
