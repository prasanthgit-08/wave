import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import QuarterStyles from "../../../../../styles/QuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetData,
  setBreakdown,
  setDamage,
  setData,
  setDelay,
  setDescription,
  setDisableSave,
  setEdit,
  setNotes,
  setPhone,
} from "../../../../../redux/DelayResourcesSlice";
import { formatPhoneNumber } from "../../../../../utils/validation/Phonevalidation";
import { useEffect } from "react";
import DelayResourceService from "../../../../../services/DelayResourceService";
import { useState } from "react";
import LoadingIcon from "../../../../common/LoadingIcon";
import Input from "../../../../../components/common/input";

const DelayResourcesEdtFormContent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = params.id;
  const pageNumber = params.pageNumber;

  const [unqiueDescription, setUnqiueDescription] = useState(true);
  const [loading, setLoading] = useState(false);

  const description = useSelector((state) => state.delayResourcesFilter.description);
  const phone = useSelector((state) => state.delayResourcesFilter.phone);
  const notes = useSelector((state) => state.delayResourcesFilter.notes);
  const delay = useSelector((state) => state.delayResourcesFilter.delay);
  const breakdown = useSelector((state) => state.delayResourcesFilter.breakdown);
  const damage = useSelector((state) => state.delayResourcesFilter.damage);
  const edit = useSelector((state) => state.delayResourcesFilter.edit);
  const data = useSelector((state) => state.delayResourcesFilter.data);

  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;

  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };

  const checkDescriptionUnique = () => {
    if (description && data && description?.trim() === data.description) {
      setUnqiueDescription(true);
    } else if (description) {
      DelayResourceService.isDescriptionUnique(description, id).then(({ data }) => {
        setUnqiueDescription(data);
      });
    }
  };

  const fetchByID = (id) => {
    setLoading(true);
    DelayResourceService.fetchById(id)
      .then(({ data }) => {
        dispatch(setData(data));
        dispatch(setBreakdown(data.breakdown));
        dispatch(setDamage(data.damage));
        dispatch(setDelay(data.delay));
        dispatch(setDescription(data.description?.trim()));
        dispatch(setPhone(formatPhoneNumber(data.phone)));
        dispatch(setNotes(data.notes));
      })
      .catch((e) => {
        navigate("/delay-resources");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!phone.match(phoneRegex) || !description || !unqiueDescription) {
      dispatch(setDisableSave(true));
    } else if (!(damage || delay || breakdown)) {
      dispatch(setDisableSave(true));
    } else {
      dispatch(setDisableSave(false));
    }
  }, [phone, description, unqiueDescription, damage, delay, breakdown]);

  useEffect(() => {
    setUnqiueDescription(true);
  }, [edit]);

  useEffect(() => {
    if (window.location.pathname === "/edit-delay-resources/" + id + "/" + pageNumber) {
      dispatch(setEdit(false));
      fetchByID(id);
    } else {
      dispatch(setEdit(true));
      dispatch(resetData());
    }
  }, []);
  return (
    <Form>
      <div className="w-100 p-2">
        {loading && <LoadingIcon />}
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10 ">
            <div className="p-15 w-100">
              <Row className="m-0 p-15 ">
                <Col sm={6} md={6} lg={6} xl={6} xs={6} className=" m-t-9 ">
                  <Form.Group className="form-group m-t-15 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={QuarterStyles.colFormLabel}>Description</Form.Label>
                    </Col>
                    <Col xs={9} md={9} sm={9} className="p-0">
                      <Input
                        disabled={!edit}
                        type="text"
                        value={description}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        onBlur={checkDescriptionUnique}
                        onChange={(e) => {
                          const newValue = e.target.value.replace(/^\s+/, "");
                          dispatch(setDescription(newValue));
                          setUnqiueDescription(true);
                        }}
                        className={`customFormControl ${
                          edit
                            ? !description || !unqiueDescription
                              ? "borderRed"
                              : "borderGreen"
                            : "borderBlack"
                        }`}
                        maxLength={30}
                      />
                    </Col>
                    {/* Would be required for future reference */}
                    {/* <Row className={`${!unqiueDescription && edit  ? "" : "hide-elements"}`}>
                        <Col xs={3} md={3} sm={3}></Col>
                        <Col xs={9} md={9} sm={9} style={{ paddingLeft: "5px"}}>
                          <p className="p-0 text-danger alert" style={{ height: "25px" }}>
                            {description&&!unqiueDescription && `Description '${description}' already exists!` }
                           </p>
                        </Col>
                      </Row> */}
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={QuarterStyles.colFormLabel}>Phone</Form.Label>
                    </Col>
                    <Col xs={3} md={3} sm={3} className="p-0">
                      <Input
                        disabled={!edit}
                        type="text"
                        className={`customFormControl ${
                          edit
                            ? !phoneRegex.test(phone) || !phone
                              ? "borderRed"
                              : "borderGreen"
                            : "borderBlack"
                        }`}
                        style={{ width: "120px" }}
                        autoComplete="newpassword"
                        aria-autocomplete="none"
                        value={phone}
                        onChange={(e) => {
                          phoneFormatHandler(e);
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={QuarterStyles.colFormLabel}>Delay</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        disabled={!edit}
                        type="checkbox"
                        className={`form-check-input ${
                          edit
                            ? !delay && !damage && !breakdown
                              ? "borderRed"
                              : "borderBlack"
                            : "borderBlack"
                        }`}
                        checked={delay}
                        onChange={(e) => {
                          dispatch(setDelay(e.target.checked));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={QuarterStyles.colFormLabel}>Breakdown</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        disabled={!edit}
                        type="checkbox"
                        className={`form-check-input ${
                          edit
                            ? !delay && !damage && !breakdown
                              ? "borderRed"
                              : "borderBlack"
                            : "borderBlack"
                        }`}
                        checked={breakdown}
                        onChange={(e) => {
                          dispatch(setBreakdown(e.target.checked));
                        }}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0">
                      <Form.Label className={QuarterStyles.colFormLabel}>Damage</Form.Label>
                    </Col>
                    <Col xs={5} md={5} sm={5} className="p-0">
                      <input
                        disabled={!edit}
                        type="checkbox"
                        className={`form-check-input ${
                          edit
                            ? !delay && !damage && !breakdown
                              ? "borderRed"
                              : "borderBlack"
                            : "borderBlack"
                        }`}
                        checked={damage}
                        onChange={(e) => {
                          dispatch(setDamage(e.target.checked));
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>

                <Col sm={6} md={6} lg={6} xl={6} xs={6}>
                  <Form.Group className="form-group m-t-5 form-group m-t-5 align-items-center row m-l-0 m-r-0">
                    <Col sm={3} md={3} xs={3} className="p-0 m-t-0">
                      <Form.Label className={QuarterStyles.colFormLabel}>Notes</Form.Label>
                    </Col>
                    <Col xs={12} md={12} sm={12} className="p-0">
                      <textarea
                        type="text"
                        name="hours"
                        id="hours"
                        cols={30}
                        rows={18}
                        className="w-100"
                        value={notes}
                        disabled={!edit}
                        autoComplete="off"
                        aria-autocomplete="list"
                        onInput={(e) => {
                          dispatch(setNotes(e.target.value));
                        }}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DelayResourcesEdtFormContent;
