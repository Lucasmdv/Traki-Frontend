import App from "@/App"
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
    {
        element: <App />, // layout con Navbar
        errorElement: <NotFoundPage />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/login", element: <LoginPage /> },
        ],
    },
])