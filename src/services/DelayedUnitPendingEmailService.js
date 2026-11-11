import { axios } from "../config/axiosInterceptors";

import React from "react";
import {
  DelayedUnitPendingEmail_Base_URL,
  HalfScreen_RecordsPerPage,
} from "./constants/applicationConstants";

class DelayedUnitPendingEmailService {
  getDelayedUnitPendingEmailRecords(
    searchCriteria,
    searchTerm,
    pageNumber,
    sortValue,
    sortType,
    selectionType,
    delayedUnitPendingEmailPK,
    searchStatus,
    type,
    operationFlag,
    emailBody
  ) {
    return axios.post(DelayedUnitPendingEmail_Base_URL + "/selection", {
      pageNumber: pageNumber,
      pageSize: HalfScreen_RecordsPerPage,
      searchCriteria: searchCriteria,
      searchTerms: searchTerm,
      sortType: sortType,
      sortValue: sortValue,
      selectionType: selectionType,
      delayedUnitPendingEmailPK: delayedUnitPendingEmailPK,
      searchStatus: searchStatus,
      type: type,
      operationFlag: operationFlag,
      emailBody: emailBody,
    });
  }
}

export default new DelayedUnitPendingEmailService();
