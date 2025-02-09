import * as z from "zod";

const productSchema = z.object({
  title: z.string().trim().min(2, { message: "Tối thiểu 2 kí tự" }),
  price: z.number().min(1000, { message: "Tối thiểu lon han 1000" }),
  description: z.string().optional(),
  sizeGuide: z.string().optional(), // huong dan cho size
  categoryId: z.string().optional(),
  slug: z.string().optional(),
  discount: z.number().min(1, { message: "Tối thiểu lon hoan 1" }), // phan tram giam gia
});

export default productSchema;
