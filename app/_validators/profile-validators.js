import { z } from "zod";

const profileSchema = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(2, {
      message: "First name must be at least 2 characters",
    })
    .max(40, {
      message: "First name must be 40 characters or less",
    }),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(2, {
      message: "Last name must be at least 2 characters",
    })
    .max(40, {
      message: "Last name must be 40 characters or less",
    }),
  phone: z
    .string()
    .length(11, {
      message: "Please input a valid phone number (11 characters)",
    })
    .trim()
    .optional(),
  street: z
    .string({
      required_error: "Please write your street name",
    })
    .min(2, {
      message: "Street name must be at least 2 characters",
    })
    .max(50, {
      message: "Street name must be 50 characters or less",
    })
    .optional(),
  postalCode: z
    .string({
      required_error: "Postal code is required",
    })
    .length(10, {
      message: "Postal code must be 10 digits",
    })
    .optional(),
  text: z
    .string({
      required_error: "Address text is required",
    })
    .min(10, {
      message: "Address text must be at least 10 characters",
    })
    .max(200, {
      message: "Address text must be 200 characters or less",
    })
    .optional(),
});

const email = z
  .string({
    required_error: "Email is required",
  })
  .email({
    message: "Please enter a valid email address",
  });

const changeEmailSchema = z
  .object({
    email: email,
    candidateEmail: email,
  })
  .superRefine(({ email, candidateEmail }, ctx) => {
    if (email.toLocaleLowerCase() === candidateEmail.toLocaleLowerCase()) {
      ctx.addIssue({
        code: "custom",
        path: ["candidateEmail"],
        message: "Please enter a different email",
      });
    }
  });

const changeEmailVerifySchema = z.object({
  verificationCode: z
    .string({
      required_error: "Verification Code is required",
    })
    .length(6, {
      message: "Please input 6 digits code",
    }),
});

export { profileSchema, changeEmailSchema, changeEmailVerifySchema };
