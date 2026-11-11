import React, { useEffect, useState } from "react";
import { Form, Col, Row, FormLabel } from "react-bootstrap";
import { t } from "i18next";
import { useParams } from "react-router-dom";
import {
  setCopyOfPAPS,
  setDispatchUpdates,
  setDeliveryOnly,
  setDispatchOnly,
  setReturnedUpdates,
  setSpecialCodeFK,
  setDefaultSpecialCodeInput,
  setDispatchTabValid,
  setDispatchTabColor,
} from "../../../../../redux/CustomerEmailMaintenanceSlice";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import SpecialCodesService from "../../../../../services/SpecialCodesService";
import SpecialCodeLookup from "../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";

function Dispatch() {
  const dispatch = useDispatch();
  const { cupk } = useParams();
  const [specialCodesData, setSpecialCodesData] = useState([]);
  const [defaultSpecialCode, setDefaultSpecialCode] = useState([]);
  const [showDefaultSpecialCode, setShowDefaultSpecialCode] = useState(false);
  const copyOfPAPS = useSelector((state) => state.customerEmailMaintenance.copyOfPAPS);
  const dispatchUpdates = useSelector((state) => state.customerEmailMaintenance.dispatchUpdates);
  const deliveryOnly = useSelector((state) => state.customerEmailMaintenance.deliveryOnly);
  const dispatchOnly = useSelector((state) => state.customerEmailMaintenance.dispatchOnly);
  const returnedUpdates = useSelector((state) => state.customerEmailMaintenance.returnedUpdates);
  const specialCodeFK = useSelector((state) => state.customerEmailMaintenance.specialCodeFK);
  const defaultSpecialCodeInput = useSelector(
    (state) => state.customerEmailMaintenance.defaultSpecialCodeInput
  );
  const EditMode = useSelector((state) => state.customerEmailMaintenance.editMode);
  const dispatchTabValid = useSelector((state) => state.customerEmailMaintenance.dispatchTabValid);
  const [isSpecialCodeLoading, setIsSpecialCodeLoading] = useState(false);

  const fetchSpecialCodeByName = (string) => {
    setIsSpecialCodeLoading(true);
    SpecialCodesService.getSpecialCodeForAuto(string)
      .then((response) => {
        const data = response.data;
        const codeList = data.content.map((code) => ({ ...code, description: code.description?.trim() }));
        setDefaultSpecialCode(codeList);
      })
      .catch((error) => {})
      .finally(() => {
        setIsSpecialCodeLoading(false);
      });
  };

  const handleDefaultSpecialCodeSelection = (code) => {
    dispatch(setSpecialCodeFK(code.specialCodePK));
    dispatch(setDefaultSpecialCodeInput(code.description?.trim()));
  };
  const handleDefaultSpecialCodeLookupModalshow = () => {
    setShowDefaultSpecialCode(true);
  };
  const handleDefaultSpecialCodeLookupSelection = (code) => {
    dispatch(setSpecialCodeFK(code.specialCodePK));
    dispatch(setDefaultSpecialCodeInput(code.description?.trim()));
    setShowDefaultSpecialCode(false);
  };
  const hideDefaultSpecialCodeModal = () => {
    setShowDefaultSpecialCode(false);
  };

  useEffect(() => {
    if (
      (specialCodeFK == null && defaultSpecialCodeInput === "") ||
      (specialCodeFK != null && defaultSpecialCodeInput !== "")
    ) {
      dispatch(setDispatchTabValid(true));
    } else {
      dispatch(setDispatchTabValid(false));
    }
  }, [specialCodeFK, defaultSpecialCodeInput]);
  useEffect(() => {
    if (cupk === undefined || EditMode === undefined || EditMode === false) {
      if (dispatchTabValid === true) {
        dispatch(setDispatchTabColor(""));
      } else {
        dispatch(setDispatchTabColor("color-red"));
      }
    } else {
      dispatch(setDispatchTabColor(""));
    }
  }, [dispatchTabValid, EditMode]);

  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0 justify-content-start">
        <Col sm={6} md={6} lg={6} xl={6} xs={6}>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.dispatch.tab.copy.of.paps")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="copyOfPAPS"
                name="copyOfPAPS"
                checked={copyOfPAPS}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setCopyOfPAPS(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.dispatch.tab.dispatch.updates")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="dispatchUpdates"
                name="dispatchUpdates"
                checked={dispatchUpdates}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setDispatchUpdates(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.dispatch.tab.delivery.only")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="deliveryOnly"
                name="deliveryOnly"
                checked={deliveryOnly}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setDeliveryOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.dispatch.tab.dispatch.only")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="dispatchOnly"
                name="dispatchOnly"
                checked={dispatchOnly}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setDispatchOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={4} sm={4} md={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.dispatch.tab.returned.updates")}
              </Form.Label>
            </Col>

            <Col xs={1} md={6} sm={2} className="p-0 d-flex">
              <input
                type="checkbox"
                className="form-check-input p-0 "
                id="returnedUpdates"
                name="returnedUpdates"
                checked={returnedUpdates}
                disabled={EditMode}

                onChange={(e) => {
                  dispatch(setReturnedUpdates(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          {/* SpecialCode autocomplete and Lookup implemented */}
          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col sm={4} md={4} xs={4} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.dispatch.tab.special.codes")}
              </Form.Label>
            </Col>

            <Col xs={7} md={7} sm={7} className="p-0 d-flex">
              <AutoCompleteDropdown
                arrayList={defaultSpecialCode}
                searchString={defaultSpecialCodeInput}
                customFormatSearchString={(searchString) => searchString}
                renderItemId={(code) => code.specialCodePK}
                renderItemField={(code) => code.description}
                handleSearchString={(string) => dispatch(setDefaultSpecialCodeInput(string))}
                fetchDataBySearchString={fetchSpecialCodeByName}
                loading={isSpecialCodeLoading}
                onSelect={handleDefaultSpecialCodeSelection}
                selectedId={specialCodeFK}
                clearInputCallback={() => {
                  dispatch(setSpecialCodeFK(null));
                }}
                disabled={EditMode}
                towardsTop
                className={`${specialCodeFK === null && defaultSpecialCodeInput !== "" ? "borderRed" : ""}`}
              />
              <LookupButton onClick={handleDefaultSpecialCodeLookupModalshow} disabled={EditMode} />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <SpecialCodeLookup
        show={showDefaultSpecialCode}
        onHide={hideDefaultSpecialCodeModal}
        renderItemId={(code) => code.specialCodePK}
        handleLookupSelection={handleDefaultSpecialCodeLookupSelection}
        MaintenanceProgram
      />
    </div>
  );
}

export default Dispatch;
