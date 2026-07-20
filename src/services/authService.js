const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth'

async function parseResponse(response, defaultError) {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.message || defaultError
    const error = new Error(message)
    error.status = response.status
    error.data = data
    throw error
  }
  return data
}

export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return parseResponse(response, 'Registration failed.')
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return parseResponse(response, 'Login failed.')
}

export async function getCurrentUser(token) {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return parseResponse(response, 'Session expired or invalid.')
}

export function setStoredAuth(token, user) {
  if (token) localStorage.setItem('homestay_token', token)
  if (user) localStorage.setItem('homestay_user', JSON.stringify(user))
}

export function clearStoredAuth() {
  localStorage.removeItem('homestay_token')
  localStorage.removeItem('homestay_user')
}

export function getStoredToken() {
  return localStorage.getItem('homestay_token')
}

export function getStoredUser() {
  const data = localStorage.getItem('homestay_user')
  try {
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}
