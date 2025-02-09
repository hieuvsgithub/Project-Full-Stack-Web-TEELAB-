import * as z from "zod";

const attributeSchema = z.object({
  name: z.string().min(1, "Toi thieu 1 ki tu"),
});

export default attributeSchema;
