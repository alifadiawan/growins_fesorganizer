import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { router, Link, usePage } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Create = () => {
  const [errors, setErrors] = useState({});
 
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const [form, setForm] = useState({
    bootcamp_id: '',
    whatsapp_number: '',
    city: '',
    province: '',
    nama: '',
    jurusan: '',
    asal_kampus: '',
    username_ig: '',
    description: '',
    time_start: '',
    time_end: '',
    date_start: '',
    date_end: '',
    main_theme: '',
    normal_price: '',
    discounted_price: '',
    cover: null,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      [e.target.name]: file
    });
  };

  // Add a handler for Quill
  const handleDescriptionChange = value => {
    setForm({ ...form, description: value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      // Only append if value exists
      if (form[key] !== null && form[key] !== '') {
        formData.append(key, form[key]);
      }
    });

    router.post(route('bootcamp.store'), formData, {
      forceFormData: true,
      onError: (errors) => {
        setErrors(errors);
      },
      onSuccess: () => {
        // Handle success
      },
    });
  };

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

      {Object.keys(errors).length > 0 && (
        <div className="mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <ul className="list-disc pl-5">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        </div>
      )}


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
              modules={modules}
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

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              name="cover"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/jpg,image/gif"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 
                           focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="mt-1 text-sm text-gray-500">Accepted formats: JPEG, PNG, JPG, GIF (Max: 3MBb)</p>
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