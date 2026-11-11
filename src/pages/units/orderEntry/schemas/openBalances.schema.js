import { z } from "zod";

const baseOpenBalancesSchema = z.object({
  openBalancesArray: z.any().optional(),
});

export const openBalancesInitialState = {
  openBalancesArray: [],
};

export function buildOpenBalancesSchema({ openBalances }) {
  let schema = baseOpenBalancesSchema;

  if (!openBalances) return schema;

  /* if (customer?.openBalancePrepaid) {
    schema = schema.safeExtend({
      openBalancesArray: z.array(),
    });
  } */

  return schema;
}
