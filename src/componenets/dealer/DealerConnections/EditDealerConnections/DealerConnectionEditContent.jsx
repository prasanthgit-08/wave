import React from "react";
import QuarterScreen from "../../../../styles/QuarterScreen.module.css";
import { Col, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDealerConnectionsPK,
  setDealerOne,
  setDealerTwo,
  setDriverMiles,
  setInvoiceMiles,
  setViewDetail,
  setSearchString,
  setDealerList,
  setDealer1SearchString,
  setDealerOnePK,
  setDealer2SearchString,
  setDealerTwoPK,
  setDealerSelection1,
  setDealerSelection2,
  resetChanges,
  setSaveDisable,
  setIsExisting,
  setdealerConnectionsData,
} from "../../../../redux/DealerConnectionsSearchFilterSlice";
import DealerConnectionsService from "../../../../services/DealerConnectionsService";
import AutoCompleteDropdown from "../../../common/AutoCompleteDropdown";
import { useState } from "react";
import { dealer } from "../../../../redux/DealerSearchFilterSlice";
import LookupButton from "../../../common/LookupButton";
import DealerLookup from "../../../LookupScreens/Dealer/DealerLookup";
import { toast } from "react-hot-toast";
import LoadingIcon from "../../../common/LoadingIcon";

const DealerConnectionEditContent = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const milesRegex = /^[0-9]*$/;

  const connectionPk = params.dealerConnectionPK;
  const pageNumber = params.pagenumber;

  const [dealer1Loader, setDealer1Loader] = useState(false);
  const [dealer2Loader, setDealer2Loader] = useState(false);
  const saveDisable = useSelector((state) => state.dealerConnectionReducer.saveDisable);
  const dealer1searchString = useSelector((state) => state.dealerConnectionReducer.dealer1searchString);
  const dealer2searchString = useSelector((state) => state.dealerConnectionReducer.dealer2searchString);
  const dealerList = useSelector((state) => state.dealerConnectionReducer.dealerList);
  const viewDetail = useSelector((state) => state.dealerConnectionReducer.viewDetail);
  const dealerSelection1 = useSelector((state) => state.dealerConnectionReducer.dealerSelection1);
  const dealerSelection2 = useSelector((state) => state.dealerConnectionReducer.dealerSelection2);
  const invoiceMiles = useSelector((state) => state.dealerConnectionReducer.invoiceMiles);
  const driverMiles = useSelector((state) => state.dealerConnectionReducer.driverMiles);
  const dealer1FK = useSelector((state) => state.dealerConnectionReducer.dealerOnePK);
  const dealer2FK = useSelector((state) => state.dealerConnectionReducer.dealerTwoPK);
  const isExisting = useSelector((state) => state.dealerConnectionReducer.isExisting);
  const dealerConnectionData = useSelector((state) => state.dealerConnectionReducer.dealerconnectionData);

  const [same, setsame] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(false);
  window.addEventListener("popstate", () => {
    dispatch(setIsExisting(false));
    dispatch(resetChanges());
  });
  const fetchDealerConnection = () => {
    setLoading(true);
    DealerConnectionsService.getByID(connectionPk)
      .then((response) => {
        dispatch(setdealerConnectionsData(response.data));
        dispatch(setDealerConnectionsPK(response.data.dealerConnectionPK));
        dispatch(setDealer1SearchString(response.data.dealerName1?.trim()));
        dispatch(setDealer2SearchString(response.data.dealerName2?.trim()));
        dispatch(setDealerOnePK(response.data.dealer1Id));
        dispatch(setDealerTwoPK(response.data.dealer2Id));
        dispatch(setInvoiceMiles(response.data.invoiceMiles));
        dispatch(setDriverMiles(response.data.driverMiles));
        dispatch(setSaveDisable(false));
        dispatch(setIsExisting(false));
      })
      .catch((e) => {
        navigate("/dealer-connections");
      })
      .finally(() => setLoading(false));
  };

  const fetchdealer1byname = (string) => {
    setDealer1Loader(true);
    DealerConnectionsService.getDealerByName(string)
      .then((response) => {
        const data = response.data.content;
        const dealerList1 = data?.map((dealers) => ({
          ...dealers,
          name: dealers.name?.trim(),
        }));
        dispatch(setDealerList(dealerList1));
      })
      .catch(() => {
        toast.error("Something went wrong!!");
      })
      .finally(() => {
        setDealer1Loader(false);
      });
  };

  const fetchdealer2byname = (string) => {
    setDealer2Loader(true);
    DealerConnectionsService.getDealerByName(string)
      .then((response) => {
        const data = response.data.content;
        const dealerList2 = data?.map((dealers) => ({
          ...dealers,
          name: dealers.name?.trim(),
        }));
        dispatch(setDealerList(dealerList2));
      })
      .catch(() => {
        toast.error("Something went wrong!!");
      })
      .finally(() => {
        setDealer2Loader(false);
      });
  };

  const dealer1lookupOnClick = () => {
    dispatch(setDealerSelection1(true));
  };

  const hideDealer1Modal = () => {
    dispatch(setDealerSelection1(false));
  };

  const handlePickupDealer1LookupSelection = (dealer) => {
    dispatch(setDealerOnePK(dealer.dealerPK));
    dispatch(setDealer1SearchString(dealer.name));
    dispatch(setDealerSelection1(false));
  };

  const dealer2lookupOnClick = () => {
    dispatch(setDealerSelection2(true));
  };

  const hideDealer2Modal = () => {
    dispatch(setDealerSelection2(false));
  };

  const handlePickupDealer2LookupSelection = (dealer) => {
    dispatch(setDealerTwoPK(dealer.dealerPK));
    dispatch(setDealer2SearchString(dealer.name));
    dispatch(setDealerSelection2(false));
  };

  useEffect(() => {
    if (
      String(driverMiles).match(/^[0-9]*$/) &&
      String(invoiceMiles).match(/^[0-9]*$/) &&
      driverMiles >= 1 &&
      invoiceMiles >= 1
    ) {
      if (!viewDetail) {
        dispatch(setSaveDisable(false));
      }
    } else {
      dispatch(setSaveDisable(true));
    }
  }, [driverMiles, invoiceMiles]);

  useEffect(() => {
    if (!viewDetail && dealer1FK && dealer2FK) {
      DealerConnectionsService.isUnique(dealer1FK, dealer2FK).then((response) => {
        dispatch(setIsExisting(!response.data));

        if (dealerConnectionData !== null) {
          if (dealer1FK === dealerConnectionData.dealer1Id && dealer2FK === dealerConnectionData.dealer2Id) {
            dispatch(setIsExisting(false));
            setsame(true);
          }
          if (dealer2FK === dealerConnectionData.dealer1Id && dealer1FK === dealerConnectionData.dealer2Id) {
            dispatch(setIsExisting(false));
            setsame(true);
          }
        }
      });
    }
  }, [dealer1FK, dealer2FK]);

  useEffect(() => {
    if (window.location.pathname === "/add-dealer-connections/" + connectionPk + "/" + pageNumber) {
      fetchDealerConnection(connectionPk);
      dispatch(setViewDetail(true));
    } else {
      dispatch(resetChanges());
      dispatch(setViewDetail(false));
      setsame(false);
    }
    if (driverMiles === 0 || driverMiles === "") {
      setInitial(true);
    }
  }, []);

  return (
    <Form>
      <div className="w-100 p-2">
        {loading && <LoadingIcon />}
        <div className="shadow-sm rounded border quarterScreenFormContentHeight">
          <div className="m-b-10">
            <div className="p-15 w-100">
              <Row className="m-0 p-10">
                <Col sm={12} md={12} lg={12} xl={12} xs={12}>
                  <br />
                  <br />
                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className={QuarterScreen.colFormLabel}>Dealer #1</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 d-flex" style={{ minWidth: "300px" }}>
                      <AutoCompleteDropdown
                        arrayList={dealerList}
                        searchString={dealer1searchString}
                        renderItemId={(dealer) => dealer.dealerPK}
                        renderItemField={(dealer) => dealer.name}
                        handleSearchString={(string) => dispatch(setDealer1SearchString(string))}
                        fetchDataBySearchString={fetchdealer1byname}
                        onSelect={(dealer) => {
                          dispatch(setDealer1SearchString(dealer.name));
                          dispatch(setDealerOnePK(dealer.dealerPK));
                        }}
                        selectedId={dealer1FK}
                        clearInputCallback={() => {
                          dispatch(setDealerOnePK(""));
                          dispatch(setIsExisting(false));
                        }}
                        className={`${
                          viewDetail === true || connectionPk
                            ? "borderBlack"
                            : dealer1FK && !isExisting
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={connectionPk}
                        loading={dealer1Loader}
                      />

                      <LookupButton disabled={connectionPk} onClick={dealer1lookupOnClick} />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className={QuarterScreen.colFormLabel}>Dealer #2</Form.Label>
                    </Col>
                    <Col xs={2} md={2} sm={2} className="p-0 d-flex" style={{ minWidth: "300px" }}>
                      <AutoCompleteDropdown
                        arrayList={dealerList}
                        searchString={dealer2searchString}
                        renderItemId={(dealer) => dealer.dealerPK}
                        renderItemField={(dealer) => dealer.name}
                        handleSearchString={(string) => dispatch(setDealer2SearchString(string))}
                        fetchDataBySearchString={fetchdealer2byname}
                        onSelect={(dealer) => {
                          dispatch(setDealer2SearchString(dealer.name));
                          dispatch(setDealerTwoPK(dealer.dealerPK));
                        }}
                        // selectedId={dealer2FK}
                        selectedId={dealer2FK}
                        clearInputCallback={() => {
                          dispatch(setIsExisting(false));
                          dispatch(setDealerTwoPK(""));
                        }}
                        className={`${
                          viewDetail === true || connectionPk
                            ? "borderBlack"
                            : dealer2FK && !isExisting
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        disabled={connectionPk}
                        loading={dealer2Loader}
                      />
                      <LookupButton disabled={connectionPk} onClick={dealer2lookupOnClick} />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className={QuarterScreen.colFormLabel}>Invoice miles</Form.Label>
                    </Col>
                    <Col xs={1} md={1} className="p-0" style={{ width: "80px" }}>
                      <input
                        name="InvoiceMiles"
                        type="text"
                        value={invoiceMiles}
                        disabled={viewDetail}

                        onChange={(e) => {
                          const temp = e.target.value;
                          if (String(temp).match(/^[0-9]*$/)) {
                            if (driverMiles === "" || driverMiles === "0" || driverMiles === 0) {
                              setInitial(true);
                            }
                            dispatch(setInvoiceMiles(e.target.value));
                            if (initial) {
                              if (temp > driverMiles) {
                                dispatch(setDriverMiles(e.target.value));
                              } else {
                                setInitial(false);
                              }
                            }
                          }
                        }}
                        className={`${QuarterScreen.formControl} ${
                          viewDetail === true
                            ? "borderBlack"
                            : String(invoiceMiles).match(/^[0-9]*$/) && invoiceMiles >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        maxLength={9}
                        id="dealer1"
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group className="form-group m-t-5 form-group m-t-5 m-b-15 align-items-center row m-l-0 m-r-0">
                    <Col sm={2} md={2} xs={2} className="p-0">
                      <Form.Label className={QuarterScreen.colFormLabel}>Driver miles</Form.Label>
                    </Col>
                    <Col xs={1} md={1} className="p-0" style={{ width: "80px" }}>
                      <input
                        name="DriverMiles"
                        type="text"
                        value={driverMiles}
                        disabled={viewDetail}
                        onChange={(e) => {
                          setInitial(false);
                          const temp = e.target.value;
                          if (String(temp).match(/^[0-9]*$/)) {
                            dispatch(setDriverMiles(e.target.value));
                          }
                          if (temp === "" || temp === 0 || temp === "0") {
                            setInitial(true);
                          }
                        }}
                        className={`${QuarterScreen.formControl} ${
                          viewDetail === true
                            ? "borderBlack"
                            : String(driverMiles).match(/^[0-9]*$/) && driverMiles >= 1
                              ? "borderGreen"
                              : "borderRed"
                        }`}
                        maxLength={9}
                        id="dealer1"
                        autoComplete="off"
                        aria-autocomplete="list"
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <DealerLookup
                show={dealerSelection1}
                onHide={hideDealer1Modal}
                renderItemId={(dealer) => dealer.dealerPK}
                handleLookupSelection={handlePickupDealer1LookupSelection}
                MaintenanceProgram
              />
              <DealerLookup
                show={dealerSelection2}
                onHide={hideDealer2Modal}
                renderItemId={(dealer) => dealer.dealerPK}
                handleLookupSelection={handlePickupDealer2LookupSelection}
                MaintenanceProgram
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default DealerConnectionEditContent;
