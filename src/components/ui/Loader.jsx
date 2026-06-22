/**
 * Loader Component
 * A reusable animated loading indicator with an accessible label.
 * @param {object} props
 * @param {string} [props.label='Loading'] Accessible loading message.
 * @param {'sm'|'md'|'lg'} [props.size='md'] Spinner size.
 * @returns {React.JSX.Element}
 */
function Loader({ label = 'Loading', size = 'md' }) {
  const sizes = { sm: 'size-5 border-2', md: 'size-9 border-4', lg: 'size-12 border-4' }

  return (
    <div aria-label={label} className="inline-flex items-center gap-3 text-forest-700" role="status">
      <span aria-hidden="true" className={`animate-spin rounded-full border-forest-100 border-t-forest-600 ${sizes[size] ?? sizes.md}`} />
      <span className="font-medium">{label}</span>
    </div>
  )
}

export default Loader
