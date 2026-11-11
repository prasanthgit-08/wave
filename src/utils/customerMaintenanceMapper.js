// Fields the screens read as booleans (the legacy response returns real booleans, the new one returns "1"/"0").
const BOOLEAN_FIELDS = new Set([
  "active", "canadian", "sisterCompany", "miscellaneousCustomer", "allowMiscellaneousDealers", "allDealersFOD",
  "requirePO", "requireBankClient", "usePlants", "longUnitRestriction", "dpuCustomer", "quickPayCustomer",
  "freezePOE", "requireFactoryRelease", "forceRestrictedDispatch", "outBound", "campfireCrew",
  "requireCustomerPlate", "overrideDealerWashInstructions", "payCommissionToDriver", "emailBOLAtOrderEntry",
  "emailBOLAtDispatch", "emailBOLAddSignature", "batchEmailBOLAtOrderEntry", "batchEmailBOLDaily",
  "faxBOLAtOrderEntry", "emailBOLAtInvoice", "faxBOLAtDispatch", "requireModel", "requireModelCode",
  "requireVIN", "requireFullVIN", "requireSerialNumber", "requireStockNumber", "requirePDI",
  "requirePDIMotorizedOutbound", "requirePDIMotorizedReload", "requirePDITowableOutbound",
  "requirePDITowableReload", "invoiceDiscount", "paymentDiscount", "creditHold", "billAlternateCustomer",
  "alternateCustomerFreightOnly", "preinvoiceUnits", "invoiceTolls", "driverTolls", "invoiceTollsFlatrate",
  "driverTollsFlatrate", "driverFODTolls", "askTolls", "invoicePermits", "driverPermits",
  "invoicePermitsFlatrate", "driverPermitsFlatrate", "driverFODPermits", "askPermits", "invoiceWash",
  "driverWash", "invoiceWashFlatrate", "driverWashFlatrate", "askWash", "saveTollsAndPermits", "faxCODCheck",
  "codCheckReceipt", "receivesStatement", "holdStatementInvoice", "emailStatementInvoice",
  "mailStatementInvoice", "invoiceBreakdownSeperately", "invoiceBreakdownImmediately",
  "allowInvoiceEmailedToPlant", "invoiceAsCND", "singleInvoiceMultiUnit", "allowReturnRates", "eldFee",
  "selectAttemptedPickupCustomer", "adjustAttemptedPickup", "openBulkInvoices", "bulkUnitInvoices",
  "mailInvoice", "printInvoiceLabel", "batchEmailInvoice", "noInvoiceDetail", "requireOriginalDocuments",
  "emailInvoiceAsTIFF", "emailPaperworkWithInvoice", "singleInvoiceFile", "invoiceScanDAFSeperate",
  "invoiceEmailDAFSeperate", "batchEmailDAF", "invoiceFAXDAF", "invoiceScanBOLSeperate",
  "invoiceEmailBOLSeperate", "batchEmailBOL", "invoiceFAXBOL", "printAndRescanDocuments",
  "invoiceStorageUnits", "invoiceStorageOnDelivery", "invoiceStorageOnDPUPickup", "forgiveStorageOnDelivery",
  "invoiceStorageSeperate", "invoiceStartAndRunFee", "faxDelayUpdates", "faxbreakdownUpdates",
  "faxDamageUpdates", "readOnly", "hasCustomerGroups", "hasCustomerPlants", "addPlantUnitNumberPrefix",
  "invoiceTracking", "includeStatementInvoices", "includeStatementPaperwork", "flatrateStorage",
]);

// Fields the screens read as numbers; any *FK / *PK / *ID field is treated the same way.
const NUMBER_FIELDS = new Set([
  "longUnitRestrictionUnits", "longUnitRateUnits", "longUnitRate", "commissionFlat", "commissionMilage",
  "commissionPercentage", "reloadDays", "deliverByDays", "invoiceDueDays", "invoiceDiscountPercent",
  "paymentDiscountPercent", "paymentDiscountDays", "exchangeRate", "maximumNameLength", "minimumNameLength",
  "invoiceELDAmount", "driverELDAmount", "insuranceFlatRate", "insuranceRate", "invoiceDowntimeRate",
  "driverDowntimeRate", "invoiceBreakdownFee", "driverBreakdownFee", "invoicePercentage",
  "invoicePercentageTransportCompany", "invoiceUSSurcharge", "driverUSSurcharge", "invoiceCanadianSurcharge",
  "driverCanadianSurcharge", "invoiceAttemptedPickup", "driverAttemptedPickup", "storage1stPeriod",
  "storageAmount1stPeriod", "storagePeriod", "storageAmountPeriod", "startAndRunPeriod",
  "startAndRunAmountPeriod", "industryProjection", "januaryProjection", "februaryProjection",
  "marchProjection", "aprilProjection", "mayProjection", "juneProjection", "julyProjection",
  "augustProjection", "septemberProjection", "octoberProjection", "novemberProjection", "decemberProjection",
  "totalUnits", "ytdunits", "estimatedUnits", "maximumLengthFlatbed", "maximumLengthHaulAndTow",
  "storageAmountFlatrate", "ordersUntilCommission",
]);

const ID_SUFFIX = /(FK|PK|Id|ID)$/;

const isPlainObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

const coerce = (key, value) => {
  if (value === null || value === undefined) return null;
  if (BOOLEAN_FIELDS.has(key)) {
    if (typeof value === "boolean") return value;
    const str = String(value).trim().toLowerCase();
    return str === "1" || str === "true";
  }
  if (NUMBER_FIELDS.has(key) || ID_SUFFIX.test(key)) {
    if (typeof value === "number") return value;
    const str = String(value).trim();
    return str !== "" && !Number.isNaN(Number(str)) ? Number(str) : value;
  }
  return value;
};

const flatten = (node, target) => {
  Object.entries(node).forEach(([key, value]) => {
    if (isPlainObject(value)) flatten(value, target);
    else target[key] = coerce(key, value);
  });
  return target;
};

/**
 * Converts the response of POST /customermaintenance/fetch (tab sections nested, every value a string)
 * into the flat, typed shape the maintenance screens already read from `editCustomerData`.
 */
export const mapCustomerMaintenanceResponse = (response) => {
  if (!isPlainObject(response)) return null;
  return flatten(response, {});
};
