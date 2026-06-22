/**
 * Toast Component
 * A reusable status notification with success, error, and info variants.
 * @param {object} props
 * @param {string} props.message Notification message.
 * @param {'success'|'error'|'info'} [props.type='success'] Notification style.
 * @param {Function} [props.onClose] Optional dismiss handler.
 * @returns {React.JSX.Element}
 */
function Toast({ message, type = 'success', onClose }) {
  const variants = {
    success: 'border-forest-200 bg-forest-50 text-forest-800',
    error: 'border-red-200 bg-red-50 text-red-700',
    info: 'border-blue-200 bg-blue-50 text-blue-700',
  }

  return (
    <div className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 shadow-lg ${variants[type] ?? variants.info}`} role="status">
      <p className="font-medium">{message}</p>
      {onClose && <button aria-label="Dismiss notification" className="text-xl leading-none opacity-70 hover:opacity-100" onClick={onClose} type="button">&times;</button>}
    </div>
  )
}

export default Toast
