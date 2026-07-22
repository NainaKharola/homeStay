import { useState } from 'react'
import { generatePropertyDescription } from '../services/aiService'
import { Button, Loader, Toast } from './ui'

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

  // Compute character counts
  const totalInputChars = Object.values(aiForm).reduce((sum, val) => sum + String(val).length, 0)
  const outputCharCount = generatedDescription.length

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
        
        // Log activity
        const list = JSON.parse(localStorage.getItem('homestay_activities') || '[]')
        list.unshift({
          id: Date.now(),
          description: `Generated AI description for "${aiForm.title}"`,
          timestamp: new Date().toISOString(),
        })
        localStorage.setItem('homestay_activities', JSON.stringify(list.slice(0, 15)))
      } else {
        throw new Error('No description returned from AI service.')
      }
    } catch (err) {
      const msg = err.message || 'Failed to generate AI description. Make sure backend is running.'
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

  function handleReset() {
    setAiForm(initialAIForm)
    setGeneratedDescription('')
    setError('')
    setToastMsg(null)
    setCopied(false)
  }

  return (
    <article className="rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-navy-950 p-6 text-white shadow-xl sm:p-8 border border-forest-800/40">
      {/* Header Info */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block rounded-lg bg-green-400/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-300 border border-green-500/20">
              ✨ Gemini AI Engine Active
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl text-white">
            AI Property Description Builder
          </h2>
          <p className="mt-1 text-sm text-green-100/70">
            Feed stay attributes and let AI draft a premium, high-converting copy.
          </p>
        </div>
        {generatedDescription && (
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-50 shrink-0"
          >
            Clear / Reset Inputs
          </button>
        )}
      </div>

      {toastMsg && (
        <div className="mb-4 max-w-2xl">
          <Toast message={toastMsg.text} onClose={() => setToastMsg(null)} type={toastMsg.type} />
        </div>
      )}

      {error && (
        <div className="mb-4 max-w-2xl">
          <Toast message={error} onClose={() => setError('')} type="error" />
        </div>
      )}

      {/* Attributes Form */}
      <form onSubmit={handleGenerate} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <label className="block text-sm font-semibold text-green-50">
            Stay Title <span className="text-red-300">*</span>
            <input
              type="text"
              name="title"
              value={aiForm.title}
              onChange={handleChange}
              placeholder="e.g. Himalayan Woodhouse"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20"
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
              placeholder="e.g. Manali, HP"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20"
              required
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Price per Night (₹)
            <input
              type="number"
              name="price"
              value={aiForm.price}
              onChange={handleChange}
              placeholder="e.g. 3500"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Bedrooms Setup
            <input
              type="text"
              name="bedrooms"
              value={aiForm.bedrooms}
              onChange={handleChange}
              placeholder="e.g. 2 King Bedrooms"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Bathrooms Setup
            <input
              type="text"
              name="bathrooms"
              value={aiForm.bathrooms}
              onChange={handleChange}
              placeholder="e.g. 2 Attached Bathrooms"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Property Type
            <select
              name="propertyType"
              value={aiForm.propertyType}
              onChange={handleChange}
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-forest-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
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
              placeholder="e.g. Free WiFi, Bonfire, Kitchen access"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20"
            />
          </label>

          <label className="block text-sm font-semibold text-green-50">
            Additional Attractions / Context
            <input
              type="text"
              name="additionalInfo"
              value={aiForm.additionalInfo}
              onChange={handleChange}
              placeholder="e.g. 5 mins walk from lake side, mountain view"
              disabled={isLoading}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-green-400 focus:bg-white/10 focus:ring-2 focus:ring-green-400/20"
            />
          </label>
        </div>

        {/* Action Panel */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-forest-950 shadow-md transition hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="size-4 animate-spin rounded-full border-2 border-forest-950 border-t-transparent" />
                Crafting stay description...
              </span>
            ) : (
              <span>✨ Build AI Description</span>
            )}
          </button>
          <span className="text-xs text-green-200/50 font-medium">
            Inputs: {totalInputChars} characters
          </span>
        </div>
      </form>

      {/* Generated Copy Panel */}
      {(generatedDescription || isLoading) && (
        <div className="mt-8 border-t border-white/10 pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-bold text-white uppercase tracking-wider">
              Generated Copy
            </label>
            <span className="text-xs text-green-200/50 font-medium">
              Output: {outputCharCount} characters
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center text-center gap-3 min-h-[140px]">
              <span className="size-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
              <p className="text-sm font-medium text-slate-300">Gemini is writing a beautiful stay narrative...</p>
            </div>
          ) : (
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 group transition duration-300 hover:border-green-400/20 hover:bg-white/8">
              <pre className="whitespace-pre-wrap font-sans text-sm text-slate-100 leading-relaxed font-normal">
                {generatedDescription}
              </pre>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/20 border border-white/15 flex items-center gap-2"
                >
                  <span>{copied ? '✓' : '📋'}</span>
                  {copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
                </button>

                {onUseDescription && (
                  <button
                    type="button"
                    onClick={handleUseInForm}
                    className="rounded-xl bg-forest-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-forest-500 border border-forest-400/20"
                  >
                    📝 Apply to Property Form
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default AIPropertyGenerator
