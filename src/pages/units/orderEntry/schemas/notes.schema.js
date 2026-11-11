import { z } from "zod";

const baseNotesSchema = z.object({
  unitNotes: z.string(),
  dispatchNotes: z.string(),
});
export const notesInitailState = {
  unitNotes: "",
  dispatchNotes: "",
};

export function buildNotesSchema({ notes }) {
  let schema = baseNotesSchema;
  if (!notes) return schema;
  return schema;
}
