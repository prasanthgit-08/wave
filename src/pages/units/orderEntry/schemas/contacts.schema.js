import { z } from "zod";

const baseContactsSchema = z.object({
  assignedContactsArray: z.array(z.any()).optional(),
});
export const contactsInitailState = {
  assignedContactsArray: [],
};
export function buildContactsSchema() {
  let schema = baseContactsSchema;

  return schema;
}
