import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/config/env'
import { ToastProvider } from '@/features/auth/context/ToastContext'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>,
)
