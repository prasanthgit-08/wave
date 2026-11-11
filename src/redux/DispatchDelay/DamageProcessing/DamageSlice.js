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
  //for new damage
  unitConfirmationData: null,
  newGenerlTabValid: true,
  resourceList: [],
  notes: "",
  resourcePageNumber: 0,
  resourceTotalPages: 0,
  resourceTotalElements: 0,
  resourceChangeColor: false,
  resourceNormalSortValue: null,
  resourceNormalSortFlag: false,
  newEmailList: [],
  emailSortValue: null,
  emailSortFlag: false,
  emailName: "",
  email: "",
  editMode: false,
  selectedIndex: null,
  checkEmailExist: false,
  addFlag: false,
  emailPK: null,
  emailListData: [],
  newEmailTabValid: true,
  saveFormData: null,
  breakdownFlag: false,
  generalLoading: false,
  // View Damage
  viewDamageActiveTab: "general",
  viewDamageEmailListingData: [],
  viewDamageEmailPageNumber: 0,
  viewDamageEmailTotalPages: 0,
  viewDamageEmailTotalElements: 0,
  viewDamageResourcesListingData: [],
  viewDamageResourcesPageNumber: 0,
  viewDamageResourcesTotalPages: 0,
  viewDamageResourcesTotalElements: 0,
  documentPageNumber: 0,
  documentsData: [],
  documentTotalElements: 0,
  docuemntTotalPages: 0,
  delayDamageDocumentFiles: {
    uploadFiles: [],
    scanFiles: [],
  },
  documentsTabRedisKeys: [],
  editGenerlTabValid: true,
  editDocumentTabValid: true,
  editClaimTabValid: true,

  damageDetailFlag: false,
  //claims tab edit
  claimsTabData: null,
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
  editSaveFormData: null,
  claimLoading: false,
  editEmailList: [],
  editEmailName: "",
  editEmail: "",
  editView: false,
  editSelectedIndex: null,
  editCheckEmailExist: false,
  editAddFlag: false,
  editEmailPK: null,
  editmailListData: [],
  editEmailTabValid: true,
  loginUserName: "",
  driverFK: null,
  repairPlantFlag: "",
  // claimsVO: [],
  claimsVO: null,
  isResponcibleClear: false,
  isInsuranceClear: false,
  damageBrowseloading: true,
};

const DamageSlice = createSlice({
  name: "DamageSlice",
  initialState,
  reducers: {
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
    resetDamageBrowsePage: (state, action) => {
      state.searchTerm = "";
      state.selectedSearchCriteria = "Beginning";
      state.pageNumber = 0;
      state.normalSortFlag = false;
      state.normalSortValue = null;
      state.changeColor = false;
      state.id = null;
    },

    setUnitConfirmationData: (state, action) => {
      state.unitConfirmationData = action.payload;
    },
    setNewGenerlTabValid: (state, action) => {
      state.newGenerlTabValid = action.payload;
    },
    setResourcePageNumber: (state, action) => {
      state.resourcePageNumber = action.payload;
    },
    setResourceTotalPages: (state, action) => {
      state.resourceTotalPages = action.payload;
    },
    setResourceTotalElements: (state, action) => {
      state.resourceTotalElements = action.payload;
    },
    setResourceList: (state, action) => {
      state.resourceList = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setResourceNormalSortValue: (state, action) => {
      state.resourceNormalSortValue = action.payload;
    },
    setResourceNormalSortFlag: (state, action) => {
      state.resourceNormalSortFlag = action.payload;
    },

    setResourceChangeColor: (state, action) => {
      state.resourceChangeColor = action.payload;
    },
    setNewEmailList: (state, action) => {
      state.newEmailList = action.payload;
    },
    setEmailSortFlag: (state, action) => {
      state.emailSortFlag = action.payload;
    },
    setEmailSortValue: (state, action) => {
      state.emailSortValue = action.payload;
    },
    setEmailName: (state, action) => {
      state.emailName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setCheckEmailExist: (state, action) => {
      state.checkEmailExist = action.payload;
    },
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setAddFlag: (state, action) => {
      state.addFlag = action.payload;
    },
    setEmailPK: (state, action) => {
      state.emailPK = action.payload;
    },
    setEmailDeleteList: (state, action) => {
      state.emailDeleteList = action.payload;
    },
    setEmailListData: (state, action) => {
      state.emailListData = action.payload;
    },
    setNewEmailTabValid: (state, action) => {
      state.newEmailTabValid = action.payload;
    },
    setBreakdownFlag: (state, action) => {
      state.breakdownFlag = action.payload;
    },
    setGeneralLoading: (state, action) => {
      state.generalLoading = action.payload;
    },
    setEditGenerlTabValid: (state, action) => {
      state.editGenerlTabValid = action.payload;
    },
    resetEmailChanges: (state, action) => {
      state.emailPK = null;
      state.emailName = "";
      state.email = "";
      state.checkEmailExist = false;
      state.emailSortValue = null;
      state.emailSortFlag = false;
    },
    resetResourceList: (state, action) => {
      state.resourceNormalSortFlag = false;
      state.resourceNormalSortValue = null;
      state.resourcePageNumber = 0;
      state.resourceTotalElements = 0;
      state.resourceTotalPages = 0;
    },
    setSaveFormData: (state, action) => {
      let payload = action.payload;
      state.saveFormData = { ...state.saveFormData, ...payload };
    },
    setViewDamageActiveTab: (state, action) => {
      state.viewDamageActiveTab = action.payload;
    },
    setViewDamageEmailListingData: (state, action) => {
      state.viewDamageEmailListingData = action.payload;
    },
    setViewDamageEmailPageNumber: (state, action) => {
      state.viewDamageEmailPageNumber = action.payload;
    },
    setViewDamageEmailTotalPages: (state, action) => {
      state.viewDamageEmailTotalPages = action.payload;
    },
    setViewDamageEmailTotalElements: (state, action) => {
      state.viewDamageEmailTotalElements = action.payload;
    },
    setViewDamageResourcesListingData: (state, action) => {
      state.viewDamageResourcesListingData = action.payload;
    },
    setViewDamageResourcesPageNumber: (state, action) => {
      state.viewDamageResourcesPageNumber = action.payload;
    },
    setViewDamageResourcesTotalPages: (state, action) => {
      state.viewDamageResourcesTotalPages = action.payload;
    },
    setViewDamageResourcesTotalElements: (state, action) => {
      state.viewDamageResourcesTotalElements = action.payload;
    },
    setDocumentPageNumber: (state, action) => {
      state.documentPageNumber = action.payload;
    },
    setDocumentsData: (state, action) => {
      state.documentsData = action.payload;
    },
    setDocumentTotalElements: (state, action) => {
      state.documentTotalElements = action.payload;
    },
    setDocuemntTotalPages: (state, action) => {
      state.docuemntTotalPages = action.payload;
    },
    setDamageDetailFlag: (state, action) => {
      state.damageDetailFlag = action.payload;
    },
    setDelayDamageDocumentFiles: (state, action) => {
      const { actionType, payload } = action.payload;

      // Define mapping for actionType to corresponding key in delayDamageDocumentFiles
      const keyMapping = {
        uploadFiles: "uploadFiles",
        scanFiles: "scanFiles",
      };

      // Get the correct key from the mapping
      const targetKey = keyMapping[actionType];

      if (targetKey) {
        state.delayDamageDocumentFiles[targetKey] = payload;
      }

      if (actionType === "clear") {
        state.delayDamageDocumentFiles = initialState.delayDamageDocumentFiles;
      }
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
    setEditDocumentTabValid: (state, action) => {
      state.editDocumentTabValid = action.payload;
    },
    //cliam tab
    setClaimsTabData: (state, action) => {
      state.claimsTabData = action.payload;
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
    setEditClaimtabValid: (state, action) => {
      state.editClaimTabValid = action.payload;
    },
    setRepairPlantFlag: (state, action) => {
      state.repairPlantFlag = action.payload;
    },
    setEditSaveFormData: (state, action) => {
      let payload = action.payload;
      state.editSaveFormData = { ...state.editSaveFormData, ...payload };
    },
    setClaimsVO: (state, action) => {
      let payload = action.payload;
      state.claimsVO = { ...state.claimsVO, ...payload };
    },
    setClaimLoading: (state, action) => {
      state.claimLoading = action.payload;
    },
    setEditEmailList: (state, action) => {
      state.editEmailList = action.payload;
    },

    setEditEmailName: (state, action) => {
      state.editEmailName = action.payload;
    },
    setEditEmail: (state, action) => {
      state.editEmail = action.payload;
    },
    setEditCheckEmailExist: (state, action) => {
      state.editCheckEmailExist = action.payload;
    },
    setCheckEmailExist: (state, action) => {
      state.checkEmailExist = action.payload;
    },
    setEditView: (state, action) => {
      state.editView = action.payload;
    },
    setEditAddFlag: (state, action) => {
      state.editAddFlag = action.payload;
    },
    setEditEmailPK: (state, action) => {
      state.editEmailPK = action.payload;
    },
    setEditEmailDeleteList: (state, action) => {
      state.editEmailDeleteList = action.payload;
    },
    setEditmailListData: (state, action) => {
      state.editmailListData = action.payload;
    },
    setEditEmailTabValid: (state, action) => {
      state.editEmailTabValid = action.payload;
    },
    resetEditEmailChanges: (state, action) => {
      state.editEmailPK = null;
      state.editEmailName = "";
      state.editEmail = "";
      state.editCheckEmailExist = false;
    },
    setLoginUserName: (state, action) => {
      state.loginUserName = action.payload;
    },
    setEditSelectedIndex: (state, action) => {
      state.editSelectedIndex = action.payload;
    },
    setDriverFK: (state, action) => {
      state.driverFK = action.payload;
    },
    resetGeneralChanges: (state, action) => {
      state.driverFK = null;
    },
    setIsResponcibleClear: (state, action) => {
      state.isResponcibleClear = action.payload;
    },
    setIsInsuranceClear: (state, action) => {
      state.isInsuranceClear = action.payload;
    },
    setDamageBrowseLoading: (state, action) => {
      state.damageBrowseloading = action.payload;
    },
    resetClaimChanges: (state, action) => {
      state.claimsTabData = null;
      state.damageAmount = "";
      state.driverAmount = "";
      state.companyAmount = "";
      state.salvageAmount = "";
      state.insuranceAmount = "";
      state.reserveAmount = "";
      state.responciblePartyAmount = "";
      state.maximumReserveAmount = "";
      state.accumulatedBond = "";
      state.totalBond = "";
      state.responcibleName = "";
      state.responcibleAddress1 = "";
      state.responcibleState = "";
      state.insuranceName = "";
      state.insuranceAddress1 = "";
      state.insuranceState = "";
      state.isResponcibleClear = false;
      state.isInsuranceClear = false;
    },
  },
});

export const {
  setPageNumber,
  setSearchTerm,
  setSearchCriteria,
  setDamageData,
  setNormalSortValue,
  setNormalSortFlag,
  setChangeColor,
  setId,
  setTotalElements,
  setTotalPages,
  resetDamageBrowsePage,
  setUnitConfirmationData,
  setNewGenerlTabValid,
  setResourceChangeColor,
  setResourceNormalSortFlag,
  setResourceTotalElements,
  setResourceTotalPages,
  setResourcePageNumber,
  setResourceList,
  setNotes,
  setResourceNormalSortValue,
  setNewEmailList,
  setEmailSortFlag,
  setEmailSortValue,
  setEmailName,
  setEmail,
  setAddFlag,
  setEditMode,
  setCheckEmailExist,
  setSelectedIndex,
  setEmailPK,
  resetEmailChanges,
  setEmailDeleteList,
  setEmailListData,
  setNewEmailTabValid,
  setSaveFormData,
  resetResourceList,
  setViewDamageActiveTab,
  setViewDamageEmailListingData,
  setViewDamageEmailPageNumber,
  setViewDamageEmailTotalPages,
  setViewDamageEmailTotalElements,
  setViewDamageResourcesListingData,
  setViewDamageResourcesPageNumber,
  setViewDamageResourcesTotalPages,
  setViewDamageResourcesTotalElements,
  setDocumentPageNumber,
  setDocumentsData,
  setDocumentTotalElements,
  setDocuemntTotalPages,
  setDelayDamageDocumentFiles,
  setDocumentsTabRedisKeys,
  setEditDocumentTabValid,
  setEditGenerlTabValid,
  setGeneralLoading,
  setDamageDetailFlag,
  setClaimsTabData,
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
  setEditClaimtabValid,
  setRepairPlantFlag,
  setEditSaveFormData,
  setClaimLoading,
  setEditEmailList,
  setEditEmailName,
  setEditEmail,
  setEditView,
  setEditSelectedIndex,
  setEditCheckEmailExist,
  setEditAddFlag,
  setEditEmailPK,
  setEditEmailDeleteList,
  setEditmailListData,
  setEditEmailTabValid,
  resetEditEmailChanges,
  setLoginUserName,
  resetClaimChanges,
  resetGeneralChanges,
  setDriverFK,
  setIsResponcibleClear,
  setIsInsuranceClear,
  setDamageBrowseLoading,
} = DamageSlice.actions;
export default DamageSlice.reducer;
