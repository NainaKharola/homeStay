import { useEffect, useMemo, useState } from 'react'
import AIPropertyGenerator from '../components/AIPropertyGenerator'
import { Button, Input, Loader, Toast } from '../components/ui'
import { createProperty, deleteProperty, getProperties, updateProperty } from '../services/propertyService'

const emptyForm = {
  title: '',
  location: '',
  price: '',
  rating: '',
  image: '',
  description: '',
}

const requiredFields = Object.keys(emptyForm)

function PropertyManager() {
  const [properties, setProperties] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingProperty, setEditingProperty] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [message, setMessage] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState('')

  const isEditing = Boolean(editingProperty)

  const nextPropertyId = useMemo(() => {
    const maxId = properties.reduce((max, property) => Math.max(max, Number(property.id) || 0), 0)
    return maxId + 1
  }, [properties])

  useEffect(() => {
    const controller = new AbortController()

    async function loadProperties() {
      try {
        setIsLoading(true)
        setError('')
        const data = await getProperties({ signal: controller.signal })
        setProperties(Array.isArray(data) ? data : [])
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'Unable to load properties.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadProperties()

    return () => controller.abort()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  function handleUseDescription(generatedDescription) {
    setForm((currentForm) => ({ ...currentForm, description: generatedDescription }))
    setFieldErrors((currentErrors) => ({ ...currentErrors, description: '' }))
    
    // Scroll smoothly to description form
    const formElement = document.getElementById('property-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function validateForm() {
    const errors = {}

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        errors[field] = 'This field is required.'
      }
    })

    if (form.price.trim() && !Number.isFinite(Number(form.price))) {
      errors.price = 'Price must be numeric.'
    }

    if (form.rating.trim() && !Number.isFinite(Number(form.rating))) {
      errors.rating = 'Rating must be numeric.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingProperty(null)
    setFieldErrors({})
  }

  function buildPayload() {
    return {
      id: isEditing ? editingProperty.id : nextPropertyId,
      title: form.title.trim(),
      location: form.location.trim(),
      price: Number(form.price),
      rating: Number(form.rating),
      image: form.image.trim(),
      description: form.description.trim(),
    }
  }

  async function refreshProperties() {
    const data = await getProperties()
    setProperties(Array.isArray(data) ? data : [])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage(null)
    setError('')

    if (!validateForm()) {
      setError('Please fix the highlighted fields.')
      return
    }

    try {
      setIsSaving(true)
      const payload = buildPayload()

      if (isEditing) {
        await updateProperty(editingProperty._id, payload)
        setMessage({ type: 'success', text: 'Property updated successfully' })
      } else {
        await createProperty(payload)
        setMessage({ type: 'success', text: 'Property added successfully' })
      }

      resetForm()
      await refreshProperties()
    } catch (saveError) {
      setError(saveError.message || 'Unable to save property.')
    } finally {
      setIsSaving(false)
    }
  }

  function handleEdit(property) {
    setEditingProperty(property)
    setForm({
      title: property.title ?? '',
      location: property.location ?? '',
      price: property.price?.toString() ?? '',
      rating: property.rating?.toString() ?? '',
      image: property.image ?? '',
      description: property.description ?? '',
    })
    setFieldErrors({})
    setError('')
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(property) {
    const confirmed = window.confirm('Are you sure you want to delete this property?')

    if (!confirmed) return

    try {
      setDeletingId(property._id)
      setError('')
      setMessage(null)
      setProperties((currentProperties) => currentProperties.filter((item) => item._id !== property._id))
      await deleteProperty(property._id)
      setMessage({ type: 'success', text: 'Property deleted successfully' })

      if (editingProperty?._id === property._id) {
        resetForm()
      }
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete property.')
      await refreshProperties()
    } finally {
      setDeletingId('')
    }
  }

  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">Property Management</h1>
        </div>

        <div className="mb-6 space-y-3">
          {message && <Toast message={message.text} onClose={() => setMessage(null)} type={message.type} />}
          {error && <Toast message={error} onClose={() => setError('')} type="error" />}
        </div>

        {/* AI Generator Section */}
        <div className="mb-10">
          <AIPropertyGenerator onUseDescription={handleUseDescription} initialValues={form} />
        </div>

        <form id="property-form" className="rounded-3xl bg-white p-6 shadow-md sm:p-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <Input disabled={isSaving} error={fieldErrors.title} label="Title" name="title" onChange={handleChange} value={form.title} />
            <Input disabled={isSaving} error={fieldErrors.location} label="Location" name="location" onChange={handleChange} value={form.location} />
            <Input disabled={isSaving} error={fieldErrors.price} inputMode="decimal" label="Price" name="price" onChange={handleChange} value={form.price} />
            <Input disabled={isSaving} error={fieldErrors.rating} inputMode="decimal" label="Rating" name="rating" onChange={handleChange} value={form.rating} />
            <div className="md:col-span-2">
              <Input disabled={isSaving} error={fieldErrors.image} label="Image URL" name="image" onChange={handleChange} value={form.image} />
            </div>

            <label className="block font-semibold text-navy-900 md:col-span-2" htmlFor="description">
              Description
              <textarea
                aria-describedby={fieldErrors.description ? 'description-error' : undefined}
                aria-invalid={Boolean(fieldErrors.description)}
                className={`mt-2 min-h-32 w-full resize-y rounded-xl border bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 ${fieldErrors.description ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-forest-500 focus:ring-forest-100'}`}
                disabled={isSaving}
                id="description"
                name="description"
                onChange={handleChange}
                value={form.description}
              />
              {fieldErrors.description && <span className="mt-2 block text-sm font-normal text-red-600" id="description-error">{fieldErrors.description}</span>}
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button disabled={isSaving} text={isSaving ? 'Saving...' : isEditing ? 'Update Property' : 'Add Property'} type="submit" />
            {isEditing && <Button disabled={isSaving} onClick={resetForm} text="Cancel Edit" variant="secondary" />}
          </div>
        </form>

        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-navy-900">Properties</h2>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">{properties.length} total</span>
          </div>

          {isLoading ? (
            <div className="rounded-3xl bg-white p-8 text-center shadow-md"><Loader label="Loading properties..." /></div>
          ) : properties.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-md">No properties found.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <article className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl" key={property._id ?? property.id}>
                  <img alt={property.title} className="h-52 w-full object-cover" src={property.image} />
                  <div className="space-y-4 p-5">
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">{property.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-forest-700">{property.location}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-700">
                      <span className="rounded-full bg-forest-50 px-3 py-1 text-forest-700">Rs. {property.price}</span>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">{property.rating} rating</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{property.description}</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button disabled={isSaving || Boolean(deletingId)} onClick={() => handleEdit(property)} text="Edit" variant="secondary" />
                      <Button className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-500" disabled={Boolean(deletingId) || isSaving} onClick={() => handleDelete(property)} text={deletingId === property._id ? 'Deleting...' : 'Delete'} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PropertyManager
