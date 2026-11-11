/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {} from "../../../../../services/constants/applicationConstants";
import EmailSenderTypesService from "../../../../../services/EmailSenderTypesService";
import {
  setDisableSave,
  setDuplicateDescription,
  setEmailSenderTypes,
  setFormData,
  setViewDetail,
} from "../../../../../redux/EmailSenderTypesSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [sender, setSender] = useState("");
  const [loading, setLoading] = useState(false);

  const duplicateDescription = useSelector((state) => state.emailSenderTypes.duplicateDescription);
  const viewDetail = useSelector((state) => state.emailSenderTypes.viewDetail);
  const formData = useSelector((state) => state.emailSenderTypes.formData);
  const emailSenderTypes = useSelector((state) => state.emailSenderTypes.emailSenderTypes);
  const emailSenderTypesvalid = useSelector((state) => state.emailSenderTypes.emailSenderTypesvalid);

  const checkDuplicateDescription = (description) => {
    EmailSenderTypesService.checkDuplicateDescription(description, id)
      .then((response) => {
        dispatch(setDuplicateDescription(response.data));
      })
      .catch((err) => {
        dispatch(setDuplicateDescription(false));
      });
  };

  /**
   * API call for fetching a single record
   */
  useEffect(() => {
    const fetchEmailSenderTypeData = () => {
      setLoading(true);
      EmailSenderTypesService.getEmailSenderType(id)
        .then((res) => {
          dispatch(setFormData(res.data));
          dispatch(setViewDetail(true));
        })
        .catch((err) => {
          navigate(`/email-sender-types`);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (id) {
      fetchEmailSenderTypeData();
    }
  }, []);

  /**
   * Populate input fields with API response
   */
  useEffect(() => {
    setDescription(formData ? formData?.description || "" : "");
    setSender(formData ? formData?.sender || "" : "");
  }, [formData, viewDetail]);

  /**
   * Update emailSenderTypes payload object with input fields
   */
  useEffect(() => {
    dispatch(
      setEmailSenderTypes({
        emailSenderTypePK: id,
        description: description,
        sender: sender,
      })
    );
  }, [description, sender]);

  // Save Validation
  useEffect(() => {
    if (description && !duplicateDescription && sender) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [description, duplicateDescription, sender]);
  useEffect(() => {
    if (emailSenderTypesvalid === false) {
      navigate("/email-sender-types");
    }
  }, []);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}

      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                <Form.Group className="mt-5 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Description</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="p-0">
                    <input
                      name="description"
                      id="description"
                      type="text"
                      className={`customFormControl ${
                        !viewDetail && !loading
                          ? description && !duplicateDescription
                            ? "borderGreen"
                            : "borderRed"
                          : ""
                      }`}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        dispatch(setDuplicateDescription(false));
                      }}
                      onBlur={(e) => checkDuplicateDescription(e.target.value)}
                      disabled={viewDetail}
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Row className={`${!viewDetail && duplicateDescription ? "" : "hide-elements"}`}>
                  <Col xs={2} md={2} sm={2}></Col>
                  <Col style={{ paddingLeft: "8px" }}>
                    <p className="mb-0 text-danger"></p>
                  </Col>
                </Row>

                <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
                  <Col sm={2} md={2} xs={2} className="p-0">
                    <Form.Label className="customColFormLabel">Sender</Form.Label>
                  </Col>

                  <Col xs={7} md={7} sm={7} className="p-0">
                    <textarea
                      name="sender"
                      id="sender"
                      type="text"
                      cols={20}
                      className={`customFormControl ${
                        !viewDetail && !loading ? (sender ? "borderGreen" : "borderRed") : ""
                      }`}
                      style={{
                        resize: "none",
                        display: "fixed",
                        height: "200px",
                        minWidth: "610px",
                        boxShadow: "none",
                        fontSize: "12px",
                      }}
                      value={sender}
                      onInput={(e) => setSender(e.target.value)}
                      disabled={viewDetail}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContent;
