import { axios } from "../../config/axiosInterceptors";
import { BackEnd_Base_URL, Company_Base_URL } from "../../constants/backendUrl.constant";
import { getCurrentCompany } from "../../utils/utils";

class CommonLockService {
  async addOrEditDealerMaintenanceLock({
    lockType = "ViewLock",
    tableName = "",
    recordKey = 0,
    fieldName = "",
    processName = "",
    ttlSeconds = 15,
    eventName = "View",
    companyName = "",
    notRequiredLock = 0,
    driverPK = null,
  }) {
    try {
      const res = await axios.post(`${BackEnd_Base_URL}commonLock/acquireMaintenanceLock`, {
        lockType,
        tableName,
        recordKey,
        fieldName,
        processName,
        ttlSeconds,
        eventName,
        companyName: companyName || getCurrentCompany()?.name,
        notRequiredLock,
        driverPK,
      });
      return res;
    } catch (error) {
      console.error("Error locking maintenance:", error);
      throw error;
    }
  }

  async addOrEditMaintenanceLock({
    lockType = "ViewLock",
    tableName = "",
    recordKey = 0,
    fieldName = "",
    processName = "",
    ttlSeconds = 15,
    eventName = "View",
    companyName = "",
    notRequiredLock = 0,
    driverPK = null,
  }) {
    try {
      const res = await axios.post(`${BackEnd_Base_URL}commonLock/acquireMaintenanceLock`, {
        lockType,
        tableName,
        recordKey,
        fieldName,
        processName,
        ttlSeconds,
        eventName,
        companyName: companyName || getCurrentCompany()?.name,
        notRequiredLock,
        driverPK,
      });
      return res;
    } catch (error) {
      console.error("Error locking maintenance:", error);
      throw error;
    }
  }

  async commonLockRelease({
    channel = "Web",
    sessionId = null,
    driverPK = null,
    lockType = "ProcessLock",
    processName = null,
    eventName = "Release",
    releaseFlag = "N",
    notRequiredLock = 0,
    tableName = "",
    recordKey = 0,
    fieldName = "",
    reason = "",
  }) {
    try {
      const res = await axios.post(`${BackEnd_Base_URL}commonLock/acquireReleaseLock`, {
        channel,
        sessionId,
        driverPK,
        lockType,
        processName,
        eventName,
        releaseFlag,
        notRequiredLock,
        tableName,
        recordKey,
        fieldName,
        reason,
      });
      if (res?.status === 200 && lockType !== "CancelEdit") {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("recordKey");
      }
      return res;
    } catch (error) {
      console.error("Error locking Release:", error);
      throw error;
    }
  }

  async commonAddLock({
    channel = "Web",
    companyName = "",
    driverPK = null,
    eventName = "View",
    fieldName = "",
    lockType = "",
    notRequiredLock = 0,
    processName = "",
    recordKey = 0,
    sessionId = null,
    tableName = "",
    ttlSeconds = 15,
    userId = null,
    unitNumber = null,
  }) {
    try {
      const userData = localStorage.getItem("loggedInUserData");
      const user = JSON.parse(userData);
      const res = await axios.post(`${BackEnd_Base_URL}commonLock/acquireCommonLock`, {
        channel,
        companyName: companyName || getCurrentCompany()?.name,
        driverPK,
        eventName,
        fieldName,
        lockType,
        notRequiredLock,
        processName,
        recordKey,
        sessionId,
        tableName,
        ttlSeconds,
        unitNumber,
        userId: userId || user?.userPK,
      });
      return res;
    } catch (error) {
      console.error("Error Add locking :", error);
      throw error;
    }
  }
}
const CommonLockServices = new CommonLockService();

export default CommonLockServices;
