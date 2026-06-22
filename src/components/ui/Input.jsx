/**
 * Input Component
 * A reusable labelled form input with optional help or error text.
 * @param {object} props
 * @param {string} props.label Accessible input label.
 * @param {string} [props.id] Input id; defaults to the name.
 * @param {string} [props.error] Validation error message.
 * @param {string} [props.helperText] Supporting text displayed below the input.
 * @param {string} [props.className=''] Additional classes for the input.
 * @returns {React.JSX.Element}
 */
function Input({ label, id, name, error, helperText, className = '', ...props }) {
  const inputId = id ?? name
  const descriptionId = error || helperText ? `${inputId}-description` : undefined

  return (
    <label className="block font-semibold text-navy-900" htmlFor={inputId}>
      {label}
      <input
        id={inputId}
        name={name}
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error)}
        className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal outline-none transition focus:ring-2 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-forest-500 focus:ring-forest-100'} ${className}`}
        {...props}
      />
      {(error || helperText) && (
        <span id={descriptionId} className={`mt-2 block text-sm font-normal ${error ? 'text-red-600' : 'text-slate-500'}`}>
          {error || helperText}
        </span>
      )}
    </label>
  )
}

export default Input
