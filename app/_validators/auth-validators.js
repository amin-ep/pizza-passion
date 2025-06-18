import z from "zod";

const email = z
  .string({
    required_error: "Email is required",
  })
  .email({
    message: "Please enter a valid email address",
  });

const password = z
  .string({
    required_error: "Password is required",
  })
  .min(8, {
    message: "Password must be at least 8 characters",
  })
  .max(12, {
    message: "Password must be equal or less than 12 characters",
  });

export const signupSchema = z
  .object({
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
    email,
    password,
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "The password did not match",
      });
    }
  });

export const loginSchema = z.object({
  email,
  password,
});

export const verifyEmailSchema = z.object({
  verificationCode: z
    .string({
      required_error: "Verification Code is required",
    })
    .length(6, {
      message: "Please input 6 digits code",
    }),
});

export const forgetPasswordSchema = z.object({
  email,
});

export const recoverPasswordSchema = z
  .object({
    password,
    confirmPassword: z.string(),
    recoverId: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "The password did not match",
      });
    }
  });
