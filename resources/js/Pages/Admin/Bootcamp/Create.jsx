import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { router, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Create = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    time_start: '',
    time_end: '',
    date_start: '',
    date_end: '',
    main_theme: '',
    normal_price: '',
    discounted_price: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add a handler for Quill
  const handleDescriptionChange = value => {
    setForm({ ...form, description: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    router.post('/admin/bootcamp', form)
  }

  return (
    <AuthenticatedLayout pageTitle="Create Bootcamp">
      <div className="mb-8">
        <Link
          href="/admin/bootcamp"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Bootcamps
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mx-auto">

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter bootcamp title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                         focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <ReactQuill
              value={form.description}
              onChange={handleDescriptionChange}
              theme="snow"
              className="bg-white dark:bg-gray-700 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time Start
              </label>
              <input
                type="time"
                name="time_start"
                value={form.time_start}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time End
              </label>
              <input
                type="time"
                name="time_end"
                value={form.time_end}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Start
              </label>
              <input
                type="date"
                name="date_start"
                value={form.date_start}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date End
              </label>
              <input
                type="date"
                name="date_end"
                value={form.date_end}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Main Theme
            </label>
            <input
              name="main_theme"
              placeholder="Enter main theme"
              value={form.main_theme}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                         focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Normal Price
              </label>
              <input
                type="number"
                name="normal_price"
                placeholder="Enter price"
                value={form.normal_price}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                           focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Discounted Price
              </label>
              <input
                type="number"
                name="discounted_price"
                placeholder="Enter discounted price"
                value={form.discounted_price}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                           focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 
                         transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-teal-500"
            >
              Create Bootcamp
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}

export default Create