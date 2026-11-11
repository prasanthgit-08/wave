/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PermissionsMaintenanceService from "../../../../../services/PermissionsMaintenanceService";
import {
  setFormData,
  setViewDetail,
  setDisableSave,
  setPermissionsPayload,
  setIsUniqueDescription,
  setIsUniqueObjectKey,
} from "../../../../../redux/PermissionsMaintenanceSlice";
import LoadingIcon from "../../../../common/LoadingIcon";
import MenuService from "../../../../../services/MenuService";
import MenuLookup from "../../../../LookupScreens/Menu/MenuLookup";
import { removeLeadingWhitespace } from "../../../../../utils/utils";
import Input from "../../../../../components/common/input";

const FormContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [objectKey, setObjectKey] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [menuItemInput, setMenuItemInput] = useState("");
  const [menuItemId, setMenuItemId] = useState("");
  const [showMenuLookup, setShowMenuLookup] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [override, setOverride] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasEditOverridePermission, setHasEditOverridePermission] = useState(false);

  const viewDetail = useSelector((state) => state.permissionsMaintenance.viewDetail);
  const formData = useSelector((state) => state.permissionsMaintenance.formData);
  const isUniqueObjectKey = useSelector((state) => state.permissionsMaintenance.isUniqueObjectKey);
  const isUniqueDescription = useSelector((state) => state.permissionsMaintenance.isUniqueDescription);
  const permissionsPayload = useSelector((state) => state.permissionsMaintenance.permissionsPayload);
  const cancelChanges = useSelector((state) => state.permissionsMaintenance.cancelChanges);

  const checkUniqueDescription = (description) => {
    PermissionsMaintenanceService.checkUniqueDescription(description, id)
      .then((response) => {
        dispatch(setIsUniqueDescription(response.data));
      })
      .catch((err) => {
        dispatch(setIsUniqueDescription(true));
      });
  };

  const checkUniqueObjectKey = (objectKey) => {
    PermissionsMaintenanceService.checkUniqueObjectKey(objectKey, id)
      .then((response) => {
        dispatch(setIsUniqueObjectKey(response.data));
      })
      .catch((err) => {
        dispatch(setIsUniqueObjectKey(true));
      });
  };

  const fetchMenuList = (string) => {
    MenuService.getMenuListingForAutoComplete(string)
      .then((response) => {
        const { data } = response;
        const menuList = data.content.map((menu) => ({ ...menu, name: menu.name?.trim() }));
        setMenuList(menuList);
      })
      .catch((err) => {});
  };

  const handleMenuItemSelection = (menu) => {
    setMenuItemInput(menu.name);
    setMenuItemId(menu.menuPK);
    setShowMenuLookup(false);
  };

  /**
   * API call for fetching a single record
   */
  useEffect(() => {
    const fetchPermissionById = () => {
      setLoading(true);
      dispatch(setIsUniqueDescription(true));
      dispatch(setIsUniqueObjectKey(true));
      PermissionsMaintenanceService.getPermissionById(id)
        .then((res) => {
          dispatch(setFormData(res.data));
          dispatch(setViewDetail(true));
        })
        .catch((err) => {
          navigate(`/permissions-maintenance`);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (id || cancelChanges) {
      fetchPermissionById();
    }
  }, [cancelChanges]);

  /**
   * Populate input fields with API response
   */
  useEffect(() => {
    setHasEditOverridePermission(formData ? formData?.hasEditOverridePermission || false : false);
    setDescription(formData ? formData?.description || "" : "");
    setObjectKey(formData ? formData?.objectKey || "" : "");
    setMenuItemId(formData ? formData?.menuFK || null : null);
    setMenuItemInput(formData ? formData?.menuName || "" : "");
    setEnabled(formData ? formData?.enabled || false : false);
    setOverride(formData ? formData?.override || false : false);
    setNotes(formData ? formData?.notes || "" : "");
  }, [formData, viewDetail, cancelChanges]);

  /**
   * Update permissionsMaintenance payload object with input fields
   */
  useEffect(() => {
    dispatch(
      setPermissionsPayload({
        permissionPK: id,
        description: description,
        objectKey: objectKey,
        menuFK: menuItemId,
        enabled: enabled,
        override: override,
        notes: notes,
      })
    );
  }, [description, objectKey, menuItemId, enabled, override, notes, cancelChanges]);

  // Save Validation
  useEffect(() => {
    if (
      description &&
      isUniqueDescription &&
      objectKey &&
      isUniqueObjectKey &&
      (menuItemId || !menuItemInput)
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [description, isUniqueDescription, objectKey, isUniqueObjectKey, menuItemId, menuItemInput]);

  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <Row className="m-0 p-0">
          <Col md={10} lg={10} xl={10} xs={10}>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0 w-100px">
                <Form.Label className="col-form-labelt dealer-label">Description</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0">
                <Input
                  name="description"
                  id="description"
                  type="text"
                  className={`customFormControl ${
                    !viewDetail && !loading
                      ? description && isUniqueDescription
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                  }`}
                  value={description}
                  onChange={(e) => {
                    if (e.target.value === " ") {
                      setDescription("");
                    } else {
                      setDescription(removeLeadingWhitespace(e.target.value));
                      dispatch(setIsUniqueDescription(true));
                    }
                  }}
                  onBlur={(e) => checkUniqueDescription(e.target.value)}
                  disabled={viewDetail}
                  maxLength={30}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0 w-100px">
                <Form.Label className="col-form-labelt dealer-label">Object Key</Form.Label>
              </Col>

              <Col xs={7} md={7} sm={7} className="p-0">
                <Input
                  name="objectKey"
                  id="objectKey"
                  type="text"
                  className={`customFormControl ${
                    !viewDetail && !loading
                      ? objectKey && isUniqueObjectKey
                        ? "borderGreen"
                        : "borderRed"
                      : ""
                  }`}
                  value={objectKey}
                  onChange={(e) => {
                    if (e.target.value === " ") {
                      setObjectKey("");
                    } else {
                      setObjectKey(removeLeadingWhitespace(e.target.value));
                      dispatch(
                        setFormData({
                          ...permissionsPayload,
                          objectKey: removeLeadingWhitespace(e.target.value),
                        })
                      );
                      dispatch(setIsUniqueObjectKey(true));
                    }
                  }}
                  onBlur={(e) => checkUniqueObjectKey(e.target.value)}
                  disabled={viewDetail}
                  maxLength={50}
                  autoComplete="off"
                  aria-autocomplete="list"
                />
              </Col>
            </Form.Group>

            <Row className={`${!viewDetail && isUniqueDescription ? "" : "hide-elements"}`}>
              <Col xs={2} md={2} sm={2}></Col>
              <Col style={{ paddingLeft: "8px" }}>
                <p className="mb-0 text-danger"></p>
              </Col>
            </Row>

            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0 w-100px">
                <Form.Label className="col-form-label dealer-label">Menu Item</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className={`p-0 d-flex w-400px`}>
                <AutoCompleteDropdown
                  arrayList={menuList}
                  searchString={menuItemInput}
                  renderItemId={(menu) => menu.menuPK}
                  renderItemField={(menu) => menu.name}
                  handleSearchString={(string) => setMenuItemInput(string)}
                  fetchDataBySearchString={fetchMenuList}
                  onSelect={handleMenuItemSelection}
                  selectedId={menuItemId}
                  clearInputCallback={() => setMenuItemId(null)}
                  className={menuItemId || !menuItemInput ? "" : "borderRed"}
                  disabled={viewDetail}
                  // maxHeight="226px"
                />
                <LookupButton onClick={() => setShowMenuLookup(true)} disabled={viewDetail} />
                <MenuLookup
                  show={showMenuLookup}
                  onHide={() => setShowMenuLookup(false)}
                  renderItemId={(menu) => menu.menuPK}
                  handleLookupSelection={handleMenuItemSelection}
                  MaintenanceProgram
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0 w-100px">
                <Form.Label className="col-form-label dealer-label">Enabled</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={enabled}
                  onChange={(e) => {
                    setEnabled(e.target.checked);
                  }}
                  disabled={viewDetail || (id && !formData?.override && !hasEditOverridePermission)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0 w-100px">
                <Form.Label className="col-form-label dealer-label">Override</Form.Label>
              </Col>

              <Col xs={2} md={2} sm={2} className="p-0">
                <input
                  type="checkbox"
                  className="form-check-input p-0 "
                  checked={override}
                  onChange={(e) => setOverride(e.target.checked)}
                  disabled={viewDetail || (id && !formData?.override && !hasEditOverridePermission)}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mt-3 align-items  row  m-l-0 m-r-0">
              <Col sm={1} md={1} xs={1} className="p-0 w-100px">
                <label className="col-form-label dealer-label p-0 m-b-20">Notes</label>
              </Col>

              <Col xs={10} className="p-0">
                <textarea
                  rows={10}
                  cols={18}
                  type="text"
                  name="notes"
                  className={`customFormControl h-100`}
                  value={notes}
                  onChange={(e) => {
                    if (e.target.value === " ") {
                      setNotes("");
                    } else {
                      setNotes(e.target.value);
                    }
                  }}
                  disabled={viewDetail}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormContent;
