import { z } from "zod";
const baseOnHoldSchema = z.object({
  reasonForHold: z.string().optional(),
  releaseDate: z.string().optional(),
  notes: z.string().optional(),
  authorizedBy: z.string().optional(),
  releaseDateValid: z.boolean().optional(),
});
export const onHoldInitailState = {
  reasonForHold: "",
  authorizedBy: "",
  releaseDate: "",
  notes: "",
  releaseDateValid: false,
};

export function buildOnHoldSchema({ onHold, unit, releaseDateValid }) {
  let schema = baseOnHoldSchema;
  if (!onHold) {
    return schema;
  }
  if (unit.unitOnHold) {
    schema = schema.safeExtend({
      reasonForHold: z.string().nonempty("Error"),
      authorizedBy: z.string().nonempty("Error"),
      notes: z.string().nonempty("Error"),
    });

    if (true) {
      schema = schema.safeExtend({
        releaseDateValid: z.boolean().refine((val) => val, { message: "Error" }),
      });
    }
  }
  return schema;
}
