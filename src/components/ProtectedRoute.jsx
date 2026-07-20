import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="grid min-h-[400px] place-items-center">
        <div className="size-8 animate-spin rounded-full border-4 border-forest-600 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
