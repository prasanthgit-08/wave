import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  resetChanges,
  setCheckDescription,
  setDescription,
  setEditFormData,
  setIsStateGroupLoading,
  setSaveData,
  setViewDetail,
} from "../../../../redux/StateGroupsSlice";
import { useNavigate, useParams } from "react-router-dom";
import StateGroupsService from "../../../../services/StateGroupsService";

const FormContent = ({ tempFlag }) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  const editFormData = useSelector((state) => state.stateGroupReducer.editFormData);
  const changesCancelled = useSelector((state) => state.stateGroupReducer.changesCancelled);
  const viewDetail = useSelector((state) => state.stateGroupReducer.viewDetail);
  const description = useSelector((state) => state.stateGroupReducer.description);
  const checkDescription = useSelector((state) => state.stateGroupReducer.checkDescription);
  const isStateGroupLoading = useSelector((state) => state.stateGroupReducer.isStateGroupLoading);

  const fetchRecordById = (id) => {
    dispatch(setIsStateGroupLoading(true));
    StateGroupsService.getRecordById(id)
      .then((response) => {
        const data = response?.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));

        setTimeout(() => {
          dispatch(setIsStateGroupLoading(false));
        }, 100);
      })
      .catch((error) => {
        dispatch(setIsStateGroupLoading(false));
        navigate("/state-groups");
      });
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  // populate input fields when editing
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editFormData, changesCancelled]);
  //unique Description
  const handleCheckDescription = (description) => {
    StateGroupsService.DescriptionExist(description, id)
      .then((res) => {
        dispatch(setCheckDescription(res?.data));
      })
      .catch((err) => {
        dispatch(setCheckDescription(false));
      });
  };
  // to backend
  const tabData = () => {
    dispatch(
      setSaveData({
        description: description,
        stateGroupPK: id,
      })
    );
  };
  useEffect(() => {
    tabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, description]);
  useEffect(() => {
    dispatch(resetChanges());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
        <Col xs={3} sm={3} md={3} className="p-0">
          <Form.Label className="customColFormLabel mt-5">Description</Form.Label>
        </Col>
        <Col xs={7} md={7} sm={7} className="p-0 mt-5">
          <input
            type="text"
            id="description"
            name="description"
            value={description}
            maxLength={30}
            disabled={viewDetail}
            autoComplete="newpassword"
            aria-autocomplete="none"
            onChange={(e) => {
              dispatch(setDescription(e.target.value?.replace(/^\s+/g, "")));
              dispatch(setCheckDescription(false));
            }}
            onBlur={(e) => handleCheckDescription(e.target.value)}
            className={`${styles.formControl} ${
              viewDetail === true || isStateGroupLoading
                ? ""
                : description?.length >= 1
                  ? checkDescription
                    ? "borderRed"
                    : "borderGreen"
                  : "borderRed"
            }`}
          />
        </Col>
      </Form.Group>
      {/* the loader for isStateGroupLoading is shown once by StateGroupsForm, with the states listing's */}
    </div>
  );
};

export default FormContent;
