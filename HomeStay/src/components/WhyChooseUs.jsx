const features = [
  { icon: '☀', title: 'Authentic Local Experiences', text: 'Discover traditions, flavors, and stories that ordinary trips miss.' },
  { icon: '₹', title: 'Affordable Stays', text: 'Thoughtfully priced homes with comfort, character, and no hidden surprises.' },
  { icon: '✓', title: 'Trusted Hosts', text: 'Stay with welcoming local hosts who care about every guest.' },
  { icon: '⌖', title: 'Beautiful Locations', text: 'Find peaceful stays among farms, forests, mountains, and villages.' },
]

function WhyChooseUs() {
  return <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="font-semibold uppercase tracking-wider text-forest-600">Travel differently</p><h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">Why choose HomeStay?</h2></div><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{features.map((feature) => <article key={feature.title} className="rounded-2xl border border-slate-100 p-7 text-center shadow-sm transition hover:shadow-lg"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-forest-50 text-2xl font-bold text-forest-700">{feature.icon}</span><h3 className="mt-5 text-lg font-bold text-navy-900">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{feature.text}</p></article>)}</div></section>
}

export default WhyChooseUs
