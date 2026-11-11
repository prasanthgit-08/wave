import React, { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  setUniqueResponse,
  setPageNumber,
  setEditFormData,
  setViewDetail,
  setNotes,
  setDescription,
  setPrimaryKey,
  setSaveData,
  setDisableSave,
  setSelectedCustomer,
} from "../../../../redux/CustomerPlantGroupSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../../../../styles/QuarterScreen.module.css";
import CustomerPlantGroupsService from "../../../../services/CustomerPlantGroupsService";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import CustomerLookup from "../../../LookupScreens/Customer/CustomerLookup";
import LookupButton from "../../../common/LookupButton";
import LoadingIcon from "../../../common/LoadingIcon";
const FormContent = ({ loading, setLoading }) => {
  const [customerData, setCustomerData] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [customername, setCustomername] = useState("");
  const [showcustomerlookup, setShowcustomerlookup] = useState(false);
  const [showDiscriptionMessage, setShowDiscriptionMessage] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);

  const description = useSelector((state) => state.customerPlantGroup.description);
  const uniqueResponse = useSelector((state) => state.customerPlantGroup.uniqueResponse);

  const plantList = useSelector((state) => state.customerPlantGroup.plantList);
  const notes = useSelector((state) => state.customerPlantGroup.notes);
  const selectedPlants = useSelector((state) => state.customerPlantGroup.selectedPlants);
  const pageNumber = useSelector((state) => state.customerPlantGroup.pageNumber);
  const totalPages = useSelector((state) => state.customerPlantGroup.totalPages);
  const totalElements = useSelector((state) => state.customerPlantGroup.totalElements);

  const changesCancelled = useSelector((state) => state.customerPlantGroup.changesCancelled);
  const editFormData = useSelector((state) => state.customerPlantGroup.editFormData);
  const viewDetail = useSelector((state) => state.customerPlantGroup.viewDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getPlantGroupData = () => {
    dispatch(
      setSaveData({
        customerId: customerId,
        description: description,
        notes: notes,
        customerPlantGroupPK: id,
      })
    );
  };

  const fetchRecordById = (id) => {
    setLoading(true);
    CustomerPlantGroupsService.getPlantGroupById(id)
      .then((response) => {
        const data = response.data;
        dispatch(setEditFormData(data));
        dispatch(setViewDetail(true));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        navigate("/customer-plant-group");
      });
  };
  useEffect(() => {
    getPlantGroupData();
  }, [description, notes, id, customerId]);

  useEffect(() => {
    if (!(description && uniqueResponse)) {
      dispatch(setDisableSave(true));
    } else if (!customerId) {
      dispatch(setDisableSave(true));
    } else {
      dispatch(setDisableSave(false));
    }
  }, [description, uniqueResponse, customerId, customername]);

  useEffect(() => {
    if (id) fetchRecordById(id);
  }, [id]);

  useEffect(() => {
    if (editFormData != null) {
      dispatch(setDescription(editFormData.description ? editFormData.description?.trim() : ""));
      id && setCustomerId(editFormData.customerfk.customerPK);
      id && dispatch(setSelectedCustomer(editFormData.customerfk.customerPK));
      id && setCustomername(editFormData.customerfk.name);
      dispatch(setNotes(editFormData.notes ? editFormData.notes?.trim() : ""));
      dispatch(setPrimaryKey(editFormData.customerPlantGroupPK || ""));
      dispatch(setUniqueResponse(true));
    } else {
      dispatch(setDescription(""));
      setCustomerId(null);
      setCustomername("");
      dispatch(setNotes(""));
    }
  }, [id, editFormData, changesCancelled, viewDetail]);

  const hideCustomerModel = () => {
    setShowcustomerlookup(false);
  };

  const handleCustomerLookupSelection = (customer) => {
    setCustomername(customer.name?.trim());
    setCustomerId(customer.customerPK);
    setShowcustomerlookup(false);
  };

  const fetchCustomer = (string) => {
    setAutoLoading(true);
    CustomerPlantGroupsService.fetchCustomerAutoComplete(string)
      .then((response) => {
        const data = response.data;
        const customersList = data.content?.map((customer) => ({ ...customer, name: customer.name?.trim() }));
        setCustomerData(customersList);
      })
      .catch((err) => {})
      .finally(() => {
        setAutoLoading(false);
      });
  };

  const CheckDescriptionExist = (e) => {
    if (!id || (id && e !== editFormData.description?.trim())) {
      CustomerPlantGroupsService.checkDescriptionExist(e)
        .then((res) => {
          dispatch(setUniqueResponse(res.data));
          setShowDiscriptionMessage(!res.data);
        })
        .catch((err) => {});
    } else if (id && e === editFormData.description?.trim()) {
      dispatch(setUniqueResponse(true));
    }
  };

  const paginationProps = {
    pageNumber,
    setPageNumber,
    totalPages,
    totalElements,
    listingData: selectedPlants,
  };
  const on = (values, setting) => {
    setTimeout(() => {
      setting(false);
    }, 400);
  };
  const validationSchema = yup.object({
    description: yup.string().required(),
  });

  useEffect(() => {
    if (!uniqueResponse) {
      setShowDiscriptionMessage(true);
    }
  }, [uniqueResponse]);

  useEffect(() => {
    setShowDiscriptionMessage(false);
  }, [description]);

  return (
    <>
      <div>
        <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0 p-t-12 ">
          {" "}
          <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "75px" }}>
            <Form.Label className={`${styles.colFormLabel}`}>
              {t("edit.plantGroup.page.resources.tab.customer")}
            </Form.Label>
          </Col>
          {id && plantList.length !== 0 && (
            <Col xs={9} md={9} sm={9} className="p-0">
              <input
                type="text"
                className={`customFormControl`}
                id="customer"
                name="customer"
                value={customername}
                maxLength={30}
                disabled
                autoComplete="off"
                aria-autocomplete="list"
              />
            </Col>
          )}
          {(!id || plantList.length === 0) && (
            <Col xs={9} md={9} sm={9} className="p-0 d-flex">
              <AutoCompleteDropdown
                className={`${viewDetail ? "" : !customerId ? "borderRed" : "borderGreen"}`}
                arrayList={customerData}
                searchString={customername?.trim()}
                handleSearchString={(string) => setCustomername(string)}
                fetchDataBySearchString={fetchCustomer}
                renderItemId={(customer) => customer.customerPK}
                renderItemField={(customer) => customer.name}
                onSelect={handleCustomerLookupSelection}
                selectedId={customerId}
                disabled={viewDetail}
                clearInputCallback={() => {
                  setCustomerId(null);
                }}
                loading={autoLoading}
              />
              <LookupButton
                onClick={() => {
                  setShowcustomerlookup(true);
                }}
                disabled={viewDetail}
              />
            </Col>
          )}
        </Form.Group>
        <Form.Group className="form-group m-t-5 m-b-15 form-group m-t-5 align-items-center row m-l-0 m-r-0">
          {" "}
          <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "75px" }}>
            <Form.Label className="col-form-label dealer-label">
              {t("plantGroup.list.page.table.heading")}
            </Form.Label>
          </Col>
          <Col xs={9} md={9} sm={9} className="p-0">
            <input
              type="text"
              className={`customFormControl
            ${viewDetail ? "black" : description && uniqueResponse ? "borderGreen" : "borderRed"}
            
            `}
              id="description"
              name="description"
              value={description}
              maxLength={30}
              disabled={viewDetail}
              autoComplete="newpassword"
              aria-autocomplete="none"
              onInput={(e) => {
                const value = e.target.value;
                // if(e.target.value!==" "){
                setShowDiscriptionMessage(false);
                dispatch(setUniqueResponse(true));
                dispatch(setDescription(value.replace(/^\s+/, "")));
                // }
              }}
              onBlur={(e) => {
                CheckDescriptionExist(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        {/* Would be required for future reference */}
        {/* <Row className={`m-t-0 m-b-15 ${!viewDetail && showDiscriptionMessage ? "" : "hide-elements"}  `}>
            <Col xs={1} md={1} sm={1} className="w-75px"></Col>
            <Col style={{ paddingLeft: "w-50px" }}>
              <p className="mb-0 text-danger" style={{ height: "20px" }}>
                {" "}
                Description "{description.toUpperCase()} "already exists!
              </p>
            </Col>
          </Row> */}

        <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-top row m-l-0 m-r-0">
          <Col xs={2} sm={2} md={2} className="p-0" style={{ width: "75px" }}>
            <label className="col-form-label dealer-label p-0 m-b-20">
              {t("edit.plantGroup.page.resources.tab.notes")}
            </label>
          </Col>
          <Col xs={9} sm={9} md={9} className="p-0 ">
            <textarea
              rows={9}
              cols={20}
              type="text"
              className={`customFormControl h-100 `}
              id="notes"
              name="notes"
              value={notes}
              disabled={viewDetail}
              onInput={(e) => dispatch(setNotes(e.target.value.replace(/^\s+/, "")))}
            />
          </Col>
        </Form.Group>

        <CustomerLookup
          show={showcustomerlookup}
          onHide={hideCustomerModel}
          renderItemId={(customer) => customer.customerPK}
          renderItemField={(customer) => customer.name}
          handleLookupSelection={handleCustomerLookupSelection}
          usePlantsCustomer
        />
      </div>
    </>
  );
};
export default FormContent;
