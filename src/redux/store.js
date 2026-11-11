import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import DealerSearchReducer from "./DealerSearchFilterSlice";
import PaginationReducer from "./PaginationSlice";
import EditDealerReducer from "./EditDealerSlice";
import CustomerBulkInvoiceSlice from "./CustomerBulkInvoiceSlice";
import CustomerContactReducer from "./CustomerContactSlice";
import CustomerDelayReducer from "./CustomerDelaySlice";
import CustomerEmailSearchFilterReducer from "./CustomerEmailSearchFilterSlice";
import CustomerEmailMaintenanceSlice from "./CustomerEmailMaintenanceSlice";
import CustomerMaintenanceReducer from "./CustomerMaintenanceSlice";
import CustomerSearchFilterReducer from "./CustomerSearchFilterSlice";
import CustomerDPURestrictionsReducer from "./CustomerDPURestrictionsSlice";
import EditPrinterReducer from "./EditPrinterSlice";
import PrinterSearchReducer from "./PrinterSearchFilterSlice";
import RegionsSearchFilterSlice from "./RegionsSearchFilterSlice";
import CustomerOrderUsersReducer from "./CustomerOrderUsersSlice";
import customerOpenBalanceReducer from "./customerOpenBalanceSlice";
import CustomerCreditCardReducer from "./CustomerCreditCardSlice";
import AlternateContactReducer from "./AlternateContactSlice";
import CustomerPlantmaintanceReducer from "./CustomerPlantMaintenanceSlice";
import CustomerPlantSearchFilterReducer from "./CustomerPlantSearchFilterSlice";
import UsePlantCustomerSearchFilterReducer from "./UsePlantCustomerSearchFilterSlice";
import YardMaintenanceReducer from "./YardMaintenanceSlice";
import OrderEntryReducer from "./OrderEntryFilterSlice";
import EditMasterSlice from "./EditMaster/EditMasterSlice";
import UnitSelectionSlice from "./EditMaster/UnitSelectionSlice";
import MiscCustomerLookupReducer from "../redux/LookupScreens/MiscCustomerLookupSlice";
import CustomerLookupReducer from "../redux/LookupScreens/CustomerLookupSlice";
import MiscDealerLookupReducer from "../redux/LookupScreens/MiscDealerLookupSlice";
import OEDrivesBySlice from "./OEDrivesBySlice";
import CustomerPlantsLookupReducer from "../redux/LookupScreens/CustomerPlantsLookupSlice";
import YardLookupReducer from "../redux/LookupScreens/YardLookupSlice";
import ShuttleCityLookupReducer from "../redux/LookupScreens/ShuttleCityLookupSlice";
import DealerLookupReducer from "./LookupScreens/DealerLookupSlice";
import UnitTypeLookupReducer from "../redux/LookupScreens/UnitTypeLookupSlice";
import SpecialCodeLookupReducer from "../redux/LookupScreens/SpecialCodeLookupSlice";
import BrokerLookupReducer from "../redux/LookupScreens/BrokerLookupSlice";
import PortOfEntryLookupReducer from "./LookupScreens/PortOfEntryLookupSlice";
import UnitMultiLoadLookupReducer from "./LookupScreens/UnitMultiLoadLookupSlice";
import DriveBysLookupReducer from "./LookupScreens/DriveBysLookupSlice";
import OECreditCardSlice from "./OECreditCardSlice";
import UnitTypeGroupLookupReducer from "../redux/LookupScreens/UnitTypeGroupLookupSlice";
import PlantGroupLookupReducer from "./LookupScreens/PlantGroupLookupSlice";
import UserLookupReducer from "../redux/LookupScreens/UserLookupSlice";
import printerLookupReducer from "../redux/LookupScreens/PrinterLookupSlice";
import CustomerGroupsLookupReducer from "../redux/LookupScreens/CustomerGroupsLookupSlice";
import UserMaintenanceReducer from "./UserMaintenanceSearchFilterSlice";

import CheckPayToReducer from "./CheckPayToSlice";
import PlantToYardTransfersSlice from "./PlantToYardTransfersSlice";

import YardEmailReducer from "./YardEmailSlice";

import DriverServicesSlice from "./DriverServiceSlice";
import PostalCodereducer from "./PostalCodeSlice";
import ShuttleCitysReducer from "./ShuttleCitysSlice";
import DealerContacts from "./DealerContacts";
import EquipmentReducer from "./EquipmentsSlice";
import UnitTypeGroupsReducer from "./LookupScreens/UnitTypeGroupsSlice";
import CustomerPlantGroupsReducer from "./LookupScreens/CustomerPlantGroupsLookupSlice";
import RegionsReducer from "./LookupScreens/RegionsLookupSlice";
import YardCheckinReducer from "./YardCheckinSlice";
import EditYardUnitsReducer from "./EditYardUnitSlice";
import yardToYardShuttleReducer from "./YardToYardShuttleSlice";
import CityToYardReducer from "./CityToYardSlice";
import StateGroupsLookupReducer from "../redux/LookupScreens/StateGroupsLookupSlice";
import PlantReleaseReducer from "./PlantReleaseSlice";
import DispatchesReducer from "./DispatchesSlice";

import plantToPlantTransferReducer from "./PlantToPlantTransferSlice";
import HolidaysSlice from "./HolidaysSlice";
import SpecialCodesReducer from "./SpecialCodesSlice";
import ApproveHeldShuttleReducer from "./ApproveHeldSlice";
import StatePermitsReducer from "./StatePermitsSlice";
import StateReducer from "././LookupScreens/StateLookupSlice";
import ShuttleInquiryReducer from "./ShuttleInquirySlice";
import EditShuttleReducer from "./EditShuttleSlice";
import ProcessShuttlePayReducer from "./ProcessPaySlice";
import EditRegionSlice from "./EditRegionSlice";
import DealerEmailReducer from "./DealerEmailSlice";
import DealerGroupsSearchFilterSlice from "./DealerGroupsSearchFilterSlice";
import EditDealerGroupslice from "./EditDealerGroupslice";
import DealerGroupsReducer from "./LookupScreens/DealerGroupLookupSlice";
import UnitTypeReducer from "././UnitTypeSlice";
import FormsReducer from "././LookupScreens/FormsLookupSlice";
import FormTypesReducer from "././LookupScreens/FormTypesLookupSlice";
import SupplementalRatesReducer from "././SupplementalRatesSlice";

import CustomerPlantGroupReducer from "./LookupScreens/CustomerPlantGroupLookupSlice";
import CustomerGroupLookupReducer from "./LookupScreens/CustomerGroupsLookupSlice";
import CustomerUnitTypeGroupLookupReducer from "./LookupScreens/CustomerUnitTypeGroupsLookupSlice";
import TransPortCompanysLookupReducer from "./LookupScreens/TransportCompanysLookupSlice";
import StateGroupsReducer from "./LookupScreens/StateGroupsLookupSlice";
import UnitActivationReducer from "./UnitActivationSlice";
import DriverLookupSlice from "./LookupScreens/DriverLookupSlice";
import DealerConnectionsSearchFilterSlice from "./DealerConnectionsSearchFilterSlice";
import DpuInstructionsReducer from "./DpuInstructionsSlice";
import DeleaseItemsReducer from "./DeleaseItemsSlice";
import ComplianceItemsReducer from "./ComplianceItemsSlice";
import DelayedUnitCodesReducer from "./DelayUnitCodesSlice";
import DeleaseCodeReducer from "./DeleaseCodeSlice";
import DispatchHoldSearchSliceReducer from "./DispatchHoldSearchSlice";
import DriverCheckinReducer from "./DriverCheckinSlice";
import DelayResourcesSlice from "./DelayResourcesSlice";
import DriverTerminationLetterSlice from "./DriverTerminationLetterSlice";
import ReservesReducer from "./ReservesSlice";
import ReserveTypeReducer from "././LookupScreens/ReserveTypeLookupSlice";
import CompanyReducer from "./CompanySlice";
import CheckPayToLookupSlice from "./LookupScreens/CheckPayToLookupSlice";
import TermsLookupSlice from "./LookupScreens/TermsLookupSlice";
import PortOfEntryReducer from "./PortsOfEntrySlice";
import CustomerPlantContactReducer from "./CustomerPlantContactSlice";
import ReserveTypesReducer from "././ReserveTypesSlice";
import CustomerDealerRoutesSlice from "./CustomerDealerRoutesSlice";
import CustomerDealerSlice from "./CustomerDealerSlice";
import EditCustomerDealerSlice from "./EditCustomerDealerSlice";
import FormTypes from "././FormTypesSlice";
import ImportBrokersReducer from "././ImportBrokersSlice";
import TermsReducer from "././TermsSlice";
import CustomerPlantEmailReducer from "./CustomerPlantEmailSlice";
import EquipmentCheckInOutReducer from "./EquipmentCheckInOutSlice";
import CustomerPlantDelayReducer from "./CustomerPlantDelaySlice";
import ExportBrokersReducer from "./ExportBrokersSlice";
import EmailFormats from "././EmailFormatsSlice";
import EmailRecipient from "././EmailRecipientSlice";
import EmailSenderTypesSlice from "./EmailSenderTypesSlice";
import EmailSenderTypesLookupSlice from "././LookupScreens/EmailSenderTypesLookupSlice";
import CustomerGroupsSlice from "./CustomerGroupsSlice";
import Forms from "././FormsSlice";

import CustomerPlantGroupSlice from "./CustomerPlantGroupSlice";
import EditExportBrokersSlice from "./EditExportBrokersSlice";
import StateGroupReducer from "./StateGroupsSlice";
import CustomerProspectsReducer from "./CustomerProspectsSlice";
import CustomerOrdersReducer from "./CustomerOrdersSlice";
import EmailAttachmentReducer from "./EmailAttachmentSlice";
import UnitTypeGroupReducer from "./UnitTypeGroupSlice";
import DriverTrucksSlice from "./DriverTrucksSlice";
import DriverTrailersSlice from "./DriverTrailersSlice";
import ReservesLookupSlice from "./LookupScreens/ReservesLookupSlice";
import EquipmentLookupSlice from "./LookupScreens/EquipmentLookupSlice";
import CustomerUnitTypeGroupReducer from "./CustomerUnitTypeGroupSlice";
import DealerDriverSearchSlice from "./DealerDriverSearchSlice";
import driverSearchFilterSlice from "./DriverSearchFilterSlice";
import DriverSearchFilterSlice from "./DriverSearchFilterSlice";
import DriverDeleaseRequestsReducer from "./DriverDeleaseRequestsSlice";
import DriverTMRLogsReducer from "./DriverTMRLogsSlice";
import DriverReserveReducer from "./DriverReserveSlice";
import ReservesLookupReducer from "./LookupScreens/ReservesLookupSlice";
import DriverGarnishmentsReducer from "./DriverGarnishmentsSlice";
import DriverFlashSlice from "./DriverFlashSlice";
import DriverDispatchHoldSlice from "./DriverDispatchHoldSlice";
import DriverAddNotesSlice from "./DriverAddNotesSlice";
import DriverCheckinHistoryReducer from "./DriverCheckinHistorySlice";
import DriverComplianceItemsSlice from "./DriverComplianceItemsSlice";
import DriverEquipmentReducer from "./DriverEquipmentSlice";

import CustomerDispatchUsersSlice from "./CustomerDispatchUsersSlice";
import DriverReferralsReducer from "./DriverReferralsSlice";
import CustomerRatesReducer from "./CustomerRatesSlice";
import DriverDrugTestsSlice from "./DriverDrugTestsSlice";
import DriverReportCardSlice from "./DriverReportCardSlice";
import DispatchDocumentSlice from "./DispatchDocumentSlice";
import EditDriverFileSliceReducer from "./EditDriverFileSlice";
import DelayProcessingSlice from "./DispatchDelay/DelayProcessing/DelayProcessingSlice";
import DelayCodeUnitLookupReducer from "./LookupScreens/DealyUnitCodeLookupSlice";
import DriverBondFundReducer from "./DriverBondFundSlice";
import LoadHistorySlice from "./LoadHistorySlice";
import DriverMaintenanceReducer from "./DriverMaintenanceSlice";
import PostNoCheckinReducer from "./PostNoCheckinSlice";
import EditMasterExpressUnitSelectionSlice from "./EditMasterExpress/EditMasterExpressUnitSelectionSlice";
import EditMasterExpressTabsReducer from "./EditMasterExpress/EditMasterExpressTabsSlice";
import UndispatchReducer from "./UndispatchSlice";
import DispatchRestrictionsReducer from "./DispatchRestrictionsSlice";
import SettlementsReducer from "./SettlementsSlice";
import editMasterExpressInvoiceTabReducer from "./EditMasterExpress/EditMasterExpressInvoiceTabSlice";
import editMasterExpressDriverTabReducer from "./EditMasterExpress/EditMasterExpressDriverTabSlice";
import editMasterExpressOpenBalances from "./EditMasterExpress/EditMasterExpressOpenBalancesTabSlice";

import DriverDeleaseSlice from "./DriverDeleaseSlice";
import DeleaseCodeLookupSlice from "./LookupScreens/DeleaseCodeLookupSlice";
import EditInvoiceSlice from "./Invoicing/EditInvoiceSlice";
import RerouteReducer from "./RerouteSlice";
import DebitCardSlice from "./DebitCardSlice";
import PaperworkProcessing from "./Invoicing/PaperworkProcessingSlice";
import DamageCodeLookupSlice from "./LookupScreens/DamageCodeLookupSlice";
import RoadTypeCodeLookupSlice from "./LookupScreens/RoadTypeCodeLookupSlice";
import RoadConditionLookupSlice from "./LookupScreens/RoadConditionLookupSlice";

//import DamaageProessingSlice from "./DamaageProessingSlice"
import MiscInvoiceSlice from "./Invoicing/MiscInvoiceSlice";
import DriverListingReportSlice from "./Reports/DriverListingReportSlice";
import DriverLabelsSlice from "./DriverLabelsSlice";
import DriverInvoiceSlice from "./DriverInvoiceSlice";
import TransportCompaniesReducer from "./TransportCompaniesSlice";
import BreakdownProcessingSlice from "./DispatchDelay/BreakdownProcessing/BreakdownProcessingSlice";
import MileageLogSlice from "./MileageLogSlice";
import InventoryStatusFlashReportSlice from "./InventoryStatusFlashReportSlice";
import EditMasterExpressDispatchDriverPayTabSlice from "./EditMasterExpress/EditMasterExpressDispatchDriverPayTabSlice";

import PurgeDamageReturnUnitsSlice from "./PurgeDamageReturnUnitsSlice";
import CheckRejectedLoadReducer from "./CheckRejectedLoadsSlice";
import InvoiceInquirySlice from "./Invoicing/InvoiceInquirySlice";
import BulkEmailSlice from "./Operations/BulkEmailSlice";
import BulkInvoiceSlice from "./Invoicing/BulkInvoiceSlice";
import BulkUnitReimbursementSlice from "./Invoicing/BulkUnitReimbursementSlice";
import CreditCardEnquirySlice from "./Invoicing/CreditCardEnquirySlice";
import ScanInvoiceSlice from "./Invoicing/ScanInvoiceSlice";
import DPUInvoiceSlice from "./Invoicing/DPUInvoiceSlice";
import TollsByPlateSlice from "./Invoicing/TollsByPlateSlice";
import PrintCheckReducer from "./PrintCheckSlice";
import UnitStatusReducer from "./UnitStatus/UnitStatusSlice";
import UnitStatusSlice from "./UnitStatusSlice";
import UserPermissionGroupSlice from "./UserPermissionGroupSlice";
import PaymentRequestSlice from "./PaymentRequestSlice";
import DispatchesLookupSlice from "./LookupScreens/DispatchesLookupSlice";
import OutstandingPaperworkSlice from "./OutstandingPaperworkSlice";
import MissingPaperworkSlice from "./MissingPaperworkSlice";
import DelayDamageSlice from "./DispatchDelay/DelayProcessing/DelayDamageSlice";

import DriverPayHistorySliceReducer from "./DriverPayHistorySlice";
import DriverPayLogSliceReducer from "./DriverPayLogSlice";
import EmanifestChangeRequestSlice from "./EmanifestChangeRequestSlice";
import UserPermissionSlice from "./UserPermissionSlice";
import PermissionsMaintenanceSlice from "./PermissionsMaintenanceSlice";
import MenuLookupSlice from "./LookupScreens/MenuLookupSlice";
import PermissionGroupsReducer from "./PermissionGroupMaintenanceSlice";
import RandomTestingSlice from "./Compliance/RandomTestingSlice";

import PostCheckReducer from "./PostCheckSlice";
import DelayedUnitsPendingEmailSlice from "./DelayedUnitsPendingEmailSlice";
import BondFundsLogSlice from "./BondFundsLogSlice";
import ReserveFundsLogSlice from "./ReserveFundsLogSlice";
import PayDebitcardInvoiceReducer from "./PayDebitcardInvoiceSlice";
import PostPayRequestSlice from "./PostPayRequestSlice";
import DelayDamageSafetyReducer from "./DelayDamageSafetySlice";
import SimulatorCertificateSlice from "./Compliance/SimulatorCertificateSlice";
import CertificateUpdateSlice from "./Compliance/CertificateUpdateSlice";
import DriverDeleaseRequestSlice from "./Compliance/DriverDeleaseRequestSlice";

import EditCheckinSlice from "./EditCheckinSlice";
import PostToPassportReducer from "./PostToPassportSlice";
import DocumentTypeLookupSlice from "./LookupScreens/DocumentTypeLookupSlice";
import SettlementReducer from "./DispatchDelay/BreakdownProcessing/SettlementSlice";

import BreakdownFeesReducer from "./DispatchDelay/BreakdownProcessing/BreakdownFeesSlice";
import DelayUnitCheckRequestSlice from "./DispatchDelay/DelayProcessing/DelayUnitCheckRequestSlice";
import DelayUnitExpenseSlice from "./DelayUnitExpenseSlice";
import DealerFlatRateConnectionSlice, {
  dealerFlatRateConnectionSlice,
} from "./DealerFlatRateConnectionSlice";
import YardCheckinSecondShuttleSlice from "./YardCheckinSecondShuttleSlice";
import ComplianceItemsLookupSlice from "./LookupScreens/ComplianceItemsLookupSlice";

import ReprintBolSlice from "./ReprintBolSlice";
import NewDelayedBrowseSlice from "./DispatchDelay/DelayProcessing/NewDelayedBrowseSlice";

import DriverDOTInspection from "./Compliance/DriverDOTInspectionSlice";
import DriverTrailerLookupSlice from "./LookupScreens/DriverTrailerLookupSlice";
import DriverTruckLookupSlice from "./LookupScreens/DriverTruckLookupSlice";
import ReleaseReserveSlice from "./ReleaseReserveSlice";
import DamageReducer from "./DispatchDelay/DamageProcessing/DamageSlice";
import UnitNumberLookupSlice from "./LookupScreens/UnitNumberLookupSlice";
import ClaimNumberLookupSlice from "./LookupScreens/ClaimNumberLookupSlice";
import { refactoredSlice } from "../store/store";
import UnitPickupExceptionSlice from "./Reports/UnitPickupExceptionSlice";
import CustomerPlantReleasesSlice from "./CustomerPlantReleasesSlice";
import BulkOrderEntrySlice from "./BulkOrderEntrySlice";
import DriverHoldsSlice from "./DriverHoldsSlice";
import AvailableDriversSlice from "./Reports/AvailableDriversSlice";

const combinedReducer = combineReducers({
  ...refactoredSlice,
  auth: AuthSlice,
  dealerSearchReducer: DealerSearchReducer,
  dealerGroupReducer: DealerGroupsSearchFilterSlice,
  editDealerGroupReducer: EditDealerGroupslice,
  paginationReducer: PaginationReducer,
  editDealerReducer: EditDealerReducer,
  customerBulkInvoice: CustomerBulkInvoiceSlice,
  customerContactReducer: CustomerContactReducer,
  customerDelaySlice: CustomerDelayReducer,
  customerEmailSearchFilter: CustomerEmailSearchFilterReducer,
  customerEmailMaintenance: CustomerEmailMaintenanceSlice,
  customerMaintenanceReducer: CustomerMaintenanceReducer,
  customerSearchFilterReducer: CustomerSearchFilterReducer,
  customerDPURestrictions: CustomerDPURestrictionsReducer,
  editPrinterReducer: EditPrinterReducer,
  printerSearchReducer: PrinterSearchReducer,
  regionsSearchReducer: RegionsSearchFilterSlice,
  customerOrderUsers: CustomerOrderUsersReducer,
  customerOpenBalanceReducer: customerOpenBalanceReducer,
  customerCreditCardReducer: CustomerCreditCardReducer,
  alternateContactReducer: AlternateContactReducer,
  yardMaintenanceReducer: YardMaintenanceReducer,
  orderEntryReducer: OrderEntryReducer,
  miscCustomerLookupReducer: MiscCustomerLookupReducer,
  miscDealerLookupReducer: MiscDealerLookupReducer,
  oeDriveBySlice: OEDrivesBySlice,
  customerLookupReducer: CustomerLookupReducer,
  customerPlantsLookupReducer: CustomerPlantsLookupReducer,
  yardLookupReducer: YardLookupReducer,
  shuttleCityLookupReducer: ShuttleCityLookupReducer,
  dealerLookup: DealerLookupReducer,
  unitTypeLookup: UnitTypeLookupReducer,
  specialCodeLookup: SpecialCodeLookupReducer,
  brokerLookup: BrokerLookupReducer,
  portOfEntryLookup: PortOfEntryLookupReducer,
  unitMultiLoadLookup: UnitMultiLoadLookupReducer,
  driveBysLookup: DriveBysLookupReducer,
  driverLookup: DriverLookupSlice,
  shuttleCitysReducer: ShuttleCitysReducer,
  customerPlantmaintanceReducer: CustomerPlantmaintanceReducer,
  customerPlantSearchFilterReducer: CustomerPlantSearchFilterReducer,
  //customerPlantmaintanceReducer:CustomerPlantmaintanceReducer,
  usePlantCustomerSearchFilterReducer: UsePlantCustomerSearchFilterReducer,
  oeCreditCardSlice: OECreditCardSlice,
  unitTypeGroupLookup: UnitTypeGroupLookupReducer,
  plantGroupLookup: PlantGroupLookupReducer,
  dealerContacts: DealerContacts,
  yardToYardShuttleReducer: yardToYardShuttleReducer,
  printerLookupReducer: printerLookupReducer,
  userLookupReducer: UserLookupReducer,
  customerGroupsLookupReducer: CustomerGroupsLookupReducer,
  userMaintenanceReducer: UserMaintenanceReducer,
  dealerEmailReducer: DealerEmailReducer,
  plantToYardTransfersReducer: PlantToYardTransfersSlice,
  equipmentReducer: EquipmentReducer,
  //Yard Checkin
  yardCheckinReducer: YardCheckinReducer,
  editYardUnitsReducer: EditYardUnitsReducer,
  yardEmailReducer: YardEmailReducer,
  driverServicesSlice: DriverServicesSlice,
  cityToYardReducer: CityToYardReducer,
  approveHeldShuttleReducer: ApproveHeldShuttleReducer,
  processShuttlePayReducer: ProcessShuttlePayReducer,
  editShuttleReducer: EditShuttleReducer,
  plantToPlantTransferReducer: plantToPlantTransferReducer,
  stateGroupsLookupReducer: StateGroupsLookupReducer,
  unitTypeGroupsReducer: UnitTypeGroupsReducer,
  customerPlantGroupsReducer: CustomerPlantGroupsReducer,
  regionsReducer: RegionsReducer,
  plantReleaseReducer: PlantReleaseReducer,
  postalCodeReducer: PostalCodereducer,
  dispatchesReducer: DispatchesReducer,
  checkPayToReducer: CheckPayToReducer,
  holidaysReducer: HolidaysSlice,
  specialCodesReducer: SpecialCodesReducer,
  statePermitsReducer: StatePermitsReducer,
  stateReducer: StateReducer,
  unitActivationReducer: UnitActivationReducer,
  editRegionReducer: EditRegionSlice,

  // Units
  // Edit Master
  editMaster: EditMasterSlice,
  unitSelection: UnitSelectionSlice,
  //Edit Master Express
  editMasterExpress: EditMasterExpressUnitSelectionSlice,
  editMasterExpressTabsReducer: EditMasterExpressTabsReducer,
  editMasterExpressDriverTabReducer: editMasterExpressDriverTabReducer,
  editMasterExpressOpenBalances: editMasterExpressOpenBalances,
  //ShuttleInquiryReducer
  shuttleInquiryReducer: ShuttleInquiryReducer,

  dealerGroupsReducer: DealerGroupsReducer,
  unitTypeReducer: UnitTypeReducer,
  formsReducer: FormsReducer,
  formTypesReducer: FormTypesReducer,
  customerDealersFilter: CustomerDealerSlice,
  editcustomerDealers: EditCustomerDealerSlice,
  formTypes: FormTypes,
  forms: Forms,
  supplementalRatesReducer: SupplementalRatesReducer,
  customerPlantGroupReducer: CustomerPlantGroupReducer,
  customerPlantGroup: CustomerPlantGroupSlice,
  customerGroupLookupReducer: CustomerGroupLookupReducer,
  customerUnitTypeGroupLookupReducer: CustomerUnitTypeGroupLookupReducer,
  transPortCompanysLookupReducer: TransPortCompanysLookupReducer,
  stateGroupsReducer: StateGroupsReducer,

  dealerConnectionReducer: DealerConnectionsSearchFilterSlice,
  dpuInstructionsReducer: DpuInstructionsReducer,
  deleaseItemsReducer: DeleaseItemsReducer,
  complianceItemsReducer: ComplianceItemsReducer,
  delayedUnitCodesReducer: DelayedUnitCodesReducer,
  deleaseCodeReducer: DeleaseCodeReducer,
  customerDealerRoutes: CustomerDealerRoutesSlice,
  driverCheckinReducer: DriverCheckinReducer,

  driverTerminationLetterReducer: DriverTerminationLetterSlice,

  reservesReducer: ReservesReducer,
  reserveTypeReducer: ReserveTypeReducer,
  companyReducer: CompanyReducer,
  checkPayToLookupReducer: CheckPayToLookupSlice,
  termsLookupReducer: TermsLookupSlice,
  delayResourcesFilter: DelayResourcesSlice,

  portsOfEntryReducer: PortOfEntryReducer,
  customerPlantContactReducer: CustomerPlantContactReducer,
  reserveTypesReducer: ReserveTypesReducer,
  termsReducer: TermsReducer,
  customerPlantEmailReducer: CustomerPlantEmailReducer,
  importBrokersReducer: ImportBrokersReducer,
  customerPlantDelayReducer: CustomerPlantDelayReducer,
  equipmentCheckInOutReducer: EquipmentCheckInOutReducer,
  emailSenderTypes: EmailSenderTypesSlice,
  customerGroups: CustomerGroupsSlice,
  paperworkProcessing: PaperworkProcessing.reducer,
  EmailSenderTypesLookupReducer: EmailSenderTypesLookupSlice,
  emailFormats: EmailFormats,
  emailRecipient: EmailRecipient,
  emailAttachmentReducer: EmailAttachmentReducer,
  exportBrokersReducer: ExportBrokersReducer,
  editExportBrokersReducer: EditExportBrokersSlice,
  stateGroupReducer: StateGroupReducer,
  customerProspectsReducer: CustomerProspectsReducer,
  unitTypeGroupReducer: UnitTypeGroupReducer,
  driverTrucks: DriverTrucksSlice,
  driverTrailers: DriverTrailersSlice,
  reservesLookup: ReservesLookupSlice,
  equipmentLookup: EquipmentLookupSlice,
  customerUnitTypeGroupReducer: CustomerUnitTypeGroupReducer,
  dispatchHoldSearchSliceReducer: DispatchHoldSearchSliceReducer,
  dealerDriverSearchSlice: DealerDriverSearchSlice,
  driverSearchFilter: DriverSearchFilterSlice,
  driverTMRLogsReducer: DriverTMRLogsReducer,
  driverDeleaseRequestsReducer: DriverDeleaseRequestsReducer,
  driverReserveReducer: DriverReserveReducer,
  reservesLookupReducer: ReservesLookupReducer,
  driverGarnishmentsReducer: DriverGarnishmentsReducer,
  driverFlashSlice: DriverFlashSlice,

  driverDispatchHold: DriverDispatchHoldSlice,
  driverAddNotesReducer: DriverAddNotesSlice,
  driverCheckinHistoryReducer: DriverCheckinHistoryReducer,
  DriverComplianceItemsReducer: DriverComplianceItemsSlice,
  driverEquipmentReducer: DriverEquipmentReducer,

  customerDispatchUsers: CustomerDispatchUsersSlice,
  driverReferralsReducer: DriverReferralsReducer,
  customerRatesReducer: CustomerRatesReducer,

  //Operations/Driver Services/ General Tab
  editDriverFileReducer: EditDriverFileSliceReducer,
  driverReportCard: DriverReportCardSlice,
  driverPayHistoryReducer: DriverPayHistorySliceReducer,
  driverPayLogReducer: DriverPayLogSliceReducer,
  delayProcessing: DelayProcessingSlice,
  delayCodeUnitLookupReducer: DelayCodeUnitLookupReducer,
  driverDrugTests: DriverDrugTestsSlice,
  driverBondFundReducer: DriverBondFundReducer,
  loadHistory: LoadHistorySlice,
  driverMaintenanceReducer: DriverMaintenanceReducer,
  postNoCheckinReducer: PostNoCheckinReducer,
  delaybreakdown: BreakdownProcessingSlice,
  undispatchReducer: UndispatchReducer,
  dispatchRestrictionsReducer: DispatchRestrictionsReducer,
  settlementsReducer: SettlementsReducer,
  editMasterExpressInvoiceTabReducer: editMasterExpressInvoiceTabReducer,
  driverDeleaseReducer: DriverDeleaseSlice,
  deleaseCodeLookup: DeleaseCodeLookupSlice,
  editMasterExpressDriverTabReducer: editMasterExpressDriverTabReducer,
  customerOrdersReducer: CustomerOrdersReducer,
  rerouteReducer: RerouteReducer,
  driverLabelsSlice: DriverLabelsSlice,
  debitCardReducer: DebitCardSlice,
  //damageProcessingReducer:DamageProcessingSlic,
  damageCodeLookup: DamageCodeLookupSlice.reducer,
  roadConditionLookup: RoadConditionLookupSlice.reducer,
  roadTypeLookup: RoadTypeCodeLookupSlice.reducer,
  transportCompaniesReducer: TransportCompaniesReducer,

  //Driver DOT Inspection
  driverDOTInspection: DriverDOTInspection.reducer,
  driverTrailerLookupSlice: DriverTrailerLookupSlice.reducer,
  driverTruckLookupSlice: DriverTruckLookupSlice.reducer,

  unitPickupException: UnitPickupExceptionSlice.reducer,
  inventoryStatusFlashReportSlice: InventoryStatusFlashReportSlice.reducer,
  miscInvoiceReducer: MiscInvoiceSlice,
  driverListingReport: DriverListingReportSlice.reducer,
  transportCompaniesReducer: TransportCompaniesReducer,
  checkRejectedLoadReducer: CheckRejectedLoadReducer,
  editInvoiceReducer: EditInvoiceSlice,
  dispatchDocuments: DispatchDocumentSlice,
  permissionsMaintenance: PermissionsMaintenanceSlice.reducer,
  menuLookup: MenuLookupSlice.reducer,
  permissionGroupsReducer: PermissionGroupsReducer,
  invoiceInquiryReducer: InvoiceInquirySlice,
  bulkInvoiceReducer: BulkInvoiceSlice,
  bulkUnitReimbursementReducer: BulkUnitReimbursementSlice,
  creditCardEnquirySlice: CreditCardEnquirySlice.reducer,
  driverInvoiceReducer: DriverInvoiceSlice,
  scanInvoiceReducer: ScanInvoiceSlice,
  dpuInvoice: DPUInvoiceSlice.reducer,
  tollsByPlate: TollsByPlateSlice.reducer,
  editMasterExpressDispatchDriverPayTabSlice: EditMasterExpressDispatchDriverPayTabSlice.reducer,
  creditCardEnquirySlice: CreditCardEnquirySlice.reducer,
  printCheckReducer: PrintCheckReducer,
  purgeDamageReturnUnits: PurgeDamageReturnUnitsSlice,
  printCheckReducer: PrintCheckReducer,
  purgeDamageReturnUnits: PurgeDamageReturnUnitsSlice,
  transportCompaniesReducer: TransportCompaniesReducer,
  unitStatusReducer: UnitStatusReducer,
  UnitStatusSlice: UnitStatusSlice,
  editMasterExpressDispatchDriverPayTabSlice: EditMasterExpressDispatchDriverPayTabSlice.reducer,
  userPermissionGroup: UserPermissionGroupSlice.reducer,
  paymentRequestSlice: PaymentRequestSlice.reducer,
  dispatchesLookupSlice: DispatchesLookupSlice,
  outstandingPaperwork: OutstandingPaperworkSlice.reducer,
  missingPaperwork: MissingPaperworkSlice.reducer,
  delayDamage: DelayDamageSlice.reducer,
  userPermission: UserPermissionSlice.reducer,
  postCheckReducer: PostCheckReducer,
  delayedUnitsPendingEmail: DelayedUnitsPendingEmailSlice,
  bondFundsLog: BondFundsLogSlice.reducer,
  reserveFundsLog: ReserveFundsLogSlice.reducer,
  payDebitcardInvoiceReducer: PayDebitcardInvoiceReducer,
  postPayRequestSlice: PostPayRequestSlice,
  emanifestChangeRequest: EmanifestChangeRequestSlice.reducer,
  simulatorCertificateReducer: SimulatorCertificateSlice,
  certificateUpdateReducer: CertificateUpdateSlice,
  randomTestingReducer: RandomTestingSlice,
  deleaseRequestReducer: DriverDeleaseRequestSlice,
  bulkEmails: BulkEmailSlice.reducer,
  editCheckinReducer: EditCheckinSlice,
  driverMileageLogs: MileageLogSlice,
  delayDamageSafetyReducer: DelayDamageSafetyReducer,
  delayUnitExpenseSlice: DelayUnitExpenseSlice.reducer,

  postToPassportReducer: PostToPassportReducer,
  settlementReducer: SettlementReducer,

  documentTypeLookup: DocumentTypeLookupSlice.reducer,
  breakdownFeesReducer: BreakdownFeesReducer,
  delayCheckRequest: DelayUnitCheckRequestSlice.reducer,

  postToPassportReducer: PostToPassportReducer,
  delayDamage: DelayDamageSlice.reducer,

  documentTypeLookup: DocumentTypeLookupSlice.reducer,
  yardCheckinSecondShuttleReducer: YardCheckinSecondShuttleSlice.reducer,
  reprintBolReducer: ReprintBolSlice,
  newDelayedBrowseSlice: NewDelayedBrowseSlice.reducer,
  complianceItemsLookupReducer: ComplianceItemsLookupSlice,
  releaseReserve: ReleaseReserveSlice,
  unitNumberLookupReducer: UnitNumberLookupSlice,
  claimNumberLookupReducer: ClaimNumberLookupSlice,

  dealerFlatRateConnectionSReducer: DealerFlatRateConnectionSlice.reducer,
  damageReducer: DamageReducer,
  customerPlantReleaseReducer: CustomerPlantReleasesSlice,
  bulkOrderEntry: BulkOrderEntrySlice.reducer,
  driverHoldsReducer: DriverHoldsSlice,
  availableDriversSlice: AvailableDriversSlice,
});

export const resetAllState = () => ({
  type: "RESET_ALL",
});

const rootReducer = (state, action) => {
  if (action.type === "Reset") {
    state.dealerSearchReducer.selectedDealerStatus = undefined;
    state.dealerSearchReducer.selectedStatus = undefined;
    // state.editDealerReducer.dealerData = undefined;
  }

  if (action.type === "RESET_ALL") {
    return combinedReducer({ auth: state?.auth, userAuth: state?.userAuth }, action);
  }

  return combinedReducer(state, action);
};

export const store = configureStore(
  {
    reducer: rootReducer,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
