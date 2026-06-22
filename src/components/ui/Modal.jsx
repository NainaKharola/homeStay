/**
 * Modal Component
 * An accessible modal dialog controlled by the isOpen prop.
 * @param {object} props
 * @param {boolean} props.isOpen Whether the modal is visible.
 * @param {Function} props.onClose Called when the modal should close.
 * @param {string} props.title Dialog heading.
 * @param {React.ReactNode} props.children Dialog content.
 * @returns {React.JSX.Element|null}
 */
import { useEffect, useId } from 'react'

function Modal({ isOpen, onClose, title, children }) {
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-900/60 p-4" onMouseDown={onClose}>
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-bold text-navy-900">{title}</h2>
          <button aria-label="Close modal" className="grid size-9 place-items-center rounded-full text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-navy-900" onClick={onClose} type="button">&times;</button>
        </div>
        <div className="mt-4 text-slate-600">{children}</div>
      </div>
    </div>
  )
}

export default Modal
