import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { t } from "i18next";
import {
  setCustomerOrderUserPK,
  setOrderUserFK,
  setCustomerPlantFK,
  setAllUsers,
  setCustomerPlants,
  setChangesCancelled,
  setDuplicateRecord,
  setUserSelection,
  setPickupUserSelection,
  setUsersDataInput,
  setIsuserandplantUnique,
  setPickupPlantInput,
  setPickupPlantSelection,
  setPlantstatus,
  setDisableAutocomplete,
} from "../../../../redux/CustomerOrderUsersSlice";
import { useNavigate, useParams } from "react-router-dom";
import CustomerOrderUsersService from "../../../../services/CustomerOrderUsersService";
import { setEditFormData } from "../../../../redux/CustomerOrderUsersSlice";
import { setViewDetail } from "../../../../redux/CustomerOrderUsersSlice";
import { CustomerPlants_Base_URL, Users_Base_URL } from "../../../../services/constants/applicationConstants";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import CustomerPlantLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import CustomerService from "../../../../services/CustomerService";
import LoadingIcon from "../../../common/LoadingIcon";
const FormContent = ({ styles }) => {
  const { customerId, customerPageNo, recordId } = useParams();
  const active = true;
  const type = "Autocomplete";
  const searchCriteria = "Beginning";
  const size = 100;
  const page = 0;
  const isPlantToPlantTransfer = true;
  const plantstatus = useSelector((state) => state.customerOrderUsers.plantstatus);
  const orderUserFK = useSelector((state) => state.customerOrderUsers.orderUserFK);
  const customerPlantFK = useSelector((state) => state.customerOrderUsers.customerPlantFK);
  const viewDetail = useSelector((state) => state.customerOrderUsers.viewDetail);
  const disableAutocomplete = useSelector((state) => state.customerOrderUsers.disableAutocomplete);
  const editFormData = useSelector((state) => state.customerOrderUsers.editFormData);
  const searchTerm = useSelector((state) => state.customerOrderUsers.searchTerm);
  // const searchCriteria = useSelector((state) => state.customerOrderUsers.searchCriteria);
  const pageNumber = useSelector((state) => state.customerOrderUsers.pageNumber);
  const changesCancelled = useSelector((state) => state.customerOrderUsers.changesCancelled);
  const duplicateRecord = useSelector((state) => state.customerOrderUsers.duplicateRecord);
  const pickupUserSelection = useSelector((state) => state.customerOrderUsers.pickupUserSelection);
  const pickupPlantSelection = useSelector((state) => state.customerOrderUsers.pickupPlantSelection);
  const pickupPlantInput = useSelector((state) => state.customerOrderUsers.pickupPlantInput);
  const usersDataInput = useSelector((state) => state.customerOrderUsers.usersDataInput);
  const customerOrderUserPK = useSelector((state) => state.customerOrderUsers.customerOrderUserPK);
  const orderEntryUsers = useSelector((state) => state.customerMaintenanceReducer.orderEntryUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerPlantData, setCustomerPlantData] = useState([]);
  const [orderUserData, setOrderUserData] = useState([]);
  const [hideCustomerPlant, setHideCustomerPlant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [plantLoading, setPlantLoading] = useState(false);
  const formData = {
    customerOrderUserPK,
    customerFK: parseInt(customerId),
    orderUserFK,
    customerPlantFK,
    whitelist: orderEntryUsers === "W" ? true : false,
    blacklist: orderEntryUsers === "B" ? true : false,
  };

  const fetchRecord = (recordId) => {
    setLoading(true);
    CustomerOrderUsersService.getRecord(recordId)
      .then((res) => {
        dispatch(setEditFormData(res.data));
        dispatch(setViewDetail(true));
      })
      .catch((err) => {
        navigate(`/customer-order-users/${customerId}/${customerPageNo}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getAllUsers = (string) => {
    setUserLoading(true);
    CustomerOrderUsersService.getAllUsers(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data.content;
        const userList = data?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        setOrderUserData(userList);
      })
      .catch((err) => {
        setUserLoading(false);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const fetchPickupPlant = (searchTerm) => {
    setPlantLoading(true);
    CustomerOrderUsersService.getCustomerPlants(
      customerId,
      searchTerm,
      active,
      type,
      size,
      page,
      isPlantToPlantTransfer,
      searchCriteria
    )
      .then((response) => {
        const data = response.data.content;
        const customerPlantList = data?.map((customerPlant) => ({
          ...customerPlant,
          name: customerPlant.name?.trim(),
        }));

        setCustomerPlantData(customerPlantList);
        dispatch(setCustomerPlants(data));
        if (searchTerm === "" && data.length === 0) {
          dispatch(setPlantstatus(true));
          setHideCustomerPlant(true);
        } else if (pickupPlantInput === "" && data.length === 1) {
          setHideCustomerPlant(false);
          dispatch(setPickupPlantInput(data[0].name || ""));
          dispatch(setCustomerPlantFK(data[0].customerPlantPK));
          hanldeCheckForm(data[0].customerPlantPK, orderUserFK);
          dispatch(setDisableAutocomplete(true));
        } else {
          setHideCustomerPlant(false);
        }
      })
      .catch((err) => {
        setPlantLoading(false);
      })
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const hanldeCheckForm = (plantFK, userFK) => {
    if (userFK && plantFK) {
      // If the selected combination is same as before editing don't check for duplicate
      if (
        recordId &&
        userFK === editFormData?.orderUserfk.userPK &&
        plantFK === editFormData?.customerPlantfk.customerPlantPK
      ) {
        dispatch(setDuplicateRecord(false));
      } else {
        CustomerOrderUsersService.checkDuplicateRecord(customerId, plantFK, userFK, formData).then((res) => {
          dispatch(setDuplicateRecord(res.data || false));
        });
      }
    } else if (userFK && hideCustomerPlant) {
      if (recordId && userFK === editFormData?.orderUserfk.userPK) {
        dispatch(setDuplicateRecord(false));
      } else {
        CustomerOrderUsersService.checkDuplicateRecord(customerId, plantFK, userFK, formData).then((res) => {
          dispatch(setDuplicateRecord(res.data || false));
        });
      }
    }
  };

  useEffect(() => {
    dispatch(setDuplicateRecord(false));
  }, []);

  const handlePickupUserLookupModalShow = () => {
    dispatch(setPickupUserSelection(true));
  };
  const handlePickupPlantLookupModalShow = () => {
    dispatch(setPickupPlantSelection(true));
  };

  const handlePickupUserLookupSelection = (user) => {
    dispatch(setUsersDataInput(user.name));
    dispatch(setOrderUserFK(user.userPK));
    hanldeCheckForm(customerPlantFK, user.userPK);
    dispatch(setPickupUserSelection(false));
  };

  const handlePickupPlantLookupSelection = (plant) => {
    dispatch(setPickupPlantInput(plant.name));
    dispatch(setCustomerPlantFK(plant.customerPlantPK));
    hanldeCheckForm(plant.customerPlantPK, orderUserFK);
    dispatch(setPickupPlantSelection(false));
  };

  const hidePickupUserModal = () => {
    dispatch(setPickupUserSelection(false));
  };
  const hidePickupPlantModal = () => {
    dispatch(setPickupPlantSelection(false));
  };

  useEffect(() => {
    setHideCustomerPlant(true);
    fetchPickupPlant("");
  }, []);

  // fetch form data
  useEffect(() => {
    if (recordId) fetchRecord(recordId);
  }, [recordId]);

  useEffect(() => {
    if (editFormData === undefined || editFormData === null || editFormData === "") {
      dispatch(setCustomerOrderUserPK(""));
      dispatch(setOrderUserFK(""));
      dispatch(setUsersDataInput(""));
      dispatch(setCustomerPlantFK(null));
      dispatch(setPickupPlantInput(""));
    }
  }, [editFormData]);

  // populate input fields when editing
  useEffect(() => {
    if (editFormData != null) {
      dispatch(setCustomerOrderUserPK(editFormData.customerOrderUserPK || ""));
      dispatch(setOrderUserFK(editFormData.orderUserfk.userPK || ""));
      dispatch(setUsersDataInput(editFormData.orderUserfk.name?.trim()));
      dispatch(setCustomerPlantFK(editFormData.customerPlantfk?.customerPlantPK || null));
      dispatch(setPickupPlantInput(editFormData.customerPlantfk?.name?.trim() || ""));
    }
  }, [editFormData, changesCancelled]);

  return (
    <div className="w-100 p-2">
      {loading && <LoadingIcon />}
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        <div className="m-b-10">
          <div className="p-15 w-100">
            <Row className="m-0 p-10">
              <Col sm={12} md={12} lg={12} xl={12} xs={12} className="mt-4">
                <Form.Group className="m-t-15 form-group m-t-5 m-b-10 align-items-center row m-l-0 m-r-0">
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className={styles.colFormLabel}>{t("customerOrderUsers.user")}</Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="d-flex">
                    <AutoCompleteDropdown
                      arrayList={orderUserData}
                      searchString={usersDataInput}
                      fetchDataBySearchString={getAllUsers}
                      renderItemId={(user) => user.userPK}
                      renderItemField={(user) => user.name}
                      handleSearchString={(string) => dispatch(setUsersDataInput(string))}
                      onSelect={handlePickupUserLookupSelection}
                      selectedId={orderUserFK}
                      clearInputCallback={() => {
                        dispatch(setOrderUserFK(null));
                        dispatch(setDuplicateRecord(false));
                      }}
                      className={`${
                        !viewDetail
                          ? !orderUserFK || usersDataInput === "" || duplicateRecord
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      maxHeight={"210px"}
                      disabled={viewDetail}
                      loading={userLoading}
                    />
                    <LookupButton onClick={handlePickupUserLookupModalShow} disabled={viewDetail} />
                  </Col>
                </Form.Group>

                {orderUserFK &&
                  customerPlantData.length === 0 &&
                  !customerPlantFK &&
                  !viewDetail &&
                  duplicateRecord && (
                    <Row>
                      <Col xs={3} md={3} sm={3}></Col>
                      <Col style={{ paddingLeft: "18px" }}></Col>
                    </Row>
                  )}

                <Form.Group
                  className={`m-t-15 form-group m-t-5 m-b-10 align-items-center row m-l-0 m-r-0 ${
                    hideCustomerPlant ? "hide-elements" : ""
                  }`}
                >
                  <Col xs={3} sm={3} md={3} className="p-0">
                    <Form.Label className={styles.colFormLabel}>
                      {t("customerOrderUsers.customerPlant")}
                    </Form.Label>
                  </Col>

                  <Col xs={5} md={5} sm={5} className="d-flex">
                    <AutoCompleteDropdown
                      arrayList={customerPlantData}
                      searchString={pickupPlantInput}
                      handleSearchString={(string) => dispatch(setPickupPlantInput(string))}
                      fetchDataBySearchString={fetchPickupPlant}
                      renderItemId={(plant) => plant.customerPlantPK}
                      renderItemField={(plant) => plant.name}
                      onSelect={handlePickupPlantLookupSelection}
                      selectedId={customerPlantFK}
                      clearInputCallback={() => {
                        dispatch(setCustomerPlantFK(null));
                        dispatch(setDuplicateRecord(false));
                      }}
                      //border color set in plant autocomplete
                      className={`${
                        !viewDetail && !disableAutocomplete
                          ? !customerPlantFK || pickupPlantInput === "" || duplicateRecord
                            ? "borderRed"
                            : "borderGreen"
                          : ""
                      }`}
                      disabled={viewDetail || disableAutocomplete}
                      maxHeight={"170px"}
                      loading={plantLoading}
                    />
                    <LookupButton
                      onClick={handlePickupPlantLookupModalShow}
                      disabled={viewDetail || disableAutocomplete}
                    />
                  </Col>
                </Form.Group>

                {customerPlantFK && !viewDetail && duplicateRecord && <Row></Row>}
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <UserLookup
        show={pickupUserSelection}
        onHide={hidePickupUserModal}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handlePickupUserLookupSelection}
        MaintenanceProgram
      />
      <CustomerPlantLookup
        customerId={customerId}
        show={pickupPlantSelection}
        onHide={hidePickupPlantModal}
        renderItemId={(plant) => plant.customerPlantPK}
        handleLookupSelection={handlePickupPlantLookupSelection}
        MaintenanceProgram
      />
    </div>
  );
};

export default FormContent;
