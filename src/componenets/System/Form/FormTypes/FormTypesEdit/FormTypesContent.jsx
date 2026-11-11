import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../../styles/ThreeQuarterScreen.module.css";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import FormTypesService from "../../../../../services/FormTypesService";
import {
  resetChanges,
  setDescription,
  setEditFormData,
  setFormDescriptionId,
  setFormTypePK,
  setIsDescriptionUnique,
  setIsObjectKeyUnique,
  setObjectKey,
  setViewDetail,
} from "../../../../../redux/FormTypesSlice";
import { useNavigate, useParams } from "react-router-dom";
import FormsService from "../../../../../services/FormsService";
import FormsLookup from "../../../../LookupScreens/Forms/FormsLookup";
import LoadingIcon from "../../../../common/LoadingIcon";

function FormTypesContent() {
  const dispatch = useDispatch();
  const objectKey = useSelector((state) => state.formTypes.objectKey);
  const description = useSelector((state) => state.formTypes.description);
  const formDescriptionId = useSelector((state) => state.formTypes.formDescriptionId);
  const isDescriptionUnique = useSelector((state) => state.formTypes.isDescriptionUnique);
  const isObjectKeyUnique = useSelector((state) => state.formTypes.isObjectKeyUnique);

  const viewDetail = useSelector((state) => state.formTypes.viewDetail);
  const changesCancelled = useSelector((state) => state.formTypes.changesCancelled);
  const editFormData = useSelector((state) => state.formTypes.editFormData);
  const { id } = useParams();
  const navigate = useNavigate();
  const formTypePK = id;

  const [formDescriptions, setFormDescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formDescription, setFormDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [showFormDescriptionLookUp, setShowFormDescriptionLookUp] = useState(false);

  const fetchRecordById = (id) => {
    dispatch(setEditFormData(null));
    setLoading(true);
    FormTypesService.getRecord(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
      })
      .catch((error) => {
        navigate("/form-types");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      fetchRecordById(id);
    }
  }, [id, changesCancelled]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setFormTypePK(editFormData.formTypePK || ""));
      dispatch(setObjectKey(editFormData.objectKey?.trim() || ""));
      dispatch(setDescription(editFormData.description?.trim() || ""));
      setFormDescription(editFormData.formDescription?.trim());
      dispatch(setFormDescriptionId(editFormData.formFK));
    } else if (editFormData === undefined || editFormData === null) {
      dispatch(resetChanges());
      setFormDescription("");
      dispatch(setFormDescriptionId(null));
    }
  }, [editFormData, viewDetail]);

  const handleCheckUniqueDescription = (description) => {
    FormTypesService.checkUniqueDescription(id, description)
      .then((res) => {
        dispatch(setIsDescriptionUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckUniqueObjectKey = (objectKey) => {
    FormTypesService.checkUniqueObjectkey(id, objectKey)
      .then((res) => {
        dispatch(setIsObjectKeyUnique(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFormDescriptions = (string) => {
    setLoading(true);
    FormsService.getFormsForAuto(string)
      .then((response) => {
        const data = response.data;
        const formDesc = data.content?.map((data) => ({ ...data, description: data.description?.trim() }));
        setFormDescriptions(formDesc);
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormDescriptionSelection = (formDesc) => {
    setFormDescription(formDesc.description?.trim());
    dispatch(setFormDescriptionId(formDesc.formPK));
    setShowFormDescriptionLookUp(false);
  };

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Col xs={9} className="ps-3 h-250px">
              <Form.Group
                className={`mt-3 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Object Key
                  </Form.Label>
                </Col>

                <Col xs={2} md={2} className="p-0 me-2" /*style={{width:"350px"}}*/>
                  <input
                    name={objectKey}
                    type="text"

                    className={`${styles.formControl} ${
                      viewDetail === true
                        ? ""
                        : objectKey !== "" && isObjectKeyUnique
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    id="objectKey"
                    value={objectKey}
                    disabled={viewDetail}
                    maxLength={10}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      dispatch(setObjectKey(e.target.value));
                      dispatch(setIsObjectKeyUnique(true));
                    }}
                    onBlur={(e) => {
                      if (e.target.value) {
                        handleCheckUniqueObjectKey(e.target.value);
                      }
                    }}
                    style={{
                      borderColor: viewDetail === true ? "black" : objectKey !== "" ? "green" : "red",
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className={`mt-3 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Description
                  </Form.Label>
                </Col>

                <Col xs={8} md={8} className="p-0 me-2">
                  <input
                    className={`${styles.formControl} ${
                      viewDetail === true
                        ? ""
                        : description !== "" && descriptionError.length === 0 && isDescriptionUnique
                          ? "borderGreen"
                          : "borderRed"
                    }`}
                    id="description"
                    name="description"
                    value={description}
                    disabled={viewDetail}
                    type="text"
                    maxLength={30}
                    autoComplete="off"
                    aria-autocomplete="list"
                    onChange={(e) => {
                      dispatch(setDescription(e.target.value));
                      dispatch(setIsDescriptionUnique(true));
                    }}
                    onBlur={(e) => {
                      if (e.target.value) {
                        handleCheckUniqueDescription(e.target.value);
                      }
                    }}
                    style={{
                      borderColor:
                        viewDetail === true
                          ? "black"
                          : description !== "" && isDescriptionUnique
                            ? "green"
                            : "red",
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className={`mt-3 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}
              >
                <Col sm={2} md={2} xs={2} className="p-0">
                  <Form.Label htmlFor="name" className="col-form-label dealer-label">
                    Form
                  </Form.Label>
                </Col>

                <Col xs={7} md={7} className="ps-0 pe-3  d-flex">
                  <AutoCompleteDropdown
                    className={`${styles.formControl} ${
                      viewDetail ? "" : formDescriptionId ? "borderGreen" : "borderRed"
                    }`}
                    arrayList={formDescriptions}
                    searchString={formDescription}
                    renderItemId={(form) => form.formPK}
                    renderItemField={(form) => form.description}
                    loading={loading}
                    handleSearchString={(string) => {
                      setFormDescription(string);
                    }}
                    fetchDataBySearchString={fetchFormDescriptions}
                    onSelect={handleFormDescriptionSelection}
                    selectedId={formDescriptionId}
                    clearInputCallback={() => {
                      dispatch(setFormDescriptionId(null));
                    }}
                    disabled={viewDetail}
                    maxHeight={"136px"}
                    towardsTop
                  />
                  <LookupButton disabled={viewDetail} onClick={() => setShowFormDescriptionLookUp(true)} />
                </Col>
              </Form.Group>
            </Col>

            <FormsLookup
              show={showFormDescriptionLookUp}
              onHide={() => setShowFormDescriptionLookUp(false)}
              renderItemId={(form) => form.formPK}
              renderItemField={(data) => data.description}
              handleLookupSelection={handleFormDescriptionSelection}
              MaintenanceProgram
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormTypesContent;
