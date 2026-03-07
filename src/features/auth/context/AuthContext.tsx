import { createContext, useState,useEffect, type ReactNode } from "react"
import type { AuthContextType, User } from "../types/Auth.types"
import { redirect } from "react-router-dom"

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

    const login = async (email: string, password: string) => {

        // aquí iría la llamada real al backend
        // const response = await api.post("/login", { email, password })

        const fakeUser: User = {
            id: "1",
            email,
            name: "Usuario Demo"
        }

        const fakeToken = "fake-jwt-token"

        setUser(fakeUser)
        setToken(fakeToken)

        localStorage.setItem("token", fakeToken)
    localStorage.setItem("user", JSON.stringify(fakeUser))
    }

    const logout = () => {
        setUser(null)
        setToken(null)

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        throw redirect("/");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}