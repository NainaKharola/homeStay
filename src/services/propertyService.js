import { getStoredToken } from './authService'

const PROPERTIES_API_URL =
  import.meta.env.VITE_PROPERTIES_API_URL ||
  'http://localhost:5000/api/properties'

function getAuthHeaders() {
  const token = getStoredToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

async function parseResponse(response, fallbackMessage) {
  if (response.status === 204) {
    return null
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || fallbackMessage)
  }

  return data
}

export async function getProperties({ signal } = {}) {
  const response = await fetch(PROPERTIES_API_URL, { signal })
  return parseResponse(response, 'Failed to load properties.')
}

export async function createProperty(property) {
  const response = await fetch(PROPERTIES_API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(property),
  })

  return parseResponse(response, 'Failed to add property.')
}

export async function updateProperty(propertyId, property) {
  const response = await fetch(`${PROPERTIES_API_URL}/${propertyId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(property),
  })

  return parseResponse(response, 'Failed to update property.')
}

export async function deleteProperty(propertyId) {
  const response = await fetch(`${PROPERTIES_API_URL}/${propertyId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })

  return parseResponse(response, 'Failed to delete property.')
}
