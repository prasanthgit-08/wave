import { parse } from "js2xmlparser";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import WarningModalPopUp from "../../../../../../common/WarningModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetUnitDetails,
  setCreditCardArrayList,
  setDealerCustomerFK,
  setDealerCustomerName,
  setInitialUnitCardDetails,
  setNavigatedFromRerouteBrowse,
  setNewDeliveryUnitAddressFK,
  setNewPickupUnitAddressFK,
  setPreviousURL,
  setSelectedNewDeliveryMiscellneousDealerData,
  setSelectedNewPickupMiscellneousDealerData,
  setSelectedUnitInfo,
  setSendDriverPaperwork,
  setUnitCardDetails,
} from "../../../../../../../redux/RerouteSlice";
import RerouteService from "../../../../../../../services/RerouteService";
import ModalComponent from "../../../../../../common/ModalComponent";
import LoadingIcon from "../../../../../../common/LoadingIcon";
import { setMiscDeliveryID, setMiscPickupID } from "../../../../../../../redux/OrderEntryFilterSlice";
import ReRouteCreditCardTemplate from "../../../../../../../modules/credit-card/ReRouteCreditCardTemplate";
import { getCurrentCompany } from "../../../../../../../utils/utils";

function RerouteFooter() {
  const currentURL = window.location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const driverFK = localStorage.getItem("driverId");
  const delayUnit = localStorage.getItem("delayUnit");
  const company = localStorage.getItem("company");
  const rerouteSource = localStorage.getItem("RerouteSource");
  const unitFK = localStorage.getItem("unitfk");
  //Details Screen
  const rerouteType = useSelector((state) => state.rerouteReducer.rerouteType);
  const requestedBy = useSelector((state) => state.rerouteReducer.requestedBy);
  const dealerCustomerFK = useSelector((state) => state.rerouteReducer.dealerCustomerFK);
  const dealerCustomerName = useSelector((state) => state.rerouteReducer.dealerCustomerName);
  const authorizedBy = useSelector((state) => state.rerouteReducer.authorizedBy);
  //Pickup Normal Dealer
  const pickupNormalDealerFK = useSelector((state) => state.rerouteReducer.pickupNormalDealerFK);
  const pickUpNormalDealerData = useSelector((state) => state.rerouteReducer.normalDealerData);
  const selectedNewPickupNormalDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewPickupNormalDealerData
  );
  const miscellaneousPickup = useSelector((state) => state.rerouteReducer.miscellaneousPickup);
  const selectedNewPickupMiscellneousDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewPickupMiscellneousDealerData
  );
  const unitCardDetails = useSelector((state) => state.rerouteReducer.unitCardDetails);

  //Pickup Miscellaneous Dealer
  const pickUpMiscellaneousDealerData = useSelector((state) => state.rerouteReducer.miscellaneousDealerData);
  //Delivery Normal Dealer Screen
  const deliveryNormalDealerFK = useSelector((state) => state.rerouteReducer.deliveryNormalDealerFK);
  const miscellaneousDelivery = useSelector((state) => state.rerouteReducer.miscellaneousDelivery);
  const previousURL = useSelector((state) => state.rerouteReducer.previousURL);
  const dispatchPK = useSelector((state) => state.rerouteReducer.dispatchPK);
  const initialUnitCardDetails = useSelector((state) => state.rerouteReducer.initialUnitCardDetails);

  const notes = useSelector((state) => state.rerouteReducer.notes);
  const selectedNewDeliveryNormalDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewDeliveryNormalDealerData
  );
  const selectedNewDeliveryMiscellneousDealerData = useSelector(
    (state) => state.rerouteReducer.selectedNewDeliveryMiscellneousDealerData
  );

  //modal pop up
  const [cancelShow, setCancelShow] = useState(false);
  const [totalReaminingAmount, setTotalReaminingAmount] = useState(0);
  const currentDeliveryMiscellaneousDealerData = useSelector(
    (state) => state.rerouteReducer.currentDeliveryMiscellaneousDealerData
  );
  const currentDeliveryNormalDealerData = useSelector(
    (state) => state.rerouteReducer.currentDeliveryNormalDealerData
  );
  const isMiscDeliveryDealerValid = useSelector((state) => state.rerouteReducer.isMiscDeliveryDealerValid);
  const isMiscPickupDealerValid = useSelector((state) => state.rerouteReducer.isMiscPickupDealerValid);
  const selectedUnitInfo = useSelector((state) => state.rerouteReducer.selectedUnitInfo);
  const invoiceMiles = useSelector((state) => state.rerouteReducer.invoiceMiles);
  const driverMiles = useSelector((state) => state.rerouteReducer.driverMiles);
  const invoiceFlatRate = useSelector((state) => state.rerouteReducer.invoiceFlatrate);
  const invoiceFlatRate2 = useSelector((state) => state.rerouteReducer.invoiceFlatrate2);
  const driverFlatRate = useSelector((state) => state.rerouteReducer.driverFlatrate);
  const driverFlatRate2 = useSelector((state) => state.rerouteReducer.driverFlatrate2);
  const delaySelectedCompanyName = useSelector((state) => state.unitSelection.selectedCompanyName);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [rerouteLoader, setRerouteLoader] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const initailLoad = useRef(false);

  //handle Next Button On Click
  // Screen Navigations based on current url

  //Edit Master Express
  const fromEditMasterExpress = useSelector((state) => state.rerouteReducer.fromEditMasterExpress);

  //Credit Card
  const creditCardArrayList = useSelector((state) => state.rerouteReducer.creditCardArrayList);
  //Company Id
  const companyId = useSelector((state) => state.rerouteReducer.companyId);
  const rateObj = useSelector((state) => state.rerouteReducer.rateObj);
  const sendDriverPaperwork = useSelector((state) => state.rerouteReducer.sendDriverPaperwork);
  const loggedInUserData = useSelector((state) => state.auth.loggedInUserData);
  const reRouteMultiUnitLoad = useSelector((state) => state.rerouteReducer.reRouteMultiUnitLoad);
  const updatedDeliveryMiscDealerData = useSelector(
    (state) => state.rerouteReducer.updatedDeliveryMiscDealerData
  );
  const updatedPickupMiscDealerData = useSelector(
    (state) => state.rerouteReducer.updatedPickupMiscDealerData
  );
  const disableRerouteButton = useSelector((state) => state.rerouteReducer.disableRerouteButton);
  const unitLocation = useSelector((state) => state.rerouteReducer.unitLocation);

  const initialRate = Number(rateObj?.InvoiceFlatRate_Unit) || Number(rateObj?.ExistingMileageRate) || 0;
  const currentmilageRate =
    Number(rateObj?.invoiceAdditionalFlatRate) +
      (Number(rateObj?.invoiceAdditionalFuelSurchargeRate) +
        Number(rateObj?.invoiceAdditionalRate) +
        Number(rateObj?.invoiceFuelSurchargeRate) +
        Number(rateObj?.invoiceRateFromCustomerRate) +
        Number(rateObj?.invoiceSpecialFuelSurchargeRate) +
        Number(rateObj?.invoiceSpecialRate) +
        Number(rateObj?.invoiceSupplementalFuelSurchargeRate) +
        Number(rateObj?.InvoiceApportionedRate) +
        Number(rateObj?.invoiceSupplementalRate)) *
        invoiceMiles || 0;
  const currentRate = Number(invoiceFlatRate || currentmilageRate || 0);

  const handleRerouteSave = () => {
    setRerouteLoader(true);
    let currentCompany = getCurrentCompany();

    const creditCardMap = unitCardDetails.reduce((acc, item) => {
      acc[item.unitpk] = item.authorizedCards || [];
      return acc;
    }, {});
    if (selectedNewPickupMiscellneousDealerData || (miscellaneousPickup && rerouteType === "Pickup")) {
      const miscellaneousPickupDealerData = {
        pickupMiscDealer: 1,
        Name: updatedPickupMiscDealerData?.name?.trim() || pickUpMiscellaneousDealerData?.Name?.trim() || "",
        Address1:
          updatedPickupMiscDealerData?.address1?.trim() ||
          pickUpMiscellaneousDealerData?.Address1?.trim() ||
          "",
        Address2:
          updatedPickupMiscDealerData?.address2?.trim() ||
          pickUpMiscellaneousDealerData?.Address2?.trim() ||
          "",
        City: updatedPickupMiscDealerData?.city?.trim() || pickUpMiscellaneousDealerData?.City?.trim() || "",
        StateCode:
          updatedPickupMiscDealerData?.stateCode?.trim() ||
          pickUpMiscellaneousDealerData?.StateCode?.trim() ||
          "",
        PostalCode:
          updatedPickupMiscDealerData?.postalCode?.trim() ||
          pickUpMiscellaneousDealerData?.PostalCode?.trim() ||
          "",
        Canadian: updatedPickupMiscDealerData?.canadian ? 1 : pickUpMiscellaneousDealerData?.Canadian ? 1 : 0,
        Phone:
          updatedPickupMiscDealerData?.phone?.trim() || pickUpMiscellaneousDealerData?.Phone?.trim() || "",
        Email:
          updatedPickupMiscDealerData?.email?.trim() || pickUpMiscellaneousDealerData?.Email?.trim() || "",
        DeliveryContact:
          updatedPickupMiscDealerData?.deliveryContact?.trim() ||
          pickUpMiscellaneousDealerData?.DeliveryContact?.trim() ||
          "",
        DeliveryContactPhone:
          updatedPickupMiscDealerData?.deliveryContactPhone?.trim() ||
          pickUpMiscellaneousDealerData?.DeliveryContactPhone?.trim() ||
          "",
        OpenSunday: updatedPickupMiscDealerData?.openSunday
          ? 1
          : pickUpMiscellaneousDealerData?.OpenSunday
            ? 1
            : 0,
        OpenMonday: updatedPickupMiscDealerData?.openMonday
          ? 1
          : pickUpMiscellaneousDealerData?.OpenMonday
            ? 1
            : 0,
        OpenTuesday: updatedPickupMiscDealerData?.openTuesday
          ? 1
          : pickUpMiscellaneousDealerData?.openTuesday
            ? 1
            : 0,
        OpenWednesday: updatedPickupMiscDealerData?.openWednesday
          ? 1
          : pickUpMiscellaneousDealerData?.OpenWednesday
            ? 1
            : 0,
        OpenThursday: updatedPickupMiscDealerData?.openThursday
          ? 1
          : pickUpMiscellaneousDealerData?.OpenThursday
            ? 1
            : 0,
        OpenFriday: updatedPickupMiscDealerData?.openFriday
          ? 1
          : pickUpMiscellaneousDealerData?.OpenFriday
            ? 1
            : 0,
        OpenSaturday: updatedPickupMiscDealerData?.openSaturday
          ? 1
          : pickUpMiscellaneousDealerData?.OpenSaturday
            ? 1
            : 0,
        Hours:
          updatedPickupMiscDealerData?.hours?.trim() || pickUpMiscellaneousDealerData?.Hours?.trim() || "",
        Directions:
          updatedPickupMiscDealerData?.directions?.trim() ||
          pickUpMiscellaneousDealerData?.Directions?.trim() ||
          "",
      };
      const xmlForSave = parse("MiscellaneousDealerDatatoSave", miscellaneousPickupDealerData).replace(
        /<\?xml.*?\?>\s*/i,
        ""
      );
      RerouteService.saveMiscDealer(xmlForSave, companyId)
        .then((response) => {
          const data = response.data;
          if (data) {
            let newUnitAddressPK = data[0].UnitAddressPK;
            dispatch(setNewPickupUnitAddressFK(data[0]));
            let driverGrossPay =
              driverFlatRate > 0
                ? parseInt(driverFlatRate)
                : driverFlatRate2 > 0
                  ? parseInt(driverFlatRate2)
                  : (rateObj?.driverRateFromCustomerRate || 0) +
                    (rateObj?.driverFuelSurchargeRate || 0) +
                    (rateObj?.driverSupplementalRate || 0); //+ rateObj.driverSupplementalFuelSurchargeRate?
            let driverQualVO = { totalAmount: driverGrossPay, miles: driverMiles, dispatchPK };
            let selectedDeliveryDealer =
              selectedNewDeliveryNormalDealerData || currentDeliveryNormalDealerData;
            let selectedMiscellanousDeliveryDealer =
              selectedNewDeliveryMiscellneousDealerData || currentDeliveryMiscellaneousDealerData;
            const unitRerouteSaveVO = {
              companyId,
              companyName:
                delaySelectedCompanyName || selectedUnitInfo.companyName || currentCompany?.name || null,
              dispatchPK,
              unitpk: selectedUnitInfo.unitPK,
              driverpk: driverFK ? parseInt(driverFK) : null,
              notes,
              oldPickupDealerFK: selectedUnitInfo.pickupDealerFK,
              newPickupDealerFK: null,
              oldPickupUnitAddressFK: selectedUnitInfo.pickupUnitAddressFK,
              newPickupUnitAddressFK: newUnitAddressPK || null,
              oldDeliveryDealerFK: selectedUnitInfo.deliveryDealerFK,
              oldDeliveryUnitAddressFK: selectedUnitInfo.deliveryUnitAddressFK,
              newDeliveryDealerFK: selectedDeliveryDealer?.DealerPK || null,
              newDeliveryUnitAddressFK: selectedMiscellanousDeliveryDealer?.unitAddressPK || null,
              pickupcustomerplantfk: selectedUnitInfo.pickupCustomerPlantFK,
              deliverycustomerplantfk: selectedUnitInfo.deliveryCustomerPlantFK,
              oldInvoiceMiles: selectedUnitInfo.invoiceMiles,
              oldDriverMiles: selectedUnitInfo.driverMiles,
              invoiceMiles: parseInt(invoiceMiles),
              driverMiles: parseInt(driverMiles),
              dealerReroute: requestedBy === "Dealer" ? true : false,
              invoiceFuelSurchargeRate: rateObj?.invoiceFuelSurchargeRate || 0,
              invoiceSupplementalRate: rateObj?.invoiceSupplementalRate || 0,
              invoiceSupplementalFuelSurchargeRate: 0,
              invoiceCDLARate: selectedUnitInfo.invoiceCDLARate,
              invoiceLengthRate: selectedUnitInfo.invoiceLengthRate,
              invoiceSpecialRate: rateObj?.invoiceSpecialRate || 0,
              invoiceSpecialFuelSurchargeRate: rateObj?.invoiceSpecialFuelSurchargeRate || 0,
              invoiceAdditionalFuelSurchargeRate: rateObj?.invoiceAdditionalFuelSurchargeRate || 0,
              invoiceDriverRate: selectedUnitInfo.invoiceDriverRate,
              invoiceDriverFuelSurchargeRate: selectedUnitInfo.invoiceDriverFuelSurchargeRate,
              driverFuelSurchargeRate: rateObj?.driverFuelSurchargeRate || 0,
              invoiceAdditionalFlatRate: rateObj?.invoiceAdditionalFlatRate || 0,
              driverBaseRate: rateObj?.driverRateFromCustomerRate || 0,
              driverSupplementalRate: rateObj?.driverSupplementalRate || 0,
              driverSupplementalFuelSurchargeRate: rateObj?.driverSupplementalFuelSurchargeRate || 0,
              driverCDLARate: selectedUnitInfo?.driverCDLARate || 0,
              driverLengthRate: selectedUnitInfo.driverLengthRate,
              driverSpecialRate: rateObj?.driverSpecialRate || 0,
              driverSpecialFuelSurchargeRate: rateObj?.driverSpecialFuelSurchargeRate || 0,
              driverAdditionalFuelSurchargeRate: rateObj?.driverAdditionalFuelSurchargeRate || 0,
              driverRate: selectedUnitInfo.driverRate,
              longUnitRate: selectedUnitInfo.longUnitRate,
              halfTonAdjustmentRate: selectedUnitInfo.halfTonAdjustmentRate,
              driverAdditionalFlatRate: rateObj?.driverAdditionalFlatRate || 0,
              driverSafetyRate: rateObj?.driverSafetyRate || 0,
              driverGrossPay: driverGrossPay,
              driverFuelSurcharge: selectedUnitInfo.driverFuelSurcharge,
              userPK: loggedInUserData?.userPK,
              dealerCustomerFK,
              unitPkMonetraList: creditCardMap,
              reRouteMultiUnit: reRouteMultiUnitLoad,
              invoiceFlatRate: invoiceFlatRate > 0 ? parseInt(invoiceFlatRate) : parseInt(invoiceFlatRate2),
              driverFlatRate: driverFlatRate > 0 ? parseInt(driverFlatRate) : parseInt(driverFlatRate2),
              driverQual: 0,
              undispatchCity: selectedUnitInfo.pickupCity,
              undispatchStateCode: selectedUnitInfo.pickupStateCode,
              rerouteFlag: !unitLocation ? 1 : 0,
              unitLocationsXML: unitLocation,
              authorizedBy,
              driverSupplementalDescription: rateObj?.driverSupplementalDescription || "",
              invoiceRate: rateObj?.invoiceRateFromCustomerRate,
              sendDriverConfirmationEmail: sendDriverPaperwork,
              transIds: "",
            };
            RerouteService.saveRerouteProcess(unitRerouteSaveVO)
              .then((response) => {
                const { data } = response;
                const filteredData = data.filter((obj) => Object.keys(obj).length !== 0);
                setRerouteLoader(false);
                if (filteredData && filteredData.length > 0) {
                  if (filteredData[0]?.OperationStatus === false) {
                    setSaveFailed(true);
                    setSaveSuccess(false);
                  } else {
                    if (
                      (filteredData.length === 2 &&
                        filteredData[0].OperationStatus !== "" &&
                        filteredData[0].OperationStatus !== null &&
                        filteredData[0].OperationStatus === true) ||
                      (filteredData.length === 1 &&
                        filteredData[0].OperationStatus !== "" &&
                        filteredData[0].OperationStatus !== null &&
                        filteredData[0].OperationStatus === true)
                    ) {
                      setSaveSuccess(true);
                      setSaveFailed(false);
                    } else {
                      setSaveFailed(true);
                      setSaveSuccess(false);
                    }
                  }
                } else {
                  setSaveFailed(true);
                  setSaveSuccess(false);
                }
              })
              .catch((error) => {
                setRerouteLoader(false);
                setSaveFailed(true);
                setSaveSuccess(false);
              });
          }
        })
        .catch(() => {
          setRerouteLoader(false);
          setSaveFailed(true);
          setSaveSuccess(false);
        });
    } else if (
      selectedNewDeliveryMiscellneousDealerData ||
      (miscellaneousDelivery && rerouteType === "Delivery")
    ) {
      const miscellaneousDeliveryDealerData = {
        pickupMiscDealer: 0,
        Name:
          updatedDeliveryMiscDealerData?.name?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Name?.trim() ||
          "",
        Address1:
          updatedDeliveryMiscDealerData?.address1?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Address1?.trim() ||
          "",
        Address2:
          updatedDeliveryMiscDealerData?.address2?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Address2?.trim() ||
          "",
        City:
          updatedDeliveryMiscDealerData?.city?.trim() ||
          currentDeliveryMiscellaneousDealerData?.City?.trim() ||
          "",
        StateCode:
          updatedDeliveryMiscDealerData?.stateCode?.trim() ||
          currentDeliveryMiscellaneousDealerData?.StateCode?.trim() ||
          "",
        PostalCode:
          updatedDeliveryMiscDealerData?.postalCode?.trim() ||
          currentDeliveryMiscellaneousDealerData?.PostalCode?.trim() ||
          "",
        Canadian: updatedDeliveryMiscDealerData?.canadian
          ? 1
          : currentDeliveryMiscellaneousDealerData?.Canadian
            ? 1
            : 0,
        Phone:
          updatedDeliveryMiscDealerData?.phone?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Phone?.trim() ||
          "",
        Email:
          updatedDeliveryMiscDealerData?.email?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Email?.trim() ||
          "",
        DeliveryContact:
          updatedDeliveryMiscDealerData?.deliveryContact?.trim() ||
          currentDeliveryMiscellaneousDealerData?.DeliveryContact?.trim() ||
          "",
        DeliveryContactPhone:
          updatedDeliveryMiscDealerData?.deliveryContactPhone?.trim() ||
          currentDeliveryMiscellaneousDealerData?.DeliveryContactPhone?.trim() ||
          "",
        OpenSunday:
          typeof updatedDeliveryMiscDealerData?.openSunday === "boolean"
            ? updatedDeliveryMiscDealerData?.openSunday
            : currentDeliveryMiscellaneousDealerData?.OpenSunday
              ? 1
              : 0,
        OpenMonday:
          typeof updatedDeliveryMiscDealerData?.openMonday === "boolean"
            ? updatedDeliveryMiscDealerData?.openMonday
            : currentDeliveryMiscellaneousDealerData?.OpenMonday
              ? 1
              : 0,
        OpenTuesday:
          typeof updatedDeliveryMiscDealerData?.openTuesday === "boolean"
            ? updatedDeliveryMiscDealerData?.openTuesday
            : currentDeliveryMiscellaneousDealerData?.OpenTuesday
              ? 1
              : 0,
        OpenWednesday:
          typeof updatedDeliveryMiscDealerData?.openWednesday === "boolean"
            ? updatedDeliveryMiscDealerData?.openWednesday
            : currentDeliveryMiscellaneousDealerData?.OpenWednesday
              ? 1
              : 0,
        OpenThursday:
          typeof updatedDeliveryMiscDealerData?.openThursday === "boolean"
            ? updatedDeliveryMiscDealerData?.openThursday
            : currentDeliveryMiscellaneousDealerData?.OpenThursday
              ? 1
              : 0,
        OpenFriday:
          typeof updatedDeliveryMiscDealerData?.openFriday === "boolean"
            ? updatedDeliveryMiscDealerData?.openFriday
            : currentDeliveryMiscellaneousDealerData?.OpenFriday
              ? 1
              : 0,
        OpenSaturday:
          typeof updatedDeliveryMiscDealerData?.openSaturday === "boolean"
            ? updatedDeliveryMiscDealerData?.openSaturday
            : currentDeliveryMiscellaneousDealerData?.OpenSaturday
              ? 1
              : 0,
        Hours1:
          updatedDeliveryMiscDealerData?.hours1?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Hours1?.trim() ||
          "",
        Hours2:
          updatedDeliveryMiscDealerData?.hours2?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Hours2?.trim() ||
          "",
        Hours3:
          updatedDeliveryMiscDealerData?.hours3?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Hours3?.trim() ||
          "",
        Directions1:
          updatedDeliveryMiscDealerData?.directions1?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions1?.trim() ||
          "",
        Directions2:
          updatedDeliveryMiscDealerData?.directions2?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions2?.trim() ||
          "",
        Directions3:
          updatedDeliveryMiscDealerData?.directions3?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions3?.trim() ||
          "",
        Directions4:
          updatedDeliveryMiscDealerData?.directions4?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions4?.trim() ||
          "",
        Directions5:
          updatedDeliveryMiscDealerData?.directions5?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions5?.trim() ||
          "",
        Directions6:
          updatedDeliveryMiscDealerData?.directions6?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions6?.trim() ||
          "",
        Directions7:
          updatedDeliveryMiscDealerData?.directions7?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions7?.trim() ||
          "",
        WashInstructions1:
          updatedDeliveryMiscDealerData?.washInstructions1?.trim() ||
          currentDeliveryMiscellaneousDealerData?.WashInstructions1?.trim() ||
          "",
        WashInstructions2:
          updatedDeliveryMiscDealerData?.washInstructions2?.trim() ||
          currentDeliveryMiscellaneousDealerData?.WashInstructions2?.trim() ||
          "",
        WashInstructions3:
          updatedDeliveryMiscDealerData?.washInstructions3?.trim() ||
          currentDeliveryMiscellaneousDealerData?.WashInstructions3?.trim() ||
          "",
        WashInstructions4:
          updatedDeliveryMiscDealerData?.washInstructions4?.trim() ||
          currentDeliveryMiscellaneousDealerData?.WashInstructions4?.trim() ||
          "",
        WashInstructions5:
          updatedDeliveryMiscDealerData?.washInstructions5?.trim() ||
          currentDeliveryMiscellaneousDealerData?.WashInstructions5?.trim() ||
          "",
        OtherText1:
          updatedDeliveryMiscDealerData?.otherText1?.trim() ||
          currentDeliveryMiscellaneousDealerData?.OtherText1?.trim() ||
          "",
        OtherText2:
          updatedDeliveryMiscDealerData?.otherText2?.trim() ||
          currentDeliveryMiscellaneousDealerData?.OtherText2?.trim() ||
          "",
        OtherText3:
          updatedDeliveryMiscDealerData?.otherText3?.trim() ||
          currentDeliveryMiscellaneousDealerData?.OtherText3?.trim() ||
          "",
        BOLText1:
          updatedDeliveryMiscDealerData?.bolText1?.trim() ||
          currentDeliveryMiscellaneousDealerData?.BOLText1?.trim() ||
          "",
        BOLText2:
          updatedDeliveryMiscDealerData?.bolText2?.trim() ||
          currentDeliveryMiscellaneousDealerData?.BOLText2?.trim() ||
          "",
        BOLText3:
          updatedDeliveryMiscDealerData?.bolText3?.trim() ||
          currentDeliveryMiscellaneousDealerData?.BOLText3?.trim() ||
          "",
        BOLText4:
          updatedDeliveryMiscDealerData?.bolText4?.trim() ||
          currentDeliveryMiscellaneousDealerData?.BOLText4?.trim() ||
          "",
        BOLText5:
          updatedDeliveryMiscDealerData?.bolText5?.trim() ||
          currentDeliveryMiscellaneousDealerData?.BOLText5?.trim() ||
          "",
        BOLText6:
          updatedDeliveryMiscDealerData?.bolText6?.trim() ||
          currentDeliveryMiscellaneousDealerData?.BOLText6?.trim() ||
          "",
        BOLText7:
          updatedDeliveryMiscDealerData?.bolText7?.trim() ||
          currentDeliveryMiscellaneousDealerData?.BOLText7?.trim() ||
          "",
        Hours:
          updatedDeliveryMiscDealerData?.hours?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Hours?.trim() ||
          "",
        Directions:
          updatedDeliveryMiscDealerData?.directions?.trim() ||
          currentDeliveryMiscellaneousDealerData?.Directions?.trim() ||
          "",
        WashInstructions:
          updatedDeliveryMiscDealerData?.washInstructions?.trim() ||
          currentDeliveryMiscellaneousDealerData?.WashInstructions?.trim() ||
          "",
      };
      const xmlForSave = parse("MiscellaneousDealerDatatoSave", miscellaneousDeliveryDealerData).replace(
        /<\?xml.*?\?>\s*/i,
        ""
      );
      RerouteService.saveMiscDealer(xmlForSave, companyId)
        .then((response) => {
          const data = response.data;
          if (data) {
            let newUnitAddressPK = data[0].UnitAddressPK;
            dispatch(setNewDeliveryUnitAddressFK(data[0]));
            let driverGrossPay =
              driverFlatRate > 0
                ? parseInt(driverFlatRate)
                : driverFlatRate2 > 0
                  ? parseInt(driverFlatRate2)
                  : (rateObj?.driverRateFromCustomerRate || 0) +
                    (rateObj?.driverFuelSurchargeRate || 0) +
                    (rateObj?.driverSupplementalRate || 0); //+ rateObj.driverSupplementalFuelSurchargeRate?
            let driverQualVO = { totalAmount: driverGrossPay, miles: driverMiles, dispatchPK };
            let selectedPickupDealer = selectedNewPickupNormalDealerData || pickUpNormalDealerData;
            let selectedMiscellanousPickupDealer =
              selectedNewPickupMiscellneousDealerData || pickUpMiscellaneousDealerData;
            const unitRerouteSaveVO = {
              companyId,
              companyName:
                delaySelectedCompanyName || selectedUnitInfo.companyName || currentCompany?.name || null,
              dispatchPK,
              unitpk: selectedUnitInfo.unitPK,
              driverpk: driverFK ? parseInt(driverFK) : null,
              notes,
              oldPickupDealerFK: selectedUnitInfo.pickupDealerFK,
              newPickupDealerFK: selectedPickupDealer?.DealerPK || null,
              oldPickupUnitAddressFK: selectedUnitInfo.pickupUnitAddressFK,
              newPickupUnitAddressFK: selectedMiscellanousPickupDealer?.unitAddressPK || null,
              oldDeliveryDealerFK: selectedUnitInfo.deliveryDealerFK,
              oldDeliveryUnitAddressFK: selectedUnitInfo.deliveryUnitAddressFK,
              newDeliveryDealerFK: null,
              newDeliveryUnitAddressFK: newUnitAddressPK || null,
              pickupcustomerplantfk: selectedUnitInfo.pickupCustomerPlantFK,
              deliverycustomerplantfk: selectedUnitInfo.deliveryCustomerPlantFK,
              oldInvoiceMiles: selectedUnitInfo.invoiceMiles,
              oldDriverMiles: selectedUnitInfo.driverMiles,
              invoiceMiles: parseInt(invoiceMiles),
              driverMiles: parseInt(driverMiles),
              dealerReroute: requestedBy === "Dealer" ? true : false,
              invoiceFuelSurchargeRate: rateObj?.invoiceFuelSurchargeRate || 0,
              invoiceSupplementalRate: rateObj?.invoiceSupplementalRate || 0,
              invoiceSupplementalFuelSurchargeRate: 0,
              invoiceCDLARate: selectedUnitInfo.invoiceCDLARate,
              invoiceLengthRate: selectedUnitInfo.invoiceLengthRate,
              invoiceSpecialRate: rateObj?.invoiceSpecialRate || 0,
              invoiceSpecialFuelSurchargeRate: rateObj?.invoiceSpecialFuelSurchargeRate || 0,
              invoiceAdditionalFuelSurchargeRate: rateObj?.invoiceAdditionalFuelSurchargeRate || 0,
              invoiceDriverRate: selectedUnitInfo.invoiceDriverRate,
              invoiceDriverFuelSurchargeRate: selectedUnitInfo.invoiceDriverFuelSurchargeRate,
              driverFuelSurchargeRate: rateObj?.driverFuelSurchargeRate || 0,
              invoiceAdditionalFlatRate: rateObj?.invoiceAdditionalFlatRate || 0,
              driverBaseRate: rateObj?.driverRateFromCustomerRate || 0,
              driverSupplementalRate: rateObj?.driverSupplementalRate || 0,
              driverSupplementalFuelSurchargeRate: rateObj?.driverSupplementalFuelSurchargeRate || 0,
              driverCDLARate: selectedUnitInfo.driverCDLARate,
              driverLengthRate: selectedUnitInfo.driverLengthRate,
              driverSpecialRate: rateObj?.driverSpecialRate || 0,
              driverSpecialFuelSurchargeRate: rateObj?.driverSpecialFuelSurchargeRate || 0,
              driverAdditionalFuelSurchargeRate: rateObj?.driverAdditionalFuelSurchargeRate || 0,
              driverRate: selectedUnitInfo.driverRate,
              longUnitRate: selectedUnitInfo.longUnitRate,
              halfTonAdjustmentRate: selectedUnitInfo.halfTonAdjustmentRate,
              driverAdditionalFlatRate: rateObj?.driverAdditionalFlatRate || 0,
              driverSafetyRate: rateObj?.driverSafetyRate || 0,
              driverGrossPay: driverGrossPay,
              driverFuelSurcharge: selectedUnitInfo.driverFuelSurcharge,
              userPK: loggedInUserData?.userPK,
              dealerCustomerFK,
              unitPkMonetraList: creditCardMap,
              reRouteMultiUnit: reRouteMultiUnitLoad,
              invoiceFlatRate: invoiceFlatRate > 0 ? parseInt(invoiceFlatRate) : parseInt(invoiceFlatRate2),
              driverFlatRate: driverFlatRate > 0 ? parseInt(driverFlatRate) : parseInt(driverFlatRate2),
              driverQual: 0,
              undispatchCity: selectedUnitInfo.pickupCity,
              undispatchStateCode: selectedUnitInfo.pickupStateCode,
              rerouteFlag: !unitLocation ? 1 : 0,
              unitLocationsXML: unitLocation,
              authorizedBy,
              driverSupplementalDescription: rateObj?.driverSupplementalDescription || "",
              invoiceRate: rateObj?.invoiceRateFromCustomerRate,
              sendDriverConfirmationEmail: sendDriverPaperwork,
              transIds: "",
            };
            RerouteService.saveRerouteProcess(unitRerouteSaveVO)
              .then((response) => {
                const { data } = response;
                const filteredData = data.filter((obj) => Object.keys(obj).length !== 0);

                setRerouteLoader(false);
                if (filteredData && filteredData.length > 0) {
                  if (filteredData[0]?.OperationStatus === false) {
                    setSaveFailed(true);
                    setSaveSuccess(false);
                  } else {
                    if (
                      (filteredData.length === 2 &&
                        filteredData[0].OperationStatus !== "" &&
                        filteredData[0].OperationStatus !== null &&
                        filteredData[0].OperationStatus === true) ||
                      (filteredData.length === 1 &&
                        filteredData[0].OperationStatus !== "" &&
                        filteredData[0].OperationStatus !== null &&
                        filteredData[0].OperationStatus === true)
                    ) {
                      setSaveSuccess(true);
                      setSaveFailed(false);
                    } else {
                      setSaveFailed(true);
                      setSaveSuccess(false);
                    }
                  }
                } else {
                  setSaveFailed(true);
                  setSaveSuccess(false);
                }
              })
              .catch((error) => {
                setRerouteLoader(false);
                setSaveFailed(true);
                setSaveSuccess(false);
              });
          }
        })
        .catch(() => {
          setRerouteLoader(false);
          setSaveFailed(true);
          setSaveSuccess(false);
        });
    } else {
      let driverGrossPay =
        driverFlatRate > 0
          ? parseInt(driverFlatRate)
          : driverFlatRate2 > 0
            ? parseInt(driverFlatRate2)
            : (rateObj?.driverRateFromCustomerRate || 0) +
              (rateObj?.driverFuelSurchargeRate || 0) +
              (rateObj?.driverSupplementalRate || 0); //+ rateObj.driverSupplementalFuelSurchargeRate?
      let driverQualVO = { totalAmount: driverGrossPay, miles: driverMiles, dispatchPK };
      let selectedPickupDealer = selectedNewPickupNormalDealerData || pickUpNormalDealerData;
      let selectedDeliveryDealer = selectedNewDeliveryNormalDealerData || currentDeliveryNormalDealerData;
      let selectedMiscellanousPickupDealer =
        selectedNewPickupMiscellneousDealerData || pickUpMiscellaneousDealerData;
      let selectedMiscellanousDeliveryDealer =
        selectedNewDeliveryMiscellneousDealerData || currentDeliveryMiscellaneousDealerData;
      const unitRerouteSaveVO = {
        companyId,
        companyName: delaySelectedCompanyName || selectedUnitInfo.companyName || currentCompany?.name || null,
        dispatchPK,
        unitpk: selectedUnitInfo.unitPK,
        driverpk: driverFK ? parseInt(driverFK) : null,
        notes,
        oldPickupDealerFK: selectedUnitInfo?.pickupDealerFK || null,
        newPickupDealerFK: selectedPickupDealer?.DealerPK || null,
        oldPickupUnitAddressFK: selectedUnitInfo.pickupUnitAddressFK,
        newPickupUnitAddressFK: selectedMiscellanousPickupDealer?.unitAddressPK || null,
        oldDeliveryDealerFK: selectedUnitInfo.deliveryDealerFK,
        oldDeliveryUnitAddressFK: selectedUnitInfo.deliveryUnitAddressFK,
        newDeliveryDealerFK: selectedDeliveryDealer?.DealerPK || null,
        newDeliveryUnitAddressFK: selectedMiscellanousDeliveryDealer?.unitAddressPK || null,
        pickupcustomerplantfk: selectedUnitInfo.pickupCustomerPlantFK,
        deliverycustomerplantfk: selectedUnitInfo.deliveryCustomerPlantFK,
        oldInvoiceMiles: selectedUnitInfo.invoiceMiles,
        oldDriverMiles: selectedUnitInfo.driverMiles,
        invoiceMiles: parseInt(invoiceMiles),
        driverMiles: parseInt(driverMiles),
        dealerReroute: requestedBy === "Dealer" ? true : false,
        invoiceFuelSurchargeRate: rateObj?.invoiceFuelSurchargeRate || 0,
        invoiceSupplementalRate: rateObj?.invoiceSupplementalRate || 0,
        invoiceSupplementalFuelSurchargeRate: 0,
        invoiceCDLARate: selectedUnitInfo.invoiceCDLARate,
        invoiceLengthRate: selectedUnitInfo.invoiceLengthRate,
        invoiceSpecialRate: rateObj?.invoiceSpecialRate || 0,
        invoiceSpecialFuelSurchargeRate: rateObj?.invoiceSpecialFuelSurchargeRate || 0,
        invoiceAdditionalFuelSurchargeRate: rateObj?.invoiceAdditionalFuelSurchargeRate || 0,
        invoiceDriverRate: selectedUnitInfo.invoiceDriverRate,
        invoiceDriverFuelSurchargeRate: selectedUnitInfo.invoiceDriverFuelSurchargeRate,
        driverFuelSurchargeRate: rateObj?.driverFuelSurchargeRate || 0,
        invoiceAdditionalFlatRate: rateObj?.invoiceAdditionalFlatRate || 0,
        driverBaseRate: rateObj?.driverRateFromCustomerRate || 0,
        driverSupplementalRate: rateObj?.driverSupplementalRate || 0,
        driverSupplementalFuelSurchargeRate: rateObj?.driverSupplementalFuelSurchargeRate || 0,
        driverCDLARate: selectedUnitInfo.driverCDLARate,
        driverLengthRate: selectedUnitInfo.driverLengthRate,
        driverSpecialRate: rateObj?.driverSpecialRate || 0,
        driverSpecialFuelSurchargeRate: rateObj?.driverSpecialFuelSurchargeRate || 0,
        driverAdditionalFuelSurchargeRate: rateObj?.driverAdditionalFuelSurchargeRate || 0,
        driverRate: selectedUnitInfo.driverRate,
        longUnitRate: selectedUnitInfo.longUnitRate,
        halfTonAdjustmentRate: selectedUnitInfo.halfTonAdjustmentRate,
        driverAdditionalFlatRate: rateObj?.driverAdditionalFlatRate || 0,
        driverSafetyRate: rateObj?.driverSafetyRate || 0,
        driverGrossPay: driverGrossPay,
        driverFuelSurcharge: selectedUnitInfo.driverFuelSurcharge,
        userPK: loggedInUserData?.userPK,
        dealerCustomerFK,
        unitPkMonetraList: creditCardMap,
        reRouteMultiUnit: reRouteMultiUnitLoad,
        invoiceFlatRate: invoiceFlatRate > 0 ? parseInt(invoiceFlatRate) : parseInt(invoiceFlatRate2),
        driverFlatRate: driverFlatRate > 0 ? parseInt(driverFlatRate) : parseInt(driverFlatRate2),
        driverQual: 0,
        undispatchCity: selectedUnitInfo.pickupCity,
        undispatchStateCode: selectedUnitInfo.pickupStateCode,
        rerouteFlag: !unitLocation ? 1 : 0,
        unitLocationsXML: unitLocation,
        authorizedBy,
        driverSupplementalDescription: rateObj?.driverSupplementalDescription || "",
        invoiceRate: rateObj?.invoiceRateFromCustomerRate,
        sendDriverConfirmationEmail: sendDriverPaperwork,
        transIds: "",
      };
      RerouteService.saveRerouteProcess(unitRerouteSaveVO)
        .then((response) => {
          const { data } = response;
          const filteredData = data.filter((obj) => Object.keys(obj).length !== 0);
          setRerouteLoader(false);

          if (filteredData[0]?.OperationStatus === false) {
            setSaveFailed(true);
            setSaveSuccess(false);
          } else {
            setSaveSuccess(true);
            setSaveFailed(false);
          }
        })
        .catch((error) => {
          setRerouteLoader(false);
          setSaveFailed(true);
          setSaveSuccess(false);
        });
    }
  };
  //Edit Master Express - Start
  const unAssignedDriverUnitSaveEditMasterExpressVO = {
    unitPK: unitFK,
    dispatchPK: dispatchPK,
    pickupDealerFK: selectedNewPickupNormalDealerData?.dealerPK,
    pickupUnitAddressesVO: selectedNewPickupMiscellneousDealerData || null,
    deliveryDealerFK: selectedNewDeliveryNormalDealerData.dealerPK,
    deliveryUnitAddressesVO: selectedNewDeliveryMiscellneousDealerData || null,
  };

  const handleUnassignedDriverUnitSave = () => {
    setRerouteLoader(true);
    RerouteService.unassignedDriverUnitSave(unAssignedDriverUnitSaveEditMasterExpressVO)
      .then((respose) => {
        setRerouteLoader(false);
        setSaveSuccess(true);
        setSaveFailed(false);
      })
      .catch((error) => {
        setRerouteLoader(false);
        setSaveFailed(true);
        setSaveSuccess(false);
      });
  };

  //Edit Master Express - End

  const handleError = () => {
    setSaveFailed(false);
    dispatch(setSendDriverPaperwork(false));
    dispatch(setSelectedUnitInfo(null));
    dispatch(setInitialUnitCardDetails([]));
    if (rerouteSource === "EditMaster") {
      navigate("/edit-master-express-edit-page/" + unitFK + "/" + 0);
    } else if (rerouteSource === "Delay") {
      navigate(`/delay-processing/delayed-details/${company}/${unitFK}/${driverFK}/${delayUnit}`);
    } else {
      navigate(`/reroutes-unit-selection/${driverFK}`);
      setSaveSuccess(false);
    }

    setTimeout(() => {
      dispatch(resetUnitDetails());
      localStorage.removeItem("delayUnit");
      localStorage.removeItem("company");
      localStorage.removeItem("unitfk");
    }, 0);
  };

  const handleNextButtonOnClick = () => {
    switch (currentURL) {
      case `/reroutes-unit-selection/${driverFK}`:
        dispatch(setNavigatedFromRerouteBrowse(true));
        navigate(`/reroutes-detail-screen`);
        break;

      case `/reroutes-detail-screen`:
        if (rerouteType === "Pickup") {
          navigate(`/reroute-pickup-location-normal-dealer`);
        } else {
          navigate(`/reroute-delivery-location-normal-dealer`);
        }
        break;

      case `/reroute-pickup-location-normal-dealer`:
        dispatch(setPreviousURL(`/reroute-pickup-location-normal-dealer`));
        if (miscellaneousPickup === false) {
          navigate(`/reroutes-confirmation`);
        } else {
          navigate(`/reroute-pickup-location-miscellaneous-dealer`);
        }
        break;

      case `/reroute-pickup-location-miscellaneous-dealer`:
        dispatch(setPreviousURL(`/reroute-pickup-location-miscellaneous-dealer`));
        navigate(`/reroutes-confirmation`);
        break;

      case `/reroute-delivery-location-normal-dealer`:
        dispatch(setPreviousURL(`/reroute-delivery-location-normal-dealer`));
        if (miscellaneousDelivery === false) {
          if (selectedUnitInfo.pickedUp) {
            navigate(`/reroute-location`);
          } else {
            navigate(`/reroutes-confirmation`);
          }
        } else {
          navigate(`/reroute-delivery-location-miscellaneous-dealer`);
        }
        break;

      case `/reroute-delivery-location-miscellaneous-dealer`:
        dispatch(setPreviousURL(`/reroute-delivery-location-miscellaneous-dealer`));
        if (selectedUnitInfo.pickedUp) {
          navigate(`/reroute-location`);
        } else {
          navigate(`/reroutes-confirmation`);
        }
        break;
      case `/reroutes-confirmation`:
        dispatch(setPreviousURL(`/reroutes-confirmation`));
        handleRerouteSave();
        break;

      default:
        navigate("/");
        break;
    }
  };

  //Onclick function for Cancel Button
  const handleCancelOnClick = () => {
    dispatch(setSendDriverPaperwork(false));
    dispatch(setSelectedUnitInfo(null));
    dispatch(setInitialUnitCardDetails([]));
    if (rerouteSource === "EditMaster") {
      navigate("/edit-master-express-edit-page/" + unitFK + "/" + 0);
    } else if (rerouteSource === "Delay") {
      navigate(`/delay-processing/delayed-details/${company}/${unitFK}/${driverFK}/${delayUnit}`);
    } else if (rerouteSource === "Operations") {
      navigate(`/reroutes-unit-selection/${driverFK}`);
    } else {
      navigate(`/reroutes-unit-selection/${driverFK}`);
    }
    setCancelShow(false);
    toast.success("Changes Cancelled");

    setTimeout(() => {
      dispatch(resetUnitDetails());
      localStorage.removeItem("delayUnit");
      localStorage.removeItem("company");
      localStorage.removeItem("unitfk");
    }, 0);
  };

  //handle Next Button On Click
  // Screen Navigations based on current url
  const handleBackButtonOnClick = () => {
    dispatch(setSendDriverPaperwork(false));
    switch (currentURL) {
      case `/reroute-pickup-location-normal-dealer`:
        dispatch(setDealerCustomerFK(dealerCustomerFK));
        dispatch(setDealerCustomerName(dealerCustomerName));
        navigate(`/reroutes-detail-screen`);
        break;

      case `/reroute-pickup-location-miscellaneous-dealer`:
        dispatch(setSelectedNewPickupMiscellneousDealerData(""));
        dispatch(setMiscPickupID(""));
        dispatch(setMiscDeliveryID(""));
        navigate(`/reroute-pickup-location-normal-dealer`);
        break;

      case `/reroute-delivery-location-normal-dealer`:
        if (rerouteSource === "Delay") {
          dispatch(resetUnitDetails());
          navigate(`/delay-processing/delayed-details/${company}/${unitFK}/${driverFK}/${delayUnit}`);
          localStorage.removeItem("RerouteSource");
        } else {
          dispatch(setDealerCustomerFK(dealerCustomerFK));
          dispatch(setDealerCustomerName(dealerCustomerName));
          navigate(`/reroutes-detail-screen`);
        }
        break;

      case `/reroute-delivery-location-miscellaneous-dealer`:
        dispatch(setSelectedNewDeliveryMiscellneousDealerData(""));
        dispatch(setMiscPickupID(""));
        dispatch(setMiscDeliveryID(""));
        navigate(`/reroute-delivery-location-normal-dealer`);
        break;

      case `/reroutes-confirmation`:
        navigate(previousURL);
        break;

      default:
        navigate("/");
        break;
    }
  };

  const handleSuccess = () => {
    dispatch(setSendDriverPaperwork(false));
    dispatch(setSelectedUnitInfo(null));
    dispatch(setInitialUnitCardDetails([]));
    if (rerouteSource === "EditMaster") {
      navigate("/edit-master-express-edit-page/" + unitFK + "/" + 0);
    } else if (rerouteSource === "Delay") {
      navigate(`/delay-processing/delayed-details/${company}/${unitFK}/${driverFK}/${delayUnit}`);
    } else {
      navigate(`/reroutes-unit-selection/${driverFK}`);
      setSaveSuccess(false);
    }

    setTimeout(() => {
      dispatch(resetUnitDetails());
      localStorage.removeItem("delayUnit");
      localStorage.removeItem("company");
      localStorage.removeItem("unitfk");
    }, 0);
  };

  useEffect(() => {
    if (!dispatchPK && !fromEditMasterExpress) {
      if (rerouteSource === "EditMaster") {
        dispatch(resetUnitDetails());
        navigate("/edit-master-express-edit-page/" + unitFK + "/" + 0);
        localStorage.removeItem("driverId");
        localStorage.removeItem("RerouteSource");
      } else if (rerouteSource === "Delay") {
        dispatch(resetUnitDetails());
        navigate(`/delay-processing/delayed-details/${company}/${unitFK}/${driverFK}/${delayUnit}`);
        localStorage.removeItem("driverId");
        localStorage.removeItem("RerouteSource");
      } else if (rerouteSource === "Operations") {
        // Commenitng out for close button issue bugfix
        // dispatch(resetUnitDetails());
        // navigate(`/delay-processing/delayed-details/${company}/${unitFK}/${driverFK}/${delayUnit}`);
        // localStorage.removeItem("driverId")
        // localStorage.removeItem("RerouteSource");
      } else {
        // dispatch(resetUnitDetails());
        // navigate(`/reroutes-unit-selection/${driverFK}`);
        // localStorage.removeItem("driverId")
        // setSaveSuccess(false);
        // localStorage.removeItem("RerouteSource");
      }
      // localStorage.removeItem("driverId");
      localStorage.removeItem("delayUnit");
      localStorage.removeItem("company");
      // Commenting out for close button issue bugfix
      // localStorage.removeItem("RerouteSource");
      localStorage.removeItem("unitfk");
      // localStorage.removeItem("driverId");
    }
  }, [dispatchPK]);

  useEffect(() => {
    const company = getCurrentCompany();
    const companyID = companyId || company?.companyPK;
    if (!(unitFK || selectedUnitInfo?.unitPK || !companyID)) return;
    if (!initialUnitCardDetails || initialUnitCardDetails?.length === 0) {
      RerouteService.getReturnCreditCardData(unitFK || selectedUnitInfo?.unitPK || 0, companyID || 0)
        .then(({ data }) => {
          const updatedData = data?.map((unit) => ({
            ...unit,
            remainingAmount: unit?.remainingAmount || unit?.incomingAmount || 0,
            authorizedCards: unit?.authorizedCards || [],
          }));

          dispatch(setInitialUnitCardDetails(updatedData));

          const filtered = updatedData.filter(
            (item) =>
              item.unitpk === (Number(unitFK) || selectedUnitInfo?.unitPK || 0) || reRouteMultiUnitLoad
          );
          dispatch(setUnitCardDetails(filtered));
          const totalAmount = updatedData?.reduce(
            (sum, unit) => sum + Number(currentRate - unit?.fodInvoiceAmount || 0),
            0
          );
          setTotalReaminingAmount(totalAmount);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [selectedUnitInfo?.unitPK]);

  useEffect(() => {
    if (!initailLoad.current) {
      initailLoad.current = true;
      return;
    }
    const totalAmount = initialUnitCardDetails?.reduce(
      (sum, unit) => sum + Number(currentRate - unit?.fodInvoiceAmount || 0),
      0
    );
    setTotalReaminingAmount(totalAmount);
    const filtered = initialUnitCardDetails.filter(
      (item) => item.unitpk === (Number(unitFK) || selectedUnitInfo?.unitPK || 0) || reRouteMultiUnitLoad
    );
    dispatch(setUnitCardDetails(filtered));
  }, [reRouteMultiUnitLoad, currentRate]);

  const showNextButton =
    currentURL === `/reroutes-unit-selection/${driverFK}` ||
    currentURL === `/reroutes-detail-screen` ||
    currentURL === `/reroute-pickup-location-normal-dealer` ||
    currentURL === `/reroute-delivery-location-normal-dealer` ||
    currentURL === `/reroute-pickup-location-miscellaneous-dealer` ||
    currentURL === `/reroute-delivery-location-miscellaneous-dealer` ||
    currentURL === `/reroutes-confirmation`;

  const isNextButtonDisabled =
    (currentURL === `/reroutes-unit-selection/${driverFK}` && unitFK === "") ||
    (currentURL === `/reroutes-detail-screen` &&
      ((requestedBy === "Dealer" && (dealerCustomerFK === null || authorizedBy === "")) ||
        (requestedBy !== "Dealer" && (authorizedBy === "" || dealerCustomerFK !== null)))) ||
    (currentURL === `/reroute-pickup-location-normal-dealer` &&
      !pickupNormalDealerFK &&
      !miscellaneousPickup) ||
    (currentURL === `/reroute-pickup-location-miscellaneous-dealer` && !isMiscPickupDealerValid) ||
    (currentURL === `/reroute-delivery-location-normal-dealer` &&
      !deliveryNormalDealerFK &&
      !miscellaneousDelivery) ||
    (currentURL === `/reroute-delivery-location-miscellaneous-dealer` && !isMiscDeliveryDealerValid) ||
    (currentURL === `/reroutes-confirmation` &&
      ((unitCardDetails && unitCardDetails?.length > 0 && totalReaminingAmount !== 0) ||
        disableRerouteButton)) ||
    (currentURL === `/reroutes-unit-selection/${driverFK}` && !dispatchPK);

  return (
    <div className="d-flex align-items-center justify-content-between p-t-10 p-b-5 flex-wrap border-top border-dark border-2">
      <div className="d-flex align-items-center flex-wrap"></div>

      <div className="d-flex align-items-center flex-wrap">
        {/* Credit Card */}
        {currentURL === `/reroutes-confirmation` ? (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={false}
            onClick={() => setShowCreditCard(true)}
            disabled={!(unitCardDetails && unitCardDetails?.length > 0)}
          >
            Credit Card
          </button>
        ) : (
          ""
        )}
        {/* Reroute or Next Button*/}
        {showNextButton && (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type=""
            onClick={handleNextButtonOnClick}
            disabled={isNextButtonDisabled}
          >
            {currentURL === `/reroutes-confirmation` ? "Reroute" : "Next"}
          </button>
        )}

        {/* Back */}
        {currentURL === `/reroute-pickup-location-normal-dealer` ||
        currentURL === `/reroute-delivery-location-normal-dealer` ||
        currentURL === `/reroute-pickup-location-miscellaneous-dealer` ||
        currentURL === `/reroute-delivery-location-miscellaneous-dealer` ||
        currentURL === `/reroutes-confirmation` ? (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            onClick={handleBackButtonOnClick}
            disabled={""}
          >
            Back
          </button>
        ) : (
          ""
        )}

        {/* Cancel */}
        {currentURL === `/reroutes-detail-screen` ||
        currentURL === `/reroute-pickup-location-normal-dealer` ||
        currentURL === `/reroute-delivery-location-normal-dealer` ||
        currentURL === `/reroute-pickup-location-miscellaneous-dealer` ||
        currentURL === `/reroute-delivery-location-miscellaneous-dealer` ||
        currentURL === `/reroutes-confirmation` ? (
          <button
            className="btn btn-secondary btn-medium-with btn-sm m-l-5 m-r-5 m-b-5"
            type="button"
            hidden={false}
            onClick={() => {
              if (location.pathname === `/reroutes-confirmation`) {
                setCancelShow(true);
                dispatch(setMiscPickupID(""));
                dispatch(setMiscDeliveryID(""));
              } else {
                handleCancelOnClick();
              }
            }}
          >
            Cancel
          </button>
        ) : (
          ""
        )}
        {rerouteLoader === true && <LoadingIcon />}
        <WarningModalPopUp
          show={cancelShow}
          onHide={() => {
            setCancelShow(false);
          }}
          title={"Cancel Unit's Reroute Changes"}
          body={"Please confirm you want to cancel your changes."}
          showYes={true}
          handleYES={handleCancelOnClick}
          showNo={true}
          handleNO={() => {
            setCancelShow(false);
          }}
        />
        <ModalComponent
          show={saveSuccess}
          onHide={handleSuccess}
          title={"Success"}
          body={"Unit is rerouted successfully"}
          okayButton
          handleOK={handleSuccess}
        />

        <ModalComponent
          show={saveFailed}
          onHide={handleError}
          title={"Error"}
          body={"Unit reroute failed"}
          okayButton
          showError
          handleOK={handleError}
        />

        <ReRouteCreditCardTemplate
          show={showCreditCard}
          onHide={() => setShowCreditCard(false)}
          amountTitle={"Reroute Amount"}
          source={"Reroute"}
          dispatched={true}
          programName={"Reroute"}
          setTotalRemainingAmount={setTotalReaminingAmount}
          unitCardDetails={unitCardDetails}
          setUnitCardDetails={(data) => {
            dispatch(setUnitCardDetails(data));
          }}
          rate={currentRate}
        />
      </div>
    </div>
  );
}

export default RerouteFooter;
