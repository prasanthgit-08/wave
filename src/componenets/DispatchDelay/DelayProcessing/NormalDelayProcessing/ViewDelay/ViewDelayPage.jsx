import React, { useEffect, useState } from "react";
import Header from "../../../../common/Header";
import CommonFooter from "../../../../common/CommonFooter";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import General from "./Tabs/General";
import Emails from "./Tabs/Emails";
import Comments from "./Tabs/Comments";
import DelayComments from "./Tabs/DelayComments";
import Returns from "./Tabs/Returns";
import DelayInstructions from "./Tabs/DelayInstructions";
import Resources from "./Tabs/Resources";
import { useDispatch, useSelector } from "react-redux";
import {
  setMiscMoveDeliveryDetails,
  setMoveData,
  setViewDelayActiveTab,
  setDriverReleased,
  setEditEmailList,
  resetEditEmailChanges,
  setEditView,
  setEditSelectedIndex,
  setEditAddFlag,
  setEditDetailFlag,
  setDelayActive,
  setGeneralData,
  setDispatchFK,
  setReturnDetails,
  setIsMiscPickup,
  setIsMiscDelivery,
  setReturnValidEntry,
  setDelayReturnByDriver,
} from "../../../../../redux/DispatchDelay/DelayProcessing/DelayProcessingSlice";
import {
  resetSplitTripLocation,
  setIsDelayBreakdown,
  setSplitTripFiles,
  setSplitTripMilesData,
  setUndispatchFlag,
} from "../../../../../redux/UndispatchSlice";
import ModalComponent from "../../../../common/ModalComponent";
import DelayProcessingService from "../../../../../services/DispatchDelay/DelayProcessing/DelayProcessingService";
import { toast } from "react-hot-toast";
import {
  resetEmailChanges,
  resetResourceList,
  setAddFlag,
  setEditMode,
  setNewEmailList,
  setNotes,
  setResourceList,
  setSelectedIndex,
  resetBreakdowbBrowsePage,
} from "../../../../../redux/DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import {
  setAuthorizedBy,
  setCompanyId,
  setDeliveryDealerFK,
  setDeliveryUnitAddressFK,
  setDispatches,
  setDispatchPK,
  setNavigatedFromRerouteBrowse,
  setPickupDealerFK,
  setPickupUnitAddressFK,
  setRequestedBy,
  setRerouteType,
  setSelectedUnitInfo,
  setUnitFK,
} from "../../../../../redux/RerouteSlice";
import RerouteService from "../../../../../services/RerouteService";
import {
  resetDamageBrowsePage,
  resetEmailChanges as damageResetEmailChanges,
  resetResourceList as damageResetResourceList,
  setAddFlag as setDamageAddFlag,
  setEditMode as setDamageEditMode,
  setNewEmailList as setDamageNewEmailList,
  setNotes as setDamageNotes,
  setResourceList as setDamageResourceList,
  setSelectedIndex as setDamageSelectedIndex,
} from "../../../../../redux/DispatchDelay/DamageProcessing/DamageSlice";
import LoadingIcon from "../../../../common/LoadingIcon";

const ViewDelayPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyName, driverfk, unitfk, delayedUnitPK } = useParams();
  const [activeShow, setActiveShow] = useState(false);
  const driverFK = Number(driverfk);

  const viewDelayActiveTab = useSelector((state) => state.delayProcessing.viewDelayActiveTab);
  const delayActive = useSelector((state) => state.delayProcessing.delayActive);
  const generalData = useSelector((state) => state.delayProcessing.generalData);
  const viewLoading = useSelector((state) => state.delayProcessing.viewLoading);
  const activeDisable = useSelector((state) => state.delayProcessing.activeDisable);
  const dispatchFK = useSelector((state) => state.delayProcessing.dispatchFK);
  //Release Driver
  const [disableReturn, setDisableReturn] = useState(false);
  const [disableRelease, setDisableRelease] = useState(false);
  const [isActiveToInactive, setisActiveToInactive] = useState(false);
  const [loading, setLoading] = useState(false);

  /******
   * Release Driver Program API
   * to Enable Release Driver Button
   ******/
  useEffect(() => {
    if (delayedUnitPK) {
      DelayProcessingService.isReturnActive(delayedUnitPK)
        .then(({ data }) => {
          setDisableReturn(!data);
        })
        .catch(() => {
          setDisableReturn(true);
        });

      DelayProcessingService.isReleaseActive(delayedUnitPK)
        .then(({ data }) => {
          setDisableRelease(!data);
        })
        .catch(() => {
          setDisableRelease(true);
        });
    } else {
      setDisableRelease(true);
      setDisableReturn(true);
    }
  }, [delayedUnitPK]);

  const [dispatches, setDispatches] = useState({});

  {
    /* Reroute Button */
  }
  const handleReroute = () => {
    dispatch(setNavigatedFromRerouteBrowse(true));
    navigate("/reroute-delivery-location-normal-dealer");
    localStorage.setItem("driverId", driverfk);
    localStorage.setItem("RerouteSource", "Delay");
    localStorage.setItem("delayUnit", delayedUnitPK);
    localStorage.setItem("company", companyName);
    localStorage.setItem("unitfk", unitfk);

    dispatch(setAuthorizedBy(generalData?.DelayContact));
    dispatch(setRequestedBy("Customer"));
    dispatch(setRerouteType("Delivery"));
    dispatch(setDispatchPK(generalData?.DispatchFK));
    dispatch(setUnitFK(unitfk));
    dispatch(setPickupDealerFK(generalData.PickUpDealerFK));
    dispatch(setPickupUnitAddressFK(generalData.PickUpUnitAddressFK));
    dispatch(setDeliveryDealerFK(generalData.DeliveryDealerFK));
    dispatch(setDeliveryUnitAddressFK(generalData.DeliveryUnitAddressFK));
    dispatch(setCompanyId(dispatches?.companyId || null));
    let unitInfo = {
      pickupCustomerPlantFK: dispatches?.pickupCustomerPlantFK,
      pickupDealerFK: dispatches?.pickupDealerFK,
      pickupUnitAddressFK: dispatches?.pickupUnitAddressFK,
      usePlants: dispatches?.usePlants,
      miscellaneousCustomer: dispatches?.miscellaneousCustomer,
      deliveryCustomerPlantFK: dispatches?.deliveryCustomerPlantFK,
      deliveryDealerFK: dispatches?.deliveryDealerFK,
      deliveryUnitAddressFK: dispatches?.deliveryUnitAddressFK,
      billingCustomerPlantFK: dispatches?.billingCustomerPlantFK,
      customerFK: dispatches?.customerFK,
      pickupAddress1: dispatches?.pickupAddress1,
      pickupAddress2: dispatches?.pickupAddress2,
      pickupCity: dispatches?.pickupCity,
      pickupStateCode: dispatches?.pickupStateCode,
      pickupPostalCode: dispatches?.pickupPostalCode,
      deliveryAddress1: dispatches?.deliveryAddress1,
      deliveryAddress2: dispatches?.deliveryAddress2,
      deliveryCity: dispatches?.deliveryCity,
      deliveryStateCode: dispatches?.deliveryStateCode,
      deliveryPostalCode: dispatches?.deliveryPostalCode,
      multiUnit: dispatches?.multiUnit,
      pickupName: dispatches?.pickupName,
      deliveryName: dispatches?.deliveryName,
      invoiceCustomerRateFK: dispatches?.invoiceCustomerRateFK,
      driverCustomerRateFK: dispatches?.driverCustomerRateFK,
      unitTypeFK: dispatches?.unitTypeFK,
      unitsPerDispatch: dispatches?.totalUnits,
      isMilesLowBoy: dispatches?.milesLowBoy,
      invoice2as3: dispatches?.invoice2as3,
      invoiceRate: dispatches?.invoiceRate,
      invoiceSupplementalRate: dispatches?.invoiceSupplementalRate,
      invoiceAdditionalFlatRate: dispatches?.invoiceAdditionalFlatRate,
      invoiceAdditionalRate: dispatches?.invoiceAdditionalRate,
      invoiceLengthRate: dispatches?.invoiceLengthRate,
      invoiceCDLARate: dispatches?.invoiceCDLARate,
      invoiceUSCNSurcharge: dispatches?.invoiceUSCNSurcharge,
      invoicePortEscortFee: dispatches?.invoicePortEscortFee,
      invoiceELDFee: dispatches?.invoiceELDFee,
      invoiceSpecialRate: dispatches?.invoiceSpecialRate,
      driverSupplementalRate: dispatches?.driverSupplementalRate,
      driverBaseRate: dispatches?.driverBaseRate,
      driverAdditionalFlatRate: dispatches?.driverAdditionalFlatRate,
      driverAdditionalRate: dispatches?.driverAdditionalRate,
      driverLengthRate: dispatches?.driverLengthRate,
      driverCDLARate: dispatches?.driverCDLARate,
      driverUSCNSurcharge: dispatches?.driverUSCNSurcharge,
      driverELDFee: dispatches?.driverELDFee,
      driverSpecialRate: dispatches?.driverSpecialRate,
      invoiceRateType: dispatches?.invoiceRateType,
      driverRateType: dispatches?.driverRateType,
      reload: dispatches?.reload,
      returnRated: dispatches?.returnRated,
      invoicePercentage: dispatches?.invoicePercentage,
      creditCardPrepaid: dispatches?.creditCardPrepaid,
      invoiceMiles: dispatches?.invoiceMiles,
      driverMiles: dispatches?.driverMiles,
      driverRate: dispatches?.driverRate,
      longUnitRate: dispatches?.longUnitRate,
      halfTonAdjustmentRate: dispatches?.halfTonAdjustmentRate,
      driverFuelSurcharge: dispatches?.driverFuelSurcharge,
      invoiceDriverRate: dispatches?.invoiceDriverRate,
      invoiceDriverFuelSurchargeRate: dispatches?.invoiceDriverFuelSurchargeRate,
      pickedUp: dispatches?.pickedUp,
      pickupLocationCanadian: dispatches?.pickupLocationCanadian,
      phone: dispatches?.phone,
      contact: dispatches?.contact,
      pickupPostalCodePK: dispatches?.pickupPostalCodePK,
    };
    dispatch(setSelectedUnitInfo(unitInfo));
  };

  {
    /* Move Button */
  }
  const handleMove = () => {
    navigate(`/dispatch-delay-move/${unitfk}/${driverFK}/${delayedUnitPK}`, {
      state: { customerFK: generalData?.CustomerFK },
    });
    dispatch(setMoveData(null));
    dispatch(setMiscMoveDeliveryDetails(null));
  };

  {
    /* Release Driver Button */
  }
  const handleReleaseDriver = () => {
    navigate(
      "/releasedriver-splittrip-location-screen/" +
        driverFK +
        "/" +
        Number(delayedUnitPK) +
        "/" +
        Number(dispatchFK) +
        "/" +
        Number(unitfk) +
        "/" +
        companyName
    );
    dispatch(setUndispatchFlag(true));
    dispatch(setDriverReleased(true));
    localStorage.setItem("driverRelease", true);
    dispatch(resetSplitTripLocation());
    dispatch(setSplitTripFiles({ actionType: "clear" }));
    dispatch(setSplitTripMilesData(null));
  };

  {
    /* Return Button */
  }
  const handleReturn = () => {
    navigate(`/delay-return-details/${companyName}/${unitfk}/${driverfk}/${delayedUnitPK}`);
    dispatch(setReturnDetails(null));
    dispatch(setIsMiscPickup(false));
    dispatch(setIsMiscDelivery(false));
    dispatch(setReturnValidEntry(true));
    dispatch(setDelayReturnByDriver(false));
  };

  {
    /* Breakdown Button */
  }
  const handleBreakdown = () => {
    dispatch(resetBreakdowbBrowsePage());
    dispatch(setNewEmailList([]));
    dispatch(setResourceList([]));
    dispatch(resetEmailChanges());
    dispatch(setNotes(null));
    dispatch(setEditMode(false));
    dispatch(setSelectedIndex(null));
    dispatch(setAddFlag(false));
    dispatch(resetResourceList(false));
    dispatch(setIsDelayBreakdown(true));
    navigate(
      "/breakdown/browse/" +
        companyName +
        "/" +
        Number(unitfk) +
        "/" +
        Number(driverfk) +
        "/" +
        Number(delayedUnitPK)
    );
  };

  {
    /* Damage Button */
  }
  const handleDamage = () => {
    dispatch(setDamageNewEmailList([]));
    dispatch(setDamageResourceList([]));
    dispatch(damageResetResourceList());
    dispatch(setDamageNotes(null));
    dispatch(setDamageEditMode(false));
    dispatch(setDamageSelectedIndex(null));
    dispatch(setDamageAddFlag(false));
    dispatch(resetDamageBrowsePage());
    dispatch(damageResetEmailChanges());

    navigate(
      "/damage-browse/" +
        encodeURIComponent(companyName?.trim()) +
        "/" +
        Number(unitfk) +
        "/" +
        Number(driverfk) +
        "/" +
        Number(delayedUnitPK)
    );
  };
  const getRerouteData = () => {
    if (dispatchFK) {
      setLoading(true);
      RerouteService.getUnitById(dispatchFK)
        .then(({ data }) => {
          setDispatches(data[0]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };

  {
    /* Edit Button */
  }
  const handleEdit = () => {
    dispatch(setEditEmailList([]));
    dispatch(resetEditEmailChanges());
    dispatch(setEditView(false));
    dispatch(setEditSelectedIndex(null));
    dispatch(setEditAddFlag(false));
    dispatch(setEditDetailFlag(true));
    navigate(
      "/delay-processing/edit-delay/" +
        companyName +
        "/" +
        Number(unitfk) +
        "/" +
        Number(driverfk) +
        "/" +
        Number(delayedUnitPK)
    );
  };

  {
    /* Cancel Button */
  }
  const handleCancel = () => {
    navigate("/delay-processing/delayed-unit-browse");
    dispatch(setGeneralData(null));
    dispatch(setViewDelayActiveTab("general"));
  };

  {
    /* Active Button - Activate or Deactive Delay*/
  }
  const handleActive = () => {
    setActiveShow(true);
  };
  const handleActiveClose = () => setActiveShow(false);
  const handleActiveSave = (e) => {
    if (delayActive == true) {
      DelayProcessingService.activateorDeactivateDelay(0, companyName, delayedUnitPK, 1)
        .then(() => {
          setActiveShow(false);
          dispatch(setDelayActive(false));
          toast.success("Delay Deactivated");
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    } else {
      DelayProcessingService.activateorDeactivateDelay(1, companyName, delayedUnitPK, 0)
        .then(() => {
          setActiveShow(false);
          dispatch(setDelayActive(true));
          toast.success("Delay Activated");
        })
        .catch((error) => {
          toast.error("Something went wrong");
        });
    }
  };

  useEffect(() => {
    dispatch(setViewDelayActiveTab("general"));
    // Clear dispatchFK on leave so the next view doesn't start with the previous record's value
    return () => {
      dispatch(setDispatchFK(null));
    };
  }, []);

  useEffect(() => {
    getRerouteData();
  }, [dispatchFK]);

  const isRerouteDisabled =
    !delayActive ||
    !generalData ||
    !generalData?.DispatchFK ||
    !generalData?.Driver ||
    !dispatches ||
    dispatches?.deliveryCustomerPlantFK ||
    generalData?.Undispatched;
  const isMoveDisabled = !(
    generalData?.Active &&
    (generalData?.Breakdown || generalData?.Damage) &&
    (generalData?.BreakdownActive || generalData?.DamageActive)
  );
  const isReleaseDriverDisabled = !delayActive || disableRelease;
  const isEditDisabled = !delayActive || !generalData?.Delay;
  const isReturnDisabled = !delayActive || disableReturn || !generalData?.Driver?.trim();

  const buttons = [
    { label: "Reroute", onClick: handleReroute, disabled: isRerouteDisabled },
    { label: "Move", onClick: handleMove, disabled: isMoveDisabled },
    {
      label: "Release Driver",
      onClick: handleReleaseDriver,
      disabled: isReleaseDriverDisabled || viewLoading,
    },
    { label: "Return", onClick: handleReturn, disabled: isReturnDisabled },
    { label: "Breakdown", onClick: handleBreakdown, disabled: !delayActive },
    { label: "Damage", onClick: handleDamage, disabled: !delayActive },
    {
      label: "Active",
      onClick: handleActive,
      disabled: activeDisable,
      style: viewLoading ? {} : { backgroundColor: !delayActive ? "#FF0000" : "" },
    },
    { label: "Edit", onClick: handleEdit, disabled: isEditDisabled },
    { label: "Cancel", onClick: handleCancel },
  ];

  return (
    <div className="add-form-component p-0 customContainer">
      {loading && <LoadingIcon />}
      <div className="border border-dark border-2 halfScreenWidth" style={{ margin: "1px" }}>
        <Header
          programName="Delay Processing"
          closeHandler={() => {
            dispatch(setViewDelayActiveTab("general"));
            dispatch(setDispatchFK(null));
          }}
          closeNavigationURL="/"
        />
        <div className="p-2">
          <div className="shadow-sm rounded border threeFourthScreenFormContentHeight">
            <Tabs
              activeKey={viewDelayActiveTab}
              onSelect={(key) => dispatch(setViewDelayActiveTab(key))}
              id="uncontrolled-tab-example"
              className="m-b-2"
            >
              <Tab eventKey="general" title={"General"}>
                <General />
              </Tab>
              <Tab eventKey="emails" title={"Emails"} disabled={!generalData?.Delay}>
                <Emails />
              </Tab>
              <Tab eventKey="comments" title={"Comments"}>
                <Comments />
              </Tab>
              <Tab eventKey="delayComments" title={"Delay Comments"} disabled={!generalData?.Delay}>
                <DelayComments />
              </Tab>
              <Tab eventKey="returns" title={"Returns"} disabled={!generalData?.Returned}>
                <Returns />
              </Tab>
              <Tab eventKey="delayInstructions" title={"Delay Instructions"} disabled={!generalData?.Delay}>
                <DelayInstructions />
              </Tab>
              <Tab eventKey="resources" title={"Resources"} disabled={!generalData?.Delay}>
                <Resources />
              </Tab>
            </Tabs>
          </div>
        </div>
        <CommonFooter buttons={buttons} />
        {/* model Active*/}
        <ModalComponent
          show={activeShow}
          onHide={handleActiveClose}
          title={delayActive === true ? "Deactivate Delay" : "Activate Delay"}
          body={
            delayActive === true
              ? " Please confirm you want to Deactivate this Delay"
              : " Please confirm you want to Activate this Delay"
          }
          handleYES={handleActiveSave}
          handleNO={handleActiveClose}
        />
      </div>
    </div>
  );
};

export default ViewDelayPage;
