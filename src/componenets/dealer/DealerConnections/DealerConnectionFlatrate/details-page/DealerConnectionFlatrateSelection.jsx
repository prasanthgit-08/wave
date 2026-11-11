import React, { useState } from "react";
import QuarterScreenWrapper from "../../../../Templates/Screens/QuarterScreenWrapper";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerInput,
  setCustomerSelection,
  setCustomerGroupInput,
  setCustomerGroupSelection,
  setCustomerPlantGroupSelection,
  setCustomerPlantGroupInput,
  setCustomerPlantInput,
  setCustomerPlantSelection,
  setViewDetail,
  setCustomerGroupFK,
  setCustomerFK,
  setCustomerPlantGroupFK,
  setCustomerPlantFK,
} from "../../../../../redux/DealerFlatRateConnectionSlice";
import DealerConnectionFlatRateService from "../../../../../services/DealerConnectionFlatRateService";
import CustomerLookup from "../../../../LookupScreens/Customer/CustomerLookup";
import CustomerPlantGroupsLookup from "../../../../LookupScreens/CustomerPlantGroups/CustomerPlantGroupsLookup";
import CustomerGroupsLookup from "../../../../LookupScreens/CustomerGroups/CustomerGroupsLookup";
import CustomerPlantsLookup from "../../../../LookupScreens/CustomerPlants/CustomerPlantsLookup";
import ModalComponent from "../../../../common/ModalComponent";

const DealerConnectionFlatrateSelection = () => {
  const viewDetail = useSelector((state) => state.dealerFlatRateConnectionSReducer.viewDetail);
  const navigate = useNavigate();
  const customerFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerFK);
  const customerPlantGroupFK = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantGroupFK
  );
  const customerPlantFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerPlantFK);
  const customerGroupFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerGroupFK);
  const customerInput = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerInput);
  const customerGroupInput = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerGroupInput
  );
  const [customerGroupDropdownData, setcustomerGroupDropdownData] = useState([]);
  const [plantGroupDropdownData, setplantGroupDropdownData] = useState([]);
  const isAnySelectionMade = customerFK || customerGroupFK || customerPlantFK || customerPlantGroupFK;
  const [customerData, setCustomerData] = useState([]);
  const dispatch = useDispatch();
  const searchCriteria = useSelector((state) => state.dealerFlatRateConnectionSReducer.searchCriteria);
  const pageNumber = useSelector((state) => state.dealerFlatRateConnectionSReducer.pageNumber);
  const customerSelection = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerSelection);
  const [dealerSelectionType, setDealerSelectionType] = useState({});
  const customerPlantGroupInput = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantGroupInput
  );

  const [customerLoading, setCustomerLoading] = useState(false);
  const [customerGroupLoading, setCustomerGroupLoading] = useState(false);

  const [plantLoading, setPlantLoading] = useState(false);
  const [plantGroupLoading, setplantGroupLoading] = useState(false);

  const { id, id2 } = useParams();
  const customerGroupSelection = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerGroupSelection
  );
  const customerPlantInput = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantInput
  );
  const customerPlantSelection = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantSelection
  );

  const [pickupPlantDropdownData, setPickupPlantDropdownData] = useState([]);
  const [cancelShow, setCancelShow] = useState(false);
  const customerPlantGroupSelection = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantGroupSelection
  );
  const pickupPlantModalHide = () => {
    dispatch(setCustomerPlantSelection(false));
  };

  const fetchCustomer = (string) => {
    setCustomerLoading(true);
    DealerConnectionFlatRateService.fetchCustomerAutoComplete(string, searchCriteria, pageNumber)
      .then((response) => {
        const data = response.data;
        const customerList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setCustomerData(customerList);
      })
      .catch(() => {})
      .finally(() => {
        setCustomerLoading(false);
      });
  };
  const handleCustomerLookupSelection = (customer, type) => {
    dispatch(setCustomerInput(customer.name));
    dispatch(setCustomerFK(customer.customerPK));
    dispatch(setCustomerSelection(false));
    setDealerSelectionType({ data: customer, type });
  };

  const fetchPlantGroupdetailsByDes = (string) => {
    setplantGroupLoading(true);
    DealerConnectionFlatRateService.getCustomerPlantGroupForAuto(string)
      .then((response) => {
        const data = response.data;
        const plantGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        setplantGroupDropdownData(plantGroupList);
      })
      .catch(() => {})
      .finally(() => {
        setplantGroupLoading(false);
      });
  };

  const handleCustomerLookupModalShow = () => {
    dispatch(setCustomerSelection(true));
  };
  const hideCustomerModel = () => {
    dispatch(setCustomerSelection(false));
  };

  const fetchCustomerGroupdetailsByDes = (string) => {
    setCustomerGroupLoading(true);
    DealerConnectionFlatRateService.getCustomerGroupForAuto(string)
      .then((response) => {
        const data = response.data;
        const customerGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));
        setcustomerGroupDropdownData(customerGroupList);
      })
      .catch(() => {})
      .finally(() => {
        setCustomerGroupLoading(false);
      });
  };
  const fetchPickupPlantdetailsByName = (string) => {
    setPlantLoading(true);
    DealerConnectionFlatRateService.getAllPlantsByCustomerAuto(string)
      .then((response) => {
        const data = response.data;
        const plantList = data.content?.map((data) => ({ ...data, name: data.name?.trim() }));
        setPickupPlantDropdownData(plantList);
      })
      .catch(() => {})
      .finally(() => {
        setPlantLoading(false);
      });
  };

  const handlecustomerGroupLookupSelection = (customer, type) => {
    dispatch(setCustomerGroupInput(customer.description));
    dispatch(setCustomerGroupFK(customer.customerGroupPK));
    dispatch(setCustomerGroupSelection(false));
    setDealerSelectionType({ data: customer, type });
  };
  const handleCustomerGroupLookupModalShow = () => {
    dispatch(setCustomerGroupSelection(true));
  };
  const customerGroupModalHide = () => {
    dispatch(setCustomerGroupSelection(false));
  };
  const handleCustomerPlantLookupModalShow = () => {
    dispatch(setCustomerPlantSelection(true));
  };

  const customerPlantGroupModalHide = () => {
    dispatch(setCustomerPlantGroupSelection(false));
  };
  const handlePlantGroupLookupSelection = (customer, type) => {
    dispatch(setCustomerPlantGroupInput(customer.description));
    dispatch(setCustomerPlantGroupFK(customer.customerPlantGroupPK));
    dispatch(setCustomerPlantGroupSelection(false));
    setDealerSelectionType({ data: customer, type });
  };

  const handleCustomerPlantLookupSelection = (plant, type) => {
    dispatch(setCustomerPlantInput(plant.name));
    dispatch(setCustomerPlantFK(plant.customerPlantPK));
    dispatch(setCustomerPlantSelection(false));
    setDealerSelectionType({ data: plant, type });
  };

  const handleCustomerPlantGroupLookupSelection = (plant, type) => {
    dispatch(setCustomerPlantGroupInput(plant.description));
    dispatch(setCustomerPlantGroupFK(plant.customerPlantGroupPK));
    dispatch(setCustomerPlantGroupSelection(false));
    setDealerSelectionType({ data: plant, type });
  };
  const handleCustomerPlantGroupLookupModalShow = () => {
    dispatch(setCustomerPlantGroupSelection(true));
  };

  const buttons = [
    {
      label: "Continue",
      onClick: () => {
        navigate(`/dealer-connection-flatrate-getbyid-new/${id}`, { state: dealerSelectionType });
      },
      disabled: !isAnySelectionMade,
    },

    {
      label: "Cancel",
      onClick: () => setCancelShow(true),
      disabled: false,
    },
  ];

  const handleCancel = () => {
    navigate(`/dealer-connection-flatrate-browse/${id}`);
    setViewDetail(true);
    setCancelShow(false);
  };

  return (
    <QuarterScreenWrapper>
      <Header
        confirmClose
        programName="Dealer Connection Flatrate"
        closeNavigationURL={`/add-dealer-connections/${id}/0`}
      />
      <div className="w-100 p-2">
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100"></div>

            <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="ms-3 mt-5 text-start">
                <Form.Label className=" col-form-label dealer-label m-l-0">Customer</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 mt-5 d-flex">
                <AutoCompleteDropdown
                  className={`${
                    !viewDetail &&
                    ((!customerFK && !customerPlantGroupFK && !customerPlantFK && !customerGroupFK) ||
                      (!customerFK && customerInput))
                      ? "borderRed"
                      : viewDetail || customerPlantFK || customerGroupFK || customerPlantGroupFK
                        ? ""
                        : "borderGreen"
                  }`}
                  arrayList={customerData}
                  searchString={customerInput}
                  handleSearchString={(string) => dispatch(setCustomerInput(string))}
                  fetchDataBySearchString={fetchCustomer}
                  renderItemId={(customer) => customer.customerPK}
                  renderItemField={(customer) => customer.name}
                  onSelect={(customer) => handleCustomerLookupSelection(customer, "Customer")}
                  selectedId={customerFK}
                  loading={customerLoading}
                  disabled={viewDetail || customerPlantFK || customerGroupFK || customerPlantGroupFK}
                  clearInputCallback={() => {
                    dispatch(setCustomerFK(null));
                  }}
                />
                <LookupButton
                  onClick={handleCustomerLookupModalShow}
                  disabled={viewDetail || customerPlantFK || customerGroupFK || customerPlantGroupFK}
                />
              </Col>
            </Form.Group>
            <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="ms-3 mt-4 text-start">
                <Form.Label className=" col-form-label dealer-label m-l-0">Customer Group</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 mt-3 d-flex">
                <AutoCompleteDropdown
                  className={`${
                    !viewDetail &&
                    ((!customerFK && !customerPlantGroupFK && !customerPlantFK && !customerGroupFK) ||
                      (!customerGroupFK && customerGroupInput))
                      ? "borderRed"
                      : viewDetail || customerFK || customerPlantGroupFK || customerPlantFK
                        ? ""
                        : "borderGreen"
                  }`}
                  arrayList={customerGroupDropdownData}
                  searchString={customerGroupInput}
                  renderItemId={(customer) => customer.customerGroupPK}
                  disabled={viewDetail || customerFK || customerPlantGroupFK || customerPlantFK}
                  renderItemField={(customer) => customer.description}
                  handleSearchString={(string) => dispatch(setCustomerGroupInput(string))}
                  fetchDataBySearchString={fetchCustomerGroupdetailsByDes}
                  onSelect={(customer) => handlecustomerGroupLookupSelection(customer, "Customer Groups")}
                  selectedId={customerGroupFK}
                  loading={customerGroupLoading}
                  clearInputCallback={() => {
                    dispatch(setCustomerGroupFK(null));
                  }}
                />
                <LookupButton
                  onClick={handleCustomerGroupLookupModalShow}
                  disabled={viewDetail || customerFK || customerPlantGroupFK || customerPlantFK}
                />
              </Col>
            </Form.Group>

            <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="ms-3 mt-4 text-start">
                <Form.Label className=" col-form-label dealer-label m-l-0">Plant</Form.Label>
              </Col>

              <Col xs={4} md={4} sm={4} className="p-0 mt-3 d-flex">
                <AutoCompleteDropdown
                  className={`${
                    !viewDetail &&
                    ((!customerFK && !customerPlantGroupFK && !customerPlantFK && !customerGroupFK) ||
                      (!customerPlantFK && customerPlantInput))
                      ? "borderRed"
                      : viewDetail || customerFK || customerGroupFK || customerPlantGroupFK
                        ? ""
                        : "borderGreen"
                  }`}
                  arrayList={pickupPlantDropdownData}
                  searchString={customerPlantInput}
                  renderItemId={(plant) => plant.customerPlantPK}
                  renderItemField={(plant) => plant.name}
                  handleSearchString={(string) => dispatch(setCustomerPlantInput(string))}
                  fetchDataBySearchString={fetchPickupPlantdetailsByName}
                  onSelect={(plant) => handleCustomerPlantLookupSelection(plant, "Customer Plant")}
                  selectedId={customerPlantFK}
                  loading={plantLoading}
                  maxHeight="150px"
                  towardsTop
                  clearInputCallback={() => {
                    dispatch(setCustomerPlantFK(null));
                  }}
                  disabled={viewDetail || customerFK || customerGroupFK || customerPlantGroupFK}
                />
                <LookupButton
                  disabled={viewDetail || customerFK || customerGroupFK || customerPlantGroupFK}
                  onClick={handleCustomerPlantLookupModalShow}
                />
              </Col>
            </Form.Group>
            <Form.Group className="m-t-32  m-b-10 align-items-center row  m-l-0 m-r-0">
              <Col sm={2} md={2} xs={2} className="ms-3  mt-4 text-start">
                <Form.Label className=" col-form-label dealer-label m-l-0">Plant Group</Form.Label>
              </Col>
              <Col xs={4} md={4} sm={4} className="p-0 mt-3 d-flex">
                <AutoCompleteDropdown
                  className={`${
                    !viewDetail &&
                    ((!customerFK && !customerPlantGroupFK && !customerPlantFK && !customerGroupFK) ||
                      (!customerPlantGroupFK && customerPlantGroupInput))
                      ? "borderRed"
                      : viewDetail || customerFK || customerGroupFK || customerPlantFK
                        ? ""
                        : "borderGreen"
                  }`}
                  arrayList={plantGroupDropdownData}
                  searchString={customerPlantGroupInput}
                  renderItemId={(plant) => plant.customerPlantGroupPK}
                  disabled={viewDetail || customerFK || customerGroupFK || customerPlantFK}
                  renderItemField={(plant) => plant.description}
                  handleSearchString={(string) => dispatch(setCustomerPlantGroupInput(string))}
                  fetchDataBySearchString={fetchPlantGroupdetailsByDes}
                  onSelect={(plant) =>
                    handleCustomerPlantGroupLookupSelection(plant, "Customer Plant Groups")
                  }
                  selectedId={customerPlantGroupFK}
                  loading={plantGroupLoading}
                  towardsTop
                  maxHeight="100px"
                  clearInputCallback={() => {
                    dispatch(setCustomerPlantGroupFK(null));
                  }}
                />
                <LookupButton
                  onClick={handleCustomerPlantGroupLookupModalShow}
                  disabled={viewDetail || customerFK || customerGroupFK || customerPlantFK}
                />
              </Col>
            </Form.Group>
            <CustomerLookup
              show={customerSelection}
              onHide={hideCustomerModel}
              renderItemId={(customer) => customer.customerPK}
              renderItemField={(customer) => customer.name}
              handleLookupSelection={(customer) => handleCustomerLookupSelection(customer, "Customer")}
              MaintenanceProgram
            />
            <CustomerPlantGroupsLookup
              show={customerPlantGroupSelection}
              onHide={customerPlantGroupModalHide}
              renderItemId={(plant) => plant.customerPlantGroupPK}
              handleLookupSelection={(plant) =>
                handlePlantGroupLookupSelection(plant, "Customer Plant Groups")
              }
              MaintenanceProgram
            />
            <CustomerGroupsLookup
              show={customerGroupSelection}
              onHide={customerGroupModalHide}
              renderItemId={(customer) => customer.customerGroupPK}
              handleLookupSelection={(customer) =>
                handlecustomerGroupLookupSelection(customer, "Customer Groups ")
              }
              MaintenanceProgram
            />
            <CustomerPlantsLookup
              show={customerPlantSelection}
              onHide={pickupPlantModalHide}
              renderItemId={(plant) => plant.customerPlantPK}
              handleLookupSelection={(plant) => handleCustomerPlantLookupSelection(plant, "Customer Plant")}
              MaintenanceProgram
            />
          </div>
        </div>
      </div>
      <CommonFooter buttons={buttons} />
      <ModalComponent
        show={cancelShow}
        onHide={() => setCancelShow(false)}
        title={"Cancel Dealer Connection Flatrate Changes "}
        body={"Please confirm you want to cancel  changes"}
        handleYES={handleCancel}
        handleNO={() => setCancelShow(false)}
      />
    </QuarterScreenWrapper>
  );
};

export default DealerConnectionFlatrateSelection;
