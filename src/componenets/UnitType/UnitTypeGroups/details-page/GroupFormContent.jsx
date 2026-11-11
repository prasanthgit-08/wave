import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  resetChanges,
  setEditFormData,
  setCheckDescription,
  setDescription,
  setMotorized,
  setTowable,
  setRequireELD,
  setViewDetail,
  setUnitClass,
  setRadioValue,
  setSaveData,
  setIsGroupLoading,
} from "../../../../redux/UnitTypeGroupSlice";

import UnitTypeGroupsService from "../../../../services/UnitTypeGroupsService";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import LoadingIcon from "../../../common/LoadingIcon";
const GroupFormContent = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editFormData = useSelector((state) => state.unitTypeGroupReducer.editFormData);

  const changesCancelled = useSelector((state) => state.unitTypeGroupReducer.changesCancelled);
  const viewDetail = useSelector((state) => state.unitTypeGroupReducer.viewDetail);

  const description = useSelector((state) => state.unitTypeGroupReducer.description);
  const unitClass = useSelector((state) => state.unitTypeGroupReducer.unitClass);
  const motorized = useSelector((state) => state.unitTypeGroupReducer.motorized);
  const towable = useSelector((state) => state.unitTypeGroupReducer.towable);
  const requireELD = useSelector((state) => state.unitTypeGroupReducer.requireELD);
  const checkDescription = useSelector((state) => state.unitTypeGroupReducer.checkDescription);
  const radioValue = useSelector((state) => state.unitTypeGroupReducer.radioValue);
  const isGroupLoading = useSelector((state) => state.unitTypeGroupReducer.isGroupLoading);
  const unitTypeList = useSelector((state) => state.unitTypeGroupReducer.unitTypeList);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setRequireELD(editFormData.requireELD));
      dispatch(setDescription(editFormData.description?.trim()));
      dispatch(setUnitClass(editFormData.unitclass));

      if (!editFormData.motorized && !editFormData.towable) {
        dispatch(setRadioValue(null));
      } else {
        dispatch(setRadioValue(editFormData.motorized ? "Motorized" : "Towable"));
      }
    }
  }, [editFormData, changesCancelled]);
  useEffect(() => {
    dispatch(resetChanges());
  }, []);

  const fetchRecordById = (id) => {
    dispatch(setIsGroupLoading(true));
    UnitTypeGroupsService.getRecord(id)
      .then((response) => {
        const data = response.data;

        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));

        setTimeout(() => {
          dispatch(setIsGroupLoading(false));
        }, 100);
      })
      .catch((error) => {
        console.log(error);
        navigate("/unit-type-groups");
        dispatch(setIsGroupLoading(false));
      })
      .finally(() => {
        dispatch(setIsGroupLoading(false));
      });
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  // to backend
  const getCodeData = () => {
    dispatch(
      setSaveData({
        unitTypeGroupPK: id,
        description: description,
        unitclass: unitClass,

        towable: radioValue === "Towable",
        motorized: radioValue === "Motorized",
        requireELD: requireELD,
      })
    );
  };
  useEffect(() => {
    getCodeData();
  }, [id, description, unitClass, motorized, towable, requireELD, radioValue]);

  const checkDuplicateDescription = (description) => {
    UnitTypeGroupsService.checkDescriptionExist(id, description)
      .then((response) => {
        dispatch(setCheckDescription(response.data));
      })
      .catch((err) => {
        dispatch(setCheckDescription(false));
      });
  };

  useEffect(() => {
    if (motorized === true) {
      dispatch(setRequireELD(false));
    }
  }, [motorized]);

  // Allow  limit to one digit
  const handleInputChange = (event) => {
    const value = event.target.value;

    const sanitizedValue = value.replace(/[^1-9]/g, "").slice(0, 1);

    dispatch(setUnitClass(sanitizedValue));
  };

  return (
    <div>
      <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
        <Col xs={3} sm={3} md={3} className="p-0">
          <Form.Label className={QuarterScreen.colFormLabel}>Description</Form.Label>
        </Col>

        <Col xs={9} md={9} sm={9} className="p-0">
          <input
            type="text"
            name={description}
            className={`${QuarterScreen.formControl} ${
              viewDetail === true || isGroupLoading
                ? ""
                : description.length >= 1
                  ? checkDescription
                    ? "borderRed"
                    : "borderGreen"
                  : "borderRed"
            }`}
            maxLength={30}
            id="description"
            value={description}
            disabled={viewDetail}
            autoComplete="newpassword"
            aria-autocomplete="none"
            onChange={(e) => {
              dispatch(setDescription(e.target.value.replace(/^\s+/g, "")));
              dispatch(setCheckDescription(false));
            }}
            onBlur={(e) => checkDuplicateDescription(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
        <Col xs={3} sm={3} md={3} className="p-0">
          <Form.Label className={QuarterScreen.colFormLabel}>Class</Form.Label>
        </Col>

        <Col xs={1} md={1} sm={1} className="p-0 w-50px">
          <input
            type="number"
            className={`${QuarterScreen.formControl} ${
              viewDetail || isGroupLoading
                ? ""
                : unitClass && unitClass >= 1 && unitClass <= 9 && unitClass.length === 1
                  ? "borderGreen"
                  : "borderRed"
            }`}
            id=" unitClass"
            value={unitClass}
            min={1}
            max={9}
            disabled={viewDetail}
            autoComplete="newpassword"
            aria-autocomplete="none"
            onBeforeInput={(e) => {
              if (e.data === "e" || e.data === "." || e.data === "-" || !/^[1-9.-]*$/.test(e.data)) {
                e.preventDefault();
              }
            }}
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
        <Col sm={3} md={3} xs={3} className="p-0">
          <Form.Label htmlFor="name" className="col-form-label dealer-label">
            Type
          </Form.Label>
        </Col>

        <Col xs={7} md={7} sm={7} className="p-0">
          <CustomRadioGroup
            labelClassName={
              viewDetail || isGroupLoading
                ? ""
                : radioValue !== "Motorized" && radioValue !== "Towable"
                  ? "borderRed"
                  : ""
            }
            name="Type"
            horizontal
            horizontalAlignmentClassName={"me-4"}
            options={["Motorized", "Towable"]}
            selectedOption={radioValue}
            disabled={viewDetail}
            onChange={(option) => dispatch(setRadioValue(option))}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0" hidden={motorized}>
        <Col xs={3} sm={3} md={3} className="p-0">
          <Form.Label className="col-form-label dealer-label">Require ELD</Form.Label>
        </Col>
        <Col xs={3} md={3} sm={3} className="p-0">
          <input
            type="checkbox"
            className="form-check-input p-0 "
            name="requireELD"
            value={requireELD}
            checked={requireELD}
            hidden={motorized}
            disabled={viewDetail || motorized}
            onChange={(e) => dispatch(setRequireELD(e.target.checked))}
          />
        </Col>
      </Form.Group>
      {isGroupLoading && <LoadingIcon />}
    </div>
  );
};

export default GroupFormContent;
