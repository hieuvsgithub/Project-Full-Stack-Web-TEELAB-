import * as z from "zod";

const categorySchema = z.object({
  title: z.string().min(2, { message: "toi thieu 2 ki tu" }),
  description: z.string().optional(),
  slug: z.string().optional(),
});

export default categorySchema;
