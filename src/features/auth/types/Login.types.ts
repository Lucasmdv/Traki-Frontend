export interface User {
    id: string;
    email: string;
    name: string;
}


import { z } from "zod";

export const emailRegex = /^(?!\.)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,100}$/;

export const formSchema = z.object({
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
            "La contraseña debe incluir mayúscula, minúscula, número y símbolo.",
        ),
});

export type LoginFormValues = z.infer<typeof formSchema>;

export interface LoginResponse {
    token: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        dni: string;
        dateOfRegistration: string;
        _links: {
            additionalProp1: {
                href: string;
                hreflang: string;
                title: string;
                type: string;
                deprecation: string;
                profile: string;
                name: string;
                templated: boolean;
            };
            additionalProp2: {
                href: string;
                hreflang: string;
                title: string;
                type: string;
                deprecation: string;
                profile: string;
                name: string;
                templated: boolean;
            };
            additionalProp3: {
                href: string;
                hreflang: string;
                title: string;
                type: string;
                deprecation: string;
                profile: string;
                name: string;
                templated: boolean;
            };
        };
    };
    roles: string[];
}
