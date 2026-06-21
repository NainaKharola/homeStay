function HomestayCard({ homestay }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-60 overflow-hidden"><img src={homestay.image} alt={homestay.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" /></div>
      <div className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="text-lg font-bold text-navy-900">{homestay.title}</h3><p className="mt-1 text-sm text-slate-500">⌖ {homestay.location}</p></div><span className="shrink-0 text-sm font-semibold text-amber-500">★ {homestay.rating}</span></div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><p className="font-bold text-navy-900">₹{homestay.price.toLocaleString('en-IN')} <span className="text-sm font-normal text-slate-500">/ night</span></p><button type="button" className="font-semibold text-forest-600 hover:text-forest-800">View details →</button></div></div>
    </article>
  )
}

export default HomestayCard
