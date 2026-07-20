import { createContext, useContext, useEffect, useState } from 'react'
import {
  clearStoredAuth,
  getCurrentUser,
  getStoredToken,
  getStoredUser,
  loginUser,
  registerUser,
  setStoredAuth,
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      // 1. Check if returning from Google OAuth redirect with query params
      const urlParams = new URLSearchParams(window.location.search)
      const oauthToken = urlParams.get('token')
      const oauthUserData = urlParams.get('user')

      if (oauthToken && oauthUserData) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(oauthUserData))
          setStoredAuth(oauthToken, parsedUser)
          setToken(oauthToken)
          setUser(parsedUser)

          // Clean URL params without reloading page
          const cleanUrl = window.location.pathname
          window.history.replaceState({}, document.title, cleanUrl)
          setLoading(false)
          return
        } catch (err) {
          console.error('Failed to parse OAuth user data:', err)
        }
      }

      // 2. Otherwise check localStorage
      const savedToken = getStoredToken()
      const savedUser = getStoredUser()

      if (savedToken) {
        try {
          const response = await getCurrentUser(savedToken)
          setToken(savedToken)
          setUser(response.user || savedUser)
          setStoredAuth(savedToken, response.user || savedUser)
        } catch {
          // Token invalid or expired
          clearStoredAuth()
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    const data = await loginUser({ email, password })
    setStoredAuth(data.token, data.user)
    setToken(data.token)
    setUser(data.user)
    return data
  }

  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password })
    if (data.token && data.user) {
      setStoredAuth(data.token, data.user)
      setToken(data.token)
      setUser(data.user)
    }
    return data
  }

  const logout = () => {
    clearStoredAuth()
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token && user),
    login,
    register,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="grid min-h-screen place-items-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-forest-600 border-t-transparent" />
            <p className="text-sm font-medium text-slate-600">Loading HomeStay...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
