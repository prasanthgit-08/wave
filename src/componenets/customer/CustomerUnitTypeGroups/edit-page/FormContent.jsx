import React, { useRef } from "react";
import styles from "../../../../styles/ThreeQuarterScreen.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  setDescription,
  setEditFormData,
  setIsDescriptionUnique,
  setNotes,
  setType,
  setUnitTypeGroupPKS,
  setPageNumberUT,
  setCustomerId,
  setCustomerPlantId,
  setCustomerPlantGroupId,
  setCustomerGroupId,
  setCustomerInput,
  setCustomerPlantInput,
  setCustomerPlantGroupInput,
  setCustomerGroupInput,
  setRadioValue,
  setMotorized,
  setTowable,
  setViewDetail,
  resetStates,
  setWhichOne,
  setIsGroupLoading,
} from "../../../../redux/CustomerUnitTypeGroupSlice";
import CustomerUnitTypeGroupsService from "../../../../services/CustomerUnitTypeGroupsService";
import CustomerService from "../../../../services/CustomerService";
import CustomerPlantMaintenanceService from "../../../../services/CustomerPlantMaintenanceService";
import CustomerPlantGroupService from "../../../../services/CustomerPlantGroupService";
import CustomerGroupService from "../../../../services/CustomerGroupService";
import { Radio, RadioGroup } from "react-radio-group";
import CustomRadioGroup from "../../../common/CustomRadioGroup";
import LoadingIcon from "../../../common/LoadingIcon";
import useDebouncer from "../../../../hooks/useDebouncer";

const DealerGroupViewContent = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentURL = window.location.pathname;
  const [loading, setLoading] = useState(false);

  // Prevent duplicate record API calls for the same ID
  const recordRequestRef = useRef(null);

  const [customerUnitTypeGroupdata, setCustomerUnitTypeGroupdata] = useState([]);
  const [unitTypeGroupDropdown, setUnitTypeGroupDropDown] = useState([]);

  const description = useSelector((state) => state.customerUnitTypeGroupReducer.description);
  const viewDetail = useSelector((state) => state.customerUnitTypeGroupReducer.viewDetail);
  const notes = useSelector((state) => state.customerUnitTypeGroupReducer.notes);

  const editFormData = useSelector((state) => state.customerUnitTypeGroupReducer.editFormData);
  const customerId = useSelector((state) => state.customerUnitTypeGroupReducer.customerId);
  const customerPlantId = useSelector((state) => state.customerUnitTypeGroupReducer.customerPlantId);
  const customerPlantGroupId = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupId
  );
  const customerGroupId = useSelector((state) => state.customerUnitTypeGroupReducer.customerGroupId);
  const unitTypeGroupPKS = useSelector((state) => state.customerUnitTypeGroupReducer.unitTypeGroupPKS);
  const customerInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerInput);
  const customerPlantInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerPlantInput);
  const customerGroupInput = useSelector((state) => state.customerUnitTypeGroupReducer.customerGroupInput);
  const customerPlantGroupInput = useSelector(
    (state) => state.customerUnitTypeGroupReducer.customerPlantGroupInput
  );
  const isDescriptionUnique = useSelector((state) => state.customerUnitTypeGroupReducer.isDescriptionUnique);
  const radioValue = useSelector((state) => state.customerUnitTypeGroupReducer.radioValue);
  const towable = useSelector((state) => state.customerUnitTypeGroupReducer.towable);
  const motorized = useSelector((state) => state.customerUnitTypeGroupReducer.motorized);
  const isGroupLoading = useSelector((state) => state.customerUnitTypeGroupReducer.isGroupLoading);

  const unitTypeGroupData = useSelector((state) => state.customerUnitTypeGroupReducer.unitTypeGroupData);
  const whichOne = useSelector((state) => state.customerUnitTypeGroupReducer.whichOne);

  const fetchRecordById = (id) => {
    dispatch(setIsGroupLoading(true));

    CustomerUnitTypeGroupsService.getRecord(id)
      .then((res) => {
        const data = res?.data;

        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));

        setTimeout(() => {
          dispatch(setIsGroupLoading(false));
        }, 100);
      })
      .catch((err) => {
        // Allow the same ID to be requested again if the API fails
        recordRequestRef.current = null;

        dispatch(setIsGroupLoading(false));
        console.log(err);
        navigate(`/customer-unit-type-groups`);
      });
  };

  useEffect(() => {
    if (id && recordRequestRef.current !== id) {
      recordRequestRef.current = id;
      fetchRecordById(id);
    }
  }, [id]);

  const handleCheckDescription = (description) => {
    CustomerUnitTypeGroupsService.checkDescriptionExist(description, id)
      .then((res) => {
        dispatch(setIsDescriptionUnique(res?.data));
      })
      .catch((err) => {
        console.log(err);
        navigate(`/customer-unit-type-groups`);
      });
  };

  const setCustomerValue = (customerId) => {
    if (customerId !== null) {
      CustomerService.getCustomerById(customerId)
        .then((response) => {
          const data = response?.data;

          dispatch(setCustomerInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerInput(""));
    }
  };

  const debounceSetCustomerValue = useDebouncer(setCustomerValue, 500);

  useEffect(() => {
    if (customerId) debounceSetCustomerValue(customerId);
  }, [customerId]);

  const setPlantValue = (customerPlantId) => {
    if (customerPlantId !== null) {
      CustomerPlantMaintenanceService.getcompleteCustomerPlantsById(customerPlantId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerPlantInput(data?.name));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantInput(""));
    }
  };

  const setPlantGroupValue = (customerPlantGroupId) => {
    if (customerPlantGroupId !== null) {
      CustomerPlantGroupService.getRecord(customerPlantGroupId)
        .then((response) => {
          const data = response?.data;

          dispatch(setCustomerPlantGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerPlantGroupInput(""));
    }
  };

  const setCustomerGroupValue = (customerGroupId) => {
    if (customerGroupId !== null) {
      CustomerGroupService.getRecord(customerGroupId)
        .then((response) => {
          const data = response?.data;
          dispatch(setCustomerGroupInput(data?.description));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setCustomerGroupInput(""));
    }
  };

  useEffect(() => {
    if (editFormData === undefined || editFormData == null) {
      dispatch(setIsDescriptionUnique(false));
      dispatch(setDescription(""));
      dispatch(setNotes(""));

      if (id) {
        dispatch(setRadioValue(null));
      } else {
        dispatch(setRadioValue("Motorized"));
      }
    }

    if (editFormData != null) {
      dispatch(setNotes(editFormData.notes ? editFormData.notes : ""));
      dispatch(setCustomerId(editFormData?.customerId || null));
      dispatch(setCustomerPlantId(editFormData?.customerPlantId || null));
      setPlantValue(editFormData?.customerPlantId);

      dispatch(setCustomerPlantGroupId(editFormData?.customerPlantGroupId || null));
      setPlantGroupValue(editFormData?.customerPlantGroupId);

      dispatch(setCustomerGroupId(editFormData?.customerGroupId || null));
      setCustomerGroupValue(editFormData?.customerGroupId);

      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));

      if (!editFormData?.motorized && !editFormData?.towable) {
        dispatch(setRadioValue(null));
      } else {
        dispatch(setRadioValue(editFormData.motorized ? "Motorized" : "Towable"));
      }
    }
  }, [editFormData, viewDetail]);

  useEffect(() => {
    dispatch(setNotes(""));
  }, []);

  window.addEventListener("popstate", () => {
    dispatch(setIsDescriptionUnique(false));
    dispatch(setDescription(""));
  });

  useEffect(() => {
    if (
      !customerId &&
      !customerPlantId &&
      !customerPlantGroupId &&
      !customerGroupId &&
      currentURL === `/customer-unit-type-groups-add`
    )
      navigate("/customer-unit-type-groups-selection");
  }, []);

  return (
    <div>
      <Form.Group className="mt-3 form-group  align-items-center row  m-l-0 m-r-0">
        <Col xs={3} sm={3} md={3} className="p-0">
          <Form.Label className="col-form-label dealer-label m-l-0 ">Description</Form.Label>
        </Col>

        <Col xs={9} md={9} sm={9} className="p-0">
          <input
            className={`${styles.formControl} ${
              viewDetail === true || isGroupLoading
                ? ""
                : description?.length >= 1
                  ? isDescriptionUnique
                    ? "borderRed"
                    : "borderGreen"
                  : "borderRed"
            }`}
            id="description"
            name="description"
            type="text"
            value={description}
            maxLength={50}
            autoComplete="newpassword"
            aria-autocomplete="none"
            onChange={(e) => {
              dispatch(setDescription(e.target.value?.replace(/^\s+/g, "")));
              dispatch(setIsDescriptionUnique(false));
            }}
            onBlur={(e) => handleCheckDescription(e.target.value)}
            disabled={viewDetail}
          />
        </Col>
      </Form.Group>

      <Form.Group className={`mt-0 m-b-10 align-items-center row  m-l-0 m-r-0 ${styles.colFormLabel}`}>
        {" "}
        <Col xs={3} sm={3} md={3} className="p-0">
          <Form.Label className="col-form-label dealer-label m-l-0 ">
            {customerId
              ? "Customer"
              : "" || customerPlantId
                ? "Plant"
                : "" || customerPlantGroupId
                  ? "Plant Group"
                  : "" || customerGroupId
                    ? "Customer Group"
                    : ""}
          </Form.Label>
        </Col>
        <Col xs={9} md={9} sm={9} className="p-0">
          <input
            className={"customFormControl"}
            id="whichOne"
            name="whichOne"
            type="text"
            value={
              customerId
                ? customerInput?.toUpperCase()
                : "" || customerPlantId
                  ? customerPlantInput?.toUpperCase()
                  : "" || customerPlantGroupId
                    ? customerPlantGroupInput?.toUpperCase()
                    : "" || customerGroupId
                      ? customerGroupInput?.toUpperCase()
                      : ""
            }
            disabled
            maxLength={50}
            autoComplete="newpassword"
            aria-autocomplete="none"
            onInput={(e) => {
              dispatch(setWhichOne(e.target.value));
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-3 align-items-center row  m-l-0 m-r-0">
        <Col xs={3} sm={3} md={3} className="p-0 ">
          <Form.Label htmlFor="name" className="col-form-label dealer-label"></Form.Label>
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

      <Form.Group className=" mt-5 m-b-10 align-items row  m-l-0 m-r-0 ">
        <Col sm={12} md={12} xs={12} className="p-10">
          <Form.Label className=" col-form-label dealer-label">Notes</Form.Label>
        </Col>

        <Col sm={12} md={12} className="p-0 m-t-10 ">
          <textarea
            id="notes"
            style={{
              resize: "none",
              height: "150px",
            }}
            className="w-100 customFormControl"
            name="notes"
            type="text"
            value={notes}
            disabled={viewDetail}
            autoComplete="newpassword"
            aria-autocomplete="none"
            onInput={(e) => {
              dispatch(setNotes(e.target.value?.replace(/^\s+/g, "")));
            }}
          />
        </Col>
      </Form.Group>

      {isGroupLoading && <LoadingIcon />}
    </div>
  );
};

export default DealerGroupViewContent;
