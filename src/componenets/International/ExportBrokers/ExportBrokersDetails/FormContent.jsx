import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { t } from "i18next";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import CustomersListing from "./AssignedBrokersListing";
import { PaginationComponent } from "../../../common/PaginationComponent";
import { ThreeForthScreen_RecordsPerPage } from "../../../../services/constants/applicationConstants";
import ExportBrokersService from "../../../../services/ExportBrokersService";
import {
  setBolText,
  setDescription,
  setDisableSave,
  setEditFormData,
  setEmail,
  setExportBrokers,
  setFax,
  setIsExportBrokerLoading,
  setName,
  setNotes,
  setPhone,
  setViewDetail,
} from "../../../../redux/ExportBrokersSlice";
import { formatPhoneNumber } from "../../../../utils/validation/Phonevalidation";
import { emailRegex } from "../../../../utils/validation/EmailRegex";
import LoadingIcon from "../../../common/LoadingIcon";
import Input from "../../../../components/common/input";

const FormContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const viewDetail = useSelector((state) => state.exportBrokersReducer.viewDetail);
  const description = useSelector((state) => state.exportBrokersReducer.description);
  const name = useSelector((state) => state.exportBrokersReducer.name);
  const bolText = useSelector((state) => state.exportBrokersReducer.bolText);
  const phone = useSelector((state) => state.exportBrokersReducer.phone);
  const fax = useSelector((state) => state.exportBrokersReducer.fax);
  const email = useSelector((state) => state.exportBrokersReducer.email);
  const notes = useSelector((state) => state.exportBrokersReducer.notes);
  const editFormData = useSelector((state) => state.exportBrokersReducer.editFormData);
  const exportBrokersData = useSelector((state) => state.exportBrokersReducer.exportBrokersData);
  const isExportBrokerLoading = useSelector((state) => state.exportBrokersReducer.isExportBrokerLoading);
  const assignedListingLoader = useSelector((state) => state.exportBrokersReducer.assignedListingLoader);
  const [loader, setLoader] = useState(false);

  const changesCancelled = useSelector((state) => state.exportBrokersReducer.changesCancelled);
  const [isDescriptionDuplicate, setIsDescriptionDuplicate] = useState(false);
  const phoneRegex = /^\([\d]{3}\)\s[\d]{3}-[\d]{4}$/gm;
  useEffect(() => {
    if (id) {
      dispatch(setIsExportBrokerLoading(true));
      ExportBrokersService.getExportBrokersById(id)
        .then((response) => {
          const { data } = response;
          dispatch(setEditFormData(data));
          dispatch(setViewDetail(true));
        })
        .catch((err) => {
          dispatch(setIsExportBrokerLoading(false));
          setLoader(false);
          navigate("/export-brokers-browse");
        })
        .finally(() => {
          dispatch(setIsExportBrokerLoading(false));
        });
    }
  }, [id]);
  useEffect(() => {
    if (editFormData === null) {
      dispatch(setDescription(""));
      dispatch(setName(""));
      dispatch(setBolText(""));
      dispatch(setPhone(""));
      dispatch(setFax(""));
      dispatch(setEmail(""));
      dispatch(setNotes(""));
    }
  }, [editFormData]);
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
      dispatch(setName(editFormData.name ? editFormData.name?.trim() : ""));
      dispatch(setBolText(editFormData.bolText ? editFormData.bolText?.trim() : ""));
      dispatch(setPhone(editFormData.phone ? formatPhoneNumber(editFormData.phone) : ""));
      dispatch(setFax(editFormData.fax ? formatPhoneNumber(editFormData.fax) : ""));
      dispatch(setEmail(editFormData.email ? editFormData.email : ""));
      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
    }
  }, [editFormData, changesCancelled]);
  const checkUniqueDescription = (description) => {
    ExportBrokersService.checkDescriptionExist(id, description)
      .then((res) => {
        setIsDescriptionDuplicate(res.data);
      })
      .catch((err) => {
        setIsDescriptionDuplicate(false);
      });
  };
  //save validation
  useEffect(() => {
    if (
      name &&
      bolText &&
      phone &&
      phone.match(phoneRegex) &&
      fax &&
      fax.match(phoneRegex) &&
      email &&
      email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/) &&
      description &&
      !isDescriptionDuplicate
    ) {
      // enable save if all conditions
      dispatch(setDisableSave(false));
    } else {
      // disable save
      dispatch(setDisableSave(true));
    }
  }, [description, isDescriptionDuplicate, name, bolText, phone, fax, email]);
  //save object for backend
  useEffect(() => {
    dispatch(
      setExportBrokers({
        exportBrokerPK: id,
        description: description,
        name: name,
        bolText: bolText,
        phone: phone.replace(/\s+/g, ""),
        fax: fax.replace(/\s+/g, ""),
        email: email,
        notes: notes,
      })
    );
  }, [description, name, bolText, phone, fax, email, notes]);

  const on = (setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  const phoneFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setPhone(formattedPhoneNumber));
  };
  const faxFormatHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    dispatch(setFax(formattedPhoneNumber));
  };
  const validationSchema = yup.object({
    email: yup.string().matches(emailRegex),
    phone: yup.string().matches(phoneRegex),
    fax: yup.string().matches(phoneRegex),
  });
  useEffect(() => {
    if (id) {
      if (!viewDetail) {
        setIsDescriptionDuplicate(false);
      }
    }
  }, [viewDetail]);

  return (
    <Formik
      initialValues={{
        email,
        phone,
        fax,
      }}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize={true}
      initialTouched={{
        email: true,
        phone: true,
        fax: true,
      }}
      on={on}
    >
      {(formik) => (
        <div>
          {(loader || assignedListingLoader) && <LoadingIcon />}
          <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} md={2} className="p-0">
              <Form.Label className="customColFormLabel">Description</Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className="p-0">
              <Input
                type="text"
                id="description"
                name="description"
                value={description}
                maxLength={30}
                disabled={viewDetail}

                onChange={(e) => {
                  dispatch(setDescription(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                  setIsDescriptionDuplicate(false);
                }}
                onBlur={(e) => checkUniqueDescription(e.target.value)}
                className={`${styles.formControl} ${
                  !viewDetail ? (description && !isDescriptionDuplicate ? "borderGreen" : "borderRed") : ""
                }`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="customColFormLabel">Name</Form.Label>
            </Col>
            <Col xs={8} md={8} sm={8} className="p-0">
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                maxLength={30}
                onChange={(e) => {
                  dispatch(setName(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                }}
                disabled={viewDetail}

                className={`${styles.formControl} ${!viewDetail ? (name ? "borderGreen" : "borderRed") : ""}`}
              />
            </Col>
          </Form.Group>

          <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="customColFormLabel">BOL Text</Form.Label>
            </Col>
            {/* <Col xs={5} md={9} sm={4} className="p-0">  */}
            <Col xs={9} md={9} sm={9} className="p-0">
              <Input
                type="text"
                id="boltext"
                name="boltext"
                value={bolText}
                maxLength={50}
                onChange={(e) => {
                  dispatch(setBolText(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                }}
                disabled={viewDetail}

                className={`${styles.formControl} ${!viewDetail ? (bolText ? "borderGreen" : "borderRed") : ""}`}
              />
            </Col>
          </Form.Group>
          <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="customColFormLabel">Phone</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
              <Input
                className={`${styles.formControl} ${
                  !viewDetail ? (phone && String(phone).match(phoneRegex) ? "borderGreen" : "borderRed") : ""
                }`}
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => phoneFormatHandler(e)}
                maxLength={14}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
          <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="customColFormLabel">FAX</Form.Label>
            </Col>
            <Col xs={2} md={2} sm={2} className="p-0" style={{ width: "110px" }}>
              <Input
                className={`${styles.formControl} ${
                  !viewDetail ? (fax && String(fax).match(phoneRegex) ? "borderGreen" : "borderRed") : ""
                }`}
                type="text"
                id="fax"
                name="fax"
                value={fax}
                maxLength={14}
                onChange={(e) => faxFormatHandler(e)}
                disabled={viewDetail}
              />
            </Col>
          </Form.Group>
          <Form.Group className="my-3 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={2} sm={2} className="p-0">
              <Form.Label className="customColFormLabel">Email</Form.Label>
            </Col>
            <Col xs={9} md={9} sm={9} className="p-0">
              <Input
                type="text"
                className={`${styles.formControl} ${
                  viewDetail === true
                    ? ""
                    : formik.errors.email === undefined && email !== null && email.length > 1
                      ? "borderGreen"
                      : "borderRed"
                }`}
                id="email"
                name="email"
                value={email}
                maxLength={70}
                disabled={viewDetail}

                onChange={(e) => {
                  dispatch(setEmail(e.target.value));
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3 mt-5 form-group  align-items-center row  m-l-0 m-r-0">
            <Col xs={12} sm={12} className="p-0">
              <Form.Label className="customColFormLabel">Notes</Form.Label>
            </Col>
            <Col xs={12} md={12} sm={12} className="p-0">
              <textarea
                type="text"
                style={{
                  resize: "none",
                  height: "100px",
                }}
                className="w-100 customFormControl"
                id="notes"
                name="notes"
                value={notes}
                disabled={viewDetail}
                onChange={(e) => {
                  dispatch(setNotes(e.target.value.replace(/^[^a-zA-Z0-9]+/, "")));
                }}
              />
            </Col>
          </Form.Group>
        </div>
      )}
    </Formik>
  );
};

export default FormContent;
