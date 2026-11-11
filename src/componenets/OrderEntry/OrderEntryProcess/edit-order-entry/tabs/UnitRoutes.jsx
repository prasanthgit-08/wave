import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { Col, Form, Modal, Row, Button } from "react-bootstrap";
import ButtonComponent from "../../../../common/Button";
import { t } from "i18next";
import * as yup from "yup";
import PostalCode from "../../../../common/PostalCode";
import OrderEntryService from "../../../../../services/OrderEntryService";

import { useDispatch, useSelector } from "react-redux";

import {
  setUnitRoutesArray,
  resetUnitRoutesArray,
  updateUniteRoutesArray,
  setPickUpInUnitRouteArray,
  setDeliveryInUnitRouteArray,
  updateCustomerDealerRoutes,
  setInvoiceMiles,
  setDriverMiles,
  setDefaultInvoiceMiles,
  setDefaultDriverMiles,
  setPcMilerError,
} from "../../../../../redux/OrderEntryFilterSlice";
import PcMilerService from "../../../../../services/PcMilerService";
import LoadingIcon from "../../../../common/LoadingIcon";

function UnitRoutes({ styles }) {
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [statecode, setStateCode] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [canadian, setCanadian] = useState(false);

  const selectedPickupDealer = useSelector((state) => state.orderEntryReducer.selectedPickupDealer);
  const selectedDeliveryDealer = useSelector((state) => state.orderEntryReducer.selectedDeliveryDealer);
  const unitRoutesFrmRedux = useSelector((state) => state.orderEntryReducer.unitRouteArray);
  const pickupAtPlant = useSelector((state) => state.orderEntryReducer.pickupAtPlant);
  const deliverToPlant = useSelector((state) => state.orderEntryReducer.deliverToPlant);
  const miscellaneousDelivery = useSelector((state) => state.orderEntryReducer.miscellaneousDelivery);
  const reload = useSelector((state) => state.orderEntryReducer.reload);

  const dataResetFlag = useSelector((state) => state.orderEntryReducer.dataReset);
  const pickupCustomerPlantId = useSelector((state) => state.orderEntryReducer.pickupCustomerPlantId);
  const deliveryCustomerPlantId = useSelector((state) => state.orderEntryReducer.deliveryCustomerPlantId);
  const deliveryDealersFK = useSelector((state) => state.orderEntryReducer.deliveryDealersFK);
  const pickupDealersFK = useSelector((state) => state.orderEntryReducer.pickupDealersFK);
  const brokerType = useSelector((state) => state.orderEntryReducer.brokerType);
  const selectedPortOfEntry = useSelector((state) => state.orderEntryReducer.selectedPortOfEntry);
  const unitTypeFK = useSelector((state) => state.orderEntryReducer.unitTypesFK);
  const invoiceMiles = useSelector((state) => state.orderEntryReducer.invoiceMiles);
  const pcMilerError = useSelector((state) => state.orderEntryReducer.pcMilerError);
  const invoiceMilesAdjustment = useSelector((state) => state.orderEntryReducer.invoiceMilesAdjustment);
  const driverMilesAdjustment = useSelector((state) => state.orderEntryReducer.driverMilesAdjustment);
  const isDefaultDriverMiles = useSelector((state) => state.orderEntryReducer.isDefaultDriverMilesRedux);
  const isDefaultInvoiceMiles = useSelector((state) => state.orderEntryReducer.isDefaultInvoiceMilesRedux);

  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState("");
  const [id, setId] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [poeSet, isPoeSet] = useState(false); //this is used, when we first select POE and then remove it.
  const [portOfEntry, setPortOfEntry] = useState(false);
  const [isDeliveryAdded, setDeliveryAdded] = useState(false);
  const [isPickupAdded, setPickupAdded] = useState(false);
  const [showPCMilerModal, setShowPCMilerModal] = useState(false);
  const [showPCMilerErrorModal, setShowPCMilerErrorModal] = useState(false);

  const [moveUp, setEnableMoveUp] = useState(false);
  const [moveDown, setEnableMoveDown] = useState(false);

  //if customerid  is changed / hasdriveby in unit  is toggled, drive by has to be cleared
  const customerId = useSelector((state) => state.orderEntryReducer.selectedCustomerId);
  const unitDriveByArray = useSelector((state) => state.orderEntryReducer.drivebyArray);

  const moveDownUniteRoutesArray = () => {
    // copy existing state
    const newState = [...unitRoutesFrmRedux];
    let index = selectedIndex;

    if (selectedPortOfEntry != null && selectedPortOfEntry !== undefined) {
      let poeIndex = unitRoutesFrmRedux.findIndex((routes) => routes.name === "POE");

      if (index === 0 || index === unitRoutesFrmRedux.length - 1 || index === poeIndex) {
        setEnableMoveUp(false);
        setEnableMoveDown(false);
      } else if (index < poeIndex && index + 1 < poeIndex) {
        [newState[index], newState[index + 1]] = [newState[index + 1], newState[index]];
        setSelectedIndex(selectedIndex + 1);

        dispatch(setUnitRoutesArray(newState));
        enableDisableUpDownButtons(index + 1, poeIndex);
      } else if (index < poeIndex && index + 1 === poeIndex) {
        setEnableMoveUp(false);
        setEnableMoveDown(false);
      } else if (index > poeIndex && index + 1 === unitRoutesFrmRedux.length - 1) {
        setEnableMoveUp(false);
        setEnableMoveDown(false);
      } else if (index > poeIndex && index + 1 < unitRoutesFrmRedux.length - 1) {
        [newState[index], newState[index + 1]] = [newState[index + 1], newState[index]];
        setSelectedIndex(selectedIndex + 1);

        dispatch(setUnitRoutesArray(newState));
        enableDisableUpDownButtons(index + 1, unitRoutesFrmRedux.length - 1);
      }
    } else {
      // swap values at found index and index + 1
      [newState[index], newState[index + 1]] = [newState[index + 1], newState[index]];
      setSelectedIndex(selectedIndex + 1);
      dispatch(setUnitRoutesArray(newState));
      enableDisableUpDownButtons(index + 1, unitRoutesFrmRedux.length - 1);
    }
  };
  const moveUpUniteRoutesArray = () => {
    // copy existing state
    const newState = [...unitRoutesFrmRedux];
    let index = selectedIndex;

    if (selectedPortOfEntry !== null && selectedPortOfEntry !== undefined) {
      let poeIndex = unitRoutesFrmRedux.findIndex((routes) => routes.name === "POE");

      if (index === 0 || index === unitRoutesFrmRedux.length - 1 || index === poeIndex) {
        setEnableMoveUp(false);
        setEnableMoveDown(false);
      } else if (index < poeIndex && index - 1 > 0) {
        [newState[index], newState[index - 1]] = [newState[index - 1], newState[index]];
        setSelectedIndex(selectedIndex - 1);

        dispatch(setUnitRoutesArray(newState));
        enableDisableUpDownButtons(index - 1, poeIndex);
      } else if (index < poeIndex && index - 1 === 0) {
        setEnableMoveUp(false);
        setEnableMoveDown(false);
      } else if (index > poeIndex && index - 1 === poeIndex) {
        setEnableMoveUp(false);
        setEnableMoveDown(false);
      } else if (index > poeIndex && index - 1 > poeIndex) {
        const newState = [...unitRoutesFrmRedux];
        let val = index - 1;

        let temp = newState[index - 1];
        newState[index - 1] = newState[index];
        newState[index] = temp;
        setSelectedIndex(selectedIndex - 1);

        dispatch(setUnitRoutesArray(newState));
        enableDisableUpDownButtons(index - 1, unitRoutesFrmRedux.length - 1);
      }
    } else {
      // copy existing state
      // swap values at found index and index - 1
      [newState[index], newState[index - 1]] = [newState[index - 1], newState[index]];
      setSelectedIndex(selectedIndex - 1);
      dispatch(setUnitRoutesArray(newState));
      enableDisableUpDownButtons(index - 1, unitRoutesFrmRedux.length - 1);
    }
  };

  const enableDisableUpDownButtons = (i, totalSize) => {
    if (i === 0 || i === totalSize) {
      setEnableMoveUp(false);
      setEnableMoveDown(false);
    } else if (i < totalSize) {
      let poeIndex = unitRoutesFrmRedux.findIndex((routes) => routes.name === "POE");

      if (selectedPortOfEntry !== null && selectedPortOfEntry !== undefined && i === poeIndex) {
        setEnableMoveUp(false);
        setEnableMoveDown(false);
      } else if (i == 1) {
        setEnableMoveUp(false);
        if (i + 1 === totalSize || i + 1 === poeIndex) {
          setEnableMoveDown(false);
        } else {
          setEnableMoveDown(true);
        }
      } else if (i + 1 === totalSize || i + 1 === poeIndex) {
        setEnableMoveDown(false);
        if (i - 1 === poeIndex) setEnableMoveUp(false);
        else {
          setEnableMoveUp(true);
        }
      } else {
        if (i - 1 === poeIndex) setEnableMoveUp(false);
        else {
          setEnableMoveUp(true);
        }

        setEnableMoveDown(true);
      }
    } else {
    }
  };
  const clearForm = () => {
    setName("");
    setAddress1("");
    setAddress2("");

    setCity("");
    setStateCode("");
    setPostalCode("");

    setSelectedId("");
    setSelectedIndex("");
    setChangeColor(false);

    setEnableMoveUp(false);
    setEnableMoveDown(false);

    isPoeSet(false);

    setShowPCMilerErrorModal(false);
    dispatch(setPcMilerError(""));
  };

  const renderMainData =
    unitRoutesFrmRedux === null || unitRoutesFrmRedux === undefined
      ? []
      : unitRoutesFrmRedux.map((i, index) => {
          return i !== null && i !== undefined ? (
            <tr
              key={i.id}
              onClick={() => {
                clearForm();
                setSelectedId(i.id);
                setSelectedIndex(index);
                setChangeColor(true);
                enableDisableUpDownButtons(index, unitRoutesFrmRedux.length - 1);

                setEditFormData(i);
              }}

              className={i.id === selectedId && changeColor ? "tableSelected" : ""}
            >
              <td>{i.name}</td>
              <td>{i.city}</td>
              <td>{i.stateCode}</td>
            </tr>
          ) : (
            ""
          );
        });

  //from browse page to rightside
  const setEditFormData = (i) => {
    if (i !== null || i !== undefined) {
      setName(i.name);
      setAddress1(i.address1);
      setAddress2(i.address2);

      setCity(i.city);
      setPostalCode(i.postalCode ? i.postalCode?.trim() : i.postalCode);
      setStateCode(i.stateCode);
      setCanadian(i.canadian);
    }
  };

  useEffect(() => {
    if (!pickupAtPlant) {
      setPickupAdded(false);
    }
    if (!deliverToPlant) {
      setDeliveryAdded(false);
    }
    dispatch(resetUnitRoutesArray());
    clearForm();
  }, [customerId, dataResetFlag]);

  const getCustomerDealerRoutes = () => {
    let routes = [...unitRoutesFrmRedux];

    if (selectedDeliveryDealer != null && selectedPickupDealer != null) {
      var deliveryDealer = selectedDeliveryDealer.dealerPK;
      var pickupDealer = null; //selectedPickupDealer.dealerPK;
      //customerDealer table should be checked for plant to regular dealer .
      //delivery plant should not be selected, reload should not be set,misc pick up should not be set.

      if (
        pickupAtPlant &&
        pickupCustomerPlantId !== null &&
        pickupCustomerPlantId !== undefined &&
        !deliverToPlant &&
        !miscellaneousDelivery
      ) {
        pickupDealer = pickupCustomerPlantId;
        OrderEntryService.getCustomerDealerRoutesData(deliveryDealer, customerId, pickupDealer).then(
          (res) => {
            const data = res.data;

            dispatch(updateCustomerDealerRoutes(data));
          }
        );
      }
    }
  };

  function isCanandian(zipCode) {
    if (zipCode != null && zipCode.match(/^((\d{5}-\d{4})|(\d{5}))$/)) {
      return false;
    } else if (zipCode != null && zipCode.match(/^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/)) {
      return true;
    } else {
    }
  }
  useEffect(() => {
    clearForm();
  }, [unitDriveByArray]);

  useEffect(() => {
    let newUnitRoutes = [];

    //for export, US cities should come first and ,POE  and then Canadian Cities
    //For import ,Cananadian cities should come first , POE and then US cities
    //First element should be pick up & last element should be delivery

    let POEcity = null;
    let stateCode = null;
    if (selectedPortOfEntry !== null && selectedPortOfEntry !== undefined) {
      //as per Tom , we need to show only US cities as the users are more familiar with that
      POEcity = selectedPortOfEntry.usCity;
      stateCode = selectedPortOfEntry.stateCode;
    }

    let poeAlreadyPresent = unitRoutesFrmRedux.some((routes) => routes.id.toString().startsWith("POE"));

    if (selectedPortOfEntry === null || selectedPortOfEntry === undefined) {
      //removed POE

      newUnitRoutes = unitRoutesFrmRedux.filter((routes) => !routes.id.toString().startsWith("POE"));

      dispatch(setUnitRoutesArray(newUnitRoutes));

      if (poeSet)
        //POE was set , but removed now.
        isPoeSet(false);
    } else if (selectedPortOfEntry !== null && selectedPortOfEntry !== undefined && !poeAlreadyPresent) {
      //POE added for the first time
      clearForm();

      newUnitRoutes = [];
      newUnitRoutes[0] = unitRoutesFrmRedux[0];
      let i = 0;
      let j = 1;
      unitRoutesFrmRedux.forEach((routes) => {
        if (
          i !== 0 &&
          i < unitRoutesFrmRedux.length - 1 &&
          ((brokerType === "export" && !(isCanandian(routes.postalCode) || routes.canadian)) ||
            (brokerType === "import" && (isCanandian(routes.postalCode) || routes.canadian)))
        ) {
          newUnitRoutes.splice(j, 0, routes);
          j++;
        }
        i++;
      });

      newUnitRoutes.splice(j, 0, {
        id: "POE",
        name: "POE",
        postalCode: postalCode ? "postalCode" : "",
        city: POEcity ? POEcity : "",
        stateCode: stateCode ? stateCode : "",
        address1: "",
        address2: "",
        poeFK: selectedPortOfEntry.poePK,
      });
      let afterPOE = newUnitRoutes.length;
      i = 0;
      unitRoutesFrmRedux.forEach((routes) => {
        if (
          i !== 0 &&
          ((brokerType === "export" && (routes.canadian || isCanandian(routes.postalCode))) ||
            (brokerType === "import" && !(routes.canadian || isCanandian(routes.postalCode))))
        ) {
          newUnitRoutes.splice(afterPOE, 0, routes);
          afterPOE++;
        }
        i++;
      });

      isPoeSet(true);
      dispatch(setUnitRoutesArray(newUnitRoutes));
    } else if (selectedPortOfEntry !== null && selectedPortOfEntry !== undefined && poeAlreadyPresent) {
      //changed POE

      newUnitRoutes = [...unitRoutesFrmRedux];
      let i = 0;
      unitRoutesFrmRedux.forEach((routes) => {
        if (routes.id.toString().startsWith("POE")) {
          newUnitRoutes.splice(i, 1, {
            id: "POE changed",
            name: "POE",
            postalCode: postalCode ? "postalCode" : "",
            city: POEcity ? POEcity : "",
            stateCode: stateCode ? stateCode : "",
            address1: "",
            address2: "",
            poeFK: selectedPortOfEntry.poePK,
          });
        }
        i++;
      });
      dispatch(setUnitRoutesArray(newUnitRoutes));
      isPoeSet(true);
    } else {
    }
  }, [selectedPortOfEntry]);

  useEffect(() => {
    if (
      unitTypeFK !== "" &&
      (unitRoutesFrmRedux === null || unitRoutesFrmRedux === undefined || unitRoutesFrmRedux.length === 0)
    ) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [unitRoutesFrmRedux]);

  useEffect(() => {
    clearForm();
    if (selectedDeliveryDealer != null && selectedDeliveryDealer !== undefined) {
      //get records from CustomerDealer routes ()
      getCustomerDealerRoutes();

      if (isDeliveryAdded) {
        //Delivery location is already added.Record in the last position is replaced
        setId(id + 1);
        dispatch(
          setDeliveryInUnitRouteArray({
            id: id,
            name: selectedDeliveryDealer.name,
            address1: selectedDeliveryDealer.address1,
            address2: selectedDeliveryDealer.address2,
            city: selectedDeliveryDealer.city?.trim(),
            canadian: selectedDeliveryDealer.canadian,
            postalCode: selectedDeliveryDealer.postalCode?.trim(),
            stateCode: selectedDeliveryDealer.stateCode?.trim(),
            dealerFK: selectedDeliveryDealer.dealerPK,
            customerPlantFK: deliveryCustomerPlantId,
          })
        );
      } else {
        //delivery not added

        let pos = 0;
        if (unitRoutesFrmRedux === null || unitRoutesFrmRedux === undefined) {
          pos = 0;
        } else {
          pos = unitRoutesFrmRedux.length;
        }
        let routes = [...unitRoutesFrmRedux];

        setId(id + 1);
        dispatch(
          updateUniteRoutesArray({
            id: id,
            name: selectedDeliveryDealer.name,
            address1: selectedDeliveryDealer.address1,
            address2: selectedDeliveryDealer.address2,
            city: selectedDeliveryDealer.city?.trim(),
            canadian: selectedDeliveryDealer.canadian,
            postalCode: selectedDeliveryDealer.postalCode?.trim(),
            stateCode: selectedDeliveryDealer.stateCode?.trim(),
            dealerFK: selectedDeliveryDealer.dealerPK,
            customerPlantFK: deliveryCustomerPlantId,
          })
        );
        setDeliveryAdded(true);
      }
    }
    //remove delivery dealer is removed from Unit tab
    if (
      selectedDeliveryDealer === null &&
      unitRoutesFrmRedux !== null &&
      unitRoutesFrmRedux !== undefined &&
      unitRoutesFrmRedux.length > 0 &&
      isDeliveryAdded
    ) {
      let routes = [...unitRoutesFrmRedux];

      routes.splice(unitRoutesFrmRedux.length - 1, 1); //remove delivery dealer
      routes = routes.filter((unitRoute) => !unitRoute.id.toString().startsWith("routes")); //remove customer dealer routes
      routes = routes.filter((unitRoute) => !unitRoute.id.toString().startsWith("POE")); //remove POE
      dispatch(setUnitRoutesArray(routes));
      setDeliveryAdded(false);
    }
  }, [selectedDeliveryDealer]);

  useEffect(() => {
    clearForm();
    if (selectedPickupDealer != null && selectedPickupDealer !== undefined) {
      if (isPickupAdded) {
        //pick up is already added.Record in the 0th position is replaced
        setId(id + 1);

        dispatch(
          setPickUpInUnitRouteArray({
            id: id,
            name: selectedPickupDealer.name,
            address1: selectedPickupDealer.address1,
            address2: selectedPickupDealer.address2,
            city: selectedPickupDealer.city?.trim(),
            canadian: selectedPickupDealer.canadian,
            postalCode: selectedPickupDealer.postalCode,
            stateCode: selectedPickupDealer.stateCode?.trim(),
            dealerFK: pickupDealersFK,
            customerPlantFK: pickupCustomerPlantId,
          })
        );
      } else {
        //PickupDealer is not added
        let routes = [...unitRoutesFrmRedux];
        setId(id + 1);
        routes.splice(0, 0, {
          id: id,
          name: selectedPickupDealer.name,
          address1: selectedPickupDealer.address1,
          address2: selectedPickupDealer.address2,
          city: selectedPickupDealer.city?.trim(),
          canadian: selectedPickupDealer.canadian,
          postalCode: selectedPickupDealer.postalCode,
          stateCode: selectedPickupDealer.stateCode?.trim(),
          dealerFK: pickupDealersFK,
          customerPlantFK: pickupCustomerPlantId,
        });
        setPickupAdded(true);
        dispatch(setUnitRoutesArray(routes));
      }
      getCustomerDealerRoutes();
    }
    if (
      selectedPickupDealer === null &&
      unitRoutesFrmRedux !== null &&
      unitRoutesFrmRedux !== undefined &&
      unitRoutesFrmRedux.length > 0 &&
      isPickupAdded
    ) {
      let routes = [...unitRoutesFrmRedux];

      routes.splice(0, 1);
      routes = routes.filter((unitRoute) => !unitRoute.id.toString().startsWith("routes")); //remove routes related data
      routes = routes.filter((unitRoute) => !unitRoute.id.toString().startsWith("POE")); //remove POE related data

      dispatch(setUnitRoutesArray(routes));
      setPickupAdded(false);
    }
    getCustomerDealerRoutes();
  }, [selectedPickupDealer]);

  const HandleOptize = () => {
    setLoader1(true);
    PcMilerService.OptimiseRoute(unitRoutesFrmRedux)
      .then((res) => {
        setLoader1(false);
        if (res != null && res.data !== "") {
          let optimizedList = res.data;
          let data = optimizedList.pop();

          let distance = data.miles ? Math.round(data.miles) : 0;
          if (Number(data?.miles) > 0) {
            addMilesWithMilesAdjustment(Math.round(data.miles));
          }
          if (data.miles) {
            dispatch(setUnitRoutesArray(optimizedList));
            setShowPCMilerErrorModal(false);
          }
          dispatch(setPcMilerError(""));
        }
      })
      .catch((err) => {
        setShowPCMilerErrorModal(true);
        dispatch(setPcMilerError("PC Miler is not available"));
        setLoader1(false);
        console.log(err);
      });
  };

  const calculateTripDistance = () => {
    setLoader(true);
    PcMilerService.calculateTripDistance(unitRoutesFrmRedux)
      .then((res) => {
        setLoader(false);
        if (res != null && res.data !== "") {
          const data = res.data;
          let distance = data.distance ? Math.round(data.distance) : 0;
          addMilesWithMilesAdjustment(distance);
          setShowPCMilerErrorModal(false);
          dispatch(setPcMilerError(""));
        }
      })
      .catch((err) => {
        setShowPCMilerErrorModal(true);
        dispatch(setPcMilerError("PC Miler is not available"));
        setLoader(false);
        console.log(err);
      });
  };

  const handlePCMiler = () => {
    if (invoiceMiles > 0) setShowPCMilerModal(true);
    else handlePCMilerOK();
  };

  const handlePCMilerCancel = () => {
    setShowPCMilerModal(false);
  };

  const handlePCMilerErrorClose = () => {
    setShowPCMilerErrorModal(false);
    dispatch(setPcMilerError(""));
  };

  const handlePCMilerOK = () => {
    calculateTripDistance();
    setShowPCMilerModal(false);
  };

  // Check if Miles Adjustment, and add with Miles
  const addMilesWithMilesAdjustment = (miles) => {
    if (
      pickupAtPlant &&
      pickupCustomerPlantId !== null &&
      pickupCustomerPlantId !== undefined &&
      pickupCustomerPlantId !== "" &&
      deliveryDealersFK !== null &&
      selectedDeliveryDealer !== null
    ) {
      if (isDefaultInvoiceMiles) {
        let invoiceMiles = miles + invoiceMilesAdjustment;
        dispatch(setInvoiceMiles(invoiceMiles));
        dispatch(setDefaultInvoiceMiles(invoiceMiles));
      } else {
        dispatch(setInvoiceMiles(miles));
        dispatch(setDefaultInvoiceMiles(miles));
      }

      if (isDefaultDriverMiles) {
        let driverMiles = miles + driverMilesAdjustment;
        dispatch(setDriverMiles(driverMiles));
        dispatch(setDefaultDriverMiles(driverMiles));
      } else {
        dispatch(setDriverMiles(miles));
        dispatch(setDefaultDriverMiles(miles));
      }
    } else {
      dispatch(setInvoiceMiles(miles));
      dispatch(setDriverMiles(miles));
      dispatch(setDefaultInvoiceMiles(miles));
      dispatch(setDefaultDriverMiles(miles));
    }
  };

  return (
    <Formik>
      {(formik) => (
        <div className={`p-2 mb-0 ${styles.miscConatiner} ${styles.orderEntryHeight}`}>
          {/* ROW 1 */}
          <Row className="h-100">
            {/* COL 1 - TABLE */}
            <Col sm={5} xs={5} className={styles.driveByTableHeight}>
              {" "}
              <div className={`border border-secondary overflow-auto h-100`}>
                <table className="table border-bottom  table-striped f-w-600">
                  <thead>
                    <tr disabled>
                      <th className={`col-8 ${styles.borderRightOrderEntry}`}>Name</th>

                      <th className={`col-3 ${styles.borderRightOrderEntry}`}>City</th>

                      <th className="col-1">State</th>
                    </tr>
                  </thead>

                  <tbody>{renderMainData}</tbody>
                </table>
              </div>
            </Col>

            {/* COL 2 - BUTTONS */}
            <Col sm={2} xs={2}>
              <div className="d-flex flex-column mt-3">
                <span className="p-1">
                  <button
                    className={`btn btn-secondary font-12 btn-sm  w-110px ${!moveUp && "disabled-op-50"}`}
                    type="button"
                    onClick={moveUpUniteRoutesArray}
                  >
                    Move Up
                  </button>
                </span>
                <span className="p-1">
                  <button
                    className={`btn btn-secondary font-12 btn-sm w-110px ${!moveDown && "disabled-op-50"}`}
                    type="button"
                    onClick={moveDownUniteRoutesArray}
                  >
                    Move down
                  </button>
                </span>
                <span className="p-1">
                  <button
                    className={`btn btn-secondary font-12 btn-sm w-110px `}
                    disabled={unitRoutesFrmRedux?.length > 1 ? false : true}
                    type="button"
                    onClick={handlePCMiler}
                  >
                    PC Miler
                  </button>
                  {loader && <LoadingIcon />}
                </span>
                <span className="p-1">
                  <button
                    className={`btn btn-secondary font-12 btn-sm w-110px `}
                    disabled={unitRoutesFrmRedux?.length > 3 ? false : true}
                    type="button"
                    onClick={HandleOptize}
                  >
                    Optimize
                  </button>
                  {loader1 && <LoadingIcon />}
                </span>
              </div>
            </Col>

            {/* COL 3 */}
            <Col sm={5} xs={5} className="mt-5">
              <Form on={formik.handle}>
                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>
                      {t("edit.dealer.page.general.tab.name")}
                    </Form.Label>
                  </Col>
                  <Col sm={5} xs={5}>
                    <input
                      className={`customFormControl `}
                      id="name"
                      name="name"
                      value={name}
                      type="text"
                      disabled="true"
                      maxLength={30}
                      autoComplete="off"
                      aria-autocomplete="list"
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-4 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}>
                    <Form.Label className={`customColFormLabel`}>
                      {t("edit.dealer.page.general.tab.address")}
                    </Form.Label>
                  </Col>
                  <Col sm={5} xs={5}>
                    <input
                      className="customFormControl"
                      id="ad1"
                      name="ad1"
                      value={address1}
                      type="text"
                      disabled="true"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mt-2 align-items-center row  m-l-0 m-r-0">
                  <Col sm={3} xs={3}></Col>
                  <Col sm={5} xs={5}>
                    <input
                      className="customFormControl"
                      id="ad2"
                      name="ad2"
                      value={address2}
                      disabled="true"
                      type="text"
                      maxLength={30}
                      autoComplete="one-time-code"
                      aria-autocomplete="list"
                      spellCheck={false}
                    />
                  </Col>
                </Form.Group>

                <div>
                  <div className="mt-4 align-items-center row  m-l-0 m-r-0">
                    <Col sm={3} xs={3}>
                      <label className="col-form-label dealer-label">
                        {/* {t('edit.dealer.page.general.tab.city.state.zip')} */}
                        City, State, ZIP
                      </label>
                    </Col>

                    {/* City */}
                    <Col xs={4} sm={4}>
                      <input
                        className={`customFormControl 
            `}
                        control="input"
                        type="city"
                        name="city"
                        maxLength={30}
                        value={city}
                        disabled={true}
                        autoComplete="off"
                        aria-autocomplete="list"
                        style={{
                          borderColor: "black",
                        }}
                      />
                    </Col>
                    {/* State */}
                    <Col xs={1} md={1} sm={1} className="p-r-0">
                      <input
                        className={`customFormControl
              `}
                        type="statecode"
                        name="statecode"
                        maxLength={2}
                        value={statecode?.toUpperCase()}
                        disabled={true}
                        autoComplete="off"
                        aria-autocomplete="list"
                        style={{
                          borderColor: "black",
                        }}
                      />
                    </Col>
                    {/* Zip Code */}

                    <Col xs={2} md={2} sm={2} className="p-r-0">
                      <input
                        className={`customFormControl`}
                        type="postalCode"
                        name="postalCode"
                        value={postalCode?.toUpperCase()}
                        maxLength={10}
                        disabled={true}
                        autoComplete="off"
                        aria-autocomplete="list"
                        style={{
                          borderColor: "black",
                        }}
                      />
                    </Col>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>

          {/* PC Miler Popup */}
          <Modal show={showPCMilerModal} onHide={handlePCMilerCancel} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Warning !!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p>
                <p>Do you want to override the miles ? </p>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePCMilerOK}>
                {loader === true ? (
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                ) : (
                  "YES"
                )}
              </Button>
              <Button variant="secondary" onClick={handlePCMilerCancel}>
                NO
              </Button>
            </Modal.Footer>
          </Modal>

          {/* PC Miler Error Popup */}
          <Modal
            show={showPCMilerErrorModal}
            onHide={handlePCMilerErrorClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Warning !!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="font-14 h-100">
              <p>{pcMilerError}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handlePCMilerErrorClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </Formik>
  );
}

export default UnitRoutes;
