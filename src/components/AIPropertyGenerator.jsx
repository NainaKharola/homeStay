import { useState } from 'react'
import { generatePropertyDescription } from '../services/aiService'
import { Button, Input, Loader, Toast } from './ui'

const initialAIForm = {
  title: '',
  location: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  propertyType: 'Homestay',
  amenities: '',
  additionalInfo: '',
}

function AIPropertyGenerator({ onUseDescription, initialValues }) {
  const [aiForm, setAiForm] = useState(() => ({
    ...initialAIForm,
    title: initialValues?.title || '',
    location: initialValues?.location || '',
    price: initialValues?.price || '',
  }))

  const [generatedDescription, setGeneratedDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [toastMsg, setToastMsg] = useState(null)
  const [copied, setCopied] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setAiForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleGenerate(e) {
    e.preventDefault()
    setError('')
    setToastMsg(null)
    setCopied(false)

    if (!aiForm.title.trim()) {
      setError('Property Title is required for AI generation.')
      return
    }

    if (!aiForm.location.trim()) {
      setError('Property Location is required for AI generation.')
      return
    }

    try {
      setIsLoading(true)
      const response = await generatePropertyDescription(aiForm)
      if (response?.description) {
        setGeneratedDescription(response.description)
        setToastMsg({ type: 'success', text: 'AI Description generated successfully!' })
      } else {
        throw new Error('No description returned from AI service.')
      }
    } catch (err) {
      const msg = err.message || 'Failed to generate AI description.'
      setError(msg)
      setToastMsg({ type: 'error', text: msg })
    } finally {
      setIsLoading(false)
    }
  }

  function handleCopy() {
    if (!generatedDescription) return
    navigator.clipboard.writeText(generatedDescription)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleUseInForm() {
    if (onUseDescription && generatedDescription) {
      onUseDescription(generatedDescription)
      setToastMsg({ type: 'success', text: 'Applied description to Property Form!' })
    }
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-forest-900 via-forest-800 to-navy-900 p-6 text-white shadow-xl sm:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block rounded-lg bg-green-400/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-green-300">
              ✨ Gemini AI Powered
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl text-white">
            AI Property Description Generator
          </h2>
          <p className="mt-1 text-sm text-green-100/80">
            Provide property attributes below and let AI craft a high-converting, professional listing description.
          </p>
        </div>
      </div>

      {toastMsg && (
        <div className="mb-4">
          <Toast message={toastMsg.text} onClose={() => setToastMsg(null)} type={toastMsg.type} />
        </div>
      )}

      {error && (
        <div className="mb-4">
          <Toast message={error} onClose={() => setError('')} type="error" />
        </div>
      )}

      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <label className="block text-sm font-semibold text-green-50">
            Property Title <span className="text-red-300">*</span>
            <input
              type="text"
              name="title"
              value={aiForm.title}
              onChange={handleChange}
              placeholder="e.g. Mountain View Homestay"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
              required
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Location <span className="text-red-300">*</span>
            <input
              type="text"
              name="location"
              value={aiForm.location}
              onChange={handleChange}
              placeholder="e.g. Manali, Himachal Pradesh"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
              required
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Price per Night (Rs.)
            <input
              type="number"
              name="price"
              value={aiForm.price}
              onChange={handleChange}
              placeholder="e.g. 2500"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Bedrooms
            <input
              type="text"
              name="bedrooms"
              value={aiForm.bedrooms}
              onChange={handleChange}
              placeholder="e.g. 3 Bedrooms"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Bathrooms
            <input
              type="text"
              name="bathrooms"
              value={aiForm.bathrooms}
              onChange={handleChange}
              placeholder="e.g. 2 Private Bathrooms"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Property Type
            <select
              name="propertyType"
              value={aiForm.propertyType}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-forest-800 px-4 py-2.5 text-sm text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/30"
            >
              <option value="Homestay">Homestay</option>
              <option value="Villa">Villa</option>
              <option value="Cottage">Cottage</option>
              <option value="Apartment">Apartment</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Heritage Home">Heritage Home</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-green-50">
            Amenities
            <input
              type="text"
              name="amenities"
              value={aiForm.amenities}
              onChange={handleChange}
              placeholder="e.g. High-speed WiFi, Home-cooked meals, Mountain View, Bonfire"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Additional Notes / Attractions
            <input
              type="text"
              name="additionalInfo"
              value={aiForm.additionalInfo}
              onChange={handleChange}
              placeholder="e.g. 10 mins from Hadimba Temple, peaceful apple orchard setting"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
            />
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-forest-950 shadow-md transition hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader label="Generating Description..." size="small" />
              </>
            ) : (
              <>
                <span>✨ Generate AI Description</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Output Section */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <label className="block font-semibold text-white mb-2">
          Generated AI Description
        </label>
        <textarea
          rows={5}
          value={generatedDescription}
          onChange={(e) => setGeneratedDescription(e.target.value)}
          placeholder="Click 'Generate AI Description' above to create a professional real estate description."
          className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white placeholder-white/30 outline-none focus:border-green-400 focus:bg-white/15 focus:ring-2 focus:ring-green-400/30"
        />

        {generatedDescription && (
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20 border border-white/20"
            >
              {copied ? '✓ Copied to Clipboard!' : '📋 Copy Description'}
            </button>

            {onUseDescription && (
              <button
                type="button"
                onClick={handleUseInForm}
                className="rounded-xl bg-forest-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-forest-500 border border-forest-400/30"
              >
                📝 Use in Property Form
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AIPropertyGenerator
