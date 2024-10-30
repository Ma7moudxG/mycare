import { z } from "zod";

export const UserFormValidation = z.object({
  email: z.string().email("Invalid email address"),
  password: z
  .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

export const ClientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});



export const CreateClientSchema = z.object({
  name: z.string().min(3, "client name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  clientImage: z.custom<File[]>(),
  contact: z.string().min(8, "client contact must be at least 8 characters"),
});

