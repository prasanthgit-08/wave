import { faL } from "@fortawesome/free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attachmentsPage: false,
  pageNumber: 0,
  process: "New",
  who: "Driver",
  division: "All",
  status: "Active",
  which: "Customer",
  hasAttachments: false,
  showAttachments: false,
  pastAttachmets: false,
  nextPage: false,
  finalSeletionPage: false,
  lastDispatch: null,
  deleaseDate: null,
  birthDay: null,
  lastOrderDate: null,
  lastDispatchValid: false,
  deleaseDateValid: false,
  birthDayValid: false,
  lastOrderDateValid: false,
  generalManager: false,
  salesManager: false,
  serviceManager: false,
  orderContact: false,
  dispatchContact: false,
  deliveryContact: false,
  dispatcher: false,
  dispatchDelayContacts: false,
  breakdownContacts: false,
  damageContacts: false,
  shuttleDelayContacts: false,
  lotPointContacts: false,
  lotSupervisor: false,
  listingData: [],
  totalPages: 0,
  totalElements: 0,
  selectedId: null,
  subject: "",
  body: "",
  uploadList: [],
  recipientFile: null,
  userPK: null,
  dispatcherFK: null,
  dispatcherInput: "",
};
const BulkEmailSlice = createSlice({
  name: "BulkEmailSlice",
  initialState: initialState,
  reducers: {
    updateField: (state, { payload }) => {
      const { field, value } = payload;
      if (field in state) {
        state[field] = value;
      }
    },
    resetFields: (state) => {
      Object.assign(state, initialState);
    },
    updateMultipleFields: (state, action) => {
      const fieldsToUpdate = action.payload;
      Object.entries(fieldsToUpdate).forEach(([field, value]) => {
        if (field in state) {
          state[field] = value;
        }
      });
    },
    setPageNumber: (state, { payload }) => {
      state.pageNumber = payload;
    },
    addFiles: (state, action) => {
      state.uploadList.push(...action.payload);
    },
    removeFile: (state, action) => {
      state.uploadList = state.uploadList.filter((file) => file.name !== action.payload);
    },
    setRecipientFile: (state, action) => {
      state.recipientFile = action.payload; // Store file details as an object
    },
    removeRecipientFile: (state) => {
      state.recipientFile = null;
    },
    resetDefaults: (state) => {
      state.attachmentsPage = false;
      state.pageNumber = 0;
      state.division = "All";
      state.status = "Active";
      state.which = "Customer";
      state.showAttachments = false;
      state.pastAttachmets = false;
      state.nextPage = false;
      state.finalSeletionPage = false;
      state.lastDispatch = null;
      state.deleaseDate = null;
      state.birthDay = null;
      state.lastOrderDate = null;
      state.lastDispatchValid = false;
      state.deleaseDateValid = false;
      state.birthDayValid = false;
      state.lastOrderDateValid = false;
      state.generalManager = false;
      state.salesManager = false;
      state.serviceManager = false;
      state.orderContact = false;
      state.dispatchContact = false;
      state.deliveryContact = false;
      state.dispatcher = false;
      state.dispatchDelayContacts = false;
      state.breakdownContacts = false;
      state.damageContacts = false;
      state.shuttleDelayContacts = false;
      state.lotPointContacts = false;
      state.lotSupervisor = false;
      state.listingData = [];
      state.totalPages = 0;
      state.totalElements = 0;
      state.selectedId = null;
      state.subject = "";
      state.body = "";
      state.uploadList = [];
      state.recipientFile = null;
      state.userPK = null;
      state.dispatcherFK = null;
      state.dispatcherInput = "";
    },
  },
});

export const {
  updateField,
  resetDefaults,
  updateMultipleFields,
  resetFields,
  setPageNumber,
  addFiles,
  removeFile,
  setRecipientFile,
  removeRecipientFile,
} = BulkEmailSlice.actions;

export default BulkEmailSlice;
