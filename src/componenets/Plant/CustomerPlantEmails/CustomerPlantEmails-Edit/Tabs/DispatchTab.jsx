import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import QuarterScreen from "../../../../../styles/QuarterScreen.module.css";
import LookupButton from "../../../../common/LookupButton";
import {
  setCopyOfPAPS,
  setDeliveryOnly,
  setDispatchOnly,
  setDispatchUpdates,
  setIsDispatchTabValid,
  setReturnedUpdates,
  setSaveFormData,
  setSpecialCodeId,
  setSpecialCodeInput,
} from "../../../../../redux/CustomerPlantEmailSlice";
import SpecialCodeLookup from "../../../../LookupScreens/SpecialCode/SpecialCodeLookup";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import SpecialCodesService from "../../../../../services/SpecialCodesService";
const DispatchTab = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showSpecialCodeLookup, setShowSpecialCodeLookup] = useState(false);
  const [specialCodeData, setSpecialCodeData] = useState([]);
  const copyOfPAPS = useSelector((state) => state.customerPlantEmailReducer.copyOfPAPS);
  const dispatchUpdates = useSelector((state) => state.customerPlantEmailReducer.dispatchUpdates);
  const deliveryOnly = useSelector((state) => state.customerPlantEmailReducer.deliveryOnly);
  const dispatchOnly = useSelector((state) => state.customerPlantEmailReducer.dispatchOnly);
  const returnedUpdates = useSelector((state) => state.customerPlantEmailReducer.returnedUpdates);
  const specialCodeId = useSelector((state) => state.customerPlantEmailReducer.specialCodeId);
  const viewDetail = useSelector((state) => state.customerPlantEmailReducer.viewDetail);
  const editFormData = useSelector((state) => state.customerPlantEmailReducer.editFormData);
  const specialCodeInput = useSelector((state) => state.customerPlantEmailReducer.specialCodeInput);

  //set Special code value
  const setSpecialCodeValue = (id) => {
    if (id !== null) {
      SpecialCodesService.getSpecialCodesById(id)
        .then((response) => {
          const data = response.data;
          dispatch(setSpecialCodeInput(data.description?.trim()));
          dispatch(setSpecialCodeId(data.specialCodePK));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setSpecialCodeInput(""));
    }
  };

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setCopyOfPAPS(editFormData.copyOfPAPS ? editFormData.copyOfPAPS : ""));
      dispatch(setDispatchUpdates(editFormData.dispatchUpdates ? editFormData.dispatchUpdates : ""));
      dispatch(setDeliveryOnly(editFormData.deliveryOnly ? editFormData.deliveryOnly : ""));
      dispatch(setDispatchOnly(editFormData.dispatchOnly ? editFormData.dispatchOnly : ""));
      dispatch(setReturnedUpdates(editFormData.returnedUpdates ? editFormData.returnedUpdates : ""));
      setSpecialCodeValue(editFormData.specialCodeFK);
    }
  }, [editFormData]);
  // to backend
  const DispatchTabData = () => {
    dispatch(
      setSaveFormData({
        copyOfPAPS,
        dispatchUpdates,
        deliveryOnly,
        dispatchOnly,
        returnedUpdates,
        specialCodeFK: specialCodeId,
      })
    );
  };
  useEffect(() => {
    DispatchTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copyOfPAPS, dispatchUpdates, deliveryOnly, dispatchOnly, returnedUpdates, specialCodeId]);
  /**
   * used for Specialcode selection Lookup
   */
  const handleSpecialCodeLookup = () => {
    setShowSpecialCodeLookup(true);
  };

  const specialCodeLookupSelection = (code) => {
    dispatch(setSpecialCodeInput(code.description?.trim()));
    dispatch(setSpecialCodeId(code.specialCodePK));
    setShowSpecialCodeLookup(false);
  };

  const fetchSpecialCodeData = (string) => {
    setIsLoading(true);
    SpecialCodesService.getSpecialCodeForAuto(string)
      .then((response) => {
        const data = response.data;
        const specialCodeList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setSpecialCodeData(specialCodeList);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  //tab validation
  useEffect(() => {
    if (
      (specialCodeId == null && specialCodeInput === "") ||
      (specialCodeId != null && specialCodeInput !== "")
    ) {
      dispatch(setIsDispatchTabValid(true));
    } else {
      dispatch(setIsDispatchTabValid(false));
    }
  }, [specialCodeId, specialCodeInput]);
  return (
    <div className="p-15 w-100">
      <Row className="m-0 p-0 justify-content-start">
        <Col sm={7} md={7} lg={7} xl={7} xs={7}>
          <Form.Group className="margin-box-1 form-group m-t-20 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0  me-4">
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
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setCopyOfPAPS(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0  me-4">
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
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setDispatchUpdates(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0  me-4">
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
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setDeliveryOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0  me-4">
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
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setDispatchOnly(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0  me-4">
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
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setReturnedUpdates(e.target.checked));
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group className="margin-box-5 form-group m-t-5 m-b-20 align-items-center row  m-l-0 m-r-0">
            <Col xs={3} sm={3} md={3} className="p-0  me-4">
              <Form.Label className={`${QuarterScreen.colFormLabel} ${QuarterScreen.label}`}>
                {t("permission.form.page.dispatch.tab.special.codes")}
              </Form.Label>
            </Col>

            <Col xl={8} lg={8} md={8} sm={8} xs={8} className={`p-0 d-flex`}>
              <AutoCompleteDropdown
                towardsTop
                arrayList={specialCodeData}
                searchString={specialCodeInput}
                renderItemId={(item) => item.specialCodePK}
                renderItemField={(item) => item.description}
                handleSearchString={(string) => dispatch(setSpecialCodeInput(string))}
                selectedId={specialCodeId}
                fetchDataBySearchString={fetchSpecialCodeData}
                onSelect={specialCodeLookupSelection}
                clearInputCallback={() => {
                  dispatch(setSpecialCodeId(null));
                }}
                disabled={viewDetail}
                className={`${specialCodeId === null && specialCodeInput != "" ? "borderRed" : ""}`}
                loading={isLoading}
              />
              <LookupButton onClick={handleSpecialCodeLookup} disabled={viewDetail} />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <SpecialCodeLookup
        show={showSpecialCodeLookup}
        onHide={() => setShowSpecialCodeLookup(false)}
        renderItemId={(data) => data.specialCodePK}
        handleLookupSelection={specialCodeLookupSelection}
        MaintenanceProgram
      />
    </div>
  );
};

export default DispatchTab;
