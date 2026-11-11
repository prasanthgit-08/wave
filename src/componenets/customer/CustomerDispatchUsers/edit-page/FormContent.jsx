import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import LookupButton from "../../../common/LookupButton";
import CustomerDispatchUsersService from "../../../../services/CustomerDispatchUsersService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserLookup from "../../../LookupScreens/User/UserLookup";
import CustomerPlantsLookup from "../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import {
  setAddFormData,
  setDisableSave,
  setFormData,
  setViewDetail,
} from "../../../../redux/CustomerDispatchUsersSlice";

const FormContent = () => {
  const { customerId, customerPageNo, recordId } = useParams();
  const active = true;
  const type = "Autocomplete";
  const size = 100;
  const page = 0;
  const isPlantToPlantTransfer = true;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderUserData, setOrderUserData] = useState([]);
  const [usersDataInput, setUsersDataInput] = useState("");
  const [orderUserFK, setOrderUserFK] = useState("");
  const [customerPlantData, setCustomerPlantData] = useState([]);
  const [customerPlants, setCustomerPlants] = useState([]);
  const [plantstatus, setPlantstatus] = useState(false);
  const [hideCustomerPlant, setHideCustomerPlant] = useState(false);
  const [pickupPlantInput, setPickupPlantInput] = useState("");
  const [customerPlantFK, setCustomerPlantFK] = useState("");
  const [duplicateRecord, setDuplicateRecord] = useState(false);
  const [disableAutocomplete, setDisableAutocomplete] = useState(false);
  const [pickupPlantSelection, setPickupPlantSelection] = useState(false);
  const [pickupUserSelection, setPickupUserSelection] = useState(false);
  const [customerOrderUserPK, setCustomerOrderUserPK] = useState("");
  const searchCriteria = "Beginning";

  const pageNumber = useSelector((state) => state.customerDispatchUsers.pageNumber);
  const viewDetail = useSelector((state) => state.customerDispatchUsers.viewDetail);
  const formData = useSelector((state) => state.customerDispatchUsers.formData);
  const orderDispatchUsers = useSelector((state) => state.customerDispatchUsers.orderDispatchUsers);
  const changesCancelled = useSelector((state) => state.customerDispatchUsers.changesCancelled);
  const disableSave = useSelector((state) => state.customerDispatchUsers.disableSave);
  const usePlant = useSelector((state) => state.customerDispatchUsers.usePlant);

  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [customerPlantLoading, setCustomerPlantLoading] = useState(false);

  const fetchRecord = (recordId) => {
    setLoading(true);
    CustomerDispatchUsersService.getRecord(recordId)
      .then((res) => {
        if (!res.data) {
          navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
        } else {
          dispatch(setFormData(res.data));
          dispatch(setViewDetail(true));
          setLoading(false);
        }
      })
      .catch((err) => {
        navigate(`/customer-dispatch-users/${customerId}/${customerPageNo}`);
      });
  };

  const getAllUsers = (string) => {
    setUserLoading(true);
    CustomerDispatchUsersService.getAllUsers(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data.content;
        const userList = data?.map((users) => ({
          ...users,
          name: users.name?.trim(),
        }));
        setOrderUserData(userList);
        setUserLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const fetchPickupPlant = (searchTerm) => {
    setCustomerPlantLoading(true);
    CustomerDispatchUsersService.getCustomerPlants(
      customerId,
      searchTerm,
      active,
      type,
      size,
      page,
      isPlantToPlantTransfer,
      "Beginning"
    )
      .then((response) => {
        const data = response.data.content;
        const customerPlantList = data?.map((customerPlant) => ({
          ...customerPlant,
          name: customerPlant.name?.trim(),
        }));

        setCustomerPlantData(customerPlantList);
        setCustomerPlants(data);
        if ((searchTerm === "" || !searchTerm) && data.length === 0) {
          setPlantstatus(true);
          setHideCustomerPlant(true);
        } else if (pickupPlantInput === "" && data.length === 1) {
          setHideCustomerPlant(false);
          setPickupPlantInput(data[0].name || "");
          setCustomerPlantFK(data[0].customerPlantPK);
          hanldeCheckForm(data[0].customerPlantPK, orderUserFK);
          setDisableAutocomplete(true);
        } else {
          setHideCustomerPlant(false);
        }
        setCustomerPlantLoading(false);
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerPlantLoading(false);
      });
  };

  const hanldeCheckForm = (plantFK, userFK) => {
    if (userFK && plantFK) {
      if (
        recordId &&
        userFK === formData?.dispatchUserFK.userPK &&
        plantFK === formData?.customerPlantFK?.customerPlantPK
      ) {
        setDuplicateRecord(false);
      } else {
        CustomerDispatchUsersService.checkDuplicateRecord(customerId, plantFK, userFK).then((res) => {
          setDuplicateRecord(res.data || false);
        });
      }
    } else if (userFK && hideCustomerPlant) {
      if (recordId && userFK === formData?.dispatchUserFK.userPK) {
        setDuplicateRecord(false);
      } else {
        CustomerDispatchUsersService.checkDuplicateRecord(customerId, plantFK, userFK).then((res) => {
          setDuplicateRecord(res.data || false);
        });
      }
    }
  };

  useEffect(() => {
    if (
      !duplicateRecord &&
      orderUserFK !== null &&
      (customerPlantFK !== null || customerPlants.length === 0)
    ) {
      dispatch(setDisableSave(false));
    } else {
      dispatch(setDisableSave(true));
    }
  }, [disableSave, orderUserFK, customerPlantFK, duplicateRecord]);

  const handlePickupUserLookupModalShow = () => {
    setPickupUserSelection(true);
  };

  const handlePickupPlantLookupModalShow = () => {
    setPickupPlantSelection(true);
  };

  const handlePickupUserLookupSelection = (user) => {
    setUsersDataInput(user.name?.trim());
    setOrderUserFK(user.userPK);
    hanldeCheckForm(customerPlantFK, user.userPK);
    setPickupUserSelection(false);
  };

  const handlePickupPlantLookupSelection = (plant) => {
    setPickupPlantInput(plant.name?.trim());
    setCustomerPlantFK(plant.customerPlantPK);
    hanldeCheckForm(plant.customerPlantPK, orderUserFK);
    setPickupPlantSelection(false);
  };

  const hidePickupUserModal = () => {
    setPickupUserSelection(false);
  };
  const hidePickupPlantModal = () => {
    setPickupPlantSelection(false);
  };

  useEffect(() => {
    setHideCustomerPlant(true);
    fetchPickupPlant("");
  }, []);

  useEffect(() => {
    if (recordId) fetchRecord(recordId);
  }, [recordId]);

  const customerDispatchuUserData = () => {
    dispatch(
      setAddFormData({
        customerDispatchUserPK: recordId,
        customerFK: parseInt(customerId),
        dispatchUserId: orderUserFK,
        customerPlantId: customerPlantFK,
        whiteList: orderDispatchUsers === "W" ? true : false,
        blackList: orderDispatchUsers === "B" ? true : false,
      })
    );
  };

  useEffect(() => {
    customerDispatchuUserData();
  }, [orderUserFK, customerPlantFK]);

  useEffect(() => {
    if (formData) {
      setCustomerOrderUserPK(formData.customerOrderUserPK || "");
      setOrderUserFK(formData.dispatchUserFK.userPK || null);
      setUsersDataInput(formData.dispatchUserFK.name?.trim());
      setCustomerPlantFK(formData.customerPlantFK?.customerPlantPK || null);
      setPickupPlantInput(formData.customerPlantFK?.name?.trim() || "");
      setDuplicateRecord(false);
    } else {
      setCustomerOrderUserPK("");
      setOrderUserFK(null);
      setUsersDataInput("");
      setCustomerPlantFK(null);
      setPickupPlantInput("");
    }
  }, [formData, changesCancelled]);

  return (
    <div className="w-100 p-2">
      <div className="shadow-sm rounded border quarterScreenFormContentHeight">
        {!loading && (
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={12} md={12} lg={12} xl={12} xs={12} className="mt-4">
                  <Form.Group className=" mt-3 form-group align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">User</Form.Label>
                    </Col>

                    <Col sm={4} md={4} xs={4} className={`p-0 d-flex`}>
                      <AutoCompleteDropdown
                        arrayList={orderUserData}
                        searchString={usersDataInput}
                        renderItemId={(user) => user.userPK}
                        renderItemField={(user) => user.name}
                        handleSearchString={(string) => setUsersDataInput(string)}
                        fetchDataBySearchString={getAllUsers}
                        onSelect={handlePickupUserLookupSelection}
                        selectedId={orderUserFK}
                        clearInputCallback={() => {
                          setOrderUserFK(null);
                          setDuplicateRecord(false);
                        }}
                        className={`${
                          !viewDetail
                            ? formData || !recordId
                              ? !orderUserFK || usersDataInput === "" || duplicateRecord
                                ? "borderRed"
                                : "borderGreen"
                              : ""
                            : ""
                        }`}
                        maxHeight={"180px"}
                        disabled={viewDetail}
                        loading={userLoading}
                      />

                      <LookupButton onClick={handlePickupUserLookupModalShow} disabled={viewDetail} />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    className={`mt-3 form-group align-items-center row m-l-0 m-r-0 ${
                      hideCustomerPlant ? "hide-elements" : ""
                    }`}
                  >
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className="customColFormLabel">Customer Plant</Form.Label>
                    </Col>

                    <Col sm={4} md={4} xs={4} className={`p-0 d-flex`}>
                      <AutoCompleteDropdown
                        arrayList={customerPlantData}
                        searchString={pickupPlantInput}
                        renderItemId={(item) => item.customerPlantPK}
                        renderItemField={(item) => item.name?.trim()}
                        handleSearchString={(string) => setPickupPlantInput(string)}
                        fetchDataBySearchString={fetchPickupPlant}
                        onSelect={handlePickupPlantLookupSelection}
                        selectedId={customerPlantFK}
                        clearInputCallback={() => {
                          setCustomerPlantFK(null);
                          setDuplicateRecord(false);
                        }}
                        className={`${
                          !viewDetail
                            ? !disableAutocomplete
                              ? formData || !recordId
                                ? !customerPlantFK || pickupPlantInput === "" || duplicateRecord
                                  ? "borderRed"
                                  : "borderGreen"
                                : ""
                              : ""
                            : ""
                        }`}
                        disabled={viewDetail || disableAutocomplete}
                        maxHeight={"180px"}
                        loading={customerPlantLoading}
                      />

                      <LookupButton
                        onClick={handlePickupPlantLookupModalShow}
                        disabled={viewDetail || disableAutocomplete}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
      <UserLookup
        show={pickupUserSelection}
        onHide={hidePickupUserModal}
        renderItemId={(user) => user.userPK}
        handleLookupSelection={handlePickupUserLookupSelection}
        MaintenanceProgram
      />
      <CustomerPlantsLookup
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
