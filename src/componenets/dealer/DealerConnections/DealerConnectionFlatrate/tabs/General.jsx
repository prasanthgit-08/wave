import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import { useLocation, useParams } from "react-router-dom";
import UnitTypeGroupLookup from "../../../../LookupScreens/UnitTypeGroup/UnitTypeGroupLookup";

import {
  setCustomerUnitTypeGroupId,
  setCustomerUnitTypeGroupInput,
  setCustomerUnitTypeGroupSelection,
  setUnitTypeGroupId,
  setUnitTypeGroupInput,
  setUnitTypeGroupSelection,
} from "../../../../../redux/DealerFlatRateConnectionSlice";
import DealerConnectionFlatRateService from "../../../../../services/DealerConnectionFlatRateService";
import LookupButton from "../../../../common/LookupButton";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LoadingIcon from "../../../../common/LoadingIcon";
import CustomerUnitTypeGroupsService from "../../../../../services/CustomerUnitTypeGroupsService";
import CustomerUnitTypeGroupLookup from "../../../../LookupScreens/CustomerUnitTypeGroup/CustomerUnitTypeGroupLookup";

const General = ({ dealerConnectionFlatratePK, viewDetail, formData, setFormData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const { data, type } = location.state || {};

  const customerUnitTypeGroupInput = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerUnitTypeGroupInput
  );
  const customerUnitTypeGroupId = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerUnitTypeGroupId
  );
  const unitTypeGroupSelection = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.unitTypeGroupSelection
  );

  const [customerUnitTypeGroupdata, setCustomerUnitTypeGroupdata] = useState([]);

  const [unitTypeGroupPKS, setUnitTypeGroupPKS] = useState([]);
  const [unitTypeGroupDropdown, setUnitTypeGroupDropDown] = useState([]);
  const [loading, setLoading] = useState(false);

  const [unitTypeLoading, setUnitTypeLoading] = useState(false);

  const reduxCustomerFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerFK);
  const reduxCustomerGroupFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerGroupFK);
  const reduxCustomerPlantFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerPlantFK);
  const reduxCustomerPlantGroupFK = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantGroupFK
  );
  const [customerUnitTypeGroupLoader, setCustomerUnitTypeGroupLoader] = useState(false);
  const customerFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerFK);
  const customerGroupFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerGroupFK);
  const customerPlantFK = useSelector((state) => state.dealerFlatRateConnectionSReducer.customerPlantFK);
  const customerPlantGroupFK = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerPlantGroupFK
  );
  const customerUnitTypeGroupSelection = useSelector(
    (state) => state.dealerFlatRateConnectionSReducer.customerUnitTypeGroupSelection
  );

  const unitTypeGroupModalHide = () => {
    dispatch(setUnitTypeGroupSelection(false));
  };

  const fetchUnitTypeGroup = (string) => {
    setUnitTypeLoading(true);
    if (unitTypeGroupPKS !== true && unitTypeGroupPKS !== null) {
      DealerConnectionFlatRateService.getUnitTypesGroupForAuto(unitTypeGroupPKS, string)
        .then((response) => {
          const data = response.data;
          const unitTypeGroupList = data.content?.map((data) => ({
            ...data,
            description: data.description?.trim(),
          }));
          setUnitTypeGroupDropDown(unitTypeGroupList);
        })
        .catch((err) => {
          console.error("Error fetching unit types:", err);
        })
        .finally(() => setUnitTypeLoading(false));
    }
  };

  const handleUnitTypeGroupLookupModalShow = () => {
    dispatch(setUnitTypeGroupSelection(true));
  };

  const handleUnitTypeGroupLookupSelection = (unitType) => {
    dispatch(setUnitTypeGroupInput(unitType.description));
    dispatch(setUnitTypeGroupId(unitType.unitTypeGroupPK));
    dispatch(setUnitTypeGroupSelection(false));
  };

  const fetchCustomerUnitTypeGroup = (string) => {
    setCustomerUnitTypeGroupLoader(true);
    CustomerUnitTypeGroupsService.getCustomerUnitTypeGroupForAuto(
      string,
      customerFK,
      customerPlantFK,
      customerPlantGroupFK,
      customerGroupFK
    )
      .then((response) => {
        const data = response.data;
        const customerUnitTypeGroupList = data.content?.map((data) => ({
          ...data,
          description: data.description?.trim(),
        }));

        setCustomerUnitTypeGroupdata(customerUnitTypeGroupList);
        const customerunittypegroupPKs = data.content?.map((item) => item.customerunittypegroupPK);
        setUnitTypeGroupPKS(customerunittypegroupPKs);
      })
      .catch((err) => {})
      .finally(() => {
        setCustomerUnitTypeGroupLoader(false);
      });
  };

  const handlecustomerUnitTypeGroupLookupSelection = (unitType) => {
    dispatch(setCustomerUnitTypeGroupInput(unitType.description));
    dispatch(setCustomerUnitTypeGroupId(unitType.customerunittypegroupPK));
    dispatch(setCustomerUnitTypeGroupSelection(false));
  };

  const handleCustomerUnitTypeGroupLookupModalShow = () => {
    dispatch(setCustomerUnitTypeGroupSelection(true));
  };

  useEffect(() => {
    setLoading(true);
    DealerConnectionFlatRateService.fetchDealerConnectionFlatRate({
      dealerConnectionFlatratePK: dealerConnectionFlatratePK || "",
      dealerConnectionFK: id || "",
      customerFK: reduxCustomerFK || "",
      customerGroupFK: reduxCustomerGroupFK || "",
      customerPlantFK: reduxCustomerPlantFK || "",
      customerPlantGroupFK: reduxCustomerPlantGroupFK || "",

      whichOne: type || formData?.whichOne,
      flag: "",
    })
      .then((res) => {
        if (res?.dealerFlatRateDetails?.length > 0) {
          // EDIT MODE
          const data = res.dealerFlatRateDetails[0];

          setFormData((prev) => ({
            ...prev,
            whichOne: data.WhichOne?.trim() || "",
            dealer1: data.Dealer1 || "",
            dealer2: data.Dealer2 || "",
            description: data.Description?.trim() || "",
            dealerConnectionFK: data.DealerConnectionFK || prev.dealerConnectionFK,
            customerFK: data.CustomerFK ?? prev.customerFK,
            customerGroupFK: data.CustomerGroupFK ?? prev.customerGroupFK,
            customerPlantFK: data.CustomerPlantFK ?? prev.customerPlantFK,
            customerPlantGroupFK: data.CustomerPlantGroupFK ?? prev.customerPlantGroupFK,
            unitTypeGroup: data.unitTypeGroup ?? prev.unitTypeGroup,
            invoiceFlatrateMotorized: data.InvoiceFlatRateMotorized ?? null,
            invoiceFlatrateTowable: data.InvoiceFlatrateTowable ?? null,
            invoiceFlatrateTowableCDLA: data.InvoiceFlatrateTowableCDLA ?? null,
            invoiceFlatrateHaulTow: data.InvoiceFlatRateHaulTow ?? null,
            driverFlatrateTowableCDLA: data.DriverFlatrateTowableCDLA ?? null,
            driverFlatrateTowable: data.DriverFlatrateTowable ?? null,
            driverFlatarteHaulTow: data.DriverFlatarteHaulTow ?? null,
            invoiceFlatRateFlatbed: data.InvoiceFlatRateFlatbed ?? null,
            driverFlatRateFlatbed: data.DriverFlatRateFlatbed ?? null,
            driverFlatrateMotorized: data.DriverFlatRateMotorized ?? null,
            commission: data.Commission ?? null,
            maximumPermits: data.DriverMaxPermitsAmount ?? null,
            TollFlag: data.TollFlag?.trim() || "",
            PermitFlag: data.PermitFlag?.trim() || "",
            WashFlag: data.WashFlag?.trim() || "",
            CommissionFlag: data.CommissionFlag?.trim() || "",
            driverMaxTollsAmount: data.DriverMaxTollsAmount ?? null,
            maximumWash: data.DriverMaxWashAmount ?? null,
          }));

          if (data.UnitTypeGroupDescription) {
            dispatch(setCustomerUnitTypeGroupInput(data.UnitTypeGroupDescription?.trim()));
          }
          if (data.UnitTypeGroup) {
            dispatch(setCustomerUnitTypeGroupId(data.UnitTypeGroup));
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [
    dealerConnectionFlatratePK,
    type,
    reduxCustomerFK,
    reduxCustomerGroupFK,
    reduxCustomerPlantFK,
    reduxCustomerPlantGroupFK,
    data,
  ]);

  const customerunitTypeGroupModalHide = () => {
    dispatch(setCustomerUnitTypeGroupSelection(false));
  };
  return (
    <div className="p-2">
      {loading && <LoadingIcon />}
      <Form.Group className="mt-0 m-b-10 align-items-center row m-l-10 m-r-0 mt-4">
        <Col sm={3} md={3} xs={3} className="p-0">
          <input
            name="label"
            id="label"
            type="text"
            className="customFormControl"
            maxLength={60}
            value={formData?.whichOne || ""}
            autoComplete="off"
            disabled
            style={{ width: "200px" }}
          />
        </Col>
        <Col xs={4} md={4} sm={4} className="p-0 m-l-12">
          <input
            name="label"
            id="label"
            type="text"
            className="customFormControl"
            maxLength={60}
            value={formData?.description || ""}
            autoComplete="off"
            disabled
            style={{ width: "282px" }}
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-0 m-b-10 align-items-center row m-l-10 m-r-0 mt-4">
        <Col sm={3} md={3} xs={3} className="p-0">
          <Form.Label className="col-form-label">Dealer #1</Form.Label>
        </Col>
        <Col xs={4} md={4}>
          <input
            type="text"
            name="dealer1"
            value={formData?.dealer1 || ""}
            className="customFormControl"
            disabled
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-0 m-b-10 align-items-center row m-l-10 m-r-0 mt-4">
        <Col sm={3} md={3} xs={3} className="p-0">
          <Form.Label className="col-form-label">Dealer #2</Form.Label>
        </Col>
        <Col xs={4} md={4}>
          <input
            type="text"
            name="dealer2"
            value={formData?.dealer2 || ""}
            className="customFormControl"
            disabled
          />
        </Col>
      </Form.Group>

      <Form.Group className="mt-0 m-b-10 align-items-center row m-l-10 m-r-0  mt-4">
        <Col sm={3} md={3} xs={3} className="p-0">
          <Form.Label className="col-form-label dealer-label m-l-0">Unit Type Group</Form.Label>
        </Col>
        <Col xs={4} className="d-flex">
          <AutoCompleteDropdown
            className={`customFormControl ${
              !viewDetail && !customerUnitTypeGroupId && customerUnitTypeGroupInput ? "borderRed" : ""
            }`}
            arrayList={customerUnitTypeGroupdata}
            searchString={customerUnitTypeGroupInput}
            renderItemId={(unitType) => unitType.customerunittypegroupPK}
            renderItemField={(unitType) => unitType.description}
            handleSearchString={(string) => dispatch(setCustomerUnitTypeGroupInput(string))}
            fetchDataBySearchString={fetchCustomerUnitTypeGroup}
            onSelect={handlecustomerUnitTypeGroupLookupSelection}
            selectedId={customerUnitTypeGroupId}
            clearInputCallback={() => {
              dispatch(setCustomerUnitTypeGroupId(null));
            }}
            loading={customerUnitTypeGroupLoader}
            disabled={viewDetail}
            maxHeight={"100px"}
          />
          <LookupButton onClick={handleCustomerUnitTypeGroupLookupModalShow} disabled={viewDetail} />
        </Col>
      </Form.Group>
      <CustomerUnitTypeGroupLookup
        show={customerUnitTypeGroupSelection}
        onHide={customerunitTypeGroupModalHide}
        renderItemId={(unitType) => unitType.customerUnitTypeGroupPK}
        handleLookupSelection={handlecustomerUnitTypeGroupLookupSelection}
        supplementalRates
        customerId={customerFK}
        customerPlantId={customerPlantFK}
        customerPlantGroupId={customerPlantGroupFK}
        customerGroupId={customerGroupFK}
      />
    </div>
  );
};

export default General;
