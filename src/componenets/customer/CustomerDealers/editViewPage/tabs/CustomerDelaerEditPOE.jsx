import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";
import AutoCompleteDropdown from "../../../../common/AutoCompleteDropdown";
import LookupButton from "../../../../common/LookupButton";
import BrokerLookup from "../../../../LookupScreens/Broker/BrokerLookup";
import PortOfEntryLookup from "../../../../LookupScreens/PortOfEntry/PortOfEntryLookup";
import { useDispatch, useSelector } from "react-redux";
import CustomerDealersService from "../../../../../services/CustomerDealersService";
import { setCustomerDealer, setValidPOETab } from "../../../../../redux/EditCustomerDealerSlice";
import { useEffect } from "react";
import {
  setLoading,
  setPortOfEntryData,
  setTotalElements,
  setTotalPages,
} from "../../../../../redux/LookupScreens/PortOfEntryLookupSlice";

function CustomerDelaerEditPOE() {
  const dispatch = useDispatch();

  const [integerList, setIntegerList] = useState([]);

  const editDetails = useSelector((state) => state.editcustomerDealers.editDetails);
  const customerDealer = useSelector((state) => state.editcustomerDealers.customerDealerData);
  const newbroker = useSelector((state) => state.editcustomerDealers.broker);
  const isCanadian = useSelector((state) => state.editcustomerDealers.isCanadian);
  const freezePOE = useSelector((state) => state.editcustomerDealers.freezePOE);

  let sortFlag = useSelector((state) => state.portOfEntryLookup.normalSortFlag);
  let sortValue = useSelector((state) => state.portOfEntryLookup.normalSortValue);
  const selectedSearchCriteria = useSelector((state) => state.portOfEntryLookup.selectedSearchCriteria);
  const searchTerms = useSelector((state) => state.portOfEntryLookup.searchTerms);
  const pageNumberPortOfEntryLookup = useSelector(
    (state) => state.portOfEntryLookup.pageNumberPortOfEntryLookup
  );

  const [showBrokerLookup, setShowBrokerLookup] = useState(false);
  const [showPOELookup, setShowPOELookup] = useState(false);
  const [showAPOE1Lookup, setShowAPOE1Lookup] = useState(false);
  const [showAPOEL2ookup, setShowAPOE2Lookup] = useState(false);
  const [showAPOEL3ookup, setShowAPOE3Lookup] = useState(false);
  const [showAPOEL4ookup, setShowAPOE4Lookup] = useState(false);
  const [dropdownLoading, setDropdownLoading] = useState(false);

  const [brokerData, setBrokerData] = useState([]);
  const [pOEData, setPOEData] = useState([]);
  const [aPOE1Data, setAPOE1Data] = useState([]);
  const [aPOE2Data, setAPOE2Data] = useState([]);
  const [aPOE3Data, setAPOE3Data] = useState([]);
  const [aPOE4Data, setAPOE4Data] = useState([]);

  const [brokerName, setBrokerName] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [broker, setBroker] = useState(null);

  const [pOECity, setPOECity] = useState("");
  const [pOEId, setPOEId] = useState("");
  const [pOE, setPOE] = useState(null);

  const [aPOE1City, setAPOE1City] = useState("");
  const [aPOE1Id, setAPOE1Id] = useState("");
  const [aPOE1, setAPOE1] = useState(null);

  const [aPOE2City, setAPOE2City] = useState("");
  const [aPOE2Id, setAPOE2Id] = useState("");
  const [aPOE2, setAPOE2] = useState(null);

  const [aPOE3City, setAPOE3City] = useState("");
  const [aPOE3Id, setAPOE3Id] = useState("");
  const [aPOE3, setAPOE3] = useState(null);

  const [aPOE4City, setAPOE4City] = useState("");
  const [aPOE4Id, setAPOE4Id] = useState("");
  const [aPOE4, setAPOE4] = useState(null);

  const fetchBroker = (string) => {
    setDropdownLoading(true);
    CustomerDealersService.fetchBrokerAutoComplete(string)
      .then((response) => {
        setBrokerData(response?.data?.content);
      })
      .catch(() => {})
      .finally(() => setDropdownLoading(false));
  };

  const fetchPOE = (string, id) => {
    let updatedList = integerList;
    if (id) {
      updatedList = integerList?.filter((number) => number !== id);
    }
    return CustomerDealersService.fetchPOEAutoComplete(string, updatedList);
  };

  const handleBrokerSelection = (broker) => {
    if (broker) {
      setBrokerName(broker.name?.trim());
      setBrokerId(broker.exportBrokerPK);
      setBroker(broker);
      setShowBrokerLookup(false);
    }
  };

  const handlePOESelection = (POE) => {
    if (POE) {
      addElement(POE.poePK);
      setPOECity(POE.usCity?.trim());
      setPOEId(POE.poePK);
      setPOE(POE);
      setShowPOELookup(false);
    }
  };

  const handleAPOE1Selection = (POE) => {
    if (POE) {
      addElement(POE.poePK);
      setAPOE1City(POE.usCity?.trim());
      setAPOE1Id(POE.poePK);
      setAPOE1(POE);
      setShowAPOE1Lookup(false);
    }
  };

  const handleAPOE2Selection = (POE) => {
    if (POE) {
      addElement(POE.poePK);
      setAPOE2City(POE.usCity?.trim());
      setAPOE2Id(POE.poePK);
      setAPOE2(POE);
      setShowAPOE2Lookup(false);
    }
  };

  const handleAPOE3Selection = (POE) => {
    if (POE) {
      addElement(POE.poePK);
      setAPOE3City(POE.usCity?.trim());
      setAPOE3Id(POE.poePK);
      setAPOE3(POE);
      setShowAPOE3Lookup(false);
    }
  };
  const handleAPOE4Selection = (POE) => {
    if (POE) {
      addElement(POE.poePK);
      setAPOE4City(POE.usCity?.trim());
      setAPOE4Id(POE.poePK);
      setAPOE4(POE);
      setShowAPOE4Lookup(false);
    }
  };

  const changeData = () => {
    dispatch(
      setCustomerDealer({
        alternate1POEFK: aPOE1,
        alternate2POEFK: aPOE2,
        alternate3POEFK: aPOE3,
        alternate4POEFK: aPOE4,
        poefk: pOE,
        brokerFK: broker,
      })
    );
  };

  const addElement = (number) => {
    setIntegerList([...integerList, number]);
  };

  const removeElement = (elementToRemove) => {
    const updatedList = integerList?.filter((element) => element !== elementToRemove);
    setIntegerList(updatedList);
  };

  const fetchPOELookup = (currentid) => {
    let updatedList = integerList;
    if (currentid) {
      updatedList = integerList?.filter((number) => number !== currentid);
    }
    CustomerDealersService.fetchPOELookup(
      searchTerms,
      pageNumberPortOfEntryLookup,
      sortFlag,
      sortValue,
      selectedSearchCriteria,
      updatedList
    )
      .then(({ data }) => {
        dispatch(setPortOfEntryData(data?.content));
        dispatch(setTotalElements(data?.totalElements));
        dispatch(setTotalPages(data?.totalPages));
        dispatch(setLoading(false));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    changeData();
  }, [aPOE1Id, aPOE2Id, aPOE3Id, aPOE4Id, pOEId, brokerId]);

  useEffect(() => {
    if (customerDealer && isCanadian) {
      if (customerDealer.brokerFK) {
        setBroker(customerDealer.brokerFK);
        setBrokerId(customerDealer.brokerFK.exportBrokerPK);
        setBrokerName(customerDealer.brokerFK.name?.trim());
      }
      if (customerDealer.poefk) {
        setPOE(customerDealer.poefk);
        setPOECity(customerDealer.poefk.usCity?.trim());
        setPOEId(customerDealer.poefk.poePK);
      }
      if (customerDealer.alternate1POEFK && !freezePOE) {
        setAPOE1(customerDealer.alternate1POEFK);
        setAPOE1City(customerDealer.alternate1POEFK.usCity?.trim());
        setAPOE1Id(customerDealer.alternate1POEFK.poePK);
      }
      if (customerDealer.alternate2POEFK && !freezePOE) {
        setAPOE2(customerDealer.alternate2POEFK);
        setAPOE2City(customerDealer.alternate2POEFK.usCity?.trim());
        setAPOE2Id(customerDealer.alternate2POEFK.poePK);
      }
      if (customerDealer.alternate3POEFK && !freezePOE) {
        setAPOE3(customerDealer.alternate3POEFK);
        setAPOE3City(customerDealer.alternate3POEFK.usCity?.trim());
        setAPOE3Id(customerDealer.alternate3POEFK.poePK);
      }
      if (customerDealer.alternate4POEFK && !freezePOE) {
        setAPOE4(customerDealer.alternate4POEFK);
        setAPOE4City(customerDealer.alternate4POEFK.usCity?.trim());
        setAPOE4Id(customerDealer.alternate4POEFK.poePK);
      }
    } else if (!isCanadian) {
      setBroker();
      setBrokerId();
      setBrokerName();
      setPOE();
      setPOECity();
      setPOEId();
      setAPOE1();
      setAPOE1City();
      setAPOE1Id();
      setAPOE2();
      setAPOE2City();
      setAPOE2Id();
      setAPOE3();
      setAPOE3City();
      setAPOE3Id();
      setAPOE4();
      setAPOE4City();
      setAPOE4Id();
    } else if (newbroker) {
      setBroker(newbroker);
      setBrokerId(newbroker.exportBrokerPK);
      setBrokerName(newbroker.name?.trim());
      setPOE();
      setPOECity();
      setPOEId();
      setAPOE1();
      setAPOE1City();
      setAPOE1Id();
      setAPOE2();
      setAPOE2City();
      setAPOE2Id();
      setAPOE3();
      setAPOE3City();
      setAPOE3Id();
      setAPOE4();
      setAPOE4City();
      setAPOE4Id();
    }
  }, [customerDealer, newbroker, editDetails, isCanadian]);

  useEffect(() => {
    if (!brokerId || !pOEId) {
      dispatch(setValidPOETab(false));
    } else if (
      (!aPOE1Id && aPOE1City) ||
      (!aPOE2Id && aPOE2City) ||
      (!aPOE3Id && aPOE3City) ||
      (!aPOE4Id && aPOE4City)
    ) {
      dispatch(setValidPOETab(false));
    } else {
      dispatch(setValidPOETab(true));
    }
  }, [brokerId, pOEId, aPOE1Id, aPOE2Id, aPOE3Id, aPOE4Id, aPOE1City, aPOE2City, aPOE3City, aPOE4City]);

  useEffect(() => {
    if (isCanadian && !broker && newbroker) {
      setBrokerName(newbroker.name?.trim());
      setBrokerId(newbroker.exportBrokerPK);
      setBroker(newbroker);
      setShowBrokerLookup(false);
    }
  }, [isCanadian, newbroker]);

  return (
    <div className="px-3 py-2">
      <div className="col-6 mt-5">
        <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Broker</Form.Label>
          </Col>
          <Col xs={5} md={5} sm={5} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={brokerData}
              searchString={brokerName}
              renderItemId={(broker) => broker.exportBrokerPK}
              renderItemField={(broker) => broker.name}
              handleSearchString={(string) => {
                setBrokerName(string);
              }}
              fetchDataBySearchString={(string) => {
                fetchBroker(string);
              }}
              loading={dropdownLoading}
              onSelect={(broker) => {
                handleBrokerSelection(broker);
              }}
              clearInputCallback={() => {
                setBrokerId("");
              }}
              className={`customFormControl ${editDetails ? (brokerId ? "borderGreen" : "borderRed") : "borderBlack"}`}
              inputTextIndent="8px"
              disabled={!editDetails}
              selectedId={brokerId}
            />
            <LookupButton
              onClick={() => {
                setShowBrokerLookup(true);
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Port of Entry</Form.Label>
          </Col>
          <Col xs={5} md={5} sm={5} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={pOEData}
              searchString={pOECity}
              renderItemId={(poe) => poe.poePK}
              renderItemField={(poe) => poe.usCity}
              handleSearchString={(string) => {
                setPOECity(string);
              }}
              fetchDataBySearchString={(string) => {
                setDropdownLoading(true);
                fetchPOE(string, pOEId)
                  .then((response) => {
                    setPOEData(response?.data?.content);
                  })
                  .finally(() => setDropdownLoading(false));
              }}
              loading={dropdownLoading}
              onSelect={handlePOESelection}
              selectedId={pOEId}
              clearInputCallback={() => {
                removeElement(pOEId);
                setPOEId("");
              }}
              className={`customFormControl ${editDetails ? (pOEId ? "borderGreen" : "borderRed") : "borderBlack"}`}
              inputTextIndent="8px"
              disabled={!editDetails}
            />
            <LookupButton
              onClick={() => {
                setShowPOELookup(true);
              }}
              disabled={!editDetails}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Alternate Port of Entry #1</Form.Label>
          </Col>
          <Col xs={5} md={5} sm={5} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={aPOE1Data}
              searchString={aPOE1City}
              renderItemId={(poe) => poe.poePK}
              renderItemField={(poe) => poe.usCity}
              handleSearchString={(string) => {
                setAPOE1City(string);
              }}
              fetchDataBySearchString={(string) => {
                setDropdownLoading(true);
                fetchPOE(string, aPOE1Id)
                  .then((response) => {
                    setAPOE1Data(response?.data?.content);
                  })
                  .finally(() => setDropdownLoading(false));
              }}
              loading={dropdownLoading}
              selectedId={aPOE1Id}
              onSelect={handleAPOE1Selection}
              clearInputCallback={() => {
                removeElement(aPOE1Id);
                setAPOE1Id("");
              }}
              className={`customFormControl ${
                editDetails ? (!aPOE1Id && aPOE1City ? "borderRed" : "borderBlack") : "borderBlack"
              }`}
              inputTextIndent="8px"
              disabled={!editDetails || freezePOE}
            />
            <LookupButton
              onClick={() => {
                setShowAPOE1Lookup(true);
              }}
              disabled={!editDetails || freezePOE}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Alternate Port of Entry #2</Form.Label>
          </Col>
          <Col xs={5} md={5} sm={5} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={aPOE2Data}
              searchString={aPOE2City}
              renderItemId={(poe) => poe.poePK}
              renderItemField={(poe) => poe.usCity}
              handleSearchString={(string) => {
                setAPOE2City(string);
              }}
              fetchDataBySearchString={(string) => {
                setDropdownLoading(true);
                fetchPOE(string, aPOE2Id)
                  .then((response) => {
                    setAPOE2Data(response?.data?.content);
                  })
                  .finally(() => setDropdownLoading(false));
              }}
              loading={dropdownLoading}
              onSelect={handleAPOE2Selection}
              selectedId={aPOE2Id}
              clearInputCallback={() => {
                removeElement(aPOE2Id);
                setAPOE2Id("");
              }}
              className={`customFormControl ${
                editDetails ? (!aPOE2Id && aPOE2City ? "borderRed" : "borderBlack") : "borderBlack"
              }`}
              inputTextIndent="8px"
              disabled={!editDetails || freezePOE}
            />

            <LookupButton
              onClick={() => {
                setShowAPOE2Lookup(true);
              }}
              disabled={!editDetails || freezePOE}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Alternate Port of Entry #3</Form.Label>
          </Col>
          <Col xs={5} md={5} sm={5} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={aPOE3Data}
              searchString={aPOE3City}
              renderItemId={(poe) => poe.poePK}
              renderItemField={(poe) => poe.usCity}
              handleSearchString={(string) => {
                setAPOE3City(string);
              }}
              fetchDataBySearchString={(string) => {
                setDropdownLoading(true);
                fetchPOE(string, aPOE3Id)
                  .then((response) => {
                    setAPOE3Data(response?.data?.content);
                  })
                  .finally(() => setDropdownLoading(false));
              }}
              loading={dropdownLoading}
              onSelect={handleAPOE3Selection}
              selectedId={aPOE3Id}
              clearInputCallback={() => {
                removeElement(aPOE3Id);
                setAPOE3Id("");
              }}
              className={`customFormControl ${
                editDetails ? (!aPOE3Id && aPOE3City ? "borderRed" : "borderBlack") : "borderBlack"
              }`}
              inputTextIndent="8px"
              disabled={!editDetails || freezePOE}
            />
            <LookupButton
              onClick={() => {
                setShowAPOE3Lookup(true);
              }}
              disabled={!editDetails || freezePOE}
            />
          </Col>
        </Form.Group>
        <Form.Group className="mt-4  align-items-center row  m-l-0 m-r-0">
          <Col sm={3} md={3} xs={3} className="p-0">
            <Form.Label className="col-form-label ">Alternate Port of Entry #4</Form.Label>
          </Col>
          <Col xs={5} md={5} sm={5} className="p-0 d-flex">
            <AutoCompleteDropdown
              arrayList={aPOE4Data}
              searchString={aPOE4City}
              renderItemId={(poe) => poe.poePK}
              renderItemField={(poe) => poe.usCity}
              handleSearchString={(string) => {
                setAPOE4City(string);
              }}
              fetchDataBySearchString={(string) => {
                setDropdownLoading(true);
                fetchPOE(string, aPOE4Id)
                  .then((response) => {
                    setAPOE4Data(response?.data?.content);
                  })
                  .finally(() => setDropdownLoading(false));
              }}
              loading={dropdownLoading}
              onSelect={handleAPOE4Selection}
              selectedId={aPOE4Id}
              clearInputCallback={() => {
                removeElement(aPOE4Id);
                setAPOE4Id("");
              }}
              className={`customFormControl ${
                editDetails ? (!aPOE4Id && aPOE4City ? "borderRed" : "borderBlack") : "borderBlack"
              }`}
              inputTextIndent="8px"
              disabled={!editDetails || freezePOE}
            />
            <LookupButton
              onClick={() => {
                setShowAPOE4Lookup(true);
              }}
              disabled={!editDetails || freezePOE}
            />
          </Col>
        </Form.Group>
      </div>
      <BrokerLookup
        brokerType="export"
        renderItemId={(broker) => broker.exportBrokerPK}
        show={showBrokerLookup}
        MaintenanceProgram
        onHide={() => {
          setShowBrokerLookup(false);
        }}
        handleLookupSelection={handleBrokerSelection}
      />
      <PortOfEntryLookup
        show={showPOELookup}
        onHide={() => {
          setShowPOELookup(false);
        }}
        renderItemId={(poe) => poe.poePK}
        handleLookupSelection={handlePOESelection}
        brokerType={"export"}
        customFetchFunction={() => fetchPOELookup(pOEId)}
      />
      <PortOfEntryLookup
        show={showAPOE1Lookup}
        onHide={() => {
          setShowAPOE1Lookup(false);
        }}
        handleLookupSelection={handleAPOE1Selection}
        renderItemId={(poe) => poe.poePK}
        brokerType={"export"}
        customFetchFunction={() => fetchPOELookup(aPOE1Id)}
      />
      <PortOfEntryLookup
        show={showAPOEL2ookup}
        onHide={() => {
          setShowAPOE2Lookup(false);
        }}
        handleLookupSelection={handleAPOE2Selection}
        renderItemId={(poe) => poe.poePK}
        brokerType={"export"}
        customFetchFunction={() => fetchPOELookup(aPOE2)}
      />
      <PortOfEntryLookup
        show={showAPOEL3ookup}
        onHide={() => {
          setShowAPOE3Lookup(false);
        }}
        handleLookupSelection={handleAPOE3Selection}
        renderItemId={(poe) => poe.poePK}
        brokerType={"export"}
        customFetchFunction={() => fetchPOELookup(aPOE3)}
      />
      <PortOfEntryLookup
        show={showAPOEL4ookup}
        onHide={() => {
          setShowAPOE4Lookup(false);
        }}
        handleLookupSelection={handleAPOE4Selection}
        renderItemId={(poe) => poe.poePK}
        brokerType={"export"}
        customFetchFunction={() => fetchPOELookup(aPOE4)}
      />
    </div>
  );
}

export default CustomerDelaerEditPOE;
