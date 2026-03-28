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
import { formSchema, type RegisterFormValues } from "@/features/auth/types/Register.types"



const RegisterPage = () => {
    const { register } = useAuth()
    const navigate = useNavigate()

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    })

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            await register(data.firstName, data.lastName, data.email, data.password)
            navigate("/")
        } catch (error) {
            console.error("Registration failed:", error)
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
                            Registrarse
                        </CardTitle>

                        <CardDescription className="text-sm text-muted-foreground">
                            Crea tu cuenta para gestionar tus envíos en Traki.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FieldGroup>
                                <Controller
                                    name="firstName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="register-firstName">Nombre</FieldLabel>

                                            <Input
                                                {...field}
                                                id="register-firstName"
                                                type="text"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Nombre..."
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
                                    name="lastName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="register-surname">Apellido</FieldLabel>

                                            <Input
                                                {...field}
                                                id="register-surname"
                                                type="text"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Apellido..."
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
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="register-email">Email</FieldLabel>

                                            <Input
                                                {...field}
                                                id="register-email"
                                                type="email"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="usuario@mail.com"
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
                                                <FieldLabel htmlFor="register-password">
                                                    Contraseña
                                                </FieldLabel>
                                            </div>

                                            <Input
                                                {...field}
                                                id="register-password"
                                                type="password"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Ingresá tu contraseña"
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
                                    onClick={() => onSubmit(form.getValues())}
                                >
                                    {form.formState.isSubmitting ? (<><Spinner/> Registrando...</>) : "Registrarse"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    asChild
                                    className="h-11 w-full rounded-xl text-sm font-medium cursor-pointer"
                                    disabled={form.formState.isSubmitting}
                                >
                                    <Link to="/">Cancelar</Link>
                                </Button>
                            </div>
                            <div className="text-muted-foreground">
                                Ya tenes una cuenta?{" "}
                            </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                    className="h-11 w-full rounded-xl cursor-pointer"
                                >
                                    <Link to="/login">Iniciar sesión</Link>
                                </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default RegisterPage