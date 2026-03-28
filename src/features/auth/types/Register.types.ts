import { z } from "zod";


  export interface RegisterRequest {
    user: {
      firstName: string;
      lastName: string;
    };
    credentials: {
      email: string;
      password: string;
    };
  }

  const emailRegex =
    /^(?!\.)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,100}$/

export const formSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "El nombre es obligatorio.")
        .max(50, "El nombre es demasiado largo.")
        .nonempty("El nombre es obligatorio."),
        
    lastName: z
        .string()
        .trim()
        .min(1, "El apellido es obligatorio.")
        .max(50, "El apellido es demasiado largo.")
        .nonempty("El apellido es obligatorio."),

    email: z
        .string()
        .trim()
        .min(1, "El email es obligatorio.")
        .max(100, "El email es demasiado largo.")
        .regex(emailRegex, "Ingresá un email válido."),

    password: z
        .string()
        .min(1, "La contraseña es obligatoria.")
        .min(8, "La contraseña debe tener al menos 8 caracteres.")
        .max(100, "La contraseña debe tener como máximo 100 caracteres.")
        .regex(
            passwordRegex,
            "La contraseña debe incluir mayúscula, minúscula, número y símbolo."
        ),
})

export type RegisterFormValues = z.infer<typeof formSchema>


export function toRegisterRequest(data: RegisterFormValues): RegisterRequest {
    return {
        user: {
            firstName: data.firstName,
            lastName: data.lastName,
        },
        credentials: {
            email: data.email,
            password: data.password,
        },
    }
}