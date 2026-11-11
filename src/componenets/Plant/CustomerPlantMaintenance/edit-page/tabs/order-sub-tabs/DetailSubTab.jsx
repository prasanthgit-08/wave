import React, { useEffect, useState, useRef } from "react";
import { t } from "i18next";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
import {
  setPlantFormData,
  setOrderDetailsDispatcher,
  setOrderDetailsPhone,
  setOrderDetailsEmail,
  setOrderDetailsFAX,
  setShowBrockerLookup,
  setBrockerFK,
  setBrockerInput,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
import CustomerPlantMaintenanceService from "../../../../../../services/CustomerPlantMaintenanceService";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import BrokerLookup from "../../../../../LookupScreens/Broker/BrokerLookup";
import LookupButton from "../../../../../common/LookupButton";
import { emailRegex } from "../../../../../../utils/validation/EmailRegex";
const DetailSubTab = () => {
  const dispatch = useDispatch();
  const [dispatcher, setDispatcher] = useState("");
  const [dispatcherPhone, setDispatcherPhone] = useState("");
  const [dispatcherfax, setDispatcherfax] = useState("");
  const [dispatcherEmail, setDispatcherEmail] = useState("");
  const [orderInstructions, setOrderInstructions] = useState("");
  const [returnBroker, setReturnBroker] = useState("");
  const [brokerData, setBrokerData] = useState([]);
  const [brokerLoading, setBrokerLoading] = useState(false);

  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  const showBrockerLookup = useSelector((state) => state.customerPlantmaintanceReducer.showBrockerLookup);
  const brockerInput = useSelector((state) => state.customerPlantmaintanceReducer.brockerInput);
  const brockerFK = useSelector((state) => state.customerPlantmaintanceReducer.brockerFK);

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDispatcherPhone(formattedPhoneNumber);
  };

  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setDispatcherfax(formattedPhoneNumber);
  };
  //set value for return broker
  const setReturnBrokerValue = (id) => {
    if (id) {
      CustomerPlantMaintenanceService.getImportBrokerById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setBrockerInput(data.description?.trim()));
        })
        .catch((err) => {});
    } else {
      dispatch(setBrockerInput(""));
    }
  };

  useEffect(() => {
    if (editPlantData != null) {
      setReturnBroker(editPlantData.returnBrokerFK != null ? editPlantData.returnBrokerFK : "");
      //set value for return broker
      setReturnBrokerValue(editPlantData.returnBrokerFK);

      setDispatcher(editPlantData.dispatcher != null ? editPlantData.dispatcher?.trim() : "");
      setDispatcherPhone(
        editPlantData.dispatcherPhone != null ? formatPhoneNumber(editPlantData.dispatcherPhone) : ""
      );
      setDispatcherfax(
        editPlantData.dispatcherfax != null ? formatPhoneNumber(editPlantData.dispatcherfax) : ""
      );

      setDispatcherEmail(editPlantData.dispatcherEmail != null ? editPlantData.dispatcherEmail?.trim() : "");
      setOrderInstructions(
        editPlantData.orderInstructions != null ? editPlantData.orderInstructions?.trim() : ""
      );
    }
  }, [editPlantData, viewDetail]);

  const detailSubTab = () => {
    dispatch(
      setPlantFormData({
        dispatcher: dispatcher,
        dispatcherPhone: dispatcherPhone.replace(/\s+/g, ""),
        dispatcherEmail: dispatcherEmail,
        dispatcherfax: dispatcherfax.replace(/\s+/g, ""),
        returnBrokerFK: returnBroker,
        orderInstructions: orderInstructions,
      })
    );
  };
  /**
   *Return Broker Lookup
   */
  const handleBrockerLookup = () => {
    dispatch(setShowBrockerLookup(true));
  };
  const handleReturnBrokerLookup = (broker) => {
    dispatch(setShowBrockerLookup(false));
    dispatch(setBrockerInput(broker.description?.trim()));
    setReturnBroker(broker.importBrokerPK);
  };
  /**
   *Return Broker Autocomplete
   */
  const fetchBroker = (string) => {
    setBrokerLoading(true);
    CustomerPlantMaintenanceService.getBrokerData(string).then((response) => {
      const data = response.data.content;
      const brockerList = data?.map((brockers) => ({
        ...brockers,
        description: brockers.description?.trim(),
      }));
      setBrokerData(brockerList);
      setBrokerLoading(false);
    });
  };
  const handleBrokerSelectionAutocomplete = (broker) => {
    dispatch(setBrockerInput(broker.description?.trim()));
    setReturnBroker(broker.importBrokerPK);
  };

  useEffect(() => {
    detailSubTab();
  }, [dispatcher, dispatcherPhone, dispatcherEmail, dispatcherfax, orderInstructions, returnBroker]);

  useEffect(() => {
    dispatch(setOrderDetailsDispatcher(dispatcher));
    dispatch(setOrderDetailsPhone(dispatcherPhone));
    dispatch(setOrderDetailsFAX(dispatcherfax));
    dispatch(setOrderDetailsEmail(dispatcherEmail));
    dispatch(setBrockerFK(returnBroker));
  }, [dispatcher, dispatcherEmail, dispatcherPhone, dispatcherfax, returnBroker]);
  //Validation
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  const validationSchema = yup.object({
    dispatcher: yup.string().required(),
    dispatcherPhone: yup.string().matches(phoneRegex).required(),
    dispatcherEmail: yup.string().matches(emailRegex),
    dispatcherfax: yup.string().matches(phoneRegex),
  });
  return (
    <Formik
      initialValues={{
        dispatcher,
        dispatcherPhone,
        dispatcherfax,
        dispatcherEmail,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        dispatcher: true,
        dispatcherPhone: true,
        dispatcherfax: true,
        dispatcherEmail: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="p-15 w-100">
            <Row className="m-0 p-0">
              <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.detail.tab.returnBroker")}
                    </Form.Label>
                  </Col>
                  <Col xs={5} md={5} sm={5} className={`p-0 d-flex`}>
                    <AutoCompleteDropdown
                      arrayList={brokerData}
                      searchString={brockerInput}
                      renderItemId={(item) => item.importBrokerPK}
                      renderItemField={(item) => item.description}
                      handleSearchString={(string) => dispatch(setBrockerInput(string))}
                      fetchDataBySearchString={fetchBroker}
                      onSelect={handleBrokerSelectionAutocomplete}
                      selectedId={returnBroker}
                      clearInputCallback={() => {
                        setReturnBroker("");
                      }}

                      disabled={viewDetail}
                      loading={brokerLoading}
                      className={`${returnBroker === "" && brockerInput !== "" ? "borderRed" : ""}`}
                    />
                    <LookupButton
                      disabled={viewDetail}
                      onClick={handleBrockerLookup}
                      //onhold
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.delay.detail.tab.dispatcher")}
                    </Form.Label>
                  </Col>

                  <Col xs={6} md={6} sm={6} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.dispatcher === undefined &&
                              dispatcher != null &&
                              dispatcher.length >= 1
                            ? "borderGreen"
                            : formik.errors.dispatcher !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      id="dispatcher"
                      name="dispatcher"
                      type="dispatcher"
                      value={dispatcher}
                      maxLength={30}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setDispatcher(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.pickuplot.tab.phone")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                    <input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.dispatcherPhone === undefined &&
                              dispatcherPhone != null &&
                              dispatcherPhone.length > 1
                            ? "borderGreen"
                            : formik.errors.dispatcherPhone !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      id="customer"
                      name="customer"
                      type="customer"
                      value={dispatcherPhone}
                      maxLength={14}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onChange={(e) => phoneFormatHandler(e)}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setDispatcherPhone(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.general.tab.fax")}
                    </Form.Label>
                  </Col>

                  <Col xs={2} md={2} sm={2} className="p-0 w-92px">
                    <input
                      style={{
                        border: viewDetail
                          ? ""
                          : String(dispatcherfax).match(phoneRegex) || dispatcherfax === ""
                            ? "black 1px solid"
                            : "red 2px solid",
                      }}

                      className="customFormControl"
                      id="dispatcherfax"
                      name="dispatcherfax"
                      type="text"
                      value={dispatcherfax}
                      maxLength={14}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onChange={(e) => faxFormatHandler(e)}
                      onInput={(e) => {
                        formik.handleChange(e);
                        setDispatcherfax(e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="col-form-label dealer-label">
                      {t("edit.customer.plant.page.pickuplot.tab.email")}
                    </Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <input
                      className={`customFormControl ${
                        viewDetail === true
                          ? ""
                          : formik.errors.dispatcherEmail === undefined &&
                              dispatcherEmail != null &&
                              dispatcherEmail.length > 1
                            ? ""
                            : formik.errors.dispatcherEmail !== undefined
                              ? "borderRed"
                              : ""
                      }`}
                      type="dispatcherEmail"
                      name="dispatcherEmail"
                      value={dispatcherEmail}
                      maxLength={70}
                      disabled={viewDetail}
                      autoComplete="newpassword"
                      aria-autocomplete="none"
                      onInput={(e) => {
                        setDispatcherEmail(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={5} md={6} xs={4} className="ps-lg-5">
                <Form.Group className="form-group m-t-20  m-b-10 align-items row tabs-row m-l-0 m-r-0">
                  <Col sm={12} md={12} xs={12} className="p-0">
                    <label className="col-form-label dealer-label p-0 m-b-20">
                      {t("edit.customer.plant.page.delay.detail.tab.orderEntryInstructions")}
                    </label>
                  </Col>

                  <Col sm={12} md={10} className="p-0">
                    <textarea
                      rows={10}
                      cols={20}
                      type="text"
                      className="customFormControl h-100 "
                      name="notes"
                      value={orderInstructions}
                      disabled={viewDetail}
                      onInput={(e) => setOrderInstructions(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Brocker Lookup Modal */}
          <BrokerLookup
            show={showBrockerLookup}
            onHide={() => dispatch(setShowBrockerLookup(false))}
            renderItemId={(broker) => broker.importBrokerPK}
            handleLookupSelection={handleReturnBrokerLookup}
            brokerType={"import"}
            MaintenanceProgram
          />
        </Form>
      )}
    </Formik>
  );
};

export default DetailSubTab;
