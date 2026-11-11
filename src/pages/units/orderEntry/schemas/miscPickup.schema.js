import { z } from "zod";

const baseMiscPickupSchema = z.object({
  name: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  contact: z.string(),
  contactPhone: z.string(),
  openSunday: z.boolean().optional(),
  openMonday: z.boolean().optional(),
  openTuesday: z.boolean().optional(),
  openWednesday: z.boolean().optional(),
  openThursday: z.boolean().optional(),
  openFriday: z.boolean().optional(),
  openSaturday: z.boolean().optional(),
  driverEmailHours: z.string().optional(),
  driverEmailDirections: z.string().optional(),
  postalCodePK: z.number().optional(),
  unitAddressId: z.number().optional(),
  canadian: z.boolean().optional(),
});
export const miscPickupInitailState = {
  name: "",
  address1: "",
  address2: "",
  city: "",
  stateCode: "",
  postalCode: "",
  phone: "",
  email: "",
  contact: "",
  contactPhone: "",
  openSunday: false,
  openMonday: false,
  openTuesday: false,
  openWednesday: false,
  openThursday: false,
  openFriday: false,
  openSaturday: false,
  driverEmailHours: "",
  driverEmailDirections: "",
  postalCodePK: 0,
  unitAddressId: 0,
  canadian: false,
};

export function buildMiscPickupSchema({ miscPickup, unit }) {
  let schema = baseMiscPickupSchema;

  if (!miscPickup) {
    return schema;
  }

  const checkbox =
    miscPickup.openSunday ||
    miscPickup.openMonday ||
    miscPickup.openTuesday ||
    miscPickup.openWednesday ||
    miscPickup.openThursday ||
    miscPickup.openFriday ||
    miscPickup.openSaturday;

  if (unit.miscellaneousPickup) {
    schema = schema.safeExtend({
      address1: z.string().nonempty("Error"),
      address2: z.string().optional(),
      name: z.string().nonempty("Error"),
      phone: z
        .string()
        .nonempty("Error")
        .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Invalid phone number format"),
      contact: z.string().nonempty("Error"),
      contactPhone: z
        .string()
        .nonempty("Error")
        .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Invalid phone number format"),

      postalCodePK: z.number().gt(0),
      driverEmailHours: z.string().optional(),
      driverEmailDirections: z.string().optional(),
      email: z
        .string()
        .optional()
        .refine(
          (v) => !v || v === "" || /^([a-zA-Z0-9_.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(v),
          "Invalid email format"
        ),
    });
  }

  if (!checkbox && unit.miscellaneousPickup) {
    schema = schema.safeExtend({
      openSunday: z.boolean().refine((val) => val, { message: "Error" }),
      openMonday: z.boolean().refine((val) => val, { message: "Error" }),
      openTuesday: z.boolean().refine((val) => val, { message: "Error" }),
      openWednesday: z.boolean().refine((val) => val, { message: "Error" }),
      openThursday: z.boolean().refine((val) => val, { message: "Error" }),
      openFriday: z.boolean().refine((val) => val, { message: "Error" }),
      openSaturday: z.boolean().refine((val) => val, { message: "Error" }),
    });
  }

  return schema;
}
