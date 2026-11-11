import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlantFormData,
  setDelaysHotlineDescription,
  setDelayHotlinePhone,
} from "../../../../../../redux/CustomerPlantMaintenanceSlice";
import { formatPhoneNumber } from "../../../../../../utils/validation/Phonevalidation";
const DelaysHotline = () => {
  const dispatch = useDispatch();
  const [hotlineDescription, setHotlineDescription] = useState("");
  const [hotlinePhone, setHotlinePhone] = useState("");
  const [hotlineNotes, setHotlineNotes] = useState("");
  const viewDetail = useSelector((state) => state.customerPlantmaintanceReducer.viewDetail);
  const editPlantData = useSelector((state) => state.customerPlantmaintanceReducer.editPlantData);
  useEffect(() => {
    if (editPlantData != null) {
      setHotlineDescription(editPlantData.hotlineDescription != null ? editPlantData.hotlineDescription : "");

      setHotlinePhone(editPlantData.hotLine != null ? formatPhoneNumber(editPlantData.hotLine) : "");
      setHotlineNotes(editPlantData.hotlineNotes != null ? editPlantData.hotlineNotes : "");
    }
  }, [editPlantData, viewDetail]);

  useEffect(() => {
    hotlineFormData();
  }, [hotlineNotes, hotlinePhone, hotlineDescription]);

  const hotlineFormData = () => {
    dispatch(
      setPlantFormData({
        hotlineDescription: hotlineDescription,
        hotLine: hotlinePhone.replace(/\s+/g, ""),
        hotlineNotes: hotlineNotes,
      })
    );
  };

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setHotlinePhone(formattedPhoneNumber);
  };
  useEffect(() => {
    dispatch(setDelayHotlinePhone(hotlinePhone));
    dispatch(setDelaysHotlineDescription(hotlineDescription));
  }, [hotlineDescription, hotlinePhone]);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const validationSchema = yup.object({
    hotlineDescription: yup.string(),
    hotlinePhone: yup.string().when(" hotlineDescription", {
      is: (hotlineDescription) => hotlineDescription !== undefined && hotlineDescription.length > 0,
      then: yup.string().matches(phoneRegex).required(),
      otherwise: yup.string().matches(phoneRegex),
    }),
  });
  return (
    <Formik
      initialValues={{ hotlineDescription, hotlinePhone }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        hotlinePhone: true,
      }}
    >
      {(formik) => (
        <Form>
          <div className="m-b-5">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  {/*Delay Contact*/}
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="col-form-label dealer-label">
                        {t("customers.browse.page.table.heading.description")}
                      </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={6} className="p-0">
                      <input
                        className="customFormControl"
                        name="delayContact"
                        type="text"
                        value={hotlineDescription}
                        maxLength={30}
                        disabled={viewDetail}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          setHotlineDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, ""));
                        }}
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
                        className="customFormControl"
                        style={{
                          border: viewDetail
                            ? "black 1px solid"
                            : hotlineDescription != "" &&
                                hotlinePhone !== "" &&
                                String(hotlinePhone).match(phoneRegex)
                              ? "green 2px solid"
                              : (!String(hotlinePhone).match(phoneRegex) && hotlinePhone !== "") ||
                                  hotlineDescription != ""
                                ? "red 2px solid"
                                : "black 1px solid",
                        }}
                        control="input"
                        name="hotlinePhone"
                        value={hotlinePhone}
                        maxLength={14}
                        disabled={viewDetail}
                        onChange={(e) => phoneFormatHandler(e)}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onInput={(e) => {
                          formik.handleChange(e);
                          setHotlinePhone(e.target.value);
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <label className="col-form-label dealer-label p-0 m-b-20">Notes</label>
                    </Col>

                    <Col xs={9} md={9} sm={9} className="p-0">
                      <textarea
                        rows={10}
                        cols={20}
                        type="text"
                        className="customFormControl h-100 "
                        name="hotlineNotes"
                        value={hotlineNotes}
                        disabled={viewDetail}
                        onInput={(e) => setHotlineNotes(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DelaysHotline;
