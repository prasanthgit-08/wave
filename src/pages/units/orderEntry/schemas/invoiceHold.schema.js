import { z } from "zod";
const baseInvoiceHoldSchema = z.object({
  invoiceHold: z.boolean().optional(),
  invoiceHoldNotes: z.string().optional(),
});
export const invoiceHoldInitailState = {
  invoiceHold: false,
  invoiceHoldNotes: "",
};

export function buildInvoiceHoldSchema({ invoiceHolds }) {
  let schema = baseInvoiceHoldSchema;

  if (!invoiceHolds) return schema;

  if (invoiceHolds.invoiceHold) {
    schema = schema.safeExtend({
      invoiceHoldNotes: z.string().nonempty("Error"),
    });
  }

  return schema;
}
