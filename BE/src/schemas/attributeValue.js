import * as z from "zod";

const attributeValueSchema = z.object({
  attributeId: z.string(),
  value: z.string().min(1, "toi thieu 1 ki tu"),
});

export default attributeValueSchema;
