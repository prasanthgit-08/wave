import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../../common/LookupButton";
import { useSelector, useDispatch } from "react-redux";
import OrderEntryService from "../../../../../../services/OrderEntryService";
import BrokerLookup from "../../../../../LookupScreens/Broker/BrokerLookup";
import PortOfEntryLookup from "../../../../../LookupScreens/PortOfEntry/PortOfEntryLookup";
import {
  setIsUnitTabTabColumn2Valid,
  setEditedUnitDataToSaveForUnitTab,
} from "../../../../../../redux/EditMasterExpress/EditMasterExpressTabsSlice";

const UnitTabColumn2 = ({ styles }) => {
  const dispatch = useDispatch();

  const [brokerType, setBrokerType] = useState("");
  const [brokerList, setBrokerList] = useState([]);
  const [brokerInput, setBrokerInput] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [brokerSelection, setBrokerSelection] = useState(false);
  const [portOfEntryList, setPortOfEntryList] = useState([]);
  const [portOfEntryInput, setPortOfEntryInput] = useState("");
  const [portOfEntryId, setPortOfEntryId] = useState("");
  const [portOfEntrySelection, setPortOfEntrySelection] = useState(false);
  const [poeLoading, setPoeLoading] = useState(true);
  const [brokerLoading, setBrokerLoading] = useState(true);
  //States From Redux
  const viewDetail = useSelector((state) => state.editMasterExpress.viewDetail);
  const selectedUnitData = useSelector((state) => state.editMasterExpress.selectedUnitData);
  const isUnitDataLoading = useSelector((state) => state.editMasterExpress.isUnitDataLoading);

  /**
   * Broker selection AutoComplete
   */
  const fetchBrokerByName = (string) => {
    setBrokerLoading(true);
    OrderEntryService.fetchBrokerByName(string, 0, brokerType)
      .then((response) => {
        const data = response.data.content;
        const trimmedList = data?.map((broker) => ({ ...broker, name: broker.name?.trim() }));
        setBrokerList(trimmedList);
      })
      .catch((err) => {})
      .finally(() => {
        setBrokerLoading(false);
      });
  };

  const returnBrokerPK = (broker) => {
    if (brokerType === "export") {
      return broker.exportBrokerPK;
    } else if (brokerType === "import") {
      return broker.importBrokerPK;
    }
  };

  const handleBrokerSelection = (broker) => {
    let brokerPK = returnBrokerPK(broker);
    setBrokerInput(broker.name);
    setBrokerId(brokerPK);
  };

  const handleBrokerLookupModalShow = () => {
    setBrokerSelection(true);
  };

  const hideBrokerModal = () => setBrokerSelection(false);

  const handleBrokerLookupSelection = (broker, event) => {
    setBrokerId(returnBrokerPK(broker));
    setBrokerInput(broker.name?.trim());
    setBrokerSelection(false);
  };

  /**
   * Port Of selection AutoComplete
   */
  const fetchPortOfEntryByName = (string) => {
    setPoeLoading(true);
    OrderEntryService.fetchPortOfEntryByName(string, 0, brokerType)
      .then((response) => {
        const data = response.data.content;
        const trimmedList = data?.map((port) => ({ ...port, usCity: port.usCity?.trim() }));
        setPortOfEntryList(trimmedList);
      })
      .catch((err) => {})
      .finally(() => {
        setPoeLoading(false);
      });
  };

  const handlePortOfEntrySelection = (port) => {
    setPortOfEntryId(port.poePK);
    let city = "";
    if (brokerType === "export") {
      city = port.canadianCity;
    } else if (brokerType === "import") {
      city = port.usCity;
    }
    setPortOfEntryInput(city?.trim());
  };

  const handlePortOfEntryLookupSelection = (port) => {
    setPortOfEntryId(port.poePK);
    let city = "";
    if (brokerType === "export") {
      city = port.canadianCity;
    } else if (brokerType === "import") {
      city = port.usCity;
    }
    setPortOfEntryInput(city?.trim());
    setPortOfEntrySelection(false);
  };

  const hidePortOfEntryModal = () => setPortOfEntrySelection(false);

  useEffect(() => {
    if (selectedUnitData != null) {
      if (selectedUnitData?.editMasterExpressUnitTabDTO?.isPickupDealerCanadian) {
        setBrokerType("import");
        setBrokerInput(selectedUnitData?.editMasterExpressUnitTabDTO?.importBrokerName?.trim());
        setBrokerId(selectedUnitData?.editMasterExpressUnitTabDTO?.importBrokerId);
        setPortOfEntryId(selectedUnitData?.editMasterExpressUnitTabDTO?.portOfEntryId);
        setPortOfEntryInput(selectedUnitData?.editMasterExpressUnitTabDTO?.portOfEntryName?.trim());
      } else if (selectedUnitData?.editMasterExpressUnitTabDTO?.isDeliveryDealerCanadian) {
        setBrokerType("export");
        setBrokerInput(selectedUnitData?.editMasterExpressUnitTabDTO?.exportBrokerName?.trim());
        setBrokerId(selectedUnitData?.editMasterExpressUnitTabDTO?.exportBrokerId);
        setPortOfEntryId(selectedUnitData?.editMasterExpressUnitTabDTO?.portOfEntryId);
        setPortOfEntryInput(selectedUnitData?.editMasterExpressUnitTabDTO?.portOfEntryName?.trim());
      } else if (
        selectedUnitData?.editMasterExpressUnitTabDTO?.isPickupDealerCanadian &&
        selectedUnitData?.editMasterExpressUnitTabDTO?.isDeliveryDealerCanadian
      ) {
        setBrokerType("");
        setBrokerInput("");
        setBrokerId("");
        setPortOfEntryId("");
        setPortOfEntryInput("");
      }
    }
  }, [selectedUnitData, viewDetail]);

  const handlePortOfEntryLookupModalShow = () => {
    setPortOfEntrySelection(true);
  };

  /*** Tab Validation ***/
  useEffect(() => {
    const isPickupCanadian = selectedUnitData?.editMasterExpressUnitTabDTO?.isPickupDealerCanadian;
    const isDeliveryCanadian = selectedUnitData?.editMasterExpressUnitTabDTO?.isDeliveryDealerCanadian;
    if (isPickupCanadian || isDeliveryCanadian) {
      if (brokerId && portOfEntryId) {
        dispatch(setIsUnitTabTabColumn2Valid(true));
      } else {
        dispatch(setIsUnitTabTabColumn2Valid(false));
      }
    } else {
      dispatch(setIsUnitTabTabColumn2Valid(true));
    }
    // eslint-disable-next-line
  }, [brokerId, portOfEntryId, selectedUnitData]);

  /*** Implementation Of Save - Setting edited unit data for save ***/
  const settingEditedUnitDataToSave = () => {
    dispatch(
      setEditedUnitDataToSaveForUnitTab({
        exportBrokerFK: brokerType === "export" ? brokerId : "",
        importBrokerFK: brokerType === "import" ? brokerId : "",
        poeFK: portOfEntryId,
      })
    );
  };

  useEffect(() => {
    settingEditedUnitDataToSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brokerId, portOfEntryId]);

  return (
    <Col xs={4}>
      {/* ********************* */}
      <Form.Group className="mt-4 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Miscellaneous pickup */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`} id="miscellaneousPickup">
            Miscellaneous pickup
          </Form.Label>
        </Col>

        <Col xs={7} md={5} sm={7} className="p-0">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousPickup || false}
            checked={selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousPickup || false}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Pickup Location */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Pickup Location</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerName ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerName ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantName ||
              ""
            }
            disabled
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Pickup Address */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Pickup Address</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerAddress1 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerAddress1 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantAddress1 ||
              ""
            }
            disabled
          />
        </Col>
      </Form.Group>

      {/* ********************* */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerAddress2 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerAddress2 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantAddress2 ||
              ""
            }
            disabled
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Pickup City/State/Zip */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Pickup City/State/ZIP</Form.Label>
        </Col>

        <Col xs={5} md={5} sm={5} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerCity ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerCity ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantCity ||
              ""
            }
          />
        </Col>
        {/* <Col xs={}>
        </Col> */}
        <div className="p-0 w-30px mx-1">
          <input
            className={`customFormControl `}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerStateCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerStateCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantStateCode ||
              ""
            }
          />
        </div>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupDealerPostalCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupMiscDealerPostalCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.pickupCustomerPlantPostalCode ||
              ""
            }
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" />
        </Col>
      </Form.Group>
      <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" />
        </Col>

        {/* ********************* */}
      </Form.Group>

      {/* Miscellaneous Delivery */}
      <Form.Group
        className={`mt-2 form-group  align-items-center row  m-l-0 m-r-0 ms-0
          `}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Miscellaneous Delivery</Form.Label>
        </Col>

        <Col xs={7} md={5} sm={7} className="p-0">
          <input
            type="checkbox"
            className="form-check-input p-0"
            disabled
            value={selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDelivery || false}
            checked={selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDelivery || false}
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Delivery Location */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Delivery Location
          </Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerName ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerName ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantName ||
              ""
            }
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Delivery Address */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}>Delivery Address</Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerAddress1 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerAddress1 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantAddress1 ||
              ""
            }
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerAddress2 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerAddress2 ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantAddress2 ||
              ""
            }
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Pickup City/State/Zip */}
      <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}>
            Delivery City/State/ZIP
          </Form.Label>
        </Col>

        <Col xs={5} md={5} sm={5} className="p-0">
          <input
            className={`customFormControl`}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerCity ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerCity ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantCity ||
              ""
            }
          />
        </Col>
        <div className="p-0 w-30px mx-1">
          <input
            className={`customFormControl `}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerStateCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerStateCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantStateCode ||
              ""
            }
          />
        </div>
        <Col xs={1} md={1} sm={1} className="p-0">
          <input
            className={`customFormControl w-80px`}
            type="text"
            disabled
            value={
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryDealerPostalCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.miscellaneousDeliveryDealerPostalCode ||
              selectedUnitData?.editMasterExpressUnitTabDTO?.deliveryCustomerPlantPostalCode ||
              ""
            }
          />
        </Col>
      </Form.Group>

      {/* ********************* */}

      <Form.Group className="mt-2 align-items-center row invisible m-l-0 m-r-0 ms-0">
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label htmlFor="name" className={`customColFormLabel`}></Form.Label>
        </Col>

        <Col xs={6} md={6} sm={6} className="p-0">
          <input className={`customFormControl`} type="text" autoComplete="off" aria-autocomplete="list" />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Broker */}
      <Form.Group
        className={`mt-3 align-items-center row  m-l-0 m-r-0 ${
          selectedUnitData?.editMasterExpressUnitTabDTO?.isPickupDealerCanadian ||
          selectedUnitData?.editMasterExpressUnitTabDTO?.isDeliveryDealerCanadian
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Broker</Form.Label>
        </Col>
        <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
          {/* Broker Autocomplete */}
          <AutoCompleteDropdown
            arrayList={brokerList}
            searchString={brokerInput}
            renderItemId={(broker) => returnBrokerPK(broker)}
            renderItemField={(broker) => broker.name}
            handleSearchString={(string) => setBrokerInput(string)}
            fetchDataBySearchString={fetchBrokerByName}
            onSelect={handleBrokerSelection}
            selectedId={brokerId}
            loading={brokerLoading}
            clearInputCallback={() => {
              setBrokerId("");
            }}
            className={`${isUnitDataLoading || viewDetail ? "" : brokerId ? "borderGreen" : "borderRed"}`}
            towardsTop
            disabled={viewDetail}
          />
          <LookupButton onClick={handleBrokerLookupModalShow} disabled={viewDetail} />
        </Col>
      </Form.Group>
      {/* ********************* */}

      {/* Port of Entry */}
      <Form.Group
        className={`mt-3 align-items-center row  m-l-0 m-r-0 ${
          selectedUnitData?.editMasterExpressUnitTabDTO?.isPickupDealerCanadian ||
          selectedUnitData?.editMasterExpressUnitTabDTO?.isDeliveryDealerCanadian
            ? ""
            : "hide-elements"
        }`}
      >
        <Col sm={4} md={4} xs={4} className="p-0">
          <Form.Label className={` customColFormLabel`}>Port of Entry</Form.Label>
        </Col>
        <Col xs={7} md={7} sm={7} className={`p-0 ${styles.selectContainer}`}>
          {/* Unit Type Autocomplete */}
          <AutoCompleteDropdown
            arrayList={portOfEntryList}
            searchString={portOfEntryInput}
            renderItemId={(port) => port.poePK}
            renderItemField={(port) => port.usCity}
            loading={poeLoading}
            handleSearchString={(string) => setPortOfEntryInput(string)}
            fetchDataBySearchString={fetchPortOfEntryByName}
            onSelect={handlePortOfEntrySelection}
            selectedId={portOfEntryId}
            clearInputCallback={() => {
              setPortOfEntryId("");
            }}
            className={`${isUnitDataLoading || viewDetail ? "" : portOfEntryId ? "borderGreen" : "borderRed"}`}
            //disabled={freezePOE ? true : false}
            disabled={viewDetail}
            towardsTop
          />
          <LookupButton onClick={handlePortOfEntryLookupModalShow} disabled={viewDetail} />
        </Col>
      </Form.Group>

      {/* ********************* */}

      {/* Broker Lookup Modal */}
      <BrokerLookup
        show={brokerSelection}
        onHide={hideBrokerModal}
        renderItemId={(broker) => {
          returnBrokerPK(broker);
        }}
        handleLookupSelection={handleBrokerLookupSelection}
        OrderEntry
        brokerType={brokerType}
      />

      {/* PortOfEntry Lookup Modal */}
      <PortOfEntryLookup
        show={portOfEntrySelection}
        onHide={hidePortOfEntryModal}
        renderItemId={(poe) => poe.poePK}
        handleLookupSelection={handlePortOfEntryLookupSelection}
      />
    </Col>
  );
};

export default UnitTabColumn2;
