import { z } from "zod";

const baseOverWidthSchema = z.object({
  trailerOnly: z.boolean().optional(),
  trailerOverhangs: z.boolean().optional(),
  permitAmount: z
    .string()
    .optional()
    .refine((value) => !value || /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/.test(value), {
      message: "Invalid amount. Up to 5 digits + optional .xx",
    }),
  invoiceAmount: z
    .string()
    .optional()
    .refine((value) => !value || /^(?:\d{1,5}(?:\.\d{1,2})?|\.\d{1,2})$/.test(value), {
      message: "Invalid amount. Up to 5 digits + optional .xx",
    }),
  permitInvoiceNumber: z.string().optional(),
  trailerMake: z.string().optional(),
  trailerVIN: z.string().optional(),
  trailerYear: z.string().optional(),
  trailerAxles: z.string().optional(),
  axleSpreadFoot: z.string().optional(),
  axleSpreadInch: z.string().optional(),
  trailerLengthFoot: z.string().optional(),
  trailerLengthInch: z.string().optional(),
  trailerWidthFoot: z.string().optional(),
  trailerWidthInch: z.string().optional(),
  trailerHeightFoot: z.string().optional(),
  trailerHeightInch: z.string().optional(),
  trailerOverhangFoot: z.string().optional(),
  trailerOverhangInch: z.string().optional(),
  boatMake: z.string().optional(),
  hullId: z.string().optional(),
  boatLengthFoot: z.string().optional(),
  boatLengthInch: z.string().optional(),
  boatWidthFoot: z.string().optional(),
  boatWidthInch: z.string().optional(),
  boatHeightFoot: z.string().optional(),
  boatHeightInch: z.string().optional(),
  totalHeightFoot: z.string().optional(),
  totalHeightInch: z.string().optional(),
});

export const overWidthInitialState = {
  trailerOnly: false,
  trailerOverhangs: false,
  permitAmount: "",
  invoiceAmount: "",
  permitInvoiceNumber: "",
  trailerMake: "",
  trailerVIN: "",
  trailerYear: "",
  trailerAxles: "",
  axleSpreadFoot: "",
  axleSpreadInch: "",
  trailerLengthFoot: "",
  trailerLengthInch: "",
  trailerWidthFoot: "",
  trailerWidthInch: "",
  trailerHeightFoot: "",
  trailerHeightInch: "",
  trailerOverhangFoot: "",
  trailerOverhangInch: "",
  boatMake: "",
  hullId: "",
  boatLengthFoot: "",
  boatLengthInch: "",
  boatWidthFoot: "",
  boatWidthInch: "",
  boatHeightFoot: "",
  boatHeightInch: "",
  totalHeightFoot: "",
  totalHeightInch: "",
};

export function buildOverWidthSchema({ overWidth, unit }) {
  let schema = baseOverWidthSchema;

  const unitTypeOverWidth = unit?.selectedUnitType?.overWidth ?? false;

  // if no conditions provided, return base schema
  if (!unitTypeOverWidth) return schema;

  if (unitTypeOverWidth) {
    schema = schema.safeExtend({
      trailerMake: z.string().nonempty("Error"),
      trailerVIN: z.string().nonempty("Error"),
      trailerYear: z
        .string()
        .nonempty("Year is required")
        .refine((value) => /^\d{4}$/.test(value), {
          message: "Year must be exactly 4 digits",
        })
        .refine(
          (value) => {
            const year = Number(value);
            const currentYear = new Date().getFullYear();
            return year >= 1900 && year <= currentYear + 1;
          },
          {
            message: "Year must be between 1900 and next year",
          }
        ),
      trailerAxles: z.string().nonempty("Error"),
      axleSpreadFoot: z.string().nonempty("Error"),
      axleSpreadInch: z.string().nonempty("Error"),
      trailerLengthFoot: z.string().nonempty("Error"),
      trailerLengthInch: z.string().nonempty("Error"),
      trailerWidthFoot: z.string().nonempty("Error"),
      trailerWidthInch: z.string().nonempty("Error"),
      trailerHeightFoot: z.string().nonempty("Error"),
      trailerHeightInch: z.string().nonempty("Error"),
    });

    if (overWidth.invoiceAmount) {
      schema = schema.safeExtend({
        permitInvoiceNumber: z.string().nonempty("Error"),
      });
    }

    if (overWidth.trailerOverhangs) {
      schema = schema.safeExtend({
        trailerOverhangFoot: z.string().nonempty("Error"),
        trailerOverhangInch: z.string().nonempty("Error"),
      });
    }

    if (!overWidth.trailerOnly) {
      schema = schema.safeExtend({
        boatMake: z.string().nonempty("Error"),
        hullId: z.string().nonempty("Error"),
        boatLengthFoot: z.string().nonempty("Error"),
        boatLengthInch: z.string().nonempty("Error"),
        boatWidthFoot: z.string().nonempty("Error"),
        boatWidthInch: z.string().nonempty("Error"),
        boatHeightFoot: z.string().nonempty("Error"),
        boatHeightInch: z.string().nonempty("Error"),
        totalHeightFoot: z.string().nonempty("Error"),
        totalHeightInch: z.string().nonempty("Error"),
      });
    }
  }

  return schema;
}
