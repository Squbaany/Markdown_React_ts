import { FormTag } from "@/types";
import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters long.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export const SigninValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export const NoteValidation = z.object({
  title: z.string().min(5).max(200),
  markdown: z.string().min(5).max(2200),
  tags: z.custom<FormTag[]>(),
});
