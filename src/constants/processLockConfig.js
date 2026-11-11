import CommonLockServices from "../service/commonLock/commonLock.service";
import { addOrEditDealerMaintenanceLocks, releaseUnitActivationLock } from "../service/processLockHandlers";
import UnitActivationService from "../services/UnitActivationService";

export const lockScreens = {
  UNIT_ACTIVATION: "UNITACTIVATION",
  DEALER_MAINTENANCE: "DEALERMAINTENANCE",
  EDIT_MASTER: "EDITMASTER",
  CUSTOMER_PLANTS: "CUSTOMERPLANTS",
};

export const processConfigs = {
  [lockScreens.UNIT_ACTIVATION]: {
    processName: lockScreens.UNIT_ACTIVATION,
    startRoute: null,

    routes: [
      "/unit-activation-single-selection",
      "/unit-activation-multi-unit-browse",
      "/unit-activation-shuttle-delay",
      "/unit-activation-multi-unit-sister-browse",
      "/unit-activation-multi-unit-hold",
      "/unit-activation-single-soft-post",
    ],

    enter: () => {
      console.log("enterin  lock api api call added");
    }, // locking api call
    onExit: releaseUnitActivationLock,
  },
  [lockScreens.DEALER_MAINTENANCE]: {
    processName: lockScreens.DEALER_MAINTENANCE,
    startRoute: "/add-dealer/",
    exitUrl: "/dealers",
    eventName: "MAINTENANCE",
    lockType: "", // when pass empty string it will use to cancel the lock
    fieldName: "DealerPK",
    tableName: "Dealers",

    routes: ["/add-dealer", "/dealer-contacts", "/dealer-email-maintenance", "/add-dealer-email-maintenance"],

    enter: addOrEditDealerMaintenanceLocks, // locking api call
    onExit: CommonLockServices.commonLockRelease,
  },

  [lockScreens.EDIT_MASTER]: {
    processName: lockScreens.EDIT_MASTER,
    fieldName: "UnitPK",
    tableName: "Units",

    routes: ["/edit-master-express-edit-page"],

    onExit: CommonLockServices.commonLockRelease,
  },

  [lockScreens.CUSTOMER_PLANTS]: {
    processName: lockScreens.CUSTOMER_PLANTS,
    startRoute: "/add-customer-plant",

    fieldName: "CustomerPlantPK",
    tableName: "CustomerPlants",
    lockType: "ViewLock",
    exitUrl: "/customer-plant-browse-page",

    routes: [
      "/add-customer-plant",
      "/customer-plant-contacts",
      "/customer-plant-emails",
      "/customer-plant-delay-resources",
    ],

    enter: CommonLockServices.addOrEditMaintenanceLock,
    onExit: CommonLockServices.commonLockRelease,
  },
};
