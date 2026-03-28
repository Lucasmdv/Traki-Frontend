import axios from "axios"
import { apiBaseUrl } from "@/config/env"
import type { LoginResponse } from "@/features/auth/types/Auth.types"
import type { LoginFormValues } from "@/features/auth/types/Auth.types"

export async function loginService(data: LoginFormValues) : Promise<LoginResponse> {
    const response = await axios.post(`${apiBaseUrl}/auth/login`, data)
    return response.data
}

export async function registerService(name: string, surname: string, email: string, password: string) {
    const response = await axios.post(`${apiBaseUrl}/auth/register`, { name, surname, email, password })
    return response.data
}

export async function logoutService() {
    const response = await axios.post(`${apiBaseUrl}/auth/logout`)
    return response.data
}