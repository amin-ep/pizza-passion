import { z } from "zod";

const orderSchema = z.object({
  street: z
    .string({
      required_error: "Please write your street name",
    })
    .min(2, {
      message: "Street name must be at least 2 characters",
    })
    .max(50, {
      message: "Street name must be 50 characters or less",
    }),
  postalCode: z
    .string({
      required_error: "Postal code is required",
    })
    .length(10, {
      message: "Postal code must be 10 digits",
    }),
  text: z
    .string({
      required_error: "Address text is required",
    })
    .min(10, {
      message: "Address text must be at least 10 characters",
    })
    .max(200, {
      message: "Address text must be 200 characters or less",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters",
    })
    .max(200, {
      message: "Description must be 200 characters or less",
    })
    .optional(),
  phone: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 characters long" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
});

export { orderSchema };
