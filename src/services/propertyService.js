const PROPERTIES_API_URL ="https://homestay-mni0.onrender.com/api/properties";

export async function getProperties({ signal } = {}) {
  const response = await fetch(PROPERTIES_API_URL, { signal })

  if (!response.ok) {
    throw new Error('Failed to load properties.')
  }

  return response.json()
}
