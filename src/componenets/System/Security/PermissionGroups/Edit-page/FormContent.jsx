import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetChanges,
  setCancelChanges,
  setDescription,
  setEditFormData,
  setHasOverridePermission,
  setIsDescriptionUnique,
  setIsGroupLoading,
  setNotes,
  setSaveData,
  setViewDetail,
} from "../../../../../redux/PermissionGroupMaintenanceSlice";
import PermissionGroupService from "../../../../../services/PermissionGroupService";
import { useSelector } from "react-redux";
import Input from "../../../../../components/common/input";
const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const viewDetail = useSelector((state) => state.permissionGroupsReducer.viewDetail);
  const description = useSelector((state) => state.permissionGroupsReducer.description);
  const notes = useSelector((state) => state.permissionGroupsReducer.notes);
  const isDescriptionUnique = useSelector((state) => state.permissionGroupsReducer.isDescriptionUnique);
  const editFormData = useSelector((state) => state.permissionGroupsReducer.editFormData);
  const isGroupLoading = useSelector((state) => state.permissionGroupsReducer.isGroupLoading);
  const cancelChanges = useSelector((state) => state.permissionGroupsReducer.cancelChanges);

  const fetchRecordById = (id) => {
    dispatch(setEditFormData(null));
    dispatch(setIsGroupLoading(true));
    dispatch(setIsDescriptionUnique(true));
    PermissionGroupService.getRecord(id)
      .then((response) => {
        const data = response.data;

        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        dispatch(setHasOverridePermission(data.hasEditOverridePermission));
        dispatch(setCancelChanges(false));
        setTimeout(() => {
          dispatch(setIsGroupLoading(false));
        }, 100);
      })
      .catch((error) => {
        console.log(error);
        navigate("/permission-groups");
        dispatch(setIsGroupLoading(false));
        dispatch(setCancelChanges(false));
      });
  };

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id, cancelChanges]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setNotes(editFormData.notes));
      dispatch(setDescription(editFormData.description?.trim()));
    }
  }, [editFormData]);

  // to backend
  const getCodeData = () => {
    dispatch(
      setSaveData({
        permissionGroupPK: id,
        description: description,
        notes: notes,
      })
    );
  };
  useEffect(() => {
    getCodeData();
  }, [id, description, notes]);

  const checkDuplicateDescription = (description) => {
    PermissionGroupService.checkDescriptionExist(id, description)
      .then((response) => {
        dispatch(setIsDescriptionUnique(response.data));
      })
      .catch((err) => {
        dispatch(setIsDescriptionUnique(false));
      });
  };
  useEffect(() => {
    dispatch(resetChanges());
  }, []);

  return (
    <div>
      <Form.Group className="mt-5 form-group  align-items-center row  m-l-0 m-r-0 ">
        <Col xs={2} sm={2} md={2} className="p-0">
          <Form.Label className="col-form-label dealer-label">Description</Form.Label>
        </Col>
        <Col xs={10} md={10} sm={10} className="p-0 ">
          <Input
            type="text"
            id="description"
            name="description"
            value={description}
            disabled={viewDetail}
            maxLength={30}
            autoComplete="off"
            aria-autocomplete="list"

            className={`customFormControl ${
              viewDetail === true || isGroupLoading
                ? ""
                : description.length >= 1
                  ? !isDescriptionUnique
                    ? "borderRed"
                    : "borderGreen"
                  : "borderRed"
            }`}
            onChange={(e) => {
              dispatch(setDescription(e.target.value.replace(/^\s+/g, "")));
              dispatch(setIsDescriptionUnique(true));
            }}
            onBlur={(e) => {
              if (e.target.value) {
                checkDuplicateDescription(e.target.value);
              }
            }}
          />
        </Col>
      </Form.Group>
      <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
        <Col sm={2} md={2} xs={2} className="p-0">
          <Form.Label className="col-form-label dealer-label">Notes </Form.Label>
        </Col>

        <Col sm={10} md={10} className="p-0">
          <textarea
            rows={16}
            cols={30}
            type="text"
            name="notes"
            value={notes}
            disabled={viewDetail}
            className={`customFormControl h-100`}
            onInput={(e) => {
              dispatch(setNotes(e.target.value));
            }}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default FormContent;
