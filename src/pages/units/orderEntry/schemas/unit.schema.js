import { z } from "zod";
const baseUnitSchema = z.object({
  unitTypeFK: z.number().nullable().optional(),
  unitTypeName: z.string().optional(),
  unitNumber: z.string().optional(),
  model: z.string().optional(),
  modelCode: z.string().optional(),
  vin: z.string().optional(),
  serialNumber: z.string().optional(),
  stockNumber: z.string().optional(),
  gas: z.string().optional(),
  specialCodeFK: z.number().nullable().optional(),
  specialCodeName: z.string().optional(),
  pickupDealerFK: z.number().nullable().optional(),
  pickupDealerName: z.string().optional(),
  deliveryDealerFK: z.number().nullable().optional(),
  deliveryDealerName: z.string().optional(),
  collectForCustomer: z.string().optional(),
  poNumber: z.string().optional(),
  authorizedBy: z.string().optional(),
  projectCode: z.string().optional(),
  plantOrderNumber: z.string().optional(),
  bank: z.string().optional(),
  client: z.string().optional(),
  gvwr: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined || val === "") return true; // allow empty
        return Number(val) > 0; // must be greater than 0
      },
      {
        message: "GVWR cannot be 0",
      }
    ),
  shippingWeight: z.string().optional(),
  maximumTolls: z.string().optional(),
  maximumPermits: z.string().optional(),
  invoicePortEscortFee: z.string().optional(),
  invoiceMiles: z.string().or(z.number()).optional(),
  driverMiles: z.string().or(z.number()).optional(),
  invoiceFlatRate: z.number().or(z.string()).optional(),
  invoiceFlatRateVisible: z.boolean().optional(),
  driverFlatRate: z.number().or(z.string()).optional(),
  driverFlatRateVisible: z.boolean().optional(),
  commission: z.string().or(z.number()).optional(),
  commissionVisible: z.boolean().optional(),
  brokerFK: z.number().nullable().optional(),
  brokerName: z.string().optional(),
  brokerType: z.string().optional(),
  poeFK: z.number().nullable().optional(),
  poeName: z.string().optional(),
  cdlaRequired: z.boolean().optional(),
  tankerRequired: z.boolean().optional(),
  TWICRequired: z.boolean().optional(),
  ifta: z.boolean().optional(),
  hasDrivebys: z.boolean().optional(),
  dealerPickup: z.boolean().optional(),
  storage: z.boolean().optional(),
  unitOnHold: z.boolean().optional(),
  noInvoice: z.boolean().optional(),
  plantRelease: z.boolean().optional(),
  multiUnit: z.boolean().optional(),
  miscellaneousBOLText: z.array(z.string()).or(z.any()).optional(),
  customerDPUPickupsVO: z.string().nullable().optional(),
  invoiceELDFee: z.string().or(z.number()).optional(),
  driverELDFee: z.string().or(z.number()).optional(),
  doNotDispatch: z.boolean().optional(),
  activateDispatch: z.boolean().optional(),
  unitsPerDispatchUnit: z.number().or(z.string()).optional(),
  unitMultiLoadPK: z.number().nullable().optional(),
  unitMultiLoadName: z.string().optional(),
  twoAsThree: z.boolean().optional(),
  requireFlatbed: z.boolean().optional(),
  deliveryDelayContact: z.boolean().optional(),
  invoiceFODBreakdownToDealer: z.boolean().optional(),
  freezePOE: z.boolean().optional(),
  orderDate: z.string().optional(),
  orderDateValid: z.boolean().optional(),
  dispatchReleaseDate: z.string().optional(),
  dispatchReleaseDateValid: z.boolean().optional(),
  deliverByDate: z.string().optional(),
  deliverByDateValid: z.boolean().optional(),
  minimumPickupDate: z.string().optional(),
  minimumPickupDateValid: z.boolean().optional(),
  maximumPickupDate: z.string().optional(),
  maximumPickupDateValid: z.boolean().optional(),
  minimumDeliveryDate: z.string().optional(),
  minimumDeliveryDateValid: z.boolean().optional(),
  maximumDeliveryDate: z.string().optional(),
  maximumDeliveryDateValid: z.boolean().optional(),

  miscellaneousPickup: z.boolean().optional(),
  miscellaneousDelivery: z.boolean().optional(),
});
export const unitInitailState = {
  unitTypeFK: null,
  unitTypeName: "",
  unitNumber: "",
  model: "",
  modelCode: "",
  vin: "",
  serialNumber: "",
  stockNumber: "",
  gas: "enginena",
  specialCodeFK: null,
  specialCodeName: "",
  pickupDealerFK: null,
  pickupDealerName: "",
  deliveryDealerFK: null,
  deliveryDealerName: "",
  collectForCustomer: "",
  poNumber: "",
  authorizedBy: "",
  projectCode: "",
  plantOrderNumber: "",
  bank: "",
  client: "",
  gvwr: "",
  shippingWeight: "",
  maximumTolls: "",
  maximumPermits: "",
  invoicePortEscortFee: "",
  invoiceMiles: 0,
  driverMiles: 0,
  invoiceFlatRate: 0,
  driverFlatRate: 0,
  commission: 0,
  commissionVisible: false,
  brokerFK: null,
  brokerName: "",
  brokerType: "default",
  poeFK: null,
  poeName: "",
  cdlaRequired: false,
  tankerRequired: false,
  TWICRequired: false,
  ifta: false,
  hasDrivebys: false,
  dealerPickup: false,
  storage: false,
  unitOnHold: false,
  noInvoice: false,
  plantRelease: false,
  multiUnit: false,
  miscellaneousBOLText: Array(7).fill(""),
  customerDPUPickupsVO: null,
  invoiceELDFee: "",
  driverELDFee: "",
  doNotDispatch: false,
  activateDispatch: false,
  unitsPerDispatchUnit: 2,
  unitMultiLoadPK: null,
  unitMultiLoadName: "",
  twoAsThree: false,
  requireFlatbed: false,
  deliveryDelayContact: false,
  invoiceFODBreakdownToDealer: false,
  freezePOE: false,
  orderDate: `${new Date()}`,
  orderDateValid: false,
  dispatchReleaseDate: "",
  dispatchReleaseDateValid: false,
  deliverByDate: "",
  deliverByDateValid: false,
  minimumPickupDate: "",
  minimumPickupDateValid: false,
  maximumPickupDate: "",
  maximumPickupDateValid: false,
  minimumDeliveryDate: "",
  minimumDeliveryDateValid: false,
  maximumDeliveryDate: "",
  maximumDeliveryDateValid: false,

  miscellaneousPickup: false,
  miscellaneousDelivery: false,
};

export function buildUnitSchema({
  unit,
  customer,
  customerTabValid,
  invoiceFlatRateRequired,
  allowedPercentage,
  driverFlatRateRequired,
  unitNumberValidity,
}) {
  let schema = baseUnitSchema;
  if (!unit || customerTabValid) return schema;
  if (!customerTabValid) {
    schema = schema.safeExtend({
      unitTypeFK: z.number().gt(0),
      unitTypeName: z.string().nonempty(),
      orderDateValid: z.boolean().refine((val) => val, { message: "Error" }),
      dispatchReleaseDateValid: z.boolean().refine((val) => val, { message: "Error" }),
      deliverByDateValid: z.boolean().refine((val) => val, { message: "Error" }),
      minimumPickupDateValid: z.boolean().refine((val) => val, { message: "Error" }),
      maximumPickupDateValid: z.boolean().refine((val) => val, { message: "Error" }),
      minimumDeliveryDateValid: z.boolean().refine((val) => val, { message: "Error" }),
      maximumDeliveryDateValid: z.boolean().refine((val) => val, { message: "Error" }),

      invoiceMiles: z
        .string()
        .refine((val) => val !== "" && Number(val) > 0, { message: "Invoice miles must be greater than 0" }),
      driverMiles: z
        .string()
        .refine((val) => val !== "" && Number(val) > 0, { message: "Driver miles must be greater than 0" }),
    });
  }

  if (unit.unitTypeFK) {
    schema = schema.safeExtend({
      unitNumber: z
        .string()
        .min(5)
        .superRefine((val, ctx) => {
          if (!unitNumberValidity) return;

          const { errorCode, overrideFlag, validityMessage } = unitNumberValidity;

          // errorCode === 1 → API says invalid
          if (errorCode === 1 && !overrideFlag) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: validityMessage || "Invalid unit number",
            });
          }
        }),

      collectForCustomer: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true; // allow empty
            if (Number(val) <= 0) return false;
            return /^\d+(\.\d{1,2})?$/.test(val); // number + 0-2 decimals
          },
          { message: "Must be a number with up to 2 decimal places" }
        ),
    });
  }
  if (customer.requireModel) {
    schema = schema.safeExtend({
      model: z.string().nonempty(),
    });
  }
  if (customer.requireModelCode) {
    schema = schema.safeExtend({
      modelCode: z.string().nonempty(),
    });
  }
  if (customer.requireVIN) {
    schema = schema.safeExtend({
      vin: z.string().nonempty(),
    });
  }
  if (customer.requireSerialNumber) {
    schema = schema.safeExtend({
      serialNumber: z.string().nonempty(),
    });
  }

  if (customer.requireStockNumber) {
    schema = schema.safeExtend({
      stockNumber: z.string().nonempty(),
    });
  }
  if (!customer?.pickupAtPlant && !unit.miscellaneousPickup) {
    schema = schema.safeExtend({
      pickupDealerFK: z.number().gt(0),
      pickupDealerName: z.string().nonempty(),
    });
  }
  if (!customer?.deliverToPlant && !unit.miscellaneousDelivery) {
    schema = schema.safeExtend({
      deliveryDealerFK: z.number().gt(0),
      deliveryDealerName: z.string().nonempty(),
    });
  }

  if (customer?.requirePO) {
    schema = schema.safeExtend({
      poNumber: z.string().nonempty(),
    });
  }
  if (customer?.requireBankClient) {
    schema = schema.safeExtend({
      bank: z.string().nonempty(),
      client: z.string().nonempty(),
    });
  }

  const decimalRegex = /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/;

  const optionalDecimalSchema = z
    .union([z.string(), z.number()])
    .optional()
    .refine(
      (val) => {
        // allow empty / undefined
        if (val === undefined || val === null || val === "") return true;

        // allow 0 or "0"
        if (Number(val) === 0) return true;

        // validate decimal format
        return decimalRegex.test(String(val));
      },
      {
        message: "Enter a valid decimal number (max 5 digits and 2 decimals)",
      }
    );

  if (unit?.selectedUnitType?.requiresELD && customer.eldFee) {
    schema = schema.safeExtend({
      driverELDFee: optionalDecimalSchema,
      invoiceELDFee: optionalDecimalSchema,
    });
  }

  if (unit.multiUnit) {
    schema = schema.safeExtend({
      unitMultiLoadName: z.string().refine((val) => {
        if (val == "") return false;
        if (val == "Add New Record") return true;
        if (unit.unitMultiLoadPK > 0) return true;
        return false;
      }),
      unitsPerDispatchUnit: z.string().refine(
        (val) => {
          if (val === "") return false;
          const num = Number(val);
          return num >= 2 && num <= 10;
        },
        {
          message: "Units per dispatch must be between 2 and 10",
        }
      ),
    });
  }

  if (customer?.askTolls) {
    schema = schema.safeExtend({
      maximumTolls: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true; // allow empty
            return /^\d+(\.\d{1,2})?$/.test(val); // number + 0-2 decimals
          },
          { message: "Must be a number with up to 2 decimal places" }
        ),
    });
  }
  if (customer?.askPermits) {
    schema = schema.safeExtend({
      maximumPermits: z
        .string()
        .optional()
        .refine(
          (val) => {
            if (!val) return true; // allow empty
            return /^\d+(\.\d{1,2})?$/.test(val); // number + 0-2 decimals
          },
          { message: "Must be a number with up to 2 decimal places" }
        ),
    });
  }
  if (unit.multiUnit || !customer.batchLoads) {
    schema = schema.safeExtend({
      unitsPerDispatchUnit: z
        .string()
        .or(z.number())
        .refine((val) => {
          if (val === "") return false;
          const num = Number(val);
          return num >= 2 && num <= 10;
        }),
    });
  }
  if (unit.brokerType !== "default") {
    schema = schema.safeExtend({
      brokerFK: z.number().gt(0),
      brokerName: z.string().nonempty(),
      poeFK: z.number().gt(0),
      poeName: z.string().nonempty(),
    });
  }
  if (unit.invoiceFlatRateVisible || unit.miscellaneousPickup || unit.miscellaneousDelivery) {
    schema = schema.safeExtend({
      invoiceFlatRate: z.union([z.string(), z.number()]).superRefine((val, ctx) => {
        const value = Number(val);

        // 1️ Allowed percentage exceeded
        if (allowedPercentage) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Unit Percentage exceeds Allowed percentage",
          });
          return;
        }

        // 2 Required but <= 0
        if (invoiceFlatRateRequired && value <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invoice flat rate is required",
          });
          return;
        }

        // 3 Invalid decimal format
        if (value > 0 && !/^\d+(\.\d{1,2})?$/.test(String(val))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be a number with up to 2 decimal places",
          });
        }
      }),
    });
  }

  if (unit.driverFlatRateVisible || unit.miscellaneousPickup || unit.miscellaneousDelivery) {
    schema = schema.safeExtend({
      driverFlatRate: z.union([z.string(), z.number()]).superRefine((val, ctx) => {
        const value = Number(val);

        // 1️ Allowed percentage exceeded
        if (allowedPercentage) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Unit Percentage exceeds Allowed percentage",
          });
          return;
        }

        // 2️ Required but <= 0
        if (driverFlatRateRequired && value <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Driver flat rate is required",
          });
          return;
        }

        // 3️ Invalid decimal format
        if (value > 0 && !/^\d+(\.\d{1,2})?$/.test(String(val))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be a number with up to 2 decimal places",
          });
        }
      }),
    });
  }
  return schema;
}
