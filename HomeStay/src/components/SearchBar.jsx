function SearchBar() {
  const fields = [
    { label: 'Where', type: 'text', placeholder: 'Search a destination' },
    { label: 'Check in', type: 'date' }, { label: 'Check out', type: 'date' },
  ]
  return (
    <form className="mx-auto grid max-w-5xl gap-3 rounded-2xl bg-white p-4 shadow-2xl sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_auto] md:rounded-full md:p-3" onSubmit={(event) => event.preventDefault()}>
      {fields.map((field) => <label key={field.label} className="px-4 py-2 text-sm font-semibold text-navy-900 md:border-r md:border-slate-200">{field.label}<input type={field.type} placeholder={field.placeholder} className="mt-1 block w-full bg-transparent text-sm font-normal text-slate-600 outline-none placeholder:text-slate-400" /></label>)}
      <button type="submit" className="rounded-xl bg-forest-600 px-7 py-3 font-semibold text-white transition hover:bg-forest-700 md:rounded-full">Search</button>
    </form>
  )
}

export default SearchBar
