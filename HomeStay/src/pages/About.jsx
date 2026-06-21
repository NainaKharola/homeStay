const values = [
  { title: 'Our Story', text: 'HomeStay began with a simple belief: the most memorable journeys happen when travelers feel less like tourists and more like guests. We bring distinctive rural homes and curious travelers together, making it easier to experience India through its landscapes, food, craft, and people.' },
  { title: 'Our Mission', text: 'We exist to make rural tourism more accessible and rewarding. By helping local families welcome travelers, we aim to create sustainable income, preserve regional traditions, and encourage slower, more meaningful travel.' },
  { title: 'Our Vision', text: "Our vision is to become India’s most trusted homestay marketplace—a place where every stay feels personal, every host feels supported, and every journey leaves a positive mark on the community." },
]

function About() {
  return <><section className="bg-forest-900 px-4 py-24 text-center text-white"><p className="font-semibold uppercase tracking-widest text-green-300">About HomeStay</p><h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">Travel that brings people and places closer</h1><p className="mx-auto mt-5 max-w-2xl leading-7 text-green-50">We help travelers discover rural India with the warmth, honesty, and belonging of a real home.</p></section><section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"><div className="grid gap-8 md:grid-cols-3">{values.map((value, index) => <article key={value.title} className="rounded-2xl border border-slate-100 p-8 shadow-sm"><span className="text-5xl font-bold text-forest-100">0{index + 1}</span><h2 className="mt-5 text-2xl font-bold text-navy-900">{value.title}</h2><p className="mt-4 leading-7 text-slate-600">{value.text}</p></article>)}</div></section></>
}

export default About
