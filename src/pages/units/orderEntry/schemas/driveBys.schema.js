import { z } from "zod";

const baseDriveBysSchema = z.object({
  driveBysTabRequired: z.boolean().optional(),
});

export const driveBysInitailState = {
  driveBysTabRequired: false,
};

export function buildDriveBysSchema() {
  return baseDriveBysSchema.superRefine((data, ctx) => {
    if (data.driveBysTabRequired) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Drive bys tab is required.",
        path: ["driveBysTabRequired"],
      });
    }
  });
}
