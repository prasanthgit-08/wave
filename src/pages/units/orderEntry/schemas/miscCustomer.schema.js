import { z } from "zod";

const baseMiscCustomerSchema = z.object({
  name: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  stateCode: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().optional(),
  contact: z.string().optional(),
  quickPayTerms: z.string().optional(),
  postalCodePK: z.number().optional(),
});

export const miscCustomerInitialState = {
  name: "",
  address1: "",
  address2: "",
  city: "",
  stateCode: "",
  postalCode: "",
  zip: "",
  phone: "",
  fax: "",
  email: "",
  contact: "",
  quickPayTerms: "",
  postalCodePK: 0,
};

export function buildMiscCustomerSchema({ miscCustomer, customer, customerTabValid }) {
  let schema = baseMiscCustomerSchema;

  const miscellaneousCustomer = customer?.miscellaneousCustomer ?? null;
  const quickPayCustomer = customer?.quickPayCustomer ?? null;
  // if no conditions provided, return base schema
  if (!miscCustomer || customerTabValid) return schema;

  if (customer?.miscellaneousCustomer) {
    schema = schema.safeExtend({
      name: z.string().nonempty("Error"),
      address1: z.string().nonempty("Error"),
      phone: z
        .string()
        .nonempty("Error")
        .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Invalid phone number format"),
      fax: z
        .string()
        .optional()
        .refine(
          (val) =>
            !val || // allow empty/null
            val?.trim() === "" || // allow blank string
            /^\(\d{3}\)\s\d{3}-\d{4}$/.test(val), // must match phone format
          "Invalid fax number format"
        ),
      contact: z.string().nonempty("Error"),
      email: z
        .string()
        .optional()
        .refine((val) => !val || val?.trim() === "" || z.string().email().safeParse(val).success),
      postalCodePK: z.number().gt(0),
    });
  }
  if (quickPayCustomer) {
    schema = schema.safeExtend({
      quickPayTerms: z.string().nonempty(),
    });
  }

  return schema;
}
