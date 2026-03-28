import axios from "axios"
import { apiBaseUrl } from "@/config/env"
import type { LoginResponse } from "@/features/auth/types/Login.types"
import type { LoginFormValues } from "@/features/auth/types/Login.types"
import type { RegisterRequest } from "@/features/auth/types/Register.types"

export async function loginService(data: LoginFormValues) : Promise<LoginResponse> {
    const response = await authClient.post(`/auth/login`, data)
    return response.data
}

export async function registerService(data: RegisterRequest) : Promise<void> {
    const response = await authClient.post(`/auth/register`, data)
    return response.data
}

export async function logoutService() {
    const response = await authClient.post(`/auth/logout`)
    return response.data
}

const authClient = axios.create({
    baseURL: "/api",
   // baseURL: "/Authentication",
    headers: {
      "Content-Type": "application/json"
    }
  });
  