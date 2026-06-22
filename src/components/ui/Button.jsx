/**
 * Button Component
 * A reusable button with HomeStay styling and configurable variants.
 * @param {object} props
 * @param {React.ReactNode} [props.children] Button content.
 * @param {string} [props.text] Fallback text when children are not provided.
 * @param {Function} [props.onClick] Click handler.
 * @param {'primary'|'secondary'} [props.variant='primary'] Visual style.
 * @param {string} [props.className=''] Additional Tailwind classes.
 * @returns {React.JSX.Element}
 */
function Button({ children, text, variant = 'primary', className = '', type = 'button', ...props }) {
  const variants = {
    primary: 'bg-forest-600 text-white hover:bg-forest-700 focus-visible:ring-forest-500',
    secondary: 'border border-forest-600 bg-white text-forest-700 hover:bg-forest-50 focus-visible:ring-forest-500',
  }

  return (
    <button
      type={type}
      className={`rounded-full px-6 py-3 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children ?? text}
    </button>
  )
}

export default Button
