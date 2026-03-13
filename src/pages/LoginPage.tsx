import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "../features/auth/hooks/useAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"

const emailRegex =
    /^(?!\.)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,100}$/

const formSchema = z.object({
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

type LoginFormValues = z.infer<typeof formSchema>

const LoginPage = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    })

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await login(data.email, data.password)
            navigate("/")
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                <Card className="border-border/60 bg-card/80 shadow-xl backdrop-blur-sm">
                    <CardHeader className="space-y-2 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                            <span className="text-lg font-bold">T</span>
                        </div>

                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Iniciar sesión
                        </CardTitle>

                        <CardDescription className="text-sm text-muted-foreground">
                            Accedé a tu cuenta para gestionar tus envíos en Traki.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FieldGroup>
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="login-email">Email</FieldLabel>

                                            <Input
                                                {...field}
                                                id="login-email"
                                                type="email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="usuario@mail.com"
                                                autoComplete="email"
                                                className="h-11"
                                            />

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <div className="flex items-center justify-between">
                                                <FieldLabel htmlFor="login-password">
                                                    Contraseña
                                                </FieldLabel>

                                                <Link
                                                    to="/forgot-password"
                                                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                                                >
                                                    ¿La olvidaste?
                                                </Link>
                                            </div>

                                            <Input
                                                {...field}
                                                id="login-password"
                                                type="password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Ingresá tu contraseña"
                                                autoComplete="current-password"
                                                className="h-11"
                                            />

                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <div className="flex flex-col gap-3 pt-2">
                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-xl text-sm font-medium cursor-pointer"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (<><Spinner/> Ingresando...</>) : "Iniciar sesión"}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                    className="h-11 w-full rounded-xl cursor-pointer"
                                >
                                    <Link to="/register">Registrarse</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default LoginPage