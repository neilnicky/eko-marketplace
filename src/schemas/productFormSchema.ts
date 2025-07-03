import { z } from "zod";

export const productFormSchema = z.object({
  project_id: z.string().min(1, "Project is required"),
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(40, "Product name must not exceed 40 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(300, "Description must not exceed 300 characters"),
  category: z.string().min(1, "Category is required"),
  price: z
    .string()
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Price must be greater than 0"
    ),
  measurement_unit: z.string().min(1, "Unit of measure is required"),
  stock: z
    .string()
    .refine(
      (val) => !isNaN(parseInt(val)) && parseInt(val) >= 0,
      "Stock must be 0 or greater"
    ),
  shipping_cost: z.string().optional().default("0"),
  image_urls: z.array(z.string()).optional().default([]),
});
