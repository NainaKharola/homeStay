import { Button } from './index'

/**
 * EmptyState Component
 * Displays a unified, polished screen when list data is missing.
 * @param {object} props
 * @param {string} props.title - Main heading.
 * @param {string} props.description - Supporting description.
 * @param {string} [props.actionText] - Label for call to action button.
 * @param {Function} [props.onAction] - Button click callback.
 * @param {string} [props.icon] - Visual emoji/symbol.
 * @returns {React.JSX.Element}
 */
function EmptyState({ title, description, actionText, onAction, icon = '🔍' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
      <div className="text-5xl mb-4 animate-bounce duration-1000">{icon}</div>
      <h3 className="text-xl font-bold text-navy-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <div className="mt-6">
          <Button onClick={onAction} text={actionText} />
        </div>
      )}
    </div>
  )
}

export default EmptyState
