import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "El nombre de usuario es requerido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
});



export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "El nombre de usuario es requerido"),
  email: z
    .string()
    .email("Debe ser un correo electrónico válido")
    .min(1, "El correo electrónico es requerido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
});