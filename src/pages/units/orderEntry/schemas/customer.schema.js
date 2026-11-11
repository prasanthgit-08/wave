import { z } from "zod";

const baseCustomerSchema = z.object({
  customerDataId: z.number().gt(0), // selected autocomplete customer id
  customerDataName: z.string().nonempty(), // selected autocomplete customer name
  customerPlantName: z.string().optional(),
  customerPlantId: z.number().nullable().optional(),
  pickupAtPlant: z.boolean(),
  pickupCustomerPlantFK: z.number().nullable().optional(),
  pickupCustomerPlantName: z.string().optional(),
  shuttleToYard: z.boolean(),
  pickupYardFK: z.number().nullable().optional(),
  pickupYardName: z.string().optional(),
  pickupShuttleCityFK: z.number().nullable().optional(),
  pickupShuttleCityName: z.string().optional(),
  noPickupPulloutFee: z.boolean(),
  deliverToPlant: z.boolean(),
  deliveryCustomerPlantFK: z.number().nullable().optional(),
  deliveryCustomerPlantName: z.string().optional(),

  deliveryYardFK: z.number().nullable().optional(),
  deliveryYardName: z.string().optional(),

  shuttleFromYard: z.boolean(),
  noDeliveryFee: z.boolean(),
  deliveryShuttleCityFK: z.number().nullable().optional(),
  deliveryShuttleCityName: z.string().optional(),
  noDeliveryPulloutFee: z.boolean(),

  reload: z.boolean(),
  returnRates: z.boolean(),
  printBOL: z.boolean(),
  batchLoads: z.boolean(),
  firstBatchSequence: z.string().optional(),
  lastBatchSequence: z.string().optional(),
  plantCode: z.string().optional(),
  creditCardPrepaid: z.boolean(),
  checkPrepaid: z.boolean(),
  openBalancePrepaid: z.boolean(),
  bulkUnit: z.boolean().optional(),
  bulkInvoiceFK: z.number().nullable().optional(),
  bulkInvoiceName: z.string().optional(),

  duplicateLoads: z.boolean(),
  isBatchLoadValid: z.boolean(),
  hasPrinter: z.boolean().optional(),
  bolPrinterFk: z.number().nullable(),
  fodInvoice: z.boolean().optional(),
});

export const customerInitialState = {
  customerDataId: null,
  customerDataName: "",
  customerPlantName: "",
  customerPlantId: null,
  pickupAtPlant: false,
  pickupCustomerPlantFK: null,
  pickupCustomerPlantName: "",
  shuttleToYard: false,
  pickupYardFK: null,
  pickupYardName: "",
  pickupShuttleCityFK: null,
  pickupShuttleCityName: "",
  noPickupPulloutFee: false,
  deliverToPlant: false,
  deliveryCustomerPlantFK: null,
  deliveryCustomerPlantName: "",

  deliveryYardFK: null,
  deliveryYardName: "",
  deliveryShuttleCityFK: null,
  deliveryShuttleCityName: "",
  noDeliveryPulloutFee: false,

  shuttleFromYard: false,
  noDeliveryFee: false,

  reload: false,
  returnRates: false,
  printBOL: false,
  batchLoads: false,
  firstBatchSequence: "",
  lastBatchSequence: "",
  plantCode: "",
  creditCardPrepaid: false,
  checkPrepaid: false,
  openBalancePrepaid: false,
  bulkUnit: false,
  bulkInvoiceFK: null,
  bulkInvoiceName: "",

  duplicateLoads: false,
  isBatchLoadValid: false,
  hasprinter: false,
  bolPrinterFk: null,
  fodInvoice: false,
};

export function buildCustomerSchema({ customer }) {
  let schema = baseCustomerSchema;
  if (!customer) return schema;
  if (customer?.usePlants) {
    schema = schema.safeExtend({
      customerPlantName: z.string().nonempty("Error"),
      customerPlantId: z.number().gt(0),
    });
  }

  if (customer?.pickupAtPlant) {
    schema = schema.safeExtend({
      pickupCustomerPlantFK: z.number().gt(0),
      pickupCustomerPlantName: z.string().nonempty(),
    });
  }

  if (customer?.pickupAtPlant && customer.shuttleToYard) {
    if (customer.selectedCustomerPickupPlant?.yardFK || customer.selectedCustomerPickupPlant?.selectYard) {
      schema = schema.safeExtend({
        pickupYardFK: z.number().gt(0),
        pickupYardName: z.string().nonempty(),
      });
    }
  }
  if (
    customer?.pickupAtPlant &&
    customer.shuttleToYard &&
    customer?.selectedCustomerPickupPlant?.yardFK &&
    (customer?.selectedCustomerPickupPlant?.selectShuttleCity ||
      customer?.selectedCustomerPickupPlant?.shuttleCityFK)
  ) {
    schema = schema.safeExtend({
      pickupShuttleCityFK: z.number().gt(0),
      pickupShuttleCityName: z.string().nonempty(),
    });
  }
  if (customer.deliverToPlant) {
    schema = schema.safeExtend({
      deliveryCustomerPlantFK: z.number().gt(0),
      deliveryCustomerPlantName: z.string().nonempty(),
    });
    if (
      customer.customerDataId &&
      customer.shuttleFromYard &&
      customer.deliverToPlant &&
      (customer?.selectedDeliveryPlant?.yardFK || customer?.selectedDeliveryPlant?.selectYard)
    ) {
      schema = schema.safeExtend({
        deliveryYardFK: z.number().gt(0),
        deliveryYardName: z.string().nonempty(),
      });
    }
    if (
      customer.customerDataId &&
      customer.shuttleFromYard &&
      customer.deliverToPlant &&
      (customer?.selectedDeliveryPlant?.shuttleCityFK || customer?.selectedDeliveryPlant?.selectShuttleCity)
    ) {
      schema = schema.safeExtend({
        deliveryShuttleCityFK: z.number().gt(0),
        deliveryShuttleCityName: z.string().nonempty(),
      });
    }
  }

  if (customer.batchLoads) {
    schema = schema
      .safeExtend({
        firstBatchSequence: z.string().nonempty("First batch sequence is required"),
        lastBatchSequence: z.string().nonempty("Last batch sequence is required"),
        isBatchLoadValid: z.boolean(),
      })
      .superRefine((data, ctx) => {
        const { firstBatchSequence, lastBatchSequence, isBatchLoadValid } = data;

        // batch validation flag must be true
        if (!isBatchLoadValid) {
          ctx.addIssue({
            path: ["firstBatchSequence"],
            message: "Invalid batch load sequence",
          });

          ctx.addIssue({
            path: ["lastBatchSequence"],
            code: z.ZodIssueCode.custom,
            message: "Invalid batch load sequence",
          });
        }
        // length must match
        if (firstBatchSequence.length !== lastBatchSequence.length) {
          ctx.addIssue({
            path: ["lastBatchSequence"],
            message: "First and last batch sequence must have the same length",
          });
        }
      });
  }

  if (
    (customer.bulkInvoices === "A" || customer.bulkInvoices === "Y") &&
    !customer.openBulkInvoices &&
    customer.bulkUnit
  ) {
    schema = schema.safeExtend({
      bulkInvoiceFK: z.number().gt(0),
      bulkInvoiceName: z.string().nonempty(),
    });
  }

  return schema;
}
