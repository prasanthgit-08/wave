import React, { Fragment, Component, Suspense, lazy } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Navbar from "./componenets/header/Navbar";
import LoadingIcon from "./componenets/common/LoadingIcon";
import NotFound from "./componenets/common/NotFound";
import { MainRoutes } from "./routes";
import Loading from "./components/common/loading";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";
import AddComments from "./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/AddComments/AddComments";

const Login = lazy(() => import("./componenets/Login/Login"));
const ForcePasswordChange = lazy(() => import("./componenets/Login/ForcePasswordChange"));

const DealersMainPage = lazy(
  () => import("./componenets/dealer/DealerMaintenance/dealer-listing/DealersMainPage")
);
const AddFormTemplate = lazy(
  () => import("./componenets/dealer/DealerMaintenance/edit-dealers/AddFormTemplate")
);
const ContactsPage = lazy(() => import("./componenets/dealer/DealerMaintenance/edit-dealers/ContactsPage"));
const EmailsPage = lazy(() => import("./componenets/dealer/DealerMaintenance/edit-dealers/EmailsPage"));
const EditMasterUnitSelection = lazy(
  () => import("./componenets/EditMaster/UnitSelection/EditMasterUnitSelection")
);
// const OrderEntryTemplate = lazy(
//   () => import("./componenets/OrderEntry/OrderEntryProcess/edit-order-entry/OrderEntryTemplate")
// );
const BulkBrowsePage = lazy(() => import("./componenets/customer/BulkInvoices/BulkBrowsePage"));
const PrinterAddFormTemplate = lazy(
  () => import("./componenets/printer/edit_printer/PrinterAddFormTemplate")
);
const PrinterListingMainPage = lazy(
  () => import("./componenets/printer/printer_listing/PrinterListingMainPage")
);
const BulkFormTemplate = lazy(
  () => import("./componenets/customer/BulkInvoices/EditBulkInvoices/BulkFormTemplate")
);
const CCMainPage = lazy(
  () => import("./componenets/customer/customerContacts/customerContactsListing/CCMainPage")
);
const AddCustomerContacts = lazy(
  () => import("./componenets/customer/customerContacts/editCustomerContacts/AddCustomerContacts")
);
const CustomerDelayBrowse = lazy(
  () => import("./componenets/customer/CustomerDelayResources/CustomerDelayBrowse")
);
const CustomerDelayTemplate = lazy(
  () => import("./componenets/customer/CustomerDelayResources/AddCustomerDelay/CustomerDelayTemplate")
);
const BrowsePage = lazy(() => import("./componenets/customer/customerEmialMaintenance/BrowsePage"));
const CustomerEmailFromTamplate = lazy(
  () => import("./componenets/customer/customerEmialMaintenance/FormPage/CustomerEmailFromTamplate")
);
const CustomerMainPage = lazy(
  () => import("./componenets/customer/customer maintanance/browse page/CustomerMainPage")
);
const CustomerMaintananceFormTemplate = lazy(
  () => import("./componenets/customer/customer maintanance/edit page/CustomerMaintananceFormTemplate")
);
const CustomerDPURestrictions = lazy(
  () => import("./componenets/customer/CustomerDPURestrictions/browse-page/CustomerDPURestrictions")
);
const CustomerDPURestrictionsForm = lazy(
  () => import("./componenets/customer/CustomerDPURestrictions/edit-page/CustomerDPURestrictionsForm")
);
const COBMainPage = lazy(() => import("./componenets/customer/customerOpenBalance/COB_Listing/COBMainPage"));
const COBViewPage = lazy(() => import("./componenets/customer/customerOpenBalance/COB_Edit/COBViewPage"));
const CustomerOrderUsers = lazy(
  () => import("./componenets/customer/CustomerOrderUsers/browse-page/CustomerOrderUsers")
);
const CustomerOrderUsersForm = lazy(
  () => import("./componenets/customer/CustomerOrderUsers/edit-page/CustomerOrderUsersForm")
);
const CustomerCreditCardForm = lazy(
  () => import("./componenets/customer/CustomerCreditCard/CustomerCreditCard_Edit/CustomerCreditCardForm")
);
const CustomerCreditCardMainPage = lazy(
  () => import("./componenets/customer/CustomerCreditCard/CustomerCreditCard_List/CustomerCreditCardMainPage")
);
const AlternateContactMainPage = lazy(
  () =>
    import("./componenets/customer/AlternateContactsMaintenance/AlternateContact_List/AlternateContactMainPage")
);
const AlternateContactForm = lazy(
  () =>
    import("./componenets/customer/AlternateContactsMaintenance/AlternateContact_Edit/AlternateContactForm")
);

const CustomerPlantFormTemplate = lazy(
  () => import("./componenets/Plant/CustomerPlantMaintenance/edit-page/CustomerPlantFormTemplate")
);
const CustomerPlantMainPage = lazy(
  () => import("./componenets/Plant/CustomerPlantMaintenance/browse-page/CustomerPlantMainPage")
);
const MainPageCustomer = lazy(
  () => import("./componenets/Plant/CustomerPlantMaintenance/customer-plant-browse-page/MainPageCustomer")
);
const YardMainPage = lazy(() => import("./componenets/yardMaintenance/yard_listing/YardMainPage"));
const YardFormTemplate = lazy(() => import("./componenets/yardMaintenance/edit_yard/YardFormTemplate"));
const ShuttleCitysMainPage = lazy(
  () => import("./componenets/shuttle/ShuttleCitys/ShuttleCitysBrowse/ShuttleCitysMainPage")
);
const ShuttleCitysFormTemplate = lazy(
  () => import("./componenets/shuttle/ShuttleCitys/ShuttleCitysEdit/ShuttleCitysFormTemplate")
);
const PlantGroupMainPage = lazy(
  () => import("./componenets/Plant/CustomerPlantGroupsMaintenance/browse-page/PlantGroupMainPage")
);
const PlantGroupForm = lazy(
  () => import("./componenets/Plant/CustomerPlantGroupsMaintenance/edit-page/PlantGroupForm")
);
const CityYardMainPage = lazy(
  () => import("./componenets/shuttle/CityToYard/CityToYardListing/CityYardMainPage")
);
const CityYardTemplate = lazy(
  () => import("./componenets/shuttle/CityToYard/CityToYardEdit/CityYardTemplate")
);
const HorizonTransport = lazy(() => import("./componenets/HorizonTransport/HorizonTransport"));
const PlantToPlantTransferMainPage = lazy(
  () =>
    import("./componenets/shuttle/PlantToPlantTransfer/PlantToPlantTransferBrowse/PlantToPlantTransferMainPage")
);
const PlantToPlantTransferCustomerMainPage = lazy(
  () =>
    import("./componenets/shuttle/PlantToPlantTransfer/PlantToPlantTransferCustomer/PlantToPlantTransferCustomerMainPage")
);
const PlantToPlantTransferFormTemplate = lazy(
  () =>
    import("./componenets/shuttle/PlantToPlantTransfer/PlantToPlantTransferEdit/PlantToPlantTransferFormTemplate")
);
const YardToYardMainPage = lazy(
  () => import("./componenets/shuttle/YardToYardShuttle/YardToYardBrowse/YardToYardMainPage")
);
const YardToYardFormTemplate = lazy(
  () => import("./componenets/shuttle/YardToYardShuttle/YardToYardEdit/YardToYardFormTemplate")
);
const UserMaintenanceMainPage = lazy(
  () => import("./componenets/System/User/UserMaintenance/user_listing/UserMaintenanceMainPage")
);
const UserMaintenanceFormTemplate = lazy(
  () => import("./componenets/System/User/UserMaintenance/UserEdit/UserMaintenanceFormTemplate")
);
const DealerContactMainPage = lazy(
  () => import("./componenets/dealer/DealerContact/DealerContactBrowse/DealerContactMainPage")
);
const DealerContactTemplate = lazy(
  () => import("./componenets/dealer/DealerContact/DealerContactEditPage/DealerContactTemplate")
);
const EquipmentListingMainPage = lazy(
  () => import("./componenets/equipment/equipment_listing/EquipmentListingMainPage")
);
const EquipmentFormTemplate = lazy(
  () => import("./componenets/equipment/edit_equipment/EquipmentFormTemplate")
);
const HistoryMainPage = lazy(
  () => import("./componenets/equipment/edit_equipment/equipment_history/HistoryMainPage")
);
const EditShuttleDriverTemplate = lazy(
  () => import("./componenets/shuttle/Process/EditShuttle/EditShuttleDriver/EditShuttleDriverTemplate")
);
const EditShuttleUnitTemplate = lazy(
  () => import("./componenets/shuttle/Process/EditShuttle/EditShuttleUnit/EditShuttleUnitTemplate")
);
const EditShuttleYardToPlantTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/EditShuttle/EditShuttleYardToPlant/EditShuttleYardToPlantTemplate")
);
const EditShuttlePlantToYardTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/EditShuttle/EditShuttlePlantToYard/EditShuttlePlantToYardTemplate")
);
const EditShuttleYardToYardTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/EditShuttle/EditShuttleYardToYard/EditShuttleYardToYardTemplate")
);
const EditShuttlePlantToPlantTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/EditShuttle/EditShuttlePlantToPlant/EditShuttlePlantToPlantTemplate")
);
const EditYardUnitSelectionTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/EditYardUnit/EditYardUnitSelection/EditYardUnitSelectionTemplate")
);
const EditYardUnitEditTemplate = lazy(
  () => import("./componenets/shuttle/Process/EditYardUnit/EditYardUnitEdit/EditYardUnitEditTemplate")
);
const EditYardUnitShuttleDelay = lazy(
  () => import("./componenets/shuttle/Process/EditYardUnit/EditYardUnitEdit/EditYardUnitShuttleDelay")
);
const DriverSelectionTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/DriverSelection/DriverSelectionTemplate")
);
const UnitSelectionTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/UnitSelection/UnitSelectionTemplate")
);
const AdditionalShuttleTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/AdditionalShuttle/AdditionalShuttleTemplate")
);
const PlantToYardTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/PlantToYard/PlantToYardTemplate")
);
const YardToPlantTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/YardToPlant/YardToPlantTemplate")
);
const YardToYardTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/YardToYard/YardToYardTemplate")
);
const PlantToPlantTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/PlantToPlant/PlantToPlantTemplate")
);
const DryRunTemplate = lazy(() => import("./componenets/shuttle/Process/YardCheckin/DryRun/DryRunTemplate"));
const ShuttleBonusTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/ShuttleBonus/ShuttleBonusTemplate")
);
const DealerShuttleTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/DealerShuttle/DealerShuttleTemplate")
);
const ShuttleInquirySelectionTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/ShuttleInquiry/ShuttleInquirySelection/ShuttleInquirySelectionTemplate")
);
const ShuttleInquiryBrowseTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/ShuttleInquiry/ShuttleInquiryBrowse/ShuttleInquiryBrowseTemplate")
);
const ShuttleInquiryDetailTemplate = lazy(
  () =>
    import("./componenets/shuttle/Process/ShuttleInquiry/ShuttleInquiryDetail/ShuttleInquiryDetailTemplate")
);
const YardEmailMaintenance = lazy(
  () => import("./componenets/Yard/YardEmailMaintenance/browse-page/YardEmailMaintenance")
);
const YardEmailForm = lazy(() => import("./componenets/Yard/YardEmailMaintenance/edit-page/YardEmailForm"));

const SelectionTemplate = lazy(
  () => import("./componenets/Releases/PlantRelease/EditSelection/SelectionTemplate")
);
const OptionTemplate = lazy(() => import("./componenets/Releases/PlantRelease/EditOptions/OptionTemplate"));
const SingleTemplate = lazy(() => import("./componenets/Releases/PlantRelease/EditSingle/SingleTemplate"));
const DelayEntryTemplate = lazy(
  () => import("./componenets/Releases/PlantRelease/EditDelayEntry/DelayEntryTemplate")
);
const MultiBrowseTemplate = lazy(
  () => import("./componenets/Releases/PlantRelease/EditMultiBrowse/MultiBrowseTemplate")
);
const DriverSelectionmainPage = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSelectionScreen/DriverSelectionmainPage")
);
const DriverServiceTemplate = lazy(
  () => import("./componenets/Operations/DriverServices/DriverServiceEdit/DriverServiceTemplate")
);
const SpecialCodesMainPage = lazy(
  () => import("./componenets/SpecialCodes/SpecialCodesListing/SpecialCodesMainPage")
);
const SpecialCodesFormTemplate = lazy(
  () => import("./componenets/SpecialCodes/SpecialCodesForm/SpecialCodesFormTemplate")
);
const PostalCodeListingMainPage = lazy(
  () => import("./componenets/PostalCodes/postalCode_Listing/PostalCodeListingMainPage")
);
const PostalCodeFormTemplate = lazy(
  () => import("./componenets/PostalCodes/edit_postalCode/PostalCodeFormTemplate")
);
const ShuttleDelayTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/ShuttleDelay/ShuttleDelayTemplate")
);
const OrderNotEnterTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/ONE/OrderNotEnterTemplate")
);
const DriverDispatchContent = lazy(
  () =>
    import("../src/componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/DriverDispatchContent")
);
const DriverDispatchComplaince = lazy(
  () =>
    import("../src/componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/DriverDispatchComplaince")
);
const CheckPayToMainpage = lazy(
  () => import("./componenets/System/Compliance/CheckPayTo/CheckPayToBrousePage/CheckPayToMainpage")
);
const CheckPayToTemplate = lazy(
  () => import("./componenets/System/Compliance/CheckPayTo/CheckPayToEditPage/CheckPayToTemplate")
);
const HolidaysMainPage = lazy(() => import("./componenets/System/Holidays/holidayListing/HolidaysMainPage"));
const HolidaysForm = lazy(() => import("./componenets/System/Holidays/HolidayEdit/HolidaysForm"));
const ApproveHeldMainPage = lazy(
  () => import("./componenets/shuttle/Process/ApproveHeld/ApproveHeldBrowsePage/ApproveHeldMainPage")
);
const ApproveHeldFormTemplate = lazy(
  () => import("./componenets/shuttle/Process/ApproveHeld/ApproveHeldEdit/ApproveHeldFormTemplate")
);
const PayDriverSelectionMainPage = lazy(
  () =>
    import("./componenets/shuttle/Process/ProcessShuttlePay/PayDriverSelection/PayDriverSelectionMainPage")
);
const PayDriverBrowseTemplate = lazy(
  () => import("./componenets/shuttle/Process/ProcessShuttlePay/PayDriverBrowse/PayDriverBrowseTemplate")
);
const UnitActivationSelection = lazy(() => import("./componenets/UnitActivation/UnitActivationSelection"));
const UnitActivationShuttleDelay = lazy(
  () => import("./componenets/UnitActivation/UnitActivationShuttleDelay")
);
const UnitActivationSingleSoftPost = lazy(
  () => import("./componenets/UnitActivation/UnitActivationSingleSoftPost")
);
const UnitActivationSingleSelection = lazy(
  () => import("./componenets/UnitActivation/UnitActivationSingleSelection")
);
const UnitActivationMultiUnit = lazy(() => import("./componenets/UnitActivation/UnitActivationMultiUnit"));
const UnitActivationMultiUnitBrowse = lazy(
  () => import("./componenets/UnitActivation/UnitActivationMultiUnitBrowse")
);
const UnitActivationMultiUnitSisterBrowse = lazy(
  () => import("./componenets/UnitActivation/UnitActivationMultiUnitSisterBrowse")
);
const UnitActivationMultiUnitHold = lazy(
  () => import("./componenets/UnitActivation/UnitActivationMultiUnitHold")
);
const StatePermitListingMainPage = lazy(
  () => import("./componenets/statePermits/statePermitsListing/StatePermitListingMainPage")
);
const FormTemplate = lazy(() => import("./componenets/statePermits/editStatePermits/FormTemplate"));
const UpdatedRegionsMainPage = lazy(
  () => import("./componenets/regions/regions_listing/UpdatedRegionsMainPage")
);
const RegionEditForm = lazy(() => import("./componenets/regions/edit_regions/RegionEditForm"));
const DealerConnectionsMainPage = lazy(
  () => import("./componenets/dealer/DealerConnections/DealerConnectionsListing/DealerConnectionsMainPage")
);
const DealerConnectionsEditForm = lazy(
  () => import("./componenets/dealer/DealerConnections/EditDealerConnections/DealerConnectionsEditForm")
);
const DealerEmailMainPage = lazy(
  () => import("./componenets/dealer/DealerEmailMaintenance/browse-page/DealerEmailMainPage")
);
const DealerEmailForm = lazy(
  () => import("./componenets/dealer/DealerEmailMaintenance/edit-page/DealerEmailForm")
);
const DriverDispatchOutbound = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/DriverDispatchOutbound")
);
const DriverDispatchFlatbed = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/DriverDispatchFlatbed")
);
const PlantToYardTransferMainPage = lazy(
  () =>
    import("./componenets/shuttle/PlantToYardTransfer/PlantToYardTransferBrowse/PlantToYardTransferMainPage")
);
const PlantToYardTransferCustomerMainPage = lazy(
  () =>
    import("./componenets/shuttle/PlantToYardTransfer/PlantToYardTransferCustomer/PlantToYardTransferCustomerMainPage")
);
const PlantToYardTransferFormTemplate = lazy(
  () =>
    import("./componenets/shuttle/PlantToYardTransfer/PlantToYardTransferEdit/PlantToYardTransferFormTemplate")
);

const UnitTypeListingMainPage = lazy(
  () => import("./componenets/UnitType/unit-type-listing/UnitTypeListingMainPage")
);
const UnitTypeTemplate = lazy(() => import("./componenets/UnitType/unit-type-edit/UnitTypeTemplate"));
const DealerListingMainPage = lazy(
  () => import("./componenets/customer/CustomerDealers/dealerBrowsePage/dealerListingMainPage")
);

const ListingMainPage = lazy(
  () => import("./componenets/customer/CustomerDealers/browsePage/ListingMainPage")
);
const NewPage = lazy(() => import("./componenets/customer/CustomerDealers/newPage/NewPage"));
const CustomerDelaerEditTemplate = lazy(
  () => import("./componenets/customer/CustomerDealers/editViewPage/CustomerDelaerEditTemplate")
);
const RoutesMainPage = lazy(
  () => import("./componenets/customer/CustomerDealerRoutes/BrowsePage/RoutesMainPage")
);
const RoutesSequenceMainPage = lazy(
  () => import("./componenets/customer/CustomerDealerRoutes/SequencePage/RoutesSequenceMainPage")
);
const RoutesEditForm = lazy(
  () => import("./componenets/customer/CustomerDealerRoutes/EditPage/RoutesEditForm")
);
const DriverDispatchReload = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/DriverDispatchReload")
);
const OutBondUnitBrowse = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitBrowsescreens/OutBondUnitBrowse")
);
const FlatBedUnitBrowse = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitBrowsescreens/FlatBedUnitBrowse")
);
const ReloadUnitBrowse = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitBrowsescreens/ReloadUnitBrowse")
);
const POESelection = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/POEScreens/POESelection")
);
const POESelectionTwo = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/POEScreens/POESelectionTwo")
);
const UnitDatesTowable = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitDatesScreens/UnitDatesTowable")
);
const UnitDatesFlatbed = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitDatesScreens/UnitDatesFlatbed")
);
const UnitDatesDriveAway = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitDatesScreens/UnitDatesDriveAway")
);
const DpuInstructionsSelectionTemplate = lazy(
  () =>
    import("./componenets/ControlRoom/DpuInstructions/DpuInstructionsUnitSelection/DpuInstructionsSelectionTemplate")
);
const DeleaseItemsMainpage = lazy(
  () => import("./componenets/System/Compliance/DeleaseItems/DeleaseItemsBrowsePage/DeleaseItemsMainPage")
);
const DeleaseItemsTemplate = lazy(
  () => import("./componenets/System/Compliance/DeleaseItems/DeleaseItemsEditPage/DeleaseItemsTemplate")
);
const DelayUnitCodesMainPage = lazy(
  () => import("./componenets/System/Delays/DelayCodes/DelayUnitCodesListing/DelayUnitCodesMainPage")
);
const DelayUnitCodesEditTemplate = lazy(
  () => import("./componenets/System/Delays/DelayCodes/DelayUnitCodesEdit/DelayUnitCodesEditTemplate")
);
const SupplementalMainPage = lazy(
  () =>
    import("./componenets/customer/SupplementalRatesMaintenance/supplementalRates-listing/SupplementalMainPage")
);
const CustomerSelectionPage = lazy(
  () =>
    import("./componenets/customer/SupplementalRatesMaintenance/edit-supplementalRates/CustomerSelectionPage")
);
const SuppleMentalRatesTemplate = lazy(
  () =>
    import("./componenets/customer/SupplementalRatesMaintenance/edit-supplementalRates/SuppleMentalRatesTemplate")
);
const TerminationLetterMainPage = lazy(
  () =>
    import("./componenets/System/Compliance/DriverTerminationLetter/DriverTerminationLetter_listing/TerminationLetterMainPage")
);
const DriverTerminationLetterForm = lazy(
  () =>
    import("./componenets/System/Compliance/DriverTerminationLetter/DriverTerminationLetter_edit/DriverTerminationLetterForm")
);
const ComplianceItemsTemplate = lazy(
  () =>
    import("./componenets/System/Compliance/ComplianceItemsMaintenance/ComplianceItems-Edit/ComplianceItemsTemplate")
);
const ComplianceItemsMainPage = lazy(
  () =>
    import("./componenets/System/Compliance/ComplianceItemsMaintenance/ComplianceItems_Browse/ComplianceItemsMainPage")
);
const DeleaseCodeMainPage = lazy(
  () =>
    import("./componenets/System/Compliance/DeleaseCodeMaintenance/DeleaseCode-browse/DeleaseCodeMainPage")
);
const DeleaseCodeTemplate = lazy(
  () => import("./componenets/System/Compliance/DeleaseCodeMaintenance/DeleaseCode-Edit/DeleaseCodeTemplate")
);
const CustomerUtGroupsMainPage = lazy(
  () => import("./componenets/customer/CustomerUnitTypeGroups/browse-page/CustomerUtGroupsMainPage")
);
const CustomerUnitTypeGroupsTemplate = lazy(
  () => import("./componenets/customer/CustomerUnitTypeGroups/edit-page/CustomerUnitTypeGroupsTemplate")
);
const CustomerSelectionPageUT = lazy(
  () => import("./componenets/customer/CustomerUnitTypeGroups/edit-page/CustomerSelectionPageUT")
);
const DpuInstructionsViewContent = lazy(
  () => import("./componenets/ControlRoom/DpuInstructions/DpuInstructionsUnitView/DpuInstructionsViewContent")
);
const DispatchHoldsMainPage = lazy(
  () =>
    import("./componenets/System/Compliance/DispatchHoldsMaintenance/DispatchHolds_Browse/DispatchHoldsMainPage")
);
const DispatchHoldsTemplate = lazy(
  () =>
    import("./componenets/System/Compliance/DispatchHoldsMaintenance/DispatchHolds_Edit/DispatchHoldsTemplate")
);
const CompanyTemplate = lazy(() => import("./componenets/System/Company/EditCompany/CompanyTemplate"));
const DriverSelectionContent = lazy(
  () => import("./componenets/ControlRoom/DriverCheckins/DriverCheckinSelection/DriverSelectionContent")
);
const DriverSelectionMainPage = lazy(
  () => import("./componenets/ControlRoom/DriverCheckins/DriverCheckinSelection/DriverSelectionMainPage")
);
const UnitSelectionMainPage = lazy(
  () => import("./componenets/ControlRoom/DriverCheckins/DriverCheckinSelection/UnitSelectionMainPage")
);
const DriverCheckinTemplate = lazy(
  () => import("./componenets/ControlRoom/DriverCheckins/DriverCheckinTemplate")
);
const ReservesMainPage = lazy(
  () => import("./componenets/System/Compliance/Reserves/ReservesBrowsePage/ReservesMainPage")
);
const ReservesTemplate = lazy(
  () => import("./componenets/System/Compliance/Reserves/ReservesEditPage/ReservesTemplate")
);
const DelayResourcesEditForm = lazy(
  () => import("./componenets/System/Delays/DelayResources/DelayResourcesEdit/DelayResourcesEditForm")
);
const DelayResourcesMainPage = lazy(
  () => import("./componenets/System/Delays/DelayResources/DelayResourcesListing/DelayResourcesMainPage")
);
const PortsOfEntryTemplate = lazy(
  () => import("./componenets/International/PortsOfEntry/PortsOfEntryEdit/PortsOfEntryTemplate")
);
const PortsOfEntryBrowse = lazy(
  () => import("./componenets/International/PortsOfEntry/PortsOfEntryBrowse/PortsOfEntryBrowse")
);
const PlantContactMainPage = lazy(
  () => import("./componenets/Plant/CustomerPlantContacts/PlantContact-BrowsePage/PlantContactMainPage")
);
const PlantContactTemplate = lazy(
  () => import("./componenets/Plant/CustomerPlantContacts/PlantContact-EditPage/PlantContactTemplate")
);
const TermsListingMainPage = lazy(
  () => import("./componenets/System/Terms/TermsListing/TermsListingMainPage")
);
const TermsEditTemplate = lazy(() => import("./componenets/System/Terms/TermsEdit/TermsEditTemplate"));
const ReserveTypesTemplate = lazy(
  () => import("./componenets/System/Compliance/ReserveTypes/ReserveTypesEditPage/ReserveTypesTemplate")
);
const ReserveTypesMainPage = lazy(
  () => import("./componenets/System/Compliance/ReserveTypes/ReserveTypesBrowsePage/ReserveTypesMainpage")
);
const CustomerPlantEmailsMainPage = lazy(
  () =>
    import("./componenets/Plant/CustomerPlantEmails/CustomerPlantEmails-Browse/CustomerPlantEmailsMainPage")
);
const CustomerPlantEmailTemplate = lazy(
  () => import("./componenets/Plant/CustomerPlantEmails/CustomerPlantEmails-Edit/CustomerPlantEmailTemplate")
);
const FormTypesBrowse = lazy(
  () => import("./componenets/System/Form/FormTypes/FormTypesBrowse/FormTypesBrowse")
);
const FormTypesTemplate = lazy(
  () => import("./componenets/System/Form/FormTypes/FormTypesEdit/FormTypesTemplate")
);
const EquipmentCheckInOutMainPage = lazy(
  () =>
    import("./componenets/ControlRoom/EquipmentCheckInOut/EquipmentCheckInOut-Browse/EquipmentCheckInOutMainPage")
);
const EquipmentTemplate = lazy(
  () =>
    import("./componenets/ControlRoom/EquipmentCheckInOut/EquipmentCheckInOut-Edit/EquipmentCheckInScreen/EquipmentTemplate")
);
const EquipmentCheckOutViewTemplate = lazy(
  () =>
    import("./componenets/ControlRoom/EquipmentCheckInOut/EquipmentCheckInOut-Edit/EquipmentCheckOutViewScreen/EquipmentCheckOutViewTemplate")
);
const CustomerPlantDelayResourcesMain = lazy(
  () =>
    import("./componenets/Plant/CustomerPlantDelayResources/CustomerPlantDelayResources-Browse/CustomerPlantDelayResourcesMain")
);
const CustomerPlantDelayResourcesTemplate = lazy(
  () =>
    import("./componenets/Plant/CustomerPlantDelayResources/CustomerPlantDelayResources-Edit/CustomerPlantDelayResourcesTemplate")
);
const ExportBrokersBrowse = lazy(
  () => import("./componenets/International/ExportBrokers/ExportBrokersBrowse/ExportBrokersBrowse")
);
const EmailSenderTypes = lazy(
  () => import("./componenets/System/Emails/EmailSenderTypes/browse-page/EmailSenderTypes")
);
const EmailSenderTypesForm = lazy(
  () => import("./componenets/System/Emails/EmailSenderTypes/details-page/EmailSenderTypesForm")
);

const ImportBrokesBrowse = lazy(
  () => import("./componenets/International/ImportBrokes/ImportBrokersBrowse/ImportBrokersBrowse")
);
const ImportBrokesTemplate = lazy(
  () => import("./componenets/International/ImportBrokes/ImportBrokesEdit/ImportBrokesTemplate")
);
const FormBrowse = lazy(() => import("./componenets/System/Forms/Forms/FormsBrowse/FormBrowse"));
const FormsEditTemplate = lazy(() => import("./componenets/System/Forms/Forms/FormsEdit/FormsEditTemplate"));
const DpuInstructionsViewTemplate = lazy(
  () =>
    import("./componenets/ControlRoom/DpuInstructions/DpuInstructionsUnitView/DpuInstructionsViewTemplate")
);
const CustomerGroupsMainPage = lazy(
  () => import("./componenets/customer/CustomerGroups/browse-page/CustomerGroupsMainPage")
);
const CustomerGroupsForm = lazy(
  () => import("./componenets/customer/CustomerGroups/details-page/CustomerGroupsForm")
);
const EditCustomerGroups = lazy(
  () => import("./componenets/customer/CustomerGroups/details-page/EditCustomerGroups")
);
const UnitSelection = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/unit-selection/UnitSelection")
);
const UnitView = lazy(() => import("./componenets/Invoicing/PaperworkProcessing/unit-view/UnitView"));
const AdditionalAmounts = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/additional-amounts/AdditionalAmounts")
);
const AmountsConfirmation = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/amounts-confirmation/AmountsConfirmation")
);
const ScanPaperwork = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/scan-paperwork/ScanPaperwork")
);
const BreakdownDelay = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/breakdown-delay/BreakdownDelay")
);
const MissingPaperwork = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/missing-paperwork/MissingPaperwork")
);
const SplitTrip = lazy(() => import("./componenets/Invoicing/PaperworkProcessing/split-trip/SplitTrip"));
const ExportBrokersForm = lazy(
  () => import("./componenets/International/ExportBrokers/ExportBrokersDetails/ExportBrokersForm")
);
const EditPorts = lazy(
  () => import("./componenets/International/ExportBrokers/ExportBrokersDetails/EditPorts")
);
const TowableUnitConfirmation = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitConfirmationScreens/TowableUnitConfirmation")
);
const FlatbedUnitConfirmation = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitConfirmationScreens/FlatbedUnitConfirmation")
);
const SingleUnitConfirmation = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Dispatch/UnitConfirmationScreens/SingleUnitConfirmation")
);

const StateGroupsMainPage = lazy(
  () => import("./componenets/customer/StateGroups/StateGroups-Browse/StateGroupsMainPage")
);
const StateGroupsForm = lazy(() => import("./componenets/customer/StateGroups/Details-page/StateGroupsForm"));
const EditStates = lazy(() => import("./componenets/customer/StateGroups/Details-page/EditStates"));
const EditPlantForm = lazy(
  () => import("./componenets/Plant/CustomerPlantGroupsMaintenance/edit-plants/EditPlantForm")
);
const CustomerProspectsMainPage = lazy(
  () => import("./componenets/customer/CustomerProspects/customerProspects-listing/CustomerProspectsMainPage")
);
const CustomerProspectsForm = lazy(
  () => import("./componenets/customer/CustomerProspects/customerProspectsEditPage/CustomerProspectsForm")
);
const AttachmentMainPage = lazy(
  () => import("./componenets/System/Emails/EmailAttachments/browse-page/AttachmentMainPage")
);
const AttachmentFormTemplate = lazy(
  () => import("./componenets/System/Emails/EmailAttachments/details-page/AttachmentFormTemplate")
);
const UnitTypeGroupsTemplate = lazy(
  () => import("./componenets/UnitType/UnitTypeGroups/details-page/UnitTypeGroupsTemplate")
);
const UnitTypeGroupBrowsePage = lazy(
  () => import("./componenets/UnitType/UnitTypeGroups/browse-page/UnitTypeGroupBrowsePage")
);
const EditUnitTypes = lazy(() => import("./componenets/UnitType/UnitTypeGroups/details-page/EditUnitTypes"));
const DriverTrucks = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverTrucks/browse-page/DriverTrucks")
);
const DriverTrucksForm = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverTrucks/details-page/DriverTrucksForm")
);
const DriverTrailers = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverTrailers/browse-page/DriverTrailers")
);
const DriverTrailersForm = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverTrailers/details-page/DriverTrailersForm")
);

const ApproveHeldUnitBrowseMainPage = lazy(
  () =>
    import("./componenets/shuttle/Process/ApproveHeld/ApproveHeldUnitBrowse/ApproveHeldUnitBrowseMainPage")
);
const RecipientsMainPage = lazy(
  () => import("./componenets/System/Emails/EmailRecipients/browse-page/RecipientsMainPage")
);
const RecipientsTemplate = lazy(
  () => import("./componenets/System/Emails/EmailRecipients/details-page/RecipientsTemplate")
);

const EmailBrowsePage = lazy(
  () => import("./componenets/System/Emails/EmailMaintenance/browse-page/EmailBrowsePage")
);
const EmailFormTemplate = lazy(
  () => import("./componenets/System/Emails/EmailMaintenance/details-page/EmailFormTemplate")
);
const EditUnitTypeGroups = lazy(
  () => import("./componenets/customer/CustomerUnitTypeGroups/edit-page/EditUnitTypeGroups")
);

const ActivationDelayTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/ActivationDelay/ActivationDelayTemplate")
);
const ReloadSearchFilterScreen = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/ReloadDriversSearch/ReloadSearchFilterScreen")
);
const UnitBrowseListing = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/ReloadDriversSearch/UnitBrowseListing")
);
const DriverBrowseLsiting = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/ReloadDriversSearch/DriverBrowseLsiting")
);
const UnitBrowseListingMainpage = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/ReloadDriversSearch/UnitBrowseListingMainpage")
);
const DriverDeleaseRequestsTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverDeleaseRequests/DriverDeleaseRequestsTemplate")
);
const DriverTMRLogsMainPage = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverTMRLogs/DriverTMRLogsBrowsePage/DriverTMRLogsMainPage")
);
const DriverTMRLogsTemplate = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverTMRLogs/DriverTMRLogsEditPage/DriverTMRLogsTemplate")
);
const DriverTMRLogsListing = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverTMRLogs/DriverTMRLogsBrowsePage/DriverTMRLogsListing")
);
const DriverRserveMainPage = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverRserve/DriverRserve_Browse/DriverRserveMainPage")
);
const DriverRserveTemplate = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverRserve/DriverRserve_Edit/DriverRserveTemplate")
);
const DriverGarnishmentsBrowse = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverGarnishments/browse-page/DriverGarnishmentsBrowse")
);
const DriverGarnishmentsFormContent = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverGarnishments/details-page/DriverGarnishmentsFormContent")
);
const ReportCardTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/ReportCard/ReportCardTemplate")
);
const DriverFlashTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverFlash/DriverFlashTemplate")
);
const DriverDispatchHold = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverDispatchHold/browse-page/DriverDispatchHold")
);
const DriverDispatchHoldForm = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverDispatchHold/details-page/DriverDispatchHoldForm")
);
const SearchFilterScreenForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/DealerDriverSearch/SearchFilterScreen/SearchFilterScreenForm")
);
const DriverListingForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/DealerDriverSearch/DriverBrowseScreen/DriverListingForm")
);
const StateSearchFilterScreenForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/StateDriverSearch/SearchFilterScreen/StateSearchFilterScreenForm")
);
const StateDriverListingForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/StateDriverSearch/DriverBrowseScreen/StateDriverListingForm")
);
const ZipcodeSearchFilterScreenForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/ZipcodeDriverSearch/SearchFilterScreen/ZipcodeSearchFilterScreenForm")
);
const ZipcodeDriverListingForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/ZipcodeDriverSearch/DriverBrowseScreen/ZipcodeDriverListingForm")
);

const DriverBrowseListingMainPage = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceSelection/DriverSearchFilterScreens/ReloadDriversSearch/DriverBrowseListingMainPage")
);
const ThankYouCard = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/ThankYouCard/ThankYouCard")
);
const DriverAddNotesTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverAddNotes/tab/DriverAddNotesTemplate")
);
const DriverComplianceListingMainPage = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverComplianceItems/DriverComplianceItemsListing/DriverComplianceListingMainPage")
);
const DriverComplianceFormTemplate = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverComplianceItems/DriverComplianceItemsEdit/DriverComplianceFormTemplate")
);
const DriverCheckinHistoryMainPage = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Check In History/DriverCheckinHistoryMainPage")
);
const AddEquipmentTemplate = lazy(
  () => import("./componenets/equipment/DriverEquipment/DriverEquipmentListing/AddEquipmentTemplate")
);
const AssignedEquipmentTemplate = lazy(
  () => import("./componenets/equipment/DriverEquipment/DriverEquipmentListing/AssignedEquipmentTemplate")
);
const AddEquipmentFormTemplate = lazy(
  () => import("./componenets/equipment/DriverEquipment/DriverEquipmentEdit/AddEquipmentFormTemplate")
);
const CustomerDispatchUsers = lazy(
  () => import("./componenets/customer/CustomerDispatchUsers/browse-page/CustomerDispatchUsers")
);
const CustomerDispatchUsersForm = lazy(
  () => import("./componenets/customer/CustomerDispatchUsers/edit-page/CustomerDispatchUsersForm")
);
const CustomerRatesMainPage = lazy(
  () => import("./componenets/customer/CustomerRatesMaintenance/CustomerRates-listing/CustomerRatesMainPage")
);
const CustomerAddSelectionPage = lazy(
  () => import("./componenets/customer/CustomerRatesMaintenance/EditCustomerRates/CustomerAddSelectionPage")
);
const RatesFormTemplate = lazy(
  () => import("./componenets/customer/CustomerRatesMaintenance/EditCustomerRates/RatesFormTemplate")
);
const RatesContent = lazy(
  () => import("./componenets/customer/CustomerRatesMaintenance/EditCustomerRates/RatesContent")
);
const DriverReferralsList = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverReferrals/DriverReferralsList")
);
const DriverReferralsTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverReferrals/DriverReferralsTemplate")
);
// const AddCommentsTemplate = lazy(
//   () =>
//     import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/AddComments/AddCommentsTemplate")
// );
const DispatchDocumentForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverDispatchDocument/DispatchDocumentForm")
);
const DelayedUnitBrowse = lazy(
  () => import("./componenets/DispatchDelay/DelayProcessing/delayed-unit-browse/DelayedUnitBrowse")
);
const NewDelayedUnitBrowse = lazy(
  () => import("./componenets/DispatchDelay/DelayProcessing/new-delayed-unit-browse/NewDelayedUnitBrowse")
);
const NewDelayedUnitConfirmation = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/new-delayed-unit-confirmation/NewDelayedUnitConfirmation")
);
const UnitDetails = lazy(
  () => import("./componenets/DispatchDelay/DelayProcessing/unit-details/UnitDetails")
);
const EditDriverFileTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/EditDriverFile/EditDriverFileTemplate")
);
const DriverDrugTests = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverDrugTests/browse-page/DriverDrugTests")
);
const DriverDrugTestsAddForm = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDrugTests/details-page/add-record/DriverDrugTestsAddForm")
);
const DriverDrugTestsEditForm = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDrugTests/details-page/edit-record/DriverDrugTestsEditForm")
);
const DriverAwardsForm = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DriverAwards/DriverAwardsForm")
);
const DriverBondFundsTemplate = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverBondFunds/DriverBondFundsTemplate")
);
const LoadHistoryBrowse = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Load History/Browse/LoadHistoryBrowse")
);
const DispatchDetailTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Load History/EditPage/DispatchDetailTemplate")
);
const PickupTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Load History/Pickup/PickupTemplate")
);
const DeliveryTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Load History/Delivery/DeliveryTemplate")
);
const DriversMainPage = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverMaintenance/DriverBrowsePage/DriversMainPage")
);
const DriverFormTemplate = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverMaintenance/DriverEditPage/DriverFormTemplate")
);
const DriversEmail = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/drivers-email/DiversEmail")
);
const InvoiceEquipmentReturnTemplate = lazy(
  () => import("./componenets/Invoicing/PaperworkProcessing/equipment-return/EquipmentReturnTemplate")
);
const PostNoCheckinContent = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/PostNoCheckin/PostNoCheckinAdd/PostNoCheckinContent")
);
const PostNoCheckinHistoryContent = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/PostNoCheckin/PostNoCheckinHistory/PostNoCheckinHistoryContent")
);
const EditMasterExpressUnitSelection = lazy(
  () =>
    import("./componenets/Units/EditMasterExpress/EditMasterExpressUnitSelection/EditMasterExpressUnitSelection")
);
const EditMasterExpressEditPageTemplate = lazy(
  () =>
    import("./componenets/Units/EditMasterExpress/EditMasterExpressEditPage/EditMasterExpressEditPageTemplate")
);
const UnDispatchUnitSelectionTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/UnitSelectionScreen/UnDispatchUnitSelectionTemplate")
);
const UnitConfirmationTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/UnitConfirmationScreen/UnitConfirmationTemplate")
);
const UndispatchDetailsTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/UndispatchDetailsScreen/UndispatchDetailsTemplate")
);
const ActivationDelaysTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/ActivationDelayScreen/ActivationDelaysTemplate")
);
const EquipmentReturnTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/EquipmentReturnScreen/EquipmentReturnTemplate")
);
const HoldScreenTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/HoldScreen/HoldScreenTemplate")
);
const DeleteUnitTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/DeleteUnitScreen/DeleteUnitTemplate")
);
const APUScreenTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/APUScreen/APUScreenTemplate")
);
const DeleteUnitCreditCardTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/DeleteUnitCreditCardScreen/DeleteUnitCreditCardTemplate")
);
const APUDocumentsTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/APUDocumentsScreen/APUDocumentsTemplate")
);
const SplitTripTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/SplitTripDocuments/SplitTripTemplate")
);
const SplitTripLocationTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/SplitTripLocationScreen/SplitTripLocationTemplate")
);
const SplitTripMilesTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Undispatch/SplitTripMilesScreen/SplitTripMilesTemplate")
);

const DispatchRestrictionsTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DispatchRestrictions/DispatchRestrictionsListing/DispatchRestrictionsTemplate")
);
const DispatchRestrictionFormTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DispatchRestrictions/DispatchRestrictionContent/DispatchRestrictionFormTemplate")
);
const DispatchRestrictionsNewTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/DispatchRestrictions/DispatchRestrictionContent/DispatchRestrictionsNewTemplate")
);
const SettlementFormTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Settlements/SettlementFormTemplate")
);
const DeleaseRequestBrowse = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDeleaseRequests/DriverDeleaseRequestsBrowse/DeleaseRequestBrowse")
);
const DriverDeleaseRequestTemplate = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDeleaseRequests/DriverDeleaseRequestEdit/DriverDeleaseRequestTemplate")
);
const DriverDeleaseBrowse = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverDelease/Browse-Page/DriverDeleaseBrowse")
);
const DriverDeleaseFormTemplate = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDelease/DriverDeleaseEdit/DriverDeleaseFormTemplate")
);
const LetterTemplate = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverDelease/Letter/LetterTemplate")
);
const UnitDamageDetails = lazy(
  () => import("./componenets/DispatchDelay/DamageProcessing/unit-details-damage/UnitDamageDetails")
);

const DetailScreenTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/delayed-unit-delay-return/DetailsScreen/DetailScreenTemplate")
);
const DelayPickupTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/delayed-unit-delay-return/PickupScreen/DelayPickupTemplate")
);
const DelayMilesTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/delayed-unit-delay-return/DelayMilesScreen/DelayMilesTemplate")
);
const DelayCreditCardTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/delayed-unit-delay-return/DelayCreditCardScreen/DelayCreditCardTemplate")
);
const DelayDocumentTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/delayed-unit-delay-return/DelayDocumentScreen/DelayDocumentTemplate")
);
const MiscellaneousDeliveryTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/delayed-unit-delay-return/DeliveryScreen/MiscellaneousDeliveryTemplate")
);

const MileageLogTemplate = lazy(
  () => import("./componenets/Compliance/DriverFile/MileageLog/MileageLogTemplate")
);
const CustomerOrderBrowse = lazy(
  () => import("./componenets/customer/CustomerOrdersMaintenance/CustomerOrdersBrowse/CustomerOrderBrowse")
);
const CustomerOrderTemplate = lazy(
  () => import("./componenets/customer/CustomerOrdersMaintenance/CustomerOrdersEdit/CustomerOrderTemplate")
);
const CustomerOrderColumnsTemplate = lazy(
  () =>
    import("./componenets/customer/CustomerOrdersMaintenance/CustomerOrderColumns/CustomerOrderColumnsTemplate")
);
const CustomerOrdersTest = lazy(
  () => import("./componenets/customer/CustomerOrdersMaintenance/CustomerOrdersTest/CustomerOrdersTest")
);
const CustomerOrdersTestResult = lazy(
  () => import("./componenets/customer/CustomerOrdersMaintenance/CustomerOrdersTest/CustomerOrdersTestResult")
);
const RerouteUnitSelectionScreen = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/RerouteUnitSelectionScreen")
);
const RerouteDetailScreenTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/RerouteDetailScreen/RerouteDetailScreenTemplate")
);
const ReroutePickupNormalDealerTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/ReroutePickupLocationOfNormalDealer/ReroutePickupNormalDealerTemplate")
);
const ReroutePickupMiscellaneousDealerTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/ReroutePickupLocationOfMiscellaneousDealer/ReroutePickupMiscellaneousDealerTemplate")
);
const RerouteDeliveryNormalDealerTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/RerouteDeliveryLocationOfNormalDealer/RerouteDeliveryNormalDealerTemplate")
);
const RerouteDeliveryMiscellaneousDealerTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/RerouteDeliveryMiscellaneousDealer/RerouteDeliveryMiscellaneousDealerTemplate")
);
const RerouteConfirmationTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/RerouteConfirmation/RerouteConfirmationTemplate")
);
const CreditCardTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/CreditCard/CreditCardTemplate")
);

const DebitCards = lazy(() => import("./componenets/System/Compliance/DebitCard/browse-page/DebitCards"));
const DebitCardForm = lazy(
  () => import("./componenets/System/Compliance/DebitCard/details-page/DebitCardForm")
);
const InvoiceCreditCardSelectionTemplate = lazy(
  () =>
    import(".//componenets/Invoicing/InvoiceCreditCardInquiry/selection-screen/InvoiceCreditCardSelectionTemplate")
);
const InvoiceCreditCardViewTemplate = lazy(
  () => import(".//componenets/Invoicing/InvoiceCreditCardInquiry/view-screen/InvoiceCreditCardViewTemplate")
);

// Reports
const AvailableDriverList = lazy(
  () => import("./componenets/Operations/Reports/Drivers/AvailableDriverList/AvailableDriverList")
);
const UnitListingByDate = lazy(
  () => import("./componenets/Operations/Reports/Units/UnitListingByDate/UnitListingByDate")
);
const ProjectReport = lazy(
  () => import("./componenets/Operations/Reports/Units/ProjectReport/ProjectReport")
);
const DeliveredUnitReport = lazy(
  () => import("./componenets/Operations/Reports/Units/DeliveredUnitReport/DeliveredUnitReport")
);
const DispatchedUnitReport = lazy(
  () => import("./componenets/Operations/Reports/Units/DispatchedUnitReport/DispatchedUnitReport")
);
const ActiveDrivers = lazy(
  () => import("./componenets/Operations/Reports/Drivers/ActiveDrivers/ActiveDrivers")
);
const DamagedUnitBrowse = lazy(
  () => import("./componenets/DispatchDelay/DamageProcessing/damaged-unit-browse/DamagedUnitBrowse")
);

const DriverLabelsTemplate = lazy(() => import("./componenets/Operations/DriverLabels/DriverLabelsTemplate"));
const TransportCompaniesMainPage = lazy(
  () => import("./componenets/TransportCompanies/BrowsePage/TransportCompaniesMainPage")
);
const TransportCompaniesTemplate = lazy(
  () => import("./componenets/TransportCompanies/TransportCompaniesEdit/TransportCompaniesTemplate")
);
const HalfScreenGroupTemplate = lazy(
  () => import("./componenets/System/User/UserPermissionGroups/HalfScreenGroupTemplate")
);
const BreakdownUnitDetails = lazy(
  () => import("./componenets/DispatchDelay/BreakdownProcessing/breakdown-unit-details/BreakdownUnitDetails")
);
const BreakdownUnitBrowse = lazy(
  () => import("./componenets/DispatchDelay/BreakdownProcessing/breakdown-unit-browse/BreakdownUnitBrowse")
);
const UserPermissionBrowsePage = lazy(
  () => import("./componenets/System/User/UserPermission/UserPermissionBrowsePage")
);
const PermissionMainPage = lazy(
  () => import("./componenets/System/Security/Permission/PermissionBrowse/PermissionMainPage")
);
const PermissionTemplate = lazy(
  () => import("./componenets/System/Security/Permission/PermissionEdit/PermissionTemplate")
);
const PermissionGroupsMainPage = lazy(
  () => import("./componenets/System/Security/PermissionGroups/Browse-page/PermissionGroupsMainPage")
);
const DetailPageTemplate = lazy(
  () => import("./componenets/System/Security/PermissionGroups/Edit-page/DetailPageTemplate")
);
const PermissionEditDetailPage = lazy(
  () => import("./componenets/System/Security/PermissionGroups/Edit-page/PermissionEditDetailPage")
);

const SelectionPageTemplate = lazy(
  () => import("./componenets/Operations/InventoryStatusFlashReport/DivisionSelection/SelectionPageTemplate")
);
const InventoryFlashListingTemplate = lazy(
  () =>
    import("./componenets/Operations/InventoryStatusFlashReport/ListingPages/InventoryFlashListingTemplate")
);
// ---------------------
const InvoiceUnitSelection = lazy(
  () => import("./componenets/Invoicing/EditInvoice/invoice-unit-selection/InvoiceUnitSelection")
);
const InvoiceUnitConfirmation = lazy(
  () => import("./componenets/Invoicing/EditInvoice/invoice-unit-confirmation/InvoiceUnitConfirmation")
);
const InvoiceInformationView = lazy(
  () => import("./componenets/Invoicing/EditInvoice/invoice-confirmation-view/InvoiceInformationView")
);
const InvoiceNonUnitSelection = lazy(
  () => import("./componenets/Invoicing/EditInvoice/invoice-non-unit-selection/InvoiceNonUnitSelection")
);
const InvoiceSave = lazy(() => import("./componenets/Invoicing/EditInvoice/invoice-save/InvoiceSave"));
const InvoiceVoid = lazy(() => import("./componenets/Invoicing/EditInvoice/invoice-void/InvoiceVoid"));

const CheckRejectedLoadsTemplate = lazy(
  () => import("./componenets/Accounting/DebitCards/CheckRejectedLoads/CheckRejectedLoadsTemplate")
);
const NoCallinReport = lazy(
  () => import("./componenets/Operations/Reports/Drivers/NoCallinReport/NoCallinReport")
);
const UnitPickupExtensionReport = lazy(
  () => import("./componenets/Operations/Reports/Units/UnitPickupExtensionReport/UnitPickupExtensionReport")
);
// ---------------------
const YardUsageReport = lazy(
  () => import("./componenets/Operations/Reports/Yards/YardUsageReport/YardUsageReport")
);
const ShuttleCollectionsReport = lazy(
  () => import("./componenets/Operations/Reports/Shuttles/ShuttleCollections/ShuttleCollectionsReport")
);
const DriverListingReport = lazy(
  () => import("./componenets/Operations/Reports/Drivers/DriverListing/DriverListingReport")
);
const DriverListingReportView = lazy(
  () => import("./componenets/Operations/Reports/Drivers/DriverListing/DriverListingReportView")
);
const DelayedUnitsPendingEmail = lazy(
  () => import("./componenets/DispatchDelay/DelayedUnitsPendingEmail/browse-page/DelayedUnitsPendingEmail")
);
const DelayedUnitPendingEmailView = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayedUnitsPendingEmail/details-page/DelayedUnitPendingEmailView")
);
const InvoiceInquiryUnitSelection = lazy(
  () =>
    import("./componenets/Invoicing/InvoiceInquiry/invoice-inquiry-unit-selection/InvoiceInquiryUnitSelection")
);
const InvoiceInquiryNonUnitSelection = lazy(
  () =>
    import("./componenets/Invoicing/InvoiceInquiry/invoice-inquiry-non-unit-selection/InvoiceInquiryNonUnitSelection")
);
const InvoiceInquiryDriverSelection = lazy(
  () =>
    import("./componenets/Invoicing/InvoiceInquiry/invoice-inquiry-driver-selection/InvoiceInquiryDriverSelection")
);
const InvoiceInquiryUnitConfirmationContent = lazy(
  () =>
    import("./componenets/Invoicing/InvoiceInquiry/invoice-inquiry-unit-confirmation/InvoiceInquiryUnitConfirmationContent")
);
const InvoiceInquiryUnitConfirmation = lazy(
  () =>
    import("./componenets/Invoicing/InvoiceInquiry/invoice-inquiry-unit-confirmation/InvoiceInquiryUnitConfirmation")
);
const InvoiceInquiryDriverConfirmation = lazy(
  () =>
    import("./componenets/Invoicing/InvoiceInquiry/invoice-inquiry-driver-confirmation/InvoiceInquiryDriverConfirmation")
);
const InvoiceDetail = lazy(
  () => import("./componenets/Invoicing/InvoiceInquiry/invoice-detail-screen/InvoiceDetail")
);
const UnitExport = lazy(
  () => import("./componenets/Invoicing/InvoiceInquiry/Export Screens/Unit-Export/UnitExport")
);
const DriverExport = lazy(
  () => import("./componenets/Invoicing/InvoiceInquiry/Export Screens/Driver-Export/DriverExport")
);
const BulkEmailsScreenTemplate = lazy(
  () => import("./componenets/Operations/BulkEmails/SelectionScreens/BulkEmailsScreenTemplate")
);
const EmailTextScreenTemplate = lazy(
  () => import("./componenets/Operations/BulkEmails/EmailTextScreen/EmailTextScreenTemplate")
);
const BrowsePageTemplate = lazy(
  () => import("./componenets/Operations/BulkEmails/ReviewBrowseList/BrowsePageTemplate")
);
// ---------------------
const BulkInvoiceSelectionTemplate = lazy(
  () => import("./componenets/Invoicing/BulkInvoice/invoice-selection/BulkInvoiceSelectionTemplate")
);
const BulkInvoiceDetailsTemplate = lazy(
  () => import("./componenets/Invoicing/BulkInvoice/invoice-details/BulkInvoiceDetailsTemplate")
);
const BulkReimbursementInvoiceBrowseTemplate = lazy(
  () =>
    import("./componenets/Invoicing/BulkUnitReimbursement/invoice-browse/BulkReimbursementInvoiceBrowseTemplate")
);
const BulkReimbursementUnitBrowseTemplate = lazy(
  () =>
    import("./componenets/Invoicing/BulkUnitReimbursement/unit-browse/BulkReimbursementUnitBrowseTemplate")
);
const BulkReimbursementDetailsTemplate = lazy(
  () =>
    import("./componenets/Invoicing/BulkUnitReimbursement/details-screen/BulkReimbursementDetailsTemplate")
);
const BulkReimbursementDocuments = lazy(
  () => import("./componenets/Invoicing/BulkUnitReimbursement/documents-screen/BulkReimbursementDocuments")
);
const DriverInvoiceSelection = lazy(
  () => import("./componenets/Invoicing/DriverInvoice/DriverSelection/DriverInvoiceSelection")
);
const InvoiceDetailTemplate = lazy(
  () => import("./componenets/Invoicing/DriverInvoice/EditDriverInvoice/InvoiceDetailTemplate")
);
const ManualEntryTemplate = lazy(
  () => import("./componenets/Invoicing/DriverInvoice/EditDriverInvoice/ManualEntryTemplate")
);
const ScanInvoiceUnitSelection = lazy(
  () => import("./componenets/Invoicing/ScanInvoiceDocuments/invoice-unit-selection/ScanInvoiceUnitSelection")
);
const ScanInvoiceUnitConfirmation = lazy(
  () => import("./componenets/Invoicing/ScanInvoiceDocuments/unit-confirmation/ScanInvoiceUnitConfirmation")
);
const ScanInvoiceNonUnitSelection = lazy(
  () =>
    import("./componenets/Invoicing/ScanInvoiceDocuments/invoice-non-unit-selection/ScanInvoiceNonUnitSelection")
);
const DocumentScanScreen = lazy(
  () => import("./componenets/Invoicing/ScanInvoiceDocuments/document-scan/DocumentScanScreen")
);

const DPUInvoiceForm = lazy(() => import("./componenets/Invoicing/DPUInvoice/unit-selection/DPUInvoiceForm"));
const DPUInvoiceUnitConfirmation = lazy(
  () => import("./componenets/Invoicing/DPUInvoice/unit-confirmation/DPUInvoiceUnitConfirmation")
);
const DPUInvoiceUnitConfirmationTemplate = lazy(
  () => import("./componenets/Invoicing/DPUInvoice/unit-confirmation/DPUInvoiceUnitConfirmationTemplate")
);
const DPUInvoiceTextTemplate = lazy(
  () => import("./componenets/Invoicing/DPUInvoice/invoice-text/DPUInvoiceTextTemplate")
);
const DPUInvoicePaperworkTemplate = lazy(
  () => import("./componenets/Invoicing/DPUInvoice/paperwork/DPUInvoicePaperworkTemplate")
);
const TollsByPlateSelectionTemplate = lazy(
  () => import("./componenets/Invoicing/TollsByPlate/plate-selection/TollsByPlateSelectionTemplate")
);
const TollsByPlateDetailsTemplate = lazy(
  () => import("./componenets/Invoicing/TollsByPlate/invoice-detail/TollsByPlateDetailsTemplate")
);
const TollsByPlateCheckTemplate = lazy(
  () => import("./componenets/Invoicing/TollsByPlate/check-screen/TollsByPlateCheckTemplate")
);
const OptionScreenTemplate = lazy(
  () => import("./componenets/Accounting/PrintCheck/OptionsScreen/OptionScreenTemplate")
);
const TransportCompanyTemplate = lazy(
  () => import("./componenets/Accounting/PrintCheck/TransportCompanyScreen/TransportCompanyTemplate")
);
const MiscellaneousCheckTemplate = lazy(
  () => import("./componenets/Accounting/PrintCheck/MiscellaneousCheckScreen/MiscellaneousCheckTemplate")
);
const CheckStubTemplate = lazy(
  () => import("./componenets/Accounting/PrintCheck/CheckStubScreen/CheckStubTemplate")
);
const PrintCheckDriversTemplate = lazy(
  () => import("./componenets/Accounting/PrintCheck/DriversScreen/PrintCheckDriversTemplate")
);
const PurgeDamageReturnUnitsForm = lazy(
  () => import("./componenets/DispatchDelay/PurgeDamageReturnUnits/PurgeDamageReturnUnitsForm")
);
const PurgeConfirmationPage = lazy(
  () =>
    import("./componenets/DispatchDelay/PurgeDamageReturnUnits/PurgeConfirmationPage/PurgeConfirmationPage")
);
const UnitStatusDetailTemplate = lazy(
  () => import("./componenets/Units/UnitStatusProgram/UnitStatusDetail/UnitStatusDetailTemplate")
);
const UnitSelectionBrowse = lazy(
  () => import("./componenets/Units/UnitStatusProgram/UnitSelectionBrowse/UnitSelectionBrowse")
);
const PaymentRequestSelectionTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/PaymentRequest/PaymentRequestSelection/PaymentRequestSelectionTemplate")
);
const PaymentRequestTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/PaymentRequest/PaymentRequestFormTemplate/PaymentRequestTemplate")
);
const TableListingDamage = lazy(
  () => import("./componenets/DispatchDelay/DamageProcessing/damaged-unit-browse/TableListingDamage")
);
const PayHistoryTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/PayHistory/PayHistoryTemplate")
);
const SettingsScreen = lazy(
  () => import("./componenets/Operations/OutstandingPaperwork/settings-screen/SettingsScreen")
);
const BrowseScreen = lazy(
  () => import("./componenets/Operations/OutstandingPaperwork/browse-screen/BrowseScreen")
);
const CommentsScreen = lazy(
  () => import("./componenets/Operations/OutstandingPaperwork/comments-screen/CommentsScreen")
);
const EmailScreen = lazy(
  () => import("./componenets/Operations/OutstandingPaperwork/email-screen/EmailScreen")
);
const EditCheckinSelectionTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/EditCheckin/Selection/EditCheckinSelectionTemplate")
);
const FormCheckinTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/EditCheckin/EditCheckinFormTemplate/FormCheckinTemplate")
);

const MPSettingsScreen = lazy(
  () => import("./componenets/Operations/MissingPaperwork/settings-screen/SettingsScreen")
);
const MPBrowseScreen = lazy(
  () => import("./componenets/Operations/MissingPaperwork/browse-screen/BrowseScreen")
);
const MPCommentsScreen = lazy(
  () => import("./componenets/Operations/MissingPaperwork/comments-screen/CommentsScreen")
);
const MPEmailScreen = lazy(
  () => import("./componenets/Operations/MissingPaperwork/email-screen/EmailScreen")
);
const DispatchBrowseScreen = lazy(
  () => import("./componenets/Operations/EmanifestChangeRequest/dispatch-browse-screen/DispatchBrowseScreen")
);
const DispatchConfirmationScreen = lazy(
  () =>
    import("./componenets/Operations/EmanifestChangeRequest/dispatch-confirmation-screen/DispatchConfirmationScreen")
);
const ChangeRequestReasonScreen = lazy(
  () =>
    import("./componenets/Operations/EmanifestChangeRequest/change-request-reason-screen/ChangeRequestReasonScreen")
);
const DispatchDelayMove = lazy(
  () => import("./componenets/DispatchDelay/DispatchDelayMove/DispatchDelayMove")
);
const MiscInvoiceUnitSelectionTemplate = lazy(
  () => import("./componenets/Invoicing/MiscellaneousInvoice/unit-selection/MiscInvoiceUnitSelectionTemplate")
);
const UnitConfNocrossNoalternateTemplate = lazy(
  () =>
    import("./componenets/Invoicing/MiscellaneousInvoice/unit-conf-nocross-noalternate/UnitConfNocrossNoalternateTemplate")
);
const InvoiceDeatilTemplate = lazy(
  () => import("./componenets/Invoicing/MiscellaneousInvoice/invoice-detail/InvoiceDeatilTemplate")
);
const DocumentTemplate = lazy(
  () => import("./componenets/Invoicing/MiscellaneousInvoice/document-screen/DocumentTemplate")
);
const NonUnitInvoiceTemplate = lazy(
  () => import("./componenets/Invoicing/MiscellaneousInvoice/non-unit-invoice-screen/NonUnitInvoiceTemplate")
);
const UnitConfCrossCompanyTemplate = lazy(
  () =>
    import("./componenets/Invoicing/MiscellaneousInvoice/unit-conf-cross-company/UnitConfCrossCompanyTemplate")
);
const DisplayExistingInvoiceTemplate = lazy(
  () =>
    import("./componenets/Invoicing/MiscellaneousInvoice/display-exisiting-invoice/DisplayExistingInvoiceTemplate")
);
const UnitConfNocrossAlternateTemplate = lazy(
  () =>
    import("./componenets/Invoicing/MiscellaneousInvoice/unit-conf-nocross-alternate/UnitConfNocrossAlternateTemplate")
);
const PostCheckTemplate = lazy(() => import("./componenets/Accounting/PostCheck/PostCheckTemplate"));
const BondFundsTemplate = lazy(
  () => import("./componenets/Compliance/DriverFile/BondFundsLog/BondFundsTemplate")
);
const ReserveFundTemplate = lazy(
  () => import("./componenets/Compliance/DriverFile/ReserveFundsLog/ReserveFundTemplate")
);
const PayDebitCardTemplate = lazy(
  () => import("./componenets/Accounting/DebitCards/PayDebitCardInvoice/PayDebitCardTemplate")
);
const PostDriverPayRequests = lazy(
  () => import("./componenets/Operations/PostDriverPayRequests/browse-screen/PostDriverPayRequests")
);
const DetailViewScreen = lazy(
  () => import("./componenets/Operations/PostDriverPayRequests/detail-view-screen/DetailViewScreen")
);
const DeniedScreen = lazy(
  () => import("./componenets/Operations/PostDriverPayRequests/denied-screen/DeniedScreen")
);
const DamageSafetyTemplate = lazy(
  () => import("./componenets/DispatchDelay/DamageProcessing/damage-safety/DamageSafetyTemplate")
);
const SafetyAwardCertificates = lazy(
  () => import("./componenets/Compliance/SafetyAwardCertificates/SafetyAwardCertificates")
);
const SafetySchoolCertificates = lazy(
  () => import("./componenets/Compliance/SafetySchoolCertificates/SafetySchoolCertificates")
);
const SimulatorCertificates = lazy(
  () => import("./componenets/Compliance/SimulatorCertificates/SimulatorCertificates")
);
const CertificateUpdate = lazy(() => import("./componenets/Compliance/CertificateUpdate/CertificateUdpate"));
const CertificateUpdateDriverSelectionPage = lazy(
  () => import("./componenets/Compliance/CertificateUpdate/CertificateUpdateDriverSelectionPage")
);
const ProcessMotiveFiles = lazy(
  () => import("./componenets/Compliance/ProcessMotiveFiles/ProcessMotiveFiles")
);
const RandomTestingTemplate = lazy(
  () => import("./componenets/Compliance/RandomTesting/RandomTestingTemplate")
);
const DeleaseRequestBrowseTemplate = lazy(
  () =>
    import("./componenets/Compliance/DriverDeleaseRequest/DeleaseRequestBrowse/DeleaseRequestBrowseTemplate")
);
const RequestViewTemplate = lazy(
  () => import("./componenets/Compliance/DriverDeleaseRequest/DeleaseRequestView/RequestViewTemplate")
);
const PostToPassportTemplate = lazy(
  () => import("./componenets/Accounting/PostToPassport/PostToPassportTemplate")
);
const UnitDetailsDamage = lazy(
  () =>
    import("./componenets/DispatchDelay/DamageProcessing/unit-details-damage/detail-tabs/UnitDetailsDamage")
);

const DriverInvoiceUnitSelection = lazy(
  () =>
    import("./componenets/Invoicing/DriverInvoice/EditDriverInvoice/Driver-invoice-unit-selection/DriverInvoiceUnitSelection")
);
const DriverInvoiceScan = lazy(
  () => import("./componenets/Invoicing/DriverInvoice/EditDriverInvoice/DriverInvoiceScan")
);
const DriverInvoiceUnitConfirmationContent = lazy(
  () =>
    import("./componenets/Invoicing/DriverInvoice/EditDriverInvoice/driver-invoice-unit-confirmation/DriverInvoiceUnitConfirmationContent")
);
const DriverInvoiceUnitConfirmation = lazy(
  () =>
    import("./componenets/Invoicing/DriverInvoice/EditDriverInvoice/driver-invoice-unit-confirmation/DriverInvoiceUnitConfirmation")
);

const DelayedUnitFeesView = lazy(
  () => import("./componenets/DispatchDelay/BreakdownProcessing/delayed-unit-fees-view/DelayedUnitFeesView")
);
const DelayedUnitFeesEdit = lazy(
  () => import("./componenets/DispatchDelay/BreakdownProcessing/delayed-unit-fees-edit/DelayedUnitFeesEdit")
);
const DelayUnitBreakdownInvoice = lazy(
  () =>
    import("./componenets/DispatchDelay/BreakdownProcessing/delay-unit-breakdown-invoice/DelayUnitBreakdownInvoice")
);
const DelayUnitBreakdownSettlement = lazy(
  () =>
    import("./componenets/DispatchDelay/BreakdownProcessing/delay-unit-breakdown-settlement/DelayUnitBreakdownSettlement")
);
const DelayedUnitBreakdownInvoiceScan = lazy(
  () =>
    import("./componenets/DispatchDelay/BreakdownProcessing/delayed-unit-breakdown-invoice-scan/DelayedUnitBreakdownInvoiceScan")
);
const DelayUnitCheckRequest = lazy(
  () =>
    import("./componenets/DispatchDelay/DamageProcessing/DelayUnitCheckRequest/browse-page/DelayUnitCheckRequest")
);
const DelayUnitCheckRequestFormContent = lazy(
  () =>
    import("./componenets/DispatchDelay/DamageProcessing/DelayUnitCheckRequest/details-page/DelayUnitCheckRequestFormContent")
);
const DelayUnitExpense = lazy(
  () => import("./componenets/DispatchDelay/DelayProcessing/delay-unit-expense/DelayUnitExpense")
);
const DelayUnitCheckDetail = lazy(
  () =>
    import("./componenets/DispatchDelay/DamageProcessing/DelayUnitCheckRequest/details-page/DelayUnitCheckDetail")
);
const BlockedLogReport = lazy(
  () => import("./componenets/Operations/Reports/Drivers/BlockedLog/BlockedLogReport")
);
const SecondShuttleTemplate = lazy(
  () => import("./componenets/shuttle/Process/YardCheckin/SecondShuttle/SecondShuttleTemplate")
);
const DriverRecruitReport = lazy(
  () => import("./componenets/Compliance/Reports/DriverRecruitReport/DriverRecruitReport")
);
const RandomTestingSummaryReport = lazy(
  () => import("./componenets/Compliance/Reports/RandomTestingReport/RandomTestingSummaryReport")
);
const FlatrateBrowse = lazy(
  () => import("./componenets/dealer/DealerConnections/DealerConnectionFlatrate/browse-page/FlatrateBrowse")
);
const FlatrateDetails = lazy(
  () => import("./componenets/dealer/DealerConnections/DealerConnectionFlatrate/details-page/FlatrateDetails")
);
const DealerConnectionFlatrateSelection = lazy(
  () =>
    import("./componenets/dealer/DealerConnections/DealerConnectionFlatrate/details-page/DealerConnectionFlatrateSelection")
);
const NewDelayTemplate = lazy(
  () => import("./componenets/DispatchDelay/DelayProcessing/NormalDelayProcessing/NewDelay/NewDelayTemplate")
);
const ShuttleWeeklySummaryReport = lazy(
  () =>
    import("./componenets/ControlRoom/Reports/Shuttle/ShuttleWeeklySummaryReport/ShuttleWeeklySummaryReport")
);
const ReprintSelectionTemplate = lazy(
  () => import("./componenets/Units/ReprintBol/ReprintSelectionTemplate")
);
const ReprintDriverSelectionMainPage = lazy(
  () => import("./componenets/Units/ReprintBol/DriverSelectionScreen/ReprintDriverSelectionMainPage")
);
const ReprintUnitConfirmationScreen = lazy(
  () => import("./componenets/Units/ReprintBol/ReprintUnitConfirmationScreen")
);
const ReprintDispatchConfirmationScreen = lazy(
  () => import("./componenets/Units/ReprintBol/ReprintDispatchConfirmationScreen")
);
const ReprintOutputSelectionScreen = lazy(
  () => import("./componenets/Units/ReprintBol/ReprintOutputSelectionScreen")
);
const ReprintDispatchSelectionScreen = lazy(
  () => import("./componenets/Units/ReprintBol/ReprintDispatchSelectionScreen/ReprintDispatchSelectionScreen")
);
const RerouteLocation = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/Reroute/RerouteLocation/RerouteLocation")
);
const EditDelayTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/DelayProcessing/NormalDelayProcessing/EditDelay/EditDelayTemplate")
);
const ViewDelayPage = lazy(
  () => import("./componenets/DispatchDelay/DelayProcessing/NormalDelayProcessing/ViewDelay/ViewDelayPage")
);
const NewBreakdownTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/BreakdownProcessing/BreakdownDetails/NewBreakdown/NewBreakdownTemplate")
);
const EditBreakdownTemplate = lazy(
  () =>
    import("./componenets/DispatchDelay/BreakdownProcessing/BreakdownDetails/EditBreakdown/EditBreakdownTemplate")
);
const ViewBreakdownPage = lazy(
  () =>
    import("./componenets/DispatchDelay/BreakdownProcessing/BreakdownDetails/ViewBreakdown/ViewBreakdownPage")
);
const EmailAttachmentForm = lazy(
  () => import("./componenets/System/Emails/EmailAttachments/details-page/EmailAttachmentForm")
);
const DealerGroupViewPage = lazy(
  () => import("./componenets/dealer/DealerGroups/edit-dealer-groups/DealerGroupViewPage")
);
const DealerGroupsListingMainPage = lazy(
  () => import("./componenets/dealer/DealerGroups/browse-page/DealerGroupsListingMainPage")
);
const DealerDeatilsEditPage = lazy(
  () => import("./componenets/dealer/DealerGroups/edit-dealers/DealerDeatilsEditPage")
);
const DriverDOTInspectionBrowse = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDOTInspection/browse-page/DriverDOTInspectionBrowse")
);
const NewDOTInspectionContent = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDOTInspection/details-page/NewDOTInspection/NewDOTInspectionContent")
);
const EditDOTInspectionContent = lazy(
  () =>
    import("./componenets/Compliance/DriverFile/DriverDOTInspection/details-page/EditDOTInspection/EditDOTInspectionContent")
);

const DriverDeliverySummaryListingReport = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/DriverDeliverySummaryReport.jsx/DriverDeliverySummaryListingReport")
);
const DriverDeleaseReport = lazy(
  () => import("./componenets/Compliance/Reports/DriverDeleaseReport/DriverDeleaseReport")
);
const HotListing = lazy(() => import("./componenets/Operations/Reports/Units/HotListingReport/HotListing"));
const ReleaseReserveTemplate = lazy(
  () =>
    import("./componenets/Operations/DriverServices/DriverServiceEdit/Tabs/GeneralTab/ReleaseReserve/ReleaseReserveTemplate")
);
const StateMileageReportMain = lazy(
  () => import("./componenets/Compliance/Reports/StateMileageReport/StateMileageReportMain")
);
const RandomTestingYearlySummaryReport = lazy(
  () =>
    import("./componenets/Compliance/Reports/RandomTestingYearlySummaryReport/RandomTestingYearlySummaryReport")
);
const DamageCodeReport = lazy(
  () => import("./componenets/DispatchDelay/Reports/DamageCodeReport/DamageCodeReport")
);
const ShuttleReport = lazy(
  () => import("./componenets/ControlRoom/Reports/Shuttle/ShuttleReport/ShuttleReport")
);
const UndispatchedListingReport = lazy(
  () => import("./componenets/Operations/Reports/Units/UndispatchedListingReport/UndispatchedListingReport")
);
const TruckMaintenanceReport = lazy(
  () => import("./componenets/Compliance/Reports/TruckMaintenanceReport/TruckMaintenanceReport")
);
const DriverTripSummaryReport = lazy(
  () => import("./componenets/Compliance/Reports/DriverTripSummaryReport/DriverTripSummaryReport")
);
const DamageCheckRequestReport = lazy(
  () => import("./componenets/DispatchDelay/Reports/DamageCheckRequest/DamageCheckRequestReport")
);
const DriverChargeableTotalReport = lazy(
  () => import("./componenets/DispatchDelay/Reports/DriverChargeableTotalReport/DriverChargeableTotalReport")
);
const YardCapacityReport = lazy(
  () => import("./componenets/ControlRoom/Reports/YardCapacityReport/YardCapacityReport")
);
const ClosedClaimsReserveReport = lazy(
  () => import("./componenets/DispatchDelay/Reports/closedClaimsReserveReport/ClosedClaimsReserveReport")
);
const CustomerActivitySummaryReport = lazy(
  () => import("./componenets/customer/Reports/customerActivitySummaryReport/CustomerActivitySummaryReport")
);
const NewDamageTemplate = lazy(
  () => import("./componenets/DispatchDelay/DamageProcessing/DamageDetails/NewDamage/NewDamageTemplate")
);
const EditDamageTemplate = lazy(
  () => import("./componenets/DispatchDelay/DamageProcessing/DamageDetails/EditDamage/EditDamageTemplate")
);
const ViewDamagePage = lazy(
  () => import("./componenets/DispatchDelay/DamageProcessing/DamageDetails/ViewDamage/ViewDamagePage")
);
const Orientation = lazy(() => import("./componenets/Compliance/DriverFile/OrientationForms/Orientation"));
const ComplianceOrientation = lazy(
  () => import("./componenets/Compliance/OrientationForms/ComplianceOrientation")
);
const DriverReserveAdjustment = lazy(
  () => import("./componenets/Compliance/DriverFile/DriverRserve/Adjust/DriverReserveAdjustment")
);
const ServiceFleetProfileReport = lazy(
  () => import("./componenets/Operations/Reports/Units/ServiceFleetProfileReport/ServiceFleetProfileReport")
);
const CustomerListingReport = lazy(
  () => import("./componenets/Compliance/Reports/CustomerListingReport/CustomerListingReport")
);
const OutstandingDriverPaybackReport = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/OutstandingDriverPaybackReport/OutstandingDriverPaybackReport")
);
const DispatchesByDispatcherReport = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/DispatchesByDispatcherReport/DispatchesByDispatcherReport")
);
const OutstandingDriverSettlementReport = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/OutstandingDriverSettlementReport/OutstandingDriverSettlementReport")
);

const WeeklyProjectionsReport = lazy(
  () => import("./componenets/Operations/Reports/Drivers/WeeklyProjectionsReport/WeeklyProjectionsReport")
);
const TripListingByCustomerReport = lazy(
  () =>
    import("./componenets/Operations/Reports/Customers/TripListingByCustomerReport/TripListingByCustomerReport")
);
const UnitPickupExceptionReport = lazy(
  () => import("./componenets/Operations/Reports/Drivers/UnitPickupExceptionReport/UnitPickupExceptionReport")
);
const OnRoadNotDeliveredReport = lazy(
  () => import("./componenets/Operations/Reports/Drivers/OnRoadNotDeliveredReport/OnRoadNotDeliveredReport")
);
const PickupFeesReport = lazy(
  () => import("./componenets/Operations/Reports/Customers/PickupFeesReport/PickupFeesReport")
);
const UnitBrowseScreen = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/UnitPickupExceptionReport/browse-screen/UnitBrowseScreen")
);
const UnitCommentsScreen = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/UnitPickupExceptionReport/comments-screen/UnitCommentsScreen")
);
const UnitPickupExceptionReportMail = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/UnitPickupExceptionReport/mail-screen/UnitPickupExceptionReportMail")
);
const CustomerSalesReport = lazy(
  () => import("./componenets/Operations/Reports/Customers/CustomerSalesReport/CustomerSalesReport")
);
const DamageReport = lazy(() => import("./componenets/DispatchDelay/Reports/DamageReport/DamageReport"));
const DamageStatusReport = lazy(
  () => import("./componenets/DispatchDelay/Reports/DamageStatusReport/DamageStatusReport")
);
const DelayedUnitReport = lazy(
  () => import("./componenets/DispatchDelay/Reports/DelayedUnitReport/DelayedUnitReport")
);
const YardInventoryReport = lazy(
  () => import("./componenets/ControlRoom/Reports/YardInventoryReport/YardInventoryReport")
);
const CustomerTripSummaryReport = lazy(
  () =>
    import("./componenets/Operations/Reports/Customers/CustomerTripSummaryReport/CustomerTripSummaryReport")
);
const EmailMVRListReport = lazy(
  () => import("./componenets/Compliance/Reports/EmailMVRListReport/EmailMVRListReport")
);
const IRPPlateListReport = lazy(
  () => import("./componenets/Compliance/Reports/IRPPlateListReport/IRPPlateListReport")
);
const CustomerPlantReleasesTemplate = lazy(
  () => import("./componenets/customer/CustomerPlantReleases/CustomerPlantReleasesTemplate")
);
const CustomerPlantReleasesBrowse = lazy(
  () => import("./componenets/customer/CustomerPlantReleases/BrowsePage/CustomerPlantReleasesBrowse")
);
const CustomerPlantReleasesColumns = lazy(
  () =>
    import("./componenets/customer/CustomerPlantReleases/CustomerPlantReleaseColumns/CustomerPlantReleasesColumns")
);
const CustomerPlantReleaseContent = lazy(
  () =>
    import("./componenets/customer/CustomerPlantReleases/CustomerPlantReleaseEdit/CustomerPlantReleaseContent")
);
const PlantReleaseTest = lazy(
  () => import("./componenets/customer/CustomerPlantReleases/CustomerPlantReleaseTest/PlantReleaseTest")
);
const PlantReleaseTestResult = lazy(
  () => import("./componenets/customer/CustomerPlantReleases/CustomerPlantReleaseTest/PlantReleaseTestResult")
);
const ImportListTemplate = lazy(
  () => import("./componenets/Releases/PlantRelease/PlantReleaseImportList/ImportListTemplate")
);
const TestResultContent = lazy(
  () => import("./componenets/Releases/PlantRelease/PlantReleaseTestResult/TestResultContent")
);
const BulkOrderEntry = lazy(() => import("./componenets/Units/BulkOrderEntry/BulkOrderEntry"));
const DriverPayLog = lazy(() => import("./componenets/Compliance/DriverFile/DriverPayLog"));
const ReturnTMR = lazy(() => import("./componenets/Compliance/DriverFile/ReturnTMR/ReturnTMR"));

const ComplianceHoldContent = lazy(
  () => import("./componenets/Compliance/DriverFile/Holds/ComplianceHoldContent")
);
const AvailableBrowsescreen = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/AvailableDriverList/Browse-Page/AvailableBrowsescreen")
);
const AvaliableComments = lazy(
  () =>
    import("./componenets/Operations/Reports/Drivers/AvailableDriverList/CommentsScreen/AvaliableComments")
);

class App extends Component {
  render() {
    return (
      <BrowserRouter future={{ v7_startTransitions: true }}>
        <Fragment>
          <Navbar />
          <div>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/login" element={<PublicRoute />}>
                  <Route path="/login" element={<Login />} />
                </Route>
                {/* PRIVATE ROUTES */}
                {/* Private Route opening tag */}
                <Route path="/" element={<PrivateRoute />}>
                  {/* new refactoring routes */}
                  <Route path="/*" element={<MainRoutes />} />
                  {/* Add all private routes inside this tag */}
                  <Route path="/auth/force-password-change" element={<ForcePasswordChange />} />
                  <Route exact path="/" element={<HorizonTransport />} />
                  <Route path="/dealers" element={<DealersMainPage />}></Route>
                  <Route path="/add-dealer" element={<AddFormTemplate />}></Route>
                  <Route path="/add-printer" element={<PrinterAddFormTemplate />}></Route>
                  <Route path="/edit-printer/:id/:pageNumber" element={<PrinterAddFormTemplate />}></Route>
                  <Route path="/printer" element={<PrinterListingMainPage />}></Route>
                  <Route path="/regions" element={<UpdatedRegionsMainPage />} />
                  <Route path="/add-region/:regionId/:pageNumber" element={<RegionEditForm />} />
                  <Route path="/add-region" element={<RegionEditForm />} />
                  <Route path="/add-dealer/:id/:pageNumber" element={<AddFormTemplate />}></Route>
                  <Route path="/dealer-connections" element={<DealerConnectionsMainPage />} />
                  <Route path="/add-dealer-connections" element={<DealerConnectionsEditForm />} />
                  <Route
                    path="/add-dealer-connections/:dealerConnectionPK/:pagenumber"
                    element={<DealerConnectionsEditForm />}
                  />
                  <Route
                    path="/add-dealer-connections/:dealerConnectionPK"
                    element={<DealerConnectionsEditForm />}
                  />
                  <Route
                    path="/add-incompleteDealer/:inCompleteDealerPK/:pageNumber"
                    element={<AddFormTemplate />}
                  ></Route>
                  <Route path="/contacts-page" element={<ContactsPage />} />
                  <Route path="/emails-page" element={<EmailsPage />} />
                  {/* <Route path="/order-entry" element={<OrderEntryTemplate />} /> */}
                  <Route path="/edit-master-unit-selection" element={<EditMasterUnitSelection />} />
                  <Route path="/bulk-invoices/:cpk/:pageNumber" element={<BulkBrowsePage />} />
                  <Route
                    path="/bulk-invoices/:cpk/:pageNumber/add-bulkinvoice"
                    element={<BulkFormTemplate />}
                  />
                  <Route
                    path="/bulk-invoices/:cpk/:pageNumber/add-bulkinvoice/:bipk"
                    element={<BulkFormTemplate />}
                  />
                  <Route path="/customer-delay/:cpk/:pageNumber" element={<CustomerDelayBrowse />} />
                  <Route
                    path="/add-customer-delay/:cpk/:pageNumber/new-page"
                    element={<CustomerDelayTemplate />}
                  />
                  <Route
                    path="/add-customer-delay/:cpk/:pageNumber/new-page/:id"
                    element={<CustomerDelayTemplate />}
                  />
                  <Route path="/customer-email-maintenance/:cpk/:pageNumber" element={<BrowsePage />} />
                  <Route
                    path="/customer-email-maintenance/:cpk/:pageNumber/new-page"
                    element={<CustomerEmailFromTamplate />}
                  />
                  <Route
                    path="/customer-email-maintenance/:cpk/:pageNumber/new-page/:cupk"
                    element={<CustomerEmailFromTamplate />}
                  />
                  <Route path="/customer-browse-page" element={<CustomerMainPage />} />
                  <Route path="/add-customer" element={<CustomerMaintananceFormTemplate />} />
                  <Route path="/add-customer/:id/:pageNumber" element={<CustomerMaintananceFormTemplate />} />
                  <Route
                    path="/add-incompleteCustomer/:incompletecustomerPK/:pageNumber"
                    element={<CustomerMaintananceFormTemplate />}
                  />
                  <Route
                    path="/customer-order-users/:customerId/:customerPageNo"
                    element={<CustomerOrderUsers />}
                  />
                  <Route
                    path="/customer-order-users/:customerId/:customerPageNo/new-record"
                    element={<CustomerOrderUsersForm />}
                  />
                  <Route
                    path="/customer-order-users/:customerId/:customerPageNo/:recordId/:pageNo"
                    element={<CustomerOrderUsersForm />}
                  />
                  <Route
                    path="/customer-open-balance/:customerPK/:customerPageNumber"
                    element={<COBMainPage />}
                  />
                  <Route
                    path="/add-customer-open-balance/:customerId/:customerPageNumber"
                    element={<COBViewPage />}
                  />
                  <Route
                    path="/add-customer-open-balance/:id/:customerId/:customerPageNumber/:pageNumber"
                    element={<COBViewPage />}
                  />
                  <Route
                    path="/customer-dpu-restrictions/:customerId/:customerPageNo"
                    element={<CustomerDPURestrictions />}
                  />
                  <Route
                    path="/customer-dpu-restrictions/:customerId/:customerPageNo/new-record"
                    element={<CustomerDPURestrictionsForm />}
                  />
                  <Route
                    path="/customer-dpu-restrictions/:customerId/:customerPageNo/:recordId/:pageNo"
                    element={<CustomerDPURestrictionsForm />}
                  />
                  <Route path="/customer-contact/:customerId/:pageNumber" element={<CCMainPage />} />
                  <Route
                    path="/add-customer-contacts/:customerId/:pageNumber/new-page"
                    element={<AddCustomerContacts />}
                  />
                  <Route
                    path="/add-customer-contacts/:customerId/:pageNumber/new-page/:id"
                    element={<AddCustomerContacts />}
                  />
                  <Route
                    path="/customer-credit-card/:customerId/:pageNumber"
                    element={<CustomerCreditCardMainPage />}
                  />
                  <Route
                    path="/add-customer-credit-card/:customerId/:pageNumber/new-page"
                    element={<CustomerCreditCardForm />}
                  />
                  <Route
                    path="/add-customer-credit-card/:customerId/:pageNumber/new-page/:id"
                    element={<CustomerCreditCardForm />}
                  />
                  <Route path="/customer-plant-release-browse" element={<CustomerPlantReleasesTemplate />}>
                    <Route index element={<CustomerPlantReleasesBrowse />} />
                    <Route path="new" element={<CustomerPlantReleaseContent />} />
                    <Route path=":id" element={<CustomerPlantReleaseContent />} />
                    <Route path=":id/columns" element={<CustomerPlantReleasesColumns />} />
                    <Route path=":id/test" element={<PlantReleaseTest />} />
                    <Route path=":id/testResult" element={<PlantReleaseTestResult />} />
                  </Route>
                  <Route
                    path="/add-customer-credit-card/:customerId/:pageNumber/new-page/:id"
                    element={<CustomerCreditCardForm />}
                  />
                  <Route path="/alternate-contacts" element={<AlternateContactMainPage />} />
                  <Route path="/add-alternate-contacts" element={<AlternateContactForm />} />
                  <Route path="/add-alternate-contacts/:id/:pageNumber" element={<AlternateContactForm />} />
                  <Route path="/shuttle-citys" element={<ShuttleCitysMainPage />} />
                  <Route path="/add-shuttle-citys" element={<ShuttleCitysFormTemplate />} />
                  <Route path="/add-shuttle-citys/:id/:pageNumber" element={<ShuttleCitysFormTemplate />} />
                  <Route path="/check-pay-to" element={<CheckPayToMainpage />} />
                  <Route path="/check-pay-to/add" element={<CheckPayToTemplate />} />
                  <Route path="/check-pay-to/:id/:pageNumber" element={<CheckPayToTemplate />} />
                  <Route path="/holidays" element={<HolidaysMainPage />} />
                  <Route path="/holidays-add" element={<HolidaysForm />} />
                  <Route path="/holidays-add/:id/:pageNumber" element={<HolidaysForm />} />
                  <Route path="/unit-activation-selections" element={<UnitActivationSelection />} />
                  <Route path="/unit-activation-shuttle-delay" element={<UnitActivationShuttleDelay />} />
                  <Route
                    path="/unit-activation-single-soft-post"
                    element={<UnitActivationSingleSoftPost />}
                  />
                  <Route
                    path="/unit-activation-single-selection"
                    element={<UnitActivationSingleSelection />}
                  />
                  <Route path="/unit-activation-multi-unit" element={<UnitActivationMultiUnit />} />
                  <Route
                    path="/unit-activation-multi-unit-browse"
                    element={<UnitActivationMultiUnitBrowse />}
                  />
                  <Route
                    path="/unit-activation-multi-unit-sister-browse"
                    element={<UnitActivationMultiUnitSisterBrowse />}
                  />
                  <Route path="/unit-activation-multi-unit-hold" element={<UnitActivationMultiUnitHold />} />
                  <Route path="/state-permits" element={<StatePermitListingMainPage />} />
                  <Route path="/state-permits-edit" element={<FormTemplate />} />
                  <Route path="/state-permits-edit/:id/:pageNumber" element={<FormTemplate />} />
                  <Route path="/dealer-email-maintenance/:id" element={<DealerEmailMainPage />} />
                  <Route path="/add-dealer-email-maintenance/:id" element={<DealerEmailForm />} />
                  <Route
                    path="/add-dealer-email-maintenance/:id/:dealerEmailsPK/:pageNumber"
                    element={<DealerEmailForm />}
                  />
                  <Route path="/plant-to-yard-transfer" element={<PlantToYardTransferMainPage />} />
                  <Route
                    path="/plant-to-yard-transfer-customer"
                    element={<PlantToYardTransferCustomerMainPage />}
                  />
                  <Route
                    path="/plant-to-yard-transfer/:customerFK"
                    element={<PlantToYardTransferFormTemplate />}
                  />
                  <Route
                    path="/plant-to-yard-transfer/:plantToYardTransferPK/:customerFK"
                    element={<PlantToYardTransferFormTemplate />}
                  />
                  <Route path="/unit-type" element={<UnitTypeListingMainPage />} />
                  <Route path="/unit-type-new" element={<UnitTypeTemplate />} />
                  <Route path="/unit-type-edit/:id/:pageNumber" element={<UnitTypeTemplate />} />
                  <Route path="/delease-items" element={<DeleaseItemsMainpage />} />
                  <Route path="/delease-items/add" element={<DeleaseItemsTemplate />} />
                  <Route path="/delease-items/:id/:pageNumber" element={<DeleaseItemsTemplate />} />
                  <Route path="/delay-unit-codes-listing" element={<DelayUnitCodesMainPage />} />
                  <Route path="/delay-unit-codes/:id/:pageNumber" element={<DelayUnitCodesEditTemplate />} />
                  <Route path="/delay-unit-codes/add" element={<DelayUnitCodesEditTemplate />} />
                  <Route path="/compilance-items-add" element={<ComplianceItemsTemplate />} />
                  <Route path="/compilance-items" element={<ComplianceItemsMainPage />} />
                  <Route path="/compilance-items-add/:id/:pageNumber" element={<ComplianceItemsTemplate />} />
                  <Route path="/delease-code" element={<DeleaseCodeMainPage />} />
                  <Route path="/delease-code-new" element={<DeleaseCodeTemplate />} />
                  <Route path="/delease-code-new/:id/:pageNumber" element={<DeleaseCodeTemplate />} />
                  <Route path="/customer-dealers" element={<DealerListingMainPage />} />
                  <Route path="/customer-dealers-browse/:id/:pageNumber" element={<ListingMainPage />} />
                  <Route path="/add-customer-dealers/:id/:pageNumber" element={<NewPage />} />
                  <Route
                    path="/edit-customer-dealer/:group/:dealerId/:selectionId"
                    element={<CustomerDelaerEditTemplate />}
                  />
                  <Route
                    path="/add-customer-dealers-details/:group/:dealerId"
                    element={<CustomerDelaerEditTemplate />}
                  />
                  <Route path="/customer-dealer-routes/:id/:group/:dealerId" element={<RoutesMainPage />} />
                  <Route
                    path="/customer-dealer-routes-sequence/:id/:group/:dealerId"
                    element={<RoutesSequenceMainPage />}
                  />
                  <Route
                    path="/edit-customer-dealer-routes/:customerdealerid/:routesid/:group/:dealerId"
                    element={<RoutesEditForm />}
                  />
                  <Route
                    path="/add-customer-dealer-routes/:customerdealerid/:group/:dealerId"
                    element={<RoutesEditForm />}
                  />
                  <Route path="/dispatch-hold" element={<DispatchHoldsMainPage />} />
                  <Route path="/dispatch-hold-new" element={<DispatchHoldsTemplate />} />
                  <Route path="/dispatch-hold-new/:id/:pageNumber" element={<DispatchHoldsTemplate />} />
                  <Route path="/supplemental-rates" element={<SupplementalMainPage />} />
                  <Route path="/supplemental-rates-customer-new" element={<CustomerSelectionPage />} />
                  <Route
                    path="/supplemental-rates-customer-selection/:supplementalRatesPK/:pageNumber"
                    element={<CustomerSelectionPage />}
                  />
                  <Route path="/plant-to-plant-transfer" element={<PlantToPlantTransferMainPage />} />
                  <Route
                    path="/plant-to-plant-transfer-customer"
                    element={<PlantToPlantTransferCustomerMainPage />}
                  />
                  <Route
                    path="/plant-to-plant-transfer-customer/:customerId/add"
                    element={<PlantToPlantTransferFormTemplate />}
                  />
                  <Route path="/plant-to-plant-transfer/:id" element={<PlantToPlantTransferFormTemplate />} />
                  <Route path="/yard-to-yard-shuttle" element={<YardToYardMainPage />} />
                  <Route path="/yard-to-yard-shuttle/add" element={<YardToYardFormTemplate />} />
                  <Route
                    path="/yard-to-yard-shuttle/:yardToYardShuttlePK"
                    element={<YardToYardFormTemplate />}
                  />
                  <Route
                    path="/supplemental-rates-add/:supplementalRatesPK/:pageNumber"
                    element={<SuppleMentalRatesTemplate />}
                  />
                  <Route path="/supplemental-rates-new" element={<SuppleMentalRatesTemplate />} />
                  <Route path="/company-maintenance" element={<CompanyTemplate />} />
                  <Route path="/dpu-unit-selection" element={<DpuInstructionsSelectionTemplate />} />
                  <Route path="/dpu-view-screen/:id/:pageNumber" element={<DpuInstructionsViewTemplate />} />
                  <Route path="/driver-termination-letter" element={<TerminationLetterMainPage />} />
                  <Route path="/add-driver-termination-letter" element={<DriverTerminationLetterForm />} />
                  <Route
                    path="/edit-driver-termination-letter/:id/:pageNumber"
                    element={<DriverTerminationLetterForm />}
                  />
                  <Route path="/reserves" element={<ReservesMainPage />} />
                  <Route path="/reserves/add" element={<ReservesTemplate />} />
                  <Route path="/reserves/:id/:pageNumber" element={<ReservesTemplate />} />
                  <Route path="/delay-resources" element={<DelayResourcesMainPage />} />
                  <Route path="/add-delay-resources" element={<DelayResourcesEditForm />} />
                  <Route path="/edit-delay-resources/:id/:pageNumber" element={<DelayResourcesEditForm />} />
                  <Route path="/port-of-entry/add" element={<PortsOfEntryTemplate />} />
                  <Route path="/port-of-entry" element={<PortsOfEntryBrowse />} />
                  <Route path="/port-of-entry/:id/:pageNumber" element={<PortsOfEntryTemplate />} />
                  <Route path="/check-pay-to" element={<CheckPayToMainpage />} />
                  <Route path="/check-pay-to/add" element={<CheckPayToTemplate />} />
                  <Route path="/check-pay-to/:id/:pageNumber" element={<CheckPayToTemplate />} />
                  <Route path="/holidays" element={<HolidaysMainPage />} />
                  <Route path="/holidays-add" element={<HolidaysForm />} />
                  <Route path="/holidays-add/:id/:pageNumber" element={<HolidaysForm />} />
                  <Route path="/unit-activation-selections" element={<UnitActivationSelection />} />
                  <Route path="/unit-activation-shuttle-delay" element={<UnitActivationShuttleDelay />} />
                  <Route
                    path="/unit-activation-single-soft-post"
                    element={<UnitActivationSingleSoftPost />}
                  />
                  <Route
                    path="/unit-activation-single-selection"
                    element={<UnitActivationSingleSelection />}
                  />
                  <Route
                    path="/unit-activation-single-selection/:breakdownUnitFK"
                    element={<UnitActivationSingleSelection />}
                  />{" "}
                  {/* For navigation from Breakdown */}
                  <Route path="/unit-activation-multi-unit" element={<UnitActivationMultiUnit />} />
                  <Route
                    path="/unit-activation-multi-unit-browse"
                    element={<UnitActivationMultiUnitBrowse />}
                  />
                  <Route
                    path="/unit-activation-multi-unit-sister-browse"
                    element={<UnitActivationMultiUnitSisterBrowse />}
                  />
                  <Route path="/unit-activation-multi-unit-hold" element={<UnitActivationMultiUnitHold />} />
                  <Route path="/state-permits" element={<StatePermitListingMainPage />} />
                  <Route path="/state-permits-edit" element={<FormTemplate />} />
                  <Route path="/state-permits-edit/:id/:pageNumber" element={<FormTemplate />} />
                  <Route path="/dealer-email-maintenance/:id" element={<DealerEmailMainPage />} />
                  <Route path="/add-dealer-email-maintenance/:id" element={<DealerEmailForm />} />
                  <Route
                    path="/add-dealer-email-maintenance/:id/:dealerEmailsPK/:pageNumber"
                    element={<DealerEmailForm />}
                  />
                  <Route path="/plant-to-yard-transfer" element={<PlantToYardTransferMainPage />} />
                  <Route
                    path="/plant-to-yard-transfer-customer"
                    element={<PlantToYardTransferCustomerMainPage />}
                  />
                  <Route
                    path="/plant-to-yard-transfer/:customerFK"
                    element={<PlantToYardTransferFormTemplate />}
                  />
                  <Route
                    path="/plant-to-yard-transfer/:plantToYardTransferPK/:customerFK"
                    element={<PlantToYardTransferFormTemplate />}
                  />
                  <Route path="/unit-type" element={<UnitTypeListingMainPage />} />
                  <Route path="/unit-type-new" element={<UnitTypeTemplate />} />
                  <Route path="/unit-type-edit/:id/:pageNumber" element={<UnitTypeTemplate />} />
                  <Route path="/delease-items" element={<DeleaseItemsMainpage />} />
                  <Route path="/delease-items/add" element={<DeleaseItemsTemplate />} />
                  <Route path="/delease-items/:id/:pageNumber" element={<DeleaseItemsTemplate />} />
                  <Route path="/delay-unit-codes-listing" element={<DelayUnitCodesMainPage />} />
                  <Route path="/delay-unit-codes/:id/:pageNumber" element={<DelayUnitCodesEditTemplate />} />
                  <Route path="/delay-unit-codes/add" element={<DelayUnitCodesEditTemplate />} />
                  <Route path="/compilance-items-add" element={<ComplianceItemsTemplate />} />
                  <Route path="/compilance-items" element={<ComplianceItemsMainPage />} />
                  <Route path="/compilance-items-add/:id/:pageNumber" element={<ComplianceItemsTemplate />} />
                  <Route path="/delease-code" element={<DeleaseCodeMainPage />} />
                  <Route path="/delease-code-new" element={<DeleaseCodeTemplate />} />
                  <Route path="/delease-code-new/:id/:pageNumber" element={<DeleaseCodeTemplate />} />
                  <Route path="/customer-dealers" element={<DealerListingMainPage />} />
                  <Route path="/customer-dealers-browse/:id/:pageNumber" element={<ListingMainPage />} />
                  <Route path="/add-customer-dealers/:id/:pageNumber" element={<NewPage />} />
                  <Route
                    path="/edit-customer-dealer/:group/:dealerId/:selectionId"
                    element={<CustomerDelaerEditTemplate />}
                  />
                  <Route
                    path="/add-customer-dealers-details/:group/:dealerId"
                    element={<CustomerDelaerEditTemplate />}
                  />
                  <Route path="/customer-dealer-routes/:id/:group/:dealerId" element={<RoutesMainPage />} />
                  <Route
                    path="/customer-dealer-routes-sequence/:id/:group/:dealerId"
                    element={<RoutesSequenceMainPage />}
                  />
                  <Route
                    path="/edit-customer-dealer-routes/:customerdealerid/:routesid/:group/:dealerId"
                    element={<RoutesEditForm />}
                  />
                  <Route
                    path="/add-customer-dealer-routes/:customerdealerid/:group/:dealerId"
                    element={<RoutesEditForm />}
                  />
                  <Route path="/dispatch-hold" element={<DispatchHoldsMainPage />} />
                  <Route path="/dispatch-hold-new" element={<DispatchHoldsTemplate />} />
                  <Route path="/dispatch-hold-new/:id/:pageNumber" element={<DispatchHoldsTemplate />} />
                  <Route path="/supplemental-rates" element={<SupplementalMainPage />} />
                  <Route path="/supplemental-rates-customer-new" element={<CustomerSelectionPage />} />
                  <Route
                    path="/supplemental-rates-customer-selection/:supplementalRatesPK/:pageNumber"
                    element={<CustomerSelectionPage />}
                  />
                  <Route path="/plant-to-plant-transfer" element={<PlantToPlantTransferMainPage />} />
                  <Route
                    path="/plant-to-plant-transfer-customer"
                    element={<PlantToPlantTransferCustomerMainPage />}
                  />
                  <Route
                    path="/plant-to-plant-transfer-customer/:customerId/add"
                    element={<PlantToPlantTransferFormTemplate />}
                  />
                  <Route path="/plant-to-plant-transfer/:id" element={<PlantToPlantTransferFormTemplate />} />
                  <Route path="/yard-to-yard-shuttle" element={<YardToYardMainPage />} />
                  <Route path="/yard-to-yard-shuttle/add" element={<YardToYardFormTemplate />} />
                  <Route
                    path="/yard-to-yard-shuttle/:yardToYardShuttlePK"
                    element={<YardToYardFormTemplate />}
                  />
                  <Route
                    path="/supplemental-rates-add/:supplementalRatesPK/:pageNumber"
                    element={<SuppleMentalRatesTemplate />}
                  />
                  <Route path="/supplemental-rates-new" element={<SuppleMentalRatesTemplate />} />
                  <Route path="/company-maintenance" element={<CompanyTemplate />} />
                  <Route path="/dpu-unit-selection" element={<DpuInstructionsSelectionTemplate />} />
                  <Route path="/dpu-view-screen/:id/:pageNumber" element={<DpuInstructionsViewTemplate />} />
                  <Route path="/driver-termination-letter" element={<TerminationLetterMainPage />} />
                  <Route path="/add-driver-termination-letter" element={<DriverTerminationLetterForm />} />
                  <Route
                    path="/edit-driver-termination-letter/:id/:pageNumber"
                    element={<DriverTerminationLetterForm />}
                  />
                  <Route path="/reserves" element={<ReservesMainPage />} />
                  <Route path="/reserves/add" element={<ReservesTemplate />} />
                  <Route path="/reserves/:id/:pageNumber" element={<ReservesTemplate />} />
                  <Route path="/delay-resources" element={<DelayResourcesMainPage />} />
                  <Route path="/add-delay-resources" element={<DelayResourcesEditForm />} />
                  <Route path="/edit-delay-resources/:id/:pageNumber" element={<DelayResourcesEditForm />} />
                  <Route path="/port-of-entry/add" element={<PortsOfEntryTemplate />} />
                  <Route path="/port-of-entry" element={<PortsOfEntryBrowse />} />
                  <Route path="/port-of-entry/:id/:pageNumber" element={<PortsOfEntryTemplate />} />
                  <Route
                    path="/plant-browse-page/:customerId/:pageNumber"
                    element={<CustomerPlantMainPage />}
                  />
                  <Route
                    path="/add-customer-plant/:customerId/:pageNumber/new-record"
                    element={<CustomerPlantFormTemplate />}
                  />
                  <Route path="/customer-plant-browse-page" element={<MainPageCustomer />} />
                  <Route
                    path="/add-customer-plant/:customerId/:pageNumber/:id"
                    element={<CustomerPlantFormTemplate />}
                  />
                  <Route
                    path="/add-incomplete-customer-plant/:customerId/:pageNumber/:incompleteplantPK"
                    element={<CustomerPlantFormTemplate />}
                  />
                  <Route path="/yard-maintenance" element={<YardMainPage />} />
                  <Route path="/add-yard-maintenance" element={<YardFormTemplate />} />
                  <Route path="/add-yard-maintenance/:id/:pageNumber" element={<YardFormTemplate />} />
                  <Route path="/plant-release-selection-screen" element={<SelectionTemplate />} />
                  <Route path="/plant-release-option-screen" element={<OptionTemplate />} />
                  <Route path="/plant-release-single-screen" element={<SingleTemplate />} />
                  <Route path="/plant-release-dealy-screen" element={<DelayEntryTemplate />} />
                  <Route path="/plant-release-multibrowse-screen" element={<MultiBrowseTemplate />} />
                  <Route path="/special-codes-maintenance" element={<SpecialCodesMainPage />} />
                  <Route path="/special-codes-maintenance/add" element={<SpecialCodesFormTemplate />} />
                  <Route
                    path="/special-codes-maintenance/:id/:pageNumber"
                    element={<SpecialCodesFormTemplate />}
                  />
                  <Route
                    path="/customer-plant-delay-resources/:customerId/:id/:pageNumber"
                    element={<CustomerPlantDelayResourcesMain />}
                  />
                  <Route
                    path="/customer-plant-delay-resources/:customerId/:id/:pageNumber/new-page"
                    element={<CustomerPlantDelayResourcesTemplate />}
                  />
                  <Route
                    path="/customer-plant-delay-resources/:customerId/:id/:pageNumber/:delayPk"
                    element={<CustomerPlantDelayResourcesTemplate />}
                  />
                  <Route path="/import-brokers" element={<ImportBrokesBrowse />} />
                  <Route path="/import-brokers/add" element={<ImportBrokesTemplate />} />
                  <Route path="/import-brokers/:id/:pageNumber" element={<ImportBrokesTemplate />} />
                  <Route path="/forms-maintenance" element={<FormBrowse />} />
                  <Route path="/forms-maintenance-edit" element={<FormsEditTemplate />} />
                  <Route path="/forms-maintenance/:id/:pageNumber" element={<FormsEditTemplate />} />
                  <Route path="/user-maintenance" element={<UserMaintenanceMainPage />} />
                  <Route path="/user-maintenance/add" element={<UserMaintenanceFormTemplate />} />
                  <Route path="/user-maintenance/:id" element={<UserMaintenanceFormTemplate />} />
                  <Route path="/dealer-contacts/:id/:pageNumber" element={<DealerContactMainPage />} />
                  <Route path="/dealer-contacts/:id/:pageNumber/add" element={<DealerContactTemplate />} />
                  <Route
                    path="/dealer-contacts/:id/:pageNumber/add/:dcfk"
                    element={<DealerContactTemplate />}
                  />
                  <Route path="/equipment-maintenance" element={<EquipmentListingMainPage />} />
                  <Route path="/equipment-maintenance-edit" element={<EquipmentFormTemplate />} />
                  <Route
                    path="/equipment-maintenance-edit/:id/:pageNumber"
                    element={<EquipmentFormTemplate />}
                  />
                  <Route path="/equipment-Maintenance-history/:id" element={<HistoryMainPage />} />
                  <Route path="/edit-shuttle-driver" element={<EditShuttleDriverTemplate />} />
                  <Route path="/edit-shuttle-unit" element={<EditShuttleUnitTemplate />} />
                  <Route
                    path="/edit-shuttle-yard-to-plant/:id"
                    element={<EditShuttleYardToPlantTemplate />}
                  />
                  <Route
                    path="/edit-shuttle-plant-to-yard/:id"
                    element={<EditShuttlePlantToYardTemplate />}
                  />
                  <Route path="/edit-shuttle-yard-to-yard/:id" element={<EditShuttleYardToYardTemplate />} />
                  <Route
                    path="/edit-shuttle-plant-to-plant/:id"
                    element={<EditShuttlePlantToPlantTemplate />}
                  />
                  <Route path="/edit-yard-unit-selection" element={<EditYardUnitSelectionTemplate />} />
                  <Route path="/edit-yard-unit/:id" element={<EditYardUnitEditTemplate />} />
                  <Route path="/edit-yard-unit-shuttle-delay" element={<EditYardUnitShuttleDelay />} />
                  {/* Shuttle - Yard Checkin */}
                  <Route path="/yard-checkin-driver-selection" element={<DriverSelectionTemplate />} />
                  <Route path="/yard-checkin-unit-selection" element={<UnitSelectionTemplate />} />
                  <Route path="/additional-shuttle" element={<AdditionalShuttleTemplate />} />
                  <Route path="/plant-to-yard-shuttle" element={<PlantToYardTemplate />} />
                  <Route path="/yard-to-plant-shuttle" element={<YardToPlantTemplate />} />
                  <Route path="/yard-to-yard-shuttle-process" element={<YardToYardTemplate />} />
                  <Route path="/plant-to-plant-shuttle" element={<PlantToPlantTemplate />} />
                  <Route path="/dry-run" element={<DryRunTemplate />} />
                  <Route path="/shuttle-bonus" element={<ShuttleBonusTemplate />} />
                  <Route path="/dealer-shuttle" element={<DealerShuttleTemplate />} />
                  <Route path="/shuttle-delay" element={<ShuttleDelayTemplate />} />
                  <Route path="/shuttle-order-not-enter" element={<OrderNotEnterTemplate />} />
                  <Route path="/yard-checkin-activation-delay" element={<ActivationDelayTemplate />} />
                  {/* Shuttle - Yard Checkin ends */}
                  <Route path="/shuttle-inquiry-selection" element={<ShuttleInquirySelectionTemplate />} />
                  <Route path="/shuttle-inquiry-browse" element={<ShuttleInquiryBrowseTemplate />} />
                  <Route path="/shuttle-inquiry-detail" element={<ShuttleInquiryDetailTemplate />} />
                  <Route path="/yard-email-maintenance/:id/:pageNumber" element={<YardEmailMaintenance />} />
                  <Route
                    path="/yard-email-maintenance/new-record/:id/:pageNumber"
                    element={<YardEmailForm />}
                  />
                  <Route
                    path="/yard-email-maintenance/edit-record/:id/:yardEmailPKs/:pageNumber"
                    element={<YardEmailForm />}
                  />
                  <Route path="/driver-service-selection" element={<DriverSelectionmainPage />} />
                  <Route path="/driver-dispatch/:driverId" element={<DriverDispatchContent />} />
                  <Route
                    path="/driver-dispatch-compliance/:driverId"
                    element={<DriverDispatchComplaince />}
                  />
                  <Route
                    path="/driver-service-selection/:driverId/form"
                    element={<DriverServiceTemplate />}
                  />
                  <Route
                    path="/driver-service-selection/:driverId/thank-you-card"
                    element={<ThankYouCard />}
                  />
                  <Route path="/delease-request/:driverId" element={<DriverDeleaseRequestsTemplate />} />
                  <Route path="/driver-dispatch-outbound/:driverId" element={<DriverDispatchOutbound />} />
                  <Route path="/driver-dispatch-Flatbed/:driverId" element={<DriverDispatchFlatbed />} />
                  <Route path="/driver-dispatch-reload/:driverId" element={<DriverDispatchReload />} />
                  <Route path="/city-to-yard" element={<CityYardMainPage />} />
                  <Route path="/city-to-yard/add" element={<CityYardTemplate />} />
                  <Route path="/city-to-yard/add/:id/:pageNumber" element={<CityYardTemplate />} />
                  <Route path="/approve-held-shuttle-browse" element={<ApproveHeldMainPage />} />
                  <Route
                    path="/approve-held-shuttle/add/:id/:pageNumber"
                    element={<ApproveHeldFormTemplate />}
                  />
                  <Route
                    path="/approve-held-shuttle-unit-browse/:id"
                    element={<ApproveHeldUnitBrowseMainPage />}
                  />
                  <Route
                    path="/shuttle-inquiry-detail/:id/:approveHeldUnitShuttlePK"
                    element={<ShuttleInquiryDetailTemplate />}
                  />
                  <Route
                    path="/shuttle-process-pay-driver-selection"
                    element={<PayDriverSelectionMainPage />}
                  />
                  <Route path="/shuttle-process-pay-driver-browse" element={<PayDriverBrowseTemplate />} />
                  <Route path="/plant-release-selection-screen" element={<SelectionTemplate />} />
                  <Route path="/plant-release-option-screen" element={<OptionTemplate />} />
                  <Route path="/plant-release-single-screen" element={<SingleTemplate />} />
                  <Route path="/plant-release-dealy-screen" element={<DelayEntryTemplate />} />
                  <Route path="/plant-release-multibrowse-screen" element={<MultiBrowseTemplate />} />
                  <Route path="/special-codes-maintenance" element={<SpecialCodesMainPage />} />
                  <Route path="/special-codes-maintenance/add" element={<SpecialCodesFormTemplate />} />
                  <Route
                    path="/special-codes-maintenance/:id/:pageNumber"
                    element={<SpecialCodesFormTemplate />}
                  />
                  <Route path="/postalcode" element={<PostalCodeListingMainPage />} />
                  <Route path="/postalcode-add" element={<PostalCodeFormTemplate />} />
                  <Route path="/postalcode-add/:id/:pageNumber" element={<PostalCodeFormTemplate />} />
                  <Route path="/check-pay-to" element={<CheckPayToMainpage />} />
                  <Route path="/check-pay-to/add" element={<CheckPayToTemplate />} />
                  <Route path="/check-pay-to/:id/:pageNumber" element={<CheckPayToTemplate />} />
                  <Route path="/holidays" element={<HolidaysMainPage />} />
                  <Route path="/holidays-add" element={<HolidaysForm />} />
                  <Route path="/holidays-add/:id/:pageNumber" element={<HolidaysForm />} />
                  <Route path="/unit-activation-selections" element={<UnitActivationSelection />} />
                  <Route path="/unit-activation-shuttle-delay" element={<UnitActivationShuttleDelay />} />
                  <Route
                    path="/unit-activation-single-soft-post"
                    element={<UnitActivationSingleSoftPost />}
                  />
                  <Route
                    path="/unit-activation-single-selection"
                    element={<UnitActivationSingleSelection />}
                  />
                  <Route path="/unit-activation-multi-unit" element={<UnitActivationMultiUnit />} />
                  <Route
                    path="/unit-activation-multi-unit-browse"
                    element={<UnitActivationMultiUnitBrowse />}
                  />
                  <Route
                    path="/unit-activation-multi-unit-sister-browse"
                    element={<UnitActivationMultiUnitSisterBrowse />}
                  />
                  <Route path="/state-permits" element={<StatePermitListingMainPage />} />
                  <Route path="/state-permits-edit" element={<FormTemplate />} />
                  <Route path="/state-permits-edit/:id/:pageNumber" element={<FormTemplate />} />
                  <Route path="/dealer-email-maintenance/:id" element={<DealerEmailMainPage />} />
                  <Route path="/add-dealer-email-maintenance/:id" element={<DealerEmailForm />} />
                  <Route
                    path="/add-dealer-email-maintenance/:id/:dealerEmailsPK/:pageNumber"
                    element={<DealerEmailForm />}
                  />
                  <Route path="/plant-to-yard-transfer" element={<PlantToYardTransferMainPage />} />
                  <Route
                    path="/plant-to-yard-transfer-customer"
                    element={<PlantToYardTransferCustomerMainPage />}
                  />
                  <Route
                    path="/plant-to-yard-transfer/:customerFK"
                    element={<PlantToYardTransferFormTemplate />}
                  />
                  <Route
                    path="/plant-to-yard-transfer/:plantToYardTransferPK/:customerFK"
                    element={<PlantToYardTransferFormTemplate />}
                  />
                  <Route path="/unit-type" element={<UnitTypeListingMainPage />} />
                  <Route path="/unit-type-new" element={<UnitTypeTemplate />} />
                  <Route path="/unit-type-edit/:id/:pageNumber" element={<UnitTypeTemplate />} />
                  <Route path="/outbound-unit-browse" element={<OutBondUnitBrowse />} />
                  <Route path="/flatbed-unit-browse" element={<FlatBedUnitBrowse />} />
                  <Route path="/reload-unit-browse" element={<ReloadUnitBrowse />} />
                  <Route path="/towable-unit-confirmation" element={<TowableUnitConfirmation />} />
                  <Route path="/flatbed-unit-confirmation" element={<FlatbedUnitConfirmation />} />
                  <Route path="/single-unit-confirmation" element={<SingleUnitConfirmation />} />
                  <Route path="/dispatch-poe-selection" element={<POESelection />} />
                  <Route path="/dispatch-poe-selection-two" element={<POESelectionTwo />} />
                  <Route path="/unit-dates-towable" element={<UnitDatesTowable />} />
                  <Route path="/unit-dates-flatbed" element={<UnitDatesFlatbed />} />
                  <Route path="/unit-dates-driveaway" element={<UnitDatesDriveAway />} />
                  <Route path="/delease-items" element={<DeleaseItemsMainpage />} />
                  <Route path="/delease-items/add" element={<DeleaseItemsTemplate />} />
                  <Route path="/delease-items/:id/:pageNumber" element={<DeleaseItemsTemplate />} />
                  <Route path="/delay-unit-codes-listing" element={<DelayUnitCodesMainPage />} />
                  <Route path="/delay-unit-codes/:id/:pageNumber" element={<DelayUnitCodesEditTemplate />} />
                  <Route path="/delay-unit-codes/add" element={<DelayUnitCodesEditTemplate />} />
                  <Route path="/compilance-items-add" element={<ComplianceItemsTemplate />} />
                  <Route path="/compilance-items" element={<ComplianceItemsMainPage />} />
                  <Route path="/compilance-items-add/:id/:pageNumber" element={<ComplianceItemsTemplate />} />
                  <Route path="/delease-code" element={<DeleaseCodeMainPage />} />
                  <Route path="/delease-code-new" element={<DeleaseCodeTemplate />} />
                  <Route path="/delease-code-new/:id/:pageNumber" element={<DeleaseCodeTemplate />} />
                  <Route path="/dispatch-hold" element={<DispatchHoldsMainPage />} />
                  <Route path="/dispatch-hold-new" element={<DispatchHoldsTemplate />} />
                  <Route path="/dispatch-hold-new/:id/:pageNumber" element={<DispatchHoldsTemplate />} />
                  <Route path="/supplemental-rates" element={<SupplementalMainPage />} />
                  <Route path="/supplemental-rates-customer-new" element={<CustomerSelectionPage />} />
                  <Route
                    path="/supplemental-rates-customer-selection/:supplementalRatesPK/:pageNumber"
                    element={<CustomerSelectionPage />}
                  />
                  <Route
                    path="/supplemental-rates-add/:supplementalRatesPK/:pageNumber"
                    element={<SuppleMentalRatesTemplate />}
                  />
                  <Route path="/supplemental-rates-new" element={<SuppleMentalRatesTemplate />} />
                  <Route path="/dpu-unit-selection" element={<DpuInstructionsSelectionTemplate />} />
                  <Route path="/dpu-view-screen/:id/:pageNumber" element={<DpuInstructionsViewContent />} />
                  <Route path="/driver-termination-letter" element={<TerminationLetterMainPage />} />
                  <Route path="/add-driver-termination-letter" element={<DriverTerminationLetterForm />} />
                  <Route
                    path="/edit-driver-termination-letter/:id/:pageNumber"
                    element={<DriverTerminationLetterForm />}
                  />
                  <Route path="/reserves" element={<ReservesMainPage />} />
                  <Route path="/reserves/add" element={<ReservesTemplate />} />
                  <Route path="/reserves/:id/:pageNumber" element={<ReservesTemplate />} />
                  <Route path="/delay-resources" element={<DelayResourcesMainPage />} />
                  <Route path="/add-delay-resources" element={<DelayResourcesEditForm />} />
                  <Route path="/edit-delay-resources/:id/:pageNumber" element={<DelayResourcesEditForm />} />
                  <Route path="/port-of-entry/add" element={<PortsOfEntryTemplate />} />
                  <Route path="/port-of-entry" element={<PortsOfEntryBrowse />} />
                  <Route path="/port-of-entry/:id/:pageNumber" element={<PortsOfEntryTemplate />} />
                  <Route
                    path="/customer-plant-contacts/:customerId/:id/:pageNumber"
                    element={<PlantContactMainPage />}
                  />
                  <Route
                    path="/customer-plant-contacts/:customerId/:id/:pageNumber/new-page"
                    element={<PlantContactTemplate />}
                  />
                  <Route
                    path="/customer-plant-contacts/:customerId/:id/:pageNumber/:contactPk"
                    element={<PlantContactTemplate />}
                  />
                  <Route path="/terms-browse" element={<TermsListingMainPage />} />
                  <Route path="/terms-browse/add" element={<TermsEditTemplate />} />
                  <Route path="/reserve-types" element={<ReserveTypesMainPage />} />
                  <Route path="/reserve-types/add" element={<ReserveTypesTemplate />} />
                  <Route path="/reserve-types/:id/:pageNumber" element={<ReserveTypesTemplate />} />
                  <Route path="/terms-browse" element={<TermsListingMainPage />} />
                  <Route path="/terms-browse/add" element={<TermsEditTemplate />} />
                  <Route path="/terms-browse/:id/:pageNumber" element={<TermsEditTemplate />} />
                  <Route
                    path="/customer-plant-emails/:customerId/:id/:pageNumber"
                    element={<CustomerPlantEmailsMainPage />}
                  />
                  <Route
                    path="/customer-plant-emails/:customerId/:id/:pageNumber/new-page"
                    element={<CustomerPlantEmailTemplate />}
                  />
                  <Route
                    path="/customer-plant-emails/:customerId/:id/:pageNumber/:emailPk"
                    element={<CustomerPlantEmailTemplate />}
                  />
                  <Route path="/form-types" element={<FormTypesBrowse />} />
                  <Route path="/form-types/add" element={<FormTypesTemplate />} />
                  <Route path="/form-types/:id/:pageNumber" element={<FormTypesTemplate />} />
                  <Route
                    path="/equipment-check-in-out-browse-page"
                    element={<EquipmentCheckInOutMainPage />}
                  />
                  <Route path="/equipment-check-in-page/:id/:pageNumber" element={<EquipmentTemplate />} />
                  <Route
                    path="/equipment-check-out-page/:id/:pageNumber"
                    element={<EquipmentCheckOutViewTemplate />}
                  />
                  <Route
                    path="/customer-plant-delay-resources/:customerId/:id/:pageNumber"
                    element={<CustomerPlantDelayResourcesMain />}
                  />
                  <Route
                    path="/customer-plant-delay-resources/:customerId/:id/:pageNumber/new-page"
                    element={<CustomerPlantDelayResourcesTemplate />}
                  />
                  <Route
                    path="/customer-plant-delay-resources/:customerId/:id/:pageNumber/:delayPk"
                    element={<CustomerPlantDelayResourcesTemplate />}
                  />
                  <Route path="/export-brokers-browse" element={<ExportBrokersBrowse />} />
                  <Route path="/export-brokers-browse/add" element={<ExportBrokersForm />} />
                  <Route path="/export-brokers-browse/:id/:pageNumber" element={<ExportBrokersForm />} />
                  <Route path="/export-brokers-browse/edit/:id" element={<EditPorts />} />
                  <Route path="/import-brokers" element={<ImportBrokesBrowse />} />
                  <Route path="/import-brokers/add" element={<ImportBrokesTemplate />} />
                  <Route path="/import-brokers/:id/:pageNumber" element={<ImportBrokesTemplate />} />
                  <Route path="/driver-trailers/:driverId" element={<DriverTrailers />} />
                  <Route path="/driver-trailers/add/:driverId" element={<DriverTrailersForm />} />
                  <Route path="/driver-trailers/:driverId/:recordId" element={<DriverTrailersForm />} />
                  <Route path="/email-maintenance" element={<EmailBrowsePage />} />
                  <Route path="/email-maintenance/add" element={<EmailFormTemplate />} />
                  <Route path="/email-maintenance/:id/:pageNumber" element={<EmailFormTemplate />} />
                  <Route path="/email-sender-types" element={<EmailSenderTypes />} />
                  <Route path="/email-sender-types/add" element={<EmailSenderTypesForm />} />
                  <Route path="/email-sender-types/:id" element={<EmailSenderTypesForm />} />
                  <Route
                    path="/email-recipients/:emailMaintenanceId/:pageNumber"
                    element={<RecipientsMainPage />}
                  />
                  <Route
                    path="/email-recipients/:emailMaintenanceId/:pageNumber/new-page"
                    element={<RecipientsTemplate />}
                  />
                  <Route
                    path="/email-recipients/:emailMaintenanceId/:pageNumber/new-page/:id"
                    element={<RecipientsTemplate />}
                  />
                  <Route
                    path="/email-attachment/:emailMaintenanceId/:pageNumber"
                    element={<AttachmentMainPage />}
                  />
                  <Route
                    path="/email-attachment/:emailMaintenanceId/:pageNumber/add"
                    element={<EmailAttachmentForm />}
                  />
                  <Route
                    path="/email-attachment/:emailMaintenanceId/:pageNumber/:id"
                    element={<EmailAttachmentForm />}
                  />
                  <Route path="/customer-groups" element={<CustomerGroupsMainPage />} />
                  <Route path="/customer-groups/add" element={<CustomerGroupsForm />} />
                  <Route path="/customer-groups/details" element={<CustomerGroupsForm tempFlag />} />
                  <Route path="/customer-groups/edit" element={<EditCustomerGroups />} />
                  <Route path="/driver-dispatch/port-of-entry-selection" element={<POESelection />} />
                  <Route path="/driver-dispatch/port-of-entry-override" element={<POESelectionTwo />} />
                  <Route path="/driver-selection" element={<DriverSelectionMainPage />} />
                  <Route path="/unit-selection/:driverId" element={<UnitSelectionMainPage />} />
                  <Route path="/intransit-checkin/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/delay-checkin/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/pickup/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/epu-eta/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/yard-exit/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/city-state-checkin/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route
                    path="/plant-with-yard-delivery/:driverId/:unitId"
                    element={<DriverCheckinTemplate />}
                  />
                  <Route path="/yard-delivery/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/plant-delivery/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/delivery/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/state-groups" element={<StateGroupsMainPage />} />
                  <Route path="/state-groups/add" element={<StateGroupsForm />} />
                  <Route path="/state-groups-edit/:id/:pageNumber" element={<StateGroupsForm />} />
                  <Route path="/state-groups/states-list/:id" element={<EditStates />} />
                  <Route path="/customer-groups" element={<CustomerGroupsMainPage />} />
                  <Route path="/customer-groups/add" element={<CustomerGroupsForm />} />
                  <Route path="/customer-groups/:id/:pageNumber" element={<CustomerGroupsForm />} />
                  <Route path="/customer-groups/edit/:id" element={<EditCustomerGroups />} />
                  <Route path="/driver-selection" element={<DriverSelectionMainPage />} />
                  <Route path="/unit-selection/:driverId" element={<UnitSelectionMainPage />} />
                  <Route path="/intransit-checkin/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/delay-checkin/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/pickup/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/epu-eta/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/yard-exit/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/city-state-checkin/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route
                    path="/city-state-checkin-adv/:driverId/:unitId"
                    element={<DriverCheckinTemplate />}
                  />
                  <Route
                    path="/plant-with-yard-delivery/:driverId/:unitId"
                    element={<DriverCheckinTemplate />}
                  />
                  <Route path="/yard-delivery/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/plant-delivery/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/delivery/:driverId/:unitId" element={<DriverCheckinTemplate />} />
                  <Route path="/customer-plant-group" element={<PlantGroupMainPage />} />
                  <Route path="/add-plant-groups" element={<PlantGroupForm />} />
                  <Route path="/edit-plant-groups/:id/:pageNumber" element={<PlantGroupForm />} />
                  <Route path="/edit-plant-groups/plant/:id/:pageNumber" element={<EditPlantForm />} />
                  <Route path="/zipcode-driver-search/initial" element={<ZipcodeSearchFilterScreenForm />} />
                  <Route path="/zipcode-driver-search/search" element={<ZipcodeSearchFilterScreenForm />} />
                  <Route path="/zipcode-driver-search/browse" element={<ZipcodeDriverListingForm />} />
                  <Route path="/paperwork-processing/unit-selection" element={<UnitSelection />} />
                  <Route path="/paperwork-processing/unit-view" element={<UnitView />} />
                  <Route path="/paperwork-processing/additional-amounts" element={<AdditionalAmounts />} />
                  <Route
                    path="/paperwork-processing/amounts-confirmation"
                    element={<AmountsConfirmation />}
                  />
                  <Route path="/paperwork-processing/scan-paperwork" element={<ScanPaperwork />} />
                  <Route path="/paperwork-processing/breakdown-delay" element={<BreakdownDelay />} />
                  <Route path="/paperwork-processing/split-trip" element={<SplitTrip />} />
                  <Route path="/paperwork-processing/drivers-email" element={<DriversEmail />} />
                  <Route path="/paperwork-processing/missing-paperwork" element={<MissingPaperwork />} />
                  <Route
                    path="/paperwork-processing/equipment-return"
                    element={<InvoiceEquipmentReturnTemplate />}
                  />
                  <Route path="/state-groups" element={<StateGroupsMainPage />} />
                  <Route path="/state-groups/add" element={<StateGroupsForm />} />
                  <Route path="/state-groups-edit/:id/:pageNumber" element={<StateGroupsForm />} />
                  <Route path="/state-groups/states-list/:id" element={<EditStates />} />
                  <Route path="/customer-prospects" element={<CustomerProspectsMainPage />} />
                  <Route path="/customer-prospects/add" element={<CustomerProspectsForm />} />
                  <Route path="/customer-prospects/:id/:pageNumber" element={<CustomerProspectsForm />} />
                  <Route path="/unit-type-groups" element={<UnitTypeGroupBrowsePage />} />
                  <Route path="/unit-type-groups/add" element={<UnitTypeGroupsTemplate />} />
                  <Route path="/unit-type-groups/:id/:pageNumber" element={<UnitTypeGroupsTemplate />} />
                  <Route path="/unit-type-groups/unit-type-list/:id" element={<EditUnitTypes />} />
                  <Route path="/driver-trucks/:driverId" element={<DriverTrucks />} />
                  <Route path="/driver-trucks/add/:driverId" element={<DriverTrucksForm />} />
                  <Route path="/driver-trucks/:driverId/:recordId" element={<DriverTrucksForm />} />
                  <Route path="/customer-unit-type-groups" element={<CustomerUtGroupsMainPage />} />
                  <Route path="/customer-unit-type-groups-selection" element={<CustomerSelectionPageUT />} />
                  <Route path="/customer-unit-type-groups-add" element={<CustomerUnitTypeGroupsTemplate />} />
                  <Route
                    path="/customer-unit-type-groups-add/:id/:pageNumber"
                    element={<CustomerUnitTypeGroupsTemplate />}
                  />
                  <Route path="/customer-unit-type-groups/groups-list/:id" element={<EditUnitTypeGroups />} />
                  <Route path="/driver-trailers/:driverId" element={<DriverTrailers />} />
                  <Route path="/driver-trailers/add/:driverId" element={<DriverTrailersForm />} />
                  <Route path="/driver-trailers/:driverId/:recordId" element={<DriverTrailersForm />} />
                  <Route path="/dealer-driver-search/initial" element={<SearchFilterScreenForm />} />
                  <Route path="/dealer-driver-search/search" element={<SearchFilterScreenForm />} />
                  <Route path="/dealer-driver-search/browse" element={<DriverListingForm />} />
                  <Route path="/state-driver-search/initial" element={<StateSearchFilterScreenForm />} />
                  <Route path="/state-driver-search/search" element={<StateSearchFilterScreenForm />} />
                  <Route path="/state-driver-search/browse" element={<StateDriverListingForm />} />
                  <Route path="/zipcode-driver-search/initial" element={<ZipcodeSearchFilterScreenForm />} />
                  <Route path="/zipcode-driver-search/search" element={<ZipcodeSearchFilterScreenForm />} />
                  <Route path="/zipcode-driver-search/browse" element={<ZipcodeDriverListingForm />} />
                  <Route path="/reload-drivers-search" element={<ReloadSearchFilterScreen />} />
                  <Route path="/reload-drivers-search-unit" element={<UnitBrowseListingMainpage />} />
                  <Route
                    path="/reload-drivers-search-driver/:id/:pageNumberOfDriver"
                    element={<DriverBrowseListingMainPage />}
                  />
                  <Route path="/driver-TMRlogs/:id" element={<DriverTMRLogsMainPage />} />
                  <Route path="/driver-TMRlogs/:id" element={<DriverTMRLogsListing />} />
                  <Route path="/driver-TMRlogs/add" element={<DriverTMRLogsTemplate />} />
                  <Route path="/driver-garnishment/:id" element={<DriverGarnishmentsBrowse />} />
                  <Route path="/driver-garnishment/add/:id" element={<DriverGarnishmentsFormContent />} />
                  <Route
                    path="/driver-garnishment/:id/:driverGarnishmentPK/:pageNumber"
                    element={<DriverGarnishmentsFormContent />}
                  />
                  <Route
                    path="/driver-TMRlogs/:id/:driverTMRLogPK/:pageNumber"
                    element={<DriverTMRLogsTemplate />}
                  />
                  <Route path="/driver-reserve-main/:driverFK" element={<DriverRserveMainPage />} />
                  <Route path="/driver-reserve-main/edit/:driverFK" element={<DriverRserveTemplate />} />
                  <Route path="/driver-reserve-main/:driverFK/:id" element={<DriverRserveTemplate />} />
                  <Route path="/delay-processing/delayed-unit-browse" element={<DelayedUnitBrowse />} />
                  <Route
                    path="/delay-processing/new-delayed-unit-browse"
                    element={<NewDelayedUnitBrowse />}
                  />
                  <Route
                    path="/delay-processing/new-delayed-unit-confirmation/:companyName/:unitfk/:driverfk"
                    element={<NewDelayedUnitConfirmation />}
                  />
                  <Route
                    path="/delay-processing/unit-details/:companyName/:unitfk/:driverfk"
                    element={<UnitDetails />}
                  />
                  <Route
                    path="/delay-processing/delayed-details/:companyName/:unitfk/:driverfk"
                    element={<UnitDetails />}
                  />
                  <Route
                    path="/delay-processing/delayed-details/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<ViewDelayPage />}
                  />
                  <Route path="/report-card/:driverId" element={<ReportCardTemplate />} />
                  <Route path="/compliance-report-card/:driverId" element={<ReportCardTemplate />} />
                  <Route path="/driver-flash/:driverId" element={<DriverFlashTemplate />} />
                  <Route
                    path="/drivercompliance/driver-dispatchhold/:driverId"
                    element={<DriverDispatchHold />}
                  />
                  <Route
                    path="/drivercompliance/driver-dispatchhold/:driverId/:id"
                    element={<DriverDispatchHoldForm />}
                  />
                  <Route
                    path="/driverservice/driver-dispatchhold/:driverId"
                    element={<DriverDispatchHold />}
                  />
                  <Route
                    path="/driverservice/driver-dispatchhold/:driverId/:id"
                    element={<DriverDispatchHoldForm />}
                  />
                  <Route path="/add-notes/:driverId" element={<DriverAddNotesTemplate />} />
                  <Route
                    path="/delay-return-details/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<DetailScreenTemplate />}
                  />
                  <Route
                    path="/delay-return-pickup/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<DelayPickupTemplate />}
                  />
                  <Route
                    path="/delay-return-miles/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<DelayMilesTemplate />}
                  />
                  <Route
                    path="/delay-return-documents/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<DelayDocumentTemplate />}
                  />
                  <Route
                    path="/delay-return-delivery/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<MiscellaneousDeliveryTemplate />}
                  />
                  <Route
                    path="/driver-checkin-history/:driverId"
                    element={<DriverCheckinHistoryMainPage />}
                  />
                  <Route path="/driver-edit-file/:driverId" element={<EditDriverFileTemplate />} />
                  <Route path="/delay-processing/delayed-unit-browse" element={<DelayedUnitBrowse />} />
                  <Route
                    path="/delay-processing/new-delayed-unit-browse"
                    element={<NewDelayedUnitBrowse />}
                  />
                  <Route
                    path="/delay-processing/new-delayed-unit-confirmation/:companyName/:unitfk/:driverfk"
                    element={<NewDelayedUnitConfirmation />}
                  />
                  <Route
                    path="/delay-processing/unit-details/:companyName/:unitfk/:driverfk"
                    element={<UnitDetails />}
                  />
                  <Route
                    path="/delay-processing/delayed-details/:companyName/:unitfk/:driverfk"
                    element={<UnitDetails />}
                  />
                  <Route
                    path="/delay-processing/delayed-details/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<ViewDelayPage />}
                  />
                  <Route path="/report-card/:driverId" element={<ReportCardTemplate />} />
                  <Route path="/driver-flash/:driverId" element={<DriverFlashTemplate />} />
                  <Route
                    path="/drivercompliance/driver-dispatchhold/:driverId"
                    element={<DriverDispatchHold />}
                  />
                  <Route
                    path="/drivercompliance/driver-dispatchhold/:driverId/:id"
                    element={<DriverDispatchHoldForm />}
                  />
                  <Route
                    path="/driverservice/driver-dispatchhold/:driverId"
                    element={<DriverDispatchHold />}
                  />
                  <Route
                    path="/driverservice/driver-dispatchhold/:driverId/:id"
                    element={<DriverDispatchHoldForm />}
                  />
                  <Route path="/add-notes/:driverId" element={<DriverAddNotesTemplate />} />
                  <Route
                    path="/driver-checkin-history/:driverId"
                    element={<DriverCheckinHistoryMainPage />}
                  />
                  <Route path="/driver-edit-file/:driverId" element={<EditDriverFileTemplate />} />
                  <Route path="/delay-processing/delayed-unit-browse" element={<DelayedUnitBrowse />} />
                  <Route
                    path="/customer-dispatch-users/:customerId/:customerPageNo"
                    element={<CustomerDispatchUsers />}
                  />
                  <Route
                    path="/customer-dispatch-users/:customerId/:customerPageNo/new-record"
                    element={<CustomerDispatchUsersForm />}
                  />
                  <Route
                    path="/customer-dispatch-users/:customerId/:customerPageNo/:recordId/:pageNo"
                    element={<CustomerDispatchUsersForm />}
                  />
                  <Route path="/driver-referrals/:driverId" element={<DriverReferralsTemplate />} />
                  <Route path="/customer-rates" element={<CustomerRatesMainPage />} />
                  <Route path="/customer-rates-customer-new" element={<CustomerAddSelectionPage />} />
                  <Route path="/customer-rates/new-record" element={<RatesFormTemplate />} />
                  <Route
                    path="/customer-rates/new-record/:customerRatePK/:pageNumber"
                    element={<RatesFormTemplate />}
                  />
                  <Route path="/rate" element={<RatesContent />} />
                  {/* <Route path="/add-comments/:driverId" element={<AddCommentsTemplate />} /> */}
                  <Route
                    path="/driver-compliance-items/:driverId"
                    element={<DriverComplianceListingMainPage />}
                  />
                  <Route
                    path="/driver-compliance-items-view/:driverId/:id"
                    element={<DriverComplianceFormTemplate />}
                  />
                  <Route path="/assigned-equipment/:driverId" element={<AssignedEquipmentTemplate />} />
                  <Route path="/add-driver-equipment/:driverId" element={<AddEquipmentTemplate />} />
                  <Route
                    path="/add-driver-equipment-content/:driverId/:id"
                    element={<AddEquipmentFormTemplate />}
                  />
                  <Route path="/view-driver-equipment/:driverId/:id" element={<AddEquipmentFormTemplate />} />
                  <Route path="/driver-drugtests/:driverId" element={<DriverDrugTests />} />
                  <Route path="/driver-drugtests/add/:driverId" element={<DriverDrugTestsAddForm />} />
                  <Route path="/driver-drugtests/:driverId/:id" element={<DriverDrugTestsEditForm />} />
                  <Route
                    path="/driver-service-selection/:driverId/driver-awards"
                    element={<DriverAwardsForm />}
                  />
                  <Route path="/bond-fund/:driverId" element={<DriverBondFundsTemplate />} />
                  <Route path="/driver-maintenance" element={<DriversMainPage />} />
                  <Route path="/driver-maintenance-new" element={<DriverFormTemplate />} />
                  <Route path="/driver-maintenance-add/:id/:pageNumber" element={<DriverFormTemplate />} />
                  <Route path="/driver-maintenance-add/:id" element={<DriverFormTemplate />} />
                  <Route path="/load-history/:driverId" element={<LoadHistoryBrowse />} />
                  <Route
                    path="/load-history-detail/:driverId/:dispatchId"
                    element={<DispatchDetailTemplate />}
                  />
                  <Route path="/pickup-dealer/:driverId/:dispatchId" element={<PickupTemplate />} />
                  <Route path="/pickup-yard/:driverId/:dispatchId" element={<PickupTemplate />} />
                  <Route path="/delivery-dealer/:driverId/:dispatchId" element={<DeliveryTemplate />} />
                  <Route path="/delivery-yard/:driverId/:dispatchId" element={<DeliveryTemplate />} />
                  <Route path="/postNoCheckinHistory/:id" element={<PostNoCheckinHistoryContent />} />
                  <Route path="/postNoCheckin/:id" element={<PostNoCheckinContent />} />
                  <Route path="/dispatch-restrictions/:driverId" element={<DispatchRestrictionsTemplate />} />
                  <Route
                    path="/dispatch-restrictions-view/:driverId/:id"
                    element={<DispatchRestrictionFormTemplate />}
                  />
                  <Route
                    path="/dispatch-restrictions-new/:driverId"
                    element={<DispatchRestrictionsNewTemplate />}
                  />
                  <Route path="/transport-companies" element={<TransportCompaniesMainPage />} />
                  <Route path="/transport-companies-view/:id" element={<TransportCompaniesTemplate />} />
                  <Route path="/transport-companies-new" element={<TransportCompaniesTemplate />} />
                  <Route path="/undispatch/:driverId" element={<UnDispatchUnitSelectionTemplate />} />
                  <Route
                    path="/undispatch-unit-confirmation-screen/:driverId/:dispatchId"
                    element={<UnitConfirmationTemplate />}
                  />
                  <Route
                    path="/undispatch-confirmation/:driverId/:dispatchId"
                    element={<UndispatchDetailsTemplate />}
                  />
                  <Route
                    path="/undispatch-details-screen/:driverId/:dispatchId"
                    element={<UndispatchDetailsTemplate />}
                  />
                  <Route
                    path="/undispatch-activation-delay-screen/:driverId/:dispatchId"
                    element={<ActivationDelaysTemplate />}
                  />
                  <Route
                    path="/undispatch-equipment-return-screen/:driverId/:dispatchId"
                    element={<EquipmentReturnTemplate />}
                  />
                  <Route
                    path="/undispatch-hold-screen/:driverId/:dispatchId"
                    element={<HoldScreenTemplate />}
                  />
                  <Route
                    path="/undispatch-delete-unit-screen/:driverId/:dispatchId"
                    element={<DeleteUnitTemplate />}
                  />
                  <Route
                    path="/undispatch-apu-screen/:driverId/:dispatchId"
                    element={<APUScreenTemplate />}
                  />
                  <Route
                    path="/undispatch-delete-unit-creditcard-screen/:driverId/:dispatchId"
                    element={<DeleteUnitCreditCardTemplate />}
                  />
                  <Route
                    path="/undispatch-apu-document-screen/:driverId/:dispatchId"
                    element={<APUDocumentsTemplate />}
                  />
                  <Route
                    path="/undispatch-splittrip-document-screen/:driverId/:dispatchId"
                    element={<SplitTripTemplate />}
                  />
                  <Route
                    path="/undispatch-splittrip-location-screen/:driverId/:dispatchId"
                    element={<SplitTripLocationTemplate />}
                  />
                  <Route
                    path="/undispatch-splittrip-miles-screen/:driverId/:dispatchId"
                    element={<SplitTripMilesTemplate />}
                  />
                  <Route
                    path="/releasedriver-splittrip-document-screen/:driverId/:delayedunitPK/:dispatchId/:unitfk/:companyName"
                    element={<SplitTripTemplate />}
                  />
                  <Route
                    path="/releasedriver-splittrip-location-screen/:driverId/:delayedunitPK/:dispatchId/:unitfk/:companyName"
                    element={<SplitTripLocationTemplate />}
                  />
                  <Route
                    path="/releasedriver-splittrip-miles-screen/:driverId/:delayedunitPK/:dispatchId/:unitfk/:companyName"
                    element={<SplitTripMilesTemplate />}
                  />
                  <Route path="/settlements/:driverId" element={<SettlementFormTemplate />} />
                  {/* Units - Edit Master Express */}
                  <Route
                    path="/edit-master-express-unit-selection"
                    element={<EditMasterExpressUnitSelection />}
                  />
                  <Route
                    path="/edit-master-express-edit-page/:id/:pageNumber"
                    element={<EditMasterExpressEditPageTemplate />}
                  ></Route>
                  {/* Units - Edit Master Express - Ends*/}
                  <Route path="/driver-delease-requests/:driverId" element={<DeleaseRequestBrowse />} />
                  <Route
                    path="/driver-delease-requests/add/:driverId"
                    element={<DriverDeleaseRequestTemplate />}
                  />
                  <Route
                    path="/driver-delease-requests/:driverId/:deleaserequestPK"
                    element={<DriverDeleaseRequestTemplate />}
                  />
                  <Route path="/driver-delease/:driverId" element={<DriverDeleaseBrowse />} />
                  <Route path="/driver-delease/add/:driverId" element={<DriverDeleaseFormTemplate />} />
                  <Route path="/driver-delease/:driverId/:id" element={<DriverDeleaseFormTemplate />} />
                  <Route path="/driver-delease/:driverId/:id/delease-letters" element={<LetterTemplate />} />
                  <Route path="/customer-orders" element={<CustomerOrderBrowse />} />
                  <Route path="/customer-orders/add" element={<CustomerOrderTemplate />} />
                  <Route path="/customer-orders/:id/:pageNumber" element={<CustomerOrderTemplate />} />
                  <Route
                    path="/customer-orders-column/:id/:pageNumber"
                    element={<CustomerOrderColumnsTemplate />}
                  />
                  <Route path="/customer-orders/test/:id/:pageNumber" element={<CustomerOrdersTest />} />
                  <Route
                    path="/customer-orders/test-result/:id/:pageNumber"
                    element={<CustomerOrdersTestResult />}
                  />
                  <Route
                    path="/driver-delease/add/:driverId/:deleaserequestPK"
                    element={<DriverDeleaseFormTemplate />}
                  />
                  <Route
                    path="/driver-delease/add/:driverId/:deleaserequestPK"
                    element={<DriverDeleaseFormTemplate />}
                  />
                  {/* Operation - Driver Services Reroute */}
                  <Route path="/reroutes-unit-selection/:driverId" element={<RerouteUnitSelectionScreen />} />
                  <Route path="/reroutes-detail-screen" element={<RerouteDetailScreenTemplate />} />
                  <Route
                    path="/reroute-pickup-location-normal-dealer"
                    element={<ReroutePickupNormalDealerTemplate />}
                  />
                  <Route
                    path="/reroute-pickup-location-miscellaneous-dealer"
                    element={<ReroutePickupMiscellaneousDealerTemplate />}
                  />
                  <Route
                    path="/reroute-delivery-location-normal-dealer"
                    element={<RerouteDeliveryNormalDealerTemplate />}
                  />
                  <Route
                    path="/reroute-delivery-location-miscellaneous-dealer"
                    element={<RerouteDeliveryMiscellaneousDealerTemplate />}
                  />
                  <Route path="/reroutes-confirmation" element={<RerouteConfirmationTemplate />} />
                  <Route path="/reroute-credit-card" element={<CreditCardTemplate />} />
                  <Route path="/reroute-location" element={<RerouteLocation />} />
                  {/* Operation - Driver Services Reroute ends */}
                  <Route path="/debit-card-listing" element={<DebitCards />} />
                  <Route path="/debit-card/:id/:pageNumber" element={<DebitCardForm />} />
                  <Route path="/debit-card/add" element={<DebitCardForm />} />
                  <Route
                    path="/credit-card-enquiry/selection"
                    element={<InvoiceCreditCardSelectionTemplate />}
                  />
                  <Route
                    path="/credit-card-enquiry/view/:id/:pageNumber"
                    element={<InvoiceCreditCardViewTemplate />}
                  />
                  <Route path="/DpuInvoice/browse" element={<DPUInvoiceForm />} />
                  <Route path="/DpuInvoice/confirmation" element={<DPUInvoiceUnitConfirmationTemplate />} />
                  <Route path="/DpuInvoice/invoiceText" element={<DPUInvoiceTextTemplate />} />
                  <Route path="/DpuInvoice/paperWork" element={<DPUInvoicePaperworkTemplate />} />
                  <Route
                    path="/damage-unit/add/:companyName/:delayedunitFK/:driverfk"
                    element={<DamagedUnitBrowse />}
                  />
                  <Route path="/delay-processing/delayed-unit-browse" element={<DelayedUnitBrowse />} />
                  <Route
                    path="/delay-processing/new-delayed-unit-browse"
                    element={<NewDelayedUnitBrowse />}
                  />
                  <Route
                    path="/delay-processing/new-delayed-unit-confirmation/:companyName/:unitfk/:driverfk"
                    element={<NewDelayedUnitConfirmation />}
                  />
                  <Route
                    path="/delay-processing/unit-details/:companyName/:unitfk/:driverfk"
                    element={<UnitDetails />}
                  />
                  <Route
                    path="/delay-processing/delayed-details/:companyName/:unitfk/:driverfk"
                    element={<UnitDetails />}
                  />
                  <Route path="/damage-processing/unit-details/new" element={<UnitDamageDetails />} />
                  <Route
                    path="/damage-processing/unit-details/:companyName/:unitfk/:driverfk"
                    element={<UnitDamageDetails />}
                  />
                  <Route path="/damage-processing/unit-details-view/:id" element={<UnitDetailsDamage />} />
                  <Route path="/damage-processing-safety/:id" element={<DamageSafetyTemplate />} />
                  <Route path="/breakdown-processing/breakdown-details/" element={<BreakdownUnitDetails />} />
                  <Route
                    path="/breakdown/browse/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<BreakdownUnitBrowse />}
                  />
                  <Route path="/delayed-unit-fees-view/:breakdownFK" element={<DelayedUnitFeesView />} />
                  <Route path="/delayed-unit-fees-edit/:breakdownFK" element={<DelayedUnitFeesEdit />} />
                  <Route
                    path="/delay-unit-breakdown-invoice/:breakdownFK"
                    element={<DelayUnitBreakdownInvoice />}
                  />
                  <Route
                    path="/delay-unit-breakdown-settlement/:breakdownFK"
                    element={<DelayUnitBreakdownSettlement />}
                  />
                  <Route
                    path="/delayed-unit-breakdown-invoice-scan/:breakdownFK"
                    element={<DelayedUnitBreakdownInvoiceScan />}
                  />
                  {/* Reports */}
                  <Route path="/available-driver-report" element={<AvailableDriverList />} />
                  <Route path="/unit-listing-by-date" element={<UnitListingByDate />} />
                  <Route path="/project-report" element={<ProjectReport />} />
                  <Route path="/delivered-unit-report" element={<DeliveredUnitReport />} />
                  <Route path="/dispatched-unit-report" element={<DispatchedUnitReport />} />
                  <Route path="/active-drivers-report" element={<ActiveDrivers />} />
                  <Route path="/inventory-status-flash-selection" element={<SelectionPageTemplate />} />
                  <Route path="/inventory-status-flash-listing" element={<InventoryFlashListingTemplate />} />
                  <Route path="/nocallin-report" element={<NoCallinReport />} />
                  <Route path="/unit-pickup-extension-report" element={<UnitPickupExtensionReport />} />
                  <Route path="/yard-usage-report" element={<YardUsageReport />} />
                  <Route path="/shuttle-collections-report" element={<ShuttleCollectionsReport />} />
                  <Route path="/driver-listing-report" element={<DriverListingReport />} />
                  <Route path="/driver-listing-report-view" element={<DriverListingReportView />} />
                  <Route path="/driver-labels" element={<DriverLabelsTemplate />} />
                  <Route path="/permissions-maintenance" element={<PermissionMainPage />} />
                  <Route path="/permissions-maintenance/add" element={<PermissionTemplate />} />
                  <Route path="/permissions-maintenance/:id" element={<PermissionTemplate />} />
                  <Route path="/check-rejected-loads" element={<CheckRejectedLoadsTemplate />} />
                  <Route
                    path="/driver-service-selection/:driverId/dispatch-document"
                    element={<DispatchDocumentForm />}
                  />
                  <Route path="/permission-groups" element={<PermissionGroupsMainPage />} />
                  <Route path="/permission-groups/add" element={<DetailPageTemplate />} />
                  <Route path="/permission-groups/:id/:pageNumber" element={<DetailPageTemplate />} />
                  <Route
                    path="/permission-groups/permission-list/:id"
                    element={<PermissionEditDetailPage />}
                  />
                  <Route path="/bulk-invoice-unit-selection" element={<BulkInvoiceSelectionTemplate />} />
                  <Route path="/bulk-invoice-details/:id" element={<BulkInvoiceDetailsTemplate />} />
                  <Route
                    path="/bulk-reimbursement-invoice-selection"
                    element={<BulkReimbursementInvoiceBrowseTemplate />}
                  />
                  <Route
                    path="/bulk-reimbursement-unit-selection/:id"
                    element={<BulkReimbursementUnitBrowseTemplate />}
                  />
                  <Route
                    path="/bulk-reimbursement-detail/:bulkunitpk"
                    element={<BulkReimbursementDetailsTemplate />}
                  />
                  <Route
                    path="/bulk-reimbursement-document/:bulkunitpk"
                    element={<BulkReimbursementDocuments />}
                  />
                  <Route path="/driver-invoice-browse" element={<DriverInvoiceSelection />} />
                  <Route path="/driver-invoice-manual" element={<ManualEntryTemplate />} />
                  <Route path="/user-permission-groups/:id" element={<HalfScreenGroupTemplate />} />
                  <Route path="/driver-invoice-scan" element={<DriverInvoiceScan />} />
                  <Route path="/user-permission/:id" element={<UserPermissionBrowsePage />} />
                  {/* Edit Invoice */}
                  <Route path="/edit-invoice/invoice-unit-selection" element={<InvoiceUnitSelection />} />
                  <Route
                    path="/edit-invoice/invoice-non-unit-selection"
                    element={<InvoiceNonUnitSelection />}
                  />
                  <Route path="/edit-invoice/add/:id/:pageNumber" element={<InvoiceUnitConfirmation />} />
                  <Route
                    path="/edit-invoice/add/non-unit/:id/:pageNumber"
                    element={<InvoiceUnitConfirmation />}
                  />
                  <Route path="/edit-invoice-information/:id" element={<InvoiceInformationView />} />
                  <Route
                    path="/edit-invoice/invoice-non-unit-selection"
                    element={<InvoiceNonUnitSelection />}
                  />
                  <Route path="/edit-invoice-save" element={<InvoiceSave />} />
                  <Route
                    path="/edit-invoice-unit-confirmation/:id/:pageNumber"
                    element={<InvoiceInformationView />}
                  />
                  <Route path="/edit-invoice-void/:id" element={<InvoiceVoid />} />
                  {/* Edit Invoice end*/}
                  <Route
                    path="/driver-service-selection/:driverId/dispatch-document"
                    element={<DispatchDocumentForm />}
                  />
                  {/* Invoice Inquiry */}
                  <Route
                    path="/invoice-inquiry/invoice-unit-selection"
                    element={<InvoiceInquiryUnitSelection />}
                  />
                  <Route
                    path="/invoice-inquiry/invoice-non-unit-selection"
                    element={<InvoiceInquiryNonUnitSelection />}
                  />
                  <Route
                    path="/invoice-inquiry/invoice-driver-selection"
                    element={<InvoiceInquiryDriverSelection />}
                  />
                  <Route path="/invoice-inquiry/add/:id/:pageNumber" element={<InvoiceUnitConfirmation />} />
                  <Route path="/invoice-inquiry/:id" element={<InvoiceInformationView />} />
                  <Route
                    path="/invoice-inquiry-unit-confirmation/:id/:pageNumber"
                    element={<InvoiceInformationView />}
                  />
                  <Route path="/invoice-inquiry-void/:id" element={<InvoiceVoid />} />
                  <Route
                    path="/invoice-inquiry/unit-confirmation/:id/:pageNumber"
                    element={<InvoiceInquiryUnitConfirmation />}
                  />
                  <Route
                    path="/invoice-inquiry/driver-confirmation/:id/:pageNumber"
                    element={<InvoiceInquiryDriverConfirmation />}
                  />
                  <Route path="/invoice-inquiry-detail/:id" element={<InvoiceDetail />} />
                  <Route path="/invoice-inquiry-unit-export" element={<UnitExport />} />
                  <Route path="/invoice-inquiry-driver-export" element={<DriverExport />} />
                  {/* Invoice Inquiry end*/}
                  {/* Scan Invoice */}
                  <Route path="/scan-invoice/invoice-unit-selection" element={<ScanInvoiceUnitSelection />} />
                  <Route
                    path="/scan-invoice/invoice-non-unit-selection"
                    element={<ScanInvoiceNonUnitSelection />}
                  />
                  <Route path="/scan-invoice/add/:id/:pageNumber" element={<ScanInvoiceUnitConfirmation />} />
                  <Route
                    path="/scan-invoice/add/non-unit/:id/:pageNumber"
                    element={<ScanInvoiceUnitConfirmation />}
                  />
                  <Route path="/scan-invoice-save" element={<DocumentScanScreen />} />
                  {/* Scan Invoice end*/}
                  <Route path="/permissions-maintenance" element={<PermissionMainPage />} />
                  <Route path="/permissions-maintenance/add" element={<PermissionTemplate />} />
                  <Route path="/permissions-maintenance/:id" element={<PermissionTemplate />} />
                  <Route path="/permissions-maintenance" element={<PermissionMainPage />} />
                  <Route path="/permissions-maintenance/add" element={<PermissionTemplate />} />
                  <Route path="/permissions-maintenance/:id" element={<PermissionTemplate />} />
                  <Route path="/toll-by-plate/selection" element={<TollsByPlateSelectionTemplate />} />
                  <Route path="/toll-by-plate/details" element={<TollsByPlateDetailsTemplate />} />
                  <Route path="/toll-by-plate/checkPay" element={<TollsByPlateCheckTemplate />} />
                  <Route path="/print-check-options-screen" element={<OptionScreenTemplate />} />
                  <Route
                    path="/print-check-transport-company-screen"
                    element={<TransportCompanyTemplate />}
                  />
                  <Route
                    path="/print-check-miscellaneous-check-screen"
                    element={<MiscellaneousCheckTemplate />}
                  />
                  <Route path="/print-check-stub-screen" element={<CheckStubTemplate />} />
                  <Route path="/print-check-drivers-screen" element={<PrintCheckDriversTemplate />} />
                  <Route path="/purge-damage-return" element={<PurgeDamageReturnUnitsForm />} />
                  <Route path="/purge-confirmation-page/:id" element={<PurgeConfirmationPage />} />
                  <Route path="/unit-status-selection" element={<UnitSelectionBrowse />} />
                  <Route path="/unit-status-detail" element={<UnitStatusDetailTemplate />} />
                  <Route
                    path="/unit-status-detail-page/:id/:pageNumber"
                    element={<UnitStatusDetailTemplate />}
                  ></Route>
                  <Route path="/delay-units-pending-email" element={<DelayedUnitsPendingEmail />} />
                  <Route
                    path="/delay-units-pending-email/add/:driverId"
                    element={<DelayedUnitPendingEmailView />}
                  />
                  <Route
                    path="/unit-status-detail-page/:id/:pageNumber"
                    element={<UnitStatusDetailTemplate />}
                  ></Route>
                  <Route
                    path="/dispatch-delay-move/:unitFK/:driverFK/:delayedUnitPK"
                    element={<DispatchDelayMove />}
                  />
                  <Route
                    path="/payment-requests/:driverId/"
                    element={<PaymentRequestSelectionTemplate />}
                  ></Route>
                  <Route
                    path="/payment-requests-detail/:driverId/:id/"
                    element={<PaymentRequestTemplate />}
                  ></Route>
                  <Route path="/payment-requests-new/:driverId" element={<PaymentRequestTemplate />}></Route>
                  {/* Operations-Driver Services-Pay History */}
                  <Route path="/pay-history/:driverId" element={<PayHistoryTemplate />} />
                  <Route path="/pay-debit-card-invoice" element={<PayDebitCardTemplate />} />
                  <Route path="/post-driver-pay-requests" element={<PostDriverPayRequests />} />
                  <Route path="/post-driver-pay-requests/:id" element={<DetailViewScreen />} />
                  <Route path="/post-driver-pay-requests/denied/:id" element={<DeniedScreen />} />
                  <Route path="/outstanding-paperwork-settings-screen" element={<SettingsScreen />} />
                  <Route path="/outstanding-paperwork-browse-screen" element={<BrowseScreen />} />
                  <Route path="/outstanding-paperwork-comments-screen" element={<CommentsScreen />} />
                  <Route path="/outstanding-paperwork-email-screen" element={<EmailScreen />} />
                  <Route path="/missing-paperwork-settings-screen" element={<MPSettingsScreen />} />
                  <Route path="/missing-paperwork-browse-screen" element={<MPBrowseScreen />} />
                  <Route path="/missing-paperwork-comments-screen" element={<MPCommentsScreen />} />
                  <Route path="/missing-paperwork-email-screen" element={<MPEmailScreen />} />
                  <Route path="/e-manifest-browse-screen" element={<DispatchBrowseScreen />} />
                  <Route
                    path="/e-manifest-dispatch-confirmation-screen"
                    element={<DispatchConfirmationScreen />}
                  />
                  <Route
                    path="/e-manifest-change-request-reason-screen"
                    element={<ChangeRequestReasonScreen />}
                  />
                  <Route path="/edit-checkin-browse/:id" element={<EditCheckinSelectionTemplate />} />
                  <Route path="/edit-checkin-form/:id/:checkinId" element={<FormCheckinTemplate />} />
                  <Route path="/damage-browse" element={<DamagedUnitBrowse />} />
                  <Route path="/post-to-passport" element={<PostToPassportTemplate />} />
                  <Route path="/random-testing" element={<RandomTestingTemplate />} />
                  {/* Misc Invoice */}
                  <Route path="/misc-invoice-unitselection" element={<MiscInvoiceUnitSelectionTemplate />} />
                  <Route
                    path="/misc-invoice-unitcon-nocross-noalter/:id"
                    element={<UnitConfNocrossNoalternateTemplate />}
                  />
                  <Route path="/misc-invoice-details/:id" element={<InvoiceDeatilTemplate />} />
                  <Route path="/misc-invoice-document/:id" element={<DocumentTemplate />} />
                  <Route path="/misc-invoice-non-unit" element={<NonUnitInvoiceTemplate />} />
                  <Route path="/misc-invoice-unitcon-cross/:id" element={<UnitConfCrossCompanyTemplate />} />
                  <Route
                    path="/misc-invoice-exist-invoice/:id"
                    element={<DisplayExistingInvoiceTemplate />}
                  />
                  <Route path="/misc-invoice-details" element={<InvoiceDeatilTemplate />} />
                  <Route path="/misc-invoice-document" element={<DocumentTemplate />} />
                  <Route
                    path="/misc-invoice-not-cross-alternate-customer/:id"
                    element={<UnitConfNocrossAlternateTemplate />}
                  />
                  <Route path="/post-check" element={<PostCheckTemplate />} />
                  <Route path="/driver-mileagelog/:driverId" element={<MileageLogTemplate />} />
                  <Route path="/post-to-passport" element={<PostToPassportTemplate />} />
                  <Route path="/driver-bond-fund-log/:driverId" element={<BondFundsTemplate />} />
                  <Route path="/driver-reserve-fund-log/:driverId" element={<ReserveFundTemplate />} />
                  <Route path="/safety-award-certificates" element={<SafetyAwardCertificates />} />
                  <Route path="/safety-school-certificates" element={<SafetySchoolCertificates />} />
                  <Route path="/simulator-certificates" element={<SimulatorCertificates />} />
                  <Route path="/certificate-update" element={<CertificateUpdate />} />
                  <Route
                    path="/certificate-update-driver-selection"
                    element={<CertificateUpdateDriverSelectionPage />}
                  />
                  <Route path="/process-motive-files" element={<ProcessMotiveFiles />} />
                  <Route path="/delease-request" element={<DeleaseRequestBrowseTemplate />} />
                  <Route
                    path="/driver-requestview/:driverId/:deleaserequestPK"
                    element={<RequestViewTemplate />}
                  />
                  <Route
                    path="/driver-requestview/add/:driverId/:deleaserequestPK"
                    element={<DriverDeleaseFormTemplate />}
                  />
                  <Route path="/bulk-emails-selection" element={<BulkEmailsScreenTemplate />} />
                  <Route path="/bulk-emails-text" element={<EmailTextScreenTemplate />} />
                  <Route path="/bulk-emails-browse" element={<BrowsePageTemplate />} />
                  <Route
                    path="/delay-unit-expense/:delayedUnitPK/:breakdownFK"
                    element={<DelayUnitExpense />}
                  />
                  <Route
                    path="/delay-settlement/:breakdownFK/:delayedUnitPK/:selectedCompanyName"
                    element={<DelayUnitBreakdownSettlement />}
                  />
                  <Route path="/delay-unit-check-request/:driverfk/:id" element={<DelayUnitCheckRequest />} />
                  <Route
                    path="/delay-unit-check-request-formcontent/:driverfk/:id/:checkRequestid"
                    element={<DelayUnitCheckRequestFormContent />}
                  />
                  <Route
                    path="/delay-unit-check-request/:driverfk/:id/add"
                    element={<DelayUnitCheckRequestFormContent />}
                  />
                  <Route
                    path="/delay-unit-check-detail/:driverfk/:id/:checkRequestid"
                    element={<DelayUnitCheckDetail />}
                  />
                  <Route path="/driver-invoice-browse" element={<DriverInvoiceSelection />} />
                  <Route
                    path="/driver-invoice-detail/:driverId/:unitId"
                    element={<InvoiceDetailTemplate />}
                  />
                  <Route path="/driver-invoice-detail/:unitId" element={<InvoiceDetailTemplate />} />
                  <Route path="/driver-invoice-detail" element={<InvoiceDetailTemplate />} />
                  <Route path="/driver-invoice-manual" element={<ManualEntryTemplate />} />
                  <Route
                    path="/driver-invoice-unit-selection/:driverId"
                    element={<DriverInvoiceUnitSelection />}
                  />
                  <Route
                    path="/driver-invoice-unit-confirmation/:driverId/:unitId"
                    element={<DriverInvoiceUnitConfirmation />}
                  />
                  <Route path="/driver-invoice-unit-selection" element={<DriverInvoiceUnitSelection />} />
                  <Route
                    path="/driver-invoice-unit-confirmation/:unitId"
                    element={<DriverInvoiceUnitConfirmation />}
                  />
                  <Route path="/driver-invoice-scan/:unitId" element={<DriverInvoiceScan />} />
                  <Route path="/driver-invoice-scan/:driverId/:unitId" element={<DriverInvoiceScan />} />
                  <Route path="/dealer-connection-flatrate-browse/:id" element={<FlatrateBrowse />} />
                  <Route path="/blocked-log-report" element={<BlockedLogReport />} />
                  <Route path="/reports-driver-delease-report" element={<DriverDeleaseReport />} />
                  {/*New Delay */}
                  <Route
                    path="/delay-processing/new-delay/:companyName/:unitfk/:driverfk"
                    element={<NewDelayTemplate />}
                  />
                  {/*Edit Delay */}
                  <Route
                    path="/delay-processing/edit-delay/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<EditDelayTemplate />}
                  />
                  {/*New Breakdown */}
                  <Route
                    path="/new-breakdown/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<NewBreakdownTemplate />}
                  />
                  {/*Edit Breakdown */}
                  <Route
                    path="/breakdown-processing/edit-breakdown/:breakdownFK"
                    element={<EditBreakdownTemplate />}
                  />
                  {/*View Breakdown */}
                  <Route
                    path="/breakdown-processing/view-breakdown/:breakdownFK"
                    element={<ViewBreakdownPage />}
                  />
                  {/*Yard checkin second shuttle*/}
                  <Route path="/yard-checkin-second-shuttle" element={<SecondShuttleTemplate />} />
                  <Route path="/release-reserve/:driverId" element={<ReleaseReserveTemplate />} />
                  <Route path="/dealer-connection-flatrate-browse/:id" element={<FlatrateBrowse />} />
                  <Route
                    path="/dealer-connection-flatrate-customer-selection/:id"
                    element={<DealerConnectionFlatrateSelection />}
                  />
                  <Route
                    path="/dealer-connection-flatrate-getbyid/:id/:dealerId"
                    element={<FlatrateDetails />}
                  />
                  <Route path="/dealer-connection-flatrate-getbyid-new/:id/" element={<FlatrateDetails />} />
                  <Route path="/reports-hotlisting" element={<HotListing />} />
                  <Route path="/reports-driver-recruit-report" element={<DriverRecruitReport />} />
                  <Route path="/reports-damage-check-request-report" element={<DamageCheckRequestReport />} />
                  <Route path="/reports-state-mileage-report" element={<StateMileageReportMain />} />
                  <Route
                    path="/reports-driver-delivery-summary"
                    element={<DriverDeliverySummaryListingReport />}
                  />
                  <Route
                    path="/reports-shuttle-weekly-summary-report"
                    element={<ShuttleWeeklySummaryReport />}
                  />
                  <Route path="/dealer-group" element={<DealerGroupsListingMainPage />} />
                  <Route
                    path="/add-dealer-group/:dealerGroupPK/:pageNumber"
                    element={<DealerGroupViewPage />}
                  />
                  <Route path="/add-dealer-group" element={<DealerGroupViewPage />} />
                  <Route
                    path="/add-dealer-details/:dealerGroupPK/:pageNumber"
                    element={<DealerDeatilsEditPage />}
                  />
                  <Route path="/reprint-selection-screen" element={<ReprintSelectionTemplate />} />
                  <Route path="/reprint-driver-selection" element={<ReprintDriverSelectionMainPage />} />
                  <Route
                    path="/reprint-unit-confirmation-screen/:id"
                    element={<ReprintUnitConfirmationScreen />}
                  />
                  <Route
                    path="/reprint-dispatch-confirmation-screen/:dispId"
                    element={<ReprintDispatchConfirmationScreen />}
                  />
                  <Route path="/reprint-output-selection-screen" element={<ReprintOutputSelectionScreen />} />
                  <Route
                    path="/reprint-dispatch-selection-screen"
                    element={<ReprintDispatchSelectionScreen />}
                  />
                  <Route path="/unit-status-selection-reprint" element={<UnitSelectionBrowse />} />
                  <Route path="/reports-driver-recruit-report" element={<DriverRecruitReport />} />
                  <Route
                    path="/driver-dot-inspection-browse/:driverId"
                    element={<DriverDOTInspectionBrowse />}
                  />
                  <Route
                    path="/driver-dot-inspection-content/:driverId"
                    element={<NewDOTInspectionContent />}
                  />
                  <Route
                    path="/driver-dot-inspection-content/:driverId/:dotInspectionPK"
                    element={<EditDOTInspectionContent />}
                  />
                  <Route
                    path="/random-testing-yearly-summary-report"
                    element={<RandomTestingYearlySummaryReport />}
                  />
                  <Route path="/reports-driver-recruit-report" element={<DriverRecruitReport />} />
                  <Route path="/random-testing-report" element={<RandomTestingSummaryReport />} />
                  <Route path="/reports-truck-maintenance-report" element={<TruckMaintenanceReport />} />
                  <Route path="/reports-driver-chargeable-report" element={<DriverChargeableTotalReport />} />
                  <Route path="/reports-driver-trip-summary-report" element={<DriverTripSummaryReport />} />
                  <Route path="/customer-listing-report" element={<CustomerListingReport />} />
                  {/* DriverDotInspection */}
                  <Route
                    path="/driver-dot-inspection-browse/:driverId"
                    element={<DriverDOTInspectionBrowse />}
                  />
                  <Route
                    path="/driver-dot-inspection-content/:driverId"
                    element={<NewDOTInspectionContent />}
                  />
                  <Route
                    path="/driver-dot-inspection-content/:driverId/:dotInspectionPK"
                    element={<EditDOTInspectionContent />}
                  />
                  <Route path="/reports-damage-code-report" element={<DamageCodeReport />} />
                  <Route
                    path="/reports-undispatched-listing-report"
                    element={<UndispatchedListingReport />}
                  />
                  <Route path="/reports-yard-capacity-report" element={<YardCapacityReport />} />
                  <Route
                    path="/reports-closed-claims-reserve-report"
                    element={<ClosedClaimsReserveReport />}
                  />
                  <Route
                    path="/reports-customer-activity-summary-report"
                    element={<CustomerActivitySummaryReport />}
                  />
                  <Route path="/reports-shuttle-report" element={<ShuttleReport />} />
                  <Route
                    path="/reports-service-fleet-profile-report"
                    element={<ServiceFleetProfileReport />}
                  />
                  <Route
                    path="/reports-outstanding-driver-payback-reports"
                    element={<OutstandingDriverPaybackReport />}
                  />
                  <Route
                    path="/reports-dispatchers-by-dispatcher-report"
                    element={<DispatchesByDispatcherReport />}
                  />
                  <Route
                    path="/reports-outstanding-driver-settlement-report"
                    element={<OutstandingDriverSettlementReport />}
                  />
                  <Route path="/reports-weekly-projection-report" element={<WeeklyProjectionsReport />} />
                  <Route
                    path="/reports-trip-listing-by-customer-report"
                    element={<TripListingByCustomerReport />}
                  />
                  <Route
                    path="/reports-unit-pickup-exception-report"
                    element={<UnitPickupExceptionReport />}
                  />
                  <Route path="/unit-pickup-exception-browse-screen" element={<UnitBrowseScreen />} />
                  <Route path="/unit-pickup-exception-comments-screen" element={<UnitCommentsScreen />} />
                  <Route
                    path="/unit-pickup-exception-mail-screen"
                    element={<UnitPickupExceptionReportMail />}
                  />
                  <Route path="/reports-customer-sales-report" element={<CustomerSalesReport />} />
                  <Route path="/reports-onroad-not-delivered-report" element={<OnRoadNotDeliveredReport />} />
                  <Route path="/reports-pickup-fees-report" element={<PickupFeesReport />} />
                  <Route path="/reports-damage-status-report" element={<DamageStatusReport />} />
                  <Route path="/reports-delayed-unit-report" element={<DelayedUnitReport />} />
                  <Route path="/reports-yard-inventory-report" element={<YardInventoryReport />} />
                  <Route
                    path="/reports-customer-trip-summary-report"
                    element={<CustomerTripSummaryReport />}
                  />
                  <Route path="/reports-email-mvr-list" element={<EmailMVRListReport />} />
                  <Route path="/reports-irp-plate-list-report" element={<IRPPlateListReport />} />
                  {/* Damage Browse */}
                  <Route
                    path="/damage-browse/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<DamagedUnitBrowse />}
                  />
                  {/*New Damage */}
                  <Route
                    path="/new-damage/:companyName/:unitfk/:driverfk/:delayedUnitPK"
                    element={<NewDamageTemplate />}
                  />
                  {/*Edit Damage */}
                  <Route path="/damage-processing/edit-damage/:damageFK" element={<EditDamageTemplate />} />
                  {/*View Damage */}
                  <Route path="/damage-processing/view-damage/:damageFK" element={<ViewDamagePage />} />
                  <Route path="/driver-orientation-forms/:driverId" element={<Orientation />} />
                  <Route path="/orientation-forms" element={<ComplianceOrientation />} />
                  <Route
                    path="/driver-reserve-adjustment/:driverFK/:id"
                    element={<DriverReserveAdjustment />}
                  />
                  <Route path="/reports-damage-report" element={<DamageReport />} />
                  {/*Plant Release */}
                  <Route path="/plant-release-importlist-screen" element={<ImportListTemplate />} />
                  <Route path="/plant-release-test-result-screen" element={<TestResultContent />} />
                  <Route path="/bulk-order-entry" element={<BulkOrderEntry />} />
                  <Route path="/driver-pay-log/:id" element={<DriverPayLog />} />
                  <Route path="/return-tmr/:id" element={<ReturnTMR />} />
                  <Route path="/driver-maintenance/:id/holds" element={<ComplianceHoldContent />} />
                  {/* Private Route Closing Tag */}
                  {/*Available Reports */}
                  <Route path="/avaliable-driver-browse-page" element={<AvailableBrowsescreen />} />
                  <Route path="/avaliable-driver-comments" element={<AvaliableComments />} />
                  <Route path="/add-comments/:driverId" element={<AddComments />} />
                  {/* Add all private routes above this */}
                </Route>{" "}
                {/* DriverDotInspection */}
                {/* anything that matches no route above lands here */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}
export default withNamespaces()(App);
