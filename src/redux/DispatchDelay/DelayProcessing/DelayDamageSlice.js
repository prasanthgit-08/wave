import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageNumber: 0,
  searchTerm: "",
  searchCriteria: "Beginning",
  damageData: [],
  normalSortValue: "",
  normalSortFlag: true,
  changeColor: false,
  id: null,
  totalElements: 0,
  totalPages: 0,
  driverName: "",
  unitNumber: "",
  model: "",
  vin: "",
  unitType: "",
  specialCode: "",
  damageInstructions: "",
  damageTime: "",
  damageCode: "",
  weatherCode: "",
  roadTypeCode: "",
  roadConditionCode: "",
  unitPK: null,
  pickupName: "",
  pickupCity: "",
  pickupState: "",
  deliveryName: "",
  deliveryCity: "",
  deliveryState: "",
  lastLocationName: "",
  lastLocationCity: "",
  lastLocationState: "",
  currentLocationName: "",
  currentLocationAdd1: "",
  currentLocationAdd2: "",
  currentLocationCity: "",
  currentLocationState: "",
  currentLocationPostalCode: "",
  currentLocationPostalCodePK: null,
  emailDamageData: [],
  damageDate: new Date().toISOString(),
  reported: new Date().toISOString(),
  viewOnly: true,

  isEmailClicked: false,
  emailData: [],
  resourceDamageData: [],
  delayedUnitCodeInput: "",
  damagedUnitCodeInput: "",
  weatherUnitCodeInput: "",
  roadConditionCodeInput: "",
  roadTypeCodeInput: "",
  delayedUnitCodeID: "",
  damagedUnitCodeID: "",
  roadConditionUnitCodeID: "",
  roadTypeUnitCodeID: "",
  weatherUnitCodeID: "",
  damagedUnitCodeFK: null,
  weatherUnitCodeFK: null,
  roadTypeUnitCodeFK: null,
  roadConditionFK: null,
  instructionDamageData: [],
  dataDamaged: [],
  damageSaveFlag: false,
  notes: null,
  delayedUnitFK: "",
  delayedUnitCodeFK: "",
  Phone: "",
  contact: "",
  damageInHouseNotes: "",
  damageCustomerNotes: "",
  inYard: false,
  damageYardFK: "",
  atPickup: false,
  atDelivery: false,
  atLastLocation: true,
  damageDealerFK: "",
  damageUnitAddressFK: "",
  damageUnitLocationFK: "",
  emailViewDamageData: [],

  claimsTabData: null,
  viewDetail: true,
  damageAmount: "",
  companyAmount: "",
  salvageAmount: "",
  driverAmount: "",
  insuranceAmount: "",
  responciblePartyAmount: "",
  reserveAmount: "",
  maximumReserveAmount: "",
  accumulatedBond: "",
  totalBond: "",
  showResponsibleParty: false,
  showInsuranceCompany: false,
  responcibleName: "",
  responcibleAddress1: "",
  responcibleState: "",
  insuranceName: "",
  insuranceAddress1: "",
  insuranceState: "",
  generalTabData: null,
  claimNumber: "",
  damageTimePeriod: "",
  reportedDate: "",
  reportDate: "",
  repairDate: "",
  reportedTime: "",
  reportedTimePeriod: "",
  customerDamageContact: "",
  customerDamagePhone: "",
  customerDamageFax: "",
  repaired: false,
  furtherRepairsRequired: false,
  deliveryTerminated: false,
  status: "",
  statusComment: "",
  damageAtPickup: false,
  damageInYard: false,
  damageLocation: "",
  atRepairLocation: false,
  repairLocation: "",
  nameUnder: "",
  workOrderNumber: "",
  commentDamageData: [],
  repairDealerID: null,
  repairPlantID: null,
  repairPlantInput: "",
  repairDealerInput: "",

  damageContact: "",
  damageContactFAX: "",
  emailVO: [],
  damageInstructionsVO: "Inspect the undercarriage before loading.",
  generalVO: null,
  claimsVO: null,
  damageResourceVO: {},
  damageCommentsVO: {},
  name: "",
  email: "",
  sendNotificationEmail: true,
  driverResponsible: false,
  driverReported: false,

  instructionViewDamageData: [],
  /*****
   * Used for Documents View Detail Page
   * ******/
  documentPageNumber: 0,
  documentsData: [],
  documentChangeColor: false,
  documentId: null,
  documentTotalElements: 0,
  docuemntTotalPages: 0,
  driverFK: null,

  disableDamageSave: false,

  generalLoading: false,
  validGeneral: false,
  isClaimTabValid: false,
  delayDamageFiles: {
    uploadFiles: [],
    scanFiles: [],
  },
  firstName: "",
  lastName: "",
  damageCommentsViewDamageData: [],
  documentsTabRedisKeys: [],
};

const DelayDamageSlice = createSlice({
  name: "delayDamage",
  initialState,
  reducers: {
    setDelayedUnitFK: (state, action) => {
      state.delayedUnitFK = action.payload;
    },

    setValidGeneral: (state, action) => {
      state.validGeneral = action.payload;
    },
    setDisableDamageSave: (state, action) => {
      state.disableDamageSave = action.payload;
    },
    setReportDate: (state, action) => {
      state.reportDate = action.payload;
    },
    setDriverResponsible: (state, action) => {
      state.driverResponsible = action.payload;
    },
    setDriverReported: (state, action) => {
      state.driverReported = action.payload;
    },

    setRepairDate: (state, action) => {
      state.repairDate = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDamageResourceVO: (state, action) => {
      state.damageResourceVO = action.payload;
    },

    setDamageContactFAX: (state, action) => {
      state.damageContactFAX = action.payload;
    },
    setDamageInstructions: (state, action) => {
      state.damageInstructions = action.payload;
    },
    setDamageContact: (state, action) => {
      state.damageContact = action.payload;
    },
    setEmailVO: (state, action) => {
      state.emailVO = action.payload;
    },
    setDamageCommentsVO: (state, action) => {
      state.damageCommentsVO = action.payload;
    },
    setSendNotificationEmail: (state, action) => {
      state.sendNotificationEmail = action.payload;
    },

    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setGeneralTabData: (state, action) => {
      state.generalTabData = action.payload;
    },
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    setDamageInHouseNotes: (state, action) => {
      state.damageInHouseNotes = action.payload;
    },
    setDamageCustomerNotes: (state, action) => {
      state.damageCustomerNotes = action.payload;
    },
    setResourceDamageData: (state, action) => {
      state.resourceDamageData = action.payload;
    },
    setDamageInstructionsVO: (state, action) => {
      state.damageInstructionsVO = action.payload;
    },

    setInYard: (state, action) => {
      state.inYard = action.payload;
    },
    setDamageYardFK: (state, action) => {
      state.damageYardFK = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setInstructionViewDamageData: (state, action) => {
      state.instructionViewDamageData = action.payload;
    },

    setEmailViewDamageData: (state, action) => {
      state.emailViewDamageData = action.payload;
    },

    setCommentDamageData: (state, action) => {
      state.commentDamageData = action.payload;
    },
    setAtPickup: (state, action) => {
      state.atPickup = action.payload;
    },
    setAtDelivery: (state, action) => {
      state.atDelivery = action.payload;
    },
    setAtLastLocation: (state, action) => {
      state.atLastLocation = action.payload;
    },
    setDamageDealerFK: (state, action) => {
      state.damageDealerFK = action.payload;
    },
    setDamageUnitAddressFK: (state, action) => {
      state.damageUnitAddressFK = action.payload;
    },
    setDamageUnitLocationFK: (state, action) => {
      state.damageUnitLocationFK = action.payload;
    },

    setUnitPK: (state, action) => {
      state.unitPK = action.payload;
    },
    setDataDamaged: (state, action) => {
      state.dataDamaged = action.payload;
    },
    setDamageSaveFlag: (state, action) => {
      state.damageSaveFlag = action.payload;
    },

    setInstructionDamageData: (state, action) => {
      state.instructionDamageData = action.payload;
    },
    setIsEmailClicked: (state, action) => {
      state.isEmailClicked = action.payload;
    },

    setWeatherUnitCodeFK: (state, action) => {
      state.weatherUnitCodeFK = action.payload;
    },
    setRoadTypeUnitCodeFK: (state, action) => {
      state.roadTypeUnitCodeFK = action.payload;
    },

    setRoadConditionFK: (state, action) => {
      state.roadConditionFK = action.payload;
    },

    setEmailData: (state, action) => {
      state.emailData = action.payload;
    },
    setViewOnly: (state, action) => {
      state.viewOnly = action.payload;
    },
    setDamageDate: (state, action) => {
      state.damageDate = action.payload;
    },
    setReported: (state, action) => {
      state.reported = action.payload;
    },
    setDamagedUnitCodeFK: (state, action) => {
      state.damagedUnitCodeFK = action.payload;
    },

    setEmailDamageData: (state, action) => {
      state.emailDamageData = action.payload;
    },
    setCurrentLocationName: (state, action) => {
      state.currentLocationName = action.payload;
    },

    setCurrentLocationAdd1: (state, action) => {
      state.currentLocationAdd1 = action.payload;
    },

    setCurrentLocationAdd2: (state, action) => {
      state.currentLocationAdd2 = action.payload;
    },
    setCurrentLocationCity: (state, action) => {
      state.currentLocationCity = action.payload;
    },

    setCurrentLocationState: (state, action) => {
      state.currentLocationState = action.payload;
    },
    setCurrentLocationPostalCode: (state, action) => {
      state.currentLocationPostalCode = action.payload;
    },
    setCurrentLocationPostalCodePK: (state, action) => {
      state.currentLocationPostalCodePK = action.payload;
    },
    setLastLocationName: (state, action) => {
      state.lastLocationName = action.payload;
    },

    setLastLocationCity: (state, action) => {
      state.lastLocationCity = action.payload;
    },

    setLastLocationState: (state, action) => {
      state.lastLocationState = action.payload;
    },
    setDeliveryName: (state, action) => {
      state.deliveryName = action.payload;
    },

    setDeliveryCity: (state, action) => {
      state.deliveryCity = action.payload;
    },

    setDeliveryState: (state, action) => {
      state.deliveryState = action.payload;
    },
    setDriverName: (state, action) => {
      state.driverName = action.payload;
    },
    setPickupName: (state, action) => {
      state.pickupName = action.payload;
    },

    setPickupCity: (state, action) => {
      state.pickupCity = action.payload;
    },

    setPickupState: (state, action) => {
      state.pickupState = action.payload;
    },
    setRoadConditionCode: (state, action) => {
      state.roadConditionCode = action.payload;
    },
    setRoadTypeCode: (state, action) => {
      state.roadTypeCode = action.payload;
    },
    setDamageCode: (state, action) => {
      state.damageCode = action.payload;
    },
    setWeatherCode: (state, action) => {
      state.weatherCode = action.payload;
    },

    setDamageTime: (state, action) => {
      state.damageTime = action.payload;
    },

    setSpecialCode: (state, action) => {
      state.specialCode = action.payload;
    },
    setUnitType: (state, action) => {
      state.unitType = action.payload;
    },
    setVin: (state, action) => {
      state.vin = action.payload;
    },
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setUnitNumber: (state, action) => {
      state.unitNumber = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchCriteria: (state, action) => {
      state.searchCriteria = action.payload;
    },
    setDamageData: (state, action) => {
      state.damageData = action.payload;
    },
    setNormalSortValue: (state, action) => {
      state.normalSortValue = action.payload;
    },
    setNormalSortFlag: (state, action) => {
      state.normalSortFlag = action.payload;
    },
    setChangeColor: (state, action) => {
      state.changeColor = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setDelayedUnitCodeInput: (state, action) => {
      state.delayedUnitCodeInput = action.payload;
    },
    setDamagedUnitCodeInput: (state, action) => {
      state.damagedUnitCodeInput = action.payload;
    },
    setWeatherUnitCodeInput: (state, action) => {
      state.weatherUnitCodeInput = action.payload;
    },
    setRoadConditionCodeInput: (state, action) => {
      state.roadConditionCodeInput = action.payload;
    },
    setRoadTypeCodeInput: (state, action) => {
      state.roadTypeCodeInput = action.payload;
    },
    setDelayedUnitCodeID: (state, action) => {
      state.delayedUnitCodeID = action.payload;
    },
    setDamagedUnitCodeID: (state, action) => {
      state.damagedUnitCodeID = action.payload;
    },

    setWeatherUnitCodeID: (state, action) => {
      state.weatherUnitCodeID = action.payload;
    },
    setRoadTypeUnitCodeID: (state, action) => {
      state.roadTypeUnitCodeID = action.payload;
    },
    setRoadConditionUnitCodeID: (state, action) => {
      state.roadConditionUnitCodeID = action.payload;
    },
    setClaimsTabData: (state, action) => {
      state.claimsTabData = action.payload;
    },
    setViewDetail: (state, action) => {
      state.viewDetail = action.payload;
    },
    setDamageAmount: (state, action) => {
      state.damageAmount = action.payload;
    },
    setCompanyAmount: (state, action) => {
      state.companyAmount = action.payload;
    },
    setSalvageAmount: (state, action) => {
      state.salvageAmount = action.payload;
    },
    setDriverAmount: (state, action) => {
      state.driverAmount = action.payload;
    },
    setInsuranceAmount: (state, action) => {
      state.insuranceAmount = action.payload;
    },
    setResponciblePartyAmount: (state, action) => {
      state.responciblePartyAmount = action.payload;
    },
    setReserveAmount: (state, action) => {
      state.reserveAmount = action.payload;
    },
    setMaximumReserveAmount: (state, action) => {
      state.maximumReserveAmount = action.payload;
    },
    setAccumulatedBond: (state, action) => {
      state.accumulatedBond = action.payload;
    },
    setTotalBond: (state, action) => {
      state.totalBond = action.payload;
    },
    setClaimsVO: (state, action) => {
      state.claimsVO = action.payload;
    },
    setGeneralVO: (state, action) => {
      state.generalVO = action.payload;
    },

    setShowResponsibleParty: (state, action) => {
      state.showResponsibleParty = action.payload;
    },
    setshowInsuranceCompany: (state, action) => {
      state.showInsuranceCompany = action.payload;
    },
    setResponcibleName: (state, action) => {
      state.responcibleName = action.payload;
    },
    setResponcibleAddress1: (state, action) => {
      state.responcibleAddress1 = action.payload;
    },
    setResponcibleState: (state, action) => {
      state.responcibleState = action.payload;
    },
    setInsuranceName: (state, action) => {
      state.insuranceName = action.payload;
    },
    setInsuranceAddress1: (state, action) => {
      state.insuranceAddress1 = action.payload;
    },
    setInsuranceState: (state, action) => {
      state.insuranceState = action.payload;
    },
    setIsClaimTabValid: (state, action) => {
      state.isClaimTabValid = action.payload;
    },
    setDelayDamageFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in delayDamageFiles
      const keyMapping = {
        uploadFiles: "uploadFiles",
        scanFiles: "scanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.delayDamageFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.delayDamageFiles = initialState.delayDamageFiles;
      }
    },
    setClaimNumber: (state, action) => {
      state.claimNumber = action.payload;
    },
    setDamageTimePeriod: (state, action) => {
      state.damageTimePeriod = action.payload;
    },
    setReportedDate: (state, action) => {
      state.reportedDate = action.payload;
    },
    setReportedTime: (state, action) => {
      state.reportedTime = action.payload;
    },
    setReportedTimePeriod: (state, action) => {
      state.reportedTimePeriod = action.payload;
    },
    setCustomerDamageContact: (state, action) => {
      state.customerDamageContact = action.payload;
    },
    setCustomerDamagePhone: (state, action) => {
      state.customerDamagePhone = action.payload;
    },
    setCustomerDamageFax: (state, action) => {
      state.customerDamageFax = action.payload;
    },
    setRepaired: (state, action) => {
      state.repaired = action.payload;
    },
    setRepairDate: (state, action) => {
      state.repairDate = action.payload;
    },
    setFurtherRepairsRequired: (state, action) => {
      state.furtherRepairsRequired = action.payload;
    },
    setDeliveryTerminated: (state, action) => {
      state.deliveryTerminated = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setStatusComment: (state, action) => {
      state.statusComment = action.payload;
    },
    setDamageAtPickup: (state, action) => {
      state.damageAtPickup = action.payload;
    },
    setDamageInYard: (state, action) => {
      state.damageInYard = action.payload;
    },
    setDamageLocation: (state, action) => {
      state.damageLocation = action.payload;
    },
    setAtRepairLocation: (state, action) => {
      state.atRepairLocation = action.payload;
    },
    setRepairLocation: (state, action) => {
      state.repairLocation = action.payload;
    },
    setRepairDealerID: (state, action) => {
      state.repairDealerID = action.payload;
    },
    setRepairDealerInput: (state, action) => {
      state.repairDealerInput = action.payload;
    },
    setRepairPlantInput: (state, action) => {
      state.repairPlantInput = action.payload;
    },
    setRepairPlantID: (state, action) => {
      state.repairPlantID = action.payload;
    },
    setNameUnder: (state, action) => {
      state.nameUnder = action.payload;
    },
    setWorkOrderNumber: (state, action) => {
      state.workOrderNumber = action.payload;
    },
    setDocumentPageNumber: (state, action) => {
      state.documentPageNumber = action.payload;
    },
    setDocumentsData: (state, action) => {
      state.documentsData = action.payload;
    },
    setDocumentChangeColor: (state, action) => {
      state.documentChangeColor = action.payload;
    },
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
    setDocumentTotalElements: (state, action) => {
      state.documentTotalElements = action.payload;
    },
    setDocuemntTotalPages: (state, action) => {
      state.docuemntTotalPages = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setDamageCommentsViewDamageData: (state, action) => {
      state.damageCommentsViewDamageData = action.payload;
    },
    setDocumentsTabRedisKeys: (state, action) => {
      const { actionType, payload } = action.payload;

      if (actionType === "update") {
        state.documentsTabRedisKeys = [...state.documentsTabRedisKeys, ...payload];
      }

      if (actionType === "clear") {
        state.documentsTabRedisKeys = [];
      }
    },
    setGeneralLoading: (state, action) => {
      state.generalLoading = action.payload;
    },
  },
});

export const {
  setDelayedUnitFK,
  setDisableDamageSave,
  setValidGeneral,
  setNotes,
  setPhone,
  setResourceDamageData,
  setContact,
  setDamageInHouseNotes,
  setDamageCustomerNotes,
  setInYard,
  setDamageYardFK,
  setAtPickup,
  setAtDelivery,
  setAtLastLocation,
  setDamageDealerFK,
  setDamageUnitAddressFK,
  setDamageUnitLocationFK,
  setUnitPK,
  setInstructionDamageData,
  setViewOnly,
  setIsEmailClicked,
  setEmailData,
  setEmailDamageData,
  setDataDamaged,
  setVin,
  setUnitType,
  setRoadTypeCode,
  setWeatherCode,
  setRoadConditionCode,
  setModel,
  setUnitNumber,
  setDriverName,
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setDamageData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setId,
  setDriverFK,
  setTotalElements,
  setTotalPages,
  setSpecialCode,
  setDamageDate,
  setDamageTime,
  setDamageCode,
  setPickupName,
  setPickupCity,
  setPickupState,
  setDeliveryName,
  setDeliveryCity,
  setDeliveryState,
  setLastLocationName,
  setLastLocationCity,
  setLastLocationState,
  setCurrentLocationName,
  setCurrentLocationAdd1,
  setCurrentLocationAdd2,
  setCurrentLocationCity,
  setCurrentLocationState,
  setDelayedUnitCodeInput,
  setWeatherUnitCodeInput,
  setEmailViewDamageData,
  setDelayedUnitCodeID,
  setWeatherUnitCodeID,
  setWeatherUnitCodeFK,
  setRoadTypeUnitCodeFK,
  setRoadConditionFK,
  setRoadConditionCodeInput,
  setRoadTypeCodeInput,
  setRoadTypeUnitCodeID,
  setRoadConditionUnitCodeID,
  setDamagedUnitCodeFK,
  setDamagedUnitCodeInput,
  setDamagedUnitCodeID,
  setClaimsTabData,
  setViewDetail,
  setDamageAmount,
  setCompanyAmount,
  setSalvageAmount,
  setDriverAmount,
  setInsuranceAmount,
  setResponciblePartyAmount,
  setReserveAmount,
  setMaximumReserveAmount,
  setAccumulatedBond,
  setTotalBond,
  setReported,
  setClaimsVO,
  setShowResponsibleParty,
  setshowInsuranceCompany,
  setResponcibleName,
  setResponcibleAddress1,
  setResponcibleState,
  setInsuranceName,
  setInsuranceAddress1,
  setInsuranceState,
  setDelayDamageFiles,
  setDamageSaveFlag,
  setClaimNumber,
  setDamageTimePeriod,
  setReportedDate,
  setReportedTime,
  setReportedTimePeriod,
  setCustomerDamageContact,
  setCustomerDamagePhone,
  setCustomerDamageFax,
  setRepaired,
  setRepairDate,
  setFurtherRepairsRequired,
  setDeliveryTerminated,
  setStatus,
  setStatusComment,
  setDamageAtPickup,
  setDamageInYard,
  setDamageLocation,
  setAtRepairLocation,
  setRepairLocation,
  setSendNotificationEmail,
  setNameUnder,
  setWorkOrderNumber,
  setGeneralTabData,
  setCurrentLocationPostalCode,
  setCurrentLocationPostalCodePK,
  setIsClaimTabValid,
  setCommentDamageData,
  setRepairDealerID,
  setRepairDealerInput,
  setRepairPlantID,
  setRepairPlantInput,
  setInstructionViewDamageData,
  setDocumentId,
  setDocuemntTotalPages,
  setDocumentChangeColor,
  setDocumentsData,
  setDocumentPageNumber,
  setDocumentTotalElements,
  setLastName,
  setFirstName,
  setGeneralVO,
  setDamageContact,
  setDamageContactFAX,
  setEmailVO,
  setDamageCommentsViewDamageData,
  setDocumentsTabRedisKeys,
  setDamageInstructions,
  setDamageInstructionsVO,
  setDamageResourceVO,
  setDamageCommentsVO,
  setName,
  setEmail,
  setReportDate,
  setDriverResponsible,
  setDriverReported,
  setGeneralLoading,
} = DelayDamageSlice.actions;

export default DelayDamageSlice;
