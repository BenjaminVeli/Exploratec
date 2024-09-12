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

export const formSchema = z.object({
  name: z
  .string()
  .min(1, "El nombre es requerido."),
  lastname: z
  .string()
  .min(1, "El apellido es requerido."),
  dni: z
  .string()
  .length(8, "Debe ingresar un dni válido."),
  phone: z
  .string()
  .length(9, "Debe ingresar un teléfono válido."),
  specialty: z
  .string()
  .min(1, "La especialidad es requerida."),
  reason: z
  .string()
  .min(1, "El Motivo es requerido."),
})