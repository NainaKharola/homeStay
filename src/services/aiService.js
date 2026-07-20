import { getStoredToken } from './authService'

const AI_API_URL =
  import.meta.env.VITE_AI_API_URL || 'http://localhost:5000/api/ai'

function getAuthHeaders() {
  const token = getStoredToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

/**
 * Generate property description using AI endpoint
 * @param {Object} data - Property attributes (title, location, price, bedrooms, bathrooms, propertyType, amenities, additionalInfo)
 * @returns {Promise<Object>} { success: true, description: "..." }
 */
export async function generatePropertyDescription(data) {
  const response = await fetch(`${AI_API_URL}/property-description`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  })

  const json = await response.json().catch(() => null)

  if (!response.ok || !json?.success) {
    throw new Error(json?.message || 'Failed to generate AI description.')
  }

  return json
}
