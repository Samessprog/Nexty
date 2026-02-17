import { createBrowserRouter, Navigate } from 'react-router-dom'

import ProtectedRoute from '@/components/features/auth/ProtectedRoute'
import DashboardPage from '@/pages/DashboardPage'
import LoginPage from '@/pages/LoginPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: <div>Forgot Password</div>,
  },
  {
    path: '/register',
    element: <div>Register</div>,
  },
  {
    path: '/privacy',
    element: <div>Privacy Policy</div>,
  },
  {
    path: '/terms',
    element: <div>Terms of Service</div>,
  },
])
