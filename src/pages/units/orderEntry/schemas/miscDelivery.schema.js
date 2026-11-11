import { z } from "zod";

const baseMiscDeliverySchema = z.object({
  name: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  stateCode: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  contact: z.string().optional(),
  contactPhone: z.string().optional(),
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
  driverEmailWashInstructions: z.string().optional(),
  directions: z.string().nullable().optional(),
  bolTextMiscellaneousInputValues: z.array(z.string().nullable().optional()).length(7).optional(),
  bolTextOtherInputValues: z.array(z.string().nullable().optional()).length(3).optional(),
  bolTextDirectionsInputValues: z.array(z.string().nullable().optional()).length(7).optional(),
  bolTextHoursInputValues: z.array(z.string().nullable().optional()).length(3).optional(),
  bolTextWashInstructionsInputValues: z.array(z.string().nullable().optional()).length(5).optional(),
});
const default7 = Array(7).fill("");
const default5 = Array(5).fill("");
const default3 = Array(3).fill("");
export const miscDeliveryInitailState = {
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
  driverEmailWashInstructions: "",
  bolTextMiscellaneousInputValues: default7,
  bolTextDirectionsInputValues: default7,
  directions: "",
  bolTextHoursInputValues: default3,
  bolTextOtherInputValues: default3,
  bolTextWashInstructionsInputValues: default5,
};

export function buildMiscDeliverySchema({ miscDelivery, unit }) {
  let schema = baseMiscDeliverySchema;

  if (!miscDelivery || !unit?.miscellaneousDelivery) {
    return schema;
  }
  const checkbox =
    miscDelivery.openSunday ||
    miscDelivery.openMonday ||
    miscDelivery.openTuesday ||
    miscDelivery.openWednesday ||
    miscDelivery.openThursday ||
    miscDelivery.openFriday ||
    miscDelivery.openSaturday;

  if (unit.miscellaneousDelivery) {
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

      driverEmailWashInstructions: z.string().optional(),
    });
  }

  if (!checkbox && unit.miscellaneousDelivery) {
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
