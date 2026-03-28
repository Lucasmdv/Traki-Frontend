import { createContext, useState,useEffect, type ReactNode } from "react"
import type { AuthContextType, User } from "../types/Auth.types"
import { redirect } from "react-router-dom"
import type { LoginFormValues } from "@/pages/LoginPage"
import { loginService } from "@/services/thunks/loginThunk"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface Props {
    children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (data: LoginFormValues) => {

        const response = await loginService(data.email, data.password);

        setUser(response.user)
        setToken(response.token)

        localStorage.setItem("token", response.token)
        localStorage.setItem("user", JSON.stringify(response.user))
    }

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        throw redirect("/");
    }

    const register = async (name: string, surname: string, email: string, password: string) => {
        // aquí iría la llamada real al backend
        // const response = await api.post("/register", { name, surname, email, password })

        const fakeUser: User = {
            id: "1",
            email,
            name: name
        }

        const fakeToken = "fake-jwt-token"

        setUser(fakeUser)
        setToken(fakeToken)

        localStorage.setItem("token", fakeToken)
        localStorage.setItem("user", JSON.stringify(fakeUser))

        window.location.href = "/";
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                login,
                logout,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}