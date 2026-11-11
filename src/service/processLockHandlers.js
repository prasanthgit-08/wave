import UnitActivationService from "../services/UnitActivationService";
import CommonLockServices from "./commonLock/commonLock.service";
import { getCurrentCompany } from "../utils/utils";

export const releaseUnitActivationLock = async ({ sessionId, processName }) => {
  try {
    if (!sessionId) return;

    const response = await UnitActivationService.lockReleaseUnitActivation({
      sessionId,
      processName,
    });

    if (response?.status === 200) {
      localStorage.removeItem("sessionId");
    }
  } catch (error) {
    console.error("Release lock failed", error);
  }
};

export const addOrEditDealerMaintenanceLocks = async ({ processName, fieldName, lockType, eventName }) => {
  try {
    const company = getCurrentCompany();
    const dealerPK = localStorage.getItem("recordKey");
    const sessionId = localStorage.getItem("sessionId");

    const response = await CommonLockServices.addOrEditDealerMaintenanceLock({
      lockType: lockType || "ViewLock",
      tableName: "Dealers",
      recordKey: Number(dealerPK) || 0,
      fieldName: "DealerPK",
      processName: processName,
      ttlSeconds: 15,
      eventName: eventName || "View",
      companyName: company.name,
      notRequiredLock: 0,
      driverPK: null,
    });

    if (response?.status === 200) {
      localStorage.setItem("sessionId", response.data.sessionId);
    }
    return response;
  } catch (error) {
    console.error("Release lock failed", error);
  }
};
