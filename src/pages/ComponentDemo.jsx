/**
 * ComponentDemo Page
 * Demonstrates every reusable component in the HomeStay UI library.
 * @returns {React.JSX.Element}
 */
import { useState } from 'react'
import { Button, Input, Loader, Modal, Toast } from '../components/ui'

function ComponentDemo() {
  const [guestName, setGuestName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(true)

  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-wider text-forest-600">Week 3 deliverable</p>
          <h1 className="mt-2 text-4xl font-bold text-navy-900">HomeStay Component Library</h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Reusable interface elements styled to feel at home across the HomeStay experience.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <DemoCard title="Button">
            <div className="flex flex-wrap gap-3"><Button text="Explore stays" /><Button text="Learn more" variant="secondary" /></div>
          </DemoCard>

          <DemoCard title="Input">
            <Input id="demo-guest-name" label="Guest name" onChange={(event) => setGuestName(event.target.value)} placeholder="Enter your name" value={guestName} />
          </DemoCard>

          <DemoCard title="Modal">
            <Button onClick={() => setIsModalOpen(true)} text="Open modal" />
          </DemoCard>

          <DemoCard title="Toast">
            {showToast ? <Toast message="Your stay has been saved!" onClose={() => setShowToast(false)} /> : <Button onClick={() => setShowToast(true)} text="Show toast" variant="secondary" />}
          </DemoCard>

          <DemoCard className="md:col-span-2" title="Loader">
            <Loader label="Finding beautiful stays..." />
          </DemoCard>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Welcome to HomeStay">
        <p>This reusable modal can display booking details, confirmations, or any custom content.</p>
        <div className="mt-6 flex justify-end"><Button onClick={() => setIsModalOpen(false)} text="Got it" /></div>
      </Modal>
    </section>
  )
}

function DemoCard({ title, children, className = '' }) {
  return <article className={`rounded-3xl bg-white p-6 shadow-md sm:p-8 ${className}`}><h2 className="mb-5 text-xl font-bold text-navy-900">{title}</h2>{children}</article>
}

export default ComponentDemo
