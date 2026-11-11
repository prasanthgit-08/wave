import { z } from "zod";

const baseCreditCardSchema = z.object({
  creditCardArray: z.array(z.any()).optional(),
  creditCardTabRequired: z.boolean().optional(),
});

export const creditCardInitailState = {
  creditCardArray: [],
  creditCardTabRequired: false,
};

export function buildCreditCardSchema() {
  return baseCreditCardSchema.superRefine((data, ctx) => {
    if (data.creditCardTabRequired) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Credit card tab is required.",
        path: ["creditCardTabRequired"],
      });
    }
  });
}
