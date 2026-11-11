import z from "zod";
import { buildCustomerSchema, customerInitialState } from "./customer.schema";
import { buildNotesSchema, notesInitailState } from "./notes.schema";
import { buildInvoiceHoldSchema, invoiceHoldInitailState } from "./invoiceHold.schema";
import { buildMiscPickupSchema, miscPickupInitailState } from "./miscPickup.schema";
import { buildOnHoldSchema, onHoldInitailState } from "./onHold.schema";
import { buildUnitSchema, unitInitailState } from "./unit.schema";
import { buildMiscCustomerSchema, miscCustomerInitialState } from "./miscCustomer.schema";
import { buildMiscDeliverySchema, miscDeliveryInitailState } from "./miscDelivery.schema";
import { buildOverWidthSchema, overWidthInitialState } from "./overWidth.schema";
import { buildContactsSchema, contactsInitailState } from "./contacts.schema";
import { buildOpenBalancesSchema, openBalancesInitialState } from "./openBalances.schema";
import { buildCreditCardSchema, creditCardInitailState } from "./creditCard.schema";
import { buildDriveBysSchema, driveBysInitailState } from "./driveBys.schema";

export function buildOrderEntrySchema(obj) {
  return z.object({
    customer: buildCustomerSchema(obj),
    unit: buildUnitSchema(obj),
    miscCustomer: buildMiscCustomerSchema(obj),
    notes: buildNotesSchema(obj),
    invoiceHolds: buildInvoiceHoldSchema(obj),
    miscPickup: buildMiscPickupSchema(obj),
    onHold: buildOnHoldSchema(obj),
    miscDelivery: buildMiscDeliverySchema(obj),
    contacts: buildContactsSchema(),
    openBalances: buildOpenBalancesSchema(obj),
    overWidth: buildOverWidthSchema(obj),
    creditCard: buildCreditCardSchema(),
    driveBys: buildDriveBysSchema(),
  });
}

export const resetTabsDatas = (reset) => {
  reset({
    customer: customerInitialState,
    miscCustomer: miscCustomerInitialState,
    unit: unitInitailState,
    notes: notesInitailState,
    invoiceHolds: invoiceHoldInitailState,
    miscPickup: miscPickupInitailState,
    onHold: onHoldInitailState,
    miscDelivery: miscDeliveryInitailState,
    overWidth: overWidthInitialState,
    openBalances: openBalancesInitialState,
    contacts: contactsInitailState,
    creditCard: creditCardInitailState,
    driveBys: driveBysInitailState,
  });
};
