import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { router } from '@inertiajs/react'

const Edit = ({ bootcamp }) => {
  const [form, setForm] = useState({ ...bootcamp })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    router.put(`/admin/bootcamp/${bootcamp.id}`, form)
  }

  return (
    <AuthenticatedLayout pageTitle="Edit Bootcamp">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="input" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="input" required />
        <input name="time" placeholder="Time" value={form.time} onChange={handleChange} className="input" />
        <input name="date" placeholder="Date" value={form.date} onChange={handleChange} className="input" />
        <input name="main_theme" placeholder="Main Theme" value={form.main_theme} onChange={handleChange} className="input" required />
        <input name="normal_price" placeholder="Normal Price" type="number" value={form.normal_price} onChange={handleChange} className="input" />
        <input name="discounted_price" placeholder="Discounted Price" type="number" value={form.discounted_price} onChange={handleChange} className="input" />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </AuthenticatedLayout>
  )
}

export default Edit