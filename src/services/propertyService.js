const PROPERTIES_API_URL = 'https://homestay-mni0.onrender.com/api/properties'

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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  })

  return parseResponse(response, 'Failed to add property.')
}

export async function updateProperty(propertyId, property) {
  const response = await fetch(`${PROPERTIES_API_URL}/${propertyId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(property),
  })

  return parseResponse(response, 'Failed to update property.')
}

export async function deleteProperty(propertyId) {
  const response = await fetch(`${PROPERTIES_API_URL}/${propertyId}`, {
    method: 'DELETE',
  })

  return parseResponse(response, 'Failed to delete property.')
}
